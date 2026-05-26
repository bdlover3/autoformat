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
  clearFormatting: true    // 是否先清除所有格式
}

function getSettings() {
  //先获取默认设置
  const result = JSON.parse(JSON.stringify(DEFAULT_SETTINGS))
  
  //尝试从多个存储位置读取设置，合并到默认设置上
  let saved = null
  
  //方法1: WPS PluginStorage
  try {
    if (window.Application && window.Application.PluginStorage) {
      let s = window.Application.PluginStorage.getItem('formatSettings')
      if (s) {
        saved = JSON.parse(s)
      }
    }
  } catch (e) {
    console.log('从PluginStorage读取设置失败', e)
  }

  //方法2: WPS WPSPlugin Storage
  if (!saved) {
    try {
      if (window.Application && window.Application.WPSPlugin && window.Application.WPSPlugin.Storage) {
        let s = window.Application.WPSPlugin.Storage.GetItem('formatSettings')
        if (s) {
          saved = JSON.parse(s)
        }
      }
    } catch (e) {
      console.log('从WPSPlugin.Storage读取设置失败', e)
    }
  }

  //方法3: localStorage
  if (!saved) {
    try {
      let s = localStorage.getItem('formatSettings')
      if (s) {
        saved = JSON.parse(s)
      }
    } catch (e) {
      console.log('从localStorage读取设置失败', e)
    }
  }

  //合并保存的设置到默认设置上（确保新增字段有默认值）
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

  //方法1: WPS PluginStorage
  try {
    if (window.Application && window.Application.PluginStorage) {
      window.Application.PluginStorage.setItem('formatSettings', settingsStr)
      console.log('设置已保存到PluginStorage')
      return true
    }
  } catch (e) {
    console.log('保存到PluginStorage失败', e)
  }

  //方法2: WPS WPSPlugin Storage
  try {
    if (window.Application && window.Application.WPSPlugin && window.Application.WPSPlugin.Storage) {
      window.Application.WPSPlugin.Storage.SetItem('formatSettings', settingsStr)
      console.log('设置已保存到WPSPlugin.Storage')
      return true
    }
  } catch (e) {
    console.log('保存到WPSPlugin.Storage失败', e)
  }

  //方法3: localStorage
  try {
    localStorage.setItem('formatSettings', settingsStr)
    console.log('设置已保存到localStorage')
    return true
  } catch (e) {
    console.log('保存到localStorage失败', e)
  }

  return false
}

//磅转磅值(wps行距固定值用磅为单位)
function ptToHalfPt(pt) {
  return pt * 20  // WPS中行距固定值单位是1/20磅
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
    console.log('检测字体失败', e)
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

//字号磅值对应WPS的字号枚举值
function fontSizeToEnum(pt) {
  // WPS字号枚举
  const map = {
    42: 1,   // 初号
    36: 2,   // 小初
    26: 3,   // 一号
    24: 4,   // 小一
    22: 5,   // 二号
    18: 6,   // 小二
    16: 7,   // 三号
    15: 8,   // 小三
    14: 9,   // 四号
    12: 10,  // 小四
    10.5: 11, // 五号
    9: 12,   // 小五
  }
  return map[pt] || pt
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

  //初始化默认设置
  if (!window.Application.PluginStorage.getItem('formatSettings')) {
    saveSettings(DEFAULT_SETTINGS)
  }
  return true
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
    case 'btnAbout': {
      //显示关于信息
      const aboutInfo = '公文排版助手\n\n版本：0.0.1 beta\n版权所有人：小明哥哥\n\n本工具用于帮助快速格式化公文文档，提供一键排版功能。'
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
    alert('当前没有打开任何文档')
    return
  }

  const settings = getSettings()

  //检测必需字体是否安装
  const missingFonts = checkRequiredFonts(settings)
  if (missingFonts.length > 0) {
    const fontList = missingFonts.map(f => '• ' + f.name + '（替代：' + f.fallback + '）').join('\n')
    alert('以下公文必需字体未安装，排版将使用替代字体：\n\n' + fontList + '\n\n建议安装缺失字体以获得最佳排版效果。')
  }

  try {
    //0. 清除所有格式（可选）
    if (settings.clearFormatting) {
      clearAllFormatting(doc)
    }

    //1. 设置页面版式
    setupPage(doc, settings)

    //2. 格式化正文
    formatBody(doc, settings)

    //3. 格式化公文大标题和各级标题，返回标题结束位置
    const titleEnd = formatDocTitle(doc, settings)

    //4. 处理标题下方的主送机关（含冒号的行取消缩进）
    formatAddressee(doc, titleEnd)

    //5. 处理落款和日期
    formatSignatureAndDate(doc)

    //6. 加粗"一是""二是""三是"等
    boldEnumerations(doc)

  } catch (e) {
    alert('排版过程中出现错误：' + e.message)
    console.error('排版错误', e)
  }
}

//清除所有格式：清除字体、段落格式、自动编号等
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
    console.log('设置页码失败:', e.message)
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
  //设置全文为仿宋三号
  const fullRange = doc.Content
  fullRange.Font.Name = settings.bodyFont
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
function isTitleLike(text) {
  if (!text || text.length < 2 || text.length > 80) return false
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

  //收集连续的标题行：从第一个非空段开始，最多3行
  //标题行的特征：非空、不像结构化标题、不以冒号结尾、不以日期开头
  let titleEnd = titleStart
  for (let i = titleStart; i <= Math.min(titleStart + 2, count); i++) {
    const text = paragraphs.Item(i).Range.Text.trim()
    if (!text) break  //空行中断标题
    if (!isTitleLike(text)) break  //不像标题则中断
    titleEnd = i
  }

  //格式化标题区域
  for (let i = titleStart; i <= titleEnd; i++) {
    const para = paragraphs.Item(i)
    para.Range.Font.Name = settings.titleFont
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
  for (let i = 1; i <= count; i++) {
    //跳过标题区域
    if (i >= titleStart && i <= titleEnd) continue

    const para = paragraphs.Item(i)
    const text = para.Range.Text.trim()
    if (!text) continue

    //一级标题
    if (h1Pattern.test(text)) {
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

  //返回标题结束位置，供主送机关判断使用
  return titleEnd
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
      console.log('加粗枚举项失败', e)
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
