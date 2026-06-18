//==============================================================
// 正则模式 & 判定函数 (patterns.js)
//
// 纯文本模式识别，不涉及格式化或文档操作
// 供 detect.js / docops.js / signature.js 等模块复用
//==============================================================

//--- 正则模式 ---

export const docNumberPattern = /^[\u4e00-\u9fa5]+[〔[]\d{4}[〕\]]\d+号$/
export const subtitlePattern = /^[—-]{2,}/
export const addresseeEndPattern = /[：:]$/
export const h1Pattern = /^[一二三四五六七八九十]+、/
export const h2Pattern = /^[（(][一二三四五六七八九十]+[）)]/
export const h3Pattern = /^\d+\./
export const h4Pattern = /^[（(]\d+[）)]/
export const datePattern = /^\d{4}年\d{1,2}月\d{1,2}日/
export const attachmentPattern = /^附\s*件\d*/
export const endSymbolPattern = /[。！？；]/

//--- 通用判定函数 ---

/** 是否署名格式（讲话稿发言人）：纯姓名2-4字 / 单位+姓名 / 日期 */
export function isSpeechSignature(text) {
  if (!text) return false
  if (/^[\u4e00-\u9fa5]{2,4}$/.test(text)) return true
  if (/^[\u4e00-\u9fa5]{2,8}\s+[\u4e00-\u9fa5]{2,4}$/.test(text)) return true
  if (/^[（(]?\d{4}年\d{1,2}月\d{1,2}日[）)]?$/.test(text)) return true
  return false
}

/** 是否"像标题"——排除法：不符合任何已知模式 + 不含中断符 + 长度≥2 */
export function isTitleLike(text) {
  if (!text || text.length < 2) return false
  if (attachmentPattern.test(text)) return false
  if (h1Pattern.test(text)) return false
  if (h2Pattern.test(text)) return false
  if (h3Pattern.test(text)) return false
  if (h4Pattern.test(text)) return false
  if (docNumberPattern.test(text)) return false
  if (datePattern.test(text)) return false
  if (addresseeEndPattern.test(text)) return false
  if (endSymbolPattern.test(text)) return false
  if (subtitlePattern.test(text)) return false
  if (/^[\u4e00-\u9fa5]{2,4}$/.test(text)) return false
  if (/^[\u4e00-\u9fa5]{2,8}\s+[\u4e00-\u9fa5]{2,4}$/.test(text)) return false
  return true
}

/** 文本是否匹配"其他已知模式"（用于标题排除法） */
export function looksLikeOtherPattern(text, isContinuation = false) {
  if (docNumberPattern.test(text)) return true
  if (subtitlePattern.test(text)) return true
  if (attachmentPattern.test(text)) return true
  if (h1Pattern.test(text)) return true
  if (h2Pattern.test(text)) return true
  if (h3Pattern.test(text)) return true
  if (h4Pattern.test(text)) return true
  if (datePattern.test(text)) return true
  if (isContinuation && addresseeEndPattern.test(text)) return true
  return false
}

//--- 文本测量工具 ---

/** 字符宽度：CJK/全角=1，ASCII/半角=0.5 */
export function charWidth(ch) {
  const code = ch.charCodeAt(0)
  if (code <= 0x7f) return 0.5
  return 1
}

/** 测量文本宽度（字符宽度之和） */
export function measureWidth(text) {
  let w = 0
  for (let i = 0; i < text.length; i++) {
    w += charWidth(text.charAt(i))
  }
  return w
}

/** 结束符号字符串（用于标题截断，逐字符查找） */
export const TITLE_END_SYMBOLS = '。！？；：.!?;:'

/** 任意标点（含逗号、顿号，用于 fallback 截断） */
export const ANY_PUNCT_REGEX = /[，、。！？；：,.!?;:]/

/** 找到文本中第一个结束符号的位置 */
export function findFirstEndSymbol(text) {
  let min = -1
  for (let i = 0; i < TITLE_END_SYMBOLS.length; i++) {
    const idx = text.indexOf(TITLE_END_SYMBOLS.charAt(i))
    if (idx >= 0 && (min === -1 || idx < min)) min = idx
  }
  return min
}
