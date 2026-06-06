# UI/UX Design Constraints — Doc Restructuring & Enhancement

**Date:** 2026-06-06
**Status:** Approved
**Approach:** B — Unified 6-file structure

## Goal

Restructure and enhance the existing `docs/ui-ux/` documentation from 14 overlapping files into 6 clean, non-overlapping files. Add concrete design tokens, dark mode, animation, data visualization, and error message writing guidelines. The result is a single source of truth that Claude Code can reliably consume when generating frontend (前台) and admin (后台) pages.

## New File Structure

```
docs/ui-ux/
├── 00-overview.md          # Index, workflow, tech stack, how to use
├── 01-design-principles.md # Goals + high-level standards, frontend vs admin
├── 02-design-tokens.md     # Concrete values: colors, spacing, type, shadows, radii, animation, dark mode
├── 03-component-system.md  # Component hierarchy + DSL-to-component mapping
├── 04-ui-dsl.md            # DSL spec + 6 page type templates
├── 05-generation-rules.md  # Agent rules + generation workflow + prompt templates
└── 06-review-checklist.md  # Single unified review checklist
```

## Migration Map

| Remove | Content Moves To |
|---|---|
| `01-ui-ux-goals.md` | `01-design-principles.md` |
| `design-system-standards.md` | `01-design-principles.md` |
| `02-design-system.md` | Principles → `01`, Values → `02-design-tokens.md` |
| `03-tech-stack.md` | `00-overview.md` (short section) |
| `04-component-system.md` | `03-component-system.md` |
| `06-component-mapping.md` | `03-component-system.md` |
| `07-agent-generation-rules.md` | `05-generation-rules.md` |
| `08-page-generation-workflow.md` | `05-generation-rules.md` |
| `09-ui-review-checklist.md` | `06-review-checklist.md` |
| `ui-review-checklist.md` | `06-review-checklist.md` |
| `responsive-and-state-checklist.md` | `06-review-checklist.md` |
| `page-optimization-prompt.md` | `05-generation-rules.md` (prompt templates) |
| `claude-code-ui-ux-workflow.md` | `00-overview.md` (workflow section) |

## File Content Plans

### 00-overview.md
- Updated doc index (6 files)
- Absorbed: workflow from `claude-code-ui-ux-workflow.md`
- Absorbed: tech stack recommendation from `03-tech-stack.md` (short section)
- Default Claude Code requirements prompt block (kept)

### 01-design-principles.md
- Merged from: `01-ui-ux-goals.md` + `design-system-standards.md` + principles portion of `02-design-system.md`
- Deduped: two "should/shouldn't" lists merged into one
- New section: **Error message writing guidelines** — user-facing language, structure (what happened → why → what to do), frontend (friendly) vs admin (precise) tone
- Structure: Total Principles → Frontend Goals → Admin Goals → Content Guidelines → Quality Criteria

### 02-design-tokens.md (new — biggest addition)
- **Color:** Neutral scale (50–950), brand color (blue-600), semantic (success/danger/warning/info). Explicit hex values.
- **Dark mode:** CSS custom property mapping table. Only neutrals invert; brand/semantic stay.
- **Spacing:** 4px base unit, scale 1–12. Admin defaults tighter (16-24px) than frontend (24-48px).
- **Typography:** 6-level scale (12px–30px). Admin caps titles at 24px; frontend allows 30px.
- **Shadows:** 3 elevation levels. Dialog/dropdown/drawer only. No decorative card shadows.
- **Radii:** 5-step scale (4px–full). Admin default 6px, frontend default 8px.
- **Animation:** Duration tokens (150/200/300ms) + easing tokens. Admin: fast durations only, no spring. Frontend: spring easing allowed for hero/landing.

### 03-component-system.md
- Merged from: `04-component-system.md` + `06-component-mapping.md`
- Existing component lists and mapping tables kept intact
- New section: **Data Visualization components** — MetricCard, SimpleBarChart, SimpleLineChart, StatusTimeline. Rules: admin dashboards only, max 4 metrics/row, no 3D/pie/donut, always show labels

### 04-ui-dsl.md
- Kept: DSL spec + 3 existing page examples (admin list, admin form, frontend list)
- Added: 3 more page type templates (Dashboard, Settings, Detail) with full states and responsive blocks

### 05-generation-rules.md
- Merged from: `07-agent-generation-rules.md` + `08-page-generation-workflow.md`
- Absorbed: ready-to-use prompts from `page-optimization-prompt.md`
- Structure: Agent Rules → 9-Step Workflow → Prompt Templates → Page-Type Supplements

### 06-review-checklist.md
- Merged from: `09-ui-review-checklist.md` + `ui-review-checklist.md` + `responsive-and-state-checklist.md`
- Deduped: ~70% overlap across 3 sources resolved
- Structure: Task Completion → Information Hierarchy → Visual Consistency → Form → Table → States → Responsive → Accessibility
- Each section: copyable prompt block + checklist items

## New Topics Added (not new files)

| Topic | Where |
|---|---|
| Dark mode | `02-design-tokens.md` — color var mapping |
| Animation/motion | `02-design-tokens.md` — duration/easing tokens |
| Data visualization | `03-component-system.md` — chart component rules |
| Error message writing | `01-design-principles.md` — content guidelines |

## What Does NOT Change

- Tech stack recommendation (Next.js, TypeScript, Tailwind, shadcn/ui, lucide-react)
- UI DSL format and JSON structure
- Component hierarchy (basic → composite → frontend/admin)
- Agent code generation rules (don't change business logic, don't add deps, etc.)
- Review checklist items (only deduped, not changed)

## Implementation Order

1. Create `02-design-tokens.md` (new content, no dependencies)
2. Create `01-design-principles.md` (merge + dedup + add error guidelines)
3. Create `03-component-system.md` (merge + add data viz section)
4. Create `04-ui-dsl.md` (extend with 3 more templates)
5. Create `05-generation-rules.md` (merge + absorb prompts)
6. Create `06-review-checklist.md` (merge 3 → 1, dedup)
7. Create `00-overview.md` (updated index, absorb workflow + tech stack)
8. Delete 13 old files
9. Update cross-references in all files to point to new file names
