# Sidebar Collapse Overflow Fix — Design Spec

> Status: **approved** | Date: 2026-06-11

## Overview

When the admin sidebar is collapsed (64px), internal `el-menu` content overflows the
`el-aside` container, producing a horizontal scrollbar inside the sidebar area.

**Root cause:** `el-aside` collapses from 220px to 64px, but `el-menu` in collapsed mode
has child elements that exceed 64px width. No `overflow-x` clipping is set on the container.

**Fix:** Add `overflow-x: hidden` to `.admin-sidebar`. Collapsed overflow is clipped;
expanded state (220px) is unaffected since all content fits.

---

## Changes

### Demo Fix

| File | Change |
|------|--------|
| `login-homepage-preview/src/components/AdminSidebar.vue` `.admin-sidebar` CSS | Add `overflow-x: hidden` |

### Skill: `vue3-element-ui-ux`

#### `references/review-checklist.md` — Section 7 (Responsive)

Add check item:

```markdown
- [ ] Collapsed sidebar has `overflow-x: hidden` to prevent horizontal scrollbar from overflow content.
```

#### `references/interaction-rules.md` — Sidebar section

Add to collapsed state rule:

```markdown
- Collapsed state: `overflow-x: hidden` to clip overflow content and prevent horizontal scrollbar.
```

---

## Acceptance Criteria

1. Collapsed sidebar (64px) shows no horizontal scrollbar
2. Expanded sidebar (220px) displays all menu content normally
3. `.admin-sidebar` has `overflow-x: hidden` in its scoped style
4. `review-checklist.md` has the new check item
5. `interaction-rules.md` has the collapsed overflow rule
