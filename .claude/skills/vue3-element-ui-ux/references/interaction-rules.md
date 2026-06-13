# Interaction Rules

Component interaction behavior rules. Every component must have proper interactive states — no static, non-interactive components.

## General

- Interactive elements: `cursor: pointer` + hover visual change (`duration-fast` 150ms).
- Non-interactive elements: no hover effect (avoid false affordance).
- Focus ring: `2px solid` brand-600, `outline-offset: 2px`, visible for keyboard nav.
- **Disabled:** `opacity: 0.5` + `cursor: not-allowed` + ignores click/keyboard events. Never rely on color alone.
- **Loading:** skeleton or spinner; no layout shift.
- **Transitions:** hover/focus 150ms, toggle 200ms, dialog/drawer 300ms.

> Applies to: both

### Connector Lines vs. Border Radius

**Rule:** When a container has a visible connector line on one side (timeline vertical line,
step connector, branch line), that side's border-radius must be `0`. Rounding the corner
breaks visual continuity of the connector line.

| Connector side | CSS |
|---|---|
| Left border | `border-l-*` + `rounded-l-none` |
| Right border | `border-r-*` + `rounded-r-none` |
| Top border | `border-t-*` + `rounded-t-none` |
| Bottom border | `border-b-*` + `rounded-b-none` |

Do not apply a uniform `rounded-*` to containers that use `border-l-*` / `border-r-*` as connector lines.
Use directional radius instead: `rounded-r-btn` for a left-side connector, `rounded-l-btn` for a right-side connector.

> Applies to: both

## Cards

### Clickable Cards
- Hover: `shadow-sm → shadow-md`, `border-neutral-200 → brand-200`.
- `cursor: pointer`.
- Inner buttons use `@click.stop` to prevent event bubbling.

### Display-Only Cards
- No hover effect, `cursor: default`.
- Don't add meaningless card-level clicks.

> Applies to: frontend primarily; admin metric cards may use clickable card hover.

## Tables

### Data Rows
- Hover: `background: neutral-50` (`#f5f5f5`).
- Clickable row: `cursor: pointer`.
- Selected row: `background: brand-50` (`#eff6ff`) + left `2px solid` brand-600.

### Headers
- Sortable: hover color shift + click toggles sort icon (asc/desc/none).
- Non-sortable: `cursor: default`.
- Sort state must be visually distinct.

### Pagination
- Current page: highlighted background.
- Page button hover: `background: neutral-100`.
- Disabled buttons (first/last page): disabled state.

> Applies to: admin primarily.

### Action Buttons

Icon-only action buttons in table operation columns:

- Hover: tooltip appears after 300ms (`:show-after="300"`), no hide delay (`:hide-after="0"`).
- Placement: `top` to avoid overlapping adjacent table rows.
- Minimum click target: 28×28px (default for `el-button size="small" :icon`).
- Destructive action (delete): `type="danger"`.
- Primary/view action: `type="primary"`.
- Other actions: default `link` style.
- Each button must have accessible label via `el-tooltip content`.

## Charts

### Bar / Column Charts
- Bar hover: brightness shift (`filter: brightness(0.9)`) + tooltip with exact value.
- Tooltip: 200ms delay, content = "label + value + unit", disappears on leave.
- Clickable data points: `cursor: pointer`.

### Spacing & Shape

- **Gap-to-bar ratio:** Gap between bars should be 50%–100% of bar width. Default to ~50% (bar = 2× gap).
- **Bar width is fixed** — do not use `flex-1` to stretch bars across the container.
- **Straight bar tops only.** Never use `rounded-t-*` on bar chart columns. The top edge must be a precise visual endpoint.
- Bars that are too wide relative to gaps (>4:1 ratio) appear visually unbalanced and lose the rhythm of discrete data points.

### Line Charts
- Data point hover: dot enlarges + tooltip.
- The line itself does not respond to hover.

### Empty Data
- Show empty state ("No data"), not a blank area.
- Optional: guide user to add data.

> Applies to: admin dashboards.

## Forms

### Validation
- **Timing:** validate on blur for current field; full validation on submit.
- Do not block user input during validation.

### Submit
- Submit button immediately enters loading + disabled.
- Must prevent double-submit (frontend throttle + backend idempotency).
- Success: Toast feedback, 2s auto-dismiss, or inline success state.
- Failure: restore button to clickable, show error message.

### Error Display
- Place near the corresponding field.
- Red text (`danger` `#dc2626`) + red input border + error icon.
- Never use color alone to convey error.

### Required Fields
- Red asterisk (`*`) after label.
- Optional: "(Optional)" marker for non-required fields.

> Applies to: both.

## Navigation

### Sidebar
- Active item: `bg-brand-50 + text-brand-600 + font-medium`.
- Inactive hover: `bg-neutral-50`.
- Active and focus states must be visible.
- Collapse/expand: 200ms transition.
- Collapsed state: `overflow-x: hidden` to clip overflow content and prevent horizontal scrollbar.

### Tabs

- Selected: bottom `2px` border + `brand-600` text + `font-weight: 500`
- Hover: text shifts to `brand-600`
- No content jump on tab switch — panes render instantly
- No validation on tab switch — free navigation between tabs
- Active tab state is local component state (`ref<string>`), not in URL/route
- Scroll position resets to top of tab pane on switch

**Tab Bar in Forms:**

- Tab bar sits between toolbar and form content, using `<el-tabs v-model="activeTab" tab-position="top">`
- All tabs always visible — no horizontal scroll or "more" dropdown. If too many tabs,
  restructure the form rather than adding scrolling.
- Minimum 2 tabs to render the tab bar; fewer = no tabs (section cards only)

**O2M/M2M Tab Badge:**

- Use `<el-badge :value="items.length" :hidden="items.length === 0">` in tab label slot
- Inactive tab badge: `var(--neutral-400)` background
- Active tab badge: `var(--brand-600)` background
- No badge when count is 0

**Validation Error on Hidden Tab:**

- Single submit validates ALL tabs, not just the visible one
- If validation errors exist on a hidden tab:
  - Submit fails
  - Auto-switch to the first tab with errors
  - Error tab label turns red (`var(--danger-600)`) with a `WarningFilled` icon
  - `<el-badge>` on error tab switches to `type="danger"`
- After user fixes errors and re-submits, error indicators clear

**Mobile Tabs:**

- On viewport < 768px, tabs collapse entirely — no tab bar, no dropdown
- Tab bar: `hidden md:flex`
- All section cards render as a flat vertical stack with `gap-4`
- This matches the current non-tab mobile layout behavior

### Breadcrumbs
- Last item (current page): not clickable, `color: neutral-950`.
- Earlier items: clickable, hover `color: brand-600`.
- Separators are not interactive.

> Applies to: both.

## Applicability Index

| Component | Frontend | Admin |
| --- | --- | --- |
| Clickable cards | Primary use | Metric card hover OK |
| Display cards | Content display | Data cards |
| Tables | Uncommon | Primary use |
| Charts | Uncommon | Dashboards |
| Form validation | Simplified | Full |
| Sidebar | Optional | Standard |
| Tabs | Content categories, form sections | Feature switching, admin form tabs |
