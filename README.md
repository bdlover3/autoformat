# WPS公文自动格式化插件

一键格式化公文，符合标准公文格式要求。

## 功能特性

- 一键自动格式化公文
- 页面设置（A4纸，37/35/28/26mm边距）
- 字体设置（标题2号方正小标宋，正文3号仿宋GB2312）
- 段落设置（固定行距28.9磅）
- 标题识别和格式化（一、二、三级标题）
- 页码设置（带横线，4号宋体）
- 保存和恢复自定义设置
- 本地持久化存储设置

## 开源地址

<https://gitee.com/rainsoft0456/wpsautoformat>
<https://github.com/bdlover3/autoformat>
## 直接使用?
### 1.打开 https://wpsautoformat.netlify.app/ 安装插件即可
  备用地址:https://bdlover3.github.io/autoformat
### 2.下载右侧release版本 双击安装即可使用

## 项目初始化
### 安装依赖

```sh
//安装wps的js加载项开发工具
npm install -g wpsjs
```

### 开发调试

```sh
wpsjs debug
```

### 构建生产版本

```sh
//生成资源
wpsjs build
//打包为exe文件
wpsjs build -exe
//发布
wpsjs publish

//详情请见wpsjs文档 加载项相关章节
//https://qn.cache.wpscdn.cn/encs/doc/office_v19/index.htm
```


## 版本历史

### 1.0.0 (2026-05-27)

- 正式发布 1.0.0 版本

## 使用说明

1. 在 WPS 文字中打开需要格式化的文档
2. 点击功能区的"一键排版"按钮
3. 如需调整格式，点击"格式设置"进行配置
4. 点击"一键恢复"可撤销排版操作

## 公文格式规范

- 纸张：A4（210mm×297mm）
- 页边距：上37mm、下35mm、左28mm、右26mm
- 标题：2号方正小标宋简体
- 正文：3号仿宋GB2312
- 一级标题：黑体三号（一、）
- 二级标题：楷体GB2312三号（（二））
- 三级标题：仿宋GB2312三号（3.）
- 四级标题：仿宋GB2312三号（（4））
- 行距：固定值28.9磅
- 页码：4号半角宋体阿拉伯数字，带横线（- 1 -）

## 技术栈

- Vue 3
- Vite
- WPS JSAPI

