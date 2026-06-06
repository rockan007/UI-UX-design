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
