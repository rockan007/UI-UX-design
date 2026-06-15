# Breadcrumb Single-Level: Restore Title + Subtitle — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace single-item `<el-breadcrumb>` with `<h1>` title + `<p>` subtitle on 6 admin pages that have no breadcrumb navigation hierarchy.

**Architecture:** Pure template change — swap one HTML block for another in each of the 6 view files. No new files, no logic changes, no i18n changes (all description keys already exist).

**Tech Stack:** Vue 3 + Element Plus + Tailwind CSS

---

### Task 1: DashboardView — restore title + subtitle

**Files:**
- Modify: `login-homepage-preview/src/views/DashboardView.vue:36-38`

- [ ] **Step 1: Replace single-item breadcrumb with title + subtitle**

Find (lines 36-38):
```html
    <!-- Breadcrumb -->
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item>{{ t('dashboard.title') }}</el-breadcrumb-item>
    </el-breadcrumb>
```

Replace with:
```html
    <!-- Page Header -->
    <div class="mb-4 md:mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">{{ t('dashboard.title') }}</h1>
      <p class="text-sm text-neutral-500 mt-1">{{ t('dashboard.description') }}</p>
    </div>
```

- [ ] **Step 2: Verify build passes**

Run: `cd login-homepage-preview && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/views/DashboardView.vue
git commit -m "feat(demo): restore title + subtitle on DashboardView, replacing single-item breadcrumb"
```

---

### Task 2: OrderManageView — restore title + subtitle (keep mobile create button)

**Files:**
- Modify: `login-homepage-preview/src/views/OrderManageView.vue:145-158`

- [ ] **Step 1: Replace breadcrumb with title + subtitle in flex row**

Find (lines 145-158):
```html
    <!-- Breadcrumb + Mobile Create -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ t('orders.title') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        type="primary"
        circle
        :icon="Plus"
        size="small"
        class="md:hidden"
        @click="router.push('/admin/orders/create')"
      />
    </div>
```

Replace with:
```html
    <!-- Page Header + Mobile Create -->
    <div class="flex items-start justify-between mb-4 md:mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-neutral-950">{{ t('orders.title') }}</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ t('orders.description') }}</p>
      </div>
      <el-button
        type="primary"
        circle
        :icon="Plus"
        size="small"
        class="md:hidden"
        @click="router.push('/admin/orders/create')"
      />
    </div>
```

Note: Changed `items-center` to `items-start` so the two-line title+subtitle block aligns naturally with the button.

- [ ] **Step 2: Verify build passes**

Run: `cd login-homepage-preview && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/views/OrderManageView.vue
git commit -m "feat(demo): restore title + subtitle on OrderManageView, replacing single-item breadcrumb"
```

---

### Task 3: UserListView — restore title + subtitle (keep mobile create button)

**Files:**
- Modify: `login-homepage-preview/src/views/UserListView.vue:113-126`

- [ ] **Step 1: Replace breadcrumb with title + subtitle in flex row**

Find (lines 113-126):
```html
    <!-- Breadcrumb + Mobile Create -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ t('users.list.title') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        type="primary"
        circle
        :icon="Plus"
        size="small"
        class="md:hidden"
        @click="ElMessage.info('新建用户（待实现）')"
      />
    </div>
```

Replace with:
```html
    <!-- Page Header + Mobile Create -->
    <div class="flex items-start justify-between mb-4 md:mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-neutral-950">{{ t('users.list.title') }}</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ t('users.list.description') }}</p>
      </div>
      <el-button
        type="primary"
        circle
        :icon="Plus"
        size="small"
        class="md:hidden"
        @click="ElMessage.info('新建用户（待实现）')"
      />
    </div>
```

- [ ] **Step 2: Verify build passes**

Run: `cd login-homepage-preview && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/views/UserListView.vue
git commit -m "feat(demo): restore title + subtitle on UserListView, replacing single-item breadcrumb"
```

---

### Task 4: RoleManageView — restore title + subtitle (keep mobile create button)

**Files:**
- Modify: `login-homepage-preview/src/views/RoleManageView.vue:101-114`

- [ ] **Step 1: Replace breadcrumb with title + subtitle in flex row**

Find (lines 101-114):
```html
    <!-- Breadcrumb + Mobile Create -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ t('users.roles.title') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        type="primary"
        circle
        :icon="Plus"
        size="small"
        class="md:hidden"
        @click="router.push('/admin/users/roles/create')"
      />
    </div>
```

Replace with:
```html
    <!-- Page Header + Mobile Create -->
    <div class="flex items-start justify-between mb-4 md:mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-neutral-950">{{ t('users.roles.title') }}</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ t('users.roles.description') }}</p>
      </div>
      <el-button
        type="primary"
        circle
        :icon="Plus"
        size="small"
        class="md:hidden"
        @click="router.push('/admin/users/roles/create')"
      />
    </div>
```

- [ ] **Step 2: Verify build passes**

Run: `cd login-homepage-preview && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/views/RoleManageView.vue
git commit -m "feat(demo): restore title + subtitle on RoleManageView, replacing single-item breadcrumb"
```

---

### Task 5: PermissionView — restore title + subtitle

**Files:**
- Modify: `login-homepage-preview/src/views/PermissionView.vue:7-10`

- [ ] **Step 1: Replace single-item breadcrumb with title + subtitle**

Find (lines 7-10):
```html
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item>{{ t('users.permissions.title') }}</el-breadcrumb-item>
    </el-breadcrumb>
```

Replace with:
```html
    <div class="mb-4 md:mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">{{ t('users.permissions.title') }}</h1>
      <p class="text-sm text-neutral-500 mt-1">{{ t('users.permissions.description') }}</p>
    </div>
```

- [ ] **Step 2: Verify build passes**

Run: `cd login-homepage-preview && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/views/PermissionView.vue
git commit -m "feat(demo): restore title + subtitle on PermissionView, replacing single-item breadcrumb"
```

---

### Task 6: SettingsView — restore title + subtitle (keep save button)

**Files:**
- Modify: `login-homepage-preview/src/views/SettingsView.vue:52-62`

- [ ] **Step 1: Replace breadcrumb with title + subtitle in toolbar row**

Find (lines 52-62):
```html
    <!-- Toolbar: breadcrumb + actions -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ t('settings.title') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="flex items-center gap-3">
        <el-button type="primary" :loading="saving" :disabled="saving" @click="handleSave">
          {{ t('common.save') }}
        </el-button>
      </div>
    </div>
```

Replace with:
```html
    <!-- Toolbar: page header + actions -->
    <div class="flex items-start justify-between mb-4 md:mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-neutral-950">{{ t('settings.title') }}</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ t('settings.description') }}</p>
      </div>
      <div class="flex items-center gap-3 pt-1">
        <el-button type="primary" :loading="saving" :disabled="saving" @click="handleSave">
          {{ t('common.save') }}
        </el-button>
      </div>
    </div>
```

Note: Changed `items-center` to `items-start` and added `pt-1` to the button container for optical alignment with the title.

- [ ] **Step 2: Verify build passes**

Run: `cd login-homepage-preview && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/views/SettingsView.vue
git commit -m "feat(demo): restore title + subtitle on SettingsView, replacing single-item breadcrumb"
```

---

### Task 7: Visual verification

- [ ] **Step 1: Start dev server**

Run: `cd login-homepage-preview && npm run dev`

- [ ] **Step 2: Verify all 6 pages at 1440px**

Navigate to each of these URLs and snapshot:
- `/admin` (DashboardView) — should show "仪表盘" title + "过去 30 天的核心数据概览" subtitle
- `/admin/orders` (OrderManageView) — should show "订单管理" title + "查看和处理客户订单" subtitle
- `/admin/users/list` (UserListView) — should show "用户列表" title + subtitle
- `/admin/users/roles` (RoleManageView) — should show "角色管理" title + subtitle
- `/admin/users/permissions` (PermissionView) — should show "权限管理" title + subtitle
- `/admin/settings` (SettingsView) — should show "系统设置" title + subtitle

- [ ] **Step 3: Verify RoleFormView breadcrumb is unchanged**

Navigate to `/admin/users/roles/create` — should still show "角色管理 / 创建角色" as breadcrumb.

- [ ] **Step 4: Verify OrderFormView breadcrumb is unchanged**

Navigate to `/admin/orders/create` — should still show "订单管理 / 创建订单" as breadcrumb.

- [ ] **Step 5: Verify responsive at 768px and 390px**

Check at least DashboardView and SettingsView at 768px and 390px — title should wrap gracefully, save/create buttons should still be visible.

- [ ] **Step 6: Commit if any fixes were needed, then done**

---

### Task 8: Update vue3-element-ui-ux skill — document the rule

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md`

- [ ] **Step 1: Add page header rule to generation rules**

Add under the "Page Header" section (create one if it doesn't exist):

```markdown
### Page Header

- **Single-level page** (no parent breadcrumb): use `<h1>` title + `<p>` subtitle.
  ```html
  <div class="mb-4 md:mb-6">
    <h1 class="text-2xl font-semibold text-neutral-950">{{ t('page.title') }}</h1>
    <p class="text-sm text-neutral-500 mt-1">{{ t('page.description') }}</p>
  </div>
  ```
- **Multi-level page** (has parent/child navigation): use `<el-breadcrumb>` with clickable parent items.
  ```html
  <el-breadcrumb separator="/" class="mb-4 md:mb-6">
    <el-breadcrumb-item :to="{ path: '/admin/parent' }">{{ t('parent.title') }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ t('page.title') }}</el-breadcrumb-item>
  </el-breadcrumb>
  ```
```

- [ ] **Step 2: Verify the skill file is well-formed**

Read the file to confirm the addition is syntactically correct markdown and follows existing conventions.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "feat(skill): add page header rule — single-level title+subtitle, multi-level breadcrumb"
```
