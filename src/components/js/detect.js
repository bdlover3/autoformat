//==============================================================
// 元素检测模块 (detect.js)
//
// 核心设计（遵循 AGENTS.md "核心工作思路"）：
//   1. buildBaseTxt = 全文纯文本字符串，与 doc.Range 字符位置一一对应
//      （段尾 \r，不 trim，baseTxt[i] === doc.Range(i, i).Text）
//   2. 在 baseTxt 字符串上正则全文扫描，regex.exec 拿 index + length
//   3. result = [{ start, length, type, ... }] 指针集合，不存文本副本
//   4. 已识别区间在后续扫描中排除（区间集合），避免重复标记
//==============================================================

import {
  docNumberPattern, subtitlePattern, addresseeEndPattern,
  h1Pattern, h2Pattern, h3Pattern, h4Pattern,
  datePattern, attachmentPattern, endSymbolPattern,
  isSpeechSignature, isTitleLike, looksLikeOtherPattern,
  isClosingFormula, measureWidth, findFirstEndSymbol
} from './patterns.js'
import { getOrderedSpecialRules, getRuleByType } from './rules.js'
import { loadTypeMemory } from './typememory.js'
import { calcLineCharCount } from './format.js'

//--- 正则名 → 正则对象映射表 ---
const PATTERN_MAP = {
  docNumberPattern, subtitlePattern, addresseeEndPattern,
  h1Pattern, h2Pattern, h3Pattern, h4Pattern,
  datePattern, attachmentPattern, endSymbolPattern
}

/**
 * 构建 BaseTxt：与 doc.Range 字符位置一一对应的全文纯文本字符串。
 * 每段取 para.Range.Text（含段尾 \r），直接拼接。
 * 不 trim，不跳过空段 —— baseTxt[i] 即 doc.Range(i, i).Text。
 * @param {Object} doc WPS ActiveDocument
 * @returns {string} 全文纯文本
 */
function buildBaseTxt(doc) {
  let text = ''
  try {
    const paragraphs = doc.Paragraphs
    const count = paragraphs.Count
    for (let i = 1; i <= count; i++) {
      try {
        const para = paragraphs.Item(i)
        text += para.Range.Text
      } catch (e) { }
    }
  } catch (e) { }
  return text
}

/**
 * 在 baseTxt 中找位置 pos 所在段落的边界 [paraStart, paraEnd)。
 * 段落以 \r 分隔。paraEnd 含段尾 \r 之后位置（即下一段起点）。
 * 用于落款/日期对齐时定位整段。
 */
function findParagraphBounds(baseTxt, pos) {
  if (pos < 0 || pos >= baseTxt.length) return null
  // 向左找段首
  let paraStart = pos
  while (paraStart > 0 && baseTxt.charAt(paraStart - 1) !== '\r') paraStart--
  // 向右找段尾（含 \r）
  let paraEnd = pos
  while (paraEnd < baseTxt.length && baseTxt.charAt(paraEnd) !== '\r') paraEnd++
  if (paraEnd < baseTxt.length) paraEnd++  // 含 \r
  return { paraStart, paraEnd }
}

/**
 * 区间集合：记录已识别的 [start, end) 区间，用于排除重复标记。
 * 支持查询某区间是否与已有区间重叠，以及添加新区间。
 */
class IntervalSet {
  constructor() {
    this.intervals = []  // 按 start 升序，不相交
  }

  /** 查询 [s, e) 是否与任何已有区间重叠 */
  overlaps(s, e) {
    for (const iv of this.intervals) {
      if (iv.start >= e) break  // 后续更靠右，不可能重叠
      if (iv.end > s) return true  // 重叠
    }
    return false
  }

  /** 添加 [s, e) 区间（调用方需保证不与已有重叠，或允许部分覆盖） */
  add(s, e) {
    this.intervals.push({ start: s, end: e })
    this.intervals.sort((a, b) => a.start - b.start)
  }

  /** 在 [s, e) 区间内找第一个未被占用的位置（用于落款反向收集时跳过已认领段） */
  isFullyCovered(s, e) {
    for (const iv of this.intervals) {
      if (iv.start <= s && iv.end >= e) return true
    }
    return false
  }

  /** 查询 [s, e) 是否被任何已有区间完全覆盖 */
  contains(s, e) {
    return this.isFullyCovered(s, e)
  }
}

/**
 * 根据声明式 detect 规格在 baseTxt 上全文扫描，返回所有匹配区段。
 * 每个区段 = { start, length, text }（text 仅供检测辅助，不入 result）。
 * @param {string} baseTxt 全文字符串
 * @param {Object} spec 规则的 detect 规格
 * @param {IntervalSet} used 已占用区间集合（跳过重叠匹配）
 * @returns {Array} 匹配区段列表
 */
function scanDetect(baseTxt, spec, used) {
  if (!spec) return []
  // 所有模式统一按段扫描：每段独立 test（^ 锚点匹配段首），命中则用段在 baseTxt 中的偏移算 start/length。
  // 原因：模式正则都用 ^ 锚点（只匹配字符串开头），直接对全文字符串 exec 只能匹配文首那一个。
  // 按段 test 则 ^ 匹配段首，行为正确。
  return scanByParagraph(baseTxt, spec, used)
}

/**
 * 按段逐段判断所有模式。
 * 按 \r 分段，每段 trim 后用对应模式判断，匹配则记录该段区间 {start, length, text}。
 * 统一入口：pattern/composite/isTitleLike/notTitleLike/isSpeechSignature 都走这里。
 * 原因：模式正则都用 ^ 锚点，按段 test 时 ^ 匹配段首，行为正确。
 */
function scanByParagraph(baseTxt, spec, used) {
  const mode = spec.mode
  const results = []
  const total = baseTxt.length
  let paraStart = 0
  for (let i = 0; i <= total; i++) {
    if (i === total || baseTxt.charAt(i) === '\r') {
      const segEnd = (i < total && baseTxt.charAt(i) === '\r') ? i : i
      const raw = baseTxt.substring(paraStart, segEnd)
      const trimmed = raw.trim()
      if (trimmed) {
        const leading = raw.length - raw.trimStart().length
        const segStart = paraStart + leading
        const segLength = trimmed.length
        if (!used || !used.overlaps(segStart, segStart + segLength)) {
          let hit = false
          if (mode === 'isTitleLike') hit = isTitleLike(trimmed)
          else if (mode === 'notTitleLike') hit = !isTitleLike(trimmed)
          else if (mode === 'isSpeechSignature') hit = isSpeechSignature(trimmed)
          else if (mode === 'composite') {
            const p1 = PATTERN_MAP[spec.pattern]
            const p2 = PATTERN_MAP[spec.extraPattern]
            if (p1 && p1.test(trimmed)) hit = true
            else if (p2 && p2.test(trimmed)) hit = true
          } else if (mode === 'pattern' || !mode) {
            const pattern = PATTERN_MAP[spec.pattern]
            if (pattern && pattern.test(trimmed)) hit = true
          }
          if (hit) {
            // 长度约束
            if (spec.minLength && trimmed.length < spec.minLength) {
              // 长度不足，跳过
            } else if (spec.maxLength && trimmed.length > spec.maxLength) {
              // 长度超，跳过
            } else if (spec.negateTitleLike && isTitleLike(trimmed)) {
              // 否定约束：像标题则跳过
            } else if (spec.negateSpeechSig && isSpeechSignature(trimmed)) {
              // 否定约束：像发言人则跳过
            } else {
              results.push({ start: segStart, length: segLength, text: trimmed })
            }
          }
        }
      }
      paraStart = (i < total && baseTxt.charAt(i) === '\r') ? i + 1 : i
    }
  }
  return results
}

/**
 * 标题跨行续行合并：从首行匹配位置向下，尝试合并续行（最多 maxScanLines 行）。
 * 续行条件：段落连续（中间无空段）、不含结束符号、不像其他模式。
 * 返回合并后的 { start, length }。
 */
function mergeContinuationLines(baseTxt, firstStart, firstLength, maxScanLines, used) {
  if (!maxScanLines || maxScanLines <= 1) return { start: firstStart, length: firstLength }
  let end = firstStart + firstLength
  let linesAdded = 0
  // 从首行段尾开始向下找续行
  let searchFrom = end
  while (linesAdded < maxScanLines - 1 && searchFrom < baseTxt.length) {
    // 跳过当前段尾 \r
    if (baseTxt.charAt(searchFrom) === '\r') searchFrom++
    if (searchFrom >= baseTxt.length) break
    // 找下一行段边界
    let lineEnd = searchFrom
    while (lineEnd < baseTxt.length && baseTxt.charAt(lineEnd) !== '\r') lineEnd++
    const lineRaw = baseTxt.substring(searchFrom, lineEnd)
    const lineTrim = lineRaw.trim()
    if (!lineTrim) break  // 空段中断
    // 续行不能是结束符号开头/包含（标题不能跨句号续行）
    if (endSymbolPattern.test(lineTrim)) break
    // 续行不能像其他已知模式（避免吞下一级标题）
    if (looksLikeOtherPattern(lineTrim, true)) break
    // 续行不能已被占用
    if (used && used.overlaps(searchFrom, lineEnd)) break
    // 合并这一行
    end = lineEnd
    linesAdded++
    searchFrom = lineEnd
  }
  return { start: firstStart, length: end - firstStart }
}

/**
 * 标题/正文同行截断：在 [start, start+length) 区间内找第一个结束符号，
 * 截断到符号前。返回新的 { start, length }；无符号或符号在末尾返回原值。
 */
function truncateSegmentAtEndSymbol(baseTxt, start, length) {
  const segText = baseTxt.substring(start, start + length)
  const symIdx = findFirstEndSymbol(segText)
  if (symIdx <= 0 || symIdx >= segText.length) return { start, length }
  return { start, length: symIdx }
}

/**
 * 从 WPS 文档检测特殊要素。
 *
 * 结果元素结构（指针集合，不存文本副本）：
 *   start  - WPS Range 字符位置（= baseTxt 字符偏移）
 *   length - 持续字符数
 *   type   - 要素类型
 *   matched - 是否仍匹配规则（格式化时核对用，可选）
 *
 * @param {Object} doc WPS ActiveDocument 对象
 * @param {Object} settings 用户设置（用于行宽计算）
 * @returns {Array} 检测到的特殊要素指针列表，按 start 升序
 */
export function detectElements(doc, settings) {
  const baseTxt = buildBaseTxt(doc)
  if (baseTxt.length === 0) return []

  const used = new IntervalSet()  // 已识别区间集合
  const result = []

  //--- 记忆预认领：用户曾手动调整过的文本→类型映射 ---
  // 按段扫，若段文本在记忆中，直接认领该段
  const memory = loadTypeMemory()
  const memoryKeys = Object.keys(memory)
  if (memoryKeys.length > 0) {
    const paras = scanAllParagraphs(baseTxt)
    for (const p of paras) {
      if (p.text in memory) {
        result.push({ start: p.start, length: p.length, type: memory[p.text] })
        used.add(p.start, p.start + p.length)
      }
    }
  }

  //--- 计算行宽（用于落款不满行判断） ---
  let lineCharCount = 28
  try {
    lineCharCount = calcLineCharCount(doc, settings)
  } catch (e) { }

  //--- 找 title 位置（用于 head/footer 区域约束） ---
  // title 需先识别，其他 head 规则依赖 titleEnd
  let titleEnd = -1  // baseTxt 中 title 结束位置

  //--- 按优先级顺序执行规则 ---
  const rules = getOrderedSpecialRules()

  // 第一遍：先识别 title（其他规则依赖 titleEnd）
  const titleRule = getRuleByType('title')
  if (titleRule) {
    const segs = scanDetect(baseTxt, titleRule.detect, used)
    // title 取第一个匹配（头部区域）
    if (segs.length > 0) {
      let seg = segs[0]
      // title 跨行续行合并
      if (titleRule.special && titleRule.special.maxScanLines) {
        const merged = mergeContinuationLines(baseTxt, seg.start, seg.length, titleRule.special.maxScanLines, used)
        seg = merged
      }
      result.push({ start: seg.start, length: seg.length, type: 'title' })
      used.add(seg.start, seg.start + seg.length)
      titleEnd = seg.start + seg.length
    }
  }

  //--- 前置识别 authorInfo 区（title 后空行隔开的发言人/日期几行） ---
  // 必须在 h1/h2/h3 扫描前做，否则发言区里的日期（如 "2026.05"）会被 h3Pattern 抢走。
  // 条件：title 后空行隔开、不满行、发言人或日期格式、最多 6 行。
  if (titleEnd >= 0) {
    const paras = scanAllParagraphs(baseTxt)
    // 找 title 所在段索引
    let titleParaIdx = -1
    for (let i = 0; i < paras.length; i++) {
      if (paras[i].start <= titleEnd && paras[i].start + paras[i].length >= titleEnd) {
        titleParaIdx = i
        break
      }
    }
    console.log('[detect] authorInfo前置: titleEnd=', titleEnd, 'titleParaIdx=', titleParaIdx, 'paras总数=', paras.length)
    if (titleParaIdx >= 0) {
      // 从 title 后一段开始，空行隔开，最多看 6 行
      let i = titleParaIdx + 1
      let looked = 0
      // 要求 title 后紧跟空行（gapRequired）
      // scanAllParagraphs 已跳过空段，所以 title 后第一个 paras[i] 就是空行后的第一行
      while (i < paras.length && looked < 6) {
        const p = paras[i]
        if (used.contains(p.start, p.start + p.length)) { i++; continue }
        const t = p.text
        console.log('[detect] authorInfo前置 看 paras[', i, ']=', JSON.stringify(t), 'looked=', looked)
        // 遇到一级/二级/三级标题 → 立即中断，不吞标题
        // 遇到一级/二级/三级标题 → 立即中断，不吞标题
        // 但日期（如 2026.05）会匹配 h3Pattern(^\d+\.)，需排除：日期不算标题，不 break
        if (h1Pattern.test(t) || h2Pattern.test(t) || h4Pattern.test(t)) break
        if (h3Pattern.test(t) && !datePattern.test(t)) break
        // 满行正文 → 进入正文区，停止
        if (measureWidth(t) >= lineCharCount * 0.75) break
        // 客套语中断
        if (isClosingFormula(t)) break
        // 必须是发言人或日期格式才认领
        if (isSpeechSignature(t) || datePattern.test(t)) {
          console.log('[detect] authorInfo前置 认领 authorInfo:', JSON.stringify(t))
          result.push({ start: p.start, length: p.length, type: 'authorInfo' })
          used.add(p.start, p.start + p.length)
          looked++
          i++
        } else {
          // 非发言人/日期格式的短行，可能是单位名等，也认成 authorInfo（居中）
          // 但避免吞正文：只在前 3 行内收，且不满行、不像标题
          if (looked < 3 && t.length <= 30 && !isTitleLike(t)) {
            console.log('[detect] authorInfo前置 else认领 authorInfo:', JSON.stringify(t))
            result.push({ start: p.start, length: p.length, type: 'authorInfo' })
            used.add(p.start, p.start + p.length)
            looked++
            i++
          } else {
            console.log('[detect] authorInfo前置 break:', JSON.stringify(t))
            break
          }
        }
      }
    }
  }

  //--- 落款/日期：footer 反向扫描（一起处理，sig 从 date 向上收集） ---
  // 先处理，避免被前面规则误认
  processFooter(baseTxt, used, result, lineCharCount)

  //--- 其余规则按优先级全文扫描 ---
  for (const rule of rules) {
    if (rule.type === 'title') continue  // 已处理
    if (rule.type === 'sig' || rule.type === 'date') continue  // footer 已处理

    const sp = rule.special || {}
    const segs = scanDetect(baseTxt, rule.detect, used)

    for (const seg of segs) {
      let segStart = seg.start
      let segLength = seg.length

      // 区域约束
      if (sp.region === 'head') {
        // head 区域 = title 之前 + title 后 regionOffset 范围
        // 简化：head 规则在 titleEnd 之前或紧邻 title 后
        if (titleEnd >= 0 && sp.regionOffset && sp.regionOffset.from === 'titleEnd') {
          const min = titleEnd + (sp.regionOffset.min || 0)
          const max = titleEnd + (sp.regionOffset.max || 0)
          if (segStart < min || segStart > max) continue
        } else if (titleEnd >= 0 && segStart >= titleEnd && !sp.regionOffset) {
          // 无 regionOffset 的 head 规则（attachment/docNumber/addressee）：必须在 title 之前
          continue
        }
        // gapRequired：需要前面有空行
        if (sp.gapRequired && segStart > 0) {
          // 检查 segStart 前是否有空段
          let prev = segStart - 1
          let hasGap = false
          while (prev >= 0) {
            if (baseTxt.charAt(prev) === '\r') {
              hasGap = true
              break
            }
            if (baseTxt.charAt(prev) !== ' ' && baseTxt.charAt(prev) !== '\t') break
            prev--
          }
          if (!hasGap) continue
        }
      }

      // attachment contiguous：从文首连续
      if (sp.region === 'headStart' && sp.contiguous) {
        if (segStart !== 0 && baseTxt.charAt(segStart - 1) !== '\r') continue
        // 取该段全部
        const bounds = findParagraphBounds(baseTxt, segStart)
        if (bounds) segLength = bounds.paraEnd - segStart
      }

      // afterType：必须紧跟某类型之后
      if (sp.afterType) {
        const prevEl = result.find(r => r.type === sp.afterType)
        if (!prevEl) continue
        const prevEnd = prevEl.start + prevEl.length
        // seg 必须紧跟在 prevEnd 之后（中间只允许 \r 和空格）
        let gap = segStart - prevEnd
        if (gap < 0) continue
        // 检查中间是否只有空白/空段
        let ok = true
        for (let k = prevEnd; k < segStart; k++) {
          const ch = baseTxt.charAt(k)
          if (ch !== '\r' && ch !== ' ' && ch !== '\t') { ok = false; break }
        }
        if (!ok) continue
      }

      // 标题/正文同行截断（h1/h2/h3）
      if (sp.truncateAtEndSymbol) {
        const trunc = truncateSegmentAtEndSymbol(baseTxt, segStart, segLength)
        segStart = trunc.start
        segLength = trunc.length
      }

      // 标题跨行续行合并
      if (sp.maxScanLines && sp.maxScanLines > 1) {
        const merged = mergeContinuationLines(baseTxt, segStart, segLength, sp.maxScanLines, used)
        // 合并后再做一次截断（续行里可能有结束符号）
        if (sp.truncateAtEndSymbol) {
          const trunc = truncateSegmentAtEndSymbol(baseTxt, merged.start, merged.length)
          result.push({ start: trunc.start, length: trunc.length, type: rule.type })
          used.add(trunc.start, trunc.start + trunc.length)
        } else {
          result.push({ start: merged.start, length: merged.length, type: rule.type })
          used.add(merged.start, merged.start + merged.length)
        }
        continue
      }

      // 检查区间是否已被占用（续行合并可能跨已占用区，这里再确认）
      if (used.overlaps(segStart, segStart + segLength)) continue

      result.push({ start: segStart, length: segLength, type: rule.type })
      used.add(segStart, segStart + segLength)
    }
  }

  // 按位置排序
  result.sort((a, b) => a.start - b.start)
  return result
}

/**
 * 扫描所有段落，返回 [{ start, length, text }] 列表（text 为 trim 后）
 */
function scanAllParagraphs(baseTxt) {
  const paras = []
  const total = baseTxt.length
  let paraStart = 0
  for (let i = 0; i <= total; i++) {
    if (i === total || baseTxt.charAt(i) === '\r') {
      const segEnd = (i < total && baseTxt.charAt(i) === '\r') ? i : i
      const raw = baseTxt.substring(paraStart, segEnd)
      const trimmed = raw.trim()
      if (trimmed) {
        const leading = raw.length - raw.trimStart().length
        paras.push({ start: paraStart + leading, length: trimmed.length, text: trimmed })
      }
      paraStart = (i < total && baseTxt.charAt(i) === '\r') ? i + 1 : i
    }
  }
  return paras
}

/**
 * 落款+日期反向扫描：
 *   - 日期：从文末最后一行找 datePattern 匹配
 *   - 落款：从日期（或最后一行）向上收集，不满行且非客套语则认成 sig
 *   - floor：落款收集下界（title 后或全文中点）
 */
function processFooter(baseTxt, used, result, lineCharCount) {
  const paras = scanAllParagraphs(baseTxt)
  if (paras.length === 0) return

  // 落款识别规则：
  //   1. 必须有日期（datePattern 匹配），无日期则不认落款区
  //   2. 落款每行必须不满行（宽度 < 行宽 75%），满行是正文不是落款
  //   3. 落款最多 2 行（日期上方），超过 2 行则不是落款
  //   4. 不强行找落款：没有日期就不认

  // 从文末倒数 3 行内找日期
  const lastIdx = paras.length - 1
  const lookBack = Math.min(3, paras.length)
  let dateParaIdx = -1
  for (let i = lastIdx; i >= lastIdx - lookBack + 1; i--) {
    if (i < 0) continue
    if (used.contains(paras[i].start, paras[i].start + paras[i].length)) continue
    if (datePattern.test(paras[i].text)) {
      dateParaIdx = i
      break
    }
  }

  // 无日期 → 不认落款区
  if (dateParaIdx < 0) return

  // 认领日期
  const dp = paras[dateParaIdx]
  result.push({ start: dp.start, length: dp.length, type: 'date' })
  used.add(dp.start, dp.start + dp.length)

  // 落款：从日期向上收集，最多 2 行，每行必须不满行
  let collected = 0
  let cur = dateParaIdx - 1
  while (cur >= 0 && collected < 2) {
    const p = paras[cur]
    if (used.contains(p.start, p.start + p.length)) { cur--; continue }
    // 满行 → 正文，不是落款
    if (measureWidth(p.text) >= lineCharCount * 0.75) break
    // 客套语中断
    if (isClosingFormula(p.text)) break
    result.push({ start: p.start, length: p.length, type: 'sig' })
    used.add(p.start, p.start + p.length)
    collected++
    cur--
  }
}

/**
 * 供 format.js / 面板使用的辅助：从 doc 取某指针区段的文本。
 * @param {Object} doc
 * @param {number} start
 * @param {number} length
 * @returns {string} trim 后的文本
 */
export function getSegmentText(doc, start, length) {
  try {
    const rng = doc.Range(start, start + length)
    return rng.Text.replace(/[\r\n]+$/, '').trim()
  } catch (e) {
    return ''
  }
}

// matchDetect 保留导出（format.js 中 applySpecialFormat 用于核对匹配）
export function matchDetect(text, spec) {
  if (!spec) return false
  const mode = spec.mode
  if (mode === 'isTitleLike') return isTitleLike(text)
  if (mode === 'notTitleLike') return !isTitleLike(text)
  if (mode === 'isSpeechSignature') return isSpeechSignature(text)
  if (mode === 'composite') {
    const p1 = PATTERN_MAP[spec.pattern]
    const p2 = PATTERN_MAP[spec.extraPattern]
    if (p1 && p1.test(text)) return true
    if (p2 && p2.test(text)) return true
    return false
  }
  const pattern = PATTERN_MAP[spec.pattern]
  if (!pattern || !pattern.test(text)) return false
  if (spec.minLength && text.length < spec.minLength) return false
  if (spec.maxLength && text.length > spec.maxLength) return false
  if (spec.negateTitleLike && isTitleLike(text)) return false
  if (spec.negateSpeechSig && isSpeechSignature(text)) return false
  return true
}
