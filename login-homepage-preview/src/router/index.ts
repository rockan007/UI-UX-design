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
