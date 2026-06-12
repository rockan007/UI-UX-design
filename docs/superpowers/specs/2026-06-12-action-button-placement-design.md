# Action Button Placement — Design Spec

**Date:** 2026-06-12
**Status:** Approved

## Goal

Consolidate admin list page action buttons (e.g., "创建订单") into the filter bar row
on desktop, and replace the mobile bottom button with a compact "+" icon button in the
page header area.

## Current State

### Desktop
- "创建订单" button sits on its own row between breadcrumb and filter bar (`hidden md:flex justify-end mb-3`)
- Filter bar is a separate row below
- Total: 2 rows consumed (button row + filter row)

### Mobile
- "创建订单" button sits at the bottom, after the card list and pagination (`flex md:hidden justify-end mb-2`)
- User must scroll past all content to reach it
- Total: button is at the bottom of potentially long scroll

## Proposed Design

### Desktop (≥768px)

Move the create/primary action button into the same row as the filter bar, right-aligned:

```
[ Search input ... ] [ Status dropdown ] [ Channel dropdown ] [spacer] [ + 创建订单 ]
└────────────────────── Filter Bar (single row) ───────────────────────────────────┘
```

**Implementation:**
- Filter bar uses `flex items-center gap-3`
- Spacer achieved via `flex-1` empty div or `margin-left: auto` on the button
- Button stays as `el-button type="primary" :icon="Plus"` with text label
- The old standalone button row (`hidden md:flex justify-end mb-3`) is removed

### Mobile (<768px)

Replace the bottom "创建订单" button row with a compact "+" icon button in the
top-right corner, on the same row as the breadcrumb:

```
[ 订单管理 ]                                              [ + ]
└── breadcrumb ──┘                                        └─ circle btn ─┘
```

**Implementation:**
- Breadcrumb row becomes `flex items-center justify-between`
- Button: `el-button type="primary" circle :icon="Plus" size="small"`
- Button navigates to `/admin/{entity}/create` on click
- The old bottom button row (`flex md:hidden justify-end mb-2`) is removed
- The same row may also contain other header-level actions if needed in the future

## Files to Change

### Demo App
- `login-homepage-preview/src/views/OrderManageView.vue` — apply both desktop and mobile changes

### Skill Files
- `vue3-element-ui-ux/references/generation-rules.md` — add "Action Button Placement" supplement under Admin List Page
- `vue3-element-ui-ux/references/review-checklist.md` — add check item for action button placement

## Design Decisions

1. **Desktop button keeps text label** — "创建订单" is clearer than just "+" when space is available
2. **Mobile button is icon-only circle** — saves horizontal space in the tight header area; "+" is universally understood as "create/add"
3. **Filter bar is the natural home for the action button** — the filter+action row becomes a single "toolbar" zone, which is a common admin pattern
4. **Skill-level abstraction** — all admin list pages that have both filters and a create button follow this pattern

## Spec Self-Review

- **Placeholders:** None
- **Consistency:** Desktop and mobile rules don't contradict
- **Scope:** Single concern — action button placement on admin list pages only
- **Ambiguity:** None — exact element structure and CSS classes specified
