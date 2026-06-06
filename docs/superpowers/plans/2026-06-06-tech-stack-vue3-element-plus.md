# Tech Stack Migration — Vue 3/Element Plus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update tech stack from Next.js/shadcn/lucide-react to Vue 3/Element Plus/Tailwind CSS in 2 docs.

**Architecture:** Two isolated file edits with no cross-dependencies. `00-overview.md` gets the tech stack description update; `03-component-system.md` gets the Element Plus component mapping column and icon library update.

**Tech Stack:** Markdown documentation.

---

### Task 1: Update 00-overview.md — tech stack and recommendations

**Files:**
- Modify: `docs/ui-ux/00-overview.md`

- [ ] **Step 1: Replace tech stack line**

Use Edit to replace old_string:

```
Next.js + TypeScript + Tailwind CSS + shadcn/ui + lucide-react
```

with new_string:

```
Vue 3 + TypeScript + Element Plus + Tailwind CSS + @element-plus/icons-vue + Vite
```

- [ ] **Step 2: Replace recommendation reasons**

Use Edit to replace old_string:

```
- **Next.js**：目录结构清晰，适合前台和后台页面共存，Agent 熟悉度高
- **TypeScript**：组件 props 更容易约束，页面数据结构更清楚
- **Tailwind CSS**：样式表达直接，容易通过 token 和 class 约束视觉系统
- **shadcn/ui**：组件可复制可改造，适合后台系统，配合 Tailwind 和 TypeScript 好
- **lucide-react**：图标风格统一，避免手写 SVG
```

with new_string:

```
- **Vue 3**：Composition API 逻辑复用清晰，适合中大型前后台系统
- **TypeScript**：结合 `defineProps<T>()` 强类型约束组件接口
- **Element Plus**：组件体系完整，内置 Table、Form、Dialog 等后台高频组件，减少自定义
- **Tailwind CSS**：用于布局、间距、颜色微调等原子化样式，与 Element Plus CSS 变量互补
- **@element-plus/icons-vue**：与 Element Plus 原生配套，风格统一
- **Vite**：开发体验快，Vue 生态默认构建工具
```

- [ ] **Step 3: Add to "不建议的做法"**

Use Edit to replace old_string:

```
- 用内联样式替代设计系统
```

with new_string:

```
- 用内联样式替代设计系统
- 不要混用 Element Plus 和其他 UI 框架（如 Ant Design Vue、Naive UI）
- 不要用 Tailwind 重写 Element Plus 组件内部样式，优先使用 Element Plus CSS 变量覆盖
```

- [ ] **Step 4: Verify changes**

```bash
grep "Vue 3" docs/ui-ux/00-overview.md
grep "Element Plus" docs/ui-ux/00-overview.md
grep "Vite" docs/ui-ux/00-overview.md
```

- [ ] **Step 5: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add docs/ui-ux/00-overview.md && git commit -m "feat: update tech stack to Vue 3 + Element Plus + Tailwind CSS"
```

---

### Task 2: Update 03-component-system.md — component mapping and icons

**Files:**
- Modify: `docs/ui-ux/03-component-system.md`

- [ ] **Step 1: Add Element Plus column to 基础组件映射 table**

Use Edit to replace old_string:

```
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
```

with new_string:

```
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
```

- [ ] **Step 2: Update icon section**

Use Edit to replace old_string:

```
## 图标

- 优先使用 `lucide-react`
- 按钮中有合适图标时使用图标
- 图标按钮必须有 tooltip 或 aria-label
- 不手写 SVG，除非项目已有特殊图标系统
```

with new_string:

```
## 图标

- 优先使用 `@element-plus/icons-vue`
- 常用图标：`Search`、`Edit`、`Delete`、`Plus`、`ArrowDown`、`Close`
- 按钮中有合适图标时使用图标
- 图标按钮必须有 tooltip 或 aria-label
- 不手写 SVG，除非项目已有特殊图标系统
```

- [ ] **Step 3: Verify changes**

```bash
grep "ElButton\|ElInput\|ElSelect\|ElTable\|ElDialog\|ElMessage" docs/ui-ux/03-component-system.md
grep "@element-plus/icons-vue" docs/ui-ux/03-component-system.md
```

- [ ] **Step 4: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add docs/ui-ux/03-component-system.md && git commit -m "feat: add Element Plus component mapping and icon references"
```

---

### Task 3: Final cross-reference check

- [ ] **Step 1: Verify no stale React/shadcn references**

```bash
cd "/Users/anqi/projects/UI:UX design" && grep -rn "Next\.js\|shadcn\|lucide-react" docs/ui-ux/
```
Expected: no output

- [ ] **Step 2: Verify git status clean**

```bash
cd "/Users/anqi/projects/UI:UX design" && git status && git log --oneline -5
```
