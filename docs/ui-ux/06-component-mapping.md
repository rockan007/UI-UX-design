# 组件映射表

组件映射表用于把 UI DSL 转换为真实组件。Claude Code 生成代码时必须优先使用映射表，不应随意新增组件或样式。

## Layout 映射

| UI DSL | 真实组件 | 用途 |
| --- | --- | --- |
| `admin-list` | `AdminShell + PageHeader + FilterBar + DataTable` | 后台列表页 |
| `admin-form` | `AdminShell + PageHeader + FormSection + ActionBar` | 后台创建或编辑页 |
| `admin-detail` | `AdminShell + PageHeader + DetailPanel` | 后台详情页 |
| `frontend-list` | `PageShell + SearchPanel + ResultList` | 前台列表页 |
| `frontend-detail` | `PageShell + DetailSummary + ContentSection` | 前台详情页 |

## 基础组件映射

| UI DSL Component | 真实组件 |
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

## 复合组件映射

| UI DSL Component | 真实组件 | 说明 |
| --- | --- | --- |
| `PageHeader` | `PageHeader` | 页面标题、说明、主操作 |
| `FilterBar` | `FilterBar` | 筛选表单和重置操作 |
| `DataTable` | `DataTable` | 表格、分页、行操作 |
| `FormSection` | `FormSection` | 表单字段分组 |
| `ActionBar` | `ActionBar` | 保存、取消、批量操作 |
| `EmptyState` | `EmptyState` | 空数据提示 |
| `LoadingState` | `LoadingState` 或 `Skeleton` | 加载中 |
| `ErrorState` | `ErrorState` | 请求失败 |
| `ConfirmDialog` | `ConfirmDialog` | 删除等危险操作确认 |

## Variant 映射

| UI DSL Variant | 真实样式含义 |
| --- | --- |
| `primary` | 主操作按钮 |
| `secondary` | 次要操作按钮 |
| `ghost` | 弱操作或图标按钮 |
| `danger` | 危险操作 |
| `success` | 成功状态 |
| `warning` | 警告状态 |
| `error` | 错误状态 |
| `muted` | 弱提示 |

## 状态映射

| UI DSL State | 真实组件或表现 |
| --- | --- |
| `loading` | `LoadingState`、`Skeleton`、按钮 loading |
| `empty` | `EmptyState` |
| `error` | `ErrorState` |
| `success` | `Toast` 或页面内成功反馈 |
| `disabled` | 禁用态组件 |
| `validationError` | 字段错误提示 |
| `permissionDenied` | `PermissionNotice` 或 `ErrorState` |
| `submitting` | 提交按钮 loading + disabled |

## 图标映射

- 优先使用 `lucide-react`
- 按钮中有合适图标时使用图标
- 图标按钮必须有 tooltip 或 aria-label
- 不手写 SVG，除非项目已有特殊图标系统

