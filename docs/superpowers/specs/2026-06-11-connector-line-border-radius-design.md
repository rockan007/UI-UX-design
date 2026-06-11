# Connector Line vs Border Radius — Design Spec

> Status: **approved** | Date: 2026-06-11

## Overview

Fix a visual bug where timeline step connector lines deform due to uniform border-radius,
and encode the rule into both skills to prevent recurrence.

**Root cause:** Dashboard timeline items use `rounded-btn` (6px all corners) while a
`border-l-2` left border serves as the vertical connector line between steps. The uniform
border-radius curves the left border, breaking the visual continuity of the timeline.

**Principle:** When a container has a visible connector line on one side, that side's
border-radius must be `0`.

---

## Changes

### Demo Fix

| File | Change |
|------|--------|
| `login-homepage-preview/src/views/DashboardView.vue:123` | `rounded-btn` → `rounded-r-btn` on timeline item |

### Skill: `vue3-element-ui-ux`

#### `references/interaction-rules.md` — New rule in General section

```markdown
### Connector Lines vs. Border Radius

**Rule:** When a container has a visible connector line on one side (timeline vertical line,
step connector, branch line), that side's border-radius must be `0`. Rounding the corner
breaks visual continuity of the connector line.

| Connector side | CSS |
|---|---|
| Left border | `border-l-*` + `rounded-l-none` |
| Right border | `border-r-*` + `rounded-r-none` |
| Top border | `border-t-*` + `rounded-t-none` |
| Bottom border | `border-b-*` + `rounded-b-none` |

Do not apply a uniform `rounded-*` to containers that use `border-l-*` / `border-r-*` as connector lines.
Use directional radius instead: `rounded-r-btn` for a left-side connector, `rounded-l-btn` for a right-side connector.
```

#### `references/review-checklist.md` — Add check item

In Section 3 (Visual Consistency) or Section 5 (Table Experience):

```markdown
- [ ] **Connector lines vs. border-radius:** Containers with a border connector line on one side have that side's border-radius set to `0`. Use directional radius (`rounded-r-*`, `rounded-l-none`) instead of uniform `rounded-*`.
```

### Skill: `ui-ux-agent-designer`

#### `references/design-standards.md` — New principle in Component Interaction Rules > General

```markdown
### Connector Lines and Border Radius

When a UI element has a visible connector line on one edge (timeline vertical line,
step progress connector, tree branch line), that edge's corner must remain sharp.

- A container using a left/right border as a connector must set that side's radius to `0`.
- Do not apply uniform border-radius to elements that serve as connector-line hosts.
- The connector line is a continuous visual path — rounding its edge breaks the user's
  perception of sequence or hierarchy.
```

---

## Acceptance Criteria

1. Dashboard timeline vertical line is visually straight — no curvature at item boundaries
2. `rounded-r-btn` class used on timeline items instead of `rounded-btn`
3. `interaction-rules.md` has the Connector vs Border Radius rule with mapping table
4. `review-checklist.md` has the corresponding check item
5. `design-standards.md` has the meta-level design principle
