# Breadcrumb Navigation Design

**Date:** 2026-06-12
**Status:** Approved
**Scope:** Vue demo pages + `vue3-element-ui-ux` skill reference files

## Problem

Admin pages currently use `<h1>` + `<p>` page headers. When users navigate deeper (list → detail → sub-page), there's no visual path indicator to help them understand their location or navigate back to previous levels.

## Solution

Replace page headers with `el-breadcrumb` from Element Plus.

### Breadcrumb Rule

Breadcrumbs reflect the functional operation path, NOT the sidebar menu hierarchy:

- **Level 1:** The current menu entry page (e.g., "用户列表", "订单管理")
- **Level 2+:** Operation depth (create form, detail record, sub-operation)
- **Last level:** Current page — plain text, not clickable
- **Previous levels:** Links that navigate to their respective pages

**Separator:** `/`

### Single-level pages (menu entry pages — current demo pages)

| Page | Breadcrumb |
|---|---|
| DashboardView | `仪表盘` |
| OrderManageView | `订单管理` |
| UserListView | `用户列表` |
| RoleManageView | `角色管理` |
| PermissionView | `权限管理` |
| SettingsView | `系统设置` |

### Multi-level pages (future — when deeper pages are added)

```
用户列表 → 创建         →  用户列表 / 创建
用户列表 → 详情         →  用户列表 / ORD-001
用户列表 → 详情 → 操作   →  用户列表 / ORD-001 / 操作记录
```

### Template

```html
<el-breadcrumb separator="/" class="mb-4 md:mb-6">
  <el-breadcrumb-item :to="{ path: '/admin/users/list' }">用户列表</el-breadcrumb-item>
  <el-breadcrumb-item>创建</el-breadcrumb-item>
</el-breadcrumb>
```

- Spacing matches original header: `mb-4 md:mb-6`
- Last item text acts as the page title — no separate `<h1>` needed
- `:to` for clickable items, plain text for current page

## Skill Reference File Changes

| File | Changes |
|---|---|
| `references/generation-rules.md` | Add breadcrumb generation rule and template |
| `references/component-system.md` | Add `Breadcrumb` → `el-breadcrumb` mapping |
| `references/review-checklist.md` | Add breadcrumb checks |

## Demo Page Changes

| File | Changes |
|---|---|
| DashboardView.vue | Replace `<h1>`+`<p>` with breadcrumb |
| OrderManageView.vue | Replace `<h1>`+`<p>` with breadcrumb |
| UserListView.vue | Replace placeholder with breadcrumb |
| RoleManageView.vue | Replace placeholder with breadcrumb |
| PermissionView.vue | Replace placeholder with breadcrumb |
| SettingsView.vue | Replace placeholder with breadcrumb |
