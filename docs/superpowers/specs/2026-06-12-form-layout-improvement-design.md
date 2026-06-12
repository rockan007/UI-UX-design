# Form Layout Improvement — Design Spec

**Date:** 2026-06-12
**Status:** Approved

## Goal

Improve admin form page layout: fix action buttons in a toolbar below breadcrumb, widen
the form container for better screen utilization, and separate form sections into distinct
cards with accent stripes and spacing.

## Current State

- Action buttons (submit/cancel) sit at the bottom of the form inside the card
- Form container has `max-w-2xl` (672px), leaving large empty space on wide screens
- Sections ("基本信息" / "其他信息") are separated only by a thin `border-t` divider
  inside a single white card — visually weak separation
- Buttons use `size="large"` at form bottom, require scrolling on long forms

## Proposed Design

### 1. Toolbar Row (Action Buttons Fixed Below Breadcrumb)

Action buttons move to a toolbar row between breadcrumb and form content, matching the
list page pattern where the create button sits in the filter bar row.

```
[ 订单管理 / 创建订单 ]                    [ 保存 ] [ 取消 ]
└─ breadcrumb ────────────────────────┘  └─ buttons right-aligned ─┘
```

**Implementation:**
- Toolbar: `<div class="flex items-center justify-between mb-4 md:mb-6">` wrapping breadcrumb + buttons
- Desktop: breadcrumb on left, buttons on right (`justify-between`)
- Primary button: `el-button type="primary"` (solid blue)
- Secondary button: `el-button plain` (white bg, gray border — lower visual weight)
- Buttons no longer inside the form card
- Buttons no longer use `size="large"` — default size is sufficient in toolbar context

### 2. Section Cards (Replace Single Card + Dividers)

Each form section becomes an independent card with accent stripe:

```
┌─ 基本信息 (blue stripe) ────────────────┐
│  客户名称    │  手机号      │  金额        │
│  商品项目    │              │             │
│  渠道        │              │             │
└─────────────────────────────────────────┘
          ↕ gap-4 (16px)
┌─ 其他信息 (cyan stripe) ────────────────┐
│  配送地址    │  配送方式    │  备注        │
└─────────────────────────────────────────┘
```

**Implementation:**
- Each section is a white card: `bg-white border border-neutral-200 rounded-btn`
- Left accent stripe via `border-l-[3px]` — blue (`#2563eb`) for required/primary sections, cyan (`#0891b2`) for secondary sections
- Section title styled to match stripe color: `text-sm font-semibold` with color (e.g., `text-blue-700` / `text-cyan-700`)
- Cards separated by `gap-4` (16px) via parent flex column or direct `mb-4`
- No more single-card-with-dividers pattern for forms with 2+ sections

### 3. Wider Layout

Remove `max-w-2xl` constraint. Form content uses the full available width.

**Implementation:**
- Remove `max-w-2xl` from the form container wrapper
- Desktop fields: `grid grid-cols-1 md:grid-cols-3 gap-4` (3-column grid)
- Mobile fields: stack to single column naturally (`grid-cols-1`)
- Full-width fields (textarea, dynamic list) span all columns
- `label-position="top"` maintained for all fields

### 4. Primary/Secondary Button Distinction

- **Primary action** (Save/Submit): `el-button type="primary"` — solid brand blue
- **Secondary action** (Cancel/Back): `el-button plain` — white background, gray border, lower visual weight
- Both buttons in toolbar row, right-aligned
- Submit button gets `:loading` + `:disabled` during submission (existing behavior preserved)

### 5. Mobile Adaptation

- Toolbar: breadcrumb + buttons remain `justify-between`, buttons use `size="small"` to fit
- Section cards: full width, single column fields
- Accent stripes and spacing unchanged

## Files to Change

### Demo App
- `login-homepage-preview/src/views/OrderFormView.vue` — apply all layout changes

### Skill Files
- `.claude/skills/vue3-element-ui-ux/references/generation-rules.md` — update Admin Form Page supplement with toolbar rule, section card pattern, and field grid rules
- `.claude/skills/vue3-element-ui-ux/references/review-checklist.md` — add form layout check items (toolbar, section cards, button distinction, width)

## Design Decisions

1. **Toolbar pattern matches list page** — the action button placement rule from the previous iteration (buttons in toolbar row) extends to form pages naturally
2. **Section cards with accent stripes** reuse existing container tier system (Accent Card) in a form context, maintaining visual consistency
3. **3-column grid on desktop** — strikes balance between density and readability; 3 fields per row is comfortable to scan
4. **Plain secondary button** — lower emphasis than default outlined button, clearer primary/secondary distinction
5. **No `max-w-2xl`** — admin forms benefit from using available space; the 3-column grid prevents fields from becoming too wide

## Spec Self-Review

- **Placeholders:** None
- **Consistency:** Toolbar pattern consistent with list page action button rule; section cards consistent with Accent Card container tier
- **Scope:** Focused on form page layout — one demo page + skill reference files
- **Ambiguity:** None — exact CSS classes, component types, and grid configurations specified
