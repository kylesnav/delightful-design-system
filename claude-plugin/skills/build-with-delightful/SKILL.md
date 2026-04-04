---
name: build-with-delightful
description: This skill should be used when the user wants to build a new web project, page, or UI component using the Delightful design system. Common triggers include "build with delightful", "create a new page", "scaffold a UI", "make a website", "build a form", "create a component", or any request to construct HTML/CSS from scratch following neo-brutalist patterns with oklch tokens.
allowed-tools: "Bash WebFetch"
metadata:
  author: Delightful Design System
  version: 0.7.0
  tags: [design-system, css, neo-brutalist, oklch, ui]
---

# Build with Delightful

Build a new project or UI from the ground up using the Delightful design system.

## Instructions

### Step 1 — Read the References

Read these files from the plugin directory:
- `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md` — All token values (colors, spacing, typography, motion)
- `${CLAUDE_PLUGIN_ROOT}/reference/components.md` — Component patterns with full CSS and HTML
- `${CLAUDE_PLUGIN_ROOT}/reference/interactions.md` — POUNCE/SINK press patterns, animation keyframes
- `${CLAUDE_PLUGIN_ROOT}/reference/composition.md` — Page layouts, responsive patterns, utility classes

### Step 2 — Scaffold the Token System

Set up the project foundation:

1. Add Google Fonts link (Inter + JetBrains Mono)
2. Add the full CSS custom property system — all 3 tiers:
   - **Tier 1 — Primitives:** Raw oklch color scales (neutral, pink, red, gold, cyan, green, purple)
   - **Tier 2 — Semantic:** Light mode + dark mode tokens (backgrounds, text, accents, borders, shadows)
   - **Tier 3 — Component:** Typography scale, spacing scale, radius scale, motion tokens, button/toggle tokens
3. Add cascade layer order: `@layer reset, primitives, semantic, component, utilities;`
4. Add the base reset (`*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }`) in `@layer reset`
5. Set body styles (font-family, font-size, line-height, color, background, font-smoothing, font-feature-settings)
6. Add global `:focus-visible` style
7. Add `prefers-reduced-motion: reduce` global guard
8. Add dark mode toggle using `data-theme` attribute on `<html>`
9. Add animation keyframes inside `@media (prefers-reduced-motion: no-preference)`
10. Add skip navigation link as first element in `<body>`

Copy the complete token system from `${CLAUDE_PLUGIN_ROOT}/themes/css/delightful-tokens.css`.

### Step 3 — Build

Create components and pages using **only** Delightful tokens and patterns:

- Every color is a `var(--*)` token
- Every spacing value uses `var(--space-*)`
- Every content font size uses `var(--step-*)`, every control font size uses `var(--ui-text-*)`
- Every border-radius uses `var(--radius-*)`
- Shadows use layered approach: hard offset (zero blur) + ambient depth
- Borders are `2px solid` on cards/buttons
- All interactive elements have: `:hover` (lift + shadow), `:active` (press + no shadow), `:focus-visible` (outline), `:disabled` (opacity 0.4)
- Neo-brutalist card hover: `transform: translate(-4px, -4px); box-shadow: var(--shadow-lg);`
- Neo-brutalist button hover: `transform: translateY(-2px); box-shadow: var(--shadow-md);`
- Neo-brutalist active (all): `transform: translate(2px, 2px); box-shadow: 0 0 0 var(--text-primary);`
- Transition timing: `transform var(--motion-instant) linear, box-shadow var(--motion-instant) linear`
- Use native `<details>`/`<summary>` for accordions, native `<input type="range">` for sliders
- Use container queries (`container-type: inline-size` + `@container`) for component-level responsive behavior
- Include `.skip-link` for keyboard accessibility

### Step 4 — Verify

Launch the `delightful-auditor` agent to scan every file produced. The auditor checks:

- Zero hardcoded colors (no hex, rgb, hsl — only `var(--*)`)
- Zero arbitrary spacing (only `var(--space-*)`)
- Zero arbitrary font sizes (only `var(--step-*)` or `var(--ui-text-*)`)
- All interactive elements have hover/active/focus-visible states
- Dark mode works (semantic tokens, not primitives)
- `prefers-reduced-motion` guards on all animations
- All shadows are solid (zero blur radius)
- Border-radius uses scale (`var(--radius-*)`)

### Step 5 — Fix

If the auditor finds violations:
1. Fix each violation using the suggested token mapping
2. Re-run the auditor
3. Repeat until the report shows zero errors

### Step 6 — Visual Check

If browser tools are available (Playwright MCP), open the result and screenshot to verify it looks correct. Check both light and dark mode.

## Examples

### Example 1: Login Page
User says "Build me a login page with delightful"
Actions:
1. Scaffold token system with dark mode toggle
2. Build login form with `.input`, `.btn-primary`, `.card` components
3. Run auditor — zero violations
Result: Complete login page with dark mode, all interaction states, neo-brutalist styling

### Example 2: Dashboard
User says "Create a dashboard UI"
Actions:
1. Scaffold tokens + build KPI cards, data table, sidebar nav
2. Audit and fix any violations
Result: Full dashboard with cards, table, sidebar — all using design system tokens

### Example 3: Landing Page
User says "Build a landing page for my product"
Actions:
1. Scaffold tokens + build hero section, feature grid, CTA buttons, footer
2. Verify all typography uses fluid `--step-*` scale
3. Audit confirms zero hardcoded values
Result: Responsive landing page with warm neo-brutalist aesthetic, solid shadows, spring animations

## Troubleshooting

### Colors still look wrong in dark mode
Cause: Using primitive tokens (`--primitive-*`) directly instead of semantic tokens
Solution: Replace all `--primitive-*` references with `--bg-*`, `--text-*`, or `--accent-*` semantic tokens

### Shadows have blur/glow effect
Cause: `box-shadow` has a non-zero blur radius (e.g., `0 4px 12px`)
Solution: Use solid shadows only: `4px 4px 0` — zero blur radius is the neo-brutalist rule

### Animations feel janky on some devices
Cause: Missing `prefers-reduced-motion` guard
Solution: Wrap all `@keyframes` and animation properties in `@media (prefers-reduced-motion: no-preference)`

### Auditor reports false positives on token definitions
Cause: Auditor flagging oklch values inside `:root` or `[data-theme]` custom property definitions
Solution: These are allowed exceptions — the auditor should skip `:root` and `[data-theme]` blocks
