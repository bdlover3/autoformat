import Util from './js/util.js'
import SystemDemo from './js/systemdemo.js'

//模块导入
import { detectElements } from './js/detect.js'
import { applyBodyFormat, applySpecialFormat, boldEnumerations } from './js/format.js'
import { clearAllFormatting, setupPage } from './js/page.js'
import { removeBlankLines, splitTitleParagraph } from './js/docops.js'
import { detectAndFormatSpeechSignature } from './js/signature.js'

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
  pageNumberPosition: 'center',  // 页码位置
  clearFormatting: true,    // 是否先清除所有格式
  disableFontWarning: false, // 是否永久屏蔽缺失字体提示
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
    if (missingFonts.length > 0) {
      window.__fontDialogPending = { missingFonts: missingFonts }
      try {
        window.Application.ShowDialog(
          Util.GetUrlPath() + Util.GetRouterHash() + '/fontwarning',
          '字体缺失提醒',
          420 * window.devicePixelRatio,
          320 * window.devicePixelRatio,
          true
        )
      } catch (e) {
      }
      const result = window.__fontDialogResult
      window.__fontDialogPending = null
      window.__fontDialogResult = null

      if (result && result.replacements) {
        const updated = getSettings()
        updated.fontReplacements = { ...(updated.fontReplacements || {}), ...result.replacements }
        if (result.saveFuture) {
          saveSettings(updated)
        }
      }
      fontWarningShownInSession = true
    }
  } catch (e) {
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
      detectAndFormatSpeechSignature(getSettings, (doc, settings, elements) => {
        applySpecialFormat(doc, settings, elements, getAvailableFont)
      })
      break
    }
    case 'btnRemoveBlankLines': {
      removeBlankLines()
      break
    }
    case 'btnSplitTitle': {
      splitTitleParagraph()
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
      const aboutInfo = '公文排版助手\n\n版本：1.1.0 \n版权所有人：小明哥哥\n\n本工具用于帮助快速格式化公文文档，提供一键排版功能。\n\n项目地址:https://gitee.com/rainsoft0456/wpsautoformat'
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

//模块级状态：当前打开的微调面板 taskPane 和轮询计时器
let currentTaskPane = null
let currentPollTimer = null

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

    specialElements = detectElements(doc)
    applyBodyFormat(doc, settings, getAvailableFont)
    applySpecialFormat(doc, settings, specialElements, getAvailableFont)
    boldEnumerations(doc)

    checkFontsOncePerSession()
    window.lastFormatTime = new Date().getTime()
  } catch (e) {
  }

  if (undoRecord) {
    try { undoRecord.EndCustomRecord() } catch (e2) { }
  }

  //打开微调面板
  openFormatPanel(doc, settings)
}

function openFormatPanel(doc, settings) {
  try {
    //销毁旧面板（彻底，防止重复创建）
    if (currentTaskPane) {
      try { currentTaskPane.Visible = false } catch (e) { }
      try { currentTaskPane.Delete() } catch (e) { }
      currentTaskPane = null
    }
    if (currentPollTimer) {
      clearInterval(currentPollTimer)
      currentPollTimer = null
    }

    const bodyPreview = []
    try {
      const paragraphs = doc.Paragraphs
      const limit = Math.min(paragraphs.Count, 30)
      for (let i = 1; i <= limit; i++) {
        const t = paragraphs.Item(i).Range.Text.replace(/[\r\n]+$/, '').trim()
        if (t) bodyPreview.push(t)
      }
    } catch (e) { }

    //通过 PluginStorage 传递数据给 TaskPane
    try {
      const storage = window.Application.PluginStorage
      storage.setItem('__formatPanelData', JSON.stringify({
        elements: JSON.parse(JSON.stringify(specialElements)),
        bodyPreview: bodyPreview,
        settings: JSON.parse(JSON.stringify(settings))
      }))
      storage.setItem('__formatPanelAction', '')
      storage.setItem('__formatPanelEdits', '')
    } catch (e) {
      console.warn('[openFormatPanel] PluginStorage write failed:', e)
    }

    //轮询 TaskPane 通过 PluginStorage 发来的指令
    function pollPanelAction() {
      try {
        const storage = window.Application.PluginStorage
        const action = storage.getItem('__formatPanelAction')
        if (!action) return

        if (action === 'apply') {
          storage.setItem('__formatPanelAction', '')
          const editsRaw = storage.getItem('__formatPanelEdits')
          if (editsRaw) {
            try {
              const newElements = JSON.parse(editsRaw)
              storage.setItem('__formatPanelEdits', '')
              let panelUndo = null
              try {
                panelUndo = window.Application.UndoRecord
                panelUndo.StartCustomRecord('排版微调')
              } catch (e) { }
              try {
                const merged = mergePanelEdits(specialElements, newElements)
                specialElements = merged
                applyBodyFormat(doc, settings, getAvailableFont)
                applySpecialFormat(doc, settings, specialElements, getAvailableFont)
                boldEnumerations(doc)
              } catch (e) { }
              if (panelUndo) {
                try { panelUndo.EndCustomRecord() } catch (e2) { }
              }
            } catch (e) { }
          }
        } else if (action === 'cancel') {
          storage.setItem('__formatPanelAction', '')
          clearInterval(currentPollTimer)
          currentPollTimer = null
          try { currentTaskPane.Visible = false } catch (e) { }
          try { currentTaskPane.Delete() } catch (e) { }
          currentTaskPane = null
          undoFormatDocument()
          return
        } else if (action === 'close') {
          storage.setItem('__formatPanelAction', '')
          clearInterval(currentPollTimer)
          currentPollTimer = null
          try { currentTaskPane.Visible = false } catch (e) { }
          try { currentTaskPane.Delete() } catch (e) { }
          currentTaskPane = null
          return
        }
      } catch (e) { }
    }
    currentPollTimer = setInterval(pollPanelAction, 500)

    //创建侧边任务窗格显示微调面板
    const panelUrl = Util.GetUrlPath() + Util.GetRouterHash() + '/formatpanel'
    console.log('[openFormatPanel] panelUrl =', panelUrl)
    const taskPane = window.Application.CreateTaskPane(panelUrl, '排版微调')
    console.log('[openFormatPanel] taskPane =', taskPane)
    if (taskPane) {
      currentTaskPane = taskPane
      taskPane.DockPosition = 0
      try { taskPane.Width = 220 } catch (e) { }
      taskPane.Visible = true
    } else {
      console.warn('[openFormatPanel] CreateTaskPane returned undefined')
      clearInterval(currentPollTimer)
      currentPollTimer = null
    }
  } catch (e) {
  }
}

//合并面板编辑结果到 specialElements
function mergePanelEdits(oldList, newList) {
  if (!Array.isArray(newList)) return oldList
  const result = []
  for (const item of newList) {
    const text = (item.text == null ? '' : String(item.text)).trim()
    if (!text) continue  //文本被清空则放弃该段
    //保留 start/end 用于精准格式化
    const old = oldList.find(o => o.start === item.start)
    result.push({
      text: text,
      start: item.start ?? (old ? old.start : undefined),
      end: item.end ?? (old ? old.end : undefined),
      type: item.type
    })
  }
  return result
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
    case 'btnAbout':
      return 'images/3.svg'
    case 'btnDetectSignature':
      return 'images/4.svg'
    case 'btnRemoveBlankLines':
      return 'images/5.svg'
    case 'btnSplitTitle':
      return 'images/6.svg'
    case 'btnCheckUpdate':
      return 'images/7.svg'
    case 'btnFormatSettings':
      return 'images/2.svg'
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

const CURRENT_VERSION = '1.1.0'
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

    if (cleanVersion !== CURRENT_VERSION) {
      const result = window.confirm(`检测到新版本：${cleanVersion}\n当前版本：${CURRENT_VERSION}\n\n是否前往下载更新？`)
      if (result) {
        window.Application.Hyperlink(PROJECT_URL)
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
