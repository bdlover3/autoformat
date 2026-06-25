<template>
  <div class="mark-dialog">
    <div class="dialog-header">标记为特殊元素</div>
    <div class="dialog-body">
      <div class="hint">将当前选区内容标记为指定类型，立即应用对应格式：</div>
      <div class="selected-preview" v-if="selectedText">
        <div class="preview-label">选区内容：</div>
        <pre class="preview-text">{{ selectedText }}</pre>
      </div>
      <div class="selected-preview empty" v-else>
        <div class="preview-label">未检测到选区内容</div>
        <div class="preview-sub">请先在文档中选中要标记的文字，再点此按钮</div>
      </div>
      <div class="type-grid">
        <button
          v-for="t in types"
          :key="t.key"
          class="type-btn"
          :class="{ active: selectedType === t.key }"
          :disabled="!selectedText"
          @click="onConfirm(t.key)"
        >
          <span class="type-label">{{ t.label }}</span>
        </button>
      </div>
    </div>
    <div class="dialog-footer">
      <button class="btn btn-close" @click="closeDialog">关闭</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

// 可标记的类型（排除 body，body 是默认正文无需标记）
const TYPES = [
  { key: 'docNumber', label: '文号' },
  { key: 'title', label: '标题' },
  { key: 'subtitle', label: '副标' },
  { key: 'attachment', label: '附件' },
  { key: 'addressee', label: '抬头' },
  { key: 'h1', label: '一标' },
  { key: 'h2', label: '二标' },
  { key: 'h3', label: '三标' },
  { key: 'authorInfo', label: '发言人' },
  { key: 'sig', label: '落款' },
  { key: 'date', label: '日期' }
]

export default {
  name: 'MarkElement',
  setup() {
    const selectedText = ref('')
    const selectedType = ref(null)

    //对话框是独立 window，不共享主窗口的 window 变量
    //通过 BroadcastChannel 在挂载后主动发 hello，主线程推送选区文本
    let bc = null
    try {
      bc = new BroadcastChannel('wps_mark_element')
      bc.onmessage = (event) => {
        const msg = event.data
        if (!msg || !msg.type) return
        if (msg.type === 'init' && typeof msg.selectedText === 'string') {
          selectedText.value = msg.selectedText
        }
      }
      bc.postMessage({ type: 'hello' })
    } catch (e) { }

    function onConfirm(type) {
      if (!selectedText.value) return
      //通过 BroadcastChannel 通知主线程标记类型
      try {
        if (!bc) bc = new BroadcastChannel('wps_mark_element')
        bc.postMessage({ type: 'mark', elementType: type })
        setTimeout(() => { try { bc.close() } catch (e) { } }, 100)
      } catch (e) { }
      try { window.close() } catch (e) { }
    }

    function closeDialog() {
      try { if (bc) bc.close() } catch (e) { }
      try { window.close() } catch (e) { }
    }

    return { types: TYPES, selectedText, selectedType, onConfirm, closeDialog }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }
.mark-dialog {
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
  font-size: 12px;
  color: #333;
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.dialog-header {
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #e8e8e8;
  background: #fafafa;
  flex-shrink: 0;
}
.dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: 10px 14px;
}
.hint {
  color: #888;
  font-size: 11px;
  margin-bottom: 8px;
}
.selected-preview {
  padding: 8px 10px;
  background: #f7f9fc;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  margin-bottom: 12px;
}
.selected-preview.empty {
  background: #fff7f0;
  border-color: #ffd6a0;
}
.preview-label {
  font-size: 11px;
  color: #666;
  margin-bottom: 4px;
}
.preview-sub {
  font-size: 11px;
  color: #c80;
  line-height: 1.6;
}
.preview-text {
  margin: 0;
  font-family: "仿宋", "FangSong", serif;
  font-size: 12px;
  color: #333;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 80px;
  overflow: hidden;
}
.type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.type-btn {
  padding: 10px 6px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  color: #333;
  transition: all 0.1s;
}
.type-btn:hover:not(:disabled) {
  border-color: #1677ff;
  color: #1677ff;
  background: #e6f4ff;
}
.type-btn:disabled {
  color: #bbb;
  cursor: default;
  background: #f5f5f5;
}
.type-btn.active {
  background: #1677ff;
  color: #fff;
  border-color: #1677ff;
}
.type-label {
  font-weight: 500;
}
.dialog-footer {
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
.btn-close:hover { border-color: #4096ff; color: #4096ff; }
</style>
