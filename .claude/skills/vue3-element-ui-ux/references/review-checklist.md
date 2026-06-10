# Review Checklist

Post-implementation quality review. Run this checklist after every page generation.

## Review Prompt

```
Review this page as a senior UI/UX designer.
Only point out specific issues, not generalities.

Order by severity:
1. Issues blocking task completion
2. Information hierarchy problems
3. Visual consistency problems
4. Form or table experience issues
5. Mobile issues
6. Accessibility issues

Then fix the issues. Do not change business logic.
```

## 1. Task Completion Path

- [ ] User knows what page this is.
- [ ] User knows what to do next.
- [ ] Primary action is obvious.
- [ ] Secondary actions don't compete with primary.
- [ ] Destructive actions have confirmation.
- [ ] Action completion has feedback.
- [ ] User can easily undo or go back.

## 2. Information Hierarchy

- [ ] Page title is clear.
- [ ] Key data is shown before secondary detail.
- [ ] Primary information is more prominent than secondary.
- [ ] Help/description text is concise.
- [ ] Status information is easy to identify.
- [ ] No competing visual focal points.

## 3. Visual Consistency

- [ ] Button styles and sizes are consistent.
- [ ] Form control heights are uniform.
- [ ] Table row heights are consistent.
- [ ] Labels and badges share a unified style.
- [ ] Section spacing is stable.
- [ ] Border radius and shadows are restrained.

## 4. Form Experience

- [ ] Field order follows user workflow.
- [ ] Labels are clear.
- [ ] Required fields are marked.
- [ ] Help text is necessary and concise.
- [ ] Error messages are near the corresponding field.
- [ ] Submit feedback is explicit.
- [ ] Double-submit is prevented (button loading + disabled).
- [ ] Mobile input is smooth.

## 5. Table Experience

- [ ] High-frequency fields are left-aligned.
- [ ] Action column: icon-only when ≥2 buttons, each button wrapped in tooltip, left/right aligned per text direction (no center), column width calculated for worst-case button count.
- [ ] Filter area is compact.
- [ ] Status, time, amount, quantity fields are scannable.
- [ ] Batch actions are clear.
- [ ] Empty state provides next step.
- [ ] Data is still manageable on mobile.

## 6. State Feedback

- [ ] **loading**: clearly shown, no large layout shifts; skeleton for key data areas.
- [ ] **empty**: has explanation and next step.
- [ ] **error**: specific error message, provides retry or back action.
- [ ] **success**: feedback after save/create/delete, doesn't block for too long.
- [ ] **disabled**: recognizable, reason understandable, not color-only.
- [ ] **permission denied**: clearly explained.
- [ ] **hover**: interactive elements show hover state.
- [ ] **focus**: keyboard focus is visible.

## 7. Responsive

```
Check at these widths:
- 1440px: layout uses horizontal space well.
- 1024px: not crowded, reduce complex columns.
- 768px: further simplify columns.
- 390px: single-column, no horizontal squeeze.
```

- [ ] No text overflow.
- [ ] No element overlap.
- [ ] Tap targets are large enough.
- [ ] Filters, menus, dialogs are usable.
- [ ] Tables have a mobile solution (card list or horizontal scroll).
- [ ] Primary action is visible on mobile.

## 8. Accessibility

- [ ] Text-background contrast is sufficient.
- [ ] Keyboard focus is visible.
- [ ] Icon buttons have tooltip or aria-label.
- [ ] Inputs have identifiable labels.
- [ ] Error states are not conveyed by color alone.
- [ ] Tap targets ≥ 44px on mobile.

## State Completion Prompt

```
Check whether this page fully covers:
1. loading
2. empty
3. error
4. success feedback
5. disabled
6. hover
7. focus
8. validation error
9. permission denied
10. mobile layout

Fill in any missing states. Do not change business logic.
```
