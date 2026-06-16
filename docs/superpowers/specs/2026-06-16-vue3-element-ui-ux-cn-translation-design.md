# vue3-element-ui-ux-cn: Chinese Translation of vue3-element-ui-ux Skill

## Goal

Create a Chinese translation of the existing `vue3-element-ui-ux` skill, named `vue3-element-ui-ux-cn`, stored under `.claude/skills/vue3-element-ui-ux-cn/`.

## Trigger

The Chinese version has its own independent trigger. Users must explicitly invoke `vue3-element-ui-ux-cn` — it is not automatically selected based on conversation language.

## File Structure

Mirror of the original skill:

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

## Translation Scope

- **Translate:** All instructional text, rule descriptions, comments, YAML frontmatter `description`
- **Preserve as-is:** Code blocks, component names (`ElButton`, `ElInput`), CSS class names (`bg-white`, `rounded-btn`), variable names, JSON keys, YAML frontmatter `name`
- **Preserve as-is:** Existing Chinese strings already embedded in code examples (`"创建"`, `"基本信息"`, `"编辑"`, etc.)

## Terminology Glossary

Core terms with unified translations:

| English | 中文 |
|---|---|
| design tokens | 设计令牌 |
| design principles | 设计原则 |
| component system | 组件系统 |
| interaction rules | 交互规则 |
| generation rules | 生成规则 |
| review checklist | 审查清单 |
| i18n rules | 国际化规则 |
| UI DSL | UI DSL（保留） |
| page type | 页面类型 |
| user task flow | 用户任务流 |
| interaction model | 交互模型 |
| accent card | 强调卡片 |
| raised panel | 浮起面板 |
| standard block | 标准块 |
| zone / section shading | 分区 / 分区着色 |
| stat card / metric card | 统计卡片 / 指标卡片 |
| accent stripe | 强调色条 |
| tonal background | 色调背景 |
| filter bar / filter drawer | 筛选栏 / 筛选抽屉 |
| card list | 卡片列表 |
| connector line | 连接线 |
| composite / base component | 复合组件 / 基础组件 |
| empty / loading / error state | 空状态 / 加载状态 / 错误状态 |
| tabbed form | 标签页表单 |
| destructive action | 破坏性操作 |
| responsive | 响应式 |
| skeleton | 骨架屏 |
| locale | 语言区域 |

## Batch Execution Plan

### Batch 1 — Baseline (1 file)
- `SKILL.md` — establishes terminology baseline for all subsequent batches

### Batch 2 — Core References (4 files, parallel)
- `references/design-principles.md`
- `references/design-tokens.md`
- `references/component-system.md`
- `references/ui-dsl.md`

### Batch 3 — Rules & Checklists (4 files, parallel)
- `references/generation-rules.md`
- `references/interaction-rules.md`
- `references/i18n-rules.md`
- `references/review-checklist.md`

### Final Pass
- Cross-file terminology consistency review
- Code block integrity check (all code blocks match original exactly)

## Output

After translation, the complete `vue3-element-ui-ux-cn` skill is available at `.claude/skills/vue3-element-ui-ux-cn/` with all 8 files translated and reviewed for consistency.
