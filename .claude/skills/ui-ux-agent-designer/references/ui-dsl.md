# UI DSL

## Contents

- Purpose
- Base schema
- Interaction fields
- Admin list example
- Admin form example
- Frontend list example
- DSL review checklist

## Purpose

Use UI DSL as the structured interface plan before writing code. It reduces Agent free-form output and makes layout, actions, states, and responsive rules reviewable.

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
  "userFlow": [],
  "sections": [],
  "actions": [],
  "interactions": [],
  "feedback": {},
  "validation": {},
  "edgeCases": [],
  "states": [],
  "responsive": {}
}
```

## Interaction Fields

Use these fields to make UX behavior explicit before code generation:

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

## Admin List Example

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
  "userFlow": [
    "管理员从侧边栏进入用户管理",
    "先扫描用户状态和最近活动",
    "通过关键词或状态筛选用户",
    "执行新增、编辑、禁用等操作",
    "操作完成后表格状态更新"
  ],
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
      "name": "disableUser",
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
  "responsive": {
    "desktop": "table",
    "mobile": "card-list"
  }
}
```

## Admin Form Example

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
  "userFlow": [
    "管理员进入新增用户页",
    "填写基础信息",
    "选择角色和账号状态",
    "提交表单",
    "系统保存成功后返回列表或显示成功反馈"
  ],
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

## Frontend List Example

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
  "userFlow": [
    "用户进入课程列表",
    "浏览推荐课程或输入搜索条件",
    "调整筛选条件",
    "打开课程详情",
    "返回列表时保留筛选上下文"
  ],
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
  "responsive": {
    "desktop": "filters-left-results-right",
    "mobile": "filters-collapsed-results-list"
  }
}
```

## DSL Review Checklist

Before code generation, verify:

- Page goal is specific.
- Layout matches frontend/admin context.
- Primary action is explicit.
- User flow describes entry, task completion, and next action.
- Interactions define trigger, feedback, success, failure, and recovery.
- Component names can map to real project components.
- Feedback and validation behavior are explicit for important actions.
- Edge cases include empty data, permission, network failure, long content, and mobile.
- Loading, empty, error, disabled, focus, and mobile states are represented.
- Mobile behavior is not omitted.
