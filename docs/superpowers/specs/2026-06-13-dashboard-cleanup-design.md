# Dashboard Cleanup — Design Spec

**Date:** 2026-06-13
**Status:** Approved

## Goal

Clean up the admin dashboard: remove tinted zone backgrounds for visual consistency,
and make the bar chart bars widen at larger breakpoints so the chart fills its container
without breaking the gap-to-bar ratio rule.

## Changes

### 1. Remove Zone Tinted Backgrounds

The chart zone (`bg-surface-neutral`) and activity zone (`bg-surface-warm`) wrappers
lose their tinted backgrounds. The zone `<div>` elements stay for layout only.

**Before:**
```html
<div class="bg-surface-neutral rounded-btn p-4 md:p-5 mb-4 md:mb-6">
  <!-- charts -->
</div>
<div class="bg-surface-warm rounded-btn p-4 md:p-5">
  <!-- activity -->
</div>
```

**After:**
```html
<div class="mb-4 md:mb-6">
  <!-- charts -->
</div>
<div>
  <!-- activity -->
</div>
```

- `bg-surface-neutral` removed → transparent, shows page background (`neutral-50 #fafafa`)
- `bg-surface-warm` removed → same
- `rounded-btn` removed (no background to round)
- `p-4 md:p-5` removed (inner panels handle their own padding)
- `mb-4 md:mb-6` kept on charts zone for section spacing

### 2. Bar Chart Stepped Widths

Bar width increases at larger breakpoints while maintaining reasonable gap ratio.

**Before:**
```html
<div class="flex-1 md:flex-initial flex flex-col items-center gap-1">
  <div class="w-full md:w-10 ..."></div>
```

**After:**
```html
<div class="flex-1 md:flex-initial flex flex-col items-center gap-1">
  <div class="w-full md:w-10 lg:w-12 2xl:w-14 ..."></div>
```

| Breakpoint | Bar Width | Gap | Ratio |
|---|---|---|---|
| md (≥768px) | 40px (`w-10`) | 20px (`gap-5`) | 50% |
| lg (≥1024px) | 48px (`w-12`) | 20px (`gap-5`) | 42% |
| 2xl (≥1536px) | 56px (`w-14`) | 20px (`gap-5`) | 36% |
| Mobile (<768px) | `w-full` | 12px (`gap-3`) | adaptive |

Bar column stays `flex-1 md:flex-initial` — fills space on mobile, natural width on desktop.
`justify-center` on the chart container is unchanged.

### 3. Nothing Else Changes

- Stat cards: unchanged (bare on page background, accent stripes, no container)
- Chart panels: unchanged (raised panel with `shadow-sm`)
- Activity timeline: unchanged (white block with border)
- All margins and padding: unchanged
- All colors and typography: unchanged
- Chart container grid layout (`md:col-span-2` + `col-1`): unchanged

## Files to Change

### Demo App
- `login-homepage-preview/src/views/DashboardView.vue`:
  - Lines 69, 119: Remove zone wrapper classes (`bg-surface-neutral`, `bg-surface-warm`,
    `rounded-btn`, `p-4 md:p-5`) — keep only `mb-4 md:mb-6` on charts zone
  - Line 78, 82, 85: Change bar column `md:w-10` → `md:w-10 lg:w-12 2xl:w-14`

### Skill Files
- `.claude/skills/vue3-element-ui-ux/references/generation-rules.md`:
  - Bar chart section (lines 796-816): Update bar width rule from `md:w-10` to
    `md:w-10 lg:w-12 2xl:w-14`, update key points explaining stepped widths
  - Zone wrapper section (lines 818+): Remove or update tinted zone wrapper template
    to clarify they are optional / not required on dashboards with 1-2 zones

## Design Decisions

1. **Remove backgrounds, not zones** — the wrapper divs stay for layout. Only the
   visual tint is removed. This keeps the DOM structure stable.
2. **Stepped widths over percentage** — fixed bar widths at each breakpoint are
   predictable and keep the gap ratio controlled. Percentage-based widths would
   require percentage-based gaps to maintain ratio, which Tailwind doesn't support
   cleanly.
3. **Ratio relaxed at wider breakpoints** — at 2xl, 36% ratio (56px bar / 20px gap)
   is acceptable because the bars have enough visual weight at that size. The 50%
   rule is most important at md/lg where bars are smaller.
4. **Stat cards left unchanged** — accent stripes already differentiate them
   visually. Adding a container wrapper is unnecessary complexity.

## Spec Self-Review

- **Placeholders:** None
- **Consistency:** Zone bg removal consistent with "pages with 1-2 zones don't need
  shading" rule. Stepped bar widths extend the existing fixed-width pattern rather
  than replacing it.
- **Scope:** Minimal — one demo component + one skill file section. Two specific
  changes, no side effects.
- **Ambiguity:** Breakpoint values explicit. Bar width changes explicit. What stays
  unchanged is explicit.
