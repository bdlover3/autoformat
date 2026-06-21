import Util from './js/util.js'
import SystemDemo from './js/systemdemo.js'

//模块导入
import { detectElements } from './js/detect.js'
import { applyBodyFormat, applySpecialFormat, boldEnumerations } from './js/format.js'
import { clearAllFormatting, setupPage } from './js/page.js'
import { removeBlankLines, splitTitleParagraph } from './js/docops.js'
import { loadTypeMemory, recordTypeChanges } from './js/typememory.js'

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

//无落款/发言人提示状态（每个文档仅提示一次）
let noFooterWarned = false
let noFooterWarnedDocName = ''

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
    if (missingFonts.length > 0) {
      // 通过 PluginStorage 传递数据（ShowDialog 是独立窗口，不共享 window）
      try {
        const storage = window.Application.PluginStorage
        storage.setItem('__fontDialogPending', JSON.stringify({ missingFonts }))
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
      }
      // 从 PluginStorage 读取对话框结果
      let result = null
      try {
        const storage = window.Application.PluginStorage
        const raw = storage.getItem('__fontDialogResult')
        if (raw) {
          result = JSON.parse(raw)
          storage.removeItem('__fontDialogResult')
        }
      } catch (e) { }

      if (result && result.disableFontWarning) {
        // "不再提醒"：保存设置，关联设置对话框的屏蔽选项
        const updated = getSettings()
        updated.disableFontWarning = true
        saveSettings(updated)
      } else if (result && result.replacements) {
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
function handlePanelMessage(msg) {
  if (!msg || !msg.type) return

  console.log('[handlePanelMessage] msg.type =', msg.type)

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
            el.end = upd.newEnd
          }
        }
      }
      //无论位置是否变化，都将最新数据推回面板（类型切换后格式/位置都可能变化）
      try {
        if (panelBroadcastChannel) {
          panelBroadcastChannel.postMessage({
            type: 'updateElements',
            elements: JSON.parse(JSON.stringify(specialElements))
          })
        }
      } catch (e2) { }
      // 记录类型变更到记忆
      recordTypeChanges(oldSnapshot, specialElements)
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
  }
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
          el.end = upd.newEnd
        }
      }
    }

    //无落款/发言人提示（每个文档仅一次）
    const hasFooter = specialElements.some(el => el.type === 'sig' || el.type === 'date' || el.type === 'authorInfo' || el.type === 'authorInfo')
    if (!hasFooter) {
      try {
        const docName = doc.FullName || doc.Name || ''
        if (docName !== noFooterWarnedDocName) {
          noFooterWarnedDocName = docName
          noFooterWarned = false
        }
        if (!noFooterWarned) {
          noFooterWarned = true
          alert('未检测到落款或发言人，如需手动指定，可在排版微调面板中调整类型。')
        }
      } catch (e) { }
    }

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
    try { currentFormatDocName = doc.FullName } catch (e) { currentFormatDocName = '' }
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

    //通过 PluginStorage 传递初始数据给 TaskPane（面板 onMounted 读取）
    try {
      const storage = window.Application.PluginStorage
      storage.setItem('__formatPanelData', JSON.stringify({
        elements: JSON.parse(JSON.stringify(specialElements))
      }))
    } catch (e) {
      console.warn('[openFormatPanel] PluginStorage write failed:', e)
    }

    //创建 BroadcastChannel 接收面板即时消息
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
        try { activeDocName = window.Application.ActiveDocument.FullName } catch (e) { }
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

function OnGetEnabled() {
  return true
}

function OnGetVisible() {
  return true
}

function OnGetLabel() {
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
