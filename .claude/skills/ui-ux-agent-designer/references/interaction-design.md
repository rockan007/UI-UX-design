# Interaction Design

## Contents

- Purpose
- User task flow
- Interaction model
- Feedback model
- Error recovery
- Confirmation model
- Progressive disclosure
- Mobile interaction
- Keyboard and accessibility interaction
- Interaction review checklist

## Purpose

Use interaction design to define how users move through a task before selecting components or writing code. A page is not complete when it looks correct; it is complete when users can start, continue, recover, and finish the task with clear feedback.

## User Task Flow

For each important page, define the core task flow:

```text
entry context
→ first meaningful action
→ required input or selection
→ system feedback
→ confirmation or result
→ next likely action
```

Capture this in UI DSL as `userFlow`.

Example:

```json
{
  "userFlow": [
    "Admin enters user list from sidebar",
    "Admin scans status and recent activity",
    "Admin filters by keyword or status",
    "Admin opens row actions or creates a new user",
    "System confirms destructive actions and updates the table"
  ]
}
```

## Interaction Model

Each important action should define:

- `trigger`: what user does
- `precondition`: what must be true before it works
- `feedback`: what user sees immediately
- `success`: what changes after completion
- `failure`: what happens if it fails
- `recovery`: how user tries again or exits

Example:

```json
{
  "interactions": [
    {
      "name": "submitForm",
      "trigger": "Click primary submit button",
      "precondition": "Required fields are valid",
      "feedback": "Button enters loading and disabled state",
      "success": "Show success toast and navigate back to list",
      "failure": "Show field errors or retryable error state",
      "recovery": "User can edit fields and submit again"
    }
  ]
}
```

## Feedback Model

Use immediate, local, and understandable feedback.

- Click: visible pressed/active or loading response.
- Submit: disable submit button, prevent double submit, show progress.
- Save success: toast or inline confirmation, then update visible data.
- Save failure: keep user input, show clear recovery path.
- Delete success: remove item or update list immediately.
- Delete failure: keep item visible and explain retry path.
- Filter/search: show applied filters and loading state.
- Navigation: active state must update.

## Error Recovery

Errors must not trap the user.

For each error, define:

- What happened.
- Whether user data is preserved.
- What user can do next.
- Whether retry is available.
- Whether the error is page-level, section-level, or field-level.

Patterns:

- Field error: show next to field, keep focus recoverable.
- Section error: show inside affected area with retry.
- Page error: show clear message and primary recovery action.
- Permission error: explain lack of access and provide safe navigation.

## Confirmation Model

Use confirmation for destructive, irreversible, or broad-impact actions.

Confirmation must include:

- Action name.
- Affected item or count.
- Consequence.
- Primary destructive confirmation.
- Safe cancel action.

Avoid confirmation for harmless reversible actions.

## Progressive Disclosure

Hide complexity until needed, but do not hide primary actions.

Use progressive disclosure for:

- Advanced filters.
- Optional form sections.
- Long detail metadata.
- Bulk action settings.
- Secondary row actions.

Do not use it for:

- Required fields.
- Primary submit actions.
- Error messages.
- Critical status.

## Mobile Interaction

Mobile must preserve task completion, not only visual layout.

- Keep the primary action reachable.
- Convert dense tables to cards or controlled horizontal scroll.
- Collapse filters into a drawer or sheet when needed.
- Keep destructive confirmations readable.
- Avoid tiny icon-only actions.
- Ensure dialogs and sheets fit `390px` width.
- Preserve form labels and validation messages.

## Keyboard and Accessibility Interaction

- Focus order follows visual and task order.
- Focus ring is visible.
- Icon buttons have accessible names.
- Dialogs trap focus and return focus on close.
- Errors are announced or placed near controls.
- Do not rely on color alone for status or validation.

## Interaction Review Checklist

Before implementation or final delivery, verify:

- User can identify the first useful action.
- Every primary action has immediate feedback.
- Submit and save prevent double action.
- Failure preserves user input when possible.
- Destructive action shows affected target or count.
- Empty state gives a next step.
- Permission state gives safe navigation.
- Mobile users can complete the full task.
- Keyboard users can reach and complete the task.

