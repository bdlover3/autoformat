<template>
  <div class="root-page">
    <h3 class="page-title">公文排版助手</h3>
    <p class="page-desc">请使用Ribbon栏中的按钮进行操作：</p>
    <div class="feature-list">
      <div class="feature-item">
        <span class="feature-name">一键排版</span>
        <span class="feature-desc">将当前文档自动调整为规范的公文格式</span>
      </div>
      <div class="feature-item">
        <span class="feature-name">调整固定格式</span>
        <span class="feature-desc">自定义各级标题字体、字号等参数</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWps'
}
</script>

<style scoped>
.root-page {
  padding: 20px;
  text-align: center;
  color: #333;
}

.page-title {
  font-size: 20px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 12px;
  border-bottom: 2px solid #c00;
  padding-bottom: 10px;
}

.page-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.feature-list {
  max-width: 400px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #fafafa;
  text-align: left;
}

.feature-name {
  font-weight: bold;
  color: #c00;
  margin-right: 12px;
  white-space: nowrap;
}

.feature-desc {
  font-size: 13px;
  color: #555;
}
</style>
