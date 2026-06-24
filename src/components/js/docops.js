//==============================================================
// 文档操作模块
// 段落拆分、标题截断、删除空行、标题换行
//==============================================================

import {
  isTitleLike, isSpeechSignature, findFirstEndSymbol
} from './patterns.js'
import { detectElements } from './detect.js'

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
/**
 * 标题后换行：找到所有 h1/h2/h3 标题，若标题后面跟着正文（同一行），
 * 在标题末尾换行，让标题单独一行。
 *
 * 用 detect.js 检测标题指针 {start, length, type}，指针末尾 = start+length。
 * 若该位置后面还有非 \r 字符（正文），则在 start+length 处拆分：
 *   把 [段首, start+length] 作为标题段，[start+length, 段尾] 作为正文段。
 *
 * 倒序处理（从文档末尾往前拆），避免前面拆分导致后面指针位置偏移。
 */
export function splitTitleParagraph() {
  const doc = window.Application.ActiveDocument
  if (!doc) return

  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('标题后换行')
  } catch (e) { }

  try {
    // 用 detect 检测所有标题指针
    let elements = []
    try {
      elements = detectElements(doc, {})
    } catch (e) { return }

    // 只取 h1/h2/h3，且按 start 降序（倒序处理避免位置漂移）
    const titles = elements
      .filter(el => el.type === 'h1' || el.type === 'h2' || el.type === 'h3')
      .sort((a, b) => b.start - a.start)

    // 构建 baseTxt 用于查标题末尾后面字符
    let baseTxt = ''
    try {
      const paragraphs = doc.Paragraphs
      const count = paragraphs.Count
      for (let i = 1; i <= count; i++) {
        try { baseTxt += paragraphs.Item(i).Range.Text } catch (e) { }
      }
    } catch (e) { }

    let splitCount = 0
    for (const el of titles) {
      if (typeof el.start !== 'number' || typeof el.length !== 'number') continue
      const titleEnd = el.start + el.length  // 标题末尾位置
      // 检查标题末尾后面是否还有正文（非 \r、非字符串末尾）
      if (titleEnd >= baseTxt.length) continue
      const nextChar = baseTxt.charAt(titleEnd)
      if (nextChar === '\r') continue  // 后面就是段尾，标题已单独一行，无需拆
      // 标题末尾后面有正文，在 titleEnd 处拆分。
      // 拆分时去掉中间的结束符号：标题末尾无标点，正文段开头无标点。
      // 从 titleEnd 向后跳过连续的结束符号和空白，tail 从符号之后开始。
      try {
        const rng = doc.Range(titleEnd, titleEnd)
        const para = rng.Paragraphs.Item(1)
        const paraStart = para.Range.Start
        const paraEnd = para.Range.End
        const paraRange = doc.Range(paraStart, paraEnd)
        const fullText = paraRange.Text.replace(/[\r\n]+$/, '')
        const cutOffset = titleEnd - paraStart
        if (cutOffset <= 0 || cutOffset >= fullText.length) continue
        const head = fullText.substring(0, cutOffset)
        // tail 从 cutOffset 开始，先去掉开头的结束符号和空白
        let tail = fullText.substring(cutOffset)
        // 去掉开头连续的结束符号（。！？；：.!?;:）和空白
        tail = tail.replace(/^[，、。！？；：,.!?;:\s]+/, '')
        if (!tail) continue  // 后面全是符号和空白，无需拆
        const writeRange = doc.Range(paraStart, paraEnd - 1)
        writeRange.Text = head + '\r' + tail
        // WPS 的 \r 新段会继承 head 段的段落格式（标题格式），
        // 需手动重置 tail 段为正文格式（GB/T 9704 默认值）。
        try {
          // 定位拆分后的 tail 段：从 head+\r+tail 写回后，tail 段在原 paraStart 之后
          const newRng = doc.Range(paraStart, paraStart + head.length + 1)
          const newParas = newRng.Paragraphs
          // tail 段是 head 段的下一段
          if (newParas.Count >= 2) {
            const tailPara = newParas.Item(2)
            const tailRange = tailPara.Range
            // 重置为正文格式：仿宋_GB2312、16磅、两端对齐、首行缩进2字符
            tailRange.Font.Name = '仿宋_GB2312'
            tailRange.Font.NameAscii = 'Times New Roman'
            tailRange.Font.NameOther = 'Times New Roman'
            tailRange.Font.Size = 16
            tailRange.Font.Bold = false
            tailRange.ParagraphFormat.Alignment = 3  // justify 两端对齐
            tailRange.ParagraphFormat.CharacterUnitFirstLineIndent = 2
            tailRange.ParagraphFormat.FirstLineIndent = 0
          }
        } catch (e) { }
        splitCount++
      } catch (e) { }
    }
    console.log('[splitTitleParagraph] 共拆分', splitCount, '个标题')
  } catch (e) {
    console.warn('[splitTitleParagraph] failed:', e)
  } finally {
    if (undoRecord) {
      try { undoRecord.EndCustomRecord() } catch (e2) { }
    }
  }
}
