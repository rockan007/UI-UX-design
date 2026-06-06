# Admin Dashboard Page — Design Spec

**Date:** 2026-06-06
**Status:** Approved
**Type:** Vue 3 + Element Plus + Tailwind CSS · 后台仪表盘

## Goal

在 `login-homepage-preview` 项目中新增后台 Dashboard 页面 (`/admin`)，展示管理后台的典型数据概览布局。

## UI DSL

```json
{
  "page": "Dashboard",
  "type": "admin",
  "route": "/admin",
  "goal": "管理员快速查看系统关键指标和趋势",
  "layout": "admin-dashboard",
  "header": {
    "title": "仪表盘",
    "description": "过去 30 天的核心数据概览"
  },
  "sections": [
    {
      "component": "MetricGrid",
      "metrics": [
        { "label": "活跃用户", "value": "12,483", "change": "+12%", "trend": "up" },
        { "label": "今日订单", "value": "347", "change": "+5%", "trend": "up" },
        { "label": "收入", "value": "¥38,200", "change": "-3%", "trend": "down" },
        { "label": "待处理", "value": "23", "change": "0%", "trend": "flat" }
      ]
    },
    { "title": "订单趋势（近 7 天）", "component": "SimpleLineChart" },
    { "title": "按类别分布", "component": "SimpleBarChart" },
    { "title": "最近活动", "component": "StatusTimeline" }
  ],
  "states": ["loading", "empty", "error"],
  "responsive": {
    "desktop": "sidebar + 4-metrics + 2-charts-row + timeline",
    "mobile": "no-sidebar, 2-metrics-row, stacked-charts"
  }
}
```

## Layout

- **Shell:** 白色侧边栏 (220px, `#ffffff`, `border-right: 1px solid #e5e5e5`) + 浅灰内容区 (`#f5f5f5`)
- **Sidebar:** Logo + 菜单项，当前页高亮 `bg: #eff6ff, color: #2563eb`
- **Header:** 24px title + 13px description
- **Metric Cards:** 4 列 grid, 16px gap, 6px radius, 16px padding
- **Charts:** 2 列 grid (2:1), 折线图左 + 柱状图右
- **Timeline:** 纵向时间线，左侧竖线 + 圆点，最新在最上

## Design Tokens (Admin)

| Token | Value |
|---|---|
| Title size | 24px / 600 |
| Page padding | 24px |
| Card padding | 16px |
| Card radius | 6px |
| Section gap | 16px |
| Sidebar width | 220px |
| Content bg | `#f5f5f5` |

## Metrics Data

| Label | Value | Change | Trend | Color |
|---|---|---|---|---|
| 活跃用户 | 12,483 | +12% | up | `#16a34a` |
| 今日订单 | 347 | +5% | up | `#16a34a` |
| 收入 | ¥38,200 | -3% | down | `#dc2626` |
| 待处理 | 23 | 0% | flat | `#737373` |

## Chart Data (Mock)

- 折线图: 周一~周日订单数 (7 data points)
- 柱状图: 设计/开发/营销/运维 4 类别
- Timeline: 3 条最近活动

## States

- `loading`: 4 skeleton cards + 2 skeleton chart blocks
- `empty`: EmptyState with "暂无数据" 
- `error`: ErrorState with retry button

## Files

- Create: `src/views/DashboardView.vue`
- Modify: `src/router/index.ts` (add `/admin` route)
- Modify: `login-homepage-preview/index.html` (update title)
