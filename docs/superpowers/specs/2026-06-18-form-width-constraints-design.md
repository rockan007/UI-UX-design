# Form Width Constraints — Design Spec

**Date:** 2026-06-18
**Status:** approved
**Scope:** `vue3-element-ui-ux` skill (primary), `ui-ux-agent-designer` (optional)

## Problem

The `vue3-element-ui-ux` skill has only one rule about form width: "No `max-w-2xl` constraint — form uses available width" (`generation-rules.md` line 302). This is a negative rule with no corresponding positive guidance.

Two problems manifest on large screens (≥ 1280px):

1. **Forms too narrow:** `grid-cols-2` wastes ~50% of available width on 1440px+ screens.
2. **Forms too wide/stretched:** `grid-cols-3` on 1920px screens gives each input ~540px+, making fields hard to scan.

Root cause: no adaptive width strategy for forms across screen sizes.

## Design

### Layered Width Constraints

Two-tier system for admin form pages:

| Tier | Rule | Rationale |
|---|---|---|
| **Section Card** | `max-w-6xl` (1152px), left-aligned | Defines the form's "comfortable reading zone"; prevents infinite stretching on ultrawide screens |
| **Field Grid Row** | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | All field rows use the same responsive grid — regardless of field count. 1 field = occupies 1 column; 2 fields = 2 columns; 3 fields = fills the row. Each field stays at 280–370px, the comfortable reading range. |
| **Full-Width Content** | No constraint; fills card width | textarea, O2M sub-forms, permission trees — these are inherently "wide" content and sit at section end |

### Behavior by Breakpoint

| Viewport | Columns | Column Width | Card Behavior |
|---|---|---|---|
| < 768px | 1 | 100% | Full width, `max-w-6xl` has no effect |
| 768–1023px | 2 | ~340–480px | Card grows with content |
| 1024–1279px | 3 | ~300–380px | Card grows with content |
| ≥ 1280px | 3 | ~370px | Card locks at 1152px, right side shows page background |

### Template Updates

**Section Card — add `max-w-6xl`:**
```html
<!-- Before -->
<div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">

<!-- After -->
<div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6 max-w-6xl">
```

**All field rows — unified responsive grid:**
```html
<!-- Before -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">

<!-- After: same grid for all field rows, regardless of field count -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```
A row with 1 field occupies 1 column. 2 fields = 2 columns. 3 fields = fills the row. All fields share the same comfortable 280–370px width.

**Full-width content — unchanged, with comment:**
```html
<!-- Full-width at section end: no max-width constraint -->
<el-form-item label="备注" class="mt-4">
  <el-input type="textarea" :rows="3" />
</el-form-item>
```

### What Does NOT Change

- `label-position="top"` on `el-form`
- Section card structure (accent stripe + border + padding)
- Mobile `grid-cols-1` stacking
- O2M sub-form `grid-template-columns` (inline styles, unaffected)
- Tabbed form structure (tab panes contain section cards which get `max-w-6xl`)
- Three-mode form pattern (create/view/edit share the same card structure)
- Permission tree / rich content areas (full-width tier)
- Form toolbar / breadcrumb / action buttons (outside the form)

### No Centering

Cards are left-aligned. On ultrawide screens (≥ 1280px), the card stops at 1152px and the right side shows the page background (`neutral-50`). This keeps the interaction path short for admin users who work left-to-right. No `mx-auto`.

## Files to Modify

| File | Change |
|---|---|
| `.claude/skills/vue3-element-ui-ux/references/generation-rules.md` | New "Form Width Constraints" subsection under Admin Form Page supplement; update grid templates |
| `.claude/skills/vue3-element-ui-ux/references/review-checklist.md` | New form width check items |
| `.claude/skills/ui-ux-agent-designer/references/design-standards.md` | Optional: technology-agnostic principle about form width adaptation |

No new components, no new design tokens, no structural refactors.

## Review Checklist Addition

```markdown
### Form Width (Desktop)

- [ ] Each section card has `max-w-6xl` — doesn't stretch infinitely on large screens
- [ ] All field rows use unified grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — same grid for 1/2/3 fields
- [ ] Full-width content (textarea, O2M sub-forms, permission trees) at section end, fills card width
- [ ] Mobile (< 768px) fields stack in single column, unaffected by max-w
- [ ] Tabbed form section cards follow the same rules
```
