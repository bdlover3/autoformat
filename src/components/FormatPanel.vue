<template>
  <div class="panel" @click="onPanelClick">

    <div class="panel-body">

      <!-- ═══ 一键排版区 ═══ -->
      <div class="panel-section section-format">
        <div class="section-header" @click="toggleSection('format')">
          <span class="section-arrow" :class="{ collapsed: sections.format }">&#9654;</span>
          <span class="section-title">一键排版</span>
        </div>
        <div class="section-body" v-show="!sections.format">
          <button class="mini-btn" @click="runAutoFormat">一键排版</button>
          <button class="mini-btn" @click="runUndoFormat">撤销排版</button>
          <button class="mini-btn" @click="runSplitTitle">标题后换行</button>
          <button class="mini-btn" @click="runRemoveBlank">删除空行</button>
        </div>
      </div>

      <!-- ═══ 格式微调区 ═══ -->
      <div class="panel-section section-tune">
        <div class="section-header" @click="toggleSection('tune')">
          <span class="section-arrow" :class="{ collapsed: sections.tune }">&#9654;</span>
          <span class="section-title">格式微调</span>
          <span class="section-count" v-if="sortedElements.length">{{ sortedElements.length }}</span>
        </div>
        <div class="section-body" v-show="!sections.tune">
          <div v-if="footerMissing" class="footer-warn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#c80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>未检测到落款或发言人，可在下方手动调整类型</span>
          </div>
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
                  @click="navigateToItem(item)"
                >
                  <div class="element-row">
                    <div
                      class="element-text"
                      :class="{ 'text-muted': item.matched === false }"
                      contenteditable="true"
                      spellcheck="false"
                      :data-idx="item.start"
                      @input="onTextChanged($event, item)"
                      @blur="onBlur"
                    >{{ item.text }}</div>
                    <div
                      v-if="getInvalidTail(item)"
                      class="invalid-tail"
                      :title="'文档中不匹配，将变回正文格式'"
                    >{{ getInvalidTail(item) }}</div>
                    <span
                      class="type-badge"
                      :class="'badge-' + item.type"
                      @click.stop="onBadgeClick($event, item)"
                    >{{ typeLabel(item.type) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div v-else class="empty-hint">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#bbb" stroke-width="1.5"/><path d="M9 14l2 2 4-4" stroke="#bbb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>未检测到特殊元素</span>
          </div>
        </div>
      </div>

      <!-- ═══ 常用设置区 ═══ -->
      <div class="panel-section section-common">
        <div class="section-header" @click="toggleSection('common')">
          <span class="section-arrow" :class="{ collapsed: sections.common }">&#9654;</span>
          <span class="section-title">常用设置</span>
        </div>
        <div class="section-body" v-show="!sections.common">
          <label class="setting-row"><input type="checkbox" v-model="commonSettings.enablePageNumber" @change="saveCommonSettings">启用页码</label>
          <label class="setting-row"><input type="checkbox" v-model="commonSettings.clearFormatting" @change="saveCommonSettings">先清除格式</label>
          <label class="setting-row"><input type="checkbox" v-model="commonSettings.autoSplitSubtitle" @change="saveCommonSettings">标题后自动换行</label>
        </div>
      </div>

      <!-- ═══ 功能设置区 ═══ -->
      <div class="panel-section section-func">
        <div class="section-header" @click="toggleSection('func')">
          <span class="section-arrow" :class="{ collapsed: sections.func }">&#9654;</span>
          <span class="section-title">功能设置</span>
        </div>
        <div class="section-body" v-show="!sections.func">
          <button class="mini-btn" @click="runDetectSignature">检测发言人</button>
          <button class="mini-btn" @click="openFullSettings">完整设置</button>
          <button class="mini-btn" @click="clearTypeMemory">清空记忆</button>
        </div>
      </div>

    </div>

    <!-- 修改类型的右键/选中菜单 -->
    <div
      v-if="contextMenu.visible"
      class="context-menu"
      :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }"
    >
      <div class="context-header">调整为：</div>
      <div
        v-for="t in contextMenu.availableTypes"
        :key="t.key"
        class="context-item"
        :class="{ active: contextMenu.currentType === t.key }"
        @click.stop="changeType(contextMenu.itemStart, t.key)"
      >
        <span class="context-dot" :class="'badge-' + t.key"></span>
        {{ t.label }}
      </div>
    </div>

    <div class="panel-footer">
      <button class="btn btn-cancel" @click="cancel">取消排版</button>
      <button class="btn btn-close" @click="closePanel">关闭</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'

const TYPE_LABELS = {
  docNumber: '文号',
  title: '标题',
  subtitle: '副标',
  authorInfo: '发言',
  addressee: '抬头',
  attachment: '附件',
  h1: '一标',
  h2: '二标',
  h3: '三标',
  sig: '落款',
  date: '日期'
}

const ALL_TYPES = [
  { key: 'docNumber', label: '文号' },
  { key: 'title', label: '标题' },
  { key: 'subtitle', label: '副标' },
  { key: 'addressee', label: '抬头' },
  { key: 'attachment', label: '附件' },
  { key: 'h1', label: '一标' },
  { key: 'h2', label: '二标' },
  { key: 'h3', label: '三标' },
  { key: 'authorInfo', label: '发言人' },
  { key: 'sig', label: '落款' },
  { key: 'date', label: '日期' }
]

//落款/日期只能由检测自动识别，面板"调整为"菜单：
//  落款区元素可互转 sig↔date，或选"不是落款"转回正文（body）
const FOOTER_TYPES = ['sig', 'date']
const NON_FOOTER_TYPES = ALL_TYPES.map(t => t.key).filter(k => !FOOTER_TYPES.includes(k))

function getAvailableTypes(currentType) {
  if (FOOTER_TYPES.includes(currentType)) {
    // 落款区：互转 + "不是落款"（body）
    return [{ key: 'sig', label: '落款' }, { key: 'date', label: '日期' }, { key: 'body', label: '不是落款' }]
  }
  return ALL_TYPES.filter(t => NON_FOOTER_TYPES.includes(t.key))
}

const GROUP_ORDER = [
  { key: 'head', label: '公文头部', types: ['docNumber', 'title', 'subtitle', 'addressee', 'attachment', 'authorInfo'] },
  { key: 'body', label: '正文标题', types: ['h1', 'h2', 'h3'] },
  { key: 'footer', label: '落款区', types: ['sig', 'date'] }
]

export default {
  name: 'FormatPanel',
  setup() {
    const elements = ref([])
    const footerMissing = ref(false)
    const collapsedGroups = reactive({})
    // 四区分组折叠状态（默认展开）
    const sections = reactive({ format: false, tune: false, common: false, func: false })
    function toggleSection(key) { sections[key] = !sections[key] }
    // 常用设置（从主线程读/写）
    const commonSettings = reactive({
      enablePageNumber: true,
      clearFormatting: true,
      autoSplitSubtitle: false
    })
    // 一键排版区按钮：通过 BroadcastChannel 通知主线程执行
    function runAutoFormat() {
      try { if (bc) bc.postMessage({ type: 'runAction', action: 'autoFormat' }) } catch (e) { }
    }
    function runUndoFormat() {
      try { if (bc) bc.postMessage({ type: 'runAction', action: 'undoFormat' }) } catch (e) { }
    }
    function runSplitTitle() {
      try { if (bc) bc.postMessage({ type: 'runAction', action: 'splitTitle' }) } catch (e) { }
    }
    function runRemoveBlank() {
      try { if (bc) bc.postMessage({ type: 'runAction', action: 'removeBlank' }) } catch (e) { }
    }
    function runDetectSignature() {
      try { if (bc) bc.postMessage({ type: 'runAction', action: 'detectSignature' }) } catch (e) { }
    }
    function openFullSettings() {
      try { if (bc) bc.postMessage({ type: 'runAction', action: 'openSettings' }) } catch (e) { }
    }
    function clearTypeMemory() {
      try { if (bc) bc.postMessage({ type: 'runAction', action: 'clearMemory' }) } catch (e) { }
    }
    // 常用设置读写：通过 BroadcastChannel 和主线程同步
    function saveCommonSettings() {
      try { if (bc) bc.postMessage({ type: 'saveSettings', settings: { ...commonSettings } }) } catch (e) { }
    }
    // 收到主线程推送的设置时填充
    // 在 bc.onmessage 里加 loadSettings 分支
    const contextMenu = reactive({
      visible: false,
      x: 0,
      y: 0,
      itemStart: -1,
      currentType: '',
      availableTypes: []
    })
    let debounceTimer = null
    let dirty = false

    //BroadcastChannel 用于面板→主窗口即时通讯（替代 PluginStorage 轮询）
    let bc = null
    try {
      bc = new BroadcastChannel('wps_format_panel')
    } catch (e) {
      console.warn('[FormatPanel] BroadcastChannel 不可用，面板通讯将失效', e)
    }

    //监听主窗口发来的数据更新（位置偏移等）
    if (bc) {
      bc.onmessage = (event) => {
        try {
          const msg = event.data
          if (msg && msg.type === 'init' && Array.isArray(msg.elements)) {
            //主线程响应 hello 推送的初始数据（含 footerMissing 标志）
            elements.value = JSON.parse(JSON.stringify(msg.elements))
            footerMissing.value = !!msg.footerMissing
          } else if (msg && msg.type === 'loadSettings' && msg.settings) {
            Object.assign(commonSettings, msg.settings)
          } else if (msg && msg.type === 'updateElements' && Array.isArray(msg.elements)) {
            //apply 后主线程推回的最新位置/类型
            elements.value = JSON.parse(JSON.stringify(msg.elements))
          }
        } catch (e) { }
      }
    }

    onMounted(() => {
      //挂载后主动发 hello，主线程收到即推送初始数据（不再用 PluginStorage）
      try {
        if (bc) {
          bc.postMessage({ type: 'hello' })
          bc.postMessage({ type: 'loadSettings' })
        }
      } catch (e) {
        console.warn('[FormatPanel] hello send failed:', e)
      }
      //点击面板外区域关闭右键菜单
      document.addEventListener('mousedown', onDocMouseDown)
    })

    onUnmounted(() => {
      if (bc) {
        bc.close()
        bc = null
      }
      document.removeEventListener('mousedown', onDocMouseDown)
    })

    const sortedElements = computed(() => {
      return [...elements.value].sort((a, b) => a.start - b.start)
    })

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

    //点击标签弹出类型选择菜单（向左侧弹出）
    function onBadgeClick(event, item) {
      const rect = event.target.getBoundingClientRect()
      const panelRect = event.target.closest('.panel').getBoundingClientRect()
      //菜单宽度约 120px，从标签右边缘向左展开，避免溢出面板右侧
      const menuWidth = 130
      let menuX = rect.right - panelRect.left - menuWidth
      if (menuX < 0) menuX = 0
      contextMenu.visible = true
      contextMenu.x = menuX
      contextMenu.y = rect.bottom - panelRect.top + 4
      contextMenu.itemStart = item.start
      contextMenu.currentType = item.type
      //根据当前类型约束可选项：落款区只能互转落款区
      contextMenu.availableTypes = getAvailableTypes(item.type)
    }

    //点击元素跳转到正文对应位置（直接操作文档，选中整段以触发滚动）
    function navigateToItem(item) {
      try {
        const doc = window.Application.ActiveDocument
        if (doc && typeof item.start === 'number' && typeof item.length === 'number') {
          //选中整段文字，WPS 会自动滚动到选中位置
          const rng = doc.Range(item.start, item.start + item.length)
          rng.Select()
        }
      } catch (e) {
        console.warn('[FormatPanel] navigateToItem failed:', e)
      }
    }

    //点击面板空白处关闭菜单
    function onPanelClick(event) {
      if (contextMenu.visible && !event.target.closest('.context-menu')) {
        contextMenu.visible = false
      }
    }

    function onDocMouseDown(event) {
      if (contextMenu.visible && !event.target.closest('.context-menu')) {
        contextMenu.visible = false
      }
    }

    //修改元素类型
    function changeType(itemStart, newType) {
      const el = elements.value.find(e => e.start === itemStart)
      if (!el) {
        console.warn('[FormatPanel] changeType: element not found, itemStart=', itemStart)
        return
      }
      console.log('[FormatPanel] changeType:', el.type, '->', newType, 'itemStart=', itemStart)
      el.type = newType
      //通过 BroadcastChannel 即时通知主窗口
      try {
        if (bc) {
          bc.postMessage({ type: 'apply', elements: JSON.parse(JSON.stringify(elements.value)) })
        }
      } catch (e) {
        console.warn('[FormatPanel] changeType send failed:', e)
      }
      contextMenu.visible = false
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
        if (bc) {
          bc.postMessage({ type: 'apply', elements: JSON.parse(JSON.stringify(elements.value)) })
        }
      } catch (e) {
        console.warn('[FormatPanel] applyNow failed:', e)
      }
    }

    // 未命中尾部：text 中超出 length 的部分（面板编辑后逐字比对，不匹配的变灰提示）
    function getInvalidTail(item) {
      if (!item || !item.text || typeof item.length !== 'number') return ''
      if (item.length >= item.text.length) return ''
      return item.text.substring(item.length)
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
        if (bc) {
          bc.postMessage({ type: 'close' })
        }
      } catch (e) { }
    }

    function cancel() {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = null
      try {
        if (bc) {
          bc.postMessage({ type: 'cancel' })
        }
      } catch (e) { }
    }

    return {
      elements,
      footerMissing,
      sortedElements,
      groupedElements,
      collapsedGroups,
      contextMenu,
      typeLabel,
      toggleGroup,
      onTextChanged,
      onBlur,
      onBadgeClick,
      onPanelClick,
      changeType,
      getInvalidTail,
      navigateToItem,
      sections,
      toggleSection,
      commonSettings,
      saveCommonSettings,
      runAutoFormat,
      runUndoFormat,
      runSplitTitle,
      runRemoveBlank,
      runDetectSignature,
      openFullSettings,
      clearTypeMemory,
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
  position: relative;
  -webkit-font-smoothing: antialiased;
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
.item-authorInfo { border-left-color: #ff9800; }
.item-sig        { border-left-color: #e57373; }
.item-date       { border-left-color: #f44336; }

/* === 元素行（文字 + 标签） === */
.element-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}
.element-text {
  flex: 1;
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
/* 不匹配规则的元素文字变灰 */
.text-muted {
  color: #bbb;
}

/* === 类型标签 === */
.type-badge {
  flex-shrink: 0;
  font-size: 10px;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 2px;
  white-space: nowrap;
  margin-top: 4px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.15s;
}
.type-badge:hover {
  filter: brightness(1.15);
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
.badge-authorInfo { background: #ff9800; }
.badge-sig        { background: #e57373; }
.badge-date       { background: #f44336; }
.badge-body       { background: #bbb; }

/* === 右键菜单（调整为...） === */
.context-menu {
  position: absolute;
  z-index: 100;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  padding: 4px 0;
  min-width: 120px;
  max-height: 260px;
  overflow-y: auto;
}
.context-header {
  padding: 4px 10px;
  font-size: 11px;
  color: #999;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 2px;
}
.context-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  color: #333;
  transition: background 0.1s;
}
.context-item:hover {
  background: #f0f6ff;
  color: #1677ff;
}
.context-item.active {
  color: #999;
  cursor: default;
  background: transparent;
}
.context-item.active::after {
  content: '✓';
  margin-left: auto;
  font-size: 11px;
  color: #1677ff;
}
.context-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

/* === 落款缺失提示条 === */
.footer-warn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #fff7e6;
  border-bottom: 1px solid #ffd591;
  color: #ad6800;
  font-size: 11px;
  line-height: 1.5;
}
.footer-warn svg {
  flex-shrink: 0;
}

/* === 未命中尾部灰显 === */
.invalid-tail {
  color: #bbb;
  font-size: 11px;
  padding: 2px 4px;
  line-height: 1.4;
  word-break: break-all;
  font-style: italic;
}

/* === 分区 === */
.panel-section {
  border-bottom: 1px solid #f0f0f0;
}
.panel-section:last-child { border-bottom: none; }
.section-header {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  background: #fafafa;
}
.section-header:hover { background: #f0f0f0; }
.section-arrow {
  font-size: 8px;
  color: #999;
  margin-right: 6px;
  transition: transform 0.15s;
  display: inline-block;
}
.section-arrow.collapsed { transform: rotate(0deg); }
.section-arrow:not(.collapsed) { transform: rotate(90deg); }
.section-title {
  font-size: 12px;
  font-weight: 600;
  color: #444;
  flex: 1;
}
.section-body {
  padding: 6px 12px;
}
/* 小按钮 */
.mini-btn {
  display: inline-block;
  padding: 4px 10px;
  margin: 2px 4px 2px 0;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  background: #fff;
  color: #333;
  transition: all 0.15s;
  font-family: inherit;
}
.mini-btn:hover {
  border-color: #4096ff;
  color: #4096ff;
}
/* 设置行 */
.setting-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  font-size: 12px;
  color: #333;
  cursor: pointer;
}
.setting-row input[type="checkbox"] {
  width: 14px;
  height: 14px;
  cursor: pointer;
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
.context-menu::-webkit-scrollbar {
  width: 4px;
}
.context-menu::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 2px;
}
</style>
