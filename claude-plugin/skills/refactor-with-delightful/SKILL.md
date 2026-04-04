---
name: refactor-with-delightful
description: This skill should be used when the user wants to refactor or migrate existing UI to the Delightful design system — in any format. Common triggers include "refactor with delightful", "migrate to delightful", "apply design system", "replace hardcoded styles", "convert to delightful tokens", "update my Figma to use delightful", or any request to replace ad-hoc styling with systematic oklch tokens, dark mode, and neo-brutalist patterns. Works with code, Figma designs, or any available tool.
allowed-tools: "Bash WebFetch"
metadata:
  author: Delightful Design System
  version: 0.7.0
  tags: [design-system, css, refactoring, migration, oklch, figma]
---

# Refactor with Delightful

Migrate existing UI to the Delightful design system. Works on code files, Figma designs, live pages, or any combination — adapts to whatever tools are available.

## Instructions

Before starting, read `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md` and `${CLAUDE_PLUGIN_ROOT}/reference/interactions.md` from the plugin directory for token values and interaction patterns.

### Step 1 — Audit the Existing Work

Determine what you're auditing and use the best available method:

- **Code files** (HTML, CSS, JSX, TSX, Vue, Svelte): Launch the `delightful-auditor` agent to scan the codebase
- **Figma design** (user provides URL or file): Use Figma MCP tools to read the design, then check colors/spacing/typography against Delightful token values
- **Live page** (user provides URL or page is running): Use Chrome DevTools MCP to inspect computed styles, or take a screenshot for visual comparison
- **Screenshot/image**: Read the image and assess visual compliance (colors, spacing, shadow style, interaction indicators)

The audit should map:
- All hardcoded/arbitrary colors → which Delightful semantic tokens they should become
- All arbitrary spacing → which `--space-*` values
- All font sizes → which `--step-*` or `--ui-text-*` values
- Missing interaction states (hover, active, focus-visible)
- Missing dark mode support
- Blurred shadows that should be solid (hard offset + ambient depth)
- Missing `prefers-reduced-motion` guards

### Step 2 — Present the Migration Plan

Show the audit findings organized by priority:

1. **Critical (Errors):** Hardcoded colors, arbitrary spacing/font sizes, blurred shadows
2. **Important (Warnings):** Missing interaction states, missing dark mode, missing reduced-motion
3. **Nice-to-have (Info):** Non-oklch colors, border inconsistencies, missing skip links

Propose a migration order:
1. Establish the token system
2. Migrate colors to semantic tokens
3. Migrate spacing to scale
4. Migrate typography to type scale
5. Add interaction states
6. Add dark mode support
7. Add reduced-motion guards

### Step 3 — Establish the Token System

Inject the Delightful token foundation appropriate to the target format:

**If code (HTML/CSS):**
1. Import or inline tokens from `${CLAUDE_PLUGIN_ROOT}/themes/css/delightful-tokens.css`
2. Add Google Fonts, cascade layers, base reset, dark mode toggle, skip link, reduced-motion guard

**If Figma:**
1. Create variable collections: primitives (7 color scales), semantic (light + dark modes), spacing, typography
2. Set up light/dark mode variable modes
3. Create effect styles for shadows (solid offset + ambient depth)

**If React/framework:**
1. Import token CSS or create a JS/TS token module
2. Set up theme provider for dark mode switching

### Step 4 — Migrate Systematically

Replace values using the token mapping from `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md`. The mapping applies regardless of output format — only the syntax changes:

**Color mapping (semantic intent → token):**
| Intent | Token | CSS | Figma Variable |
|--------|-------|-----|----------------|
| Primary text | `text-primary` | `var(--text-primary)` | `Semantic/Text/Primary` |
| Page background | `bg-page` | `var(--bg-page)` | `Semantic/Background/Page` |
| Primary accent | `accent-primary` | `var(--accent-primary)` | `Semantic/Accent/Primary` |
| Danger/error | `accent-danger` | `var(--accent-danger)` | `Semantic/Accent/Danger` |

**Spacing mapping (pixel value → token):**
4px→space-1, 6px→space-1-5, 8px→space-2, 12px→space-3, 16px→space-4, 20px→space-5, 24px→space-6, 32px→space-8, 40px→space-10, 48px→space-12, 64px→space-16, 80px→space-20

**Typography mapping:**
- Content: body→step-0, subheadings→step-1/step-2, headings→step-3 through step-5
- Controls: badges→ui-text-2xs (11px), captions→ui-text-xs (12px), inputs→ui-text-md (14px), buttons→ui-text-lg (15px)

**Shadow migration:**
- Replace any blurred shadow with layered solid: hard offset (zero blur) + ambient depth
- `shadow-sm` (2px 2px 0), `shadow-md` (4px 4px 0 + ambient), `shadow-lg` (8px 8px 0 + ambient)

**Interaction pattern migration:**
- Card hover: lift (-4px, -4px) + shadow escalation to `shadow-lg`
- Button hover: lift (-2px) + shadow escalation
- Active/press: sink (2px, 2px) + shadow collapse
- Focus: 2px solid outline with offset
- Disabled: opacity 0.4, no pointer events
- In Figma: express as component variants (Rest, Hover, Active, Focus, Disabled) with prototyping

### Step 5 — Re-audit

Verify the migration using the same method as Step 1:
- **Code:** Re-run the `delightful-auditor` agent
- **Figma:** Review variables are applied, no raw color fills remain
- **Live page:** Re-screenshot in both themes
- **Any format:** Check against the quality gate — zero hardcoded colors, zero arbitrary spacing, all interaction states present

If violations remain, fix and re-audit until clean.

### Step 6 — Visual Verification

Verify the result looks intentional and cohesive:
- **Chrome DevTools MCP:** Navigate to the page, screenshot light and dark mode
- **Figma MCP:** Get a screenshot of the updated design
- **Computer Use:** Take a screenshot of whatever's on screen
- **No visual tools:** Skip — the audit pass is sufficient

## Migration Tips

- **Don't change semantics** — only change styling. Structure stays the same unless needed for dark mode.
- **Work one component/file at a time** — complete migration before moving to the next.
- **Test dark mode as you go** — catch issues early.
- **Preserve existing layouts** — focus on colors, spacing, typography, and interaction patterns.
- **Handle third-party styles carefully** — override with tokens, don't modify vendor code.

## Examples

### Example 1: Code Project Refactor
User says "Refactor this project to use delightful"
→ Audit finds hardcoded colors/spacing, inject tokens, migrate file-by-file, re-audit until clean.

### Example 2: Figma Design Migration
User says "Update my Figma file to use delightful tokens"
→ Read Figma design via MCP, map existing fills/spacing to Delightful variables, create variable collections, rebind all layers.

### Example 3: Live Page + Code
User says "This page looks off, migrate it to delightful" (provides URL)
→ Screenshot via Chrome DevTools, identify violations visually, find the source files, refactor code, re-screenshot to verify.

### Example 4: Screenshot-Based Audit
User says "Does this match the delightful design system?" (provides screenshot)
→ Read the image, compare colors/shadows/spacing against token values, report what's off and what tokens to use.

## Troubleshooting

### Colors still look wrong in dark mode
Cause: Using primitive tokens directly instead of semantic tokens
Fix: Replace `--primitive-*` with `--bg-*`, `--text-*`, `--accent-*` semantic tokens

### Shadows have blur/glow effect
Cause: Non-zero blur radius on the hard offset layer
Fix: Hard offset = zero blur always. Ambient depth layer may have blur.

### Can't read the Figma file
Cause: Figma MCP not connected or no file access
Fix: Ask user to connect Figma MCP, or work from a screenshot/exported CSS instead

### Audit reports too many violations
Cause: Large legacy codebase
Fix: Prioritize Errors first, then Warnings. Use this skill for systematic migration rather than fixing one-by-one.

For the complete token reference, see `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md`.
