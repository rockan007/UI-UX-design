# Role Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement role management with list page and form page (create/edit with permission tree)

**Architecture:** Follows established OrderManageView (list) and OrderFormView (form) patterns. New RoleFormView component shared between create and edit modes. Two new routes added. Permission assignment uses el-tree with checkboxes.

**Tech Stack:** Vue 3 + Element Plus + Tailwind CSS + vue-i18n + @element-plus/icons-vue

---

### Task 1: Update i18n Locale Files

**Files:**
- Modify: `login-homepage-preview/src/locales/zh.json`
- Modify: `login-homepage-preview/src/locales/en.json`

- [ ] **Step 1: Replace roles placeholder with full i18n keys**

In `zh.json`, replace the `users.roles` section:

```json
"roles": {
  "title": "角色管理",
  "description": "管理角色及其权限分配",
  "totalRoles": "角色总数",
  "assignedUsers": "已分配用户",
  "unusedRoles": "未使用角色",
  "searchPlaceholder": "搜索角色名称",
  "createRole": "新建角色",
  "columns": {
    "name": "角色名称",
    "description": "描述",
    "userCount": "用户数",
    "permissions": "权限",
    "actions": "操作"
  },
  "empty": "暂无角色数据",
  "deleteConfirm": "确定要删除角色「{name}」吗？",
  "deleteTitle": "删除确认",
  "deleteConfirmBtn": "确定删除",
  "deletedMessage": "已删除角色 {name}",
  "createTitle": "创建角色",
  "editTitle": "编辑角色",
  "saveSuccess": "角色已保存",
  "form": {
    "basicHeader": "基本信息",
    "name": "角色名称",
    "namePlaceholder": "请输入角色名称",
    "nameRequired": "请输入角色名称",
    "description": "描述",
    "descriptionPlaceholder": "请输入角色描述",
    "permissionHeader": "权限分配",
    "permissionHint": "勾选该角色拥有的权限"
  }
}
```

In `en.json`, same structure with English values:

```json
"roles": {
  "title": "Role Management",
  "description": "Manage roles and permission assignments",
  "totalRoles": "Total Roles",
  "assignedUsers": "Assigned Users",
  "unusedRoles": "Unused Roles",
  "searchPlaceholder": "Search role name",
  "createRole": "New Role",
  "columns": {
    "name": "Role Name",
    "description": "Description",
    "userCount": "Users",
    "permissions": "Permissions",
    "actions": "Actions"
  },
  "empty": "No role data",
  "deleteConfirm": "Delete role \"{name}\"?",
  "deleteTitle": "Confirm Delete",
  "deleteConfirmBtn": "Delete",
  "deletedMessage": "Role {name} deleted",
  "createTitle": "Create Role",
  "editTitle": "Edit Role",
  "saveSuccess": "Role saved",
  "form": {
    "basicHeader": "Basic Information",
    "name": "Role Name",
    "namePlaceholder": "Enter role name",
    "nameRequired": "Please enter role name",
    "description": "Description",
    "descriptionPlaceholder": "Enter role description",
    "permissionHeader": "Permission Assignment",
    "permissionHint": "Check permissions for this role"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/locales/zh.json login-homepage-preview/src/locales/en.json
git commit -m "feat: add role management i18n keys"
```

---

### Task 2: Add Role Form Routes to Router

**Files:**
- Modify: `login-homepage-preview/src/router/index.ts`

- [ ] **Step 1: Import RoleFormView and add create/edit routes**

Add import:
```typescript
import RoleFormView from '../views/RoleFormView.vue'
```

Add routes as children of `/admin` (after the existing `users/roles` route):
```typescript
{
  path: 'users/roles/create',
  name: 'role-create',
  component: RoleFormView,
},
{
  path: 'users/roles/:id/edit',
  name: 'role-edit',
  component: RoleFormView,
},
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/router/index.ts
git commit -m "feat: add role form routes (create/edit)"
```

---

### Task 3: Implement RoleFormView.vue

**Files:**
- Create: `login-homepage-preview/src/views/RoleFormView.vue`

- [ ] **Step 1: Create RoleFormView with create/edit modes**

The form has two section cards:
1. **Basic info** (blue stripe): role name input + description textarea
2. **Permission tree** (purple stripe): el-tree with `show-checkbox`, `node-key="id"`, `default-expand-all`

Mock permission tree data:
```typescript
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
```

Full component structure:
```vue
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

// Mock roles store (shared via window for demo)
function getMockRoles(): any[] { return (window as any).__mockRoles || [] }
function saveMockRoles(roles: any[]) { (window as any).__mockRoles = roles }

// Permission tree data...

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
    <!-- Toolbar -->
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

    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="flex flex-col gap-4">
      <!-- Basic Info (blue) -->
      <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">
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

      <!-- Permission Tree (purple) -->
      <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5 md:p-6">
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

      <!-- Mobile: flat cards -->
      <div class="md:hidden flex flex-col gap-4">
        <!-- same content without tabs -->
      </div>
    </el-form>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/RoleFormView.vue
git commit -m "feat: implement RoleFormView with permission tree"
```

---

### Task 4: Implement RoleManageView.vue (List)

**Files:**
- Modify: `login-homepage-preview/src/views/RoleManageView.vue`

- [ ] **Step 1: Rewrite RoleManageView following OrderManageView pattern**

Full implementation with:
- 3 summary cards (total roles / assigned users / unused roles)
- Filter bar: search + spacer + create button
- Desktop el-table: role name, description, user count, permissions (el-tags), actions (edit/delete)
- Mobile card list + dropdown
- Pagination
- Mock data: 5 roles with permissions arrays

Mock data:
```typescript
interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

const mockRoles: Role[] = [
  { id: 'ROLE-001', name: '管理员', description: '系统管理员，拥有所有权限', permissions: ['user.view','user.create','user.edit','user.delete','order.view','order.create','order.edit','order.delete','system.view','system.edit'], userCount: 3 },
  { id: 'ROLE-002', name: '编辑', description: '可查看和编辑内容', permissions: ['user.view','user.edit','order.view','order.edit','system.view'], userCount: 12 },
  { id: 'ROLE-003', name: '查看者', description: '只读权限', permissions: ['user.view','order.view','system.view'], userCount: 28 },
  { id: 'ROLE-004', name: '财务', description: '订单管理和财务相关权限', permissions: ['order.view','order.create','order.edit','order.delete'], userCount: 5 },
  { id: 'ROLE-005', name: '审计员', description: '审计日志和系统监控', permissions: ['user.view','order.view','system.view','system.edit'], userCount: 2 },
]
;(window as any).__mockRoles = mockRoles
```

Structure follows the same pattern as UserListView (breadcrumb, cards, filter bar, table, mobile cards, pagination).

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/RoleManageView.vue
git commit -m "feat: implement RoleManageView list page"
```

---

### Task 5: Verification

- [ ] **Step 1: Start dev server and verify pages at 1440px and 390px**

```bash
cd login-homepage-preview && npm run dev
```

Use Playwright to navigate to:
- `/admin/users/roles` — verify list rendering
- `/admin/users/roles/create` — verify form with permission tree
- Check console for errors at both breakpoints

- [ ] **Step 2: Commit any fixes and push**

```bash
git add -A && git commit -m "chore: verification fixes"
```
