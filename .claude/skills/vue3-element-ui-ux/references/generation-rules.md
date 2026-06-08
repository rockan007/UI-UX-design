# Generation Rules

Rules, workflow, and prompt templates for page generation. Follow these exactly.

## Agent Rules

### Must Follow

1. Read `docs/ui-ux` specs before generating any page.
2. Output UI DSL before writing code.
3. After DSL is confirmed, map components before coding.
4. Prefer existing components and design system.
5. Do not randomly create new components.
6. Do not write one-off styles.
7. Do not change business logic, API contracts, or database structure.
8. Do not introduce new UI libraries.
9. Every page must cover all required states.
10. After implementation, run UI/UX review.
11. **All admin pages (`/admin/*`) must use the shared `AdminLayout` shell.** Never create an admin page with its own sidebar, header, or layout wrapper. Add the route as a child under `/admin` and add the menu item to `AdminSidebar.vue`.
12. AdminSidebar supports multi-level menus via `el-sub-menu`. When adding a parent category, nest child items under `el-sub-menu`. Keep nesting to 1-2 levels.

### Code Constraints

- Don't change business logic.
- Don't refactor system architecture.
- Don't modify API contracts or database structure.
- Don't create single-use components.
- Don't write random colors, radii, shadows.
- Mobile must not be just a compressed desktop layout.
- **Don't create standalone admin pages with their own layout.** All admin pages are children of AdminLayout.

### Required States

Every page: `loading`, `empty`, `error`, `success feedback`, `disabled`, `hover`, `focus`, `validation error`, `permission denied`, `mobile layout`.

## Page Generation Workflow

```
Requirements input
→ Identify page type
→ Generate UI DSL
→ Review DSL
→ Map components
→ Generate code
→ Start project and inspect
→ Fix UI issues
→ Output change summary
```

### 1. Requirements

User provides: page path, page type (frontend/admin), page goal, main content, main actions.

### 2. Page Type

Classify: frontend list, frontend detail, admin list, admin form, admin detail, dashboard, settings.

### 3. UI DSL

Output structured DSL first. Include: `page`, `type`, `route`, `goal`, `layout`, `header`, `sections`, `actions`, `states`, `responsive`.

### 4. DSL Review

Check: clear goal, reasonable primary action, clear hierarchy, component selection matches mapping, complete states, explicit mobile plan.

### 5. Component Mapping

Use `component-system.md` mapping table. If no match exists, explain: why existing components are insufficient, what category the new component belongs to, whether it's reusable, whether it affects other pages.

### 6. Code Generation

- Keep scope minimal.
- Prefer existing components.
- Follow `design-tokens.md` for styles.
- Don't modify unrelated files.

### 7. Project Check

If local dev is available, start dev server and inspect pages at: 1440px, 1024px, 768px, 390px.

### 8. Fix UI Issues

Must fix: text overflow, element overlap, unclear primary actions, spacing inconsistency, mobile unusability, missing states, unclear form errors.

### 9. Change Summary

Output: files changed, UX problems solved, checks performed, remaining risks.

## Prompt Templates

### Pre-generation

```
Read the UI/UX specs first.
Generate UI DSL for this page. Do not write code yet.

UI DSL must include: page, type, route, goal, layout, header, sections (or form/table), actions, states, responsive.

After generation, explain the design rationale.
```

### Pre-code

```
Based on the confirmed UI DSL and component mapping, generate page code.

Requirements:
- Prefer existing components.
- Don't change business logic or API contracts.
- Don't add unnecessary dependencies.
- Cover: loading, empty, error, disabled, hover, focus, mobile states.
- Run project check after completion.
```

### Pre-review

```
Review this page as a senior UI/UX designer. Focus on:
1. Task completion path
2. Information hierarchy
3. Visual consistency
4. Form or table experience
5. Responsive design
6. State feedback
7. Accessibility

Fix issues directly. Don't change business logic.
```

### Page Optimization

```
Optimize page UI/UX only: {path}

Page goal: {description}

Boundaries:
- Don't change business logic, API, or database.
- Don't refactor unrelated code.
- Prefer existing components and styles.

Review:
1. Information hierarchy
2. Action paths
3. Layout and spacing
4. Form experience
5. Data display
6. Interaction states (loading, empty, error, success, disabled, hover, focus, validation)
7. Responsive (1440px, 1024px, 390px)

After completion: list issues found, changes made, checks run.
```

## Page Type Supplements

### Admin List Page

Extra focus: compact filter area, scannable table, clear batch actions, not too many action columns, empty state with next step, mobile usability.

### Form Page

Extra focus: reasonable field grouping, clear required marks, errors near fields, explicit submit feedback, clear cancel/back/save actions, smooth mobile input.

### Detail Page

Extra focus: key info above the fold, visible status and primary action, clear detail groupings, secondary info (history, logs, notes) not competing with primary, easy return to list.
