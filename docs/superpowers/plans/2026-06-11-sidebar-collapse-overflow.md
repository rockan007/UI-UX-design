# Sidebar Collapse Overflow Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix horizontal scrollbar in collapsed admin sidebar by adding `overflow-x: hidden`, and sync the rule to skill reference files.

**Architecture:** One CSS property addition in AdminSidebar.vue, one check item in review-checklist.md Section 7, one rule bullet in interaction-rules.md Sidebar section.

**Tech Stack:** CSS (scoped), Tailwind (existing utility classes)

---

### Task 1: Fix AdminSidebar overflow

**Files:**
- Modify: `login-homepage-preview/src/components/AdminSidebar.vue`

- [ ] **Step 1: Add `overflow-x: hidden` to `.admin-sidebar`**

Read `login-homepage-preview/src/components/AdminSidebar.vue`. Find the `.admin-sidebar` style block:

```css
.admin-sidebar {
  background: #fff;
  border-right: 1px solid #e5e5e5;
  transition: width 0.2s ease;
  flex-shrink: 0;
}
```

Replace with:

```css
.admin-sidebar {
  background: #fff;
  border-right: 1px solid #e5e5e5;
  transition: width 0.2s ease;
  flex-shrink: 0;
  overflow-x: hidden;
}
```

Use the Edit tool for precise replacement.

- [ ] **Step 2: Build to verify**

Run: `cd login-homepage-preview && npm run build`
Expected: Build passes.

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/components/AdminSidebar.vue
git commit -m "fix: add overflow-x:hidden to admin sidebar to prevent collapse scrollbar"
```

---

### Task 2: Add check item to review-checklist.md Section 7

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`

- [ ] **Step 1: Append check item in Section 7 (Responsive)**

Read `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`. In Section 7 "Responsive", after the last `- [ ]` item before the "## 8. Accessibility" heading, add:

```markdown
- [ ] Collapsed sidebar has `overflow-x: hidden` to prevent horizontal scrollbar from overflow content.
```

Use the Edit tool — find `## 8. Accessibility` and insert the new check item before it.

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "feat(skill): add sidebar collapse overflow check to review-checklist"
```

---

### Task 3: Add overflow rule to interaction-rules.md Sidebar section

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md`

- [ ] **Step 1: Add collapsed overflow rule to Sidebar section**

Read `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md`. In the Navigation > Sidebar section, after the existing "Collapse/expand: 200ms transition." line, add:

```markdown
- Collapsed state: `overflow-x: hidden` to clip overflow content and prevent horizontal scrollbar.
```

Use the Edit tool — find `Collapse/expand: 200ms transition.` and append the new rule after it.

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/interaction-rules.md
git commit -m "feat(skill): add sidebar collapsed overflow rule to interaction-rules"
```
