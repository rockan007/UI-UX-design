# Breadcrumb Single-Level: Restore Title + Subtitle

**Date:** 2026-06-15
**Status:** approved

## Problem

Commit `3b8c0c1` replaced all admin page headers with `<el-breadcrumb>`. For pages with a single
breadcrumb level (Dashboard, User List, etc.), this produces a lonely, single-item breadcrumb
that looks like a clickable link but goes nowhere, losing the page heading hierarchy and
descriptive subtitle that previously existed.

## Design

### Rule

- **Single breadcrumb item** → show `<h1>` title + `<p>` subtitle (restore original style)
- **Multi-level breadcrumb** (2+ items) → keep `<el-breadcrumb>` as-is

### Pages to change (6 files)

Replace the single-item `<el-breadcrumb>` with title + subtitle:

| File | Title key | Description key |
|---|---|---|
| `DashboardView.vue` | `dashboard.title` | `dashboard.description` |
| `OrderManageView.vue` | `orders.title` | `orders.description` |
| `UserListView.vue` | `users.list.title` | `users.list.description` |
| `RoleManageView.vue` | `users.roles.title` | `users.roles.description` |
| `PermissionView.vue` | `users.permissions.title` | `users.permissions.description` |
| `SettingsView.vue` | `settings.title` | `settings.description` |

### Template

**Remove:**
```html
<el-breadcrumb separator="/" class="mb-4 md:mb-6">
  <el-breadcrumb-item>{{ t('<title-key>') }}</el-breadcrumb-item>
</el-breadcrumb>
```

**Add:**
```html
<div class="mb-4 md:mb-6">
  <h1 class="text-2xl font-semibold text-neutral-950">{{ t('<title-key>') }}</h1>
  <p class="text-sm text-neutral-500 mt-1">{{ t('<description-key>') }}</p>
</div>
```

### Pages NOT changed

- **RoleFormView.vue** — has 2 breadcrumb levels (Roles / Create or Edit)
- **OrderFormView.vue** — has 2 breadcrumb levels (Orders / Create, Edit, or Detail)

### i18n

No changes needed. All `*.description` keys already exist in `zh.json` and `en.json`.

### Skill update

After implementation, add a rule to `vue3-element-ui-ux` generation rules reference:
- Single-level page → use `<h1>` + `<p>` title/subtitle header
- Multi-level page → use `<el-breadcrumb>` for navigation hierarchy

## Verification

1. Run `npm run dev`, inspect at 1440px, 1024px, 768px, 390px
2. Confirm all 6 single-level pages show title + subtitle
3. Confirm RoleFormView and OrderFormView breadcrumbs are unchanged
4. Confirm `npm run build` passes without errors
