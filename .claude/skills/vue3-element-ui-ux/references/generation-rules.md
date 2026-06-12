# Generation Rules

Rules, workflow, and prompt templates for page generation. Follow these exactly.

## Agent Rules

### Must Follow

1. Read `docs/ui-ux` specs before generating any page.
2. Output UI DSL before writing code.
3. After DSL is confirmed, map components before coding.
4. Prefer existing components and design system.
5. Do not randomly create new components.
6. Do not write one-off styles.
7. Do not change business logic, API contracts, or database structure.
8. Do not introduce new UI libraries.
9. Every page must cover all required states.
10. After implementation, run UI/UX review.
11. **All admin pages must use the shared `AdminLayout` shell.** Never create an admin page with its own sidebar, header, or layout wrapper. Add the route as a child under `{admin-prefix}` and add the menu item to `AdminSidebar.vue`.
12. AdminSidebar supports multi-level menus via `el-sub-menu`. When adding a parent category, nest child items under `el-sub-menu`. Keep nesting to 1-2 levels.
13. **Configure Element Plus locale in `main.ts`.** If project i18n is NOT enabled (no `"vue3ElementUiUx": { "i18n": true }` in package.json): import `zhCn` from `element-plus/dist/locale/zh-cn.mjs` and pass `{ locale: zhCn }` to `app.use(ElementPlus, ...)`. If i18n IS enabled: the i18n infrastructure (`i18n-rules.md`) handles this via `elLocaleMap` and `el-config-provider` — do not hardcode `zhCn` separately.

14. **If project i18n is enabled** (package.json contains `"vue3ElementUiUx": { "i18n": true }`), read `i18n-rules.md` before generating any page. All user-facing text must use `$t()` keys, formatting must use `$n()` / `$d()`, and `LocaleSwitcher` must be included in the header.

### Code Constraints

- Don't change business logic.
- Don't refactor system architecture.
- Don't modify API contracts or database structure.
- Don't create single-use components.
- Don't write random colors, radii, shadows.
- Mobile must not be just a compressed desktop layout.
- **Don't create standalone admin pages with their own layout.** All admin pages are children of AdminLayout.

### Required States

Every page: `loading`, `empty`, `error`, `success feedback`, `disabled`, `hover`, `focus`, `validation error`, `permission denied`, `mobile layout`.

## Page Generation Workflow

```
Requirements input
→ Identify page type
→ Generate UI DSL
→ Review DSL
→ Map components
→ Generate code
→ Start project and inspect
→ Fix UI issues
→ Output change summary
```

### 1. Requirements

User provides: page path, page type (frontend/admin), page goal, main content, main actions.

### 2. Page Type

Classify: frontend list, frontend detail, admin list, admin form, admin detail, dashboard, settings.

### 3. UI DSL

Output structured DSL first. Include: `page`, `type`, `route`, `goal`, `layout`, `header`, `sections`, `actions`, `states`, `responsive`.

### 4. DSL Review

Check: clear goal, reasonable primary action, clear hierarchy, component selection matches mapping, complete states, explicit mobile plan.

### 5. Component Mapping

Use `component-system.md` mapping table. If no match exists, explain: why existing components are insufficient, what category the new component belongs to, whether it's reusable, whether it affects other pages.

### 6. Code Generation

- Keep scope minimal.
- Prefer existing components.
- Follow `design-tokens.md` for styles.
- Don't modify unrelated files.

### 7. Project Check

If local dev is available, start dev server and inspect pages at: 1440px, 1024px, 768px, 390px.

### 8. Fix UI Issues

Must fix: text overflow, element overlap, unclear primary actions, spacing inconsistency, mobile unusability, missing states, unclear form errors.

### 9. Change Summary

Output: files changed, UX problems solved, checks performed, remaining risks.

## Prompt Templates

### Pre-generation

```
Read the UI/UX specs first.
Generate UI DSL for this page. Do not write code yet.

UI DSL must include: page, type, route, goal, layout, header, sections (or form/table), actions, states, responsive.

After generation, explain the design rationale.
```

### Pre-code

```
Based on the confirmed UI DSL and component mapping, generate page code.

Requirements:
- Prefer existing components.
- Don't change business logic or API contracts.
- Don't add unnecessary dependencies.
- Cover: loading, empty, error, disabled, hover, focus, mobile states.
- Run project check after completion.
```

### Pre-review

```
Review this page as a senior UI/UX designer. Focus on:
1. Task completion path
2. Information hierarchy
3. Visual consistency
4. Form or table experience
5. Responsive design
6. State feedback
7. Accessibility

Fix issues directly. Don't change business logic.
```

### Page Optimization

```
Optimize page UI/UX only: {path}

Page goal: {description}

Boundaries:
- Don't change business logic, API, or database.
- Don't refactor unrelated code.
- Prefer existing components and styles.

Review:
1. Information hierarchy
2. Action paths
3. Layout and spacing
4. Form experience
5. Data display
6. Interaction states (loading, empty, error, success, disabled, hover, focus, validation)
7. Responsive (1440px, 1024px, 390px)

After completion: list issues found, changes made, checks run.
```

## Page Type Supplements

### Admin List Page

Extra focus: compact filter area, scannable table, clear batch actions, not too many action columns, empty state with next step, mobile usability.

### Action Column Rule

When a table's operation column contains 2+ actions:

- **Icon-only:** Use `el-button` with `:icon` only, no text content. Text labels move to tooltip.
- **Tooltip:** Wrap each button with `el-tooltip`, `content` = action name, `placement="top"`, `:show-after="300"`, `:hide-after="0"`.
- **Column width:** `(28 + 8) × maxPossibleActions + 16`, round up to nearest 10px. `maxPossibleActions` is the total number of buttons defined in the template (including `v-if` conditional ones), not per-row visible count.
- **Alignment:** Follow text direction — LTR pages left-align, RTL pages right-align. Do NOT center the action column.
- **Gap:** `gap-2` (8px) between buttons via Tailwind.
- **Button types:** Primary/view action → `type="primary"`, delete → `type="danger"`, others → default `link`.

Example for 3 max buttons (width = 130px):

```html
<el-table-column label="操作" width="130" fixed="right">
  <template #default="{ row }">
    <div class="flex items-center gap-2">
      <el-tooltip content="查看" placement="top" :show-after="300" :hide-after="0">
        <el-button type="primary" link size="small" :icon="View" @click="handleView(row)" />
      </el-tooltip>
      <el-tooltip content="编辑" placement="top" :show-after="300" :hide-after="0">
        <el-button link size="small" :icon="Edit" @click="handleEdit(row)" />
      </el-tooltip>
      <el-tooltip content="删除" placement="top" :show-after="300" :hide-after="0">
        <el-button type="danger" link size="small" :icon="Delete" @click="handleDelete(row)" />
      </el-tooltip>
    </div>
  </template>
</el-table-column>
```

### Form Page

Extra focus: reasonable field grouping, clear required marks, errors near fields, explicit submit feedback, clear cancel/back/save actions, smooth mobile input.

### Admin Dashboard & Stat Pages

Extra focus: container variety, section shading, visual rhythm. Admin pages with multiple data zones must not use uniform white-card styling throughout.

**Container Tier Selection:**

| Content Type | Container Tier | Style |
| --- | --- | --- |
| Stat/metric cards | Accent Card | White bg + border + left 3px stripe (`border-l-[3px] border-l-{color} border border-neutral-200 rounded-btn`) |
| Chart/visualization panels | Raised Panel | White bg + no border + `shadow-sm rounded-btn` |
| Tables, lists, activity feeds | Standard Block | White bg + border (current default) |

**Stripe Color Assignment:**

- Blue (`#2563eb`): user, traffic, system KPI metrics
- Cyan (`#0891b2`): order, transaction, processing metrics
- Amber (`#d97706`): revenue, finance, pending, warning metrics
- Green (`#16a34a`): success, completion, growth metrics

**Section Shading:**

When a dashboard has 3+ zones (each with a heading), wrap each zone in a tinted container:

```html
<!-- Example: charts zone with blue tint -->
<div class="bg-surface-blue rounded-btn p-5 mb-6">
  <h3 class="text-base font-semibold text-neutral-950 mb-4">Charts</h3>
  <!-- chart panels inside -->
</div>
```

- Use `surface-blue` for user/system zones, `surface-cyan` for order/transaction zones, `surface-amber` for revenue/finance zones, `surface-green` for completion zones, `surface-neutral` for secondary/chart housing zones, `surface-warm` for activity/log zones.
- Pages with 1-2 zones: no section shading needed — individual containers provide enough variety.
- Zone backgrounds always use the lightest tint tokens (`*-50` level). Never saturated or dark backgrounds.

**Stat Card Template:**

Stat cards use accent stripes and stand alone on the page background — do NOT wrap them in a tinted zone. The stripe color comes from the data object via `:style`.

```html
<!-- Stat card grid — no zone wrapper, cards float on page background -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
  <div class="bg-white border border-neutral-200 rounded-btn p-3 md:p-4
              hover:shadow-md transition-shadow duration-150 cursor-pointer"
       :style="{ borderLeft: `3px solid ${m.color}` }">
    <div class="text-sm text-neutral-500 mb-2">{{ label }}</div>
    <div class="text-xl md:text-2xl font-bold text-neutral-950 mb-1">{{ value }}</div>
    <div class="text-sm text-green-600">↑ +12% vs last month</div>
  </div>
</div>
```

Key points:
- No zone wrapper — accent stripes already distinguish the cards visually.
- Responsive: `p-3 md:p-4` for padding, `text-xl md:text-2xl` for value, `gap-3 md:gap-4` for grid spacing.
- Stripe colors come from the data model, not hardcoded.

**Chart Panel Template (Raised Panel):**

```html
<div class="bg-white rounded-btn shadow-sm p-4 md:p-5">
  <h3 class="text-base font-semibold text-neutral-950 mb-5">Chart Title</h3>
  <!-- chart content -->
</div>
```

**Bar Chart — Responsive Width:**

On desktop, bars use fixed width (`md:w-10`) for consistent rhythm. On mobile, bars adapt to fill available space (`flex-1 w-full`) to prevent overflow without scrollbars.

```html
<div class="flex items-end justify-center gap-3 md:gap-5 h-[200px] px-1 md:px-2">
  <div v-for="(val, i) in chartValues" :key="i"
       class="flex-1 md:flex-initial flex flex-col items-center gap-1">
    <span class="text-xs text-neutral-500">{{ val }}</span>
    <div class="w-full md:w-10 transition-all duration-150 cursor-pointer hover:brightness-90"
         :style="{ height: `${(val / max) * 160}px`, background: '...' }"></div>
    <span class="text-xs text-neutral-400 mt-2">{{ label }}</span>
  </div>
</div>
```

Key points:
- Bar column: `flex-1 md:flex-initial` — fills space on mobile, natural width on desktop.
- Bar shape: `w-full md:w-10` — adaptive on mobile, fixed 40px on desktop.
- Gap: `gap-3 md:gap-5` — tighter on mobile, ratio ~50% on desktop.
- No horizontal scrollbar — bars shrink to fit instead.

**Zone Wrapper — Responsive Padding:**

```html
<div class="bg-surface-neutral rounded-btn p-4 md:p-5 mb-4 md:mb-6">
  <!-- grouped content -->
</div>
```

Mobile: 16px padding / 16px bottom margin. Desktop: 20px padding / 24px bottom margin.

### Admin List Page — Mobile Card List

At viewports below 768px, admin list pages switch from `el-table` to a card list using `hidden md:block` for desktop elements and `md:hidden` for mobile elements. No JavaScript window-width detection — CSS breakpoints only.

**Summary Cards (mobile):**
- Grid: `grid-cols-2 md:grid-cols-3 gap-2 md:gap-4`
- Padding: `p-2.5 md:p-4`
- Label font: `text-[10px] md:text-sm`
- Value font: `text-base md:text-2xl`

**Filter Bar (mobile):**
- Desktop: inline filter bar with `hidden md:flex` (current layout unchanged)
- Mobile: search input (`flex-1`) + filter button triggers `el-drawer` (`direction="btt"`, `size="auto"`)
- Drawer contains all filter dropdowns stacked vertically, with "Apply" and "Reset" buttons
- Import `Operation` icon from `@element-plus/icons-vue` for the filter button

**Card Structure (4 layers per card):**

```html
<div class="bg-white rounded-btn border border-neutral-200 p-3">
  <!-- Layer 1: Primary ID + Status badge -->
  <div class="flex items-center justify-between mb-2">
    <span class="text-xs font-semibold text-brand-600">{{ row.id }}</span>
    <el-tag :type="statusType" size="small" effect="light">{{ statusLabel }}</el-tag>
  </div>
  <!-- Layer 2: Person/Entity + Amount -->
  <div class="flex items-center justify-between mb-2">
    <span class="text-sm text-neutral-700">{{ row.customer }} · {{ row.phone }}</span>
    <span class="text-sm font-semibold text-neutral-950">{{ formattedAmount }}</span>
  </div>
  <!-- Layer 3: Attribute tags (max 2 + "+N") -->
  <div class="flex flex-wrap gap-1 mb-2">
    <el-tag v-for="(item, i) in row.items.slice(0, 2)" :key="i" size="small" effect="plain" type="info">
      {{ item }}
    </el-tag>
    <el-tag v-if="row.items.length > 2" size="small" effect="plain" type="info">+{{ row.items.length - 2 }}</el-tag>
  </div>
  <!-- Layer 4: Meta info + Three-dot action menu -->
  <div class="flex items-center justify-between">
    <span class="text-[10px] text-neutral-400">{{ row.channel }} · {{ row.createdAt }}</span>
    <el-dropdown trigger="click" @command="(cmd) => handleCardAction(cmd, row)">
      <el-button link size="small" class="text-neutral-500" @click.stop>
        <el-icon :size="18"><MoreFilled /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="view">
            <el-icon :size="14" class="mr-1"><View /></el-icon> View
          </el-dropdown-item>
          <el-dropdown-item command="edit">
            <el-icon :size="14" class="mr-1"><Edit /></el-icon> Edit
          </el-dropdown-item>
          <el-dropdown-item command="delete" divided>
            <el-icon :size="14" class="mr-1" color="#dc2626"><Delete /></el-icon>
            <span class="text-red-600">Delete</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</div>
```

**Card Action Handler:**

```typescript
const handleCardAction = (cmd: string, row: RowType) => {
  if (cmd === 'view') handleView(row)
  else if (cmd === 'edit') handleEdit(row)
  else if (cmd === 'delete') handleDelete(row)
}
```

Uses `MoreFilled` from `@element-plus/icons-vue` for the three-dot icon. `@click.stop` on the dropdown trigger prevents card-level click propagation.

**Pagination (mobile):**

```html
<div class="flex md:hidden items-center justify-center gap-3 mb-4">
  <el-button size="small" :disabled="currentPage <= 1" @click="currentPage--">
    ‹ Prev
  </el-button>
  <span class="text-sm text-neutral-500">{{ currentPage }} / {{ totalPages || 1 }}</span>
  <el-button size="small" :disabled="currentPage >= totalPages" @click="currentPage++">
    Next ›
  </el-button>
</div>
```

Desktop pagination inside the table container uses `hidden md:flex` wrapper and keeps full `el-pagination`.

**Visibility control:** Use Tailwind responsive display classes — `hidden md:block` / `hidden md:flex` for desktop-only elements, `md:hidden` for mobile-only elements.

### Detail Page

Extra focus: key info above the fold, visible status and primary action, clear detail groupings, secondary info (history, logs, notes) not competing with primary, easy return to list.

### Breadcrumb Navigation

Every admin page starts with an `el-breadcrumb` replacing the traditional `<h1>` header. The separator is `/`. Spacing: `mb-4 md:mb-6`.

**Rule:** Breadcrumbs reflect the functional operation path, NOT the sidebar menu hierarchy.

- Level 1 = current menu entry page (e.g. "用户列表", "订单管理")
- Level 2+ = operation depth (create form, detail record, sub-operation)
- Last level = current page, plain text, not clickable
- Previous levels = clickable `:to` links navigating to their respective pages

**Single-level (menu entry page):**

```html
<el-breadcrumb separator="/" class="mb-4 md:mb-6">
  <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
</el-breadcrumb>
```

**Multi-level (deeper pages):**

```html
<el-breadcrumb separator="/" class="mb-4 md:mb-6">
  <el-breadcrumb-item :to="{ path: '/admin/users/list' }">用户列表</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/admin/users/detail/ORD-001' }">ORD-001</el-breadcrumb-item>
  <el-breadcrumb-item>操作记录</el-breadcrumb-item>
</el-breadcrumb>
```

### Admin CRUD Pattern

Admin entity management follows a standard CRUD flow: list → create → detail → edit.

**Route structure:**

```
/admin/{entity}              → List page
/admin/{entity}/create       → Create form
/admin/{entity}/:id          → Detail page
/admin/{entity}/:id/edit     → Edit form
```

**Breadcrumb for CRUD pages:**

- List: `{entity name}`
- Create: `{entity name} / 创建{entity}`
- Detail: `{entity name} / {record id}`
- Edit: `{entity name} / {record id} / 编辑`

**Shared form pattern (create/edit):**

Use the same form component for create and edit. Detect mode via route name:

```typescript
const isEdit = computed(() => route.name === '{entity}-edit')
const pageTitle = computed(() => isEdit.value ? '编辑' : '创建')
```

On mount, if editing, load existing data and pre-fill the form. On submit, call update or create based on mode.

**Form field grouping:**

- **Required fields** first, grouped under a section label (e.g., "基本信息")
- **Secondary fields** below a divider (`border-t border-neutral-100 pt-4`), grouped under "其他信息"
- Submit/Cancel buttons in a footer area, also separated by divider

**Detail page structure:**

- Breadcrumb with back navigation
- Header: record ID + status badge
- Detail cards: 2-column grid for key info (`grid grid-cols-1 md:grid-cols-2 gap-4`)
- Secondary info card (full-width, conditional)
- Action bar: Edit + Delete buttons

**List page integration:**

- "创建" button: desktop above table (`hidden md:flex justify-end`), mobile above card list (`flex md:hidden justify-end`)
- Row/card click navigates to detail: `@row-click` on `el-table`, `@click` + `cursor-pointer` on card
