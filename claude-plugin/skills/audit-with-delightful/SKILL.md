---
name: audit-with-delightful
description: This skill should be used when the user wants to audit an existing project for Delightful Design System compliance. Common triggers include "audit with delightful", "check design system compliance", "scan for violations", "run a delightful audit", "check my tokens", or any request to find hardcoded colors, arbitrary spacing, missing interaction states, dark mode issues, or accessibility gaps in CSS/HTML.
allowed-tools: "Bash WebFetch"
metadata:
  author: Delightful Design System
  version: 0.7.0
  tags: [design-system, css, audit, compliance, oklch]
---

# Audit with Delightful

Run a compliance audit against the Delightful Design System. Scans for hardcoded values, missing interaction states, accessibility gaps, dark mode breakage, and token drift.

## Workflow

### Step 1 — Read the rules

Read `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md` and `${CLAUDE_PLUGIN_ROOT}/reference/accessibility.md` from the plugin directory to understand current token values and compliance targets.

### Step 2 — Scan

Launch the `delightful-auditor` agent on the target project. The agent scans all HTML, CSS, JSX, TSX, Vue, and Svelte files for 18+ violation types across three severity levels. It uses Glob to find files, Read to get contents, and Grep for pattern matching against violation rules.

If no target path is specified, scan the current working directory.

### Step 3 — Report

Present the audit results organized by severity:
1. **Errors** (must fix) — hardcoded colors, arbitrary spacing/font-sizes, blurred shadows
2. **Warnings** (should fix) — missing interaction states, dark mode issues, reduced-motion gaps
3. **Info** (nice to have) — non-oklch colors, missing skip links, non-native form controls

### Step 4 — Fix (optional)

If the user wants auto-fixes, apply them using the mapping guide from `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md`:
- Hardcoded colors -> semantic token references (`--text-*`, `--bg-*`, `--accent-*`)
- Arbitrary spacing -> `var(--space-*)` scale (4px=1, 8px=2, 12px=3, 16px=4, 24px=6, 32px=8)
- Arbitrary font sizes -> `var(--step-*)` for content, `var(--ui-text-*)` for controls
- Blurred shadows -> solid offsets (`--shadow-sm`, `--shadow-md`, `--shadow-lg` — zero blur)
- Hardcoded z-index -> `var(--z-*)` tokens
- Missing hover/active/focus-visible/disabled -> patterns from `${CLAUDE_PLUGIN_ROOT}/reference/interactions.md`
- Missing reduced-motion guard -> wrap animations in `@media (prefers-reduced-motion: no-preference)`
- Arbitrary border-radius -> `var(--radius-*)` scale
- Raw motion values -> `var(--motion-*)` and `var(--ease-*)` tokens

### Step 5 — Re-audit

After fixes, re-run the audit to verify zero Errors remain. Repeat until the report shows `Status: PASS`.

## Common Violations

| What you wrote | What to use instead |
|---|---|
| `color: #333` | `color: var(--text-primary)` |
| `padding: 16px` | `padding: var(--space-4)` |
| `font-size: 14px` | `font-size: var(--ui-text-md)` |
| `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` | `box-shadow: var(--shadow-md)` |
| `border-radius: 8px` | `border-radius: var(--radius-sm)` |
| `z-index: 999` | `z-index: var(--z-modal)` |
| `transition: 0.3s ease` | `transition: var(--motion-base) var(--ease-out)` |
| `border: 1px solid gray` | `border: 2px solid var(--text-primary)` (cards/buttons) |
| `opacity: 0.5` (disabled) | `opacity: 0.4; cursor: not-allowed; pointer-events: none;` |
| Accordion using custom JS | Native `<details>` / `<summary>` with `.accordion-item` |
| `outline: none` on focus | `:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }` |

## Examples

### Example 1: Tailwind Project Audit
User says "Audit my Tailwind project for delightful compliance"
Actions:
1. Read token and accessibility references
2. Auditor scans all `.tsx` and `.css` files
3. Report finds: 47 hardcoded colors in utility classes, 23 arbitrary spacing values, 0 dark mode tokens, no interaction states on buttons
4. Present report organized by severity — 70 Errors, 12 Warnings, 5 Info
5. User requests auto-fix: migrate colors to semantic tokens, spacing to scale, add hover/active/focus-visible states
6. Re-audit confirms zero Errors
Result: Project passes compliance with systematic tokens and full interaction states

### Example 2: Static HTML Portfolio
User says "Check my portfolio site for design system violations"
Actions:
1. Auditor scans 5 HTML files and 2 CSS files
2. Finds: mixed hex/rgb colors, blurred drop-shadows, no reduced-motion guards, missing skip link
3. Report: 15 Errors (hardcoded colors, blurred shadows), 8 Warnings (no reduced-motion, missing focus states), 3 Info (missing skip link, non-native accordion)
4. User fixes shadows and colors; re-audit shows 0 Errors, 2 Warnings remaining
Result: Portfolio site passes with warnings-only for optional improvements

### Example 3: React Component Library
User says "Run a delightful audit on my component library"
Actions:
1. Auditor scans `.tsx` and `.css` module files across 20+ components
2. Finds: inline styles with hex colors, px-based spacing, inconsistent border patterns, no dark mode support
3. Present findings per-component so the team can migrate incrementally
4. Optional: auto-fix one component as a reference, then the team follows the pattern
Result: Audit report serves as a migration checklist for the full library

## Troubleshooting

### Auditor reports false positives on token definitions
Cause: Auditor flagging oklch values inside `:root` or `[data-theme]` custom property definitions
Solution: These are allowed exceptions — the auditor skips `:root` and `[data-theme]` blocks. If false positives persist, check that token definitions are inside the correct selectors.

### Colors still look wrong in dark mode after fixing
Cause: Using primitive tokens (`--primitive-*`) directly instead of semantic tokens
Solution: Replace all `--primitive-*` references with `--bg-*`, `--text-*`, or `--accent-*` semantic tokens. Primitive tokens don't change between themes — only semantic tokens do.

### Shadows flagged despite using shadow tokens
Cause: Custom shadow layer added with a blur radius alongside the token shadow
Solution: Delightful shadows are always solid (zero blur). Remove any blur from the hard offset layer. The ambient depth layer (second layer in `--shadow-md`/`--shadow-lg`) may have blur — that is allowed.

### Audit reports too many violations — where to start
Cause: Large legacy codebase with hundreds of hardcoded values
Solution: Prioritize by severity — fix all Errors first (hardcoded colors, spacing, fonts, blurred shadows), then Warnings (interaction states, dark mode, reduced-motion). Use the `/refactor-with-delightful` skill for systematic migration rather than fixing one-by-one.

### Third-party CSS flagged as violations
Cause: Auditor scanning vendor/library stylesheets
Solution: Third-party library stylesheets are allowed exceptions. Override vendor styles with higher specificity using Delightful tokens rather than modifying the vendor CSS directly.
