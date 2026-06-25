//==============================================================
// 类型记忆模块 (typememory.js)
//
// 记住用户在面板中调整过的文本→类型映射
// 下次排版时自动应用，精确匹配模式
//
// 存储路径：AppDataPath\WPSAutoFormat\typememory.json
// 格式：{ "市AGCC合作项目工作专班办公室": "sig", ... }
// 相同开始位置的多次修改，以最后一次为准
//==============================================================

import { getSegmentText } from './detect.js'

/** 获取记忆文件路径 */
function getTypeMemoryFilePath() {
  try {
    if (typeof window.Application !== 'undefined' && window.Application.Env) {
      const appDataPath = window.Application.Env.GetAppDataPath()
      return appDataPath + '\\WPSAutoFormat\\typememory.json'
    }
  } catch (e) { }
  return null
}

/** 读取记忆文件，返回 { text: type } 对象，失败返回 {} */
export function loadTypeMemory() {
  const filePath = getTypeMemoryFilePath()
  if (!filePath) return {}
  try {
    if (typeof window.Application !== 'undefined' && window.Application.FileSystem) {
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
          const parsed = JSON.parse(content)
          if (parsed && typeof parsed === 'object') return parsed
        }
      }
    }
  } catch (e) { }
  return {}
}

/** 写入记忆文件 */
export function saveTypeMemory(memory) {
  const filePath = getTypeMemoryFilePath()
  if (!filePath) return
  try {
    const fs = window.Application.FileSystem
    const dirPath = filePath.substring(0, filePath.lastIndexOf('\\'))
    if (!fs.Exists(dirPath)) {
      fs.Mkdir(dirPath)
    }
    if (fs.Exists(filePath)) {
      fs.Remove(filePath)
    }
    fs.AppendFile(filePath, JSON.stringify(memory, null, 2))
  } catch (e) { }
}

/**
 * 对比排版前后元素列表，记录类型变更到记忆文件
 * @param {Array} oldElements 排版前的元素快照
 * @param {Array} newElements 排版后的元素列表
 */
export function recordTypeChanges(oldElements, newElements, doc) {
  if (!Array.isArray(oldElements) || !Array.isArray(newElements)) return
  // 用 doc 取元素文本（result 不存 text，记忆键需文本）
  const getText = (el) => {
    if (el && typeof el.text === 'string') return el.text
    if (el && doc && typeof el.start === 'number' && typeof el.length === 'number') {
      return getSegmentText(doc, el.start, el.length)
    }
    return ''
  }
  const memory = loadTypeMemory()
  let changed = false

  // 位置索引：start → text，用于相同位置去重（最后一次修改为准）
  const posIndex = memory._posIndex || {}

  // 建立 oldElements 的 text→type 映射
  const oldMap = {}
  for (const el of oldElements) {
    const t = getText(el)
    if (t && el && el.type) {
      oldMap[t] = el.type
    }
  }

  // 遍历新列表，检测类型变更
  for (const el of newElements) {
    const t = getText(el)
    if (!t || !el || !el.type) continue
    // 跳过 length=0 的元素：matchedLen=0 时保留原 length 但 matched=false，
    // 此类元素无有效区间，不写入记忆（否则下次排版预认领会产生空条）
    if (typeof el.length === 'number' && el.length <= 0) continue
    const oldType = oldMap[t]
    // 类型从 X 变为 Y（含新增元素）
    if (oldType !== el.type) {
      // 相同开始位置去重：删除该位置之前的旧文本映射
      if (typeof el.start === 'number') {
        const posKey = String(el.start)
        const oldText = posIndex[posKey]
        if (oldText && oldText !== t && oldText in memory) {
          delete memory[oldText]
        }
        posIndex[posKey] = t
      }
      // 记忆格式：{ text: { type, length } } —— 记录类型 + 匹配长度
      // length 用于下次排版时逐字比对，超过此长度部分不认领
      memory[t] = { type: el.type, length: typeof el.length === 'number' ? el.length : t.length }
      changed = true
    }
  }

  if (changed) {
    memory._posIndex = posIndex
    saveTypeMemory(memory)
  }
}

/** 删除单条记忆 */
export function deleteTypeMemory(text) {
  const memory = loadTypeMemory()
  if (text in memory) {
    delete memory[text]
    saveTypeMemory(memory)
  }
}

/** 清空所有记忆 */
export function clearTypeMemory() {
  saveTypeMemory({})
}
