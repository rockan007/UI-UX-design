# Form View Mode — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- []`) syntax for tracking.

**Goal:** Extend OrderFormView to handle view (read-only) mode alongside create/edit, replace OrderDetailView with the same component using a shared section card layout.

**Architecture:** Three-mode detection via `route.name` (`order-create` / `order-detail` / `order-edit`). Each form field gets `v-if="isView"` (read-only text) / `v-else` (editable input) blocks. Toolbar renders different buttons per mode. Delete logic moves from OrderDetailView into OrderFormView.

**Tech Stack:** Vue 3 + Element Plus + Tailwind CSS + vue-i18n

---

### Task 1: Update OrderFormView.vue — Add view mode

**Files:**
- Modify: `login-homepage-preview/src/views/OrderFormView.vue`

- [ ] **Step 1: Add view mode detection and imports**

In the script setup, change the mode detection (line 13):
```typescript
const isEdit = computed(() => route.name === 'order-edit')
const pageTitle = computed(() => isEdit.value ? t('orders.editTitle') : t('orders.createTitle'))
```

Replace with:
```typescript
const isEdit = computed(() => route.name === 'order-edit')
const isView = computed(() => route.name === 'order-detail')
const isCreate = computed(() => !isEdit.value && !isView.value)
const pageTitle = computed(() => {
  if (isEdit.value) return t('orders.editTitle')
  if (isView.value) return '' // view mode doesn't use pageTitle in breadcrumb
  return t('orders.createTitle')
})
```

Add status map after the rules definition (after line 42):
```typescript
const viewStatus = ref<{ labelKey: string; type: string }>({ labelKey: '', type: '' })
const statusMap: Record<string, { labelKey: string; type: string }> = {
  pending:    { labelKey: 'orders.status.pending', type: 'warning' },
  paid:       { labelKey: 'orders.status.paid', type: '' },
  shipped:    { labelKey: 'orders.status.shipped', type: 'info' },
  completed:  { labelKey: 'orders.status.completed', type: 'success' },
  refunded:   { labelKey: 'orders.status.refunded', type: 'danger' },
  cancelled:  { labelKey: 'orders.status.cancelled', type: 'info' },
}
```

- [ ] **Step 2: Update onMounted to handle view mode**

Replace the `onMounted` block (lines 62-77):
```typescript
onMounted(() => {
  if ((isEdit.value || isView.value) && orderId.value) {
    const orders = getMockOrders()
    const order = orders.find((o: any) => o.id === orderId.value)
    if (order) {
      form.customer = order.customer
      form.phone = order.phone
      form.items = order.items.map((name: string) => ({ name }))
      form.amount = order.total
      form.channel = order.channel
      form.address = order.address || ''
      form.deliveryMethod = order.deliveryMethod || '快递'
      form.remark = order.remark || ''
      if (isView.value) {
        viewStatus.value = statusMap[order.status] || { labelKey: '', type: '' }
      }
    }
  }
})
```

With:
```typescript
onMounted(() => {
  if ((isEdit.value || isView.value) && orderId.value) {
    const orders = getMockOrders()
    const order = orders.find((o: any) => o.id === orderId.value)
    if (order) {
      form.customer = order.customer
      form.phone = order.phone
      form.items = order.items.map((name: string) => ({ name }))
      form.amount = order.total
      form.channel = order.channel
      form.address = order.address || ''
      form.deliveryMethod = order.deliveryMethod || '快递'
      form.remark = order.remark || ''
      if (isView.value) {
        viewStatus.value = statusMap[order.status] || { labelKey: '', type: '' }
      }
    }
  }
})
```

- [ ] **Step 3: Add handleDelete function**

Add after `handleSubmit` (before `</script>`):
```typescript
function handleDelete() {
  if (!orderId.value) return
  ElMessageBox.confirm(
    t('orders.deleteConfirm', { id: orderId.value }),
    t('orders.deleteTitle'),
    { confirmButtonText: t('orders.deleteConfirmBtn'), cancelButtonText: t('common.cancel'), type: 'warning' },
  )
    .then(() => {
      const orders = getMockOrders()
      const idx = orders.findIndex((o: any) => o.id === orderId.value)
      if (idx !== -1) orders.splice(idx, 1)
      saveMockOrders(orders)
      ElMessage.success(t('orders.deletedMessage', { id: orderId.value }))
      router.push('/admin/orders')
    })
    .catch(() => {})
}
```

Add `ElMessageBox` to the Element Plus import on line 6:
```typescript
import { ElMessage, ElMessageBox } from 'element-plus'
```

- [ ] **Step 4: Update toolbar template for three modes**

Replace the toolbar div (lines 130-143):
```html
    <!-- Toolbar: breadcrumb + actions -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/orders' }">{{ t('orders.title') }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isEdit" :to="{ path: `/admin/orders/${orderId}` }">{{ orderId }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="flex items-center gap-3">
        <el-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
          {{ isEdit ? t('common.save') : t('common.submit') }}
        </el-button>
        <el-button plain @click="router.back()">{{ t('common.cancel') }}</el-button>
      </div>
    </div>
```

With:
```html
    <!-- Toolbar: breadcrumb + actions -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <div class="flex items-center gap-3">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/admin/orders' }">{{ t('orders.title') }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="isEdit" :to="{ path: `/admin/orders/${orderId}` }">{{ orderId }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="!isView">{{ pageTitle }}</el-breadcrumb-item>
          <el-breadcrumb-item v-else>{{ orderId }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tag v-if="isView && viewStatus.type" :type="viewStatus.type" effect="light">
          {{ t(viewStatus.labelKey) }}
        </el-tag>
      </div>
      <div class="flex items-center gap-3">
        <!-- View mode: Edit + Delete -->
        <template v-if="isView">
          <el-button type="primary" @click="router.push(`/admin/orders/${orderId}/edit`)">
            {{ t('common.edit') }}
          </el-button>
          <el-button type="danger" plain @click="handleDelete">
            {{ t('common.delete') }}
          </el-button>
        </template>
        <!-- Create/Edit mode: Save + Cancel -->
        <template v-else>
          <el-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
            {{ isEdit ? t('common.save') : t('common.submit') }}
          </el-button>
          <el-button plain @click="router.back()">{{ t('common.cancel') }}</el-button>
        </template>
      </div>
    </div>
```

- [ ] **Step 5: Add v-if/isView blocks to each form field for read-only display**

Each `el-form-item` containing an input needs a `v-if`/`v-else` pair. Here is the pattern for each field type:

**Text input fields (customer, phone):**
```html
<el-form-item :label="t('orders.fields.customer')" prop="customer">
  <template v-if="isView">
    <div class="text-sm text-neutral-950 pt-1">{{ form.customer }}</div>
  </template>
  <el-input v-else v-model="form.customer" placeholder="张三" />
</el-form-item>
```

**Number field (amount):**
```html
<el-form-item :label="t('orders.fields.amount')" prop="amount">
  <template v-if="isView">
    <div class="text-sm font-semibold text-neutral-950 pt-1">{{ $n(form.amount, 'currency') }}</div>
  </template>
  <el-input-number v-else v-model="form.amount" :min="0" :precision="2" class="w-full" />
</el-form-item>
```

**Select fields (channel, deliveryMethod):**
```html
<el-form-item :label="t('orders.fields.channel')">
  <template v-if="isView">
    <div class="text-sm text-neutral-950 pt-1">{{ form.channel }}</div>
  </template>
  <el-select v-else v-model="form.channel" class="w-full">
    <el-option label="APP" value="APP" />
    <el-option :label="t('orders.channel.web')" value="网页" />
    <el-option :label="t('orders.channel.miniprogram')" value="小程序" />
  </el-select>
</el-form-item>
```

**Dynamic item list (items):**
```html
<el-form-item :label="t('orders.fields.items')" class="mt-4 mb-0">
  <template v-if="isView">
    <div class="flex flex-wrap gap-1 pt-1">
      <el-tag v-for="(item, i) in form.items" :key="i" size="small" effect="plain" type="info">
        {{ item.name }}
      </el-tag>
    </div>
  </template>
  <template v-else>
    <div class="flex flex-col gap-2 w-full">
      <div v-for="(item, i) in form.items" :key="i" class="flex items-center gap-2">
        <el-input v-model="item.name" :placeholder="t('orders.fields.itemName')" class="flex-1" />
        <el-button v-if="form.items.length > 1" link type="danger" :icon="Delete" @click="removeItem(i)" />
      </div>
      <el-button link type="primary" :icon="Plus" @click="addItem">
        {{ t('orders.fields.itemsAdd') }}
      </el-button>
    </div>
  </template>
</el-form-item>
```

**Textarea fields (address, remark):**
```html
<el-form-item :label="t('orders.fields.address')" class="mt-4">
  <template v-if="isView">
    <div class="text-sm text-neutral-950 pt-1 whitespace-pre-wrap">{{ form.address || '-' }}</div>
  </template>
  <el-input v-else v-model="form.address" type="textarea" :rows="2" :placeholder="t('orders.fields.addressPlaceholder')" />
</el-form-item>
```

**Rules wrap:** The `<el-form :rules="rules">` should only apply rules in non-view mode. Change to:
```html
<el-form
  ref="formRef"
  :model="form"
  :rules="isView ? {} : rules"
  label-position="top"
  class="flex flex-col gap-4"
  @submit.prevent="handleSubmit"
>
```

- [ ] **Step 6: Start dev server and verify**

Run: `cd login-homepage-preview && npm run dev`

Test at:
- `/admin/orders/create` — create mode, editable fields, "提交" + "取消"
- `/admin/orders/ORD-20260601-001` — view mode, read-only text, status tag, "编辑" + "删除"
- `/admin/orders/ORD-20260601-001/edit` — edit mode, pre-filled editable fields, "保存" + "取消"

- [ ] **Step 7: Commit**

```bash
git add login-homepage-preview/src/views/OrderFormView.vue
git commit -m "feat(demo): add view mode to OrderFormView — three-mode form with read-only display"
```

---

### Task 2: Update router, delete OrderDetailView, update OrderManageView

**Files:**
- Modify: `login-homepage-preview/src/router/index.ts`
- Delete: `login-homepage-preview/src/views/OrderDetailView.vue`
- Modify: `login-homepage-preview/src/views/OrderManageView.vue`

- [ ] **Step 1: Update router**

Read `login-homepage-preview/src/router/index.ts`. Find the route for `/admin/orders/:id` that currently points to `OrderDetailView`. Change it to point to `OrderFormView` with route name `order-detail`:

Old:
```typescript
{
  path: ':id',
  name: 'order-detail',
  component: () => import('@/views/OrderDetailView.vue'),
},
```

New:
```typescript
{
  path: ':id',
  name: 'order-detail',
  component: () => import('@/views/OrderFormView.vue'),
},
```

Also remove the `OrderDetailView` import if it exists at the top of the router file.

- [ ] **Step 2: Delete OrderDetailView.vue**

```bash
rm login-homepage-preview/src/views/OrderDetailView.vue
```

- [ ] **Step 3: Update OrderManageView.vue**

The list page row click already navigates to `/admin/orders/${row.id}` which will now render OrderFormView in view mode. No code change needed — but verify the import list at the top doesn't reference `OrderDetailView` (it doesn't — it just uses `router.push`).

- [ ] **Step 4: Start dev server and verify navigation**

Verify:
- Click a row in the order list → navigates to view mode
- Click "编辑" in view mode → navigates to edit mode
- Click "创建订单" → navigates to create mode
- No 404 errors, no missing component warnings

- [ ] **Step 5: Commit**

```bash
git add login-homepage-preview/src/router/index.ts
git rm login-homepage-preview/src/views/OrderDetailView.vue
git commit -m "feat(demo): route order detail to OrderFormView view mode; remove OrderDetailView"
```

---

### Task 3: Update skill reference files — Abstract three-mode form pattern

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md`
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`
- Modify: `.claude/skills/vue3-element-ui-ux/references/component-system.md`
- Modify: `.claude/skills/vue3-element-ui-ux/references/design-principles.md`

- [ ] **Step 1: Update Admin Form Page section in generation-rules.md**

Read the Admin Form Page section (starting at `### Admin Form Page`). After the Field Grid subsection, add a new subsection:

```markdown
**Three-Mode Form (create / view / edit):**

Admin forms that manage entities support three modes in a single component:

```typescript
const isEdit = computed(() => route.name === '{entity}-edit')
const isView = computed(() => route.name === '{entity}-detail')
const isCreate = computed(() => !isEdit.value && !isView.value)
```

**Mode detection:** Route name determines mode. `{entity}-create` = create, `{entity}-detail` = view, `{entity}-edit` = edit.

**Toolbar per mode:**

| Mode | Left | Right |
|---|---|---|
| create | breadcrumb: `{entity} / 创建{entity}` | Submit + Cancel |
| view | breadcrumb: `{entity} / {id}` + **status tag** | Edit + Delete |
| edit | breadcrumb: `{entity} / {id} / 编辑` | Save + Cancel |

View mode toolbar example:
```html
<div class="flex items-center justify-between mb-4 md:mb-6">
  <div class="flex items-center gap-3">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/{entity}' }">{entity name}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ recordId }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tag v-if="isView" :type="statusType" effect="light">{{ statusLabel }}</el-tag>
  </div>
  <div class="flex items-center gap-3">
    <template v-if="isView">
      <el-button type="primary" @click="router.push(`/admin/{entity}/${id}/edit`)">编辑</el-button>
      <el-button type="danger" plain @click="handleDelete">删除</el-button>
    </template>
    <template v-else>
      <el-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
        {{ isEdit ? '保存' : '提交' }}
      </el-button>
      <el-button plain @click="router.back()">取消</el-button>
    </template>
  </div>
</div>
```

**Field display per mode:**

Each field uses `v-if="isView"` / `v-else` to switch between read-only text and editable input:

```html
<el-form-item label="Field Label" prop="field">
  <template v-if="isView">
    <div class="text-sm text-neutral-950 pt-1">{{ form.field }}</div>
  </template>
  <el-input v-else v-model="form.field" />
</el-form-item>
```

Key points:
- View mode: `<el-form :rules="isView ? {} : rules">` — no validation on read-only
- Text fields: plain `<div>` with `pt-1` for baseline alignment
- Amount/number: formatted with `$n()`
- Select/channel: display the raw value (already in locale)
- Textarea: `<div class="whitespace-pre-wrap">` to preserve line breaks
- Items list: `<el-tag>` list instead of dynamic input rows
- Section cards, grid layout, accent stripes are identical across all three modes
```

- [ ] **Step 2: Update review-checklist.md — Form Experience section**

Find the Form Experience section (section 4). After the form toolbar item, add:

```markdown
- [ ] **Three-mode form:** Form component handles create/view/edit via route name detection. View mode shows read-only text, no validation rules, Edit+Delete toolbar buttons with status tag next to breadcrumb.
```

Also update the "CRUD navigation" item in section 3 (Visual Consistency) if it references separate DetailView:
```
- [ ] **CRUD navigation:** List has "创建" button; row/card click navigates to detail (form view mode); detail has edit/delete actions. Create and edit share one form component; view is the same component in read-only mode.
```

- [ ] **Step 3: Update component-system.md — EntityForm description**

Find the `EntityForm` row in the Composite Components table. Update its description:
```
| `EntityForm` | `EntityForm` | Shared create/view/edit form, detects mode via route name. Read-only display in view mode with `v-if/isView` blocks |
```

- [ ] **Step 4: Update design-principles.md — Admin CRUD Navigation**

Find the "Admin CRUD Navigation" section. Update the form items:
```
- Create/Edit/View share a single form component, detecting mode via route name.
  View mode: read-only fields, status tag in breadcrumb row, Edit + Delete toolbar buttons.
  Create mode: empty editable fields, Submit + Cancel buttons.
  Edit mode: pre-filled editable fields, Save + Cancel buttons.
```

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md \
        .claude/skills/vue3-element-ui-ux/references/review-checklist.md \
        .claude/skills/vue3-element-ui-ux/references/component-system.md \
        .claude/skills/vue3-element-ui-ux/references/design-principles.md
git commit -m "feat(skill): add three-mode form pattern — create/view/edit in single component"
```
