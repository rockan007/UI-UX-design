# Form Layout Improvement — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- []) syntax for tracking.

**Goal:** Improve admin form page layout — toolbar buttons, section cards with accent stripes, wider 3-column grid, textarea at section end.

**Architecture:** Replace the single-card-with-dividers pattern with independent section cards (accent stripe + gap-4). Move action buttons to a toolbar row with breadcrumb. Remove max-w-2xl and use 3-column grid on desktop.

**Tech Stack:** Vue 3 + Element Plus + Tailwind CSS

---

### Task 1: Update OrderFormView.vue — Form layout overhaul

**Files:**
- Modify: `login-homepage-preview/src/views/OrderFormView.vue` (entire template section)

- [ ] **Step 1: Replace breadcrumb + add toolbar with action buttons**

Replace the breadcrumb block (lines 130-135):
```html
    <!-- Breadcrumb -->
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item :to="{ path: '/admin/orders' }">{{ t('orders.title') }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="isEdit" :to="{ path: `/admin/orders/${orderId}` }">{{ orderId }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
    </el-breadcrumb>
```

With a toolbar row containing breadcrumb + buttons:
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

- [ ] **Step 2: Replace single form card with section cards**

Replace the entire form card wrapper (lines 137-211 — the `<div class="bg-white rounded-btn border border-neutral-200 p-6 md:p-8 max-w-2xl">` and everything inside it) with:

```html
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit"
    >
      <!-- Section: 基本信息 -->
      <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">
        <div class="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">{{ $t('基本信息') }}</div>

        <!-- Grid row: customer, phone, amount -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <el-form-item :label="t('orders.fields.customer')" prop="customer">
            <el-input v-model="form.customer" placeholder="张三" />
          </el-form-item>
          <el-form-item :label="t('orders.fields.phone')" prop="phone">
            <el-input v-model="form.phone" placeholder="138****1234" />
          </el-form-item>
          <el-form-item :label="t('orders.fields.amount')" prop="amount">
            <el-input-number v-model="form.amount" :min="0" :precision="2" class="w-full" />
          </el-form-item>
        </div>

        <!-- Grid row: channel -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <el-form-item :label="t('orders.fields.channel')">
            <el-select v-model="form.channel" class="w-full">
              <el-option label="APP" value="APP" />
              <el-option :label="t('orders.channel.web')" value="网页" />
              <el-option :label="t('orders.channel.miniprogram')" value="小程序" />
            </el-select>
          </el-form-item>
        </div>

        <!-- Full-width at section end: dynamic item list -->
        <el-form-item :label="t('orders.fields.items')" class="mt-4 mb-0">
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
      </div>

      <!-- Section: 其他信息 -->
      <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-cyan-600 p-5 md:p-6">
        <div class="text-sm font-semibold text-cyan-700 mb-4 uppercase tracking-wide">{{ $t('其他信息') }}</div>

        <!-- Grid row: deliveryMethod -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <el-form-item :label="t('orders.fields.deliveryMethod')">
            <el-select v-model="form.deliveryMethod" class="w-full">
              <el-option :label="t('orders.fields.deliveryExpress')" value="快递" />
              <el-option :label="t('orders.fields.deliveryPickup')" value="自提" />
              <el-option :label="t('orders.fields.deliveryLocal')" value="同城配送" />
            </el-select>
          </el-form-item>
        </div>

        <!-- Full-width at section end: address textarea, remark textarea -->
        <el-form-item :label="t('orders.fields.address')" class="mt-4">
          <el-input v-model="form.address" type="textarea" :rows="2" :placeholder="t('orders.fields.addressPlaceholder')" />
        </el-form-item>
        <el-form-item :label="t('orders.fields.remark')" class="mb-0">
          <el-input v-model="form.remark" type="textarea" :rows="2" :placeholder="t('orders.fields.remarkPlaceholder')" />
        </el-form-item>
      </div>
    </el-form>
```

- [ ] **Step 3: Start dev server and verify rendering**

Run: `cd login-homepage-preview && npm run dev`
Expected: Dev server starts at http://localhost:5173.

Verify at `/admin/orders/create`:
- 1440px: Toolbar with breadcrumb left + Save/Cancel buttons right. Two section cards with blue/cyan left stripes, gap-4 between them. Fields in 3-column grid. Item list, address, remark full-width at section end.
- 390px: Toolbar compact. Single column fields. Cards full width with stripes.

- [ ] **Step 4: Commit**

```bash
git add login-homepage-preview/src/views/OrderFormView.vue
git commit -m "feat(demo): overhaul form layout — toolbar buttons, section cards with accent stripes, 3-col grid"
```

---

### Task 2: Update skill reference files — Abstract form layout rules

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md` (Form Page section, lines 194-196)
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md` (Form Experience section)

- [ ] **Step 1: Read current Form Page section in generation-rules.md**

Read lines 194-196 of `generation-rules.md` to confirm the current form page supplement content.

- [ ] **Step 2: Replace Form Page supplement with updated rules**

Replace the Form Page section (currently lines 194-196):
```
### Form Page

Extra focus: reasonable field grouping, clear required marks, errors near fields, explicit submit feedback, clear cancel/back/save actions, smooth mobile input.
```

With:

```markdown
### Admin Form Page

Extra focus: toolbar button placement, section card separation, wide layout with multi-column grid, full-width fields at section end.

**Toolbar:**

Action buttons (Save/Submit, Cancel) sit in a toolbar row with the breadcrumb — NOT at the bottom of the form:

```html
<div class="flex items-center justify-between mb-4 md:mb-6">
  <el-breadcrumb separator="/">...</el-breadcrumb>
  <div class="flex items-center gap-3">
    <el-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
      {{ isEdit ? '保存' : '提交' }}
    </el-button>
    <el-button plain @click="router.back()">取消</el-button>
  </div>
</div>
```

Key points:
- Primary button: `type="primary"` (solid blue)
- Secondary button: `plain` (white bg, gray border — lower visual weight)
- Both buttons right-aligned via `justify-between` on the flex row
- Submit button uses `:loading` + `:disabled` to prevent double-submit

**Section Cards:**

Each form section is an independent card with left accent stripe, replacing the single-card-with-dividers pattern:

```html
<el-form label-position="top" class="flex flex-col gap-4">
  <!-- Section 1 -->
  <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">
    <div class="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">基本信息</div>
    <!-- fields... -->
  </div>
  <!-- Section 2 -->
  <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-cyan-600 p-5 md:p-6">
    <div class="text-sm font-semibold text-cyan-700 mb-4 uppercase tracking-wide">其他信息</div>
    <!-- fields... -->
  </div>
</el-form>
```

Key points:
- `el-form` uses `class="flex flex-col gap-4"` to space the cards
- Accent stripe color matches data category: blue for primary/required sections, cyan for secondary sections per `design-tokens.md`
- Section title color matches stripe color
- No `max-w-2xl` constraint — form uses available width

**Field Grid:**

Desktop fields use 3-column grid with short inputs in grid rows and full-width fields at section end:

```html
<!-- Grid row: 3 columns for standard fields -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <el-form-item label="Field 1" prop="field1"><el-input ... /></el-form-item>
  <el-form-item label="Field 2" prop="field2"><el-input ... /></el-form-item>
  <el-form-item label="Field 3" prop="field3"><el-input ... /></el-form-item>
</div>

<!-- Grid row: single field taking 1 of 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
  <el-form-item label="Single Field"><el-select ... class="w-full" /></el-form-item>
</div>

<!-- Full-width at section end: textarea -->
<el-form-item label="Address" class="mt-4">
  <el-input type="textarea" :rows="2" ... />
</el-form-item>
```

Key points:
- Standard fields: `grid grid-cols-1 md:grid-cols-3 gap-4`
- Each grid row is a separate `<div>` — rows are stacked with `mt-4` spacing
- Full-width fields (textarea, dynamic item list): placed at the END of the section, after all grid rows, each wrapped in a standalone `<el-form-item>`
- `label-position="top"` on `el-form` for all fields
- Mobile: `grid-cols-1` naturally stacks everything
```

- [ ] **Step 3: Add form layout check items to review-checklist.md**

In `review-checklist.md`, after line 71 (`- [ ] Double-submit is prevented (button loading + disabled).`), add:

```markdown
- [ ] **Form toolbar:** Action buttons in toolbar row with breadcrumb (`justify-between`). Primary `type="primary"`, secondary `plain`. Not at form bottom.
- [ ] **Section cards:** Each section is independent card with left accent stripe (`border-l-[3px]`). Cards separated by `gap-4`. No single-card-with-dividers pattern.
- [ ] **Field grid:** Desktop uses `grid-cols-3`. Textarea and dynamic lists are full-width at section end, after grid rows. Multiple grid rows stacked with `mt-4`.
- [ ] **Form width:** No `max-w-2xl` constraint. Form uses available content width.
```

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "feat(skill): add admin form page layout rules — toolbar, section cards, 3-col grid"
```
