# Dual Tab Bar for Forms — Design Spec

**Date:** 2026-06-13
**Status:** Approved

## Goal

When a tabbed form has both field-group tabs and O2M/M2M relationship tabs, split into
two independent tab bars: field tabs on top, relationship tabs at the bottom. This
improves page utilization when field tab content is short, and keeps O2M/M2M lists
visible as a distinct page zone.

## Decision Matrix

| Condition | Layout |
|---|---|
| < 3 logical field groups AND ≤ 1 O2M/M2M | Section cards only (current pattern) |
| 3+ logical field groups OR 2+ O2M/M2M, but NO O2M/M2M | Single tab bar (current tabbed form) |
| 3+ logical field groups OR 2+ O2M/M2M, AND ≥ 1 O2M/M2M | Dual tab bar (this spec) |

In short: tabs + any O2M/M2M → dual bars. Tabs but no relationships → single bar.

## Layout Structure

```
┌─ Toolbar (breadcrumb + action buttons) ─────────────────┐
│  订单管理 / 创建订单                [提交] [取消]         │
└─────────────────────────────────────────────────────────┘
┌─ Upper Tab Bar (field groups, desktop only) ────────────┐
│  [基本信息] [配送 & 备注]                                 │
└─────────────────────────────────────────────────────────┘
┌─ Upper Tab Content ─────────────────────────────────────┐
│  ┌─ Section Card (blue/cyan stripes) ─────────────┐     │
│  │  ...field inputs...                              │     │
│  └─────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
                         ← gap-6 (24px) →
┌─ Divider ───────────────────────────────────────────────┐
│  ────────  关联数据  ────────                             │
└─────────────────────────────────────────────────────────┘
                         ← gap-4 (16px) →
┌─ Lower Tab Bar (O2M/M2M, desktop only) ─────────────────┐
│  [商品清单 (3)] [附件 (2)]                                │
└─────────────────────────────────────────────────────────┘
┌─ Lower Tab Content ─────────────────────────────────────┐
│  ┌─ Section Card (purple stripe) ─────────────────┐     │
│  │  ...O2M grid / M2M list...                      │     │
│  └─────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## Tab Group Definitions

Two computed arrays replace the single `tabs` array:

```typescript
interface TabDefinition {
  key: string
  label: string
  count?: number
  hasError?: boolean
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
```

**Single tab collapse rule:** If a tab group has only 1 tab, skip the tab bar and
render the content directly — no tab chrome for a single item:

```typescript
const showFieldTabBar = computed(() => fieldTabs.value.length >= 2)
const showRelTabBar = computed(() => relationshipTabs.value.length >= 2)
const showDivider = computed(() =>
  fieldTabs.value.length >= 1 && relationshipTabs.value.length >= 1
)
```

## Divider Styling

The divider between upper and lower tab groups:

```html
<div v-if="showDivider" class="flex items-center gap-3 my-6 hidden md:flex">
  <div class="flex-1 h-px bg-neutral-200"></div>
  <span class="text-xs text-neutral-400 uppercase tracking-wide font-medium">关联数据</span>
  <div class="flex-1 h-px bg-neutral-200"></div>
</div>
```

- Label: "关联数据"
- Style: horizontal line on each side of the text, `my-6` (24px top and bottom)
- Only visible on desktop (`hidden md:flex`)
- Only shown when there are both field tabs and relationship tabs

## Tab Bar Styling (Both Groups)

Both the upper and lower tab bars use the same `<el-tabs>` styling as the current
single tab bar — no visual distinction between them:

- Active tab: `border-bottom: 2px solid var(--brand-600)` + `color: var(--brand-600)` + `font-weight: 500`
- Inactive tab: `color: var(--neutral-500)`, hover shifts to `brand-600`
- Badge via `<el-badge>` in `#label` slot — only on O2M/M2M tabs (which are always in the lower bar)
- Error tab: red label (`var(--el-color-danger)`) + `WarningFilled` icon — works identically in both groups
- Tab bar visibility: `hidden md:flex` (desktop only)

Lower tab bar uses the same neutral colors as upper — the purple accent is on the
content cards inside the panes, not on the tab bar itself.

## Template Structure

```html
<el-form ref="formRef" :model="form" :rules="isView ? {} : rules" label-position="top"
         @submit.prevent="isView ? undefined : handleSubmit()">

  <!-- ===== Upper Tab Bar + Content (desktop) ===== -->
  <template v-if="showFieldTabBar">
    <el-tabs v-model="activeFieldTab" class="hidden md:block" @tab-change="handleFieldTabChange">
      <el-tab-pane v-for="tab in fieldTabs" :key="tab.key" :name="tab.key">
        <template #label>
          {{ tab.label }}
          <el-icon v-if="tab.hasError"><WarningFilled /></el-icon>
        </template>
      </el-tab-pane>
    </el-tabs>
  </template>

  <!-- Upper content: v-show panes when tabbed, direct content when single -->
  <div :class="showFieldTabBar ? 'hidden md:flex flex-col gap-4' : ''">
    <div v-show="!showFieldTabBar || activeFieldTab === 'basic'">
      <!-- 基本信息 section card -->
    </div>
    <div v-show="!showFieldTabBar || activeFieldTab === 'delivery'">
      <!-- 配送 & 备注 section card -->
    </div>
  </div>

  <!-- ===== Divider (desktop) ===== -->
  <div v-if="showDivider" class="flex items-center gap-3 my-6 hidden md:flex">
    <div class="flex-1 h-px bg-neutral-200"></div>
    <span class="text-xs text-neutral-400 uppercase tracking-wide font-medium">关联数据</span>
    <div class="flex-1 h-px bg-neutral-200"></div>
  </div>

  <!-- ===== Lower Tab Bar + Content (desktop) ===== -->
  <template v-if="showRelTabBar">
    <el-tabs v-model="activeRelTab" class="hidden md:block" @tab-change="handleRelTabChange">
      <el-tab-pane v-for="tab in relationshipTabs" :key="tab.key" :name="tab.key">
        <template #label>
          {{ tab.label }}
          <el-badge v-if="tab.count !== undefined" :value="tab.count" :hidden="tab.count === 0"
                    :type="tab.hasError ? 'danger' : 'primary'" />
          <el-icon v-if="tab.hasError"><WarningFilled /></el-icon>
        </template>
      </el-tab-pane>
    </el-tabs>
  </template>

  <!-- Lower content -->
  <div :class="showRelTabBar ? 'hidden md:flex flex-col gap-4' : ''">
    <div v-show="!showRelTabBar || activeRelTab === 'items'">
      <!-- 商品清单 section card (purple) -->
    </div>
    <div v-show="!showRelTabBar || activeRelTab === 'attachments'">
      <!-- 附件 section card (purple) -->
    </div>
  </div>

  <!-- ===== Mobile: flat sections (md:hidden) ===== -->
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
- Both tab groups share one `<el-form>` — single submit validates everything
- Upper panes use `activeFieldTab`, lower panes use `activeRelTab` — independent active states
- When a group has only 1 tab: `!showFieldTabBar` / `!showRelTabBar` — the `v-show` falls through and shows content directly
- Mobile: `md:hidden` flat stack with divider between field and relationship sections
- All existing section card, O2M grid, and three-mode patterns are unchanged

## Validation

Single submit validates across both groups. Error handling is unchanged from the
single tab bar pattern, extended to two active states:

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
```

- Field tabs are checked first — errors in upper group take priority
- If the error is in a collapsed group (single tab, no bar), the inline error display still shows — no tab switch needed

## Mobile Adaptation (< 768px)

Both tab bars hidden. All sections stacked flat with divider between field and
relationship sections:

```
Mobile (<768px):
┌─ Section Card: 基本信息 (blue) ────┐
├─ Section Card: 配送 & 备注 (cyan) ─┤
├─ ───────  关联数据  ─────── ────────┤
├─ Section Card: 商品清单 (purple) ───┤
│  (compact card per item)            │
├─ Section Card: 附件 (purple) ───────┤
│  (compact card per item)            │
└────────────────────────────────────┘
```

Implementation: `md:hidden` wrapper with all section cards in order. Divider
uses the same markup but without `hidden md:flex` (visible at all widths on mobile).

## Three-Mode Integration

Dual tab bar behavior is identical across create/view/edit — same as single tab bar:

| Mode | Upper Bar | Upper Content | Lower Bar | Lower Content |
|---|---|---|---|---|
| create | Visible (if ≥2 tabs) | Editable fields + rules | Visible (if ≥2 tabs) | Editable grids, add/delete enabled |
| view | Visible | Read-only text | Visible | Read-only grids, no add/delete |
| edit | Visible | Editable fields + rules | Visible | Editable grids, add/delete enabled |

Single tab collapse applies in all modes — a view-mode form with only 1 field tab
shows the content directly, no tab bar.

## File Changes

### Skill Files
- `.claude/skills/vue3-element-ui-ux/references/generation-rules.md` — Replace
  Tabbed Form section with Dual Tab Bar version: fieldTabs/relationshipTabs split,
  divider, collapse rule, updated template and validation code

### Demo App
- `login-homepage-preview/src/views/OrderFormView.vue` — Refactor from single
  tabs array to fieldTabs/relationshipTabs with dual tab bars and divider

## Design Decisions

1. **Split by content type, not count** — field tabs always upper, O2M/M2M always lower.
   Natural mental model: "entity fields first, related data second."
2. **Single tab collapse** — avoids a tab bar with just one tab, which looks broken.
3. **Same tab bar styling for both groups** — visual consistency. Purple is for section
   cards, not tab chrome.
4. **"关联数据" divider** — subtle label gives context without being intrusive. Hidden
   on mobile where scrolling naturally separates the content.
5. **Single form, two active states** — cross-group validation, one submit button.
   Independent `activeFieldTab`/`activeRelTab` refs so switching in one group doesn't
   affect the other.
6. **Field tabs checked first on validation failure** — entity-level errors are
   typically more critical than relationship-level errors.

## Spec Self-Review

- **Placeholders:** None
- **Consistency:** Dual bar pattern extends the single bar pattern without replacing it.
  Same tab styling, same section cards, same O2M grid, same three-mode handling. Only the
  tab grouping and divider are new.
- **Scope:** Focused — one skill file section rewrite + one demo component refactor.
  Does not change business logic, API contracts, or other pages.
- **Ambiguity:** Single-tab collapse rule is explicit. Mobile behavior is explicit.
  Validation priority (field tabs first) is explicit. When to use dual vs single bar is
  explicit in the decision matrix.
