# Dashboard Cleanup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove tinted zone backgrounds from dashboard and add stepped bar chart widths that increase at larger breakpoints.

**Architecture:** Two files change — DashboardView.vue (remove `bg-surface-*` classes, add `lg:w-12 2xl:w-14` to bars) and generation-rules.md (update bar chart width rule). No structural changes.

**Tech Stack:** Vue 3 + Tailwind CSS

---

### Task 1: Update DashboardView.vue

**Files:**
- Modify: `login-homepage-preview/src/views/DashboardView.vue:69,119,78,82,85`

- [ ] **Step 1: Remove chart zone tinted background (line 69)**

Find:
```html
    <div class="bg-surface-neutral rounded-btn p-4 md:p-5 mb-4 md:mb-6">
```

Replace with:
```html
    <div class="mb-4 md:mb-6">
```

- [ ] **Step 2: Remove activity zone tinted background (line 119)**

Find:
```html
    <div class="bg-surface-warm rounded-btn p-4 md:p-5">
```

Replace with:
```html
    <div>
```

- [ ] **Step 3: Add stepped bar widths**

Find the bar div `md:w-10` on line 82:
```html
                class="w-full md:w-10 transition-all duration-150 cursor-pointer hover:brightness-90"
```

Replace with:
```html
                class="w-full md:w-10 lg:w-12 2xl:w-14 transition-all duration-150 cursor-pointer hover:brightness-90"
```

- [ ] **Step 4: Build and verify**

```bash
cd login-homepage-preview && npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add login-homepage-preview/src/views/DashboardView.vue
git commit -m "feat(demo): remove zone tinted backgrounds, add stepped bar chart widths"
```

---

### Task 2: Update generation-rules.md bar chart rules

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md:796-816`

- [ ] **Step 1: Update bar chart width rule**

Find the bar chart responsive width section. Change:

Line 798:
```
On desktop, bars use fixed width (`md:w-10`) for consistent rhythm.
```
To:
```
On desktop, bars use stepped fixed widths (`md:w-10 lg:w-12 2xl:w-14`) — wider at larger breakpoints while maintaining reasonable gap ratio. On mobile, bars adapt to fill available space (`flex-1 w-full`).
```

Line 805 (the bar div class):
```
    <div class="w-full md:w-10 transition-all duration-150 cursor-pointer hover:brightness-90"
```
To:
```
    <div class="w-full md:w-10 lg:w-12 2xl:w-14 transition-all duration-150 cursor-pointer hover:brightness-90"
```

Line 814 (key point):
```
- Bar shape: `w-full md:w-10` — adaptive on mobile, fixed 40px on desktop.
```
To:
```
- Bar shape: `w-full md:w-10 lg:w-12 2xl:w-14` — adaptive on mobile, stepped fixed widths on desktop (40px → 48px → 56px). Gap stays `gap-5` (20px); ratio varies from 50% (md) to ~36% (2xl).
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "feat(skill): update bar chart width rule to stepped breakpoints"
```

---

### Task 3: Verify at breakpoints

**Files:**
- No file changes — verification only

- [ ] **Step 1: Start dev server**

```bash
cd login-homepage-preview && npm run dev
```

- [ ] **Step 2: Verify at 1440px (lg)**

Navigate to `http://localhost:5173/admin`.

Checklist:
- [ ] No tinted backgrounds on chart or activity zones
- [ ] Bars at 48px (`lg:w-12`), gap 20px
- [ ] Stat cards unchanged
- [ ] Activity timeline unchanged

- [ ] **Step 3: Verify at 1920px (2xl)**

Resize to 1920px:
- [ ] Bars at 56px (`2xl:w-14`), gap 20px

- [ ] **Step 4: Verify at 390px (mobile)**

Resize to 390px:
- [ ] Bars `w-full` adaptive
- [ ] No zone tinted backgrounds
- [ ] Chart panels stack vertically (single column)

- [ ] **Step 5: Commit if no issues**

```bash
git commit -m "chore: verification complete — dashboard cleanup passes at all breakpoints"
```

---

### Task 4: Cleanup temp files

**Files:**
- Delete: `*.png` in project root
- Delete: `.playwright-mcp/` directory

- [ ] **Step 1: Delete temp files**

```bash
cd "D:\projects\UI-UX-design" && rm -f *.png && rm -rf .playwright-mcp/
```

- [ ] **Step 2: Push all changes**

```bash
git push origin main
```

---

## Plan Self-Review

**Spec coverage:**
- Zone bg removal → Task 1 Steps 1-2, verification Task 3
- Stepped bar widths → Task 1 Step 3, Task 2 (skill update), verification Task 3
- Nothing else changes → Explicitly verified in Task 3 checklist

**Placeholder scan:** No TBD, TODO, or vague references.

**Type consistency:** N/A — no types defined, just Tailwind classes.
