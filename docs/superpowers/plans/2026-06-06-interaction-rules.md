# Component Interaction Rules — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create systematic component interaction behavior rules (generic, cards, tables, charts, forms, navigation), update referencing docs, apply to dashboard code.

**Architecture:** New doc `07-interaction-rules.md` is the source of truth. Two existing docs get reference updates. One skill reference gets an interaction chapter. Dashboard code gets hover/click/focus interactions added inline.

**Tech Stack:** Markdown docs + Vue 3 SFC.

---

### Task 1: Create 07-interaction-rules.md

**Files:**
- Create: `docs/ui-ux/07-interaction-rules.md`

- [ ] **Step 1: Write the file**

Write `docs/ui-ux/07-interaction-rules.md` with this exact content using the Write tool:

```markdown
# 组件交互行为规范

本文件定义前台和后台组件的交互行为规则。Claude Code 在生成页面时必须遵守，不应生成无交互的静态组件。

## 通用规则

- 可点击元素必须有 `cursor: pointer` 和 hover 视觉变化（`duration-fast` 150ms）
- 不可交互元素不应用 hover 效果——避免误导用户
- 键盘 focus 环必须可见：`2px solid` brand-600，`outline-offset: 2px`
- **disabled 态：**
  - `opacity: 0.5` + `cursor: not-allowed` + 不响应点击/键盘事件
  - 不依赖单一颜色表达 disabled（可访问性）
- **loading 态：** skeleton 或 spinner，不应导致布局大幅跳动
- **transition 时长统一：** hover/focus 150ms / toggle 200ms / dialog-drawer 300ms

> 适用性：通用

## 卡片

### 可点击卡片
- hover：`shadow-sm → shadow-md`，`border-neutral-200 → brand-200`
- `cursor: pointer`
- 卡片内独立按钮 `@click.stop` 阻止事件冒泡

### 纯展示卡片
- 无 hover 效果，`cursor: default`
- 不添加无意义的整卡点击

> 适用性：前台为主；后台指标卡可参考可点击卡片规则做 hover

## 表格

### 数据行
- hover：`background: neutral-50`（`#f5f5f5`）
- 可点击行：`cursor: pointer`
- 当前选中行：`background: brand-50`（`#eff6ff`）+ 左侧 `2px solid` brand-600

### 表头
- 可排序列：hover 文字变色 + 点击切换排序图标（asc/desc/none）
- 不可排序列：`cursor: default`
- 排序状态必须有视觉区分

### 分页
- 当前页码：高亮背景
- 页码按钮 hover：`background: neutral-100`
- 不可用按钮（首页/末页时）：disabled 态

> 适用性：后台为主

## 图表

### 柱状图 / 条形图
- 柱子 hover：亮度变化（`filter: brightness(0.9)`）+ tooltip 显示精确值
- tooltip：延迟 200ms 显示，内容为「标签 + 数值 + 单位」，离开即消失
- 数据点可点击时：`cursor: pointer`

### 折线图
- 数据点 hover：圆点放大 + tooltip
- 线本身不响应 hover

### 空数据
- 显示 empty state（"暂无数据"），不是空白区域
- 可选：引导用户补充数据

> 适用性：后台仪表盘

## 表单

### 校验
- **校验时机：** blur 时校验当前字段，submit 时全量校验
- 校验期间不应阻止用户输入

### 提交
- 点击提交按钮后立即进入 loading + disabled 状态
- 必须阻止重复提交（前端限制 + 后端幂等）
- 提交成功后：Toast 反馈 2 秒自动消失，或页面内成功状态
- 提交失败后：恢复按钮可点击状态，显示错误信息

### 错误提示
- 靠近对应字段下方
- 红色文字（`danger` `#dc2626`）+ 输入框红色边框 + 错误图标
- 不只用颜色表达错误

### 必填项
- label 后加红色星号（`*`）
- 可选：label 后加"（选填）"标记非必填项

> 适用性：通用

## 导航

### 侧边栏
- 当前页面项：`bg-brand-50 + text-brand-600 + font-medium`
- 未选中项 hover：`bg-neutral-50`
- active 和 focus 状态必须可见
- 收缩/展开切换：200ms transition

### 标签页
- 选中标签：底部 2px border + brand-600 文字
- 未选中 hover：文字变为 brand-600
- 切换时内容区无跳动

### 面包屑
- 最后一级（当前页）：不可点击，`color: neutral-950`
- 前面各级：可点击，hover `color: brand-600`
- 分隔符不参与交互

> 适用性：通用

## 适用性索引

| 组件 | 前台 | 后台 |
| --- | --- | --- |
| 可点击卡片 | 主要场景 | 指标卡 hover 可用 |
| 纯展示卡片 | 内容展示 | 数据卡片 |
| 表格 | 不常用 | 主要场景 |
| 图表 | 不常用 | 仪表盘 |
| 表单校验 | 简化校验 | 完整校验 |
| 侧边栏 | 可选 | 标准配置 |
| 标签页 | 内容分类 | 功能切换 |
```

- [ ] **Step 2: Verify sections**

```bash
grep "^## " docs/ui-ux/07-interaction-rules.md
```
Expected: 通用规则, 卡片, 表格, 图表, 表单, 导航, 适用性索引

- [ ] **Step 3: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add docs/ui-ux/07-interaction-rules.md && git commit -m "feat: add component interaction rules — cards, tables, charts, forms, navigation"
```

---

### Task 2: Update 01-design-principles.md — add reference links

**Files:**
- Modify: `docs/ui-ux/01-design-principles.md`

- [ ] **Step 1: Append reference section**

Use Edit to append after "## 质量判断标准" section. Find the last line of that section and add after it.

old_string:
```
6. 视觉风格是否统一、克制、稳定
```

new_string:
```
6. 视觉风格是否统一、克制、稳定

## 相关文档

- `02-design-tokens.md` — 设计令牌（颜色、间距、字体、圆角、阴影、动效）
- `03-component-system.md` — 组件体系与映射表
- `07-interaction-rules.md` — 组件交互行为规范
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add docs/ui-ux/01-design-principles.md && git commit -m "feat: add cross-references to related design docs"
```

---

### Task 3: Update 00-overview.md — add to doc index

**Files:**
- Modify: `docs/ui-ux/00-overview.md`

- [ ] **Step 1: Add to doc structure table**

Use Edit to add a row after the `06-review-checklist.md` row.

old_string:
```
| `06-review-checklist.md` | 审查清单：8 个维度逐项检查、状态补全 Prompt |
```

new_string:
```
| `06-review-checklist.md` | 审查清单：8 个维度逐项检查、状态补全 Prompt |
| `07-interaction-rules.md` | 交互规范：通用规则、卡片、表格、图表、表单、导航交互行为 |
```

- [ ] **Step 2: Update recommended flow**

old_string:
```
→ 按生成规则写代码 (05)
→ 按审查清单检查 (06)
```

new_string:
```
→ 引用交互规范 (07)
→ 按生成规则写代码 (05)
→ 按审查清单检查 (06)
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add docs/ui-ux/00-overview.md && git commit -m "feat: add interaction rules to doc index and workflow"
```

---

### Task 4: Update skill design-standards.md

**Files:**
- Modify: `.claude/skills/ui-ux-agent-designer/references/design-standards.md`

- [ ] **Step 1: Append interaction behavior section**

Use Edit to append after the last line of the file (after "## Responsive Targets").

old_string:
```
- `390px`: use single-column flow and keep primary actions visible.
```

new_string:
```
- `390px`: use single-column flow and keep primary actions visible.

## Component Interaction Rules

### General

- Interactive elements: `cursor: pointer` + hover visual change (150ms).
- Non-interactive elements: no hover effect (avoid false affordance).
- Focus ring: `2px solid` brand, `outline-offset: 2px`, visible for keyboard nav.
- Disabled: `opacity: 0.5` + `cursor: not-allowed` + ignore events. Never rely on color alone.
- Loading: skeleton or spinner; avoid layout shift.
- Transitions: hover/focus 150ms, toggle 200ms, dialog/drawer 300ms.

### Cards

- **Clickable card**: hover shadow-sm → shadow-md, border neutral → brand. `cursor: pointer`. Buttons inside use `@click.stop`.
- **Display-only card**: no hover, `cursor: default`.

### Tables

- Row hover: `bg-neutral-50`. Clickable row: `cursor: pointer`.
- Selected row: `bg-brand-50` + left `2px solid brand`.
- Sortable header: hover color shift + click toggles sort icon.
- Non-sortable header: `cursor: default`.
- Pagination: current page highlighted, hover `bg-neutral-100`.

### Charts

- Bar hover: brightness shift + tooltip (200ms delay, label + value + unit).
- Clickable data points: `cursor: pointer`.
- Empty data: show empty state, not blank area.

### Forms

- Validate on blur; full validation on submit.
- Submit button: immediate loading + disabled; prevent double-submit.
- Errors near field: red text + red border + icon; never color alone.
- Success: Toast 2s auto-dismiss, or inline success state.

### Navigation

- Sidebar: active item `bg-brand-50 + text-brand-600 + font-medium`; inactive hover `bg-neutral-50`.
- Tabs: selected gets bottom border + brand color; hover shifts text color.
- Breadcrumbs: last item not clickable `text-primary`; earlier items hover `brand-600`.
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add .claude/skills/ui-ux-agent-designer/references/design-standards.md && git commit -m "feat: add component interaction rules to skill design-standards reference"
```

---

### Task 5: Apply interactions to Dashboard code

**Files:**
- Modify: `login-homepage-preview/src/views/DashboardView.vue`

- [ ] **Step 1: Add hover effects to metric cards**

Use Edit to add hover classes to the metric card div.

old_string:
```
          class="bg-white rounded-btn border border-neutral-200 p-4"
```

new_string:
```
          class="bg-white rounded-btn border border-neutral-200 p-4 hover:shadow-md hover:border-brand-200 cursor-pointer transition-all duration-150"
```

- [ ] **Step 2: Add tooltip to bar chart bars**

Use Edit to add title attribute to chart bars.

old_string:
```
              <span class="text-xs text-neutral-500">{{ val }}</span>
              <div
                class="w-full rounded-t-sm transition-all duration-300"
                :style="{
                  height: `${(val / maxValue) * 160}px`,
                  background: `linear-gradient(180deg, #2563eb 0%, #eff6ff 100%)`,
                }"
              ></div>
```

new_string:
```
              <span class="text-xs text-neutral-500">{{ val }}</span>
              <div
                class="w-full rounded-t-sm transition-all duration-150 cursor-pointer hover:brightness-90"
                :title="`${chartDays[i]}: ${val} 单`"
                :style="{
                  height: `${(val / maxValue) * 160}px`,
                  background: `linear-gradient(180deg, #2563eb 0%, #eff6ff 100%)`,
                }"
              ></div>
```

- [ ] **Step 3: Add hover to horizontal bar chart**

Use Edit to add hover classes.

old_string:
```
              <div class="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :style="{ width: `${(cat.value / maxCat) * 100}%`, background: cat.color }"
                ></div>
              </div>
```

new_string:
```
              <div class="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-150 cursor-pointer hover:brightness-90"
                  :title="`${cat.name}: ${cat.value}`"
                  :style="{ width: `${(cat.value / maxCat) * 100}%`, background: cat.color }"
                ></div>
              </div>
```

- [ ] **Step 4: Add hover to timeline items**

Use Edit to add hover to timeline rows.

old_string:
```
            class="flex gap-3 pb-5 relative"
```

new_string:
```
            class="flex gap-3 pb-5 relative hover:bg-neutral-50 -mx-2 px-2 rounded-btn transition-colors duration-150"
```

- [ ] **Step 5: Add sidebar menu focus states**

Use Edit to add focus-visible to sidebar nav items.

old_string:
```
          <div class="px-3 py-2 rounded-btn text-sm text-neutral-500 cursor-pointer hover:bg-neutral-50 transition-colors duration-150">
            用户管理
          </div>
          <div class="px-3 py-2 rounded-btn text-sm text-neutral-500 cursor-pointer hover:bg-neutral-50 transition-colors duration-150">
            订单管理
          </div>
          <div class="px-3 py-2 rounded-btn text-sm text-neutral-500 cursor-pointer hover:bg-neutral-50 transition-colors duration-150">
            系统设置
          </div>
```

new_string:
```
          <div class="px-3 py-2 rounded-btn text-sm text-neutral-500 cursor-pointer hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline transition-colors duration-150" tabindex="0">
            用户管理
          </div>
          <div class="px-3 py-2 rounded-btn text-sm text-neutral-500 cursor-pointer hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline transition-colors duration-150" tabindex="0">
            订单管理
          </div>
          <div class="px-3 py-2 rounded-btn text-sm text-neutral-500 cursor-pointer hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline transition-colors duration-150" tabindex="0">
            系统设置
          </div>
```

- [ ] **Step 6: Verify compilation**

```bash
curl -s http://localhost:5173/src/views/DashboardView.vue 2>&1 | head -3
```

- [ ] **Step 7: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add login-homepage-preview/src/views/DashboardView.vue && git commit -m "feat: add interactions to dashboard — card hover, chart tooltips, timeline hover, sidebar focus"
```

---

### Task 6: Final verification

- [ ] **Step 1: Verify all files exist and consistent**

```bash
ls docs/ui-ux/
grep "07-interaction-rules" docs/ui-ux/00-overview.md docs/ui-ux/01-design-principles.md
grep "Component Interaction Rules" .claude/skills/ui-ux-agent-designer/references/design-standards.md
```

- [ ] **Step 2: Verify no stale references**

```bash
git status && git log --oneline -8
```
