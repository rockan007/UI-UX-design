# Breadcrumb Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all admin page `<h1>`+`<p>` headers with `el-breadcrumb` navigation, and add breadcrumb rules to skill reference files.

**Architecture:** Each page gets a breadcrumb replacing its header div. All existing pages are menu entry points (single-level breadcrumbs). Skill files get breadcrumb generation rules for future multi-level pages.

**Tech Stack:** Vue 3 + Element Plus `el-breadcrumb`

---

### Task 1: Update DashboardView.vue — Replace header with breadcrumb

**Files:**
- Modify: `login-homepage-preview/src/views/DashboardView.vue`

- [ ] **Step 1: Replace page header with breadcrumb**

Find:

```html
    <!-- Page Header -->
    <div class="mb-4 md:mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">{{ t('dashboard.title') }}</h1>
      <p class="text-sm text-neutral-500 mt-1">{{ t('dashboard.description') }}</p>
    </div>
```

Replace with:

```html
    <!-- Breadcrumb -->
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item>{{ t('dashboard.title') }}</el-breadcrumb-item>
    </el-breadcrumb>
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/DashboardView.vue
git commit -m "feat(demo): replace dashboard header with breadcrumb"
```

---

### Task 2: Update OrderManageView.vue — Replace header with breadcrumb

**Files:**
- Modify: `login-homepage-preview/src/views/OrderManageView.vue`

- [ ] **Step 1: Replace page header with breadcrumb**

Find:

```html
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">{{ t('orders.title') }}</h1>
      <p class="text-sm text-neutral-500 mt-1">{{ t('orders.description') }}</p>
    </div>
```

Replace with:

```html
    <!-- Breadcrumb -->
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item>{{ t('orders.title') }}</el-breadcrumb-item>
    </el-breadcrumb>
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/OrderManageView.vue
git commit -m "feat(demo): replace orders header with breadcrumb"
```

---

### Task 3: Update remaining 4 admin pages — Replace headers with breadcrumbs

**Files:**
- Modify: `login-homepage-preview/src/views/UserListView.vue`
- Modify: `login-homepage-preview/src/views/RoleManageView.vue`
- Modify: `login-homepage-preview/src/views/PermissionView.vue`
- Modify: `login-homepage-preview/src/views/SettingsView.vue`

- [ ] **Step 1: Read and update UserListView.vue**

Replace the entire content with a breadcrumb + placeholder layout:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div>
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item>{{ t('users.list.title') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-white rounded-btn border border-neutral-200 p-8 text-center text-sm text-neutral-500">
      {{ t('users.list.placeholder') }}
    </div>
  </div>
</template>
```

- [ ] **Step 2: Read and update RoleManageView.vue**

Replace the entire content:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div>
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item>{{ t('users.roles.title') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-white rounded-btn border border-neutral-200 p-8 text-center text-sm text-neutral-500">
      {{ t('users.roles.placeholder') }}
    </div>
  </div>
</template>
```

- [ ] **Step 3: Read and update PermissionView.vue**

Replace the entire content:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div>
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item>{{ t('users.permissions.title') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-white rounded-btn border border-neutral-200 p-8 text-center text-sm text-neutral-500">
      {{ t('users.permissions.placeholder') }}
    </div>
  </div>
</template>
```

- [ ] **Step 4: Read and update SettingsView.vue**

Replace the entire content:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div>
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item>{{ t('settings.title') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-white rounded-btn border border-neutral-200 p-8 text-center text-sm text-neutral-500">
      {{ t('settings.placeholder') }}
    </div>
  </div>
</template>
```

- [ ] **Step 5: Commit**

```bash
git add login-homepage-preview/src/views/UserListView.vue login-homepage-preview/src/views/RoleManageView.vue login-homepage-preview/src/views/PermissionView.vue login-homepage-preview/src/views/SettingsView.vue
git commit -m "feat(demo): replace admin page headers with breadcrumbs"
```

---

### Task 4: Update generation-rules.md — Add breadcrumb rule

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md`

- [ ] **Step 1: Add breadcrumb rule after the Detail Page section**

Find at the end of the file:

```markdown
Extra focus: key info above the fold, visible status and primary action, clear detail groupings, secondary info (history, logs, notes) not competing with primary, easy return to list.
```

Append after it:

```markdown

### Breadcrumb Navigation

Every admin page starts with an `el-breadcrumb` replacing the traditional `<h1>` header. The separator is `/`. Spacing: `mb-4 md:mb-6`.

**Rule:** Breadcrumbs reflect the functional operation path, NOT the sidebar menu hierarchy.

- Level 1 = current menu entry page (e.g., "用户列表", "订单管理")
- Level 2+ = operation depth (create form, detail record, sub-operation)
- Last level = current page, plain text, not clickable
- Previous levels = clickable `:to` links navigating to their respective pages

**Single-level (menu entry page):**

```html
<el-breadcrumb separator="/" class="mb-4 md:mb-6">
  <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
</el-breadcrumb>
```

**Multi-level (deeper pages):**

```html
<el-breadcrumb separator="/" class="mb-4 md:mb-6">
  <el-breadcrumb-item :to="{ path: '/admin/users/list' }">用户列表</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/admin/users/detail/ORD-001' }">ORD-001</el-breadcrumb-item>
  <el-breadcrumb-item>操作记录</el-breadcrumb-item>
</el-breadcrumb>
```
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "feat(skill): add breadcrumb navigation generation rule"
```

---

### Task 5: Update component-system.md — Add breadcrumb mapping

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/component-system.md`

- [ ] **Step 1: Add Breadcrumb to both tables**

Add to Base Components mapping table (after the `Tabs` row):

```markdown
| `Breadcrumb` | `Breadcrumb` | `ElBreadcrumb` + `ElBreadcrumbItem` |
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/component-system.md
git commit -m "feat(skill): add Breadcrumb component mapping"
```

---

### Task 6: Update review-checklist.md — Add breadcrumb check

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`

- [ ] **Step 1: Add breadcrumb check to Visual Consistency section**

Find the Visual Consistency section. After the bar chart check items, add:

```markdown
- [ ] **Breadcrumb:** Admin pages use `el-breadcrumb` instead of `<h1>` header. Separator is `/`. Last item is current page (not clickable). Earlier items have `:to` links. Reflects operation path, not sidebar hierarchy.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "feat(skill): add breadcrumb review checklist item"
```

---

### Task 7: Verify breadcrumbs render correctly

**Files:**
- No file changes — verification only

- [ ] **Step 1: Start dev server and navigate to admin pages**

```bash
cd login-homepage-preview && npm run dev
```

Navigate to each page and verify:
- `/admin` — breadcrumb shows "仪表盘"
- `/admin/orders` — breadcrumb shows "订单管理"
- `/admin/users/list` — breadcrumb shows "用户列表"
- `/admin/users/roles` — breadcrumb shows "角色管理"
- `/admin/users/permissions` — breadcrumb shows "权限管理"
- `/admin/settings` — breadcrumb shows "系统设置"

- [ ] **Step 2: Verify at 390px and 1440px**
  - Breadcrumb spacing correct at both widths
  - No console errors

- [ ] **Step 3: Commit any fixes if needed**
