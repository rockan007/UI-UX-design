# Design Standards

## Contents

- UI/UX goals
- Frontend goals
- Admin goals
- Design system rules
- Responsive and state requirements

## UI/UX Goals

The interface must help users complete tasks, not merely look decorative.

- Make the current page purpose obvious.
- Make the primary action clear.
- Keep secondary actions visually quieter.
- Use consistent spacing, typography, colors, and component states.
- Treat mobile as a real experience, not a compressed desktop layout.

## Frontend Goals

Frontend pages serve general users. Optimize for low comprehension cost and clear action.

Do:

- Show page purpose quickly.
- Keep the primary next step visible.
- Group content clearly.
- Keep forms short and feedback explicit.
- Preserve readability and tap targets on mobile.

Avoid:

- Empty marketing visuals that delay the actual task.
- Excess decorative cards.
- Hidden primary actions.
- Icon-only meaning without labels or accessible names.
- Mobile layouts that remove critical actions.

## Admin Goals

Admin pages serve repeated, high-frequency work. Optimize for efficiency, stability, and scanability.

Do:

- Keep layout structure stable.
- Use moderate to high information density.
- Make tables, filters, batch actions, and forms clear.
- Keep status, time, money, and quantity fields easy to scan.
- Confirm destructive actions.

Avoid:

- Oversized marketing-style headings.
- Excessive whitespace on operational pages.
- Over-rounded controls, heavy shadows, or decorative gradients.
- Card-heavy layouts when tables or lists are more efficient.
- Confusing primary and secondary button hierarchy.

## Design System Rules

### Color

- Use neutral backgrounds and text hierarchy.
- Use brand color for primary actions, selected states, and key feedback.
- Use distinct colors for danger, success, warning, and error.
- Avoid broad high-saturation gradients.

### Type

- Keep page titles clear but not oversized.
- Use compact headings inside admin panels.
- Keep table type readable for scanning.
- Do not use negative letter spacing.
- Do not scale font size with viewport width.

### Spacing

- Use consistent page margins, section gaps, and component padding.
- Keep form field spacing stable.
- Use table row height that balances readability and density.
- Prefer single-column stacking on mobile.

### Shape and Shadow

- Keep admin border radius around 6px to 8px unless the project already differs.
- Use shadows for overlays, dropdowns, dialogs, and floating menus.
- Do not make every section a floating card.

### Buttons

- Keep one visually dominant primary action per area.
- Use quieter styles for secondary actions.
- Distinguish destructive actions.
- Give icon buttons an accessible name and hover/focus state.
- Keep mobile tap targets large enough.

### Forms

- Order fields according to user workflow.
- Use clear labels and concise help text.
- Place validation errors near fields.
- Group long forms.
- Disable and show loading state during submit.
- Give explicit success or failure feedback.

### Tables

- Put high-frequency fields left.
- Put row actions right.
- Align headers and cells consistently.
- Support loading, empty, and error states.
- Use card lists or horizontal scroll on mobile when needed.

## Required States

Every important page should consider:

- `loading`
- `empty`
- `error`
- `success`
- `disabled`
- `hover`
- `focus`
- `validationError`
- `permissionDenied`
- `mobile`

## Responsive Targets

- `1440px`: use horizontal space well.
- `1024px`: avoid crowding.
- `768px`: reduce complex columns.
- `390px`: use single-column flow and keep primary actions visible.

## Component Interaction Rules

### General

- Interactive elements: `cursor: pointer` + hover visual change (150ms).
- Non-interactive elements: no hover effect (avoid false affordance).
- Focus ring: `2px solid` brand, `outline-offset: 2px`, visible for keyboard nav.
- Disabled: `opacity: 0.5` + `cursor: not-allowed` + ignore events. Never rely on color alone.
- Loading: skeleton or spinner; avoid layout shift.
- Transitions: hover/focus 150ms, toggle 200ms, dialog/drawer 300ms.

### Connector Lines and Border Radius

When a UI element has a visible connector line on one edge (timeline vertical line,
step progress connector, tree branch line), that edge's corner must remain sharp.

- A container using a left/right border as a connector must set that side's radius to `0`.
- Do not apply uniform border-radius to elements that serve as connector-line hosts.
- The connector line is a continuous visual path — rounding its edge breaks the user's
  perception of sequence or hierarchy.

### Cards

- **Clickable card**: hover shadow-sm → shadow-md, border neutral → brand. `cursor: pointer`. Buttons inside use `@click.stop`.
- **Display-only card**: no hover, `cursor: default`.

### Tables

- Row hover: `bg-neutral-50`. Clickable row: `cursor: pointer`.
- Selected row: `bg-brand-50` + left `2px solid brand`.
- Sortable header: hover color shift + click toggles sort icon.
- Non-sortable header: `cursor: default`.
- Pagination: current page highlighted, hover `bg-neutral-100`.

### Charts

- Bar hover: brightness shift + tooltip (200ms delay, label + value + unit).
- Clickable data points: `cursor: pointer`.
- Empty data: show empty state, not blank area.

### Forms

- Validate on blur; full validation on submit.
- Submit button: immediate loading + disabled; prevent double-submit.
- Errors near field: red text + red border + icon; never color alone.
- Success: Toast 2s auto-dismiss, or inline success state.

### Navigation

- Sidebar: active item `bg-brand-50 + text-brand-600 + font-medium`; inactive hover `bg-neutral-50`.
- Tabs: selected gets bottom border + brand color; hover shifts text color.
- Breadcrumbs: last item not clickable `text-primary`; earlier items hover `brand-600`.



### Internationalization

For multi-language projects:

- Design text with expansion tolerance — Chinese→English can be 30–50% longer; labels and buttons must not overflow.
- Support RTL direction — use logical CSS properties (`margin-inline-start`, `text-align: start`) instead of physical ones.
- Use locale-aware formatting for dates, numbers, and currencies — never hardcode formats.
