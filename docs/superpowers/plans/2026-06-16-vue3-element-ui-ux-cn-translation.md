# vue3-element-ui-ux-cn Translation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a Chinese translation of the `vue3-element-ui-ux` skill at `.claude/skills/vue3-element-ui-ux-cn/` with all 8 files translated, terminology consistent, and code blocks preserved.

**Architecture:** Mirror the original skill's file structure exactly. Translate instructional/descriptive text while preserving all code blocks, component names, CSS classes, variable names, and existing Chinese strings unchanged. Follow the terminology glossary from the spec.

**Tech Stack:** Markdown files only — no code dependencies.

---

### Task 1: Create directory structure and translate SKILL.md (Batch 1)

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux-cn/SKILL.md`
- Create: `.claude/skills/vue3-element-ui-ux-cn/references/` (directory)

- [ ] **Step 1: Create the target directory structure**

```bash
mkdir -p .claude/skills/vue3-element-ui-ux-cn/references
```

- [ ] **Step 2: Read original SKILL.md as translation source**

Read `.claude/skills/vue3-element-ui-ux/SKILL.md` to use as the source for translation.

- [ ] **Step 3: Translate SKILL.md and write to target**

Write `.claude/skills/vue3-element-ui-ux-cn/SKILL.md` with:

```markdown
---
name: vue3-element-ui-ux-cn
description: 在 Vue 3 + Element Plus + Tailwind CSS 项目中生成、审查或改进页面时使用，通过设计令牌、组件映射表和状态覆盖规则确保一致的管理后台/前端界面。
---

# Vue 3 Element Plus UI/UX 设计约束

使用此 skill 让 Claude Code 产出符合项目设计系统的界面，而非自由发挥的代码。

## 核心工作流

```text
页面类型识别
→ 用户任务流
→ 交互模型
→ 设计令牌
→ UI DSL
→ 组件映射
→ 代码生成（含交互规则）
→ 审查清单
```

在定义用户任务流并输出 UI DSL 之前，不要开始编写页面代码。

## 第一步

当被要求创建或改进页面时：

0. 检查 `package.json` 中是否有 `"vue3ElementUiUx": { "i18n": true }`。如果启用，在继续之前加载 `references/i18n-rules.md`。
1. 使用 `references/design-principles.md` 识别页面类型（前端 vs 管理后台）。
2. 定义用户任务流：入口上下文 → 第一个操作 → 任务完成 → 下一步操作。
3. 定义交互模型：每个关键操作的触发、反馈、成功、失败和恢复。
4. 从 `references/design-tokens.md` 加载设计令牌。
5. 按照 `references/ui-dsl.md` 生成 UI DSL。
6. 使用 `references/component-system.md` 将 DSL 映射到 Element Plus 组件。
7. 按照 `references/generation-rules.md` 实现代码。
8. 应用 `references/interaction-rules.md` 中的交互行为。
9. 使用 `references/review-checklist.md` 进行审查。

## 不可协商的规则

- 不要修改业务逻辑、API 契约、数据库结构或权限。
- 使用 Element Plus 组件 + Tailwind CSS 进行布局/间距。
- 绝不引入其他 UI 框架。
- 使用 `@element-plus/icons-vue` 作为图标。
- 不要编写随意的颜色、圆角、阴影或一次性样式。
- 每个页面必须覆盖：`loading`、`empty`、`error`、`disabled`、`hover`、`focus`、验证、权限和移动端状态。
- 管理后台页面：优化可扫描性、密度、表格、筛选器、表单、重复使用。
- 前端页面：优化清晰度、任务完成、可读层次、移动端可用性。
- 仅通过 CSS 自定义属性覆盖 Element Plus 主题，不使用 Tailwind。
- 在 `main.ts` 中配置 Element Plus 语言区域：
  - 如果项目未启用 i18n：`import zhCn from 'element-plus/dist/locale/zh-cn.mjs'` 和 `app.use(ElementPlus, { locale: zhCn })`。
  - 如果已启用 i18n（`package.json` 中有 `"vue3ElementUiUx": { "i18n": true }`）：语言区域通过 `elLocaleMap` + `el-config-provider` 处理，如 `references/i18n-rules.md` 所定义。不要单独硬编码 `zhCn`。
  - 绝不要保留默认的英文语言区域——内置组件文本必须与项目语言匹配。
- 包含 2+ 按钮的操作列：仅图标 + `el-tooltip`，列宽 = `(28 + 8) × maxButtons + 16`。
- 连接线（时间线、步骤）：连接线一侧不能有圆角——使用定向圆角（`rounded-r-*`）。
- 柱状图：间距 = 柱宽的 50%–100%，柱顶平直（不使用 `rounded-t-*`）。桌面端：固定 `w-10` + `gap-5`。移动端：`flex-1 w-full` 自适应（无滚动条）。在列上使用 `flex-1 md:flex-initial`，在柱上使用 `w-full md:w-10`。
- 管理后台页面使用容器层次：强调卡片（统计/指标，左侧 3px 色条）、浮起面板（图表，`shadow-sm` + 无边框）、标准块（表格/表单/列表，有边框）。分区包装器使用响应式 `p-4 md:p-5 mb-4 md:mb-6`。统计卡片独立放置（无分区包装器）。
- 侧边栏折叠：`overflow-x: hidden` 防止水平滚动条。

## 输出模式

对于新页面，按以下顺序输出：
1. 页面类型和 UX 目标
2. UI DSL
2a.（如果启用了 i18n）所有用户界面文本使用的语言键
3. 组件映射摘要
4. 代码实现
5. 已覆盖的交互状态
6. 自查审查

## 参考资料加载指南

- 阅读 `references/design-principles.md` 了解前端 vs 管理后台的目标和内容指南。
- 阅读 `references/design-tokens.md` 了解精确的颜色、间距、排版、阴影、圆角和动画值。
- 阅读 `references/component-system.md` 了解组件层次和 Element Plus 映射表。
- 阅读 `references/ui-dsl.md` 了解 DSL 模式和页面模板。
- 阅读 `references/generation-rules.md` 了解智能体规则、工作流步骤和提示词模板。
- 阅读 `references/interaction-rules.md` 了解每种组件类型的悬停、聚焦、禁用、加载行为。
- 阅读 `references/i18n-rules.md`（当项目启用 i18n 时）了解 vue-i18n 设置、语言文件约定、格式化规则（`$t`、`$n`、`$d`）、`LocaleSwitcher` 组件和 RTL 方向支持。
- 阅读 `references/review-checklist.md` 了解实现后的质量检查。
```

- [ ] **Step 4: Verify SKILL.md was written correctly**

```bash
wc -l .claude/skills/vue3-element-ui-ux-cn/SKILL.md
```

Confirm the file exists and has content.

- [ ] **Step 5: Commit SKILL.md**

```bash
git add .claude/skills/vue3-element-ui-ux-cn/SKILL.md
git commit -m "feat: add vue3-element-ui-ux-cn SKILL.md (Batch 1)"
```

---

### Task 2: Translate design-principles.md (Batch 2 — parallel)

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux-cn/references/design-principles.md`
- Source: `.claude/skills/vue3-element-ui-ux/references/design-principles.md`

- [ ] **Step 1: Read source file**

Read `.claude/skills/vue3-element-ui-ux/references/design-principles.md` to understand all sections before translating.

- [ ] **Step 2: Translate and write design-principles.md**

Write `.claude/skills/vue3-element-ui-ux-cn/references/design-principles.md` with all instructional text translated to Chinese. Key translations:
- "Core Principles" → "核心原则"
- "Visual Style" → "视觉风格"
- "Admin Container System" → "管理后台容器系统"
- "Section Shading" → "分区着色"
- "Frontend Goals" → "前端目标"
- "Admin Goals" → "管理后台目标"
- "Mobile List Pages" → "移动端列表页"
- "Admin CRUD Navigation" → "管理后台 CRUD 导航"
- "Admin Shell Layout (Mandatory)" → "管理后台 Shell 布局（强制）"
- "Content Guidelines" → "内容指南"
- "Error Messages" → "错误消息"
- "Empty States" → "空状态"
- "Button Copy" → "按钮文案"
- "Quality Criteria" → "质量标准"

Preserve all code blocks, HTML examples, ASCII diagrams, and table data exactly as-is.

- [ ] **Step 3: Verify the file**

```bash
wc -l .claude/skills/vue3-element-ui-ux-cn/references/design-principles.md
```

---

### Task 3: Translate design-tokens.md (Batch 2 — parallel)

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux-cn/references/design-tokens.md`
- Source: `.claude/skills/vue3-element-ui-ux/references/design-tokens.md`

- [ ] **Step 1: Read source file**

Read `.claude/skills/vue3-element-ui-ux/references/design-tokens.md`.

- [ ] **Step 2: Translate and write design-tokens.md**

Write `.claude/skills/vue3-element-ui-ux-cn/references/design-tokens.md` with all instructional text translated. Key translations:
- "Exact values for all visual properties..." → "所有视觉属性的精确值。不要猜测颜色、间距或字号。"
- "Neutral Scale" → "中性色阶"
- "Brand" → "品牌色"
- "Semantic" → "语义色"
- "Tonal Backgrounds" → "色调背景"
- "Tonal Borders" → "色调边框"
- "Rules" → "规则"
- "Dark Mode" → "暗色模式"
- "Spacing" → "间距"
- "Typography" → "排版"
- "Border Radius" → "圆角"
- "Accent Stripes" → "强调色条"
- "Shadows" → "阴影"
- "Animation" → "动画"

Preserve all tables' color values, hex codes, CSS variable names, and code snippets exactly as-is.

- [ ] **Step 3: Verify the file**

```bash
wc -l .claude/skills/vue3-element-ui-ux-cn/references/design-tokens.md
```

---

### Task 4: Translate component-system.md (Batch 2 — parallel)

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux-cn/references/component-system.md`
- Source: `.claude/skills/vue3-element-ui-ux/references/component-system.md`

- [ ] **Step 1: Read source file**

Read `.claude/skills/vue3-element-ui-ux/references/component-system.md`.

- [ ] **Step 2: Translate and write component-system.md**

Write `.claude/skills/vue3-element-ui-ux-cn/references/component-system.md` with all instructional text translated. Key translations:
- "Component hierarchy and Element Plus mapping..." → "组件层次和 Element Plus 映射。在编写代码之前，始终将 UI DSL 映射到这些组件。"
- "Base Components (minimal interaction units)" → "基础组件（最小交互单元）"
- "Composite Components (page patterns, not business-specific)" → "复合组件（页面模式，非业务特定）"
- "Frontend Components" → "前端组件"
- "Admin Components" → "管理后台组件"
- "Data Visualization" → "数据可视化"
- "Element Plus Mapping" → "Element Plus 映射"
- "Layout Mapping" → "布局映射"
- "Variant Mapping" → "变体映射"
- "State Mapping" → "状态映射"
- "Icons" → "图标"
- "Component Rules" → "组件规则"

Preserve all tables, component names (`ElButton`, `ElInput`, etc.), and structure exactly.

- [ ] **Step 3: Verify the file**

```bash
wc -l .claude/skills/vue3-element-ui-ux-cn/references/component-system.md
```

---

### Task 5: Translate ui-dsl.md (Batch 2 — parallel)

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux-cn/references/ui-dsl.md`
- Source: `.claude/skills/vue3-element-ui-ux/references/ui-dsl.md`

- [ ] **Step 1: Read source file**

Read `.claude/skills/vue3-element-ui-ux/references/ui-dsl.md`.

- [ ] **Step 2: Translate and write ui-dsl.md**

Write `.claude/skills/vue3-element-ui-ux-cn/references/ui-dsl.md` with all instructional text translated. Key translations:
- "Structured interface plan before code..." → "代码之前的结构化界面计划。每个页面都要先输出 UI DSL——在 DSL 明确之前，绝不编写代码。"
- "Base Schema" → "基础模式"
- "Interaction Fields" → "交互字段"
- "Page Templates" → "页面模板"
- "Admin List" → "管理后台列表"
- "Admin Form" → "管理后台表单"
- "Admin Dashboard" → "管理后台仪表盘"
- "Admin Detail" → "管理后台详情"
- "Admin Settings" → "管理后台设置"
- "Frontend List" → "前端列表"
- "DSL Review Checklist" → "DSL 审查清单"

Preserve all JSON blocks, field names, component references, and structure exactly as-is. The JSON content itself (keys, values that are code identifiers) stays in English.

- [ ] **Step 3: Verify the file**

```bash
wc -l .claude/skills/vue3-element-ui-ux-cn/references/ui-dsl.md
```

---

### Task 6: Commit Batch 2 files

**Files:**
- `.claude/skills/vue3-element-ui-ux-cn/references/design-principles.md`
- `.claude/skills/vue3-element-ui-ux-cn/references/design-tokens.md`
- `.claude/skills/vue3-element-ui-ux-cn/references/component-system.md`
- `.claude/skills/vue3-element-ui-ux-cn/references/ui-dsl.md`

- [ ] **Step 1: Verify all 4 files exist**

```bash
ls -la .claude/skills/vue3-element-ui-ux-cn/references/
```

Expected: 4 files listed (design-principles.md, design-tokens.md, component-system.md, ui-dsl.md).

- [ ] **Step 2: Commit Batch 2**

```bash
git add .claude/skills/vue3-element-ui-ux-cn/references/design-principles.md \
        .claude/skills/vue3-element-ui-ux-cn/references/design-tokens.md \
        .claude/skills/vue3-element-ui-ux-cn/references/component-system.md \
        .claude/skills/vue3-element-ui-ux-cn/references/ui-dsl.md
git commit -m "feat: add vue3-element-ui-ux-cn core references (Batch 2)"
```

---

### Task 7: Translate generation-rules.md (Batch 3 — parallel)

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux-cn/references/generation-rules.md`
- Source: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md`

- [ ] **Step 1: Read source file**

Read `.claude/skills/vue3-element-ui-ux/references/generation-rules.md` (the largest file at ~1029 lines).

- [ ] **Step 2: Translate and write generation-rules.md**

Write `.claude/skills/vue3-element-ui-ux-cn/references/generation-rules.md`. This is the most content-heavy file. Key translations:
- "Rules, workflow, and prompt templates..." → "页面生成的规则、工作流和提示词模板。严格遵循。"
- "Agent Rules" → "智能体规则"
- "Must Follow" → "必须遵守"
- "Required States" → "必须覆盖的状态"
- "Page Generation Workflow" → "页面生成工作流"
- "Prompt Templates" → "提示词模板"
- "Pre-generation" → "生成前"
- "Pre-code" → "编码前"
- "Pre-review" → "审查前"
- "Page Optimization" → "页面优化"
- "Page Type Supplements" → "页面类型补充"
- "Admin List Page" → "管理后台列表页"
- "Action Column Rule" → "操作列规则"
- "Admin Form Page" → "管理后台表单页"
- "Tabbed Form" → "标签页表单"
- "Three-Mode Form" → "三模式表单"
- "Admin Dashboard & Stat Pages" → "管理后台仪表盘和统计页"
- "Mobile Card List" → "移动端卡片列表"
- "Detail Page" → "详情页"
- "Page Header" → "页面头部"
- "Admin CRUD Pattern" → "管理后台 CRUD 模式"

Preserve all HTML/TypeScript code blocks, CSS classes, component names, and existing Chinese strings exactly as-is.

- [ ] **Step 3: Verify the file**

```bash
wc -l .claude/skills/vue3-element-ui-ux-cn/references/generation-rules.md
```

---

### Task 8: Translate interaction-rules.md (Batch 3 — parallel)

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux-cn/references/interaction-rules.md`
- Source: `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md`

- [ ] **Step 1: Read source file**

Read `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md`.

- [ ] **Step 2: Translate and write interaction-rules.md**

Write `.claude/skills/vue3-element-ui-ux-cn/references/interaction-rules.md`. Key translations:
- "Component interaction behavior rules..." → "组件交互行为规则。每个组件必须有适当的交互状态——不能有静态的、不可交互的组件。"
- "General" → "通用"
- "Confirmation Model" → "确认模式"
- "Connector Lines vs. Border Radius" → "连接线与圆角"
- "Cards" → "卡片"
- "Clickable Cards" → "可点击卡片"
- "Display-Only Cards" → "仅展示卡片"
- "Tables" → "表格"
- "Charts" → "图表"
- "Forms" → "表单"
- "Navigation" → "导航"
- "Applicability Index" → "适用性索引"

Preserve all CSS code, HTML code, TypeScript code, tables, and component names exactly.

- [ ] **Step 3: Verify the file**

```bash
wc -l .claude/skills/vue3-element-ui-ux-cn/references/interaction-rules.md
```

---

### Task 9: Translate i18n-rules.md (Batch 3 — parallel)

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux-cn/references/i18n-rules.md`
- Source: `.claude/skills/vue3-element-ui-ux/references/i18n-rules.md`

- [ ] **Step 1: Read source file**

Read `.claude/skills/vue3-element-ui-ux/references/i18n-rules.md`.

- [ ] **Step 2: Translate and write i18n-rules.md**

Write `.claude/skills/vue3-element-ui-ux-cn/references/i18n-rules.md`. Key translations:
- "Optional internationalization rules..." → "可选的国际化规则。仅在项目的 `package.json` 包含 `\"vue3ElementUiUx\": { \"i18n\": true }` 时激活。"
- "Tech Stack" → "技术栈"
- "File Structure" → "文件结构"
- "Configuration (main.ts)" → "配置（main.ts）"
- "Locale Files" → "语言文件"
- "Key Naming Convention" → "键命名约定"
- "Locale Switch (useLocale.ts)" → "语言切换（useLocale.ts）"
- "Formatting" → "格式化"
- "LocaleSwitcher Component" → "LocaleSwitcher 组件"
- "RTL Direction" → "RTL 方向"

Preserve all TypeScript/HTML/JSON code blocks, file paths, import paths, and configuration values exactly.

- [ ] **Step 3: Verify the file**

```bash
wc -l .claude/skills/vue3-element-ui-ux-cn/references/i18n-rules.md
```

---

### Task 10: Translate review-checklist.md (Batch 3 — parallel)

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux-cn/references/review-checklist.md`
- Source: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`

- [ ] **Step 1: Read source file**

Read `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`.

- [ ] **Step 2: Translate and write review-checklist.md**

Write `.claude/skills/vue3-element-ui-ux-cn/references/review-checklist.md`. Key translations:
- "Post-implementation quality review..." → "实现后质量审查。每次页面生成后运行此清单。"
- "Review Prompt" → "审查提示词"
- "Task Completion Path" → "任务完成路径"
- "Information Hierarchy" → "信息层次"
- "Visual Consistency" → "视觉一致性"
- "Form Experience" → "表单体验"
- "Table Experience" → "表格体验"
- "State Feedback" → "状态反馈"
- "Responsive" → "响应式"
- "Accessibility" → "无障碍访问"
- "State Completion Prompt" → "状态补全提示词"
- "i18n (when enabled)" → "国际化（启用时）"

Preserve all checklist items (the `- [ ]` markers and their English/Chinese mixed content), code blocks, and structure exactly.

- [ ] **Step 3: Verify the file**

```bash
wc -l .claude/skills/vue3-element-ui-ux-cn/references/review-checklist.md
```

---

### Task 11: Commit Batch 3 files

**Files:**
- `.claude/skills/vue3-element-ui-ux-cn/references/generation-rules.md`
- `.claude/skills/vue3-element-ui-ux-cn/references/interaction-rules.md`
- `.claude/skills/vue3-element-ui-ux-cn/references/i18n-rules.md`
- `.claude/skills/vue3-element-ui-ux-cn/references/review-checklist.md`

- [ ] **Step 1: Verify all 4 files exist**

```bash
ls -la .claude/skills/vue3-element-ui-ux-cn/references/
```

Expected: 8 files total (4 from Batch 2 + 4 from Batch 3).

- [ ] **Step 2: Commit Batch 3**

```bash
git add .claude/skills/vue3-element-ui-ux-cn/references/generation-rules.md \
        .claude/skills/vue3-element-ui-ux-cn/references/interaction-rules.md \
        .claude/skills/vue3-element-ui-ux-cn/references/i18n-rules.md \
        .claude/skills/vue3-element-ui-ux-cn/references/review-checklist.md
git commit -m "feat: add vue3-element-ui-ux-cn rules and checklists (Batch 3)"
```

---

### Task 12: Final consistency review

**Files:**
- All files in `.claude/skills/vue3-element-ui-ux-cn/`

- [ ] **Step 1: Terminology grep — verify key terms are consistent across all files**

```bash
# Check that "设计令牌" (not "设计标记" or "设计变量") is used consistently
grep -rn "设计令牌\|设计标记\|设计变量" .claude/skills/vue3-element-ui-ux-cn/

# Check that "管理后台" (not "后台管理" or "管理员") is used for "admin"
grep -rn "后台管理\|管理员页面" .claude/skills/vue3-element-ui-ux-cn/

# Check that "组件系统" (not "组件体系") is consistent
grep -rn "组件体系" .claude/skills/vue3-element-ui-ux-cn/
```

Expected: "设计令牌" and "管理后台" found; "设计标记", "设计变量", "后台管理", "组件体系" not found.

- [ ] **Step 2: Code block integrity — spot-check that code blocks match original**

```bash
# Compare line counts between original and translated files
echo "=== Original ===" && wc -l .claude/skills/vue3-element-ui-ux/SKILL.md .claude/skills/vue3-element-ui-ux/references/*.md
echo "=== Translated ===" && wc -l .claude/skills/vue3-element-ui-ux-cn/SKILL.md .claude/skills/vue3-element-ui-ux-cn/references/*.md
```

Line counts should be within ~10% of originals (translation may add or remove a few lines but should not be wildly different).

- [ ] **Step 3: Fix any issues found, then final commit**

```bash
git add .claude/skills/vue3-element-ui-ux-cn/
git commit -m "chore: final consistency review for vue3-element-ui-ux-cn"
```
```

---

### Complete Skill File Listing

After all tasks are complete, the skill should have:

```
.claude/skills/vue3-element-ui-ux-cn/
├── SKILL.md
└── references/
    ├── design-principles.md
    ├── design-tokens.md
    ├── component-system.md
    ├── ui-dsl.md
    ├── generation-rules.md
    ├── interaction-rules.md
    ├── i18n-rules.md
    └── review-checklist.md
```
