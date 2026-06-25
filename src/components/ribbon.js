import Util from './js/util.js'
import SystemDemo from './js/systemdemo.js'

//模块导入
import { detectElements, getSegmentText } from './js/detect.js'
import { applyBodyFormat, applySpecialFormat, boldEnumerations, boldTitleWithTail } from './js/format.js'
import { clearAllFormatting, setupPage } from './js/page.js'
import { removeBlankLines, splitTitleParagraph, removeTitleEndSymbols } from './js/docops.js'
import { loadTypeMemory, recordTypeChanges, deleteTypeMemory } from './js/typememory.js'
import { loadSignatures } from './js/signature.js'
import { VERSION } from './js/version.js'

//默认格式设置
const DEFAULT_SETTINGS = {
  titleFontSize: 22,       // 二号 = 22磅
  bodyFontSize: 16,        // 三号 = 16磅
  h1FontSize: 16,          // 一级标题 三号 = 16磅
  h2FontSize: 16,          // 二级标题 三号 = 16磅
  h3FontSize: 16,          // 三级标题 三号 = 16磅
  h4FontSize: 16,          // 四级标题 三号 = 16磅
  h1Bold: false,           // 一级标题加粗
  h2Bold: false,           // 二级标题加粗
  h3Bold: false,           // 三级标题加粗
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
  pageNumberPosition: 'center',  // 页码位置
  clearFormatting: true,    // 是否先清除所有格式
  disableFontWarning: false, // 是否永久屏蔽缺失字体提示
  disableFooterWarning: false, // 是否永久屏蔽落款缺失提示
  fontReplacements: {},        // 缺失字体替代品映射
  autoSplitSubtitle: false     // 一二三级标题后自动换行
}

//获取设置文件的持久化路径
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

//字体检测状态
let fontWarningShownInSession = false

//落款/发言人是否缺失（autoFormatDocument 设置，openFormatPanel 推送给面板）
let footerMissing = false

//面板字体缺失提示（autoFormatDocument 检测，推送给面板显示；面板可点"不再提示"永久关闭）
let panelMissingFonts = []

function getSettings() {
  const result = JSON.parse(JSON.stringify(DEFAULT_SETTINGS))

  let saved = null

  // 优先从 PluginStorage 读取（内存中，跨窗口同步，不会缓存过期）
  try {
    if (window.Application && window.Application.PluginStorage) {
      let s = window.Application.PluginStorage.getItem('formatSettings')
      if (s) {
        saved = JSON.parse(s)
      }
    }
  } catch (e) {
  }

  // PluginStorage 无数据时再读文件
  if (!saved) {
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

//获取可用字体
function getAvailableFont(fontName, fallbackFont) {
  if (isFontInstalled(fontName)) return fontName
  try {
    const s = getSettings()
    if (s.fontReplacements && s.fontReplacements[fontName]) {
      return s.fontReplacements[fontName]
    }
  } catch (e) {
  }
  return fallbackFont
}

//检测公文必需字体是否安装
function checkRequiredFonts(settings) {
  const requiredFonts = [
    { name: '方正小标宋简体', fallback: '黑体', setting: settings.titleFont },
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
    if (missingFonts.length === 0) {
      return
    }

    fontWarningShownInSession = true

    //FontWarning 对话框通讯改为 BroadcastChannel 即时双向：
    //  1. 主线程先建 channel，等对话框发 hello 后推送 missingFonts
    //  2. 对话框选择后发 result，主线程收到即处理并关闭 channel
    //（原实现用 ShowDialog 后立即同步读 PluginStorage，结果必然为 null ——字体替代完全失效，本处一并修复）
    let bc = null
    try {
      bc = new BroadcastChannel('wps_font_warning')
    } catch (e) {
      console.warn('[checkFontsOncePerSession] BroadcastChannel 不可用', e)
      return
    }

    //对话框结果到达后处理；超时兜底（对话框被用户直接关掉等情况）
    bc.onmessage = (event) => {
      const msg = event.data
      if (!msg || !msg.type) return
      if (msg.type === 'hello') {
        //对话框挂载，推送缺失字体数据
        try {
          bc.postMessage({ type: 'init', missingFonts: missingFonts })
        } catch (e) { }
      } else if (msg.type === 'result') {
        applyFontWarningResult(msg.result)
        try { bc.close() } catch (e) { }
      }
    }

    //超时兜底：60s 内无结果则关闭 channel（避免泄漏）
    const timeoutId = setTimeout(() => {
      try { bc.close() } catch (e) { }
    }, 60000)
    try {
      bc.onmessage = ((orig) => (event) => {
        const msg = event.data
        if (msg && msg.type === 'result') { clearTimeout(timeoutId) }
        orig(event)
      })(bc.onmessage)
    } catch (e) { }

    try {
      window.Application.ShowDialog(
        Util.GetUrlPath() + Util.GetRouterHash() + '/fontwarning',
        '字体缺失提醒',
        420 * window.devicePixelRatio,
        320 * window.devicePixelRatio,
        true
      )
    } catch (e) {
      try { bc.close() } catch (e2) { }
    }
  } catch (e) {
  }
}

//处理 FontWarning 对话框返回的字体替代结果（从 checkFontsOncePerSession 拆出）
function applyFontWarningResult(result) {
  if (!result) return
  if (result.disableFontWarning) {
    //"不再提醒"：保存设置
    const updated = getSettings()
    updated.disableFontWarning = true
    saveSettings(updated)
  } else if (result.replacements) {
    const updated = getSettings()
    updated.fontReplacements = { ...(updated.fontReplacements || {}), ...result.replacements }
    if (result.saveFuture) {
      saveSettings(updated)
    }
  }
}

function OnAction(control) {
  const eleId = control.Id
  switch (eleId) {
    case 'btnAutoFormat': {
      autoFormatDocument()
      break
    }
    case 'btnDetectSignature': {
      // 记忆管理按钮
      try {
        const memory = loadTypeMemory()
        window.__memoryData = memory
        window.Application.ShowDialog(
          Util.GetUrlPath() + Util.GetRouterHash() + '/memory',
          '记忆管理',
          420 * window.devicePixelRatio,
          500 * window.devicePixelRatio,
          true
        )
      } catch (e) { }
      break
    }
    case 'btnRemoveBlankLines': {
      removeBlankLines()
      break
    }
    case 'btnInsertSignature': {
      insertSignature()
      break
    }
    case 'btnMarkElement': {
      markSelectedElement()
      break
    }
    case 'btnSplitTitle': {
      splitTitleParagraph()
      break
    }
    case 'btnRemoveTitleEndSymbol': {
      removeTitleEndSymbols()
      break
    }
    case 'btnBoldTitleWithTail': {
      const doc = window.Application.ActiveDocument
      if (doc) boldTitleWithTail(doc)
      break
    }
    case 'btnFormatSettings': {
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
      const aboutInfo = `公文排版助手\n\n版本：${VERSION} \n版权所有人：小明哥哥\n\n本工具用于帮助快速格式化公文文档，提供一键排版功能。\n\n项目地址:https://gitee.com/rainsoft0456/wpsautoformat`
      alert(aboutInfo)
      break
    }
    default:
      break
  }
  return true
}

//模块级状态：当前文档检测到的特殊段落
let specialElements = []

//模块级状态：当前打开的微调面板 taskPane 和健康检查计时器
let currentTaskPane = null
let currentHealthTimer = null  //仅检测文档切换/关闭
let currentFormatDocName = ''  //面板关联的文档 FullName，用于检测文档切换
let currentFormatDocCaption = ''  //面板关联的窗口 Caption，用于检测标签切换
let panelBroadcastChannel = null  //BroadcastChannel 用于接收面板即时消息

//关闭面板的统一方法
function closeFormatPanel() {
  if (currentHealthTimer) {
    clearInterval(currentHealthTimer)
    currentHealthTimer = null
  }
  if (panelBroadcastChannel) {
    panelBroadcastChannel.close()
    panelBroadcastChannel = null
  }
  currentFormatDocName = ''
  currentFormatDocCaption = ''
  if (currentTaskPane) {
    try { currentTaskPane.Visible = false } catch (e) { }
    try { currentTaskPane.Delete() } catch (e) { }
    currentTaskPane = null
  }
}

//处理面板消息（BroadcastChannel 即时接收，替代 500ms 轮询）
//给 elements 每项补 text 快照（从 doc 实时取），面板显示用。
//指针与内容解耦：result 不存 text，但面板跨 window 无法访问 doc，故推送时附带。
function withTextSnapshot(elements) {
  if (!Array.isArray(elements)) return elements
  const doc = window.Application.ActiveDocument
  if (!doc) return elements
  return elements.map(el => {
    if (!el || typeof el.start !== 'number' || typeof el.length !== 'number') return el
    const text = getSegmentText(doc, el.start, el.length)
    return { ...el, text }
  })
}

function handlePanelMessage(msg) {
  if (!msg || !msg.type) return

  console.log('[handlePanelMessage] msg.type =', msg.type)

  //面板挂载后主动请求初始数据：主线程即时推送 elements + footerMissing + missingFonts
  if (msg.type === 'hello') {
    try {
      if (panelBroadcastChannel) {
        panelBroadcastChannel.postMessage({
          type: 'init',
          elements: JSON.parse(JSON.stringify(withTextSnapshot(specialElements))),
          footerMissing: footerMissing,
          missingFonts: panelMissingFonts
        })
      }
    } catch (e) {
      console.warn('[handlePanelMessage] hello response failed:', e)
    }
    return
  }

  if (msg.type === 'apply') {
    const newElements = msg.elements
    if (!Array.isArray(newElements)) return

    const doc = window.Application.ActiveDocument
    if (!doc) return
    const settings = getSettings()

    // 保存快照用于记忆记录
    const oldSnapshot = JSON.parse(JSON.stringify(specialElements))

    let panelUndo = null
    try {
      panelUndo = window.Application.UndoRecord
      panelUndo.StartCustomRecord('排版微调')
    } catch (e) { }
    try {
      const merged = mergePanelEdits(specialElements, newElements)
      specialElements = merged
      applyBodyFormat(doc, settings, getAvailableFont)
      const posUpdates = applySpecialFormat(doc, settings, specialElements, getAvailableFont)
      boldEnumerations(doc)

      //落款/日期对齐写回后，同步 start/end 位置
      if (Array.isArray(posUpdates) && posUpdates.length > 0) {
        for (const upd of posUpdates) {
          const el = specialElements.find(e => e.start === upd.oldStart)
          if (el) {
            el.start = upd.newStart
            el.length = upd.newLength
          }
        }
      }
      //无论位置是否变化，都将最新数据推回面板（类型切换后格式/位置都可能变化）
      //注意：mergePanelEdits 已保留用户编辑的 text 和 matchedLen，
      //这里不能再用 withTextSnapshot 覆盖 text（否则用户面板编辑的内容会被 doc 原文覆盖丢失），
      //只同步 start/length/type/matched/matchedLen 等位置与状态字段。
      try {
        if (panelBroadcastChannel) {
          panelBroadcastChannel.postMessage({
            type: 'updateElements',
            elements: JSON.parse(JSON.stringify(specialElements))
          })
        }
      } catch (e2) { }
      // 记录类型变更到记忆
      recordTypeChanges(oldSnapshot, specialElements, doc)
    } catch (e) {
      console.warn('[handlePanelMessage] apply failed:', e)
    }
    if (panelUndo) {
      try { panelUndo.EndCustomRecord() } catch (e2) { }
    }
  } else if (msg.type === 'cancel') {
    closeFormatPanel()
    undoFormatDocument()
  } else if (msg.type === 'close') {
    closeFormatPanel()
  } else if (msg.type === 'disableFontWarning') {
    //面板点"不再提示"：永久关闭字体缺失提示，写入 settings
    try {
      const settings = getSettings()
      settings.disableFontWarning = true
      saveSettings(settings)
      panelMissingFonts = []
    } catch (e) { }
  } else if (msg.type === 'disableFooterWarning') {
    //面板点"不再提示"：永久关闭落款缺失提示，写入 settings
    try {
      const settings = getSettings()
      settings.disableFooterWarning = true
      saveSettings(settings)
      footerMissing = false
    } catch (e) { }
  }
}

//插入落款：检查落款库，0 个提示、1 个直接插入、多个弹窗选择
function insertSignature() {
  const doc = window.Application.ActiveDocument
  if (!doc) {
    alert('请先打开文档')
    return
  }
  const signatures = loadSignatures()
  if (signatures.length === 0) {
    alert('暂无保存的落款。\n\n可点击"插入落款"按钮在弹窗中添加常用落款，或排版后用微调面板的落款识别。')
    return
  }
  if (signatures.length === 1) {
    insertSignatureText(doc, signatures[0].text)
    return
  }
  //多个落款：弹窗选择，BroadcastChannel 接收选择结果
  try {
    const bc = new BroadcastChannel('wps_insert_signature')
    const timeoutId = setTimeout(() => { try { bc.close() } catch (e) { } }, 60000)
    bc.onmessage = (event) => {
      const msg = event.data
      if (!msg || !msg.type) return
      if (msg.type === 'insert' && msg.text) {
        clearTimeout(timeoutId)
        insertSignatureText(doc, msg.text)
        try { bc.close() } catch (e) { }
      }
    }
    window.Application.ShowDialog(
      Util.GetUrlPath() + Util.GetRouterHash() + '/insertsig',
      '插入落款',
      460 * window.devicePixelRatio,
      520 * window.devicePixelRatio,
      true
    )
  } catch (e) { }
}

//把落款文本插入到光标处（多行落款按段落插入）
//本按钮的明确功能是插入用户保存的落款内容，属于"插入落款"按钮的合规例外
function insertSignatureText(doc, text) {
  if (!text) return
  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('插入落款')
  } catch (e) { }
  try {
    const sel = window.Application.ActiveWindow.Selection
    const lines = String(text).replace(/\r+$/, '').split(/\r?\n/)
    //多行落款：每行独立成段，按落款格式（右对齐、仿宋）写入
    const bodyFont = getAvailableFont(getSettings().bodyFont, '仿宋')
    for (let i = 0; i < lines.length; i++) {
      const lineText = lines[i]
      try {
        if (i > 0) sel.TypeParagraph()
        if (lineText) {
          sel.TypeText(lineText)
          //落款右对齐
          try { sel.ParagraphFormat.Alignment = 2 } catch (e) { } // 2 = right
          try { sel.Font.Name = bodyFont } catch (e) { }
          try { sel.Font.NameAscii = 'Times New Roman' } catch (e) { }
          try { sel.Font.NameOther = 'Times New Roman' } catch (e) { }
        }
      } catch (e) { }
    }
  } catch (e) { }
  if (undoRecord) {
    try { undoRecord.EndCustomRecord() } catch (e2) { }
  }
}

//标记选区为特殊元素：取选区文本，弹窗让用户选类型，回写后重新格式化
function markSelectedElement() {
  const doc = window.Application.ActiveDocument
  if (!doc) {
    alert('请先打开文档')
    return
  }
  let selText = ''
  try {
    const sel = window.Application.ActiveWindow.Selection
    selText = String(sel.Text || '').replace(/[\r\n]+$/, '').trim()
  } catch (e) { }
  if (!selText) {
    alert('请先在文档中选中要标记的文字，再点此按钮')
    return
  }
  //通过 window 变量把选区文本传给对话框
  try { window.__markSelectedText = selText } catch (e) { }
  //BroadcastChannel 接收对话框回填的类型 + 推送选区文本
  try {
    const bc = new BroadcastChannel('wps_mark_element')
    const timeoutId = setTimeout(() => { try { bc.close() } catch (e) { } }, 60000)
    bc.onmessage = (event) => {
      const msg = event.data
      if (!msg || !msg.type) return
      if (msg.type === 'hello') {
        //对话框挂载，推送选区文本（跨 window 不共享 window 变量）
        try { bc.postMessage({ type: 'init', selectedText: selText }) } catch (e) { }
      } else if (msg.type === 'mark' && msg.elementType) {
        clearTimeout(timeoutId)
        applyMarkedElement(msg.elementType)
        try { bc.close() } catch (e) { }
      }
    }
    window.Application.ShowDialog(
      Util.GetUrlPath() + Util.GetRouterHash() + '/markelement',
      '标记为特殊元素',
      420 * window.devicePixelRatio,
      480 * window.devicePixelRatio,
      true
    )
  } catch (e) { }
}

//统一"添加特殊元素"流程（标记元素按钮 / 面板改类型为非body 都走这里）
//1. 移除 specialElements 中与新区间重叠的旧元素
//2. push 新元素 {start, length, type, matched:true, manual:true}
//3. 重新格式化（applyBodyFormat + applySpecialFormat + boldEnumerations）
//4. 写入记忆 recordTypeChanges——补"手动标记记不住"bug
//5. 打开/刷新微调面板
function addSpecialElement(doc, start, length, type) {
  if (!doc || typeof start !== 'number' || typeof length !== 'number' || length <= 0 || !type) return

  //若尚未排版（specialElements 为空），先执行一次完整排版
  if (!Array.isArray(specialElements) || specialElements.length === 0) {
    try {
      const settings = getSettings()
      if (settings.clearFormatting) clearAllFormatting(doc)
      setupPage(doc, settings)
      specialElements = detectElements(doc, settings)
      applyBodyFormat(doc, settings, getAvailableFont)
      applySpecialFormat(doc, settings, specialElements, getAvailableFont)
      boldEnumerations(doc)
    } catch (e) { }
  }

  //保存快照用于记忆记录
  const oldSnapshot = JSON.parse(JSON.stringify(specialElements))

  //移除与新标记区间重叠的旧元素（避免重复刷格式）
  const filtered = specialElements.filter(el =>
    !(el.start < start + length && el.start + el.length > start)
  )
  filtered.push({ start, length, type, matched: true, manual: true })
  specialElements = filtered

  //重新格式化
  let undoRecord = null
  try {
    undoRecord = window.Application.UndoRecord
    undoRecord.StartCustomRecord('添加特殊元素')
  } catch (e) { }
  try {
    const settings = getSettings()
    applyBodyFormat(doc, settings, getAvailableFont)
    applySpecialFormat(doc, settings, specialElements, getAvailableFont)
    boldEnumerations(doc)
  } catch (e) { }
  if (undoRecord) {
    try { undoRecord.EndCustomRecord() } catch (e2) { }
  }

  //写入记忆——补"手动标记记不住"bug
  try { recordTypeChanges(oldSnapshot, specialElements, doc) } catch (e) { }

  //打开/刷新微调面板
  openFormatPanel(doc)
}

//统一"删除特殊元素（标记为正文）"流程已并入 mergePanelEdits 的 body 分支：
//从 specialElements 移除（不插入新元素）+ deleteTypeMemory 删记忆，
//刷回正文格式由 handlePanelMessage 的 applyBodyFormat 全文刷正文统一完成。

//对话框回填类型后：把选区加入 specialElements 并重新格式化
function applyMarkedElement(type) {
  const doc = window.Application.ActiveDocument
  if (!doc) return
  try { window.__markSelectedText = null } catch (e) { }
  if (!type) return

  //取选区起止位置（基于 doc.Range 坐标系，与 specialElements 一致）
  let selStart = 0, selEnd = 0
  try {
    const sel = window.Application.ActiveWindow.Selection
    selStart = sel.Start
    selEnd = sel.End
  } catch (e) { return }
  if (selEnd <= selStart) return

  //统一走 addSpecialElement（含写入记忆）
  addSpecialElement(doc, selStart, selEnd - selStart, type)
}

function autoFormatDocument() {
  const doc = window.Application.ActiveDocument
  if (!doc) {
    return
  }

  const settings = getSettings()

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

    specialElements = detectElements(doc, settings)
    applyBodyFormat(doc, settings, getAvailableFont)
    const posUpdates = applySpecialFormat(doc, settings, specialElements, getAvailableFont)
    boldEnumerations(doc)

    //落款/日期对齐后同步位置
    if (Array.isArray(posUpdates) && posUpdates.length > 0) {
      for (const upd of posUpdates) {
        const el = specialElements.find(e => e.start === upd.oldStart)
        if (el) {
          el.start = upd.newStart
          el.length = upd.newLength
        }
      }
    }

    //落款/发言人缺失：传给面板显示提示条（不再用 alert 打断）
    //disableFooterWarning 永久关闭（设置对话框或面板"不再提示"）
    const hasFooter = specialElements.some(el => el.type === 'sig' || el.type === 'date' || el.type === 'authorInfo')
    try {
      footerMissing = !hasFooter && !getSettings().disableFooterWarning
    } catch (e) { footerMissing = !hasFooter }

    //字体缺失检测：填 panelMissingFonts 推送给面板显示提示条（用户可在面板点"不再提示"永久关闭）
    try {
      const settings = getSettings()
      if (!settings.disableFontWarning) {
        panelMissingFonts = checkRequiredFonts(settings)
      } else {
        panelMissingFonts = []
      }
    } catch (e) { panelMissingFonts = [] }

    checkFontsOncePerSession()
    window.lastFormatTime = new Date().getTime()
  } catch (e) {
  }

  if (undoRecord) {
    try { undoRecord.EndCustomRecord() } catch (e2) { }
  }

  //打开微调面板
  openFormatPanel(doc)
}

function openFormatPanel(doc) {
  try {
    //记录面板关联的文档
    try { currentFormatDocName = doc.FullName || doc.Name || '' } catch (e) { currentFormatDocName = ''; try { currentFormatDocName = doc.Name || '' } catch (e2) { } }
    try { currentFormatDocCaption = window.Application.ActiveWindow.Caption } catch (e) { currentFormatDocCaption = '' }

    //销毁旧面板（防止重复创建）
    if (currentTaskPane) {
      try { currentTaskPane.Visible = false } catch (e) { }
      try { currentTaskPane.Delete() } catch (e) { }
      currentTaskPane = null
    }
    if (currentHealthTimer) {
      clearInterval(currentHealthTimer)
      currentHealthTimer = null
    }
    if (panelBroadcastChannel) {
      panelBroadcastChannel.close()
      panelBroadcastChannel = null
    }

    //创建 BroadcastChannel：面板→主线程即时消息 + 主线程→面板初始数据即时推送
    //不再使用 PluginStorage 传递初始数据（面板 onMounted 后主动发 hello，主线程收到即推送）
    try {
      panelBroadcastChannel = new BroadcastChannel('wps_format_panel')
      panelBroadcastChannel.onmessage = (event) => {
        handlePanelMessage(event.data)
      }
    } catch (e) {
      console.warn('[openFormatPanel] BroadcastChannel 不可用，面板通讯将失效', e)
    }

    //健康检查：仅检测文档切换/关闭（2s 一次，比 500ms 轮询轻量得多）
    currentHealthTimer = setInterval(() => {
      try {
        let docCount = 0
        try { docCount = window.Application.Documents.Count } catch (e) { }
        if (docCount === 0) {
          closeFormatPanel()
          return
        }
        let activeDocName = ''
        try { activeDocName = window.Application.ActiveDocument.FullName || window.Application.ActiveDocument.Name || '' } catch (e) { try { activeDocName = window.Application.ActiveDocument.Name || '' } catch (e2) { } }
        if (activeDocName !== currentFormatDocName) {
          closeFormatPanel()
          return
        }
        let activeCaption = ''
        try { activeCaption = window.Application.ActiveWindow.Caption } catch (e) { }
        if (activeCaption && currentFormatDocCaption && activeCaption !== currentFormatDocCaption) {
          closeFormatPanel()
          return
        }
      } catch (e) { }
    }, 2000)

    //创建左侧停靠任务窗格显示微调面板
    const panelUrl = Util.GetUrlPath() + Util.GetRouterHash() + '/formatpanel'
    console.log('[openFormatPanel] panelUrl =', panelUrl)
    const taskPane = window.Application.CreateTaskPane(panelUrl, '排版微调')
    console.log('[openFormatPanel] taskPane =', taskPane)
    if (taskPane) {
      currentTaskPane = taskPane
      //左侧停靠模式（DockPosition=0 = msoCTPDockPositionLeft）
      taskPane.DockPosition = 0
      taskPane.Visible = true
    } else {
      console.warn('[openFormatPanel] CreateTaskPane returned undefined')
      closeFormatPanel()
    }
  } catch (e) {
  }
}

//合并面板编辑结果到 specialElements，并执行面板编辑微调逻辑：
//  对每个有 text 变化的元素，在 doc 里从 start 开始逐字比对，
//  找出最长匹配前缀，更新该元素的 start+length 为匹配区间。
//  未命中部分刷回正文字体大小（不改缩进）。
//  body 类型元素从 specialElements 移除（回正文格式）。
//面板微调核心逻辑（删旧 + 插新）：
//1. 面板某条失焦或用户改类型后，handlePanelMessage 收到 apply 消息调本函数
//2. 对每条面板传来的 item：取其 start 和面板显示的 text
//3. 到原文 start 位置逐字比对 text，算出匹配长度 matchedLen
//4. 删 specialElements 中该 start 的旧元素，插入一条新元素 {start, length:matchedLen, type, matched, matchedLen, manual}
//   - matchedLen=0（第一个字就不同）：保留原 length，matched=false 整段灰，可恢复
//   - 0<matchedLen<原 length：length 截断为 matchedLen，matched=false 超长灰
//   - matchedLen>=原 length：完全匹配，matched=true
//   - type=body：删除该元素（移出 specialElements），不插入
//5. 重格式化、刷面板、写记忆由 handlePanelMessage 统一收尾
function mergePanelEdits(oldList, newList) {
  if (!Array.isArray(newList)) return oldList
  const doc = window.Application.ActiveDocument
  //以 oldList 为基准（oldList 即当前 specialElements 引用），逐条替换
  const result = []
  for (const item of newList) {
    const start = item.start
    if (typeof start !== 'number') continue
    const old = oldList.find(o => o.start === start)
    const oldLen = old ? old.length : 0

    //标记为正文 = 删除该特殊元素（不插入新元素）
    if (item.type === 'body') {
      //删记忆：避免下次排版又认领回来与"标记为正文"冲突
      if (doc && old && old.length > 0) {
        try {
          const oldText = getSegmentText(doc, start, old.length)
          if (oldText) deleteTypeMemory(oldText)
        } catch (e) { }
      }
      continue
    }

    const text = (item.text == null ? '' : String(item.text)).trim()
    if (!text) continue  //文本被清空则放弃该段

    //到原文 start 位置逐字比对 text，算出匹配长度
    let matchedLen = 0
    if (doc && oldLen > 0) {
      try { matchedLen = matchDocPrefix(doc, start, text) } catch (e) { matchedLen = 0 }
    }

    //决定新元素的 length 和 matched
    let newLen, matched
    if (matchedLen === 0 && oldLen > 0) {
      //第一个字就不同：保留原 length 不截断，matched=false 整段灰，可恢复
      newLen = oldLen
      matched = false
    } else if (matchedLen > 0 && matchedLen < oldLen) {
      //部分匹配：length 截断为 matchedLen，matched=false 超长灰
      newLen = matchedLen
      matched = false
    } else {
      //完全匹配（matchedLen>=oldLen）或无 oldLen（新元素）：用 matchedLen 或 text 长度
      newLen = matchedLen > 0 ? matchedLen : text.length
      matched = true
    }

    //删旧 + 插新（只操作数组，重格式化由 handlePanelMessage 收尾）
    result.push({
      text: text,
      start: start,
      length: newLen,
      type: item.type,
      matched: matched,
      matchedLen: matchedLen,
      manual: true  //面板手动改 = 手动标记，跳过正则核对，尊重用户意图
    })
  }
  return result
}

//面板编辑微调：从 doc 的 start 位置开始，逐字和 panelText 比对，
//返回最长匹配前缀的字符数。字符不一致即中止。
function matchDocPrefix(doc, start, panelText) {
  try {
    // 取 doc 中从 start 开始足够长的文本用于比对
    const rng = doc.Range(start, start + panelText.length + 50)
    const docText = rng.Text.replace(/[\r\n]+$/, '')
    let matched = 0
    for (let i = 0; i < panelText.length && i < docText.length; i++) {
      if (panelText.charAt(i) === docText.charAt(i)) {
        matched++
      } else {
        break  // 字符不一致，中止
      }
    }
    return matched
  } catch (e) {
    return 0
  }
}

//撤销排版
function undoFormatDocument() {
  const doc = window.Application.ActiveDocument
  if (!doc) return
  try {
    const commandBars = window.Application.CommandBars
    commandBars.ExecuteMso('Undo')
  } catch (e) {
    try { doc.Undo() } catch (e2) { }
  }
}

function GetImage(control) {
  const eleId = control.Id
  switch (eleId) {
    case 'btnAutoFormat':
      return 'images/1.svg'
    case 'btnUndoFormat':
      return 'images/2.svg'
    case 'btnMarkElement':
      return 'images/3.svg'
    case 'btnInsertSignature':
      return 'images/4.svg'
    case 'btnSplitTitle':
      return 'images/5.svg'
    case 'btnRemoveBlankLines':
      return 'images/6.svg'
    case 'btnRemoveTitleEndSymbol':
      return 'images/7.svg'
    case 'btnBoldTitleWithTail':
      return 'images/8.svg'
    case 'btnDetectSignature':
      return 'images/9.svg'
    case 'btnFormatSettings':
      return 'images/10.svg'
    case 'btnCheckUpdate':
      return 'images/11.svg'
    case 'btnAbout':
      return 'images/12.svg'
    default:
  }
  return 'images/newFromTemp.svg'
}

function OnGetEnabled() {
  return true
}

function OnGetVisible() {
  return true
}

function OnGetLabel() {
  return ''
}

const VERSION_URL = 'https://wpsautoformat.netlify.app/version.txt'
const PROJECT_URL = 'https://gitee.com/rainsoft0456/wpsautoformat'

async function checkForUpdates() {
  try {
    const response = await fetch(VERSION_URL)
    if (!response.ok) {
      throw new Error('网络请求失败')
    }
    const latestVersion = await response.text()
    const cleanVersion = latestVersion.trim()

    if (cleanVersion !== VERSION) {
      const result = window.confirm(`检测到新版本：${cleanVersion}\n当前版本：${VERSION}\n\n是否前往下载更新？`)
      if (result) {
        window.Application.Hyperlink(PROJECT_URL)
      }
    } else {
      alert(`当前已是最新版本：${VERSION}`)
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
