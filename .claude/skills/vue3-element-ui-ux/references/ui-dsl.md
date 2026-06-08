# UI DSL

Structured interface plan before code. Output UI DSL first for every page — never write code before the DSL is clear.

## Base Schema

```json
{
  "page": "PageName",
  "type": "frontend | admin | mixed",
  "route": "/path",
  "goal": "Core user task on this page",
  "layout": "layout-name",
  "navigation": {},
  "header": {},
  "sections": [],
  "actions": [],
  "states": [],
  "responsive": {}
}
```

Required fields: `page`, `type`, `route`, `goal`, `layout`, `header`, `sections`, `actions`, `states`, `responsive`.

## Page Templates

### Admin List

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
  "states": ["loading", "empty", "error", "permissionDenied"],
  "responsive": { "desktop": "table", "mobile": "card-list" }
}
```

### Admin Form

```json
{
  "page": "CreateUser",
  "type": "admin",
  "route": "{admin-prefix}/users/new",
  "goal": "Admin creates a new user",
  "layout": "admin-form",
  "header": { "title": "Add User", "description": "Create account and assign initial role" },
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
  "states": ["validationError", "submitting", "success", "error"]
}
```

### Admin Dashboard

```json
{
  "page": "Dashboard",
  "type": "admin",
  "route": "{admin-prefix}",
  "goal": "Admin views key metrics and trends",
  "layout": "admin-dashboard",
  "header": { "title": "Dashboard", "description": "Core metrics for the past 30 days" },
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
  "states": ["loading", "empty", "error"],
  "responsive": { "desktop": "sidebar + 4-metrics + 2-charts + timeline", "mobile": "no-sidebar, 2-metrics, stacked-charts" }
}
```

### Admin Detail

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
  "states": ["loading", "error", "permissionDenied"],
  "responsive": { "desktop": "detail + table + timeline", "mobile": "stacked-sections" }
}
```

### Admin Settings

```json
{
  "page": "Settings",
  "type": "admin",
  "route": "{admin-prefix}/settings",
  "goal": "Admin configures system parameters",
  "layout": "admin-form",
  "header": { "title": "Settings", "description": "Manage site configuration and security" },
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
  "states": ["validationError", "submitting", "success", "error"]
}
```

### Frontend List

```json
{
  "page": "CourseList",
  "type": "frontend",
  "route": "/courses",
  "goal": "User browses and finds courses",
  "layout": "frontend-list",
  "header": { "title": "Courses", "description": "Filter by topic, difficulty, and schedule" },
  "sections": [
    { "component": "SearchPanel", "fields": ["keyword", "category", "level"] },
    { "component": "ResultList", "itemComponent": "CourseCard" }
  ],
  "states": ["loading", "empty", "error"],
  "responsive": { "desktop": "filters-left-results-right", "mobile": "filters-collapsed-results-list" }
}
```

## DSL Review Checklist

Before generating code, verify:
- Page goal is specific.
- Layout matches frontend/admin context.
- Primary action is explicit.
- Component names map to real project components.
- Loading, empty, error, disabled, focus, and mobile states are covered.
- Mobile behavior is specified.
