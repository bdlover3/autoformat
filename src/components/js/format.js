//==============================================================
// 格式化模块
//
// 核心策略（解决格式相互覆盖问题）：
//   1. 全文先按 body 格式化（一次性，不跳过任何段落）
//   2. 特殊元素用 start/end 字符位置精准覆盖格式
//      doc.Range(start, end) 精确操作，不影响其他段落
//   3. sig+date 统一走 applyFooterAlignment（空格对齐）
//
// 格式残留问题解决：
//   setRangeBaseFont → resetParagraphFormat 完整重置所有段落属性
//   （Alignment / LeftIndent / FirstLineIndent / CharacterUnitFirstLineIndent 全部归零）
//   再由 formatSpec 精准覆盖，切换类型时旧格式不留残留
//==============================================================

import { RULES } from './rules.js'
import { measureWidth } from './patterns.js'
import { matchDetect } from './detect.js'

//--- 对齐方式常量 ---

const ALIGN_MAP = {
  left: 0,
  center: 1,
  right: 2,
  justify: 3
}

//--- 格式化基础工具 ---

/** 重置 Range 段落格式属性为干净状态（清除所有残留） */
function resetParagraphFormat(range) {
  range.ParagraphFormat.Alignment = 0  // 左对齐
  range.ParagraphFormat.FirstLineIndent = 0
  range.ParagraphFormat.CharacterUnitFirstLineIndent = 0
  range.ParagraphFormat.CharacterUnitRightIndent = 0
  range.ParagraphFormat.LeftIndent = 0
  range.ParagraphFormat.RightIndent = 0
}

/** 设置 Range 基础字体属性 */
function setRangeBaseFont(range, fontName, lineSpacing) {
  range.Font.Name = fontName
  range.Font.Bold = false
  range.Font.NameAscii = 'Times New Roman'
  range.Font.NameOther = 'Times New Roman'
  range.ParagraphFormat.LineSpacingRule = 4
  range.ParagraphFormat.LineSpacing = lineSpacing
  resetParagraphFormat(range)
}

/**
 * 根据声明式 formatSpec 格式化一个 Range
 * @param {Object} range WPS Range 对象
 * @param {Object} spec 规则的 formatSpec
 * @param {Object} settings 用户设置
 * @param {Object} fonts 可用字体映射
 */
function applyFormatSpec(range, spec, settings, fonts) {
  if (!spec) return

  // 字体
  const fontName = fonts[spec.fontKey] || fonts.bodyFontName
  setRangeBaseFont(range, fontName, settings.lineSpacing)

  // 字号
  if (spec.fontSizeKey && settings[spec.fontSizeKey] != null) {
    range.Font.Size = settings[spec.fontSizeKey]
  }

  // 加粗
  if (spec.bold) {
    range.Font.Bold = true
  }

  // 对齐
  if (spec.alignment && ALIGN_MAP[spec.alignment] != null) {
    range.ParagraphFormat.Alignment = ALIGN_MAP[spec.alignment]
  }

  // 首行缩进（字符单位）
  if (spec.firstIndent != null) {
    range.ParagraphFormat.CharacterUnitFirstLineIndent = spec.firstIndent
    range.ParagraphFormat.FirstLineIndent = 0
  }
}

/**
 * 全文先刷正文格式
 * 不跳过任何段落，一次性统一设置
 * @param {Object} doc
 * @param {Object} settings
 * @param {Function} getAvailableFont
 */
export function applyBodyFormat(doc, settings, getAvailableFont) {
  const bodyRule = RULES.find(r => r.type === 'body')
  if (!bodyRule || !bodyRule.formatSpec) return

  const fonts = { bodyFontName: getAvailableFont(settings.bodyFont, '仿宋') }
  const fullRange = doc.Content
  try {
    applyFormatSpec(fullRange, bodyRule.formatSpec, settings, fonts)
  } catch (e) { }
}

/**
 * 特殊元素精准覆盖格式（遵循 AGENTS.md "核心工作思路" 第4条）。
 *
 * 用 doc.Range(start, start+length) 精准框出元素区域，按 formatSpec 施加格式。
 * **不扩回整段**：不再对整段刷格式。
 *   —— 这是修"（一）建立XXXX 整段被刷成 h2"bug 的关键不变量。
 *
 * 段落格式属性（Alignment / Indent）需段落标记才能生效：用指针定位所在段落后，
 * 只设段落属性（段落属性无法只作用于区间，必须整段）；字体属性只作用于
 * [start, start+length] 区间。
 *
 * @param {Object} doc
 * @param {Object} settings
 * @param {Array} elements 指针集合 [{ start, length, type, ... }]
 * @param {Function} getAvailableFont
 * @returns {Array} sig+date 位置更新信息（供调用方同步指针）
 */
export function applySpecialFormat(doc, settings, elements, getAvailableFont) {
  if (!Array.isArray(elements) || elements.length === 0) return []

  const fonts = {
    titleFontName: getAvailableFont(settings.titleFont, '黑体'),
    bodyFontName: getAvailableFont(settings.bodyFont, '仿宋'),
    h1FontName: getAvailableFont(settings.h1Font, '黑体'),
    h2FontName: getAvailableFont(settings.h2Font, '楷体'),
    h3FontName: getAvailableFont(settings.h3Font, '仿宋'),
    subtitleFontName: getAvailableFont(settings.h2Font, '楷体')
  }

  const bodyRule = RULES.find(r => r.type === 'body')
  const sigGroup = []

  for (const el of elements) {
    if (!el || typeof el.start !== 'number' || typeof el.length !== 'number') continue

    // sig+date 统一走字符宽度对齐
    if (el.type === 'sig' || el.type === 'date') {
      sigGroup.push(el)
      continue
    }

    const segStart = el.start
    const segEnd = el.start + el.length  // 不含段尾 \r

    // 取元素区段文本（用于核对是否仍匹配规则）
    let elText = ''
    let segRange = null
    try {
      segRange = doc.Range(segStart, segEnd)
      elText = segRange.Text.replace(/[\r\n]+$/, '').trim()
    } catch (e) { continue }

    // 定位所在段落（用于设段落格式属性：Alignment / Indent）
    // 段落属性必须作用于含段落标记的完整段落才能生效。
    // 跨段指针（标题续行合并）：segRange 跨多段，需对所有段都设段落格式，
    // 否则续行段保留 applyBodyFormat 刷的正文缩进，第二行标题变成正文缩进。
    let paraRanges = []
    try {
      const paras = segRange.Paragraphs
      const pCount = paras.Count
      for (let pi = 1; pi <= pCount; pi++) {
        paraRanges.push(paras.Item(pi).Range)
      }
    } catch (e) { }

    // 先重置所有相关段为正文格式（清除旧格式残留）
    if (bodyRule && bodyRule.formatSpec) {
      for (const pr of paraRanges) {
        try {
          applyFormatSpec(pr, bodyRule.formatSpec, settings, fonts)
        } catch (e) { }
      }
    }

    // 核对当前文本是否仍匹配该类型规则
    // manual=true 表示用户手动标记，跳过正则核对，直接刷格式（尊重用户意图）
    const rule = RULES.find(r => r.type === el.type)
    if (rule && rule.formatSpec) {
      const detectSpec = rule.detect
      const matched = el.manual ? true : (detectSpec ? matchDetect(elText, detectSpec) : true)
      if (matched) {
        // 段落格式属性（Alignment / Indent）作用于所有相关段（跨段指针时含续行段）
        for (const pr of paraRanges) {
          try {
            if (rule.formatSpec.alignment && ALIGN_MAP[rule.formatSpec.alignment] != null) {
              pr.ParagraphFormat.Alignment = ALIGN_MAP[rule.formatSpec.alignment]
            }
            if (rule.formatSpec.firstIndent != null) {
              pr.ParagraphFormat.CharacterUnitFirstLineIndent = rule.formatSpec.firstIndent
              pr.ParagraphFormat.FirstLineIndent = 0
            }
          } catch (e) { }
        }
        // 字体属性只作用于 [segStart, segEnd] 区间（精准，不扩段）
        try {
          const fontName = fonts[rule.formatSpec.fontKey] || fonts.bodyFontName
          segRange.Font.Name = fontName
          // 加粗：优先读 settings[boldKey]（h1/h2/h3 可配置），回退到 formatSpec.bold
          const boldVal = rule.formatSpec.boldKey && settings[rule.formatSpec.boldKey] != null
            ? !!settings[rule.formatSpec.boldKey]
            : !!rule.formatSpec.bold
          segRange.Font.Bold = boldVal
          segRange.Font.NameAscii = 'Times New Roman'
          segRange.Font.NameOther = 'Times New Roman'
          if (rule.formatSpec.fontSizeKey && settings[rule.formatSpec.fontSizeKey] != null) {
            segRange.Font.Size = settings[rule.formatSpec.fontSizeKey]
          }
        } catch (e) { }
      } else {
        // 不匹配：正文格式（无缩进）
        for (const pr of paraRanges) {
          try {
            pr.ParagraphFormat.CharacterUnitFirstLineIndent = 0
            pr.ParagraphFormat.FirstLineIndent = 0
          } catch (e) { }
        }
        el.matched = false
      }
    }
  }

  // sig+date 分组对齐，返回位置更新信息
  if (sigGroup.length > 0) {
    return applyFooterAlignment(doc, settings, sigGroup, getAvailableFont)
  }
  return []
}

/**
 * 落款 + 日期：字符宽度对齐
 * 使用 start/end 字符位置定位段落，不依赖 paraIndex
 * @param {Object} doc
 * @param {Object} settings
 * @param {Array} sigGroup 落款+日期元素列表
 * @param {Function} getAvailableFont
 */
export function applyFooterAlignment(doc, settings, sigGroup, getAvailableFont) {
  const lineCharCount = calcLineCharCount(doc, settings)
  const bodyFontName = getAvailableFont(settings.bodyFont, '仿宋')

  // 收集 sig（发文机关署名）与 date（成文日期），按文档位置排序
  const lines = []
  for (const el of sigGroup) {
    if (typeof el.start !== 'number' || typeof el.length !== 'number') continue

    // 用 start/length 定位段落，不依赖 paraIndex
    let raw = ''
    let paraStart = 0
    let paraEnd = 0
    try {
      const rng = doc.Range(el.start, el.start + el.length)
      // trim 时必须显式去掉全角空格 U+3000——JS 的 \s 默认不匹配全角空格，
      // 上次排版塞的前导全角空格会残留在 raw 里，measureWidth 把它算进宽度，
      // 导致 padW 偏小甚至 0，落款右侧没有 rightBlank 的空隙。
      raw = rng.Text.replace(/[\r\n]+$/, '').replace(/^[\s\u3000]+/, '').replace(/[\s\u3000]+$/, '')
      // 获取段落对象以设置格式属性
      const para = rng.Paragraphs.Item(1)
      paraStart = para.Range.Start
      paraEnd = para.Range.End
    } catch (e) {
      continue
    }

    //落款对齐写回的文本必须用 doc 实时文本，不能用 el.text 旧快照——
    //否则用户在 doc 里编辑（删空格等）后，用旧快照覆盖会把用户编辑的内容冲掉删没。
    //el.text 是面板编辑快照，仅供面板显示用；格式化以 doc 当前内容为准。
    const cleanText = raw
    lines.push({ type: el.type, start: el.start, length: el.length, paraStart, paraEnd, text: cleanText })
  }
  lines.sort((a, b) => a.start - b.start)

  //重置每段格式（paraEnd 含段落标记，不 -1，确保段落属性完整生效）
  for (const line of lines) {
    try {
      const range = doc.Range(line.paraStart, line.paraEnd)
      setRangeBaseFont(range, bodyFontName, settings.lineSpacing)
      range.Font.Size = settings.bodyFontSize
    } catch (e) { }
  }

  //测量每行宽度（半字符单位，中文字=1，半角字符=0.5）
  for (const line of lines) {
    line.width = measureWidth(line.text)
  }

  // GB/T 9704-2012 不加盖印章公文排版规则（7.3.5.2）：
  //   默认：发文机关署名右空二字；成文日期在署名下一行，首字比署名首字右移二字。
  //   日期长于署名时：成文日期右空二字编排，并相应增加发文机关署名右空字数
  //   （署名首字追齐日期首字，使日期右空二字固定）。
  //
  // 关键不变量：署名右端和日期右端都对齐到"版心右边缘 - 2 字"（两者右端对齐），
  // 日期首字比署名首字右移 2 字是通过"署名整体左移 2 字"实现（署名 rightBlank 加 2），
  // 不是通过"日期减少 rightBlank"实现——否则日期右端会超出署名右端，对不上。
  //
  // 署名允许 1 行或 2 行（detect.js processFooter 最多收集 2 行 sig）：
  //   多行署名视为一个整体，所有 sig 行共用同一 rightBlank，各行右端对齐。
  //   署名整体宽度 sigW 取各行宽度的最大值（最宽行决定署名整体的右端）。
  //
  // 设 sigW=署名整体宽（各行最宽），dateW=日期宽：
  //   dateW <= sigW：署名 rightBlank = 2 + 2 = 4（署名左移让日期首字右移2字），日期 rightBlank = 2
  //   dateW >  sigW：日期 rightBlank = 2，署名 rightBlank = 2 + (dateW - sigW) + 2
  //                 （署名追齐日期首字再多空2字，让日期首字仍比署名首字右移2字）
  // 简化：两者右端都对齐到版心右边缘减 2 字；署名整体比日期左移 2 字（署名 rightBlank = 日期 rightBlank + 2）。
  const sigLines = lines.filter(l => l.type === 'sig')
  const dateLine = lines.find(l => l.type === 'date')
  const sigW = sigLines.reduce((m, l) => (l.width > m ? l.width : m), 0)
  const dateW = dateLine ? dateLine.width : 0
  const bothPresent = sigLines.length > 0 && dateLine
  const dateLonger = bothPresent && dateW > sigW

  // 日期右端距版心右边缘 2 字（固定）
  const dateRightBlankFinal = 2
  // 署名右端距版心右边缘 = 2 + 2 = 4 字（署名整体左移 2 字，让日期首字比署名首字右移 2 字）
  // 日期长于署名时，署名还要追齐日期首字：署名 rightBlank = 4 + (dateW - sigW)
  const sigRightBlankFinal = bothPresent
    ? (dateLonger ? 4 + (dateW - sigW) : 4)
    : 2

  // 计算每行的右空字数
  for (const line of lines) {
    if (line.type === 'sig') {
      line.rightBlank = Math.max(0, sigRightBlankFinal)
    } else if (line.type === 'date') {
      line.rightBlank = Math.max(0, dateRightBlankFinal)
    } else {
      // 非 sig/date 的辅助行：右空二字兜底
      line.rightBlank = 2
    }
  }

  //用全角空格实现前导缩进——关键：用全角空格（U+3000），不用半角空格。
  //全角空格宽度 = 1 全角字，与 charWidth 的全角=1 完全一致，精度准确，对得齐。
  //用户可见空格、可手动增删调整，符合公文用户的操作习惯。
  //padW 是全角字单位宽度，全角空格数 = padW（1 全角空格 = 1 全角字宽）
  //逆序处理：从文档末尾往前写，避免前导空格插入导致后续行字符位置偏移
  const posUpdates = []
  const docEnd = (function () { try { return doc.Content.End } catch (e) { return 0 } })()
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]
    // 前导宽度 = 行宽 - 文本宽度 - 右空字数（保证右端距行尾 rightBlank 字）
    // 安全余量 -1：measureWidth 对半角数字/字母按 0.5 全角字估算，但仿宋里混排 Times New Roman
    // 半角数字实际宽度略大于 0.5，累积偏差会让 padW 偏大，顶满版心时把末字挤到第二行。
    // 用 Math.floor 且预留 1 字余量，宁可右空多 1 字也不挤换行。
    const padW = Math.max(0, lineCharCount - line.width - line.rightBlank - 1)
    const fullSpaces = Math.floor(padW)  // 全角空格数（向下取整，保守不挤换行）
    let spaces = ''
    for (let j = 0; j < fullSpaces; j++) spaces += '\u3000'  // 全角空格 U+3000
    try {
      //防御性校验：el.start/el.length 合理，越界跳过
      if (typeof line.start !== 'number' || typeof line.length !== 'number') continue
      if (line.length <= 0) continue
      if (docEnd > 0 && line.start + line.length > docEnd) continue

      //关键防删字：只动"段首到原文本起点"之间的前导空格，绝不碰原文本区间
      //[line.start, line.start+line.length] 是原文本（detect 时 trim 后的位置），
      //不管用户删换行导致段落怎么合并，这个区间内的文字保持不变。
      //[line.paraStart, line.start) 是段首到原文本前的前导区（含上次塞的旧空格），
      //把旧前导删掉，换成新全角空格。
      const textStart = line.start

      //1) 删旧前导空格 [paraStart, textStart)——只删空格和全角空格，遇非空格即停（保住段首若有缩进外的内容）
      let leadEnd = textStart
      while (leadEnd > line.paraStart) {
        const ch = doc.Range(leadEnd - 1, leadEnd).Text
        if (ch === ' ' || ch === '\u3000' || ch === '\t') {
          leadEnd--
        } else {
          break
        }
      }
      if (leadEnd < textStart) {
        doc.Range(leadEnd, textStart).Delete()  // 删旧前导空格
        // 删除后原文本位置 = leadEnd，长度不变，在 leadEnd 处插新空格
        const insertPos = leadEnd
        //2) 插新全角空格
        if (spaces) {
          doc.Range(insertPos, insertPos).InsertBefore(spaces)
        }
        //3) 设段落格式（用插完空格后的段落）
        const newPara = doc.Range(insertPos, insertPos + spaces.length + line.length).Paragraphs.Item(1)
        const pRange = newPara.Range
        pRange.ParagraphFormat.Alignment = 0  // 左对齐（空格控制缩进）
        pRange.ParagraphFormat.LeftIndent = 0
        pRange.ParagraphFormat.RightIndent = 0
        pRange.ParagraphFormat.FirstLineIndent = 0
        pRange.ParagraphFormat.CharacterUnitFirstLineIndent = 0
        posUpdates.push({ oldStart: line.start, newStart: insertPos + spaces.length, newLength: line.length })
      } else {
        //无旧前导空格（leadEnd === textStart），直接在 textStart 前插空格
        if (spaces) {
          doc.Range(textStart, textStart).InsertBefore(spaces)
        }
        const newPara = doc.Range(textStart, textStart + spaces.length + line.length).Paragraphs.Item(1)
        const pRange = newPara.Range
        pRange.ParagraphFormat.Alignment = 0
        pRange.ParagraphFormat.LeftIndent = 0
        pRange.ParagraphFormat.RightIndent = 0
        pRange.ParagraphFormat.FirstLineIndent = 0
        pRange.ParagraphFormat.CharacterUnitFirstLineIndent = 0
        posUpdates.push({ oldStart: line.start, newStart: textStart + spaces.length, newLength: line.length })
      }
    } catch (e) { }
  }
  return posUpdates
}

/**
 * 加粗"一是""二是"等枚举词
 */
export function boldEnumerations(doc) {
  const enumPattern = /[一二三四五六七八九十]+是/g
  const fullRange = doc.Content
  const text = fullRange.Text

  let match
  while ((match = enumPattern.exec(text)) !== null) {
    try {
      const startOffset = match.index
      const endOffset = startOffset + match[0].length
      const rng = doc.Range(fullRange.Start + startOffset, fullRange.Start + endOffset)
      rng.Font.Bold = true
    } catch (e) { }
  }
}

/**
 * 计算版心可容纳的全角字符数（用于落款空格对齐的行宽基准）。
 *
 * 不用纯几何理论值（版心宽/字号）——WPS 里仿宋字实际字宽含字间距，
 * 比字号略大，理论算 28 字实际只能放 27 字。用实测校准值：
 *   三号 16 磅 → 每行 27 字（实测）
 *   17 磅      → 每行 26 字（实测）
 * 规律：字号每 +1 磅，每行字数 -1。按此线性插值。
 *
 * PageSetup 取得到时用版心宽校验（防用户改边距），否则用字号映射。
 */
export function calcLineCharCount(doc, settings) {
  //字号 → 每行字数映射（实测校准）：16磅=27字，字号每+1磅字数-1
  const fontSize = settings && typeof settings.bodyFontSize === 'number' ? settings.bodyFontSize : 16
  let charsBySize = 27 - (fontSize - 16)
  if (charsBySize < 1) charsBySize = 27

  try {
    const ps = doc.PageSetup
    const contentWidthPt = ps.PageWidth - ps.LeftMargin - ps.RightMargin
    //用版心宽校验：若用户改了边距导致版心宽变化，按比例调整字数
    //标准版心宽 = 156mm = 442.26 磅（210-28-26mm）
    const standardWidthPt = 156 * 2.835
    if (contentWidthPt > 0 && Math.abs(contentWidthPt - standardWidthPt) > 5) {
      //版心宽偏离标准 5 磅以上，按比例调整
      charsBySize = Math.round(charsBySize * contentWidthPt / standardWidthPt)
    }
    if (charsBySize > 0) return charsBySize
  } catch (e) { }
  return charsBySize
}

/**
 * "X是"整句加粗：遍历全文，把每个"一是/二是/.../十二是"开头的整句加粗，
 * 范围从"X是"起，到第一个结束符号（。！？）含符号为止。
 *
 * 只加粗"X是"句本身，不影响前面的标题或正文（修"把前面内容都加粗"bug）。
 * 不改文字内容，只设 Font.Bold，合规。
 *
 * 实现思路（与 AGENTS.md "BaseTxt 与 doc.Range 一一对应"思路一致）：
 *   1. 拼全文 baseTxt，与 doc.Range 字符位置一一对应
 *   2. 正则全文扫描所有"X是"位置（不跨段，避免误吞）
 *   3. 从每个"X是"位置向后找第一个结束符号，框定加粗区间
 *   4. 用 doc.Range(start, end) 精准加粗，不扩段
 */
export function boldTitleWithTail(doc) {
  if (!doc) return
  const fullRange = doc.Content
  const text = fullRange.Text
  if (!text) return

  // "一是/二是/.../十二是" —— 段首或开头才认（避免把句中"一是"误吞）
  // 数字范围 一..十二，限制最多十二是（再多不常见，按用户要求）
  // 模式：(^|\r|。！？；：)\s{0,4}([一二三四五六七八九十]+)是
  // 用 exec 全文扫描，match.index 指向"X是"的"X"位置
  const xsPattern = /(?:^|[\r。！？；：])\s{0,4}([一二三四五六七八九十]{1,3})是/g
  const endSymbol = /[。！？]/

  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('"X是"整句加粗')
  } catch (e) { }

  try {
    let match = null
    while ((match = xsPattern.exec(text)) !== null) {
      // 数字部分要限制在 一..十二 范围内
      const numStr = match[1]
      if (!isValidXsNumber(numStr)) {
        // 继续往后找（防止陷入死循环：exec lastIndex 已前进）
        continue
      }
      // "X是"在 match 中的起始偏移：match[0] 包含前导符号/空白，需定位到数字位置
      // match[0] 形如 "。\n一是" / "一是" / "\r二是"，数字偏移 = match[0].length - numStr.length - 1（"是"占1）
      const xsStartOffset = match.index + (match[0].length - numStr.length - 1)
      // 映射到 doc.Range 坐标
      const xsStart = fullRange.Start + xsStartOffset
      // 向后找第一个结束符号（最多扫 500 字避免越界）
      const scanText = text.substring(xsStartOffset, xsStartOffset + 500)
      let endIdx = -1
      for (let j = 0; j < scanText.length; j++) {
        const ch = scanText.charAt(j)
        if (ch === '\r') break  // 换段了还没遇到结束符号，不再加粗（避免吞下一段）
        if (endSymbol.test(ch)) { endIdx = j; break }
      }
      if (endIdx < 0) continue  //无结束符号，跳过

      //加粗 [xsStart, xsStart + endIdx + 1]（含结束符号）
      try {
        const rng = doc.Range(xsStart, xsStart + endIdx + 1)
        rng.Font.Bold = true
      } catch (e) { }
    }
  } catch (e) {
    console.warn('[boldTitleWithTail] failed:', e)
  } finally {
    if (undoRecord) {
      try { undoRecord.EndCustomRecord() } catch (e2) { }
    }
  }
}

/** 校验"X是"中的数字是否在 一..十二 范围内 */
function isValidXsNumber(numStr) {
  // 一..十 直接对应
  const simple = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  if (simple.includes(numStr)) return true
  // 十一、十二
  if (numStr === '十一' || numStr === '十二') return true
  return false
}
