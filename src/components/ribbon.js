import Util from './js/util.js'
import SystemDemo from './js/systemdemo.js'

//默认格式设置
const DEFAULT_SETTINGS = {
  titleFontSize: 22,       // 二号 = 22磅
  bodyFontSize: 16,        // 三号 = 16磅
  h1FontSize: 16,          // 一级标题 三号 = 16磅
  h2FontSize: 16,          // 二级标题 三号 = 16磅
  h3FontSize: 16,          // 三级标题 三号 = 16磅
  h4FontSize: 16,          // 四级标题 三号 = 16磅
  titleFont: '方正小标宋简体',
  bodyFont: '仿宋_GB2312',
  h1Font: '黑体',
  h2Font: '楷体_GB2312',
  h3Font: '仿宋_GB2312',
  h4Font: '仿宋_GB2312',
  lineSpacing: 28.9,       // 固定值28.9磅
  marginTop: 37,           // 上边距37mm
  marginBottom: 35,        // 下边距35mm
  marginLeft: 28,          // 左边距28mm
  marginRight: 26,         // 右边距26mm
  enablePageNumber: true,  // 是否启用页码
  pageNumberPosition: 'center',  // 页码位置：leftRight(左右), center(居中)，默认居中
  clearFormatting: true,    // 是否先清除所有格式
  disableFontWarning: false // 是否永久屏蔽缺失字体提示
}

//获取设置文件的持久化路径（使用AppData目录）
function getSettingsFilePath() {
  try {
    if (window.Application && window.Application.Env) {
      const appDataPath = window.Application.Env.GetAppDataPath()
      return appDataPath + '\\WPSAutoFormat\\settings.json'
    }
  } catch (e) {
  }
  return null
}

//字体检测状态：在一个WPS运行周期内只提示一次
let fontWarningShownInSession = false

function getSettings() {
  const result = JSON.parse(JSON.stringify(DEFAULT_SETTINGS))

  let saved = null
  const filePath = getSettingsFilePath()
  if (filePath) {
    try {
      if (window.Application && window.Application.FileSystem) {
        const fs = window.Application.FileSystem
        if (fs.Exists(filePath)) {
          let content = null
          try {
            content = fs.ReadFile(filePath)
          } catch (e1) {
            try {
              content = fs.readFileString(filePath)
            } catch (e2) { }
          }
          if (content) {
            saved = JSON.parse(content)
          }
        }
      }
    } catch (e) {
    }
  }

  if (!saved) {
    try {
      if (window.Application && window.Application.PluginStorage) {
        let s = window.Application.PluginStorage.getItem('formatSettings')
        if (s) {
          saved = JSON.parse(s)
        }
      }
    } catch (e) {
    }
  }

  if (saved) {
    Object.keys(saved).forEach(key => {
      if (key in result) {
        result[key] = saved[key]
      }
    })
  }

  return result
}

function saveSettings(settings) {
  const settingsStr = JSON.stringify(settings)

  const filePath = getSettingsFilePath()
  if (filePath) {
    try {
      if (window.Application && window.Application.FileSystem) {
        const fs = window.Application.FileSystem
        const dirPath = filePath.substring(0, filePath.lastIndexOf('\\'))
        if (!fs.Exists(dirPath)) {
          fs.Mkdir(dirPath)
        }
        if (fs.Exists(filePath)) {
          fs.Remove(filePath)
        }
        fs.AppendFile(filePath, settingsStr)
      }
    } catch (e) {
    }
  }

  try {
    if (window.Application && window.Application.PluginStorage) {
      window.Application.PluginStorage.setItem('formatSettings', settingsStr)
    }
  } catch (e) {
  }

  return true
}

//毫米转磅(1mm ≈ 2.835磅)
function mmToPt(mm) {
  return mm * 2.835
}

//检测字体是否安装
function isFontInstalled(fontName) {
  try {
    const fonts = window.Application.FontNames
    for (let i = 1; i <= fonts.Count; i++) {
      if (fonts.Item(i) === fontName) {
        return true
      }
    }
  } catch (e) {
  }
  return false
}

//获取可用字体（优先使用指定字体，否则使用备选）
function getAvailableFont(fontName, fallbackFont) {
  return isFontInstalled(fontName) ? fontName : fallbackFont
}

//检测公文必需字体是否安装
function checkRequiredFonts(settings) {
  const requiredFonts = [
    { name: '方正小标宋简体', fallback: '宋体', setting: settings.titleFont },
    { name: '仿宋_GB2312', fallback: '仿宋', setting: settings.bodyFont },
    { name: '楷体_GB2312', fallback: '楷体', setting: settings.h2Font }
  ]
  const missing = []
  for (const font of requiredFonts) {
    if (!isFontInstalled(font.name)) {
      missing.push({ name: font.name, fallback: font.fallback })
    }
  }
  return missing
}

//这个函数在整个wps加载项中是第一个执行的
function OnAddinLoad(ribbonUI) {
  if (typeof window.Application.ribbonUI != 'object') {
    window.Application.ribbonUI = ribbonUI
  }

  if (typeof window.Application.Enum != 'object') {
    window.Application.Enum = Util.WPS_Enum
  }

  window.openOfficeFileFromSystemDemo = SystemDemo.openOfficeFileFromSystemDemo
  window.InvokeFromSystemDemo = SystemDemo.InvokeFromSystemDemo

  //初始化：确保设置文件存在
  try {
    const filePath = getSettingsFilePath()
    if (filePath && window.Application.FileSystem) {
      const fs = window.Application.FileSystem
      const dirPath = filePath.substring(0, filePath.lastIndexOf('\\'))
      if (!fs.Exists(dirPath)) {
        fs.Mkdir(dirPath)
      }
      if (!fs.Exists(filePath)) {
        fs.AppendFile(filePath, JSON.stringify(DEFAULT_SETTINGS))
      }
    }
  } catch (e) {
  }

  return true
}

function checkFontsOncePerSession() {
  try {
    const settings = getSettings()
    if (settings.disableFontWarning) {
      return
    }

    if (fontWarningShownInSession) {
      return
    }

    const missingFonts = checkRequiredFonts(settings)
    if (missingFonts.length > 0) {
      const fontList = missingFonts.map(f => '• ' + f.name + '（替代：' + f.fallback + '）').join('\n')
      alert('以下公文必需字体未安装，排版将使用替代字体：\n\n' + fontList + '\n\n建议安装缺失字体以获得最佳排版效果。可在设置中屏蔽此提示')
      fontWarningShownInSession = true
    }
  } catch (e) {
  }
}

function OnAction(control) {
  const eleId = control.Id
  switch (eleId) {
    case 'btnAutoFormat': {
      //一键排版
      autoFormatDocument()
      break
    }
    case 'btnFormatSettings': {
      //打开格式设置对话框
      window.Application.ShowDialog(
        Util.GetUrlPath() + Util.GetRouterHash() + '/dialog',
        '调整固定格式',
        500 * window.devicePixelRatio,
        500 * window.devicePixelRatio,
        true
      )
      break
    }
    case 'btnUndoFormat': {
      undoFormatDocument()
      break
    }
    case 'btnCheckUpdate': {
      checkForUpdates()
      break
    }
    case 'btnAbout': {
      const aboutInfo = '公文排版助手\n\n版本：1.0.1 \n版权所有人：小明哥哥\n\n本工具用于帮助快速格式化公文文档，提供一键排版功能。\n\n项目地址:https://gitee.com/rainsoft0456/wpsautoformat'
      alert(aboutInfo)
      break
    }
    default:
      break
  }
  return true
}

function autoFormatDocument() {
  const doc = window.Application.ActiveDocument
  if (!doc) {
    return
  }

  const settings = getSettings()

  try {
    let undoRecord = null
    try {
      undoRecord = window.Application.UndoRecord
      undoRecord.StartCustomRecord('公文一键排版')
    } catch (e) {
    }

    try {
      if (settings.clearFormatting) {
        clearAllFormatting(doc)
      }

      setupPage(doc, settings)

      const titleEnd = formatDocTitle(doc, settings)

      formatSpeechSignature(doc, titleEnd)

      formatAddressee(doc, titleEnd)

      formatSignatureAndDate(doc)

      formatAll(doc, settings, titleEnd)

      boldEnumerations(doc)

      checkFontsOncePerSession()
      if (undoRecord) {
        undoRecord.EndCustomRecord()
      }
      window.lastFormatTime = new Date().getTime()
    } catch (e) {
      if (undoRecord) {
        try {
          undoRecord.EndCustomRecord()
        } catch (e2) {}
      }
      throw e
    }
  } catch (e) {
  }
}

function undoFormatDocument() {
  const doc = window.Application.ActiveDocument
  if (!doc) {
    return
  }

  try {
    const commandBars = window.Application.CommandBars
    if (commandBars) {
      const undoButton = commandBars.FindControl(null, 128)
      if (undoButton && undoButton.Enabled) {
        undoButton.Execute()
        return
      }
    }
    try {
      window.Application.Undo()
    } catch (e) {
    }
  } catch (e) {
  }
}

function clearAllFormatting(doc) {
  //先处理自动编号：对所有有自动编号的段落都转为文本
  //WPS自动编号（如"一、"）不在Range.Text中，是ListFormat生成的显示内容
  //必须先调用ConvertNumbersToText()才能保留编号文字
  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count

  //第一步：遍历所有段落，将自动编号转为文本
  for (let i = 1; i <= count; i++) {
    const para = paragraphs.Item(i)
    
    //检查是否有自动编号
    let hasListFormat = false
    try {
      if (para.Range.ListFormat.ListType !== 0) {
        hasListFormat = true
      }
    } catch (e) { }
    
    if (hasListFormat) {
      //将自动编号转为文本（这样RemoveNumbers就不会删除编号了）
      try {
        para.Range.ListFormat.ConvertNumbersToText()
      } catch (e) { }
    }
  }
  
  //第二步：清除所有列表格式（此时编号已经是文本，不会被删除）
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

function setupPage(doc, settings) {
  //设置页面尺寸和边距
  const ps = doc.PageSetup
  ps.PageWidth = mmToPt(210)    // A4纸宽
  ps.PageHeight = mmToPt(297)   // A4纸高
  ps.TopMargin = mmToPt(settings.marginTop)
  ps.BottomMargin = mmToPt(settings.marginBottom)
  ps.LeftMargin = mmToPt(settings.marginLeft)
  ps.RightMargin = mmToPt(settings.marginRight)

  //设置页码
  if (settings.enablePageNumber) {
    setupPageNumber(doc, settings)
  }
}

function setupPageNumber(doc, settings) {
  if (!settings.enablePageNumber) return
  
  try {
    const firstSection = doc.Sections.Item(1)
    if (!firstSection.Footers || !firstSection.Footers.Item) {
      return
    }

    const wdHeaderFooterPrimary = 1
    const wdAlignParagraphCenter = 1
    const wdFieldPage = 33

    //页面设置
    doc.PageSetup.DifferentFirstPageHeaderFooter = false
    doc.PageSetup.OddAndEvenPagesHeaderFooter = false
    doc.PageSetup.FooterDistance = 27 * 2.83465  // mm转pt

    //获取页脚
    const footer = firstSection.Footers.Item(wdHeaderFooterPrimary)
    //断开与前一节的链接
    try { footer.LinkToPrevious = false } catch (e) { }
    
    //删除旧PageNumbers集合中的页码对象
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
    
    //删除页脚中的文本框和图形
    try { rng.ShapeRange.Delete() } catch (e) { }
    
    //清空页脚文本
    rng.Text = ""
    
    //设置页脚格式
    rng.ParagraphFormat.Alignment = wdAlignParagraphCenter
    
    //使用PageNumbers.Add方法添加页码（这是WPS推荐的方式）
    const pageNumbers = footer.PageNumbers
    const wdAlignPageNumberCenter = 1
    const pgNum = pageNumbers.Add(wdAlignPageNumberCenter, true)
    
    //设置页码样式
    pageNumbers.NumberStyle = 57  // wdPageNumberStyleNumberInDash (- 1 -)
    
    //设置页码字体和字号（在添加页码之后设置才能生效）
    const footerRng = footer.Range
    footerRng.Font.Name = "宋体"
    footerRng.Font.Size = 12  // 4号=12pt
    
    //更新所有域
    doc.Fields.Update()
  } catch (e) {
  }
}

//清除所有页眉页脚
function clearAllHeadersFooters(doc) {
  const sections = doc.Sections
  for (let i = 1; i <= sections.Count; i++) {
    const section = sections.Item(i)

    //清除页眉
    const headers = section.Headers
    for (let j = 1; j <= headers.Count; j++) {
      try {
        const header = headers.Item(j)
        //先取消所有域的链接
        const fields = header.Range.Fields
        for (let k = fields.Count; k >= 1; k--) {
          try { fields.Item(k).Unlink() } catch (e) { }
        }
        header.Range.Text = ""
      } catch (e) { }
    }

    //清除页脚
    const footers = section.Footers
    for (let j = 1; j <= footers.Count; j++) {
      try {
        const footer = footers.Item(j)
        //断开与前一节的链接
        try { footer.LinkToPrevious = false } catch (e) { }
        //删除PageNumbers集合中的所有页码对象
        try {
          const pageNumbers = footer.PageNumbers
          for (let k = pageNumbers.Count; k >= 1; k--) {
            try { pageNumbers.Item(k).Delete() } catch (e) { }
          }
        } catch (e) { }
        //先取消所有域的链接（将域转换为纯文本）
        const fields = footer.Range.Fields
        for (let k = fields.Count; k >= 1; k--) {
          try { fields.Item(k).Delete() } catch (e) { }
        }
        //删除页脚中的所有文本框和图形
        try { footer.Range.ShapeRange.Delete() } catch (e) { }
        //最后清空文本
        footer.Range.Text = ""
      } catch (e) { }
    }
  }
}

function formatAll(doc, settings, titleEnd) {
  const bodyFontName = getAvailableFont(settings.bodyFont, '仿宋')
  const titleFontName = getAvailableFont(settings.titleFont, '宋体')
  const h1FontName = getAvailableFont(settings.h1Font, '黑体')
  const h2FontName = getAvailableFont(settings.h2Font, '楷体')
  const h3FontName = getAvailableFont(settings.h3Font, '仿宋')
  const h4FontName = getAvailableFont(settings.h4Font, '仿宋')

  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count

  const h1Pattern = /^[一二三四五六七八九十]+、/
  const h2Pattern = /^[（\(][一二三四五六七八九十]+[）\)]/
  const h3Pattern = /^\d+\./
  const h4Pattern = /^[（\(]\d+[）\)]/
  const attachmentPattern = /^附\s*件\d*/

  for (let i = 1; i <= count; i++) {
    const para = paragraphs.Item(i)
    const text = para.Range.Text.trim()

    if (!text) continue

    if (attachmentPattern.test(text)) {
      para.Range.Font.Name = h1FontName
      para.Range.Font.Size = settings.bodyFontSize
      para.Range.Font.NameAscii = 'Times New Roman'
      para.Range.Font.NameOther = 'Times New Roman'
      para.Alignment = 0
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.CharacterUnitFirstLineIndent = 0
      para.FirstLineIndent = 0
      continue
    }

    if (titleEnd > 0 && i <= titleEnd) {
      para.Range.Font.Name = titleFontName
      para.Range.Font.Size = settings.titleFontSize
      para.Range.Font.NameAscii = 'Times New Roman'
      para.Range.Font.NameOther = 'Times New Roman'
      para.Alignment = 1
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.CharacterUnitFirstLineIndent = 0
      para.FirstLineIndent = 0
      continue
    }

    //检查署名机构：在标题之后、单独一行、不超过30字、与标题和正文都有空行
    if (titleEnd > 0 && i === titleEnd + 2) {
      const lineBeforeOrg = paragraphs.Item(i - 1).Range.Text.trim()
      if (!lineBeforeOrg && text && text.length > 0 && text.length <= 30) {
        let isOrg = false
        if (i + 1 <= count) {
          const lineAfterOrg = paragraphs.Item(i + 1).Range.Text.trim()
          if (!lineAfterOrg) {
            isOrg = true
          } else if (lineAfterOrg.length > 30 || /[。！？；]/.test(lineAfterOrg)) {
            isOrg = true
          }
        }
        
        if (isOrg) {
          const orgFontName = getAvailableFont('仿宋_GB2312', '仿宋')
          para.Range.Font.Name = orgFontName
          para.Range.Font.Size = 16
          para.Range.Font.NameAscii = 'Times New Roman'
          para.Range.Font.NameOther = 'Times New Roman'
          para.CharacterUnitFirstLineIndent = 0
          para.FirstLineIndent = 0
          para.Alignment = 1
          para.LineSpacingRule = 4
          para.LineSpacing = 28.9
          continue
        }
      }
    }

    if (isSpeechSignature(text)) {
      const speechFontName = getAvailableFont('仿宋_GB2312', '仿宋')
      para.Range.Font.Name = speechFontName
      para.Range.Font.Size = 16
      para.Range.Font.NameAscii = 'Times New Roman'
      para.Range.Font.NameOther = 'Times New Roman'
      para.CharacterUnitFirstLineIndent = 0
      para.FirstLineIndent = 0
      para.Alignment = 1
      para.LineSpacingRule = 4
      para.LineSpacing = 28.9
      continue
    }

    if (h1Pattern.test(text)) {
      para.Range.Font.Name = h1FontName
      para.Range.Font.Size = settings.h1FontSize
      para.Range.Font.Bold = false
      para.Range.Font.NameAscii = 'Times New Roman'
      para.Range.Font.NameOther = 'Times New Roman'
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.Alignment = 0
      try { para.Range.ListFormat.RemoveNumbers() } catch (e) { }
      continue
    }

    if (h2Pattern.test(text)) {
      para.Range.Font.Name = h2FontName
      para.Range.Font.Size = settings.h2FontSize
      para.Range.Font.Bold = false
      para.Range.Font.NameAscii = 'Times New Roman'
      para.Range.Font.NameOther = 'Times New Roman'
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.Alignment = 0
      continue
    }

    if (h3Pattern.test(text)) {
      para.Range.Font.Name = h3FontName
      para.Range.Font.Size = settings.h3FontSize
      para.Range.Font.Bold = false
      para.Range.Font.NameAscii = 'Times New Roman'
      para.Range.Font.NameOther = 'Times New Roman'
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.Alignment = 0
      continue
    }

    if (h4Pattern.test(text)) {
      para.Range.Font.Name = h4FontName
      para.Range.Font.Size = settings.h4FontSize
      para.Range.Font.Bold = false
      para.Range.Font.NameAscii = 'Times New Roman'
      para.Range.Font.NameOther = 'Times New Roman'
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.Alignment = 0
      continue
    }

    if (/[：:]$/.test(text) && text.length <= 15) {
      para.Range.Font.Name = bodyFontName
      para.Range.Font.Size = settings.bodyFontSize
      para.Range.Font.NameAscii = 'Times New Roman'
      para.Range.Font.NameOther = 'Times New Roman'
      para.CharacterUnitFirstLineIndent = 0
      para.FirstLineIndent = 0
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.Alignment = 0
      continue
    }

    if (/^\d{4}年\d{1,2}月\d{1,2}日/.test(text)) {
      para.Range.Font.Name = bodyFontName
      para.Range.Font.Size = settings.bodyFontSize
      para.Range.Font.NameAscii = 'Times New Roman'
      para.Range.Font.NameOther = 'Times New Roman'
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      continue
    }

    para.Range.Font.Name = bodyFontName
    para.Range.Font.Size = settings.bodyFontSize
    para.Range.Font.NameAscii = 'Times New Roman'
    para.Range.Font.NameOther = 'Times New Roman'
    para.LineSpacingRule = 4
    para.LineSpacing = settings.lineSpacing
    para.CharacterUnitFirstLineIndent = 2
    para.Alignment = 3
  }
}

function isTitleLike(text) {
  if (!text || text.length < 2) return false
  if (/^附件\d*/.test(text)) return false
  if (/^附\s*件\d*/.test(text)) return false
  const h1Pattern = /^[一二三四五六七八九十]+、/
  const h2Pattern = /^[（\(][一二三四五六七八九十]+[）\)]/
  const h3Pattern = /^\d+\./
  const h4Pattern = /^[（\(]\d+[）\)]/
  if (h1Pattern.test(text) || h2Pattern.test(text) || h3Pattern.test(text) || h4Pattern.test(text)) return false
  if (/^\d{4}年/.test(text)) return false
  if (/[：:]$/.test(text)) return false
  if (/[。！？；]/.test(text)) return false
  if (/^[\u4e00-\u9fa5]{2,4}$/.test(text)) return false
  if (/.+\s+[\u4e00-\u9fa5]{2,4}$/.test(text)) return false
  return true
}

//判断文本是否像讲话稿发言人
function isSpeechSignature(text) {
  if (!text) return false
  //1. 纯姓名2-4个汉字
  if (/^[\u4e00-\u9fa5]{2,4}$/.test(text)) return true
  //2. 单位+姓名（中间有空格）
  if (/.+\s+[\u4e00-\u9fa5]{2,4}$/.test(text)) return true
  //日期格式
  if (/^[（\(]?\d{4}年\d{1,2}月\d{1,2}日[）\)]?$/.test(text)) return true
  return false
}

//识别并格式化公文大标题（支持多行标题）
//返回标题结束后的下一个段落索引，供后续主送机关判断使用
function formatDocTitle(doc, settings) {
  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count

  const h1Pattern = /^[一二三四五六七八九十]+、/
  const h2Pattern = /^[（\(][一二三四五六七八九十]+[）\)]/
  const h3Pattern = /^\d+\./
  const h4Pattern = /^[（\(]\d+[）\)]/

  const attachmentPattern = /^附\s*件\d*/

  let attachmentLines = []
  let titleStart = -1
  for (let i = 1; i <= count; i++) {
    const text = paragraphs.Item(i).Range.Text.trim()
    if (!text) continue
    if (attachmentPattern.test(text)) {
      attachmentLines.push(i)
    } else {
      titleStart = i
      break
    }
  }
  if (titleStart === -1) return -1

  if (attachmentLines.length > 0) {
    const lastAttachmentIndex = attachmentLines[attachmentLines.length - 1]
    if (lastAttachmentIndex + 1 === titleStart) {
      const attachmentPara = paragraphs.Item(lastAttachmentIndex)
      const endPos = attachmentPara.Range.End
      const newPara = doc.Range(endPos, endPos)
      newPara.InsertParagraphAfter()
      titleStart++
    }
  }

  //检查第一段是否像标题（如果第一段不像标题，则不识别为标题区域）
  const firstText = paragraphs.Item(titleStart).Range.Text.trim()
  if (!isTitleLike(firstText)) {
    //第一段不像标题，跳过标题识别，但仍需格式化各级标题
    formatSubTitles(doc, settings, -1, -1, h1Pattern, h2Pattern, h3Pattern, h4Pattern)
    return -1
  }

  //收集连续的标题行：从第一个非空段开始，最多3行
  //标题行的特征：非空、像标题、与上一行之间没有空行
  let titleEnd = titleStart
  for (let i = titleStart + 1; i <= Math.min(titleStart + 2, count); i++) {
    const prevText = paragraphs.Item(i - 1).Range.Text.trim()
    const currText = paragraphs.Item(i).Range.Text.trim()
    //空行中断标题（和标题之间有空行则不是标题）
    if (!currText) break
    //上一行是空行也中断
    if (!prevText) break
    //包含句号、感叹号、问号、分号的不是标题行（正文特征）
    if (/[。！？；]/.test(currText)) break
    //不像标题则中断
    if (!isTitleLike(currText)) break
    titleEnd = i
  }

  //格式化标题区域
  const titleFontName = getAvailableFont(settings.titleFont, '宋体')
  for (let i = titleStart; i <= titleEnd; i++) {
    const para = paragraphs.Item(i)
    para.Range.Font.Name = titleFontName
    para.Range.Font.Size = settings.titleFontSize
    para.Alignment = 1  // 居中
    para.LineSpacingRule = 4
    para.LineSpacing = settings.lineSpacing
    para.CharacterUnitFirstLineIndent = 0  // 标题不缩进（字符单位）
    para.FirstLineIndent = 0  // 标题不缩进（磅值单位）
    //确保标题不会被自动编号
    try {
      para.Range.ListFormat.RemoveNumbers()
    } catch (e) { }
  }

  //格式化正文中的各级标题（跳过标题区域）
  formatSubTitles(doc, settings, titleStart, titleEnd, h1Pattern, h2Pattern, h3Pattern, h4Pattern)

  //返回标题结束位置，供主送机关判断使用
  return titleEnd
}

//格式化各级标题（一级、二级、三级、四级）
//从后往前遍历，避免一级标题拆分插入新段落后索引偏移
function formatSubTitles(doc, settings, titleStart, titleEnd, h1Pattern, h2Pattern, h3Pattern, h4Pattern) {
  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count

  for (let i = count; i >= 1; i--) {
    //跳过标题区域
    if (i >= titleStart && i <= titleEnd) continue

    const para = paragraphs.Item(i)
    const text = para.Range.Text.trim()
    if (!text) continue

    //一级标题
    if (h1Pattern.test(text)) {
      const h1FontName = getAvailableFont(settings.h1Font, '黑体')
      //一级标题超一行时拆分处理：检查是否有句号，有则删掉句号并换行
      if (text.length > 22) {
        const periodIndex = text.indexOf('。')
        if (periodIndex > 0) {
          //找到句号，删掉句号并在句号位置插入换行
          const beforePeriod = text.substring(0, periodIndex)
          const afterPeriod = text.substring(periodIndex + 1)
          //使用Range修改文本：删掉句号，插入换行
          const startPos = para.Range.Start
          const endPos = para.Range.End - 1
          const rng = doc.Range(startPos, endPos)
          rng.Text = beforePeriod + '\r' + afterPeriod
          //换行后段落索引会变化，需要重新获取段落
          //标题部分（当前段落）
          const titlePara = paragraphs.Item(i)
          titlePara.Range.Font.Name = h1FontName
          titlePara.Range.Font.Size = settings.h1FontSize
          titlePara.Range.Font.Bold = false
          titlePara.CharacterUnitFirstLineIndent = 2
          titlePara.LineSpacingRule = 4
          titlePara.LineSpacing = settings.lineSpacing
          titlePara.Alignment = 0  // 左对齐
          try { titlePara.Range.ListFormat.RemoveNumbers() } catch (e) { }
          //正文部分（下一个段落）
          if (i + 1 <= paragraphs.Count) {
            const bodyPara = paragraphs.Item(i + 1)
            const bodyFontName = getAvailableFont(settings.bodyFont, '仿宋')
            bodyPara.Range.Font.Name = bodyFontName
            bodyPara.Range.Font.Size = settings.bodyFontSize
            bodyPara.Range.Font.NameAscii = 'Times New Roman'
            bodyPara.Range.Font.NameOther = 'Times New Roman'
            bodyPara.CharacterUnitFirstLineIndent = 2
            bodyPara.LineSpacingRule = 4
            bodyPara.LineSpacing = settings.lineSpacing
            bodyPara.Alignment = 3  // 两端对齐
          }
          continue
        }
      }
      para.Range.Font.Name = h1FontName
      para.Range.Font.Size = settings.h1FontSize
      para.Range.Font.Bold = false
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.Alignment = 0  // 左对齐
      //确保不会被自动编号
      try {
        para.Range.ListFormat.RemoveNumbers()
      } catch (e) { }
      continue
    }

    //二级标题
    if (h2Pattern.test(text)) {
      const h2FontName = getAvailableFont(settings.h2Font, '楷体')
      para.Range.Font.Name = h2FontName
      para.Range.Font.Size = settings.h2FontSize
      para.Range.Font.Bold = false
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.Alignment = 0  // 左对齐
      continue
    }

    //三级标题
    if (h3Pattern.test(text)) {
      const h3FontName = getAvailableFont(settings.h3Font, '仿宋')
      para.Range.Font.Name = h3FontName
      para.Range.Font.Size = settings.h3FontSize
      para.Range.Font.Bold = false
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.Alignment = 0  // 左对齐
      continue
    }

    //四级标题
    if (h4Pattern.test(text)) {
      const h4FontName = getAvailableFont(settings.h4Font, '仿宋')
      para.Range.Font.Name = h4FontName
      para.Range.Font.Size = settings.h4FontSize
      para.Range.Font.Bold = false
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      para.Alignment = 0  // 左对齐
      continue
    }
  }
}

//检测并格式化讲话稿/发言提纲的标题后落款
//讲话稿特征：标题后紧跟落款（如"XXX单位 李XXX"或"李XXX"），可能有日期
//格式要求：
//- 字体：署名、日期三号仿宋_GB2312
//- 行距：标题与署名之间空1行；署名与日期之间不空行；署名与正文之间空1行
//- 对齐：全部居中
function formatSpeechSignature(doc, titleEnd) {
  if (titleEnd < 1) return

  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count

  const datePattern = /^[（\(]?\d{4}年\d{1,2}月\d{1,2}日[）\)]?$/

  let checkedParas = []
  
  let titleEndWithOrg = titleEnd
  
  //检查署名机构：单独一行、不超过一行文字、与标题和正文都有空行
  if (titleEnd + 2 <= count) {
    const lineAfterTitle = paragraphs.Item(titleEnd + 1).Range.Text.trim()
    const potentialOrgLine = paragraphs.Item(titleEnd + 2)
    const orgText = potentialOrgLine.Range.Text.trim()
    
    //检查条件：标题后是空行，再下一行是非空短文本（可能是署名机构），再下一行是空行或正文开始
    if (!lineAfterTitle && orgText && orgText.length > 0 && orgText.length <= 30) {
      let hasBlankAfterOrg = false
      if (titleEnd + 3 <= count) {
        const lineAfterOrg = paragraphs.Item(titleEnd + 3).Range.Text.trim()
        hasBlankAfterOrg = !lineAfterOrg
        
        if (!hasBlankAfterOrg) {
          const nextText = paragraphs.Item(titleEnd + 3).Range.Text.trim()
          if (nextText.length > 30 || /[。！？；]/.test(nextText)) {
            hasBlankAfterOrg = true
          }
        }
      }
      
      if (hasBlankAfterOrg) {
        const orgFontName = getAvailableFont('仿宋_GB2312', '仿宋')
        potentialOrgLine.Range.Font.Name = orgFontName
        potentialOrgLine.Range.Font.Size = 16
        potentialOrgLine.Range.Font.NameAscii = 'Times New Roman'
        potentialOrgLine.Range.Font.NameOther = 'Times New Roman'
        potentialOrgLine.CharacterUnitFirstLineIndent = 0
        potentialOrgLine.FirstLineIndent = 0
        potentialOrgLine.Alignment = 1
        potentialOrgLine.LineSpacingRule = 4
        potentialOrgLine.LineSpacing = 28.9
        
        titleEndWithOrg = titleEnd + 2
      }
    }
  }

  for (let i = titleEndWithOrg + 1; i <= Math.min(titleEndWithOrg + 5, count); i++) {
    const para = paragraphs.Item(i)
    const text = para.Range.Text.trim()
    if (!text) continue
    if (!isSpeechSignature(text)) break
    checkedParas.push({ index: i, para: para, text: text })
    if (checkedParas.length >= 3) break
  }

  if (checkedParas.length === 0) return

  //确保标题/署名机构与第一个落款之间有一个空行
  const firstSignatureIndex = checkedParas[0].index
  if (firstSignatureIndex === titleEndWithOrg + 1) {
    const titlePara = paragraphs.Item(titleEndWithOrg)
    const titleEndPos = titlePara.Range.End
    const newPara = doc.Range(titleEndPos, titleEndPos)
    newPara.InsertParagraphAfter()
    for (let k = 0; k < checkedParas.length; k++) {
      checkedParas[k].index += 1
    }
  }

  //检测到讲话稿格式，格式化落款行
  let lastSignatureIndex = -1
  for (let j = 0; j < checkedParas.length; j++) {
    const item = checkedParas[j]
    const text = item.text
    lastSignatureIndex = item.index

    //设置字体：三号仿宋_GB2312
    const speechFontName = getAvailableFont('仿宋_GB2312', '仿宋')
    item.para.Range.Font.Name = speechFontName
    item.para.Range.Font.Size = 16  // 三号=16pt

    //设置居中对齐
    item.para.CharacterUnitFirstLineIndent = 0
    item.para.FirstLineIndent = 0
    item.para.Alignment = 1  // 居中对齐

    //设置行距
    item.para.LineSpacingRule = 4  // 固定值
    item.para.LineSpacing = 28.9  // 固定行距

    //如果是日期行，处理完毕
    if (datePattern.test(text)) {
      break
    }
  }

  //在落款和正文之间添加一个空行
  if (lastSignatureIndex > 0 && lastSignatureIndex < count) {
    const nextParaIndex = lastSignatureIndex + 1
    if (nextParaIndex <= count) {
      const nextPara = paragraphs.Item(nextParaIndex)
      const nextText = nextPara.Range.Text.trim()
      //如果后面有内容，且不是空行，则插入空行
      if (nextText && nextText.length > 0) {
        const lastSignaturePara = paragraphs.Item(lastSignatureIndex)
        const lastEndPos = lastSignaturePara.Range.End
        const newPara = doc.Range(lastEndPos, lastEndPos)
        newPara.InsertParagraphAfter()
      }
    }
  }
}

function formatAddressee(doc, titleEnd) {
  if (titleEnd < 1) return

  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count

  //从标题结束后的下一段开始，找第一个非空段落
  for (let i = titleEnd + 1; i <= count; i++) {
    const para = paragraphs.Item(i)
    const text = para.Range.Text.trim()

    //跳过空行
    if (!text) continue

    //找到了标题后的第一个非空文本段落
    //检查是否以冒号结尾（主送机关/称呼的特征，如"各XX："）
    //注意：不是包含冒号，而是以冒号结尾
    if (/[：:]$/.test(text)) {
      //取消缩进 - 使用多种方式确保生效
      para.CharacterUnitFirstLineIndent = 0
      para.FirstLineIndent = 0
      //确保段落左对齐
      para.Alignment = 0
      return  //找到并处理完成
    }

    //如果第一个非空段落不以冒号结尾，继续查找下一个（最多检查3段）
    if (i >= titleEnd + 3) break
  }
}

function formatSignatureAndDate(doc) {
  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count

  //日期格式匹配：XXXX年XX月XX日
  const datePattern = /^\d{4}年\d{1,2}月\d{1,2}日/

  //先收集所有需要处理的段落信息（日期和落款），然后再统一处理
  //避免在遍历过程中修改文本导致索引变化
  let dateInfo = null
  let signatureInfos = []

  //从后往前查找日期行
  for (let i = count; i >= 1; i--) {
    const para = paragraphs.Item(i)
    const text = para.Range.Text.trim()

    if (!text) continue

    //找到日期行
    if (datePattern.test(text)) {
      dateInfo = { index: i, para: para, text: text }

      //查找日期上方的落款行（最多2行）
      let searchIndex = i - 1
      while (searchIndex >= 1 && signatureInfos.length < 2) {
        const prevPara = paragraphs.Item(searchIndex)
        const prevText = prevPara.Range.Text.trim()

        if (!prevText) {
          //遇到空行，如果已收集到落款则停止
          if (signatureInfos.length > 0) break
          searchIndex--
          continue
        }

        //检查是否是落款（不含结构化标题格式）
        const h1Pattern = /^[一二三四五六七八九十]+、/
        const h2Pattern = /^[（\(][一二三四五六七八九十]+[）\)]/
        if (h1Pattern.test(prevText) || h2Pattern.test(prevText)) break

        signatureInfos.push({ index: searchIndex, para: prevPara, text: prevText })
        searchIndex--
      }

      break  //只处理第一个找到的日期行
    }
  }

  //现在统一处理，先处理落款再处理日期（从后往前处理避免索引问题）
  if (dateInfo) {
    //计算最后一行正文与落款之间需要的空行数
    //先找到落款区域之前的最后一个非空段落（正文最后一行）
    let lastBodyIndex = -1
    const firstSignatureIndex = signatureInfos.length > 0 ? signatureInfos[signatureInfos.length - 1].index : dateInfo.index
    for (let i = firstSignatureIndex - 1; i >= 1; i--) {
      const prevText = paragraphs.Item(i).Range.Text.trim()
      if (prevText) {
        lastBodyIndex = i
        break
      }
    }

    //计算正文最后一行到页面底部的剩余空间
    //如果剩余空间不够放落款+日期（约2行），则在下一页显示
    //如果剩余空间大于4行，在正文和落款之间插入适当空行
    if (lastBodyIndex > 0) {
      const lastBodyPara = paragraphs.Item(lastBodyIndex)
      //获取页面高度和当前段落位置
      const pageHeight = doc.PageSetup.PageHeight
      const topMargin = doc.PageSetup.TopMargin
      const bottomMargin = doc.PageSetup.BottomMargin
      const contentHeight = pageHeight - topMargin - bottomMargin  // 版心高度（磅）
      const lineSpacing = 28.9  // 固定行距
      const totalLines = Math.floor(contentHeight / lineSpacing)  // 版心总行数（约22行）

      //获取正文最后一行的垂直位置
      const lastBodyTop = lastBodyPara.Range.Information(4)  // wdVerticalPositionRelativeToPage = 4
      //获取落款第一行的垂直位置
      const firstSigPara = signatureInfos.length > 0 ? signatureInfos[signatureInfos.length - 1].para : dateInfo.para
      const firstSigTop = firstSigPara.Range.Information(4)

      if (lastBodyTop > 0 && firstSigTop > 0) {
        //计算正文最后一行之后还有多少行空间
        const remainingSpace = contentHeight - (lastBodyTop - topMargin) - lineSpacing
        const remainingLines = Math.floor(remainingSpace / lineSpacing)

        //落款+日期需要约2-3行，加上1行空行间距
        const neededLines = 3  // 落款+日期+空行

        if (remainingLines < neededLines) {
          //空间不够，在正文后插入分页符，让落款移到下一页
          //先找到正文和落款之间的空行
          for (let i = lastBodyIndex + 1; i < firstSignatureIndex; i++) {
            const paraText = paragraphs.Item(i).Range.Text.trim()
            if (!paraText) {
              //在空行处插入分页符
              const insertPara = paragraphs.Item(i)
              insertPara.Range.InsertBreak(7)  // wdSectionBreakNextPage = 7
              break
            }
          }
        } else if (remainingLines > neededLines + 2) {
          //空间充裕，在正文和落款之间插入空行调整间距
          //确保至少有1行空行
          let hasBlankLine = false
          for (let i = lastBodyIndex + 1; i < firstSignatureIndex; i++) {
            const paraText = paragraphs.Item(i).Range.Text.trim()
            if (!paraText) {
              hasBlankLine = true
              break
            }
          }
          if (!hasBlankLine) {
            //在正文和落款之间插入空行
            const insertPos = lastBodyPara.Range.End
            const newPara = doc.Range(insertPos, insertPos)
            newPara.InsertParagraphAfter()
          }
        }
      }
    }

    //处理落款行
    for (let i = signatureInfos.length - 1; i >= 0; i--) {
      const line = signatureInfos[i]
      //清除原有缩进设置
      line.para.CharacterUnitFirstLineIndent = 0
      line.para.CharacterUnitRightIndent = 0
      line.para.LeftIndent = 0
      line.para.RightIndent = 0
      line.para.Alignment = 0  // 左对齐

      //在落款前添加空格，使落款整体向右移动四个中文字符
      const sigLen = line.text.length
      //版心28字，落款右移四个字符
      const sigSpaceCount = Math.max(0, 28 - sigLen + 4)
      const sigSpaces = ' '.repeat(sigSpaceCount)

      //使用精确的范围修改，避免覆盖段落标记
      //段落范围从起始到结束前1位（保留段落标记）
      const startPos = line.para.Range.Start
      const endPos = line.para.Range.End - 1
      const rng = doc.Range(startPos, endPos)
      rng.Text = sigSpaces + line.text
    }

    //处理日期行
    const dateText = dateInfo.text
    const dateLen = dateText.length
    //计算需要填充的空格数：版心28字 - 日期长度 + 6（比落款多右移两个字符）
    const spaceCount = Math.max(0, 28 - dateLen + 6)
    const spaces = ' '.repeat(spaceCount)

    //清除原有缩进设置
    dateInfo.para.CharacterUnitFirstLineIndent = 0
    dateInfo.para.CharacterUnitRightIndent = 0
    dateInfo.para.LeftIndent = 0
    dateInfo.para.RightIndent = 0
    dateInfo.para.Alignment = 0  // 左对齐

    //在日期前添加空格
    const dateStartPos = dateInfo.para.Range.Start
    const dateEndPos = dateInfo.para.Range.End - 1
    const dateRng = doc.Range(dateStartPos, dateEndPos)
    dateRng.Text = spaces + dateText
  }
}

function boldEnumerations(doc) {
  //匹配"一是""二是""三是"..."十是"等模式
  const enumPattern = /[一二三四五六七八九十]+是/g

  const fullRange = doc.Content
  const text = fullRange.Text

  //查找并加粗所有匹配项
  let match
  while ((match = enumPattern.exec(text)) !== null) {
    try {
      //match.index是相对于Range起始的字符位置
      const startOffset = match.index
      const endOffset = startOffset + match[0].length
      const rng = doc.Range(fullRange.Start + startOffset, fullRange.Start + endOffset)
      rng.Font.Bold = true
    } catch (e) {
    }
  }
}

function GetImage(control) {
  const eleId = control.Id
  switch (eleId) {
    case 'btnAutoFormat':
      return 'images/1.svg'
    case 'btnFormatSettings':
      return 'images/2.svg'
    case 'btnAbout':
      return 'images/3.svg'
    default:
  }
  return 'images/newFromTemp.svg'
}

function OnGetEnabled(control) {
  return true
}

function OnGetVisible(control) {
  return true
}

function OnGetLabel(control) {
  return ''
}

const CURRENT_VERSION = '1.0.1'
const VERSION_URL = 'https://wpsautoformat.netlify.app/version.txt'

async function checkForUpdates() {
  try {
    const response = await fetch(VERSION_URL)
    if (!response.ok) {
      throw new Error('网络请求失败')
    }
    const latestVersion = await response.text()
    const cleanVersion = latestVersion.trim()
    
    if (cleanVersion !== CURRENT_VERSION) {
      const result = window.confirm(`检测到新版本：${cleanVersion}\n当前版本：${CURRENT_VERSION}\n\n是否前往下载更新？`)
      if (result) {
        window.Application.Hyperlink(VERSION_URL)
      }
    } else {
      alert(`当前已是最新版本：${CURRENT_VERSION}`)
    }
  } catch (error) {
    alert('检查更新失败：' + error.message)
  }
}

//这些函数是给wps客户端调用的
export default {
  OnAddinLoad,
  OnAction,
  GetImage,
  OnGetEnabled,
  OnGetVisible,
  OnGetLabel
}

//导出设置相关函数供dialog.js使用
window.getFormatSettings = getSettings
window.saveFormatSettings = saveSettings
window.getDefaultSettings = () => JSON.parse(JSON.stringify(DEFAULT_SETTINGS))
