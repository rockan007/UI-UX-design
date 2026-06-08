# Admin Layout: Header Bar + Multi-level Sidebar

**Date:** 2026-06-08  
**Status:** approved  
**Scope:** login-homepage-preview

## Goal

Extract the hardcoded admin dashboard layout into a reusable `AdminLayout` with a top header bar and a multi-level collapsible sidebar, shared by all `/admin/*` pages.

## Current State

- `DashboardView.vue` has its own `<aside>` sidebar (4 flat menu items) and no header bar
- No shared layout system exists — each page is standalone
- No `src/layouts/` directory, no `src/components/` reusables

## Header Bar (AdminHeader)

| Position | Content |
|----------|---------|
| Left | System icon + system name ("管理系统") |
| Right | Notification badge (`el-badge`) → language switcher (`el-dropdown`) → user avatar dropdown (`el-dropdown` with "Admin ▼") |

## Sidebar (AdminSidebar)

- **No logo area** — system identity lives in the header
- **Collapse toggle**: ☰ hamburger icon at top-right, toggles `el-menu` `collapse` property
- **Collapsed**: 64px wide, icons only with `el-tooltip` on hover
- **Expanded**: 220px wide, icon + label text
- **Submenu expand icon**: line-style chevron (`ArrowRight`), not filled triangle
- **Mobile**: `el-drawer` (260px, left side, no header) — preserves existing pattern

### Menu Structure

```ts
const menuItems = [
  { path: '/admin',          title: '仪表盘',   icon: 'DataAnalysis' },
  { path: '/admin/users',    title: '用户管理', icon: 'User', children: [
    { path: '/admin/users/list',        title: '用户列表' },
    { path: '/admin/users/roles',       title: '角色管理' },
    { path: '/admin/users/permissions', title: '权限管理' },
  ]},
  { path: '/admin/orders',   title: '订单管理', icon: 'List' },
  { path: '/admin/settings', title: '系统设置', icon: 'Setting' },
]
```

## Route Restructure

```
/admin → AdminLayout (layout wrapper)
  ├── /admin              → DashboardView (redirect/default child)
  ├── /admin/users/list   → UserListView
  ├── /admin/users/roles  → RoleManageView
  ├── /admin/users/permissions → PermissionView
  ├── /admin/orders       → OrderManageView
  └── /admin/settings     → SettingsView
```

## File Changes

| Action | File |
|--------|------|
| **New** | `src/layouts/AdminLayout.vue` |
| **New** | `src/components/AdminHeader.vue` |
| **New** | `src/components/AdminSidebar.vue` |
| **Modify** | `src/router/index.ts` — add nested routes under `/admin` |
| **Modify** | `src/views/DashboardView.vue` — strip sidebar/header, keep content only |
| **New** | `src/views/UserListView.vue` — placeholder page |
| **New** | `src/views/RoleManageView.vue` — placeholder page |
| **New** | `src/views/PermissionView.vue` — placeholder page |
| **New** | `src/views/OrderManageView.vue` — placeholder page |
| **New** | `src/views/SettingsView.vue` — placeholder page |

## Component Tree

```
AdminLayout
├── AdminHeader
│   ├── el-badge (notifications)
│   ├── el-dropdown (language)
│   └── el-dropdown (user avatar)
├── AdminSidebar
│   └── el-menu (router mode, collapse)
│       ├── el-menu-item (仪表盘, 订单管理, 系统设置)
│       └── el-sub-menu (用户管理)
│           ├── el-menu-item (用户列表)
│           ├── el-menu-item (角色管理)
│           └── el-menu-item (权限管理)
└── el-main > router-view
```

## States to Cover

- Loading / empty / error for each content page
- Sidebar collapse transition (CSS via `--el-menu-*` variables)
- Mobile drawer open/close
- Active menu highlighting via router
- Notification badge count (mock data)
- Dropdown open/close, hover/focus

## Design Constraints

- Element Plus components only, no other UI framework
- Tailwind CSS for layout/spacing only, not for component styling
- Override theme via CSS custom properties in `src/style.css`
- Icons from `@element-plus/icons-vue`

## Out of Scope

- Auth guards / login redirect (not yet requested)
- Real notification data / API integration
- Actual content for placeholder pages (UserListView, etc.)
