//==============================================================
// 页面设置模块
// 页面尺寸、边距、页码、页眉页脚
//==============================================================

/**
 * 毫米转磅(1mm ≈ 2.835磅)
 */
function mmToPt(mm) {
  return mm * 2.835
}

/**
 * 清除所有格式
 */
export function clearAllFormatting(doc) {
  //先处理自动编号：对所有有自动编号的段落都转为文本
  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count

  //第一步：遍历所有段落，将自动编号转为文本
  for (let i = 1; i <= count; i++) {
    const para = paragraphs.Item(i)

    let hasListFormat = false
    try {
      if (para.Range.ListFormat.ListType !== 0) {
        hasListFormat = true
      }
    } catch (e) { }

    if (hasListFormat) {
      try {
        para.Range.ListFormat.ConvertNumbersToText()
      } catch (e) { }
    }
  }

  //第二步：清除所有列表格式
  for (let i = 1; i <= count; i++) {
    const para = paragraphs.Item(i)
    try {
      para.Range.ListFormat.RemoveNumbers()
    } catch (e) { }
  }

  //第三步：清除字体和段落格式
  const fullRange = doc.Content
  fullRange.Font.Reset()
  fullRange.ParagraphFormat.Reset()
}

/**
 * 设置页面尺寸和边距
 */
export function setupPage(doc, settings) {
  const ps = doc.PageSetup
  ps.PageWidth = mmToPt(210)    // A4纸宽
  ps.PageHeight = mmToPt(297)   // A4纸高
  ps.TopMargin = mmToPt(settings.marginTop)
  ps.BottomMargin = mmToPt(settings.marginBottom)
  ps.LeftMargin = mmToPt(settings.marginLeft)
  ps.RightMargin = mmToPt(settings.marginRight)

  if (settings.enablePageNumber) {
    setupPageNumber(doc, settings)
  }
}

/**
 * 设置页码
 */
export function setupPageNumber(doc, settings) {
  if (!settings.enablePageNumber) return

  try {
    const firstSection = doc.Sections.Item(1)
    if (!firstSection.Footers || !firstSection.Footers.Item) {
      return
    }

    const wdHeaderFooterPrimary = 1
    const wdAlignParagraphCenter = 1

    doc.PageSetup.DifferentFirstPageHeaderFooter = false
    doc.PageSetup.OddAndEvenPagesHeaderFooter = false
    doc.PageSetup.FooterDistance = 27 * 2.83465

    const footer = firstSection.Footers.Item(wdHeaderFooterPrimary)
    try { footer.LinkToPrevious = false } catch (e) { }

    //删除旧PageNumbers
    try {
      const oldPageNumbers = footer.PageNumbers
      for (let k = oldPageNumbers.Count; k >= 1; k--) {
        try { oldPageNumbers.Item(k).Delete() } catch (e) { }
      }
    } catch (e) { }

    //删除页脚Range中的所有域
    const rng = footer.Range
    try {
      const fields = rng.Fields
      for (let k = fields.Count; k >= 1; k--) {
        try { fields.Item(k).Delete() } catch (e) { }
      }
    } catch (e) { }

    try { rng.ShapeRange.Delete() } catch (e) { }
    rng.Text = ""
    rng.ParagraphFormat.Alignment = wdAlignParagraphCenter

    const pageNumbers = footer.PageNumbers
    const wdAlignPageNumberCenter = 1
    pageNumbers.Add(wdAlignPageNumberCenter, true)
    pageNumbers.NumberStyle = 57

    const footerRng = footer.Range
    footerRng.Font.Name = "宋体"
    footerRng.Font.Size = 12

    doc.Fields.Update()
  } catch (e) {
  }
}

/**
 * 清除所有页眉页脚
 */
export function clearAllHeadersFooters(doc) {
  const sections = doc.Sections
  for (let i = 1; i <= sections.Count; i++) {
    const section = sections.Item(i)

    const headers = section.Headers
    for (let j = 1; j <= headers.Count; j++) {
      try {
        const header = headers.Item(j)
        const fields = header.Range.Fields
        for (let k = fields.Count; k >= 1; k--) {
          try { fields.Item(k).Unlink() } catch (e) { }
        }
        header.Range.Text = ""
      } catch (e) { }
    }

    const footers = section.Footers
    for (let j = 1; j <= footers.Count; j++) {
      try {
        const footer = footers.Item(j)
        try { footer.LinkToPrevious = false } catch (e) { }
        try {
          const pageNumbers = footer.PageNumbers
          for (let k = pageNumbers.Count; k >= 1; k--) {
            try { pageNumbers.Item(k).Delete() } catch (e) { }
          }
        } catch (e) { }
        const fields = footer.Range.Fields
        for (let k = fields.Count; k >= 1; k--) {
          try { fields.Item(k).Delete() } catch (e) { }
        }
        try { footer.Range.ShapeRange.Delete() } catch (e) { }
        footer.Range.Text = ""
      } catch (e) { }
    }
  }
}
