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

### Detail Page

Extra focus: key info above the fold, visible status and primary action, clear detail groupings, secondary info (history, logs, notes) not competing with primary, easy return to list.
