//==============================================================
// 文档操作模块
// 段落拆分、标题截断、删除空行、标题换行
//==============================================================

import {
  isTitleLike, isSpeechSignature, findFirstEndSymbol,
  attachmentPattern
} from './patterns.js'

/**
 * 在段落 paraIndex 的 cutIndex（含此字符）处拆分
 * 尾部去除前导空白并成为新段
 * 返回是否真正进行了拆分
 */
export function splitParagraphAtChar(doc, paraIndex, cutIndex) {
  const para = doc.Paragraphs.Item(paraIndex)
  const fullText = para.Range.Text
  const bodyText = fullText.replace(/[\r\n]+$/, '')
  if (cutIndex < 0 || cutIndex >= bodyText.length - 1) return false

  const head = bodyText.substring(0, cutIndex + 1)
  const tail = bodyText.substring(cutIndex + 1).replace(/^\s+/, '')
  if (!tail) return false

  const startPos = para.Range.Start
  const endPos = para.Range.End - 1
  const rng = doc.Range(startPos, endPos)
  rng.Text = head + '\r' + tail
  return true
}

/**
 * 根据新规则截断标题，返回标题结束的段落索引
 */
export function truncateTitleByEndSymbol(doc, titleStart) {
  const paragraphs = doc.Paragraphs

  const firstPara = paragraphs.Item(titleStart)
  const firstText = firstPara.Range.Text.replace(/[\r\n]+$/, '')
  const firstEnd = findFirstEndSymbol(firstText)

  if (firstEnd >= 0) {
    if (firstEnd < firstText.length - 1) {
      splitParagraphAtChar(doc, titleStart, firstEnd)
    }
    return titleStart
  }

  const count = paragraphs.Count
  if (titleStart + 1 > count) {
    return titleStart
  }

  const secondPara = paragraphs.Item(titleStart + 1)
  const secondTextTrim = secondPara.Range.Text.replace(/[\r\n]+$/, '').trim()

  if (!secondTextTrim || !isTitleLike(secondTextTrim)) {
    return titleStart
  }

  const secondRaw = secondPara.Range.Text.replace(/[\r\n]+$/, '')
  const secondEnd = findFirstEndSymbol(secondRaw)

  if (secondEnd >= 0) {
    if (secondEnd < secondRaw.length - 1) {
      splitParagraphAtChar(doc, titleStart + 1, secondEnd)
    }
    return titleStart + 1
  }

  //两段都没有结束符号 → 仅取第一段，不做截断
  return titleStart
}

/**
 * 一键删除空行
 * 保留：标题与正文之间的空行、发言人上下的空行
 */
export function removeBlankLines() {
  const doc = window.Application.ActiveDocument
  if (!doc) return

  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('删除空行')
  } catch (e) { }

  try {
    const protectedSet = new Set()

    //1) 保留标题后第一个空行
    const paragraphs = doc.Paragraphs
    const count = paragraphs.Count
    let titleEnd = -1
    for (let i = 1; i <= count; i++) {
      const text = paragraphs.Item(i).Range.Text.trim()
      if (!text) continue
      if (isTitleLike(text)) {
        titleEnd = i
        break
      }
    }

    if (titleEnd > 0) {
      //标题后第一个空行
      if (titleEnd + 1 <= count) {
        const next = paragraphs.Item(titleEnd + 1).Range.Text.trim()
        if (!next) protectedSet.add(titleEnd + 1)
      }
    }

    //2) 保留发言人上下的空行
    if (titleEnd > 0) {
      for (let i = titleEnd + 1; i <= Math.min(titleEnd + 6, count); i++) {
        const txt = paragraphs.Item(i).Range.Text.replace(/[\r\n]+$/, '').trim()
        if (!txt) continue
        if (isSpeechSignature(txt)) {
          if (i - 1 >= 1) {
            const above = paragraphs.Item(i - 1).Range.Text.replace(/[\r\n]+$/, '').trim()
            if (!above) protectedSet.add(i - 1)
          }
          if (i + 1 <= count) {
            const below = paragraphs.Item(i + 1).Range.Text.replace(/[\r\n]+$/, '').trim()
            if (!below) protectedSet.add(i + 1)
          }
        }
      }
    }

    //从后往前删除非保护的空段落
    const total = paragraphs.Count
    for (let i = total; i >= 1; i--) {
      if (protectedSet.has(i)) continue
      const para = paragraphs.Item(i)
      const text = para.Range.Text.replace(/[\r\n]+$/, '').trim()
      if (text) continue
      try {
        const startPos = para.Range.Start
        const endPos = para.Range.End
        if (endPos > startPos) {
          doc.Range(startPos, endPos).Delete()
        }
      } catch (e) { }
    }
  } catch (e) {
  } finally {
    if (undoRecord) {
      try { undoRecord.EndCustomRecord() } catch (e2) { }
    }
  }
}

/**
 * 一键标题换行
 * 把标题段中第一个结束符号之后的非标题内容拆到下一段
 */
export function splitTitleParagraph() {
  const doc = window.Application.ActiveDocument
  if (!doc) return

  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('标题换行')
  } catch (e) { }

  try {
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
    if (titleStart === -1) return
    const firstText = paragraphs.Item(titleStart).Range.Text.trim()
    if (!isTitleLike(firstText)) return

    truncateTitleByEndSymbol(doc, titleStart)
  } catch (e) {
  } finally {
    if (undoRecord) {
      try { undoRecord.EndCustomRecord() } catch (e2) { }
    }
  }
}
