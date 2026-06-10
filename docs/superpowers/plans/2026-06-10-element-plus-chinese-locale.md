# Element Plus 中文语言包配置 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `main.ts` 中配置 Element Plus 中文 locale，使所有内置组件文本（分页、表格、下拉框等）显示中文。

**Architecture:** 全局一次性配置 — 从 `element-plus/dist/locale/zh-cn.mjs` 导入中文语言包，通过 `app.use()` 的第二个参数传入，影响所有 Element Plus 组件。

**Tech Stack:** Vue 3, Element Plus, TypeScript

---

### Task 1: 配置 Element Plus 中文 locale

**Files:**
- Modify: `login-homepage-preview/src/main.ts`

- [ ] **Step 1: 添加 zhCn import**

在 `login-homepage-preview/src/main.ts` 中，在 `import 'element-plus/dist/index.css'` 之后新增一行：

```ts
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
```

修改后的 import 区域：

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './style.css'
import App from './App.vue'
import router from './router'
```

- [ ] **Step 2: 修改 app.use 调用传入 locale**

将 `app.use(ElementPlus)` 改为 `app.use(ElementPlus, { locale: zhCn })`：

```ts
const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.mount('#app')
```

- [ ] **Step 3: 启动 dev server 验证**

```bash
cd login-homepage-preview && npm run dev
```

打开浏览器检查订单管理页面（或其他含 `el-pagination`、`el-select`、`el-table` 的页面）：
- `el-pagination` 显示"共 X 条"、"X条/页"等中文文本
- `el-select` placeholder 显示"请选择"
- `el-table` 空数据提示显示"暂无数据"

- [ ] **Step 4: 提交**

```bash
git add login-homepage-preview/src/main.ts
git commit -m "feat: configure Element Plus Chinese locale"
```
