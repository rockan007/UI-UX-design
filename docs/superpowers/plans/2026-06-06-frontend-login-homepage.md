# Frontend Login & Homepage — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Vue 3 + Element Plus + Tailwind CSS project and implement login page + homepage for live preview.

**Architecture:** Vite project scaffold → dependencies → config → router → LoginView → HomeView → App.vue wiring → dev server verification. All files live under `login-homepage-preview/` inside the project root.

**Tech Stack:** Vue 3 + TypeScript + Element Plus + Tailwind CSS + @element-plus/icons-vue + Vue Router + Vite

---

### Task 1: Scaffold Vite + Vue 3 project

**Files:**
- Create: `login-homepage-preview/` (via Vite scaffold)

- [ ] **Step 1: Create project with Vite**

```bash
cd "/Users/anqi/projects/UI:UX design" && npm create vite@latest login-homepage-preview -- --template vue-ts
```

- [ ] **Step 2: Install dependencies**

```bash
cd "/Users/anqi/projects/UI:UX design/login-homepage-preview" && npm install && npm install element-plus @element-plus/icons-vue vue-router@4 tailwindcss@3 @tailwindcss/typography postcss autoprefixer
```

- [ ] **Step 3: Initialize Tailwind**

```bash
cd "/Users/anqi/projects/UI:UX design/login-homepage-preview" && npx tailwindcss init -p
```

- [ ] **Step 4: Verify scaffold structure**

```bash
ls -la "/Users/anqi/projects/UI:UX design/login-homepage-preview/src/"
```
Expected: `App.vue`, `main.ts`, `style.css`, `components/`

- [ ] **Step 5: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add login-homepage-preview/ && git commit -m "feat: scaffold Vite + Vue 3 + TypeScript project with dependencies"
```

---

### Task 2: Configure Tailwind, Element Plus theme, and design tokens

**Files:**
- Modify: `login-homepage-preview/tailwind.config.js`
- Modify: `login-homepage-preview/src/style.css`
- Modify: `login-homepage-preview/src/main.ts`

- [ ] **Step 1: Configure tailwind.config.js**

Write `login-homepage-preview/tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          500: '#737373',
          800: '#262626',
          950: '#0a0a0a',
        }
      },
      borderRadius: {
        'btn': '6px',
        'card': '8px',
        'input': '4px',
      },
      spacing: {
        'page': '32px',
        'section': '48px',
        'card': '24px',
      }
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Write src/style.css with Element Plus CSS variables override**

Write `login-homepage-preview/src/style.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --el-color-primary: #2563eb;
  --el-color-primary-light-3: #1d4ed8;
  --el-color-primary-light-5: #3b82f6;
  --el-color-primary-light-7: #93bbfd;
  --el-color-primary-light-9: #eff6ff;
  --el-border-radius-base: 6px;
  --el-border-radius-small: 4px;
  --el-font-size-base: 15px;
  --el-text-color-primary: #0a0a0a;
  --el-text-color-regular: #262626;
  --el-text-color-secondary: #737373;
  --el-text-color-placeholder: #d4d4d4;
  --el-border-color: #e5e5e5;
  --el-border-color-light: #f5f5f5;
  --el-bg-color: #ffffff;
  --el-bg-color-page: #fafafa;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #0a0a0a;
  background: #fafafa;
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 3: Update main.ts to register Element Plus and Router**

Write `login-homepage-preview/src/main.ts`:

```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
```

- [ ] **Step 4: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add login-homepage-preview/tailwind.config.js login-homepage-preview/src/style.css login-homepage-preview/src/main.ts && git commit -m "feat: configure Tailwind, Element Plus theme, and design tokens"
```

---

### Task 3: Create Vue Router config

**Files:**
- Create: `login-homepage-preview/src/router/index.ts`

- [ ] **Step 1: Write router/index.ts**

Write `login-homepage-preview/src/router/index.ts`:

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

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
  ],
})

export default router
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && mkdir -p login-homepage-preview/src/views && git add login-homepage-preview/src/router/ && git commit -m "feat: add Vue Router with home and login routes"
```

---

### Task 4: Implement LoginView.vue

**Files:**
- Create: `login-homepage-preview/src/views/LoginView.vue`

- [ ] **Step 1: Write LoginView.vue**

Write `login-homepage-preview/src/views/LoginView.vue`:

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const submitting = ref(false)
const loginError = ref('')

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const rules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少 6 位', trigger: 'blur' },
  ],
}

const handleLogin = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  loginError.value = ''

  // Simulate login
  setTimeout(() => {
    submitting.value = false
    // For demo: always succeed and redirect
    router.push('/')
  }, 1200)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-blue-50 px-4">
    <div class="bg-white rounded-card shadow-sm border border-neutral-200 p-10 w-full max-w-[400px]">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-brand-600 rounded-card mx-auto mb-4 flex items-center justify-center">
          <el-icon :size="24" color="white"><UserFilled /></el-icon>
        </div>
        <h1 class="text-xl font-semibold text-neutral-950">欢迎回来</h1>
        <p class="text-sm text-neutral-500 mt-1">登录您的账号以继续</p>
      </div>

      <!-- Error Alert -->
      <el-alert
        v-if="loginError"
        :title="loginError"
        type="error"
        show-icon
        closable
        class="mb-6"
        @close="loginError = ''"
      />

      <!-- Form -->
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleLogin"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="form.email"
            placeholder="name@example.com"
            size="large"
            :prefix-icon="UserFilled"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            show-password
          />
        </el-form-item>

        <div class="flex items-center justify-between mb-6">
          <el-checkbox v-model="form.remember" size="small">
            <span class="text-sm text-neutral-500">记住我</span>
          </el-checkbox>
          <a href="#" class="text-sm text-brand-600 no-underline hover:text-brand-700">忘记密码？</a>
        </div>

        <el-button
          type="primary"
          size="large"
          class="w-full"
          :loading="submitting"
          :disabled="submitting"
          @click="handleLogin"
        >
          {{ submitting ? '登录中...' : '登录' }}
        </el-button>
      </el-form>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add login-homepage-preview/src/views/LoginView.vue && git commit -m "feat: implement LoginView with form validation and states"
```

---

### Task 5: Implement HomeView.vue

**Files:**
- Create: `login-homepage-preview/src/views/HomeView.vue`

- [ ] **Step 1: Write HomeView.vue**

Write `login-homepage-preview/src/views/HomeView.vue`:

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Monitor, ChatDotRound, DataAnalysis } from '@element-plus/icons-vue'

const router = useRouter()

const features = [
  { icon: Monitor, title: '项目管理', description: '看板、甘特图、任务分配，掌控项目全流程' },
  { icon: ChatDotRound, title: '团队协作', description: '即时通讯、文件共享、评论，团队无缝沟通' },
  { icon: DataAnalysis, title: '数据分析', description: '自定义报表、实时仪表盘，数据驱动决策' },
]

const goToLogin = () => router.push('/login')
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <header class="sticky top-0 bg-white/80 backdrop-blur border-b border-neutral-200 z-50">
      <div class="max-w-6xl mx-auto px-page flex items-center justify-between h-16">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-brand-600 rounded-btn"></div>
          <span class="font-semibold text-base text-neutral-950">产品名称</span>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <a href="#" class="text-sm text-neutral-800 no-underline hover:text-brand-600 transition-colors">首页</a>
          <a href="#" class="text-sm text-neutral-800 no-underline hover:text-brand-600 transition-colors">功能</a>
          <a href="#" class="text-sm text-neutral-800 no-underline hover:text-brand-600 transition-colors">关于</a>
        </nav>
        <el-button size="default" @click="goToLogin">登录</el-button>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-neutral-50 to-white">
      <div class="max-w-3xl mx-auto px-page py-20 md:py-28 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-neutral-950 leading-tight">
          让工作更高效
        </h1>
        <p class="mt-4 text-base text-neutral-500 max-w-lg mx-auto leading-relaxed">
          一体化解决方案，帮助团队协作、管理和交付。即刻开始，无需复杂配置。
        </p>
        <div class="flex gap-3 justify-center mt-8">
          <el-button type="primary" size="large">免费试用</el-button>
          <el-button size="large" plain>了解更多</el-button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-5xl mx-auto px-page py-section">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="feat in features"
          :key="feat.title"
          class="text-center p-8 rounded-card hover:bg-neutral-50 transition-colors duration-150"
        >
          <div class="w-12 h-12 bg-brand-50 rounded-card mx-auto mb-4 flex items-center justify-center">
            <el-icon :size="24" color="#2563eb">
              <component :is="feat.icon" />
            </el-icon>
          </div>
          <h3 class="text-lg font-semibold text-neutral-950 mb-2">{{ feat.title }}</h3>
          <p class="text-sm text-neutral-500 leading-relaxed">{{ feat.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-neutral-50">
      <div class="max-w-2xl mx-auto px-page py-section text-center">
        <h2 class="text-2xl font-semibold text-neutral-950">现在开始</h2>
        <p class="mt-2 text-sm text-neutral-500">已有 10,000+ 团队在使用</p>
        <div class="mt-6">
          <el-button type="primary" size="large">免费试用</el-button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-neutral-200 py-6 text-center">
      <p class="text-xs text-neutral-500">&copy; 2026 产品名称 &middot; 保留所有权利</p>
    </footer>
  </div>
</template>
```

- [ ] **Step 2: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add login-homepage-preview/src/views/HomeView.vue && git commit -m "feat: implement HomeView with hero, features, CTA, and footer"
```

---

### Task 6: Wire up App.vue and verify dev server

**Files:**
- Modify: `login-homepage-preview/src/App.vue`

- [ ] **Step 1: Write App.vue**

Write `login-homepage-preview/src/App.vue`:

```vue
<template>
  <router-view />
</template>
```

- [ ] **Step 2: Start dev server to verify**

```bash
cd "/Users/anqi/projects/UI:UX design/login-homepage-preview" && npm run dev
```

Verify the server starts without errors. Expected: Vite dev server running on `http://localhost:5173`.

- [ ] **Step 3: Verify pages render**

- Open `http://localhost:5173` — should see the homepage
- Open `http://localhost:5173/login` — should see the login page
- Test login form: submit empty → validation errors; fill in → submit → redirect to homepage

- [ ] **Step 4: Commit**

```bash
cd "/Users/anqi/projects/UI:UX design" && git add login-homepage-preview/src/App.vue && git commit -m "feat: wire up App.vue with router-view, verify dev server"
```

---

### Task 7: Add responsive refinements and final check

- [ ] **Step 1: Verify mobile layout at 390px**

Check both pages at narrow viewport:
- Login: card should be full-width with comfortable padding
- Homepage: nav links hidden (hamburger optional for now), hero title smaller, features single column

- [ ] **Step 2: Verify design token compliance**

```bash
grep -c "#2563eb" login-homepage-preview/src/views/LoginView.vue login-homepage-preview/src/views/HomeView.vue
```

- [ ] **Step 3: Final git status**

```bash
cd "/Users/anqi/projects/UI:UX design" && git status && git log --oneline -10
```

Expected: clean working tree.
