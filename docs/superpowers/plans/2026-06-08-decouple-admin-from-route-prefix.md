# Decouple Admin Page Type from /admin/* Route Prefix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all hardcoded `/admin/*` route references in the `vue3-element-ui-ux` skill with the `{admin-prefix}` placeholder.

**Architecture:** Terminology-only change. Four reference files under `.claude/skills/vue3-element-ui-ux/references/` get targeted string replacements. No new files, no logic changes, no component renames.

**Tech Stack:** Markdown files — no code involved.

---

### Task 1: Update design-principles.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/design-principles.md` (lines 58 and 92-93)

- [ ] **Step 1: Replace line 58 — admin shell layout rule**

Old:
```
All admin pages (`/admin/*`) must use the shared `AdminLayout` shell. Never build standalone admin pages with their own sidebar or header.
```

New:
```
All admin pages must use the shared `AdminLayout` shell regardless of their route prefix (`{admin-prefix}`). Never build standalone admin pages with their own sidebar or header.
```

- [ ] **Step 2: Replace lines 92-93 — new admin page instructions**

Old:
```
1. Add the route as a child under `/admin` with `AdminLayout` as the parent component.
```

New:
```
1. Add the route as a child under `{admin-prefix}` with `AdminLayout` as the parent component.
```

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/design-principles.md
git commit -m "docs(skill): decouple admin shell rules from /admin/* route prefix"
```

---

### Task 2: Update component-system.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/component-system.md` (line 23)

- [ ] **Step 1: Replace AdminShell description**

Old:
```
`AdminShell` is the mandatory layout wrapper for all `/admin/*` pages. See `design-principles.md` Admin Shell Layout section for full structure. The sidebar (`AdminSidebar`) supports multi-level menus via `el-sub-menu`.
```

New:
```
`AdminShell` is the mandatory layout wrapper for all admin pages (under `{admin-prefix}`). See `design-principles.md` Admin Shell Layout section for full structure. The sidebar (`AdminSidebar`) supports multi-level menus via `el-sub-menu`.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/component-system.md
git commit -m "docs(skill): decouple AdminShell description from /admin/* route prefix"
```

---

### Task 3: Update generation-rules.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md` (line 19)

- [ ] **Step 1: Replace rule 11 — admin layout requirement**

Old:
```
11. **All admin pages (`/admin/*`) must use the shared `AdminLayout` shell.** Never create an admin page with its own sidebar, header, or layout wrapper. Add the route as a child under `/admin` and add the menu item to `AdminSidebar.vue`.
```

New:
```
11. **All admin pages must use the shared `AdminLayout` shell.** Never create an admin page with its own sidebar, header, or layout wrapper. Add the route as a child under `{admin-prefix}` and add the menu item to `AdminSidebar.vue`.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "docs(skill): decouple generation rules from /admin/* route prefix"
```

---

### Task 4: Update ui-dsl.md — all 5 DSL examples

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/ui-dsl.md` (lines 33, 66, 102, 131, 161)

- [ ] **Step 1: Replace Admin List example route (line 33)**

Old:
```
  "route": "/admin/users",
```
New:
```
  "route": "{admin-prefix}/users",
```

- [ ] **Step 2: Replace Admin Form example route (line 66)**

Old:
```
  "route": "/admin/users/new",
```
New:
```
  "route": "{admin-prefix}/users/new",
```

- [ ] **Step 3: Replace Admin Dashboard example route (line 102)**

Old:
```
  "route": "/admin",
```
New:
```
  "route": "{admin-prefix}",
```

- [ ] **Step 4: Replace Admin Detail example route (line 131)**

Old:
```
  "route": "/admin/orders/:id",
```
New:
```
  "route": "{admin-prefix}/orders/:id",
```

- [ ] **Step 5: Replace Admin Settings example route (line 161)**

Old:
```
  "route": "/admin/settings",
```
New:
```
  "route": "{admin-prefix}/settings",
```

- [ ] **Step 6: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/ui-dsl.md
git commit -m "docs(skill): decouple DSL examples from /admin/* route prefix"
```

---

### Task 5: Final grep verification

**Files:** None (verification only)

- [ ] **Step 1: Verify no remaining `/admin` literal route references**

```bash
grep -rn '/admin' .claude/skills/vue3-element-ui-ux/
```

Expected: No output (or only non-path matches like "admin pages", "frontend/admin" type labels).

- [ ] **Step 2: Verify `{admin-prefix}` appears in all expected files**

```bash
grep -rn '{admin-prefix}' .claude/skills/vue3-element-ui-ux/
```

Expected: Matches in `design-principles.md` (2), `component-system.md` (1), `generation-rules.md` (1), `ui-dsl.md` (5).

- [ ] **Step 3: Commit if any final cleanup needed, or mark complete**

```bash
git status
```
