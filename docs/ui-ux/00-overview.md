# UI/UX Agent 生成规范总览

这套文档用于指导 Claude Code 从零设计和生成高质量 UI/UX。目标不是设计业务架构，而是让 Agent 在生成前台和后台页面时，有稳定的设计标准、结构化表达、组件映射和审查流程。

## 核心目标

- 让 Claude Code 不再每次自由发挥界面
- 先生成 UI DSL，再生成页面代码
- 所有页面遵循统一设计系统
- 所有组件优先来自组件映射表
- 所有页面必须覆盖关键交互状态
- 所有页面必须经过桌面端和移动端检查

## 推荐流程

```text
UI/UX 目标定义
→ 设计系统标准
→ 技术选型
→ 组件体系设计
→ UI DSL 设计
→ 组件映射表
→ Agent 生成规则
→ 页面生成流程
→ UI/UX 审查与截图检查
```

## 文档结构

- `01-ui-ux-goals.md`：定义前台和后台的体验目标
- `02-design-system.md`：定义颜色、字体、间距、表单、表格、状态等标准
- `03-tech-stack.md`：定义适合 Agent 生成 UI 的技术选型
- `04-component-system.md`：定义基础组件、复合组件、前台组件、后台组件
- `05-ui-dsl.md`：定义结构化 UI 描述格式
- `06-component-mapping.md`：定义 UI DSL 到真实组件的映射关系
- `07-agent-generation-rules.md`：定义 Claude Code 生成页面时必须遵守的规则
- `08-page-generation-workflow.md`：定义从需求到页面实现的完整流程
- `09-ui-review-checklist.md`：定义页面交付前的 UI/UX 检查项

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

