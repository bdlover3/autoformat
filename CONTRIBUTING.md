# 贡献指南

感谢你考虑为 WPS 公文自动格式化做出贡献！

## 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feat/my-feature`)
3. 提交更改 (`git commit -m 'feat: add some feature'`)
4. 推送到分支 (`git push origin feat/my-feature`)
5. 创建 Pull Request

## 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat:      新增功能
fix:       修复 bug
refactor:  重构（不新增功能也不修 bug）
docs:      文档更新
style:     代码格式（空格、格式化等）
chore:     构建/依赖/工具变更
perf:      性能优化
test:      测试相关
```

## 开发指南

### 环境搭建

```bash
npm install -g wpsjs
npm install
wpsjs debug
```

### 代码规范

- 2 空格缩进，单引号，无分号
- 运行 `npm run lint` 检查代码风格
- 运行 `npm run format` 自动格式化

### 架构须知

在修改代码前，请仔细阅读 `AGENTS.md` 了解核心架构：

- **BaseTxt 抽象**：全文纯文本字符串与 `doc.Range` 一一对应，检测在此字符串上运行正则，不触碰 WPS 文档对象
- **指针集合**：检测产物是 `{ start, length, type }` 指针集合，格式化按指针精准操作，不扩回整段
- **先刷后盖**：先全文刷正文，再用指针集合覆盖特殊元素格式
- **只调格式不改内容**：除删除空行按钮和回车拆分段落外，不得修改用户文字
- **空 catch 是防御代码**：WPS COM API 频繁抛异常，`catch (e) { }` 是故意的

### 功能区按钮

添加/删除功能区按钮需要同步修改：

1. `public/ribbon.xml` — 按钮定义和布局
2. `src/components/ribbon.js` — `OnAction`、`GetImage` 等回调

### 测试

在 `test/` 目录下提供了测试文档。在 WPS 中打开测试文档，运行一键排版验证效果。

## Issue 报告

- 使用 Issue 模板提交 bug 报告或功能请求
- 清晰描述问题/需求
- 附上截图或错误日志有助于快速定位问题

## Pull Request

- 确保 lint 通过 (`npm run lint`)
- 更新相关文档
- PR 标题遵循 Conventional Commits 规范
- 描述清楚改动内容和原因
