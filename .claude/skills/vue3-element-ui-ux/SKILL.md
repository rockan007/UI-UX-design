---
name: vue3-element-ui-ux
description: Use when generating, reviewing, or improving pages in a Vue 3 + Element Plus + Tailwind CSS project that needs consistent admin/frontend UI with design tokens, component mapping tables, and state coverage rules.
---

# Vue 3 Element Plus UI/UX Design Constraints

Use this skill to produce UI aligned with this project's design system, not free-form code.

## Core Workflow

```text
Page type identification
→ user task flow
→ interaction model
→ design tokens
→ UI DSL
→ component mapping
→ code generation with interaction rules
→ review checklist
```

Do not start writing page code before defining the user task flow and outputting UI DSL.

## First Move

When asked to create or improve a page:

0. Check `package.json` for `"vue3ElementUiUx": { "i18n": true }`. If enabled, load `references/i18n-rules.md` before proceeding.
1. Identify page type (frontend vs admin) using `references/design-principles.md`.
2. Define the user task flow: entry context → first action → task completion → next action.
3. Define the interaction model: trigger, feedback, success, failure, and recovery for each key action.
4. Load design tokens from `references/design-tokens.md`.
5. Generate UI DSL following `references/ui-dsl.md`.
6. Map DSL to Element Plus components using `references/component-system.md`.
7. Implement code following `references/generation-rules.md`.
8. Apply interaction behaviors from `references/interaction-rules.md`.
9. Review with `references/review-checklist.md`.

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
- Configure Element Plus locale in `main.ts`:
  - If project i18n is NOT enabled: `import zhCn from 'element-plus/dist/locale/zh-cn.mjs'` and `app.use(ElementPlus, { locale: zhCn })`.
  - If i18n IS enabled (`"vue3ElementUiUx": { "i18n": true }` in package.json): locale is handled via `elLocaleMap` + `el-config-provider` as defined in `references/i18n-rules.md`. Do not hardcode `zhCn` separately.
  - Never leave the default English locale — built-in component text must match the project language.
- Action columns with 2+ buttons: icon-only + `el-tooltip`, column width = `(28 + 8) × maxButtons + 16`.
- Connector lines (timeline, step) must not have border-radius on the connector side — use directional radius (`rounded-r-*`).
- Bar charts: gap = 50%–100% of bar width, bar tops straight (no `rounded-t-*`). Desktop: fixed `w-10` + `gap-5`. Mobile: `flex-1 w-full` adaptive (no scrollbar). Use `flex-1 md:flex-initial` on column + `w-full md:w-10` on bar.
- Admin pages use container hierarchy: accent cards (stat/metrics, left 3px stripe), raised panels (charts, `shadow-sm` + no border), standard blocks (tables/forms/lists, border). Zone wrappers use responsive `p-4 md:p-5 mb-4 md:mb-6`. Stat cards stand alone (no zone wrapper).
- Collapsed sidebar: `overflow-x: hidden` to prevent horizontal scrollbar.

## Output Pattern

For a new page, output in this order:
1. Page type and UX goal
2. UI DSL
2a. (if i18n enabled) Locale keys used for all user-facing text
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
- Read `references/i18n-rules.md` when project i18n is enabled, for vue-i18n setup, locale file conventions, formatting rules (`$t`, `$n`, `$d`), `LocaleSwitcher` component, and RTL direction support.
- Read `references/review-checklist.md` for post-implementation quality checks.
