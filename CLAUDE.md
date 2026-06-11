# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository is a **skill engineering project** — it creates, iterates, and validates
Claude Code skills for UI/UX page generation. The core artifacts are two skills, and the
demo app exists solely to validate them.

**Feedback loop:**
`ui-ux-agent-designer` (meta-skill)
    → derives →
`vue3-element-ui-ux` (concrete skill)
    → validated by →
`login-homepage-preview` (demo app)
    → gaps found → update both skills → re-validate

- `ui-ux-agent-designer` defines the **design philosophy and process** — DSL-first workflow,
  component mapping, state coverage, review checklists. It is technology-agnostic.
- `vue3-element-ui-ux` is the **concrete implementation** of that philosophy for a specific
  stack (Vue 3 + Element Plus + Tailwind CSS). It contains exact design tokens, component
  mapping tables, generation rules, and interaction rules.
- `login-homepage-preview` is the **validation demo** — a Vue 3 app built by following
  `vue3-element-ui-ux` to verify the skill produces correct, consistent output. When the
  demo reveals gaps or inconsistencies, both skills are updated to close the loop.

## Build & Development Commands

All commands run from the `login-homepage-preview/` directory:

```bash
cd login-homepage-preview
npm run dev       # Start Vite dev server (default: http://localhost:5173)
npm run build     # Type-check (vue-tsc) then build for production
npm run preview   # Preview production build
```

No test suite exists. Verification is done by running the dev server and manually inspecting
at 1440px, 1024px, 768px, and 390px via Playwright browser tools.

## Architecture

### Core Artifacts: Claude Code Skills (`.claude/skills/`)

The two skills are the **primary deliverables** of this project. Everything else supports
their creation, iteration, and validation.

#### `ui-ux-agent-designer` — Meta-skill (design philosophy)

Defines the technology-agnostic UI/UX design workflow:
- Design-first process: UX goals → task flows → interaction model → UI DSL → code
- Reference files in `references/` cover design standards, interaction design,
  UI DSL schema, component mapping rules, and generation workflow.
- Invoke this skill when creating new design systems or defining UX methodology.

#### `vue3-element-ui-ux` — Concrete skill (implementation constraints)

Implements the meta-skill's philosophy for Vue 3 + Element Plus + Tailwind CSS:
- Reference files in `references/` contain exact design tokens, component hierarchy
  with Element Plus mapping tables, generation rules with prompt templates,
  interaction rules, and review checklist.
- This is the **most frequently used skill** — invoke it when generating, reviewing,
  or improving any page in the demo app or a project following this stack.

#### Relationship

`vue3-element-ui-ux` is a **specific derivation** of `ui-ux-agent-designer`.
When `ui-ux-agent-designer`'s principles change (e.g., a new rule about action columns),
`vue3-element-ui-ux` should also be updated to reflect the change concretely.
Conversely, when `vue3-element-ui-ux` discovers a gap during demo validation (e.g.,
missing interaction states), the meta-skill may need updating too.

### Validation Demo (`login-homepage-preview/`)

A Vue 3 + Element Plus + Tailwind CSS app built to **test whether `vue3-element-ui-ux`
produces correct, consistent pages**. It is not a production application.

```
login-homepage-preview/src/
├── main.ts                   # App bootstrap (ElementPlus, router, global styles)
├── App.vue                   # Root component (just <router-view />)
├── style.css                 # Global styles + Tailwind directives
├── router/index.ts           # All routes
├── layouts/
│   └── AdminLayout.vue       # Shared admin shell (header + sidebar + content slot)
├── components/
│   ├── AdminHeader.vue       # Top bar with breadcrumb, user menu
│   ├── AdminSidebar.vue      # Multi-level sidebar (el-menu with el-sub-menu)
│   └── HelloWorld.vue        # Frontend demo component
└── views/
    ├── HomeView.vue          # Frontend landing page (/)
    ├── LoginView.vue         # Login page (/login)
    ├── DashboardView.vue     # Admin dashboard (/admin)
    ├── UserListView.vue      # Admin user list (/admin/users/list)
    ├── RoleManageView.vue    # Admin role management (/admin/users/roles)
    ├── PermissionView.vue    # Admin permissions (/admin/users/permissions)
    ├── OrderManageView.vue   # Admin order management (/admin/orders)
    └── SettingsView.vue      # Admin settings (/admin/settings)
```

**Critical architectural rule**: All admin pages are children of `AdminLayout` via nested
routes (`/admin` → children). Never create an admin page with its own sidebar or header.

### Design Records (`docs/`)

- `docs/superpowers/specs/` — Design specs for skill features and iterations.
- `docs/superpowers/plans/` — Implementation plans corresponding to specs.

### Settings (`.claude/settings.local.json`)

Project-local permissions allow Bash (git, npm, npx), Playwright browser tools, and the
`run` skill. There is no shared `settings.json` — only the local file exists.

## Design System Rules (from `vue3-element-ui-ux`)

These are a summary of the non-negotiable rules defined by the skill. For full details,
consult `.claude/skills/vue3-element-ui-ux/references/`.

- **Tech stack**: Vue 3 + Element Plus + Tailwind CSS + `@element-plus/icons-vue`. Never introduce another UI framework.
- **Override Element Plus theme only via CSS custom properties**, not Tailwind classes.
- **Output UI DSL before code** for any new page.
- **Every page must cover**: loading, empty, error, disabled, hover, focus, validation, permission, mobile states.
- **Action columns with 2+ buttons**: icon-only with `el-tooltip`, left/right aligned per text direction, column width = `(28 + 8) × maxButtons + 16`.
- **Admin pages**: use `AdminLayout`, optimize for density and scanability.
- **Frontend pages**: optimize for clarity, task completion, mobile usability.
- **Do not** change business logic, API contracts, or database structure when optimizing UI/UX.

## Key Workflows

### Iterating on a skill (the primary workflow)

1. Identify a gap or issue — from demo inspection, a new requirement, or review feedback
2. Update the relevant skill reference files in `.claude/skills/vue3-element-ui-ux/references/`
   or `.claude/skills/ui-ux-agent-designer/references/`
3. Use the updated skill to regenerate or fix affected pages in the demo app
4. Run the dev server and inspect at 1440px, 1024px, 768px, 390px
5. If the fix works, check whether the meta-skill (`ui-ux-agent-designer`) also needs updating
6. Commit changes to both skill files and demo pages

### Adding a new page to the demo (to validate skill coverage)

1. Determine what aspect of the skill needs validation (new page type, edge case, interaction pattern)
2. Generate UI DSL → component mapping → code, following the skill
3. If admin: add route as child of `/admin`, add menu item to `AdminSidebar.vue`
4. Run dev server and inspect
5. If the skill didn't produce correct output, fix the skill first, then regenerate the page
6. Document findings in a spec if the change is significant

### Auditing an existing demo page

1. Run dev server, inspect at multiple breakpoints via Playwright `browser_snapshot`
2. Check all required states (loading, empty, error, disabled, hover, focus, validation, permission, mobile)
3. Output findings ordered by severity
4. Fix issues — if they're skill-level problems, update the skill; if they're one-off page bugs, fix the page

## File Cleanup

- **Playwright screenshots** (`.png` files in project root) are temporary byproducts of
  visual verification. Never commit them. After verifying UI changes, delete them:
  `rm -f *.png .playwright-mcp/` before committing, or add them to `.gitignore`.
- **`.playwright-mcp/`** directory is also temporary. Delete together with screenshots.

## Push Workflow

When pushing accumulated changes:

1. `git push origin main` — push main repo
2. If `ui-ux-agent-designer` skill files were modified, also push the subtree:
   `git subtree push --prefix=.claude/skills/ui-ux-agent-designer skill main`
3. `vue3-element-ui-ux` has no independent remote — it lives only in the main repo
4. Verify both remotes updated: `git log --oneline origin/main -3 &&
   git log --oneline skill/main -3`
