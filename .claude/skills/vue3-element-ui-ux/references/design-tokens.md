# Design Tokens

Exact values for all visual properties. Do not guess colors, spacing, or font sizes.

## Colors

### Neutral Scale

| Token | Value | Usage |
| --- | --- | --- |
| `neutral-50` | `#fafafa` | Page background |
| `neutral-100` | `#f5f5f5` | Surface background |
| `neutral-200` | `#e5e5e5` | Border |
| `neutral-300` | `#d4d4d4` | Disabled text |
| `neutral-500` | `#737373` | Muted/placeholder |
| `neutral-800` | `#262626` | Secondary text |
| `neutral-950` | `#0a0a0a` | Primary text |
| `white` | `#ffffff` | Card background |

### Brand

| Token | Value | Usage |
| --- | --- | --- |
| `brand-50` | `#eff6ff` | Selected background |
| `brand-600` | `#2563eb` | Primary button, link, focus ring |
| `brand-700` | `#1d4ed8` | Primary button hover |

### Semantic

| Token | Value | Usage |
| --- | --- | --- |
| `success` | `#16a34a` | Success badge, toast |
| `danger` | `#dc2626` | Delete button, error text |
| `warning` | `#d97706` | Warning badge |
| `info` | `#0891b2` | Info badge, tooltip |

### Rules

- Brand color only for primary actions, selected states, key feedback.
- Danger color for destructive actions only.
- No broad gradients or neon backgrounds.

## Dark Mode

Only neutrals invert. Brand and semantic colors stay the same:

| CSS Variable | Light | Dark |
| --- | --- | --- |
| `--bg-page` | `#fafafa` | `#0a0a0a` |
| `--bg-surface` | `#ffffff` | `#171717` |
| `--text-primary` | `#0a0a0a` | `#fafafa` |
| `--text-secondary` | `#525252` | `#a3a3a3` |
| `--text-muted` | `#737373` | `#737373` |
| `--border` | `#e5e5e5` | `#262626` |

## Spacing

4px base unit:

| Token | Value | Usage |
| --- | --- | --- |
| `space-1` | `4px` | Icon-text gap |
| `space-2` | `8px` | Inline gap |
| `space-3` | `12px` | Compact padding |
| `space-4` | `16px` | Default gap |
| `space-6` | `24px` | Section gap |
| `space-8` | `32px` | Page padding |
| `space-12` | `48px` | Large section gap |

### Admin vs Frontend Defaults

| Context | Admin | Frontend |
| --- | --- | --- |
| Page padding | `24px` | `32px` |
| Card padding | `16px` | `24px` |
| Table cell | `12px 16px` | `12px 16px` |
| Form field gap | `16px` | `20px` |
| Large section gap | `32px` | `48px` |

## Typography

| Token | Size | Line Height | Usage |
| --- | --- | --- | --- |
| `text-xs` | `12px` | `16px` | Table cells (admin), help text, badges |
| `text-sm` | `13px` | `20px` | Secondary info, timestamps, labels |
| `text-base` | `15px` | `22px` | Body text (admin may use 14px) |
| `text-lg` | `16px` | `24px` | Table headers, sidebar sections |
| `text-xl` | `20px` | `28px` | Card titles, form section titles |
| `text-2xl` | `24px` | `32px` | Admin page titles, frontend section headers |
| `text-3xl` | `30px` | `36px` | Frontend page titles (not for admin) |

### Font Weight

- Headings: `600` or `700`
- Body: `400`
- Emphasis: `500`
- No negative letter-spacing.
- No viewport-width font scaling.

## Border Radius

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | `4px` | Inputs, badges |
| `radius-md` | `6px` | Buttons, cards (admin) |
| `radius-lg` | `8px` | Dialogs, cards (frontend) |
| `radius-xl` | `12px` | Drawers, large cards |
| `radius-full` | `9999px` | Badge pills, avatars |

## Shadows

Only 3 levels, only for overlay components:

| Level | Value | Usage |
| --- | --- | --- |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)` | Dropdown, tooltip |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06)` | Dialog, popover |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.06)` | Drawer, sheet |

No decorative shadows on cards, tables, forms, or content areas.

## Animation

### Duration

| Token | Value | Usage |
| --- | --- | --- |
| `duration-fast` | `150ms` | Hover, focus |
| `duration-base` | `200ms` | Toggle, fade |
| `duration-slow` | `300ms` | Dialog, drawer |

### Easing

| Token | Value | Usage |
| --- | --- | --- |
| `ease-default` | `ease-out` | Enter animations |
| `ease-expressive` | `cubic-bezier(0.16, 1, 0.3, 1)` | Frontend spring effects |

**Admin: `ease-default` only, no spring easing.** Frontend: spring allowed for hero/landing sections.
