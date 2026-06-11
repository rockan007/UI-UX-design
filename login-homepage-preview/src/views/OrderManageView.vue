<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, Edit, Delete, View } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { TableColumnCtx } from 'element-plus'

const { t } = useI18n()

// ── Types ───────────────────────────────────────────
type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed' | 'refunded' | 'cancelled'

interface Order {
  id: string
  customer: string
  phone: string
  items: string[]
  total: number
  status: OrderStatus
  channel: string
  createdAt: string
}

// ── Mock Data ───────────────────────────────────────
const mockOrders: Order[] = [
  { id: 'ORD-20260601-001', customer: '张三', phone: '138****1234', items: ['iPhone 16 Pro Max', 'AirPods Pro'], total: 10998, status: 'completed', channel: 'APP', createdAt: '2026-06-01 09:23' },
  { id: 'ORD-20260601-002', customer: '李四', phone: '139****5678', items: ['MacBook Air 15"'], total: 9499, status: 'shipped', channel: '网页', createdAt: '2026-06-01 10:15' },
  { id: 'ORD-20260602-003', customer: '王五', phone: '150****9012', items: ['iPad Pro', 'Apple Pencil', '妙控键盘'], total: 13897, status: 'paid', channel: '小程序', createdAt: '2026-06-02 14:30' },
  { id: 'ORD-20260603-004', customer: '赵六', phone: '186****3456', items: ['Apple Watch Ultra 2'], total: 6499, status: 'pending', channel: '网页', createdAt: '2026-06-03 08:45' },
  { id: 'ORD-20260603-005', customer: '陈小雅', phone: '177****7890', items: ['Magic Mouse', 'Magic Keyboard'], total: 1698, status: 'refunded', channel: 'APP', createdAt: '2026-06-03 16:02' },
  { id: 'ORD-20260604-006', customer: '刘建国', phone: '133****1122', items: ['HomePod mini', 'AirTag 4 件装'], total: 1347, status: 'completed', channel: '小程序', createdAt: '2026-06-04 11:20' },
  { id: 'ORD-20260604-007', customer: '周明', phone: '155****3344', items: ['Mac mini M4 Pro'], total: 10999, status: 'paid', channel: '网页', createdAt: '2026-06-04 13:05' },
  { id: 'ORD-20260605-008', customer: '吴芳', phone: '188****5566', items: ['iPhone 16', 'MagSafe 充电器'], total: 7298, status: 'shipped', channel: 'APP', createdAt: '2026-06-05 09:50' },
  { id: 'ORD-20260605-009', customer: '郑伟', phone: '166****7788', items: ['Studio Display'], total: 11499, status: 'cancelled', channel: '网页', createdAt: '2026-06-05 15:33' },
  { id: 'ORD-20260606-010', customer: '冯丽', phone: '199****9900', items: ['AirPods Max', 'USB-C 充电线'], total: 4198, status: 'pending', channel: 'APP', createdAt: '2026-06-06 10:12' },
  { id: 'ORD-20260607-011', customer: '孙浩然', phone: '131****2233', items: ['iPhone 16 Pro'], total: 7999, status: 'paid', channel: '小程序', createdAt: '2026-06-07 17:40' },
  { id: 'ORD-20260607-012', customer: '褚思远', phone: '158****4455', items: ['MacBook Pro 16"', 'AppleCare+'], total: 23498, status: 'completed', channel: 'APP', createdAt: '2026-06-07 20:05' },
  { id: 'ORD-20260608-013', customer: '马丽娜', phone: '176****6677', items: ['iPad mini', '保护壳'], total: 4298, status: 'pending', channel: '网页', createdAt: '2026-06-08 07:38' },
  { id: 'ORD-20260608-014', customer: '韩冰', phone: '135****8899', items: ['Apple Watch SE', '表带'], total: 2598, status: 'shipped', channel: 'APP', createdAt: '2026-06-08 08:55' },
  { id: 'ORD-20260608-015', customer: '朱晓东', phone: '189****0011', items: ['Vision Pro'], total: 29999, status: 'paid', channel: '小程序', createdAt: '2026-06-08 09:20' },
]

// ── Status Config ───────────────────────────────────
const statusMap: Record<string, { labelKey: string; type: string }> = {
  pending:    { labelKey: 'orders.status.pending', type: 'warning' },
  paid:       { labelKey: 'orders.status.paid', type: '' },
  shipped:    { labelKey: 'orders.status.shipped', type: 'info' },
  completed:  { labelKey: 'orders.status.completed', type: 'success' },
  refunded:   { labelKey: 'orders.status.refunded', type: 'danger' },
  cancelled:  { labelKey: 'orders.status.cancelled', type: 'info' },
}

// ── State ───────────────────────────────────────────
const searchKeyword = ref('')
const statusFilter = ref<'all' | OrderStatus>('all')
const channelFilter = ref<'all' | 'APP' | '网页' | '小程序'>('all')
const currentPage = ref(1)
const pageSize = ref(8)

// ── Computed ────────────────────────────────────────
const filteredOrders = computed(() => {
  let list = mockOrders
  if (searchKeyword.value.trim()) {
    const kw = searchKeyword.value.trim().toLowerCase()
    list = list.filter(o => o.id.toLowerCase().includes(kw) || o.customer.includes(kw) || o.phone.includes(kw) || o.items.some(i => i.includes(kw)))
  }
  if (statusFilter.value !== 'all') {
    list = list.filter(o => o.status === statusFilter.value)
  }
  if (channelFilter.value !== 'all') {
    list = list.filter(o => o.channel === channelFilter.value)
  }
  return list
})

const pagedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredOrders.value.slice(start, start + pageSize.value)
})

const total = computed(() => filteredOrders.value.length)

// Summary stats
const summary = computed(() => {
  const totalRevenue = mockOrders
    .filter(o => o.status === 'completed' || o.status === 'shipped')
    .reduce((sum, o) => sum + o.total, 0)
  const pendingCount = mockOrders.filter(o => o.status === 'pending').length
  return { totalRevenue, pendingCount, totalOrders: mockOrders.length }
})

// ── Methods ─────────────────────────────────────────
const handleSearch = () => { currentPage.value = 1 }
const handleFilterChange = () => { currentPage.value = 1 }

const handleView = (row: Order) => {
  ElMessage.info(t('orders.viewDetail', { id: row.id }))
}
const handleEdit = (row: Order) => {
  ElMessage.info(t('orders.processOrder', { id: row.id }))
}
const handleDelete = (row: Order) => {
  ElMessageBox.confirm(
    t('orders.deleteConfirm', { id: row.id }),
    t('orders.deleteTitle'),
    { confirmButtonText: t('orders.deleteConfirmBtn'), cancelButtonText: t('common.cancel'), type: 'warning' },
  )
    .then(() => ElMessage.success(t('orders.deletedMessage', { id: row.id })))
    .catch(() => { /* cancelled */ })
}

const cellStyle = ({ column }: { column: TableColumnCtx<Order> }) => {
  return column.property === 'status'
    ? { textAlign: 'center' as const }
    : {}
}
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">{{ t('orders.title') }}</h1>
      <p class="text-sm text-neutral-500 mt-1">{{ t('orders.description') }}</p>
    </div>

    <!-- Summary Cards -->
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

    <!-- Filter Bar -->
    <div class="bg-white rounded-btn border border-neutral-200 p-4 mb-4">
      <div class="flex flex-wrap items-center gap-3">
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
          <el-option label="网页" value="网页" />
          <el-option label="小程序" value="小程序" />
        </el-select>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-btn border border-neutral-200">
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
              <el-tag
                v-for="(item, i) in row.items.slice(0, 2)"
                :key="i"
                size="small"
                effect="plain"
                type="info"
              >
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
            <el-tag
              :type="statusMap[row.status].type"
              size="small"
              effect="light"
            >
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
              <el-tooltip
                v-if="row.status === 'pending' || row.status === 'paid'"
                :content="t('common.edit')"
                placement="top"
                :show-after="300"
                :hide-after="0"
              >
                <el-button link size="small" :icon="Edit" @click="handleEdit(row)" />
              </el-tooltip>
              <el-tooltip :content="t('common.delete')" placement="top" :show-after="300" :hide-after="0">
                <el-button type="danger" link size="small" :icon="Delete" @click="handleDelete(row)" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="flex justify-end px-4 py-3 border-t border-neutral-100">
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
  </div>
</template>
