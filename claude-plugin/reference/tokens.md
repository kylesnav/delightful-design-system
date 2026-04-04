# Delightful Design System — Token Reference

Neo-brutalist, warm boldness. oklch colors. 3-tier tokens. Solid shadows. Purposeful motion. CSS cascade layers (`@layer reset, primitives, semantic, component, utilities`).

**Fonts:** Inter (sans), JetBrains Mono (mono)
**Font links:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
```

---

## Tier 1 — Primitives

Raw oklch values. Named by scale, no semantic meaning. **Never use directly in components** — always go through Tier 2 semantic tokens.

### Neutral
| Token | Value |
|---|---|
| `--primitive-neutral-0` | `oklch(1.00 0.000 0)` |
| `--primitive-neutral-25` | `oklch(0.988 0.006 70)` |
| `--primitive-neutral-50` | `oklch(0.980 0.008 70)` |
| `--primitive-neutral-100` | `oklch(0.960 0.010 70)` |
| `--primitive-neutral-150` | `oklch(0.940 0.012 70)` |
| `--primitive-neutral-200` | `oklch(0.920 0.012 70)` |
| `--primitive-neutral-300` | `oklch(0.860 0.014 70)` |
| `--primitive-neutral-400` | `oklch(0.750 0.014 70)` |
| `--primitive-neutral-500` | `oklch(0.600 0.012 70)` |
| `--primitive-neutral-600` | `oklch(0.480 0.010 70)` |
| `--primitive-neutral-700` | `oklch(0.350 0.010 70)` |
| `--primitive-neutral-800` | `oklch(0.250 0.012 60)` |
| `--primitive-neutral-900` | `oklch(0.180 0.012 60)` |
| `--primitive-neutral-950` | `oklch(0.140 0.012 60)` |

### Pink
| Token | Value |
|---|---|
| `--primitive-pink-100` | `oklch(0.920 0.060 350)` |
| `--primitive-pink-200` | `oklch(0.840 0.140 350)` |
| `--primitive-pink-300` | `oklch(0.720 0.220 350)` |
| `--primitive-pink-400` | `oklch(0.640 0.270 350)` |
| `--primitive-pink-500` | `oklch(0.560 0.280 350)` |

### Red
| Token | Value |
|---|---|
| `--primitive-red-100` | `oklch(0.930 0.050 20)` |
| `--primitive-red-200` | `oklch(0.850 0.110 20)` |
| `--primitive-red-300` | `oklch(0.720 0.180 20)` |
| `--primitive-red-400` | `oklch(0.620 0.220 20)` |
| `--primitive-red-500` | `oklch(0.540 0.230 20)` |

### Gold
| Token | Value |
|---|---|
| `--primitive-gold-100` | `oklch(0.960 0.050 85)` |
| `--primitive-gold-200` | `oklch(0.920 0.110 85)` |
| `--primitive-gold-300` | `oklch(0.870 0.160 85)` |
| `--primitive-gold-400` | `oklch(0.840 0.175 85)` |
| `--primitive-gold-500` | `oklch(0.820 0.165 84)` |

### Cyan
| Token | Value |
|---|---|
| `--primitive-cyan-100` | `oklch(0.930 0.038 210)` |
| `--primitive-cyan-200` | `oklch(0.850 0.085 210)` |
| `--primitive-cyan-300` | `oklch(0.740 0.125 210)` |
| `--primitive-cyan-400` | `oklch(0.650 0.148 210)` |
| `--primitive-cyan-500` | `oklch(0.570 0.155 210)` |

### Green
| Token | Value |
|---|---|
| `--primitive-green-100` | `oklch(0.930 0.042 148)` |
| `--primitive-green-200` | `oklch(0.840 0.095 148)` |
| `--primitive-green-300` | `oklch(0.730 0.145 148)` |
| `--primitive-green-400` | `oklch(0.630 0.170 148)` |
| `--primitive-green-500` | `oklch(0.540 0.165 148)` |

### Purple
| Token | Value |
|---|---|
| `--primitive-purple-100` | `oklch(0.940 0.040 300)` |
| `--primitive-purple-200` | `oklch(0.860 0.080 300)` |
| `--primitive-purple-300` | `oklch(0.720 0.160 300)` |
| `--primitive-purple-400` | `oklch(0.640 0.220 300)` |
| `--primitive-purple-500` | `oklch(0.560 0.260 300)` |

---

## Tier 2 — Semantic Tokens

### Light Mode (`:root`, `[data-theme="light"]`)

**Backgrounds:**
| Token | Value |
|---|---|
| `--bg-page` | `oklch(0.982 0.008 70)` — warm peach cream |
| `--bg-surface` | `oklch(0.995 0.004 70)` |
| `--bg-elevated` | `oklch(1.00 0.00 0)` |
| `--bg-subtle` | `oklch(0.965 0.012 70)` |
| `--bg-muted` | `oklch(0.948 0.014 70)` |

**Text:**
| Token | Value |
|---|---|
| `--text-primary` | `oklch(0.200 0.015 60)` |
| `--text-secondary` | `oklch(0.420 0.015 60)` |
| `--text-muted` | `oklch(0.560 0.012 60)` |
| `--text-on-accent` | `oklch(1.00 0.000 0)` |
| `--text-on-gold` | `oklch(0.220 0.020 70)` |

**Borders:**
| Token | Value |
|---|---|
| `--border-default` | `oklch(0.340 0.025 60)` |
| `--border-strong` | `oklch(0.250 0.020 60)` |
| `--border-subtle` | `oklch(0.820 0.015 70)` |

Note: In dark mode, `--border-default` is muted (`oklch(0.550 0.010 65)`) to reduce visual noise. Use `--border-strong` for intentional emphasis.

**Accent Colors:**
| Family | Base | Hover | Subtle | Text |
|---|---|---|---|---|
| Pink | `oklch(0.640 0.270 350)` | `oklch(0.580 0.280 350)` | `oklch(0.955 0.040 350)` | `oklch(0.560 0.270 350)` |
| Danger | `oklch(0.620 0.220 20)` | `oklch(0.570 0.230 20)` | `oklch(0.950 0.040 20)` | `oklch(0.570 0.220 20)` |
| Gold | `oklch(0.840 0.175 85)` | `oklch(0.820 0.165 84)` | `oklch(0.965 0.060 85)` | `oklch(0.560 0.170 85)` |
| Cyan | `oklch(0.650 0.148 210)` | `oklch(0.600 0.150 210)` | `oklch(0.945 0.030 210)` | `oklch(0.560 0.148 210)` |
| Green | `oklch(0.630 0.170 148)` | `oklch(0.580 0.165 148)` | `oklch(0.945 0.035 148)` | `oklch(0.520 0.170 148)` |
| Purple | `oklch(0.640 0.220 300)` | `oklch(0.580 0.230 300)` | `oklch(0.950 0.035 300)` | `oklch(0.560 0.230 300)` |

**Status:** `--status-info` = primary, `--status-error` = danger, `--status-warning` = gold, `--status-success` = green

**Utility:**
| Token | Value |
|---|---|
| `--focus-ring` | `var(--accent-primary)` |
| `--overlay-bg` | `oklch(0.200 0.015 60 / 0.30)` |

**Shadows (layered — hard offset + ambient depth):**
| Token | Value |
|---|---|
| `--shadow-sm` | `2px 2px 0 var(--border-default)` |
| `--shadow-md` | `4px 4px 0 var(--border-default), 0 4px 8px oklch(0 0 0 / 0.08)` |
| `--shadow-lg` | `8px 8px 0 var(--border-default), 0 12px 24px oklch(0 0 0 / 0.12)` |
| `--shadow-pink` | `4px 4px 0 var(--accent-primary), 0 0 12px oklch(from var(--accent-primary) l c h / 0.2)` |
| `--shadow-danger` | `4px 4px 0 var(--accent-danger), 0 0 12px oklch(from var(--accent-danger) l c h / 0.2)` |
| `--shadow-gold` | `4px 4px 0 var(--accent-gold), 0 0 12px oklch(from var(--accent-gold) l c h / 0.2)` |
| `--shadow-cyan` | `4px 4px 0 var(--accent-cyan), 0 0 12px oklch(from var(--accent-cyan) l c h / 0.2)` |
| `--shadow-green` | `4px 4px 0 var(--accent-green), 0 0 12px oklch(from var(--accent-green) l c h / 0.2)` |
| `--shadow-purple` | `4px 4px 0 var(--accent-purple), 0 0 12px oklch(from var(--accent-purple) l c h / 0.2)` |

### Dark Mode (`[data-theme="dark"]`)

**Backgrounds:**
| Token | Value |
|---|---|
| `--bg-page` | `oklch(0.140 0.014 65)` |
| `--bg-surface` | `oklch(0.165 0.015 65)` |
| `--bg-elevated` | `oklch(0.190 0.015 65)` |
| `--bg-subtle` | `oklch(0.210 0.015 65)` |
| `--bg-muted` | `oklch(0.180 0.013 65)` |

**Text:**
| Token | Value |
|---|---|
| `--text-primary` | `oklch(0.935 0.008 70)` |
| `--text-secondary` | `oklch(0.690 0.012 70)` |
| `--text-muted` | `oklch(0.540 0.010 70)` |
| `--text-on-accent` | `oklch(1.00 0.000 0)` |
| `--text-on-gold` | `oklch(0.140 0.014 65)` |

**Borders:**
| Token | Value |
|---|---|
| `--border-default` | `oklch(0.550 0.010 65)` — muted for structure |
| `--border-strong` | `var(--text-primary)` |
| `--border-subtle` | `oklch(0.330 0.015 65)` |

**Accent Colors (Dark):**
| Family | Base | Hover | Subtle | Text |
|---|---|---|---|---|
| Pink | `oklch(0.700 0.230 350)` | `oklch(0.740 0.220 350)` | `oklch(0.250 0.065 350)` | `oklch(0.750 0.210 350)` |
| Danger | `oklch(0.660 0.200 20)` | `oklch(0.700 0.190 20)` | `oklch(0.250 0.055 20)` | `oklch(0.720 0.180 20)` |
| Gold | `oklch(0.840 0.170 85)` | `oklch(0.870 0.155 84)` | `oklch(0.260 0.065 85)` | `oklch(0.870 0.155 85)` |
| Cyan | `oklch(0.720 0.140 210)` | `oklch(0.760 0.130 210)` | `oklch(0.250 0.045 210)` | `oklch(0.780 0.130 210)` |
| Green | `oklch(0.680 0.155 148)` | `oklch(0.720 0.145 148)` | `oklch(0.250 0.048 148)` | `oklch(0.740 0.145 148)` |
| Purple | `oklch(0.700 0.200 300)` | `oklch(0.740 0.190 300)` | `oklch(0.250 0.055 300)` | `oklch(0.760 0.180 300)` |

**Utility (Dark):**
| Token | Value |
|---|---|
| `--focus-ring` | `oklch(0.700 0.230 350)` |
| `--overlay-bg` | `oklch(0 0 0 / 0.60)` |

**Dark Shadows:** Cream with alpha `oklch(0.92 0.010 65 / 0.2)` for hard offset + ambient depth layers on dark backgrounds. Color shadows use their respective accent vars with a stronger glow (`/0.3` alpha, 16px spread) for dark mode visibility.

| Token | Value |
|---|---|
| `--shadow-sm` | `2px 2px 0 oklch(0.92 0.010 65 / 0.2)` |
| `--shadow-md` | `4px 4px 0 oklch(0.92 0.010 65 / 0.2), 0 4px 12px oklch(0 0 0 / 0.3)` |
| `--shadow-lg` | `8px 8px 0 oklch(0.92 0.010 65 / 0.2), 0 12px 32px oklch(0 0 0 / 0.4)` |

---

## Tier 3 — Component Tokens

### Typography
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace;

/* Fluid scale (Major Third) */
--step--2: clamp(0.694rem, 0.650rem + 0.22vi, 0.8rem);
--step--1: clamp(0.833rem, 0.775rem + 0.29vi, 1rem);
--step-0:  clamp(1rem, 0.913rem + 0.43vi, 1.25rem);
--step-1:  clamp(1.2rem, 1.074rem + 0.63vi, 1.5625rem);
--step-2:  clamp(1.44rem, 1.261rem + 0.89vi, 1.953rem);
--step-3:  clamp(1.728rem, 1.480rem + 1.24vi, 2.441rem);
--step-4:  clamp(2.074rem, 1.734rem + 1.70vi, 3.052rem);
--step-5:  clamp(2.488rem, 2.028rem + 2.30vi, 3.815rem);

--tracking-tight: -0.02em;
--tracking-tighter: -0.03em;
--tracking-tightest: -0.04em;

--leading-none: 1.0;
--leading-tight: 1.15;
--leading-snug: 1.3;
--leading-normal: 1.55;
--leading-relaxed: 1.65;
```

### UI Text Scale (fixed, non-fluid — for controls)

| Token | Value | Use |
|---|---|---|
| `--ui-text-2xs` | `0.6875rem` (11px) | Badges, table headers |
| `--ui-text-xs` | `0.75rem` (12px) | Captions, hints, form errors |
| `--ui-text-sm` | `0.8125rem` (13px) | Sidebar, breadcrumbs, small buttons |
| `--ui-text-md` | `0.875rem` (14px) | Inputs, selects, tabs |
| `--ui-text-lg` | `0.9375rem` (15px) | Medium buttons |
| `--ui-text-xl` | `1.0625rem` (17px) | Large buttons |

### Control Heights

| Token | Value | Use |
|---|---|---|
| `--control-sm` | `32px` | Small buttons, pagination |
| `--control-md` | `36px` | Inputs, selects |
| `--control-lg` | `44px` | Medium buttons, avatars |
| `--control-xl` | `56px` | Large buttons, large avatars |

### Spacing (4px base grid)
```css
--space-1: 4px;   --space-1-5: 6px; --space-2: 8px;
--space-3: 12px;  --space-4: 16px;  --space-5: 20px;
--space-6: 24px;  --space-8: 32px;  --space-10: 40px;
--space-12: 48px; --space-16: 64px; --space-20: 80px;
```

### Border Radius
```css
--radius-sm: 10px;  --radius-md: 16px;  --radius-lg: 24px;
--radius-xl: 32px;  --radius-full: 9999px;
```

### Motion
```css
--motion-instant: 100ms;
--motion-fast: 160ms;
--motion-base: 240ms;
--motion-slow: 360ms;
--motion-deliberate: 500ms;

--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
--ease-slam: cubic-bezier(0.55, 0.06, 0.68, 0.19);
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
/* Spring easings — true multi-oscillation curves via linear() */
--ease-spring-gentle: linear(0, 0.006, 0.025 2.8%, 0.101 6.1%, 0.539 18.9%, 0.721 25.3%, 0.849 31.5%, 0.937 38.1%, 0.968 41.8%, 0.991 45.7%, 1.006 50%, 1.015 55%, 1.017 63.9%, 1.001 85.9%, 1);
--ease-spring-bouncy: linear(0, 0.004, 0.016, 0.035, 0.063 9.1%, 0.141, 0.25, 0.391, 0.563, 0.765, 1, 0.891, 0.813 45.5%, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785, 0.813 63.6%, 0.891, 1 72.7%, 0.973, 0.953, 0.941, 0.938, 0.941, 0.953, 0.973, 1, 0.988, 0.984, 0.988, 1);
```

**Duration guidance:**

| Token | Value | Use |
|-------|-------|-----|
| `--motion-instant` | 100ms | Button press, toggle snap |
| `--motion-fast` | 160ms | Hover effects, micro-interactions |
| `--motion-base` | 240ms | General transitions, fade in/out |
| `--motion-slow` | 360ms | Complex transitions, panel slides |
| `--motion-deliberate` | 500ms | Page transitions, choreographed sequences |

**Easing guidance:**

| Token | Use |
|-------|-----|
| `--ease-out` | General deceleration, most UI transitions |
| `--ease-bounce` | Playful overshoot, toggle/switch, attention |
| `--ease-smooth` | Smooth deceleration, content reveals |
| `--ease-slam` | Fast-in abrupt stop, stamps, thuds |
| `--ease-elastic` | Exaggerated overshoot, springy elements |
| `--ease-spring-gentle` | Gentle spring with subtle overshoot, settles quickly |
| `--ease-spring-bouncy` | Bouncy spring with multiple oscillations, playful attention-grabbing |

### Z-Index Scale

| Token | Value | Use |
|---|---|---|
| `--z-base` | `1` | Content layering |
| `--z-sticky` | `100` | Sticky nav, mobile menu |
| `--z-fixed` | `200` | Fixed topnav |
| `--z-overlay` | `300` | Scroll progress, overlays |
| `--z-modal` | `1000` | Modal dialogs |
| `--z-toast` | `1100` | Toast notifications |
| `--z-tooltip` | `1500` | Tooltips |

### Container Widths

| Token | Value | Use |
|---|---|---|
| `--container-sm` | `640px` | Narrow content (forms, settings) |
| `--container-md` | `960px` | Medium content (tables, lists) |
| `--container-lg` | `1200px` | Wide content (dashboards) |

### Button Tokens
```css
--btn-primary-bg: var(--accent-primary);
--btn-primary-text: var(--text-on-accent);
--btn-danger-bg: var(--accent-danger);
--btn-danger-text: var(--text-on-accent);
--btn-gold-bg: var(--accent-gold);
--btn-gold-text: var(--text-on-gold);
--btn-cyan-bg: var(--accent-cyan);
--btn-cyan-text: var(--text-on-accent);
--btn-green-bg: var(--accent-green);
--btn-green-text: var(--text-on-accent);
--btn-purple-bg: var(--accent-purple);
--btn-purple-text: var(--text-on-accent);
--btn-gap: var(--space-1-5);   /* 6px — icon + label spacing */
```

### Badge Tokens
```css
--badge-py: 2px;    /* vertical padding */
--badge-px: 10px;   /* horizontal padding */
```

### Toggle Tokens
```css
--toggle-off-bg: var(--primitive-neutral-300);
--toggle-on-bg: var(--accent-primary);
--toggle-knob: var(--primitive-neutral-0);
```

### Chart Palette
```css
--chart-1: var(--accent-primary);
--chart-2: var(--accent-gold);
--chart-3: var(--accent-cyan);
--chart-4: var(--accent-green);
--chart-5: var(--accent-purple);
--chart-6: var(--accent-danger);
```

---

## Base Reset & Body

```css
*, *::before, *::after {
  margin: 0; padding: 0; box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  font-size: var(--step-0);
  line-height: var(--leading-normal);
  color: var(--text-primary);
  background: var(--bg-page);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```
