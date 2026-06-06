# UI/UX Design Constraints Restructuring — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure 14 overlapping `docs/ui-ux/` files into 6 clean, non-overlapping files with new design tokens, dark mode, animation, data visualization, and error message guidelines.

**Architecture:** Each new file merges content from 2-3 source files, deduplicates overlapping sections, and adds new topics inline. All 7 new files are created first (in dependency order), then the 13 old files are deleted, then cross-references are verified.

**Tech Stack:** Markdown documentation — no code.

---

### Task 1: Create 02-design-tokens.md

**Files:**
- Create: `docs/ui-ux/02-design-tokens.md`

This is entirely new content — no source files to merge. It defines the concrete values that all other files reference.

- [ ] **Step 1: Write 02-design-tokens.md**

Write the file with these sections:

```markdown
# 设计令牌

本文件定义 UI 生成时必须使用的精确值。Claude Code 不应猜测颜色、间距、字号等。

## 颜色

### 中性色阶

| Token | 值 | 用途 |
| --- | --- | --- |
| `neutral-50` | `#fafafa` | 页面背景 |
| `neutral-100` | `#f5f5f5` | 表面背景 |
| `neutral-200` | `#e5e5e5` | 边框 |
| `neutral-300` | `#d4d4d4` | 禁用文本 |
| `neutral-500` | `#737373` | 弱提示/占位符 |
| `neutral-800` | `#262626` | 次要文本 |
| `neutral-950` | `#0a0a0a` | 主要文本 |
| `white` | `#ffffff` | 卡片背景 |

### 品牌色

| Token | 值 | 用途 |
| --- | --- | --- |
| `brand-50` | `#eff6ff` | 选中背景 |
| `brand-600` | `#2563eb` | 主按钮、链接、focus 环 |
| `brand-700` | `#1d4ed8` | 主按钮 hover |

### 语义色

| Token | 值 | 用途 |
| --- | --- | --- |
| `success` | `#16a34a` | 成功徽章、toast |
| `danger` | `#dc2626` | 删除按钮、错误文本 |
| `warning` | `#d97706` | 警告徽章 |
| `info` | `#0891b2` | 信息徽章、tooltip |

### 使用规则

- 品牌色只用于主操作、选中态和关键反馈
- 危险操作使用 `danger` 色
- 页面不使用大面积渐变
- 不使用霓虹色或高饱和背景

## 暗色模式

深色模式下只有中性色反转，品牌色和语义色保持不变：

| CSS 变量 | 浅色 | 深色 |
| --- | --- | --- |
| `--bg-page` | `#fafafa` | `#0a0a0a` |
| `--bg-surface` | `#ffffff` | `#171717` |
| `--text-primary` | `#0a0a0a` | `#fafafa` |
| `--text-secondary` | `#525252` | `#a3a3a3` |
| `--text-muted` | `#737373` | `#737373` |
| `--border` | `#e5e5e5` | `#262626` |

### 暗色模式规则

- 页面必须支持浅色和深色模式
- 使用 CSS 自定义属性切换，不写两套样式
- 品牌色和语义色在两种模式下保持不变
- 图片和图标需确认在深色背景下可辨识

## 间距

基于 4px 单位的间距刻度：

| Token | 值 | 用途 |
| --- | --- | --- |
| `space-1` | `4px` | 图标与文字间距 |
| `space-2` | `8px` | 行内元素间距 |
| `space-3` | `12px` | 紧凑内边距 |
| `space-4` | `16px` | 默认间距 |
| `space-6` | `24px` | 区块间距 |
| `space-8` | `32px` | 页面内边距 |
| `space-12` | `48px` | 大区块间距 |

### 前台与后台默认值

| 场景 | 后台 | 前台 |
| --- | --- | --- |
| 页面内边距 | `24px` | `32px` |
| 卡片内边距 | `16px` | `24px` |
| 表格单元格 | `12px 16px` | `12px 16px` |
| 表单字段间距 | `16px` | `20px` |
| 大区块间距 | `32px` | `48px` |

## 字体

### 字号与行高

| Token | 字号 | 行高 | 用途 |
| --- | --- | --- | --- |
| `text-xs` | `12px` | `16px` | 表格单元格（后台）、帮助文本、徽章 |
| `text-sm` | `13px` | `20px` | 次要信息、时间戳、标签 |
| `text-base` | `15px` | `22px` | 正文（后台可用 14px） |
| `text-lg` | `16px` | `24px` | 表头、侧边栏分组标题 |
| `text-xl` | `20px` | `28px` | 卡片标题、表单分组标题 |
| `text-2xl` | `24px` | `32px` | 后台页面标题、前台区块标题 |
| `text-3xl` | `30px` | `36px` | 前台页面标题（后台不使用） |

### 字重

- 标题：`600` 或 `700`
- 正文：`400`
- 强调：`500`
- 不使用负字距
- 不使用 viewport width 缩放字体

### 后台与前台差异

- 后台标题最大 24px，前台可达 30px
- 后台正文可用 14px，前台正文 15px
- 后台不加 font-weight 装饰性大标题

## 圆角

| Token | 值 | 用途 |
| --- | --- | --- |
| `radius-sm` | `4px` | 输入框、徽章 |
| `radius-md` | `6px` | 按钮、卡片（后台） |
| `radius-lg` | `8px` | 弹窗、卡片（前台） |
| `radius-xl` | `12px` | 抽屉、大卡片 |
| `radius-full` | `9999px` | 徽章、头像 |

### 规则

- 后台卡片建议 6px，前台卡片建议 8px
- 不使用超过 12px 的大圆角做页面区块
- 弹窗和抽屉圆角应统一

## 阴影

只有 3 个层级，只用于弹层类组件：

| 层级 | 值 | 用途 |
| --- | --- | --- |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)` | 下拉菜单、tooltip |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06)` | 弹窗、popover |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.06)` | 抽屉、sheet |

### 规则

- 页面区块不做浮动卡片
- 表格、表单、内容区不使用阴影
- 不使用发光、模糊光斑、装饰性背景块

## 动效

### 时长

| Token | 值 | 用途 |
| --- | --- | --- |
| `duration-fast` | `150ms` | hover、focus 过渡 |
| `duration-base` | `200ms` | 展开/收起、淡入淡出 |
| `duration-slow` | `300ms` | 弹窗、抽屉进出 |

### 缓动

| Token | 值 | 用途 |
| --- | --- | --- |
| `ease-default` | `ease-out` | 进入动画 |
| `ease-expressive` | `cubic-bezier(0.16, 1, 0.3, 1)` | 前台页面弹性效果 |

### 规则

- 后台只用 `ease-default`，不使用弹性缓动
- 弹窗/抽屉打开用 `duration-slow` + `ease-default`
- hover 过渡用 `duration-fast`
- 不自动播放动画，除非用户交互触发
- 不使用 loop 动画、漂浮、闪烁
- 加载骨架屏不受动效限制
```

- [ ] **Step 2: Verify file content**

```bash
wc -l docs/ui-ux/02-design-tokens.md
```
Check that the file is well-formed markdown with no syntax errors.

- [ ] **Step 3: Commit**

```bash
git add docs/ui-ux/02-design-tokens.md
git commit -m "feat: add design tokens — colors, spacing, type, shadows, radii, animation, dark mode"
```

---

### Task 2: Create 01-design-principles.md

**Files:**
- Read: `docs/ui-ux/01-ui-ux-goals.md`, `docs/ui-ux/design-system-standards.md`, `docs/ui-ux/02-design-system.md`
- Create: `docs/ui-ux/01-design-principles.md`

Merge 3 source files, deduplicate overlapping content, add error message guidelines.

- [ ] **Step 1: Write 01-design-principles.md**

```markdown
# 设计原则

本文件定义前台和后台系统的 UI/UX 设计原则。Claude Code 在生成任何页面前应先判断页面类型，再应用对应原则。

## 总原则

- UI 的目标是帮助用户完成任务，不是制造视觉效果
- 页面必须有清楚的信息层级
- 主操作必须明确，次要操作必须克制
- 布局、间距、颜色、组件状态必须统一
- 移动端不能只是桌面端压缩版
- 界面服务于任务完成，不做无意义装饰
- 信息层级优先于视觉效果
- 桌面端优先效率，移动端优先可读性和可操作性

## 视觉风格原则

- 使用中性色作为主体背景和文字体系（具体值见 `02-design-tokens.md`）
- 品牌色只用于关键操作、选中态和重点信息
- 避免大面积渐变、霓虹色、过度阴影
- 避免全页面都使用同一种颜色的深浅变化
- 圆角保持克制，后台建议 6px 到 8px
- 阴影只用于弹层、下拉、悬浮菜单等需要层级区分的区域
- 页面区块不要全部做成浮动卡片

## 前台体验目标

前台面向普通用户，重点是理解成本低、操作路径清楚。

### 应该做到

- 首屏能让用户知道当前页面是什么
- 主要行动入口明显
- 内容分组清楚
- 表单步骤少、反馈明确
- 移动端优先保证可读性和点击体验
- 错误提示使用用户能理解的语言

### 不应该做

- 过度营销化的空洞视觉
- 大量装饰性卡片
- 主按钮不明确
- 页面内容只靠图标表达
- 移动端隐藏关键操作

## 后台体验目标

后台面向高频使用者，重点是效率、稳定、可扫描。

### 应该做到

- 页面结构稳定
- 信息密度适中偏高
- 表格、筛选、批量操作清晰
- 表单字段分组合理
- 状态、时间、金额、数量等字段易扫描
- 危险操作有明确确认
- 加载、空状态、错误状态不影响用户判断

### 不应该做

- 营销页式大标题和大留白
- 过度圆角、过度阴影、过度渐变
- 每个模块都做成装饰卡片
- 表格行距过大导致效率低
- 主次按钮视觉权重混乱

## 内容准则

### 错误信息

错误信息应使用用户能理解的语言，结构为：**发生了什么 → 为什么 → 该怎么做**。

| 要素 | 前台 | 后台 |
| --- | --- | --- |
| 语气 | 友好、有帮助 | 精确、直接 |
| 技术术语 | 避免 | 可在详情中使用 |
| 操作引导 | 提供明确的下一步 | 提供重试、导出、联系管理员 |
| 示例 | "页面加载失败，请检查网络后重试" | "请求超时（500），点击重试或联系运维" |

### 空状态

- 说明当前没有什么
- 告诉用户下一步可以做什么
- 如果有创建权限，提供创建入口
- 不要只显示空白页面

### 按钮文案

- 使用动词：保存、删除、取消、搜索、导出
- 不使用模糊文案：确认、好的、知道了
- 危险操作按钮文案应明确说明动作：删除用户、清空数据

## 质量判断标准

一个页面是否优秀，优先看：

1. 用户是否知道当前页面的目的
2. 用户是否知道下一步该做什么
3. 用户是否能快速找到关键信息
4. 页面在异常状态下是否仍然可用
5. 移动端是否能完成核心任务
6. 视觉风格是否统一、克制、稳定
```

- [ ] **Step 2: Verify dedup**

Confirm the new file doesn't duplicate content with itself or with `02-design-tokens.md` — principles reference tokens but don't repeat values.

- [ ] **Step 3: Commit**

```bash
git add docs/ui-ux/01-design-principles.md
git commit -m "feat: add unified design principles — merged goals, standards, content guidelines"
```

---

### Task 3: Create 03-component-system.md

**Files:**
- Read: `docs/ui-ux/04-component-system.md`, `docs/ui-ux/06-component-mapping.md`
- Create: `docs/ui-ux/03-component-system.md`

Merge component hierarchy + mapping table. Add data visualization components section.

- [ ] **Step 1: Write 03-component-system.md**

Start with the merged content from both source files, then add the new data visualization section at the end before the Claude Code usage rules.

```markdown
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

- 优先使用 `lucide-react`
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
```

- [ ] **Step 2: Verify Layout mapping includes the new admin-dashboard variant**

```bash
grep "admin-dashboard" docs/ui-ux/03-component-system.md
```

- [ ] **Step 3: Commit**

```bash
git add docs/ui-ux/03-component-system.md
git commit -m "feat: add unified component system — merged hierarchy, mapping tables, data viz components"
```

---

### Task 4: Create 04-ui-dsl.md

**Files:**
- Read: `docs/ui-ux/05-ui-dsl.md`
- Create: `docs/ui-ux/04-ui-dsl.md`

Keep existing DSL spec and 3 examples. Add 3 new templates: Dashboard, Settings, Detail.

- [ ] **Step 1: Write 04-ui-dsl.md**

Copy the full content from `docs/ui-ux/05-ui-dsl.md` (DSL spec + admin list example + admin form example + frontend list example), then append these 3 new templates before the end of the file:

```markdown
## 后台仪表盘示例

```json
{
  "page": "Dashboard",
  "type": "admin",
  "route": "/admin",
  "goal": "管理员快速查看系统关键指标和趋势",
  "layout": "admin-dashboard",
  "header": {
    "title": "仪表盘",
    "description": "过去 30 天的核心数据概览"
  },
  "sections": [
    {
      "component": "MetricGrid",
      "metrics": [
        { "label": "活跃用户", "value": "12,483", "change": "+12%", "trend": "up" },
        { "label": "今日订单", "value": "347", "change": "+5%", "trend": "up" },
        { "label": "收入", "value": "¥38,200", "change": "-3%", "trend": "down" },
        { "label": "待处理", "value": "23", "change": "0%", "trend": "flat" }
      ]
    },
    {
      "title": "订单趋势",
      "component": "SimpleLineChart"
    },
    {
      "title": "按类别分布",
      "component": "SimpleBarChart"
    },
    {
      "title": "最近活动",
      "component": "StatusTimeline"
    }
  ],
  "states": ["loading", "empty", "error"],
  "responsive": {
    "desktop": "4-metrics-then-charts",
    "mobile": "2-metrics-then-stacked-charts"
  }
}
```

## 后台设置页示例

```json
{
  "page": "Settings",
  "type": "admin",
  "route": "/admin/settings",
  "goal": "管理员配置系统参数",
  "layout": "admin-form",
  "header": {
    "title": "系统设置",
    "description": "管理站点基本配置和安全选项"
  },
  "form": {
    "sections": [
      {
        "title": "基本信息",
        "fields": [
          { "name": "siteName", "label": "站点名称", "component": "Input", "required": true },
          { "name": "siteDescription", "label": "站点描述", "component": "Textarea" }
        ]
      },
      {
        "title": "安全设置",
        "fields": [
          { "name": "enableRegistration", "label": "开放注册", "component": "Switch" },
          { "name": "sessionTimeout", "label": "会话超时", "component": "Select", "options": ["15分钟", "30分钟", "1小时", "4小时"] }
        ]
      }
    ],
    "actions": [
      { "label": "重置", "variant": "secondary" },
      { "label": "保存设置", "variant": "primary" }
    ]
  },
  "states": ["validationError", "submitting", "success", "error"]
}
```

## 后台详情页示例

```json
{
  "page": "OrderDetail",
  "type": "admin",
  "route": "/admin/orders/:id",
  "goal": "管理员查看订单详情并处理订单",
  "layout": "admin-detail",
  "header": {
    "title": "订单详情",
    "breadcrumbs": ["订单管理", "ORD-20240606-001"],
    "primaryAction": {
      "label": "处理订单",
      "component": "Button",
      "variant": "primary"
    }
  },
  "sections": [
    {
      "component": "DetailPanel",
      "groups": [
        {
          "title": "订单信息",
          "fields": ["订单编号", "状态", "金额", "创建时间", "支付方式"]
        },
        {
          "title": "客户信息",
          "fields": ["姓名", "邮箱", "手机号"]
        }
      ]
    },
    {
      "component": "DataTable",
      "title": "商品明细",
      "columns": [
        { "key": "productName", "label": "商品" },
        { "key": "quantity", "label": "数量" },
        { "key": "unitPrice", "label": "单价" },
        { "key": "subtotal", "label": "小计" }
      ]
    },
    {
      "component": "AuditTimeline",
      "title": "操作记录"
    }
  ],
  "states": ["loading", "error", "permissionDenied"],
  "responsive": {
    "desktop": "detail-panel-table-timeline",
    "mobile": "stacked-sections"
  }
}
```
```

- [ ] **Step 2: Verify all 6 page types are present**

```bash
grep -c '"page":' docs/ui-ux/04-ui-dsl.md
```
Expected: at least 6 entries (UserManagement, CreateUser, CourseList, Dashboard, Settings, OrderDetail).

- [ ] **Step 3: Commit**

```bash
git add docs/ui-ux/04-ui-dsl.md
git commit -m "feat: extend UI DSL — add dashboard, settings, and detail page templates"
```

---

### Task 5: Create 05-generation-rules.md

**Files:**
- Read: `docs/ui-ux/07-agent-generation-rules.md`, `docs/ui-ux/08-page-generation-workflow.md`, `docs/ui-ux/page-optimization-prompt.md`
- Create: `docs/ui-ux/05-generation-rules.md`

Merge agent rules + workflow + prompt templates into one file.

- [ ] **Step 1: Write 05-generation-rules.md**

```markdown
# Agent 生成规则与工作流

本文件定义 Claude Code 生成 UI 页面时必须遵守的规则、标准流程和可复用的 Prompt 模板。

## 生成规则

### 必须遵守

1. 生成页面前先阅读 `docs/ui-ux` 规范
2. 生成代码前先输出 UI DSL
3. UI DSL 确认后，再根据 `03-component-system.md` 的映射表写代码
4. 优先使用现有组件和设计系统
5. 不随意新增组件
6. 不随意写一次性样式
7. 不改变业务逻辑、接口协议、数据库结构
8. 不引入新的 UI 库，除非用户明确要求
9. 页面必须覆盖关键状态
10. 完成后必须做 UI/UX 审查

### 代码生成约束

```text
不要改业务逻辑。
不要重构系统架构。
不要修改接口协议。
不要修改数据库结构。
不要为单个页面创建无复用价值的组件。
不要写随机颜色、随机圆角、随机阴影。
不要让移动端只是桌面端压缩版。
```

### UI 状态要求

每个页面必须考虑：

- loading
- empty
- error
- success feedback
- disabled
- hover
- focus
- validation error
- permission denied
- mobile layout

## 页面生成流程

```text
需求输入
→ 识别页面类型
→ 生成 UI DSL
→ 审查 UI DSL
→ 组件映射
→ 生成代码
→ 启动项目
→ 截图或浏览器检查
→ 修复 UI 问题
→ 输出修改说明
```

### 1. 需求输入

用户只需要说明：页面路径、页面类型（前台或后台）、页面目标、主要内容、主要操作。

示例：

```text
请做一个后台用户管理页面，路径 /admin/users。
目标是让管理员查看、筛选、禁用和新增用户。
```

### 2. 识别页面类型

Claude Code 应先判断：

- 前台列表页
- 前台详情页
- 后台列表页
- 后台表单页
- 后台详情页
- 仪表盘页
- 设置页

不同页面类型使用 `03-component-system.md` 中对应的 layout 和组件组合。

### 3. 生成 UI DSL

先输出结构化 UI DSL，不直接写代码。DSL 至少包含：`page`、`type`、`route`、`goal`、`layout`、`header`、`sections`、`actions`、`states`、`responsive`。

参考 `04-ui-dsl.md` 中的页面类型模板。

### 4. 审查 UI DSL

审查重点：

- 页面目标是否明确
- 主操作是否合理
- 信息层级是否清楚
- 组件选择是否符合映射表
- 状态是否完整
- 移动端方案是否明确

### 5. 组件映射

根据 `03-component-system.md` 的映射表选择真实组件。如果映射表没有合适组件，Claude Code 必须说明：为什么现有组件不够、新组件属于哪一类、是否值得复用、是否会影响其他页面。

### 6. 生成代码

- 保持改动范围小
- 优先使用现有组件
- 样式遵守 `02-design-tokens.md`
- 不改无关文件
- 不改业务逻辑

### 7. 启动项目检查

如果项目支持本地运行，应启动开发服务并检查页面。检查宽度：1440px、1024px、768px、390px。

### 8. 修复 UI 问题

必须修复：

- 文字溢出
- 元素重叠
- 主操作不明显
- 间距混乱
- 移动端不可用
- 状态缺失
- 表单错误提示不清楚

### 9. 输出修改说明

最后输出：改了哪些文件、解决了哪些 UI/UX 问题、做了哪些检查、还有哪些未覆盖风险。

## Prompt 模板

### 生成页面前的固定 Prompt

```text
请先阅读 docs/ui-ux 下的规范。
然后为当前页面先生成 UI DSL，不要写代码。

UI DSL 必须包含：
- page
- type
- route
- goal
- layout
- header
- sections 或 form/table
- actions
- states
- responsive

生成后请说明为什么这样设计。
```

### 生成代码前的固定 Prompt

```text
请根据已确认的 UI DSL 和 docs/ui-ux/03-component-system.md 生成页面代码。

要求：
- 优先复用现有组件
- 不改业务逻辑
- 不改接口
- 不新增不必要依赖
- 补齐 loading、empty、error、disabled、hover、focus、mobile 状态
- 完成后运行项目检查
```

### 审查前的固定 Prompt

```text
请以资深 UI/UX 设计师角度审查当前页面。
重点检查：
1. 任务完成路径
2. 信息层级
3. 视觉一致性
4. 表单或表格体验
5. 响应式
6. 状态反馈
7. 可访问性

发现问题后直接修复。
```

### 单页面优化 Prompt

```text
请只从 UI/UX 角度优化页面：{页面路径}

页面目标：
{说明这个页面用户最重要的任务}

工作边界：
- 不要改业务逻辑
- 不要改接口协议
- 不要改数据库结构
- 不要重构无关代码
- 优先使用现有组件和样式系统

请先阅读相关文件，理解当前页面结构和组件来源。
然后从以下角度优化：

1. 信息层级
2. 操作路径
3. 布局和间距
4. 表单体验
5. 数据展示
6. 交互状态（loading、empty、error、success、disabled、hover、focus、validation error）
7. 响应式（检查 1440px、1024px、390px）

完成后请：
1. 说明你发现的 UI/UX 问题
2. 说明你做了哪些修改
3. 运行必要检查
4. 如果项目支持浏览器预览，请截图检查并修复明显问题
```

## 页面类型专用补充

### 后台列表页

```text
这是后台高频使用的列表页，请额外关注：
- 筛选区是否紧凑
- 表格是否易扫描
- 批量操作是否清楚
- 操作列是否过多
- 空状态是否提供下一步操作
- 移动端是否可用
```

### 表单页

```text
这是表单页，请额外关注：
- 字段分组是否合理
- 必填项是否清楚
- 错误提示是否靠近字段
- 保存前后反馈是否明确
- 取消、返回、保存草稿等操作是否清楚
- 移动端输入体验是否顺畅
```

### 详情页

```text
这是详情页，请额外关注：
- 关键信息是否在首屏可见
- 状态和主要操作是否明显
- 详情信息是否有清楚分组
- 历史记录、日志、备注等次要信息是否不会干扰主线
- 返回列表和继续操作是否方便
```
```

- [ ] **Step 2: Verify the 9-step workflow is complete**

```bash
grep -c "^### [0-9]" docs/ui-ux/05-generation-rules.md
```
Expected: 9

- [ ] **Step 3: Commit**

```bash
git add docs/ui-ux/05-generation-rules.md
git commit -m "feat: add unified generation rules — merged rules, workflow, prompt templates"
```

---

### Task 6: Create 06-review-checklist.md

**Files:**
- Read: `docs/ui-ux/09-ui-review-checklist.md`, `docs/ui-ux/ui-review-checklist.md`, `docs/ui-ux/responsive-and-state-checklist.md`
- Create: `docs/ui-ux/06-review-checklist.md`

Merge 3 checklist files, deduplicate (they share ~70% of content), organize into 8 sections each with a copyable prompt block and checklist items.

- [ ] **Step 1: Write 06-review-checklist.md**

```markdown
# UI/UX 审查清单

本文件用于页面生成后的质量检查。Claude Code 完成页面后，应按本清单逐项审查并修复问题。

## 审查 Prompt

```text
请以资深 UI/UX 设计师的角度审查当前页面。
只指出具体问题，不要泛泛而谈。

请按严重程度输出：
1. 影响用户完成任务的问题
2. 信息层级问题
3. 视觉一致性问题
4. 表单或表格体验问题
5. 移动端问题
6. 可访问性问题

然后修复这些问题。
不要改业务逻辑。
```

## 1. 任务完成路径

- [ ] 用户是否知道当前页面是什么
- [ ] 用户是否知道下一步能做什么
- [ ] 主操作是否明显
- [ ] 次要操作是否不会干扰主操作
- [ ] 危险操作是否有确认
- [ ] 操作完成后是否有反馈
- [ ] 用户是否容易撤销或返回

## 2. 信息层级

- [ ] 页面标题是否清楚
- [ ] 关键数据是否优先展示
- [ ] 主信息是否比次要信息更突出
- [ ] 说明文本是否简短
- [ ] 状态信息是否容易识别
- [ ] 页面是否有过多视觉重点互相竞争

## 3. 视觉一致性

- [ ] 按钮样式、尺寸是否统一
- [ ] 表单控件高度是否一致
- [ ] 表格行高是否一致
- [ ] 标签、徽章样式是否统一
- [ ] 模块间距是否稳定
- [ ] 圆角和阴影是否克制

## 4. 表单体验

- [ ] 字段顺序是否符合填写习惯
- [ ] label 是否清楚
- [ ] 必填项是否明确
- [ ] 帮助文本是否必要且简短
- [ ] 错误提示是否靠近对应字段
- [ ] 提交反馈是否明确
- [ ] 提交中是否防止重复提交（按钮 loading + disabled）
- [ ] 移动端输入是否顺畅

## 5. 表格体验

- [ ] 高频字段是否靠左
- [ ] 操作列是否清晰、靠右
- [ ] 筛选区是否紧凑
- [ ] 状态、时间、金额、数量等字段是否便于扫描
- [ ] 批量操作是否明确
- [ ] 空状态是否提供下一步
- [ ] 移动端是否仍可管理数据

## 6. 状态反馈

- [ ] **loading**：是否明确展示，不导致布局大幅跳动；重要数据区有骨架屏
- [ ] **empty**：是否有说明和下一步操作
- [ ] **error**：是否具体说明错误，提供重试或返回操作
- [ ] **success**：保存、创建、删除后是否有反馈，不遮挡主要操作太久
- [ ] **disabled**：是否可识别，原因是否可理解，不只看颜色
- [ ] **permission denied**：是否清楚说明
- [ ] **hover**：可交互元素是否有 hover 表现
- [ ] **focus**：键盘 focus 状态是否可见

## 7. 响应式

```text
请检查当前页面在以下宽度下的实际显示：
- 1440px
- 1024px
- 768px
- 390px
```

- [ ] 1440px：布局合理，充分利用横向空间
- [ ] 1024px：不拥挤，减少复杂分栏
- [ ] 768px：进一步简化分栏
- [ ] 390px：单列优先，无横向挤压
- [ ] 无文字溢出
- [ ] 无元素重叠
- [ ] 按钮点击面积足够
- [ ] 筛选、菜单、弹窗可用
- [ ] 表格有移动端方案（卡片列表或横向滚动）
- [ ] 主操作在移动端可见

## 8. 可访问性

- [ ] 文本与背景对比度足够
- [ ] 键盘 focus 状态可见
- [ ] 图标按钮有 tooltip 或 aria-label
- [ ] 输入框有可识别 label
- [ ] 错误状态不只用颜色表达
- [ ] 点击目标面积足够（移动端 ≥ 44px）

## 状态补全 Prompt

```text
请检查当前页面是否完整覆盖以下状态：
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

如果缺失，请补齐 UI 表现。
不要改变业务逻辑。
```
```

- [ ] **Step 2: Dedup verification**

Compare against the 3 source files to ensure no checklist item was lost:

```bash
grep -c "\- \[ \]" docs/ui-ux/06-review-checklist.md
```
The count should cover all unique items from all 3 sources.

- [ ] **Step 3: Commit**

```bash
git add docs/ui-ux/06-review-checklist.md
git commit -m "feat: add unified review checklist — merged 3 sources, deduped, 8-section structure"
```

---

### Task 7: Create 00-overview.md

**Files:**
- Read: `docs/ui-ux/00-overview.md`, `docs/ui-ux/claude-code-ui-ux-workflow.md`, `docs/ui-ux/03-tech-stack.md`
- Create: `docs/ui-ux/00-overview.md` (overwrite existing)

Update index to reflect new 6-file structure, absorb workflow and tech stack.

- [ ] **Step 1: Write 00-overview.md**

```markdown
# UI/UX Agent 生成规范总览

这套文档用于指导 Claude Code 从零设计和生成高质量 UI/UX。目标不是设计业务架构，而是让 Agent 在生成前台和后台页面时，有稳定的设计标准、结构化表达、组件映射和审查流程。

## 核心目标

- 让 Claude Code 不再每次自由发挥界面
- 先生成 UI DSL，再生成页面代码
- 所有页面遵循统一设计系统
- 所有组件优先来自组件映射表
- 所有页面必须覆盖关键交互状态
- 所有页面必须经过桌面端和移动端检查

## 文档结构

| 文件 | 内容 |
| --- | --- |
| `01-design-principles.md` | 设计原则：总原则、前台/后台目标、内容准则、质量标准 |
| `02-design-tokens.md` | 设计令牌：颜色、暗色模式、间距、字体、圆角、阴影、动效 |
| `03-component-system.md` | 组件体系：组件层级、映射表、数据可视化、图标规则 |
| `04-ui-dsl.md` | UI DSL：结构化描述格式、6 种页面类型模板 |
| `05-generation-rules.md` | 生成规则：Agent 规则、9 步工作流、Prompt 模板 |
| `06-review-checklist.md` | 审查清单：8 个维度逐项检查、状态补全 Prompt |

## 推荐流程

```text
阅读设计原则 (01)
→ 引用设计令牌 (02)
→ 生成 UI DSL (04)
→ 根据组件体系映射 (03)
→ 按生成规则写代码 (05)
→ 按审查清单检查 (06)
```

## 技术选型

首选技术栈：

```text
Next.js + TypeScript + Tailwind CSS + shadcn/ui + lucide-react
```

### 推荐原因

- **Next.js**：目录结构清晰，适合前台和后台页面共存，Agent 熟悉度高
- **TypeScript**：组件 props 更容易约束，页面数据结构更清楚
- **Tailwind CSS**：样式表达直接，容易通过 token 和 class 约束视觉系统
- **shadcn/ui**：组件可复制可改造，适合后台系统，配合 Tailwind 和 TypeScript 好
- **lucide-react**：图标风格统一，避免手写 SVG

### 如果项目已有技术栈

Claude Code 应先识别当前项目技术栈、组件库、样式系统和路由方式。如果已有成熟技术栈，优先沿用。不要为了使用推荐栈而重写项目。

### 不建议的做法

- 为了单个页面引入大型 UI 框架
- 每个页面写独立 CSS 风格
- 同时混用多个组件库
- 随机新增图标库
- 用内联样式替代设计系统

## Claude Code UI/UX 优化工作流

这套流程用于让 Claude Code 专注改进前台和后台系统的 UI/UX：

1. 读取项目结构
2. 总结现有 UI 风格和组件体系
3. 建立 UI/UX 设计标准
4. 统一基础组件和全局样式
5. 按页面逐个优化
6. 补齐交互状态
7. 做桌面端和移动端截图检查
8. 根据检查结果修复细节

### 限定工作边界

```text
接下来你只关注 UI/UX 改进，不要改业务逻辑、接口协议、数据库结构和权限规则。

设计目标：
- 简洁、现代、专业
- 信息层级清晰
- 页面留白合理
- 表单易填写
- 按钮主次明确
- 表格适合高频使用
- 移动端不能拥挤
- 加载、空状态、错误状态要完整
- 不要做营销感首页
- 不要使用过度渐变、大圆角、装饰性卡片

请先提出 UI/UX 改进计划，不要立刻写代码。
```

### 每次任务附加约束

```text
不要改业务逻辑。
不要重构系统架构。
只优化 UI/UX。
优先使用现有组件和样式系统。
保持页面专业、克制、清晰。
不要添加无意义装饰。
确保桌面端和移动端都可用。
完成后请实际运行并检查页面。
```

## 给 Claude Code 的默认要求

```text
请先阅读 docs/ui-ux 下的规范。
生成页面前必须先输出 UI DSL。
确认 UI DSL 后，再根据组件映射表生成代码。
不要改业务逻辑。
不要随意新增组件。
不要写一次性样式。
优先复用设计系统和现有组件。
完成后检查 loading、empty、error、disabled、hover、focus、mobile 状态。
```
```

- [ ] **Step 2: Verify doc index matches actual files**

```bash
grep "\.md" docs/ui-ux/00-overview.md | grep -E "^|" | wc -l
```
Expected: 6 files referenced.

- [ ] **Step 3: Commit**

```bash
git add docs/ui-ux/00-overview.md
git commit -m "feat: update overview — new 6-file index, absorbed workflow and tech stack"
```

---

### Task 8: Delete 13 old files

**Files:**
- Delete: 13 old files listed in the spec migration map

- [ ] **Step 1: Delete the old files**

```bash
cd "/Users/anqi/projects/UI:UX design" && rm \
  docs/ui-ux/01-ui-ux-goals.md \
  docs/ui-ux/02-design-system.md \
  docs/ui-ux/03-tech-stack.md \
  docs/ui-ux/04-component-system.md \
  docs/ui-ux/05-ui-dsl.md \
  docs/ui-ux/06-component-mapping.md \
  docs/ui-ux/07-agent-generation-rules.md \
  docs/ui-ux/08-page-generation-workflow.md \
  docs/ui-ux/09-ui-review-checklist.md \
  docs/ui-ux/ui-review-checklist.md \
  docs/ui-ux/responsive-and-state-checklist.md \
  docs/ui-ux/page-optimization-prompt.md \
  docs/ui-ux/design-system-standards.md \
  docs/ui-ux/claude-code-ui-ux-workflow.md
```

- [ ] **Step 2: Verify only 6 new files remain**

```bash
ls docs/ui-ux/
```
Expected: `00-overview.md`, `01-design-principles.md`, `02-design-tokens.md`, `03-component-system.md`, `04-ui-dsl.md`, `05-generation-rules.md`, `06-review-checklist.md`

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor: remove 13 old files, keep 6 new unified docs"
```

---

### Task 9: Cross-reference verification

**Files:**
- Read: All 7 files in `docs/ui-ux/`

Verify no broken references remain to old file names.

- [ ] **Step 1: Search for stale cross-references**

```bash
cd "/Users/anqi/projects/UI:UX design"
grep -rn "01-ui-ux-goals\|02-design-system\|03-tech-stack\|04-component-system\|05-ui-dsl\|06-component-mapping\|07-agent-generation-rules\|08-page-generation\|09-ui-review-checklist\|design-system-standards\|claude-code-ui-ux-workflow\|page-optimization-prompt\|responsive-and-state-checklist\|ui-review-checklist" docs/ui-ux/
```

Expected: no matches (except possibly within git history).

- [ ] **Step 2: Verify all cross-references within new files are correct**

```bash
grep -rn "01-design-principles\|02-design-tokens\|03-component-system\|04-ui-dsl\|05-generation-rules\|06-review-checklist\|00-overview" docs/ui-ux/
```
Check that each reference points to the right file for its context.

- [ ] **Step 3: Commit if fixes needed**

```bash
git add -A && git commit -m "fix: update cross-references to new file names"
```
(Only if changes were made.)

---

### Task 10: Final verification

- [ ] **Step 1: Verify file count**

```bash
ls docs/ui-ux/ | wc -l
```
Expected: 7

- [ ] **Step 2: Verify no old content was lost**

Read each new file and spot-check against the corresponding old files to confirm all unique content was preserved.

- [ ] **Step 3: Run git status**

```bash
cd "/Users/anqi/projects/UI:UX design" && git status
git log --oneline
```
Expected: clean working tree, all commits present.

- [ ] **Step 4: Final commit if needed**

```bash
git add -A && git commit -m "chore: final verification pass"
```
