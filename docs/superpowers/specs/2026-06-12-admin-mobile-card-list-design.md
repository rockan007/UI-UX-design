# Admin Mobile Card List Design

**Date:** 2026-06-12
**Status:** Approved
**Scope:** `vue3-element-ui-ux` skill reference files + demo OrderManageView

## Problem

Admin list pages (OrderManageView, UserListView, etc.) are broken on mobile:

1. **Summary cards overflow** — 3-column grid gives each card only 96px at 390px; revenue card content overflows (139px needed vs 96px available)
2. **Tables unreadable** — 8 columns squeezed into 325px, each column averages ~40px, too narrow to read any content
3. **Pagination overflows** — 363px pagination bar in a 325px parent container
4. **Filter bar wastes space** — search input, status dropdown, and channel dropdown lined up consume valuable vertical space

## Solution Overview

### Core Decision: Card List on Mobile

For admin list pages at `< 768px`, switch from `el-table` to a **card list** — each table row becomes a stacked card. Desktop (≥ 768px) keeps the existing `el-table`.

### Card Structure

Each card follows a 4-layer layout:

```
┌──────────────────────────────┐
│ ORD-20260601-001    [已完成] │  Layer 1: Primary ID + status badge
│ 张三 · 138****1234  ¥10,998 │  Layer 2: Customer + amount (right-aligned, bold)
│ [iPhone 16 Pro Max] [AirPods]│  Layer 3: Item/attribute tags (max 2 + "+N")
│ APP · 06-01 09:23     [···] │  Layer 4: Channel + time + action menu
└──────────────────────────────┘
```

**Field placement rules:**
- Layer 1: Primary identifier (order ID, user name, etc.) left; status badge right
- Layer 2: Secondary person/entity left; amount/value right, bold
- Layer 3: Attribute tags (items, roles, categories) — up to 2 shown, rest as "+N"
- Layer 4: Source/channel + timestamp left; action trigger right (three-dot menu `···`)

**Action menu:** The `···` button triggers an `el-dropdown` with view/edit/delete options. Each action button uses `@click.stop` to prevent card-level click.

### Filter Area — Mobile

```
┌──────────────────────┐
│ 🔍 search...  │ 🔽 筛选 │   Single row: search input + filter button
└──────────────────────┘
```

- **Search input:** always visible, takes remaining space
- **Filter button:** opens a bottom `el-drawer` containing all filter dropdowns stacked vertically
- **Drawer footer:** "Apply" (primary) and "Reset" (default) buttons
- Desktop: current inline filter bar unchanged

### Pagination — Mobile

- Desktop: `el-pagination` with full layout unchanged
- Mobile (< 768px): Simplified to `‹ Prev` `1 / N` `Next ›`, centered, no page-size selector or total count

### Summary Cards — Mobile

- Grid: `grid-cols-2 md:grid-cols-3` — wraps to 2 columns on mobile (card width ~150px, comfortable)
- Gap: `gap-2 md:gap-4`
- Padding: `p-2.5 md:p-4`
- Label font: `text-[10px] md:text-sm` (10px vs 13px)
- Value font: `text-base md:text-2xl` (16px vs 20px)

### Breakpoint

All mobile adaptations trigger at `< 768px` (Tailwind `md:` breakpoint).

## Design Token Changes

No new design tokens needed. Existing spacing and typography tokens are sufficient.

## Skill Reference File Changes

| File | Changes |
|---|---|
| `references/design-principles.md` | Add: admin list pages switch to card list on mobile; filters move to drawer; pagination simplifies |
| `references/generation-rules.md` | Add: Admin List Page mobile supplement — card list template, filter drawer template, simplified pagination template |
| `references/component-system.md` | Add: `CardList`, `CardListItem`, `FilterDrawer` to admin composite components; add Element Plus mappings |
| `references/review-checklist.md` | Add: mobile card list, filter drawer, pagination, summary card checks |

## Demo Page Changes

| File | Changes |
|---|---|
| `OrderManageView.vue` | Implement card list on mobile, filter drawer, simplified pagination, fix summary cards |

Other list pages (UserListView, etc.) to be updated in follow-up work following the same pattern.

## Out of Scope

- Other admin list pages (UserListView, RoleManageView, etc.) — follow-up
- Frontend pages (HomeView, LoginView)
- Dark mode adaptations for card list
- `ui-ux-agent-designer` meta-skill sync (follow-up)
