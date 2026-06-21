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
 * 特殊元素精准覆盖格式
 * 先重置为正文格式再覆盖，确保从任意类型切换时旧格式不留残留
 * 使用完整段落范围（含段落标记）设置段落格式，确保 Alignment/Indent 正确生效
 * @param {Object} doc
 * @param {Object} settings
 * @param {Array} elements 特殊要素列表
 * @param {Function} getAvailableFont
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
    if (!el || typeof el.start !== 'number' || typeof el.end !== 'number') continue

    // sig+date 统一走字符宽度对齐
    if (el.type === 'sig' || el.type === 'date') {
      sigGroup.push(el)
      continue
    }

    // 获取完整段落范围（含段落标记），段落格式属性需要段落标记才能正确生效
    let fullParaRange = null
    let elText = ''
    try {
      const elRange = doc.Range(el.start, el.end - 1)
      elText = elRange.Text.replace(/[\r\n]+$/, '').trim()
      fullParaRange = elRange.Paragraphs.Item(1).Range
    } catch (e) { continue }

    // 先重置为正文格式，清除旧格式残留
    if (bodyRule && bodyRule.formatSpec) {
      try {
        applyFormatSpec(fullParaRange, bodyRule.formatSpec, settings, fonts)
      } catch (e) { }
    }

    // 核对当前文本是否仍匹配该类型规则
    const rule = RULES.find(r => r.type === el.type)
    if (rule && rule.formatSpec) {
      const detectSpec = rule.detect
      const matched = detectSpec ? matchDetect(elText, detectSpec) : true
      if (matched) {
        // 匹配：正常应用规则格式
        try {
          applyFormatSpec(fullParaRange, rule.formatSpec, settings, fonts)
        } catch (e) { }
      } else {
        // 不匹配：正文格式（无缩进）
        try {
          fullParaRange.ParagraphFormat.CharacterUnitFirstLineIndent = 0
          fullParaRange.ParagraphFormat.FirstLineIndent = 0
        } catch (e) { }
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

  const lines = []
  for (const el of sigGroup) {
    if (typeof el.start !== 'number' || typeof el.end !== 'number') continue

    // 用 start/end 定位段落，不依赖 paraIndex
    let raw = ''
    let paraStart = 0
    let paraEnd = 0
    try {
      const rng = doc.Range(el.start, el.end - 1)
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
    lines.push({ start: el.start, end: el.end, paraStart, paraEnd, text: editedText })
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

  //测量宽度
  let maxW = 0
  for (const line of lines) {
    line.width = measureWidth(line.text)
    if (line.width > maxW) maxW = line.width
  }
  const baseLeft = Math.max(0, lineCharCount - maxW)

  //用前导空格实现右对齐（LeftIndent 无法表达半字符偏移，空格是唯一可靠方式）
  //返回位置更新信息，供调用方同步 start/end
  //逆序处理：从文档末尾往前写，避免前导空格插入导致后续行字符位置偏移
  const posUpdates = []
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]
    const padW = baseLeft + (maxW - line.width) / 2
    // padW 是半字符单位宽度，转为全角空格数需 /2（每个全角空格宽度=2半字符）
    const fullSpaces = Math.floor(padW / 2)
    const frac = padW / 2 - fullSpaces  // 剩余半字符单位（0~1）
    const halfSpace = frac > 0.25  // 剩余超过0.25个半字符时补一个半角空格
    let spaces = ''
    for (let j = 0; j < fullSpaces; j++) spaces += '\u3000'  // 全角空格
    if (halfSpace) spaces += ' '  // 半角空格补齐
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
      posUpdates.push({ oldStart: line.start, newStart: newPara.Range.Start, newEnd: newPara.Range.End })
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
