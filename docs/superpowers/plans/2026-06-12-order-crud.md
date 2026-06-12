# Order Management CRUD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add order create/view/edit pages, update list page with create button and row navigation, extract CRUD patterns into skill reference files.

**Architecture:** Three new views (OrderFormView shared for create/edit, OrderDetailView), router additions, list page modifications. Skill files get generic CRUD rules. All data stays in-memory mock data.

**Tech Stack:** Vue 3 + Element Plus + Tailwind CSS, `@element-plus/icons-vue`, vue-router, vue-i18n.

---

### Task 1: Add i18n keys for new pages

**Files:**
- Modify: `login-homepage-preview/src/locales/zh.json`
- Modify: `login-homepage-preview/src/locales/en.json`

- [ ] **Step 1: Add order form and detail keys to zh.json**

Insert in the `orders` section after the last key:

```json
"createTitle": "创建订单",
"editTitle": "编辑订单",
"detailTitle": "订单详情",
"fields": {
  "customer": "客户名称",
  "phone": "手机号",
  "items": "商品清单",
  "itemsAdd": "添加商品",
  "itemName": "商品名称",
  "amount": "金额",
  "channel": "下单渠道",
  "address": "收货地址",
  "addressPlaceholder": "请输入收货地址",
  "deliveryMethod": "配送方式",
  "deliveryExpress": "快递",
  "deliveryPickup": "自提",
  "deliveryLocal": "同城配送",
  "remark": "备注",
  "remarkPlaceholder": "订单备注信息"
},
"createSuccess": "订单创建成功",
"updateSuccess": "订单更新成功"
```

- [ ] **Step 2: Add matching en.json keys**

```json
"createTitle": "Create Order",
"editTitle": "Edit Order",
"detailTitle": "Order Detail",
"fields": {
  "customer": "Customer Name",
  "phone": "Phone",
  "items": "Items",
  "itemsAdd": "Add Item",
  "itemName": "Item Name",
  "amount": "Amount",
  "channel": "Channel",
  "address": "Shipping Address",
  "addressPlaceholder": "Enter shipping address",
  "deliveryMethod": "Delivery Method",
  "deliveryExpress": "Express",
  "deliveryPickup": "Pickup",
  "deliveryLocal": "Local Delivery",
  "remark": "Remark",
  "remarkPlaceholder": "Order notes"
},
"createSuccess": "Order created successfully",
"updateSuccess": "Order updated successfully"
```

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/locales/
git commit -m "feat(i18n): add order form and detail keys"
```

---

### Task 2: Add new routes to router

**Files:**
- Modify: `login-homepage-preview/src/router/index.ts`

- [ ] **Step 1: Add route imports and child routes**

Add after the existing `OrderManageView` import:

```typescript
import OrderFormView from '../views/OrderFormView.vue'
import OrderDetailView from '../views/OrderDetailView.vue'
```

Add three new child routes under `/admin`:

```typescript
{
  path: 'orders/create',
  name: 'order-create',
  component: OrderFormView,
},
{
  path: 'orders/:id',
  name: 'order-detail',
  component: OrderDetailView,
},
{
  path: 'orders/:id/edit',
  name: 'order-edit',
  component: OrderFormView,
},
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/router/index.ts
git commit -m "feat(router): add order create, detail, edit routes"
```

---

### Task 3: Create OrderFormView.vue (shared create/edit form)

**Files:**
- Create: `login-homepage-preview/src/views/OrderFormView.vue`

- [ ] **Step 1: Write OrderFormView.vue**

```vue
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const isEdit = computed(() => route.name === 'order-edit')
const pageTitle = computed(() => isEdit.value ? t('orders.editTitle') : t('orders.createTitle'))
const orderId = computed(() => route.params.id as string | undefined)

const formRef = ref<FormInstance>()
const submitting = ref(false)

interface OrderItem {
  name: string
}

const form = reactive({
  customer: '',
  phone: '',
  items: [{ name: '' }] as OrderItem[],
  amount: 0,
  channel: 'APP' as 'APP' | '网页' | '小程序',
  address: '',
  deliveryMethod: '快递' as '快递' | '自提' | '同城配送',
  remark: '',
})

const rules: FormRules = {
  customer: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效手机号', trigger: 'blur' },
  ],
  amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
}

function addItem() {
  form.items.push({ name: '' })
}

function removeItem(index: number) {
  if (form.items.length > 1) {
    form.items.splice(index, 1)
  }
}

// Mock data store (shared via window for demo)
function getMockOrders(): any[] {
  return (window as any).__mockOrders || []
}

function saveMockOrders(orders: any[]) {
  (window as any).__mockOrders = orders
}

onMounted(() => {
  if (isEdit.value && orderId.value) {
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
    }
  }
})

async function handleSubmit() {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  const orders = getMockOrders()
  const itemNames = form.items.map(i => i.name).filter(n => n.trim())

  if (isEdit.value && orderId.value) {
    const idx = orders.findIndex((o: any) => o.id === orderId.value)
    if (idx !== -1) {
      orders[idx] = {
        ...orders[idx],
        customer: form.customer,
        phone: form.phone,
        items: itemNames,
        total: form.amount,
        channel: form.channel,
        address: form.address,
        deliveryMethod: form.deliveryMethod,
        remark: form.remark,
      }
    }
    ElMessage.success(t('orders.updateSuccess'))
  } else {
    const newOrder = {
      id: `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(orders.length + 1).padStart(3, '0')}`,
      customer: form.customer,
      phone: form.phone,
      items: itemNames,
      total: form.amount,
      status: 'pending',
      channel: form.channel,
      address: form.address,
      deliveryMethod: form.deliveryMethod,
      remark: form.remark,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    }
    orders.unshift(newOrder)
    ElMessage.success(t('orders.createSuccess'))
  }

  saveMockOrders(orders)
  submitting.value = false
  router.push('/admin/orders')
}
</script>

<template>
  <div>
    <!-- Breadcrumb -->
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item :to="{ path: '/admin/orders' }">{{ t('orders.title') }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="isEdit" :to="{ path: `/admin/orders/${orderId}` }">{{ orderId }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="bg-white rounded-btn border border-neutral-200 p-6 md:p-8 max-w-2xl">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleSubmit"
      >
        <!-- Required Fields -->
        <div class="mb-6">
          <div class="text-sm font-semibold text-neutral-500 mb-4 uppercase tracking-wide">基本信息</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <el-form-item :label="t('orders.fields.customer')" prop="customer">
              <el-input v-model="form.customer" placeholder="张三" />
            </el-form-item>
            <el-form-item :label="t('orders.fields.phone')" prop="phone">
              <el-input v-model="form.phone" placeholder="138****1234" />
            </el-form-item>
          </div>

          <!-- Items -->
          <el-form-item :label="t('orders.fields.items')" class="mb-2">
            <div class="flex flex-col gap-2 w-full">
              <div v-for="(item, i) in form.items" :key="i" class="flex items-center gap-2">
                <el-input v-model="item.name" :placeholder="t('orders.fields.itemName')" class="flex-1" />
                <el-button v-if="form.items.length > 1" link type="danger" :icon="Delete" @click="removeItem(i)" />
              </div>
              <el-button link type="primary" :icon="Plus" @click="addItem">
                {{ t('orders.fields.itemsAdd') }}
              </el-button>
            </div>
          </el-form-item>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <el-form-item :label="t('orders.fields.amount')" prop="amount">
              <el-input-number v-model="form.amount" :min="0" :precision="2" class="w-full" />
            </el-form-item>
            <el-form-item :label="t('orders.fields.channel')">
              <el-select v-model="form.channel" class="w-full">
                <el-option label="APP" value="APP" />
                <el-option :label="t('orders.channel.web')" value="网页" />
                <el-option :label="t('orders.channel.miniprogram')" value="小程序" />
              </el-select>
            </el-form-item>
          </div>
        </div>

        <!-- Secondary Fields -->
        <div class="mb-6 pt-4 border-t border-neutral-100">
          <div class="text-sm font-semibold text-neutral-500 mb-4 uppercase tracking-wide">其他信息</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <el-form-item :label="t('orders.fields.address')">
              <el-input v-model="form.address" type="textarea" :rows="2" :placeholder="t('orders.fields.addressPlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('orders.fields.deliveryMethod')">
              <el-select v-model="form.deliveryMethod" class="w-full">
                <el-option :label="t('orders.fields.deliveryExpress')" value="快递" />
                <el-option :label="t('orders.fields.deliveryPickup')" value="自提" />
                <el-option :label="t('orders.fields.deliveryLocal')" value="同城配送" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item :label="t('orders.fields.remark')">
            <el-input v-model="form.remark" type="textarea" :rows="2" :placeholder="t('orders.fields.remarkPlaceholder')" />
          </el-form-item>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 pt-4 border-t border-neutral-100">
          <el-button type="primary" size="large" :loading="submitting" :disabled="submitting" @click="handleSubmit">
            {{ isEdit ? t('common.save') : t('common.submit') }}
          </el-button>
          <el-button size="large" @click="router.back()">{{ t('common.cancel') }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/OrderFormView.vue
git commit -m "feat(demo): add order create/edit form view"
```

---

### Task 4: Create OrderDetailView.vue

**Files:**
- Create: `login-homepage-preview/src/views/OrderDetailView.vue`

- [ ] **Step 1: Write OrderDetailView.vue**

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Edit, Delete, ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const orderId = computed(() => route.params.id as string)

interface OrderDetail {
  id: string
  customer: string
  phone: string
  items: string[]
  total: number
  status: string
  channel: string
  address?: string
  deliveryMethod?: string
  remark?: string
  createdAt: string
}

const order = ref<OrderDetail | null>(null)
const statusMap: Record<string, { labelKey: string; type: string }> = {
  pending:    { labelKey: 'orders.status.pending', type: 'warning' },
  paid:       { labelKey: 'orders.status.paid', type: '' },
  shipped:    { labelKey: 'orders.status.shipped', type: 'info' },
  completed:  { labelKey: 'orders.status.completed', type: 'success' },
  refunded:   { labelKey: 'orders.status.refunded', type: 'danger' },
  cancelled:  { labelKey: 'orders.status.cancelled', type: 'info' },
}

function getMockOrders(): any[] {
  return (window as any).__mockOrders || []
}

onMounted(() => {
  const orders = getMockOrders()
  order.value = orders.find((o: any) => o.id === orderId.value) || null
})

function handleEdit() {
  router.push(`/admin/orders/${orderId.value}/edit`)
}

function handleDelete() {
  ElMessageBox.confirm(
    t('orders.deleteConfirm', { id: orderId.value }),
    t('orders.deleteTitle'),
    { confirmButtonText: t('orders.deleteConfirmBtn'), cancelButtonText: t('common.cancel'), type: 'warning' },
  )
    .then(() => {
      const orders = getMockOrders()
      const idx = orders.findIndex((o: any) => o.id === orderId.value)
      if (idx !== -1) orders.splice(idx, 1)
      ;(window as any).__mockOrders = orders
      ElMessage.success(t('orders.deletedMessage', { id: orderId.value }))
      router.push('/admin/orders')
    })
    .catch(() => {})
}
</script>

<template>
  <div>
    <!-- Breadcrumb -->
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item :to="{ path: '/admin/orders' }">{{ t('orders.title') }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ orderId }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div v-if="!order" class="bg-white rounded-btn border border-neutral-200 p-12 text-center text-sm text-neutral-500">
      订单不存在
    </div>

    <template v-else>
      <!-- Header -->
      <div class="flex items-center justify-between mb-4 md:mb-6">
        <div class="flex items-center gap-3">
          <el-button link :icon="ArrowLeft" @click="router.back()" />
          <div>
            <div class="text-xl font-semibold text-neutral-950">{{ order.id }}</div>
            <div class="text-sm text-neutral-500 mt-1">{{ t('orders.detailTitle') }}</div>
          </div>
        </div>
        <el-tag :type="statusMap[order.status]?.type" size="large" effect="light">
          {{ t(statusMap[order.status]?.labelKey) }}
        </el-tag>
      </div>

      <!-- Detail Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- Basic Info -->
        <div class="bg-white rounded-btn border border-neutral-200 p-5">
          <div class="text-sm font-semibold text-neutral-500 mb-4">基本信息</div>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.fields.customer') }}</span>
              <span class="text-sm text-neutral-950">{{ order.customer }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.fields.phone') }}</span>
              <span class="text-sm text-neutral-950">{{ order.phone }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.fields.channel') }}</span>
              <span class="text-sm text-neutral-950">{{ order.channel }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.columns.createdAt') }}</span>
              <span class="text-sm text-neutral-950">{{ order.createdAt }}</span>
            </div>
          </div>
        </div>

        <!-- Order Info -->
        <div class="bg-white rounded-btn border border-neutral-200 p-5">
          <div class="text-sm font-semibold text-neutral-500 mb-4">订单信息</div>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.fields.amount') }}</span>
              <span class="text-sm font-semibold text-neutral-950">{{ $n(order.total, 'currency') }}</span>
            </div>
            <div>
              <span class="text-sm text-neutral-500 block mb-2">{{ t('orders.fields.items') }}</span>
              <div class="flex flex-wrap gap-1">
                <el-tag v-for="(item, i) in order.items" :key="i" size="small" effect="plain" type="info">
                  {{ item }}
                </el-tag>
              </div>
            </div>
            <div v-if="order.deliveryMethod" class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.fields.deliveryMethod') }}</span>
              <span class="text-sm text-neutral-950">{{ order.deliveryMethod }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Secondary Info -->
      <div v-if="order.address || order.remark" class="bg-white rounded-btn border border-neutral-200 p-5 mb-6">
        <div class="text-sm font-semibold text-neutral-500 mb-4">其他信息</div>
        <div class="flex flex-col gap-3">
          <div v-if="order.address">
            <span class="text-sm text-neutral-500 block mb-1">{{ t('orders.fields.address') }}</span>
            <span class="text-sm text-neutral-950">{{ order.address }}</span>
          </div>
          <div v-if="order.remark">
            <span class="text-sm text-neutral-500 block mb-1">{{ t('orders.fields.remark') }}</span>
            <span class="text-sm text-neutral-950">{{ order.remark }}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 pb-4">
        <el-button type="primary" :icon="Edit" @click="handleEdit">
          {{ t('common.edit') }}
        </el-button>
        <el-button type="danger" :icon="Delete" @click="handleDelete">
          {{ t('common.delete') }}
        </el-button>
      </div>
    </template>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/OrderDetailView.vue
git commit -m "feat(demo): add order detail view"
```

---

### Task 5: Update OrderManageView.vue — Add create button + row navigation + mock data sharing

**Files:**
- Modify: `login-homepage-preview/src/views/OrderManageView.vue`

- [ ] **Step 1: Expose mock data to window for cross-page sharing**

In the script section, after `const mockOrders: Order[] = [...]`, add:

```typescript
// Share mock data across pages for demo
;(window as any).__mockOrders = mockOrders
```

- [ ] **Step 2: Add "Create Order" button after breadcrumb**

For desktop: add a button after the breadcrumb, before the summary cards. On mobile: add above the card list.

After the breadcrumb div, add:

```html
    <!-- Create Button: Desktop -->
    <div class="hidden md:flex items-center justify-between mb-4">
      <div></div>
      <el-button type="primary" :icon="Plus" @click="router.push('/admin/orders/create')">
        {{ t('orders.createTitle') }}
      </el-button>
    </div>
```

Add `Plus` to icon imports and `useRouter`:

```typescript
import { Search, Edit, Delete, View, Operation, MoreFilled, Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
```

- [ ] **Step 3: Add "Create" button above mobile card list**

Before the mobile card list div (`<!-- Card List: Mobile -->`), add:

```html
    <!-- Create Button: Mobile -->
    <div class="flex md:hidden justify-end mb-2">
      <el-button type="primary" size="small" :icon="Plus" @click="router.push('/admin/orders/create')">
        {{ t('orders.createTitle') }}
      </el-button>
    </div>
```

- [ ] **Step 4: Add row click navigation to detail page**

Add click handler to both desktop table rows and mobile card items.

For the desktop `el-table`, add `@row-click`:

```html
<el-table ... @row-click="(row: Order) => router.push(`/admin/orders/${row.id}`)">
```

For the mobile card, add click handler:

```html
<div v-for="order in pagedOrders" :key="order.id"
     class="bg-white rounded-btn border border-neutral-200 p-3 cursor-pointer"
     @click="router.push(`/admin/orders/${order.id}`)">
```

Add `cursor-pointer` class to the card div.

- [ ] **Step 5: Commit**

```bash
git add login-homepage-preview/src/views/OrderManageView.vue
git commit -m "feat(demo): add create button and row navigation to order list"
```

---

### Task 6: Update skill reference files with CRUD patterns

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md`
- Modify: `.claude/skills/vue3-element-ui-ux/references/component-system.md`
- Modify: `.claude/skills/vue3-element-ui-ux/references/design-principles.md`
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`

- [ ] **Step 1: Add CRUD pattern to generation-rules.md**

After the Breadcrumb section, append:

```markdown
### Admin CRUD Pattern

Admin entity management follows a standard CRUD flow: list → create → detail → edit.

**Route structure:**

```
/admin/{entity}              → List page (existing)
/admin/{entity}/create       → Create form
/admin/{entity}/:id          → Detail page
/admin/{entity}/:id/edit     → Edit form
```

**Breadcrumb for CRUD pages:**

- List: `{entity name}`
- Create: `{entity name} / 创建{entity}`
- Detail: `{entity name} / {record id}`
- Edit: `{entity name} / {record id} / 编辑`

**Shared form pattern (create/edit):**

Use the same form component for create and edit. Detect mode via route name:

```typescript
const isEdit = computed(() => route.name === '{entity}-edit')
const pageTitle = computed(() => isEdit.value ? '编辑' : '创建')
```

On mount, if editing, load existing data and pre-fill the form. On submit, call update or create based on mode.

**Form field grouping:**

- **Required fields** first, grouped under a "基本信息" section label
- **Secondary fields** below a divider (`border-t`), grouped under "其他信息"
- Submit/Cancel buttons in a footer area, also separated by divider

**Detail page structure:**

- Breadcrumb with back navigation
- Header: ID + status badge
- Detail cards: 2-column grid for key info, full-width for secondary info
- Action bar: Edit + Delete buttons

**List page integration:**

- "Create" button: desktop above table, mobile above card list
- Row/card click navigates to detail page (`@row-click` on table, `@click` on card)
```

- [ ] **Step 2: Add form component mappings to component-system.md**

In the Composite Components table, add:

```markdown
| `EntityForm` | `EntityForm` | Shared create/edit form, detects mode via route, required fields + secondary fields with divider |
```

- [ ] **Step 3: Add CRUD principle to design-principles.md**

After the Mobile List Pages section, add:

```markdown
## Admin CRUD Navigation

- List → Create: "创建" button on list page, navigates to `/admin/{entity}/create`.
- List → Detail: clicking a row/card navigates to `/admin/{entity}/:id`.
- Detail → Edit: "编辑" button on detail page, navigates to `/admin/{entity}/:id/edit`.
- Create/Edit share a single form component, detecting mode via route name.
- All navigation reflected in breadcrumb, tracking the operation path.
```

- [ ] **Step 4: Add CRUD checks to review-checklist.md**

In the Visual Consistency section, add:

```markdown
- [ ] **CRUD breadcrumb:** Create/edit/detail pages have multi-level breadcrumbs reflecting operation path.
- [ ] **Form grouping:** Required fields first under "基本信息", secondary fields separated by divider under "其他信息".
- [ ] **Detail page:** ID + status in header, info in 2-column cards, action bar at bottom.
- [ ] **Navigation:** List has "创建" button; row/card click navigates to detail; detail has edit/delete actions.
```

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/
git commit -m "feat(skill): add admin CRUD pattern to skill reference files"
```

---

### Task 7: Verify

**Files:**
- No file changes — verification only

- [ ] **Step 1: Start dev server, navigate through CRUD flow**

```bash
cd login-homepage-preview && npm run dev
```

- [ ] **Step 2: Verify list page** (`/admin/orders`)
  - "创建订单" button visible on desktop and mobile
  - Clicking a row/card navigates to detail

- [ ] **Step 3: Verify create flow** (`/admin/orders/create`)
  - Form shows empty fields, breadcrumb: `订单管理 / 创建订单`
  - Fill form → submit → redirects to list → new order appears

- [ ] **Step 4: Verify detail page** (`/admin/orders/:id`)
  - Shows all fields, breadcrumb: `订单管理 / ORD-xxx`
  - Edit button → navigates to edit page
  - Delete button → confirmation → redirects to list

- [ ] **Step 5: Verify edit flow** (`/admin/orders/:id/edit`)
  - Form pre-filled, breadcrumb: `订单管理 / ORD-xxx / 编辑`
  - Edit → submit → redirects to list → changes reflected

- [ ] **Step 6: Verify mobile and console errors**

Check at 390px: form fields stack vertically, submit button full-width. 0 console errors.
