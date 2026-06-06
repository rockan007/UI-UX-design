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
| `admin-list` | `AdminShell + PageHeader + FilterBar + DataTable` | Admin list page |
| `admin-form` | `AdminShell + PageHeader + FormSection + ActionBar` | Admin create/edit page |
| `admin-detail` | `AdminShell + PageHeader + DetailPanel` | Admin detail page |
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
| `Badge` | `Badge` |
| `Dialog` | `Dialog` |
| `Dropdown` | `DropdownMenu` |
| `Tooltip` | `Tooltip` |
| `Toast` | `Toast` |
| `Tabs` | `Tabs` |
| `Table` | `Table` |
| `Skeleton` | `Skeleton` |

## Compound Component Mapping

| UI DSL Component | Purpose |
| --- | --- |
| `PageHeader` | Title, description, primary action |
| `FilterBar` | Filter controls and reset/apply actions |
| `DataTable` | Table, pagination, row actions |
| `FormSection` | Grouped form fields |
| `ActionBar` | Save/cancel or batch operations |
| `EmptyState` | Empty data explanation and next step |
| `LoadingState` | Page or section loading |
| `ErrorState` | Request or permission failure |
| `ConfirmDialog` | Destructive action confirmation |

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

Use `lucide-react` for icons when the project has it or a similar established icon library. Do not hand-write SVG icons unless the project already uses custom SVG assets.

