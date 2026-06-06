# 技术选型建议

本文件定义适合 Claude Code 生成 UI 的推荐技术栈。技术选型服务于 UI/UX 稳定生成，而不是业务架构设计。

## 首选技术栈

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
lucide-react
```

## 推荐原因

### Next.js

- 目录结构清晰
- 适合前台和后台页面共存
- Agent 熟悉度高
- 本地预览和部署流程成熟

### TypeScript

- 组件 props 更容易约束
- 页面数据结构更清楚
- 减少 Agent 生成错误代码的概率

### Tailwind CSS

- 样式表达直接
- 容易通过 token 和 class 约束视觉系统
- 避免散落的 CSS 文件
- Agent 生成和修改效率高

### shadcn/ui

- 组件可复制、可改造
- 适合后台系统
- 和 Tailwind、TypeScript 配合好
- 组件结构清楚，便于建立映射表

### lucide-react

- 图标风格统一
- 适合按钮、导航、状态提示
- 避免手写 SVG 图标

## 如果项目已有技术栈

Claude Code 应先识别当前项目：

```text
请先检查项目技术栈、组件库、样式系统和路由方式。
如果已有成熟技术栈，请优先沿用。
不要为了使用推荐栈而重写项目。
```

## 不建议的做法

- 为了单个页面引入大型 UI 框架
- 每个页面写独立 CSS 风格
- 同时混用多个组件库
- 随机新增图标库
- 用内联样式替代设计系统

