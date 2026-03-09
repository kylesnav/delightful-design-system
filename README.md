# Delightful Design System

A single design language, defined once, propagated to every tool in a developer's workspace.

Delightful is a **neo-brutalist CSS design system** built on OKLCH color science, a strict 3-tier token architecture, and a physical interaction language. The same warm palette — cream and amber in light mode, deep amber-dark in dark mode — appears in your editor, terminal, notes app, shell prompt, and web projects. Change one value in one JSON file and every platform updates.

---

## What It Produces

**For the web:** 43 CSS components, a complete token system (CSS custom properties), a 59-keyframe motion library, and foundation styles. Every component is individually importable. Every value flows from a single source of truth.

**For the terminal and editor:** VS Code themes (editor UI + ANSI colors), iTerm2 color schemes, Ghostty terminal configs, Starship prompt themes.

**For tools:** Obsidian themes (CSS), a Tailwind preset that maps design tokens to utility classes.

**As installable packages** *(post-MVP):* `@delightful/tokens`, `@delightful/css`, `@delightful/tailwind`, `@delightful/react`.

<details>
<summary><strong>All 43 components</strong></summary>

**Form Controls** — Button, Input, Textarea, Select, Multi-Select, Checkbox, Radio, Toggle, Range

**Layout** — Card, Tile, Bento Grid, Sidebar, Sidebar Layout, Divider, Accordion

**Feedback** — Toast, Alert, Modal, Drawer, Progress, Skeleton, Tooltip, Empty State

**Navigation** — Topnav, Tabs, Breadcrumbs, Pagination, Segmented Control, Command Palette, Skip Link, Back to Top, Scroll Progress

**Data Display** — Table, Badge, Avatar, Notification Badge, Code Block, Stepper

**Overlay** — Popover, Dropdown

**Motion** — Staggered Reveal, Page Transitions

</details>

---

## Aesthetic

Neo-brutalist. Solid shadows (never blurred), 2px borders, warm cream/amber backgrounds, and tactile interactions: elements lift on hover (`translateY(-2px)`) and press flat on click (`translate(2px, 2px)`). Intentionally physical — the opposite of flat, generic SaaS design.

---

## Architecture

### Token Model — 3 Tiers, Strictly Enforced

| Tier | Count | What it is | Used by |
|------|-------|------------|---------|
| **Primitives** | 44 | Raw OKLCH color values (`--primitive-pink-400`) | Nothing directly — feeds Tier 2 only |
| **Semantic** | ~52 | What colors *mean* in context (`--accent-primary`, `--bg-page`) | Components, via Tier 3 |
| **Component** | ~80 | Usage aliases (`--btn-primary-bg: var(--accent-primary)`) | CSS components |

Components never reference Tier 1 primitives. This is enforced by the Biome linter. When dark mode switches, only the semantic layer swaps — components respond automatically.

### Build Pipeline — One Command, All Platforms

```
palettes/delightful.json
        ↓
   npm run build
        ↓
src/tokens.css          ← web CSS tokens
ports/vscode/           ← VS Code themes
ports/obsidian/         ← Obsidian theme
ports/ghostty/          ← Ghostty configs
ports/iterm2/           ← iTerm2 color schemes
ports/starship/         ← Starship prompt config
packages/tailwind/dist/ ← Tailwind preset
```

7 emitters are pure functions. The orchestrator handles all file I/O. Validation runs before any emitter — if the palette fails its schema or WCAG contrast checks, nothing is written.

### Color Authority

- **OKLCH** is canonical for CSS/web. Values are written directly — no hex conversion.
- **Hex** is canonical for terminals. Terminal colors are hand-tuned, not derived from OKLCH conversion, because terminal renderers don't interpret OKLCH reliably.

### Component Architecture

Each of 43 components lives in its own CSS file (`src/components/button.css`). All rules are wrapped in `@layer component {}`. No component imports another component. Each is importable in isolation: tokens + foundation + component = works.

---

## Current Status

**Documentation phase. No source code exists yet.**

The full build specification is complete across three packages:

| Package | Phases | Status | Scope |
|---------|--------|--------|-------|
| **MVP** | 0-6 | Ready to execute | Scaffold, color data, emitters, foundation, motion, 43 components, docs |
| **Launch** | 7 | Planning shell | npm packages, platform distribution, Claude Code plugin |
| **Roadmap** | Post-v1.0 | Deferred briefs | Batch H components (blur-grid, tilt-card, spotlight, magnetic-button), Animation JS system |

The documentation is precise enough for AI agents to execute each phase from scratch. The execution order is strict: MVP, then Launch, then Roadmap. Launch specs are intentionally left as planning shells pending decisions that will only be possible after the MVP build.

---

## Where to Start

| Goal | Start here |
|------|-----------|
| Understand the system architecture | [`Documentation/architecture.md`](Documentation/architecture.md) |
| Execute the build | [`Documentation/how-to-execute.md`](Documentation/how-to-execute.md) |
| Navigate all documentation | [`Documentation/README.md`](Documentation/README.md) |
| See what the finished system looks like | [`Documentation/reference/design-reference.html`](Documentation/reference/design-reference.html) |

---

## Repository Structure

```
Documentation/
  README.md                  # Documentation index
  how-to-execute.md          # Operator build guide — start here
  agent-workflow.md          # Agent SOP
  architecture.md            # System architecture
  reference/                 # v0.6.5 HTML demos (read-only visual reference)
    design-reference.html
    animation-reference.html
    color-reference.html
    motion-reference.html
  phases/                    # Phase execution prompts (feed to Claude Code)
    phase-0-scaffold.md
    phase-1-color-data.md
    phase-2-emitters.md
    phase-3-foundation.md
    phase-4-motion.md
    phase-5-components.md
    phase-6-showcase.md
  specs/                     # Token, component, emitter, motion specs
    tokens/
    emitters/
    foundation/
    motion/
    components/
    testing/
    integration/
  qa/                        # Acceptance and validation checklists
    build-validation.md
    component-checklist.md
    accessibility-review.md
    phase-cohesion.md
  future/                    # Post-MVP planning (not yet actionable)
    launch/                  # Phase 7 — React wrappers, npm packaging
    roadmap/                 # Post-v1.0 — advanced components
```

---

## Design Reference

[`Documentation/reference/design-reference.html`](Documentation/reference/design-reference.html) is a snapshot of the previous version of Delightful — an ~8,000-line monolithic HTML file that served as both source of truth and showcase. It is the visual and behavioral reference for every token value, component design, interaction pattern, and animation. The entire build specification was derived from it. **Do not edit it.**
