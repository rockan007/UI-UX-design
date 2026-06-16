# 国际化规则

可选的国际化规则。仅当项目的 `package.json` 中包含 `"vue3ElementUiUx": { "i18n": true }` 时激活。

当 i18n 激活时，项目中所有用户可见的文本必须通过 `vue-i18n` 管理，包括 Element Plus 组件文本。模板中不得出现硬编码的中文或英文字符串。

## 1. 技术栈

| 层级 | 包 | 说明 |
| --- | --- | --- |
| i18n 核心 | `vue-i18n` v9+ | Composition API 模式，`legacy: false` |
| UI 语言区域 | `element-plus/dist/locale/*.mjs` | Element Plus 官方语言包 |
| 持久化 | `localStorage` | 保存/恢复语言偏好 |
| 构建插件 | **无** | `@intlify/unplugin-vue-i18n` 不在范围内 |

| 规则 | 理由 |
| --- | --- |
| `legacy: false` | Composition API（`useI18n()`）所必需。旧版模式会触发 Options API 警告。 |
| `fallbackLocale: 'zh'` | 中文是项目的默认语言。当活动语言区域中缺少某个键时，所有页面以中文呈现。 |
| 不使用 `@intlify/unplugin-vue-i18n` | 避免构建时插件复杂性。所有语言数据均为静态导入。 |
| 挂载时从 `localStorage` 恢复 locale | 页面刷新后仍保留。若无已保存的值，则回退到 `'zh'`。 |

## 2. 文件结构

启用 i18n 时，项目必须包含：

```
src/
├── locales/
│   ├── index.ts              # createI18n 实例 + 数字/日期时间格式
│   ├── zh.json                # 中文消息
│   └── en.json                # 英文消息
├── composables/
│   └── useLocale.ts           # locale 切换逻辑 + Element Plus locale 同步
└── components/
    └── LocaleSwitcher.vue     # 语言切换下拉菜单
```

| 文件 | 职责 |
| --- | --- |
| `locales/index.ts` | 创建 `i18n` 实例。导出 `messages`、`numberFormats`、`datetimeFormats`。由 `main.ts` 导入。 |
| `locales/zh.json` | 所有中文消息键。结构为 3 级点号表示法。 |
| `locales/en.json` | 所有英文消息键。必须与 `zh.json` 的结构完全对应 — 相同的键、相同的嵌套层级。 |
| `composables/useLocale.ts` | 提供 `switchTo(lang)`、`locale`、`supportedLocales`。响应式同步 Element Plus locale。导出 `elLocaleMap` 用于初始挂载。 |
| `components/LocaleSwitcher.vue` | 唯一用于更改语言的 UI 控件。始终为 `el-dropdown`。 |

**i18n 激活时，以上五个文件全部为必需项。** 启用了 i18n 的项目如果缺少其中任何一个文件，即视为不完整。

## 3. 配置（main.ts）

`main.ts` 设置必须：

1. 从 `localStorage` 恢复已保存的 locale（默认 `'zh'`）。
2. 以 `legacy: false` 创建 `i18n` 实例。
3. 将初始 locale 传递给 Element Plus，确保组件在任何切换之前均正确渲染。
4. 将 `i18n`、`router` 和 `ElementPlus` 注册为插件。

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

**不要** 懒加载 Element Plus locale — 该导入为静态且轻量。
**不要** 将 locale 初始化包裹在 `watch` 或 `onMounted` 中 — 初始 locale 必须在 `app.mount()` 之前设置。

## 4. 语言文件

### 键命名约定

3 级点号表示法：`page.section.element`。最多 4 级深度。

| 层级 | 范围 | 示例 |
| --- | --- | --- |
| `common.*` | 所有页面共享 | `common.save`、`common.cancel`、`common.delete` |
| `<page>.*` | 每个页面一个顶级键，与路由路径对齐 | `login.title`、`login.email`、`login.submit` |
| `<page>.<section>.*` | 包含多个区域的页面 | `userManagement.list.title`、`userManagement.form.email` |

**规则：**
- 参数化文本使用 `{param}` 占位符 — 不得使用字符串拼接。
- `zh.json` 中的每个键在 `en.json` 中必须有完全相同的键（相同路径、相同嵌套）。
- 禁止动态构造键：`$t('common.' + action)` 不允许。使用计算属性或显式键。
- 键使用 camelCase，而非 snake_case 或 kebab-case。

### zh.json 结构

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

### en.json 结构

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

## 5. 语言切换（useLocale.ts）

`useLocale` 组合式函数是 locale 状态的唯一数据源。每个需要读取或更改 locale 的组件都通过导入此组合式函数来实现 — 任何组件都不得直接操作 `localStorage` 或 `document.documentElement`。

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

| 导出项 | 用途 |
| --- | --- |
| `elLocaleMap` | 将语言代码映射到 Element Plus locale 对象。由 `main.ts` 用于初始挂载。 |
| `useLocale()` | 组合式函数：返回 `locale`（ref）、`switchTo(lang)` 和 `supportedLocales`。 |
| `switchTo()` | 更新 `locale` ref，持久化到 `localStorage`，设置 `<html lang>` 和 `<html dir>`。对不支持的语言无操作。 |

**规则：**
- `supportedLocales` 从 `elLocaleMap` 的键中派生 — 添加语言意味着导入语言包并将其加入映射。无需单独的配置文件。
- 添加新语言时，将其 Element Plus locale 加入 `elLocaleMap`，并将其消息文件加入 `src/locales/`。
- `document.documentElement.dir` 为潜在的 RTL 语言预留响应式设置（见第 8 节）。

## 6. 格式化

### 数字格式化

模板中使用 `$n(value, format)`。格式定义位于 `locales/index.ts`。

**绝不要** 在模板中直接使用 `toLocaleString()`、`Intl.NumberFormat` 或手动添加货币符号 — 它们绕过了 locale 系统，会产生不一致的输出。

```ts
// locales/index.ts — numberFormats 和 datetimeFormats 摘录

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

模板用法：

```html
<span>{{ $n(order.amount, 'currency') }}</span>
<span>{{ $n(user.balance, 'decimal') }}</span>
<span>{{ $n(conversionRate, 'percent') }}</span>
```

### 日期/时间格式化

模板中使用 `$d(value, format)`。格式定义位于 `locales/index.ts`。

**绝不要** 在模板中直接使用 `toLocaleDateString()`、`toLocaleTimeString()` 或手动解析日期。

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

模板用法：

```html
<span>{{ $d(order.createdAt, 'short') }}</span>
<span>{{ $d(event.date, 'long') }}</span>
<span>{{ $d(log.timestamp, 'datetime') }}</span>
```

### 合并的 locales/index.ts

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

## 7. LocaleSwitcher 组件

`LocaleSwitcher` 是唯一用于更改语言的 UI 控件。它必须始终是一个下拉菜单 — 绝不使用单选按钮或标签页，因为那样无法扩展到 2 种以上的语言。

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

### 放置位置

`LocaleSwitcher` 放置在 `AdminHeader.vue`（管理后台布局）或顶部导航栏（前端布局）中。始终位于右上角区域，与用户个人中心控件相邻。

### 行为规则

| 规则 | 详情 |
| --- | --- |
| **始终使用下拉菜单** | 绝不使用单选按钮、标签页或分段控件。下拉菜单可扩展到任意数量的语言。 |
| **桌面端** | 完整语言标签（如"中文"、"English"）。 |
| **移动端（< 640px）** | 地球 emoji（`🌐`）。用户仍可点击打开下拉菜单。 |
| **激活状态** | 当前语言高亮显示 `text-brand-600 font-medium`。 |
| **即时生效** | 调用 `switchTo()` 后，页面内容和 Element Plus 组件即时更新 — 无需刷新页面。 |
| **持久化** | locale 选择保存到 `localStorage`。下次访问时恢复。 |

## 8. RTL 方向

RTL（从右到左）支持已预备，但**除非项目明确添加 RTL 语言**（阿拉伯语、希伯来语、波斯语、乌尔都语），否则不做详尽验证。

### 激活

RTL 仅对以下语言代码激活：`ar`、`he`、`fa`、`ur`。在 `useLocale.ts` 中响应式设置（见第 5 节） — `document.documentElement.dir` 在 locale 变更时自动设为 `'rtl'` 或 `'ltr'`。

### CSS 规则

**对所有水平间距使用逻辑 CSS 属性。** 逻辑属性会自动响应 `dir`，避免重复的 RTL 样式表。

| 替代 | 使用 | 适用于 |
| --- | --- | --- |
| `ml-*` | `ms-*`（margin-inline-start） | 在 RTL 中应翻转的左外边距 |
| `mr-*` | `me-*`（margin-inline-end） | 在 RTL 中应翻转的右外边距 |
| `pl-*` | `ps-*`（padding-inline-start） | 在 RTL 中应翻转的左内边距 |
| `pr-*` | `pe-*`（padding-inline-end） | 在 RTL 中应翻转的右内边距 |
| `text-left` | `text-start` | 文本对齐 |
| `text-right` | `text-end` | 文本对齐 |
| `rounded-l-*` | `rounded-s-*` | 圆角 |
| `rounded-r-*` | `rounded-e-*` | 圆角 |

Tailwind CSS 同时生成逻辑和物理工具类。优先使用逻辑变体。

### 方向性图标

暗示方向的图标（箭头、chevron）应使用 `rtl:rotate-180`：

```html
<el-icon class="rtl:rotate-180"><ArrowLeft /></el-icon>
<el-icon class="rtl:rotate-180"><ArrowRight /></el-icon>
```

### 操作列

操作列对齐自然跟随文本方向（来自 `interaction-rules.md` 的现有规则）：按钮在 LTR 中左对齐，在 RTL 中右对齐。无需额外处理 — `text-start`/`text-end` 规则已覆盖此情况。

### 验证范围

RTL 是一种**预备能力**，而非完全验证的能力。当项目将 RTL 语言（`ar`、`he`、`fa` 或 `ur`）添加到 `supportedLocales` 时，必须手动审查以下内容：

1. 所有 CSS 使用逻辑属性（模板中无 `ml-*`、`pl-*`、`text-left`）。
2. 方向性图标具有 `rtl:rotate-180`。
3. 布局在 1440px、1024px、768px 和 390px 的 RTL 模式下不会错乱。
4. Element Plus 组件（表格、对话框、菜单）在 RTL 下正确渲染。
5. 表单标签和输入文本对齐正确。
