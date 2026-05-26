<template>
  <div class="taskpane-panel">
    <h3 class="panel-title">公文排版助手</h3>
    <div class="info-section">
      <p>点击Ribbon栏中的<b>"一键排版"</b>按钮，即可将当前文档自动调整为规范的公文格式。</p>
    </div>
    <div class="info-section">
      <h4>排版规范说明</h4>
      <ul>
        <li>纸张：A4纸，上37mm/下35mm/左28mm/右26mm</li>
        <li>公文标题：二号方正小标宋简体，居中</li>
        <li>正文：三号仿宋_GB2312，行距固定值28.9磅</li>
        <li>一级标题：三号黑体（如"一、"）</li>
        <li>二级标题：三号楷体_GB2312（如"（一）"）</li>
        <li>三级标题：三号仿宋_GB2312（如"1."）</li>
        <li>四级标题：三号仿宋_GB2312（如"（1）"）</li>
        <li>数字统一使用Times New Roman字体</li>
        <li>"一是""二是""三是"等自动加粗</li>
      </ul>
    </div>
    <div class="info-section">
      <p>点击<b>"调整固定格式"</b>按钮可自定义各级标题的字体、字号、行距等参数，设置将保存在本地。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskPane'
}
</script>

<style scoped>
.taskpane-panel {
  padding: 16px;
  font-size: 13px;
  color: #333;
  background: #fff;
  min-height: 100%;
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

.info-section {
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #fafafa;
}

.info-section h4 {
  font-size: 13px;
  font-weight: bold;
  color: #c00;
  margin-bottom: 8px;
}

.info-section p {
  line-height: 1.6;
  margin: 0;
}

.info-section ul {
  margin: 0;
  padding-left: 18px;
  line-height: 1.8;
}
</style>
