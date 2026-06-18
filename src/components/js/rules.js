//==============================================================
// 特殊要素规则配置 (rules.js)
//
// 核心设计：每种元素类型 = 一个 RULE 对象，包含：
//   type        - 类型标识
//   label       - 面板显示名
//   priority    - 检测优先级（越小越先检测）
//   detect      - 认定规则：函数(text, ctx) => boolean
//   format      - 格式化规则：函数(range, settings, fonts)
//                  range = doc.Range(start, end) 精准范围
//   special     - 特殊规则（可选）：如多行标题、位置约束等
//
// 格式化策略：
//   全文先按 body 格式化 → 特殊元素用 start/end 精准覆盖
//   这样绝不存在格式相互覆盖的问题
//==============================================================

import {
  docNumberPattern,
  subtitlePattern,
  addresseeEndPattern,
  h1Pattern,
  h2Pattern,
  h3Pattern,
  h4Pattern,
  datePattern,
  attachmentPattern,
  endSymbolPattern,
  isSpeechSignature,
  isTitleLike,
  looksLikeOtherPattern
} from './patterns.js'

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
 *   format    - 格式化规则(range, settings, fonts)
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
