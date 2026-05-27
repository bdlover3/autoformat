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
    case 'btnAbout': {
      const aboutInfo = '公文排版助手\n\n版本：0.0.1 \n版权所有人：小明哥哥\n\n本工具用于帮助快速格式化公文文档，提供一键排版功能。'
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

    formatBody(doc, settings)

    const titleEnd = formatDocTitle(doc, settings)

    formatAddressee(doc, titleEnd)

    formatSignatureAndDate(doc)

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
  const fullRange = doc.Content
  //清除字体格式
  fullRange.Font.Reset()
  //清除段落格式
  fullRange.ParagraphFormat.Reset()
  //清除所有自动编号/列表格式
  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count
  for (let i = 1; i <= count; i++) {
    const para = paragraphs.Item(i)
    //移除自动编号
    try {
      para.Range.ListFormat.RemoveNumbers()
    } catch (e) {
      //忽略不支持的段落
    }
  }
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
    //公文页码格式：4号宋体半角阿拉伯数字，带一字线格式 "- X -"
    const firstSection = doc.Sections.Item(1)
    if (!firstSection.Footers || !firstSection.Footers.Item) {
      return  //不支持页脚操作
    }

    //定义常量
    const wdHeaderFooterPrimary = 1
    const wdAlignParagraphCenter = 1
    const wdFieldPage = 33

    //先清除所有页眉页脚
    clearAllHeadersFooters(doc)
    
    //页面设置
    doc.PageSetup.DifferentFirstPageHeaderFooter = false
    doc.PageSetup.OddAndEvenPagesHeaderFooter = false
    doc.PageSetup.FooterDistance = 27 * 2.83465  // mm转pt

    //设置居中页码
    const footer = firstSection.Footers.Item(wdHeaderFooterPrimary)
    const rng = footer.Range
    
    //先设置格式
    rng.ParagraphFormat.Alignment = wdAlignParagraphCenter
    rng.Font.Name = "宋体"
    rng.Font.Size = 12  // 4号=12pt
    
    //先写入文本
    rng.Text = "— # —"
    
    //查找占位符#并替换为PAGE域
    const findRng = rng.Duplicate
    findRng.Find.Text = "#"
    if (findRng.Find.Execute()) {
      findRng.Fields.Add(findRng, wdFieldPage, "", false)
    }

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
        //先取消所有域的链接（将域转换为纯文本）
        const fields = footer.Range.Fields
        for (let k = fields.Count; k >= 1; k--) {
          try { fields.Item(k).Unlink() } catch (e) { }
        }
        //删除页脚中的所有文本框
        try { footer.Range.ShapeRange.Delete() } catch (e) { }
        //最后清空文本
        footer.Range.Text = ""
      } catch (e) { }
    }
  }
}

function formatBody(doc, settings) {
  //设置全文为仿宋三号（检测字体是否安装）
  const bodyFontName = getAvailableFont(settings.bodyFont, '仿宋')
  const fullRange = doc.Content
  fullRange.Font.Name = bodyFontName
  fullRange.Font.Size = settings.bodyFontSize
  fullRange.Font.NameAscii = 'Times New Roman'
  fullRange.Font.NameOther = 'Times New Roman'

  //设置行距为固定值28.9磅
  const paragraphs = doc.Paragraphs
  const count = paragraphs.Count
  for (let i = 1; i <= count; i++) {
    const para = paragraphs.Item(i)
    para.LineSpacingRule = 4  // wdLineSpaceExactly = 4 固定值
    para.LineSpacing = settings.lineSpacing
    para.CharacterUnitFirstLineIndent = 2  // 首行缩进2字符
  }
}

//判断文本是否像公文大标题行
//标题特征：简短（不超过一行字数）、不以结构化标题序号开头、不以日期开头、不以冒号结尾
function isTitleLike(text) {
  if (!text || text.length < 2) return false
  //标题一般不超过22个字（二号字一行约22字），超过一行字数的肯定不是标题
  if (text.length > 22) return false
  //不以结构化标题序号开头
  const h1Pattern = /^[一二三四五六七八九十]+、/
  const h2Pattern = /^[（\(][一二三四五六七八九十]+[）\)]/
  const h3Pattern = /^\d+\./
  const h4Pattern = /^[（\(]\d+[）\)]/
  if (h1Pattern.test(text) || h2Pattern.test(text) || h3Pattern.test(text) || h4Pattern.test(text)) return false
  //不以日期开头
  if (/^\d{4}年/.test(text)) return false
  //不以冒号结尾（称呼/主送机关通常以冒号结尾）
  if (/[：:]$/.test(text)) return false
  //包含句号的不是标题（标题一般不用句号）
  if (/[。！？；]/.test(text)) return false
  return true
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

  //先找到第一个非空段落作为标题起点
  let titleStart = -1
  for (let i = 1; i <= count; i++) {
    const text = paragraphs.Item(i).Range.Text.trim()
    if (text) {
      titleStart = i
      break
    }
  }
  if (titleStart === -1) return -1

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
    para.CharacterUnitFirstLineIndent = 0  // 标题不缩进
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
          titlePara.Range.Font.Name = settings.h1Font
          titlePara.Range.Font.Size = settings.h1FontSize
          titlePara.Range.Font.Bold = false
          titlePara.CharacterUnitFirstLineIndent = 2
          titlePara.LineSpacingRule = 4
          titlePara.LineSpacing = settings.lineSpacing
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
          }
          continue
        }
      }
      para.Range.Font.Name = settings.h1Font
      para.Range.Font.Size = settings.h1FontSize
      para.Range.Font.Bold = false
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
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
      continue
    }

    //三级标题
    if (h3Pattern.test(text)) {
      para.Range.Font.Name = settings.h3Font
      para.Range.Font.Size = settings.h3FontSize
      para.Range.Font.Bold = false
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      continue
    }

    //四级标题
    if (h4Pattern.test(text)) {
      para.Range.Font.Name = settings.h4Font
      para.Range.Font.Size = settings.h4FontSize
      para.Range.Font.Bold = false
      para.CharacterUnitFirstLineIndent = 2
      para.LineSpacingRule = 4
      para.LineSpacing = settings.lineSpacing
      continue
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
    //处理落款行：与日期中线对齐，使用空格填充
    for (let i = signatureInfos.length - 1; i >= 0; i--) {
      const line = signatureInfos[i]
      //清除原有缩进设置
      line.para.CharacterUnitFirstLineIndent = 0
      line.para.CharacterUnitRightIndent = 0
      line.para.LeftIndent = 0
      line.para.RightIndent = 0
      line.para.Alignment = 0  // 左对齐

      //在落款前添加空格，使落款中心与日期中心对齐
      const sigLen = line.text.length
      //版心28字，落款右移调整：右空-1（再右移4字）
      const sigSpaceCount = Math.max(0, 28 - sigLen + 1)
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
    //计算需要填充的空格数：版心28字 - 日期长度 + 2（再右移5字）+ 半个汉字
    const spaceCount = Math.max(0, 28 - dateLen + 2)
    const spaces = ' '.repeat(spaceCount) + '\u3000'  // 添加一个全角空格（半个汉字宽度）

    //清除原有缩进设置
    dateInfo.para.CharacterUnitFirstLineIndent = 0
    dateInfo.para.CharacterUnitRightIndent = 0
    dateInfo.para.LeftIndent = 0
    dateInfo.para.RightIndent = 0
    dateInfo.para.Alignment = 0  // 左对齐

    //在日期前添加空格，使其右空三字（调整位置）
    //使用精确的范围修改，避免覆盖段落标记
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
