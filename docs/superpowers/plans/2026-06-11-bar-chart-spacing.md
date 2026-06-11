# Bar Chart Spacing & Visual Constraints — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix DashboardView bar chart spacing (gap ≈ 50% of bar width), remove rounded bar tops, and add chart spacing/shape constraints to skill reference files.

**Architecture:** Replace `flex-1` + `gap-3` with fixed `w-10` + `gap-5` on bar chart, strip `rounded-t-sm`, add spacing rules to component-system.md chart rules, add Spacing & Shape subsection to interaction-rules.md, add check item to review-checklist.md.

**Tech Stack:** Tailwind CSS width/gap utilities

---

### Task 1: Fix DashboardView bar chart layout

**Files:**
- Modify: `login-homepage-preview/src/views/DashboardView.vue`

- [ ] **Step 1: Replace bar chart container and bar classes**

Read `login-homepage-preview/src/views/DashboardView.vue`. Find the bar chart section (lines 73-89). Three edits:

**Edit 1 — container**: change `flex items-end gap-3` to `flex items-end justify-center gap-5`

```diff
- <div class="flex items-end gap-3 h-[200px] px-2">
+ <div class="flex items-end justify-center gap-5 h-[200px] px-2">
```

**Edit 2 — bar wrapper**: remove `flex-1` from each bar's wrapper div

```diff
- class="flex-1 flex flex-col items-center gap-1"
+ class="flex flex-col items-center gap-1"
```

**Edit 3 — bar itself**: remove `rounded-t-sm` and change `w-full` to `w-10`

```diff
- class="w-full rounded-t-sm transition-all duration-150 cursor-pointer hover:brightness-90"
+ class="w-10 transition-all duration-150 cursor-pointer hover:brightness-90"
```

Use the Edit tool for each replacement. Read the file first to find exact text.

- [ ] **Step 2: Build to verify**

Run: `cd login-homepage-preview && npm run build`
Expected: Build passes. Bar chart now has 40px wide bars, 20px gaps, centered, straight tops.

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/views/DashboardView.vue
git commit -m "fix: bar chart — fixed bar width w-10, gap-5, remove rounded-t-sm"
```

---

### Task 2: Add chart spacing rules to component-system.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/component-system.md`

- [ ] **Step 1: Append chart spacing rules**

Read `.claude/skills/vue3-element-ui-ux/references/component-system.md`. Find the chart rules block (after "Support empty data state."). Append three new rules:

```diff
 - Support empty data state.
+- **Bar spacing:** Gap between bars must be 50%–100% of bar width. Sweet spot: gap ≈ 50% of bar width (bar width = 2× gap).
+- **Bar tops must be straight.** No rounded corners on bar/column tops — they obscure exact endpoint values.
+- **Bar width is fixed,** not stretched. Use `w-*` (e.g., `w-10`) rather than `flex-1` to maintain gap:width ratio.
```

Use the Edit tool — find `Support empty data state.` and append the new rules after it.

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/component-system.md
git commit -m "feat(skill): add bar chart spacing and straight-top rules to component-system"
```

---

### Task 3: Add Spacing & Shape subsection to interaction-rules.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md`

- [ ] **Step 1: Insert Spacing & Shape subsection**

Read `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md`. Find the Bar / Column Charts section. After the "Clickable data points" rule and before "### Line Charts", insert:

```markdown
### Spacing & Shape

- **Gap-to-bar ratio:** Gap between bars should be 50%–100% of bar width. Default to ~50% (bar = 2× gap).
- **Bar width is fixed** — do not use `flex-1` to stretch bars across the container.
- **Straight bar tops only.** Never use `rounded-t-*` on bar chart columns. The top edge must be a precise visual endpoint.
- Bars that are too wide relative to gaps (>4:1 ratio) appear visually unbalanced and lose the rhythm of discrete data points.

```

Use the Edit tool — find `### Line Charts` and insert the new subsection before it.

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/interaction-rules.md
git commit -m "feat(skill): add bar chart spacing and shape rules to interaction-rules"
```

---

### Task 4: Add bar chart check item to review-checklist.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`

- [ ] **Step 1: Append check item**

Read `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`. Find a suitable location — after Section 6 "State Feedback" chart-related items, or at the end of Section 3 "Visual Consistency". Append:

```markdown
- [ ] **Bar chart spacing:** Gap between bars is 50%–100% of bar width. Bar tops are straight (no `rounded-t-*`). Bar width is fixed (not `flex-1`).
```

Use the Edit tool — find the end of Section 3 (last `- [ ]` item before `## 4. Form Experience`) and append the new item.

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "feat(skill): add bar chart spacing check item to review-checklist"
```

---

### Task 5: Build and verify

**Files:** None (verification only)

- [ ] **Step 1: Build**

Run: `cd login-homepage-preview && npm run build`
Expected: Build passes with no errors.

- [ ] **Step 2: Visual check**

Run dev server, navigate to Dashboard. Verify:
- Bar chart has 7 bars centered in container
- Bars ~40px wide, gaps ~20px (gap ≈ 50% of bar width)
- Bar tops are straight (no rounded corners)
- Value labels still visible above each bar
- Day labels still visible below each bar
