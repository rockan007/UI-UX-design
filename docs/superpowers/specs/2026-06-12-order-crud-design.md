# Order Management CRUD Design

**Date:** 2026-06-12
**Status:** Approved
**Scope:** OrderManageView + new pages + skill reference files

## New Routes

| Route | Page | Breadcrumb |
|---|---|---|
| `/admin/orders` | List (existing) | 订单管理 |
| `/admin/orders/create` | Create order | 订单管理 / 创建订单 |
| `/admin/orders/:id` | View detail | 订单管理 / ORD-...001 |
| `/admin/orders/:id/edit` | Edit order | 订单管理 / ORD-...001 / 编辑 |

## Order Form (create/edit shared)

| Field | Type | Required | Shown in List |
|---|---|---|---|
| 客户名称 | text | ✅ | ✅ |
| 手机号 | text | ✅ | ✅ |
| 商品清单 | dynamic rows (add/remove) | ✅ | ✅ (tags) |
| 金额 | number | ✅ | ✅ |
| 渠道 | select (APP/网页/小程序) | ✅ | ✅ |
| 收货地址 | textarea | — | — |
| 配送方式 | select (快递/自提/同城配送) | — | — |
| 备注 | textarea | — | — |

- Create mode: empty form, submit adds to mock data
- Edit mode: form pre-filled with existing order data, submit updates mock data
- Status is not in the form — managed through order operations

## Order Detail Page

- Header: order ID + status badge
- Full field display (all 8 fields including secondary)
- Bottom action bar: Edit button, Delete button (with confirmation)
- Breadcrumb: `订单管理 / ORD-xxx`

## List Page Changes

- "创建订单" button: desktop above table, mobile above card list
- Card/row click navigates to detail page

## Skill Constraints to Extract

### generation-rules.md
- Admin CRUD pattern: list → create → detail → edit flow
- Shared form component pattern (create/edit via `:id` detection)
- Breadcrumb multi-level pattern for CRUD pages
- Mobile card list: "create" button placement pattern

### component-system.md
- `OrderForm` → `ElForm` + `ElFormItem` + dynamic field rows
- Form field layout: required fields first, secondary fields below with section divider

### review-checklist.md
- CRUD flow: create → success feedback → appears in list
- Edit flow: pre-fill → submit → detail reflects changes
- Delete flow: confirmation → remove from list
- Breadcrumb: operation path correct
- Mobile: form fields stack vertically, submit button full-width

### design-principles.md
- Form field grouping: required fields first, secondary fields separated by divider
- CRUD navigation: list → create/detail → edit, with breadcrumb reflecting operation depth

## Demo Pages

| File | Action |
|---|---|
| `OrderManageView.vue` | Add "创建订单" button, card/row click → detail |
| `OrderFormView.vue` | New: create/edit order form |
| `OrderDetailView.vue` | New: order detail page |
| `router/index.ts` | Add 3 new routes |
