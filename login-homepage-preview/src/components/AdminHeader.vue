<script setup lang="ts">
import { ref } from 'vue'
import { Bell, User } from '@element-plus/icons-vue'

const notificationCount = ref(3)

const handleCommand = (command: string) => {
  if (command === 'profile') {
    // navigate to profile
  } else if (command === 'logout') {
    // handle logout
  }
}

const handleLanguageChange = (_command: string) => {
  // handle language switch
}
</script>

<template>
  <el-header height="48px" class="admin-header">
    <!-- Left: System identity -->
    <div class="flex items-center gap-2">
      <div class="w-6 h-6 bg-brand-600 rounded-input flex items-center justify-center flex-shrink-0">
        <span class="text-white text-xs font-bold">S</span>
      </div>
      <span class="font-semibold text-sm text-neutral-950 whitespace-nowrap">管理系统</span>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-4">
      <!-- Notifications -->
      <el-badge :value="notificationCount" :hidden="notificationCount === 0" :max="99">
        <el-icon :size="18" class="text-neutral-500 cursor-pointer hover:text-neutral-800 transition-colors duration-150">
          <Bell />
        </el-icon>
      </el-badge>

      <!-- Language Switcher -->
      <el-dropdown trigger="click" @command="handleLanguageChange">
        <span class="text-sm text-neutral-500 cursor-pointer hover:text-neutral-800 transition-colors duration-150">
          中文
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- User Menu -->
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity duration-150">
          <el-icon :size="20" class="text-brand-600">
            <User />
          </el-icon>
          <span class="text-sm text-neutral-800">Admin</span>
          <span class="text-xs text-neutral-300">&#9660;</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style scoped>
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}
</style>
