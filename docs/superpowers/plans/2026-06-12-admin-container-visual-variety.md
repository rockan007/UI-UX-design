# Admin Page Container & Visual Variety Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce a container hierarchy system (accent stripes + section shading + raised panels) into the vue3-element-ui-ux skill reference files to reduce admin page visual monotony.

**Architecture:** Five skill reference files are updated in dependency order: design tokens (new values) → design principles (relaxed rules) → component system (mapping updates) → generation rules (codegen supplements) → review checklist (new checks). Finally, the demo DashboardView is updated to validate the system produces correct output.

**Tech Stack:** Markdown reference files, Vue 3 + Element Plus + Tailwind CSS for validation demo.

---

### Task 1: Update design-tokens.md — Add tonal backgrounds, tonal borders, accent stripe rule; modify shadow and semantic color rules

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/design-tokens.md`

- [ ] **Step 1: Add tonal background scale table after the existing Semantic table**

Insert after the Semantic colors table (after line 35, before the `### Rules` subsection):

```markdown
### Tonal Backgrounds

Light tinted backgrounds for zone shading and colored card surfaces on admin pages.

| Token | Value | Usage |
| --- | --- | --- |
| `surface-blue` | `#eff6ff` | Blue-tinted zone/card background (user, system metrics) |
| `surface-cyan` | `#ecfeff` | Cyan-tinted zone/card background (order, transaction metrics) |
| `surface-amber` | `#fffbeb` | Amber-tinted zone/card background (revenue, pending, warning metrics) |
| `surface-green` | `#f0fdf4` | Green-tinted zone/card background (success, completion metrics) |
| `surface-warm` | `#fafaf9` | Warm-gray zone background (activity feeds, logs) |
| `surface-neutral` | `#f5f5f5` | Neutral-gray zone background (chart housing, secondary sections) |

### Tonal Borders

Matching border colors for tonal card surfaces.

| Token | Value | Usage |
| --- | --- | --- |
| `border-blue` | `#bfdbfe` | Blue zone/card border |
| `border-cyan` | `#a5f3fc` | Cyan card border |
| `border-amber` | `#fde68a` | Amber card border |
| `border-green` | `#bbf7d0` | Green card border |
```

- [ ] **Step 2: Replace the semantic color table to fix pending from green to amber**

Find the Semantic table (lines 29-35) and replace it:

```markdown
### Semantic

| Token | Value | Usage |
| --- | --- | --- |
| `success` | `#16a34a` | Success badge, completion, positive growth |
| `danger` | `#dc2626` | Delete button, error text |
| `warning` | `#d97706` | Warning badge, pending items, revenue/finance |
| `info` | `#0891b2` | Info badge, tooltip, orders/transactions |
```

- [ ] **Step 3: Replace the shadow rules section**

Find the Shadows section (lines 110-120) and replace:

```markdown
## Shadows

### Overlay Shadows (dialog, drawer, dropdown)

| Level | Value | Usage |
| --- | --- | --- |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)` | Dropdown, tooltip |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06)` | Dialog, popover |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.06)` | Drawer, sheet |

### Container Shadows (admin chart panels only)

`shadow-sm` may also be used on chart containers and data visualization panels to create a raised effect distinct from data tables. Stat/metric cards, tables, forms, and list containers must not use shadows.

No decorative shadows on cards, tables, forms, or content areas — except chart containers as noted above.
```

- [ ] **Step 4: Add accent stripe rule after the Border Radius section**

Insert after the Border Radius table (after line 109):

```markdown
## Accent Stripes

Stat/metric cards in admin pages use a 3px left border stripe to differentiate data categories:

| Color | Value | Semantic | Example Metrics |
| --- | --- | --- | --- |
| Blue | `#2563eb` | Neutral-positive | Users, traffic, system KPIs |
| Cyan | `#0891b2` | Flow/in-progress | Orders, transactions, processing |
| Amber | `#d97706` | Attention needed | Revenue, finance, pending items, warnings |
| Green | `#16a34a` | Positive/complete | Completion rate, success rate, growth |

Usage: `border-left: 3px solid {color}` + standard card border on remaining sides.
```

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/design-tokens.md
git commit -m "feat(skill): add tonal backgrounds, tonal borders, accent stripes, relax shadow rules"
```

---

### Task 2: Update design-principles.md — Relax restrictive rules, add container tier and section shading rules

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/design-principles.md`

- [ ] **Step 1: Replace the Visual Style section (lines 13-19)**

Replace:

```markdown
## Visual Style

- Use neutral colors for backgrounds and text (see `design-tokens.md`).
- Brand color only for primary actions, selected states, key feedback.
- Avoid broad gradients, neon colors, excessive shadows.
- Admin border radius: 6px. Frontend: 8px.
- Shadows only for overlays, dropdowns, dialogs — never for content cards.
```

With:

```markdown
## Visual Style

- Page background uses neutral colors. Section zones may use light tinted background tokens (`surface-*`) from `design-tokens.md` for visual distinction between content regions.
- Brand color for primary actions, selected states, and key feedback. Semantic colors (blue, cyan, amber, green) may be used for data visualization, stat card accent stripes, and tonal card backgrounds.
- Prohibited: gradient backgrounds, neon colors, saturated backgrounds. Allowed: subtle tinted backgrounds (`*-50` level tokens), `shadow-sm` on chart containers only.
- Admin border radius: 6px. Frontend: 8px.
- Shadows: `shadow-sm` for overlay components and chart/data-viz containers only. `shadow-md`/`shadow-lg` for dialogs, drawers, dropdowns. No shadows on tables, forms, list containers, or stat cards (stat cards use accent stripes, not elevation).
```

- [ ] **Step 2: Add container tier rules after the Visual Style section**

Insert after the updated Visual Style section (after `- Shadows: ...`):

```markdown
## Admin Container System

Admin pages use three container tiers to create visual rhythm. Do not use a single flat card style for every content block.

### Container Tiers

| Tier | Style | When to Use |
| --- | --- | --- |
| **Accent Card** | White background + `border` + left 3px colored stripe | Stat/metric cards — color distinguishes data category per `design-tokens.md` accent stripe table |
| **Raised Panel** | White background + no border + `shadow-sm` | Chart containers, key data visualizations — floats above page surface |
| **Standard Block** | White background + `border` (current default) | Tables, forms, activity lists — keeps functional areas clean and scanable |

### Section Shading

When a page has 3+ distinct content zones (each with its own heading — e.g., stats row, chart panel, data table, activity feed), group related cards inside a lightly tinted background wrapper (`surface-*` tokens) to form visual "regions." Each zone wrapper gets `rounded-md` padding and the appropriate `surface-*` background.

- A "zone" is a distinct content block with its own heading — stats row, chart panel, data table, activity feed, filter bar + results.
- Pages with only 1-2 zones stay flat — no section shading needed.
- Zone backgrounds always use `*-50` level tint tokens. Never saturated or dark backgrounds.
```

- [ ] **Step 3: Update the Admin Goals "Don't" list (lines 49-54)**

Replace:

```markdown
**Don't:**
- Oversized marketing-style headings and whitespace.
- Over-rounded controls, heavy shadows, decorative gradients.
- Card-heavy layouts when tables or lists are more efficient.
- Confused primary/secondary button hierarchy.
```

With:

```markdown
**Don't:**
- Oversized marketing-style headings and whitespace.
- Over-rounded controls, heavy shadows, decorative gradients.
- Card-heavy layouts when tables or lists are more efficient.
- Confused primary/secondary button hierarchy.
- Flat uniform card styling across the entire page — vary container treatments per the container tier system.
```

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/design-principles.md
git commit -m "feat(skill): relax visual rules, add admin container tiers and section shading rules"
```

---

### Task 3: Update component-system.md — Relax chart color rule, add zone container and accent stripe mappings

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/component-system.md`

- [ ] **Step 1: Update chart rules to allow semantic colors**

Find the chart rules (lines 29-38, after `### Data Visualization`) and replace the color rule line:

Find: `- Use brand + neutral colors only.`

Replace with:

```markdown
- Use brand and semantic colors (blue, cyan, amber, green) from `design-tokens.md`. Neutral fill for empty/zero states.
```

- [ ] **Step 2: Add ZoneContainer to Admin Components list**

In the Admin Components section (line 21), add `ZoneContainer` to the list:

Find:
```
`AdminShell` (`AdminLayout` + `AdminHeader` + `AdminSidebar`), `TopBar`, `Breadcrumbs`, `MetricGrid`, `DataTable`, `FilterBar`, `BulkActionBar`, `DetailPanel`, `AuditTimeline`, `PermissionNotice`
```

Replace with:
```
`AdminShell` (`AdminLayout` + `AdminHeader` + `AdminSidebar`), `TopBar`, `Breadcrumbs`, `MetricGrid`, `ZoneContainer`, `DataTable`, `FilterBar`, `BulkActionBar`, `DetailPanel`, `AuditTimeline`, `PermissionNotice`
```

- [ ] **Step 3: Add ZoneContainer and AccentCard to the composite mapping table**

In the Composite Components mapping table (after line 80), add after the `StatusTimeline` row:

```markdown
| `ZoneContainer` | `ZoneContainer` | Tinted region wrapper grouping related cards, `rounded-md` + `surface-*` bg + padding |
| `AccentCard` | `AccentCard` | Stat card with left 3px colored border stripe |
```

- [ ] **Step 4: Update MetricCard note in mapping table**

Find: `| `MetricCard` | `MetricCard` | KPI card |`

Replace with:

```markdown
| `MetricCard` | `MetricCard` | KPI card with left accent stripe (`border-l-*`) per data category |
```

- [ ] **Step 5: Add accent stripe variant to Variant Mapping table**

Add to the Variant Mapping table (after line 106):

```markdown
| `accent-blue` | Blue accent stripe (user/system metrics) |
| `accent-cyan` | Cyan accent stripe (order/transaction metrics) |
| `accent-amber` | Amber accent stripe (revenue/pending metrics) |
| `accent-green` | Green accent stripe (success/completion metrics) |
```

- [ ] **Step 6: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/component-system.md
git commit -m "feat(skill): relax chart color rule, add ZoneContainer and accent stripe mappings"
```

---

### Task 4: Update generation-rules.md — Add admin dashboard container generation supplement

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md`

- [ ] **Step 1: Add Admin Dashboard supplement after the Form Page section (before line 195)**

Insert after the Form Page section:

```markdown
### Admin Dashboard & Stat Pages

Extra focus: container variety, section shading, visual rhythm. Admin pages with multiple data zones must not use uniform white-card styling throughout.

**Container Tier Selection:**

| Content Type | Container Tier | Style |
| --- | --- | --- |
| Stat/metric cards | Accent Card | White bg + border + left 3px stripe (`border-l-[3px] border-l-{color} border border-neutral-200 rounded-btn`) |
| Chart/visualization panels | Raised Panel | White bg + no border + `shadow-sm rounded-btn` |
| Tables, lists, activity feeds | Standard Block | White bg + border (current default) |

**Stripe Color Assignment:**

- Blue (`#2563eb`): user, traffic, system KPI metrics
- Cyan (`#0891b2`): order, transaction, processing metrics
- Amber (`#d97706`): revenue, finance, pending, warning metrics
- Green (`#16a34a`): success, completion, growth metrics

**Section Shading:**

When a dashboard has 3+ zones (each with a heading), wrap each zone in a tinted container:

```html
<!-- Example: charts zone with blue tint -->
<div class="bg-surface-blue rounded-btn p-5 mb-6">
  <h3 class="text-base font-semibold text-neutral-950 mb-4">Charts</h3>
  <!-- chart panels inside -->
</div>
```

- Use `surface-blue` for user/system zones, `surface-cyan` for order/transaction zones, `surface-amber` for revenue/finance zones, `surface-green` for completion zones, `surface-neutral` for secondary/chart housing zones, `surface-warm` for activity/log zones.
- Pages with 1-2 zones: no section shading needed — individual containers provide enough variety.
- Zone backgrounds always use the lightest tint tokens (`*-50` level). Never saturated or dark backgrounds.

**Stat Card Template:**

```html
<div class="bg-white border border-neutral-200 rounded-btn p-4 hover:shadow-md transition-shadow duration-150"
     :style="{ borderLeft: '3px solid #2563eb' }">
  <div class="text-sm text-neutral-500 mb-2">{{ label }}</div>
  <div class="text-2xl font-bold text-neutral-950 mb-1">{{ value }}</div>
  <div class="text-sm text-green-600">↑ +12% vs last month</div>
</div>
```

**Chart Panel Template (Raised Panel):**

```html
<div class="bg-white rounded-btn p-5 shadow-sm">
  <h3 class="text-base font-semibold text-neutral-950 mb-5">Chart Title</h3>
  <!-- chart content -->
</div>
```
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "feat(skill): add admin dashboard container generation supplement"
```

---

### Task 5: Update review-checklist.md — Add container system review checks

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`

- [ ] **Step 1: Add container system checks to the Visual Consistency section (after line 50)**

Insert after the bar chart spacing check item (after `- [ ] **Bar chart spacing:** ...`):

```markdown
- [ ] **Container variety:** Admin pages with multiple content zones use varied container treatments (accent cards, raised panels, standard blocks) — not uniform white cards throughout.
- [ ] **Accent stripes:** Stat/metric cards have a 3px left border stripe, color matches data category per `design-tokens.md` accent stripe table.
- [ ] **Raised panels:** Chart containers and data visualization panels use `shadow-sm` + no border, distinct from data tables.
- [ ] **Section shading:** Pages with 3+ zones use tinted `surface-*` wrappers for visual grouping. Pages with 1-2 zones stay flat.
- [ ] **Shadows restricted:** Only chart/data-viz containers use `shadow-sm`. Tables, forms, stat cards, and list containers do not use shadows.
- [ ] **Tonal backgrounds restrained:** Zone tint backgrounds use only `*-50` level tokens. No saturated or dark backgrounds.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "feat(skill): add container system review checklist items"
```

---

### Task 6: Update demo DashboardView.vue — Apply the new container system to validate skill output

**Files:**
- Modify: `login-homepage-preview/src/views/DashboardView.vue`

- [ ] **Step 1: Replace the metric cards grid (lines 42-66)**

Replace the stat cards with accent stripe variants and wrap in a tinted zone:

```html
    <!-- Metric Cards Zone -->
    <div class="bg-surface-blue rounded-btn p-5 mb-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="m in metrics"
          :key="m.labelKey"
          class="bg-white border border-neutral-200 rounded-btn p-4 hover:shadow-md transition-shadow duration-150 cursor-pointer"
          :style="{ borderLeft: `3px solid ${m.color}` }"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-neutral-500">{{ t(m.labelKey) }}</span>
            <el-icon :size="18" color="#737373">
              <component :is="m.icon" />
            </el-icon>
          </div>
          <div class="text-2xl font-bold text-neutral-950 mb-1">{{ m.value }}</div>
          <div class="flex items-center gap-1 text-sm" :class="{
            'text-green-600': m.trend === 'up',
            'text-red-600': m.trend === 'down',
            'text-neutral-500': m.trend === 'flat',
          }">
            <el-icon v-if="m.trend === 'up'" :size="14"><ArrowUp /></el-icon>
            <el-icon v-else-if="m.trend === 'down'" :size="14"><ArrowDown /></el-icon>
            <span>{{ m.change }}</span>
            <span class="text-neutral-400 text-xs ml-1">{{ t('dashboard.vsLastMonth') }}</span>
          </div>
        </div>
      </div>
    </div>
```

- [ ] **Step 2: Add color to the metrics data array in the script section**

Update the metrics array (lines 8-13) to include a `color` property:

```typescript
const metrics = [
  { labelKey: 'dashboard.metrics.activeUsers', value: '12,483', change: '+12%', trend: 'up', icon: DataAnalysis, color: '#2563eb' },
  { labelKey: 'dashboard.metrics.ordersToday', value: '347', change: '+5%', trend: 'up', icon: ShoppingCart, color: '#0891b2' },
  { labelKey: 'dashboard.metrics.revenue', value: '¥38,200', change: '-3%', trend: 'down', icon: Money, color: '#d97706' },
  { labelKey: 'dashboard.metrics.pending', value: '23', change: '0%', trend: 'flat', icon: Warning, color: '#d97706' },
]
```

- [ ] **Step 3: Replace the charts row wrapper (lines 69-114)**

Wrap charts in a neutral-tinted zone and apply raised panel style to chart cards:

```html
    <!-- Charts Zone -->
    <div class="bg-surface-neutral rounded-btn p-5 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Bar Chart (Raised Panel) -->
        <div class="md:col-span-2 bg-white rounded-btn shadow-sm p-5">
          <h3 class="text-base font-semibold text-neutral-950 mb-5">{{ t('dashboard.chartOrderTrend') }}</h3>
          <div class="flex items-end justify-center gap-5 h-[200px] px-2">
            <div
              v-for="(val, i) in chartValues"
              :key="i"
              class="flex flex-col items-center gap-1"
            >
              <span class="text-xs text-neutral-500">{{ val }}</span>
              <div
                class="w-10 transition-all duration-150 cursor-pointer hover:brightness-90"
                :title="`${chartDays[i]}: ${val} 单`"
                :style="{
                  height: `${(val / maxValue) * 160}px`,
                  background: `linear-gradient(180deg, #2563eb 0%, #eff6ff 100%)`,
                }"
              ></div>
              <span class="text-xs text-neutral-400 mt-2">{{ chartDays[i] }}</span>
            </div>
          </div>
        </div>

        <!-- Category Chart (Raised Panel) -->
        <div class="bg-white rounded-btn shadow-sm p-5">
          <h3 class="text-base font-semibold text-neutral-950 mb-5">{{ t('dashboard.chartCategory') }}</h3>
          <div class="flex flex-col gap-4 justify-center h-[200px]">
            <div
              v-for="cat in categories"
              :key="cat.name"
              class="flex items-center gap-3"
            >
              <span class="text-sm text-neutral-500 w-10">{{ cat.name }}</span>
              <div class="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-150 cursor-pointer hover:brightness-90"
                  :title="`${cat.name}: ${cat.value}`"
                  :style="{ width: `${(cat.value / maxCat) * 100}%`, background: cat.color }"
                ></div>
              </div>
              <span class="text-sm text-neutral-800 w-9 text-right">{{ cat.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
```

- [ ] **Step 4: Wrap activity timeline in a warm zone**

Replace the activity timeline section (lines 117-138):

```html
    <!-- Activity Zone -->
    <div class="bg-surface-warm rounded-btn p-5">
      <h3 class="text-base font-semibold text-neutral-950 mb-5">{{ t('dashboard.activity') }}</h3>
      <div class="bg-white rounded-btn border border-neutral-200 p-5">
        <div class="flex flex-col">
          <div
            v-for="(item, i) in timeline"
            :key="i"
            class="flex gap-3 pb-5 relative hover:bg-neutral-50 -mx-2 px-2 rounded-r-btn transition-colors duration-150"
            :class="{ 'border-l-2': i < timeline.length - 1 }"
            :style="{ borderLeftColor: item.active ? '#2563eb' : '#e5e5e5', paddingLeft: '16px' }"
          >
            <div
              class="absolute w-2 h-2 rounded-full"
              :style="{ left: '-5px', top: '4px', background: item.active ? '#2563eb' : '#d4d4d4' }"
            ></div>
            <div>
              <div class="text-sm text-neutral-950">{{ item.title }}</div>
              <div class="text-sm text-neutral-500 mt-1">{{ item.desc }}</div>
              <div class="text-xs text-neutral-300 mt-2">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
```

- [ ] **Step 5: Commit**

```bash
git add login-homepage-preview/src/views/DashboardView.vue
git commit -m "feat(demo): apply container hierarchy to dashboard — accent stripes, raised panels, section shading"
```

---

### Task 7: Verify the demo app renders correctly

**Files:**
- No file changes — verification only

- [ ] **Step 1: Start the dev server**

```bash
cd login-homepage-preview && npm run dev
```

- [ ] **Step 2: Inspect the dashboard at multiple widths**

Using Playwright browser tools, open `http://localhost:5173/admin` (or the dashboard route) and inspect at:
- 1440px — verify stat cards have accent stripes, charts use shadow-sm with no borders, zones show tinted backgrounds
- 1024px — verify grid adapts without losing container variety
- 768px — verify zones remain distinct
- 390px — verify mobile layout is still usable

- [ ] **Step 3: Verify all three container tiers are present**
  - Accent Cards: stat/metric cards have left colored border stripes
  - Raised Panels: chart containers have `shadow-sm` and no border
  - Standard Block: activity timeline has white bg + border

- [ ] **Step 4: Verify section shading**
  - Stats zone has blue tint (`surface-blue`)
  - Charts zone has neutral tint (`surface-neutral`)
  - Activity zone has warm tint (`surface-warm`)

- [ ] **Step 5: Stop the dev server and commit any fixes**

If visual issues found, fix them and commit:

```bash
git add login-homepage-preview/src/views/DashboardView.vue
git commit -m "fix(demo): adjust dashboard container styling after visual review"
```

If no fixes needed, no commit required for this task.

---

### Task 8: Sync ui-ux-agent-designer meta-skill

**Files:**
- Modify: `.claude/skills/ui-ux-agent-designer/references/` (files TBD by inspection)

- [ ] **Step 1: Read the meta-skill design-principles reference**

```bash
cat .claude/skills/ui-ux-agent-designer/references/design-principles.md
```

- [ ] **Step 2: Check for rules that need the same relaxation**

Look for the same over-restrictive rules that were relaxed in `vue3-element-ui-ux`:
- "Avoid broad gradients, neon colors, excessive shadows" → split into specific allow/deny
- "No decorative shadows on cards" → allow chart/data-viz containers
- "Use neutral colors for backgrounds" → allow tonal surface colors

- [ ] **Step 3: Update meta-skill if needed**

If the meta-skill contains the same rules, apply equivalent relaxations at the principle level (not the concrete token level — the meta-skill stays technology-agnostic). Commit:

```bash
git add .claude/skills/ui-ux-agent-designer/references/
git commit -m "docs(skill): sync container variety principles to meta-skill"
```

If the meta-skill already uses principle-based language (per recent commit `ea7893a`), it may already be generic enough — skip with a note in the commit message.

- [ ] **Step 4: Push changes**

```bash
git push origin main
# If meta-skill was modified:
git subtree push --prefix=.claude/skills/ui-ux-agent-designer skill main
```
```

