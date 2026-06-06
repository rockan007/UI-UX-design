# Generation Workflow

## Contents

- Request to implementation flow
- Page type selection
- Generation prompts
- Interaction design step
- UI review checklist
- Interaction review checklist
- Responsive checklist
- Final response expectations

## Request to Implementation Flow

```text
User request
→ inspect project
→ identify page type
→ define user task flow
→ define interaction model
→ generate UI DSL
→ review DSL
→ map components
→ implement code
→ run project/checks
→ inspect responsive states
→ fix UI defects
→ summarize changes
```

## Page Type Selection

Classify the page before designing:

- Frontend list
- Frontend detail
- Admin list
- Admin form
- Admin detail
- Dashboard
- Settings
- Mixed workflow

Use admin layouts for repeated operational tasks. Use frontend layouts for discovery, reading, conversion, or user-facing workflows.

## Generation Prompt

Use this pattern when starting a page:

```text
请先阅读 UI/UX skill 规范。
为当前页面先生成 UI DSL，不要写代码。

UI DSL 必须包含：
- page
- type
- route
- goal
- layout
- header
- userFlow
- sections 或 form/table
- actions
- interactions
- feedback
- validation
- edgeCases
- states
- responsive

生成后说明为什么这样设计。
```

Use this pattern after DSL is accepted:

```text
请根据已确认的 UI DSL 和组件映射规则生成页面代码。

要求：
- 优先复用现有组件
- 不改业务逻辑
- 不改接口
- 不新增不必要依赖
- 补齐 loading、empty、error、disabled、hover、focus、mobile 状态
- 完成后运行项目检查
```

## Interaction Design Step

Before generating code, define:

- Entry context: where the user arrives from.
- First useful action: what the user should do first.
- Primary task path: how the user completes the task.
- Feedback model: what happens after click, submit, save, delete, search, or filter.
- Failure model: what happens when the action fails.
- Recovery path: how the user retries, edits, cancels, or navigates away.
- Next action: what the user likely does after completion.

For admin pages, also define:

- Row action behavior.
- Batch action behavior.
- Destructive confirmation behavior.
- Filter persistence.
- Table update behavior after mutations.

For frontend pages, also define:

- Search or discovery behavior.
- Primary conversion action.
- Return/back behavior.
- Mobile-first task completion.

## UI Review Checklist

Review and fix:

- User can identify page purpose.
- Primary action is obvious.
- Secondary actions do not compete.
- Destructive actions are confirmed.
- Key information appears before secondary detail.
- Buttons, inputs, tables, badges, and spacing are consistent.
- Forms have labels, validation, submit feedback, and disabled state.
- Tables support scanning, filtering, empty data, and mobile behavior.
- Keyboard focus is visible.
- Text contrast is sufficient.

## Interaction Review Checklist

Review and fix:

- User can identify the first useful action within a few seconds.
- Every primary action has immediate feedback.
- Submit, save, and destructive actions prevent accidental repeat actions.
- Failure preserves user input when possible.
- Errors explain what happened and how to recover.
- Destructive actions show affected item or count.
- Search and filters show applied state and recovery path.
- Empty state gives a useful next step.
- Permission state gives safe navigation.
- Mobile users can complete the full task.
- Keyboard users can reach and complete the full task.

## Responsive Checklist

Inspect or reason through:

- `1440px`: horizontal layout feels intentional.
- `1024px`: content is not crowded.
- `768px`: complex columns collapse.
- `390px`: no text overflow, overlap, or hidden primary action.

For tables, choose card-list or horizontal scroll on mobile based on data complexity.

## Final Response Expectations

Summarize:

- Files changed.
- UX problems addressed.
- Checks run.
- Remaining limitations if any.

Keep the final answer concise and concrete.
