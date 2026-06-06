# Component Interaction Rules — Design Spec

**Date:** 2026-06-06
**Status:** Approved
**Scope:** 4 changes — new doc, 2 doc updates, dashboard code

## Goal

新增一套系统性的组件交互行为规范（通用规则、卡片、表格、图表、表单、导航），适用于前台和后台所有组件。同步更新 `ui-ux-agent-designer` 技能引用。最后按新规范改 dashboard 代码。

## Changes

### 1. 新增 `docs/ui-ux/07-interaction-rules.md`

#### 通用交互规则

- 可点击元素: `cursor:pointer` + hover 视觉变化 (150ms transition)
- 不可交互元素: 不应用 hover 效果（避免误导）
- focus 环: 键盘导航可见，`2px solid brand-600` outline，offset 2px
- disabled 态: `opacity: 0.5` + `cursor: not-allowed` + 不响应事件；不依赖单一颜色表达
- loading 态: skeleton 或 spinner，避免布局跳动
- transition 时长: hover 150ms / toggle 200ms / dialog-drawer 300ms

#### 卡片

- **可点击卡片**: hover `shadow-sm → shadow-md`, border `neutral-200 → brand-200`, cursor pointer; 内部按钮 `stopPropagation`
- **纯展示卡片**: 无 hover，cursor default

#### 表格

- **行 hover**: `bg-neutral-50`
- **可点击行**: cursor pointer
- **选中行**: `bg-brand-50` + 左侧 2px brand-600 border
- **可排序表头**: hover 变色 + 点击切换排序方向图标
- **不可排序表头**: cursor default
- **分页**: 当前页高亮，hover `bg-neutral-100`

#### 图表

- **柱/条 hover**: 亮度变化 + tooltip（200ms delay，标签+数值+单位）
- **点击数据点**: 可下钻（如果支持）
- **空数据**: 显示 empty state，非空白

#### 表单

- **校验时机**: blur 校验，submit 全量
- **提交按钮**: 点击后立即 loading + disabled，防重复提交
- **错误提示**: 靠近字段下方，红色文字+红边框+图标，不只用颜色
- **成功反馈**: Toast 2 秒，或页面内成功状态

#### 导航

- **侧边栏**: 当前页 `bg-brand-50 + text-brand-600 + font-medium`；未选中 hover `bg-neutral-50`
- **标签页**: 选中底部 border + brand 色文字；hover 文字变色
- **面包屑**: 最后级不可点击 `text-primary`；前级可点击 hover `brand-600`

#### 适用性标注

每条规则标注 **主要场景**（前台/后台/通用），不强制互斥。

### 2. 更新 `docs/ui-ux/01-design-principles.md`

在文档末尾（质量判断标准之后）增加一行引用：

```
## 相关文档

- `02-design-tokens.md` — 设计令牌（颜色、间距、字体、圆角、阴影、动效）
- `03-component-system.md` — 组件体系与映射
- `07-interaction-rules.md` — 组件交互行为规范
```

### 3. 更新 `docs/ui-ux/00-overview.md`

文档结构表增加一行：

```
| `07-interaction-rules.md` | 交互规范：通用规则、卡片、表格、图表、表单、导航交互行为 |
```

推荐流程增加步骤。

### 4. 更新 skill 的 `design-standards.md`

在文件末尾追加组件交互行为章节（与 `07-interaction-rules.md` 保持一致，英文版）。

### 5. Dashboard 代码交互改进

- 指标卡片: hover 微升 shadow + border 变色
- 柱状图柱子: hover tooltip 显示精确值
- 条形图条: hover 亮度变化
- 时间线条目: hover 背景微变
- 侧边栏菜单: 补全 hover + active focus 状态
