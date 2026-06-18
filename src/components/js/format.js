//==============================================================
// 格式化模块
//
// 核心策略（解决格式相互覆盖问题）：
//   1. 全文先按 body 格式化（一次性，不跳过任何段落）
//   2. 特殊元素用 start/end 字符位置精准覆盖格式
//      doc.Range(start, end) 精确操作，不影响其他段落
//   3. sig+date 统一走 applyFooterAlignment（字符宽度对齐）
//==============================================================

import { getRuleByType } from './rules.js'
import { measureWidth } from './patterns.js'

//--- 格式化基础工具 ---

/** 设置 Range 基础字体属性 */
function setRangeBaseFont(range, fontName, lineSpacing) {
  range.Font.Name = fontName
  range.Font.Bold = false
  range.Font.NameAscii = 'Times New Roman'
  range.Font.NameOther = 'Times New Roman'
  range.ParagraphFormat.LineSpacingRule = 4
  range.ParagraphFormat.LineSpacing = lineSpacing
  range.ParagraphFormat.FirstLineIndent = 0
}

/**
 * 全文先刷正文格式
 * 不跳过任何段落，一次性统一设置
 * @param {Object} doc
 * @param {Object} settings
 * @param {Function} getAvailableFont
 */
export function applyBodyFormat(doc, settings, getAvailableFont) {
  const bodyRule = getRuleByType('body')
  if (!bodyRule || typeof bodyRule.format !== 'function') return

  const bodyFontName = getAvailableFont(settings.bodyFont, '仿宋')
  const fonts = { bodyFontName }

  const fullRange = doc.Content
  try {
    bodyRule.format(fullRange, settings, fonts)
  } catch (e) { }
}

/**
 * 特殊元素精准覆盖格式
 * 用 start/end 字符位置创建 Range，只操作特殊元素范围的文字
 * 不影响正文已设置的格式
 * @param {Object} doc
 * @param {Object} settings
 * @param {Array} elements 特殊要素列表
 * @param {Function} getAvailableFont
 */
export function applySpecialFormat(doc, settings, elements, getAvailableFont) {
  if (!Array.isArray(elements) || elements.length === 0) return

  const fonts = {
    titleFontName: getAvailableFont(settings.titleFont, '黑体'),
    bodyFontName: getAvailableFont(settings.bodyFont, '仿宋'),
    h1FontName: getAvailableFont(settings.h1Font, '黑体'),
    h2FontName: getAvailableFont(settings.h2Font, '楷体'),
    h3FontName: getAvailableFont(settings.h3Font, '仿宋'),
    subtitleFontName: getAvailableFont(settings.h2Font, '楷体')
  }

  const sigGroup = []

  for (const el of elements) {
    if (!el || typeof el.start !== 'number' || typeof el.end !== 'number') continue

    // sig+date 统一走字符宽度对齐
    if (el.type === 'sig' || el.type === 'date') {
      sigGroup.push(el)
      continue
    }

    // 从规则表查找格式化规格
    const rule = getRuleByType(el.type)
    if (rule && typeof rule.format === 'function') {
      try {
        const range = doc.Range(el.start, el.end - 1)
        rule.format(range, settings, fonts)
      } catch (e) { }
    }
  }

  // sig+date 分组对齐
  if (sigGroup.length > 0) {
    applyFooterAlignment(doc, settings, sigGroup, getAvailableFont)
  }
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

  //重置每段格式
  for (const line of lines) {
    try {
      const range = doc.Range(line.paraStart, line.paraEnd - 1)
      setRangeBaseFont(range, bodyFontName, settings.lineSpacing)
      range.Font.Size = settings.bodyFontSize
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 0
      range.ParagraphFormat.CharacterUnitRightIndent = 0
      range.ParagraphFormat.LeftIndent = 0
      range.ParagraphFormat.RightIndent = 0
      range.ParagraphFormat.FirstLineIndent = 0
      range.ParagraphFormat.Alignment = 0
    } catch (e) { }
  }

  //测量宽度
  let maxW = 0
  for (const line of lines) {
    line.width = measureWidth(line.text)
    if (line.width > maxW) maxW = line.width
  }
  const baseLeft = Math.max(0, lineCharCount - maxW)

  //写回：前导空格填充 + 主体文本（空格调整缩进对齐是允许的）
  for (const line of lines) {
    const padW = baseLeft + (maxW - line.width) / 2
    const spaceCount = Math.max(0, Math.round(padW * 2))
    const spaces = ' '.repeat(spaceCount)
    const cleanText = line.text.replace(/^\s+/, '')
    try {
      const rng = doc.Range(line.paraStart, line.paraEnd - 1)
      rng.Text = spaces + cleanText
    } catch (e) { }
  }
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
