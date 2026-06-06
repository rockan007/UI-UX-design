# UI/UX Agent 生成规范总览

这套文档用于指导 Claude Code 从零设计和生成高质量 UI/UX。目标不是设计业务架构，而是让 Agent 在生成前台和后台页面时，有稳定的设计标准、结构化表达、组件映射和审查流程。

## 核心目标

- 让 Claude Code 不再每次自由发挥界面
- 先生成 UI DSL，再生成页面代码
- 所有页面遵循统一设计系统
- 所有组件优先来自组件映射表
- 所有页面必须覆盖关键交互状态
- 所有页面必须经过桌面端和移动端检查

## 文档结构

| 文件 | 内容 |
| --- | --- |
| `01-design-principles.md` | 设计原则：总原则、前台/后台目标、内容准则、质量标准 |
| `02-design-tokens.md` | 设计令牌：颜色、暗色模式、间距、字体、圆角、阴影、动效 |
| `03-component-system.md` | 组件体系：组件层级、映射表、数据可视化、图标规则 |
| `04-ui-dsl.md` | UI DSL：结构化描述格式、6 种页面类型模板 |
| `05-generation-rules.md` | 生成规则：Agent 规则、9 步工作流、Prompt 模板 |
| `06-review-checklist.md` | 审查清单：8 个维度逐项检查、状态补全 Prompt |

## 推荐流程

```text
阅读设计原则 (01)
→ 引用设计令牌 (02)
→ 生成 UI DSL (04)
→ 根据组件体系映射 (03)
→ 按生成规则写代码 (05)
→ 按审查清单检查 (06)
```

## 技术选型

首选技术栈：

```text
Vue 3 + TypeScript + Element Plus + Tailwind CSS + @element-plus/icons-vue + Vite
```

### 推荐原因

- **Vue 3**：Composition API 逻辑复用清晰，适合中大型前后台系统
- **TypeScript**：结合 `defineProps<T>()` 强类型约束组件接口
- **Element Plus**：组件体系完整，内置 Table、Form、Dialog 等后台高频组件，减少自定义
- **Tailwind CSS**：用于布局、间距、颜色微调等原子化样式，与 Element Plus CSS 变量互补
- **@element-plus/icons-vue**：与 Element Plus 原生配套，风格统一
- **Vite**：开发体验快，Vue 生态默认构建工具

### 如果项目已有技术栈

Claude Code 应先识别当前项目技术栈、组件库、样式系统和路由方式。如果已有成熟技术栈，优先沿用。不要为了使用推荐栈而重写项目。

### 不建议的做法

- 为了单个页面引入大型 UI 框架
- 每个页面写独立 CSS 风格
- 同时混用多个组件库
- 随机新增图标库
- 用内联样式替代设计系统
- 不要混用 Element Plus 和其他 UI 框架（如 Ant Design Vue、Naive UI）
- 不要用 Tailwind 重写 Element Plus 组件内部样式，优先使用 Element Plus CSS 变量覆盖

## Claude Code UI/UX 优化工作流

这套流程用于让 Claude Code 专注改进前台和后台系统的 UI/UX：

1. 读取项目结构
2. 总结现有 UI 风格和组件体系
3. 建立 UI/UX 设计标准
4. 统一基础组件和全局样式
5. 按页面逐个优化
6. 补齐交互状态
7. 做桌面端和移动端截图检查
8. 根据检查结果修复细节

### 限定工作边界

```text
接下来你只关注 UI/UX 改进，不要改业务逻辑、接口协议、数据库结构和权限规则。

设计目标：
- 简洁、现代、专业
- 信息层级清晰
- 页面留白合理
- 表单易填写
- 按钮主次明确
- 表格适合高频使用
- 移动端不能拥挤
- 加载、空状态、错误状态要完整
- 不要做营销感首页
- 不要使用过度渐变、大圆角、装饰性卡片

请先提出 UI/UX 改进计划，不要立刻写代码。
```

### 每次任务附加约束

```text
不要改业务逻辑。
不要重构系统架构。
只优化 UI/UX。
优先使用现有组件和样式系统。
保持页面专业、克制、清晰。
不要添加无意义装饰。
确保桌面端和移动端都可用。
完成后请实际运行并检查页面。
```

## 给 Claude Code 的默认要求

```text
请先阅读 docs/ui-ux 下的规范。
生成页面前必须先输出 UI DSL。
确认 UI DSL 后，再根据组件映射表生成代码。
不要改业务逻辑。
不要随意新增组件。
不要写一次性样式。
优先复用设计系统和现有组件。
完成后检查 loading、empty、error、disabled、hover、focus、mobile 状态。
```
