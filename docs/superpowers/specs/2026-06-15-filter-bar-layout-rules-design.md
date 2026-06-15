# Filter Bar Layout Rules

**Date:** 2026-06-15
**Status:** approved

## Problem

The current filter bar rule in `generation-rules.md` uses a fixed `w-64` (256px) on search inputs and has no explicit rule about where filter-action buttons should be placed relative to the `flex-1` spacer.

## Design

### Rule 1: Search input minimum width

Search inputs (`el-input` with `:prefix-icon="Search"`) in filter bars use `min-w-[200px]` instead of a fixed width. This sets a lower bound while allowing the input to grow when space is available.

### Rule 2: Select dropdown minimum width

Filter select dropdowns (`el-select`) in filter bars use `min-w-[150px]` instead of fixed widths. This ensures readable option text while allowing the dropdown to flex.

### Rule 3: Button placement in filter bar

When a filter bar contains both filter-related buttons (Search trigger, Reset, Apply) and primary action buttons (Create, Add):

- **Filter-related buttons** are placed immediately after the filter controls, BEFORE the `flex-1` spacer.
- **Primary action buttons** (Create, Add) are placed AFTER the `flex-1` spacer, right-aligned.

Layout order: `[filter controls] [filter buttons] [spacer] [action buttons]`

### Template

```html
<div class="hidden md:flex flex-wrap items-center gap-3 bg-white rounded-btn border border-neutral-200 p-4 mb-4">
  <el-input v-model="keyword" :placeholder="searchPlaceholder" :prefix-icon="Search" clearable class="min-w-[200px]" />
  <el-select v-model="statusFilter" class="min-w-[150px]">...</el-select>
  <el-select v-model="channelFilter" class="min-w-[150px]">...</el-select>
  <el-button @click="handleReset">重置</el-button>
  <div class="flex-1"></div>
  <el-button type="primary" :icon="Plus">创建{entity}</el-button>
</div>
```

Key points:
- Search input: `min-w-[200px]` (not fixed `w-64`)
- Select dropdowns: `min-w-[150px]` (not fixed `w-28`)
- Filter buttons: adjacent to filter controls, before spacer
- `<div class="flex-1">` pushes everything after it to the right
- Action button: after spacer, with text label on desktop

### Files to update

- `.claude/skills/vue3-element-ui-ux/references/generation-rules.md` — Admin List Page → Action Button Placement section

### Verification

- Run `npm run build` to confirm no breakage
- Inspect filter bar pages (UserListView, OrderManageView) at 1440px and 768px
