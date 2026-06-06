# 组件体系

本文件定义 Claude Code 生成页面时应优先使用的组件体系及 DSL 到真实组件的映射关系。

## 基础组件

基础组件负责最小交互单位：

- `Button`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `RadioGroup`
- `Switch`
- `Badge`
- `Tabs`
- `Dialog`
- `DropdownMenu`
- `Tooltip`
- `Toast`
- `Card`
- `Table`
- `Skeleton`

## 业务无关复合组件

复合组件负责常见页面结构，但不绑定具体业务：

- `PageShell`：页面外层布局
- `PageHeader`：标题、说明、主操作
- `SectionHeader`：区块标题和次操作
- `FilterBar`：筛选条件区域
- `DataTable`：表格、分页、行操作
- `FormSection`：表单分组
- `ActionBar`：页面底部或顶部操作区
- `EmptyState`：空数据
- `ErrorState`：错误状态
- `LoadingState`：加载状态
- `ConfirmDialog`：危险操作确认

## 前台常用组件

前台组件更关注清晰表达和操作转化：

- `HeroSection`
- `FeatureList`
- `ContentSection`
- `PricingSection`
- `FAQSection`
- `SignupForm`
- `SearchPanel`
- `ResultList`
- `DetailSummary`

前台组件不应滥用营销化大视觉。如果是工具、系统、门户类产品，应优先让用户进入可用界面。

## 后台常用组件

后台组件更关注效率和稳定：

- `AdminShell`
- `SidebarNav`
- `TopBar`
- `Breadcrumbs`
- `MetricGrid`
- `DataTable`
- `FilterBar`
- `BulkActionBar`
- `DetailPanel`
- `AuditTimeline`
- `PermissionNotice`

## 数据可视化组件

数据可视化仅用于后台仪表盘页面，前台不使用图表组件。

- `MetricCard`：单个指标卡片，包含标签、数值、变化趋势
- `SimpleBarChart`：柱状图，用于分类对比
- `SimpleLineChart`：折线图，用于时间趋势
- `StatusTimeline`：状态变更时间线

### 图表规则

- 每个仪表盘最多 4 个指标卡片一行
- 不使用 3D 图表、饼图、环形图、雷达图
- 所有图表必须显示标签和数值
- 柱状图和折线图不使用 legend（数据系列 ≤ 2 条时）
- 颜色使用品牌色 + 中性色，不引入新颜色
- 图表必须支持空数据状态

## 组件边界

- 基础组件不包含业务含义
- 复合组件只表达通用 UI 模式
- 页面组件组合复合组件
- 业务数据和业务逻辑不写入基础组件
- 不为一次性页面创建难复用组件

## Layout 映射

| UI DSL | 真实组件 | 用途 |
| --- | --- | --- |
| `admin-list` | `AdminShell + PageHeader + FilterBar + DataTable` | 后台列表页 |
| `admin-form` | `AdminShell + PageHeader + FormSection + ActionBar` | 后台创建或编辑页 |
| `admin-detail` | `AdminShell + PageHeader + DetailPanel` | 后台详情页 |
| `admin-dashboard` | `AdminShell + PageHeader + MetricGrid + SimpleBarChart + SimpleLineChart` | 后台仪表盘 |
| `frontend-list` | `PageShell + SearchPanel + ResultList` | 前台列表页 |
| `frontend-detail` | `PageShell + DetailSummary + ContentSection` | 前台详情页 |

## 基础组件映射

| UI DSL Component | 真实组件 | Element Plus |
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
| `MetricCard` | `MetricCard` | 指标卡片 |
| `SimpleBarChart` | `SimpleBarChart` | 柱状图 |
| `SimpleLineChart` | `SimpleLineChart` | 折线图 |
| `StatusTimeline` | `StatusTimeline` | 状态时间线 |

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

## 图标

- 优先使用 `@element-plus/icons-vue`
- 常用图标：`Search`、`Edit`、`Delete`、`Plus`、`ArrowDown`、`Close`
- 按钮中有合适图标时使用图标
- 图标按钮必须有 tooltip 或 aria-label
- 不手写 SVG，除非项目已有特殊图标系统

## Claude Code 使用规则

```text
生成页面前，请先检查现有组件。
如果已有可用组件，必须优先复用。
如果需要新增组件，请说明它属于基础组件、复合组件、前台组件还是后台组件。
不要为单个样式差异新增组件。
```
