# Design Principles

## Core Principles

- The interface serves task completion, not decoration.
- Clear information hierarchy before visual effects.
- Primary actions must be obvious; secondary actions must be restrained.
- Layout, spacing, colors, and component states must be consistent.
- Mobile is a real experience, not compressed desktop.
- Desktop prioritizes efficiency; mobile prioritizes readability and tap targets.

## Visual Style

- Page background uses neutral colors. Section zones may use light tinted background tokens (`surface-*`) from `design-tokens.md` for visual distinction between content regions.
- Brand color for primary actions, selected states, and key feedback. Semantic colors (blue, cyan, amber, green) may be used for data visualization, stat card accent stripes, and tonal card backgrounds.
- Prohibited: gradient backgrounds, neon colors, saturated backgrounds. Allowed: subtle tinted backgrounds (`*-50` level tokens), `shadow-sm` on chart containers only.
- Admin border radius: 6px. Frontend: 8px.
- Shadows: `shadow-sm` for overlay components and chart/data-viz containers only. `shadow-md`/`shadow-lg` for dialogs, drawers, dropdowns. No shadows on tables, forms, list containers, or stat cards (stat cards use accent stripes, not elevation).

## Admin Container System

Admin pages use three container tiers to create visual rhythm. Do not use a single flat card style for every content block.

### Container Tiers

| Tier | Style | When to Use |
| --- | --- | --- |
| **Accent Card** | White background + `border` + left 3px colored stripe | Stat/metric cards — color distinguishes data category per `design-tokens.md` accent stripe table |
| **Raised Panel** | White background + no border + `shadow-sm` | Chart containers, key data visualizations — floats above page surface |
| **Standard Block** | White background + `border` (current default) | Tables, forms, activity lists — keeps functional areas clean and scanable |

### Section Shading

When a page has 3+ distinct content zones (each with its own heading — e.g., stats row, chart panel, data table, activity feed), group related cards inside a lightly tinted background wrapper (`surface-*` tokens) to form visual "regions." Each zone wrapper gets `rounded-md` padding and the appropriate `surface-*` background.

- A "zone" is a distinct content block with its own heading — stats row, chart panel, data table, activity feed, filter bar + results.
- Pages with only 1-2 zones stay flat — no section shading needed.
- Zone backgrounds always use `*-50` level tint tokens. Never saturated or dark backgrounds.

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
- Flat uniform card styling across the entire page — vary container treatments per the container tier system.

## Mobile List Pages

At viewports below 768px, admin list pages switch from table to card list layout. Desktop table layout remains unchanged above 768px.

- Each table row becomes a stacked card with 4 layers: primary ID + status, person/entity + amount, attribute tags, meta info + actions.
- Search input stays visible. Other filters move into a bottom drawer (`el-drawer` direction btt).
- Pagination simplifies to prev/next buttons with page indicator (`1 / N`).
- Summary cards use `grid-cols-2` on mobile with compact padding (`p-2.5` vs `p-4`) and smaller type (`text-base` vs `text-2xl`).
- Action buttons move into a three-dot dropdown (`el-dropdown` with `MoreFilled` icon) to save horizontal space.
- Use `hidden md:block`/`hidden md:flex` for desktop elements, `md:hidden` for mobile elements. Do not use `v-if` with window width — CSS breakpoints are sufficient.

## Admin CRUD Navigation

- List → Create: "创建" button on list page, navigates to `/admin/{entity}/create`.
- List → Detail: clicking a row/card navigates to `/admin/{entity}/:id`.
- Detail → Edit: "编辑" button on detail page, navigates to `/admin/{entity}/:id/edit`.
- Create/Edit/View share a single form component, detecting mode via route name. View mode: read-only fields, status tag in breadcrumb row, Edit + Delete toolbar buttons. Create mode: empty editable fields, Submit + Cancel buttons. Edit mode: pre-filled editable fields, Save + Cancel buttons.
- All navigation reflected in breadcrumb, tracking the operation path.
- Form fields: required fields grouped under "基本信息", secondary fields under "其他信息" with divider.

## Admin Shell Layout (Mandatory)

All admin pages must use the shared `AdminLayout` shell regardless of their route prefix (`{admin-prefix}`). Never build standalone admin pages with their own sidebar or header.

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
1. Add the route as a child under `{admin-prefix}` with `AdminLayout` as the parent component.
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
