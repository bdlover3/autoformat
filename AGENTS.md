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
- Vue routes: `/dialog`, `/fontwarning`, `/taskpane` are opened via `Application.ShowDialog` (modals). `/formatpanel` is shown in a **dynamically-created task pane** via `Application.CreateTaskPane(url)` — NOT a `<Form>` manifest element (which doesn't create a visible panel in this WPS version). `vue-router` uses **hash history** because WPS loads the bundle via `file://` (see `src/router/index.js`, `src/components/js/util.js` `GetRouterHash`). Keep `base: './'` in `vite.config.js` — absolute paths break the file:// load.
- All other dialogs (settings `/dialog`, font warning `/fontwarning`) still use `Application.ShowDialog`. Only the format panel uses task-pane navigation.
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

### 6. 面板微调的是位置指针，与文章内容解耦

- FormatPanel 显示的元素 = result 指针集合的可视化。用户看到的是"某位置是什么类型"，改的是"某位置该是什么类型"。
- 改类型：修改该指针的 `type`，重新走 `applySpecialFormat` 即可，不动文本内容。
- 改文本：用户编辑元素文字属于"改内容"，按 GB/T 9704 公文标准与本项目"只调格式不改内容"原则，面板编辑文本写回文档走单独受控路径（落款/日期空格对齐是唯一例外）。

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
  ribbon.js              ← 调度层：按钮回调、设置读写、面板轮询
  js/
    rules.js             ← 纯声明式规则表（检测规格 + 格式化规格）
    detect.js            ← 规则解释执行：检测特殊元素
    format.js            ← 规则解释执行：格式化特殊元素
    page.js              ← 页面设置：边距、页码、清除格式
    docops.js            ← 文档操作：段落拆分、删除空行、标题换行
    signature.js         ← 署名检测（独立按钮）
    patterns.js          ← 正则模式、字符宽度测量、文本判断函数
    util.js              ← WPS 工具函数（URL路径、路由哈希）
    systemdemo.js        ← WPS SDK 模板代码
    dialog.js            ← 设置对话框辅助
```

### 声明式规则体系 (`rules.js`)

`RULES` 数组定义了 12 种元素（含 body），每条规则包含：

| 字段 | 说明 |
|------|------|
| `type` | 类型标识（唯一键）：body/docNumber/title/subtitle/attachment/h1/h2/h3/addressee/signature/sig/date |
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
- 面板与主窗口不共享 window，**通过 `BroadcastChannel('wps_format_panel')` 即时双向通讯**（不再使用 PluginStorage 轮询）：
  - 面板挂载后主动发 `{type:'hello'}`，主线程 `handlePanelMessage` 收到即推送 `{type:'init', elements, footerMissing}`（初始数据 + 落款缺失标志）。
  - 面板编辑/改类型后发 `{type:'apply', elements}`，主线程重新执行 `applyBodyFormat` + `applySpecialFormat` + `boldEnumerations`，并回推 `{type:'updateElements', elements}` 同步位置偏移。
  - 面板发 `{type:'cancel'}` → 主线程 `undoFormatDocument`；`{type:'close'}` → 仅关闭面板。
- **"未检测到落款或发言人"提示**：不再用 `alert` 打断，`autoFormatDocument` 检测后设置模块变量 `footerMissing`，随 `init` 消息推给面板，面板顶部渲染橙色提示条。
- **防重复面板**：`openFormatPanel` 开头检查 `currentTaskPane`，若已存在先关闭旧面板并清理 `currentHealthTimer` 和 `panelBroadcastChannel`，再创建新面板。模块级变量 `currentTaskPane`、`currentHealthTimer`、`panelBroadcastChannel` 跟踪当前面板状态。
- **健康检查**：`currentHealthTimer` 每 2s 一次，仅检测文档切换/关闭（不再轮询 action）；无跨窗口事件能替代此轻量定时器。
- 12 个元素类型：body/docNumber/title/subtitle/attachment/h1/h2/h3/addressee/signature/sig/date。

## 其他独立按钮

- `btnDetectSignature` / `btnRemoveBlankLines` / `btnSplitTitle` keep their original logic — they do NOT route through the element detection system.

## 关键不变量

- `clearAllFormatting` (page.js) must call `ListFormat.ConvertNumbersToText()` **before** `RemoveNumbers()` for every paragraph, or auto-numbered headings (e.g. "一、") lose their numerals.
- Many WPS API calls throw on unrelated paragraphs; the code is full of `try { ... } catch (e) { }` swallows. This is intentional defensive code, not a smell — leave it. `no-empty` is disabled in `.eslintrc.cjs`.
- When inserting/splitting paragraphs, iterate **backwards** (`for i = count; i >= 1; i--`) to avoid index drift. See `removeBlankLines` in docops.js.
- `splitParagraphAtChar(doc, paraIndex, cutIndex)` is the canonical helper for "cut a paragraph in half"; do not re-implement with `Range.InsertBreak` (loses the leading character of the tail in some WPS builds).

## Ribbon button registry

`public/ribbon.xml` lists buttons (in display order): `btnAutoFormat`, `btnUndoFormat`, `btnDetectSignature`, `btnRemoveBlankLines`, `btnSplitTitle`, `btnFormatSettings`, `btnCheckUpdate`, `btnAbout`. Adding/removing a button requires editing both `ribbon.xml` AND the `OnAction` switch + `GetImage` switch in `ribbon.js`.

## Conventions

- 2-space indent, single quotes, no semicolons in JS (Prettier default + `@vue/eslint-config-prettier`). Do **not** add semicolons; existing code is consistent.
- Comments throughout the codebase are in Chinese — match the existing language when adding nearby comments.
- Hard-coded magic numbers (font sizes 16/22, line spacing 28.9, margins 37/35/28/26, page-number style `57`, alignment enums) come from the GB/T 9704 公文 standard. Do not "clean up" these values.
- `CURRENT_VERSION` in `ribbon.js`, `version` in `package.json`, the About-dialog string, and `docs/index.html` must all be bumped together on release. `version.txt` at `https://wpsautoformat.netlify.app/version.txt` drives the in-app update check.
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
- **允许**：`applyFooterAlignment` 中用前导空格调整落款/日期对齐（`rng.Text = spaces + cleanText` ✅）——`LeftIndent` 无法表达半字符偏移，空格对齐是唯一可靠方式
- **唯一例外**：`removeBlankLines()` 可以删除空段落（这是该按钮的明确功能）
- 违反此规定的代码必须立即修复
