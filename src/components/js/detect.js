//==============================================================
// 元素检测模块 (detect.js)
//
// 核心设计：
//   1. buildBaseTxt = 全文非空行映射（text/start/end）
//   2. textMap = BaseTxt 的拷贝（Map<自增索引, BaseTxtItem>）
//   3. 两阶段检测：
//      - 第一阶段：头部区域顺序识别（按规则 headSequence 配置）
//      - 第二阶段：递归扫描剩余文本（规则驱动，非 switch 硬编码）
//   4. 结果元素结构：{ text, start, end, type }
//      start/end = WPS Range 字符位置，用于精准格式化
//==============================================================

import {
  getSpecialRules, getHeadSequenceTypes
} from './rules.js'
import {
  docNumberPattern, subtitlePattern, addresseeEndPattern,
  h1Pattern, h2Pattern, h3Pattern, h4Pattern,
  datePattern, attachmentPattern, endSymbolPattern,
  isSpeechSignature, isTitleLike, looksLikeOtherPattern
} from './patterns.js'

//--- 声明式 detect 规格的解释器 ---

/** 正则名 → 正则对象的映射表 */
const PATTERN_MAP = {
  docNumberPattern, subtitlePattern, addresseeEndPattern,
  h1Pattern, h2Pattern, h3Pattern, h4Pattern,
  datePattern, attachmentPattern, endSymbolPattern
}

/**
 * 根据声明式 detect 规格匹配文本
 * @param {string} text 待检测文本
 * @param {Object} spec 规则的 detect 规格
 * @returns {boolean}
 */
function matchDetect(text, spec) {
  if (!spec) return false

  const mode = spec.mode

  // 简单正则匹配
  if (mode === 'isTitleLike') return isTitleLike(text)
  if (mode === 'notTitleLike') return !isTitleLike(text)
  if (mode === 'isSpeechSignature') return isSpeechSignature(text)

  // 组合正则（如 h3 匹配 h3Pattern || h4Pattern）
  if (mode === 'composite') {
    const p1 = PATTERN_MAP[spec.pattern]
    const p2 = PATTERN_MAP[spec.extraPattern]
    if (p1 && p1.test(text)) return true
    if (p2 && p2.test(text)) return true
    return false
  }

  // 默认：单正则匹配
  const pattern = PATTERN_MAP[spec.pattern]
  if (!pattern) return false
  if (!pattern.test(text)) return false

  // 长度约束
  if (spec.minLength && text.length < spec.minLength) return false
  if (spec.maxLength && text.length > spec.maxLength) return false

  // 否定约束
  if (spec.negateTitleLike && isTitleLike(text)) return false
  if (spec.negateSpeechSig && isSpeechSignature(text)) return false

  return true
}

/**
 * 根据声明式 continuation 规格判断续行
 * @param {string} text 续行文本
 * @param {Object} contSpec 规则的 continuation 规格
 * @returns {boolean} true = 可以续行
 */
function matchContinuation(text, contSpec) {
  if (!contSpec) return true // 无规格则默认可续

  // 排除正则：如果匹配则不能续行
  if (contSpec.negatePattern) {
    const pattern = PATTERN_MAP[contSpec.negatePattern]
    if (pattern && pattern.test(text)) return false
  }
  // 排除模式：如 looksLikeOtherPattern
  if (contSpec.negateMode === 'looksLikeOtherPattern') {
    if (looksLikeOtherPattern(text, true)) return false
  }
  return true
}

/**
 * 根据声明式 regionOffset 计算区域范围
 * @param {Object} offsetSpec regionOffset 规格
 * @param {Object} ctx { titleEndIdx }
 * @returns {{ min: number, max: number } | null}
 */
function calcRegionRange(offsetSpec, ctx) {
  if (!offsetSpec) return null
  if (offsetSpec.from === 'titleEnd') {
    const base = ctx.titleEndIdx || 0
    return { min: base + (offsetSpec.min || 0), max: base + (offsetSpec.max || 0) }
  }
  return null
}

/**
 * 从文档构建非空行映射（BaseTxt）
 * 索引为自增编号(0-based)，元素结构：
 *   text  - trimmed 文本内容
 *   start - WPS Range.Start 字符位置
 *   end   - WPS Range.End 字符位置
 */
function buildBaseTxt(doc) {
  const result = []
  try {
    const paragraphs = doc.Paragraphs
    const count = paragraphs.Count
    for (let i = 1; i <= count; i++) {
      try {
        const para = paragraphs.Item(i)
        const full = para.Range.Text.replace(/[\r\n]+$/, '')
        const trimmed = full.trim()
        if (trimmed) {
          //计算 trimmed 文本在段落中的实际起止位置（跳过前导空格）
          const leadingSpaces = full.length - full.trimStart().length
          const trailingSpaces = full.length - full.trimEnd().length
          const paraStart = para.Range.Start + leadingSpaces
          const paraEnd = para.Range.End - trailingSpaces
          result.push({
            text: trimmed,
            start: paraStart,
            end: paraEnd
          })
        }
      } catch (e) { }
    }
  } catch (e) { }
  return result
}

/**
 * 从 WPS 文档检测特殊要素
 *
 * 结果元素结构：
 *   text  - trimmed 文本内容
 *   start - WPS Range.Start 字符位置
 *   end   - WPS Range.End 字符位置
 *   type  - 要素类型
 *
 * @param {Object} doc WPS ActiveDocument 对象
 * @returns {Array} 检测到的特殊要素列表，按 start 升序
 */
export function detectElements(doc) {
  const baseTxt = buildBaseTxt(doc)
  const total = baseTxt.length
  if (total === 0) return []

  // textMap：key = BaseTxt 自增索引, value = BaseTxtItem（含 start/end）
  const textMap = new Map()
  for (let i = 0; i < total; i++) {
    textMap.set(i, { ...baseTxt[i] })
  }

  const result = []

  //--- 辅助函数 ---

  /** 认领一行：从 textMap 移除并写入 result，只保留 start/end */
  function claim(idx, type) {
    const entry = textMap.get(idx)
    if (!entry) return false
    textMap.delete(idx)
    result.push({
      text: entry.text,
      start: entry.start,
      end: entry.end,
      type: type
    })
    return true
  }

  /** 在 textMap 中按 BaseTxt 索引顺序找第一个可用项 */
  function firstAvailable(startFrom) {
    for (let i = startFrom; i < total; i++) {
      if (textMap.has(i)) return i
    }
    return -1
  }

  /** 获取 textMap 中所有剩余索引，按升序排列 */
  function remainingIndices() {
    const indices = []
    for (const idx of textMap.keys()) {
      indices.push(idx)
    }
    indices.sort((a, b) => a - b)
    return indices
  }

  /** 判断 idx 前面是否有空行（idx-1 不在 textMap 中 = 被认领或原本不存在） */
  function hasGapBefore(idx) {
    return !textMap.has(idx - 1)
  }

  /** 计算 footer 区域的 BaseTxt 索引下界（基于字符位置，不用 paraIndex） */
  function footerFloor() {
    const titleEl = result.find(r => r.type === 'title')
    if (!titleEl) return 0
    const titleIdx = baseTxt.findIndex(b => b.start === titleEl.start && b.end === titleEl.end)
    if (titleIdx < 0) return 0
    const minAfterTitle = 5
    const halfIdx = Math.ceil(total / 2)
    const floorK = Math.min(titleIdx + minAfterTitle, halfIdx)
    return Math.max(0, floorK)
  }

  //=== 第一阶段：头部区域（附件 → 文号 → 标题 → 副标题）===
  // 按规则的 headSequence 配置顺序处理

  const headTypes = new Set(getHeadSequenceTypes())
  const headRules = getSpecialRules()
    .filter(r => headTypes.has(r.type))
    .sort((a, b) => a.priority - b.priority)

  // 追踪头部最后一个认领位置，用于 afterType 判断
  let lastHeadIdx = -1

  for (const rule of headRules) {
    const sp = rule.special || {}
    const detectSpec = rule.detect

    if (sp.contiguous) {
      // 连续型：从文首或上次头部认领位置开始，连续认领
      const startFrom = lastHeadIdx >= 0 ? lastHeadIdx + 1 : 0
      for (let i = startFrom; i < total; i++) {
        if (!textMap.has(i)) continue
        if (matchDetect(textMap.get(i).text, detectSpec)) {
          claim(i, rule.type)
          lastHeadIdx = i
        } else {
          break
        }
      }
    } else if (sp.afterType) {
      // 紧跟型：必须在某类型之后
      const prevEl = result.find(r => r.type === sp.afterType)
      if (!prevEl) continue
      const prevIdx = baseTxt.findIndex(b => b.start === prevEl.start && b.end === prevEl.end)
      if (prevIdx < 0) continue
      const candidateIdx = prevIdx + 1
      if (textMap.has(candidateIdx) && matchDetect(textMap.get(candidateIdx).text, detectSpec)) {
        claim(candidateIdx, rule.type)
        lastHeadIdx = candidateIdx
      }
    } else if (sp.multiline) {
      // 多行型：第一行匹配 detect，后续行匹配 continuation 规格
      const startFrom = lastHeadIdx >= 0 ? lastHeadIdx + 1 : 0
      const firstIdx = firstAvailable(startFrom)
      if (firstIdx < 0) continue
      const firstText = textMap.get(firstIdx).text
      if (!matchDetect(firstText, detectSpec)) continue

      claim(firstIdx, rule.type)
      lastHeadIdx = firstIdx

      const maxLines = sp.maxLines || 3
      const contSpec = sp.continuation
      for (let i = firstIdx + 1; i <= Math.min(firstIdx + maxLines - 1, total - 1); i++) {
        if (!textMap.has(i)) break
        const curr = textMap.get(i).text
        if (!matchContinuation(curr, contSpec)) break
        claim(i, rule.type)
        lastHeadIdx = i
      }
    } else {
      // 通用头部规则：从上次头部位置后找第一个匹配
      const startFrom = lastHeadIdx >= 0 ? lastHeadIdx + 1 : 0
      const idx = firstAvailable(startFrom)
      if (idx >= 0 && matchDetect(textMap.get(idx).text, detectSpec)) {
        claim(idx, rule.type)
        lastHeadIdx = idx
      }
    }
  }

  //=== 第二阶段：递归扫描剩余位置（规则驱动）===

  const detectOrder = getSpecialRules()
    .filter(r => !headTypes.has(r.type))
    .sort((a, b) => a.priority - b.priority)

  // 找到 title 的 BaseTxt 索引，用于 signature 的区域判断
  const titleEl = result.find(r => r.type === 'title')
  const titleEndIdx = titleEl
    ? baseTxt.findIndex(b => b.start === titleEl.start && b.end === titleEl.end)
    : -1

  let changed = true
  while (changed) {
    changed = false

    for (const rule of detectOrder) {
      const indices = remainingIndices()
      const sp = rule.special || {}
      const detectSpec = rule.detect

      // sig+date 是一组特殊逻辑：从文末向上找日期，再向上收集落款
      if (sp.region === 'footer' && sp.scanDirection === 'reverse') {
        if (rule.type === 'date') {
          // 日期只认领一次
          const alreadyDate = result.some(el => el.type === 'date')
          if (alreadyDate) continue

          const floor = footerFloor()
          const revIndices = [...indices].reverse()
          let dateIdx = -1

          for (const idx of revIndices) {
            const t = textMap.get(idx).text
            if (matchDetect(t, detectSpec)) {
              if (idx < floor) break
              dateIdx = idx
            }
            break  // 只看最后一个未认领位置
          }

          if (dateIdx >= 0) {
            claim(dateIdx, 'date')
            changed = true
          }
        } else if (rule.type === 'sig') {
          // 落款：从日期向上收集
          const dateEl = result.find(r => r.type === 'date')
          if (!dateEl) continue

          const dateIdx = baseTxt.findIndex(b => b.start === dateEl.start && b.end === dateEl.end)
          if (dateIdx < 0) continue

          const floor = footerFloor()
          let collected = 0
          let nonEmpty = 0
          let cur = dateIdx - 1
          const maxLines = sp.maxLines || 2

          while (cur >= floor && collected < maxLines && nonEmpty < 6) {
            if (!textMap.has(cur)) {
              if (collected > 0) break
              cur--
              continue
            }
            nonEmpty++
            const t = textMap.get(cur).text
            if (isTitleLike(t) && !isSpeechSignature(t)) break
            claim(cur, 'sig')
            collected++
            changed = true
            cur--
          }
        }
        continue
      }

      // 通用规则：遍历剩余位置，用 matchDetect 匹配
      for (const idx of indices) {
        const entry = textMap.get(idx)
        if (!entry) continue

        // 区域约束
        if (sp.region === 'head') {
          if (titleEndIdx < 0) continue
          const range = calcRegionRange(sp.regionOffset, { titleEndIdx })
          if (range && (idx < range.min || idx > range.max)) continue
          // 空行隔开约束
          if (sp.gapRequired && !hasGapBefore(idx)) continue
        }

        if (matchDetect(entry.text, detectSpec)) {
          claim(idx, rule.type)
          changed = true
        }
      }
    }
  }

  result.sort((a, b) => a.start - b.start)
  return result
}
