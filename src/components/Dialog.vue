<template>
  <div class="settings-panel">
    <h3 class="panel-title">格式设置</h3>

    <div class="btn-group-top">
      <button class="btn btn-save" @click="saveSettings">保存设置</button>
      <button class="btn btn-reset" @click="resetSettings">恢复默认</button>
    </div>

    <div class="section">
      <h4 class="section-title">正文</h4>
      <div class="form-row">
        <label>字体</label>
        <div class="combo-box">
          <input type="text" v-model="settings.bodyFont" class="combo-input" placeholder="输入字体名称" />
          <button class="combo-btn" @click="toggleDropdown('bodyFont')">▼</button>
          <div v-if="activeDropdown === 'bodyFont'" class="combo-dropdown">
            <div v-for="font in fontList" :key="font" class="dropdown-item" @click="selectFont('bodyFont', font)">{{ font }}</div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>字号</label>
        <div class="combo-box">
          <input type="text" v-model="bodyFontSizeText" class="combo-input" placeholder="字号/磅值" />
          <button class="combo-btn" @click="toggleDropdown('bodyFontSize')">▼</button>
          <div v-if="activeDropdown === 'bodyFontSize'" class="combo-dropdown">
            <div v-for="size in fontSizeOptions" :key="size.value" class="dropdown-item" @click="selectFontSize('bodyFontSize', size.value)">
              {{ size.label }} ({{ size.value }}磅)
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>行距（磅）</label>
        <input type="number" v-model.number="settings.lineSpacing" min="10" max="50" step="0.1" />
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">公文标题</h4>
      <div class="form-row">
        <label>字体</label>
        <div class="combo-box">
          <input type="text" v-model="settings.titleFont" class="combo-input" placeholder="输入字体名称" />
          <button class="combo-btn" @click="toggleDropdown('titleFont')">▼</button>
          <div v-if="activeDropdown === 'titleFont'" class="combo-dropdown">
            <div v-for="font in fontList" :key="font" class="dropdown-item" @click="selectFont('titleFont', font)">{{ font }}</div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>字号</label>
        <div class="combo-box">
          <input type="text" v-model="titleFontSizeText" class="combo-input" placeholder="字号/磅值" />
          <button class="combo-btn" @click="toggleDropdown('titleFontSize')">▼</button>
          <div v-if="activeDropdown === 'titleFontSize'" class="combo-dropdown">
            <div v-for="size in fontSizeOptions" :key="size.value" class="dropdown-item" @click="selectFontSize('titleFontSize', size.value)">
              {{ size.label }} ({{ size.value }}磅)
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">一级标题（如"一、"）</h4>
      <div class="form-row">
        <label>字体</label>
        <div class="combo-box">
          <input type="text" v-model="settings.h1Font" class="combo-input" placeholder="输入字体名称" />
          <button class="combo-btn" @click="toggleDropdown('h1Font')">▼</button>
          <div v-if="activeDropdown === 'h1Font'" class="combo-dropdown">
            <div v-for="font in fontList" :key="font" class="dropdown-item" @click="selectFont('h1Font', font)">{{ font }}</div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>字号</label>
        <div class="combo-box">
          <input type="text" v-model="h1FontSizeText" class="combo-input" placeholder="字号/磅值" />
          <button class="combo-btn" @click="toggleDropdown('h1FontSize')">▼</button>
          <div v-if="activeDropdown === 'h1FontSize'" class="combo-dropdown">
            <div v-for="size in fontSizeOptions" :key="size.value" class="dropdown-item" @click="selectFontSize('h1FontSize', size.value)">
              {{ size.label }} ({{ size.value }}磅)
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>加粗</label>
        <input type="checkbox" v-model="settings.h1Bold" />
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">二级标题（如"（一）"）</h4>
      <div class="form-row">
        <label>字体</label>
        <div class="combo-box">
          <input type="text" v-model="settings.h2Font" class="combo-input" placeholder="输入字体名称" />
          <button class="combo-btn" @click="toggleDropdown('h2Font')">▼</button>
          <div v-if="activeDropdown === 'h2Font'" class="combo-dropdown">
            <div v-for="font in fontList" :key="font" class="dropdown-item" @click="selectFont('h2Font', font)">{{ font }}</div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>字号</label>
        <div class="combo-box">
          <input type="text" v-model="h2FontSizeText" class="combo-input" placeholder="字号/磅值" />
          <button class="combo-btn" @click="toggleDropdown('h2FontSize')">▼</button>
          <div v-if="activeDropdown === 'h2FontSize'" class="combo-dropdown">
            <div v-for="size in fontSizeOptions" :key="size.value" class="dropdown-item" @click="selectFontSize('h2FontSize', size.value)">
              {{ size.label }} ({{ size.value }}磅)
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>加粗</label>
        <input type="checkbox" v-model="settings.h2Bold" />
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">三级标题（如"1."）</h4>
      <div class="form-row">
        <label>字体</label>
        <div class="combo-box">
          <input type="text" v-model="settings.h3Font" class="combo-input" placeholder="输入字体名称" />
          <button class="combo-btn" @click="toggleDropdown('h3Font')">▼</button>
          <div v-if="activeDropdown === 'h3Font'" class="combo-dropdown">
            <div v-for="font in fontList" :key="font" class="dropdown-item" @click="selectFont('h3Font', font)">{{ font }}</div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>字号</label>
        <div class="combo-box">
          <input type="text" v-model="h3FontSizeText" class="combo-input" placeholder="字号/磅值" />
          <button class="combo-btn" @click="toggleDropdown('h3FontSize')">▼</button>
          <div v-if="activeDropdown === 'h3FontSize'" class="combo-dropdown">
            <div v-for="size in fontSizeOptions" :key="size.value" class="dropdown-item" @click="selectFontSize('h3FontSize', size.value)">
              {{ size.label }} ({{ size.value }}磅)
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>加粗</label>
        <input type="checkbox" v-model="settings.h3Bold" />
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">四级标题（如"（1）"）</h4>
      <div class="form-row">
        <label>字体</label>
        <div class="combo-box">
          <input type="text" v-model="settings.h4Font" class="combo-input" placeholder="输入字体名称" />
          <button class="combo-btn" @click="toggleDropdown('h4Font')">▼</button>
          <div v-if="activeDropdown === 'h4Font'" class="combo-dropdown">
            <div v-for="font in fontList" :key="font" class="dropdown-item" @click="selectFont('h4Font', font)">{{ font }}</div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <label>字号</label>
        <div class="combo-box">
          <input type="text" v-model="h4FontSizeText" class="combo-input" placeholder="字号/磅值" />
          <button class="combo-btn" @click="toggleDropdown('h4FontSize')">▼</button>
          <div v-if="activeDropdown === 'h4FontSize'" class="combo-dropdown">
            <div v-for="size in fontSizeOptions" :key="size.value" class="dropdown-item" @click="selectFontSize('h4FontSize', size.value)">
              {{ size.label }} ({{ size.value }}磅)
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">页面边距（毫米）</h4>
      <div class="form-row">
        <label>上边距</label>
        <input type="number" v-model.number="settings.marginTop" min="0" step="1" />
      </div>
      <div class="form-row">
        <label>下边距</label>
        <input type="number" v-model.number="settings.marginBottom" min="0" step="1" />
      </div>
      <div class="form-row">
        <label>左边距</label>
        <input type="number" v-model.number="settings.marginLeft" min="0" step="1" />
      </div>
      <div class="form-row">
        <label>右边距</label>
        <input type="number" v-model.number="settings.marginRight" min="0" step="1" />
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">页码设置</h4>
      <div class="form-row">
        <label>启用页码</label>
        <input type="checkbox" v-model="settings.enablePageNumber" />
      </div>
      <div class="form-row">
        <span class="form-hint">（居中显示：— 1 — 格式，4号宋体）</span>
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">排版选项</h4>
      <div class="form-row">
        <label>先清除格式</label>
        <input type="checkbox" v-model="settings.clearFormatting" />
      </div>
      <div class="form-row">
        <span class="form-hint">（启用后排版前会清除文档原有格式和自动编号，避免格式冲突）</span>
      </div>
      <div class="form-row">
        <label>屏蔽字体缺失提示</label>
        <input type="checkbox" v-model="settings.disableFontWarning" />
      </div>
      <div class="form-row">
        <span class="form-hint">（启用后将不再提示字体缺失信息）</span>
      </div>
      <div class="form-row">
        <label>屏蔽落款缺失提示</label>
        <input type="checkbox" v-model="settings.disableFooterWarning" />
      </div>
      <div class="form-row">
        <span class="form-hint">（启用后排版面板不再显示"未检测到落款或发言人"提示）</span>
      </div>
      <div class="form-row">
        <label>启用落款排版</label>
        <input type="checkbox" v-model="settings.enableFooterLayout" />
      </div>
      <div class="form-row">
        <label>落款排版方式</label>
        <select v-model="settings.footerLayoutMode" :disabled="!settings.enableFooterLayout">
          <option value="official">公文落款</option>
          <option value="pretty">美观落款</option>
        </select>
      </div>
      <div class="form-row">
        <span class="form-hint">（启用后对检测到的落款和日期使用所选方式对齐）</span>
      </div>
      <div class="form-row">
        <label>标题后自动换行</label>
        <input type="checkbox" v-model="settings.autoSplitSubtitle" />
      </div>
      <div class="form-row">
        <span class="form-hint">（开启后排版时会在一二三级标题句号后自动插入换行，将正文移到下一段。默认关闭）</span>
      </div>
    </div>

    <div class="section footer-info">
      <div class="version-info">
        <span class="version-label">版本：</span>
        <span class="version-text">{{ version }}</span>
      </div>
      <div class="source-info">
        <span class="source-label">开源地址：</span>
        <a href="https://gitee.com/rainsoft0456/wpsautoformat" target="_blank" class="source-link">
          gitee.com/rainsoft0456/wpsautoformat
        </a>
      </div>
    </div>

  </div>
</template>

<script>
import { onMounted, reactive, computed, ref } from 'vue'
import dlgFunc from './js/dialog.js'
import { VERSION } from './js/version.js'

const fontSizeMap = {
  42: '初号',
  36: '小初',
  26: '一号',
  24: '小一',
  22: '二号',
  18: '小二',
  16: '三号',
  15: '小三',
  14: '四号',
  12: '小四',
  10.5: '五号',
  9: '小五'
}

const fontSizeReverseMap = {
  '初号': 42,
  '小初': 36,
  '一号': 26,
  '小一': 24,
  '二号': 22,
  '小二': 18,
  '三号': 16,
  '小三': 15,
  '四号': 14,
  '小四': 12,
  '五号': 10.5,
  '小五': 9,
  '初': 42,
  '一': 26,
  '二': 22,
  '三': 16,
  '四': 14,
  '五': 10.5
}

export default {
  name: 'Dialog',
  setup() {
    const settings = reactive({
      titleFontSize: 22,
      bodyFontSize: 16,
      h1FontSize: 16,
      h2FontSize: 16,
      h3FontSize: 16,
      h4FontSize: 16,
      h1Bold: false,
      h2Bold: false,
      h3Bold: false,
      titleFont: '方正小标宋简体',
      bodyFont: '仿宋_GB2312',
      h1Font: '黑体',
      h2Font: '楷体_GB2312',
      h3Font: '仿宋_GB2312',
      h4Font: '仿宋_GB2312',
      lineSpacing: 28.9,
      marginTop: 37,
      marginBottom: 35,
      marginLeft: 28,
      marginRight: 26,
      enablePageNumber: true,
      pageNumberPosition: 'center',
      clearFormatting: true,
      disableFontWarning: false,
      disableFooterWarning: false,
      enableFooterLayout: true,
      footerLayoutMode: 'pretty',
      footerLayoutDefaultVersion: 1,
      autoSplitSubtitle: false
    })

    const fontList = reactive([])
    const activeDropdown = ref(null)

    const fontSizeOptions = computed(() => {
      return Object.keys(fontSizeMap).map(key => ({
        value: parseFloat(key),
        label: fontSizeMap[key]
      }))
    })

    const bodyFontSizeText = computed({
      get: () => {
        const label = fontSizeMap[settings.bodyFontSize]
        return label ? `${label} (${settings.bodyFontSize}磅)` : settings.bodyFontSize.toString()
      },
      set: (val) => {
        parseFontSizeInput('bodyFontSize', val)
      }
    })

    const titleFontSizeText = computed({
      get: () => {
        const label = fontSizeMap[settings.titleFontSize]
        return label ? `${label} (${settings.titleFontSize}磅)` : settings.titleFontSize.toString()
      },
      set: (val) => {
        parseFontSizeInput('titleFontSize', val)
      }
    })

    const h1FontSizeText = computed({
      get: () => {
        const label = fontSizeMap[settings.h1FontSize]
        return label ? `${label} (${settings.h1FontSize}磅)` : settings.h1FontSize.toString()
      },
      set: (val) => {
        parseFontSizeInput('h1FontSize', val)
      }
    })

    const h2FontSizeText = computed({
      get: () => {
        const label = fontSizeMap[settings.h2FontSize]
        return label ? `${label} (${settings.h2FontSize}磅)` : settings.h2FontSize.toString()
      },
      set: (val) => {
        parseFontSizeInput('h2FontSize', val)
      }
    })

    const h3FontSizeText = computed({
      get: () => {
        const label = fontSizeMap[settings.h3FontSize]
        return label ? `${label} (${settings.h3FontSize}磅)` : settings.h3FontSize.toString()
      },
      set: (val) => {
        parseFontSizeInput('h3FontSize', val)
      }
    })

    const h4FontSizeText = computed({
      get: () => {
        const label = fontSizeMap[settings.h4FontSize]
        return label ? `${label} (${settings.h4FontSize}磅)` : settings.h4FontSize.toString()
      },
      set: (val) => {
        parseFontSizeInput('h4FontSize', val)
      }
    })

    function parseFontSizeInput(field, val) {
      if (!val || !val.trim()) return
      
      val = val.trim()
      
      if (fontSizeReverseMap[val]) {
        settings[field] = fontSizeReverseMap[val]
      } else if (fontSizeReverseMap[val.replace('号', '')]) {
        settings[field] = fontSizeReverseMap[val.replace('号', '')]
      } else {
        const numMatch = val.match(/[\d.]+/)
        if (numMatch) {
          const numValue = parseFloat(numMatch[0])
          if (!isNaN(numValue) && numValue > 0) {
            settings[field] = numValue
          }
        }
      }
    }

    onMounted(() => {
      loadFontList()
      dlgFunc.loadSettings(settings)
      document.addEventListener('click', handleClickOutside)
    })

    function loadFontList() {
      try {
        if (window.Application && window.Application.FontNames) {
          const fonts = window.Application.FontNames
          for (let i = 1; i <= fonts.Count; i++) {
            fontList.push(fonts.Item(i))
          }
        }
      } catch (e) {
        fontList.push('宋体', '黑体', '仿宋_GB2312', '楷体_GB2312', '方正小标宋简体', 'Arial', 'Times New Roman')
      }
    }

    function saveSettings() {
      dlgFunc.saveSettings(settings)
    }

    function resetSettings() {
      dlgFunc.resetSettings(settings)
    }

    function toggleDropdown(field) {
      if (activeDropdown.value === field) {
        activeDropdown.value = null
      } else {
        activeDropdown.value = field
      }
    }

    function handleClickOutside(e) {
      if (!e.target.closest('.combo-box')) {
        activeDropdown.value = null
      }
    }

    function selectFont(field, font) {
      settings[field] = font
      activeDropdown.value = null
    }

    function selectFontSize(field, value) {
      settings[field] = value
      activeDropdown.value = null
    }

    return {
      version: VERSION,
      settings,
      fontList,
      fontSizeOptions,
      activeDropdown,
      bodyFontSizeText,
      titleFontSizeText,
      h1FontSizeText,
      h2FontSizeText,
      h3FontSizeText,
      h4FontSizeText,
      saveSettings,
      resetSettings,
      toggleDropdown,
      selectFont,
      selectFontSize
    }
  }
}
</script>

<style scoped>
.settings-panel {
  padding: 16px;
  font-size: 13px;
  color: #333;
  background: #fff;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.panel-title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #1a1a1a;
  border-bottom: 2px solid #c00;
  padding-bottom: 8px;
}

.btn-group-top {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.btn {
  padding: 6px 20px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-save {
  background: #c00;
  color: #fff;
}

.btn-save:hover {
  background: #a00;
}

.btn-reset {
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
}

.btn-reset:hover {
  background: #e0e0e0;
}

.section {
  margin-bottom: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  background: #fafafa;
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  color: #c00;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #ddd;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.form-row label {
  width: 70px;
  flex-shrink: 0;
  font-size: 12px;
  color: #555;
}

.form-row input[type="number"] {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 12px;
  outline: none;
}

.form-row input[type="number"]:focus {
  border-color: #c00;
}

.combo-box {
  flex: 1;
  position: relative;
  display: flex;
}

.combo-input {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 3px 0 0 3px;
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
}

.combo-input:focus {
  border-color: #c00;
}

.combo-btn {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 3px 3px 0;
  font-size: 10px;
  color: #666;
  background: #f5f5f5;
  cursor: pointer;
  outline: none;
}

.combo-btn:hover {
  background: #e8e8e8;
}

.combo-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 2px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: #fff;
  z-index: 100;
}

.dropdown-item {
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-item:hover {
  background: #f0f0f0;
}

.form-hint {
  font-size: 11px;
  color: #888;
  padding: 4px 0;
}

.footer-info {
  margin-top: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  background: #f5f5f5;
  text-align: center;
}

.version-info,
.source-info {
  margin-bottom: 6px;
}

.version-info:last-child,
.source-info:last-child {
  margin-bottom: 0;
}

.version-label,
.source-label {
  font-size: 12px;
  color: #666;
}

.version-text {
  font-size: 12px;
  color: #c00;
  font-weight: bold;
}

.source-link {
  font-size: 12px;
  color: #0066cc;
  text-decoration: none;
}

.source-link:hover {
  text-decoration: underline;
}
</style>