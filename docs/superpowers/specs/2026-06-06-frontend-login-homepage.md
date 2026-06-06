# Frontend Login & Homepage — Design Spec

**Date:** 2026-06-06
**Status:** Approved
**Type:** Vue 3 + Element Plus + Tailwind CSS 通用前台模板

## Goal

生成两个前台页面（登录页 + 首页）的完整 Vue 3 代码，用户可在浏览器中预览效果。页面遵循 `docs/ui-ux/` 下的设计规范。

## Tech Stack

- Vue 3 (Composition API + `<script setup>`)
- Element Plus (组件)
- Tailwind CSS (布局/间距)
- @element-plus/icons-vue (图标)
- Vite (构建)

## Page 1: Login (`/login`)

### UI DSL

```json
{
  "page": "Login",
  "type": "frontend",
  "route": "/login",
  "goal": "用户登录系统",
  "layout": "frontend-centered",
  "header": {
    "title": "欢迎回来",
    "description": "登录您的账号以继续"
  },
  "form": {
    "fields": [
      { "name": "email", "label": "邮箱", "component": "Input", "required": true },
      { "name": "password", "label": "密码", "component": "Input", "type": "password", "required": true }
    ],
    "extras": ["记住我", "忘记密码"],
    "actions": [
      { "label": "登录", "variant": "primary", "fullWidth": true }
    ]
  },
  "states": ["validationError", "submitting", "error", "success"],
  "responsive": { "desktop": "centered-card-400px", "mobile": "full-width-card" }
}
```

### Layout
- 全屏渐变背景 (`#f5f7fa` → `#c3cfe2`)
- 居中白色卡片: 400px 宽桌面, 全宽移动端
- 顶部: Logo (品牌色方块) + 标题 + 描述文字
- 表单: 邮箱 Input + 密码 Input + 记住我 Checkbox + 忘记密码链接
- 底部: 全宽 primary 登录按钮

### States
- `validationError`: 字段下方红色错误提示
- `submitting`: 按钮 loading + disabled
- `error`: 表单顶部 ElAlert 错误提示 ("邮箱或密码错误")

## Page 2: Homepage (`/`)

### UI DSL

```json
{
  "page": "Home",
  "type": "frontend",
  "route": "/",
  "goal": "用户了解产品价值并开始使用",
  "layout": "frontend-landing",
  "header": {
    "navigation": ["首页", "功能", "关于", "登录"]
  },
  "sections": [
    {
      "component": "HeroSection",
      "title": "让工作更高效",
      "description": "一体化解决方案，帮助团队协作、管理和交付",
      "primaryAction": { "label": "免费试用", "variant": "primary" },
      "secondaryAction": { "label": "了解更多", "variant": "secondary" }
    },
    {
      "component": "FeatureList",
      "features": [
        { "icon": "Monitor", "title": "项目管理", "description": "看板、甘特图、任务分配" },
        { "icon": "ChatDotRound", "title": "团队协作", "description": "即时通讯、文件共享、评论" },
        { "icon": "DataAnalysis", "title": "数据分析", "description": "自定义报表、实时仪表盘" }
      ]
    },
    {
      "component": "ContentSection",
      "title": "现在开始",
      "description": "已有 10,000+ 团队在使用",
      "primaryAction": { "label": "免费试用", "variant": "primary" }
    }
  ],
  "states": ["loading"],
  "responsive": {
    "desktop": "sections-vertical",
    "mobile": "stacked-with-reduced-hero"
  }
}
```

### Layout
- 导航栏: Logo + 导航链接 + 登录按钮 (sticky top)
- Hero: 渐变背景, 大标题 30px + 描述 + 双 CTA 按钮
- Features: 3 列网格, 图标 + 标题 + 描述, 桌面 3 列 移动端 1 列
- CTA Section: 浅灰背景, 标题 + 副标题 + primary 按钮
- Footer: 版权信息

## Design Tokens (from 02-design-tokens.md)
- Primary: `#2563eb` (brand-600)
- Primary hover: `#1d4ed8` (brand-700)
- Text primary: `#0a0a0a` (neutral-950)
- Text secondary: `#262626` (neutral-800)
- Text muted: `#737373` (neutral-500)
- Border: `#e5e5e5` (neutral-200)
- Background: `#fafafa` (neutral-50)
- Page padding desktop: 32px
- Card radius: 8px (frontend)
- Button radius: 6px

## Project Structure

```
login-homepage-preview/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── router/
│   │   └── index.ts
│   ├── views/
│   │   ├── LoginView.vue
│   │   └── HomeView.vue
│   └── style.css
```

## Constraints
- 不引入除 Element Plus / @element-plus/icons-vue 外的 UI 库
- 使用 Tailwind 做布局和间距，Element Plus 做组件
- 覆盖 Element Plus CSS 变量对接设计令牌颜色
- 移动端响应式: 导航可收起, Hero 字号减小, Features 单列堆叠
