# Admin Page Container & Visual Variety Design

**Date:** 2026-06-12
**Status:** Approved
**Scope:** `vue3-element-ui-ux` skill reference files

## Problem

The `vue3-element-ui-ux` skill produces admin pages that are visually monotonous. Every page
is white cards on a `#fafafa` background with gray borders and occasional blue accents. The
design tokens and principles are deliberately ultra-restrained:

- One neutral scale (literal grayscale from `#fafafa` to `#0a0a0a`)
- One brand color (`#2563eb`), used sparingly
- No decorative shadows — only overlays get them
- Explicit prohibitions: "Avoid broad gradients, neon colors, excessive shadows"
- "No decorative shadows on cards, tables, forms, or content areas"

User feedback: the generated interfaces are boring, lack visual variation, and feel too
black-and-white.

## Solution Overview

Introduce a **container hierarchy system** for admin pages that creates visual rhythm
through varied card treatments, tonal surface colors, and strategic accent elements —
without sacrificing the professional, scanable nature of admin UIs.

### Design Decisions

- **Focus on admin pages only.** Frontend pages are out of scope for this change.
- **Moderate visual distinctiveness.** Changes are clearly perceptible but not bold/flashy.
- **Hybrid approach:** Accent stripes + section shading (Approach A) as the foundation,
  with raised/shadowed chart containers from the elevation system (Approach C).

## Container System

### Three Container Tiers

| Tier | Style | When to Use |
|---|---|---|
| **Accent Card** | White background + `border` + left 3px colored stripe | Stat/metric cards — color distinguishes data category |
| **Raised Panel** | White background + no border + `shadow-sm` | Chart containers, key data visualizations — floats above page |
| **Standard Block** | White background + `border` (current default) | Tables, forms, activity lists — keeps functional areas clean |

### Section Shading

- When a page has 3+ logical zones (e.g., stats + charts + activity), group related cards
  inside a lightly tinted background (`surface-*` tokens) to form visual "regions."
- A "zone" is a distinct content block with its own heading — stats row, chart panel,
  data table, activity feed, filter bar + results, etc.
- Do NOT over-segment — pages with only 1-2 zones stay flat.

### Accent Stripe Color Mapping

| Color | Value | Semantic | Example Metrics |
|---|---|---|---|
| Blue | `#2563eb` | Neutral-positive | Users, traffic, system KPIs |
| Cyan | `#0891b2` | Flow/in-progress | Orders, transactions, processing |
| Amber | `#d97706` | Attention needed | Revenue, finance, pending items, warnings |
| Green | `#16a34a` | Positive/complete | Completion rate, success rate, growth |

## Design Token Changes

### New: Tonal Background Scale

| Token | Value | Usage |
|---|---|---|
| `surface-blue` | `#eff6ff` | Blue-tinted zone/card background |
| `surface-cyan` | `#ecfeff` | Cyan-tinted zone/card background |
| `surface-amber` | `#fffbeb` | Amber-tinted zone/card background |
| `surface-green` | `#f0fdf4` | Green-tinted zone/card background |
| `surface-warm` | `#fafaf9` | Warm-gray zone (activity, logs) |
| `surface-neutral` | `#f5f5f5` | Neutral-gray zone (chart housing) |

### New: Tonal Border Scale

| Token | Value | Usage |
|---|---|---|
| `border-blue` | `#bfdbfe` | Blue zone/card border |
| `border-cyan` | `#a5f3fc` | Cyan card border |
| `border-amber` | `#fde68a` | Amber card border |
| `border-green` | `#bbf7d0` | Green card border |

### New: Accent Stripe Rule

- `border-left: 3px solid {color}` on stat/metric cards
- Color chosen by data category per the mapping table above

### Modified: Shadow Rules

**Before:** Shadows only for overlay components (dropdown, dialog, drawer).
"No decorative shadows on cards, tables, forms, or content areas."

**After:**
- `shadow-sm`: allowed for chart containers and data visualization panels only
- `shadow-md` / `shadow-lg`: still reserved for dialog, drawer, dropdown overlays
- Stat/metric cards, tables, forms, list containers: still no shadows (stat cards use accent stripes, not elevation)

### Modified: Semantic Color Table

Pending/warning items moved from green to amber. Green reserved exclusively for
positive/completion metrics.

## Design Principle Changes

### Rules to Relax

| Original Rule | Problem | Changed To |
|---|---|---|
| "Avoid broad gradients, neon colors, excessive shadows" | Vague; "excessive" undefined | Split into specific rules: allow subtle tinted backgrounds, allow `shadow-sm` on stat/chart cards, prohibit gradient backgrounds |
| "No decorative shadows on cards, tables, forms" | Conflicts with container system | Stat cards and chart containers may use `shadow-sm`. Tables, forms, lists do not use shadows |
| "Use neutral colors for backgrounds and text" | Directly causes B&W monotony | Page background uses neutrals. Section zones may use light tinted backgrounds (`surface-*`) for visual distinction |
| "Brand color only for primary actions, selected states, key feedback" | Limits data viz color expression | Add: charts and stat cards may use the full semantic color system |

### New Rules

- Admin pages with 3+ logical zones may use tinted backgrounds (`surface-*`) to wrap related
  cards into visual regions
- Stat/metric cards use a 3px left accent stripe to differentiate data categories
- Chart containers use no-border + `shadow-sm` raised style, visually distinct from data tables
- Zone backgrounds use the lightest tint tokens only (`*-50` level) — never saturated or dark

## Reference File Changes

| File | Changes |
|---|---|
| `references/design-tokens.md` | Add tonal backgrounds, tonal borders, accent stripe rule; modify shadow rules, semantic color table |
| `references/design-principles.md` | Relax overly restrictive visual rules; add container tier rules, section shading rules |
| `references/generation-rules.md` | Add admin dashboard generation supplement (stat cards, zone grouping, chart container styling) |
| `references/review-checklist.md` | Add checks: container tier usage correct, section shading appropriate, shadows only on allowed surfaces |
| `references/component-system.md` | May need stat card and zone container mapping guidance (assess during implementation) |

## Out of Scope

- Frontend page visual changes (login, homepage, etc.)
- New color ramps beyond the 4 semantic hues
- Dark mode token changes (follows same structure, values TBD during implementation)
- `ui-ux-agent-designer` meta-skill sync (separate follow-up)
