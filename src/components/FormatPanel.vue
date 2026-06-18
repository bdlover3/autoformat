<template>
  <div class="panel">
    <div class="panel-header">
      <span class="panel-title">排版微调</span>
      <span class="close-btn" @click="closePanel">
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>
      </span>
    </div>

    <div class="panel-body">
      <template v-if="sortedElements.length > 0">
        <div
          v-for="(group, gIdx) in groupedElements"
          :key="gIdx"
          class="element-group"
        >
          <div class="group-header" @click="toggleGroup(group.key)">
            <span class="group-arrow" :class="{ collapsed: collapsedGroups[group.key] }">&#9654;</span>
            <span class="group-label">{{ group.label }}</span>
            <span class="group-count">{{ group.items.length }}</span>
          </div>
          <div class="group-items" v-show="!collapsedGroups[group.key]">
            <div
              v-for="item in group.items"
              :key="item.start"
              class="element-item"
              :class="'item-' + item.type"
            >
              <div
                class="element-text"
                contenteditable="true"
                spellcheck="false"
                :data-idx="item.start"
                @input="onTextChanged($event, item)"
                @blur="onBlur"
              >{{ item.text }}</div>
            </div>
          </div>
        </div>
      </template>
      <div v-else class="empty-hint">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#bbb" stroke-width="1.5"/><path d="M9 14l2 2 4-4" stroke="#bbb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>未检测到特殊元素</span>
      </div>
    </div>

    <div class="panel-footer">
      <button class="btn btn-cancel" @click="cancel">取消排版</button>
      <button class="btn btn-close" @click="closePanel">关闭</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive } from 'vue'

const TYPE_LABELS = {
  docNumber: '文号',
  title: '标题',
  subtitle: '小标题',
  signature: '署名',
  addressee: '抬头',
  attachment: '附件',
  h1: '一级标题',
  h2: '二级标题',
  h3: '三级标题',
  sig: '落款',
  date: '日期'
}

//分组顺序与显示名
const GROUP_ORDER = [
  { key: 'head', label: '公文头部', types: ['docNumber', 'title', 'subtitle', 'addressee', 'attachment'] },
  { key: 'body', label: '正文标题', types: ['h1', 'h2', 'h3'] },
  { key: 'footer', label: '落款区', types: ['signature', 'sig', 'date'] }
]

export default {
  name: 'FormatPanel',
  setup() {
    const elements = ref([])
    const collapsedGroups = reactive({})
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

    //按文档出现顺序排列
    const sortedElements = computed(() => {
      return [...elements.value].sort((a, b) => a.start - b.start)
    })

    //按分组归类
    const groupedElements = computed(() => {
      const groups = []
      for (const g of GROUP_ORDER) {
        const items = sortedElements.value.filter(el => g.types.includes(el.type))
        if (items.length > 0) {
          groups.push({ key: g.key, label: g.label, items })
        }
      }
      return groups
    })

    function typeLabel(type) {
      return TYPE_LABELS[type] || type
    }

    function toggleGroup(key) {
      collapsedGroups[key] = !collapsedGroups[key]
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
      groupedElements,
      collapsedGroups,
      typeLabel,
      toggleGroup,
      onTextChanged,
      onBlur,
      closePanel,
      cancel
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.panel {
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
  font-size: 12px;
  color: #333;
  background: #fff;
  height: 100vh;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* === 顶栏 === */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #e8e8e8;
  flex-shrink: 0;
  background: #fafafa;
}
.panel-title {
  font-size: 13px;
  font-weight: 600;
  color: #222;
}
.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #999;
  cursor: pointer;
  border-radius: 2px;
}
.close-btn:hover {
  background: #e5e5e5;
  color: #555;
}

/* === 内容区 === */
.panel-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
}

/* === 分组 === */
.element-group {
  border-bottom: 1px solid #f0f0f0;
}
.element-group:last-child {
  border-bottom: none;
}
.group-header {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  cursor: pointer;
  user-select: none;
  background: #fafafa;
}
.group-header:hover {
  background: #f0f0f0;
}
.group-arrow {
  font-size: 8px;
  color: #999;
  margin-right: 6px;
  transition: transform 0.15s;
  display: inline-block;
}
.group-arrow.collapsed {
  transform: rotate(0deg);
}
.group-arrow:not(.collapsed) {
  transform: rotate(90deg);
}
.group-label {
  font-size: 12px;
  font-weight: 600;
  color: #444;
  flex: 1;
}
.group-count {
  font-size: 11px;
  color: #aaa;
  background: #eee;
  border-radius: 8px;
  padding: 0 6px;
  line-height: 16px;
  min-width: 16px;
  text-align: center;
}

/* === 元素卡片 === */
.group-items {
  padding: 2px 0;
}
.element-item {
  padding: 4px 12px 4px 28px;
  border-left: 3px solid transparent;
  transition: background 0.1s;
}
.element-item:hover {
  background: #f7f9fc;
}
/* 左侧类型色条 */
.item-docNumber  { border-left-color: #4caf50; }
.item-title      { border-left-color: #2196f3; }
.item-subtitle   { border-left-color: #42a5f5; }
.item-addressee  { border-left-color: #26a69a; }
.item-attachment { border-left-color: #66bb6a; }
.item-h1         { border-left-color: #5c6bc0; }
.item-h2         { border-left-color: #7986cb; }
.item-h3         { border-left-color: #9fa8da; }
.item-signature  { border-left-color: #ef5350; }
.item-sig        { border-left-color: #e57373; }
.item-date       { border-left-color: #f44336; }

.element-text {
  outline: none;
  border: 1px solid transparent;
  background: transparent;
  font-size: 12px;
  line-height: 1.6;
  min-height: 20px;
  word-break: break-all;
  cursor: text;
  padding: 2px 4px;
  border-radius: 2px;
  transition: border-color 0.15s, background 0.15s;
  color: #333;
}
.element-text:focus {
  border-color: #91caff;
  background: #f0f6ff;
}
.element-text:hover:not(:focus) {
  background: #fafafa;
}
/* 标题加粗 */
.item-title .element-text {
  font-weight: 600;
}
.item-h1 .element-text {
  font-weight: 600;
}
/* h2/h3 缩进模拟层级 */
.item-h2 .element-text {
  padding-left: 8px;
}
.item-h3 .element-text {
  padding-left: 16px;
}

/* === 空状态 === */
.empty-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #bbb;
  gap: 8px;
}
.empty-hint span {
  font-size: 12px;
}

/* === 底栏 === */
.panel-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 12px;
  border-top: 1px solid #e8e8e8;
  flex-shrink: 0;
  background: #fafafa;
}
.btn {
  padding: 4px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.btn-close {
  background: #fff;
  color: #333;
}
.btn-close:hover {
  border-color: #4096ff;
  color: #4096ff;
}
.btn-cancel {
  background: #fff;
  color: #333;
}
.btn-cancel:hover {
  border-color: #ff4d4f;
  color: #ff4d4f;
}

/* === 滚动条 === */
.panel-body::-webkit-scrollbar {
  width: 6px;
}
.panel-body::-webkit-scrollbar-track {
  background: transparent;
}
.panel-body::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}
.panel-body::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}
</style>
