---
name: audit-with-delightful
description: This skill should be used when the user wants to check any UI for Delightful Design System compliance. Common triggers include "audit with delightful", "check design system compliance", "scan for violations", "does this match delightful", "check my tokens", "audit this Figma", "review this design", or any request to find hardcoded values, missing interaction states, or accessibility gaps. Works on code files, Figma designs, live pages, or screenshots.
allowed-tools: "Bash WebFetch"
metadata:
  author: Delightful Design System
  version: 0.7.0
  tags: [design-system, css, audit, compliance, oklch, figma]
---

# Audit with Delightful

Run a compliance audit against the Delightful Design System. Adapts to whatever input is available — code files, Figma designs, live pages, or screenshots.

## Workflow

### Step 1 — Read the rules

Read `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md` and `${CLAUDE_PLUGIN_ROOT}/reference/accessibility.md` from the plugin directory to understand current token values and compliance targets.

### Step 2 — Scan

Determine what you're auditing and use the best available method:

**Code files** (default — HTML, CSS, JSX, TSX, Vue, Svelte):
Launch the `delightful-auditor` agent on the target project. It scans for 18+ violation types across three severity levels using Glob, Read, and Grep. If no target path is specified, scan the current working directory.

**Figma design** (user provides Figma URL or mentions Figma):
Use Figma MCP tools to read the design (`get_design_context`, `get_screenshot`). Check:
- Color fills: are they using variables or raw hex/rgb values?
- Spacing: does padding/gap align to the 4px-base scale?
- Typography: does it use Inter/JetBrains Mono at type scale sizes?
- Shadows: solid offset style, not blurred drop shadows?
- Components: do interactive elements have state variants (Rest, Hover, Active, Focus, Disabled)?
- Dark mode: is there a dark theme with variable modes?

**Live page** (user provides URL or page is running):
Use Chrome DevTools MCP to inspect the page. Run a Lighthouse audit for accessibility. Check computed styles against token values. Screenshot light and dark mode.

**Screenshot/image** (user provides image path):
Read the image and visually assess:
- Color warmth (cream backgrounds, not cool gray)
- Shadow style (solid offset, not blurred)
- Border style (visible 2px borders on cards/buttons)
- Spacing consistency
- Typography hierarchy
- Dark mode support (if a dark screenshot is provided)

### Step 3 — Report

Present the audit results organized by severity:
1. **Errors** (must fix) — hardcoded colors, arbitrary spacing/font-sizes, blurred shadows
2. **Warnings** (should fix) — missing interaction states, dark mode issues, reduced-motion gaps
3. **Info** (nice to have) — non-oklch colors, missing skip links, non-native form controls

For non-code audits (Figma, screenshots), adapt the categories:
- **Errors:** Raw color fills (not variables), spacing off-scale, blurred shadows
- **Warnings:** Missing component variants for interaction states, no dark mode setup
- **Info:** Typography not using the type scale, missing component documentation

### Step 4 — Fix (optional)

If the user wants fixes, apply them using the appropriate tools:

**Code fixes** — use the mapping guide from `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md`:
- Hardcoded colors → semantic token references (`--text-*`, `--bg-*`, `--accent-*`)
- Arbitrary spacing → `var(--space-*)` scale
- Arbitrary font sizes → `var(--step-*)` for content, `var(--ui-text-*)` for controls
- Blurred shadows → solid offsets (`--shadow-sm`, `--shadow-md`, `--shadow-lg`)
- Missing interaction states → patterns from `${CLAUDE_PLUGIN_ROOT}/reference/interactions.md`

**Figma fixes** — use Figma MCP tools to:
- Create variable collections if they don't exist
- Rebind raw fills to variables
- Add component variants for interaction states
- Set up light/dark mode variable modes

**Live page** — identify source files and fix there, then re-screenshot to verify

### Step 5 — Re-audit

After fixes, re-run the audit using the same method as Step 2. Repeat until `Status: PASS`.

## Common Violations

| What you have | What it should be | Token |
|---|---|---|
| `#333` or raw dark fill | Semantic text color | `text-primary` |
| `16px` padding or arbitrary gap | Scale spacing | `space-4` |
| `14px` font size | Control type scale | `ui-text-md` |
| Blurred box-shadow / drop shadow | Solid offset + ambient depth | `shadow-md` |
| `8px` border-radius | Radius scale | `radius-sm` |
| `z-index: 999` | Z-index scale | `z-modal` |
| `0.3s ease` transition | Motion tokens | `motion-base` + `ease-out` |
| Missing hover/active states | POUNCE/SINK interaction pattern | See interactions.md |
| `outline: none` on focus | Focus ring | `focus-ring` with offset |

## Examples

### Example 1: Code Project Audit
User says "Audit my project for delightful compliance"
→ Launch auditor agent, scan files, report violations by severity, optionally auto-fix.

### Example 2: Figma Design Review
User says "Does this Figma match delightful?" (provides URL)
→ Read design via Figma MCP, check fills against token values, verify shadow styles, check for interaction variants, report findings.

### Example 3: Live Page Check
User says "Check if my page follows delightful" (page is running locally)
→ Navigate via Chrome DevTools MCP, inspect computed styles, screenshot both themes, report violations.

### Example 4: Screenshot Comparison
User says "Is this using delightful correctly?" (provides screenshot)
→ Read image, visually assess colors/shadows/spacing/typography against design system, report findings.

## Troubleshooting

### Auditor reports false positives on token definitions
Token definitions in `:root` / `[data-theme]` blocks are allowed exceptions.

### Can't access Figma file
Ask user to connect Figma MCP, or request an exported screenshot to audit visually instead.

### Audit reports too many violations
Prioritize Errors first, then Warnings. Use `/refactor-with-delightful` for systematic migration.

### Third-party CSS flagged
Third-party stylesheets are allowed exceptions. Override with tokens, don't modify vendor CSS.
