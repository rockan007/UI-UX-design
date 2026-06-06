# 组件体系设计

本文件定义 Claude Code 生成页面时应优先使用的组件体系。组件体系应先于 UI DSL 和组件映射表建立。

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

## 组件边界

- 基础组件不包含业务含义
- 复合组件只表达通用 UI 模式
- 页面组件组合复合组件
- 业务数据和业务逻辑不写入基础组件
- 不为一次性页面创建难复用组件

## Claude Code 使用规则

```text
生成页面前，请先检查现有组件。
如果已有可用组件，必须优先复用。
如果需要新增组件，请说明它属于基础组件、复合组件、前台组件还是后台组件。
不要为单个样式差异新增组件。
```

