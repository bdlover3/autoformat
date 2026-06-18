//==============================================================
// 特殊要素规则配置 (rules.js)
//
// 纯声明式规则表 — 每种特殊元素 = 一个规则对象
// 检测和格式化的执行逻辑在 detect.js / format.js 中
//
// 规则字段：
//   type        - 类型标识（唯一键）
//   label       - 面板显示名
//   priority    - 检测优先级（越小越先检测；body 无 priority）
//   detect      - 检测规格（声明式对象，由 detect.js 解释执行）
//   formatSpec  - 格式化规格（声明式对象，由 format.js 解释执行）
//   special     - 特殊处理规格（可选）
//==============================================================

//--- ============================================================ ---
//--- 规则定义                                                      ---
//--- ============================================================ ---

/**
 * 检测规格 (detect) 说明：
 *
 * mode:
 *   'pattern'       - 单正则匹配，需提供 pattern 字段名
 *   'composite'     - 组合正则（匹配任一），需提供 pattern + extraPattern
 *   'isTitleLike'   - 调用 patterns.isTitleLike()
 *   'isSpeechSignature' - 调用 patterns.isSpeechSignature()
 *   'notTitleLike'  - 排除法：!isTitleLike(text)
 *   'patternWithNegate' - 正则匹配 + 否定约束
 *
 * pattern / extraPattern - patterns.js 中导出的正则变量名
 * negateTitleLike  - 排除"像标题"的文本
 * negateSpeechSig  - 排除署名格式的文本
 * minLength / maxLength - 文本长度约束
 *
 * 格式化规格 (formatSpec) 说明：
 *
 * fontKey     - fonts 对象中的字体键名（如 'bodyFontName'）
 * fontSizeKey - settings 对象中的字号键名（如 'bodyFontSize'）
 * alignment   - 对齐方式：'left' | 'center' | 'right' | 'justify'
 * firstIndent - 首行缩进（字符单位）：0 = 无缩进, 2 = 两字符
 * bold        - 是否加粗（默认 false）
 *
 * 特殊处理规格 (special) 说明：
 *
 * headSequence       - 是否头部区域顺序识别
 * contiguous         - 必须从文首连续出现
 * multiline          - 多行合并（如标题最多3行）
 * maxLines           - 多行合并的最大行数
 * afterType          - 必须紧跟在某类型之后
 * region             - 位置约束：'head' | 'footer'
 * regionOffset       - 区域范围（声明式）：
 *   from: 'titleEnd' - 基于 titleEndIdx 偏移
 *   min / max        - 偏移量
 * gapRequired        - 认领前是否需要空行隔开
 * scanDirection      - 扫描方向：'reverse'
 * groupWith          - 分组对齐类型
 * continuation       - 续行规格（声明式）：
 *   negatePattern       - 排除正则（匹配则不能续行）
 *   negateMode          - 排除模式：'looksLikeOtherPattern'
 */
const RULES = [

  //--- 0. 正文 (body) ---
  {
    type: 'body',
    label: '正文',
    // body 无 detect —— 全文先刷正文格式，特殊元素再精准覆盖
    formatSpec: {
      fontKey: 'bodyFontName',
      fontSizeKey: 'bodyFontSize',
      alignment: 'justify',
      firstIndent: 2,
      bold: false
    }
  },

  //--- 1. 附件 ---
  {
    type: 'attachment',
    label: '附件',
    priority: 1,
    detect: { mode: 'pattern', pattern: 'attachmentPattern' },
    formatSpec: {
      fontKey: 'bodyFontName',
      fontSizeKey: 'bodyFontSize',
      alignment: 'left',
      firstIndent: 0
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
    detect: { mode: 'pattern', pattern: 'docNumberPattern' },
    formatSpec: {
      fontKey: 'bodyFontName',
      fontSizeKey: 'bodyFontSize',
      alignment: 'center',
      firstIndent: 0
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
    detect: { mode: 'isTitleLike', minLength: 2 },
    formatSpec: {
      fontKey: 'titleFontName',
      fontSizeKey: 'titleFontSize',
      alignment: 'center',
      firstIndent: 0
    },
    special: {
      headSequence: true,
      multiline: true,
      maxLines: 3,
      continuation: {
        negatePattern: 'endSymbolPattern',
        negateMode: 'looksLikeOtherPattern'
      }
    }
  },

  //--- 4. 副标题 ---
  {
    type: 'subtitle',
    label: '小标题',
    priority: 4,
    detect: { mode: 'pattern', pattern: 'subtitlePattern' },
    formatSpec: {
      fontKey: 'subtitleFontName',
      fontSizeKey: 'bodyFontSize',
      alignment: 'center',
      firstIndent: 0
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
    detect: { mode: 'pattern', pattern: 'h1Pattern' },
    formatSpec: {
      fontKey: 'h1FontName',
      fontSizeKey: 'h1FontSize',
      alignment: 'left',
      firstIndent: 2
    }
  },

  //--- 6. 二级标题 (h2) ---
  {
    type: 'h2',
    label: '（一）',
    priority: 6,
    detect: { mode: 'pattern', pattern: 'h2Pattern' },
    formatSpec: {
      fontKey: 'h2FontName',
      fontSizeKey: 'h2FontSize',
      alignment: 'left',
      firstIndent: 2
    }
  },

  //--- 7. 三级标题 (h3) ---
  {
    type: 'h3',
    label: '1.',
    priority: 7,
    detect: { mode: 'composite', pattern: 'h3Pattern', extraPattern: 'h4Pattern' },
    formatSpec: {
      fontKey: 'h3FontName',
      fontSizeKey: 'h3FontSize',
      alignment: 'left',
      firstIndent: 2
    }
  },

  //--- 8. 抬头 ---
  {
    type: 'addressee',
    label: '抬头',
    priority: 8,
    detect: { mode: 'pattern', pattern: 'addresseeEndPattern', maxLength: 30 },
    formatSpec: {
      fontKey: 'bodyFontName',
      fontSizeKey: 'bodyFontSize',
      alignment: 'left',
      firstIndent: 0
    }
  },

  //--- 9. 署名 (signature) ---
  {
    type: 'signature',
    label: '署名',
    priority: 9,
    detect: { mode: 'isSpeechSignature' },
    formatSpec: {
      fontKey: 'bodyFontName',
      fontSizeKey: 'bodyFontSize',
      alignment: 'center',
      firstIndent: 0
    },
    special: {
      region: 'head',
      regionOffset: { from: 'titleEnd', min: 1, max: 6 },
      gapRequired: true
    }
  },

  //--- 10. 落款 (sig) ---
  {
    type: 'sig',
    label: '落款',
    priority: 10,
    detect: { mode: 'notTitleLike' },
    // sig+date 统一走 applyFooterAlignment（字符宽度对齐）
    // formatSpec 仅用于非对齐场景的独立格式化
    formatSpec: {
      fontKey: 'bodyFontName',
      fontSizeKey: 'bodyFontSize',
      alignment: 'center',
      firstIndent: 0
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
    detect: { mode: 'pattern', pattern: 'datePattern' },
    formatSpec: {
      fontKey: 'bodyFontName',
      fontSizeKey: 'bodyFontSize',
      alignment: 'center',
      firstIndent: 0
    },
    special: {
      region: 'footer',
      scanDirection: 'reverse',
      groupWith: 'sig'
    }
  }
]

//--- 导出 ---

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

/** 获取头部顺序识别的类型列表 */
export function getHeadSequenceTypes() {
  return RULES
    .filter(r => r.special && r.special.headSequence)
    .sort((a, b) => a.priority - b.priority)
    .map(r => r.type)
}
