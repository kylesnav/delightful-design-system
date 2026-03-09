---
title: "Phase 5: Components"
type: prompt
scope: mvp
status: active
---

# Phase 5: Components

> Build all 43 MVP components as individual CSS files. Each component works in isolation (tokens + foundation + component). Excludes Batch H (blur-grid, tilt-card, spotlight, magnetic-button).

---

## Context

Read these specs before starting:
- `../specs/components/*.md` -- one spec per component (43 files)
- `../specs/testing/component-tests.md` -- per-component test specifications
- `../specs/testing/test-strategy.md` -- Playwright config, test page setup, helpers
- `../architecture.md` -- Section 6 (Component CSS Architecture), Section 8 (Lift/Press)

---

## Build Order

Build components in batch order (simplest to most complex). Each batch validates patterns used by later batches.

> **Note:** Each batch header lists a numbered table of primary components plus "Also:" items. The numbered tables total 33 components; the "Also:" items add 10 more for 43 total. The numbered tables are the source of truth for build order. "Also:" components belong to the same batch and follow the same patterns — build them after the numbered items.

### Batch A -- Simple (4 components)

Minimal state, no interaction beyond hover.

| # | Component | File | Spec |
|---|-----------|------|------|
| 1 | Badge | `badge.css` | `../specs/components/badge.md` |
| 2 | Avatar | `avatar.css` | `../specs/components/avatar.md` |
| 3 | Tooltip | `tooltip.css` | `../specs/components/tooltip.md` |
| 4 | Empty State | `empty-state.css` | `../specs/components/empty-state.md` |

Also: `divider.css`, `notification-badge.css`

### Batch B -- Interactive (3 components)

Establish the lift/press interaction pattern.

| # | Component | File | Spec |
|---|-----------|------|------|
| 5 | Button | `button.css` | `../specs/components/button.md` |
| 6 | Card | `card.css` | `../specs/components/card.md` |
| 7 | Tile | `tile.css` | `../specs/components/tile.md` |

**Lift/press pattern** (uniform across all interactive components):
- Base: no transform, `var(--shadow-sm)`
- Hover: `translateY(-2px)`, shadow escalates (sm -> md or md -> lg)
- Active: `translate(2px, 2px)`, shadow collapses to `0 0 0`
- Disabled: `opacity: 0.4`, `cursor: not-allowed`, `pointer-events: none`

### Batch C -- Forms (8 components)

| # | Component | File | Spec |
|---|-----------|------|------|
| 8 | Input | `input.css` | `../specs/components/input.md` |
| 9 | Textarea | `textarea.css` | `../specs/components/textarea.md` |
| 10 | Select | `select.css` | `../specs/components/select.md` |
| 11 | Multi-Select | `multi-select.css` | `../specs/components/multi-select.md` |
| 12 | Checkbox | `checkbox.css` | `../specs/components/checkbox.md` |
| 13 | Radio | `radio.css` | `../specs/components/radio.md` |
| 14 | Toggle | `toggle.css` | `../specs/components/toggle.md` |
| 15 | Range | `range.css` | `../specs/components/range.md` |

**Toggle primitive exception**: The toggle component intentionally references `var(--primitive-neutral-0)` (knob color, always white) and `var(--primitive-neutral-300)` (off-state background). This is the only allowed primitive reference in component CSS.

### Batch D -- Navigation (5 components)

| # | Component | File | Spec |
|---|-----------|------|------|
| 16 | Topnav | `topnav.css` | `../specs/components/topnav.md` |
| 17 | Tabs | `tabs.css` | `../specs/components/tabs.md` |
| 18 | Breadcrumbs | `breadcrumbs.css` | `../specs/components/breadcrumbs.md` |
| 19 | Pagination | `pagination.css` | `../specs/components/pagination.md` |
| 20 | Sidebar | `sidebar.css` | `../specs/components/sidebar.md` |

Also: `segmented-control.css`, `command-palette.css`, `skip-link.css`

### Batch E -- Data (2 components)

| # | Component | File | Spec |
|---|-----------|------|------|
| 21 | Table | `table.css` | `../specs/components/table.md` |
| 22 | Stepper | `stepper.css` | `../specs/components/stepper.md` |

Also: `scroll-progress.css`, `back-to-top.css`

### Batch F -- Feedback (5 components)

| # | Component | File | Spec |
|---|-----------|------|------|
| 23 | Toast | `toast.css` | `../specs/components/toast.md` |
| 24 | Alert | `alert.css` | `../specs/components/alert.md` |
| 25 | Modal | `modal.css` | `../specs/components/modal.md` |
| 26 | Drawer | `drawer.css` | `../specs/components/drawer.md` |
| 27 | Progress | `progress.css` | `../specs/components/progress.md` |

### Batch G -- Display (4 components)

| # | Component | File | Spec |
|---|-----------|------|------|
| 28 | Popover | `popover.css` | `../specs/components/popover.md` |
| 29 | Code Block | `code-block.css` | `../specs/components/code-block.md` |
| 30 | Skeleton | `skeleton.css` | `../specs/components/skeleton.md` |
| 31 | Accordion | `accordion.css` | `../specs/components/accordion.md` |

Also: `dropdown.css`

### Batch I -- Composition (2 components)

| # | Component | File | Spec |
|---|-----------|------|------|
| 32 | Sidebar Layout | `sidebar-layout.css` | `../specs/components/sidebar-layout.md` |
| 33 | Staggered Reveal | `staggered-reveal.css` | `../specs/components/staggered-reveal.md` |

Also: `bento-grid.css`, `page-transitions.css`

---

## Component Rules

1. **Every file wraps ALL rules in `@layer component { }`**
2. **Reference tokens via `var()` -- never hardcode values**
3. **No `@import` statements inside component files**
4. **No cross-component dependencies** -- each component depends only on tokens + foundation
5. **One component per file** -- file name matches component name
6. **2px borders everywhere** -- the neo-brutalist signature
7. **Solid shadows (zero blur)** -- `Npx Npx 0 color`, never `Npx Npx Npx color`

---

## Component Index (`src/components/index.css`)

After all components are built, create `src/components/index.css`:

```css
@import 'badge.css';
@import 'avatar.css';
@import 'tooltip.css';
/* ... all 43 components */
```

This is the bundle entry point. Consumers can import this for everything, or individual files.

---

## Tests (`tests/components/*.spec.ts`)

Each test:
1. Renders component in a minimal HTML page (tokens + foundation + component CSS only)
2. Verifies computed styles match token values
3. Tests interaction states (hover, active, disabled, focus-visible)
4. Visual regression screenshot with `toHaveScreenshot()`
5. Dark mode screenshot (same component with `data-theme="dark"`)
6. Reduced-motion: all transitions complete in 0.01ms

See `../specs/testing/component-tests.md` for per-component test specifications.

---

## Acceptance Criteria

- [ ] All 43 component CSS files exist in `src/components/`
- [ ] Every file wraps all rules in `@layer component { }`
- [ ] No `--primitive-*` references (except toggle exception)
- [ ] Each component works in isolation (tokens + foundation + component)
- [ ] Lift/press pattern is consistent across all interactive components
- [ ] All shadows are solid (zero blur)
- [ ] All borders are 2px
- [ ] `src/components/index.css` imports all 43 components
- [ ] All component tests pass
- [ ] Visual regression screenshots captured for light and dark modes
