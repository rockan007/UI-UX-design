# Agent 生成规则

本文件定义 Claude Code 生成 UI 页面时必须遵守的规则。目标是保证输出稳定、统一、可审查。

## 必须遵守

1. 生成页面前先阅读 `docs/ui-ux` 规范
2. 生成代码前先输出 UI DSL
3. UI DSL 确认后，再根据组件映射表写代码
4. 优先使用现有组件和设计系统
5. 不随意新增组件
6. 不随意写一次性样式
7. 不改变业务逻辑、接口协议、数据库结构
8. 不引入新的 UI 库，除非用户明确要求
9. 页面必须覆盖关键状态
10. 完成后必须做 UI/UX 审查

## 代码生成约束

```text
不要改业务逻辑。
不要重构系统架构。
不要修改接口协议。
不要修改数据库结构。
不要为单个页面创建无复用价值的组件。
不要写随机颜色、随机圆角、随机阴影。
不要让移动端只是桌面端压缩版。
```

## UI 状态要求

每个页面必须考虑：

- loading
- empty
- error
- success feedback
- disabled
- hover
- focus
- validation error
- permission denied
- mobile layout

## 生成页面前的固定 Prompt

```text
请先阅读 docs/ui-ux 下的规范。
然后为当前页面先生成 UI DSL，不要写代码。

UI DSL 必须包含：
- page
- type
- route
- goal
- layout
- header
- sections 或 form/table
- actions
- states
- responsive

生成后请说明为什么这样设计。
```

## 生成代码前的固定 Prompt

```text
请根据已确认的 UI DSL 和 docs/ui-ux/06-component-mapping.md 生成页面代码。

要求：
- 优先复用现有组件
- 不改业务逻辑
- 不改接口
- 不新增不必要依赖
- 补齐 loading、empty、error、disabled、hover、focus、mobile 状态
- 完成后运行项目检查
```

## 审查前的固定 Prompt

```text
请以资深 UI/UX 设计师角度审查当前页面。
重点检查：
1. 任务完成路径
2. 信息层级
3. 视觉一致性
4. 表单或表格体验
5. 响应式
6. 状态反馈
7. 可访问性

发现问题后直接修复。
```

