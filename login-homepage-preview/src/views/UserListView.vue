<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, Edit, Delete, MoreFilled, Plus, Operation } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()

// ── Types ───────────────────────────────────────────
type UserStatus = 'enabled' | 'disabled'
type UserRole = 'admin' | 'editor' | 'viewer'

interface User {
  id: string
  username: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
}

// ── Mock Data ───────────────────────────────────────
const mockUsers: User[] = [
  { id: 'U001', username: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'enabled', createdAt: '2026-01-15 10:30' },
  { id: 'U002', username: '李四', email: 'lisi@example.com', role: 'editor', status: 'disabled', createdAt: '2026-02-20 14:22' },
  { id: 'U003', username: '王五', email: 'wangwu@test.com', role: 'viewer', status: 'enabled', createdAt: '2026-04-08 09:15' },
  { id: 'U004', username: '赵六', email: 'zhaoliu@example.com', role: 'editor', status: 'enabled', createdAt: '2026-03-12 16:45' },
  { id: 'U005', username: '陈小雅', email: 'chenxy@company.cn', role: 'admin', status: 'enabled', createdAt: '2025-11-01 08:00' },
  { id: 'U006', username: '刘建国', email: 'liujg@example.com', role: 'viewer', status: 'disabled', createdAt: '2026-05-18 11:33' },
  { id: 'U007', username: '吴芳', email: 'wufang@test.com', role: 'editor', status: 'enabled', createdAt: '2026-06-01 07:50' },
  { id: 'U008', username: '周明', email: 'zhouming@example.com', role: 'viewer', status: 'enabled', createdAt: '2026-06-10 13:20' },
  { id: 'U009', username: '马丽娜', email: 'malina@company.cn', role: 'editor', status: 'disabled', createdAt: '2026-04-25 15:10' },
  { id: 'U010', username: '孙浩然', email: 'sunhr@example.com', role: 'admin', status: 'enabled', createdAt: '2025-12-03 10:00' },
]

// ── Status & Role Config ────────────────────────────
const roleMap: Record<string, string> = {
  admin: t('users.list.roles.admin'),
  editor: t('users.list.roles.editor'),
  viewer: t('users.list.roles.viewer'),
}

const statusMap: Record<string, { labelKey: string; type: string }> = {
  enabled: { labelKey: 'users.list.status.enabled', type: 'success' },
  disabled: { labelKey: 'users.list.status.disabled', type: 'danger' },
}

// ── State ───────────────────────────────────────────
const searchKeyword = ref('')
const roleFilter = ref<'all' | UserRole>('all')
const statusFilter = ref<'all' | UserStatus>('all')
const currentPage = ref(1)
const pageSize = ref(8)
const filterDrawerVisible = ref(false)

// ── Computed ────────────────────────────────────────
const filteredUsers = computed(() => {
  let list = mockUsers
  if (searchKeyword.value.trim()) {
    const kw = searchKeyword.value.trim().toLowerCase()
    list = list.filter(u =>
      u.username.toLowerCase().includes(kw) || u.email.toLowerCase().includes(kw)
    )
  }
  if (roleFilter.value !== 'all') {
    list = list.filter(u => u.role === roleFilter.value)
  }
  if (statusFilter.value !== 'all') {
    list = list.filter(u => u.status === statusFilter.value)
  }
  return list
})

const pagedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredUsers.value.slice(start, start + pageSize.value)
})

const total = computed(() => filteredUsers.value.length)

const summary = computed(() => {
  const activeCount = mockUsers.filter(u => u.status === 'enabled').length
  const disabledCount = mockUsers.filter(u => u.status === 'disabled').length
  return { totalUsers: mockUsers.length, activeCount, disabledCount }
})

// ── Methods ─────────────────────────────────────────
const handleSearch = () => { currentPage.value = 1 }
const handleFilterChange = () => { currentPage.value = 1 }

const handleEdit = (row: User) => {
  ElMessage.info(t('users.list.editUser', { name: row.username }))
}

const handleDelete = (row: User) => {
  ElMessageBox.confirm(
    t('users.list.deleteConfirm', { name: row.username }),
    t('users.list.deleteTitle'),
    { confirmButtonText: t('users.list.deleteConfirmBtn'), cancelButtonText: t('common.cancel'), type: 'warning' },
  )
    .then(() => ElMessage.success(t('users.list.deletedMessage', { name: row.username })))
    .catch(() => { /* cancelled */ })
}

const handleCardAction = (cmd: string, row: User) => {
  if (cmd === 'edit') handleEdit(row)
  else if (cmd === 'delete') handleDelete(row)
}
</script>

<template>
  <div>
    <!-- Page Header + Mobile Create -->
    <div class="flex items-start justify-between mb-4 md:mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-neutral-950">{{ t('users.list.title') }}</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ t('users.list.description') }}</p>
      </div>
      <el-button
        type="primary"
        circle
        :icon="Plus"
        size="small"
        class="md:hidden"
        @click="ElMessage.info('新建用户（待实现）')"
      />
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4">
      <div class="bg-white rounded-btn border border-neutral-200 p-2.5 md:p-4">
        <div class="text-[10px] md:text-sm text-neutral-500 mb-0.5 md:mb-1">{{ t('users.list.totalUsers') }}</div>
        <div class="text-base md:text-2xl font-bold text-neutral-950">{{ summary.totalUsers }}</div>
      </div>
      <div class="bg-white rounded-btn border border-neutral-200 p-2.5 md:p-4">
        <div class="text-[10px] md:text-sm text-neutral-500 mb-0.5 md:mb-1">{{ t('users.list.activeUsers') }}</div>
        <div class="text-base md:text-2xl font-bold text-green-600">{{ summary.activeCount }}</div>
      </div>
      <div class="bg-white rounded-btn border border-neutral-200 p-2.5 md:p-4">
        <div class="text-[10px] md:text-sm text-neutral-500 mb-0.5 md:mb-1">{{ t('users.list.disabledUsers') }}</div>
        <div class="text-base md:text-2xl font-bold" style="color: #dc2626">{{ summary.disabledCount }}</div>
      </div>
    </div>

    <!-- Filter Bar: Desktop inline -->
    <div class="hidden md:flex flex-wrap items-center gap-3 bg-white rounded-btn border border-neutral-200 p-4 mb-4">
      <el-input
        v-model="searchKeyword"
        :placeholder="t('users.list.searchPlaceholder')"
        :prefix-icon="Search"
        clearable
        class="w-64"
        @input="handleSearch"
        @clear="handleSearch"
      />
      <el-select
        v-model="roleFilter"
        :placeholder="t('users.list.filterByRole')"
        class="w-28"
        @change="handleFilterChange"
      >
        <el-option :label="t('common.all')" value="all" />
        <el-option :label="t('users.list.roles.admin')" value="admin" />
        <el-option :label="t('users.list.roles.editor')" value="editor" />
        <el-option :label="t('users.list.roles.viewer')" value="viewer" />
      </el-select>
      <el-select
        v-model="statusFilter"
        :placeholder="t('users.list.filterByStatus')"
        class="w-28"
        @change="handleFilterChange"
      >
        <el-option :label="t('common.all')" value="all" />
        <el-option :label="t('users.list.status.enabled')" value="enabled" />
        <el-option :label="t('users.list.status.disabled')" value="disabled" />
      </el-select>
      <div class="flex-1"></div>
      <el-button type="primary" :icon="Plus" @click="ElMessage.info('新建用户（待实现）')">
        {{ t('users.list.createUser') }}
      </el-button>
    </div>

    <!-- Filter Bar: Mobile search + drawer trigger -->
    <div class="flex md:hidden items-center gap-2 mb-3">
      <el-input
        v-model="searchKeyword"
        :placeholder="t('users.list.searchPlaceholder')"
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
          <div class="text-sm font-medium text-neutral-950 mb-2">{{ t('users.list.filterByRole') }}</div>
          <el-select v-model="roleFilter" class="w-full" @change="handleFilterChange">
            <el-option :label="t('common.all')" value="all" />
            <el-option :label="t('users.list.roles.admin')" value="admin" />
            <el-option :label="t('users.list.roles.editor')" value="editor" />
            <el-option :label="t('users.list.roles.viewer')" value="viewer" />
          </el-select>
        </div>
        <div>
          <div class="text-sm font-medium text-neutral-950 mb-2">{{ t('users.list.filterByStatus') }}</div>
          <el-select v-model="statusFilter" class="w-full" @change="handleFilterChange">
            <el-option :label="t('common.all')" value="all" />
            <el-option :label="t('users.list.status.enabled')" value="enabled" />
            <el-option :label="t('users.list.status.disabled')" value="disabled" />
          </el-select>
        </div>
        <div class="flex gap-3 mt-4">
          <el-button class="flex-1" @click="roleFilter = 'all'; statusFilter = 'all'; handleFilterChange()">
            {{ t('common.reset') }}
          </el-button>
          <el-button type="primary" class="flex-1" @click="filterDrawerVisible = false">
            {{ t('common.apply') }}
          </el-button>
        </div>
      </div>
    </el-drawer>

    <!-- Data Table: Desktop -->
    <div class="hidden md:block bg-white rounded-btn border border-neutral-200">
      <el-table
        :data="pagedUsers"
        style="width: 100%"
        :empty-text="t('users.list.empty')"
        row-key="id"
        stripe
      >
        <el-table-column prop="username" :label="t('users.list.columns.username')" width="120" />
        <el-table-column prop="email" :label="t('users.list.columns.email')" min-width="200" />
        <el-table-column prop="role" :label="t('users.list.columns.role')" width="100">
          <template #default="{ row }">
            <span class="text-sm text-neutral-500">{{ roleMap[row.role] || row.role }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="t('users.list.columns.status')" width="90">
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
        <el-table-column prop="createdAt" :label="t('users.list.columns.createdAt')" width="160" />
        <el-table-column :label="t('users.list.columns.actions')" width="90" fixed="right">
          <template #default="{ row }">
            <div class="flex items-center gap-2">
              <el-tooltip :content="t('common.edit')" placement="top" :show-after="300" :hide-after="0">
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
      <div v-if="pagedUsers.length === 0" class="bg-white rounded-btn border border-neutral-200 p-8 text-center text-sm text-neutral-500">
        {{ t('users.list.empty') }}
      </div>
      <div
        v-for="user in pagedUsers"
        :key="user.id"
        class="bg-white rounded-btn border border-neutral-200 p-3"
      >
        <!-- Layer 1: Username + Status -->
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-brand-600">{{ user.username }}</span>
          <el-tag :type="statusMap[user.status].type" size="small" effect="light">
            {{ t(statusMap[user.status].labelKey) }}
          </el-tag>
        </div>
        <!-- Layer 2: Email + Role -->
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-neutral-700">{{ user.email }}</span>
          <span class="text-sm text-neutral-500">{{ roleMap[user.role] || user.role }}</span>
        </div>
        <!-- Layer 3: Created at + Actions -->
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-neutral-400">{{ user.createdAt }}</span>
          <el-dropdown trigger="click" @command="(cmd: string) => handleCardAction(cmd, user)">
            <el-button link size="small" class="text-neutral-500" @click.stop>
              <el-icon :size="18"><MoreFilled /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="edit">
                  <el-icon :size="14" class="mr-1"><Edit /></el-icon>
                  {{ t('common.edit') }}
                </el-dropdown-item>
                <el-dropdown-item command="delete" divided>
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
  </div>
</template>
