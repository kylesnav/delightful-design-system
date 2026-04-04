# Delightful Design System — Accessibility

WCAG 2.1 AA compliance patterns and expectations. Accessibility is not optional -- it is baked into the token system, component patterns, and audit tooling.

---

## Commitment

Delightful targets **WCAG 2.1 AA** across all components and themes. This means:

- Minimum 4.5:1 contrast for normal text, 3:1 for large text
- All functionality available via keyboard
- No information conveyed by color alone
- All animations respect user motion preferences

---

## Focus Model

Every interactive element uses `:focus-visible` with a consistent, high-contrast focus ring:

```css
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

- The `--focus-ring` token is tuned per theme to maintain contrast against both light and dark backgrounds.
- `outline-offset: 2px` ensures the ring does not overlap the element's border (which is also 2px).
- Never remove focus outlines. Never use `:focus` without `:focus-visible` -- sighted mouse users should not see focus rings on click.

---

## Skip Navigation

Every page includes a `.skip-link` as the **first child of `<body>`**:

```html
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <!-- header, nav, etc. -->
  <main id="main">...</main>
</body>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-page);
  border: 2px solid var(--border-default);
  z-index: 9999;
}
.skip-link:focus {
  top: var(--space-2);
}
```

---

## Reduced Motion

**All** animations and transitions are behind a `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: no-preference) {
  /* animations and transitions go here */
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

The `0.01ms` duration (not `0ms`) ensures `animationend` and `transitionend` events still fire, so JavaScript listeners do not break.

---

## Touch Targets

Under `pointer: coarse` (touch devices), all interactive elements must meet a **44x44px** minimum:

```css
@media (pointer: coarse) {
  button, a, [role="button"], input, select, textarea {
    min-height: 44px;
    min-width: 44px;
  }
}
```

This applies to buttons, links, form controls, and any element with an interactive role.

---

## Semantic HTML

Delightful uses native HTML elements before reaching for ARIA:

| Pattern | Implementation | Not this |
|---|---|---|
| Accordion | `<details>` + `<summary>` | `<div role="tabpanel">` with JS |
| Modal | `<dialog>` with `.showModal()` | `<div class="modal">` with manual focus trap |
| Slider | `<input type="range">` | Custom `<div>` with drag handlers |
| Tabs | Native or `role="tablist"` with `aria-selected` | Styled `<div>` buttons |
| Toggle | `<input type="checkbox">` with custom styling | `<div>` with click handler |

Native elements provide keyboard behavior, screen reader semantics, and form participation for free.

---

## Keyboard Navigation by Component

| Component | Expected keys |
|---|---|
| Button | `Enter`, `Space` to activate |
| Modal (`<dialog>`) | `Escape` to close, focus trapped inside |
| Accordion (`<details>`) | `Enter`, `Space` to toggle |
| Tabs | `ArrowLeft`/`ArrowRight` to switch, `Tab` to enter content |
| Slider (`<input type="range">`) | `ArrowLeft`/`ArrowRight` to adjust |
| Dropdown menu | `ArrowUp`/`ArrowDown` to navigate, `Enter` to select, `Escape` to close |
| Toast | Auto-dismiss; `Escape` to dismiss early; announced via `role="status"` |
| Data table (sortable) | `Enter` on column header to sort |

---

## Color Contrast

The OKLCH color system supports contrast compliance structurally:

- **Perceptual uniformity** means two tokens at the same L (lightness) value look equally bright. Contrast ratios are predictable from the L delta alone.
- **Dark mode brightens accents.** When backgrounds darken, semantic accent tokens shift to higher-lightness primitives to maintain readable contrast.
- **Text tokens are tested.** `--text-primary` against `--bg-page` meets 4.5:1 in both light and dark themes. `--text-secondary` meets 4.5:1 against `--bg-page` and 3:1 against `--bg-surface`.
- **Never convey meaning by color alone.** Status indicators pair color with an icon or label. Error messages include text, not just a red border.

---

## Auditor Agent Checks

The `delightful-auditor` agent automatically checks for:

| Check | What it looks for |
|---|---|
| Missing `:focus-visible` | Interactive elements without a visible focus style |
| Missing reduced-motion guard | Animations or transitions outside `@media (prefers-reduced-motion: no-preference)` |
| Missing skip link | Pages without a `.skip-link` as the first body child |
| Non-native form controls | Custom `<div>` sliders, toggles, or selects that lack native equivalents |
| Insufficient contrast | Text/background pairs that fail WCAG AA ratios |
| Missing labels | Form inputs without associated `<label>` or `aria-label` |
| Color-only indicators | Status or error states communicated solely through color |

Run the auditor on any component or page before shipping.
