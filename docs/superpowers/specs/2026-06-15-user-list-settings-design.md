# User List & System Settings — Design Spec

**Date**: 2026-06-15  
**Status**: Implemented

## Scope

1. Fix Vue template compilation error (`name@example.com` placeholder)
2. Implement UserListView (standard CRUD admin table)
3. Implement SettingsView (tabbed system config form)

## Fix: Compilation Error

- **Problem**: `name@example.com` in locale files triggers Vue SFC compiler "Invalid linked format" errors
- **Fix**: Replace with `example.com` in `zh.json` and `en.json`

## UserListView — Design

**Pattern**: Follows OrderManageView list page pattern

**Structure**:
- Breadcrumb: "用户列表"
- 3 summary cards: 用户总数 / 活跃用户 / 已禁用
- Filter bar: search (username/email) + role select + status select + "新建用户" button
- Desktop: el-table with columns: username, email, role, status (el-tag), registered date, actions (edit + delete, icon-only with el-tooltip)
- Mobile: card list + el-dropdown actions
- Pagination: el-pagination (desktop), prev/next (mobile)
- Mock data: 8-10 users across roles (管理员/编辑/查看者) and statuses (启用/禁用)

## SettingsView — Design

**Pattern**: Follows OrderFormView form page pattern

**Tabs & Fields** (color-coded sections with `border-l-[3px]`):
- **基础设置** (blue): 站点名称, Logo URL, 管理员邮箱, 站点描述 (textarea)
- **安全设置** (cyan): 密码最小长度 (input-number), 登录失败锁定次数, 会话超时分钟
- **通知设置** (purple): 邮件通知开关 (el-switch), 短信通知开关, 通知邮箱

**Layout**:
- Desktop: el-tabs + section cards per tab
- Mobile: flat section cards (no tabs)
- Global "保存设置" button at bottom, ElMessage.success on save
