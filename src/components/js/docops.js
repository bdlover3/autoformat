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

    //2) 保留发言人上下各两个空行
    if (titleEnd > 0) {
      for (let i = titleEnd + 1; i <= Math.min(titleEnd + 6, count); i++) {
        const txt = paragraphs.Item(i).Range.Text.replace(/[\r\n]+$/, '').trim()
        if (!txt) continue
        if (isSpeechSignature(txt)) {
          // 上方最多2个连续空行
          let bc = 0
          for (let k = i - 1; k >= 1 && bc < 2; k--) {
            const t = paragraphs.Item(k).Range.Text.replace(/[\r\n]+$/, '').trim()
            if (!t) { protectedSet.add(k); bc++ } else break
          }
          // 下方最多2个连续空行
          bc = 0
          for (let k = i + 1; k <= count && bc < 2; k++) {
            const t = paragraphs.Item(k).Range.Text.replace(/[\r\n]+$/, '').trim()
            if (!t) { protectedSet.add(k); bc++ } else break
          }
        }
      }
    }

    //3) 保留落款区（文末sig+date连续块）前的两个空行
    {
      let footerBlockStart = -1
      let consecutiveBlanks = 0
      for (let i = count; i >= 1; i--) {
        const txt = paragraphs.Item(i).Range.Text.replace(/[\r\n]+$/, '').trim()
        if (!txt) {
          consecutiveBlanks++
          if (consecutiveBlanks > 1) break  // 连续2个空行，落款区结束
        } else {
          consecutiveBlanks = 0
          footerBlockStart = i
        }
      }
      if (footerBlockStart > 1) {
        let bc = 0
        for (let j = footerBlockStart - 1; j >= 1 && bc < 2; j--) {
          const txt = paragraphs.Item(j).Range.Text.replace(/[\r\n]+$/, '').trim()
          if (!txt) { protectedSet.add(j); bc++ } else break
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
 * 在标题（title）与下方第一行正文/抬头之间确保空一行（GB/T 9704 标准）。
 * 只针对 title（红头下的大标题），不动 h1/h2/h3 子标题（子标题与正文间不空行）。
 *
 * 逻辑：用 detectElements 找到 title 指针，定位 title 段段尾（含 \r），
 *       检查段尾后面是否已是空段，不是则插入一个空段（写 \r）。
 * 插入用 \r 新段，不改用户文字内容，合规（与 splitParagraphAtChar 用 \r 一致）。
 *
 * 返回插入的 \r 数量（用于上层判断是否需要重检测；当前实现只插不依赖重检测）。
 */
export function ensureBlankLineAfterTitle(elements) {
  const doc = window.Application && window.Application.ActiveDocument
  if (!doc) return 0
  if (!Array.isArray(elements) || elements.length === 0) return 0

  // 只取 title（红头大标题），排除 h1/h2/h3 子标题
  const titleEls = elements.filter(
    el => el.type === 'title' && typeof el.start === 'number' && typeof el.length === 'number'
  )
  if (titleEls.length === 0) return 0

  let inserted = 0
  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('标题后补空行')
  } catch (e) { }

  try {
    //按 start 升序处理（只有一个 title，但保持通用性）
    titleEls.sort((a, b) => a.start - b.start)

    for (const el of titleEls) {
      const titleEnd = el.start + el.length  // title 文本末尾（不含段尾 \r）
      if (titleEnd <= el.start) continue
      // 定位 title 最后一行所在段落的段尾（含 \r）。
      // 跨多行标题：每行 \r 分隔都是独立段落，必须用末尾字符位置取段，
      // 否则 Paragraphs.Item(1) 会取到第一行段，空行补错位置。
      let paraEnd = -1
      try {
        const rng = doc.Range(titleEnd - 1, titleEnd)
        const para = rng.Paragraphs.Item(1)
        paraEnd = para.Range.End  // 含段尾 \r
      } catch (e) { continue }
      if (paraEnd < 0) continue

      // 检查 title 段后面是否已是空段：
      // 段尾 \r 后下一个字符若也是 \r 或已到文档末尾 → 已有空行，不补
      try {
        if (paraEnd >= doc.Content.End - 1) continue  // 已到文档末尾
        const nextCh = doc.Range(paraEnd, paraEnd + 1).Text
        if (nextCh === '\r') continue  // 后面已是空段，不补
      } catch (e) { continue }

      // 在 title 最后一行段尾插入一个 \r，即新增一个空段
      try {
        const insertPos = paraEnd
        doc.Range(insertPos, insertPos).InsertAfter('\r')
        inserted++
        // 更新插入点之后所有元素的 start，保持指针同步
        for (const e of elements) {
          if (e.start >= insertPos) {
            e.start++
          }
        }
      } catch (e) { }
    }
  } catch (e) {
    console.warn('[ensureBlankLineAfterTitle] failed:', e)
  } finally {
    if (undoRecord) {
      try { undoRecord.EndCustomRecord() } catch (e2) { }
    }
  }
  return inserted
}

/**
 * 落款区与上方最后一行正文之间确保至少两个空行（GB/T 9704 标准）。
 * 不足两个 → 补齐到两个；已两个或更多 → 不动。
 * 补齐后若导致落款区被挤到下一页（页码变化）→ 回滚，不补。
 *
 * 落款区 = specialElements 中 type 为 sig/date/authorInfo 的连续块，
 * 取其中 start 最小者作为落款区第一行段首，往前数连续空行。
 */
export function ensureBlankLinesBeforeFooter(elements) {
  const doc = window.Application && window.Application.ActiveDocument
  if (!doc) return 0
  if (!Array.isArray(elements) || elements.length === 0) return 0

  // 落款区元素
  const footerTypes = new Set(['sig', 'date', 'authorInfo'])
  const footerEls = elements.filter(
    el => footerTypes.has(el.type) && typeof el.start === 'number'
  )
  if (footerEls.length === 0) return 0

  // 落款区第一行 = start 最小的落款元素
  footerEls.sort((a, b) => a.start - b.start)
  const footerStart = footerEls[0].start

  // 定位落款第一行所在段落（用段首字符取段，确保跨行落款也只取第一行段）
  let footerPara = null
  try {
    const rng = doc.Range(footerStart, footerStart + 1)
    footerPara = rng.Paragraphs.Item(1)
  } catch (e) { return 0 }
  if (!footerPara) return 0

  // 取落款第一段的段首位置，往前数连续空段
  const footerParaStart = footerPara.Range.Start

  // 倒序遍历段落，统计落款段前面的连续空段数
  let paragraphs = null
  let count = 0
  try {
    paragraphs = doc.Paragraphs
    count = paragraphs.Count
  } catch (e) { return 0 }

  // 找落款第一段的段落索引
  let footerIdx = -1
  for (let i = 1; i <= count; i++) {
    let p = null
    try { p = paragraphs.Item(i) } catch (e) { continue }
    if (!p) continue
    if (p.Range.Start === footerParaStart) { footerIdx = i; break }
  }
  if (footerIdx <= 1) return 0  // 落款前面没段落，无法补

  // 往前数连续空段
  let blankCount = 0
  for (let i = footerIdx - 1; i >= 1; i--) {
    let p = null
    try { p = paragraphs.Item(i) } catch (e) { break }
    if (!p) break
    const txt = p.Range.Text.replace(/[\r\n]+$/, '').trim()
    if (!txt) blankCount++
    else break  // 遇到正文，停止
  }

  const need = 2 - blankCount  // 需要补的空行数
  if (need <= 0) return 0  // 已两个或更多，不补

  // 取落款区当前页码（wdActiveEndPageNumber = 3）
  let pageBefore = -1
  try {
    pageBefore = footerPara.Range.Information(3)
  } catch (e) { }

  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('落款前补空行')
  } catch (e) { }

  let inserted = 0
  try {
    // 在落款第一段段首前插入 need 个 \r（每个 \r 即一个空段）
    const insertPos = footerParaStart
    for (let k = 0; k < need; k++) {
      try {
        doc.Range(insertPos, insertPos).InsertBefore('\r')
        inserted++
      } catch (e) { break }
    }

    // 补完后检查页码是否变化，变化则回滚（删掉刚插的 \r）
    if (inserted > 0 && pageBefore >= 0) {
      try {
        // 重新定位落款段（插入后位置可能漂移，用原 footerPara 已失效）
        // 落款段段首前移了 inserted 个 \r，新段首 = footerParaStart + inserted
        const newRng = doc.Range(footerParaStart + inserted, footerParaStart + inserted + 1)
        const newPara = newRng.Paragraphs.Item(1)
        const pageAfter = newPara.Range.Information(3)
        if (pageAfter > pageBefore) {
          // 页码变大 → 落款被挤到下一页，回滚
          for (let k = 0; k < inserted; k++) {
            try {
              doc.Range(footerParaStart, footerParaStart).Delete()  // 删段首前一个 \r
            } catch (e) { break }
          }
          inserted = 0
        }
      } catch (e) { }
    }
  } catch (e) {
    console.warn('[ensureBlankLinesBeforeFooter] failed:', e)
  } finally {
    if (undoRecord) {
      try { undoRecord.EndCustomRecord() } catch (e2) { }
    }
  }
  // 更新落款区之后所有元素的 start，保持指针同步
  if (inserted > 0) {
    for (const el of elements) {
      if (el.start >= footerParaStart) {
        el.start += inserted
      }
    }
  }
  return inserted
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
      } catch (e) { }
    }
  } catch (e) {
    console.warn('[splitTitleParagraph] failed:', e)
  } finally {
    if (undoRecord) {
      try { undoRecord.EndCustomRecord() } catch (e2) { }
    }
  }
}

/**
 * 删除标题末尾符号（按钮入口）：遍历全文每个像标题的段落，
 * 若末尾是结束符号（。！？等）则删除该符号。
 *
 * 不依赖传入的 elements（可能是空/陈旧的 specialElements 快照）：
 * 直接扫描全文段落，对每个像 h1/h2/h3/h4/附件 的段落末尾符号执行删除。
 * 与 truncateTitleByEndSymbol 不同：本函数不拆段，只删末尾符号，纯改内容。
 * 按钮明确功能 = 删字，属于"删除标题末符号"按钮的合规例外。
 */
export function removeTitleEndSymbols() {
  const doc = window.Application && window.Application.ActiveDocument
  if (!doc) return

  // 标题段开头模式：与 patterns.js 保持一致
  const titlePatterns = [
    /^[一二三四五六七八九十]+、/,        // h1
    /^[（(][一二三四五六七八九十]+[）)]/, // h2
    /^\d+\./,                            // h3
    /^[（(]\d+[）)]/,                    // h4
    /^附\s*件\d*/                         // 附件
  ]
  const endSymbolRegex = /[。！？；;．]/

  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('删除标题末符号')
  } catch (e) { }

  try {
    const paragraphs = doc.Paragraphs
    const count = paragraphs.Count
    //倒序遍历避免删字导致段落索引漂移
    for (let i = count; i >= 1; i--) {
      let para = null
      try { para = paragraphs.Item(i) } catch (e) { continue }
      if (!para) continue
      let paraText = ''
      try { paraText = para.Range.Text.replace(/[\r\n]+$/, '') } catch (e) { continue }
      if (!paraText) continue
      //是否标题开头
      let isTitle = false
      for (const pat of titlePatterns) {
        if (pat.test(paraText)) { isTitle = true; break }
      }
      if (!isTitle) continue

      //末尾是否结束符号
      const lastChar = paraText.charAt(paraText.length - 1)
      if (!endSymbolRegex.test(lastChar)) continue

      //删段尾最后一个可见字符（结束符号）
      try {
        const paraEnd = para.Range.End
        // paraEnd 含段尾 \r；最后一个可见字符在 paraEnd-2 处（paraEnd-1 是 \r）
        const delPos = paraEnd - 2
        if (delPos >= 0) doc.Range(delPos, delPos + 1).Delete()
      } catch (e) { }
    }
  } catch (e) {
    console.warn('[removeTitleEndSymbols] failed:', e)
  } finally {
    if (undoRecord) {
      try { undoRecord.EndCustomRecord() } catch (e2) { }
    }
  }
}
