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

### Tabs
- Selected: bottom `2px` border + brand-600 text.
- Hover: text shifts to brand-600.
- No content jump on tab switch.

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
| Tabs | Content categories | Feature switching |
