<script setup lang="ts">
import { ref, provide } from 'vue'
import { Expand } from '@element-plus/icons-vue'
import AdminHeader from '../components/AdminHeader.vue'
import AdminSidebar from '../components/AdminSidebar.vue'

const isCollapse = ref(false)
const sidebarRef = ref<InstanceType<typeof AdminSidebar> | null>(null)

provide('sidebarCollapsed', isCollapse)
</script>

<template>
  <el-container class="h-screen">
    <!-- Header -->
    <AdminHeader />

    <!-- Mobile Menu Button -->
    <div class="flex items-center gap-3 px-4 py-2 md:hidden bg-white border-b border-neutral-200">
      <el-button :icon="Expand" text @click="sidebarRef?.openMobileDrawer()" class="!text-neutral-800" />
      <span class="text-sm font-semibold text-neutral-950">管理系统</span>
    </div>

    <!-- Body -->
    <el-container>
      <!-- Sidebar -->
      <AdminSidebar
        ref="sidebarRef"
        :is-collapse="isCollapse"
        @toggle-collapse="isCollapse = !isCollapse"
      />

      <!-- Main Content -->
      <el-main class="bg-neutral-50 p-6 overflow-y-auto">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-container {
  flex-direction: column;
}

.el-main {
  --el-main-padding: 0;
  padding: 24px;
}
</style>
