# Role Management — Design Spec

**Date**: 2026-06-15
**Status**: Implemented

## Scope

Implement role management with list page (CRUD table) and form page (create/edit with permission tree).

## Role List Page (`/admin/users/roles`)

**Pattern**: OrderManageView admin list

- 3 summary cards: 角色总数 / 已分配用户 / 未使用角色
- Filter bar: search + spacer + 新建角色 button
- Desktop: el-table (role name, description, user count, permission summary as el-tags, actions)
- Actions: edit + delete (icon-only, 2 buttons → width 90px)
- Mobile: card list + el-dropdown
- Pagination
- Mock data: 5 roles with varied permissions

## Role Form Page (create/edit)

**Pattern**: OrderFormView admin form (2 section cards, no tabs needed)

- Route: `/admin/users/roles/create` + `/admin/users/roles/:id/edit`
- Shared RoleFormView component, detects mode via route name
- Section 1 (blue): role name + description textarea
- Section 2 (purple): el-tree with checkboxes, hierarchical permission tree
- Permission tree: modules → operations (view/create/edit/delete)
- Toolbar: breadcrumb + save/cancel buttons
- Mobile: flat section cards

## Router Changes

Add two new routes as children of `/admin`:
- `/admin/users/roles/create` → RoleFormView
- `/admin/users/roles/:id/edit` → RoleFormView

## i18n

Add `users.roles.*` keys for list and form.
