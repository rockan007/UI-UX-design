# Filter Bar Layout Rules — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update generation-rules.md to codify three filter bar layout rules: search input min-width 200px, select dropdown min-width 150px, filter-button adjacency before flex-1 spacer.

**Architecture:** Single-file edit to `.claude/skills/vue3-element-ui-ux/references/generation-rules.md` — update the Admin List Page → Action Button Placement section template and key points.

**Tech Stack:** Vue 3 + Element Plus + Tailwind CSS (skill documentation only)

---

### Task 1: Update filter bar template and rules in generation-rules.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md:172-188`

- [ ] **Step 1: Update the filter bar code template**

Find (lines 172-183):
```html
```html
<!-- Filter Bar: Desktop — includes action button -->
<div class="hidden md:flex flex-wrap items-center gap-3 bg-white rounded-btn border border-neutral-200 p-4 mb-4">
  <el-input v-model="keyword" :placeholder="searchPlaceholder" :prefix-icon="Search" clearable class="w-64" />
  <el-select v-model="statusFilter" class="w-28">...</el-select>
  <el-select v-model="channelFilter" class="w-28">...</el-select>
  <div class="flex-1"></div>
  <el-button type="primary" :icon="Plus" @click="router.push('/admin/{entity}/create')">
    创建{entity}
  </el-button>
</div>
``````

Replace with:
```html
<!-- Filter Bar: Desktop — includes action button -->
<div class="hidden md:flex flex-wrap items-center gap-3 bg-white rounded-btn border border-neutral-200 p-4 mb-4">
  <el-input v-model="keyword" :placeholder="searchPlaceholder" :prefix-icon="Search" clearable class="min-w-[200px]" />
  <el-select v-model="statusFilter" class="min-w-[150px]">...</el-select>
  <el-select v-model="channelFilter" class="min-w-[150px]">...</el-select>
  <el-button @click="handleReset">重置</el-button>
  <div class="flex-1"></div>
  <el-button type="primary" :icon="Plus" @click="router.push('/admin/{entity}/create')">
    创建{entity}
  </el-button>
</div>
```

- [ ] **Step 2: Update the key points**

Find (lines 185-188):
```
Key points:
- `<div class="flex-1"></div>` pushes the button to the right edge
- Button keeps text label on desktop — space is available
- No standalone button row above or below the filter bar
```

Replace with:
```
Key points:
- Search input: `min-w-[200px]` minimum width, can grow
- Select dropdowns: `min-w-[150px]` minimum width, can grow
- Filter-related buttons (Reset, Apply, Search trigger) are placed after filter controls, BEFORE the `<div class="flex-1">` spacer
- `<div class="flex-1"></div>` pushes everything after it to the right edge
- Primary action button (Create, Add): after spacer, with text label on desktop
- No standalone button row above or below the filter bar
```

- [ ] **Step 3: Verify the file is well-formed**

Read the updated section to confirm the markdown code fences are correct and the template renders properly.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "feat(skill): add filter bar layout rules — search min-w-[200px], select min-w-[150px], filter buttons adjacent before spacer"
```
