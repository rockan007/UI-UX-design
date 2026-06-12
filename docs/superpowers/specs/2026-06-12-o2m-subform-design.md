# O2M Sub-Form Fields — Design Spec

**Date:** 2026-06-12
**Status:** Approved

## Goal

Upgrade the order items dynamic list from a single text input per item to a structured
multi-field sub-form with name, spec, quantity, unit price, and auto-calculated subtotal.

## Current State

- `OrderItem` interface: `{ name: string }`
- Each item: one `<el-input>` + delete button
- View mode: `<el-tag>` list of item names

## Proposed Design

### Data Model

```typescript
interface OrderItem {
  name: string        // 商品名称
  spec: string        // 规格/型号
  quantity: number    // 数量
  unitPrice: number   // 单价
  // subtotal = quantity × unitPrice (computed, not stored)
}
```

Default values: `{ name: '', spec: '', quantity: 1, unitPrice: 0 }`

### Desktop Layout (Grid Row)

Column headers + grid rows within the section card:

```
┌─ 基本信息 ──────────────────────────────────────────────────┐
│ 客户名称    │ 手机号        │ 金额                           │
│ 渠道        │               │                                │
│                                                              │
│ 商品清单                                                     │
│ 商品名称 ↑     │ 规格     │ 数量  │ 单价    │ 小计    │ [ ]  │
│ ─────────────────────────────────────────────────────────── │
│ iPhone 16 Pro  │ 256GB    │   2   │ 8,999   │ 17,998  │  ×   │
│ AirPods Pro    │ USB-C    │   1   │ 1,999   │ 1,999   │  ×   │
│ ─────────────────────────────────────────────────────────── │
│ [+ 添加商品]                                                 │
└──────────────────────────────────────────────────────────────┘
```

**Column widths:** `grid-template-columns: 2fr 1fr 80px 1fr 100px 40px`

| Col | Field | Width | Align |
|---|---|---|---|
| 1 | 商品名称 | 2fr | left |
| 2 | 规格/型号 | 1fr | left |
| 3 | 数量 | 80px | center |
| 4 | 单价 | 1fr | right |
| 5 | 小计 | 100px | right |
| 6 | 删除 | 40px | center |

**Key details:**
- Column headers: `text-xs text-neutral-400` with bottom border separator
- Quantity and unit price use `el-input-number` with `:min="1"` and `:min="0"` respectively
- Subtotal is read-only: `item.quantity × item.unitPrice` displayed formatted via `$n()`
- Delete button: `el-button link type="danger" :icon="Delete"` per row
- Add button: `el-button link type="primary" :icon="Plus"` below last row

### Auto-calculation

```typescript
function itemSubtotal(item: OrderItem): number {
  return (item.quantity || 0) * (item.unitPrice || 0)
}

// Optional: watch items to auto-update main form amount
// form.amount = sum of all item subtotals
```

### View Mode

Each row renders as read-only text, maintaining the same grid layout but replacing inputs with text:

| name (text) | spec (text) | quantity (text) | unitPrice ($n) | subtotal ($n, bold) | — |

Column headers hidden in view mode (redundant — field labels are self-explanatory from context).

### Mobile (<768px)

Each sub-item switches to a compact card layout within the list:

```
┌─────────────────────────────┐
│ iPhone 16 Pro Max           │
│ 256GB · 数量: 2 · ¥8,999   │
│ 小计: ¥17,998         [×]  │
└─────────────────────────────┘
```

Implementation: grid switches from `grid-cols-[2fr_1fr_80px_1fr_100px_40px]` to a stacked card display via CSS. Use `hidden md:grid` / `md:hidden` approach.

### Mock Data Update

Update `__mockOrders` items from `string[]` to `OrderItem[]`:
```typescript
items: [
  { name: 'iPhone 16 Pro Max', spec: '256GB', quantity: 2, unitPrice: 8999 },
  { name: 'AirPods Pro', spec: 'USB-C', quantity: 1, unitPrice: 1999 },
]
```

Order total becomes sum of subtotals. Status, channel, etc. unchanged.

## Files to Change

### Demo App
- `login-homepage-preview/src/views/OrderFormView.vue` — expand OrderItem, update addItem/removeItem, update template, update view mode
- `login-homepage-preview/src/views/OrderManageView.vue` — update mock data items from strings to objects
- `login-homepage-preview/src/views/OrderDetailView.vue` — DELETED (no longer exists)

### Skill Files
- `vue3-element-ui-ux/references/generation-rules.md` — add O2M sub-form pattern under Admin Form Page
- `vue3-element-ui-ux/references/review-checklist.md` — add O2M check items

## Design Decisions

1. **Grid over cards** — user chose compact grid rows for desktop. Column headers provide clear field labeling without repeating labels per row.
2. **Subtotal read-only** — auto-calculated from quantity × unitPrice, prevents data inconsistency.
3. **80px fixed for quantity** — narrow numeric field, fixed width prevents layout jitter.
4. **40px for delete** — icon button only, consistent with action column rule.
5. **Mobile card fallback** — each sub-item becomes a compact info card, mirroring the parent form's responsive pattern.
6. **Order total auto-sum** — optional: sum of item subtotals can drive the main form's amount field.

## Spec Self-Review

- **Placeholders:** None
- **Consistency:** Grid columns follow admin density conventions; delete button pattern matches action column rule
- **Scope:** One form component + mock data + skill files — focused
- **Ambiguity:** Exact column widths specified in grid-template-columns
