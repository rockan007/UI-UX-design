# UI DSL 设计

UI DSL 是页面生成前的结构化描述。Claude Code 应先生成 UI DSL，让页面结构、组件、状态和响应式规则可审查，再根据组件映射表生成代码。

## DSL 目标

- 降低 Agent 自由发挥
- 让页面结构先于代码被审查
- 统一组件选择
- 明确页面状态和响应式规则
- 让前台和后台页面都能稳定生成

## 基础字段

```json
{
  "page": "PageName",
  "type": "frontend | admin",
  "route": "/path",
  "goal": "用户在这个页面要完成的核心任务",
  "layout": "layout-name",
  "navigation": {},
  "header": {},
  "sections": [],
  "states": [],
  "responsive": {}
}
```

## 后台列表页示例

```json
{
  "page": "UserManagement",
  "type": "admin",
  "route": "/admin/users",
  "goal": "管理员查看、筛选和管理用户",
  "layout": "admin-list",
  "header": {
    "title": "用户管理",
    "description": "查看用户状态、角色和最近活动",
    "primaryAction": {
      "label": "新增用户",
      "component": "Button",
      "variant": "primary"
    }
  },
  "filters": [
    {
      "name": "keyword",
      "component": "Input",
      "placeholder": "搜索姓名、邮箱或手机号"
    },
    {
      "name": "status",
      "component": "Select",
      "placeholder": "用户状态",
      "options": ["全部", "启用", "禁用"]
    }
  ],
  "table": {
    "component": "DataTable",
    "columns": [
      { "key": "name", "label": "用户", "priority": "high" },
      { "key": "role", "label": "角色", "priority": "medium" },
      { "key": "status", "label": "状态", "component": "Badge" },
      { "key": "createdAt", "label": "创建时间" },
      { "key": "actions", "label": "操作", "align": "right" }
    ]
  },
  "states": ["loading", "empty", "error", "permissionDenied"],
  "responsive": {
    "desktop": "table",
    "mobile": "card-list"
  }
}
```

## 后台表单页示例

```json
{
  "page": "CreateUser",
  "type": "admin",
  "route": "/admin/users/new",
  "goal": "管理员创建新用户",
  "layout": "admin-form",
  "header": {
    "title": "新增用户",
    "description": "创建账号并分配初始角色"
  },
  "form": {
    "sections": [
      {
        "title": "基础信息",
        "fields": [
          { "name": "name", "label": "姓名", "component": "Input", "required": true },
          { "name": "email", "label": "邮箱", "component": "Input", "required": true },
          { "name": "role", "label": "角色", "component": "Select", "required": true }
        ]
      },
      {
        "title": "账号状态",
        "fields": [
          { "name": "enabled", "label": "启用账号", "component": "Switch" }
        ]
      }
    ],
    "actions": [
      { "label": "取消", "variant": "secondary" },
      { "label": "保存", "variant": "primary" }
    ]
  },
  "states": ["validationError", "submitting", "success", "error"]
}
```

## 前台页面示例

```json
{
  "page": "CourseList",
  "type": "frontend",
  "route": "/courses",
  "goal": "用户浏览并找到合适课程",
  "layout": "frontend-list",
  "header": {
    "title": "课程",
    "description": "按主题、难度和时间筛选课程"
  },
  "sections": [
    {
      "component": "SearchPanel",
      "fields": ["keyword", "category", "level"]
    },
    {
      "component": "ResultList",
      "itemComponent": "CourseCard"
    }
  ],
  "states": ["loading", "empty", "error"],
  "responsive": {
    "desktop": "filters-left-results-right",
    "mobile": "filters-collapsed-results-list"
  }
}
```

## 后台仪表盘示例

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
    {
      "title": "订单趋势",
      "component": "SimpleLineChart"
    },
    {
      "title": "按类别分布",
      "component": "SimpleBarChart"
    },
    {
      "title": "最近活动",
      "component": "StatusTimeline"
    }
  ],
  "states": ["loading", "empty", "error"],
  "responsive": {
    "desktop": "4-metrics-then-charts",
    "mobile": "2-metrics-then-stacked-charts"
  }
}
```

## 后台设置页示例

```json
{
  "page": "Settings",
  "type": "admin",
  "route": "/admin/settings",
  "goal": "管理员配置系统参数",
  "layout": "admin-form",
  "header": {
    "title": "系统设置",
    "description": "管理站点基本配置和安全选项"
  },
  "form": {
    "sections": [
      {
        "title": "基本信息",
        "fields": [
          { "name": "siteName", "label": "站点名称", "component": "Input", "required": true },
          { "name": "siteDescription", "label": "站点描述", "component": "Textarea" }
        ]
      },
      {
        "title": "安全设置",
        "fields": [
          { "name": "enableRegistration", "label": "开放注册", "component": "Switch" },
          { "name": "sessionTimeout", "label": "会话超时", "component": "Select", "options": ["15分钟", "30分钟", "1小时", "4小时"] }
        ]
      }
    ],
    "actions": [
      { "label": "重置", "variant": "secondary" },
      { "label": "保存设置", "variant": "primary" }
    ]
  },
  "states": ["validationError", "submitting", "success", "error"]
}
```

## 后台详情页示例

```json
{
  "page": "OrderDetail",
  "type": "admin",
  "route": "/admin/orders/:id",
  "goal": "管理员查看订单详情并处理订单",
  "layout": "admin-detail",
  "header": {
    "title": "订单详情",
    "breadcrumbs": ["订单管理", "ORD-20240606-001"],
    "primaryAction": {
      "label": "处理订单",
      "component": "Button",
      "variant": "primary"
    }
  },
  "sections": [
    {
      "component": "DetailPanel",
      "groups": [
        {
          "title": "订单信息",
          "fields": ["订单编号", "状态", "金额", "创建时间", "支付方式"]
        },
        {
          "title": "客户信息",
          "fields": ["姓名", "邮箱", "手机号"]
        }
      ]
    },
    {
      "component": "DataTable",
      "title": "商品明细",
      "columns": [
        { "key": "productName", "label": "商品" },
        { "key": "quantity", "label": "数量" },
        { "key": "unitPrice", "label": "单价" },
        { "key": "subtotal", "label": "小计" }
      ]
    },
    {
      "component": "AuditTimeline",
      "title": "操作记录"
    }
  ],
  "states": ["loading", "error", "permissionDenied"],
  "responsive": {
    "desktop": "detail-panel-table-timeline",
    "mobile": "stacked-sections"
  }
}
```
