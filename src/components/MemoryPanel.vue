<template>
  <div class="memory-panel">
    <div class="panel-header">记忆管理</div>
    <div class="panel-body">
      <template v-if="items.length > 0">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="memory-item"
        >
          <div class="item-text" :title="item.text">{{ item.text }}</div>
          <span class="item-type-badge" :class="'badge-' + item.type">{{ typeLabel(item.type) }}</span>
          <button class="btn-delete" @click="deleteItem(idx)" title="删除">✕</button>
        </div>
      </template>
      <div v-else class="empty-hint">暂无记忆记录</div>
    </div>
    <div class="panel-footer">
      <button class="btn btn-clear" @click="clearAll" :disabled="items.length === 0">清空所有</button>
      <button class="btn btn-close" @click="closeDialog">关闭</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { loadTypeMemory, deleteTypeMemory, clearTypeMemory } from './js/typememory.js'

const TYPE_LABELS = {
  docNumber: '文号', title: '标题', subtitle: '副标',
  addressee: '抬头', attachment: '附件',
  h1: '一标', h2: '二标', h3: '三标',
  signature: '发言人', authorInfo: '发言信息', sig: '落款', date: '日期',
  body: '正文'
}

export default {
  name: 'MemoryPanel',
  setup() {
    const items = ref([])

    // 从记忆文件直接读取
    try {
      const memory = loadTypeMemory()
      for (const [text, type] of Object.entries(memory)) {
        items.value.push({ text, type })
      }
    } catch (e) { }

    function typeLabel(type) {
      return TYPE_LABELS[type] || type
    }

    function deleteItem(idx) {
      const text = items.value[idx].text
      items.value.splice(idx, 1)
      deleteTypeMemory(text)
    }

    function clearAll() {
      if (!confirm('确定清空所有记忆？')) return
      items.value = []
      clearTypeMemory()
    }

    function closeDialog() {
      try { window.close() } catch (e) { }
    }

    return { items, typeLabel, deleteItem, clearAll, closeDialog }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }
.memory-panel {
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
  font-size: 12px;
  color: #333;
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.panel-header {
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #e8e8e8;
  background: #fafafa;
  flex-shrink: 0;
}
.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}
.memory-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-bottom: 1px solid #f5f5f5;
}
.memory-item:hover {
  background: #f7f9fc;
}
.item-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #333;
}
.item-type-badge {
  flex-shrink: 0;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 2px;
  color: #fff;
  font-weight: 500;
}
.badge-docNumber  { background: #4caf50; }
.badge-title      { background: #2196f3; }
.badge-subtitle   { background: #42a5f5; }
.badge-addressee  { background: #26a69a; }
.badge-attachment { background: #66bb6a; }
.badge-h1         { background: #5c6bc0; }
.badge-h2         { background: #7986cb; }
.badge-h3         { background: #9fa8da; }
.badge-signature  { background: #ef5350; }
.badge-sig        { background: #e57373; }
.badge-date       { background: #f44336; }
.badge-body       { background: #999; }
.btn-delete {
  flex-shrink: 0;
  border: none;
  background: transparent;
  color: #bbb;
  cursor: pointer;
  font-size: 12px;
  padding: 0 4px;
  line-height: 1;
}
.btn-delete:hover { color: #ff4d4f; }
.empty-hint {
  padding: 30px 14px;
  text-align: center;
  color: #bbb;
}
.panel-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 14px;
  border-top: 1px solid #e8e8e8;
  background: #fafafa;
  flex-shrink: 0;
}
.btn {
  padding: 4px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
  background: #fff;
  color: #333;
}
.btn:disabled { color: #bbb; cursor: default; }
.btn-close:hover { border-color: #4096ff; color: #4096ff; }
.btn-clear:hover:not(:disabled) { border-color: #ff4d4f; color: #ff4d4f; }
.panel-body::-webkit-scrollbar { width: 6px; }
.panel-body::-webkit-scrollbar-track { background: transparent; }
.panel-body::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
</style>
