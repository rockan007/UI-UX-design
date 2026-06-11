# Bar Chart Spacing & Visual Constraints — Design Spec

> Status: **approved** | Date: 2026-06-11

## Overview

Dashboard order trend bar chart violates data visualization best practices:
bars are too wide relative to gaps (`flex-1` stretch), and bar tops have rounded
corners that obscure exact values. Add spacing constraints and anti-pattern rules
to the skill reference files.

**Sources:** World Bank, Government of Canada Design System, Apache eCharts Handbook,
SAGE Publications — all recommend bar width ≈ 2× gap width.

---

## Changes

### Demo Fix

**File:** `login-homepage-preview/src/views/DashboardView.vue`

| Issue | Current | Fix |
|-------|---------|-----|
| Bar width | `flex-1` (stretch to fill, gap:bar ≈ 1:7) | Fixed `w-10` (40px), 7 bars × 40px + 6 gaps × 20px = 400px fits in container |
| Bar gap | `gap-3` (12px, fixed) | Match ~50% of bar width = 20px. Use Tailwind `gap-5` (20px) |
| Rounded top | `rounded-t-sm` (4px) | Remove — bar tops must be straight to show exact value |
| Container | `flex items-end` | Add `justify-center` for centering, remove `flex-1` from individual bars |

Before:
```html
<div class="flex items-end gap-3 h-[200px] px-2">
  <div v-for="..." class="flex-1 flex flex-col items-center gap-1">
    ...
    <div class="w-full rounded-t-sm ..." ...></div>
```

After:
```html
<div class="flex items-end justify-center gap-5 h-[200px] px-2">
  <div v-for="..." class="flex flex-col items-center gap-1">
    ...
    <div class="w-10 ..." ...></div>
```

### Skill: `vue3-element-ui-ux`

#### `references/component-system.md` — Chart rules

Add to existing chart rules:

```markdown
- **Bar spacing:** Gap between bars must be 50%–100% of bar width. Sweet spot: gap ≈ 50% of bar width (bar width = 2× gap).
- **Bar tops must be straight.** No rounded corners on bar/column tops — they obscure exact endpoint values.
- **Bar width is fixed,** not stretched. Use `w-*` (e.g., `w-10`) rather than `flex-1` to maintain gap:width ratio.
```

#### `references/interaction-rules.md` — Bar / Column Charts

Add after existing hover rule:

```markdown
### Spacing & Shape

- **Gap-to-bar ratio:** Gap between bars should be 50%–100% of bar width. Default to ~50% (bar = 2× gap).
- **Bar width is fixed** — do not use `flex-1` to stretch bars across the container.
- **Straight bar tops only.** Never use `rounded-t-*` on bar chart columns. The top edge must be a precise visual endpoint.
- Bars that are too wide relative to gaps (>4:1 ratio) appear visually unbalanced and lose the rhythm of discrete data points.
```

#### `references/review-checklist.md` — Section 6 (State Feedback) or new chart section

Add check item:

```markdown
- [ ] **Bar chart spacing:** Gap between bars is 50%–100% of bar width. Bar tops are straight (no `rounded-t-*`). Bar width is fixed (not `flex-1`).
```

---

## Acceptance Criteria

1. Dashboard bar chart: bars are fixed width (`w-10`), gap (`gap-5`) ≈ 50% of bar width
2. Bar tops are straight — `rounded-t-sm` removed
3. Bars are centered in container with `justify-center`
4. `component-system.md` chart rules include spacing, straight-top, and fixed-width constraints
5. `interaction-rules.md` has Spacing & Shape subsection under Bar/Column Charts
6. `review-checklist.md` has bar chart spacing check item
