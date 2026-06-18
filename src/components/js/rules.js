//==============================================================
// 特殊要素规则配置 (rules.js)
//
// 核心设计：每种元素类型 = 一个 RULE 对象，包含：
//   type        - 类型标识
//   label       - 面板显示名
//   priority    - 检测优先级（越小越先检测）
//   detect      - 认定规则：函数(text, ctx) => boolean
//   format      - 格式化规则：函数(range, doc, settings, fonts)
//                  range = doc.Range(start, end) 精准范围
//   special     - 特殊规则（可选）：如多行标题、位置约束等
//
// 格式化策略：
//   全文先按 body 格式化 → 特殊元素用 start/end 精准覆盖
//   这样绝不存在格式相互覆盖的问题
//==============================================================

//--- 通用工具函数 ---

/** 字符宽度：CJK/全角=1，ASCII/半角=0.5 */
export function charWidth(ch) {
  const code = ch.charCodeAt(0)
  if (code <= 0x7f) return 0.5
  return 1
}

/** 测量文本宽度（字符宽度之和） */
export function measureWidth(text) {
  let w = 0
  for (let i = 0; i < text.length; i++) {
    w += charWidth(text.charAt(i))
  }
  return w
}

/** 结束符号字符串（用于标题截断，逐字符查找） */
export const TITLE_END_SYMBOLS = '。！？；：.!?;:'

/** 任意标点（含逗号、顿号，用于 fallback 截断） */
export const ANY_PUNCT_REGEX = /[，、。！？；：,.!?;:]/

/** 找到文本中第一个结束符号的位置 */
export function findFirstEndSymbol(text) {
  let min = -1
  for (let i = 0; i < TITLE_END_SYMBOLS.length; i++) {
    const idx = text.indexOf(TITLE_END_SYMBOLS.charAt(i))
    if (idx >= 0 && (min === -1 || idx < min)) min = idx
  }
  return min
}

//--- 通用正则（供 detect 函数和外部复用） ---

export const docNumberPattern = /^[\u4e00-\u9fa5]+[〔[]\d{4}[〕\]]\d+号$/
export const subtitlePattern = /^[—-]{2,}/
export const addresseeEndPattern = /[：:]$/
export const h1Pattern = /^[一二三四五六七八九十]+、/
export const h2Pattern = /^[（(][一二三四五六七八九十]+[）)]/
export const h3Pattern = /^\d+\./
export const h4Pattern = /^[（(]\d+[）)]/
export const datePattern = /^\d{4}年\d{1,2}月\d{1,2}日/
export const attachmentPattern = /^附\s*件\d*/
export const endSymbolPattern = /[。！？；]/

//--- 通用判定函数 ---

/** 是否署名格式（讲话稿发言人）：纯姓名2-4字 / 单位+姓名 / 日期 */
export function isSpeechSignature(text) {
  if (!text) return false
  if (/^[\u4e00-\u9fa5]{2,4}$/.test(text)) return true
  if (/^[\u4e00-\u9fa5]{2,8}\s+[\u4e00-\u9fa5]{2,4}$/.test(text)) return true
  if (/^[（\(]?\d{4}年\d{1,2}月\d{1,2}日[）\)]?$/.test(text)) return true
  return false
}

/** 是否"像标题"——排除法：不符合任何已知模式 + 不含中断符 + 长度≥2 */
export function isTitleLike(text) {
  if (!text || text.length < 2) return false
  if (attachmentPattern.test(text)) return false
  if (h1Pattern.test(text)) return false
  if (h2Pattern.test(text)) return false
  if (h3Pattern.test(text)) return false
  if (h4Pattern.test(text)) return false
  if (docNumberPattern.test(text)) return false
  if (datePattern.test(text)) return false
  if (addresseeEndPattern.test(text)) return false
  if (endSymbolPattern.test(text)) return false
  if (subtitlePattern.test(text)) return false
  if (/^[\u4e00-\u9fa5]{2,4}$/.test(text)) return false
  if (/^[\u4e00-\u9fa5]{2,8}\s+[\u4e00-\u9fa5]{2,4}$/.test(text)) return false
  return true
}

/** 文本是否匹配"其他已知模式"（用于标题排除法） */
export function looksLikeOtherPattern(text, isContinuation = false) {
  if (docNumberPattern.test(text)) return true
  if (subtitlePattern.test(text)) return true
  if (attachmentPattern.test(text)) return true
  if (h1Pattern.test(text)) return true
  if (h2Pattern.test(text)) return true
  if (h3Pattern.test(text)) return true
  if (h4Pattern.test(text)) return true
  if (datePattern.test(text)) return true
  if (isContinuation && addresseeEndPattern.test(text)) return true
  return false
}

//--- 格式化基础工具 ---

/** WPS Alignment 枚举值常量 */
export const Align = { LEFT: 0, CENTER: 1, RIGHT: 2, JUSTIFY: 3 }

/** 设置 Range 基础字体属性 */
export function setRangeBaseFont(range, fontName, lineSpacing) {
  range.Font.Name = fontName
  range.Font.Bold = false
  range.Font.NameAscii = 'Times New Roman'
  range.Font.NameOther = 'Times New Roman'
  range.ParagraphFormat.LineSpacingRule = 4
  range.ParagraphFormat.LineSpacing = lineSpacing
  range.ParagraphFormat.FirstLineIndent = 0
}

//--- ============================================================ ---
//--- 规则定义：一个特殊元素一个选项                                  ---
//--- ============================================================ ---

/**
 * 规则表：从正文到所有特殊元素
 *
 * 每条规则的字段说明：
 *   type      - 类型标识（唯一键）
 *   label     - 面板显示名
 *   priority  - 检测优先级（0=最高，先检测；body 无 priority 因为是默认）
 *   detect    - 认定规则(text, ctx) => boolean
 *              text=待检测文本，ctx={ result, textMap, baseTxt, titleEndIdx, ... }
 *   format    - 格式化规则(range, doc, settings, fonts)
 *              range = doc.Range(start, end) 精准范围
 *              只操作这个 range 内的文字格式，不影响其他段落
 *   special   - 特殊规则（可选）：
 *     headSequence  - 是否头部区域顺序识别
 *     contiguous    - 必须从文首连续出现
 *     multiline     - 多行合并（如标题最多3行）
 *     maxLines      - 多行合并的最大行数
 *     continuationDetect(text) - 续行判定
 *     afterType     - 必须紧跟在某类型之后
 *     region        - 位置约束：'head'=头部, 'footer'=文末
 *     regionRange(ctx) - 位置范围函数
 *     gapRequired   - 认领前是否需要空行隔开
 *     scanDirection - 扫描方向
 *     groupWith     - 分组对齐类型
 *     maxLines      - 最多行数
 */
const RULES = [

  //--- 0. 正文 (body) ---
  {
    type: 'body',
    label: '正文',
    // body 无 detect —— 全文先刷正文格式，特殊元素再精准覆盖
    format(range, settings, fonts) {
      range.Font.Name = fonts.bodyFontName
      range.Font.Size = settings.bodyFontSize
      range.Font.Bold = false
      range.Font.NameAscii = 'Times New Roman'
      range.Font.NameOther = 'Times New Roman'
      range.ParagraphFormat.LineSpacingRule = 4
      range.ParagraphFormat.LineSpacing = settings.lineSpacing
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 2
      range.ParagraphFormat.FirstLineIndent = 0
      range.ParagraphFormat.Alignment = Align.JUSTIFY
    }
  },

  //--- 1. 附件 ---
  {
    type: 'attachment',
    label: '附件',
    priority: 1,
    detect(text) {
      return attachmentPattern.test(text)
    },
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.bodyFontName, settings.lineSpacing)
      range.Font.Size = settings.bodyFontSize
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 0
      range.ParagraphFormat.Alignment = Align.LEFT
    },
    special: {
      headSequence: true,
      contiguous: true
    }
  },

  //--- 2. 文号 ---
  {
    type: 'docNumber',
    label: '文号',
    priority: 2,
    detect(text) {
      return docNumberPattern.test(text)
    },
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.bodyFontName, settings.lineSpacing)
      range.Font.Size = settings.bodyFontSize
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 0
      range.ParagraphFormat.Alignment = Align.CENTER
    },
    special: {
      headSequence: true
    }
  },

  //--- 3. 大标题 ---
  {
    type: 'title',
    label: '标题',
    priority: 3,
    detect(text, ctx) {
      if (!text || text.length < 2) return false
      if (looksLikeOtherPattern(text, false)) return false
      return true
    },
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.titleFontName, settings.lineSpacing)
      range.Font.Size = settings.titleFontSize
      range.ParagraphFormat.Alignment = Align.CENTER
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 0
    },
    special: {
      headSequence: true,
      multiline: true,
      maxLines: 3,
      continuationDetect(text) {
        if (endSymbolPattern.test(text)) return false
        if (looksLikeOtherPattern(text, true)) return false
        return true
      }
    }
  },

  //--- 4. 副标题 ---
  {
    type: 'subtitle',
    label: '小标题',
    priority: 4,
    detect(text) {
      return subtitlePattern.test(text)
    },
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.subtitleFontName, settings.lineSpacing)
      range.Font.Size = settings.bodyFontSize
      range.ParagraphFormat.Alignment = Align.CENTER
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 0
    },
    special: {
      headSequence: true,
      afterType: 'title'
    }
  },

  //--- 5. 一级标题 (h1) ---
  {
    type: 'h1',
    label: '一、',
    priority: 5,
    detect(text) {
      return h1Pattern.test(text)
    },
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.h1FontName, settings.lineSpacing)
      range.Font.Size = settings.h1FontSize
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 2
      range.ParagraphFormat.Alignment = Align.LEFT
    }
  },

  //--- 6. 二级标题 (h2) ---
  {
    type: 'h2',
    label: '（一）',
    priority: 6,
    detect(text) {
      return h2Pattern.test(text)
    },
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.h2FontName, settings.lineSpacing)
      range.Font.Size = settings.h2FontSize
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 2
      range.ParagraphFormat.Alignment = Align.LEFT
    }
  },

  //--- 7. 三级标题 (h3) ---
  {
    type: 'h3',
    label: '1.',
    priority: 7,
    detect(text) {
      return h3Pattern.test(text) || h4Pattern.test(text)
    },
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.h3FontName, settings.lineSpacing)
      range.Font.Size = settings.h3FontSize
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 2
      range.ParagraphFormat.Alignment = Align.LEFT
    }
  },

  //--- 8. 抬头 ---
  {
    type: 'addressee',
    label: '抬头',
    priority: 8,
    detect(text) {
      return addresseeEndPattern.test(text) && text.length <= 30
    },
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.bodyFontName, settings.lineSpacing)
      range.Font.Size = settings.bodyFontSize
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 0
      range.ParagraphFormat.Alignment = Align.LEFT
    }
  },

  //--- 9. 署名 (signature) ---
  {
    type: 'signature',
    label: '署名',
    priority: 9,
    detect(text, ctx) {
      return isSpeechSignature(text)
    },
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.bodyFontName, settings.lineSpacing)
      range.Font.Size = settings.bodyFontSize
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 0
      range.ParagraphFormat.Alignment = Align.CENTER
    },
    special: {
      region: 'head',
      regionRange(ctx) {
        return { min: (ctx.titleEndIdx || 0) + 1, max: (ctx.titleEndIdx || 0) + 6 }
      },
      gapRequired: true
    }
  },

  //--- 10. 落款 (sig) ---
  {
    type: 'sig',
    label: '落款',
    priority: 10,
    detect(text, ctx) {
      if (isTitleLike(text) && !isSpeechSignature(text)) return false
      return true
    },
    // sig+date 统一走 applyFooterAlignment（字符宽度对齐）
    // 此处 format 仅用于非对齐场景的独立格式化
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.bodyFontName, settings.lineSpacing)
      range.Font.Size = settings.bodyFontSize
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 0
      range.ParagraphFormat.Alignment = Align.CENTER
    },
    special: {
      region: 'footer',
      scanDirection: 'reverse',
      groupWith: 'date',
      maxLines: 2
    }
  },

  //--- 11. 日期 (date) ---
  {
    type: 'date',
    label: '日期',
    priority: 11,
    detect(text) {
      return datePattern.test(text)
    },
    format(range, settings, fonts) {
      setRangeBaseFont(range, fonts.bodyFontName, settings.lineSpacing)
      range.Font.Size = settings.bodyFontSize
      range.ParagraphFormat.CharacterUnitFirstLineIndent = 0
      range.ParagraphFormat.Alignment = Align.CENTER
    },
    special: {
      region: 'footer',
      scanDirection: 'reverse',
      groupWith: 'sig'
    }
  }
]

//--- 导出规则表和查询函数 ---

/** 完整规则表（含 body） */
export { RULES }

/** 获取特殊元素规则（不含 body） */
export function getSpecialRules() {
  return RULES.filter(r => r.type !== 'body')
}

/** 按 type 查找规则 */
export function getRuleByType(type) {
  return RULES.find(r => r.type === type)
}

/** 获取面板类型标签映射 { type: label } */
export function getTypeLabelMap() {
  const map = {}
  for (const r of RULES) {
    map[r.type] = r.label
  }
  return map
}

/** 检测优先级排序（不含 body），返回 type 数组 */
export function getDetectOrder() {
  return RULES
    .filter(r => r.type !== 'body')
    .sort((a, b) => a.priority - b.priority)
    .map(r => r.type)
}

/** 头部顺序识别的类型列表 */
export function getHeadSequenceTypes() {
  return RULES
    .filter(r => r.special && r.special.headSequence)
    .sort((a, b) => a.priority - b.priority)
    .map(r => r.type)
}
