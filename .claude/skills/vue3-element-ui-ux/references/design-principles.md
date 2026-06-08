# Design Principles

## Core Principles

- The interface serves task completion, not decoration.
- Clear information hierarchy before visual effects.
- Primary actions must be obvious; secondary actions must be restrained.
- Layout, spacing, colors, and component states must be consistent.
- Mobile is a real experience, not compressed desktop.
- Desktop prioritizes efficiency; mobile prioritizes readability and tap targets.

## Visual Style

- Use neutral colors for backgrounds and text (see `design-tokens.md`).
- Brand color only for primary actions, selected states, key feedback.
- Avoid broad gradients, neon colors, excessive shadows.
- Admin border radius: 6px. Frontend: 8px.
- Shadows only for overlays, dropdowns, dialogs — never for content cards.

## Frontend Goals

For general users. Optimize for low comprehension cost and clear action paths.

**Do:**
- Show page purpose immediately.
- Make the primary next step visible.
- Group content clearly.
- Keep forms short with explicit feedback.
- Preserve readability and tap targets on mobile.
- Use user-friendly language for errors.

**Don't:**
- Empty marketing visuals that delay the task.
- Excessive decorative cards.
- Hidden or ambiguous primary actions.
- Icon-only meaning without labels.
- Mobile layouts that remove critical actions.

## Admin Goals

For high-frequency operational users. Optimize for efficiency, stability, and scanability.

**Do:**
- Keep layout structure stable.
- Use moderate-to-high information density.
- Make tables, filters, batch actions, and forms clear.
- Keep status, time, amount, and quantity fields easy to scan.
- Confirm destructive actions explicitly.

**Don't:**
- Oversized marketing-style headings and whitespace.
- Over-rounded controls, heavy shadows, decorative gradients.
- Card-heavy layouts when tables or lists are more efficient.
- Confused primary/secondary button hierarchy.

## Admin Shell Layout (Mandatory)

All admin pages (`/admin/*`) must use the shared `AdminLayout` shell. Never build standalone admin pages with their own sidebar or header.

**Layout structure:**

```
AdminLayout (el-container, h-screen)
├── AdminHeader (el-header, 48px)
│   ├── Left: system icon + system name
│   └── Right: notification badge + language dropdown + user avatar dropdown
├── Mobile bar (md:hidden) — hamburger button to open drawer
└── el-container (body)
    ├── AdminSidebar (el-aside, 220px expanded / 64px collapsed)
    │   ├── Collapse toggle (☰ hamburger icon, top-right)
    │   └── el-menu (router mode, collapse prop)
    │       ├── el-menu-item — leaf menu items (icon + label)
    │       └── el-sub-menu — parent menu with children
    └── el-main (bg-neutral-50, padding 24px)
        └── router-view — page content
```

**Sidebar menu rules:**
- Menu supports multi-level nesting via `el-sub-menu`. One level of nesting is standard; avoid deep nesting beyond 2 levels.
- Leaf items use `el-menu-item` with `index` = route path for router navigation.
- Parent items use `el-sub-menu` with children; the parent itself does not navigate.
- Collapse state: expanded (220px, icon + label), collapsed (64px, icon only with tooltip).
- Active item: `bg-brand-50 + text-brand-600 + font-medium`.
- Inactive hover: `bg-neutral-50`.
- Mobile: full menu rendered inside `el-drawer` (260px, left side, no header).

**File locations:**
- `src/layouts/AdminLayout.vue` — layout shell
- `src/components/AdminHeader.vue` — top bar
- `src/components/AdminSidebar.vue` — sidebar with multi-level menu

**When creating a new admin page:**
1. Add the route as a child under `/admin` with `AdminLayout` as the parent component.
2. Add the corresponding menu item to `AdminSidebar.vue`'s menu structure.
3. Do not create new layout wrappers, sidebars, or headers in the page component itself.

## Content Guidelines

### Error Messages

Structure: **what happened → why → what to do**.

| Aspect | Frontend | Admin |
| --- | --- | --- |
| Tone | Friendly, helpful | Precise, direct |
| Technical terms | Avoid | OK in details |
| Action guidance | Clear next step | Retry, export, contact admin |
| Example | "Page failed to load. Check your network and retry." | "Request timeout (500). Retry or contact ops." |

### Empty States

- Explain what's missing.
- Tell the user what to do next.
- Provide a creation entry point if the user has permission.
- Never show a blank page.

### Button Copy

- Use verbs: Save, Delete, Cancel, Search, Export.
- Avoid vague labels: OK, Confirm, Got it.
- Destructive buttons must name the action: "Delete User", "Clear Data".

## Quality Criteria

A page is good when:
1. User knows the page's purpose.
2. User knows what to do next.
3. Key information is scannable.
4. The page is still usable in error/empty states.
5. Core tasks work on mobile.
6. Visual style is unified, restrained, and stable.
