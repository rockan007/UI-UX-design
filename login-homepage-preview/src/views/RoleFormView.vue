<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules, ElTree } from 'element-plus'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const isEdit = computed(() => route.name === 'role-edit')
const pageTitle = computed(() => isEdit.value ? t('users.roles.editTitle') : t('users.roles.createTitle'))
const roleId = computed(() => route.params.id as string | undefined)

// ── Permission Tree Data ────────────────────────────
interface PermissionNode {
  id: string
  label: string
  children?: PermissionNode[]
}

const allPermissions: PermissionNode[] = [
  {
    id: 'user', label: '用户管理', children: [
      { id: 'user.view', label: '查看' },
      { id: 'user.create', label: '新增' },
      { id: 'user.edit', label: '编辑' },
      { id: 'user.delete', label: '删除' },
    ]
  },
  {
    id: 'order', label: '订单管理', children: [
      { id: 'order.view', label: '查看' },
      { id: 'order.create', label: '新增' },
      { id: 'order.edit', label: '编辑' },
      { id: 'order.delete', label: '删除' },
    ]
  },
  {
    id: 'system', label: '系统设置', children: [
      { id: 'system.view', label: '查看' },
      { id: 'system.edit', label: '编辑' },
    ]
  },
]

// ── Mock Store ──────────────────────────────────────
function getMockRoles(): any[] { return (window as any).__mockRoles || [] }
function saveMockRoles(roles: any[]) { (window as any).__mockRoles = roles }

// ── Form State ──────────────────────────────────────
const formRef = ref<FormInstance>()
const treeRef = ref<InstanceType<typeof ElTree>>()
const saving = ref(false)

const form = reactive({
  name: '',
  description: '',
  permissions: [] as string[],
})

const rules: FormRules = {
  name: [{ required: true, message: t('users.roles.form.nameRequired'), trigger: 'blur' }],
}

// ── Lifecycle ───────────────────────────────────────
onMounted(() => {
  if (isEdit.value && roleId.value) {
    const roles = getMockRoles()
    const role = roles.find((r: any) => r.id === roleId.value)
    if (role) {
      form.name = role.name
      form.description = role.description
      form.permissions = [...role.permissions]
    }
  }
})

// ── Methods ─────────────────────────────────────────
async function handleSave() {
  if (!formRef.value) return
  saving.value = true
  try { await formRef.value.validate() } catch { saving.value = false; return }

  const checkedKeys = treeRef.value?.getCheckedKeys(false) as string[] || []
  const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys() as string[] || []
  const allPermissions = [...checkedKeys, ...halfCheckedKeys]

  const roles = getMockRoles()
  if (isEdit.value) {
    const i = roles.findIndex((r: any) => r.id === roleId.value)
    if (i !== -1) Object.assign(roles[i], { name: form.name, description: form.description, permissions: allPermissions })
  } else {
    roles.push({ id: `ROLE-${Date.now()}`, name: form.name, description: form.description, permissions: allPermissions, userCount: 0 })
  }
  saveMockRoles(roles)
  ElMessage.success(t('users.roles.saveSuccess'))
  router.push('/admin/users/roles')
}
</script>

<template>
  <div>
    <!-- Toolbar: breadcrumb + actions -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/users/roles' }">{{ t('users.roles.title') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="flex items-center gap-3">
        <el-button type="primary" :loading="saving" :disabled="saving" @click="handleSave">{{ t('common.save') }}</el-button>
        <el-button plain @click="router.back()">{{ t('common.cancel') }}</el-button>
      </div>
    </div>

    <!-- Form -->
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="flex flex-col gap-4" @submit.prevent="handleSave()">
      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- DESKTOP: Basic Info (blue) -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div class="hidden md:block bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">
        <div class="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">{{ t('users.roles.form.basicHeader') }}</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <el-form-item :label="t('users.roles.form.name')" prop="name">
            <el-input v-model="form.name" :placeholder="t('users.roles.form.namePlaceholder')" />
          </el-form-item>
        </div>
        <el-form-item :label="t('users.roles.form.description')" class="mt-4 mb-0">
          <el-input v-model="form.description" type="textarea" :rows="2" :placeholder="t('users.roles.form.descriptionPlaceholder')" />
        </el-form-item>
      </div>

      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- DESKTOP: Permission Tree (purple) -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div class="hidden md:block bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5 md:p-6">
        <div class="text-sm font-semibold text-purple-700 mb-1 uppercase tracking-wide">{{ t('users.roles.form.permissionHeader') }}</div>
        <p class="text-xs text-neutral-500 mb-4">{{ t('users.roles.form.permissionHint') }}</p>
        <el-tree
          ref="treeRef"
          :data="allPermissions"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="form.permissions"
          check-strictly
        />
      </div>

      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- MOBILE: flat section cards -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div class="md:hidden flex flex-col gap-4">
        <!-- Mobile: Basic Info (blue) -->
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5">
          <div class="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">{{ t('users.roles.form.basicHeader') }}</div>
          <div class="grid grid-cols-1 gap-4">
            <el-form-item :label="t('users.roles.form.name')" prop="name">
              <el-input v-model="form.name" :placeholder="t('users.roles.form.namePlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('users.roles.form.description')" class="mb-0">
              <el-input v-model="form.description" type="textarea" :rows="2" :placeholder="t('users.roles.form.descriptionPlaceholder')" />
            </el-form-item>
          </div>
        </div>

        <!-- Mobile: Permission Tree (purple) -->
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5">
          <div class="text-sm font-semibold text-purple-700 mb-1 uppercase tracking-wide">{{ t('users.roles.form.permissionHeader') }}</div>
          <p class="text-xs text-neutral-500 mb-4">{{ t('users.roles.form.permissionHint') }}</p>
          <el-tree
            :data="allPermissions"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="form.permissions"
            check-strictly
          />
        </div>
      </div>
    </el-form>
  </div>
</template>
