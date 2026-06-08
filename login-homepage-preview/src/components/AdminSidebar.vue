<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DataAnalysis, User, List, Setting, Fold, Expand } from '@element-plus/icons-vue'

defineProps<{
  isCollapse: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-collapse'): void
}>()

const route = useRoute()
const router = useRouter()
const mobileDrawerOpen = ref(false)

const menuItems = [
  { path: '/admin', title: '仪表盘' },
  {
    path: '/admin/users',
    title: '用户管理',
    children: [
      { path: '/admin/users/list', title: '用户列表' },
      { path: '/admin/users/roles', title: '角色管理' },
      { path: '/admin/users/permissions', title: '权限管理' },
    ],
  },
  { path: '/admin/orders', title: '订单管理' },
  { path: '/admin/settings', title: '系统设置' },
]

const openMobileDrawer = () => {
  mobileDrawerOpen.value = true
}

const navigateMobile = (path: string) => {
  mobileDrawerOpen.value = false
  router.push(path)
}

defineExpose({ openMobileDrawer })
</script>

<template>
  <!-- Desktop Sidebar -->
  <el-aside :width="isCollapse ? '64px' : '220px'" class="admin-sidebar hidden md:block">
    <div class="flex flex-col h-full">
      <!-- Collapse toggle at top-right -->
      <div
        class="flex py-2 pr-3"
        :class="isCollapse ? 'justify-center pr-0' : 'justify-end'"
      >
        <el-button
          text
          @click="emit('toggle-collapse')"
          class="!text-neutral-500 hover:!text-neutral-800 !p-1.5 !min-w-0"
          :title="isCollapse ? '展开侧边栏' : '折叠侧边栏'"
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
          <template #title>仪表盘</template>
        </el-menu-item>

        <el-sub-menu index="/admin/users">
          <template #title>
            <el-icon :size="18"><User /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/admin/users/list">用户列表</el-menu-item>
          <el-menu-item index="/admin/users/roles">角色管理</el-menu-item>
          <el-menu-item index="/admin/users/permissions">权限管理</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/admin/orders">
          <el-icon :size="18"><List /></el-icon>
          <template #title>订单管理</template>
        </el-menu-item>

        <el-menu-item index="/admin/settings">
          <el-icon :size="18"><Setting /></el-icon>
          <template #title>系统设置</template>
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
            @click="navigateMobile(item.path)"
          >
            {{ item.title }}
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
              {{ child.title }}
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
