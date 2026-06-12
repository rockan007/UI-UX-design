# Action Button Placement — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move admin list page create button into filter bar row (desktop) and breadcrumb row as circle "+" icon (mobile).

**Architecture:** Consolidate the action button into existing UI rows instead of giving it independent rows. Desktop: button joins the filter bar row with a spacer. Mobile: circle `+` icon sits in the breadcrumb row's top-right corner. Abstract the pattern into `vue3-element-ui-ux` skill reference files.

**Tech Stack:** Vue 3 + Element Plus + Tailwind CSS

---

### Task 1: Update OrderManageView.vue — Consolidate action button placement

**Files:**
- Modify: `login-homepage-preview/src/views/OrderManageView.vue:131-342`

- [ ] **Step 1: Remove standalone desktop create button row (lines 138-143)**

Delete this entire block:
```html
    <!-- Create Button: Desktop -->
    <div class="hidden md:flex items-center justify-end mb-3">
      <el-button type="primary" :icon="Plus" @click="router.push('/admin/orders/create')">
        {{ t('orders.createTitle') }}
      </el-button>
    </div>
```

- [ ] **Step 2: Add create button inside the desktop filter bar, right-aligned**

In the desktop filter bar div (line 162: `<div class="hidden md:flex flex-wrap items-center gap-3 bg-white rounded-btn border border-neutral-200 p-4 mb-4">`), add a spacer and the create button after the last `<el-select>` (channel filter) and before the closing `</div>`:

```html
      <div class="flex-1"></div>
      <el-button type="primary" :icon="Plus" @click="router.push('/admin/orders/create')">
        {{ t('orders.createTitle') }}
      </el-button>
```

The full filter bar div should look like:
```html
    <!-- Filter Bar: Desktop inline -->
    <div class="hidden md:flex flex-wrap items-center gap-3 bg-white rounded-btn border border-neutral-200 p-4 mb-4">
      <el-input
        v-model="searchKeyword"
        :placeholder="t('orders.searchPlaceholder')"
        :prefix-icon="Search"
        clearable
        class="w-64"
        @input="handleSearch"
        @clear="handleSearch"
      />
      <el-select
        v-model="statusFilter"
        :placeholder="t('orders.filterByStatus')"
        class="w-28"
        @change="handleFilterChange"
      >
        <el-option :label="t('common.all')" value="all" />
        <el-option v-for="(cfg, key) in statusMap" :key="key" :label="t(cfg.labelKey)" :value="key" />
      </el-select>
      <el-select
        v-model="channelFilter"
        :placeholder="t('orders.filterByChannel')"
        class="w-28"
        @change="handleFilterChange"
      >
        <el-option :label="t('common.all')" value="all" />
        <el-option label="APP" value="APP" />
        <el-option :label="t('orders.channel.web')" value="网页" />
        <el-option :label="t('orders.channel.miniprogram')" value="小程序" />
      </el-select>
      <div class="flex-1"></div>
      <el-button type="primary" :icon="Plus" @click="router.push('/admin/orders/create')">
        {{ t('orders.createTitle') }}
      </el-button>
    </div>
```

- [ ] **Step 3: Change mobile breadcrumb row to include circle "+" button**

Replace the breadcrumb block (lines 133-136):
```html
    <!-- Breadcrumb -->
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item>{{ t('orders.title') }}</el-breadcrumb-item>
    </el-breadcrumb>
```

With a flex row that holds both the breadcrumb and the mobile create button:
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

- [ ] **Step 4: Remove standalone mobile create button row (lines 337-342)**

Delete this entire block:
```html
    <!-- Create Button: Mobile -->
    <div class="flex md:hidden justify-end mb-2">
      <el-button type="primary" size="small" :icon="Plus" @click="router.push('/admin/orders/create')">
        {{ t('orders.createTitle') }}
      </el-button>
    </div>
```

- [ ] **Step 5: Start dev server and verify rendering**

Run: `cd login-homepage-preview && npm run dev`
Expected: Dev server starts. Navigate to `/admin/orders`.

Verify at 1440px: Create button is inside filter bar row, right-aligned.
Verify at 390px: Circle "+" button appears in breadcrumb row top-right. No bottom create button.

- [ ] **Step 6: Commit**

```bash
git add login-homepage-preview/src/views/OrderManageView.vue
git commit -m "feat(demo): consolidate admin list action button into filter bar (desktop) and breadcrumb row (mobile)"
```

---

### Task 2: Update skill reference files — Abstract action button placement rule

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md:159-161`
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md:116-117`

- [ ] **Step 1: Add "Action Button Placement" supplement to generation-rules.md**

After the Admin List Page section (after line 161: `Extra focus: compact filter area, scannable table, clear batch actions, not too many action columns, empty state with next step, mobile usability.`), add:

```markdown

### Admin List Page — Action Button Placement

Primary action buttons (e.g., "创建", "新增") do not occupy their own row. They are consolidated into existing UI rows:

**Desktop (≥768px):**

The create button lives inside the filter bar row, right-aligned via a spacer element:

```html
<!-- Filter Bar: Desktop — includes action button -->
<div class="hidden md:flex flex-wrap items-center gap-3 bg-white rounded-btn border border-neutral-200 p-4 mb-4">
  <el-input v-model="keyword" :placeholder="searchPlaceholder" :prefix-icon="Search" clearable class="w-64" />
  <el-select v-model="statusFilter" class="w-28">...</el-select>
  <el-select v-model="channelFilter" class="w-28">...</el-select>
  <div class="flex-1"></div>
  <el-button type="primary" :icon="Plus" @click="router.push('/admin/{entity}/create')">
    创建{entity}
  </el-button>
</div>
```

Key points:
- `<div class="flex-1"></div>` pushes the button to the right edge
- Button keeps text label on desktop — space is available
- No standalone button row above or below the filter bar

**Mobile (<768px):**

The create button becomes a compact `circle` icon button in the breadcrumb row's top-right corner:

```html
<div class="flex items-center justify-between mb-4 md:mb-6">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>{entity name}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-button
    type="primary"
    circle
    :icon="Plus"
    size="small"
    class="md:hidden"
    @click="router.push('/admin/{entity}/create')"
  />
</div>
```

Key points:
- `circle` + `:icon="Plus"` — icon-only, no text to save horizontal space
- `size="small"` — compact but still meets 44px tap target
- `class="md:hidden"` — hidden on desktop (desktop button is in filter bar)
- Breadcrumb `mb-4 md:mb-6` moves to the parent flex div — breadcrumb itself loses its margin
```

- [ ] **Step 2: Add review checklist item**

After line 116 (`- [ ] Primary action is visible on mobile.`), add:

```markdown
- [ ] **Action button placement:** Desktop create button inside filter bar row (right-aligned via spacer). Mobile create button is circle `+` icon in breadcrumb row top-right (`md:hidden`). No standalone button rows.
```

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "feat(skill): add admin list action button placement rule"
```
