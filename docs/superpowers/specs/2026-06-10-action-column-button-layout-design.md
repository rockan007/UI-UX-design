# Action Column Button Layout Rule

**Date:** 2026-06-10  
**Status:** designed  
**Scope:** vue3-element-ui-ux skill + OrderManageView.vue fix

## Problem

In admin table pages, the operation (操作) column contains 2–3 action buttons with text labels (e.g., "查看", "处理", "删除"). The column has a fixed width of 160px — sufficient for 2 buttons but too narrow for 3, causing the third button to be clipped/overflow. The layout is also inconsistent: rows with 3 buttons look cramped while rows with 2 buttons have empty space.

## Design

### Core Rule

When a table's operation column contains **2 or more** action buttons, all buttons MUST use **icon-only mode with tooltip**. The column is aligned to follow the page's text direction (LTR → left, RTL → right).

### Parameters

| Parameter | Value |
|---|---|
| Button mode | `el-button` with `:icon` only, no text content |
| Label | `el-tooltip` wrapping each button, `content` = action name |
| Tooltip show delay | 300ms, no hide delay |
| Tooltip placement | `top` |
| Column width formula | `(28px icon + 8px gap) × maxPossibleActions + 16px padding`. `maxPossibleActions` = template-level maximum (all buttons defined in the column template, including conditionally-rendered ones), NOT per-row count. |
| Alignment | Follow text direction — LTR → left, RTL → right |
| Gap between buttons | `space-2` = 8px (Tailwind `gap-2`) |

### Width Reference

| Max Buttons | Column Width |
|---|---|
| 2 | `(28+8)×2 + 16 = 88` → `90px` |
| 3 | `(28+8)×3 + 16 = 124` → `130px` |
| 4 | `(28+8)×4 + 16 = 160` → `160px` |

### Code Pattern

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

### Design Rationale

- **Space efficiency:** Icon-only buttons occupy ~28px each vs ~56px with 2-char Chinese labels — nearly 50% reduction.
- **Uniformity:** 2-button and 3-button rows have identical column width, no visual inconsistency.
- **Scalability:** The formula works for any number of buttons; just recalculate width.
- **Accessibility:** `el-tooltip` provides the accessible label text; icon buttons are recognizable via standard Element Plus icons.
- **Direction-aware:** LTR pages left-align, RTL pages right-align — consistent with the rest of the table content.

## Skill Updates

### vue3-element-ui-ux

**File: `references/generation-rules.md`**

Add under "Admin List Page" section (after line 157):

```markdown
### Action Column Rule

When an operation column has 2+ actions:
- **Icon-only:** Use `el-button` with `:icon` only, no text content.
- **Tooltip:** Wrap each button with `el-tooltip`, `content` = action name, `placement="top"`, `:show-after="300"`, `:hide-after="0"`.
- **Column width:** Calculate as `(28 + 8) × maxPossibleActions + 16`, round up to nearest 10px. `maxPossibleActions` is the total number of buttons defined in the column template (including `v-if` conditional ones), not the per-row visible count.
- **Alignment:** Follow text direction — LTR left-align, RTL right-align. Do NOT center.
- **Gap:** `gap-2` (8px) between buttons.
```

**File: `references/interaction-rules.md`**

Add under "Tables" section (after line 41):

```markdown
### Action Buttons

Icon-only action buttons in operation columns:
- Hover: tooltip appears after 300ms (`:show-after="300"`).
- Minimum click target: 28×28px (icon button default).
- Tooltip placement: `top` to avoid overlapping adjacent rows.
- Destructive action (delete): `type="danger"`.
- Primary/view action: `type="primary"`.
- Other actions: default `link` style.
- Each button must have `aria-label` via tooltip `content`.
```

**File: `references/review-checklist.md`**

Add under "5. Table Experience" (after line 64):

```markdown
- [ ] Action column: icon-only when ≥2 buttons, each has tooltip label, left/right aligned per text direction, no center alignment.
```

### ui-ux-agent-designer (optional)

If `references/design-standards.md` covers table patterns, add a cross-reference to the vue3-element-ui-ux action column rule. Not required for this change.

## OrderManageView.vue Fix

Apply the rule to `login-homepage-preview/src/views/OrderManageView.vue`:

1. **Line 231:** Change `width="160"` → `width="130"`
2. **Lines 233-249:** Replace text+icon buttons with icon-only + tooltip pattern
3. **Line 233:** Change `justify-center` → left-aligned (remove `justify-center`, keep `items-center`)
4. **Line 233:** Change `gap-1` → `gap-2`
5. **Line 114:** Remove `'actions'` from `cellStyle` centering

### Before/After

**Before (problematic):**
- 160px column, text+icon buttons, center-aligned
- 3-button rows: text overflows, "删除" clipped
- 2-button rows: uneven spacing

**After (fixed):**
- 130px column, icon-only + tooltip, left-aligned
- 3-button rows: all 3 icons visible, no overflow
- 2-button rows: identical column width, clean look
