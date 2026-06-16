---
name: ui-ux-agent-designer
description: Use when the user asks to create or improve frontend/admin pages with a design-system-first approach, define UI DSL before code, map UI patterns to components, audit UI/UX quality, or organize pages around UX goals instead of free-form code generation.
---

# UI/UX Agent Designer

Use this skill to produce UI with stable UX quality instead of free-form page code. Start from UI/UX goals, express the page as UI DSL, map the DSL to existing components, generate code only after the structure is clear, then inspect responsive and interaction states.

## Core Workflow

Follow this sequence for UI/UX-first work:

```text
UI/UX goals
→ user task flow
→ interaction model
→ design system
→ tech stack fit
→ component system
→ UI DSL
→ component mapping
→ Agent generation rules
→ page generation
→ interaction review
→ UI review and responsive fixes
```

Do not start by writing page code unless the user explicitly asks to skip the design pass.

## First Move

When the user asks to create or improve a page:

0. Check whether the project has i18n enabled (inspect `package.json` or project config for an i18n flag). If enabled, load i18n rules before proceeding.
1. Inspect the project frontend stack, routes, component library, and styling system.
2. Identify whether the page is frontend, admin, or mixed.
3. Read the relevant references:
   - UI/UX goals and design standards: `references/design-standards.md`
   - UX interaction flow and feedback model: `references/interaction-design.md`
   - UI DSL schema and examples: `references/ui-dsl.md`
   - Component mapping rules: `references/component-mapping.md`
   - Generation and review workflow: `references/generation-workflow.md`
4. Define the user task flow and interaction model before implementation.
5. Produce UI DSL before code.
6. Ask for confirmation only when the UI direction is ambiguous or risky; otherwise proceed conservatively.

## Non-Negotiable Rules

- Do not change business logic, API contracts, database structure, or permissions unless explicitly requested.
- Prefer existing components, tokens, and styling conventions.
- Do not introduce a new UI library for one page.
- Do not add random one-off colors, shadows, gradients, or rounded styles.
- Every important page must consider `loading`, `empty`, `error`, `disabled`, `hover`, `focus`, validation, permission, and mobile states.
- Every important task must define trigger, feedback, success, failure, and recovery behavior.
- For admin pages, optimize for scanability, density, tables, filters, forms, and repeated use.
- For frontend pages, optimize for clarity, task completion, readable hierarchy, and mobile usability.
- For multi-language projects, design text with expansion tolerance (Chinese→English can be 30–50% longer), support RTL direction via logical CSS properties, and use locale-aware formatting for dates, numbers, and currencies.
- After implementation, run available checks and inspect desktop/mobile rendering when the project supports it.
- Configure the UI framework's locale to match the project's primary language. If the project has an i18n system, locale must switch dynamically with the user's language choice rather than being hardcoded. Built-in component text (pagination labels, empty states, placeholders) must display in the same language as the page content.

## Output Pattern

For a new page, output and execute in this order:

1. Page type and UX goal
2. User task flow and interaction model
3. UI DSL
4. Component mapping summary
5. Code implementation
6. Interaction and UI/UX review results
7. Verification performed

For a UX audit, lead with concrete findings ordered by severity, then fix the issues if the user asked for implementation.

## Reference Loading Guide

- Read `references/design-standards.md` when defining product feel, admin/frontend differences, visual rules, forms, tables, states, or responsive standards.
- Read `references/interaction-design.md` when defining user flows, action triggers, feedback, validation, destructive actions, error recovery, or mobile interaction behavior.
- Read `references/ui-dsl.md` when creating structured UI plans before implementation.
- Read `references/component-mapping.md` when translating UI DSL into project components.
- Read `references/generation-workflow.md` when executing a page from request to screenshots and final review.
