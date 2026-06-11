# i18n Rules

Optional internationalization rules. Active only when the project's `package.json`
contains `"vue3ElementUiUx": { "i18n": true }`.

When i18n is active, all user-visible text in the project must be managed through
`vue-i18n`, including Element Plus component text. No hardcoded Chinese or English
strings in templates.

## 1. Tech Stack

| Layer | Package | Notes |
| --- | --- | --- |
| i18n core | `vue-i18n` v9+ | Composition API mode, `legacy: false` |
| UI locale | `element-plus/dist/locale/*.mjs` | Official Element Plus locale packages |
| Persistence | `localStorage` | Save/restore locale preference |
| Build plugins | **None** | `@intlify/unplugin-vue-i18n` is out of scope |

| Rule | Rationale |
| --- | --- |
| `legacy: false` | Required for Composition API (`useI18n()`). Legacy mode emits Options API warnings. |
| `fallbackLocale: 'zh'` | Chinese is the project's default language. All pages render in Chinese when a key is missing from the active locale. |
| No `@intlify/unplugin-vue-i18n` | Avoids build-time plugin complexity. All locale data is imported statically. |
| Locale restored from `localStorage` on mount | Survives page refresh. Fallback to `'zh'` when no saved value exists. |

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

| File | Responsibility |
| --- | --- |
| `locales/index.ts` | Creates the `i18n` instance. Exports `messages`, `numberFormats`, `datetimeFormats`. Imported by `main.ts`. |
| `locales/zh.json` | All Chinese message keys. Structured as 3-level dot notation. |
| `locales/en.json` | All English message keys. Must mirror the structure of `zh.json` exactly — same keys, same nesting. |
| `composables/useLocale.ts` | Provides `switchTo(lang)`, `locale`, `supportedLocales`. Syncs Element Plus locale reactively. Exports `elLocaleMap` for initial mount. |
| `components/LocaleSwitcher.vue` | The only UI control for changing language. Always an `el-dropdown`. |

**All five files are required when i18n is active.** A project with i18n enabled that is
missing any of these files is incomplete.

## 3. Configuration (main.ts)

The `main.ts` setup must:

1. Restore saved locale from `localStorage` (default `'zh'`).
2. Create the `i18n` instance with `legacy: false`.
3. Pass the initial locale to Element Plus so components render correctly before any switch.
4. Register `i18n`, `router`, and `ElementPlus` as plugins.

```ts
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

**Do not** lazy-load Element Plus locale — the import is static and lightweight.
**Do not** wrap the locale initialization in a `watch` or `onMounted` — the initial
locale must be set before `app.mount()`.

## 4. Locale Files

### Key Naming Convention

3-level dot notation: `page.section.element`. Max 4 levels deep.

| Level | Scope | Example |
| --- | --- | --- |
| `common.*` | Shared across all pages | `common.save`, `common.cancel`, `common.delete` |
| `<page>.*` | One top-level key per page, aligned with route path | `login.title`, `login.email`, `login.submit` |
| `<page>.<section>.*` | Pages with multiple sections | `userManagement.list.title`, `userManagement.form.email` |

**Rules:**
- Parameterized text uses `{param}` placeholders — never string concatenation.
- Every key in `zh.json` must have an identical key in `en.json` (same path, same nesting).
- No dynamic key construction: `$t('common.' + action)` is forbidden. Use computed properties or explicit keys.
- Keys are camelCase, not snake_case or kebab-case.

### zh.json Structure

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
    "confirmDelete": "确认删除？",
    "back": "返回",
    "submit": "提交",
    "all": "全部",
    "yes": "是",
    "no": "否",
    "close": "关闭",
    "add": "新增",
    "createdAt": "创建时间",
    "updatedAt": "更新时间",
    "actions": "操作"
  },
  "header": {
    "systemName": "管理系统",
    "profile": "个人中心",
    "logout": "退出登录",
    "chinese": "中文",
    "english": "English"
  },
  "sidebar": {
    "dashboard": "首页",
    "userManagement": "用户管理",
    "userList": "用户列表",
    "roleManagement": "角色管理",
    "permissionManagement": "权限管理",
    "orderManagement": "订单管理",
    "systemSettings": "系统设置",
    "expand": "展开",
    "collapse": "收起"
  },
  "login": {
    "title": "欢迎回来",
    "subtitle": "请输入您的账号信息登录系统",
    "email": "邮箱",
    "emailPlaceholder": "请输入邮箱地址",
    "password": "密码",
    "passwordPlaceholder": "请输入密码",
    "rememberMe": "记住我",
    "forgotPassword": "忘记密码？",
    "submit": "登录",
    "submitting": "登录中...",
    "validation": {
      "emailRequired": "请输入邮箱地址",
      "emailInvalid": "请输入有效的邮箱地址",
      "passwordRequired": "请输入密码",
      "passwordMinLength": "密码长度不能少于 {min} 位"
    }
  },
  "error": {
    "pageNotFound": "页面不存在",
    "permissionDenied": "权限不足",
    "networkError": "网络异常，请稍后重试"
  },
  "pagination": {
    "total": "共 {total} 条",
    "perPage": "条/页"
  }
}
```

### en.json Structure

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
    "confirmDelete": "Confirm delete?",
    "back": "Back",
    "submit": "Submit",
    "all": "All",
    "yes": "Yes",
    "no": "No",
    "close": "Close",
    "add": "Add",
    "createdAt": "Created At",
    "updatedAt": "Updated At",
    "actions": "Actions"
  },
  "header": {
    "systemName": "Admin System",
    "profile": "Profile",
    "logout": "Logout",
    "chinese": "中文",
    "english": "English"
  },
  "sidebar": {
    "dashboard": "Dashboard",
    "userManagement": "User Management",
    "userList": "User List",
    "roleManagement": "Role Management",
    "permissionManagement": "Permissions",
    "orderManagement": "Order Management",
    "systemSettings": "Settings",
    "expand": "Expand",
    "collapse": "Collapse"
  },
  "login": {
    "title": "Welcome Back",
    "subtitle": "Enter your credentials to sign in",
    "email": "Email",
    "emailPlaceholder": "Enter your email",
    "password": "Password",
    "passwordPlaceholder": "Enter your password",
    "rememberMe": "Remember me",
    "forgotPassword": "Forgot password?",
    "submit": "Sign In",
    "submitting": "Signing in...",
    "validation": {
      "emailRequired": "Email is required",
      "emailInvalid": "Please enter a valid email",
      "passwordRequired": "Password is required",
      "passwordMinLength": "Password must be at least {min} characters"
    }
  },
  "error": {
    "pageNotFound": "Page not found",
    "permissionDenied": "Permission denied",
    "networkError": "Network error, please try again"
  },
  "pagination": {
    "total": "Total {total} items",
    "perPage": "/page"
  }
}
```

## 5. Locale Switch (useLocale.ts)

The `useLocale` composable is the single source of truth for locale state. Every
component that needs to read or change the locale imports this composable —
no component touches `localStorage` or `document.documentElement` directly.

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
    const rtlLangs = ['ar', 'he', 'fa', 'ur']
    document.documentElement.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr'
  }

  return { locale, switchTo, supportedLocales }
}
```

| Export | Purpose |
| --- | --- |
| `elLocaleMap` | Maps language codes to Element Plus locale objects. Used by `main.ts` for initial mount. |
| `useLocale()` | Composable: returns `locale` (ref), `switchTo(lang)`, and `supportedLocales`. |
| `switchTo()` | Updates `locale` ref, persists to `localStorage`, sets `<html lang>` and `<html dir>`. No-op for unsupported languages. |

**Rules:**
- `supportedLocales` is derived from `elLocaleMap` keys — adding a language means importing the locale package and adding it to the map. No separate config file.
- When adding a new language, add its Element Plus locale to `elLocaleMap` and add its message file to `src/locales/`.
- `document.documentElement.dir` is set reactively for potential RTL languages (see Section 8).

## 6. Formatting

### Number Formatting

Use `$n(value, format)` in templates. Format definitions live in `locales/index.ts`.

**Never** use bare `toLocaleString()`, `Intl.NumberFormat`, or manual currency symbols in
templates — they bypass the locale system and produce inconsistent output.

```ts
// locales/index.ts — excerpts for numberFormats and datetimeFormats

export const numberFormats: Record<string, Record<string, object>> = {
  zh: {
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    currency: { style: 'currency', currency: 'CNY', currencyDisplay: 'symbol' },
    percent: { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 },
  },
  en: {
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    currency: { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' },
    percent: { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 },
  },
}
```

Template usage:

```html
<span>{{ $n(order.amount, 'currency') }}</span>
<span>{{ $n(user.balance, 'decimal') }}</span>
<span>{{ $n(conversionRate, 'percent') }}</span>
```

### Date/Time Formatting

Use `$d(value, format)` in templates. Format definitions live in `locales/index.ts`.

**Never** use bare `toLocaleDateString()`, `toLocaleTimeString()`, or manual date parsing
in templates.

```ts
export const datetimeFormats: Record<string, Record<string, object>> = {
  zh: {
    short: { dateStyle: 'short' },
    long: { dateStyle: 'long' },
    datetime: { dateStyle: 'medium', timeStyle: 'short' },
  },
  en: {
    short: { dateStyle: 'short' },
    long: { dateStyle: 'long' },
    datetime: { dateStyle: 'medium', timeStyle: 'short' },
  },
}
```

Template usage:

```html
<span>{{ $d(order.createdAt, 'short') }}</span>
<span>{{ $d(event.date, 'long') }}</span>
<span>{{ $d(log.timestamp, 'datetime') }}</span>
```

### Combined locales/index.ts

```ts
import zh from './zh.json'
import en from './en.json'

export const messages = { zh, en }

export const numberFormats: Record<string, Record<string, object>> = {
  zh: {
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    currency: { style: 'currency', currency: 'CNY', currencyDisplay: 'symbol' },
    percent: { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 },
  },
  en: {
    decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    currency: { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' },
    percent: { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 },
  },
}

export const datetimeFormats: Record<string, Record<string, object>> = {
  zh: {
    short: { dateStyle: 'short' },
    long: { dateStyle: 'long' },
    datetime: { dateStyle: 'medium', timeStyle: 'short' },
  },
  en: {
    short: { dateStyle: 'short' },
    long: { dateStyle: 'long' },
    datetime: { dateStyle: 'medium', timeStyle: 'short' },
  },
}
```

## 7. LocaleSwitcher Component

The `LocaleSwitcher` is the only UI control for changing language. It must always be a
dropdown — never radio buttons or tabs, which would not scale beyond 2 languages.

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

### Placement

The `LocaleSwitcher` is placed in `AdminHeader.vue` (admin layout) or the top navigation
bar (frontend layout). It is always in the top-right area, alongside user profile controls.

### Behavior Rules

| Rule | Detail |
| --- | --- |
| **Always a dropdown** | Never radio, tabs, or segmented control. A dropdown scales to any number of languages. |
| **Desktop** | Full language label (e.g., "中文", "English"). |
| **Mobile (< 640px)** | Globe emoji (`🌐`). The user still taps to open the dropdown. |
| **Active state** | Active language highlighted with `text-brand-600 font-medium`. |
| **Immediate effect** | After `switchTo()`, page content and Element Plus components update instantly — no page reload. |
| **Persistence** | Locale choice saved to `localStorage`. Restored on next visit. |

## 8. RTL Direction

RTL (right-to-left) support is prepared but **not exhaustively validated** unless the
project explicitly adds an RTL language (Arabic, Hebrew, Farsi, Urdu).

### Activation

RTL activates only for these language codes: `ar`, `he`, `fa`, `ur`. It is set
reactively in `useLocale.ts` (see Section 5) — `document.documentElement.dir` is set to
`'rtl'` or `'ltr'` automatically on locale change.

### CSS Rules

**Use logical CSS properties** for all horizontal spacing. Logical properties respond
automatically to `dir`, avoiding duplicate RTL stylesheets.

| Instead of | Use | Applies to |
| --- | --- | --- |
| `ml-*` | `ms-*` (margin-inline-start) | Left margin that should flip in RTL |
| `mr-*` | `me-*` (margin-inline-end) | Right margin that should flip in RTL |
| `pl-*` | `ps-*` (padding-inline-start) | Left padding that should flip in RTL |
| `pr-*` | `pe-*` (padding-inline-end) | Right padding that should flip in RTL |
| `text-left` | `text-start` | Text alignment |
| `text-right` | `text-end` | Text alignment |
| `rounded-l-*` | `rounded-s-*` | Border radius |
| `rounded-r-*` | `rounded-e-*` | Border radius |

Tailwind CSS generates both logical and physical utility classes. Prefer the logical
variants.
 
### Directional Icons

Icons that imply direction (arrows, chevrons) should use `rtl:rotate-180`:

```html
<el-icon class="rtl:rotate-180"><ArrowLeft /></el-icon>
<el-icon class="rtl:rotate-180"><ArrowRight /></el-icon>
```

### Action Columns

Action column alignment naturally follows text direction (existing rule from
`interaction-rules.md`): buttons are left-aligned in LTR, right-aligned in RTL.
No extra work needed — the `text-start`/`text-end` rule handles this.

### Validation Scope

RTL is a **prepared capability**, not a fully validated one. When the project adds an RTL
language (`ar`, `he`, `fa`, or `ur`) to `supportedLocales`, the following must be manually
audited:

1. All CSS uses logical properties (no `ml-*`, `pl-*`, `text-left` in templates).
2. Directional icons have `rtl:rotate-180`.
3. Layouts do not break at 1440px, 1024px, 768px, or 390px in RTL mode.
4. Element Plus components (tables, dialogs, menus) render correctly in RTL.
5. Form labels and input text align correctly.
