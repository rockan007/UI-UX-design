# 生成规则

页面生成的规则、工作流和提示词模板。严格遵守。

## 智能体规则

### 必须遵守

1. 编写代码前先输出 UI DSL。
2. DSL 确认后，编码前先映射组件。
3. 优先使用已有组件和设计系统。
4. 不要随意新建组件。
5. 不要编写一次性样式。
6. 不要更改业务逻辑、API 契约或数据库结构。
7. 不要引入新的 UI 库。
8. 每个页面必须覆盖所有必须覆盖的状态。
9. 实现完成后运行 UI/UX 审查。
10. **所有 admin 页面必须使用共享的 `AdminLayout` 壳层。** 切勿创建自带侧边栏、头部或布局包装器的 admin 页面。将路由作为 `{admin-prefix}` 下的子路由添加，并将菜单项添加到 `AdminSidebar.vue`。
11. AdminSidebar 通过 `el-sub-menu` 支持多级菜单。添加父级分类时，将子项嵌套在 `el-sub-menu` 下。嵌套保持在 1-2 层。
12. **在 `main.ts` 中配置 Element Plus 语言环境。** 如果项目未启用 i18n（package.json 中没有 `"vue3ElementUiUx": { "i18n": true }`）：从 `element-plus/dist/locale/zh-cn.mjs` 导入 `zhCn`，并将 `{ locale: zhCn }` 传递给 `app.use(ElementPlus, ...)`。如果已启用 i18n：i18n 基础设施（`i18n-rules.md`）通过 `elLocaleMap` 和 `el-config-provider` 处理此问题——不要单独硬编码 `zhCn`。

13. **如果项目启用了 i18n**（package.json 包含 `"vue3ElementUiUx": { "i18n": true }`），在生成任何页面前先阅读 `i18n-rules.md`。所有面向用户的文本必须使用 `$t()` 键值，格式化必须使用 `$n()` / `$d()`，并且 `LocaleSwitcher` 必须包含在页面头部中。

### 必须覆盖的状态

每个页面：`loading`、`empty`、`error`、`success feedback`、`disabled`、`hover`、`focus`、`validation error`、`permission denied`、`mobile layout`。

## 页面生成工作流

```
需求输入
→ 识别页面类型
→ 定义用户任务流程
→ 定义交互模型
→ 生成 UI DSL
→ 审查 DSL
→ 映射组件
→ 生成代码
→ 启动项目并检查
→ 修复 UI 问题
→ 输出变更摘要
```

### 1. 需求

用户提供：页面路径、页面类型（frontend/admin）、页面目标、主要内容、主要操作。

### 2. 页面类型

分类：frontend list、frontend detail、admin list、admin form、admin detail、dashboard、settings、mixed workflow。

### 3. 用户任务流程

定义用户通过页面的路径：入口上下文 → 首次有意义操作 → 所需输入 → 系统反馈 → 确认/结果 → 下一步可能操作。

### 4. 交互模型

对每个重要操作定义：触发器、前置条件、反馈、成功、失败、恢复。

同时定义整体任务流程：入口上下文（用户从哪里来）、首次有用操作（用户应该首先做什么）、主要任务路径（用户如何完成任务）以及下一步操作（完成后用户可能做什么）。

### 5. UI DSL

首先输出结构化 DSL。包含：`page`、`type`、`route`、`goal`、`layout`、`header`、`userFlow`、`sections`、`actions`、`interactions`、`feedback`、`validation`、`edgeCases`、`states`、`responsive`。

### 6. DSL 审查

检查：目标清晰、主要操作合理、层级清晰、组件选择与映射表匹配、状态完整、明确的 mobile 方案。

### 7. 组件映射

使用 `component-system.md` 映射表。如果没有匹配项，解释：为什么现有组件不够用、新组件属于什么类别、是否可复用、是否影响其他页面。

### 8. 代码生成

- 保持范围最小。
- 优先使用已有组件。
- 遵循 `design-tokens.md` 的样式规范。
- 不要修改无关文件。

### 9. 项目检查

如果本地开发环境可用，启动开发服务器并在以下分辨率检查页面：1440px、1024px、768px、390px。

### 10. 修复 UI 问题

必须修复：文本溢出、元素重叠、主要操作不清晰、间距不一致、mobile 不可用、缺少状态、表单错误不明确。

### 11. 变更摘要

输出：变更的文件、解决的 UX 问题、已执行的检查、剩余风险。

## 提示词模板

### 生成前

```
先阅读 UI/UX 规范。
为此页面生成 UI DSL。暂不编写代码。

UI DSL 必须包含：page、type、route、goal、layout、header、userFlow、sections（或 form/table）、actions、interactions、feedback、validation、edgeCases、states、responsive。

生成后，解释设计理由。
```

### 编码前

```
基于已确认的 UI DSL 和组件映射，生成页面代码。

要求：
- 优先使用已有组件。
- 不要更改业务逻辑或 API 契约。
- 不要添加不必要的依赖。
- 覆盖：loading、empty、error、disabled、hover、focus、mobile 状态。
- 完成后运行项目检查。
```

### 审查前

```
以资深 UI/UX 设计师的身份审查此页面。重点关注：
1. 任务完成路径
2. 信息层级
3. 视觉一致性
4. 表单或表格体验
5. 响应式设计
6. 状态反馈
7. 无障碍性

直接修复问题。不要更改业务逻辑。
```

### 页面优化

```
仅优化页面 UI/UX：{path}

页面目标：{description}

边界：
- 不要更改业务逻辑、API 或数据库。
- 不要重构无关代码。
- 优先使用已有组件和样式。

审查：
1. 信息层级
2. 操作路径
3. 布局和间距
4. 表单体验
5. 数据展示
6. 交互状态（loading、empty、error、success、disabled、hover、focus、validation）
7. 响应式（1440px、1024px、390px）

完成后：列出发现的问题、所做的更改、已运行的检查。
```

## 页面类型补充

### 管理后台列表页

额外关注：紧凑的筛选区域、可快速浏览的表格、清晰的批量操作、操作列不过多、空状态带有下一步指引、mobile 可用性。

### 管理后台列表页——操作按钮放置

主要操作按钮（如"创建"、"新增"）不占用独立行。它们整合到现有的 UI 行中：

**Desktop（>=768px）：**

创建按钮位于筛选栏行内，通过间隔元素右对齐：

```html
<!-- Filter Bar: Desktop — includes action button -->
<div class="hidden md:flex flex-wrap items-center gap-3 bg-white rounded-btn border border-neutral-200 p-4 mb-4">
  <el-input v-model="keyword" :placeholder="searchPlaceholder" :prefix-icon="Search" clearable class="min-w-[200px]" />
  <el-select v-model="statusFilter" class="min-w-[150px]">...</el-select>
  <el-select v-model="channelFilter" class="min-w-[150px]">...</el-select>
  <el-button @click="handleReset">重置</el-button>
  <div class="flex-1"></div>
  <el-button type="primary" :icon="Plus" @click="router.push('/admin/{entity}/create')">
    创建{entity}
  </el-button>
</div>
```

要点：
- 搜索输入框：`min-w-[200px]` 最小宽度，可随可用空间增长
- 下拉选择器：`min-w-[150px]` 最小宽度，可随可用空间增长
- 筛选相关按钮（重置、应用、搜索触发）放置在筛选控件之后、`<div class="flex-1">` 间隔元素之前
- `<div class="flex-1"></div>` 将其后的所有内容推到右边缘
- 主要操作按钮（创建、新增）：位于间隔元素之后，在 desktop 上带文字标签
- 筛选栏上方或下方不设独立的按钮行

**Mobile（<768px）：**

创建按钮变为页面头部行右上角的紧凑 `circle` 图标按钮：

```html
<div class="flex items-start justify-between mb-4 md:mb-6">
  <div>
    <h1 class="text-2xl font-semibold text-neutral-950">{entity name}</h1>
    <p class="text-sm text-neutral-500 mt-1">{entity description}</p>
  </div>
  <el-button
    type="primary"
    circle
    :icon="Plus"
    size="small"
    class="md:hidden"
    @click="router.push('/admin/{entity}/create')"
  />
</div>
```

要点：
- `circle` + `:icon="Plus"` — 仅图标，无文字以节省水平空间
- `size="small"` — 紧凑但仍满足 44px 触摸目标
- `class="md:hidden"` — 在 desktop 上隐藏（desktop 按钮在筛选栏中）
- flex 容器使用 `items-start` 使双行标题与按钮自然对齐
- 头部 `mb-4 md:mb-6` 移至父级 flex div — 头部本身去掉边距

### 操作列规则

当表格的操作列包含 2 个以上操作时：

- **仅图标：** 使用仅带 `:icon` 的 `el-button`，无文字内容。文字标签移至 tooltip。
- **Tooltip：** 每个按钮用 `el-tooltip` 包裹，`content` = 操作名称，`placement="top"`，`:show-after="300"`，`:hide-after="0"`。
- **列宽：** `(28 + 8) × maxPossibleActions + 16`，向上取整至最近的 10px。`maxPossibleActions` 是模板中定义的所有按钮总数（包括 `v-if` 条件按钮），而非每行可见数量。
- **对齐：** 遵循文字方向 — LTR 页面左对齐，RTL 页面右对齐。不要居中操作列。
- **间距：** 通过 Tailwind 的 `gap-2`（8px）设置按钮间距。
- **按钮类型：** 主要/查看操作 → `type="primary"`，删除 → `type="danger"`，其他 → 默认 `link`。

3 个按钮最大值的示例（宽度 = 130px）：

```html
<el-table-column label="操作" width="130" fixed="right">
  <template #default="{ row }">
    <div class="flex items-center gap-2">
      <el-tooltip content="查看" placement="top" :show-after="300" :hide-after="0">
        <el-button type="primary" link size="small" :icon="View" @click="handleView(row)" />
      </el-tooltip>
      <el-tooltip content="编辑" placement="top" :show-after="300" :hide-after="0">
        <el-button link size="small" :icon="Edit" @click="handleEdit(row)" />
      </el-tooltip>
      <el-tooltip content="删除" placement="top" :show-after="300" :hide-after="0">
        <el-button type="danger" link size="small" :icon="Delete" @click="handleDelete(row)" />
      </el-tooltip>
    </div>
  </template>
</el-table-column>
```

### 管理后台表单页

额外关注：工具栏按钮放置、分区卡片分隔、多列网格的宽布局、分区末尾的全宽字段。

**工具栏：**

操作按钮（保存/提交、取消）位于与页面头部同行的工具栏行中——不在表单底部。表单页始终是多级的（如"角色管理 / 创建角色"），因此使用面包屑：

```html
<div class="flex items-center justify-between mb-4 md:mb-6">
  <el-breadcrumb separator="/">...</el-breadcrumb>
  <div class="flex items-center gap-3">
    <el-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
      {{ isEdit ? '保存' : '提交' }}
    </el-button>
    <el-button plain @click="router.back()">取消</el-button>
  </div>
</div>
```

要点：
- 主要按钮：`type="primary"`（实心蓝色）
- 次要按钮：`plain`（白色背景、灰色边框 — 较低的视觉权重）
- 两个按钮通过 flex 行的 `justify-between` 右对齐
- 提交按钮使用 `:loading` + `:disabled` 防止重复提交

**分区卡片：**

每个表单分区是一个带有左侧强调色条的独立卡片，替代单一卡片加分割线的模式：

```html
<el-form label-position="top" class="flex flex-col gap-4">
  <!-- Section 1 -->
  <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">
    <div class="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">基本信息</div>
    <!-- fields... -->
  </div>
  <!-- Section 2 -->
  <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-cyan-600 p-5 md:p-6">
    <div class="text-sm font-semibold text-cyan-700 mb-4 uppercase tracking-wide">其他信息</div>
    <!-- fields... -->
  </div>
</el-form>
```

要点：
- `el-form` 使用 `class="flex flex-col gap-4"` 为卡片之间留出间距
- 强调色条颜色匹配数据类别：蓝色用于主要/必填分区，青色用于次要分区（参考 `design-tokens.md`）
- 分区标题颜色与色条颜色匹配
- 无 `max-w-2xl` 约束 — 表单使用可用宽度

**字段网格：**

Desktop 字段使用 3 列网格，标准输入框在网格行中，全宽字段在分区末尾：

```html
<!-- Grid row: 3 columns for standard fields -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <el-form-item label="Field 1" prop="field1"><el-input ... /></el-form-item>
  <el-form-item label="Field 2" prop="field2"><el-input ... /></el-form-item>
  <el-form-item label="Field 3" prop="field3"><el-input ... /></el-form-item>
</div>

<!-- Grid row: single field taking 1 of 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
  <el-form-item label="Single Field"><el-select ... class="w-full" /></el-form-item>
</div>

<!-- Full-width at section end: textarea -->
<el-form-item label="Address" class="mt-4">
  <el-input type="textarea" :rows="2" ... />
</el-form-item>
```

要点：
- 标准字段：`grid grid-cols-1 md:grid-cols-3 gap-4`
- 每个网格行是独立的 `<div>` — 行之间用 `mt-4` 间距堆叠
- 全宽字段（textarea、动态项目列表）：放在分区末尾，所有网格行之后，每个包裹在独立的 `<el-form-item>` 中
- `el-form` 上使用 `label-position="top"`
- Mobile：`grid-cols-1` 自然地将所有内容垂直堆叠

**一对多子表单（一对多子表）：**

当父实体包含一对多子表时（如订单 → 订单明细），将子表渲染为父表单分区内的多列网格：

```typescript
interface ChildItem {
  name: string
  spec: string
  quantity: number
  unitPrice: number
}

function itemSubtotal(item: ChildItem): number {
  return (item.quantity || 0) * (item.unitPrice || 0)
}
```

**Edit mode（列标题 + 网格行）：**
```html
<div class="mt-4">
  <div class="text-sm text-neutral-600 mb-2">Items</div>
  <!-- Column headers (desktop only) -->
  <div class="hidden md:grid gap-2 px-1 py-2 border-b border-neutral-100 mb-2"
       style="grid-template-columns: 2fr 1fr 80px 1fr 100px 40px">
    <span class="text-xs text-neutral-400">Name *</span>
    <span class="text-xs text-neutral-400">Spec</span>
    <span class="text-xs text-neutral-400 text-center">Qty</span>
    <span class="text-xs text-neutral-400 text-right">Price</span>
    <span class="text-xs text-neutral-400 text-right">Subtotal</span>
    <span></span>
  </div>
  <!-- Data rows -->
  <div v-for="(item, i) in items" :key="i"
       class="grid gap-2 items-center mb-2"
       style="grid-template-columns: 2fr 1fr 80px 1fr 100px 40px">
    <el-input v-model="item.name" size="default" />
    <el-input v-model="item.spec" size="default" />
    <el-input-number v-model="item.quantity" :min="1" controls-position="right" class="w-full" />
    <el-input-number v-model="item.unitPrice" :min="0" :precision="2" controls-position="right" class="w-full" />
    <div class="text-sm font-semibold text-right">{{ $n(itemSubtotal(item), 'currency') }}</div>
    <el-button v-if="items.length > 1" link type="danger" :icon="Delete" @click="removeItem(i)" class="justify-self-center" />
  </div>
  <el-button link type="primary" :icon="Plus" @click="addItem">Add item</el-button>
</div>
```

**View mode（相同布局，只读）：**
```html
<div class="mt-4">
  <div class="text-sm text-neutral-600 mb-2">Items</div>
  <div class="hidden md:grid gap-2 px-1 py-2 border-b border-neutral-100 mb-2"
       style="grid-template-columns: 2fr 1fr 80px 1fr 100px">
    <span class="text-xs text-neutral-400">Name</span>
    <span class="text-xs text-neutral-400">Spec</span>
    <span class="text-xs text-neutral-400 text-center">Qty</span>
    <span class="text-xs text-neutral-400 text-right">Price</span>
    <span class="text-xs text-neutral-400 text-right">Subtotal</span>
  </div>
  <div v-for="(item, i) in items" :key="i"
       class="grid gap-2 items-center py-2 border-b border-neutral-50 last:border-0"
       style="grid-template-columns: 2fr 1fr 80px 1fr 100px">
    <div class="text-sm text-neutral-950">{{ item.name }}</div>
    <div class="text-sm text-neutral-500">{{ item.spec || '-' }}</div>
    <div class="text-sm text-neutral-950 text-center">{{ item.quantity }}</div>
    <div class="text-sm text-neutral-950 text-right">{{ $n(item.unitPrice, 'currency') }}</div>
    <div class="text-sm font-semibold text-neutral-950 text-right">{{ $n(itemSubtotal(item), 'currency') }}</div>
  </div>
</div>
```

要点：
- `grid-template-columns` 使用内联样式以实现精确列宽
- 小计通过辅助函数响应式计算
- 列标题在编辑和查看模式中都显示
- `addItem` 用默认值初始化所有字段：`{ name: '', spec: '', quantity: 1, unitPrice: 0 }`
- `handleSubmit`：过滤空名称，提取结构化项目，总计 = 小计之和
- 历史数据迁移：`typeof item === 'string' ? item : item.name`

**三模式表单（创建 / 查看 / 编辑）：**

管理实体的 admin 表单在单个组件中支持三种模式：

```typescript
const isEdit = computed(() => route.name === '{entity}-edit')
const isView = computed(() => route.name === '{entity}-detail')
```

**模式检测：** 路由名称决定模式：`{entity}-create` = 创建，`{entity}-detail` = 查看，`{entity}-edit` = 编辑。

**各模式工具栏：**

| 模式 | 左侧 | 右侧 |
|---|---|---|
| create | 面包屑：`{entity} / 创建{entity}` | 提交 + 取消 |
| view | 面包屑：`{entity} / {id}` + **状态标签** | 编辑 + 删除 |
| edit | 面包屑：`{entity} / {id} / 编辑` | 保存 + 取消 |

查看模式工具栏：
```html
<div class="flex items-center justify-between mb-4 md:mb-6">
  <div class="flex items-center gap-3">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/{entity}' }">{entity name}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ recordId }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tag v-if="isView" :type="statusType" effect="light">{{ statusLabel }}</el-tag>
  </div>
  <div class="flex items-center gap-3">
    <template v-if="isView">
      <el-button type="primary" @click="router.push(`/admin/{entity}/${id}/edit`)">编辑</el-button>
      <el-button type="danger" plain @click="handleDelete">删除</el-button>
    </template>
    <template v-else>
      <el-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
        {{ isEdit ? '保存' : '提交' }}
      </el-button>
      <el-button plain @click="router.back()">取消</el-button>
    </template>
  </div>
</div>
```

**各模式字段显示：**

每个字段使用 `v-if="isView"` / `v-else` 切换只读与可编辑：

```html
<el-form-item label="Field Label" prop="field">
  <template v-if="isView">
    <div class="text-sm text-neutral-950 pt-1">{{ form.field }}</div>
  </template>
  <el-input v-else v-model="form.field" />
</el-form-item>
```

要点：
- `<el-form :rules="isView ? {} : rules">` — 只读模式下不验证
- `<el-form @submit.prevent="isView ? undefined : handleSubmit()">` — 查看模式下阻止提交
- 文本字段：纯 `<div>`，使用 `pt-1` 对齐基线
- 金额/数字：使用 `$n()` 格式化
- 下拉选择器：显示原始值文本
- 文本域：`<div class="whitespace-pre-wrap">` 支持换行
- 项目列表：使用 `<el-tag>` 列表替代动态输入行
- 分区卡片、网格布局、强调色条在三种模式下完全相同
- 删除逻辑：`ElMessageBox.confirm` → 从数据中移除 → 导航返回列表

### 标签页表单（多标签管理后台表单）

当表单有 3 个以上逻辑字段组或 2 个以上一对多/多对多关系时，将分区组织到标签页中，而非全部垂直堆叠。简单表单（较少分组，≤1 个一对多）继续仅使用分区卡片。

**决策矩阵：**

| 条件 | 布局 |
|---|---|
| < 3 个逻辑字段组且 ≤ 1 个一对多/多对多 | 仅分区卡片（当前模式） |
| 3+ 个逻辑字段组或 2+ 个一对多/多对多，但没有一对多/多对多 | 单标签栏 |
| 3+ 个逻辑字段组或 2+ 个一对多/多对多，且 ≥ 1 个一对多/多对多 | 双标签栏（本节） |

**标签栏（双标签栏）：**

当存在一对多/多对多关系时，拆分为两个独立的标签栏：上方用于字段组，下方用于关联关系。标记为"关联数据"的分隔线将两者分开。

```html
<!-- Upper Tab Bar: field groups -->
<el-tabs
  v-if="showFieldTabBar"
  v-model="activeFieldTab"
  tab-position="top"
  class="hidden md:block"
  @tab-change="handleFieldTabChange"
>
  <el-tab-pane v-for="tab in fieldTabs" :key="tab.key" :name="tab.key">
    <template #label>
      {{ tab.label }}
      <el-icon v-if="tab.hasError" class="ml-1" style="color: var(--el-color-danger)">
        <WarningFilled />
      </el-icon>
    </template>
  </el-tab-pane>
</el-tabs>

<!-- Divider: shown when both groups have content -->
<div v-if="showDivider" class="flex items-center gap-3 my-6 hidden md:flex">
  <div class="flex-1 h-px bg-neutral-200"></div>
  <span class="text-xs text-neutral-400 uppercase tracking-wide font-medium">关联数据</span>
  <div class="flex-1 h-px bg-neutral-200"></div>
</div>

<!-- Lower Tab Bar: O2M/M2M relationships -->
<el-tabs
  v-if="showRelTabBar"
  v-model="activeRelTab"
  tab-position="top"
  class="hidden md:block"
  @tab-change="handleRelTabChange"
>
  <el-tab-pane v-for="tab in relationshipTabs" :key="tab.key" :name="tab.key">
    <template #label>
      {{ tab.label }}
      <el-badge
        v-if="tab.count !== undefined"
        :value="tab.count"
        :hidden="tab.count === 0"
        :type="tab.hasError ? 'danger' : 'primary'"
      />
      <el-icon v-if="tab.hasError" class="ml-1" style="color: var(--el-color-danger)">
        <WarningFilled />
      </el-icon>
    </template>
  </el-tab-pane>
</el-tabs>
```

要点：
- 两个标签栏都使用 `hidden md:block` — 仅在 desktop 上可见
- `v-if="showFieldTabBar"` / `v-if="showRelTabBar"` — 该组标签为 1 个时不显示标签栏
- Badge 仅用于关系标签（下方标签栏），不用于字段标签
- 分隔线：`flex items-center gap-3 my-6 hidden md:flex` — 水平线 + 标签模式
- 分隔线仅在字段标签和关系标签同时存在时显示（`showDivider`）
- 错误标签：badge `type="danger"` + `WarningFilled` 图标为红色 — 在两个标签栏中均有效
- 活动标签样式（两个标签栏）：`border-bottom: 2px solid var(--brand-600)` + `color: var(--brand-600)` + `font-weight: 500`
- 非活动标签：`color: var(--neutral-500)`，hover 时变为 `brand-600`

**标签定义：**

```typescript
interface TabDefinition {
  key: string           // unique tab key, e.g., 'basic', 'items', 'attachments'
  label: string         // display label, e.g., '基本信息', '商品清单'
  count?: number        // O2M/M2M item count for badge (undefined = no badge)
  hasError?: boolean    // set to true when hidden tab has validation errors
}

// Field-group tabs (upper) — entity fields, non-relationship sections
const fieldTabs = computed<TabDefinition[]>(() => [
  { key: 'basic', label: '基本信息' },
  { key: 'delivery', label: '配送 & 备注' },
])

// O2M/M2M relationship tabs (lower) — always at page bottom
const relationshipTabs = computed<TabDefinition[]>(() => [
  { key: 'items', label: '商品清单', count: form.items.length },
  { key: 'attachments', label: '附件', count: form.attachments.length },
])

const activeFieldTab = ref<string>(fieldTabs.value[0]?.key ?? 'basic')
const activeRelTab = ref<string>(relationshipTabs.value[0]?.key ?? 'items')

// Render tab bar only when group has ≥2 tabs (collapse single tab)
const showFieldTabBar = computed(() => fieldTabs.value.length >= 2)
const showRelTabBar = computed(() => relationshipTabs.value.length >= 2)
const showDivider = computed(() =>
  fieldTabs.value.length >= 1 && relationshipTabs.value.length >= 1
)
```

**标签面板内容（Desktop）：**

在 desktop 上，每个分组使用 `v-show` 以便 Element Plus 验证可以访问所有字段。每个分组独立管理自己的活动标签。

```html
<el-form ref="formRef" :model="form" :rules="isView ? {} : rules" label-position="top"
         @submit.prevent="isView ? undefined : handleSubmit()">
  <!-- Upper group content: field tab panes -->
  <div :class="showFieldTabBar ? 'hidden md:flex flex-col gap-4' : ''">
    <div v-show="!showFieldTabBar || activeFieldTab === 'basic'">
      <!-- 基本信息 section card (blue stripe) -->
    </div>
    <div v-show="!showFieldTabBar || activeFieldTab === 'delivery'">
      <!-- 配送 & 备注 section card (cyan stripe) -->
    </div>
  </div>

  <!-- Divider between groups (desktop) -->
  <div v-if="showDivider" class="flex items-center gap-3 my-6 hidden md:flex">
    <div class="flex-1 h-px bg-neutral-200"></div>
    <span class="text-xs text-neutral-400 uppercase tracking-wide font-medium">关联数据</span>
    <div class="flex-1 h-px bg-neutral-200"></div>
  </div>

  <!-- Lower group content: O2M/M2M tab panes -->
  <div :class="showRelTabBar ? 'hidden md:flex flex-col gap-4' : ''">
    <div v-show="!showRelTabBar || activeRelTab === 'items'">
      <!-- 商品清单 section card (purple stripe) — existing O2M pattern -->
    </div>
    <div v-show="!showRelTabBar || activeRelTab === 'attachments'">
      <!-- 附件 section card (purple stripe) -->
    </div>
  </div>

  <!-- Mobile: flat sections with divider -->
  <div class="md:hidden flex flex-col gap-4">
    <!-- 基本信息 (blue) -->
    <!-- 配送 & 备注 (cyan) -->
    <!-- Divider: 关联数据 -->
    <!-- 商品清单 (purple) -->
    <!-- 附件 (purple) -->
  </div>
</el-form>
```

要点：
- `!showFieldTabBar` / `!showRelTabBar`：当某个分组只有 1 个标签时，内容直接渲染，无标签切换
- 每个面板使用 `v-show`（而非 `v-if`）使隐藏字段保持在 DOM 中以供验证
- Desktop：两个标签分组同时可见，具有独立的活动状态
- Mobile：`md:hidden` 扁平堆叠，字段和关联分区之间有分隔线
- 标签内的分区卡片使用相同的强调色条模式 — 按内容类型使用蓝色/青色/紫色

**跨标签组验证：**

```typescript
async function handleSubmit() {
  if (!formRef.value) return
  submitting.value = true
  try {
    await formRef.value.validate()
  } catch {
    // Check field group tabs first, then relationship tabs
    for (const tab of fieldTabs.value) {
      if (tabHasErrors(tab.key)) {
        activeFieldTab.value = tab.key
        tab.hasError = true
        submitting.value = false
        return
      }
    }
    for (const tab of relationshipTabs.value) {
      if (tabHasErrors(tab.key)) {
        activeRelTab.value = tab.key
        tab.hasError = true
        submitting.value = false
        return
      }
    }
    submitting.value = false
    return
  }
  // ... proceed with submission
}

function handleFieldTabChange(key: string) {
  const tab = fieldTabs.value.find(t => t.key === key)
  if (tab) tab.hasError = false
}

function handleRelTabChange(key: string) {
  const tab = relationshipTabs.value.find(t => t.key === key)
  if (tab) tab.hasError = false
}

function tabHasErrors(tabKey: string): boolean {
  const tabFieldMap: Record<string, string[]> = {
    basic: ['customer', 'phone', 'amount', 'channel'],
    delivery: ['deliveryMethod', 'address', 'remark'],
    items: ['items'],
    attachments: ['attachments'],
  }
  const formFields = Object.keys(formRef.value?.fields || {})
  const tabFields = tabFieldMap[tabKey] || []
  return tabFields.some(f => formFields.includes(f))
}
```

要点：
- 字段标签优先检查 — 实体级别的错误优先于关联关系错误
- 每个分组有自己的活动标签 ref 和变更处理函数
- 如果错误位于折叠分组中（1 个标签，无标签栏），内联字段错误仍然显示 — 无需切换标签
- 使用 `v-show`（而非 `v-if`）使隐藏标签字段保持在 DOM 中以供验证

**一对多/多对多标签内容：**

每个关联关系标签包含一个带有紫色强调色条的独立分区卡片，复用现有的一对多子表单模式：

```html
<!-- Desktop: inside the active tab pane -->
<div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5 md:p-6">
  <div class="text-sm font-semibold text-purple-700 mb-4 uppercase tracking-wide">商品清单</div>
  <!-- Existing O2M sub-form pattern (column headers + data rows + add button) -->
  ...
</div>
```

要点：
- 复用完全相同的一对多子表单模式 — 无结构性变更
- 紫色强调色条（`border-l-purple-600`）和标题颜色（`text-purple-700`）表示"这是一个关联关系，而非字段组"
- 多个一对多/多对多：每个关联关系有自己的标签 — 绝不合并为一个

**三模式集成：**

标签页在创建/查看/编辑模式下完全相同。仅标签面板内的内容按模式变化：

| 模式 | 上方标签栏 | 上方内容 | 下方标签栏 | 下方内容 |
|---|---|---|---|---|
| create | 可见（如果 >=2 个标签） | 可编辑字段 + 规则 | 可见（如果 >=2 个标签） | 可编辑网格，启用增删 |
| view | 可见 | 只读文本 | 可见 | 只读网格，无增删 |
| edit | 可见（如果 >=2 个标签） | 可编辑字段 + 规则 | 可见（如果 >=2 个标签） | 可编辑网格，启用增删 |

单个标签折叠适用于所有模式 — 查看模式表单如果只有 1 个字段标签，则直接显示内容，无标签栏。

### 管理后台仪表盘和统计页

额外关注：容器多样性、分区着色、视觉节奏。具有多个数据区的 admin 页面不得在整个页面中统一使用白色卡片样式。

**容器层级选择：**

| 内容类型 | 容器层级 | 样式 |
| --- | --- | --- |
| 统计/指标卡片 | Accent Card | 白色背景 + 边框 + 左侧 3px 色条（`border-l-[3px] border-l-{color} border border-neutral-200 rounded-btn`） |
| 图表/可视化面板 | Raised Panel | 白色背景 + 无边框 + `shadow-sm rounded-btn` |
| 表格、列表、活动动态 | Standard Block | 白色背景 + 边框（当前默认） |

**色条颜色分配：**

- 蓝色（`#2563eb`）：用户、流量、系统 KPI 指标
- 青色（`#0891b2`）：订单、交易、处理中指标
- 琥珀色（`#d97706`）：收入、财务、待处理、警告指标
- 绿色（`#16a34a`）：成功、完成、增长指标

**分区着色：**

仪表盘分区将内容包装在纯容器中，无不透明背景。`surface-*` 色值可用于可选强调，但不是必需的——默认使用干净的白色/统一页面背景。

```html
<!-- Example: charts section -->
<div class="mb-4 md:mb-6">
  <h3 class="text-base font-semibold text-neutral-950 mb-5">Charts</h3>
  <!-- chart panels inside -->
</div>
```

- 分区包装器不使用背景 — 透明，显示页面背景（`neutral-50 #fafafa`）。
- 分区间距在各分区之间使用 `mb-4 md:mb-6`。最后一个分区无底部边距。
- `surface-*` 着色背景是可选的，可在需要视觉强调时少量使用，但默认且推荐的模式是不着色。
- 绝不使用饱和或深色背景。如果使用着色，始终使用最浅的色值（`*-50` 级别）。

**统计卡片模板：**

统计卡片使用强调色条并独立放置在页面背景上——不要将它们包装在着色区域中。色条颜色通过 `:style` 从数据对象传递。

```html
<!-- Stat card grid — no zone wrapper, cards float on page background -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
  <div class="bg-white border border-neutral-200 rounded-btn p-3 md:p-4
              hover:shadow-md transition-shadow duration-150 cursor-pointer"
       :style="{ borderLeft: `3px solid ${m.color}` }">
    <div class="text-sm text-neutral-500 mb-2">{{ label }}</div>
    <div class="text-xl md:text-2xl font-bold text-neutral-950 mb-1">{{ value }}</div>
    <div class="text-sm text-green-600">↑ +12% vs last month</div>
  </div>
</div>
```

要点：
- 无分区包装器 — 强调色条已在视觉上区分卡片。
- 响应式：`p-3 md:p-4` 用于内边距，`text-xl md:text-2xl` 用于数值，`gap-3 md:gap-4` 用于网格间距。
- 色条颜色来自数据模型，而非硬编码。

**图表面板模板（Raised Panel）：**

```html
<div class="bg-white rounded-btn shadow-sm p-4 md:p-5">
  <h3 class="text-base font-semibold text-neutral-950 mb-5">Chart Title</h3>
  <!-- chart content -->
</div>
```

**柱状图 — 响应式宽度：**

在 desktop 上，柱状图使用阶梯固定宽度（`md:w-10 lg:w-12 2xl:w-14`）——在较大断点处更宽，同时保持合理的间距比例。在 mobile 上，柱状图自适应填充可用空间（`flex-1 w-full`），防止溢出而无需滚动条。

```html
<div class="flex items-end justify-center gap-3 md:gap-5 h-[200px] px-1 md:px-2">
  <div v-for="(val, i) in chartValues" :key="i"
       class="flex-1 md:flex-initial flex flex-col items-center gap-1">
    <span class="text-xs text-neutral-500">{{ val }}</span>
    <div class="w-full md:w-10 lg:w-12 2xl:w-14 transition-all duration-150 cursor-pointer hover:brightness-90"
         :style="{ height: `${(val / max) * 160}px`, background: '...' }"></div>
    <span class="text-xs text-neutral-400 mt-2">{{ label }}</span>
  </div>
</div>
```

要点：
- 柱状图列：`flex-1 md:flex-initial` — mobile 上填充空间，desktop 上使用自然宽度。
- 柱状图形状：`w-full md:w-10 lg:w-12 2xl:w-14` — mobile 上自适应，desktop 上阶梯固定宽度（40px → 48px → 56px）。间距保持 `gap-5`（20px）；比例从 50%（md）到约 36%（2xl）不等。
- 间距：`gap-3 md:gap-5` — mobile 上更紧凑，desktop 上比例约 50%。
- 无水平滚动条 — 柱状图缩窄以适应。

**分区包装器 — 响应式间距：**

仪表盘分区使用纯容器，无不透明背景。间距通过边距处理。

```html
<!-- Section container — no background, margin between sections -->
<div class="mb-4 md:mb-6">
  <h3 class="text-base font-semibold text-neutral-950 mb-5">Section Title</h3>
  <!-- grouped content -->
</div>
```

要点：
- 无 `bg-surface-*` 类 — 容器是透明的。
- 分区之间使用 `mb-4 md:mb-6` 间距；最后一个分区省略边距。
- 内部面板（图表、表格、时间线）自行处理背景（`bg-white`）和内边距。
- `surface-*` 着色在 `design-tokens.md` 中仍然可用，但不是默认模式。

Mobile：16px 内边距 / 16px 底部边距。Desktop：20px 内边距 / 24px 底部边距。

### 管理后台列表页——移动端卡片列表

在 768px 以下视口中，admin 列表页从 `el-table` 切换为卡片列表，使用 `hidden md:block` 处理 desktop 元素，`md:hidden` 处理 mobile 元素。不使用 JavaScript 窗口宽度检测——仅使用 CSS 断点。

**统计摘要卡片（mobile）：**
- 网格：`grid-cols-2 md:grid-cols-3 gap-2 md:gap-4`
- 内边距：`p-2.5 md:p-4`
- 标签字号：`text-[10px] md:text-sm`
- 数值字号：`text-base md:text-2xl`

**筛选栏（mobile）：**
- Desktop：内联筛选栏，使用 `hidden md:flex`（当前布局不变）
- Mobile：搜索输入框（`flex-1`）+ 筛选按钮触发 `el-drawer`（`direction="btt"`，`size="auto"`）
- Drawer 包含所有筛选下拉选择器垂直堆叠，带有"应用"和"重置"按钮
- 从 `@element-plus/icons-vue` 导入 `Operation` 图标用于筛选按钮

**卡片结构（每张卡片 4 层）：**

```html
<div class="bg-white rounded-btn border border-neutral-200 p-3">
  <!-- Layer 1: Primary ID + Status badge -->
  <div class="flex items-center justify-between mb-2">
    <span class="text-xs font-semibold text-brand-600">{{ row.id }}</span>
    <el-tag :type="statusType" size="small" effect="light">{{ statusLabel }}</el-tag>
  </div>
  <!-- Layer 2: Person/Entity + Amount -->
  <div class="flex items-center justify-between mb-2">
    <span class="text-sm text-neutral-700">{{ row.customer }} · {{ row.phone }}</span>
    <span class="text-sm font-semibold text-neutral-950">{{ formattedAmount }}</span>
  </div>
  <!-- Layer 3: Attribute tags (max 2 + "+N") -->
  <div class="flex flex-wrap gap-1 mb-2">
    <el-tag v-for="(item, i) in row.items.slice(0, 2)" :key="i" size="small" effect="plain" type="info">
      {{ item }}
    </el-tag>
    <el-tag v-if="row.items.length > 2" size="small" effect="plain" type="info">+{{ row.items.length - 2 }}</el-tag>
  </div>
  <!-- Layer 4: Meta info + Three-dot action menu -->
  <div class="flex items-center justify-between">
    <span class="text-[10px] text-neutral-400">{{ row.channel }} · {{ row.createdAt }}</span>
    <el-dropdown trigger="click" @command="(cmd) => handleCardAction(cmd, row)">
      <el-button link size="small" class="text-neutral-500" @click.stop>
        <el-icon :size="18"><MoreFilled /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="view">
            <el-icon :size="14" class="mr-1"><View /></el-icon> View
          </el-dropdown-item>
          <el-dropdown-item command="edit">
            <el-icon :size="14" class="mr-1"><Edit /></el-icon> Edit
          </el-dropdown-item>
          <el-dropdown-item command="delete" divided>
            <el-icon :size="14" class="mr-1" color="#dc2626"><Delete /></el-icon>
            <span class="text-red-600">Delete</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</div>
```

**卡片操作处理器：**

```typescript
const handleCardAction = (cmd: string, row: RowType) => {
  if (cmd === 'view') handleView(row)
  else if (cmd === 'edit') handleEdit(row)
  else if (cmd === 'delete') handleDelete(row)
}
```

使用 `@element-plus/icons-vue` 中的 `MoreFilled` 作为三点图标。dropdown 触发器上的 `@click.stop` 防止卡片级别的点击事件传播。

**分页（mobile）：**

```html
<div class="flex md:hidden items-center justify-center gap-3 mb-4">
  <el-button size="small" :disabled="currentPage <= 1" @click="currentPage--">
    ‹ Prev
  </el-button>
  <span class="text-sm text-neutral-500">{{ currentPage }} / {{ totalPages || 1 }}</span>
  <el-button size="small" :disabled="currentPage >= totalPages" @click="currentPage++">
    Next ›
  </el-button>
</div>
```

表格容器内的 desktop 分页使用 `hidden md:flex` 包装器并保留完整的 `el-pagination`。

**可见性控制：** 使用 Tailwind 响应式显示类 — `hidden md:block` / `hidden md:flex` 用于仅 desktop 元素，`md:hidden` 用于仅 mobile 元素。

### 详情页

额外关注：关键信息在首屏可见、可见的状态和主要操作、清晰的详情分组、次要信息（历史、日志、备注）不与主要信息竞争、轻松返回列表。

### 页面头部

每个 admin 页面都以页面头部开始。格式取决于导航深度：

**规则：** 使用 `<h1>` 标题 + `<p>` 副标题用于单层（菜单入口）页面。使用 `<el-breadcrumb>` 用于多层（更深导航）页面。面包屑反映功能操作路径，而非侧边栏菜单层级。

**单层（菜单入口页面）— 使用标题 + 副标题：**

```html
<div class="mb-4 md:mb-6">
  <h1 class="text-2xl font-semibold text-neutral-950">{{ pageTitle }}</h1>
  <p class="text-sm text-neutral-500 mt-1">{{ pageDescription }}</p>
</div>
```

单级面包屑在语义上不适合作为页面标题 — `<h1>` 配合描述性副标题提供正确的标题层级和页面上下文。

**多层（更深页面）— 使用面包屑：**

```html
<el-breadcrumb separator="/" class="mb-4 md:mb-6">
  <el-breadcrumb-item :to="{ path: '/admin/users/list' }">用户列表</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/admin/users/detail/ORD-001' }">ORD-001</el-breadcrumb-item>
  <el-breadcrumb-item>操作记录</el-breadcrumb-item>
</el-breadcrumb>
```

- 最后一级 = 当前页面，纯文本，不可点击
- 前几级 = 可点击的 `:to` 链接，导航至各自页面

**表单页说明：** 在 admin 表单页上，页面头部嵌入在工具栏行中，与操作按钮并排（参见下方管理后台表单页补充）。工具栏 `<div class="flex items-center justify-between">`（或标题+副标题头部使用 `items-start`）替代头部本身的 `mb-4 md:mb-6` — 间距移至工具栏包装器。

### 管理后台 CRUD 模式

管理后台实体管理遵循标准 CRUD 流程：list → create → detail → edit。

**路由结构：**

```
/admin/{entity}              → List page
/admin/{entity}/create       → Create form
/admin/{entity}/:id          → Detail page
/admin/{entity}/:id/edit     → Edit form
```

**CRUD 页面面包屑：**

- List：`{entity name}`
- Create：`{entity name} / 创建{entity}`
- Detail：`{entity name} / {record id}`
- Edit：`{entity name} / {record id} / 编辑`

**共享表单模式（创建/编辑）：**

创建和编辑使用相同的表单组件。通过路由名称检测模式：

```typescript
const isEdit = computed(() => route.name === '{entity}-edit')
const pageTitle = computed(() => isEdit.value ? '编辑' : '创建')
```

挂载时，如果是编辑模式，加载已有数据并预填充表单。提交时，根据模式调用更新或创建。

**表单字段分组：**

- **必填字段** 放在前面，分组在带有蓝色左侧强调色条（`border-l-blue-600`）的"基本信息"分区卡片下
- **次要字段** 放在带有青色左侧强调色条（`border-l-cyan-600`）的独立"其他信息"分区卡片中
- **分区卡片** 之间使用 `gap-4` 分隔，而非分隔线（参见上方管理后台表单页补充）
- **提交/取消按钮** 位于页面顶部的工具栏行中，与页面头部同行（参见上方管理后台表单页补充）

**详情页结构：**

- 带有返回导航的面包屑
- 头部：记录 ID + 状态标签
- 详情卡片：关键信息的 2 列网格（`grid grid-cols-1 md:grid-cols-2 gap-4`）
- 次要信息卡片（全宽，条件显示）
- 操作栏：编辑 + 删除按钮

**列表页集成：**

- "创建"按钮：desktop 在表格上方（`hidden md:flex justify-end`），mobile 在卡片列表上方（`flex md:hidden justify-end`）
- 行/卡片点击导航至详情：`el-table` 上使用 `@row-click`，卡片上使用 `@click` + `cursor-pointer`
