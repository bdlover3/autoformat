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
        <input type="text" v-model="settings.bodyFont" />
      </div>
      <div class="form-row">
        <label>字号（磅）</label>
        <div class="font-size-input">
          <input type="number" v-model.number="settings.bodyFontSize" min="5" max="72" step="0.5" />
          <span class="font-size-label">{{ getFontSizeLabel(settings.bodyFontSize) }}</span>
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
        <input type="text" v-model="settings.titleFont" />
      </div>
      <div class="form-row">
        <label>字号（磅）</label>
        <div class="font-size-input">
          <input type="number" v-model.number="settings.titleFontSize" min="5" max="72" step="0.5" />
          <span class="font-size-label">{{ getFontSizeLabel(settings.titleFontSize) }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">一级标题（如"一、"）</h4>
      <div class="form-row">
        <label>字体</label>
        <input type="text" v-model="settings.h1Font" />
      </div>
      <div class="form-row">
        <label>字号（磅）</label>
        <div class="font-size-input">
          <input type="number" v-model.number="settings.h1FontSize" min="5" max="72" step="0.5" />
          <span class="font-size-label">{{ getFontSizeLabel(settings.h1FontSize) }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">二级标题（如"（一）"）</h4>
      <div class="form-row">
        <label>字体</label>
        <input type="text" v-model="settings.h2Font" />
      </div>
      <div class="form-row">
        <label>字号（磅）</label>
        <div class="font-size-input">
          <input type="number" v-model.number="settings.h2FontSize" min="5" max="72" step="0.5" />
          <span class="font-size-label">{{ getFontSizeLabel(settings.h2FontSize) }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">三级标题（如"1."）</h4>
      <div class="form-row">
        <label>字体</label>
        <input type="text" v-model="settings.h3Font" />
      </div>
      <div class="form-row">
        <label>字号（磅）</label>
        <div class="font-size-input">
          <input type="number" v-model.number="settings.h3FontSize" min="5" max="72" step="0.5" />
          <span class="font-size-label">{{ getFontSizeLabel(settings.h3FontSize) }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h4 class="section-title">四级标题（如"（1）"）</h4>
      <div class="form-row">
        <label>字体</label>
        <input type="text" v-model="settings.h4Font" />
      </div>
      <div class="form-row">
        <label>字号（磅）</label>
        <div class="font-size-input">
          <input type="number" v-model.number="settings.h4FontSize" min="5" max="72" step="0.5" />
          <span class="font-size-label">{{ getFontSizeLabel(settings.h4FontSize) }}</span>
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
    </div>

  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import dlgFunc from './js/dialog.js'

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
      disableFontWarning: false
    })

    onMounted(() => {
      dlgFunc.loadSettings(settings)
    })

    function saveSettings() {
      dlgFunc.saveSettings(settings)
    }

    function resetSettings() {
      dlgFunc.resetSettings(settings)
    }

    function getFontSizeLabel(pt) {
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
      return fontSizeMap[pt] || ''
    }

    return {
      settings,
      saveSettings,
      resetSettings,
      getFontSizeLabel
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
  width: 90px;
  flex-shrink: 0;
  font-size: 12px;
  color: #555;
}

.form-row input {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 12px;
  outline: none;
}

.form-row input:focus {
  border-color: #c00;
}

.font-size-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.font-size-input input {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 12px;
  outline: none;
}

.font-size-input input:focus {
  border-color: #c00;
}

.font-size-label {
  font-size: 11px;
  color: #888;
  padding: 4px 6px;
  background: #f0f0f0;
  border-radius: 3px;
}

.form-hint {
  font-size: 11px;
  color: #888;
  padding: 4px 0;
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
</style>
