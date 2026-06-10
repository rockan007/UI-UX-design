---
name: vue3-element-ui-ux
description: Vue 3 + Element Plus UI/UX design constraints for this project. Use when generating, reviewing, or improving any page in this codebase.
---

# Vue 3 Element Plus UI/UX Design Constraints

Use this skill to make Claude Code produce UI aligned with this project's design system, not free-form code.

## Core Workflow

```text
Page type identification
→ design tokens
→ UI DSL
→ component mapping
→ code generation with interaction rules
→ review checklist
```

Do not start writing page code before outputting UI DSL.

## First Move

When asked to create or improve a page:

1. Identify page type (frontend vs admin) using `references/design-principles.md`.
2. Load design tokens from `references/design-tokens.md`.
3. Generate UI DSL following `references/ui-dsl.md`.
4. Map DSL to Element Plus components using `references/component-system.md`.
5. Implement code following `references/generation-rules.md`.
6. Apply interaction behaviors from `references/interaction-rules.md`.
7. Review with `references/review-checklist.md`.

## Non-Negotiable Rules

- Do not change business logic, API contracts, database structure, or permissions.
- Use Element Plus components + Tailwind CSS for layout/spacing.
- Never introduce another UI framework.
- Use `@element-plus/icons-vue` for icons.
- Do not write random colors, radii, shadows, or one-off styles.
- Every page must cover: `loading`, `empty`, `error`, `disabled`, `hover`, `focus`, validation, permission, and mobile states.
- Admin pages: optimize for scanability, density, tables, filters, forms, repeated use.
- Frontend pages: optimize for clarity, task completion, readable hierarchy, mobile usability.
- Override Element Plus theme only via CSS custom properties, not Tailwind.
- Configure Element Plus Chinese locale in `main.ts`: `import zhCn from 'element-plus/dist/locale/zh-cn.mjs'` and `app.use(ElementPlus, { locale: zhCn })`. Never leave the default English locale — built-in component text (pagination, table, select, dialog) must match the project language.

## Output Pattern

For a new page, output in this order:
1. Page type and UX goal
2. UI DSL
3. Component mapping summary
4. Code implementation
5. Interaction states covered
6. Review self-check

## Reference Loading Guide

- Read `references/design-principles.md` for frontend vs admin goals and content guidelines.
- Read `references/design-tokens.md` for exact colors, spacing, type, shadows, radii, and animation values.
- Read `references/component-system.md` for component hierarchy and Element Plus mapping tables.
- Read `references/ui-dsl.md` for DSL schema and page templates.
- Read `references/generation-rules.md` for agent rules, workflow steps, and prompt templates.
- Read `references/interaction-rules.md` for hover, focus, disabled, loading behavior on every component type.
- Read `references/review-checklist.md` for post-implementation quality checks.
