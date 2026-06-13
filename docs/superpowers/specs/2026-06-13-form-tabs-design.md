# Form Tabs — Design Spec

**Date:** 2026-06-13
**Status:** Approved

## Goal

Add tab-based form section switching for complex admin forms, and support treating O2M/M2M
relationship fields as dedicated tab areas. Keep simple forms unchanged with the existing
section-card-only layout.

## Decision Matrix

| Condition | Layout |
|---|---|
| < 3 logical field groups AND ≤ 1 O2M/M2M | Section cards only (current pattern, unchanged) |
| 3+ logical field groups OR 2+ O2M/M2M | Tabs + section cards |

O2M that is the only relationship and the form has few sections: stays as a section card
within the flow — no separate tab.

## Tab Bar Structure

### Placement

Tab bar sits **between toolbar and form content**:

```
┌─ Toolbar (breadcrumb + action buttons) ─────────────────┐
│  订单管理 / 创建订单                [提交] [取消]         │
└─────────────────────────────────────────────────────────┘
┌─ Tab Bar ───────────────────────────────────────────────┐
│  [基本信息] [配送 & 备注] [商品清单 (3)] [附件 (2)]       │
└─────────────────────────────────────────────────────────┘
┌─ Tab Pane Content ──────────────────────────────────────┐
│  ┌─ Section Card (blue stripe) ───────────────────┐     │
│  │  ...fields...                                   │     │
│  └────────────────────────────────────────────────┘     │
│  ┌─ Section Card (cyan stripe) ──────────────────┐     │
│  │  ...fields...                                   │     │
│  └────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### Tab Composition

- **General field groups**: 1 tab per logical group (typically 2-3 tabs)
- **Each O2M/M2M relationship**: 1 dedicated tab with count badge
- Each tab pane contains 1+ section cards with accent stripes — the existing section card
  pattern is preserved, not replaced
- Minimum 2 tabs to render the tab bar; fewer = no tabs (section cards only)

### Implementation

- Component: `<el-tabs v-model="activeTab" tab-position="top">`
- Tab bar wrapper: `bg-white`, no elevation, flush above content
- Tab bar visibility: `hidden md:flex` (desktop only; mobile collapses to flat sections)

## Tab Styling

### Visual Specs

- Active tab: `border-bottom: 2px solid var(--brand-600)` + `color: var(--brand-600)` + `font-weight: 500`
- Inactive tab: `color: var(--neutral-500)`, no bottom border
- Hover: `color: var(--brand-600)`
- Tab labels: `font-size: 13px`, short Chinese text
- No horizontal scroll — all tabs visible at once. If too many tabs to fit, restructure
  the form (merge sections) rather than adding scrolling or dropdown

### O2M/M2M Tab Badge

- Component: `<el-badge :value="items.length" :hidden="items.length === 0">`
- Badge color: `var(--neutral-400)` on inactive tab, `var(--brand-600)` on active tab
- No badge when count is 0
- Badge updates reactively as items are added/removed

### O2M/M2M Section Card Accent

- Accent stripe color: **purple** (`#7c3aed`, `border-l-purple-600`)
- Section title color: `text-purple-700`
- Distinct from blue (primary fields) and cyan (secondary fields), signaling "this is a
  relationship, not a field group"

## Tab Interaction

### Switching

- Click tab → switch pane instantly (no animation delay)
- No validation on tab switch — free navigation between tabs
- Active tab is local component state (`ref<string>`), not in URL/route
- Scroll position resets to top of tab pane on switch

### Validation & Error Handling

- Single submit validates ALL tabs, not just the visible one
- If validation errors exist on a hidden tab:
  - Submit fails
  - Auto-switch to the first tab with errors
  - Error tab label turns red (`var(--danger-600)`) with a small `!` icon
  - `<el-badge>` on error tab switches to danger variant

```
Normal:  [基本信息] [配送 & 备注] [商品清单 (3)] [附件 (2)]
Errors:  [基本信息] [配送 & 备注] [!商品清单 (3)] [附件 (2)]
                                  ↑ red = has errors
```

## Three-Mode Integration

Tabs are consistent across create/view/edit modes — same tab bar, same structure,
only the content inside each pane changes per mode.

| Mode | Tab Bar | Tab Content | O2M Tab |
|---|---|---|---|
| create | Visible | Editable fields + rules | Editable grid, add/delete enabled |
| view | Visible | Read-only text | Read-only grid, no add/delete, no delete column |
| edit | Visible | Editable fields + rules | Editable grid, add/delete enabled |

- View mode: tab bar is still rendered so users can browse all sections of the record
- Mode detection: same as current `isView`/`isEdit`/`isCreate` computed from route name
- Field display per mode: same `v-if="isView"` / `v-else` pattern per field
- Form validation: `:rules="isView ? {} : rules"` — unchanged
- Submit: `@submit.prevent="isView ? undefined : handleSubmit()"` — unchanged

## O2M/M2M Tab Content

Each O2M/M2M tab pane contains:

```
┌─ Section Card (purple stripe) ──────────────────────────┐
│  商品清单                                                 │
│  ┌─ Column Headers (desktop only) ──────────────────┐    │
│  │ 名称 │ 规格 │ 数量 │ 单价 │ 小计 │               │    │
│  ├──────────────────────────────────────────────────┤    │
│  │ iPhone 16 Pro │ 256GB │ 2 │ ¥8,999 │ ¥17,998 │ × │    │
│  │ AirPods Pro   │ USB-C │ 1 │ ¥1,999 │  ¥1,999 │ × │    │
│  └──────────────────────────────────────────────────┘    │
│  + 添加商品                                               │
└──────────────────────────────────────────────────────────┘
```

- Uses the same section card container as field tabs
- Uses the existing O2M inline grid pattern (column headers + data rows + add button) —
  unchanged from current `generation-rules.md` O2M pattern
- View mode: same grid layout minus delete column, inputs replaced with read-only text
- M2M follows the same structure; specific rendering (transfer, checkbox list, table)
  depends on the M2M field type
- Multiple O2M/M2M: each relationship gets its own tab — never combined into a shared tab

## Mobile Adaptation (< 768px)

Tabs collapse entirely. No tab bar, no dropdown — all sections render as a flat vertical
stack of section cards, matching the current non-tab mobile layout.

```
Desktop (≥768px):                          Mobile (<768px):
┌─ Tab Bar ────────────────────────┐       ┌─ Section Card: 基本信息 ────┐
│ [基本信息] [配送] [商品清单 (3)]   │       │  [field] [field]             │
└──────────────────────────────────┘       └──────────────────────────────┘
┌─ Tab Pane (active only) ────────┐       ┌─ Section Card: 配送 & 备注 ──┐
│  ┌─ Section Card ─────────┐     │       │  [field] [field]             │
│  │  ...fields...           │     │       └──────────────────────────────┘
│  └─────────────────────────┘     │       ┌─ Section Card: 商品清单 ─────┐
└──────────────────────────────────┘       │  (compact card per item)      │
                                           └──────────────────────────────┘
```

Implementation:
- Tab bar: `hidden md:flex`
- Tab panes: `hidden md:block` for active pane, `md:hidden` for flat rendering of all sections
- Desktop shows one active pane at a time; mobile shows all sections stacked with `gap-4`
- O2M items on mobile: use existing compact card layout (`hidden md:grid` / `md:hidden`)
- Section card padding on mobile: `p-4` (from `p-5 md:p-6`)

## Component Structure

```vue
<template>
  <div class="admin-form-page">
    <!-- Toolbar (unchanged) -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <el-breadcrumb separator="/">...</el-breadcrumb>
      <div class="flex items-center gap-3">
        <!-- submit/cancel or edit/delete per mode -->
      </div>
    </div>

    <!-- Tab Bar (desktop only, when hasMultipleTabs) -->
    <el-tabs
      v-if="hasMultipleTabs"
      v-model="activeTab"
      class="hidden md:block mb-4"
      @tab-change="handleTabChange"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.key"
        :label="tab.label"
        :name="tab.key"
      >
        <template #label>
          {{ tab.label }}
          <el-badge
            v-if="tab.count !== undefined"
            :value="tab.count"
            :hidden="tab.count === 0"
            :type="tab.hasError ? 'danger' : undefined"
          />
          <el-icon v-if="tab.hasError" class="ml-1" color="var(--danger-600)">
            <WarningFilled />
          </el-icon>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!-- Form Content -->
    <el-form
      ref="formRef"
      :model="form"
      :rules="isView ? {} : rules"
      label-position="top"
      @submit.prevent="isView ? undefined : handleSubmit()"
    >
      <!-- Desktop: show active tab pane only -->
      <div v-if="hasMultipleTabs" class="hidden md:flex flex-col gap-4">
        <template v-for="tab in tabs" :key="tab.key">
          <template v-if="activeTab === tab.key">
            <slot :name="tab.key" />
          </template>
        </template>
      </div>

      <!-- Desktop (simple): section cards only, no tabs -->
      <!-- Mobile: always flat section cards, regardless of tab count -->
      <div
        :class="hasMultipleTabs ? 'md:hidden flex flex-col gap-4' : 'flex flex-col gap-4'"
      >
        <slot :name="'all-sections'" />
      </div>
    </el-form>
  </div>
</template>
```

```typescript
interface TabDefinition {
  key: string           // unique tab key, e.g., 'basic', 'items', 'attachments'
  label: string         // display label, e.g., '基本信息', '商品清单'
  count?: number        // O2M/M2M item count for badge (undefined = no badge)
  hasError?: boolean    // set to true when hidden tab has validation errors
}

const activeTab = ref<string>(tabs[0]?.key ?? 'basic')
const hasMultipleTabs = computed(() => tabs.length >= 2)
```

## Data Flow

1. Page loads → mode detected (create/view/edit) → data fetched (view/edit) or defaults set (create)
2. `tabs` array computed from form schema — which tabs exist, which have O2M counts
3. User fills fields across tabs freely — all form data stays in a single reactive `form` object
4. Tab switch → only visual; form data unchanged
5. Submit → validate all fields (across all tabs) → if errors, switch to first error tab + mark tab red
6. Success → toast + navigate; failure → restore buttons + show per-field errors

## File Changes

### Skill Files
- `.claude/skills/vue3-element-ui-ux/references/generation-rules.md` — add Tabbed Form
  section under Admin Form Page, covering tab bar structure, O2M tab treatment, mobile
  collapse, validation error tabs, and the decision matrix for when tabs apply
- `.claude/skills/vue3-element-ui-ux/references/interaction-rules.md` — add tab
  interaction rules (free switch, no validation on switch, error tab indication,
  mobile flat rendering)
- `.claude/skills/vue3-element-ui-ux/references/review-checklist.md` — add tabbed form
  check items (tab bar placement, badge, error indication, mobile collapse)
- `.claude/skills/vue3-element-ui-ux/references/component-system.md` — add `TabbedForm`
  and `FormTab` to component mapping table
- `.claude/skills/vue3-element-ui-ux/references/design-tokens.md` — add purple accent
  color for O2M/M2M section cards

### Demo App
- No existing form has enough sections to trigger tabs. A new demo form page should be
  created to exercise the tab pattern — or the OrderFormView can be extended with an
  "attachments" M2M section as a second relationship to trigger the tab layout.

## Design Decisions

1. **Tabs compose with section cards, don't replace them** — preserves existing design
   language and allows sub-grouping within tabs.
2. **O2M as section card when simple, tab when complex** — avoids forcing tabs on small
   forms; lets the existing OrderFormView pattern stay valid.
3. **Mobile: flat sections, no tabs** — horizontal tabs don't scale on small screens;
   vertical stacking is simpler and more usable.
4. **Single submit validates all tabs** — keeps the form transactional; cross-tab
   validation errors auto-switch to the error tab.
5. **Purple accent for relationship tabs** — visually distinguishes "this is a list of
   related things" from "these are fields of this entity".
6. **Badge on O2M tabs** — gives at-a-glance item count without needing to switch tabs.
7. **Tab state is local, not in URL** — tabs are a layout concern, not navigation;
   deep-linking to a specific tab is not a requirement for admin forms.

## Spec Self-Review

- **Placeholders:** None
- **Consistency:** Tab bar placement matches toolbar pattern; section cards inside tabs
  preserve existing accent stripe system; purple accent follows existing color token
  approach; mobile flat rendering matches current mobile section card behavior
- **Scope:** Focused on form layout pattern — skill reference files + one new/existing
  demo form. Does not change business logic, API contracts, or database structure.
- **Ambiguity:** Decision matrix is explicit (when tabs vs no tabs). Tab interaction
  rules are explicit (free switch, no validation, error indication). Mobile behavior is
  explicit (flat sections, no tabs/dropdown).
