# i18n Optional Rules — Design Spec

> Status: **approved** | Date: 2026-06-11

## Overview

Add optional internationalization (i18n) rules to the skill pipeline. When a project
opts in via a configuration marker, generated pages produce locale-aware code with
`vue-i18n`, Element Plus locale sync, formatting, a language switcher, and RTL-ready
markup. When i18n is not enabled, the skills behave exactly as they do today — zero
overhead.

### Scope (Level D — Full Coverage)

| Layer | Content |
| --- | --- |
| Component library locale | Element Plus locale switches with user language via `el-config-provider` |
| User-visible text | All hardcoded strings extracted to `$t()` keys, `zh.json` + `en.json` |
| Formatting | Numbers (`$n`), dates (`$d`), currencies locale-aware; no bare `toLocaleString()` |
| Language switcher UI | `LocaleSwitcher.vue` — dropdown, desktop label / mobile globe icon |
| RTL direction | `dir` attribute + logical CSS props + Tailwind `rtl:` variants; defensive coding |

### Out of Scope

- RTL visual audit (pages are coded RTL-ready but not exhaustively tested in Arabic).
- Languages beyond zh/en in the demo project.
- Build-time i18n optimizations (`@intlify/unplugin-vue-i18n`).

---

## Trigger Mechanism

**Project-level config marker** in `package.json`:

```json
{
  "vue3ElementUiUx": {
    "i18n": true
  }
}
```

Agent reads this marker before generation. If `true`, it additionally loads
`i18n-rules.md`. If absent or `false`, i18n rules are invisible — no changes to
generation behavior.

---

## File Changes

### Skill: `vue3-element-ui-ux`

| File | Action | Approx. Lines |
| --- | --- | --- |
| `references/i18n-rules.md` | **New** — all i18n rules (tech stack, file structure, config, locales, composable, formatting, LocaleSwitcher, RTL) | ~250 |
| `references/generation-rules.md` | Amend rule 13 (conditional: static `zhCn` vs. i18n-driven locale). Add rule 14 (read `i18n-rules.md` when enabled). | ~8 |
| `references/review-checklist.md` | Add section 9 — i18n checks (conditional, marked optional) | ~10 |
| `references/ui-dsl.md` | Add optional `locale` fields to DSL schema | ~4 |
| `references/component-system.md` | Add `LocaleSwitcher` row to component mapping table | ~1 |

### Skill: `ui-ux-agent-designer` (meta-skill)

| File | Action | Approx. Lines |
| --- | --- | --- |
| `references/design-standards.md` | Add i18n design principle (text expansion tolerance, RTL, locale-aware formatting) | ~2 |

### Demo: `login-homepage-preview`

| Change | Description |
| --- | --- |
| `package.json` | Add `"vue3ElementUiUx": { "i18n": true }` marker |
| `src/locales/index.ts` | `createI18n` instance, number/datetime formats |
| `src/locales/zh.json` | Chinese message keys (common, per-page) |
| `src/locales/en.json` | English message keys (common, per-page) |
| `src/composables/useLocale.ts` | Locale switch logic + `elLocaleMap` sync |
| `src/components/LocaleSwitcher.vue` | Language toggle dropdown |
| `src/main.ts` | Wire `vue-i18n` + `el-config-provider` |
| `src/App.vue` | Wrap with `el-config-provider`, reactive locale |
| All views | Extract hardcoded strings to `$t()` keys |

---

## i18n-rules.md Content Outline

### 1. Tech Stack
- `vue-i18n` v9+ (Composition API, `legacy: false`)
- Element Plus official locale packages (`element-plus/dist/locale/*.mjs`)
- No build plugins

### 2. File Structure
```
src/
├── locales/
│   ├── index.ts          # createI18n + formats
│   ├── zh.json           # Chinese messages
│   └── en.json           # English messages
├── composables/
│   └── useLocale.ts      # locale switch + el sync
└── components/
    └── LocaleSwitcher.vue
```

### 3. Configuration (main.ts)
- `createI18n({ legacy: false, locale: 'zh', fallbackLocale: 'zh', messages })`
- `app.use(i18n)` before `app.use(ElementPlus, { locale: elLocaleMap['zh'] })`

### 4. Locale Files
- Key naming: `page.section.element` (3-level dot-notation, max 4 levels deep)
- `common.*` for shared buttons/labels
- Parameterized text via `{param}` placeholders
- Default supported: `zh`, `en`

### 5. Locale Switch (useLocale.ts)
- `elLocaleMap`: maps lang code to Element Plus locale module
- `switchTo(lang)`: updates `locale.value`, persists to `localStorage`, syncs `<html lang>`
- `watch(locale, ...)` in App.vue feeds `el-config-provider` for live el component update

### 6. Formatting
- Numbers: `$n(value, 'decimal'|'currency'|'percent')` — format defs in `locales/index.ts`
- Dates: `$d(value, 'short'|'long'|'datetime')`
- No bare `toLocaleString()` or manual currency symbols in templates

### 7. LocaleSwitcher Component
- `el-dropdown` trigger, current locale label on desktop, globe icon on mobile
- Active language highlighted with brand color + medium weight
- Scale-safe: dropdown works for any number of languages

### 8. RTL Direction
- Activate only for `ar`, `he`, `fa`, `ur` — not for zh/en
- `document.documentElement.dir` set reactively on locale change
- Logical CSS: `ms-*`/`me-*` not `ml-*`/`mr-*`; `text-start`/`text-end` not `text-left`/`text-right`
- Directional icons use `rtl:rotate-180`
- Action column alignment naturally follows text direction (existing rule)

---

## Review Checklist Additions

When i18n is enabled, reviewers check:

- [ ] All user-facing text uses `$t()` keys — no hardcoded strings in templates
- [ ] Element Plus locale syncs via `el-config-provider` + `watch(locale, ...)`
- [ ] Numbers/dates/currencies formatted with `$n()`/`$d()`
- [ ] `LocaleSwitcher` present in header, functional, mobile collapses to icon
- [ ] `locale` persisted to `localStorage`, restored on page load
- [ ] `<html lang>` updated on switch
- [ ] Logical CSS properties used for margin/padding
- [ ] Text alignment uses logical properties (`text-start`/`text-end`)

---

## Meta-Skill Impact

`ui-ux-agent-designer` receives a lightweight i18n design principle:

> For multi-language projects, design text with expansion tolerance (Chinese→English
> can be 30–50% longer), support RTL direction, and use locale-aware formatting for
> dates, numbers, and currencies.

No structural changes to the meta-skill. It remains technology-agnostic.

---

## Acceptance Criteria

1. `i18n-rules.md` written with all 8 sections, reviewed for completeness
2. Existing skill files modified per the table above
3. `login-homepage-preview` demo converted to bilingual (zh/en) following the new rules
4. Language switcher works: toggles all el component text + user-facing text + formatting
5. RTL `dir` attribute flips correctly when tested with a temporary RTL locale
6. Demo pages pass review checklist section 9 at 1440px, 1024px, 768px, 390px
7. When `package.json` marker is absent, generated code does not include i18n — zero regression
