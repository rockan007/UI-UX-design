# Form View Mode — Design Spec

**Date:** 2026-06-12
**Status:** Approved

## Goal

Extend OrderFormView to handle view (read-only) mode alongside create and edit, replacing
the standalone OrderDetailView. All three modes share the same section card layout, keeping
visual structure consistent.

## Current State

- **OrderFormView** handles create and edit, detected by `route.name === 'order-edit'`
- **OrderDetailView** handles `/admin/orders/:id` with a different layout (2-column
  `justify-between` cards, standalone breadcrumb, bottom action buttons)
- Two components with completely different visual structures for the same data

## Proposed Design

### Three-Mode Form Component

OrderFormView detects mode from route name:

| Mode | Route Name | Route Path | Toolbar Left | Toolbar Right |
|---|---|---|---|---|
| `create` | `order-create` | `/admin/orders/create` | 订单管理 / 创建订单 | 提交 + 取消 |
| `view` | `order-detail` | `/admin/orders/:id` | 订单管理 / {id} + **状态标签** | 编辑 + 删除 |
| `edit` | `order-edit` | `/admin/orders/:id/edit` | 订单管理 / {id} / 编辑 | 保存 + 取消 |

### Mode Detection

```typescript
const isEdit = computed(() => route.name === 'order-edit')
const isView = computed(() => route.name === 'order-detail')
const isCreate = computed(() => !isEdit.value && !isView.value)
```

### View Mode Field Display

In view mode, all form fields render as read-only text instead of input controls:

| Field | Edit/Create | View |
|---|---|---|
| customer, phone | `<el-input>` | Plain text |
| amount | `<el-input-number>` | Formatted currency (`$n(value, 'currency')`) |
| channel | `<el-select>` | Plain text |
| items | Dynamic input list + add/remove | `<el-tag>` list |
| deliveryMethod | `<el-select>` | Plain text |
| address, remark | `<el-input type="textarea">` | Plain text (preserve whitespace via `whitespace-pre-wrap`) |

Implementation: `v-if="isView"` / `v-else` blocks on each field, sharing the same
`<el-form-item>` label and grid layout.

### View Mode Toolbar

```html
<div class="flex items-center justify-between mb-4 md:mb-6">
  <div class="flex items-center gap-3">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/orders' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ orderId }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tag v-if="isView" :type="statusType" effect="light">{{ statusLabel }}</el-tag>
  </div>
  <div class="flex items-center gap-3">
    <!-- view: Edit + Delete -->
    <template v-if="isView">
      <el-button type="primary" @click="router.push(`/admin/orders/${orderId}/edit`)">编辑</el-button>
      <el-button type="danger" plain @click="handleDelete">删除</el-button>
    </template>
    <!-- create/edit: Save + Cancel -->
    <template v-else>
      <el-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
        {{ isEdit ? '保存' : '提交' }}
      </el-button>
      <el-button plain @click="router.back()">取消</el-button>
    </template>
  </div>
</div>
```

Key: status tag is part of the left group (after breadcrumb), ONLY in view mode. Delete is
`type="danger" plain` (red border, lower weight than primary Edit button).

### Section Cards (shared structure)

All three modes share the exact same section card wrappers:
- 基本信息: blue stripe (`border-l-blue-600`)
- 其他信息: cyan stripe (`border-l-cyan-600`)
- Same grid layout (`grid grid-cols-1 md:grid-cols-3 gap-4`)
- Full-width fields at section end

### Data Loading (view mode)

On mount, if `isView`, load the order data and populate form for display. Same logic as
edit mode loading — reuse existing `onMounted` logic.

### Delete with Confirmation (view mode)

Move `handleDelete` logic from OrderDetailView into OrderFormView (view mode only).
Confirmation via `ElMessageBox.confirm`, on success navigate to `/admin/orders`.

## Files to Change

### Demo App
- **Modify:** `login-homepage-preview/src/views/OrderFormView.vue` — add view mode
- **Delete:** `login-homepage-preview/src/views/OrderDetailView.vue` — replaced by form view mode
- **Modify:** `login-homepage-preview/src/router/index.ts` — point `/admin/orders/:id` to OrderFormView with route name `order-detail`
- **Modify:** `login-homepage-preview/src/views/OrderManageView.vue` — update row click to navigate to detail (already does `router.push(/admin/orders/${row.id})`, should still work)

### Skill Files
- Modify: `vue3-element-ui-ux/references/generation-rules.md` — update Admin Form Page to include three-mode pattern
- Modify: `vue3-element-ui-ux/references/review-checklist.md` — update checks
- Modify: `vue3-element-ui-ux/references/component-system.md` — update EntityForm description
- Modify: `vue3-element-ui-ux/references/design-principles.md` — update admin CRUD navigation

## Design Decisions

1. **Three modes in one component** — avoids layout drift between view and edit. The shared
   section card structure ensures visual consistency.
2. **Status tag in breadcrumb row** — makes status immediately visible without a separate
   header section. Sits between breadcrumb and nothing, on the left side.
3. **Delete in view mode only** — create/edit modes don't need delete. Delete is
   `type="danger" plain` to avoid competing with the primary Edit button.
4. **OrderDetailView removed** — no longer needed; its delete logic moves into the form.
5. **Route name `order-detail`** — replaced `order-view` for consistency with existing
   router naming conventions.

## Spec Self-Review

- **Placeholders:** None
- **Consistency:** View mode reuses create/edit layout; status tag placement is consistent
  with toolbar pattern; accent stripes match data model
- **Scope:** One component refactored + one deleted + router + skill files — focused
- **Ambiguity:** None — exact mode detection, field mapping, and toolbar structure specified
