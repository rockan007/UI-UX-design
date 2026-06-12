# Admin Mobile Card List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace admin list page tables with card lists on mobile (< 768px), add filter drawer, simplify pagination, and fix summary card overflow.

**Architecture:** OrderManageView.vue gets a `v-if` mobile/desktop split — `el-table` on desktop, card list on mobile. Filter dropdowns move into a bottom `el-drawer`. Pagination simplifies via `hidden md:flex`/`flex md:hidden`. Skill reference files are updated with the new mobile patterns.

**Tech Stack:** Vue 3 + Element Plus + Tailwind CSS, `@element-plus/icons-vue`

---

### Task 1: Fix summary cards and filter bar responsiveness in OrderManageView.vue

**Files:**
- Modify: `login-homepage-preview/src/views/OrderManageView.vue`

- [ ] **Step 1: Replace summary cards grid classes**

Find the summary cards grid (lines 128-141):

```html
    <div class="grid grid-cols-3 gap-4 mb-4">
      <div class="bg-white rounded-btn border border-neutral-200 p-4">
        <div class="text-sm text-neutral-500 mb-1">{{ t('orders.totalOrders') }}</div>
        <div class="text-2xl font-bold text-neutral-950">{{ summary.totalOrders }}</div>
      </div>
      <div class="bg-white rounded-btn border border-neutral-200 p-4">
        <div class="text-sm text-neutral-500 mb-1">{{ t('orders.pendingOrders') }}</div>
        <div class="text-2xl font-bold text-warning-600" style="color: #d97706">{{ summary.pendingCount }}</div>
      </div>
      <div class="bg-white rounded-btn border border-neutral-200 p-4">
        <div class="text-sm text-neutral-500 mb-1">{{ t('orders.completedRevenue') }}</div>
        <div class="text-2xl font-bold text-green-600">{{ $n(summary.totalRevenue, 'currency') }}</div>
      </div>
    </div>
```

Replace with:

```html
    <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-4">
      <div class="bg-white rounded-btn border border-neutral-200 p-2.5 md:p-4">
        <div class="text-[10px] md:text-sm text-neutral-500 mb-0.5 md:mb-1">{{ t('orders.totalOrders') }}</div>
        <div class="text-base md:text-2xl font-bold text-neutral-950">{{ summary.totalOrders }}</div>
      </div>
      <div class="bg-white rounded-btn border border-neutral-200 p-2.5 md:p-4">
        <div class="text-[10px] md:text-sm text-neutral-500 mb-0.5 md:mb-1">{{ t('orders.pendingOrders') }}</div>
        <div class="text-base md:text-2xl font-bold" style="color: #d97706">{{ summary.pendingCount }}</div>
      </div>
      <div class="bg-white rounded-btn border border-neutral-200 p-2.5 md:p-4">
        <div class="text-[10px] md:text-sm text-neutral-500 mb-0.5 md:mb-1">{{ t('orders.completedRevenue') }}</div>
        <div class="text-base md:text-2xl font-bold text-green-600">{{ $n(summary.totalRevenue, 'currency') }}</div>
      </div>
    </div>
```

- [ ] **Step 2: Add missing i18n keys to locale files**

Add to `login-homepage-preview/src/locales/zh.json` in the `common` section:

```json
"filter": "筛选",
"apply": "应用",
"prev": "上一页",
"next": "下一页"
```

The zh.json `common` section becomes:

```json
"common": {
    "save": "保存",
    "cancel": "取消",
    "delete": "删除",
    "edit": "编辑",
    "view": "查看",
    "search": "搜索",
    "reset": "重置",
    "filter": "筛选",
    "apply": "应用",
    "confirm": "确认",
    "back": "返回",
    "submit": "提交",
    "all": "全部",
    "prev": "上一页",
    "next": "下一页",
    "yes": "是",
    "no": "否"
  }
```

Add to `login-homepage-preview/src/locales/en.json` in the `common` section:

```json
"filter": "Filter",
"apply": "Apply",
"prev": "Prev",
"next": "Next"
```

- [ ] **Step 3: Replace filter bar — desktop inline, mobile drawer trigger**

Find the filter bar (lines 144-176). Replace with:

```html
    <!-- Filter Bar: Desktop inline -->
    <div class="hidden md:flex flex-wrap items-center gap-3 bg-white rounded-btn border border-neutral-200 p-4 mb-4">
      <el-input
        v-model="searchKeyword"
        :placeholder="t('orders.searchPlaceholder')"
        :prefix-icon="Search"
        clearable
        class="w-64"
        @input="handleSearch"
        @clear="handleSearch"
      />
      <el-select
        v-model="statusFilter"
        :placeholder="t('orders.filterByStatus')"
        class="w-28"
        @change="handleFilterChange"
      >
        <el-option :label="t('common.all')" value="all" />
        <el-option v-for="(cfg, key) in statusMap" :key="key" :label="t(cfg.labelKey)" :value="key" />
      </el-select>
      <el-select
        v-model="channelFilter"
        :placeholder="t('orders.filterByChannel')"
        class="w-28"
        @change="handleFilterChange"
      >
        <el-option :label="t('common.all')" value="all" />
        <el-option label="APP" value="APP" />
        <el-option :label="t('orders.channel.web')" value="网页" />
        <el-option :label="t('orders.channel.miniprogram')" value="小程序" />
      </el-select>
    </div>

    <!-- Filter Bar: Mobile search + drawer trigger -->
    <div class="flex md:hidden items-center gap-2 mb-3">
      <el-input
        v-model="searchKeyword"
        :placeholder="t('orders.searchPlaceholder')"
        :prefix-icon="Search"
        clearable
        class="flex-1"
        size="default"
        @input="handleSearch"
        @clear="handleSearch"
      />
      <el-button @click="filterDrawerVisible = true">
        <el-icon class="mr-1"><Operation /></el-icon>
        {{ t('common.filter') }}
      </el-button>
    </div>

    <!-- Filter Drawer (mobile) -->
    <el-drawer
      v-model="filterDrawerVisible"
      :title="t('common.filter')"
      direction="btt"
      size="auto"
      :with-header="true"
    >
      <div class="flex flex-col gap-4 px-2">
        <div>
          <div class="text-sm font-medium text-neutral-950 mb-2">{{ t('orders.filterByStatus') }}</div>
          <el-select v-model="statusFilter" class="w-full" @change="handleFilterChange">
            <el-option :label="t('common.all')" value="all" />
            <el-option v-for="(cfg, key) in statusMap" :key="key" :label="t(cfg.labelKey)" :value="key" />
          </el-select>
        </div>
        <div>
          <div class="text-sm font-medium text-neutral-950 mb-2">{{ t('orders.filterByChannel') }}</div>
          <el-select v-model="channelFilter" class="w-full" @change="handleFilterChange">
            <el-option :label="t('common.all')" value="all" />
            <el-option label="APP" value="APP" />
            <el-option :label="t('orders.channel.web')" value="网页" />
            <el-option :label="t('orders.channel.miniprogram')" value="小程序" />
          </el-select>
        </div>
        <div class="flex gap-3 mt-4">
          <el-button class="flex-1" @click="statusFilter = 'all'; channelFilter = 'all'; handleFilterChange()">
            {{ t('common.reset') }}
          </el-button>
          <el-button type="primary" class="flex-1" @click="filterDrawerVisible = false">
            {{ t('common.apply') }}
          </el-button>
        </div>
      </div>
    </el-drawer>
```

- [ ] **Step 4: Add filter drawer state and Operation icon import in script**

Add after line 57 (after `const pageSize = ref(8)`):

```typescript
const filterDrawerVisible = ref(false)
```

Add `Operation` to the icon imports on line 4:

```typescript
import { Search, Edit, Delete, View, Operation } from '@element-plus/icons-vue'
```

- [ ] **Step 5: Commit**

```bash
git add login-homepage-preview/src/views/OrderManageView.vue
git commit -m "fix(demo): responsive summary cards, filter drawer on mobile for orders page"
```

---

### Task 2: Add mobile card list replacing el-table in OrderManageView.vue

**Files:**
- Modify: `login-homepage-preview/src/views/OrderManageView.vue`

- [ ] **Step 1: Replace the data table section — desktop table + mobile card list**

Find the Data Table section (lines 179-264, from `<!-- Data Table -->` through the closing `</div>` of the table container). Replace with:

```html
    <!-- Data Table: Desktop -->
    <div class="hidden md:block bg-white rounded-btn border border-neutral-200">
      <el-table
        :data="pagedOrders"
        :cell-style="cellStyle"
        style="width: 100%"
        :empty-text="t('orders.empty')"
        row-key="id"
        stripe
      >
        <el-table-column prop="id" :label="t('orders.columns.orderNo')" width="200" />
        <el-table-column prop="customer" :label="t('orders.columns.customer')" width="100" />
        <el-table-column prop="items" :label="t('orders.columns.items')" min-width="180">
          <template #default="{ row }">
            <div class="flex flex-wrap gap-1">
              <el-tag v-for="(item, i) in row.items.slice(0, 2)" :key="i" size="small" effect="plain" type="info">
                {{ item }}
              </el-tag>
              <el-tag v-if="row.items.length > 2" size="small" effect="plain" type="info">
                +{{ row.items.length - 2 }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="total" :label="t('orders.columns.amount')" width="120" sortable>
          <template #default="{ row }">
            <span class="font-semibold text-neutral-950">{{ $n(row.total, 'currency') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="t('orders.columns.status')" width="110">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status].type" size="small" effect="light">
              {{ t(statusMap[row.status].labelKey) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="channel" :label="t('orders.columns.channel')" width="80">
          <template #default="{ row }">
            <span class="text-sm text-neutral-500">{{ row.channel }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" :label="t('orders.columns.createdAt')" width="150" sortable />
        <el-table-column :label="t('orders.columns.actions')" width="130" fixed="right">
          <template #default="{ row }">
            <div class="flex items-center gap-2">
              <el-tooltip :content="t('common.view')" placement="top" :show-after="300" :hide-after="0">
                <el-button type="primary" link size="small" :icon="View" @click="handleView(row)" />
              </el-tooltip>
              <el-tooltip v-if="row.status === 'pending' || row.status === 'paid'" :content="t('common.edit')" placement="top" :show-after="300" :hide-after="0">
                <el-button link size="small" :icon="Edit" @click="handleEdit(row)" />
              </el-tooltip>
              <el-tooltip :content="t('common.delete')" placement="top" :show-after="300" :hide-after="0">
                <el-button type="danger" link size="small" :icon="Delete" @click="handleDelete(row)" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination: Desktop -->
      <div class="hidden md:flex justify-end px-4 py-3 border-t border-neutral-100">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[5, 8, 10, 20]"
          layout="total, sizes, prev, pager, next"
          background
        />
      </div>
    </div>

    <!-- Card List: Mobile -->
    <div class="md:hidden flex flex-col gap-2 mb-3">
      <div v-if="pagedOrders.length === 0" class="bg-white rounded-btn border border-neutral-200 p-8 text-center text-sm text-neutral-500">
        {{ t('orders.empty') }}
      </div>
      <div
        v-for="order in pagedOrders"
        :key="order.id"
        class="bg-white rounded-btn border border-neutral-200 p-3"
      >
        <!-- Layer 1: ID + Status -->
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-brand-600">{{ order.id }}</span>
          <el-tag :type="statusMap[order.status].type" size="small" effect="light">
            {{ t(statusMap[order.status].labelKey) }}
          </el-tag>
        </div>
        <!-- Layer 2: Customer + Amount -->
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-neutral-700">{{ order.customer }} · {{ order.phone }}</span>
          <span class="text-sm font-semibold text-neutral-950">{{ $n(order.total, 'currency') }}</span>
        </div>
        <!-- Layer 3: Item tags -->
        <div class="flex flex-wrap gap-1 mb-2">
          <el-tag v-for="(item, i) in order.items.slice(0, 2)" :key="i" size="small" effect="plain" type="info">
            {{ item }}
          </el-tag>
          <el-tag v-if="order.items.length > 2" size="small" effect="plain" type="info">
            +{{ order.items.length - 2 }}
          </el-tag>
        </div>
        <!-- Layer 4: Channel + Time + Actions -->
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-neutral-400">{{ order.channel }} · {{ order.createdAt }}</span>
          <el-dropdown trigger="click" @command="(cmd: string) => handleCardAction(cmd, order)">
            <el-button link size="small" class="text-neutral-500" @click.stop>
              <el-icon :size="18"><MoreFilled /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="'view'">
                  <el-icon :size="14" class="mr-1"><View /></el-icon>
                  {{ t('common.view') }}
                </el-dropdown-item>
                <el-dropdown-item v-if="order.status === 'pending' || order.status === 'paid'" :command="'edit'">
                  <el-icon :size="14" class="mr-1"><Edit /></el-icon>
                  {{ t('common.edit') }}
                </el-dropdown-item>
                <el-dropdown-item :command="'delete'" divided>
                  <el-icon :size="14" class="mr-1" color="#dc2626"><Delete /></el-icon>
                  <span class="text-red-600">{{ t('common.delete') }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!-- Pagination: Mobile -->
    <div class="flex md:hidden items-center justify-center gap-3 mb-4">
      <el-button
        size="small"
        :disabled="currentPage <= 1"
        @click="currentPage--"
      >
        ‹ {{ t('common.prev') }}
      </el-button>
      <span class="text-sm text-neutral-500">{{ currentPage }} / {{ Math.ceil(total / pageSize) || 1 }}</span>
      <el-button
        size="small"
        :disabled="currentPage >= Math.ceil(total / pageSize)"
        @click="currentPage++"
      >
        {{ t('common.next') }} ›
      </el-button>
    </div>
```

- [ ] **Step 2: Add card action handler and MoreFilled icon in script**

Add `MoreFilled` to icon imports on line 4:

```typescript
import { Search, Edit, Delete, View, Operation, MoreFilled } from '@element-plus/icons-vue'
```

Add the card action handler after the `handleDelete` function (after line 110):

```typescript
const handleCardAction = (cmd: string, row: Order) => {
  if (cmd === 'view') handleView(row)
  else if (cmd === 'edit') handleEdit(row)
  else if (cmd === 'delete') handleDelete(row)
}
```

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/views/OrderManageView.vue
git commit -m "feat(demo): mobile card list replacing table on orders page"
```

---

### Task 3: Update generation-rules.md — Add admin list page mobile supplement

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md`

- [ ] **Step 1: Add Admin List Page mobile supplement**

Insert before the `### Detail Page` section at the end of the file. Find:

```markdown
### Detail Page

Extra focus: key info above the fold, visible status and primary action, clear detail groupings, secondary info (history, logs, notes) not competing with primary, easy return to list.
```

Replace with:

```markdown
### Admin List Page — Mobile Card List

At `< 768px`, admin list pages switch from `el-table` to a card list. Desktop (≥ 768px) keeps the table.

**Summary Cards (mobile):**
- Grid: `grid-cols-2 md:grid-cols-3 gap-2 md:gap-4`
- Padding: `p-2.5 md:p-4`
- Label: `text-[10px] md:text-sm`
- Value: `text-base md:text-2xl`

**Filter Bar (mobile):**
- Search input always visible, takes `flex-1`
- "Filter" button next to search triggers a bottom `el-drawer` (`direction="btt"`, `size="auto"`)
- Drawer contains all filter dropdowns stacked vertically with "Apply" / "Reset" buttons
- Desktop: current inline filter bar unchanged

**Card Structure:**

Each card has 4 layers:

```html
<div class="bg-white rounded-btn border border-neutral-200 p-3">
  <!-- Layer 1: Primary ID + Status -->
  <div class="flex items-center justify-between mb-2">
    <span class="text-xs font-semibold text-brand-600">{{ row.id }}</span>
    <el-tag :type="statusType" size="small" effect="light">{{ statusLabel }}</el-tag>
  </div>
  <!-- Layer 2: Person/Entity + Amount -->
  <div class="flex items-center justify-between mb-2">
    <span class="text-sm text-neutral-700">{{ row.customer }} · {{ row.phone }}</span>
    <span class="text-sm font-semibold text-neutral-950">{{ formattedAmount }}</span>
  </div>
  <!-- Layer 3: Attribute tags -->
  <div class="flex flex-wrap gap-1 mb-2">
    <el-tag v-for="(item, i) in row.items.slice(0, 2)" :key="i" size="small" effect="plain" type="info">
      {{ item }}
    </el-tag>
    <el-tag v-if="row.items.length > 2" size="small" effect="plain" type="info">+{{ row.items.length - 2 }}</el-tag>
  </div>
  <!-- Layer 4: Meta info + Actions -->
  <div class="flex items-center justify-between">
    <span class="text-[10px] text-neutral-400">{{ row.channel }} · {{ row.createdAt }}</span>
    <el-dropdown trigger="click" @command="handleCardAction">
      <el-button link size="small" class="text-neutral-500" @click.stop>
        <el-icon :size="18"><MoreFilled /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="view">View</el-dropdown-item>
          <el-dropdown-item command="edit">Edit</el-dropdown-item>
          <el-dropdown-item command="delete" divided>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</div>
```

**Card Action Handler:**

```typescript
const handleCardAction = (cmd: string, row: RowType) => {
  if (cmd === 'view') handleView(row)
  else if (cmd === 'edit') handleEdit(row)
  else if (cmd === 'delete') handleDelete(row)
}
```

Uses `@click.stop` on the dropdown trigger to prevent card-level click propagation. Uses `MoreFilled` from `@element-plus/icons-vue` for the three-dot icon.

**Pagination (mobile):**

```html
<div class="flex md:hidden items-center justify-center gap-3 mb-4">
  <el-button size="small" :disabled="currentPage <= 1" @click="currentPage--">
    ‹ {{ t('common.prev') }}
  </el-button>
  <span class="text-sm text-neutral-500">{{ currentPage }} / {{ totalPages || 1 }}</span>
  <el-button size="small" :disabled="currentPage >= totalPages" @click="currentPage++">
    {{ t('common.next') }} ›
  </el-button>
</div>
```

Desktop pagination (inside the table container, `hidden md:flex`) keeps the full `el-pagination`.

**Visibility control:** Use `hidden md:block` / `hidden md:flex` for desktop-only elements, and `md:hidden` for mobile-only elements.

### Detail Page

Extra focus: key info above the fold, visible status and primary action, clear detail groupings, secondary info (history, logs, notes) not competing with primary, easy return to list.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "feat(skill): add admin list page mobile card list generation supplement"
```

---

### Task 4: Update component-system.md — Add CardList, FilterDrawer mappings

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/component-system.md`

- [ ] **Step 1: Add mobile components to Admin Components list**

Find the Admin Components line:

```
`AdminShell` (`AdminLayout` + `AdminHeader` + `AdminSidebar`), `TopBar`, `Breadcrumbs`, `MetricGrid`, `ZoneContainer`, `DataTable`, `FilterBar`, `BulkActionBar`, `DetailPanel`, `AuditTimeline`, `PermissionNotice`
```

Replace with:

```
`AdminShell` (`AdminLayout` + `AdminHeader` + `AdminSidebar`), `TopBar`, `Breadcrumbs`, `MetricGrid`, `ZoneContainer`, `DataTable`, `FilterBar`, `FilterDrawer`, `BulkActionBar`, `DetailPanel`, `AuditTimeline`, `PermissionNotice`
```

- [ ] **Step 2: Add component mappings to Composite Components table**

After the `FilterBar` row in the composite table:

```
| `FilterBar` | `FilterBar` | Filter controls, reset |
```

Add:

```
| `FilterDrawer` | `FilterDrawer` | Mobile filter drawer (`el-drawer` direction btt), search input + filter button trigger, stacked filter controls + Apply/Reset |
| `CardList` | `CardList` | Mobile card list replacing `el-table` at < 768px, 4-layer card structure per row |
```

- [ ] **Step 3: Add mobile list layout to Layout Mapping table**

After the `admin-list` row:

```
| `admin-list` | `AdminLayout + PageHeader + FilterBar + DataTable` |
```

Add:

```
| `admin-list-mobile` | `AdminLayout + PageHeader + FilterDrawer + CardList` (mobile: < 768px) |
```

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/component-system.md
git commit -m "feat(skill): add CardList, FilterDrawer mobile component mappings"
```

---

### Task 5: Update design-principles.md — Add mobile card list principle

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/design-principles.md`

- [ ] **Step 1: Add mobile card list rule after Admin Goals section**

Find the Admin Goals "Don't" list ending (after the container variety rule). Insert before `## Admin Shell Layout`:

```markdown
## Mobile List Pages

At viewports below 768px, admin list pages switch from table to card list layout. Desktop table layout remains unchanged above 768px.

- Each table row becomes a stacked card with 4 layers: primary ID + status, person/entity + amount, attribute tags, meta info + actions.
- Search input stays visible. Other filters move into a bottom drawer (`el-drawer` direction btt).
- Pagination simplifies to prev/next buttons with page indicator.
- Summary cards use `grid-cols-2` on mobile with compact padding and smaller type.
- Action buttons move into a three-dot dropdown (`el-dropdown` with `MoreFilled` icon) to save horizontal space.
- Use `hidden md:block`/`hidden md:flex` for desktop elements, `md:hidden` for mobile elements. Do not use `v-if` with window width — CSS breakpoints are sufficient.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/design-principles.md
git commit -m "feat(skill): add mobile card list principle for admin list pages"
```

---

### Task 6: Update review-checklist.md — Add mobile card list checks

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`

- [ ] **Step 1: Add mobile list checks to Responsive section (section 7)**

After the existing responsive check items (after `- [ ] Collapsed sidebar has overflow-x: hidden...`), add:

```markdown
- [ ] **Mobile card list:** Admin list pages switch from `el-table` to card list below 768px. Each card shows 4 layers: primary ID + status, person + amount, tags, meta + actions.
- [ ] **Filter drawer:** Search input visible on mobile; other filters in bottom drawer with Apply/Reset buttons.
- [ ] **Mobile pagination:** Simplified prev/next with page indicator (`1 / N`), no page-size selector or total count.
- [ ] **Summary cards responsive:** `grid-cols-2 md:grid-cols-3`, `p-2.5 md:p-4`, compact type on mobile.
- [ ] **Action menu:** Card actions in `el-dropdown` with `MoreFilled` icon, `@click.stop` on trigger.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "feat(skill): add mobile card list review checklist items"
```

---

### Task 7: Verify OrderManageView on mobile and desktop

**Files:**
- No file changes — verification only

- [ ] **Step 1: Start the dev server and navigate to orders page**

```bash
cd login-homepage-preview && npm run dev
```

Navigate to `http://localhost:<port>/admin/orders`

- [ ] **Step 2: Verify at 390px (mobile)**
  - Summary cards: 2 columns, no content overflow
  - Filter: search input + "筛选" button visible
  - Filter drawer: opens from bottom, contains status + channel dropdowns + Apply/Reset
  - Card list: shows order cards with 4-layer structure
  - Action menu: three-dot menu opens dropdown with view/edit/delete
  - Pagination: `‹ Prev` `1 / N` `Next ›` centered

- [ ] **Step 3: Verify at 1440px (desktop)**
  - Summary cards: 3 columns
  - Filter bar: inline search + status + channel dropdowns
  - Table: standard `el-table` with all columns
  - Pagination: full `el-pagination` with total, sizes, pager

- [ ] **Step 4: Verify breakpoint transition**
  - Resize from 1440px down to 390px; at 768px the switch should happen
  - Resize from 390px up to 1440px; at 768px table returns

- [ ] **Step 5: Check console errors**

```bash
# In Playwright: browser_console_messages with level error
```

Expected: 0 errors.

- [ ] **Step 6: Commit any fixes if needed**

```bash
git add login-homepage-preview/src/views/OrderManageView.vue
git commit -m "fix(demo): mobile card list adjustments after visual review"
```

If no fixes needed, skip this commit.

---

### Task 8: Push changes

- [ ] **Step 1: Push the feature branch**

```bash
git push origin feature/admin-container-variety
```

- [ ] **Step 2: Push meta-skill subtree if modified**

Check if meta-skill files were modified in this session:

```bash
git log --oneline --name-only -5 | grep ui-ux-agent-designer
```

If yes:
```bash
git subtree push --prefix=.claude/skills/ui-ux-agent-designer skill main
```
