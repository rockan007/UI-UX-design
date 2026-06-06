# Vue3 Element UI/UX Skill — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Generate a Vue 3 + Element Plus specific Claude Code skill from `docs/ui-ux/` Chinese design docs, with English-compiled references.

**Architecture:** 1 SKILL.md entry point + 7 English reference files compiled from Chinese source docs. All under `.claude/skills/vue3-element-ui-ux/`.

**Tech Stack:** Markdown.

---

### Task 1: Create directory + SKILL.md

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux/SKILL.md`

- [ ] **Step 1: Create directories and write SKILL.md**

```bash
mkdir -p "/Users/anqi/projects/UI:UX design/.claude/skills/vue3-element-ui-ux/references"
```

Write `SKILL.md`:

```markdown
---
name: vue3-element-ui-ux
description: Vue 3 + Element Plus UI/UX design constraints for this project. Use when generating, reviewing, or improving any page in this codebase.
---

# Vue 3 Element Plus UI/UX Design Constraints

Use this skill to make Claude Code produce UI aligned with this project's design system, not free-form code.

## Core Workflow

```text
Page type identification
→ design tokens
→ UI DSL
→ component mapping
→ code generation with interaction rules
→ review checklist
```

Do not start writing page code before outputting UI DSL.

## First Move

When asked to create or improve a page:

1. Identify page type (frontend vs admin) using `references/design-principles.md`.
2. Load design tokens from `references/design-tokens.md`.
3. Generate UI DSL following `references/ui-dsl.md`.
4. Map DSL to Element Plus components using `references/component-system.md`.
5. Implement code following `references/generation-rules.md`.
6. Apply interaction behaviors from `references/interaction-rules.md`.
7. Review with `references/review-checklist.md`.

## Non-Negotiable Rules

- Do not change business logic, API contracts, database structure, or permissions.
- Use Element Plus components + Tailwind CSS for layout/spacing.
- Never introduce another UI framework.
- Use `@element-plus/icons-vue` for icons.
- Do not write random colors, radii, shadows, or one-off styles.
- Every page must cover: `loading`, `empty`, `error`, `disabled`, `hover`, `focus`, validation, permission, and mobile states.
- Admin pages: optimize for scanability, density, tables, filters, forms, repeated use.
- Frontend pages: optimize for clarity, task completion, readable hierarchy, mobile usability.
- Override Element Plus theme only via CSS custom properties, not Tailwind.

## Output Pattern

For a new page, output in this order:
1. Page type and UX goal
2. UI DSL
3. Component mapping summary
4. Code implementation
5. Interaction states covered
6. Review self-check

## Reference Loading Guide

- Read `references/design-principles.md` for frontend vs admin goals and content guidelines.
- Read `references/design-tokens.md` for exact colors, spacing, type, shadows, radii, and animation values.
- Read `references/component-system.md` for component hierarchy and Element Plus mapping tables.
- Read `references/ui-dsl.md` for DSL schema and page templates.
- Read `references/generation-rules.md` for agent rules, workflow steps, and prompt templates.
- Read `references/interaction-rules.md` for hover, focus, disabled, loading behavior on every component type.
- Read `references/review-checklist.md` for post-implementation quality checks.
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add .claude/skills/vue3-element-ui-ux/ && git commit -m "feat: add vue3-element-ui-ux SKILL.md entry point"
```

---

### Task 2: Create references/design-principles.md

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux/references/design-principles.md`
- Source: `docs/ui-ux/01-design-principles.md`

- [ ] **Step 1: Write the file**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add .claude/skills/vue3-element-ui-ux/references/design-principles.md && git commit -m "feat: add skill ref — design principles"
```

---

### Task 3: Create references/design-tokens.md

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux/references/design-tokens.md`
- Source: `docs/ui-ux/02-design-tokens.md`

- [ ] **Step 1: Write the file**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add .claude/skills/vue3-element-ui-ux/references/design-tokens.md && git commit -m "feat: add skill ref — design tokens"
```

---

### Task 4: Create references/component-system.md

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux/references/component-system.md`
- Source: `docs/ui-ux/03-component-system.md`

- [ ] **Step 1: Write the file**

```markdown
# Component System

Component hierarchy and Element Plus mapping. Always map UI DSL to these components before writing code.

## Component Hierarchy

### Base Components (minimal interaction units)

`Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Badge`, `Tabs`, `Dialog`, `DropdownMenu`, `Tooltip`, `Toast`, `Card`, `Table`, `Skeleton`

### Composite Components (page patterns, not business-specific)

`PageShell`, `PageHeader`, `SectionHeader`, `FilterBar`, `DataTable`, `FormSection`, `ActionBar`, `EmptyState`, `ErrorState`, `LoadingState`, `ConfirmDialog`

### Frontend Components

`HeroSection`, `FeatureList`, `ContentSection`, `PricingSection`, `FAQSection`, `SignupForm`, `SearchPanel`, `ResultList`, `DetailSummary`

### Admin Components

`AdminShell`, `SidebarNav`, `TopBar`, `Breadcrumbs`, `MetricGrid`, `DataTable`, `FilterBar`, `BulkActionBar`, `DetailPanel`, `AuditTimeline`, `PermissionNotice`

### Data Visualization (admin dashboards only, not frontend)

`MetricCard`, `SimpleBarChart`, `SimpleLineChart`, `StatusTimeline`

Chart rules:
- Max 4 metric cards per row.
- No 3D, pie, donut, or radar charts.
- Always show labels and values.
- No legend when ≤ 2 data series.
- Use brand + neutral colors only.
- Support empty data state.

## Element Plus Mapping

### Base Components

| UI DSL | Component | Element Plus |
| --- | --- | --- |
| `Button` | `Button` | `ElButton` |
| `Input` | `Input` | `ElInput` |
| `Textarea` | `Textarea` | `ElInput` (type=textarea) |
| `Select` | `Select` | `ElSelect` |
| `Checkbox` | `Checkbox` | `ElCheckbox` |
| `RadioGroup` | `RadioGroup` | `ElRadioGroup` |
| `Switch` | `Switch` | `ElSwitch` |
| `Badge` | `Badge` | `ElTag` |
| `Dialog` | `Dialog` | `ElDialog` |
| `Dropdown` | `DropdownMenu` | `ElDropdown` |
| `Tooltip` | `Tooltip` | `ElTooltip` |
| `Toast` | `Toast` | `ElMessage` |
| `Tabs` | `Tabs` | `ElTabs` |
| `Table` | `Table` | `ElTable` |
| `Skeleton` | `Skeleton` | `ElSkeleton` |

### Composite Components

| UI DSL | Component | Notes |
| --- | --- | --- |
| `PageHeader` | `PageHeader` | Title, description, primary action |
| `FilterBar` | `FilterBar` | Filter controls, reset |
| `DataTable` | `DataTable` | Table, pagination, row actions |
| `FormSection` | `FormSection` | Grouped form fields |
| `ActionBar` | `ActionBar` | Save, cancel, batch actions |
| `EmptyState` | `EmptyState` | Empty data explanation |
| `LoadingState` | `LoadingState` or `Skeleton` | Loading indicator |
| `ErrorState` | `ErrorState` | Request/permission failure |
| `ConfirmDialog` | `ConfirmDialog` | Destructive action confirmation |
| `MetricCard` | `MetricCard` | KPI card |
| `SimpleBarChart` | `SimpleBarChart` | Bar chart |
| `SimpleLineChart` | `SimpleLineChart` | Line chart |
| `StatusTimeline` | `StatusTimeline` | Activity timeline |

## Layout Mapping

| UI DSL Layout | Composition |
| --- | --- |
| `admin-list` | `AdminShell + PageHeader + FilterBar + DataTable` |
| `admin-form` | `AdminShell + PageHeader + FormSection + ActionBar` |
| `admin-detail` | `AdminShell + PageHeader + DetailPanel` |
| `admin-dashboard` | `AdminShell + PageHeader + MetricGrid + SimpleBarChart + SimpleLineChart` |
| `frontend-list` | `PageShell + SearchPanel + ResultList` |
| `frontend-detail` | `PageShell + DetailSummary + ContentSection` |

## Variant Mapping

| Variant | Meaning |
| --- | --- |
| `primary` | Main action button |
| `secondary` | Secondary action button |
| `ghost` | Low-emphasis or icon button |
| `danger` | Destructive action |
| `success` | Success state |
| `warning` | Warning state |
| `error` | Error state |
| `muted` | Low-emphasis text |

## State Mapping

| State | Treatment |
| --- | --- |
| `loading` | `LoadingState`, `Skeleton`, button spinner |
| `empty` | `EmptyState` with explanation and next step |
| `error` | `ErrorState` with retry or recovery |
| `success` | `Toast` or inline success feedback |
| `disabled` | Disabled control, clear visual treatment |
| `validationError` | Field-level error message |
| `permissionDenied` | `PermissionNotice` or `ErrorState` |
| `submitting` | Submit button loading + disabled |

## Icons

- Use `@element-plus/icons-vue`.
- Common icons: `Search`, `Edit`, `Delete`, `Plus`, `ArrowDown`, `Close`.
- Icon buttons must have tooltip or `aria-label`.
- No hand-written SVGs.

## Component Rules

- Base components carry no business meaning.
- Composite components express only generic UI patterns.
- Create a new component only when the pattern repeats across pages and existing components cannot express it.
- Never create a component for a one-off spacing or color variation.
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add .claude/skills/vue3-element-ui-ux/references/component-system.md && git commit -m "feat: add skill ref — component system"
```

---

### Task 5: Create references/ui-dsl.md

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux/references/ui-dsl.md`
- Source: `docs/ui-ux/04-ui-dsl.md`

- [ ] **Step 1: Write the file**

```markdown
# UI DSL

Structured interface plan before code. Output UI DSL first for every page — never write code before the DSL is clear.

## Base Schema

```json
{
  "page": "PageName",
  "type": "frontend | admin | mixed",
  "route": "/path",
  "goal": "Core user task on this page",
  "layout": "layout-name",
  "navigation": {},
  "header": {},
  "sections": [],
  "actions": [],
  "states": [],
  "responsive": {}
}
```

Required fields: `page`, `type`, `route`, `goal`, `layout`, `header`, `sections`, `actions`, `states`, `responsive`.

## Page Templates

### Admin List

```json
{
  "page": "UserManagement",
  "type": "admin",
  "route": "/admin/users",
  "goal": "Admin views, filters, and manages users",
  "layout": "admin-list",
  "header": {
    "title": "User Management",
    "description": "View user status, roles, and recent activity",
    "primaryAction": { "label": "Add User", "component": "Button", "variant": "primary" }
  },
  "filters": [
    { "name": "keyword", "component": "Input", "placeholder": "Search name, email, or phone" },
    { "name": "status", "component": "Select", "placeholder": "Status", "options": ["All", "Active", "Disabled"] }
  ],
  "table": {
    "component": "DataTable",
    "columns": [
      { "key": "name", "label": "User", "priority": "high" },
      { "key": "role", "label": "Role", "priority": "medium" },
      { "key": "status", "label": "Status", "component": "Badge" },
      { "key": "createdAt", "label": "Created" },
      { "key": "actions", "label": "Actions", "align": "right" }
    ]
  },
  "states": ["loading", "empty", "error", "permissionDenied"],
  "responsive": { "desktop": "table", "mobile": "card-list" }
}
```

### Admin Form

```json
{
  "page": "CreateUser",
  "type": "admin",
  "route": "/admin/users/new",
  "goal": "Admin creates a new user",
  "layout": "admin-form",
  "header": { "title": "Add User", "description": "Create account and assign initial role" },
  "form": {
    "sections": [
      {
        "title": "Basic Info",
        "fields": [
          { "name": "name", "label": "Name", "component": "Input", "required": true },
          { "name": "email", "label": "Email", "component": "Input", "required": true },
          { "name": "role", "label": "Role", "component": "Select", "required": true }
        ]
      },
      {
        "title": "Account Status",
        "fields": [
          { "name": "enabled", "label": "Enable Account", "component": "Switch" }
        ]
      }
    ],
    "actions": [
      { "label": "Cancel", "variant": "secondary" },
      { "label": "Save", "variant": "primary" }
    ]
  },
  "states": ["validationError", "submitting", "success", "error"]
}
```

### Admin Dashboard

```json
{
  "page": "Dashboard",
  "type": "admin",
  "route": "/admin",
  "goal": "Admin views key metrics and trends",
  "layout": "admin-dashboard",
  "header": { "title": "Dashboard", "description": "Core metrics for the past 30 days" },
  "sections": [
    {
      "component": "MetricGrid",
      "metrics": [
        { "label": "Active Users", "value": "12,483", "change": "+12%", "trend": "up" },
        { "label": "Orders Today", "value": "347", "change": "+5%", "trend": "up" },
        { "label": "Revenue", "value": "¥38,200", "change": "-3%", "trend": "down" },
        { "label": "Pending", "value": "23", "change": "0%", "trend": "flat" }
      ]
    },
    { "title": "Order Trend (7 days)", "component": "SimpleLineChart" },
    { "title": "By Category", "component": "SimpleBarChart" },
    { "title": "Recent Activity", "component": "StatusTimeline" }
  ],
  "states": ["loading", "empty", "error"],
  "responsive": { "desktop": "sidebar + 4-metrics + 2-charts + timeline", "mobile": "no-sidebar, 2-metrics, stacked-charts" }
}
```

### Admin Detail

```json
{
  "page": "OrderDetail",
  "type": "admin",
  "route": "/admin/orders/:id",
  "goal": "Admin views and processes order details",
  "layout": "admin-detail",
  "header": {
    "title": "Order Detail",
    "breadcrumbs": ["Orders", "ORD-20240606-001"],
    "primaryAction": { "label": "Process Order", "component": "Button", "variant": "primary" }
  },
  "sections": [
    {
      "component": "DetailPanel",
      "groups": [
        { "title": "Order Info", "fields": ["Order No", "Status", "Amount", "Created", "Payment"] },
        { "title": "Customer Info", "fields": ["Name", "Email", "Phone"] }
      ]
    },
    { "component": "DataTable", "title": "Line Items", "columns": [{ "key": "productName", "label": "Product" }, { "key": "quantity", "label": "Qty" }, { "key": "unitPrice", "label": "Unit Price" }, { "key": "subtotal", "label": "Subtotal" }] },
    { "component": "AuditTimeline", "title": "Activity Log" }
  ],
  "states": ["loading", "error", "permissionDenied"],
  "responsive": { "desktop": "detail + table + timeline", "mobile": "stacked-sections" }
}
```

### Admin Settings

```json
{
  "page": "Settings",
  "type": "admin",
  "route": "/admin/settings",
  "goal": "Admin configures system parameters",
  "layout": "admin-form",
  "header": { "title": "Settings", "description": "Manage site configuration and security" },
  "form": {
    "sections": [
      {
        "title": "General",
        "fields": [
          { "name": "siteName", "label": "Site Name", "component": "Input", "required": true },
          { "name": "siteDescription", "label": "Description", "component": "Textarea" }
        ]
      },
      {
        "title": "Security",
        "fields": [
          { "name": "enableRegistration", "label": "Open Registration", "component": "Switch" },
          { "name": "sessionTimeout", "label": "Session Timeout", "component": "Select", "options": ["15 min", "30 min", "1 hour", "4 hours"] }
        ]
      }
    ],
    "actions": [
      { "label": "Reset", "variant": "secondary" },
      { "label": "Save", "variant": "primary" }
    ]
  },
  "states": ["validationError", "submitting", "success", "error"]
}
```

### Frontend List

```json
{
  "page": "CourseList",
  "type": "frontend",
  "route": "/courses",
  "goal": "User browses and finds courses",
  "layout": "frontend-list",
  "header": { "title": "Courses", "description": "Filter by topic, difficulty, and schedule" },
  "sections": [
    { "component": "SearchPanel", "fields": ["keyword", "category", "level"] },
    { "component": "ResultList", "itemComponent": "CourseCard" }
  ],
  "states": ["loading", "empty", "error"],
  "responsive": { "desktop": "filters-left-results-right", "mobile": "filters-collapsed-results-list" }
}
```

## DSL Review Checklist

Before generating code, verify:
- Page goal is specific.
- Layout matches frontend/admin context.
- Primary action is explicit.
- Component names map to real project components.
- Loading, empty, error, disabled, focus, and mobile states are covered.
- Mobile behavior is specified.
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add .claude/skills/vue3-element-ui-ux/references/ui-dsl.md && git commit -m "feat: add skill ref — ui dsl"
```

---

### Task 6: Create references/generation-rules.md

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md`
- Source: `docs/ui-ux/05-generation-rules.md`

- [ ] **Step 1: Write the file**

```markdown
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

### Code Constraints

- Don't change business logic.
- Don't refactor system architecture.
- Don't modify API contracts or database structure.
- Don't create single-use components.
- Don't write random colors, radii, shadows.
- Mobile must not be just a compressed desktop layout.

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

### Form Page

Extra focus: reasonable field grouping, clear required marks, errors near fields, explicit submit feedback, clear cancel/back/save actions, smooth mobile input.

### Detail Page

Extra focus: key info above the fold, visible status and primary action, clear detail groupings, secondary info (history, logs, notes) not competing with primary, easy return to list.
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md && git commit -m "feat: add skill ref — generation rules"
```

---

### Task 7: Create references/interaction-rules.md

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md`
- Source: `docs/ui-ux/07-interaction-rules.md`

- [ ] **Step 1: Write the file**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add .claude/skills/vue3-element-ui-ux/references/interaction-rules.md && git commit -m "feat: add skill ref — interaction rules"
```

---

### Task 8: Create references/review-checklist.md

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`
- Source: `docs/ui-ux/06-review-checklist.md`

- [ ] **Step 1: Write the file**

```markdown
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

## 4. Form Experience

- [ ] Field order follows user workflow.
- [ ] Labels are clear.
- [ ] Required fields are marked.
- [ ] Help text is necessary and concise.
- [ ] Error messages are near the corresponding field.
- [ ] Submit feedback is explicit.
- [ ] Double-submit is prevented (button loading + disabled).
- [ ] Mobile input is smooth.

## 5. Table Experience

- [ ] High-frequency fields are left-aligned.
- [ ] Action column is clear and right-aligned.
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
- [ ] Primary action is visible on mobile.

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
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add .claude/skills/vue3-element-ui-ux/references/review-checklist.md && git commit -m "feat: add skill ref — review checklist"
```

---

### Task 9: Final verification

- [ ] **Step 1: Verify all files exist**

```bash
ls -la .claude/skills/vue3-element-ui-ux/references/
```
Expected: 7 reference files.

- [ ] **Step 2: Verify file count**

```bash
find .claude/skills/vue3-element-ui-ux -type f | wc -l
```
Expected: 8 (SKILL.md + 7 references).

- [ ] **Step 3: Verify git status clean**

```bash
cd "/Users/anqi/projects/UI:UX design" && git status && git log --oneline -10
```

- [ ] **Step 4: Push to skill repo**

```bash
git push origin main
git subtree push --prefix=.claude/skills/vue3-element-ui-ux skill main
```
(Note: this pushes to the main project repo only. For the separate skill repo, use a different remote.)
