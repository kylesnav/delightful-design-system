---
title: "Phase 7 Sequence Guide"
date: 2026-03-02
type: prompt
scope: launch
status: shell
---

> **Shell Prompt** -- This sequencing guide will be revised before execution. MVP must be complete before this phase begins.

---

## Phase 7 Execution Order

Phase 7 (Launch) is divided into three sub-phases. Execute them in order. Each sub-phase has its own prompt file with detailed instructions.

### 7a: npm Packages (tokens, tailwind, css)

**Prompt**: `phase-7a-packages.md`

Build the three non-React npm packages in dependency order:

1. **@delightful/tokens** -- Build first. Zero dependencies. All other packages depend on this.
2. **@delightful/tailwind** -- Build after tokens. Copy of Tailwind emitter output.
3. **@delightful/css** -- Build after tokens. Copies/bundles from `src/` into `dist/`.

Then set up Changesets for versioning and the GitHub Actions publish workflow.

**Depends on**: MVP complete (Phases 0--6). Source files in `src/` and emitter outputs must exist.

---

### 7b: React Components

**Prompt**: `phase-7b-react.md`

Build `@delightful/react` with typed component wrappers.

1. Establish the pattern with Button and Card (must-haves).
2. Add remaining must-haves: Badge, Toggle, Input, Select, Textarea, Code Block.
3. Expand to remaining 43 MVP components.

**Depends on**: 7a complete. `@delightful/tokens` and `@delightful/css` must be published or installable from the workspace.

---

### 7c: Claude Plugin + Platform Distribution

**Prompt**: `phase-7c-distribution.md`

Build the Claude Code plugin and prepare all 6 platform distribution repos.

1. Author the Claude plugin skills and agents.
2. Prepare each distribution repo with emitter output + README + screenshots.
3. Submit to each platform's directory/marketplace.

**Depends on**: 7a complete. 7b does not need to be complete -- distribution repos are CSS/token-based, not React-based.

---

## Pre-execution Checklist

Before running ANY Phase 7 prompt, verify:

- [ ] All MVP phases (0--6) are complete and tests pass
- [ ] `npm run build` succeeds and generates all emitter outputs
- [ ] `@delightful` npm scope is available (or alternative scope chosen)
- [ ] Source files exist: `src/tokens.css`, `src/foundation.css`, `src/reset.css`, `src/motion/motion.css`, `src/components/*.css`
- [ ] Emitter outputs exist: `ports/vscode/`, `ports/obsidian/`, `ports/ghostty/`, `ports/iterm2/`, `ports/starship/`
- [ ] Open questions in each sub-phase prompt have been resolved
