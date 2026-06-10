# Element Plus 中文语言包配置 — 设计说明

**日期**: 2026-06-10
**状态**: 已批准

## 背景

项目使用 Element Plus UI 框架，但未配置任何语言包。Element Plus 默认使用英文 locale，导致分页组件（`el-pagination`）等显示英文文本如 "Total"、"per page"、"Go to"，与中文页面内容不一致。

## 影响范围

除分页外，以下已使用的组件同样受英文默认值影响：
- `el-select` — placeholder 显示 "Select"
- `el-table` — 空数据提示显示 "No Data"
- `el-pagination` — total、sizes、prev/next、jumper 文本均为英文
- `el-drawer` — ARIA 标签为英文

## 方案

**全局配置 Element Plus 中文语言包。**

### 代码改动

修改 `login-homepage-preview/src/main.ts`：

1. 新增 import：`import zhCn from 'element-plus/dist/locale/zh-cn.mjs'`
2. 修改 `app.use` 调用：`app.use(ElementPlus, { locale: zhCn })`

### Skill 改动

1. **`vue3-element-ui-ux/SKILL.md`** — 非协商规则新增：必须配置 Element Plus 中文 locale
2. **`vue3-element-ui-ux/references/generation-rules.md`** — 必须遵守规则新增第 13 条
3. **`ui-ux-agent-designer/SKILL.md`** — 非协商规则新增：UI 框架 locale 必须匹配项目语言

### 不做的事

- 不安装额外依赖（`zhCn` 已内置在 `element-plus`）
- 不在单个页面/组件中按需配置（全局配置更一致）
- 不配置 dayjs 语言包（目前无日期组件使用）

## 验证

启动 dev server 后检查：
- `el-pagination` 显示"共 X 条"、"X条/页"等中文文本
- `el-select` placeholder 显示"请选择"
- `el-table` 空数据提示显示"暂无数据"
