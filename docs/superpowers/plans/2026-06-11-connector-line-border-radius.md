# Connector Line vs Border Radius — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix DashboardView timeline left-border deformation from uniform `rounded-btn`, and add "connector line vs border-radius" rules to both skills.

**Architecture:** One-line CSS fix in DashboardView (`rounded-btn` → `rounded-r-btn`), a new rule with mapping table in interaction-rules.md, a check item in review-checklist.md, and a meta-level design principle in design-standards.md.

**Tech Stack:** Tailwind CSS directional border-radius utilities

---

### Task 1: Fix DashboardView timeline border-radius

**Files:**
- Modify: `login-homepage-preview/src/views/DashboardView.vue`

- [ ] **Step 1: Replace `rounded-btn` with `rounded-r-btn` on timeline item**

Read `login-homepage-preview/src/views/DashboardView.vue`. Find line 123, the timeline item `<div>` that has `rounded-btn` in its class list. The timeline item uses `border-l-2` as the left-side vertical connector line — the uniform `rounded-btn` (6px all corners) curves the left border.

Change:

```diff
- class="flex gap-3 pb-5 relative hover:bg-neutral-50 -mx-2 px-2 rounded-btn transition-colors duration-150"
+ class="flex gap-3 pb-5 relative hover:bg-neutral-50 -mx-2 px-2 rounded-r-btn transition-colors duration-150"
```

Use the Edit tool for precise replacement.

- [ ] **Step 2: Verify fix visually**

Run: `cd login-homepage-preview && npm run build`
Expected: Build passes. The timeline left border is now a straight vertical line — the `border-l-2` no longer curves at corners because the left-side border-radius is `0` (default) while the right side retains 6px radius.

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/views/DashboardView.vue
git commit -m "fix: use rounded-r-btn on timeline items to prevent left border deformation"
```

---

### Task 2: Add Connector vs Border Radius rule to interaction-rules.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md`

- [ ] **Step 1: Append new section after General section**

Read `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md`. The file has a "General" section (lines 5-14) followed by "Cards" (line 16). Insert the new section between "General" and "Cards":

```markdown
### Connector Lines vs. Border Radius

**Rule:** When a container has a visible connector line on one side (timeline vertical line,
step connector, branch line), that side's border-radius must be `0`. Rounding the corner
breaks visual continuity of the connector line.

| Connector side | CSS |
|---|---|
| Left border | `border-l-*` + `rounded-l-none` |
| Right border | `border-r-*` + `rounded-r-none` |
| Top border | `border-t-*` + `rounded-t-none` |
| Bottom border | `border-b-*` + `rounded-b-none` |

Do not apply a uniform `rounded-*` to containers that use `border-l-*` / `border-r-*` as connector lines.
Use directional radius instead: `rounded-r-btn` for a left-side connector, `rounded-l-btn` for a right-side connector.

> Applies to: both
```

Use the Edit tool — find the exact text `## Cards\n` and insert the new section before it.

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/interaction-rules.md
git commit -m "feat(skill): add connector line vs border-radius rule to interaction-rules"
```

---

### Task 3: Add check item to review-checklist.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`

- [ ] **Step 1: Add check item to Section 3 (Visual Consistency)**

Read `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`. In Section 3 "Visual Consistency" (lines 42-48), append after the last `- [ ]` item:

```markdown
- [ ] **Connector lines vs. border-radius:** Containers with a border connector line on one side have that side's border-radius set to `0`. Use directional radius (`rounded-r-*`, `rounded-l-none`) instead of uniform `rounded-*`.
```

Use the Edit tool — find the exact line `- [ ] Section spacing is stable.` and append the new check item after it.

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "feat(skill): add connector line check item to review-checklist"
```

---

### Task 4: Add meta-level design principle to design-standards.md

**Files:**
- Modify: `.claude/skills/ui-ux-agent-designer/references/design-standards.md`

- [ ] **Step 1: Append new section in Component Interaction Rules > General**

Read `.claude/skills/ui-ux-agent-designer/references/design-standards.md`. In the "Component Interaction Rules" section, under the "General" subsection, after the "Transitions" line and before the "Cards" subsection, append:

```markdown
### Connector Lines and Border Radius

When a UI element has a visible connector line on one edge (timeline vertical line,
step progress connector, tree branch line), that edge's corner must remain sharp.

- A container using a left/right border as a connector must set that side's radius to `0`.
- Do not apply uniform border-radius to elements that serve as connector-line hosts.
- The connector line is a continuous visual path — rounding its edge breaks the user's
  perception of sequence or hierarchy.
```

Use the Edit tool — find the exact text `### Cards` and insert the new subsection before it.

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/ui-ux-agent-designer/references/design-standards.md
git commit -m "feat(skill): add connector line design principle to meta-skill"
```

---

### Task 5: Build and verify

**Files:** None (verification only)

- [ ] **Step 1: Build the project**

Run: `cd login-homepage-preview && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Visual check**

Run dev server and navigate to Dashboard. Verify the timeline vertical connector line is visually straight — no curve at item boundaries. The `rounded-r-btn` keeps the right side rounded for hover highlight, while the left side stays sharp for the connector line.
