# Decouple Admin Page Type from /admin/* Route Prefix

**Date:** 2026-06-08
**Scope:** `vue3-element-ui-ux` skill — terminology and example update
**Status:** approved

## Goal

The `vue3-element-ui-ux` skill currently ties the **admin page type** to the literal `/admin/*` URL prefix. This is too restrictive — different projects use different route prefixes for backend management pages (e.g., `/manage/*`, `/dashboard/*`, `/backend/*`). The skill should describe admin pages by their **purpose and UX characteristics**, not by a specific URL path.

## Approach

Replace every occurrence of the literal `/admin/*` (and "under `/admin`") with the placeholder `{admin-prefix}` — a variable representing whatever route prefix the project uses for its management/backend pages.

**Why `{admin-prefix}`:**
- Curly-brace syntax is visually distinct — clearly a variable, not a literal path
- Consistent with existing DSL conventions (e.g., `:id` for route params)
- Single placeholder used everywhere avoids mixed conventions

## Changes by File

### 1. `SKILL.md`
- **Line 43:** No literal `/admin` — no change needed.

### 2. `references/design-principles.md`
- **Line 58:** `"All admin pages (`/admin/*`) must use..."` →
  `"All admin pages must use the shared `AdminLayout` shell regardless of their route prefix (`{admin-prefix}`)."`
- **Lines 92-93:** `"Add the route as a child under `/admin` with `AdminLayout`"` →
  `"Add the route as a child under `{admin-prefix}` with `AdminLayout` as the parent component."`

### 3. `references/component-system.md`
- **Line 23:** `"mandatory layout wrapper for all `/admin/*` pages"` →
  `"mandatory layout wrapper for all admin pages (under `{admin-prefix}`)"`

### 4. `references/generation-rules.md`
- **Line 19:** `"All admin pages (`/admin/*`) must use the shared `AdminLayout` shell. Never create an admin page with its own sidebar, header, or layout wrapper. Add the route as a child under `/admin` and add the menu item to `AdminSidebar.vue`."` →
  `"All admin pages must use the shared `AdminLayout` shell. Never create an admin page with its own sidebar, header, or layout wrapper. Add the route as a child under `{admin-prefix}` and add the menu item to `AdminSidebar.vue`."`
- **Line 52:** No literal `/admin` — no change needed.

### 5. `references/ui-dsl.md`
- **5 DSL examples** (lines 33, 66, 102, 131, 161): Replace `"/admin/users"`, `"/admin/users/new"`, `"/admin"`, `"/admin/orders/:id"`, `"/admin/settings"` with `"{admin-prefix}/users"`, `"{admin-prefix}/users/new"`, `"{admin-prefix}"`, `"{admin-prefix}/orders/:id"`, `"{admin-prefix}/settings"`.

## What Stays the Same

- The term **"admin"** as the page type designation (admin list, admin form, admin dashboard, admin detail, admin settings)
- Component names: `AdminLayout`, `AdminShell`, `AdminHeader`, `AdminSidebar`
- All design tokens, interaction rules, review checklists
- The Admin Shell Layout diagram and sidebar rules
- All non-negotiable rules in `SKILL.md`

## Files NOT Changed

- `references/design-tokens.md` — no `/admin` references
- `references/interaction-rules.md` — only a Frontend/Admin comparison table header, no path references
- `references/review-checklist.md` — no `/admin` references
