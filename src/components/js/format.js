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
import { measureWidth, h1Pattern, h2Pattern, h3Pattern } from './patterns.js'
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
      raw = rng.Text.replace(/[\r\n]+$/, '').replace(/\s+$/, '')
      // 获取段落对象以设置格式属性
      const para = rng.Paragraphs.Item(1)
      paraStart = para.Range.Start
      paraEnd = para.Range.End
    } catch (e) {
      continue
    }

    //优先使用面板编辑后的 text
    const editedText = (el.text == null) ? raw : String(el.text).replace(/[\r\n]+$/, '').replace(/\s+$/, '')
    lines.push({ type: el.type, start: el.start, length: el.length, paraStart, paraEnd, text: editedText })
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

  // GB/T 9704-2012 不加盖印章公文排版规则：
  //   默认：发文机关署名右空二字；成文日期在署名下一行，首字比署名首字右移二字。
  //   日期长于署名时：成文日期右空二字编排，并相应增加发文机关署名右空字数
  //   （署名首字追齐日期首字，使日期右空二字固定）。
  //
  // 署名允许 1 行或 2 行（detect.js processFooter 最多收集 2 行 sig）：
  //   多行署名视为一个整体，所有 sig 行共用同一 rightBlank，各行右端对齐，
  //   署名整体右端距行尾 rightBlank 字。署名宽度 sigW 取各行宽度的最大值
  //   （最宽行决定署名整体的右端，也是日期首字右移2字的参照）。
  //
  // 设 sigW=署名整体宽（各行最宽），dateW=日期宽，s=署名右空字数，d=日期右空字数：
  //   dateW <= sigW：s=2，d = sigW - dateW        （日期首字比署名首字右移2字）
  //   dateW >  sigW：d=2，s = 2 + (dateW - sigW)   （署名首字追齐日期首字，日期右空2字）
  // 每行前导宽度 = 行宽 - 文本宽 - 右空字数（保证右端距行尾 rightBlank 字）
  const sigRightBlank = 2   // 默认署名右空二字
  const dateRightBlank = 2  // 日期右空二字基准
  const sigLines = lines.filter(l => l.type === 'sig')
  const dateLine = lines.find(l => l.type === 'date')
  // 署名整体宽度 = 各 sig 行最宽者（无 sig 行则 0）
  const sigW = sigLines.reduce((m, l) => (l.width > m ? l.width : m), 0)
  const dateW = dateLine ? dateLine.width : 0
  const bothPresent = sigLines.length > 0 && dateLine
  const dateLonger = bothPresent && dateW > sigW

  // 计算署名整体的右空字数（所有 sig 行共用）与日期的右空字数
  const sigRightBlankFinal = bothPresent
    ? (dateLonger ? dateRightBlank + (dateW - sigW) : sigRightBlank)
    : sigRightBlank
  const dateRightBlankFinal = bothPresent
    ? (dateLonger ? dateRightBlank : (sigW - dateW))
    : dateRightBlank

  // 计算每行的右空字数
  for (const line of lines) {
    if (line.type === 'sig') {
      line.rightBlank = Math.max(0, sigRightBlankFinal)
    } else if (line.type === 'date') {
      line.rightBlank = Math.max(0, dateRightBlankFinal)
    } else {
      // 非 sig/date 的辅助行：右空二字兜底
      line.rightBlank = sigRightBlank
    }
  }

  //用半角空格实现前导缩进（半角空格宽度约0.5半字符单位）
  //padW 是半字符单位宽度，半角空格数 = padW / 0.5 = padW * 2
  //逆序处理：从文档末尾往前写，避免前导空格插入导致后续行字符位置偏移
  const posUpdates = []
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]
    // 前导宽度 = 行宽 - 文本宽度 - 右空字数（保证右端距行尾 rightBlank 字）
    const padW = Math.max(0, lineCharCount - line.width - line.rightBlank)
    const halfSpaces = Math.round(padW * 2)  // 半角空格数
    let spaces = ''
    for (let j = 0; j < halfSpaces; j++) spaces += ' '  // 半角空格
    try {
      const rng = doc.Range(line.paraStart, line.paraEnd - 1)
      rng.ParagraphFormat.Alignment = 0  // 左对齐（空格控制缩进）
      rng.ParagraphFormat.LeftIndent = 0
      rng.ParagraphFormat.RightIndent = 0
      rng.ParagraphFormat.FirstLineIndent = 0
      rng.ParagraphFormat.CharacterUnitFirstLineIndent = 0
      const cleanText = line.text
      rng.Text = spaces + cleanText
      // 写回后位置可能变化，返回更新
      const newPara = rng.Paragraphs.Item(1)
      posUpdates.push({ oldStart: line.start, newStart: newPara.Range.Start, newLength: newPara.Range.End - newPara.Range.Start })
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
 * 计算版心可容纳的字符数
 */
export function calcLineCharCount(doc, settings) {
  try {
    const ps = doc.PageSetup
    const contentWidthPt = ps.PageWidth - ps.LeftMargin - ps.RightMargin
    const charPt = settings.bodyFontSize
    const n = Math.floor(contentWidthPt / charPt)
    if (n > 0) return n
  } catch (e) { }
  return 28
}

/**
 * "一是"整句加粗：一、二、三、(一)(二)(三)1.2.3.等标题不止本身加粗，
 * 标题后第一个句号/问号/叹号前的正文也加粗。
 * 按钮明确功能 = 加粗格式，不改文字内容，合规。
 */
export function boldTitleWithTail(doc) {
  if (!doc) return
  const fullRange = doc.Content
  const text = fullRange.Text
  if (!text) return

  //标题起始模式：一、(一)1. 等
  const titlePatterns = [h1Pattern, h2Pattern, h3Pattern]
  const endSymbol = /[。！？]/

  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('"一是"整句加粗')
  } catch (e) { }

  try {
    //逐段扫，找到标题段后，从标题开始加粗到第一个结束符号（含符号）
    const paragraphs = doc.Paragraphs
    const count = paragraphs.Count
    for (let i = 1; i <= count; i++) {
      let para = null
      try { para = paragraphs.Item(i) } catch (e) { continue }
      if (!para) continue
      const paraText = para.Range.Text.replace(/[\r\n]+$/, '')
      if (!paraText) continue
      //是否标题开头
      let isTitle = false
      for (const pat of titlePatterns) {
        if (pat && pat.test(paraText)) { isTitle = true; break }
      }
      if (!isTitle) continue

      //从标题段起点开始，找第一个结束符号（跨段也找，但限制最多扫 500 字避免越界）
      const paraStart = para.Range.Start
      const scanText = text.substring(paraStart - fullRange.Start, paraStart - fullRange.Start + 500)
      let endIdx = -1
      for (let j = 0; j < scanText.length; j++) {
        if (endSymbol.test(scanText.charAt(j))) { endIdx = j; break }
      }
      if (endIdx < 0) continue  //无结束符号，跳过

      //加粗 [paraStart, paraStart + endIdx + 1]（含结束符号）
      try {
        const rng = doc.Range(paraStart, paraStart + endIdx + 1)
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
