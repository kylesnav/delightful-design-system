# Delightful Design System — Composition & Layout

Responsive patterns, layout utilities, and composition rules. For token values see `tokens.md`.

---

## Responsive Breakpoints

Mobile-first. All breakpoints use `min-width`.

| Token | Value | Typical use |
|---|---|---|
| `--bp-sm` | `480px` | Large phones landscape |
| `--bp-md` | `600px` | Small tablets |
| `--bp-lg` | `768px` | Tablets |
| `--bp-xl` | `900px` | Small desktops |

```css
/* Example */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}
@media (min-width: 600px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## Container Width Tokens

| Token | Value |
|---|---|
| `--container-sm` | `640px` |
| `--container-md` | `960px` |
| `--container-lg` | `1200px` |

```css
.container {
  width: 100%;
  max-width: var(--container-md);
  margin-inline: auto;
  padding-inline: var(--space-4);
}
```

---

## Responsive Grid Pattern

The canonical responsive grid uses `auto-fill` with a minimum column width of `280px`:

```css
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
}
```

This eliminates breakpoint-specific column counts for most card/tile layouts.

---

## Container Queries

Use container queries for component-level responsive behavior, independent of viewport width:

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { flex-direction: row; }
}

@container card (max-width: 399px) {
  .card { flex-direction: column; }
}
```

---

## Toast Positioning

Toasts render in the **bottom-right** corner (canonical position). Stack upward.

```css
.toast-container {
  position: fixed;
  bottom: var(--space-4);
  right: var(--space-4);
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-2);
  z-index: 1000;
}
```

---

## Responsive Data Table

On narrow viewports, tables stack vertically using `data-label` attributes:

```html
<table class="data-table">
  <thead>
    <tr><th>Name</th><th>Role</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Name">Alice</td>
      <td data-label="Role">Engineer</td>
      <td data-label="Status">Active</td>
    </tr>
  </tbody>
</table>
```

```css
@media (max-width: 599px) {
  .data-table thead { display: none; }
  .data-table tr {
    display: block;
    margin-bottom: var(--space-3);
    border: 2px solid var(--border-default);
    border-radius: var(--radius-md);
    padding: var(--space-3);
  }
  .data-table td {
    display: flex;
    justify-content: space-between;
    padding: var(--space-1) 0;
  }
  .data-table td::before {
    content: attr(data-label);
    font-weight: 600;
    margin-right: var(--space-2);
  }
}
```

---

## Touch Targets

Under `pointer: coarse`, all interactive elements must be at least **44x44px**:

```css
@media (pointer: coarse) {
  button, a, [role="button"], input, select, textarea {
    min-height: 44px;
    min-width: 44px;
  }
}
```

---

## Dark Mode Toggle Pattern

Dark mode uses the `data-theme` attribute on `<html>`, stored in `localStorage`, and respects `prefers-color-scheme` as the default:

```js
// On page load — check stored preference, then system preference
const stored = localStorage.getItem('theme');
const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
const theme = stored || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);

// Toggle
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
```

```css
:root { /* light tokens */ }
[data-theme="dark"] { /* dark token overrides */ }
```

---

## Utility Classes

### Layout
| Class | CSS |
|---|---|
| `.flex` | `display: flex` |
| `.flex-col` | `flex-direction: column` |
| `.flex-wrap` | `flex-wrap: wrap` |
| `.items-center` | `align-items: center` |
| `.justify-between` | `justify-content: space-between` |
| `.justify-center` | `justify-content: center` |
| `.grid` | `display: grid` |
| `.grid-auto` | `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` |

### Spacing
| Class | CSS |
|---|---|
| `.gap-1` | `gap: var(--space-1)` |
| `.gap-2` | `gap: var(--space-2)` |
| `.gap-3` | `gap: var(--space-3)` |
| `.gap-4` | `gap: var(--space-4)` |
| `.gap-6` | `gap: var(--space-6)` |

### Margin
| Class | CSS |
|---|---|
| `.mt-0` | `margin-top: 0` |
| `.mb-2` | `margin-bottom: var(--space-2)` |
| `.mb-4` | `margin-bottom: var(--space-4)` |
| `.mx-auto` | `margin-inline: auto` |

### Typography
| Class | CSS |
|---|---|
| `.text-sm` | `font-size: var(--text-sm)` |
| `.text-base` | `font-size: var(--text-base)` |
| `.text-lg` | `font-size: var(--text-lg)` |
| `.text-xl` | `font-size: var(--text-xl)` |
| `.font-bold` | `font-weight: 700` |
| `.font-mono` | `font-family: var(--font-mono)` |
| `.text-center` | `text-align: center` |

### Sizing
| Class | CSS |
|---|---|
| `.w-full` | `width: 100%` |
| `.max-w-sm` | `max-width: var(--container-sm)` |
| `.max-w-md` | `max-width: var(--container-md)` |
| `.max-w-lg` | `max-width: var(--container-lg)` |

---

## Neo-Brutalist Rules Checklist

Every Delightful component and layout must follow these 12 rules:

1. **Solid shadows only** -- zero blur, `2px` offset increments, plus ambient depth layers.
2. **2px borders** -- all borders are `2px solid`. No `1px`, no `3px`.
3. **OKLCH colors** -- no hex, rgb, or hsl anywhere in the system.
4. **Three-tier tokens** -- components reference semantic tokens, semantics reference primitives. Never skip a tier.
5. **Cascade layers** -- all CSS lives in `@layer reset, primitives, semantic, component, utilities`.
6. **Warm neutrals** -- backgrounds use hue 70 (light) or hue 65 (dark). Never pure white, gray, or black.
7. **Reduced-motion guard** -- every animation is inside `@media (prefers-reduced-motion: no-preference)`.
8. **Touch targets** -- 44x44px minimum under `pointer: coarse`.
9. **Focus-visible outlines** -- `outline: 2px solid var(--focus-ring); outline-offset: 2px` on all interactive elements.
10. **Semantic HTML** -- use native `<details>`, `<dialog>`, `<input type="range">` before reaching for ARIA.
11. **No gradients** -- flat fills and solid shadows. Gradients break the neo-brutalist aesthetic.
12. **Spring physics for motion** -- use the `linear()` spring easing function. No mechanical `cubic-bezier` for interactive transitions.
