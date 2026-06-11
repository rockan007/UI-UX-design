# i18n Optional Rules — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add optional i18n rules to the skill pipeline and convert the demo app to bilingual (zh/en).

**Architecture:** New `i18n-rules.md` skill reference file contains all i18n rules, conditionally loaded when `package.json` has `"vue3ElementUiUx": { "i18n": true }`. Demo app gets `vue-i18n` infrastructure with locale-aware formatting, a `LocaleSwitcher` component, and all hardcoded strings extracted to translation keys.

**Tech Stack:** vue-i18n v9+, Element Plus locale packages, `localStorage` for persistence

---

### Task 1: Install vue-i18n dependency

**Files:**
- Modify: `login-homepage-preview/package.json`

- [ ] **Step 1: Install vue-i18n**

Run: `cd login-homepage-preview && npm install vue-i18n@^9`

Expected: `vue-i18n` added to `package.json` dependencies.

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/package.json login-homepage-preview/package-lock.json
git commit -m "chore: install vue-i18n v9"
```

---

### Task 2: Create i18n-rules.md skill reference

**Files:**
- Create: `.claude/skills/vue3-element-ui-ux/references/i18n-rules.md`

- [ ] **Step 1: Write i18n-rules.md**

```markdown
# i18n Rules

Optional internationalization rules. Active only when the project's `package.json`
contains `"vue3ElementUiUx": { "i18n": true }`.

## 1. Tech Stack

- **vue-i18n** v9+ (Composition API mode, `legacy: false`)
- **Element Plus locale** — official packages from `element-plus/dist/locale/*.mjs`
- No build-time plugins (`@intlify/unplugin-vue-i18n` is out of scope)

## 2. File Structure

When i18n is enabled, the project must have:

```
src/
├── locales/
│   ├── index.ts              # createI18n instance + number/datetime formats
│   ├── zh.json                # Chinese messages
│   └── en.json                # English messages
├── composables/
│   └── useLocale.ts           # locale switch logic + Element Plus locale sync
└── components/
    └── LocaleSwitcher.vue     # language toggle dropdown
```

## 3. Configuration (main.ts)

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createI18n } from 'vue-i18n'
import { messages, numberFormats, datetimeFormats } from './locales'
import { elLocaleMap } from './composables/useLocale'
import App from './App.vue'
import router from './router'
import './style.css'

const savedLocale = localStorage.getItem('locale') || 'zh'

const i18n = createI18n({
  legacy: false,            // Composition API mode
  locale: savedLocale,
  fallbackLocale: 'zh',
  messages,
  numberFormats,
  datetimeFormats,
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(ElementPlus, {
  locale: elLocaleMap[savedLocale] || elLocaleMap['zh'],
})
app.mount('#app')
```

Key rules:
- `legacy: false` — required for Composition API (`useI18n()`).
- `fallbackLocale: 'zh'` — Chinese is the project's default language.
- Restore saved locale from `localStorage` on mount.
- Pass initial locale to Element Plus so components render correctly before any switch.

## 4. Locale Files

### Key Naming Convention

`page.section.element` — 3-level dot-notation, max 4 levels deep.

- `common.*` — shared across all pages (save, cancel, delete, search, reset, confirm, back)
- `<page>.*` — one top-level key per page, aligned with route path (e.g., `login`, `dashboard`, `orders`)
- `<page>.<section>.*` — for pages with multiple sections (forms, tables)
- Parameterized text uses `{param}` placeholders, never string concatenation

### zh.json (example structure)

```json
{
  "common": {
    "save": "保存",
    "cancel": "取消",
    "delete": "删除",
    "edit": "编辑",
    "view": "查看",
    "search": "搜索",
    "reset": "重置",
    "confirm": "确认",
    "back": "返回",
    "submit": "提交",
    "all": "全部",
    "yes": "是",
    "no": "否"
  },
  "login": {
    "title": "欢迎回来",
    "subtitle": "登录您的账号以继续",
    "email": "邮箱",
    "emailPlaceholder": "name@example.com",
    "password": "密码",
    "passwordPlaceholder": "请输入密码",
    "rememberMe": "记住我",
    "forgotPassword": "忘记密码？",
    "submit": "登录",
    "submitting": "登录中...",
    "validation": {
      "emailRequired": "请输入邮箱",
      "emailInvalid": "请输入有效的邮箱地址",
      "passwordRequired": "请输入密码",
      "passwordMinLength": "密码至少 6 位"
    }
  },
  "home": {
    "productName": "产品名称",
    "copyright": "© 2026 产品名称 · 保留所有权利",
    "nav": { "home": "首页", "features": "功能", "about": "关于" },
    "hero": {
      "title": "让工作更高效",
      "description": "一体化解决方案，帮助团队协作、管理和交付。即刻开始，无需复杂配置。",
      "cta": "免费试用",
      "secondary": "了解更多"
    },
    "features": {
      "project": { "title": "项目管理", "description": "看板、甘特图、任务分配，掌控项目全流程" },
      "team": { "title": "团队协作", "description": "即时通讯、文件共享、评论，团队无缝沟通" },
      "data": { "title": "数据分析", "description": "自定义报表、实时仪表盘，数据驱动决策" }
    },
    "cta": { "title": "现在开始", "subtitle": "已有 10,000+ 团队在使用", "button": "免费试用" }
  },
  "dashboard": {
    "title": "仪表盘",
    "description": "过去 30 天的核心数据概览",
    "metrics": {
      "activeUsers": "活跃用户",
      "ordersToday": "今日订单",
      "revenue": "收入",
      "pending": "待处理"
    },
    "vsLastMonth": "vs 上月",
    "chartOrderTrend": "订单趋势（近 7 天）",
    "chartCategory": "按类别分布",
    "activity": "最近活动",
    "days": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    "timeline": [
      { "title": "新订单 #ORD-20240606-042", "desc": "用户 张三 下单 ¥2,380", "time": "2 分钟前" },
      { "title": "用户注册", "desc": "新用户 李四 通过邀请链接注册", "time": "15 分钟前" },
      { "title": "订单完成", "desc": "#ORD-20240606-040 已确认收货", "time": "1 小时前" }
    ]
  },
  "orders": {
    "title": "订单管理",
    "description": "查看和处理客户订单",
    "totalOrders": "今日订单总量",
    "pendingOrders": "待处理订单",
    "completedRevenue": "已完成交易额",
    "searchPlaceholder": "搜索订单号 / 客户 / 手机号 / 商品",
    "filterByStatus": "订单状态",
    "filterByChannel": "下单渠道",
    "columns": {
      "orderNo": "订单号",
      "customer": "客户",
      "items": "商品",
      "amount": "金额",
      "status": "状态",
      "channel": "渠道",
      "createdAt": "下单时间",
      "actions": "操作"
    },
    "status": {
      "pending": "待支付",
      "paid": "已支付",
      "shipped": "已发货",
      "completed": "已完成",
      "refunded": "已退款",
      "cancelled": "已取消"
    },
    "empty": "暂无订单数据",
    "deleteConfirm": "确定要删除订单「{id}」吗？",
    "deleteTitle": "删除确认",
    "deleteConfirmBtn": "确定删除",
    "deletedMessage": "已删除订单 {id}",
    "viewDetail": "查看订单详情：{id}",
    "processOrder": "处理订单：{id}",
    "moreItems": "+{count}"
  },
  "users": {
    "list": { "title": "用户列表", "description": "管理系统中的用户账号", "placeholder": "用户列表内容（待实现）" },
    "roles": { "title": "角色管理", "description": "管理角色及其权限分配", "placeholder": "角色管理内容（待实现）" },
    "permissions": { "title": "权限管理", "description": "配置系统权限和访问控制", "placeholder": "权限管理内容（待实现）" }
  },
  "settings": {
    "title": "系统设置",
    "description": "配置系统参数和偏好",
    "placeholder": "系统设置内容（待实现）"
  },
  "sidebar": {
    "dashboard": "仪表盘",
    "userManagement": "用户管理",
    "userList": "用户列表",
    "roleManagement": "角色管理",
    "permissionManagement": "权限管理",
    "orderManagement": "订单管理",
    "systemSettings": "系统设置",
    "expand": "展开侧边栏",
    "collapse": "折叠侧边栏"
  },
  "header": {
    "systemName": "管理系统",
    "profile": "个人设置",
    "logout": "退出登录",
    "chinese": "中文",
    "english": "English",
    "notifications": "通知"
  }
}
```

### en.json (example structure)

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "view": "View",
    "search": "Search",
    "reset": "Reset",
    "confirm": "Confirm",
    "back": "Back",
    "submit": "Submit",
    "all": "All",
    "yes": "Yes",
    "no": "No"
  },
  "login": {
    "title": "Welcome Back",
    "subtitle": "Sign in to your account to continue",
    "email": "Email",
    "emailPlaceholder": "name@example.com",
    "password": "Password",
    "passwordPlaceholder": "Enter your password",
    "rememberMe": "Remember me",
    "forgotPassword": "Forgot password?",
    "submit": "Login",
    "submitting": "Signing in...",
    "validation": {
      "emailRequired": "Please enter your email",
      "emailInvalid": "Please enter a valid email address",
      "passwordRequired": "Please enter your password",
      "passwordMinLength": "Password must be at least 6 characters"
    }
  },
  "home": {
    "productName": "Product Name",
    "copyright": "© 2026 Product Name · All rights reserved",
    "nav": { "home": "Home", "features": "Features", "about": "About" },
    "hero": {
      "title": "Work Smarter",
      "description": "An all-in-one solution that helps teams collaborate, manage, and deliver. Get started instantly with no complex setup.",
      "cta": "Try for Free",
      "secondary": "Learn More"
    },
    "features": {
      "project": { "title": "Project Management", "description": "Kanban, Gantt, task assignments — full control over your project workflow" },
      "team": { "title": "Team Collaboration", "description": "Instant messaging, file sharing, comments — seamless team communication" },
      "data": { "title": "Data Analytics", "description": "Custom reports, real-time dashboards — data-driven decisions" }
    },
    "cta": { "title": "Get Started Now", "subtitle": "Trusted by 10,000+ teams", "button": "Try for Free" }
  },
  "dashboard": {
    "title": "Dashboard",
    "description": "Core metrics for the past 30 days",
    "metrics": {
      "activeUsers": "Active Users",
      "ordersToday": "Orders Today",
      "revenue": "Revenue",
      "pending": "Pending"
    },
    "vsLastMonth": "vs last month",
    "chartOrderTrend": "Order Trend (7 days)",
    "chartCategory": "By Category",
    "activity": "Recent Activity",
    "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "timeline": [
      { "title": "New Order #ORD-20240606-042", "desc": "User Zhang San placed ¥2,380 order", "time": "2 min ago" },
      { "title": "User Registration", "desc": "New user Li Si registered via invite link", "time": "15 min ago" },
      { "title": "Order Completed", "desc": "#ORD-20240606-040 confirmed receipt", "time": "1 hour ago" }
    ]
  },
  "orders": {
    "title": "Order Management",
    "description": "View and process customer orders",
    "totalOrders": "Today's Orders",
    "pendingOrders": "Pending Orders",
    "completedRevenue": "Completed Revenue",
    "searchPlaceholder": "Search order no. / customer / phone / product",
    "filterByStatus": "Status",
    "filterByChannel": "Channel",
    "columns": {
      "orderNo": "Order No.",
      "customer": "Customer",
      "items": "Items",
      "amount": "Amount",
      "status": "Status",
      "channel": "Channel",
      "createdAt": "Order Time",
      "actions": "Actions"
    },
    "status": {
      "pending": "Pending",
      "paid": "Paid",
      "shipped": "Shipped",
      "completed": "Completed",
      "refunded": "Refunded",
      "cancelled": "Cancelled"
    },
    "empty": "No order data",
    "deleteConfirm": "Delete order \"{id}\"?",
    "deleteTitle": "Confirm Delete",
    "deleteConfirmBtn": "Delete",
    "deletedMessage": "Order {id} deleted",
    "viewDetail": "View order: {id}",
    "processOrder": "Process order: {id}",
    "moreItems": "+{count}"
  },
  "users": {
    "list": { "title": "User List", "description": "Manage user accounts in the system", "placeholder": "User list content (to be implemented)" },
    "roles": { "title": "Role Management", "description": "Manage roles and permission assignments", "placeholder": "Role management content (to be implemented)" },
    "permissions": { "title": "Permission Management", "description": "Configure system permissions and access control", "placeholder": "Permission management content (to be implemented)" }
  },
  "settings": {
    "title": "System Settings",
    "description": "Configure system parameters and preferences",
    "placeholder": "System settings content (to be implemented)"
  },
  "sidebar": {
    "dashboard": "Dashboard",
    "userManagement": "User Management",
    "userList": "User List",
    "roleManagement": "Role Management",
    "permissionManagement": "Permission Management",
    "orderManagement": "Order Management",
    "systemSettings": "System Settings",
    "expand": "Expand sidebar",
    "collapse": "Collapse sidebar"
  },
  "header": {
    "systemName": "Admin System",
    "profile": "Profile",
    "logout": "Log Out",
    "chinese": "中文",
    "english": "English",
    "notifications": "Notifications"
  }
}
```

- [ ] **Step 2: Verify file content**

Check: all 8 sections present (Tech Stack, File Structure, Configuration, Locale Files, Locale Switch, Formatting, LocaleSwitcher, RTL Direction).

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/i18n-rules.md
git commit -m "feat(skill): add i18n-rules.md reference with all 8 sections"
```

---

### Task 3: Amend generation-rules.md (rules 13 & 14)

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/generation-rules.md:22`

- [ ] **Step 1: Amend rule 13 and add rule 14**

Replace rule 13:

Old:
```
13. **Configure Element Plus Chinese locale in `main.ts`.** Import `zhCn` from `element-plus/dist/locale/zh-cn.mjs` and pass `{ locale: zhCn }` to `app.use(ElementPlus, ...)`. This ensures pagination ("共 X 条", "X条/页"), table empty text ("暂无数据"), select placeholder ("请选择"), and all other built-in component text display in Chinese — matching the page content language.
```

New (two rules):

```
13. **Configure Element Plus locale in `main.ts`.** If project i18n is NOT enabled (no `"vue3ElementUiUx": { "i18n": true }` in package.json): import `zhCn` from `element-plus/dist/locale/zh-cn.mjs` and pass `{ locale: zhCn }` to `app.use(ElementPlus, ...)`. If i18n IS enabled: the i18n infrastructure (`i18n-rules.md`) handles this via `elLocaleMap` and `el-config-provider` — do not hardcode `zhCn` separately.
14. **If project i18n is enabled**, read `i18n-rules.md` before generating any page. All user-facing text must use `$t()` keys, formatting must use `$n()` / `$d()`, and `LocaleSwitcher` must be included in the header.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/generation-rules.md
git commit -m "feat(skill): add conditional i18n rule to generation-rules"
```

---

### Task 4: Add section 9 to review-checklist.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/review-checklist.md`

- [ ] **Step 1: Append section 9 after section 8**

Append at end of file:

```markdown
## 9. i18n (when enabled — check `package.json` for `"vue3ElementUiUx": { "i18n": true }`)

- [ ] All user-facing text uses `$t()` keys — no hardcoded Chinese/English strings in templates.
- [ ] Element Plus locale syncs via `el-config-provider` + `watch(locale, ...)` in App.vue.
- [ ] Numbers formatted with `$n()`, dates with `$d()`, currencies with locale-aware format definitions in `locales/index.ts`.
- [ ] No bare `toLocaleString()` or manual `¥`/`$` prefix in templates.
- [ ] `LocaleSwitcher` component is present in header, functional (click toggles all text + el components + formatting).
- [ ] `LocaleSwitcher` collapses to globe icon on mobile (< 768px).
- [ ] Active language highlighted in switcher with brand color + medium weight.
- [ ] `locale` persisted to `localStorage`, restored on page load.
- [ ] `<html lang>` attribute updated on locale switch.
- [ ] Logical CSS properties used for margin/padding (`ms-*`/`me-*` not `ml-*`/`mr-*`).
- [ ] Text alignment uses logical properties (`text-start`/`text-end` not `text-left`/`text-right`).
- [ ] Directional icons use `rtl:rotate-180` variant.
- [ ] Action column alignment follows text direction (already covered by action column rule — verify RTL flips naturally).
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/review-checklist.md
git commit -m "feat(skill): add i18n section 9 to review-checklist"
```

---

### Task 5: Add locale field to UI DSL schema

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/ui-dsl.md`

- [ ] **Step 1: Add `locale` to base schema**

After the `"responsive": {}` line in the base schema object, add:

```json
  "locale": {
    "enabled": false,
    "default-locale": "zh",
    "supported": ["zh"]
  }
```

And add to the Required fields line below `responsive`:

```
Optional fields when i18n is enabled: `locale` (enabled, default-locale, supported).
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/ui-dsl.md
git commit -m "feat(skill): add locale field to UI DSL schema"
```

---

### Task 6: Add LocaleSwitcher to component-system.md

**Files:**
- Modify: `.claude/skills/vue3-element-ui-ux/references/component-system.md`

- [ ] **Step 1: Add LocaleSwitcher row to Element Plus Mapping table**

After the `Skeleton` row in the Base Components mapping table, add:

```
| `LocaleSwitcher` | `LocaleSwitcher` | `ElDropdown` + `ElDropdownMenu` + `ElDropdownItem` |
```

And add to the Composite Components table:

```
| `LocaleSwitcher` | `LocaleSwitcher` | Language toggle dropdown in header |
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/vue3-element-ui-ux/references/component-system.md
git commit -m "feat(skill): add LocaleSwitcher to component mapping"
```

---

### Task 7: Add i18n design principle to meta-skill

**Files:**
- Modify: `.claude/skills/ui-ux-agent-designer/references/design-standards.md`

- [ ] **Step 1: Add i18n principle under "Design System Rules"**

After the "Buttons" section (end of current file), add:

```markdown
### Internationalization

For multi-language projects:

- Design text with expansion tolerance — Chinese→English can be 30–50% longer; labels and buttons must not overflow.
- Support RTL direction — use logical CSS properties (`margin-inline-start`, `text-align: start`) instead of physical ones.
- Use locale-aware formatting for dates, numbers, and currencies — never hardcode formats.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/ui-ux-agent-designer/references/design-standards.md
git commit -m "feat(skill): add i18n design principle to meta-skill"
```

---

### Task 8: Add i18n marker to package.json

**Files:**
- Modify: `login-homepage-preview/package.json`

- [ ] **Step 1: Add config marker**

After the `"private": true` line, add:

```json
  "vue3ElementUiUx": {
    "i18n": true
  },
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/package.json
git commit -m "feat: enable i18n marker in package.json"
```

---

### Task 9: Create locales/index.ts

**Files:**
- Create: `login-homepage-preview/src/locales/index.ts`
- Create: `login-homepage-preview/src/locales/zh.json`
- Create: `login-homepage-preview/src/locales/en.json`

- [ ] **Step 1: Create directory**

Run: `mkdir -p login-homepage-preview/src/locales`

- [ ] **Step 2: Write locales/index.ts**

```ts
import zh from './zh.json'
import en from './en.json'

export const messages = { zh, en }

export const numberFormats = {
  en: {
    currency: { style: 'currency', currency: 'USD' } as const,
    decimal: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 } as const,
    percent: { style: 'percent' } as const,
  },
  zh: {
    currency: { style: 'currency', currency: 'CNY' } as const,
    decimal: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 } as const,
    percent: { style: 'percent' } as const,
  },
}

export const datetimeFormats = {
  en: {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' } as const,
    long: { year: 'numeric', month: 'long', day: 'numeric' } as const,
    datetime: { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' } as const,
  },
  zh: {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' } as const,
    long: { year: 'numeric', month: 'long', day: 'numeric' } as const,
    datetime: { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' } as const,
  },
}
```

- [ ] **Step 3: Write locales/zh.json**

Copy the full zh.json content from Task 2 (the `### zh.json` section). Extract all strings shown in the i18n-rules.md example.

- [ ] **Step 4: Write locales/en.json**

Copy the full en.json content from Task 2 (the `### en.json` section).

- [ ] **Step 5: Commit**

```bash
git add login-homepage-preview/src/locales/
git commit -m "feat: add i18n locale files (zh.json, en.json, index.ts)"
```

---

### Task 10: Create composables/useLocale.ts

**Files:**
- Create: `login-homepage-preview/src/composables/useLocale.ts`

- [ ] **Step 1: Create directory**

Run: `mkdir -p login-homepage-preview/src/composables`

- [ ] **Step 2: Write useLocale.ts**

```ts
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

export const elLocaleMap: Record<string, typeof zhCn> = {
  zh: zhCn,
  en: en,
}

export function useLocale() {
  const { locale } = useI18n({ useScope: 'global' })

  const supportedLocales = Object.keys(elLocaleMap)

  const switchTo = (lang: string) => {
    if (!supportedLocales.includes(lang)) return
    locale.value = lang
    localStorage.setItem('locale', lang)
    document.documentElement.lang = lang
    // RTL support (future-proof): only ar/he/fa/ur trigger dir change
    const rtlLangs = ['ar', 'he', 'fa', 'ur']
    document.documentElement.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr'
  }

  return { locale, switchTo, supportedLocales }
}
```

- [ ] **Step 3: Commit**

```bash
git add login-homepage-preview/src/composables/useLocale.ts
git commit -m "feat: add useLocale composable with el locale sync"
```

---

### Task 11: Create LocaleSwitcher.vue component

**Files:**
- Create: `login-homepage-preview/src/components/LocaleSwitcher.vue`

- [ ] **Step 1: Write LocaleSwitcher.vue**

```html
<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { locale, switchTo, supportedLocales } = useLocale()

const labels: Record<string, string> = {
  zh: '中文',
  en: 'English',
}
</script>

<template>
  <el-dropdown trigger="click" @command="switchTo">
    <span class="text-sm text-neutral-500 cursor-pointer hover:text-neutral-800 transition-colors duration-150 select-none">
      <span class="hidden sm:inline">{{ labels[locale] || locale }}</span>
      <span class="sm:hidden">🌐</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="lang in supportedLocales"
          :key="lang"
          :command="lang"
          :class="{ 'text-brand-600 font-medium': locale === lang }"
        >
          {{ labels[lang] || lang }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/components/LocaleSwitcher.vue
git commit -m "feat: add LocaleSwitcher component"
```

---

### Task 12: Wire main.ts with vue-i18n

**Files:**
- Modify: `login-homepage-preview/src/main.ts`

- [ ] **Step 1: Replace main.ts**

Replace the entire file:

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createI18n } from 'vue-i18n'
import { messages, numberFormats, datetimeFormats } from './locales'
import { elLocaleMap } from './composables/useLocale'
import './style.css'
import App from './App.vue'
import router from './router'

const savedLocale = localStorage.getItem('locale') || 'zh'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'zh',
  messages,
  numberFormats,
  datetimeFormats,
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(ElementPlus, {
  locale: elLocaleMap[savedLocale] || elLocaleMap['zh'],
})
app.mount('#app')
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/main.ts
git commit -m "feat: wire vue-i18n into main.ts"
```

---

### Task 13: Update App.vue with el-config-provider

**Files:**
- Modify: `login-homepage-preview/src/App.vue`

- [ ] **Step 1: Replace App.vue**

Replace the entire file:

```html
<script setup lang="ts">
import { watch, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { elLocaleMap } from '@/composables/useLocale'

const { locale } = useI18n({ useScope: 'global' })

const elConfig = reactive({ locale: elLocaleMap[locale.value] || elLocaleMap['zh'] })

watch(locale, (lang) => {
  elConfig.locale = elLocaleMap[lang] || elLocaleMap['zh']
})
</script>

<template>
  <el-config-provider :locale="elConfig.locale">
    <router-view />
  </el-config-provider>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/App.vue
git commit -m "feat: wrap App with el-config-provider for reactive locale"
```

---

### Task 14: Convert AdminHeader.vue to i18n

**Files:**
- Modify: `login-homepage-preview/src/components/AdminHeader.vue`

- [ ] **Step 1: Replace AdminHeader.vue**

Replace the entire file:

```html
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Bell, User } from '@element-plus/icons-vue'
import LocaleSwitcher from './LocaleSwitcher.vue'

const { t } = useI18n()

const notificationCount = ref(3)

const handleCommand = (command: string) => {
  if (command === 'profile') {
    // navigate to profile
  } else if (command === 'logout') {
    // handle logout
  }
}
</script>

<template>
  <el-header height="48px" class="admin-header">
    <!-- Left: System identity -->
    <div class="flex items-center gap-2">
      <div class="w-6 h-6 bg-brand-600 rounded-input flex items-center justify-center flex-shrink-0">
        <span class="text-white text-xs font-bold">S</span>
      </div>
      <span class="font-semibold text-sm text-neutral-950 whitespace-nowrap">{{ t('header.systemName') }}</span>
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
      <LocaleSwitcher />

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
            <el-dropdown-item command="profile">{{ t('header.profile') }}</el-dropdown-item>
            <el-dropdown-item command="logout" divided>{{ t('header.logout') }}</el-dropdown-item>
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
git commit -m "feat: i18n-ify AdminHeader — extract strings, use LocaleSwitcher"
```

---

### Task 15: Convert AdminSidebar.vue to i18n

**Files:**
- Modify: `login-homepage-preview/src/components/AdminSidebar.vue`

- [ ] **Step 1: Add useI18n and replace hardcoded titles**

In `<script setup>`, add after the imports:

```ts
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
```

Replace the `menuItems` array:

```ts
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
```

Replace `parentPath` to work with `titleKey`:

```ts
const parentPath = (item: typeof menuItems[number]) => {
  return item.children?.length ? item.children[0].path : item.path
}

const itemTitle = (item: typeof menuItems[number]) => t(item.titleKey)
```

In the template, replace all hardcoded Chinese titles:
- `title="仪表盘"` → `:title="t('sidebar.dashboard')"`
- `<template #title>仪表盘</template>` → `<template #title>{{ t('sidebar.dashboard') }}</template>`
- `title="用户管理"` → `:title="t('sidebar.userManagement')"`
- `<span>用户管理</span>` → `<span>{{ t('sidebar.userManagement') }}</span>`
- `用户列表` → `{{ t('sidebar.userList') }}`
- `角色管理` → `{{ t('sidebar.roleManagement') }}`
- `权限管理` → `{{ t('sidebar.permissionManagement') }}`
- `订单管理` → `{{ t('sidebar.orderManagement') }}`
- `系统设置` → `{{ t('sidebar.systemSettings') }}`
- `展开侧边栏` → `{{ t('sidebar.expand') }}`
- `折叠侧边栏` → `{{ t('sidebar.collapse') }}`

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/components/AdminSidebar.vue
git commit -m "feat: i18n-ify AdminSidebar menu titles"
```

---

### Task 16: Convert LoginView.vue to i18n

**Files:**
- Modify: `login-homepage-preview/src/views/LoginView.vue`

- [ ] **Step 1: Add useI18n and replace all strings**

Add import:
```ts
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
```

Replace hardcoded strings:
- `'欢迎回来'` → `t('login.title')`
- `'登录您的账号以继续'` → `t('login.subtitle')`
- `'邮箱'` → `t('login.email')`
- `'name@example.com'` → `t('login.emailPlaceholder')`
- `'密码'` → `t('login.password')`
- `'请输入密码'` → `t('login.passwordPlaceholder')`
- `'记住我'` → `t('login.rememberMe')`
- `'忘记密码？'` → `t('login.forgotPassword')`
- `'登录'` → `t('login.submit')`
- `'登录中...'` → `t('login.submitting')`

Replace validation rules:
```ts
const rules: FormRules = {
  email: [
    { required: true, message: t('login.validation.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('login.validation.emailInvalid'), trigger: 'blur' },
  ],
  password: [
    { required: true, message: t('login.validation.passwordRequired'), trigger: 'blur' },
    { min: 6, message: t('login.validation.passwordMinLength'), trigger: 'blur' },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/LoginView.vue
git commit -m "feat: i18n-ify LoginView — extract all strings to $t()"
```

---

### Task 17: Convert HomeView.vue to i18n

**Files:**
- Modify: `login-homepage-preview/src/views/HomeView.vue`

- [ ] **Step 1: Add useI18n and replace all strings**

Add import:
```ts
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
```

Replace hardcoded strings:
- `'产品名称'` (brand span) → `t('home.productName')`
- `'首页'` → `t('home.nav.home')`
- `'功能'` → `t('home.nav.features')`
- `'关于'` → `t('home.nav.about')`
- Login button `'登录'` → `t('login.submit')`
- Hero `'让工作更高效'` → `t('home.hero.title')`
- Hero `'一体化解决方案...'` → `t('home.hero.description')`
- `'免费试用'` → `t('home.hero.cta')`
- `'了解更多'` → `t('home.hero.secondary')`
- Feature `'项目管理'` → `t('home.features.project.title')`
- Feature `'看板、甘特图...'` → `t('home.features.project.description')`
- Feature `'团队协作'` → `t('home.features.team.title')`
- Feature `'即时通讯...'` → `t('home.features.team.description')`
- Feature `'数据分析'` → `t('home.features.data.title')`
- Feature `'自定义报表...'` → `t('home.features.data.description')`
- CTA `'现在开始'` → `t('home.cta.title')`
- CTA `'已有 10,000+ 团队在使用'` → `t('home.cta.subtitle')`
- Footer `'© 2026 产品名称 &middot; 保留所有权利'` → `t('home.copyright')`

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/HomeView.vue
git commit -m "feat: i18n-ify HomeView — extract all strings to $t()"
```

---

### Task 18: Convert DashboardView.vue to i18n

**Files:**
- Modify: `login-homepage-preview/src/views/DashboardView.vue`

- [ ] **Step 1: Add useI18n and replace strings**

Add import:
```ts
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
```

Replace in template:
- `'仪表盘'` → `t('dashboard.title')`
- `'过去 30 天的核心数据概览'` → `t('dashboard.description')`
- `m.label` in metrics → bind from translation keys (add `key` field to each metric)
- `'vs 上月'` → `t('dashboard.vsLastMonth')`
- `'订单趋势（近 7 天）'` → `t('dashboard.chartOrderTrend')`
- `'按类别分布'` → `t('dashboard.chartCategory')`
- `'最近活动'` → `t('dashboard.activity')`

Replace the data arrays to use translations:
```ts
const metrics = reactive([
  { labelKey: 'dashboard.metrics.activeUsers', value: '12,483', change: '+12%', trend: 'up', icon: DataAnalysis },
  { labelKey: 'dashboard.metrics.ordersToday', value: '347', change: '+5%', trend: 'up', icon: ShoppingCart },
  { labelKey: 'dashboard.metrics.revenue', value: '¥38,200', change: '-3%', trend: 'down', icon: Money },
  { labelKey: 'dashboard.metrics.pending', value: '23', change: '0%', trend: 'flat', icon: Warning },
])

// In template: use <span class="text-sm text-neutral-500">{{ t(m.labelKey) }}</span>
```

For `chartDays`: `const chartDays = computed(() => (t('dashboard.days') as unknown as string[]))`

For `categories`:
```ts
const categories = computed(() => [
  { name: t('home.features.data.title'), value: 142, color: '#2563eb' },
  { name: t('home.features.team.title'), value: 98, color: '#0891b2' },
  ... 
])
```

For `timeline`, use translation keys:
```ts
const timeline = computed(() => {
  const items = t('dashboard.timeline') as unknown as Array<{ title: string; desc: string; time: string }>
  return items.map((item, i) => ({ ...item, active: i === 0 }))
})
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/DashboardView.vue
git commit -m "feat: i18n-ify DashboardView — extract all strings"
```

---

### Task 19: Convert OrderManageView.vue to i18n

**Files:**
- Modify: `login-homepage-preview/src/views/OrderManageView.vue`

- [ ] **Step 1: Add useI18n and replace strings + formatAmount**

Add import:
```ts
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
```

Replace hardcoded strings:
- `'订单管理'` → `t('orders.title')`
- `'查看和处理客户订单'` → `t('orders.description')`
- Summary labels: `'今日订单总量'` → `t('orders.totalOrders')`, `'待处理订单'` → `t('orders.pendingOrders')`, `'已完成交易额'` → `t('orders.completedRevenue')`
- `'搜索订单号 / 客户 / 手机号 / 商品'` → `t('orders.searchPlaceholder')`
- `'订单状态'` → `t('orders.filterByStatus')`
- `'下单渠道'` → `t('orders.filterByChannel')`
- `'全部'` → `t('common.all')`
- Column labels: `'订单号'`, `'客户'`, `'商品'`, `'金额'`, `'状态'`, `'渠道'`, `'下单时间'`, `'操作'` → translation keys
- Status labels in `statusMap`: use `t()` in template instead of static map
- `'暂无订单数据'` → `t('orders.empty')`
- Action tooltips: `'查看'` → `t('common.view')`, `'处理'` → `t('orders.processOrder')` or separate key, `'删除'` → `t('common.delete')`
- Confirm dialog: `'删除确认'` → `t('orders.deleteTitle')`, `'确定删除'` → `t('orders.deleteConfirmBtn')`, `'取消'` → `t('common.cancel')`

Replace `formatAmount`:
```ts
const formatAmount = (val: number) => {
  return val.toLocaleString('zh-CN')  // Remove this
}
```
Use `$n()` in template instead:
```
{{ $n(row.total, 'currency') }}
```

- [ ] **Step 2: Commit**

```bash
git add login-homepage-preview/src/views/OrderManageView.vue
git commit -m "feat: i18n-ify OrderManageView — extract strings, use $n() for currency"
```

---

### Task 20: Convert placeholder views (UserList, RoleManage, Permission, Settings) to i18n

**Files:**
- Modify: `login-homepage-preview/src/views/UserListView.vue`
- Modify: `login-homepage-preview/src/views/RoleManageView.vue`
- Modify: `login-homepage-preview/src/views/PermissionView.vue`
- Modify: `login-homepage-preview/src/views/SettingsView.vue`

- [ ] **Step 1: Convert UserListView.vue**

```html
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">{{ t('users.list.title') }}</h1>
      <p class="text-sm text-neutral-500 mt-1">{{ t('users.list.description') }}</p>
    </div>
    <div class="bg-white rounded-btn border border-neutral-200 p-12 flex items-center justify-center">
      <p class="text-neutral-500 text-sm">{{ t('users.list.placeholder') }}</p>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Convert RoleManageView.vue**

Same pattern, using `t('users.roles.title')`, `t('users.roles.description')`, `t('users.roles.placeholder')`.

- [ ] **Step 3: Convert PermissionView.vue**

Same pattern, using `t('users.permissions.title')`, `t('users.permissions.description')`, `t('users.permissions.placeholder')`.

- [ ] **Step 4: Convert SettingsView.vue**

Same pattern, using `t('settings.title')`, `t('settings.description')`, `t('settings.placeholder')`.

- [ ] **Step 5: Commit**

```bash
git add login-homepage-preview/src/views/UserListView.vue login-homepage-preview/src/views/RoleManageView.vue login-homepage-preview/src/views/PermissionView.vue login-homepage-preview/src/views/SettingsView.vue
git commit -m "feat: i18n-ify placeholder admin views"
```

---

### Task 21: Build and verify

**Files:** None (verification only)

- [ ] **Step 1: Build the project**

Run: `cd login-homepage-preview && npm run build`

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 2: Run dev server**

Run: `cd login-homepage-preview && npm run dev`

Expected: Dev server starts.

- [ ] **Step 3: Verify at 1440px**

Navigate to http://localhost:5173. Check:
- Login page: all text in Chinese by default
- Admin pages: sidebar, header, dashboard strings in Chinese
- LocaleSwitcher shows "中文" in header
- Switch to English: all text updates, Element Plus pagination/table text switches to English
- Switch back to Chinese: all text reverts

- [ ] **Step 4: Verify at 390px**

Resize to 390px. Check:
- LocaleSwitcher collapses to globe icon (`🌐`)
- Home page strings are translated
- Login page strings are translated

- [ ] **Step 5: Verify RTL hook**

Open browser console, run:
```js
localStorage.setItem('locale', 'ar')
```
Reload page. Verify `document.documentElement.dir` is `'rtl'`.
Then restore: `localStorage.setItem('locale', 'zh')` and reload.

- [ ] **Step 6: Commit if any fixes needed**

If fixes were needed during verification:
```bash
git add -A
git commit -m "fix: i18n verification fixes"
```
