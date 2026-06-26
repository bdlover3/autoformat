# AGENTS.md

WPS Office JS add-in (`wpsjs`) that one-click formats Chinese 公文 (official documents). Vue 3 + Vite, but the core logic is COM-style automation against `window.Application` (WPS Word OA), not browser DOM.

## Commands

- `wpsjs debug` — primary dev loop. Launches WPS with the add-in loaded. `npm run dev` (vite on port 3889) alone will NOT load the ribbon; WPS must host the page.
- `npm run build` → vite output to `dist/`. `wpsjs build` packages the add-in into `wps-addon-build/autoformat.7z` (this is the publishable artifact).
- `npm run pubtodoc` — builds via `wpsjs build` then copies the 7z into `docs/` (GitHub Pages / Netlify install source).
- `npm run lint` — ESLint with `--fix` on `.vue,.js,.jsx,.cjs,.mjs`.
- No test suite, no typecheck. Do not invent npm scripts.

## Architecture you must know before editing

- `src/main.js:10` sets `window.ribbon = ribbon` at module top level. WPS calls `ribbon.OnAddinLoad` immediately after parsing `public/ribbon.xml`; if you move this assignment into `onMounted` or any async hook the ribbon tab silently disappears (regression documented in `.codebuddy/memory/2026-05-31.md`).
- Entry points the framework calls (do not rename without updating `public/ribbon.xml`):
  - `OnAddinLoad`, `OnAction`, `GetImage`, `OnGetEnabled`, `OnGetVisible`, `OnGetLabel` — exported as default in `src/components/ribbon.js`.
- Vue routes: `/dialog`, `/fontwarning`, `/taskpane` are opened via `Application.ShowDialog` (modals). `/formatpanel` is shown in a **dynamically-created task pane** via `Application.CreateTaskPane(url)` — NOT a `<Form>` manifest element (which doesn't create a visible panel in this WPS version). `/memory` is opened via `Application.ShowDialog` (记忆管理面板). `vue-router` uses **hash history** because WPS loads the bundle via `file://` (see `src/router/index.js`, `src/components/js/util.js` `GetRouterHash`). Keep `base: './'` in `vite.config.js` — absolute paths break the file:// load.
- All other dialogs (settings `/dialog`, font warning `/fontwarning`, memory `/memory`) still use `Application.ShowDialog`. Only the format panel uses task-pane navigation.
- `manifest.xml` is copied to the build via the `wpsjs/vite_plugins` `copyFile` plugin. Updating add-in name/description requires editing `manifest.xml` (root), not anything in `dist/`. The `<Form>` element must stay or the task pane disappears.

## 核心工作思路

整个排版系统建立在一个抽象层上，后续所有检测/格式化逻辑都遵循这套抽象。

### 1. BaseTxt 是字符串，与 doc.Range 一一对应

- 遍历 `doc.Paragraphs`，每段取 `para.Range.Text`（含段尾 `\r`），拼接成全文字符串 `baseTxt`。
- WPS 段落标记是单字符 `\r`（实证：`docops.js` 写新段用 `head + '\r' + tail`），与 `doc.Range` 字符位置坐标系一致 —— `baseTxt[i]` 即 `doc.Range(i, i).Text`，无需映射表、无需换算。
- 不 trim 首尾空格：保留原文，指针才精准。检测正则用 `^\s*` 容忍前导空格。
- BaseTxt 是检测的**起点**，检测阶段只在这个字符串上操作，不再触碰 WPS 文档对象。

### 2. 正则全文扫描找匹配区间

- 在 `baseTxt` 字符串上跑正则，`regex.exec` 拿 `match.index` + `match[0].length`，识别特殊元素的字符区间。
- 不再逐段匹配 + 续行合并。标题跨行、标题/正文同行、落款反向收集等语义判断，都用正则在全文字符串上表达。
- 已识别的区间在后续扫描中排除（避免重复标记），具体实现方式按需选择（区间集合 / 标记位图 / 偏移跳跃）。

### 3. result 是指针集合，不存文本副本

- 检测产物 `result = [{ start, length, type, ... }]`，每项是一个**指针**，指向文档中某一区域。
- `start` = 在 `baseTxt`（即 `doc.Range`）中的起始字符位置；`length` = 持续字符数。`end = start + length`，但只存 `start` + `length`，不存 `end`。
- 不存 `text` 字段：指针与内容解耦，需要文本时实时 `doc.Range(start, start+length).Text` 取。
- `...` 表示可按需扩展辅助字段（如 `matched` 标志、续行边界、用户编辑快照），无硬性限制，按需增加。

### 4. start/length 是指向 doc 的指针，精准格式化不扩段

- 格式化时 `doc.Range(start, start+length)` 精准框出该特殊元素的区域，按规则的 `formatSpec` 施加格式。
- **不扩回整段**：不再取 `elRange.Paragraphs.Item(1).Range` 对整段刷格式。这是修"整段被刷成 h2"bug 的关键不变量 —— 检测把标题切到哪，格式化就只刷到哪。
- 段落格式属性（Alignment / Indent）需段落标记才能生效的情况，单独处理：用指针定位所在段落后，只设段落属性，字体属性仍只作用于 `[start, start+length]` 区间。

### 5. 先刷后盖

1. `applyBodyFormat` —— 全文一次性刷正文格式（不跳过任何段）
2. `applySpecialFormat` —— 遍历 result 指针集合，用 `doc.Range(start, start+length)` 精准覆盖特殊元素格式
3. `applyFooterAlignment` —— 落款/日期走字符宽度对齐（仍用指针定位段落，但只调段落属性 + 前导空格，不动字体区间）

### 6. 面板微调：逐字比对 + 灰色提示 + 记忆写回

微调面板（FormatPanel）是用户调教排版结果的核心入口，支持**改类型**和**改文本**两条路径。改文本走"逐字比对"受控流程，不违反"只调格式不改内容"原则（不删字、不改字，只刷格式属性 + 灰色提示）。

**微调核心逻辑（6 步）：**

1. **用户可编辑面板上的文字**：FormatPanel 的元素文字是 `contenteditable`，用户可改文本字段。
2. **特殊元素文字发生变化后，去和原文对应起始位置开始逐字比对**：面板 apply 时，主线程 `mergePanelEdits` 调 `matchDocPrefix(doc, start, panelText)`，从 doc 的 `start` 位置起逐字和面板 text 比对。
3. **一直到第一个不相同的字或结束为止**：`matchDocPrefix` 返回最长公共前缀字符数 `matchedLen`。
4. **记录匹配的长度**，分两侧处理：
   - **a. 面板侧**：此长度内文字保持原样，超过此长度的部分**变灰色**提示用户超出部分与原文不一致。实现：`matched: false` 标记 + FormatPanel 的 `.text-muted { color: #bbb }` 样式。
   - **b. 原文侧**：原文对应位置按 `matchedLen` 保持对应元素格式（一般不变），超过 `matchedLen` 处**变回正文格式**（字体/字号/加粗刷回仿宋三号非加粗），**唯独不处理缩进**（因为缩进会影响整行）。实现：`mergePanelEdits` 对 `[start+matchedLen, start+length]` 区间刷正文格式，`length` 截断为 `matchedLen`。
5. **用户修改的列入记忆**：`recordTypeChanges` 把用户调整过的元素写入 `typememory.json`，记忆格式 `{ text: { type, length } }` —— 记录"某位置有多长属于某特殊格式，文字是什么"。
6. **下次一键排版时，遇到记忆位置逐字比对**：`detect.js` 记忆预认领对每段每条记忆取最长公共前缀：
   - **相符**（公共前缀 >= 记忆 length）→ 按记忆 type 认领该段 length 长度，跳过正则检测。
   - **不相符**（前缀 < 记忆 length）→ 不认领，重新走检测规则，记忆保留（等用户下次微调刷新）。

**关键不变量：**
- `mergePanelEdits` 推入的元素带 `manual: true`，`applySpecialFormat` 据此跳过 `matchDetect` 正则核对（尊重用户手动标记，不被规则拒绝刷回正文）。
- `matched: false` 仅影响面板显示（灰色），不影响格式化（格式化由 `manual` + `matchDocPrefix` 截断后的 length 决定）。
- 记忆格式 `{ text: { type, length } }` 向后兼容旧格式（纯字符串 `"type"`），`detect.js` 和 `MemoryPanel.vue` 都做了兼容处理。

### 数据流

```
doc.Paragraphs
     ↓ 拼接（段尾 \r，与 Range 坐标系一致）
baseTxt = "全文纯文本字符串"   ← 与 doc.Range 字符位置一一对应
     ↓ 正则全文扫描（regex.exec 拿 index + length）
result = [{ start, length, type }, ...]   ← 指针集合，不存文本副本
     ↓ applySpecialFormat
doc.Range(start, start+length) 精准格式化，不扩段
```

### 一句话概括

> 把文档抽象成与 `doc.Range` 一一对应的纯文本字符串（BaseTxt），在字符串上正则扫描出特殊元素的字符区间，用 `{start, length, type}` 指针集合记录这些区间，最后按指针精准格式化对应区域，不扩回整段。


## Module architecture

核心排版逻辑已从 ribbon.js 拆分到独立模块，ribbon.js 仅做调度：

```
src/components/
  ribbon.js              ← 调度层：按钮回调、设置读写、面板通讯
  js/
    version.js           ← 版本号唯一真相源（VERSION 常量）
    rules.js             ← 纯声明式规则表（检测规格 + 格式化规格）
    detect.js            ← 规则解释执行：检测特殊元素
    format.js            ← 规则解释执行：格式化特殊元素
    page.js              ← 页面设置：边距、页码、清除格式
    docops.js            ← 文档操作：段落拆分、删除空行、标题换行
    signature.js         ← 发言人检测（当前未调用，保留备用）
    patterns.js          ← 正则模式、字符宽度测量、文本判断函数
    typememory.js        ← 类型记忆模块（记忆管理面板的读写/记录/清空）
    util.js              ← WPS 工具函数（URL路径、路由哈希）
    systemdemo.js        ← WPS SDK 模板代码
    dialog.js            ← 设置对话框辅助
```

### 声明式规则体系 (`rules.js`)

`RULES` 数组定义了 12 种元素（含 body），每条规则包含：

| 字段 | 说明 |
|------|------|
| `type` | 类型标识（唯一键）：body/docNumber/title/subtitle/attachment/h1/h2/h3/addressee/authorInfo/sig/date |
| `label` | 面板显示名 |
| `priority` | 检测优先级（越小越先；body 无 priority） |
| `detect` | 检测规格对象（由 detect.js 的 `matchDetect` 解释） |
| `formatSpec` | 格式化规格对象（由 format.js 的 `applyFormatSpec` 解释） |
| `special` | 特殊处理规格（headSequence/multiline/region/scanDirection 等） |

**detect 规格 mode**：`pattern`（单正则）、`composite`（组合正则）、`isTitleLike`、`notTitleLike`、`isSpeechSignature`、`patternWithNegate`。支持 `minLength`/`maxLength` 长度约束和 `negateTitleLike`/`negateSpeechSig` 否定约束。

**formatSpec 规格**：`fontKey`（fonts 映射键）、`fontSizeKey`（settings 键）、`alignment`（left/center/right/justify）、`firstIndent`（字符单位）、`bold`（布尔）。

**导出函数**：`RULES`（规则数组）、`getSpecialRules()`（不含 body）、`getRuleByType(type)`、`getTypeLabelMap()`、`getHeadSequenceTypes()`。

### 检测模块 (`detect.js`)

`detectElements(doc)` 两阶段扫描：
1. **头部顺序阶段**：按 `headSequence` 规则从文首依次匹配（attachment → docNumber → title → subtitle）
2. **全文扫描阶段**：其余规则按 priority 遍历剩余位置

核心函数：`matchDetect(text, spec)` 解释 detect 规格、`matchContinuation(text, contSpec)` 解释续行规格、`calcRegionRange(offsetSpec, ctx)` 解释区域约束。

### 格式化模块 (`format.js`)

核心策略（解决格式相互覆盖）：
1. **全文先刷正文格式**（`applyBodyFormat`）— 不跳过任何段落
2. **特殊元素用 start/end 精准覆盖**（`applySpecialFormat`）— `doc.Range(start, end-1)` 精确操作
3. **sig+date 统一走 `applyFooterAlignment`**（字符宽度对齐）

`applyFormatSpec(range, spec, settings, fonts)` 解释 formatSpec 规格。

## btnAutoFormat 主流程

`clearAllFormatting` → `setupPage` → `detectElements(doc)` → `applyBodyFormat`（全文统一）→ `applySpecialFormat`（精准覆盖）→ `boldEnumerations` → `openFormatPanel`（task pane）。

## Format panel（微调面板）

- `FormatPanel.vue` at route `/formatpanel`，通过 `Application.CreateTaskPane` 创建侧边面板（宽度 220px，DockPosition=0 右侧停靠）。
- 面板内容：**纯元素列表**（按公文头部/正文标题/落款区分组）+ 点标签弹出"调整为"右键菜单改类型(含"正文"选项) + 元素文字 `contenteditable` 可编辑 + 底部"取消排版/关闭"按钮。不包含功能区按钮、常用设置等——那些由功能区按钮承担。
- 面板与主窗口不共享 window，**通过 `BroadcastChannel('wps_format_panel')` 即时双向通讯**：
  - 面板挂载后主动发 `{type:'hello'}`，主线程 `handlePanelMessage` 收到即推送 `{type:'init', elements, footerMissing, missingFonts}`（初始数据 + 落款缺失标志 + 字体缺失列表）。
  - 面板编辑/改类型后发 `{type:'apply', elements}`，主线程走 `mergePanelEdits`（删旧+插新+逐字比对+灰色标记）→ `applyBodyFormat` + `applySpecialFormat` + `boldEnumerations`，并回推 `{type:'updateElements', elements}` 同步位置偏移和 `matched`/`matchedLen` 标志。
  - 面板发 `{type:'cancel'}` → 主线程 `undoFormatDocument`；`{type:'close'}` → 仅关闭面板。
  - 面板发 `{type:'disableFontWarning'}` → 主线程写 `settings.disableFontWarning=true` 永久关闭字体缺失提示。
  - 面板发 `{type:'disableFooterWarning'}` → 主线程写 `settings.disableFooterWarning=true` 永久关闭落款缺失提示。
- **微调核心逻辑见上文 §6**：逐字比对 + 超长灰色提示 + 超长刷回正文（不动缩进）+ 记忆写回。
- **面板编辑机制**：`contenteditable` + `:ref` 收集 DOM + 非响应式 `pendingText` 存编辑中文本（不触发 Vue 重渲染，光标稳定）；仅失焦/回车提交，去掉 debounce；`updateElements` 推回时用 `nextTick` + `data-idx` 反查 DOM 重设 innerHTML 显示黑/灰双色。
- **提示条**：落款缺失/字体缺失各一条橙色提示，各有 ✕ 关闭和"不再提示"按钮(永久关闭写 settings)；`init` 推送时重置 dismissed 状态。
- **防重复面板**：`openFormatPanel` 开头检查 `currentTaskPane`，若已存在先关闭旧面板并清理 `currentHealthTimer` 和 `panelBroadcastChannel`，再创建新面板。模块级变量 `currentTaskPane`、`currentHealthTimer`、`panelBroadcastChannel` 跟踪当前面板状态。
- **健康检查**：`currentHealthTimer` 每 2s 一次，仅检测文档切换/关闭（不再轮询 action）；无跨窗口事件能替代此轻量定时器。
- 12 个元素类型：body/docNumber/title/subtitle/attachment/h1/h2/h3/addressee/authorInfo/sig/date。

## Ribbon 按钮分组

功能区分为 4 组：

| 组 | 按钮 | 说明 |
|----|------|------|
| 一键排版 | `btnAutoFormat` 一键排版、`btnUndoFormat` 一键恢复、(标记元素/插入落款)、(标题后换行/删除全部空行)(删除标题末符号/"X是"整句加粗)、`btnDetectSignature` 记忆格式管理 | 核心排版与微调 |
| 功能 | `btnFormatSettings` 固定格式设置、`btnCheckUpdate` 检查更新、`btnAbout` 关于 | 设置与杂项 |

- `btnInsertSignature` 打开落款库对话框（`InsertSignature.vue`，路由 `/insertsig`）：0 个落款提示、1 个直接插入光标处、多个弹窗选择。落款库存储在 `AppDataPath\WPSAutoFormat\signatures.json`，管理见 `js/signature.js`。
- `btnMarkElement` 打开标记对话框（`MarkElement.vue`，路由 `/markelement`）：取当前选区，用户选类型后走 `addSpecialElement` 统一添加流程（含写入记忆）。
- `btnDetectSignature` 打开记忆管理面板（`MemoryPanel.vue`，路由 `/memory`），可查看/删除/清空类型记忆。
- `btnRemoveTitleEndSymbol` 删除标题末尾结束符号（直接扫描全文段落，对每个像 h1/h2/h3/h4/附件 的段落末尾。！？；等符号删除），见 `docops.js` `removeTitleEndSymbols`。
- `btnBoldTitleWithTail` "X是"整句加粗：把每个"一是/二是/.../十二是"开头的整句加粗（从"X是"到下一个结束符号含符号），见 `format.js` `boldTitleWithTail`。

## 添加/删除特殊元素统一流程

- **添加** `addSpecialElement(doc, start, length, type)`：移除重叠旧元素 → push 新元素(manual:true) → 重格式化 → 写记忆 → 刷新面板。
- **删除**(标记为正文)：`mergePanelEdits` body 分支移除元素 + `deleteTypeMemory` 删记忆；刷回正文由 `handlePanelMessage` 的 `applyBodyFormat` 统一完成。
- **面板微调** `mergePanelEdits`：删旧+插新，逐字比对算 matchedLen，决定 matched/matchedLen/length；重格式化/刷面板/写记忆由 `handlePanelMessage` 统一收尾。
- `btnDetectSignature` 打开记忆管理面板（`MemoryPanel.vue`，路由 `/memory`），可查看/删除/清空类型记忆。
- `btnRemoveBlankLines` / `btnSplitTitle` 保持独立逻辑，不经过元素检测系统。

## 关键不变量

- `clearAllFormatting` (page.js) must call `ListFormat.ConvertNumbersToText()` **before** `RemoveNumbers()` for every paragraph, or auto-numbered headings (e.g. "一、") lose their numerals.
- Many WPS API calls throw on unrelated paragraphs; the code is full of `try { ... } catch (e) { }` swallows. This is intentional defensive code, not a smell — leave it. `no-empty` is disabled in `.eslintrc.cjs`.
- When inserting/splitting paragraphs, iterate **backwards** (`for i = count; i >= 1; i--`) to avoid index drift. See `removeBlankLines` in docops.js.
- `splitParagraphAtChar(doc, paraIndex, cutIndex)` is the canonical helper for "cut a paragraph in half"; do not re-implement with `Range.InsertBreak` (loses the leading character of the tail in some WPS builds).

## Ribbon button registry

`public/ribbon.xml` lists buttons in 2 groups (一键排版/功能). Adding/removing a button requires editing both `ribbon.xml` AND the `OnAction` switch + `GetImage` switch in `ribbon.js`.

## Conventions

- 2-space indent, single quotes, no semicolons in JS (Prettier default + `@vue/eslint-config-prettier`). Do **not** add semicolons; existing code is consistent.
- Comments throughout the codebase are in Chinese — match the existing language when adding nearby comments.
- Hard-coded magic numbers (font sizes 16/22, line spacing 28.9, margins 37/35/28/26, page-number style `57`, alignment enums) come from the GB/T 9704 公文 standard. Do not "clean up" these values.
- **版本号管理**：`src/components/js/version.js` 导出 `VERSION` 常量，是版本号的**唯一真相源**。`ribbon.js`（检查更新/关于对话框）和 `Dialog.vue`（设置面板版本显示）均 import 此常量，不得硬编码。`package.json` 的 `version` 和 `docs/index.html` 的 JSON 字段无法 import JS，发版时需手动同步。`version.txt` at `https://wpsautoformat.netlify.app/version.txt` drives the in-app update check.
- **Font warning dialog** (`FontWarning.vue`, route `/fontwarning`): when required fonts are missing, `checkFontsOncePerSession` calls `Application.ShowDialog` to let the user choose replacements. The dialog reads from `window.__fontDialogPending`, stores result in `window.__fontDialogResult`, and calls `window.close()`. If the user checks "以后也使用相同配置", `fontReplacements` is persisted in settings.
- **SVG ribbon icons** live in `public/images/`, numbered 1-7 + `newFromTemp.svg`. Every button needs an entry in both `public/ribbon.xml` and the `GetImage` switch in `ribbon.js`. Icon files use WPS color classes: `skinbaseDark` (gray body), `skinthemeDark` (blue accent).

## Don't

- Don't edit files under `dist/` or `wps-addon-build/` — both are build outputs.
- Don't add a typecheck step or TS — the project is plain JS by choice; `et-jsapi-declare` / `wps-jsapi-declare` are types-only deps used by editors.
- Don't run `wpsjs publish` unless the user asks — it pushes to a remote server.

## ⛔ 强制规定：只调格式，不改内容

**除"删除空行"按钮（`btnRemoveBlankLines`/`removeBlankLines()`）外，所有代码一律不允许修改用户文档的文字内容，只能调整格式属性。**

- **禁止**：插入、删除、替换、追加用户文字内容（包括删字、改字、替换标点）
- **禁止**：用 `Range.Text = ...`、`Range.InsertBefore`、`Range.InsertAfter`、`Range.Delete()` 修改用户的正文文字
- **允许**：用回车/换行调整段落结构（`splitParagraphAtChar` 用 `\r` 拆分段落 ✅）
- **允许**：用 `LeftIndent`/`RightIndent`/`Alignment` 等段落格式属性实现缩进/对齐 ✅
- **允许**：`clearAllFormatting` 中 `ConvertNumbersToText()` 保留自动编号为文字 ✅
- **允许**：`setupPageNumber` 清空/重建页脚页码 ✅
- **允许**：`applyFooterAlignment` 中用**全角空格**（U+3000）调整落款/日期对齐（`rng.Text = spaces + cleanText` ✅）——用户公文操作习惯就是用空格调落款，必须保留空格可见可增删；用全角空格（宽度=1 全角字，与 `charWidth` 全角=1 一致）而非半角空格（仿宋半角空格实际宽度≈0.4 全角字，对不齐），精度准确符合 GB/T 9704-2012
- **唯一例外**：`removeBlankLines()` 可以删除空段落（这是该按钮的明确功能）
- 违反此规定的代码必须立即修复
