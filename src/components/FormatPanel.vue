<template>
  <div class="panel">
    <div class="panel-header">
      <h3 class="panel-title">排版微调</h3>
      <span class="close-btn" @click="closePanel">&times;</span>
    </div>
    <p class="panel-desc">
      点击文本可直接编辑，失焦或停止输入 3 秒后自动重新应用格式。
    </p>

    <div class="note-list">
      <div
        v-for="item in sortedElements"
        :key="item.start"
        class="note-card"
        :class="'note-' + item.type"
      >
        <span class="note-tag">{{ typeLabel(item.type) }}</span>
        <div
          class="note-text"
          contenteditable="true"
          spellcheck="false"
          :data-idx="item.start"
          @input="onTextChanged($event, item)"
          @blur="onBlur"
        >{{ item.text }}</div>
      </div>
    </div>

    <div v-if="sortedElements.length === 0" class="note-list">
      <div class="empty-hint">未检测到特殊元素</div>
    </div>

    <div class="btn-row">
      <button class="btn btn-close" @click="closePanel">关闭</button>
      <button class="btn btn-cancel" @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'

const TYPE_LABELS = {
  docNumber: '文号',
  title: '标题',
  subtitle: '小标题',
  signature: '署名',
  addressee: '抬头',
  attachment: '附件',
  h1: '一、',
  h2: '（一）',
  h3: '1.',
  sig: '落款',
  date: '日期'
}

export default {
  name: 'FormatPanel',
  setup() {
    const elements = ref([])
    let debounceTimer = null
    let dirty = false

    onMounted(() => {
      try {
        const storage = window.Application.PluginStorage
        const raw = storage.getItem('__formatPanelData')
        if (raw) {
          const pending = JSON.parse(raw)
          if (Array.isArray(pending.elements)) {
            elements.value = JSON.parse(JSON.stringify(pending.elements))
          }
        }
      } catch (e) {
        console.warn('[FormatPanel] PluginStorage read failed:', e)
      }
    })

    // 按文档出现顺序排列（start 升序），像大纲视图
    const sortedElements = computed(() => {
      return [...elements.value].sort((a, b) => a.start - b.start)
    })

    function typeLabel(type) {
      return TYPE_LABELS[type] || type
    }

    function flushDebounce() {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
        debounceTimer = null
      }
      if (dirty) {
        applyNow()
      }
    }

    function applyNow() {
      dirty = false
      try {
        const storage = window.Application.PluginStorage
        storage.setItem('__formatPanelEdits', JSON.stringify(JSON.parse(JSON.stringify(elements.value))))
        storage.setItem('__formatPanelAction', 'apply')
      } catch (e) {
        console.warn('[FormatPanel] applyNow failed:', e)
      }
    }

    function onTextChanged(event, item) {
      // 从 contenteditable div 获取最新文本
      const el = event.target
      item.text = el.innerText || el.textContent || ''
      dirty = true
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(applyNow, 3000)
    }

    function onBlur() {
      if (dirty) applyNow()
    }

    function closePanel() {
      flushDebounce()
      try {
        const storage = window.Application.PluginStorage
        storage.setItem('__formatPanelAction', 'close')
      } catch (e) { }
    }

    function cancel() {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = null
      try {
        const storage = window.Application.PluginStorage
        storage.setItem('__formatPanelAction', 'cancel')
      } catch (e) { }
    }

    return {
      elements,
      sortedElements,
      typeLabel,
      onTextChanged,
      onBlur,
      closePanel,
      cancel
    }
  }
}
</script>

<style scoped>
.panel {
  padding: 10px 8px 8px 10px;
  font-size: 12px;
  color: #333;
  background: #f5f0e1;
  height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #c00;
  padding-bottom: 6px;
  margin-bottom: 4px;
}
.panel-title {
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  color: #c00;
}
.close-btn {
  font-size: 22px;
  color: #999;
  cursor: pointer;
  line-height: 1;
}
.close-btn:hover {
  color: #333;
}
.panel-desc {
  font-size: 10px;
  color: #888;
  margin: 0 0 8px 0;
  text-align: center;
  line-height: 1.4;
}
.note-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.note-card {
  background: #fff9c4;
  border-radius: 2px;
  padding: 3px 5px;
  position: relative;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.08);
  word-break: break-all;
}
/* 标题用稍深便签色 */
.note-card.note-title {
  background: #fff176;
}
.note-card.note-docNumber {
  background: #e8f5e9;
}
.note-card.note-subtitle {
  background: #e3f2fd;
}
.note-card.note-sig,
.note-card.note-date {
  background: #fce4ec;
}
.note-tag {
  font-size: 10px;
  color: #999;
  display: block;
  margin-bottom: 1px;
  line-height: 1;
}
.note-text {
  outline: none;
  border: none;
  background: transparent;
  font-size: 11px;
  line-height: 1.5;
  min-height: 18px;
  word-break: break-all;
  cursor: text;
}
.note-text:focus {
  background: rgba(255,255,255,0.5);
  border-radius: 1px;
}
/* 标题文字加粗 */
.note-title .note-text {
  font-weight: bold;
  font-size: 12px;
}
/* h1/h2/h3 缩进模拟大纲层级 */
.note-h1 .note-text { font-weight: bold; }
.note-h2 .note-text { padding-left: 12px; }
.note-h3 .note-text { padding-left: 24px; }
.empty-hint {
  text-align: center;
  color: #aaa;
  font-size: 12px;
  padding: 20px 0;
}
.btn-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px dashed #d0c9a6;
}
.btn {
  padding: 5px 16px;
  border: none;
  border-radius: 3px;
  font-size: 13px;
  cursor: pointer;
}
.btn-close {
  background: #c00;
  color: #fff;
}
.btn-close:hover {
  background: #a00;
}
.btn-cancel {
  background: #e8e0c8;
  color: #555;
}
.btn-cancel:hover {
  background: #d8d0b8;
}
</style>
