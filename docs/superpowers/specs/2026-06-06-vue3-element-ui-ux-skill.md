# Vue3 Element UI/UX Skill — Design Spec

**Date:** 2026-06-06
**Status:** Approved
**Type:** Claude Code Skill Generation

## Goal

从 `docs/ui-ux/` 的 8 份中文设计文档编译出一个 Vue 3 + Element Plus 专用的英文 Claude Code skill，放在 `.claude/skills/vue3-element-ui-ux/`。

## Structure

```
.claude/skills/vue3-element-ui-ux/
├── SKILL.md                       # 入口：触发条件、工作流、非协商规则
└── references/
    ├── design-principles.md       # ← 01-design-principles.md
    ├── design-tokens.md           # ← 02-design-tokens.md
    ├── component-system.md        # ← 03-component-system.md
    ├── ui-dsl.md                  # ← 04-ui-dsl.md
    ├── generation-rules.md        # ← 05-generation-rules.md
    ├── interaction-rules.md       # ← 07-interaction-rules.md
    └── review-checklist.md        # ← 06-review-checklist.md
```

## SKILL.md Content Plan

- **Trigger:** When generating/improving UI pages for Vue 3 + Element Plus projects
- **Workflow:** 7-step sequence matching references
- **Non-negotiable rules:** extracted from 01-design-principles and 05-generation-rules
- **Reference loading guide:** which reference to read for which task

## Reference Compilation Rules

- English translation of Chinese docs
- Preserve all concrete values (hex, px, token names)
- Preserve all tables (component mappings, variant mappings, state mappings)
- Preserve all code blocks (DSL examples, prompt templates)
- Omit meta-documentation (doc index, cross-references)
- Target: each reference 100-200 lines, optimized for Claude Code consumption

## Files NOT changed

- `docs/ui-ux/` — unchanged, remains source of truth
- `.claude/skills/ui-ux-agent-designer/` — unchanged
