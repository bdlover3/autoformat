<p align="center">
  <img src="src/assets/logo.svg" width="120" alt="WPS 公文自动格式化" />
</p>

<h1 align="center">WPS 公文自动格式化</h1>

<p align="center">
  <strong>WPS Office JS 加载项 — 一键格式化 Chinese 公文，符合 GB/T 9704 标准</strong>
</p>

<p align="center">
  <a href="https://wpsautoformat.netlify.app/">
    <img src="https://img.shields.io/badge/install-%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6-blue?style=flat-square" alt="Install" />
  </a>
  <img src="https://img.shields.io/badge/version-2.0.0-green?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/WPS-JSAPI-orange?style=flat-square" alt="WPS JSAPI" />
</p>

---

## 功能特性

- **一键排版** — 自动识别公文结构（标题、文号、附件、抬头、正文标题、落款、日期），一键套用标准格式
- **精准检测** — 基于 BaseTxt 字符串 + 正则全文扫描，不依赖段落位置，跨段落标题、续行处理准确
- **微调面板** — 排版后侧边面板可查看/修改元素类型和文字，逐字比对 + 灰色超出警告
- **落款排版** — 支持"公文落款"（右空固定）和"美观落款"（最长行居中）两种模式
- **类型记忆** — 用户手动调整过的格式自动记忆，下次排版自动应用
- **固定格式设置** — 可自定义字体、字号、行距、页边距等
- **落款库** — 常用落款保存/插入，自动记忆排版落款
- **撤销排版** — 一键恢复排版前状态
- **多级标题** — 正文标题（一、二、三级）、红头大标题、副标题
- **页面设置** — A4 纸、标准页边距、页码横线

## 截图

| 功能区 | 微调面板 |
|:-----:|:--------:|
| ![功能区](screenshots/autoformat-ribbon.png) | ![面板](screenshots/autoformat-panel.png) |

## 快速开始

### 安装

**方式一：在线安装（推荐）**

打开 [https://wpsautoformat.netlify.app/](https://wpsautoformat.netlify.app/)，点击安装按钮即可。

备用地址：[https://bdlover3.github.io/autoformat](https://bdlover3.github.io/autoformat)

**方式二：下载 Release**

从 [Releases](https://github.com/bdlover3/autoformat/releases) 下载最新版本，双击安装。

### 使用

1. 在 WPS 文字中打开需要格式化的公文文档
2. 点击功能区 **"一键排版"** 按钮
3. 如需调整格式，点击 **"格式设置"** 进行配置
4. 点击 **"一键恢复"** 可撤销排版操作
5. 排版后自动打开 **微调面板**，可逐项调整元素类型和文字

## 开发

### 环境要求

- Node.js >= 18
- WPS Office (Windows)
- wpsjs CLI

### 安装依赖

```bash
npm install -g wpsjs
npm install
```

### 开发调试

```bash
wpsjs debug
```

启动 Vite 开发服务器（端口 3889），并自动打开 WPS 加载项。

### 构建

```bash
# 构建前端资源
npm run build

# 打包为 WPS 加载项（输出到 wps-addon-build/）
wpsjs build

# 打包为 exe 安装包
wpsjs build -exe
```

### 发布到文档站点

```bash
npm run pubtodoc
```

构建后将安装包复制到 `docs/` 目录，用于 GitHub Pages / Netlify 在线安装。

### 代码规范

```bash
npm run lint    # ESLint 检查
npm run format  # Prettier 格式化
```

## 目录结构

```
autoformat/
├── src/                    # 源代码
│   ├── components/
│   │   ├── js/             # 核心排版逻辑（12 个模块）
│   │   │   ├── detect.js   # 元素检测
│   │   │   ├── format.js   # 格式化
│   │   │   ├── rules.js    # 声明式规则表
│   │   │   ├── patterns.js # 正则模式
│   │   │   ├── docops.js   # 文档操作
│   │   │   ├── page.js     # 页面设置
│   │   │   ├── typememory.js # 类型记忆
│   │   │   ├── signature.js  # 落款库
│   │   │   ├── util.js     # 工具函数
│   │   │   ├── dialog.js   # 设置对话框
│   │   │   ├── version.js  # 版本号
│   │   │   └── systemdemo.js # WPS SDK 模板
│   │   ├── ribbon.js       # 功能区按钮调度
│   │   ├── FormatPanel.vue # 微调面板
│   │   ├── Dialog.vue      # 设置对话框
│   │   ├── MemoryPanel.vue # 记忆管理
│   │   ├── InsertSignature.vue # 落款库
│   │   ├── MarkElement.vue # 标记元素
│   │   ├── FontWarning.vue # 字体缺失警告
│   │   ├── Root.vue        # 根组件
│   │   └── TaskPane.vue    # 任务面板
│   ├── router/index.js     # Vue Router（hash 模式）
│   ├── main.js             # 入口
│   ├── App.vue
│   └── assets/             # 样式、logo
├── public/
│   ├── images/             # 功能区按钮 SVG 图标
│   └── ribbon.xml          # 功能区定义
├── docs/                   # GitHub Pages 部署
├── test/                   # 测试文档
├── screenshots/            # 截图
└── API Documents/          # WPS API 参考
```

## 公文格式标准 (GB/T 9704)

| 元素 | 字体 | 字号 | 行距 | 对齐 |
|------|------|------|------|------|
| 红头标题 | 方正小标宋简体 | 22pt (二号) | 固定 28.9pt | 居中 |
| 一级标题 | 黑体 | 16pt (三号) | 固定 28.9pt | 左对齐 |
| 二级标题 | 楷体 GB2312 | 16pt (三号) | 固定 28.9pt | 左对齐 |
| 三级标题 | 仿宋 GB2312 | 16pt (三号) | 固定 28.9pt | 首行缩进 2 字符 |
| 正文 | 仿宋 GB2312 | 16pt (三号) | 固定 28.9pt | 首行缩进 2 字符 |
| 页面 | A4 (210×297mm) | 上 37mm 下 35mm 左 28mm 右 26mm |

## 技术栈

- **Vue 3** — 前端框架
- **Vite** — 构建工具
- **WPS JSAPI** — 通过 `window.Application` 操作 WPS 文档对象
- **COM 自动化** — 核心排版逻辑运行在 WPS 宿主环境，非浏览器 DOM

## 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 新增功能
fix: 修复 bug
refactor: 重构
docs: 文档更新
style: 代码格式
chore: 构建/工具
```

## 开源许可证

[MIT](LICENSE)

## 链接

- [在线安装](https://wpsautoformat.netlify.app/)
- [Gitee 镜像](https://gitee.com/rainsoft0456/wpsautoformat)
- [WPS 加载项开发文档](https://qn.cache.wpscdn.cn/encs/doc/office_v19/index.htm)
