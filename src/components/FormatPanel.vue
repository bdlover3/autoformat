<template>
  <div class="panel" @click="onPanelClick">

    <div class="panel-body">
      <div v-if="footerMissing && !footerWarnDismissed" class="footer-warn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#c80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="warn-text">未检测到落款或发言人，可在下方手动调整类型</span>
        <button class="warn-btn" title="不再提示本次排版" @click.stop="dismissFooterWarn">不再提示</button>
        <button class="warn-close" title="关闭" @click.stop="footerWarnDismissed = true">✕</button>
      </div>
      <div v-if="missingFonts.length > 0 && !fontWarnDismissed" class="font-warn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 7V4h16v3M9 20h6M12 4v16" stroke="#c80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="warn-text">缺失字体：{{ missingFonts.map(f => f.name).join('、') }}，已自动替换</span>
        <button class="warn-btn" title="以后不再提示字体缺失" @click.stop="disableFontWarning">不再提示</button>
        <button class="warn-close" title="关闭" @click.stop="fontWarnDismissed = true">✕</button>
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
                  :class="{ 'text-muted-all': item.matched === false && (item.matchedLen || 0) === 0 }"
                  contenteditable="true"
                  spellcheck="false"
                  :data-idx="item.start"
                  :ref="el => setTextRef(item.start, el)"
                  @input="onTextChanged($event, item)"
                  @keydown.enter.exact.prevent="onEnterSubmit($event)"
                  @blur="onBlur(item)"
                ></div>
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
import { ref, computed, onMounted, onUnmounted, reactive, nextTick } from 'vue'

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
  // 非落款区：全部特殊类型 + "正文"（body，转回正文格式，移出特殊元素）
  return ALL_TYPES.filter(t => NON_FOOTER_TYPES.includes(t.key)).concat([{ key: 'body', label: '正文' }])
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
    const footerWarnDismissed = ref(false)  // 用户点 ✕ 关闭落款提示
    const missingFonts = ref([])
    const fontWarnDismissed = ref(false)    // 用户点 ✕ 关闭字体提示
    const collapsedGroups = reactive({})
    let editingStart = null  // 当前正在编辑的元素 start（input 时记录，blur 时清除，updateElements 回显时跳过此元素避免破坏光标）
    // 非响应式存储：DOM 引用 + 用户编辑中的文本（不进 Vue 响应式，避免 @input 触发重渲染导致光标乱跳）
    const textRefs = {}      // start → contenteditable DOM
    const pendingText = {}   // start → 用户编辑中的文本（未提交）
    const contextMenu = reactive({
      visible: false,
      x: 0,
      y: 0,
      itemStart: -1,
      currentType: '',
      availableTypes: []
    })
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
            footerWarnDismissed.value = false  // 新一次排版，重置关闭状态
            missingFonts.value = Array.isArray(msg.missingFonts) ? msg.missingFonts : []
            fontWarnDismissed.value = false
            //初始化所有 DOM innerHTML（renderText 拆黑/灰双色）
            nextTickAllInnerHTML()
          } else if (msg && msg.type === 'updateElements' && Array.isArray(msg.elements)) {
            //apply 后主线程推回的最新位置/类型/matched/matchedLen
            elements.value = JSON.parse(JSON.stringify(msg.elements))
            //对所有非聚焦元素手动重设 innerHTML 显示双色；聚焦元素不动（避免打断编辑）
            nextTickAllInnerHTML()
          }
        } catch (e) { }
      }
    }

    onMounted(() => {
      //挂载后主动发 hello，主线程收到即推送初始数据（不再用 PluginStorage）
      try {
        if (bc) {
          bc.postMessage({ type: 'hello' })
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
      //失焦/回车已即时提交，这里仅保留兜底：若有未提交的 pendingText，写回并 apply
      let hasPending = false
      for (const k in pendingText) {
        const idx = elements.value.findIndex(e => e.start === Number(k))
        if (idx >= 0) {
          elements.value[idx].text = pendingText[k]
          delete pendingText[k]
          hasPending = true
        }
      }
      if (hasPending) applyNow()
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

    //收集 contenteditable DOM 引用，首次挂载时设初始 innerHTML（renderText 拆黑/灰双色）
    //Vue 3 函数式 ref：挂载时传 DOM，卸载时传 null（必须处理 null 否则 textRefs 存旧 DOM）
    function setTextRef(start, el) {
      if (el) {
        textRefs[start] = el
        //首次挂载：设初始 innerHTML
        const item = elements.value.find(e => e.start === start)
        if (item) el.innerHTML = renderText(item)
      } else {
        //卸载：清引用，避免 nextTickAllInnerHTML 拿到已脱离文档的旧 DOM
        delete textRefs[start]
      }
    }

    //渲染元素文字：matched=false 时按 matchedLen 拆成两段，
    //匹配部分黑色，超出部分灰色（提示用户超出原文长度部分未生效）
    //转义 HTML 特殊字符，避免 XSS / contenteditable 解析异常
    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
    }
    function renderText(item) {
      const text = item.text || ''
      if (item.matched === false && typeof item.matchedLen === 'number' && item.matchedLen < text.length) {
        const matchedPart = text.slice(0, item.matchedLen)
        const extraPart = text.slice(item.matchedLen)
        return escapeHtml(matchedPart) + '<span class="text-muted">' + escapeHtml(extraPart) + '</span>'
      }
      return escapeHtml(text)
    }

    //对所有非聚焦元素 DOM 重设 innerHTML 显示双色；聚焦元素不动（避免打断编辑）
    //用 Vue nextTick 等 v-for DOM 更新完成；textRefs 可能存旧 DOM，用 data-idx 反查兜底
    function nextTickAllInnerHTML() {
      nextTick(() => {
        for (const item of elements.value) {
          if (item.start === editingStart) continue  //正在编辑的元素不动
          //优先用 textRefs，失效时用 data-idx 属性反查最新 DOM
          let el = textRefs[item.start]
          if (!el || !el.isConnected) {
            el = document.querySelector('.element-text[data-idx="' + item.start + '"]')
            if (el) textRefs[item.start] = el
          }
          if (el) el.innerHTML = renderText(item)
        }
      })
    }

    //编辑中：只存到非响应式 pendingText，不写 item.text，不触发 Vue 重渲染，光标稳定
    function onTextChanged(event, item) {
      const el = event.target
      pendingText[item.start] = el.innerText || el.textContent || ''
      editingStart = item.start
      dirty = true
    }

    //回车仅触发提交（不换行，prevent 已在模板处理）
    function onEnterSubmit(event) {
      event.target.blur()  //走 onBlur 提交逻辑
    }

    //失焦提交：把 pendingText 写回 item.text，发主线程格式刷
    function onBlur(item) {
      if (pendingText[item.start] != null) {
        item.text = pendingText[item.start]
        delete pendingText[item.start]
        dirty = true
      }
      if (dirty) applyNow()
      editingStart = null
      //失焦后立即重设当前 DOM innerHTML 显示双色（apply 回推也会设，但失焦当下先设避免闪灰）
      const el = textRefs[item.start]
      if (el) el.innerHTML = renderText(item)
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
      //放弃当前未提交编辑
      for (const k in pendingText) delete pendingText[k]
      dirty = false
      try {
        if (bc) {
          bc.postMessage({ type: 'cancel' })
        }
      } catch (e) { }
    }

    //永久关闭落款缺失提示：通知主线程写入 settings.disableFooterWarning，并即时隐藏
    function dismissFooterWarn() {
      footerWarnDismissed.value = true
      try {
        if (bc) {
          bc.postMessage({ type: 'disableFooterWarning' })
        }
      } catch (e) { }
    }

    //永久关闭字体缺失提示：通知主线程写入 settings.disableFontWarning，并即时隐藏
    function disableFontWarning() {
      fontWarnDismissed.value = true
      try {
        if (bc) {
          bc.postMessage({ type: 'disableFontWarning' })
        }
      } catch (e) { }
    }

    return {
      elements,
      footerMissing,
      footerWarnDismissed,
      missingFonts,
      fontWarnDismissed,
      sortedElements,
      groupedElements,
      collapsedGroups,
      contextMenu,
      typeLabel,
      toggleGroup,
      setTextRef,
      onTextChanged,
      onEnterSubmit,
      onBlur,
      onBadgeClick,
      onPanelClick,
      changeType,
      navigateToItem,
      closePanel,
      cancel,
      dismissFooterWarn,
      disableFontWarning
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
/* 整段不匹配（matchedLen=0）时整行变灰 */
.text-muted-all {
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
.footer-warn .warn-text {
  flex: 1;
}

/* === 字体缺失提示条 === */
.font-warn {
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
.font-warn svg {
  flex-shrink: 0;
}
.font-warn .warn-text {
  flex: 1;
}

/* 提示条按钮：不再提示 / ✕ 关闭 */
.warn-btn {
  flex-shrink: 0;
  border: 1px solid #ffd591;
  background: transparent;
  color: #ad6800;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 3px;
  cursor: pointer;
  font-family: inherit;
  line-height: 1.4;
}
.warn-btn:hover {
  background: #ffe7ba;
  border-color: #ffc53d;
}
.warn-close {
  flex-shrink: 0;
  border: none;
  background: transparent;
  color: #ad6800;
  cursor: pointer;
  font-size: 12px;
  padding: 0 2px;
  line-height: 1;
}
.warn-close:hover {
  color: #d4380d;
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
