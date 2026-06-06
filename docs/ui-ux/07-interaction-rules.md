# 组件交互行为规范

本文件定义前台和后台组件的交互行为规则。Claude Code 在生成页面时必须遵守，不应生成无交互的静态组件。

## 通用规则

- 可点击元素必须有 `cursor: pointer` 和 hover 视觉变化（`duration-fast` 150ms）
- 不可交互元素不应用 hover 效果——避免误导用户
- 键盘 focus 环必须可见：`2px solid` brand-600，`outline-offset: 2px`
- **disabled 态：**
  - `opacity: 0.5` + `cursor: not-allowed` + 不响应点击/键盘事件
  - 不依赖单一颜色表达 disabled（可访问性）
- **loading 态：** skeleton 或 spinner，不应导致布局大幅跳动
- **transition 时长统一：** hover/focus 150ms / toggle 200ms / dialog-drawer 300ms

> 适用性：通用

## 卡片

### 可点击卡片
- hover：`shadow-sm → shadow-md`，`border-neutral-200 → brand-200`
- `cursor: pointer`
- 卡片内独立按钮 `@click.stop` 阻止事件冒泡

### 纯展示卡片
- 无 hover 效果，`cursor: default`
- 不添加无意义的整卡点击

> 适用性：前台为主；后台指标卡可参考可点击卡片规则做 hover

## 表格

### 数据行
- hover：`background: neutral-50`（`#f5f5f5`）
- 可点击行：`cursor: pointer`
- 当前选中行：`background: brand-50`（`#eff6ff`）+ 左侧 `2px solid` brand-600

### 表头
- 可排序列：hover 文字变色 + 点击切换排序图标（asc/desc/none）
- 不可排序列：`cursor: default`
- 排序状态必须有视觉区分

### 分页
- 当前页码：高亮背景
- 页码按钮 hover：`background: neutral-100`
- 不可用按钮（首页/末页时）：disabled 态

> 适用性：后台为主

## 图表

### 柱状图 / 条形图
- 柱子 hover：亮度变化（`filter: brightness(0.9)`）+ tooltip 显示精确值
- tooltip：延迟 200ms 显示，内容为「标签 + 数值 + 单位」，离开即消失
- 数据点可点击时：`cursor: pointer`

### 折线图
- 数据点 hover：圆点放大 + tooltip
- 线本身不响应 hover

### 空数据
- 显示 empty state（"暂无数据"），不是空白区域
- 可选：引导用户补充数据

> 适用性：后台仪表盘

## 表单

### 校验
- **校验时机：** blur 时校验当前字段，submit 时全量校验
- 校验期间不应阻止用户输入

### 提交
- 点击提交按钮后立即进入 loading + disabled 状态
- 必须阻止重复提交（前端限制 + 后端幂等）
- 提交成功后：Toast 反馈 2 秒自动消失，或页面内成功状态
- 提交失败后：恢复按钮可点击状态，显示错误信息

### 错误提示
- 靠近对应字段下方
- 红色文字（`danger` `#dc2626`）+ 输入框红色边框 + 错误图标
- 不只用颜色表达错误

### 必填项
- label 后加红色星号（`*`）
- 可选：label 后加"（选填）"标记非必填项

> 适用性：通用

## 导航

### 侧边栏
- 当前页面项：`bg-brand-50 + text-brand-600 + font-medium`
- 未选中项 hover：`bg-neutral-50`
- active 和 focus 状态必须可见
- 收缩/展开切换：200ms transition

### 标签页
- 选中标签：底部 2px border + brand-600 文字
- 未选中 hover：文字变为 brand-600
- 切换时内容区无跳动

### 面包屑
- 最后一级（当前页）：不可点击，`color: neutral-950`
- 前面各级：可点击，hover `color: brand-600`
- 分隔符不参与交互

> 适用性：通用

## 适用性索引

| 组件 | 前台 | 后台 |
| --- | --- | --- |
| 可点击卡片 | 主要场景 | 指标卡 hover 可用 |
| 纯展示卡片 | 内容展示 | 数据卡片 |
| 表格 | 不常用 | 主要场景 |
| 图表 | 不常用 | 仪表盘 |
| 表单校验 | 简化校验 | 完整校验 |
| 侧边栏 | 可选 | 标准配置 |
| 标签页 | 内容分类 | 功能切换 |
