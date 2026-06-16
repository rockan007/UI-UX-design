---
name: vue3-element-ui-ux-cn
description: 在 Vue 3 + Element Plus + Tailwind CSS 项目中生成、审查或改进页面时使用，通过设计令牌、组件映射表和状态覆盖规则确保一致的管理后台/前端界面。
---

# Vue 3 Element Plus UI/UX 设计约束

使用此 skill 让 Claude Code 产出符合项目设计系统的界面，而非自由发挥的代码。

## 核心工作流

```text
页面类型识别
→ 用户任务流
→ 交互模型
→ 设计令牌
→ UI DSL
→ 组件映射
→ 代码生成（含交互规则）
→ 审查清单
```

在定义用户任务流并输出 UI DSL 之前，不要开始编写页面代码。

## 第一步

当被要求创建或改进页面时：

0. 检查 `package.json` 中是否有 `"vue3ElementUiUx": { "i18n": true }`。如果启用，在继续之前加载 `references/i18n-rules.md`。
1. 使用 `references/design-principles.md` 识别页面类型（前端 vs 管理后台）。
2. 定义用户任务流：入口上下文 → 第一个操作 → 任务完成 → 下一步操作。
3. 定义交互模型：每个关键操作的触发、反馈、成功、失败和恢复。
4. 从 `references/design-tokens.md` 加载设计令牌。
5. 按照 `references/ui-dsl.md` 生成 UI DSL。
6. 使用 `references/component-system.md` 将 DSL 映射到 Element Plus 组件。
7. 按照 `references/generation-rules.md` 实现代码。
8. 应用 `references/interaction-rules.md` 中的交互行为。
9. 使用 `references/review-checklist.md` 进行审查。

## 不可协商的规则

- 不要修改业务逻辑、API 契约、数据库结构或权限。
- 使用 Element Plus 组件 + Tailwind CSS 进行布局/间距。
- 绝不引入其他 UI 框架。
- 使用 `@element-plus/icons-vue` 作为图标。
- 不要编写随意的颜色、圆角、阴影或一次性样式。
- 每个页面必须覆盖：`loading`、`empty`、`error`、`disabled`、`hover`、`focus`、验证、权限和移动端状态。
- 管理后台页面：优化可扫描性、密度、表格、筛选器、表单、重复使用。
- 前端页面：优化清晰度、任务完成、可读层次、移动端可用性。
- 仅通过 CSS 自定义属性覆盖 Element Plus 主题，不使用 Tailwind。
- 在 `main.ts` 中配置 Element Plus 语言区域：
  - 如果项目未启用 i18n：`import zhCn from 'element-plus/dist/locale/zh-cn.mjs'` 和 `app.use(ElementPlus, { locale: zhCn })`。
  - 如果已启用 i18n（`package.json` 中有 `"vue3ElementUiUx": { "i18n": true }`）：语言区域通过 `elLocaleMap` + `el-config-provider` 处理，如 `references/i18n-rules.md` 所定义。不要单独硬编码 `zhCn`。
  - 绝不要保留默认的英文语言区域——内置组件文本必须与项目语言匹配。
- 包含 2+ 按钮的操作列：仅图标 + `el-tooltip`，列宽 = `(28 + 8) × maxButtons + 16`。
- 连接线（时间线、步骤）：连接线一侧不能有圆角——使用定向圆角（`rounded-r-*`）。
- 柱状图：间距 = 柱宽的 50%–100%，柱顶平直（不使用 `rounded-t-*`）。桌面端：固定 `w-10` + `gap-5`。移动端：`flex-1 w-full` 自适应（无滚动条）。在列上使用 `flex-1 md:flex-initial`，在柱上使用 `w-full md:w-10`。
- 管理后台页面使用容器层次：强调卡片（统计/指标，左侧 3px 色条）、浮起面板（图表，`shadow-sm` + 无边框）、标准块（表格/表单/列表，有边框）。分区包装器使用响应式 `p-4 md:p-5 mb-4 md:mb-6`。统计卡片独立放置（无分区包装器）。
- 侧边栏折叠：`overflow-x: hidden` 防止水平滚动条。

## 输出模式

对于新页面，按以下顺序输出：
1. 页面类型和 UX 目标
2. UI DSL
2a.（如果启用了 i18n）所有用户界面文本使用的语言键
3. 组件映射摘要
4. 代码实现
5. 已覆盖的交互状态
6. 自查审查

## 参考资料加载指南

- 阅读 `references/design-principles.md` 了解前端 vs 管理后台的目标和内容指南。
- 阅读 `references/design-tokens.md` 了解精确的颜色、间距、排版、阴影、圆角和动画值。
- 阅读 `references/component-system.md` 了解组件层次和 Element Plus 映射表。
- 阅读 `references/ui-dsl.md` 了解 DSL 模式和页面模板。
- 阅读 `references/generation-rules.md` 了解智能体规则、工作流步骤和提示词模板。
- 阅读 `references/interaction-rules.md` 了解每种组件类型的悬停、聚焦、禁用、加载行为。
- 阅读 `references/i18n-rules.md`（当项目启用 i18n 时）了解 vue-i18n 设置、语言文件约定、格式化规则（`$t`、`$n`、`$d`）、`LocaleSwitcher` 组件和 RTL 方向支持。
- 阅读 `references/review-checklist.md` 了解实现后的质量检查。
