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
- 面板与主窗口不共享 window，通过 `Application.PluginStorage` 传递数据：`__formatPanelData`（初始数据）、`__formatPanelAction`（指令：apply/cancel/close）、`__formatPanelEdits`（编辑后的元素 JSON）。
- 主窗口每 500ms 轮询 `__formatPanelAction`。apply 时重新执行 `applyBodyFormat` + `applySpecialFormat` + `boldEnumerations`；cancel 时执行 `undoFormatDocument`；close 时仅关闭面板。
- **防重复面板**：`openFormatPanel` 开头检查 `currentTaskPane`，若已存在先关闭旧面板并清理轮询定时器，再创建新面板。模块级变量 `currentTaskPane` 和 `currentPollTimer` 跟踪当前面板状态。
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
