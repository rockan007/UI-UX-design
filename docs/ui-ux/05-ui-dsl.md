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

