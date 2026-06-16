# 组件系统

组件层次和 Element Plus 映射。在编写代码之前，始终将 UI DSL 映射到这些组件。

## 组件层次

### 基础组件（最小交互单元）

`Button`、`Input`、`Textarea`、`Select`、`Checkbox`、`RadioGroup`、`Switch`、`Badge`、`Tabs`、`Dialog`、`DropdownMenu`、`Tooltip`、`Toast`、`Card`、`Table`、`Skeleton`

### 复合组件（页面模式，非业务特定）

`PageShell`、`PageHeader`、`SectionHeader`、`FilterBar`、`DataTable`、`FormSection`、`ActionBar`、`EmptyState`、`ErrorState`、`LoadingState`、`ConfirmDialog`

### 前端组件

`HeroSection`、`FeatureList`、`ContentSection`、`PricingSection`、`FAQSection`、`SignupForm`、`SearchPanel`、`ResultList`、`DetailSummary`

### 管理后台组件

`AdminShell`（`AdminLayout` + `AdminHeader` + `AdminSidebar`）、`TopBar`、`Breadcrumbs`、`MetricGrid`、`ZoneContainer`、`DataTable`、`FilterBar`、`FilterDrawer`、`BulkActionBar`、`DetailPanel`、`AuditTimeline`、`PermissionNotice`

`AdminShell` 是所有管理后台页面的强制布局包装器（位于 `{admin-prefix}` 下）。完整结构参见 `design-principles.md` 的 Admin Shell 布局部分。侧边栏（`AdminSidebar`）通过 `el-sub-menu` 支持多级菜单。

### 数据可视化（仅限管理后台仪表盘，不在前端使用）

`MetricCard`、`SimpleBarChart`、`SimpleLineChart`、`StatusTimeline`

图表规则：
- 每行最多 4 个指标卡片。
- 不使用 3D 图表、饼图、环形图或雷达图。
- 始终显示标签和数值。
- 当数据系列 ≤ 2 时，不显示图例。
- 使用 `design-tokens.md` 中的品牌色和语义色（蓝色、青色、琥珀色、绿色）。空/零状态使用中性色填充。
- 支持空数据状态。
- **柱间距：** 柱之间的间距必须为柱宽的 50%–100%。最佳比例：间距 ≈ 柱宽的 50%（柱宽 = 2 × 间距）。
- **柱顶必须平直。** 柱/列顶部不使用圆角——它们会模糊精确的端点值。
- **柱宽：** 桌面端：固定 `w-10`（40px）配合 `gap-5`（20px）实现 50% 比例。移动端：`flex-1 w-full` 以适配窄屏无需滚动条。在柱列上使用 `flex-1 md:flex-initial`，在柱本身上使用 `w-full md:w-10`。

## Element Plus 映射

### 基础组件

| UI DSL | Component | Element Plus |
| --- | --- | --- |
| `Button` | `Button` | `ElButton` |
| `Input` | `Input` | `ElInput` |
| `Textarea` | `Textarea` | `ElInput`（type=textarea） |
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

### 复合组件

| UI DSL | Component | 备注 |
| --- | --- | --- |
| `PageHeader` | `PageHeader` | 标题、描述、主要操作 |
| `FilterBar` | `FilterBar` | 筛选控件、重置 |
| `FilterDrawer` | `FilterDrawer` | 移动端筛选抽屉（`el-drawer` 方向 btt），搜索 + 筛选按钮触发，应用/重置 |
| `DataTable` | `DataTable` | 表格、分页、行操作 |
| `CardList` | `CardList` | 移动端卡片列表，在 < 768px 时替代 `el-table`，每行 4 层卡片，三点操作菜单 |
| `EntityForm` | `EntityForm` | 共享的创建/查看/编辑表单，通过路由名称检测模式。查看模式下通过 `v-if="isView"` 块实现只读展示。删除逻辑在组件内。 |
| `FormSection` | `FormSection` | 分组表单字段 |
| `TabbedForm` | `TabbedForm` | 带标签栏的表单，适用于 3+ 个分区或 2+ 个 O2M/M2M。在 `<el-form>` 内使用 `<el-tabs>`。桌面端：标签切换面板。移动端：平铺分区卡片。 |
| `FormTab` | `FormTab` | TabbedForm 内的单个标签面板。可包含 1+ 个 FormSection 卡片。O2M/M2M 标签获得紫色强调条 + `<el-badge>` 计数。 |
| `ActionBar` | `ActionBar` | 保存、取消、批量操作 |
| `EmptyState` | `EmptyState` | 空数据说明 |
| `LoadingState` | `LoadingState` 或 `Skeleton` | 加载指示器 |
| `ErrorState` | `ErrorState` | 请求/权限失败 |
| `ConfirmDialog` | `ConfirmDialog` | 破坏性操作确认 |
| `LocaleSwitcher` | `LocaleSwitcher` | 头部中的语言切换下拉菜单 |
| `ZoneContainer` | `ZoneContainer` | 带色调的区域包装器，将相关卡片分组，`rounded-md` + `surface-*` 背景色 + 内边距 |
| `AccentCard` | `AccentCard` | 带左侧 3px 彩色边框条的统计卡片 |
| `MetricCard` | `MetricCard` | 按数据类别带左侧强调条（`border-l-*`）的 KPI 卡片 |
| `SimpleBarChart` | `SimpleBarChart` | 柱状图 |
| `SimpleLineChart` | `SimpleLineChart` | 折线图 |
| `StatusTimeline` | `StatusTimeline` | 活动时间线 |

## 布局映射

所有管理后台布局使用共享的 `AdminLayout` 外壳。各页面仅提供内容，绝不自行提供侧边栏或头部。

| UI DSL 布局 | 组合方式 |
| --- | --- |
| `admin-list` | `AdminLayout + PageHeader + FilterBar + DataTable`（桌面端 ≥ 768px）/ `AdminLayout + PageHeader + FilterDrawer + CardList`（移动端 < 768px） |
| `admin-form`（简单） | `AdminLayout + PageHeader + FormSection + ActionBar` |
| `admin-form`（标签式） | `AdminLayout + PageHeader + TabbedForm + FormTab[] + FormSection[] + ActionBar` |
| `admin-detail` | `AdminLayout + PageHeader + DetailPanel` |
| `admin-dashboard` | `AdminLayout + PageHeader + MetricGrid + SimpleBarChart + SimpleLineChart` |
| `frontend-list` | `PageShell + SearchPanel + ResultList` |
| `frontend-detail` | `PageShell + DetailSummary + ContentSection` |

## 变体映射

| 变体 | 含义 |
| --- | --- |
| `primary` | 主要操作按钮 |
| `secondary` | 次要操作按钮 |
| `ghost` | 低强调或图标按钮 |
| `danger` | 破坏性操作 |
| `success` | 成功状态 |
| `warning` | 警告状态 |
| `error` | 错误状态 |
| `muted` | 低强调文本 |
| `accent-blue` | 蓝色强调条（用户/系统指标） |
| `accent-cyan` | 青色强调条（订单/交易指标） |
| `accent-amber` | 琥珀色强调条（收入/待处理指标） |
| `accent-green` | 绿色强调条（成功/完成指标） |

## 状态映射

| 状态 | 处理方式 |
| --- | --- |
| `loading` | `LoadingState`、`Skeleton`、按钮加载动画 |
| `empty` | `EmptyState` 附说明和后续操作 |
| `error` | `ErrorState` 附重试或恢复操作 |
| `success` | `Toast` 或行内成功反馈 |
| `disabled` | 禁用控件，明确的视觉处理 |
| `validationError` | 字段级错误消息 |
| `permissionDenied` | `PermissionNotice` 或 `ErrorState` |
| `submitting` | 提交按钮加载中 + 禁用 |

## 图标

- 使用 `@element-plus/icons-vue`。
- 常用图标：`Search`、`Edit`、`Delete`、`Plus`、`ArrowDown`、`Close`。
- 图标按钮必须有 tooltip 或 `aria-label`。
- 不使用手写 SVG。

## 组件规则

- 基础组件不携带业务含义。
- 复合组件仅表达通用的 UI 模式。
- 仅当某个模式在多个页面中重复出现且现有组件无法表达时，才创建新组件。
- 绝不为一处性的间距或颜色变化创建组件。
