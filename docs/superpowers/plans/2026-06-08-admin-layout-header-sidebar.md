# Admin Layout: Header Bar + Multi-level Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract the hardcoded admin dashboard layout into a reusable AdminLayout with top header bar and multi-level collapsible sidebar.

**Architecture:** AdminLayout (el-container shell) wraps AdminHeader + AdminSidebar + router-view. Collapse state lives in AdminLayout, passed as prop to AdminSidebar. Routes restructured to `/admin` parent with nested children.

**Tech Stack:** Vue 3 (Composition API, `<script setup>`) + Element Plus 2.14 + Tailwind CSS + vue-router 4 + @element-plus/icons-vue

---

### Task 1: Create placeholder admin page views

**Files:**
- Create: `login-homepage-preview/src/views/UserListView.vue`
- Create: `login-homepage-preview/src/views/RoleManageView.vue`
- Create: `login-homepage-preview/src/views/PermissionView.vue`
- Create: `login-homepage-preview/src/views/OrderManageView.vue`
- Create: `login-homepage-preview/src/views/SettingsView.vue`

- [ ] **Step 1: Create all 5 placeholder pages**

All five pages share the same template pattern, differing only in title. Write each file:

**UserListView.vue:**
```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">用户列表</h1>
      <p class="text-sm text-neutral-500 mt-1">管理系统中的用户账号</p>
    </div>
    <div class="bg-white rounded-btn border border-neutral-200 p-12 flex items-center justify-center">
      <p class="text-neutral-500 text-sm">用户列表内容（待实现）</p>
    </div>
  </div>
</template>
```

**RoleManageView.vue:**
```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">角色管理</h1>
      <p class="text-sm text-neutral-500 mt-1">管理角色及其权限分配</p>
    </div>
    <div class="bg-white rounded-btn border border-neutral-200 p-12 flex items-center justify-center">
      <p class="text-neutral-500 text-sm">角色管理内容（待实现）</p>
    </div>
  </div>
</template>
```

**PermissionView.vue:**
```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">权限管理</h1>
      <p class="text-sm text-neutral-500 mt-1">配置系统权限和访问控制</p>
    </div>
    <div class="bg-white rounded-btn border border-neutral-200 p-12 flex items-center justify-center">
      <p class="text-neutral-500 text-sm">权限管理内容（待实现）</p>
    </div>
  </div>
</template>
```

**OrderManageView.vue:**
```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">订单管理</h1>
      <p class="text-sm text-neutral-500 mt-1">查看和处理客户订单</p>
    </div>
    <div class="bg-white rounded-btn border border-neutral-200 p-12 flex items-center justify-center">
      <p class="text-neutral-500 text-sm">订单管理内容（待实现）</p>
    </div>
  </div>
</template>
```

**SettingsView.vue:**
```vue
<script setup lang="ts">
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">系统设置</h1>
      <p class="text-sm text-neutral-500 mt-1">配置系统参数和偏好</p>
    </div>
    <div class="bg-white rounded-btn border border-neutral-200 p-12 flex items-center justify-center">
      <p class="text-neutral-500 text-sm">系统设置内容（待实现）</p>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/UserListView.vue login-homepage-preview/src/views/RoleManageView.vue login-homepage-preview/src/views/PermissionView.vue login-homepage-preview/src/views/OrderManageView.vue login-homepage-preview/src/views/SettingsView.vue
git commit -m "feat: add placeholder admin page views"
```

---

### Task 2: Create AdminHeader component

**Files:**
- Create: `login-homepage-preview/src/components/AdminHeader.vue`

- [ ] **Step 1: Write AdminHeader.vue**

```vue
<script setup lang="ts">
import { Bell, Avatar } from '@element-plus/icons-vue'

const notificationCount = 3

const handleCommand = (command: string) => {
  if (command === 'profile') {
    // navigate to profile
  } else if (command === 'logout') {
    // handle logout
  }
}

const handleLanguageChange = (command: string) => {
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
            <Avatar />
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
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/components/AdminHeader.vue
git commit -m "feat: add AdminHeader component with notifications, language, and user dropdown"
```

---

### Task 3: Create AdminSidebar component

**Files:**
- Create: `login-homepage-preview/src/components/AdminSidebar.vue`

- [ ] **Step 1: Write AdminSidebar.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { DataAnalysis, User, List, Setting, Fold, Expand } from '@element-plus/icons-vue'

defineProps<{
  isCollapse: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-collapse'): void
}>()

const route = useRoute()
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
            @click="mobileDrawerOpen = false"
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
              @click="mobileDrawerOpen = false"
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
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/components/AdminSidebar.vue
git commit -m "feat: add AdminSidebar component with multi-level menu and collapse toggle"
```

---

### Task 4: Create AdminLayout component

**Files:**
- Create: `login-homepage-preview/src/layouts/AdminLayout.vue`

- [ ] **Step 1: Write AdminLayout.vue**

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/layouts/AdminLayout.vue
git commit -m "feat: add AdminLayout shell with header, sidebar, and router-view"
```

---

### Task 5: Restructure Vue Router for nested admin routes

**Files:**
- Modify: `login-homepage-preview/src/router/index.ts`

- [ ] **Step 1: Rewrite router/index.ts**

```ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import UserListView from '../views/UserListView.vue'
import RoleManageView from '../views/RoleManageView.vue'
import PermissionView from '../views/PermissionView.vue'
import OrderManageView from '../views/OrderManageView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      component: AdminLayout,
      redirect: '/admin',
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'users/list',
          name: 'user-list',
          component: UserListView,
        },
        {
          path: 'users/roles',
          name: 'role-manage',
          component: RoleManageView,
        },
        {
          path: 'users/permissions',
          name: 'permissions',
          component: PermissionView,
        },
        {
          path: 'orders',
          name: 'order-manage',
          component: OrderManageView,
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView,
        },
      ],
    },
  ],
})

export default router
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/router/index.ts
git commit -m "feat: restructure admin routes as nested children under AdminLayout"
```

---

### Task 6: Refactor DashboardView to remove layout code

**Files:**
- Modify: `login-homepage-preview/src/views/DashboardView.vue`

- [ ] **Step 1: Strip sidebar, drawer, and mobile header from DashboardView**

Remove the imported `Expand` icon, `drawerOpen` ref, and `menuItems` array from `<script setup>`. Remove the outer flex wrapper, the `<aside>` sidebar, the mobile header div, and the `<el-drawer>` from `<template>`. The page header no longer needs `hidden md:block` because AdminLayout handles mobile layout.

Replace the `<script setup>` block:

```ts
import { DataAnalysis, ShoppingCart, Money, Warning, TrendCharts, ArrowUp, ArrowDown } from '@element-plus/icons-vue'

const metrics = [
  { label: '活跃用户', value: '12,483', change: '+12%', trend: 'up', icon: DataAnalysis },
  { label: '今日订单', value: '347', change: '+5%', trend: 'up', icon: ShoppingCart },
  { label: '收入', value: '¥38,200', change: '-3%', trend: 'down', icon: Money },
  { label: '待处理', value: '23', change: '0%', trend: 'flat', icon: Warning },
]

const chartDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const chartValues = [80, 110, 95, 140, 120, 90, 60]
const maxValue = Math.max(...chartValues)

const categories = [
  { name: '设计', value: 142, color: '#2563eb' },
  { name: '开发', value: 98, color: '#0891b2' },
  { name: '营销', value: 76, color: '#d97706' },
  { name: '运维', value: 51, color: '#16a34a' },
]
const maxCat = Math.max(...categories.map((c) => c.value))

const timeline = [
  { title: '新订单 #ORD-20240606-042', desc: '用户 张三 下单 ¥2,380', time: '2 分钟前', active: true },
  { title: '用户注册', desc: '新用户 李四 通过邀请链接注册', time: '15 分钟前', active: false },
  { title: '订单完成', desc: '#ORD-20240606-040 已确认收货', time: '1 小时前', active: false },
]
```

Replace the `<template>` block to remove the outer wrapper and sidebar/mobile sections:

```vue
<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">仪表盘</h1>
      <p class="text-sm text-neutral-500 mt-1">过去 30 天的核心数据概览</p>
    </div>

    <!-- Metric Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div
        v-for="m in metrics"
        :key="m.label"
        class="bg-white rounded-btn border border-neutral-200 p-4 hover:shadow-md hover:border-brand-200 cursor-pointer transition-all duration-150"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-neutral-500">{{ m.label }}</span>
          <el-icon :size="18" color="#737373">
            <component :is="m.icon" />
          </el-icon>
        </div>
        <div class="text-2xl font-bold text-neutral-950 mb-1">{{ m.value }}</div>
        <div class="flex items-center gap-1 text-sm" :class="{
          'text-green-600': m.trend === 'up',
          'text-red-600': m.trend === 'down',
          'text-neutral-500': m.trend === 'flat',
        }">
          <el-icon v-if="m.trend === 'up'" :size="14"><ArrowUp /></el-icon>
          <el-icon v-else-if="m.trend === 'down'" :size="14"><ArrowDown /></el-icon>
          <span>{{ m.change }}</span>
          <span class="text-neutral-400 text-xs ml-1">vs 上月</span>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Line Chart -->
      <div class="md:col-span-2 bg-white rounded-btn border border-neutral-200 p-5">
        <h3 class="text-base font-semibold text-neutral-950 mb-5">订单趋势（近 7 天）</h3>
        <div class="flex items-end gap-3 h-[200px] px-2">
          <div
            v-for="(val, i) in chartValues"
            :key="i"
            class="flex-1 flex flex-col items-center gap-1"
          >
            <span class="text-xs text-neutral-500">{{ val }}</span>
            <div
              class="w-full rounded-t-sm transition-all duration-150 cursor-pointer hover:brightness-90"
              :title="`${chartDays[i]}: ${val} 单`"
              :style="{
                height: `${(val / maxValue) * 160}px`,
                background: `linear-gradient(180deg, #2563eb 0%, #eff6ff 100%)`,
              }"
            ></div>
            <span class="text-xs text-neutral-400 mt-2">{{ chartDays[i] }}</span>
          </div>
        </div>
      </div>

      <!-- Bar Chart -->
      <div class="bg-white rounded-btn border border-neutral-200 p-5">
        <h3 class="text-base font-semibold text-neutral-950 mb-5">按类别分布</h3>
        <div class="flex flex-col gap-4 justify-center h-[200px]">
          <div
            v-for="cat in categories"
            :key="cat.name"
            class="flex items-center gap-3"
          >
            <span class="text-sm text-neutral-500 w-10">{{ cat.name }}</span>
            <div class="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-150 cursor-pointer hover:brightness-90"
                :title="`${cat.name}: ${cat.value}`"
                :style="{ width: `${(cat.value / maxCat) * 100}%`, background: cat.color }"
              ></div>
            </div>
            <span class="text-sm text-neutral-800 w-9 text-right">{{ cat.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Timeline -->
    <div class="bg-white rounded-btn border border-neutral-200 p-5">
      <h3 class="text-base font-semibold text-neutral-950 mb-5">最近活动</h3>
      <div class="flex flex-col">
        <div
          v-for="(item, i) in timeline"
          :key="i"
          class="flex gap-3 pb-5 relative hover:bg-neutral-50 -mx-2 px-2 rounded-btn transition-colors duration-150"
          :class="{ 'border-l-2': i < timeline.length - 1 }"
          :style="{ borderLeftColor: item.active ? '#2563eb' : '#e5e5e5', paddingLeft: '16px' }"
        >
          <div
            class="absolute w-2 h-2 rounded-full"
            :style="{ left: '-5px', top: '4px', background: item.active ? '#2563eb' : '#d4d4d4' }"
          ></div>
          <div>
            <div class="text-sm text-neutral-950">{{ item.title }}</div>
            <div class="text-sm text-neutral-500 mt-1">{{ item.desc }}</div>
            <div class="text-xs text-neutral-300 mt-2">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/DashboardView.vue
git commit -m "refactor: strip sidebar and drawer from DashboardView, layout now handled by AdminLayout"
```

---

### Task 7: Add CSS custom property overrides for el-menu

**Files:**
- Modify: `login-homepage-preview/src/style.css`

- [ ] **Step 1: Append el-menu theming variables to style.css**

Append the following to the `:root` block in `src/style.css`:

```css
  --el-menu-bg-color: #ffffff;
  --el-menu-text-color: #262626;
  --el-menu-hover-bg-color: #f5f5f5;
  --el-menu-active-color: #2563eb;
  --el-menu-border-color: transparent;
  --el-menu-item-height: 40px;
  --el-menu-item-font-size: 14px;
  --el-menu-sub-item-height: 36px;
  --el-menu-base-level-padding: 20px;
  --el-menu-level-padding: 16px;
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/style.css
git commit -m "style: add el-menu CSS variable overrides to match design tokens"
```

---

### Task 8: Build project and verify type checking

- [ ] **Step 1: Install dependencies (if needed) and run type check**

```bash
cd login-homepage-preview && npm install
```

```bash
cd login-homepage-preview && npx vue-tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 2: Run build**

```bash
cd login-homepage-preview && npm run build
```

Expected: Build completes without errors.

- [ ] **Step 3: Commit (if any fixes were needed)**

Only commit if fixes were made during build verification.

---

### Task 9: Start dev server and run UI/UX review

- [ ] **Step 1: Start dev server**

```bash
cd login-homepage-preview && npm run dev
```

Expected: Vite dev server starts, shows local URL.

- [ ] **Step 2: Verify at 1440px (desktop)**
  - [ ] Header shows: system icon + name on left, bell badge + language + user avatar on right
  - [ ] Sidebar expanded (220px): shows all menu items with icons
  - [ ] 用户管理 has expandable submenu with 3 children
  - [ ] Clicking ☰ (Fold/Expand) in sidebar top-right toggles collapse (64px icon-only)
  - [ ] Collapsed sidebar shows icons only, tooltip on hover
  - [ ] Active menu item highlighted with brand-50 background + brand-600 text
  - [ ] Clicking a menu item navigates to the correct page
  - [ ] router-view area updates on navigation

- [ ] **Step 3: Verify at 390px (mobile)**
  - [ ] Header remains visible
  - [ ] Mobile bar visible below header with hamburger button
  - [ ] Clicking hamburger opens el-drawer with full multi-level menu
  - [ ] Drawer menu highlights active page
  - [ ] Clicking a menu item closes drawer and navigates

- [ ] **Step 4: Verify interaction states**
  - [ ] Sidebar hover: inactive items show bg-neutral-50
  - [ ] Sidebar active: brand-50 background, brand-600 text
  - [ ] Header notification: badge visible with count 3
  - [ ] Header language dropdown: opens on click, shows options
  - [ ] Header user dropdown: opens on click, shows 个人设置 / 退出登录
  - [ ] Collapse transition: smooth 200ms width change

- [ ] **Step 5: Commit final verified state**

```bash
git add -A
git commit -m "feat: complete admin layout with header bar and multi-level sidebar"
```

---

## Follow-up (Out of Scope)

- Auth guards on `/admin/*` routes
- Replace static notification count with real data
- Wire up language switcher to i18n
- Implement actual content for placeholder pages
