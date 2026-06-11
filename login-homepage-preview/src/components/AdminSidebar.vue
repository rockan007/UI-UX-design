<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { DataAnalysis, User, List, Setting, Fold, Expand } from '@element-plus/icons-vue'

defineProps<{
  isCollapse: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-collapse'): void
}>()

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const mobileDrawerOpen = ref(false)

const menuItems = [
  { path: '/admin', titleKey: 'sidebar.dashboard' },
  {
    path: '/admin/users',
    titleKey: 'sidebar.userManagement',
    children: [
      { path: '/admin/users/list', titleKey: 'sidebar.userList' },
      { path: '/admin/users/roles', titleKey: 'sidebar.roleManagement' },
      { path: '/admin/users/permissions', titleKey: 'sidebar.permissionManagement' },
    ],
  },
  { path: '/admin/orders', titleKey: 'sidebar.orderManagement' },
  { path: '/admin/settings', titleKey: 'sidebar.systemSettings' },
]

const openMobileDrawer = () => {
  mobileDrawerOpen.value = true
}

const navigateMobile = (path: string) => {
  mobileDrawerOpen.value = false
  router.push(path)
}

const parentPath = (item: typeof menuItems[number]) => {
  return item.children?.length ? item.children[0].path : item.path
}

defineExpose({ openMobileDrawer })
</script>

<template>
  <!-- Desktop Sidebar -->
  <el-aside :width="isCollapse ? '64px' : '220px'" class="admin-sidebar hidden md:block">
    <div class="flex flex-col h-full">
      <!-- Collapse toggle at top-right -->
      <div
        class="flex py-2"
        :class="isCollapse ? 'justify-center pr-0' : 'justify-end pr-3'"
      >
        <el-button
          text
          @click="emit('toggle-collapse')"
          class="!text-neutral-500 hover:!text-neutral-800 !p-1.5 !min-w-0"
          :title="isCollapse ? t('sidebar.expand') : t('sidebar.collapse')"
        >
          <el-icon :size="18">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
        </el-button>
      </div>

      <!-- Menu -->
      <el-menu
        :default-active="route.path"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        class="admin-menu"
      >
        <el-menu-item index="/admin">
          <el-icon :size="18"><DataAnalysis /></el-icon>
          <template #title>{{ t('sidebar.dashboard') }}</template>
        </el-menu-item>

        <el-sub-menu index="/admin/users">
          <template #title>
            <el-icon :size="18"><User /></el-icon>
            <span>{{ t('sidebar.userManagement') }}</span>
          </template>
          <el-menu-item index="/admin/users/list">{{ t('sidebar.userList') }}</el-menu-item>
          <el-menu-item index="/admin/users/roles">{{ t('sidebar.roleManagement') }}</el-menu-item>
          <el-menu-item index="/admin/users/permissions">{{ t('sidebar.permissionManagement') }}</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/admin/orders">
          <el-icon :size="18"><List /></el-icon>
          <template #title>{{ t('sidebar.orderManagement') }}</template>
        </el-menu-item>

        <el-menu-item index="/admin/settings">
          <el-icon :size="18"><Setting /></el-icon>
          <template #title>{{ t('sidebar.systemSettings') }}</template>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>

  <!-- Mobile Drawer -->
  <el-drawer
    v-model="mobileDrawerOpen"
    direction="ltr"
    size="260px"
    :with-header="false"
  >
    <div class="px-4 py-5">
      <nav class="flex flex-col gap-1">
        <template v-for="item in menuItems" :key="item.path">
          <div
            class="px-3 py-2 rounded-btn text-sm cursor-pointer transition-colors duration-150"
            :class="route.path === item.path || route.path.startsWith(item.path + '/')
              ? 'bg-brand-50 text-brand-600 font-medium'
              : 'text-neutral-500 hover:bg-neutral-50'"
            @click="navigateMobile(parentPath(item))"
          >
            {{ t(item.titleKey) }}
          </div>
          <template v-if="item.children">
            <div
              v-for="child in item.children"
              :key="child.path"
              class="px-3 py-1.5 pl-8 rounded-btn text-sm cursor-pointer transition-colors duration-150"
              :class="route.path === child.path
                ? 'bg-brand-50 text-brand-600 font-medium'
                : 'text-neutral-500 hover:bg-neutral-50'"
              @click="navigateMobile(child.path)"
            >
              {{ t(child.titleKey) }}
            </div>
          </template>
        </template>
      </nav>
    </div>
  </el-drawer>
</template>

<style scoped>
.admin-sidebar {
  background: #fff;
  border-right: 1px solid #e5e5e5;
  transition: width 0.2s ease;
  flex-shrink: 0;
}

.admin-menu {
  border-right: none !important;
  flex: 1;
}
</style>
