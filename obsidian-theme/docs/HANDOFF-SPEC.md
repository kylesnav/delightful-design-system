# Obsidian Theme — Developer Handoff Spec

> **Version:** 0.7.0 (rebuild)
> **Date:** 2026-03-24
> **Source of truth:** `delightful-design-system.html` (tokens + components)
> **Visual target:** `obsidian-theme/docs/obsidian-target.html` (prototype)
> **Old theme reference:** `obsidian-theme/docs/reference/baseline-theme.css`

---

## Overview

Rebuild the Delightful Obsidian theme from scratch. The theme applies a neo-brutalist Delightful design layer over Obsidian's native layout — **we do not change Obsidian's structural layout, only its visual appearance**. Every visual decision maps 1:1 to a design system token or component. No new components invented from scratch.

### Architecture Constraints

- All colors in **OKLCH** — no hex, rgb, or hsl
- Token architecture: **Primitives → Semantic → Component** (components never reference primitives)
- CSS layers: `@layer reset, primitives, semantic, component, utilities`
- Shadows are **solid** (zero blur), borders are **2px solid**
- Border radii: `--radius-sm: 10px`, `--radius-md: 16px`, `--radius-lg: 24px`, `--radius-full: 9999px`
- Modular source files compiled by `build.js` into single `theme.css`

### Global Background Hierarchy

**Critical — applies to all surfaces:**

| Level | Token | Light Value | Usage |
|-------|-------|-------------|-------|
| Chrome/UI | `--bg-page` | `oklch(0.982 0.008 70)` | Ribbon, sidebar, status bar, tab bar |
| Content surfaces | `--bg-surface` | `oklch(0.995 0.004 70)` | Code blocks, cards, inputs, embeds |
| Editor/workspace | `--bg-elevated` | `oklch(1.00 0.00 0)` | Editor area, modal backgrounds, context menus |
| Subtle fills | `--bg-subtle` | `oklch(0.965 0.012 70)` | Blockquotes, table headers, hover states |
| Muted fills | `--bg-muted` | `oklch(0.948 0.014 70)` | Disabled states, secondary fills |

---

## Surface Specs

### 1. Ribbon

**Decision:** ✅ Use refactored version — approved as-is.

**Obsidian selectors:** `.workspace-ribbon.mod-left`, `.side-dock-ribbon-action`, `.workspace-ribbon-collapse-btn`

| Property | Token | Value |
|----------|-------|-------|
| Background | `--bg-page` | Warm tan |
| Width | — | 44px |
| Border right | `--border-subtle` | 2px solid |
| Icon button size | — | 32×32px |
| Icon button radius | `--radius-sm` | 10px |
| Icon color | `--text-secondary` | — |
| Icon hover bg | `--accent-primary-subtle` | Light pink tint |
| Icon hover color | `--accent-primary` | Pink |
| Icon hover transform | — | `translateY(-2px)` |
| Transition | `--motion-fast` / `--ease-bounce` | 160ms |
| Settings icon | `--text-muted` | Bottom, flex spacer pushes down |

**Motion:** Hover lifts icon 2px with bounce easing. No active/press-down state.

---

### 2. Tabs

**Decision:** ❌ Use **old theme's** tab styling (from actual Obsidian, not the prototype mock). Reference `baseline-theme.css`.

**Obsidian selectors:** `.workspace-tab-header-container`, `.workspace-tab-header`, `.workspace-tab-header.is-active`

**Implementation note:** Extract tab styles from `baseline-theme.css` and adapt to use DS tokens where possible. The old tabs had a cleaner, more subtle feel than the refactored version. Preserve the old layout and visual weight; only update colors to DS semantic tokens.

| Property | Token | Notes |
|----------|-------|-------|
| Tab bar bg | `--bg-page` | Match ribbon |
| Active tab bg | `--bg-elevated` | White, sits "above" the bar |
| Active tab text | `--text-primary` | Bold weight |
| Inactive tab text | `--text-muted` | Normal weight |
| Close button | — | Subtle, appears on hover |
| Tab bar border-bottom | `--border-subtle` | 2px solid |
| Active tab bottom border | `--bg-elevated` | Overlaps bar border to "connect" to content |

---

### 3. File Explorer

**Decision:** ✅ Refactored version with modifications.

**Obsidian selectors:** `.nav-files-container`, `.nav-folder-title`, `.nav-file-title`, `.nav-file-title.is-active`, `.tree-item-self`

| Property | Token | Value |
|----------|-------|-------|
| Background | `--bg-page` | **Must match ribbon** |
| Action buttons | — | 24×24px, `--text-muted`, hover: `--text-primary` |
| Folder title weight | — | 600 |
| File font size | `--ui-text-sm` | 13px |
| File color | `--text-secondary` | — |
| File hover bg | `--bg-subtle` | — |
| File `.ext` tag | `--ui-text-2xs` | `--text-muted` |

**Active file — CRITICAL CHANGE:**

The default Obsidian active file has a left-side accent border. **Remove this entirely.** Replace with:

| Property | Token | Value |
|----------|-------|-------|
| Background | `--accent-primary-subtle` | Light pink fill |
| Border-radius | `--radius-full` | **Fully rounded pill** on BOTH sides |
| Color | `--accent-primary-text` | Pink text |
| Font weight | — | 600 |
| Left border | — | **NONE** — no accent bar |

**Hover state:** Subtle `--bg-subtle` fill with `--radius-full` rounding. Gentle, no lift or shadow.

---

### 4. Status Bar

**Decision:** ❌ Use **old theme's** status bar. Reference `baseline-theme.css`.

**Obsidian selectors:** `.status-bar`, `.status-bar-item`

**Implementation note:** Extract status bar styles from `baseline-theme.css`. The old version had better visual treatment. Update colors to DS tokens.

| Property | Token | Notes |
|----------|-------|-------|
| Background | `--bg-page` | Match ribbon/sidebar |
| Border top | `--border-subtle` | 2px solid |
| Text size | `--ui-text-xs` | 12px |
| Text color | `--text-muted` | — |
| Item gap | `--space-4` | 16px |

---

### 5. Reading View

**Decision:** ✅ Use refactored/prototype version.

**Obsidian selectors:** `.markdown-preview-view`, `.markdown-preview-sizer`, `.markdown-rendered`

| Property | Token | Value |
|----------|-------|-------|
| Background | `--bg-elevated` | Pure white |
| Max width | — | 900px centered |
| Padding | `--space-8` / `--space-6` | 32px top/bottom, 24px sides |

**Typography:**

| Element | Size | Weight | Tracking | Bottom margin |
|---------|------|--------|----------|---------------|
| h1 | 2.2rem | 800 | `--tracking-tighter` | `--space-4` |
| h2 | 1.6rem | 700 | `--tracking-tight` | `--space-3` |
| h3 | 1.25rem | 700 | `--tracking-tight` | `--space-3` |
| Body | inherit | 400 | — | `--space-4` |
| Line height | `--leading-normal` | — | — | 1.55 |

**Inline elements:**

| Element | Selector | Styles |
|---------|----------|--------|
| Bold | `strong` | weight 700 |
| Italic | `em` | italic |
| Inline code | `code:not(pre code)` | bg `--bg-subtle`, border 2px `--border-subtle`, radius 6px, font `--font-mono` 0.85em, color `--accent-primary-text` |
| Internal link | `a.internal-link` | color `--accent-primary`, weight 550, bottom border 2px `--accent-primary-subtle`, hover: solid border |
| External link | `a.external-link` | color `--accent-cyan`, bottom border 2px `--accent-cyan-subtle`, hover: solid border |
| Highlight/mark | `mark` | bg `--accent-gold-subtle`, padding 0.1em 0.2em, radius 4px |
| List markers | `li::marker` | color `--accent-primary` |

**Blockquote:**

| Property | Token |
|----------|-------|
| Border left | 4px solid `--accent-primary` |
| Background | `--bg-subtle` |
| Padding | `--space-3` / `--space-5` |
| Radius | 0 `--radius-sm` `--radius-sm` 0 |
| Color | `--text-secondary` |
| Font style | italic |

**Horizontal rule:** `border-top: 2px solid var(--border-subtle)`, margin `--space-6`

**Task list checkboxes:** Use DS checkbox component (see Form Controls section).

**Frontmatter:**

| Property | Token | Notes |
|----------|-------|-------|
| Container | Card pattern | `--bg-surface`, border 2px `--border-subtle`, radius `--radius-md` |
| Layout | — | Flex row, label + badge pills |
| Label | `--ui-text-xs` | "TAGS" — uppercase, tracking 0.05em, `--text-muted` |
| Tags | Badge component | `badge badge-pink` / `badge-cyan` pills |

---

### 6. Source / Live Preview

**Decision:** Derive from Reading View. Same aesthetic, adapted for CodeMirror editable context.

**Obsidian selectors:** `.cm-editor`, `.cm-content`, `.cm-line`, `.cm-scroller`

**Approach:** Walk backwards from reading view. Match typography, colors, and spacing. CodeMirror-specific adaptations:

- Cursor color: `--accent-primary`
- Selection bg: `--accent-primary-subtle`
- Active line: subtle `--bg-subtle` highlight
- Line numbers: `--text-muted`, font `--font-mono`
- Markdown formatting tokens (##, **, etc.): `--text-muted` with reduced opacity

---

### 7. Callouts

**Decision:** ✅ Use DS alert banners 1:1.

**Obsidian selectors:** `.callout`, `.callout-title`, `.callout-icon`, `.callout-content`, `.callout-fold`

**Mapping Obsidian callout types → DS alert variants:**

| Obsidian type | DS class | Border/Shadow | Background | Text color |
|---------------|----------|---------------|------------|------------|
| `[!note]`, `[!info]` | `alert-pink` | `--accent-primary` / `--shadow-pink` | `--accent-primary-subtle` | `--accent-primary` |
| `[!tip]`, `[!success]` | `alert-green` | `--accent-green` / `--shadow-green` | `--accent-green-subtle` | `--accent-green` |
| `[!warning]`, `[!caution]` | `alert-gold` | `--accent-gold` / `--shadow-gold` | `--accent-gold-subtle` | `--accent-gold-text` |
| `[!abstract]`, `[!summary]` | `alert-cyan` | `--accent-cyan` / `--shadow-cyan` | `--accent-cyan-subtle` | `--accent-cyan` |
| `[!danger]`, `[!bug]`, `[!failure]` | `alert-danger` | `--accent-danger` / `--shadow-danger` | `--accent-danger-subtle` | `--accent-danger` |
| `[!question]`, `[!example]` | `alert-purple` | `--accent-purple` / `--shadow-purple` | `--accent-purple-subtle` | `--accent-purple` |
| `[!quote]` | — | `--border-default` / `--shadow-sm` | `--bg-subtle` | `--text-secondary` |

**Callout structure:**

| Property | Token | Value |
|----------|-------|-------|
| Layout | — | flex, align-items: flex-start, gap `--space-3` |
| Padding | `--space-4` | 16px |
| Border | — | 2px solid (accent color) |
| Radius | `--radius-md` | 16px |
| Shadow | — | Colored solid shadow (accent) |
| Font size | `--ui-text-md` | 14px |
| Title weight | — | 700 |
| Icon | — | SVG, flex-shrink: 0, margin-top: 1px |

**Motion:** Reference DS motion tokens for fold/collapse animation.

---

### 8. Code Blocks

**Decision:** ✅ Refactored structure with old theme's syntax colors.

**Obsidian selectors:** `pre`, `code`, `.cm-s-obsidian .cm-*` tokens, `.HyperMD-codeblock`

| Property | Token | Value |
|----------|-------|-------|
| Background | `--bg-surface` | **NOT bg-page** — lighter shade |
| Border | `--border-default` | 2px solid |
| Radius | `--radius-md` | 16px |
| Shadow | `--shadow-sm` | 2px 2px 0 |
| Font family | `--font-mono` | JetBrains Mono |
| Font size | — | 0.8125rem (13px) |
| Line height | — | 1.6 |
| Padding | `--space-4` | 16px |
| Overflow | — | overflow-x: auto |

**Language tag header:**

| Property | Token |
|----------|-------|
| Background | `--bg-subtle` |
| Border bottom | `--border-subtle` |
| Font size | `--ui-text-2xs` |
| Weight | 600, uppercase |
| Letter spacing | 0.04em |
| Color | `--text-muted` |

**Syntax highlighting — use DS accent colors:**

| Token type | Color token | Description |
|------------|-------------|-------------|
| Keywords (`function`, `const`, `return`) | `--accent-primary` | Pink, weight 600 |
| Strings | `--accent-gold-text` | Gold |
| Functions | `--accent-cyan` | Cyan |
| Comments | `--accent-green` | Green, italic |
| Types | `--accent-purple` | Purple |
| Operators | `--text-secondary` | Muted |
| Numbers | `--accent-danger` | Red |

---

### 9. Tables

**Decision:** ❌ Neither old nor refactored. Build from DS `data-table` patterns.

**Obsidian selectors:** `table`, `thead`, `th`, `td`, `tr`

| Property | Token | Value |
|----------|-------|-------|
| Border collapse | — | collapse |
| Font size | `--ui-text-sm` | 13px |
| Wrapper border | `--border-subtle` | 2px solid |
| Wrapper radius | `--radius-lg` | 24px |
| Wrapper overflow | — | hidden |

**Header (th):**

| Property | Token |
|----------|-------|
| Background | `--bg-subtle` |
| Color | `--text-muted` |
| Font size | `--ui-text-2xs` |
| Weight | 600, uppercase |
| Letter spacing | 0.04em |
| Padding | `--space-3` / `--space-4` |
| Border bottom | 2px solid `--border-default` |

**Cells (td):**

| Property | Token |
|----------|-------|
| Padding | `--space-3` / `--space-4` |
| Color | `--text-secondary` |
| Border bottom | 1px solid `--border-subtle` |

**Row hover:** `background: var(--bg-subtle)` — transition `--motion-fast` / `--ease-out`

---

### 10. Embeds

**Decision:** ✅ Use DS card component pattern.

**Obsidian selectors:** `.internal-embed`, `.markdown-embed`, `.file-embed`

| Property | Token | Value |
|----------|-------|-------|
| Background | `--bg-surface` | — |
| Border | `--border-default` | 2px solid |
| Border left | `--accent-primary` | 4px solid accent left border |
| Radius | `--radius-md` | 16px |
| Padding | `--space-5` | 20px |
| Shadow | `--shadow-sm` | 2px 2px 0 |
| Title size | `--ui-text-lg` | Weight 620, tracking `--tracking-tight` |
| Desc color | `--text-secondary` | Size `--ui-text-sm` |

---

### 11. Tags / Badges

**Decision:** ✅ Use DS badge component exactly.

**Obsidian selectors:** `.tag`, `a.tag`, `.cm-hashtag`

| Property | Token | Value |
|----------|-------|-------|
| Display | — | inline-flex |
| Padding | — | 2px 10px |
| Font size | `--ui-text-2xs` | 11px |
| Weight | — | 600 |
| Radius | `--radius-full` | Pill shape |
| Default bg | `--accent-primary-subtle` | Pink tint |
| Default color | `--accent-primary` | Pink |
| Hover | — | `transform: scale(1.05)` |
| Transition | `--motion-fast` / `--ease-bounce` | 160ms |

**Variants:** `badge-pink`, `badge-red`, `badge-gold`, `badge-cyan`, `badge-green`, `badge-purple` — each uses `accent-{color}-subtle` bg and `accent-{color}` text.

---

### 12. Command Palette

**Decision:** ✅ DS command palette foundation + refactored hover state. Fix hotkey pill.

**Obsidian selectors:** `.prompt`, `.prompt-input`, `.suggestion-container`, `.suggestion-item`, `.suggestion-hotkey`

| Property | Token | Value |
|----------|-------|-------|
| Container bg | `--bg-elevated` | White |
| Container border | `--border-default` | 2px solid |
| Container radius | `--radius-lg` | 24px |
| Container shadow | `--shadow-lg` | 8px 8px 0 |
| Input padding | `--space-4` / `--space-6` | 16px 24px |
| Input font | — | 1rem, `--font-sans` |
| Input border bottom | `--border-subtle` | 2px solid |
| Item padding | `--space-2` / `--space-6` | 8px 24px |
| Item font size | `--ui-text-md` | 14px |
| Item color | `--text-secondary` | — |
| Item hover bg | `--bg-subtle` | — |
| Active item bg | `--accent-primary-subtle` | Pink tint |
| Active item border-left | `--accent-primary` | 3px solid |
| Section dots | — | 6px circles, accent colors |

**Hotkey pill — FIXED:**

| Property | Token | Value |
|----------|-------|-------|
| Background | `--bg-subtle` | **Light**, not dark |
| Border | `--border-subtle` | 1px solid |
| Radius | — | 6px |
| Font | `--font-mono` | `--ui-text-xs` |
| Color | `--text-muted` | **Muted**, not contrasty |

---

### 13. Buttons

**Decision:** ✅ DS buttons are the only source of truth. 8 variants, 3 sizes.

**Obsidian selectors:** `button`, `.mod-cta`, `.mod-warning`, `.clickable-icon`

**Base `.btn`:**

| Property | Token |
|----------|-------|
| Display | inline-flex, center aligned |
| Gap | 6px |
| Font | `--font-sans`, weight 550 |
| Border | 2px solid transparent |
| Radius | `--radius-sm` |
| Shadow | `--shadow-sm` |
| Cursor | pointer |
| Transition | transform `--motion-fast` / `--ease-bounce`, shadow `--motion-fast` / `--ease-out` |

**Sizes:**

| Size | Height | Padding | Font size |
|------|--------|---------|-----------|
| `btn-sm` | `--control-sm` (32px) | 0 `--space-3` | `--ui-text-sm` |
| `btn-md` | `--control-md` (36px) | 0 `--space-4` | `--ui-text-md` |
| `btn-lg` | `--control-lg` (44px) | 0 `--space-6` | `--ui-text-lg` |

**Variants:**

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| `btn-primary` | `--accent-primary` | `--text-on-accent` | transparent |
| `btn-danger` | `--accent-danger` | `--text-on-accent` | transparent |
| `btn-gold` | `--accent-gold` | `--text-on-gold` | transparent |
| `btn-cyan` | `--accent-cyan` | `--text-on-accent` | transparent |
| `btn-green` | `--accent-green` | `--text-on-accent` | transparent |
| `btn-purple` | `--accent-purple` | `--text-on-accent` | transparent |
| `btn-secondary` | `--bg-surface` | `--text-primary` | `--border-default` |
| `btn-ghost` | transparent | `--text-primary` | transparent (no shadow) |

**States:**

| State | Transform | Shadow | Notes |
|-------|-----------|--------|-------|
| Hover | `translateY(-2px)` | `--shadow-md` | Lift up |
| Active | `translate(2px, 2px)` | none | Press into shadow |
| Focus | — | `inset 0 0 0 3px var(--focus-ring)` | Pink focus ring |
| Disabled | — | — | opacity 0.5, cursor not-allowed |

**Obsidian mapping:**
- `.mod-cta` → `btn-primary`
- `.mod-warning` → `btn-danger`
- Default buttons → `btn-secondary`

---

### 14. Form Controls

**Decision:** ✅ DS components section is the complete source of truth.

#### Text Input

**Obsidian selectors:** `input[type="text"]`, `input[type="search"]`, `.search-input`

| Property | Token | Value |
|----------|-------|-------|
| Height | `--control-md` | 36px |
| Padding | `--space-3` | 0 12px |
| Font | `--font-sans` | `--ui-text-md` (14px) |
| Color | `--text-primary` | — |
| Background | `--bg-surface` | — |
| Border | `--border-default` | 2px solid |
| Radius | `--radius-sm` | 10px |
| Shadow | `--shadow-sm` | 2px 2px 0 |
| Placeholder | `--text-muted` | — |
| Focus border | `--accent-primary` | — |
| Focus shadow | — | `4px 4px 0 var(--accent-primary)` |
| Error border | `--accent-danger` | — |
| Error shadow | — | `4px 4px 0 var(--accent-danger)` |
| Disabled | — | opacity 0.5, bg `--bg-subtle`, cursor not-allowed |

#### Select

**Obsidian selectors:** `select`, `.dropdown`

Same as input + custom chevron SVG background, appearance: none, padding-right: 32px.

#### Textarea

Same as input but min-height: 80px, padding `--space-3`, resize: vertical.

#### Toggle

**Obsidian selectors:** `.checkbox-container`, `.checkbox-container.is-enabled`

| Property | Token | Value |
|----------|-------|-------|
| Width | — | 40px |
| Height | — | 22px |
| Radius | `--radius-full` | Pill |
| Off bg | `--primitive-neutral-300` | — |
| On bg | `--accent-green` | **Green**, not pink |
| Knob size | — | 16×16px |
| Knob position (off) | — | top 3px, left 3px |
| Knob position (on) | — | `translateX(18px)` |
| Knob bg | `--primitive-neutral-0` | White |
| Knob shadow | — | `0 1px 3px oklch(0 0 0 / 0.15)` |
| Transition | `--motion-fast` / `--ease-bounce` | 160ms |

#### Checkbox

**Obsidian selectors:** `input[type="checkbox"]`, `.task-list-item-checkbox`

| Property | Token | Value |
|----------|-------|-------|
| Size | — | 18×18px |
| Border | `--border-strong` | 2px solid |
| Radius | — | 4px |
| Background | `--bg-surface` | — |
| Checked bg | `--accent-primary` | Pink |
| Checked border | `--accent-primary` | — |
| Checked icon | — | White SVG checkmark |
| Transition | `--motion-fast` / `--ease-out` | 160ms |

#### Radio

Same as checkbox but border-radius: 50%, checked shows 8px pink dot inside.

#### Range/Slider

**Obsidian selectors:** `input[type="range"]`

Track and thumb styled per DS slider component.

---

### 15. Settings Modal

**Decision:** ✅ Refactored layout with DS components for controls.

**Obsidian selectors:** `.modal`, `.vertical-tab-header`, `.vertical-tab-content`, `.setting-item`

| Property | Token | Value |
|----------|-------|-------|
| Layout | — | Flex: sidebar (180px) + content |
| Sidebar bg | `--bg-page` | Match ribbon |
| Sidebar border right | `--border-subtle` | 2px solid |
| Content bg | `--bg-elevated` | White |
| Content padding | `--space-6` | 24px |
| Nav item size | `--ui-text-sm` | 13px |
| Nav item radius | `--radius-sm` | 10px |
| Active nav | `--accent-primary-subtle` | Pink tint bg, pink text |
| Heading size | — | 1.3rem, weight 800, tracking `--tracking-tighter` |

**Setting items:**

| Property | Token |
|----------|-------|
| Layout | flex, space-between, center aligned |
| Padding | `--space-4` top/bottom |
| Border bottom | 1px solid `--border-subtle` |
| Name font | `--ui-text-md`, weight 550 |
| Desc font | `--ui-text-sm`, color `--text-secondary` |

**Accent color picker:**

| Property | Token | Value |
|----------|-------|-------|
| Layout | flex row, gap `--space-2` |
| Swatch size | — | 28×28px |
| Swatch radius | `--radius-sm` | 10px |
| Swatch border | — | 2px solid transparent |
| Hover | — | `scale(1.15)` |
| Active | `--text-primary` | Border visible, scale 1.15 |
| Colors | — | PI/RE/GO/CY/GR/PU using accent tokens |

**Active/click state — CRITICAL:** No weird press effect. Use DS motion: gentle spring, subtle lift. `--ease-bounce` with `translateY(-2px)`.

---

### 16. Context Menu

**Decision:** ✅ Refactored version is perfect. Ship as-is.

**Obsidian selectors:** `.menu`, `.menu-item`, `.menu-separator`

| Property | Token | Value |
|----------|-------|-------|
| Width | — | 220px |
| Background | `--bg-elevated` | White |
| Border | `--border-default` | 2px solid |
| Radius | `--radius-md` | 16px |
| Shadow | `--shadow-md` | 4px 4px 0 |
| Padding | `--space-1` | 4px top/bottom |
| Item padding | `--space-2` / `--space-4` | 8px 16px |
| Item font | `--ui-text-sm` | 13px |
| Item color | `--text-primary` | — |
| Item hover bg | `--bg-subtle` | — |
| Item icon color | `--text-muted` | 14px |
| Separator | `--border-subtle` | 1px, margin `--space-1` |
| Transition | `--motion-fast` / `--ease-out` | 160ms |

---

### 17. Notices

**Decision:** ✅ Use DS alert banners exactly.

**Obsidian selectors:** `.notice`, `.notice-content`

Same component spec as Callouts (Section 7) — 6 color variants, SVG icons, dismiss button. Applied to Obsidian's notice container positioning (fixed, bottom-right typically).

---

### 18. Canvas

**Decision:** ❌ Rebuild from scratch using DS first principles.

**Obsidian selectors:** `.canvas`, `.canvas-node`, `.canvas-node-container`, `.canvas-edge`

| Element | DS Pattern | Notes |
|---------|------------|-------|
| Node container | Card component | `--bg-surface`, 2px border, `--radius-md`, `--shadow-md` |
| Node title | `.card-title` | Weight 700, tracking `--tracking-tight` |
| Node content | `.card-desc` | `--text-secondary` |
| Node colors | 6 accent families | Map canvas color options to pink/red/gold/cyan/green/purple |
| Node hover | Card interactive | `translateY(-3px)`, `--shadow-lg` |
| Edge lines | `--border-subtle` | — |
| Canvas bg | `--bg-page` | — |

---

### 19. Graph View

**Decision:** ❌ Rebuild from scratch. DS hero canvas aesthetic + DS settings composition for controls.

**Obsidian selectors:** `.graph-view`, `.graph-controls`, `.graph-control-section`

| Element | DS Pattern | Notes |
|---------|------------|-------|
| Graph bg | `--bg-page` | — |
| Node colors | 6 accent families | Different node types get different accent colors |
| Edge color | `--border-subtle` | — |
| Active node | `--accent-primary` | Glow/emphasis |
| Controls panel | DS Settings composition | Cards with toggles, clean layout |
| Control labels | `--ui-text-sm` | — |
| Control toggles | DS toggle component | Green on-state |

---

## Motion & Interaction Reference

**All surfaces must reference DS motion tokens:**

| Token | Value | Usage |
|-------|-------|-------|
| `--motion-instant` | 100ms | Transform, shadow changes |
| `--motion-fast` | 160ms | Hover states, toggles, color transitions |
| `--motion-base` | 240ms | Modal entry/exit, panel transitions |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | General smooth transitions |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Hover lifts, playful interactions |
| `--ease-smooth` | `cubic-bezier(0.22, 1, 0.36, 1)` | Modal/overlay transitions |

**Interactive patterns:**

| Pattern | Transform | Shadow | Easing |
|---------|-----------|--------|--------|
| Hover lift | `translateY(-2px)` | `--shadow-md` | `--ease-bounce` |
| Press down | `translate(2px, 2px)` | none | `--ease-out` |
| Badge pop | `scale(1.05)` | — | `--ease-bounce` |
| Toggle knob | `translateX(18px)` | — | `--ease-bounce` |
| Card lift | `translateY(-3px)` | `--shadow-lg` | `--ease-bounce` |

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` — all animations/transitions → 0.01ms.

---

## Dark Mode

All surfaces automatically switch via `[data-theme="dark"]` / `.theme-dark` token overrides. Obsidian uses `.theme-dark` on `body`. Map all dark semantic tokens. Key differences:

- Backgrounds invert: dark warm tones (`oklch(0.14–0.21 0.01–0.015 65)`)
- Text lightens: primary → `oklch(0.935)`, secondary → `oklch(0.69)`
- Accent colors brighten slightly for contrast
- Shadows invert to cream/light (`oklch(0.92 0.010 65)`) for 3D depth on dark

---

## Community Plugin Compatibility

Maintain dedicated CSS files in `src/plugins/` for each supported plugin. These override plugin-specific selectors using the same token architecture. Existing plugin list from old build: advanced-tables, buttons, calendar, charts, commander, database-folder, dataview, day-planner, excalidraw, full-calendar, hover-editor, kanban, make-md, omnisearch, outliner, projects, sliding-panes, tag-wrangler, tasks, templater.

Each plugin file follows the same pattern: import no tokens (they cascade from core), override only plugin-specific selectors, use semantic tokens only.

---

## File Structure (Target)

```
obsidian-theme/
  src/
    00-tokens.css           ← Primitives + semantic (synced from DS)
    01-obsidian-vars.css    ← Map DS tokens → Obsidian CSS vars
    02-typography.css       ← Headings, body, mono, tracking
    03-workspace.css        ← Ribbon, tabs, explorer, status bar
    04-editor.css           ← Reading view, source view, embeds, tables
    05-components.css       ← Modals, buttons, forms, toggles, palettes
    06-callouts.css         ← Callout type → DS alert mapping
    07-animations.css       ← Motion system from DS
    08-style-settings.css   ← Style Settings plugin integration
    09-canvas.css           ← Canvas nodes and edges
    10-graph.css            ← Graph view styling
    11-mobile.css           ← Mobile responsive adjustments
    plugins/
      *.css                 ← Per-plugin overrides
  build.js
  theme.css                 ← Compiled output
  manifest.json
  docs/
    obsidian-target.html    ← Visual prototype
    reference/
      baseline-theme.css    ← Old theme reference
      DESIGN_SPEC.md        ← Architecture spec
    HANDOFF-SPEC.md         ← THIS FILE
```
