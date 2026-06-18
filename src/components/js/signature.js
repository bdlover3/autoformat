//==============================================================
// 署名检测模块
// 独立按钮 btnDetectSignature 的逻辑
//==============================================================

import { isSpeechSignature, isTitleLike, endSymbolPattern, attachmentPattern } from './patterns.js'

/**
 * 署名格式化（标题区后 1~5 行）
 * @param {Object} doc
 * @param {number} titleEnd 标题结束段落索引
 * @param {Object} settings
 * @param {Function} applySpecialFormatFn 格式化函数（从 ribbon 传入）
 */
export function formatSpeechSignature(doc, titleEnd, settings, applySpecialFormatFn) {
  if (titleEnd < 1) return
  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count
  const scanEnd = Math.min(titleEnd + 5, count)
  const collected = []
  for (let i = titleEnd + 1; i <= scanEnd; i++) {
    let t = ''
    try { t = paragraphs.Item(i).Range.Text.replace(/[\r\n]+$/, '').trim() } catch (e) { }
    if (!t) continue
    if (isSpeechSignature(t)) {
      const para = paragraphs.Item(i)
      collected.push({
        type: 'signature',
        text: t,
        start: para.Range.Start,
        end: para.Range.End
      })
      continue
    }
    if (endSymbolPattern.test(t)) break
  }
  if (collected.length === 0) return
  applySpecialFormatFn(doc, settings, collected)
}

/**
 * 仅定位标题结束段索引，不做拆分/格式化
 */
export function locateTitleEnd(doc) {
  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count
  let titleStart = -1
  for (let i = 1; i <= count; i++) {
    const text = paragraphs.Item(i).Range.Text.trim()
    if (!text) continue
    if (attachmentPattern.test(text)) continue
    titleStart = i
    break
  }
  if (titleStart === -1) return -1
  const firstText = paragraphs.Item(titleStart).Range.Text.trim()
  if (!isTitleLike(firstText)) return -1

  //粗略地把"连续 1~2 段非空、不像正文"的视为标题
  let titleEnd = titleStart
  for (let i = titleStart + 1; i <= Math.min(titleStart + 2, count); i++) {
    const prevText = paragraphs.Item(i - 1).Range.Text.trim()
    const currText = paragraphs.Item(i).Range.Text.trim()
    if (!currText || !prevText) break
    if (endSymbolPattern.test(currText)) break
    if (!isTitleLike(currText)) break
    titleEnd = i
  }
  return titleEnd
}

/**
 * 检测并格式化署名（独立按钮入口）
 * @param {Object} getSettingsFn
 * @param {Function} applySpecialFormatFn
 */
export function detectAndFormatSpeechSignature(getSettingsFn, applySpecialFormatFn) {
  const doc = window.Application.ActiveDocument
  if (!doc) return

  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('署名检测')
  } catch (e) { }

  try {
    const titleEnd = locateTitleEnd(doc)
    if (titleEnd > 0) {
      const settings = getSettingsFn()
      formatSpeechSignature(doc, titleEnd, settings, applySpecialFormatFn)
    }
  } catch (e) {
  } finally {
    if (undoRecord) {
      try { undoRecord.EndCustomRecord() } catch (e2) { }
    }
  }
}
