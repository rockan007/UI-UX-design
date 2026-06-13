# Dual Tab Bar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the single tab bar into dual tab bars — upper for field groups, lower for O2M/M2M relationships with a "关联数据" divider between them.

**Architecture:** Replace `tabs`/`activeTab` with `fieldTabs`/`activeFieldTab` (upper) and `relationshipTabs`/`activeRelTab` (lower). A computed `showDivider` controls the separator. Single-tab collapse rule: a group with only 1 tab skips the tab bar and shows content directly.

**Tech Stack:** Vue 3 + Element Plus (`ElTabs`, `ElBadge`) + Tailwind CSS

---

### Task 1: Update generation-rules.md Tabbed Form section

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md:472-652`

- [ ] **Step 1: Replace the Decision Matrix**

Replace lines 478-483 with the updated matrix:

```markdown
**Decision Matrix:**

| Condition | Layout |
|---|---|
| < 3 logical field groups AND ≤ 1 O2M/M2M | Section cards only (current pattern) |
| 3+ logical field groups OR 2+ O2M/M2M, but no O2M/M2M | Single tab bar |
| 3+ logical field groups OR 2+ O2M/M2M, AND ≥ 1 O2M/M2M | Dual tab bar (this section) |
```

- [ ] **Step 2: Replace Tab Bar section with Dual Tab Bar section**

Replace lines 485-522 (the Tab Bar subsection) with:

```markdown
**Tab Bar (Dual):**

When O2M/M2M relationships are present, split into two independent tab bars: upper for
field groups, lower for relationships. A divider labeled "关联数据" separates the two.

```html
<!-- Upper Tab Bar: field groups -->
<el-tabs
  v-if="showFieldTabBar"
  v-model="activeFieldTab"
  tab-position="top"
  class="hidden md:block"
  @tab-change="handleFieldTabChange"
>
  <el-tab-pane v-for="tab in fieldTabs" :key="tab.key" :name="tab.key">
    <template #label>
      {{ tab.label }}
      <el-icon v-if="tab.hasError" class="ml-1" style="color: var(--el-color-danger)">
        <WarningFilled />
      </el-icon>
    </template>
  </el-tab-pane>
</el-tabs>

<!-- Divider: shown when both groups have content -->
<div v-if="showDivider" class="flex items-center gap-3 my-6 hidden md:flex">
  <div class="flex-1 h-px bg-neutral-200"></div>
  <span class="text-xs text-neutral-400 uppercase tracking-wide font-medium">关联数据</span>
  <div class="flex-1 h-px bg-neutral-200"></div>
</div>

<!-- Lower Tab Bar: O2M/M2M relationships -->
<el-tabs
  v-if="showRelTabBar"
  v-model="activeRelTab"
  tab-position="top"
  class="hidden md:block"
  @tab-change="handleRelTabChange"
>
  <el-tab-pane v-for="tab in relationshipTabs" :key="tab.key" :name="tab.key">
    <template #label>
      {{ tab.label }}
      <el-badge
        v-if="tab.count !== undefined"
        :value="tab.count"
        :hidden="tab.count === 0"
        :type="tab.hasError ? 'danger' : 'primary'"
      />
      <el-icon v-if="tab.hasError" class="ml-1" style="color: var(--el-color-danger)">
        <WarningFilled />
      </el-icon>
    </template>
  </el-tab-pane>
</el-tabs>
```

Key points:
- Both tab bars use `hidden md:block` — visible on desktop only
- `v-if="showFieldTabBar"` / `v-if="showRelTabBar"` — no bar when only 1 tab in that group
- Badge only on relationship tabs (lower bar), not on field tabs
- Divider: `flex items-center gap-3 my-6 hidden md:flex` — horizontal rule + label pattern
- Divider only shown when both field tabs and relationship tabs exist (`showDivider`)
- Error tab: badge `type="danger"` + `WarningFilled` icon in red — works in both bars
- Active tab styling (both bars): `border-bottom: 2px solid var(--brand-600)` + `color: var(--brand-600)` + `font-weight: 500`
- Inactive tab: `color: var(--neutral-500)`, hover shifts to `brand-600`
```

- [ ] **Step 3: Replace Tab Definition section**

Replace lines 524-542 with:

```markdown
**Tab Definitions:**

```typescript
interface TabDefinition {
  key: string           // unique tab key, e.g., 'basic', 'items', 'attachments'
  label: string         // display label, e.g., '基本信息', '商品清单'
  count?: number        // O2M/M2M item count for badge (undefined = no badge)
  hasError?: boolean    // set to true when hidden tab has validation errors
}

// Field-group tabs (upper) — entity fields, non-relationship sections
const fieldTabs = computed<TabDefinition[]>(() => [
  { key: 'basic', label: '基本信息' },
  { key: 'delivery', label: '配送 & 备注' },
])

// O2M/M2M relationship tabs (lower) — always at page bottom
const relationshipTabs = computed<TabDefinition[]>(() => [
  { key: 'items', label: '商品清单', count: form.items.length },
  { key: 'attachments', label: '附件', count: form.attachments.length },
])

const activeFieldTab = ref<string>(fieldTabs.value[0]?.key ?? 'basic')
const activeRelTab = ref<string>(relationshipTabs.value[0]?.key ?? 'items')

// Render tab bar only when group has ≥2 tabs (collapse single tab)
const showFieldTabBar = computed(() => fieldTabs.value.length >= 2)
const showRelTabBar = computed(() => relationshipTabs.value.length >= 2)
const showDivider = computed(() =>
  fieldTabs.value.length >= 1 && relationshipTabs.value.length >= 1
)
```
```

- [ ] **Step 4: Replace Tab Pane Content section**

Replace lines 544-573 with:

```markdown
**Tab Pane Content (Desktop):**

On desktop, use `v-show` per group so Element Plus validation can reach all fields.
Each group manages its own active tab independently.

```html
<el-form ref="formRef" :model="form" :rules="isView ? {} : rules" label-position="top"
         @submit.prevent="isView ? undefined : handleSubmit()">
  <!-- Upper group content: field tab panes -->
  <div :class="showFieldTabBar ? 'hidden md:flex flex-col gap-4' : ''">
    <div v-show="!showFieldTabBar || activeFieldTab === 'basic'">
      <!-- 基本信息 section card (blue stripe) -->
    </div>
    <div v-show="!showFieldTabBar || activeFieldTab === 'delivery'">
      <!-- 配送 & 备注 section card (cyan stripe) -->
    </div>
  </div>

  <!-- Divider between groups (desktop) -->
  <div v-if="showDivider" class="flex items-center gap-3 my-6 hidden md:flex">
    <div class="flex-1 h-px bg-neutral-200"></div>
    <span class="text-xs text-neutral-400 uppercase tracking-wide font-medium">关联数据</span>
    <div class="flex-1 h-px bg-neutral-200"></div>
  </div>

  <!-- Lower group content: O2M/M2M tab panes -->
  <div :class="showRelTabBar ? 'hidden md:flex flex-col gap-4' : ''">
    <div v-show="!showRelTabBar || activeRelTab === 'items'">
      <!-- 商品清单 section card (purple stripe) — existing O2M pattern -->
    </div>
    <div v-show="!showRelTabBar || activeRelTab === 'attachments'">
      <!-- 附件 section card (purple stripe) -->
    </div>
  </div>

  <!-- Mobile: flat sections with divider -->
  <div class="md:hidden flex flex-col gap-4">
    <!-- 基本信息 (blue) -->
    <!-- 配送 & 备注 (cyan) -->
    <!-- Divider: 关联数据 -->
    <!-- 商品清单 (purple) -->
    <!-- 附件 (purple) -->
  </div>
</el-form>
```

Key points:
- `!showFieldTabBar` / `!showRelTabBar`: when a group has only 1 tab, content renders directly without tab switching
- `v-show` (not `v-if`) on each pane keeps hidden fields in DOM for validation
- Desktop: both tab groups visible simultaneously with independent active states
- Mobile: `md:hidden` flat stack with divider between field and relationship sections
- Section cards inside tabs use the same accent stripe pattern — blue/cyan/purple per content type
```

- [ ] **Step 5: Replace Validation Across Tabs section**

Replace lines 575-621 with:

```markdown
**Validation Across Both Tab Groups:**

```typescript
async function handleSubmit() {
  if (!formRef.value) return
  submitting.value = true
  try {
    await formRef.value.validate()
  } catch {
    // Check field group tabs first, then relationship tabs
    for (const tab of fieldTabs.value) {
      if (tabHasErrors(tab.key)) {
        activeFieldTab.value = tab.key
        tab.hasError = true
        submitting.value = false
        return
      }
    }
    for (const tab of relationshipTabs.value) {
      if (tabHasErrors(tab.key)) {
        activeRelTab.value = tab.key
        tab.hasError = true
        submitting.value = false
        return
      }
    }
    submitting.value = false
    return
  }
  // ... proceed with submission
}

function handleFieldTabChange(key: string) {
  const tab = fieldTabs.value.find(t => t.key === key)
  if (tab) tab.hasError = false
}

function handleRelTabChange(key: string) {
  const tab = relationshipTabs.value.find(t => t.key === key)
  if (tab) tab.hasError = false
}

function tabHasErrors(tabKey: string): boolean {
  const tabFieldMap: Record<string, string[]> = {
    basic: ['customer', 'phone', 'amount', 'channel'],
    delivery: ['deliveryMethod', 'address', 'remark'],
    items: ['items'],
    attachments: ['attachments'],
  }
  const formFields = Object.keys(formRef.value?.fields || {})
  const tabFields = tabFieldMap[tabKey] || []
  return tabFields.some(f => formFields.includes(f))
}
```

Key points:
- Field tabs checked first — entity-level errors take priority over relationship errors
- Each group has its own active tab ref and change handler
- If error is in a collapsed group (1 tab, no bar), inline field errors still show — no tab switch needed
- `v-show` (not `v-if`) keeps hidden tab fields in the DOM for validation
```

- [ ] **Step 6: Update Three-Mode Integration table**

Replace lines 645-651 with:

```markdown
| Mode | Upper Bar | Upper Content | Lower Bar | Lower Content |
|---|---|---|---|---|
| create | Visible (if ≥2 tabs) | Editable fields + rules | Visible (if ≥2 tabs) | Editable grids, add/delete enabled |
| view | Visible | Read-only text | Visible | Read-only grids, no add/delete |
| edit | Visible (if ≥2 tabs) | Editable fields + rules | Visible (if ≥2 tabs) | Editable grids, add/delete enabled |

Single tab collapse applies in all modes — a view-mode form with only 1 field tab
shows the content directly, no tab bar.
```

- [ ] **Step 7: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "feat(skill): replace single tab bar with dual tab bar in Tabbed Form section"
```

---

### Task 2: Refactor OrderFormView with dual tab bars

**Files:**
- Modify: `login-homepage-preview/src/views/OrderFormView.vue`

- [ ] **Step 1: Replace tab definitions in script**

Replace the current `tabs`, `activeTab`, and `handleTabChange` (lines 22-41) with:

```typescript
interface TabDefinition {
  key: string
  label: string
  count?: number
  hasError?: boolean
}

const fieldTabs = computed<TabDefinition[]>(() => [
  { key: 'basic', label: '基本信息' },
  { key: 'delivery', label: '配送 & 备注' },
])

const relationshipTabs = computed<TabDefinition[]>(() => [
  { key: 'items', label: '商品清单', count: form.items.length },
  { key: 'attachments', label: '附件', count: form.attachments.length },
])

const activeFieldTab = ref<string>('basic')
const activeRelTab = ref<string>('items')

const showFieldTabBar = computed(() => fieldTabs.value.length >= 2)
const showRelTabBar = computed(() => relationshipTabs.value.length >= 2)
const showDivider = computed(() =>
  fieldTabs.value.length >= 1 && relationshipTabs.value.length >= 1
)

function handleFieldTabChange(key: string) {
  const tab = fieldTabs.value.find(t => t.key === key)
  if (tab) tab.hasError = false
}

function handleRelTabChange(key: string) {
  const tab = relationshipTabs.value.find(t => t.key === key)
  if (tab) tab.hasError = false
}
```

- [ ] **Step 2: Replace handleSubmit validation logic**

Replace the validation catch block in `handleSubmit` (lines 162-172) with:

```typescript
  } catch {
    // Check field group tabs first, then relationship tabs
    for (const tab of fieldTabs.value) {
      if (tabHasErrors(tab.key)) {
        activeFieldTab.value = tab.key
        tab.hasError = true
        submitting.value = false
        return
      }
    }
    for (const tab of relationshipTabs.value) {
      if (tabHasErrors(tab.key)) {
        activeRelTab.value = tab.key
        tab.hasError = true
        submitting.value = false
        return
      }
    }
    submitting.value = false
    return
  }
```

- [ ] **Step 3: Replace tab bar in template**

Replace the current single tab bar (the `<el-tabs>` block after the toolbar) with dual tab bars + divider. Insert after the toolbar `</div>` and before `<el-form`:

```html
    <!-- Upper Tab Bar: field groups (desktop only) -->
    <template v-if="showFieldTabBar">
      <el-tabs
        v-model="activeFieldTab"
        tab-position="top"
        class="hidden md:block"
        @tab-change="handleFieldTabChange"
      >
        <el-tab-pane
          v-for="tab in fieldTabs"
          :key="tab.key"
          :name="tab.key"
        >
          <template #label>
            <span :class="tab.hasError ? 'text-red-600' : ''">{{ tab.label }}</span>
            <el-icon v-if="tab.hasError" class="ml-1" style="color: var(--el-color-danger)">
              <WarningFilled />
            </el-icon>
          </template>
        </el-tab-pane>
      </el-tabs>
    </template>
```

- [ ] **Step 4: Update desktop tab panes to use dual groups**

Replace the current desktop tab panes container with upper and lower groups separated by divider. The upper group uses `activeFieldTab` and `showFieldTabBar`. The lower group uses `activeRelTab` and `showRelTabBar`. Insert the divider between them:

```html
    <!-- Divider between field tabs and relationship tabs (desktop) -->
    <div v-if="showDivider" class="flex items-center gap-3 my-6 hidden md:flex">
      <div class="flex-1 h-px bg-neutral-200"></div>
      <span class="text-xs text-neutral-400 uppercase tracking-wide font-medium">关联数据</span>
      <div class="flex-1 h-px bg-neutral-200"></div>
    </div>
```

- [ ] **Step 5: Add lower tab bar before the relationship content**

After the divider, add the relationship tab bar and update the relationship panes:

```html
    <!-- Lower Tab Bar: O2M/M2M relationships (desktop only) -->
    <template v-if="showRelTabBar">
      <el-tabs
        v-model="activeRelTab"
        tab-position="top"
        class="hidden md:block"
        @tab-change="handleRelTabChange"
      >
        <el-tab-pane
          v-for="tab in relationshipTabs"
          :key="tab.key"
          :name="tab.key"
        >
          <template #label>
            <span :class="tab.hasError ? 'text-red-600' : ''">{{ tab.label }}</span>
            <el-badge
              v-if="tab.count !== undefined"
              :value="tab.count"
              :hidden="tab.count === 0"
              :type="tab.hasError ? 'danger' : 'primary'"
              class="ml-1"
            />
            <el-icon v-if="tab.hasError" class="ml-1" style="color: var(--el-color-danger)">
              <WarningFilled />
            </el-icon>
          </template>
        </el-tab-pane>
      </el-tabs>
    </template>
```

- [ ] **Step 6: Update the desktop tab pane v-show conditions**

For each desktop tab pane, update the `v-show` condition from `activeTab === '...'` to use the correct group:
- Basic info: `v-show="!showFieldTabBar || activeFieldTab === 'basic'"`
- Delivery: `v-show="!showFieldTabBar || activeFieldTab === 'delivery'"`
- Items: `v-show="!showRelTabBar || activeRelTab === 'items'"`
- Attachments: `v-show="!showRelTabBar || activeRelTab === 'attachments'"`

And update the wrapper div classes:
- Upper group: `:class="showFieldTabBar ? 'hidden md:flex flex-col gap-4' : ''"`
- Lower group: `:class="showRelTabBar ? 'hidden md:flex flex-col gap-4' : ''"`

- [ ] **Step 7: Add divider to mobile sections**

In the `md:hidden` mobile section, add the divider between 配送 & 备注 and 商品清单 sections:

```html
        <!-- Divider (mobile) -->
        <div class="flex items-center gap-3 my-2">
          <div class="flex-1 h-px bg-neutral-200"></div>
          <span class="text-xs text-neutral-400 uppercase tracking-wide font-medium">关联数据</span>
          <div class="flex-1 h-px bg-neutral-200"></div>
        </div>
```

- [ ] **Step 8: Build and verify**

```bash
cd login-homepage-preview && npm run build
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 9: Commit**

```bash
git add login-homepage-preview/src/views/OrderFormView.vue
git commit -m "feat(demo): refactor OrderFormView to dual tab bars — upper field tabs + lower O2M/M2M tabs with divider"
```

---

### Task 3: Verify at all breakpoints

**Files:**
- No file changes — verification only

- [ ] **Step 1: Start dev server**

```bash
cd login-homepage-preview && npm run dev
```

- [ ] **Step 2: Inspect at 1440px (desktop, create mode)**

Navigate to `http://localhost:5173/admin/orders/create`.

Checklist:
- [ ] Upper tab bar visible with 2 tabs: 基本信息, 配送 & 备注
- [ ] "关联数据" divider visible between upper and lower content
- [ ] Lower tab bar visible with 2 tabs: 商品清单 (1), 附件 (1) — both with badges
- [ ] Upper and lower tabs switch independently
- [ ] Purple accent on 商品清单 and 附件 section cards
- [ ] Blue accent on 基本信息, cyan on 配送 & 备注
- [ ] Submit with empty required fields → auto-switch to error tab (field tabs checked first)

- [ ] **Step 3: Inspect at 1440px (view mode)**

Navigate to any order detail page.

Checklist:
- [ ] Both tab bars still visible
- [ ] All content read-only
- [ ] No add/delete buttons on grids

- [ ] **Step 4: Inspect at 390px (mobile)**

Checklist:
- [ ] No tab bars visible
- [ ] All section cards stacked vertically
- [ ] "关联数据" divider visible between 配送 & 备注 and 商品清单
- [ ] O2M items use compact card layout

- [ ] **Step 5: Commit if no issues**

```bash
git commit -m "chore: verification complete — dual tab bars pass at all breakpoints"
```

If issues found, fix them and re-inspect before committing.

---

### Task 4: Cleanup and push

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

**Spec coverage check:**
- Decision matrix (dual bar when O2M present) → Task 1 Step 1
- Layout structure (upper bar + divider + lower bar) → Task 1 Step 2, Task 2 Steps 3-5
- Tab group definitions (fieldTabs/relationshipTabs) → Task 1 Step 3, Task 2 Step 1
- Single tab collapse → Task 1 Steps 3-4, Task 2 Step 6
- Divider styling ("关联数据") → Task 1 Step 2, Task 2 Steps 4, 7
- Tab bar styling (both groups same) → Task 1 Step 2
- Template structure → Task 1 Step 4, Task 2 Steps 3-7
- Cross-group validation (field tabs first) → Task 1 Step 5, Task 2 Step 2
- Mobile (flat sections + divider) → Task 2 Step 7, Task 3 Step 4
- Three-mode integration → Task 1 Step 6
- Demo app refactor → Task 2
- Verification → Task 3

**Placeholder scan:** No TBD, TODO, or vague references. All code is explicit.

**Type consistency:** `TabDefinition` interface unchanged. `fieldTabs`/`relationshipTabs` naming consistent across skill file and demo. `activeFieldTab`/`activeRelTab` refs match `handleFieldTabChange`/`handleRelTabChange` handlers. `showFieldTabBar`/`showRelTabBar`/`showDivider` computed names consistent.
