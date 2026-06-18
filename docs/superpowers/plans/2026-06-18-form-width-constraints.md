# Form Width Constraints — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add layered max-width rules to the `vue3-element-ui-ux` skill so admin forms adapt gracefully across screen sizes — section cards cap at 1152px, all field rows use a unified responsive grid, and full-width content fills the card.

**Architecture:** Two changes to skill reference files (no code changes to the demo app). `generation-rules.md` gets a new "Form Width Constraints" subsection and updated templates. `review-checklist.md` gets matching check items. The meta-skill (`ui-ux-agent-designer`) gets an optional technology-agnostic line.

**Tech Stack:** Markdown (skill reference files). No code, no dependencies.

## Global Constraints

- Do not change business logic, API contracts, or database structure.
- Do not introduce new UI libraries or components.
- Section card accent stripe pattern (border-l-[3px]) stays unchanged.
- `label-position="top"` on `el-form` stays unchanged.
- Mobile `grid-cols-1` stacking stays unchanged.
- O2M sub-form inline `grid-template-columns` stays unchanged.
- Tabbed form structure stays unchanged.
- Form toolbar / breadcrumb / action button placement stays unchanged.
- No `mx-auto` centering — cards are left-aligned for admin efficiency.

---

### Task 1: Update generation-rules.md — Form Width Constraints subsection + template updates

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md`

**Interfaces:**
- Produces: New "Form Width Constraints" subsection that later tasks reference in review checklist and meta-skill principles.

- [ ] **Step 1: Replace the Section Cards key points + Field Grid section (lines 298-332) with the new layered constraint rules + updated Field Grid templates**

The OLD text (lines 298-332):
```
Key points:
- `el-form` uses `class="flex flex-col gap-4"` to space the cards
- Accent stripe color matches data category: blue for primary/required sections, cyan for secondary sections per `design-tokens.md`
- Section title color matches stripe color
- No `max-w-2xl` constraint — form uses available width

**Field Grid:**

Desktop fields use 3-column grid with short inputs in grid rows and full-width fields at section end:

```html
<!-- Grid row: 3 columns for standard fields -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <el-form-item label="Field 1" prop="field1"><el-input ... /></el-form-item>
  <el-form-item label="Field 2" prop="field2"><el-input ... /></el-form-item>
  <el-form-item label="Field 3" prop="field3"><el-input ... /></el-form-item>
</div>

<!-- Grid row: single field taking 1 of 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
  <el-form-item label="Single Field"><el-select ... class="w-full" /></el-form-item>
</div>

<!-- Full-width at section end: textarea -->
<el-form-item label="Address" class="mt-4">
  <el-input type="textarea" :rows="2" ... />
</el-form-item>
```

Key points:
- Standard fields: `grid grid-cols-1 md:grid-cols-3 gap-4`
- Each grid row is a separate `<div>` — rows are stacked with `mt-4` spacing
- Full-width fields (textarea, dynamic item list): placed at the END of the section, after all grid rows, each wrapped in a standalone `<el-form-item>`
- `label-position="top"` on `el-form` for all fields
- Mobile: `grid-cols-1` naturally stacks everything
```

The NEW text:
```
Key points:
- `el-form` uses `class="flex flex-col gap-4"` to space the cards
- Accent stripe color matches data category: blue for primary/required sections, cyan for secondary sections per `design-tokens.md`
- Section title color matches stripe color
- Section cards use `max-w-6xl` — prevents infinite stretching on large screens. Cards are left-aligned, no `mx-auto`.

**Form Width Constraints:**

Admin forms use a two-tier width system to keep inputs at comfortable reading width (280–370px) while giving complex content room to breathe.

| Tier | Rule | Rationale |
|---|---|---|
| **Section Card** | `max-w-6xl` (1152px), left-aligned | Defines the form's comfortable reading zone. On screens ≥ 1280px, cards lock at 1152px; right side shows page background. |
| **Field Grid Rows** | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | Same grid for ALL field rows — 1 field occupies 1 column; 2 fields = 2 columns; 3 fields fills the row. Each field stays at 280–370px. |
| **Full-Width Content** | No constraint, fills card width | textarea, O2M sub-forms, permission trees — placed at section end, after all grid rows. |

Behavior by breakpoint:

| Viewport | Columns | Column Width | Card Behavior |
|---|---|---|---|
| < 768px | 1 | 100% | Full width, `max-w-6xl` has no effect |
| 768–1023px | 2 | ~340–480px | Card grows with content |
| 1024–1279px | 3 | ~300–380px | Card grows with content |
| ≥ 1280px | 3 | ~370px | Card locks at 1152px |

**Field Grid:**

Desktop fields use responsive grid with short inputs in grid rows and full-width fields at section end:

```html
<!-- Grid row: same grid for 1/2/3 fields — unified -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <el-form-item label="Field 1" prop="field1"><el-input ... /></el-form-item>
  <el-form-item label="Field 2" prop="field2"><el-input ... /></el-form-item>
  <el-form-item label="Field 3" prop="field3"><el-input ... /></el-form-item>
</div>

<!-- Grid row: single field — same grid class, just 1 child -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
  <el-form-item label="Single Field"><el-select ... class="w-full" /></el-form-item>
</div>

<!-- Full-width at section end: textarea — no constraint -->
<el-form-item label="Address" class="mt-4">
  <el-input type="textarea" :rows="2" ... />
</el-form-item>
```

Key points:
- All field rows: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` — same class regardless of field count
- A row with 1 field occupies 1 column. 2 fields = 2 columns. 3 fields fills the row.
- Each grid row is a separate `<div>` — rows are stacked with `mt-4` spacing
- Full-width fields (textarea, dynamic item list): placed at the END of the section, after all grid rows, each wrapped in a standalone `<el-form-item>`
- `label-position="top"` on `el-form` for all fields
- Mobile: `grid-cols-1` naturally stacks everything
```

- [ ] **Step 2: Update section card templates to include `max-w-6xl`**

There are three section card templates in the file. Find each one and add `max-w-6xl`.

**Edit 1 — Line ~286 (blue section card in Section Cards template):**

Find:
```html
  <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">
```

Replace with:
```html
  <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6 max-w-6xl">
```

**Edit 2 — Line ~291 (cyan section card in Section Cards template):**

Find:
```html
  <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-cyan-600 p-5 md:p-6">
```

Replace with:
```html
  <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-cyan-600 p-5 md:p-6 max-w-6xl">
```

**Edit 3 — Line ~713 (purple section card in Tabbed Form O2M/M2M tab content):**

Find:
```html
<div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5 md:p-6">
```

Replace with:
```html
<div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5 md:p-6 max-w-6xl">
```

- [ ] **Step 3: Verify all changes in generation-rules.md**

Run: `grep -n "max-w-6xl" .claude/skills/vue3-element-ui-ux/references/generation-rules.md`
Expected: 3 matches (one per section card template)

Run: `grep -n "md:grid-cols-2 lg:grid-cols-3" .claude/skills/vue3-element-ui-ux/references/generation-rules.md`
Expected: at least 2 matches (grid row examples in Field Grid section)

Run: `grep -n "Form Width Constraints" .claude/skills/vue3-element-ui-ux/references/generation-rules.md`
Expected: 1 match (the new subsection heading)

Run: `grep -n "No max-w-2xl" .claude/skills/vue3-element-ui-ux/references/generation-rules.md`
Expected: 0 matches (old rule removed)

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "feat(skill): add form width constraints — layered max-w-6xl + unified responsive grid"
```

---

### Task 2: Update review-checklist.md — Form width check items

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`

**Interfaces:**
- Consumes: The new "Form Width Constraints" rules from Task 1
- Produces: Updated review checklist that verifiers use to check form width compliance

- [ ] **Step 1: Replace the old form width check item (line 76)**

Find:
```
- [ ] **Form width:** No `max-w-2xl` constraint. Form uses available content width.
```

Replace with:
```
- [ ] **Form width:** Section cards have `max-w-6xl` (1152px), left-aligned. Field grid rows use unified `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Full-width content (textarea, O2M, trees) fills card width at section end.
```

- [ ] **Step 2: Add new "Form Width (Desktop)" section after Responsive (section 7)**

After line 133 (after the `Collapsed sidebar has overflow-x: hidden` line and before `## 8. Accessibility`), insert:

```markdown

## 7b. Form Width (Desktop)

- [ ] Each section card has `max-w-6xl` — doesn't stretch infinitely on large screens (≥ 1280px).
- [ ] All field rows use unified grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — same grid class for 1, 2, or 3 fields.
- [ ] Full-width content (textarea, O2M sub-forms, permission trees) at section end, fills card width with no max-w constraint.
- [ ] Mobile (< 768px) fields stack in single column, unaffected by max-w or multi-column grids.
- [ ] Tabbed form section cards (inside tab panes) follow the same `max-w-6xl` + unified grid rules.
- [ ] Form cards are left-aligned, not centered — no `mx-auto`.
```

- [ ] **Step 3: Verify**

Run: `grep -n "Form Width (Desktop)" .claude/skills/vue3-element-ui-ux/references/review-checklist.md`
Expected: 1 match

Run: `grep -n "max-w-6xl" .claude/skills/vue3-element-ui-ux/references/review-checklist.md`
Expected: 2 matches (one in section 4, one in new section 7b)

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "feat(skill): add form width checks to review checklist"
```

---

### Task 3 (Optional): Update ui-ux-agent-designer meta-skill

**Files:**
- Modify: `.claude/skills/ui-ux-agent-designer/references/design-standards.md`

**Interfaces:**
- Consumes: The layered width concept from Task 1
- Produces: Technology-agnostic principle about form width adaptation

- [ ] **Step 1: Check if design-standards.md has a relevant section for form layout**

Run: `grep -n -i "form\|width\|layout\|max-width" .claude/skills/ui-ux-agent-designer/references/design-standards.md`

- [ ] **Step 2: If a forms section exists, add a one-line principle**

Add after the last form-related line:
```
- Form fields should stay at a comfortable reading width (280–400px). Use responsive grids that adapt column count to viewport width, and cap section containers with a maximum width to prevent infinite stretching on large screens.
```

- [ ] **Step 3: If no forms section exists, skip this task**

The meta-skill update is optional per the spec. Only proceed if there's a natural place to insert the principle.

- [ ] **Step 4: Commit (only if changes were made)**

```bash
git add .claude/skills/ui-ux-agent-designer/references/design-standards.md
git commit -m "feat(meta-skill): add form width adaptation principle"
```

---

### Task 4: Push all changes

- [ ] **Step 1: Push main repo**

```bash
git push origin main
```

- [ ] **Step 2: Push meta-skill subtree (only if Task 3 was done)**

```bash
git subtree push --prefix=.claude/skills/ui-ux-agent-designer skill main
```

- [ ] **Step 3: Verify**

```bash
git log --oneline origin/main -3
```
