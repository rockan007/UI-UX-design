# Component Mapping

## Contents

- Layout mapping
- Base component mapping
- Compound component mapping
- Variant mapping
- State mapping
- Component creation rules

## Layout Mapping

| UI DSL | Component Composition | Purpose |
| --- | --- | --- |
| `admin-list` | `AdminLayout + PageHeader + FilterBar + DataTable` (desktop) / `AdminLayout + PageHeader + FilterDrawer + CardList` (mobile <768px) | Admin list page |
| `admin-form` | `AdminLayout + PageHeader + FormSection + ActionBar` (simple) / `AdminLayout + PageHeader + TabbedForm + FormTab[] + ActionBar` (tabbed) | Admin create/edit page |
| `admin-detail` | `AdminLayout + PageHeader + DetailPanel` | Admin detail page |
| `admin-dashboard` | `AdminLayout + PageHeader + MetricGrid + ChartPanels + ActivityPanel` | Admin dashboard page |
| `frontend-list` | `PageShell + SearchPanel + ResultList` | Frontend list/search page |
| `frontend-detail` | `PageShell + DetailSummary + ContentSection` | Frontend detail page |

Adapt names to the existing project. If exact components do not exist, find the closest local equivalent before creating new ones.

## Base Component Mapping

| UI DSL Component | Preferred Real Component |
| --- | --- |
| `Button` | `Button` |
| `Input` | `Input` |
| `Textarea` | `Textarea` |
| `Select` | `Select` |
| `Checkbox` | `Checkbox` |
| `RadioGroup` | `RadioGroup` |
| `Switch` | `Switch` |
| `Badge` | `Tag` (pill/badge via `<el-tag>`) |
| `Dialog` | `Dialog` |
| `Dropdown` | `DropdownMenu` |
| `Tooltip` | `Tooltip` |
| `Toast` | `Toast` |
| `Tabs` | `Tabs` |
| `Table` | `Table` |
| `Card` | `Card` |
| `Skeleton` | `Skeleton` |
| `Breadcrumb` | `Breadcrumb` |
| `Pagination` | `Pagination` |
| `LocaleSwitcher` | `LocaleSwitcher` |

## Compound Component Mapping

| UI DSL Component | Purpose |
| --- | --- |
| `PageHeader` | Title, description, primary action (single-level pages); or Breadcrumb path (multi-level pages) |
| `Breadcrumbs` | Multi-level navigation path; last item plain text, earlier items clickable links |
| `FilterBar` | Desktop filter controls and reset/apply actions |
| `FilterDrawer` | Mobile filter panel (bottom sheet drawer) |
| `DataTable` | Table, pagination, row actions (desktop) |
| `CardList` | Mobile card-based list alternative to DataTable |
| `AccentCard` | Stat/metric card with left accent color stripe |
| `MetricCard` | Single metric display (value, label, trend indicator) |
| `MetricGrid` | Grid of MetricCards or AccentCards |
| `FormSection` | Grouped form fields within a section card |
| `EntityForm` | Complete create/edit form with sections |
| `TabbedForm` | Multi-tab form container |
| `FormTab` | Individual tab pane within a TabbedForm |
| `ActionBar` | Save/cancel or batch operations |
| `EmptyState` | Empty data explanation and next step |
| `LoadingState` | Page or section loading |
| `ErrorState` | Request or permission failure |
| `ConfirmDialog` | Destructive action confirmation |
| `ZoneContainer` | Section wrapper with responsive padding |
| `AuditTimeline` | Activity/audit event timeline |
| `PermissionNotice` | Permission denied explanation with safe navigation |
| `BulkActionBar` | Batch selection action bar |
| `SectionHeader` | Section title with optional action link |
| `HeroSection` | Frontend hero/banner section |
| `FeatureList` | Frontend feature cards grid |
| `PricingSection` | Frontend pricing table/cards |
| `FAQSection` | Frontend FAQ accordion/list |

## Variant Mapping

| UI DSL Variant | Meaning |
| --- | --- |
| `primary` | Main action |
| `secondary` | Secondary action |
| `ghost` | Low-emphasis or icon action |
| `danger` | Destructive action |
| `success` | Success status |
| `warning` | Warning status |
| `error` | Error status |
| `muted` | Low-emphasis text or surface |
| `accent-blue` | Metric or section accent (primary) |
| `accent-cyan` | Metric or section accent (secondary) |
| `accent-amber` | Metric or section accent (warning) |
| `accent-green` | Metric or section accent (success) |

## State Mapping

| UI DSL State | UI Treatment |
| --- | --- |
| `loading` | Skeleton, loading state, button spinner |
| `empty` | EmptyState with explanation and next step |
| `error` | ErrorState with retry or recovery |
| `success` | Toast or inline success feedback |
| `disabled` | Disabled control with clear visual treatment |
| `validationError` | Field-level error message |
| `permissionDenied` | PermissionNotice or ErrorState |
| `submitting` | Submit button loading + disabled |

## Component Creation Rules

Create a new component only when:

- The pattern repeats across pages.
- Existing components cannot express the pattern cleanly.
- The component has a clear non-business-specific boundary.

Do not create a component just to hold a one-off spacing or color variation.

Use the project's established icon library. Do not hand-write SVG icons — use the library's icon set. If a needed icon does not exist, use the closest available icon rather than creating custom SVG.

