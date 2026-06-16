# UI DSL

代码之前的结构化界面计划。每个页面都先输出 UI DSL —— 在 DSL 清晰之前绝不编写代码。

## 基础模式

```json
{
  "page": "PageName",
  "type": "frontend | admin | mixed",
  "route": "/path",
  "goal": "Core user task on this page",
  "layout": "layout-name",
  "navigation": {},
  "header": {},
  "userFlow": [],
  "sections": [],
  "actions": [],
  "interactions": [],
  "feedback": {},
  "validation": {},
  "edgeCases": [],
  "states": [],
  "responsive": {},
  "locale": {
    "enabled": false,
    "default-locale": "zh",
    "supported": ["zh"]
  }
}
```

必填字段：`page`、`type`、`route`、`goal`、`layout`、`header`、`userFlow`、`sections`、`actions`、`interactions`、`states`、`responsive`。
启用国际化时的可选字段：locale（enabled、default-locale、supported）。

### 交互字段

```json
{
  "userFlow": [
    "Where the user enters from",
    "What the user should do first",
    "How the user completes the task",
    "What the user does next"
  ],
  "interactions": [
    {
      "name": "actionName",
      "trigger": "User action",
      "precondition": "Required condition",
      "feedback": "Immediate UI response",
      "success": "Successful result",
      "failure": "Failure behavior",
      "recovery": "How the user recovers"
    }
  ],
  "feedback": {
    "loading": "How loading appears",
    "success": "How success appears",
    "error": "How failure appears"
  },
  "validation": {
    "timing": "onBlur | onSubmit | onChange",
    "display": "field-level | section-level | page-level"
  },
  "edgeCases": [
    "No data",
    "No permission",
    "Network failure",
    "Long text",
    "Small screen"
  ]
}
```

## 页面模板

### 管理后台列表

```json
{
  "page": "UserManagement",
  "type": "admin",
  "route": "{admin-prefix}/users",
  "goal": "Admin views, filters, and manages users",
  "layout": "admin-list",
  "header": {
    "title": "User Management",
    "description": "View user status, roles, and recent activity",
    "primaryAction": { "label": "Add User", "component": "Button", "variant": "primary" }
  },
  "userFlow": [
    "Admin enters user list from sidebar",
    "Admin scans user status and recent activity",
    "Admin filters by keyword or status",
    "Admin opens row actions or creates a new user",
    "System confirms destructive actions and updates the table"
  ],
  "filters": [
    { "name": "keyword", "component": "Input", "placeholder": "Search name, email, or phone" },
    { "name": "status", "component": "Select", "placeholder": "Status", "options": ["All", "Active", "Disabled"] }
  ],
  "table": {
    "component": "DataTable",
    "columns": [
      { "key": "name", "label": "User", "priority": "high" },
      { "key": "role", "label": "Role", "priority": "medium" },
      { "key": "status", "label": "Status", "component": "Badge" },
      { "key": "createdAt", "label": "Created" },
      { "key": "actions", "label": "Actions", "align": "right" }
    ]
  },
  "interactions": [
    {
      "name": "filterUsers",
      "trigger": "Change filter or submit keyword",
      "precondition": "Filter value changed",
      "feedback": "Table shows loading state",
      "success": "Table updates and applied filters remain visible",
      "failure": "Show section-level error with retry",
      "recovery": "User can retry or clear filters"
    },
    {
      "name": "deleteUser",
      "trigger": "Click row destructive action",
      "precondition": "User has permission",
      "feedback": "Show confirmation dialog with affected user",
      "success": "Close dialog, show toast, update row status",
      "failure": "Keep dialog or row visible and show retryable error",
      "recovery": "User can cancel or retry"
    }
  ],
  "feedback": {
    "loading": "Skeleton rows preserve table layout",
    "success": "Toast confirms the completed operation",
    "error": "Inline table error provides retry"
  },
  "edgeCases": ["empty result", "permission denied", "network failure", "long user name"],
  "states": ["loading", "empty", "error", "permissionDenied"],
  "responsive": { "desktop": "table", "mobile": "card-list" }
}
```

### 管理后台表单

```json
{
  "page": "CreateUser",
  "type": "admin",
  "route": "{admin-prefix}/users/new",
  "goal": "Admin creates a new user",
  "layout": "admin-form",
  "header": { "title": "Add User", "description": "Create account and assign initial role" },
  "userFlow": [
    "Admin enters create user page from list",
    "Fills in basic info",
    "Selects role and account status",
    "Submits the form",
    "System saves and navigates back to list or shows success feedback"
  ],
  "form": {
    "sections": [
      {
        "title": "Basic Info",
        "fields": [
          { "name": "name", "label": "Name", "component": "Input", "required": true },
          { "name": "email", "label": "Email", "component": "Input", "required": true },
          { "name": "role", "label": "Role", "component": "Select", "required": true }
        ]
      },
      {
        "title": "Account Status",
        "fields": [
          { "name": "enabled", "label": "Enable Account", "component": "Switch" }
        ]
      }
    ],
    "actions": [
      { "label": "Cancel", "variant": "secondary" },
      { "label": "Save", "variant": "primary" }
    ]
  },
  "interactions": [
    {
      "name": "submitCreateUser",
      "trigger": "Click Save",
      "precondition": "Required fields are valid",
      "feedback": "Save button becomes loading and disabled",
      "success": "Show success toast and navigate back to list",
      "failure": "Show field-level validation or page-level retryable error",
      "recovery": "Keep entered values so user can correct and resubmit"
    }
  ],
  "validation": {
    "timing": "onBlur and onSubmit",
    "display": "field-level"
  },
  "feedback": {
    "submitting": "Primary button loading prevents double submit",
    "success": "Toast confirms creation",
    "error": "Errors appear near fields or in form alert"
  },
  "edgeCases": ["duplicate email", "missing required field", "permission denied"],
  "states": ["validationError", "submitting", "success", "error"]
}
```

### 管理后台仪表盘

```json
{
  "page": "Dashboard",
  "type": "admin",
  "route": "{admin-prefix}",
  "goal": "Admin views key metrics and trends",
  "layout": "admin-dashboard",
  "header": { "title": "Dashboard", "description": "Core metrics for the past 30 days" },
  "userFlow": [
    "Admin lands on dashboard after login",
    "Scans key metrics at a glance",
    "Checks trend charts for anomalies",
    "Reviews recent activity timeline",
    "Navigates to a specific section for deeper investigation"
  ],
  "sections": [
    {
      "component": "MetricGrid",
      "metrics": [
        { "label": "Active Users", "value": "12,483", "change": "+12%", "trend": "up" },
        { "label": "Orders Today", "value": "347", "change": "+5%", "trend": "up" },
        { "label": "Revenue", "value": "¥38,200", "change": "-3%", "trend": "down" },
        { "label": "Pending", "value": "23", "change": "0%", "trend": "flat" }
      ]
    },
    { "title": "Order Trend (7 days)", "component": "SimpleLineChart" },
    { "title": "By Category", "component": "SimpleBarChart" },
    { "title": "Recent Activity", "component": "StatusTimeline" }
  ],
  "interactions": [
    {
      "name": "clickMetricCard",
      "trigger": "Click a metric card",
      "precondition": "Card is clickable",
      "feedback": "Navigate to filtered detail view",
      "success": "Detailed data loads",
      "failure": "Show error in detail area with retry",
      "recovery": "User navigates back to dashboard"
    }
  ],
  "feedback": {
    "loading": "Skeleton cards for metrics, skeleton for charts",
    "empty": "Empty state per section with guidance",
    "error": "Section-level error with retry button"
  },
  "edgeCases": ["no data for period", "chart rendering failure", "slow metric query", "mobile chart readability"],
  "states": ["loading", "empty", "error"],
  "responsive": { "desktop": "sidebar + 4-metrics + 2-charts + timeline", "mobile": "no-sidebar, 2-metrics, stacked-charts" }
}
```

### 管理后台详情

```json
{
  "page": "OrderDetail",
  "type": "admin",
  "route": "{admin-prefix}/orders/:id",
  "goal": "Admin views and processes order details",
  "layout": "admin-detail",
  "header": {
    "title": "Order Detail",
    "breadcrumbs": ["Orders", "ORD-20240606-001"],
    "primaryAction": { "label": "Process Order", "component": "Button", "variant": "primary" }
  },
  "userFlow": [
    "Admin clicks an order from the list",
    "Reviews order info and customer details",
    "Checks line items and activity log",
    "Takes action (process, edit, or contact customer)",
    "Returns to order list"
  ],
  "sections": [
    {
      "component": "DetailPanel",
      "groups": [
        { "title": "Order Info", "fields": ["Order No", "Status", "Amount", "Created", "Payment"] },
        { "title": "Customer Info", "fields": ["Name", "Email", "Phone"] }
      ]
    },
    { "component": "DataTable", "title": "Line Items", "columns": [{ "key": "productName", "label": "Product" }, { "key": "quantity", "label": "Qty" }, { "key": "unitPrice", "label": "Unit Price" }, { "key": "subtotal", "label": "Subtotal" }] },
    { "component": "AuditTimeline", "title": "Activity Log" }
  ],
  "interactions": [
    {
      "name": "processOrder",
      "trigger": "Click Process Order button",
      "precondition": "Order is in a processable status",
      "feedback": "Button shows loading, form or confirmation dialog opens",
      "success": "Order status updates, success toast",
      "failure": "Show error with reason and retry option",
      "recovery": "User can retry or cancel and return to detail"
    }
  ],
  "feedback": {
    "loading": "Skeleton for detail sections",
    "error": "Page-level error with back-to-list option",
    "success": "Toast confirms status change"
  },
  "edgeCases": ["order not found", "permission denied", "concurrent status change", "missing line items"],
  "states": ["loading", "error", "permissionDenied"],
  "responsive": { "desktop": "detail + table + timeline", "mobile": "stacked-sections" }
}
```

### 管理后台设置

```json
{
  "page": "Settings",
  "type": "admin",
  "route": "{admin-prefix}/settings",
  "goal": "Admin configures system parameters",
  "layout": "admin-form",
  "header": { "title": "Settings", "description": "Manage site configuration and security" },
  "userFlow": [
    "Admin navigates to settings from sidebar",
    "Reviews current configuration",
    "Modifies general or security settings",
    "Saves changes",
    "System confirms and applies new settings"
  ],
  "form": {
    "sections": [
      {
        "title": "General",
        "fields": [
          { "name": "siteName", "label": "Site Name", "component": "Input", "required": true },
          { "name": "siteDescription", "label": "Description", "component": "Textarea" }
        ]
      },
      {
        "title": "Security",
        "fields": [
          { "name": "enableRegistration", "label": "Open Registration", "component": "Switch" },
          { "name": "sessionTimeout", "label": "Session Timeout", "component": "Select", "options": ["15 min", "30 min", "1 hour", "4 hours"] }
        ]
      }
    ],
    "actions": [
      { "label": "Reset", "variant": "secondary" },
      { "label": "Save", "variant": "primary" }
    ]
  },
  "interactions": [
    {
      "name": "saveSettings",
      "trigger": "Click Save",
      "precondition": "Required fields are valid",
      "feedback": "Save button becomes loading and disabled",
      "success": "Show success toast, settings take effect immediately",
      "failure": "Show field-level or form-level error with retry",
      "recovery": "Keep entered values, user can correct and resubmit"
    }
  ],
  "validation": {
    "timing": "onBlur and onSubmit",
    "display": "field-level"
  },
  "feedback": {
    "submitting": "Primary button loading prevents double submit",
    "success": "Toast confirms settings saved",
    "error": "Errors appear near fields or in form alert"
  },
  "edgeCases": ["permission denied", "concurrent edit conflict", "invalid input values"],
  "states": ["validationError", "submitting", "success", "error"]
}
```

### 前端列表

```json
{
  "page": "CourseList",
  "type": "frontend",
  "route": "/courses",
  "goal": "User browses and finds courses",
  "layout": "frontend-list",
  "header": { "title": "Courses", "description": "Filter by topic, difficulty, and schedule" },
  "userFlow": [
    "User enters course list",
    "Browses featured courses or enters search criteria",
    "Adjusts filters",
    "Opens course detail",
    "Returns to list with filter context preserved"
  ],
  "sections": [
    { "component": "SearchPanel", "fields": ["keyword", "category", "level"] },
    { "component": "ResultList", "itemComponent": "CourseCard" }
  ],
  "interactions": [
    {
      "name": "searchCourses",
      "trigger": "Submit keyword or change filters",
      "precondition": "Search input or filter changed",
      "feedback": "Result list enters loading state",
      "success": "Results update and filter state remains visible",
      "failure": "Show retryable result-area error",
      "recovery": "User can retry, clear filters, or adjust search"
    }
  ],
  "feedback": {
    "loading": "Result area uses skeleton cards",
    "empty": "Empty state suggests clearing filters",
    "error": "Error state offers retry"
  },
  "edgeCases": ["no results", "slow search", "long course title", "mobile filters"],
  "states": ["loading", "empty", "error"],
  "responsive": { "desktop": "filters-left-results-right", "mobile": "filters-collapsed-results-list" }
}
```

## DSL 审查清单

在生成代码之前，请验证：
- 页面目标明确具体。
- 布局与前端/管理后台场景匹配。
- 主要操作清晰可见。
- 用户任务流描述了入口、任务完成和下一步操作。
- 交互定义了触发、反馈、成功、失败和恢复。
- 组件名称映射到项目中的真实组件。
- 重要操作的反馈和验证行为明确。
- 边缘情况涵盖了空数据、权限、网络故障、长内容和移动端。
- 加载、空数据、错误、禁用、聚焦和移动端状态均已覆盖。
- 移动端行为已明确指定。
