<template>
  <div class="sig-dialog">
    <div class="dialog-header">插入落款</div>
    <div class="dialog-body">
      <label class="auto-date-row">
        <input type="checkbox" v-model="autoDate" />
        <span>自动插入时间</span>
      </label>
      <template v-if="signatures.length > 0">
        <div class="hint">点击落款插入到文末：</div>
        <div
          v-for="item in signatures"
          :key="item.id"
          class="sig-item"
          :class="{ active: selectedId === item.id }"
          @click="onSelect(item)"
          @dblclick="onConfirm"
        >
          <div class="sig-name" :title="item.name">{{ item.name }}</div>
          <pre class="sig-text">{{ item.text }}</pre>
          <button class="btn-del" @click.stop="onDelete(item)" title="删除">✕</button>
        </div>
      </template>
      <div v-else class="empty-hint">
        <div>暂无保存的落款</div>
        <div class="empty-sub">排版后用微调面板的落款，或此处添加常用落款以便快速插入</div>
      </div>
    </div>
    <div class="add-area">
      <div class="add-title">添加新落款：</div>
      <input
        v-model="newName"
        class="add-input"
        placeholder="落款显示名（可选）"
        maxlength="40"
      />
      <textarea
        v-model="newText"
        class="add-textarea"
        placeholder="落款正文（多行，例：&#10;XX办公室&#10;2026年6月24日）"
        rows="3"
      ></textarea>
      <button class="btn btn-add" @click="onAdd" :disabled="!newText.trim()">添加</button>
    </div>
    <div class="dialog-footer">
      <button class="btn btn-insert" @click="onConfirm" :disabled="!selected">插入</button>
      <button class="btn btn-close" @click="closeDialog">关闭</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { loadSignatures, addSignature, deleteSignature } from './js/signature.js'

export default {
  name: 'InsertSignature',
  setup() {
    const signatures = ref(loadSignatures())
    const selectedId = ref(null)
    const selected = ref(null)
    const newName = ref('')
    const newText = ref('')
    const autoDate = ref(true)

    function onSelect(item) {
      selectedId.value = item.id
      selected.value = item
    }

    function onAdd() {
      const text = newText.value.trim()
      if (!text) return
      signatures.value = addSignature(text, newName.value.trim())
      newText.value = ''
      newName.value = ''
    }

    function onDelete(item) {
      if (!confirm(`确定删除落款"${item.name}"？`)) return
      signatures.value = deleteSignature(item.id)
      if (selectedId.value === item.id) {
        selectedId.value = null
        selected.value = null
      }
    }

    function onConfirm() {
      if (!selected.value) return
      // 通过 BroadcastChannel 通知主线程插入落款
      try {
        const bc = new BroadcastChannel('wps_insert_signature')
        bc.postMessage({ type: 'insert', text: selected.value.text, autoDate: autoDate.value })
        setTimeout(() => { try { bc.close() } catch (e) { } }, 100)
      } catch (e) { }
      try { window.close() } catch (e) { }
    }

    function closeDialog() {
      try { window.close() } catch (e) { }
    }

    return {
      signatures, selectedId, selected, newName, newText, autoDate,
      onSelect, onAdd, onDelete, onConfirm, closeDialog
    }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }
.sig-dialog {
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
  padding: 6px 0;
  flex-shrink: 0;
  min-height: 100px;
}
.hint {
  padding: 4px 14px;
  color: #888;
  font-size: 11px;
}
.auto-date-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px 4px;
  color: #333;
  font-size: 12px;
}
.sig-item {
  position: relative;
  padding: 6px 28px 6px 14px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
}
.sig-item:hover { background: #f7f9fc; }
.sig-item.active { background: #e6f4ff; border-left: 3px solid #1677ff; padding-left: 11px; }
.sig-name {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sig-text {
  margin: 0;
  font-family: "仿宋", "FangSong", serif;
  font-size: 11px;
  color: #666;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 60px;
  overflow: hidden;
}
.btn-del {
  position: absolute;
  top: 6px;
  right: 6px;
  border: none;
  background: transparent;
  color: #bbb;
  cursor: pointer;
  font-size: 12px;
  padding: 0 4px;
}
.btn-del:hover { color: #ff4d4f; }
.empty-hint {
  padding: 24px 14px;
  text-align: center;
  color: #bbb;
}
.empty-sub {
  margin-top: 6px;
  font-size: 11px;
  color: #ccc;
  line-height: 1.6;
}
.add-area {
  padding: 8px 14px;
  border-top: 1px solid #e8e8e8;
  background: #fafafa;
  flex-shrink: 0;
}
.add-title {
  font-size: 11px;
  color: #666;
  margin-bottom: 4px;
}
.add-input {
  width: 100%;
  padding: 4px 6px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 12px;
  margin-bottom: 4px;
  font-family: inherit;
}
.add-textarea {
  width: 100%;
  padding: 4px 6px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 12px;
  font-family: "仿宋", "FangSong", serif;
  resize: vertical;
  margin-bottom: 4px;
}
.add-input:focus, .add-textarea:focus { border-color: #4096ff; outline: none; }
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
.btn:disabled { color: #bbb; cursor: default; background: #f5f5f5; }
.btn-add { width: 100%; }
.btn-add:hover:not(:disabled) { border-color: #52c41a; color: #52c41a; }
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 14px;
  border-top: 1px solid #e8e8e8;
  background: #fafafa;
  flex-shrink: 0;
}
.btn-insert { background: #1677ff; color: #fff; border-color: #1677ff; }
.btn-insert:hover:not(:disabled) { background: #4096ff; border-color: #4096ff; }
.btn-close:hover { border-color: #4096ff; color: #4096ff; }
.dialog-body::-webkit-scrollbar { width: 6px; }
.dialog-body::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
</style>
