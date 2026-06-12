# Review Checklist

Post-implementation quality review. Run this checklist after every page generation.

## Review Prompt

```
Review this page as a senior UI/UX designer.
Only point out specific issues, not generalities.

Order by severity:
1. Issues blocking task completion
2. Information hierarchy problems
3. Visual consistency problems
4. Form or table experience issues
5. Mobile issues
6. Accessibility issues

Then fix the issues. Do not change business logic.
```

## 1. Task Completion Path

- [ ] User knows what page this is.
- [ ] User knows what to do next.
- [ ] Primary action is obvious.
- [ ] Secondary actions don't compete with primary.
- [ ] Destructive actions have confirmation.
- [ ] Action completion has feedback.
- [ ] User can easily undo or go back.

## 2. Information Hierarchy

- [ ] Page title is clear.
- [ ] Key data is shown before secondary detail.
- [ ] Primary information is more prominent than secondary.
- [ ] Help/description text is concise.
- [ ] Status information is easy to identify.
- [ ] No competing visual focal points.

## 3. Visual Consistency

- [ ] Button styles and sizes are consistent.
- [ ] Form control heights are uniform.
- [ ] Table row heights are consistent.
- [ ] Labels and badges share a unified style.
- [ ] Section spacing is stable.
- [ ] Border radius and shadows are restrained.
- [ ] **Connector lines vs. border-radius:** Containers with a border connector line on one side have that side's border-radius set to `0`. Use directional radius (`rounded-r-*`, `rounded-l-none`) instead of uniform `rounded-*`.
- [ ] **Bar chart spacing:** Gap between bars is 50%–100% of bar width. Bar tops are straight (no `rounded-t-*`). Bar width is fixed (not `flex-1`).
- [ ] **Container variety:** Admin pages with multiple content zones use varied container treatments (accent cards, raised panels, standard blocks) — not uniform white cards throughout.
- [ ] **Accent stripes:** Stat/metric cards have a 3px left border stripe, color matches data category per `design-tokens.md` accent stripe table.
- [ ] **Raised panels:** Chart containers and data visualization panels use `shadow-sm` + no border, distinct from data tables.
- [ ] **Section shading:** Pages with 3+ zones use tinted `surface-*` wrappers for visual grouping. Pages with 1-2 zones stay flat.
- [ ] **Shadows restricted:** Only chart/data-viz containers use `shadow-sm`. Tables, forms, stat cards, and list containers do not use shadows.
- [ ] **Tonal backgrounds restrained:** Zone tint backgrounds use only `*-50` level tokens. No saturated or dark backgrounds.
- [ ] **Breadcrumb:** Admin pages use `el-breadcrumb` separator `/` instead of `<h1>` header. Last item is current page (not clickable). Earlier items have `:to` links. Reflects operation path, not sidebar hierarchy.
- [ ] **CRUD breadcrumb:** Create/edit/detail pages have multi-level breadcrumbs reflecting operation path (e.g., `订单管理 / ORD-001 / 编辑`).
- [ ] **Form grouping:** Required fields first under "基本信息", secondary fields separated by divider under "其他信息".
- [ ] **Detail page:** Record ID + status in header, info in 2-column cards, action bar at bottom with edit/delete.
- [ ] **CRUD navigation:** List has "创建" button; row/card click navigates to detail; detail has edit/delete actions. Create and edit share one form component.

## 4. Form Experience

- [ ] Field order follows user workflow.
- [ ] Labels are clear.
- [ ] Required fields are marked.
- [ ] Help text is necessary and concise.
- [ ] Error messages are near the corresponding field.
- [ ] Submit feedback is explicit.
- [ ] Double-submit is prevented (button loading + disabled).
- [ ] **Form toolbar:** Action buttons in toolbar row with breadcrumb (`justify-between`). Primary `type="primary"`, secondary `plain`. Not at form bottom.
- [ ] **Section cards:** Each section is independent card with left accent stripe (`border-l-[3px]`). Cards separated by `gap-4`. No single-card-with-dividers pattern.
- [ ] **Field grid:** Desktop uses `grid-cols-3`. Textarea and dynamic lists are full-width at section end, after grid rows. Multiple grid rows stacked with `mt-4`.
- [ ] **Form width:** No `max-w-2xl` constraint. Form uses available content width.
- [ ] Mobile input is smooth.

## 5. Table Experience

- [ ] High-frequency fields are left-aligned.
- [ ] Action column: icon-only when ≥2 buttons, each button wrapped in tooltip, left/right aligned per text direction (no center), column width calculated for worst-case button count.
- [ ] Filter area is compact.
- [ ] Status, time, amount, quantity fields are scannable.
- [ ] Batch actions are clear.
- [ ] Empty state provides next step.
- [ ] Data is still manageable on mobile.

## 6. State Feedback

- [ ] **loading**: clearly shown, no large layout shifts; skeleton for key data areas.
- [ ] **empty**: has explanation and next step.
- [ ] **error**: specific error message, provides retry or back action.
- [ ] **success**: feedback after save/create/delete, doesn't block for too long.
- [ ] **disabled**: recognizable, reason understandable, not color-only.
- [ ] **permission denied**: clearly explained.
- [ ] **hover**: interactive elements show hover state.
- [ ] **focus**: keyboard focus is visible.

## 7. Responsive

```
Check at these widths:
- 1440px: layout uses horizontal space well.
- 1024px: not crowded, reduce complex columns.
- 768px: further simplify columns.
- 390px: single-column, no horizontal squeeze.
```

- [ ] No text overflow.
- [ ] No element overlap.
- [ ] Tap targets are large enough.
- [ ] Filters, menus, dialogs are usable.
- [ ] Tables have a mobile solution (card list or horizontal scroll).
- [ ] **Mobile card list:** Admin list pages switch from `el-table` to card list below 768px. Each card shows 4 layers: primary ID + status, person + amount, tags, meta + actions.
- [ ] **Filter drawer:** Search input visible on mobile; other filters in bottom drawer (`el-drawer` direction btt) with Apply/Reset buttons.
- [ ] **Mobile pagination:** Simplified prev/next with page indicator (`1 / N`), no page-size selector or total count on mobile.
- [ ] **Summary cards responsive:** `grid-cols-2 md:grid-cols-3`, `p-2.5 md:p-4`, compact type (`text-base md:text-2xl`) on mobile.
- [ ] **Action menu:** Card actions in `el-dropdown` with `MoreFilled` icon, `@click.stop` on trigger.
- [ ] **CSS breakpoints only:** Use `hidden md:block`/`md:hidden` for visibility — no `v-if` with window width.
- [ ] Primary action is visible on mobile.
- [ ] **Action button placement:** Desktop create button inside filter bar row (right-aligned via spacer). Mobile create button is circle `+` icon in breadcrumb row top-right (`md:hidden`). No standalone button rows.
- [ ] Collapsed sidebar has `overflow-x: hidden` to prevent horizontal scrollbar from overflow content.

## 8. Accessibility

- [ ] Text-background contrast is sufficient.
- [ ] Keyboard focus is visible.
- [ ] Icon buttons have tooltip or aria-label.
- [ ] Inputs have identifiable labels.
- [ ] Error states are not conveyed by color alone.
- [ ] Tap targets ≥ 44px on mobile.

## State Completion Prompt

```
Check whether this page fully covers:
1. loading
2. empty
3. error
4. success feedback
5. disabled
6. hover
7. focus
8. validation error
9. permission denied
10. mobile layout

Fill in any missing states. Do not change business logic.
```

## 9. i18n (when enabled — check `package.json` for `"vue3ElementUiUx": { "i18n": true }`)

- [ ] All user-facing text uses `$t()` keys — no hardcoded Chinese/English strings in templates.
- [ ] Element Plus locale syncs via `el-config-provider` + `watch(locale, ...)` in App.vue.
- [ ] Numbers formatted with `$n()`, dates with `$d()`, currencies with locale-aware format definitions in `locales/index.ts`.
- [ ] No bare `toLocaleString()` or manual `¥`/`$` prefix in templates.
- [ ] `LocaleSwitcher` component is present in header, functional (click toggles all text + el components + formatting).
- [ ] `LocaleSwitcher` collapses to globe icon on mobile (< 768px).
- [ ] Active language highlighted in switcher with brand color + medium weight.
- [ ] `locale` persisted to `localStorage`, restored on page load.
- [ ] `<html lang>` attribute updated on locale switch.
- [ ] Logical CSS properties used for margin/padding (`ms-*`/`me-*` not `ml-*`/`mr-*`).
- [ ] Text alignment uses logical properties (`text-start`/`text-end` not `text-left`/`text-right`).
- [ ] Directional icons use `rtl:rotate-180` variant.
- [ ] Action column alignment follows text direction (already covered by action column rule — verify RTL flips naturally).
