<template>
  <div class="warning-panel">
    <h3 class="panel-title">字体缺失提醒</h3>
    <p class="panel-desc">以下公文必需字体未安装，请选择替换方案：</p>

    <div class="font-list">
      <div v-for="(item, idx) in fontItems" :key="idx" class="font-item">
        <div class="font-original">{{ item.name }}</div>
        <div class="font-arrow">→</div>
        <select v-model="item.selected" class="font-select">
          <option v-for="opt in item.options" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>
    </div>

    <div class="options-row">
      <label class="checkbox-label">
        <input type="checkbox" v-model="saveFuture" />
        <span>以后也使用相同的配置</span>
      </label>
    </div>

    <div class="btn-group">
      <button class="btn btn-keep" @click="keepOriginal">保持原状</button>
      <button class="btn btn-confirm" @click="confirm">确认</button>
      <button class="btn btn-dismiss" @click="dismissForever">不再提醒</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

function getBuiltInFonts() {
  const fonts = []
  if (window.Application && window.Application.FontNames) {
    const fn = window.Application.FontNames
    for (let i = 1; i <= fn.Count; i++) {
      fonts.push(fn.Item(i))
    }
  }
  return fonts
}

export default {
  name: 'FontWarning',
  setup() {
    const saveFuture = ref(false)
    const fontItems = reactive([])
    const builtInFonts = ref([])

    //BroadcastChannel 用于对话框↔主线程即时通讯（替代 PluginStorage）
    let bc = null
    try {
      bc = new BroadcastChannel('wps_font_warning')
    } catch (e) {
      console.warn('[FontWarning] BroadcastChannel 不可用', e)
    }

    //收到主线程推送的缺失字体数据后填充列表
    function applyPending(pending) {
      if (!pending || !pending.missingFonts || pending.missingFonts.length === 0) {
        fontItems.push({
          name: '（无缺失字体）',
          options: [],
          selected: ''
        })
        return
      }
      builtInFonts.value = getBuiltInFonts()
      const commonFallbacks = [
        '宋体', '仿宋', '楷体', '黑体',
        'Microsoft YaHei', 'SimSun', 'FangSong', 'KaiTi',
        'Arial', 'Times New Roman'
      ]
      for (const font of pending.missingFonts) {
        const opts = new Set([font.fallback])
        for (const bf of builtInFonts.value) {
          opts.add(bf)
        }
        for (const cf of commonFallbacks) {
          opts.add(cf)
        }
        fontItems.push({
          name: font.name,
          fallback: font.fallback,
          selected: font.fallback,
          options: Array.from(opts)
        })
      }
    }

    onMounted(() => {
      //挂载后主动发 hello，主线程收到即推送 missingFonts（不再用 PluginStorage）
      if (bc) {
        bc.onmessage = (event) => {
          try {
            const msg = event.data
            if (msg && msg.type === 'init' && msg.missingFonts) {
              applyPending({ missingFonts: msg.missingFonts })
            }
          } catch (e) { }
        }
        try { bc.postMessage({ type: 'hello' }) } catch (e) { }
      }
    })

    onUnmounted(() => {
      if (bc) {
        try { bc.close() } catch (e) { }
        bc = null
      }
    })

    function confirm() {
      const result = {}
      for (const item of fontItems) {
        result[item.name] = item.selected
      }
      //通过 BroadcastChannel 即时把结果发回主线程
      try {
        if (bc) {
          bc.postMessage({
            type: 'result',
            result: {
              replacements: result,
              saveFuture: saveFuture.value
            }
          })
        }
      } catch (e) { }
      try { window.close() } catch (e) { }
    }

    function keepOriginal() {
      //保持原状：不做任何替换，直接关闭
      try {
        if (bc) {
          bc.postMessage({
            type: 'result',
            result: { replacements: {} }
          })
        }
      } catch (e) { }
      try { window.close() } catch (e) { }
    }

    function dismissForever() {
      //不再提醒：设置 disableFontWarning 标志
      try {
        if (bc) {
          bc.postMessage({
            type: 'result',
            result: { disableFontWarning: true }
          })
        }
      } catch (e) { }
      try { window.close() } catch (e) { }
    }

    return { fontItems, saveFuture, confirm, keepOriginal, dismissForever }
  }
}
</script>

<style scoped>
.warning-panel {
  padding: 20px;
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
  margin-bottom: 8px;
  color: #c00;
  border-bottom: 2px solid #c00;
  padding-bottom: 8px;
}
.panel-desc {
  font-size: 12px;
  color: #666;
  margin-bottom: 14px;
  line-height: 1.6;
}
.font-list {
  margin-bottom: 14px;
}
.font-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #fafafa;
}
.font-original {
  font-size: 13px;
  font-weight: bold;
  color: #c00;
  min-width: 120px;
}
.font-arrow {
  font-size: 14px;
  color: #999;
}
.font-select {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 12px;
  outline: none;
  background: #fff;
}
.font-select:focus {
  border-color: #c00;
}
.options-row {
  margin-bottom: 14px;
  padding: 8px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #f5f5f5;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
}
.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.btn-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.btn-keep {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  background: #fff;
  color: #333;
  transition: background 0.2s;
}
.btn-keep:hover {
  background: #f0f0f0;
}
.btn-confirm {
  padding: 8px 28px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background: #c00;
  color: #fff;
  transition: background 0.2s;
}
.btn-confirm:hover {
  background: #a00;
}
.btn-dismiss {
  padding: 8px 16px;
  border: 1px solid #999;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  background: #fff;
  color: #666;
  transition: background 0.2s;
}
.btn-dismiss:hover {
  background: #f0f0f0;
}
</style>
