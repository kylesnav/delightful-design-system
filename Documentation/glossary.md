---
title: "Glossary"
type: reference
scope: all
status: active
---

# Glossary

Key terms used throughout the Delightful Design System specifications.

---

**Cascade layer** — A CSS mechanism (`@layer`) that controls style priority independent of selector specificity. Delightful declares five layers in strict order: `reset`, `primitives`, `semantic`, `component`, `utilities`. Later layers override earlier layers. See [`specs/integration/cascade-layers.md`](specs/integration/cascade-layers.md).

**Component token** — A Tier 3 token that aliases a semantic token for a specific UI usage. Example: `--btn-primary-bg: var(--accent-primary)`. Components reference these, never primitives. See [`specs/tokens/token-tiers.md`](specs/tokens/token-tiers.md).

**DTCG** — Design Tokens Community Group. The W3C community group developing a standard format for design tokens. The Delightful palette JSON follows DTCG-influenced conventions for structure and naming.

**Emitter** — A pure function that takes validated palette JSON and returns an array of `{ path, content }` file entries. Each emitter targets one platform (CSS, VS Code, Obsidian, Ghostty, iTerm2, Starship, Tailwind). Emitters perform no I/O — the orchestrator handles all file writes. See [`specs/emitters/`](specs/emitters/).

**Lift/press pattern** — The uniform interaction model for all interactive elements. Hover lifts the element (`translateY(-2px)` + shadow escalation), active/click presses it flat (`translate(2px, 2px)` + shadow collapse). Creates a consistent physical metaphor across buttons, cards, tiles, pagination, and more. See [`architecture.md`](architecture.md) section 8.

**Neo-brutalist** — The design aesthetic: solid zero-blur shadows, thick 2px borders, warm cream/amber backgrounds, bold typography, and tactile interactions. Intentionally physical — the opposite of flat, minimal SaaS design.

**OKLCH** — A perceptually uniform color space where equal numeric steps in lightness produce equal perceived differences. Format: `oklch(L C H)` where L = lightness (0-1), C = chroma (vividness), H = hue angle (0-360). Used as the canonical color format for all CSS outputs. Superior to HSL because a pink-400 and a cyan-400 at the same lightness value actually look equally vivid.

**Orchestrator** — The build script (`emitters/orchestrator.mjs`) that validates the palette, runs all 7 emitters in sequence, and writes their output files to disk. The single entry point for `npm run build`. See [`specs/emitters/orchestrator.md`](specs/emitters/orchestrator.md).

**Primitive** — A Tier 1 token: a raw OKLCH color value with no semantic meaning, named by family and intensity (e.g., `--primitive-pink-400`). 44 primitives across 7 color families. Static — they do not change between themes. Nothing references them directly except semantic tokens.

**Reduced-motion gate** — A `@media (prefers-reduced-motion: reduce)` rule in `reset.css` that sets `animation-duration` and `transition-duration` to `0.01ms` on all elements. Ensures users who prefer reduced motion see no animation. JS behaviors additionally check `prefersReduced` before creating animated DOM elements.

**Semantic token** — A Tier 2 token that assigns contextual meaning to a primitive value. Example: `--accent-primary: oklch(0.640 0.270 350)` in light mode, remapped to a different value in dark mode. ~52 semantic tokens, split into light and dark sets. See [`specs/tokens/token-tiers.md`](specs/tokens/token-tiers.md).
