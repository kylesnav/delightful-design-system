# Delightful Design System — Interactions & Motion

Interaction patterns, animation keyframes, and motion guidance. For token values see `tokens.md`.

---

## Animations & Keyframes

All animations MUST be wrapped in `@media (prefers-reduced-motion: no-preference)`.

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(5px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(2px); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes fadeOutRight {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(100%); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-100%); }
    to { opacity: 1; transform: translateX(0); }
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Utility Classes
```css
.anim-in { animation: fadeInUp 0.5s var(--ease-smooth) both; }
.anim-d1 { animation-delay: 0.06s; }
.anim-d2 { animation-delay: 0.12s; }
/* ... up to .anim-d12 (0.72s) */
```

### text-stamp (per-character drop-in)
```css
@keyframes text-stamp {
  0% { transform: translateY(-20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
.anim-text-stamp {
  animation: text-stamp 200ms var(--ease-bounce) both;
}
/* Apply to individual characters/spans, stagger 40ms via JS animation-delay */
```

### accordion-squish (grid-based height animation)
```css
.accordion-squish {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 240ms var(--ease-smooth);
}
.accordion-squish > * { overflow: hidden; }
.accordion-squish.accordion-open { grid-template-rows: 1fr; }
/* Toggle .accordion-open class to animate height smoothly */
```

See the [Motion System](https://kylesnav.github.io/delightful-design-system/delightful-motion.html) for 59 named animations across 10 categories with live demos.

---

## Interaction Patterns

### POUNCE Pattern (buttons, cards, tiles)

The signature Delightful press interaction. Elements lift on hover (bigger shadow) and sink on active (shadow collapses).

**State machine:** rest -> hover (lift + shadow escalate) -> active (press + shadow collapse) -> rest

### hover-lift (cards, tiles)
```css
.hover-lift {
  transition: transform var(--motion-fast) var(--ease-smooth),
              box-shadow var(--motion-fast) var(--ease-out);
}
.hover-lift:hover {
  transform: translateY(-3px) scale(1.01);
}
.hover-lift:active {
  transform: translateY(0) scale(0.99);
}
```

### btn-bounce (buttons)
```css
.btn-bounce {
  transition: transform var(--motion-fast) var(--ease-bounce),
              background-color var(--motion-fast) var(--ease-out),
              box-shadow var(--motion-fast) var(--ease-out);
}
.btn-bounce:hover { transform: scale(1.03); }
.btn-bounce:active { transform: scale(0.97); transition-duration: var(--motion-instant); }
```

### card-interactive (neo-brutalist pounce/sink)
```css
.card-interactive {
  transition: transform var(--motion-instant) linear, box-shadow var(--motion-instant) linear,
              border-color var(--motion-fast) var(--ease-out);
  will-change: transform;
}
.card-interactive:hover {
  transform: translate(-4px, -4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-strong);
  z-index: 10;
}
.card-interactive:active {
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 var(--text-primary);
}
```

### SINK Pattern (nav, pagination, sidebar, tags)

A simpler press pattern for utility elements. No shadow escalation — just vertical movement.

- **Hover:** `translateY(-2px)` only
- **Active:** `translateY(1px)` only

### Shadow Escalation Rules

| Element | Rest | Hover | Active |
|---------|------|-------|--------|
| Button (.btn) | `shadow-sm` | `shadow-md` | none (translate(2px, 2px)) |
| Card (.card-interactive) | `shadow-md` | `shadow-lg` | none (translate(2px, 2px)) |
| Nav/pagination | none | translateY(-2px) | translateY(1px) |

### Neo-Brutalist Card Hover (signature)

The base `.card` class has **no** hover or active states — it is a static container. Only `.card-interactive` gets the pounce/sink interaction:

```css
/* .card — static, no hover/active */
/* .card-interactive — interactive, gets pounce/sink */
.card-interactive:hover {
  transform: translate(-4px, -4px);
  box-shadow: var(--shadow-lg);
}
.card-interactive:active {
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 var(--text-primary);
}
```

### Transition Timing Rules

- **Transform + shadow:** `--motion-instant` (100ms) — feels snappy, tactile
- **Color changes:** `--motion-fast` (160ms) — smooth enough to see, fast enough to not lag
- **Content reveals:** `--motion-base` (240ms) — deliberate but not slow
- **Panel slides:** `--motion-slow` (360ms) — complex transitions need time
- **Active state override:** Always use `transition-duration: var(--motion-instant)` on `:active` for immediate response
