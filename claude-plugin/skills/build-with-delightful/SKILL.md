---
name: build-with-delightful
description: This skill should be used when the user wants to build new UI using the Delightful design system — in any format. Common triggers include "build with delightful", "create a new page", "scaffold a UI", "make a component", "design in Figma with delightful", "build a form", or any request to construct UI following neo-brutalist patterns with oklch tokens. Works with HTML/CSS, Figma, React, or any available output tool.
allowed-tools: "Bash WebFetch"
metadata:
  author: Delightful Design System
  version: 0.7.0
  tags: [design-system, css, neo-brutalist, oklch, ui, figma]
---

# Build with Delightful

Build new UI from the ground up using the Delightful design system. Output adapts to whatever tools are available — HTML/CSS files, Figma designs, React components, or any combination.

## Instructions

### Step 1 — Read the References

Read these files from the plugin directory:
- `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md` — All token values (colors, spacing, typography, motion)
- `${CLAUDE_PLUGIN_ROOT}/reference/components.md` — Component patterns and structure
- `${CLAUDE_PLUGIN_ROOT}/reference/interactions.md` — POUNCE/SINK press patterns, animation timing
- `${CLAUDE_PLUGIN_ROOT}/reference/composition.md` — Page layouts, responsive patterns
- `${CLAUDE_PLUGIN_ROOT}/reference/philosophy.md` — Design rationale (read if this is the first build)

### Step 2 — Determine the Output

Check what the user wants and what tools are available:

- **HTML/CSS** (default if writing code): Write files using `Write`/`Edit` tools
- **Figma**: Use Figma MCP tools (`use_figma`, `generate_figma_design`) to create designs with proper variables, components, and prototyping
- **React/Vue/Svelte**: Write component files using framework conventions with token imports
- **Design spec**: Produce a structured description of components, tokens, and states
- **Multiple outputs**: Build in one format, then push to another (e.g., build HTML then push to Figma, or pull from Figma and generate code)

If the output format isn't obvious, ask the user.

### Step 3 — Establish the Token Foundation

Set up the design system tokens appropriate to the output format:

**Design principles (apply to ALL formats):**
- 7 oklch color scales: neutral (hue 70/65), pink (350), red (20), gold (85), cyan (210), green (148), purple (300)
- 3-tier token architecture: primitives → semantic → component (components never reference primitives)
- Spacing scale: 4px base (4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80)
- Typography: Inter for body, JetBrains Mono for code. Fluid content scale (`--step-*`), fixed control scale (`--ui-text-*`)
- Motion: instant (100ms), fast (160ms), base (240ms), slow (360ms), deliberate (500ms)
- Dark mode via semantic token swap — same component code, different token values

**If HTML/CSS:** Copy the token system from `${CLAUDE_PLUGIN_ROOT}/themes/css/delightful-tokens.css`. Add cascade layers, base reset, Google Fonts, dark mode toggle, skip link, reduced-motion guard.

**If Figma:** Create color variables (primitive + semantic collections), spacing variables, typography styles, effect styles (solid shadows). Set up light/dark mode variable modes.

**If React/framework:** Import or inline tokens as CSS custom properties or a JS/TS token object. Set up theme provider for dark mode.

### Step 4 — Build

Create components and layouts following Delightful design principles:

**Token discipline (ALL formats):**
- Every color references a semantic token — never hardcoded
- Every spacing value uses the scale — never arbitrary
- Every font size uses the type scale — never arbitrary
- Every border-radius uses the radius scale

**Neo-brutalist patterns (ALL formats):**
- Shadows: layered — hard offset (zero blur) + ambient depth
- Borders: 2px solid on cards and buttons
- Card hover: lift (-4px, -4px) + shadow escalation
- Button hover: lift (-2px) + shadow escalation
- Active/press: sink (2px, 2px) + shadow collapse
- Transitions: instant timing for transform/shadow, fast for color

**Interaction states (ALL formats):**
- Rest → Hover (lift + shadow) → Active (press + no shadow) → Focus-visible (outline) → Disabled (opacity 0.4)
- These translate to CSS pseudo-classes, Figma component variants, or framework state props

**Accessibility (ALL formats):**
- 4.5:1 contrast ratio for normal text, 3:1 for large
- Keyboard navigation for all interactive elements
- Skip navigation link / equivalent
- Reduced-motion respect
- No information conveyed by color alone

### Step 5 — Verify

Check compliance using the best available method:

- **If files were written:** Launch the `delightful-auditor` agent to scan for violations
- **If Figma was used:** Review the design for token consistency — check that fills use variables, spacing aligns to scale, all interactive states have variants
- **If a live page exists:** Use Chrome DevTools MCP or Computer Use to screenshot and visually verify both light and dark mode
- **If browser tools aren't available:** Review the code manually against the quality gate

**Quality gate — zero tolerance for:**
- Hardcoded colors (must use tokens)
- Arbitrary spacing (must use scale)
- Arbitrary font sizes (must use type scale)
- Missing interaction states on interactive elements
- Broken dark mode
- Missing reduced-motion guards

### Step 6 — Fix and Iterate

If verification finds violations:
1. Fix each violation using the token mapping from `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md`
2. Re-verify
3. Repeat until clean

## Examples

### Example 1: HTML Login Page
User says "Build me a login page with delightful"
→ Scaffold CSS tokens, build form with card/input/button components, audit, fix, done.

### Example 2: Figma Dashboard Design
User says "Design a dashboard in Figma using delightful"
→ Read tokens, create Figma variables for colors/spacing, build frame hierarchy with card components, add interactive prototyping for hover/press states.

### Example 3: React Component from Figma
User says "Build this Figma design as a React component" (provides Figma URL)
→ Read Figma design via MCP, read Delightful references, generate React component with token imports, verify compliance.

### Example 4: Landing Page with Screenshot Verification
User says "Build a landing page and show me how it looks"
→ Build HTML, open in browser via Chrome DevTools MCP, screenshot both themes, iterate on visual issues.

## Troubleshooting

### Colors still look wrong in dark mode
Cause: Using primitive tokens directly instead of semantic tokens
Fix: Replace all primitive references with `--bg-*`, `--text-*`, or `--accent-*` semantic tokens

### Shadows have blur/glow effect
Cause: Non-zero blur radius on the hard offset layer
Fix: Hard offset layer is always `Xpx Ypx 0` — zero blur. Ambient depth layer may have blur.

### Animations feel janky on some devices
Cause: Missing `prefers-reduced-motion` guard
Fix: Wrap animations in `@media (prefers-reduced-motion: no-preference)`

### Can't push to Figma / no Figma tools available
Cause: Figma MCP not connected
Fix: Build as HTML/CSS instead, or ask user to connect Figma MCP. The design system works in any format.
