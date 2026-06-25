//==============================================================
// 落款库模块 (signature.js)
//
// 保存用户常用落款，"插入落款"按钮使用
// 单个落款 = 多行字符串（落款名 + 正文，如"XX办公室\n2026年6月24日"）
//
// 存储路径：AppDataPath\WPSAutoFormat\signatures.json
// 格式：[{ id: "uuid", name: "显示名", text: "落款全文" }, ...]
//==============================================================

/** 获取落款库文件路径 */
function getSignaturesFilePath() {
  try {
    if (typeof window.Application !== 'undefined' && window.Application.Env) {
      const appDataPath = window.Application.Env.GetAppDataPath()
      return appDataPath + '\\WPSAutoFormat\\signatures.json'
    }
  } catch (e) { }
  return null
}

/** 生成唯一 id */
function genId() {
  return 'sig_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8)
}

/** 读取落款库，返回数组，失败返回 [] */
export function loadSignatures() {
  const filePath = getSignaturesFilePath()
  if (!filePath) return []
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
          if (Array.isArray(parsed)) {
            // 兼容旧格式：纯字符串数组
            return parsed.map(item =>
              typeof item === 'string'
                ? { id: genId(), name: item.split(/[\r\n]/)[0].trim(), text: item }
                : { id: item.id || genId(), name: item.name || item.text.split(/[\r\n]/)[0].trim(), text: item.text }
            )
          }
        }
      }
    }
  } catch (e) { }
  return []
}

/** 写入落款库 */
export function saveSignatures(list) {
  const filePath = getSignaturesFilePath()
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
    fs.AppendFile(filePath, JSON.stringify(list, null, 2))
  } catch (e) { }
}

/** 新增落款，返回新数组（不可变更新） */
export function addSignature(text, name) {
  const list = loadSignatures()
  const cleanText = (text || '').replace(/\r+$/, '').trim()
  if (!cleanText) return list
  const displayName = (name || cleanText.split(/[\r\n]/)[0].trim()).slice(0, 40)
  list.push({ id: genId(), name: displayName, text: cleanText })
  saveSignatures(list)
  return list
}

/** 删除指定 id 的落款 */
export function deleteSignature(id) {
  const list = loadSignatures().filter(item => item.id !== id)
  saveSignatures(list)
  return list
}

/** 清空落款库 */
export function clearSignatures() {
  saveSignatures([])
}
