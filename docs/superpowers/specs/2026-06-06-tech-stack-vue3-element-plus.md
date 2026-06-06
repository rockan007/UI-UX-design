# Tech Stack Migration — React/shadcn → Vue 3/Element Plus

**Date:** 2026-06-06
**Status:** Approved
**Scope:** 2 files changed, 5 files untouched

## Goal

Update the tech stack from Next.js + shadcn/ui + lucide-react to Vue 3 + Element Plus + Tailwind CSS + @element-plus/icons-vue + Vite. Keep Tailwind CSS for layout/spacing utilities alongside Element Plus.

## Files Changed

### 1. `docs/ui-ux/00-overview.md`

**Section: 技术选型**

Change tech stack line to:
```
Vue 3 + TypeScript + Element Plus + Tailwind CSS + @element-plus/icons-vue + Vite
```

**Section: 推荐原因**

Replace all 5 recommendation reasons:

| Old | New |
|---|---|
| Next.js：目录结构清晰，适合前台和后台页面共存，Agent 熟悉度高 | Vue 3：Composition API 逻辑复用清晰，适合中大型前后台系统 |
| TypeScript：组件 props 更容易约束，页面数据结构更清楚 | TypeScript：结合 `defineProps<T>()` 强类型约束组件接口 |
| Tailwind CSS：样式表达直接，容易通过 token 和 class 约束视觉系统 | Element Plus：组件体系完整，内置 Table、Form、Dialog 等后台高频组件，减少自定义 |
| shadcn/ui：组件可复制可改造，适合后台系统，配合 Tailwind 和 TypeScript 好 | Tailwind CSS：用于布局、间距、颜色微调等原子化样式，与 Element Plus CSS 变量互补 |
| lucide-react：图标风格统一，避免手写 SVG | @element-plus/icons-vue：与 Element Plus 原生配套，风格统一 |

Add to new 推荐原因:
- Vite：开发体验快，Vue 生态默认构建工具

**Section: 不建议的做法**

Add:
- 不要混用 Element Plus 和其他 UI 框架（如 Ant Design Vue、Naive UI）
- 不要用 Tailwind 重写 Element Plus 组件内部样式，优先使用 Element Plus CSS 变量覆盖

### 2. `docs/ui-ux/03-component-system.md`

**Section: 基础组件映射**

Add "Element Plus" column:

| UI DSL | 真实组件 | Element Plus |
|---|---|---|
| `Button` | `Button` | `ElButton` |
| `Input` | `Input` | `ElInput` |
| `Textarea` | `Input` (type=textarea) | `ElInput` |
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

**Section: 图标**

Replace `lucide-react` with `@element-plus/icons-vue`. Add common icon quick reference:
- 常用图标：`Search`、`Edit`、`Delete`、`Plus`、`ArrowDown`、`Close`

## Files NOT Changed

| File | Reason |
|---|---|
| `01-design-principles.md` | Framework-agnostic principles |
| `02-design-tokens.md` | CSS values work with any framework; Element Plus CSS vars cover same surface |
| `04-ui-dsl.md` | JSON schema, zero tech dependencies |
| `05-generation-rules.md` | References doc names, not technology |
| `06-review-checklist.md` | Universal UI review criteria |

## Tailwind + Element Plus Coexistence Rule

- Element Plus 负责组件级样式（Table、Form、Dialog 等）
- Tailwind CSS 负责布局级样式（flex、grid、spacing、responsive breakpoints）
- 覆盖 Element Plus 主题时优先使用 CSS 变量（`--el-color-primary` 等），不用 Tailwind
- 不混写两套样式系统实现同一效果
