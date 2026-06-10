# Action Column Button Layout — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a universal rule for admin table action columns: icon-only buttons with tooltips when 2+ actions, left/right aligned per text direction. Apply the rule to OrderManageView.vue.

**Architecture:** Update 3 reference files in the vue3-element-ui-ux skill to codify the rule (generation-rules, interaction-rules, review-checklist), then fix the existing OrderManageView.vue to demonstrate the rule in practice.

**Tech Stack:** Vue 3, Element Plus, Tailwind CSS (gap-2)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `.claude/skills/vue3-element-ui-ux/references/generation-rules.md` | Modify | Codify the action column rule for page generation |
| `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md` | Modify | Define icon button + tooltip interaction behavior |
| `.claude/skills/vue3-element-ui-ux/references/review-checklist.md` | Modify | Add review checklist item for action columns |
| `login-homepage-preview/src/views/OrderManageView.vue` | Modify | Apply rule: icon-only + tooltip, left-align, correct width |

---

### Task 1: Add Action Column Rule to generation-rules.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md:158`

- [ ] **Step 1: Insert the Action Column Rule section**

After line 158 (`Extra focus: compact filter area, scannable table, clear batch actions, not too many action columns, empty state with next step, mobile usability.`), add:

```markdown

### Action Column Rule

When a table's operation column contains 2+ actions:

- **Icon-only:** Use `el-button` with `:icon` only, no text content. Text labels move to tooltip.
- **Tooltip:** Wrap each button with `el-tooltip`, `content` = action name, `placement="top"`, `:show-after="300"`, `:hide-after="0"`.
- **Column width:** `(28 + 8) × maxPossibleActions + 16`, round up to nearest 10px. `maxPossibleActions` is the total number of buttons defined in the template (including `v-if` conditional ones), not per-row visible count.
- **Alignment:** Follow text direction — LTR pages left-align, RTL pages right-align. Do NOT center the action column.
- **Gap:** `gap-2` (8px) between buttons via Tailwind.
- **Button types:** Primary/view action → `type="primary"`, delete → `type="danger"`, others → default `link`.

Example for 3 max buttons (width = 130px):

```html
<el-table-column label="操作" width="130" fixed="right">
  <template #default="{ row }">
    <div class="flex items-center gap-2">
      <el-tooltip content="查看" placement="top" :show-after="300" :hide-after="0">
        <el-button type="primary" link size="small" :icon="View" @click="handleView(row)" />
      </el-tooltip>
      <el-tooltip content="编辑" placement="top" :show-after="300" :hide-after="0">
        <el-button link size="small" :icon="Edit" @click="handleEdit(row)" />
      </el-tooltip>
      <el-tooltip content="删除" placement="top" :show-after="300" :hide-after="0">
        <el-button type="danger" link size="small" :icon="Delete" @click="handleDelete(row)" />
      </el-tooltip>
    </div>
  </template>
</el-table-column>
```
```

- [ ] **Step 2: Verify the edit**

Read lines 154-200 of `generation-rules.md` and confirm the new section appears between "Admin List Page" and "Form Page".

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "docs(skill): add action column icon-only rule to generation-rules"
```

---

### Task 2: Add Action Buttons Interaction Rules

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md:44`

- [ ] **Step 1: Insert Action Buttons subsection under Tables**

After line 44 (`- Disabled buttons (first/last page): disabled state.`), add:

```markdown

### Action Buttons

Icon-only action buttons in table operation columns:

- Hover: tooltip appears after 300ms (`:show-after="300"`), no hide delay (`:hide-after="0"`).
- Placement: `top` to avoid overlapping adjacent table rows.
- Minimum click target: 28×28px (default for `el-button size="small" :icon`).
- Destructive action (delete): `type="danger"`.
- Primary/view action: `type="primary"`.
- Other actions: default `link` style.
- Each button must have accessible label via `el-tooltip content`.
```

- [ ] **Step 2: Verify the edit**

Read lines 30-55 of `interaction-rules.md` and confirm the new subsection appears under Tables, before Charts.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/interaction-rules.md
git commit -m "docs(skill): add action button interaction rules for icon-only buttons"
```

---

### Task 3: Update Review Checklist

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md:64-65`

- [ ] **Step 1: Replace the action column checklist item**

Replace line 64 (`- [ ] Action column is clear and right-aligned.`) with:

```markdown
- [ ] Action column: icon-only when ≥2 buttons, each button wrapped in tooltip, left/right aligned per text direction (no center), column width calculated for worst-case button count.
```

- [ ] **Step 2: Verify the edit**

Read lines 60-70 of `review-checklist.md` and confirm the old item is replaced with the new one.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "docs(skill): update review checklist for icon-only action column rule"
```

---

### Task 4: Fix OrderManageView.vue Action Column

**Files:**
- Modify: `login-homepage-preview/src/views/OrderManageView.vue:113-115` (cellStyle)
- Modify: `login-homepage-preview/src/views/OrderManageView.vue:231-251` (action column template)

- [ ] **Step 1: Remove 'actions' from cellStyle centering**

Replace lines 113-117:

```ts
const cellStyle = ({ column }: { column: TableColumnCtx<Order> }) => {
  return column.property === 'status' || column.property === 'actions'
    ? { textAlign: 'center' as const }
    : {}
}
```

With:

```ts
const cellStyle = ({ column }: { column: TableColumnCtx<Order> }) => {
  return column.property === 'status'
    ? { textAlign: 'center' as const }
    : {}
}
```

- [ ] **Step 2: Replace the action column template**

Replace lines 231-251:

```html
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <div class="flex items-center justify-center gap-1">
              <el-button type="primary" link size="small" :icon="View" @click="handleView(row)">
                查看
              </el-button>
              <el-button
                v-if="row.status === 'pending' || row.status === 'paid'"
                link
                size="small"
                :icon="Edit"
                @click="handleEdit(row)"
              >
                处理
              </el-button>
              <el-button type="danger" link size="small" :icon="Delete" @click="handleDelete(row)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
```

With:

```html
        <el-table-column label="操作" width="130" fixed="right">
          <template #default="{ row }">
            <div class="flex items-center gap-2">
              <el-tooltip content="查看" placement="top" :show-after="300" :hide-after="0">
                <el-button type="primary" link size="small" :icon="View" @click="handleView(row)" />
              </el-tooltip>
              <el-tooltip
                v-if="row.status === 'pending' || row.status === 'paid'"
                content="处理"
                placement="top"
                :show-after="300"
                :hide-after="0"
              >
                <el-button link size="small" :icon="Edit" @click="handleEdit(row)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top" :show-after="300" :hide-after="0">
                <el-button type="danger" link size="small" :icon="Delete" @click="handleDelete(row)" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
```

- [ ] **Step 3: Verify the full file is consistent**

Read the full `OrderManageView.vue` and confirm:
- `cellStyle` no longer centers the actions column
- Action column uses `width="130"`, `gap-2`, no text in buttons, `el-tooltip` wraps each button
- No other functionality changed

- [ ] **Step 4: Commit**

```bash
git add login-homepage-preview/src/views/OrderManageView.vue
git commit -m "fix(ui): apply icon-only tooltip rule to order manage action column"
```

---

### Task 5: Final Verification

- [ ] **Step 1: Review git log**

```bash
git log --oneline -5
```

Expected: 4 new commits on top of the design spec commit, all green.

- [ ] **Step 2: Verify no unrelated files changed**

```bash
git diff --stat main..HEAD
```

Expected: Only the 4 files listed above + the design spec.

- [ ] **Step 3: Final commit (if needed)**

If everything looks good, no additional commit needed. Otherwise:

```bash
git add -A
git commit -m "chore: final verification tweaks"
```
