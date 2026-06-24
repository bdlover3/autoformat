import Util from './js/util.js'
import SystemDemo from './js/systemdemo.js'

//模块导入
import { detectElements, getSegmentText } from './js/detect.js'
import { applyBodyFormat, applySpecialFormat, boldEnumerations } from './js/format.js'
import { clearAllFormatting, setupPage } from './js/page.js'
import { removeBlankLines, splitTitleParagraph } from './js/docops.js'
import { detectAndFormatSpeechSignature } from './js/signature.js'
import { loadTypeMemory, recordTypeChanges, clearTypeMemory } from './js/typememory.js'

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

//落款/发言人是否缺失（autoFormatDocument 设置，openFormatPanel 推送给面板）
let footerMissing = false

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

  //面板挂载后主动请求初始数据：主线程即时推送 elements + footerMissing 标志
  if (msg.type === 'hello') {
    try {
      if (panelBroadcastChannel) {
        panelBroadcastChannel.postMessage({
          type: 'init',
          elements: JSON.parse(JSON.stringify(withTextSnapshot(specialElements))),
          footerMissing: footerMissing
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
      try {
        if (panelBroadcastChannel) {
          panelBroadcastChannel.postMessage({
            type: 'updateElements',
            elements: JSON.parse(JSON.stringify(withTextSnapshot(specialElements)))
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
  } else if (msg.type === 'runAction') {
    // 面板按钮触发的操作：执行对应函数
    try {
      const actions = {
        autoFormat: () => autoFormatDocument(),
        undoFormat: () => undoFormatDocument(),
        splitTitle: () => splitTitleParagraph(),
        removeBlank: () => removeBlankLines(),
        detectSignature: () => detectAndFormatSpeechSignature(getSettings, applySpecialFormat),
        openSettings: () => { try { window.Application.ShowDialog(Util.GetUrlPath() + Util.GetRouterHash() + '/dialog', '调整固定格式', 400 * window.devicePixelRatio, 500 * window.devicePixelRatio, true) } catch (e) { } },
        clearMemory: () => { clearTypeMemory() }
      }
      const fn = actions[msg.action]
      if (fn) fn()
    } catch (e) { console.warn('[handlePanelMessage] runAction failed:', e) }
  } else if (msg.type === 'saveSettings') {
    // 面板常用设置保存
    try {
      const updated = getSettings()
      if (msg.settings) Object.assign(updated, msg.settings)
      saveSettings(updated)
    } catch (e) { }
  } else if (msg.type === 'loadSettings') {
    // 面板请求当前设置
    try {
      const s = getSettings()
      if (panelBroadcastChannel) {
        panelBroadcastChannel.postMessage({
          type: 'loadSettings',
          settings: {
            enablePageNumber: s.enablePageNumber,
            clearFormatting: s.clearFormatting,
            autoSplitSubtitle: s.autoSplitSubtitle
          }
        })
      }
    } catch (e) { }
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
          el.length = upd.newLength
        }
      }
    }

    //落款/发言人缺失：传给面板显示提示条（不再用 alert 打断）
    const hasFooter = specialElements.some(el => el.type === 'sig' || el.type === 'date' || el.type === 'authorInfo')
    footerMissing = !hasFooter

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

//合并面板编辑结果到 specialElements，并执行面板编辑微调逻辑：
//  对每个有 text 变化的元素，在 doc 里从 start 开始逐字比对，
//  找出最长匹配前缀，更新该元素的 start+length 为匹配区间。
//  未命中部分刷回正文字体大小（不改缩进）。
//  body 类型元素从 specialElements 移除（回正文格式）。
function mergePanelEdits(oldList, newList) {
  if (!Array.isArray(newList)) return oldList
  const doc = window.Application.ActiveDocument
  const result = []
  for (const item of newList) {
    if (item.type === 'body') continue  // 选"不是落款"，移出特殊元素
    const text = (item.text == null ? '' : String(item.text)).trim()
    if (!text) continue  //文本被清空则放弃该段
    const old = oldList.find(o => o.start === item.start)
    const start = item.start ?? (old ? old.start : undefined)
    let length = item.length ?? (old ? old.length : undefined)
    // 面板编辑微调：逐字比对，更新 length 为最长匹配前缀
    if (doc && typeof start === 'number' && typeof length === 'number' && text) {
      const matchedLen = matchDocPrefix(doc, start, text)
      if (matchedLen < length) {
        // 未命中部分刷回正文字体大小（不改缩进）
        try {
          const rng = doc.Range(start + matchedLen, start + length)
          rng.Font.Size = 16  // 三号正文
          rng.Font.Name = '仿宋_GB2312'
          rng.Font.NameAscii = 'Times New Roman'
          rng.Font.NameOther = 'Times New Roman'
          rng.Font.Bold = false
        } catch (e) { }
        length = matchedLen
      }
    }
    result.push({
      text: text,
      start: start,
      length: length,
      type: item.type
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
