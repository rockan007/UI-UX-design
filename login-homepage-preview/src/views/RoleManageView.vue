<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Search, Edit, Delete, MoreFilled, Plus, Operation } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()
const router = useRouter()

// ── Types ───────────────────────────────────────────
interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

// ── Mock Data ───────────────────────────────────────
const mockRoles: Role[] = [
  { id: 'ROLE-001', name: '管理员', description: '系统管理员，拥有所有权限', permissions: ['user.view','user.create','user.edit','user.delete','order.view','order.create','order.edit','order.delete','system.view','system.edit'], userCount: 3 },
  { id: 'ROLE-002', name: '编辑', description: '可查看和编辑内容', permissions: ['user.view','user.edit','order.view','order.edit','system.view'], userCount: 12 },
  { id: 'ROLE-003', name: '查看者', description: '只读权限', permissions: ['user.view','order.view','system.view'], userCount: 28 },
  { id: 'ROLE-004', name: '财务', description: '订单管理和财务相关权限', permissions: ['order.view','order.create','order.edit','order.delete'], userCount: 5 },
  { id: 'ROLE-005', name: '审计员', description: '审计日志和系统监控', permissions: ['user.view','order.view','system.view','system.edit'], userCount: 2 },
]

;(window as any).__mockRoles = mockRoles

// ── Permission Label Map ─────────────────────────────
const permLabel: Record<string, string> = {
  'user': '用户管理', 'user.view': '查看', 'user.create': '新增', 'user.edit': '编辑', 'user.delete': '删除',
  'order': '订单管理', 'order.view': '查看', 'order.create': '新增', 'order.edit': '编辑', 'order.delete': '删除',
  'system': '系统设置', 'system.view': '查看', 'system.edit': '编辑',
}

function getModules(perms: string[]): string[] {
  const modules = new Set<string>()
  for (const p of perms) {
    const mod = p.split('.')[0]
    modules.add(permLabel[mod] || mod)
  }
  return Array.from(modules)
}

// ── State ───────────────────────────────────────────
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(8)
const filterDrawerVisible = ref(false)

// ── Computed ────────────────────────────────────────
const filteredRoles = computed(() => {
  let list = mockRoles
  if (searchKeyword.value.trim()) {
    const kw = searchKeyword.value.trim().toLowerCase()
    list = list.filter(r => r.name.toLowerCase().includes(kw) || r.description.toLowerCase().includes(kw))
  }
  return list
})

const pagedRoles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredRoles.value.slice(start, start + pageSize.value)
})

const total = computed(() => filteredRoles.value.length)

const summary = computed(() => {
  const assignedCount = mockRoles.filter(r => r.userCount > 0).length
  const unusedCount = mockRoles.filter(r => r.userCount === 0).length
  return { totalRoles: mockRoles.length, assignedCount, unusedCount }
})

// ── Methods ─────────────────────────────────────────
const handleSearch = () => { currentPage.value = 1 }

const handleEdit = (row: Role) => {
  router.push(`/admin/users/roles/${row.id}/edit`)
}

const handleDelete = (row: Role) => {
  ElMessageBox.confirm(
    t('users.roles.deleteConfirm', { name: row.name }),
    t('users.roles.deleteTitle'),
    { confirmButtonText: t('users.roles.deleteConfirmBtn'), cancelButtonText: t('common.cancel'), type: 'warning' },
  )
    .then(() => ElMessage.success(t('users.roles.deletedMessage', { name: row.name })))
    .catch(() => {})
}

const handleCardAction = (cmd: string, row: Role) => {
  if (cmd === 'edit') handleEdit(row)
  else if (cmd === 'delete') handleDelete(row)
}
</script>

<template>
  <div>
    <!-- Page Header + Mobile Create -->
    <div class="flex items-start justify-between mb-4 md:mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-neutral-950">{{ t('users.roles.title') }}</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ t('users.roles.description') }}</p>
      </div>
      <el-button
        type="primary"
        circle
        :icon="Plus"
        size="small"
        class="md:hidden"
        @click="router.push('/admin/users/roles/create')"
      />
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4">
      <div class="bg-white rounded-btn border border-neutral-200 p-2.5 md:p-4">
        <div class="text-[10px] md:text-sm text-neutral-500 mb-0.5 md:mb-1">{{ t('users.roles.totalRoles') }}</div>
        <div class="text-base md:text-2xl font-bold text-neutral-950">{{ summary.totalRoles }}</div>
      </div>
      <div class="bg-white rounded-btn border border-neutral-200 p-2.5 md:p-4">
        <div class="text-[10px] md:text-sm text-neutral-500 mb-0.5 md:mb-1">{{ t('users.roles.assignedUsers') }}</div>
        <div class="text-base md:text-2xl font-bold text-green-600">{{ summary.assignedCount }}</div>
      </div>
      <div class="bg-white rounded-btn border border-neutral-200 p-2.5 md:p-4">
        <div class="text-[10px] md:text-sm text-neutral-500 mb-0.5 md:mb-1">{{ t('users.roles.unusedRoles') }}</div>
        <div class="text-base md:text-2xl font-bold" style="color: #d97706">{{ summary.unusedCount }}</div>
      </div>
    </div>

    <!-- Filter Bar: Desktop inline -->
    <div class="hidden md:flex flex-wrap items-center gap-3 bg-white rounded-btn border border-neutral-200 p-4 mb-4">
      <el-input
        v-model="searchKeyword"
        :placeholder="t('users.roles.searchPlaceholder')"
        :prefix-icon="Search"
        clearable
        class="w-64"
        @input="handleSearch"
        @clear="handleSearch"
      />
      <div class="flex-1"></div>
      <el-button type="primary" :icon="Plus" @click="router.push('/admin/users/roles/create')">
        {{ t('users.roles.createRole') }}
      </el-button>
    </div>

    <!-- Filter Bar: Mobile search -->
    <div class="flex md:hidden items-center gap-2 mb-3">
      <el-input
        v-model="searchKeyword"
        :placeholder="t('users.roles.searchPlaceholder')"
        :prefix-icon="Search"
        clearable
        class="flex-1"
        size="default"
        @input="handleSearch"
        @clear="handleSearch"
      />
    </div>

    <!-- Data Table: Desktop -->
    <div class="hidden md:block bg-white rounded-btn border border-neutral-200">
      <el-table
        :data="pagedRoles"
        style="width: 100%"
        :empty-text="t('users.roles.empty')"
        row-key="id"
        stripe
      >
        <el-table-column prop="name" :label="t('users.roles.columns.name')" width="120" />
        <el-table-column prop="description" :label="t('users.roles.columns.description')" min-width="180">
          <template #default="{ row }">
            <span class="text-sm text-neutral-500">{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userCount" :label="t('users.roles.columns.userCount')" width="80" align="center" />
        <el-table-column prop="permissions" :label="t('users.roles.columns.permissions')" min-width="200">
          <template #default="{ row }">
            <div class="flex flex-wrap gap-1">
              <el-tag v-for="mod in getModules(row.permissions)" :key="mod" size="small" effect="plain" type="info">
                {{ mod }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="t('users.roles.columns.actions')" width="90" fixed="right">
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
      <div v-if="pagedRoles.length === 0" class="bg-white rounded-btn border border-neutral-200 p-8 text-center text-sm text-neutral-500">
        {{ t('users.roles.empty') }}
      </div>
      <div
        v-for="role in pagedRoles"
        :key="role.id"
        class="bg-white rounded-btn border border-neutral-200 p-3"
      >
        <!-- Layer 1: Name + User count -->
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-brand-600">{{ role.name }}</span>
          <span class="text-sm text-neutral-500">{{ role.userCount }} 人</span>
        </div>
        <!-- Layer 2: Description -->
        <div class="mb-2">
          <span class="text-sm text-neutral-700">{{ role.description }}</span>
        </div>
        <!-- Layer 3: Permission tags -->
        <div class="flex flex-wrap gap-1 mb-2">
          <el-tag v-for="mod in getModules(role.permissions).slice(0, 3)" :key="mod" size="small" effect="plain" type="info">
            {{ mod }}
          </el-tag>
          <el-tag v-if="getModules(role.permissions).length > 3" size="small" effect="plain" type="info">
            +{{ getModules(role.permissions).length - 3 }}
          </el-tag>
        </div>
        <!-- Layer 4: Actions -->
        <div class="flex items-center justify-end">
          <el-dropdown trigger="click" @command="(cmd: string) => handleCardAction(cmd, role)">
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
