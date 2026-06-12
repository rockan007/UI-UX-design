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

`AdminShell` (`AdminLayout` + `AdminHeader` + `AdminSidebar`), `TopBar`, `Breadcrumbs`, `MetricGrid`, `ZoneContainer`, `DataTable`, `FilterBar`, `FilterDrawer`, `BulkActionBar`, `DetailPanel`, `AuditTimeline`, `PermissionNotice`

`AdminShell` is the mandatory layout wrapper for all admin pages (under `{admin-prefix}`). See `design-principles.md` Admin Shell Layout section for full structure. The sidebar (`AdminSidebar`) supports multi-level menus via `el-sub-menu`.

### Data Visualization (admin dashboards only, not frontend)

`MetricCard`, `SimpleBarChart`, `SimpleLineChart`, `StatusTimeline`

Chart rules:
- Max 4 metric cards per row.
- No 3D, pie, donut, or radar charts.
- Always show labels and values.
- No legend when ≤ 2 data series.
- Use brand and semantic colors (blue, cyan, amber, green) from `design-tokens.md`. Neutral fill for empty/zero states.
- Support empty data state.
- **Bar spacing:** Gap between bars must be 50%–100% of bar width. Sweet spot: gap ≈ 50% of bar width (bar width = 2× gap).
- **Bar tops must be straight.** No rounded corners on bar/column tops — they obscure exact endpoint values.
- **Bar width:** Desktop: fixed `w-10` (40px) with `gap-5` (20px) for 50% ratio. Mobile: `flex-1 w-full` to adapt to narrow screens without scrollbars. Use `flex-1 md:flex-initial` on bar columns and `w-full md:w-10` on the bar itself.

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
| `Breadcrumb` | `Breadcrumb` | `ElBreadcrumb` + `ElBreadcrumbItem` |
| `Skeleton` | `Skeleton` | `ElSkeleton` |
| `LocaleSwitcher` | `LocaleSwitcher` | `ElDropdown` + `ElDropdownMenu` + `ElDropdownItem` |

### Composite Components

| UI DSL | Component | Notes |
| --- | --- | --- |
| `PageHeader` | `PageHeader` | Title, description, primary action |
| `FilterBar` | `FilterBar` | Filter controls, reset |
| `FilterDrawer` | `FilterDrawer` | Mobile filter drawer (`el-drawer` direction btt), search + filter button trigger, Apply/Reset |
| `DataTable` | `DataTable` | Table, pagination, row actions |
| `CardList` | `CardList` | Mobile card list replacing `el-table` at < 768px, 4-layer card per row, three-dot action menu |
| `FormSection` | `FormSection` | Grouped form fields |
| `ActionBar` | `ActionBar` | Save, cancel, batch actions |
| `EmptyState` | `EmptyState` | Empty data explanation |
| `LoadingState` | `LoadingState` or `Skeleton` | Loading indicator |
| `ErrorState` | `ErrorState` | Request/permission failure |
| `ConfirmDialog` | `ConfirmDialog` | Destructive action confirmation |
| `LocaleSwitcher` | `LocaleSwitcher` | Language toggle dropdown in header |
| `ZoneContainer` | `ZoneContainer` | Tinted region wrapper grouping related cards, `rounded-md` + `surface-*` bg + padding |
| `AccentCard` | `AccentCard` | Stat card with left 3px colored border stripe |
| `MetricCard` | `MetricCard` | KPI card with left accent stripe (`border-l-*`) per data category |
| `SimpleBarChart` | `SimpleBarChart` | Bar chart |
| `SimpleLineChart` | `SimpleLineChart` | Line chart |
| `StatusTimeline` | `StatusTimeline` | Activity timeline |

## Layout Mapping

All admin layouts use the shared `AdminLayout` shell. Individual pages only provide content, never their own sidebar or header.

| UI DSL Layout | Composition |
| --- | --- |
| `admin-list` | `AdminLayout + PageHeader + FilterBar + DataTable` (desktop ≥ 768px) / `AdminLayout + PageHeader + FilterDrawer + CardList` (mobile < 768px) |
| `admin-form` | `AdminLayout + PageHeader + FormSection + ActionBar` |
| `admin-detail` | `AdminLayout + PageHeader + DetailPanel` |
| `admin-dashboard` | `AdminLayout + PageHeader + MetricGrid + SimpleBarChart + SimpleLineChart` |
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
| `accent-blue` | Blue accent stripe (user/system metrics) |
| `accent-cyan` | Cyan accent stripe (order/transaction metrics) |
| `accent-amber` | Amber accent stripe (revenue/pending metrics) |
| `accent-green` | Green accent stripe (success/completion metrics) |

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
