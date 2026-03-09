# Documentation — Delightful Design System

This directory contains the complete build specification for the Delightful Design System. Everything here is designed to be fed as prompts to Claude Code agents that will build the system from scratch. No source code exists yet -- only specs.

---

## How It's Organized

| Directory | Contents |
|-----------|----------|
| `specs/` | Component, token, emitter, foundation, motion, testing, and integration specifications. The source of truth for what gets built. |
| `phases/` | Phase execution prompts (Phases 0-6). Each prompt is self-contained and designed to be fed to a fresh Claude Code session. |
| `qa/` | Acceptance checklists and validation guides. Run these after each phase to verify correctness. |
| `reference/` | v0.6.5 HTML demos -- read-only visual and behavioral reference. Do not edit these files. |
| `future/` | Launch (Phase 7) and Roadmap (post-v1.0) planning. Not yet actionable -- depends on MVP completion. |

Top-level files:

| File | Purpose |
|------|---------|
| [`architecture.md`](architecture.md) | System architecture -- token model, build pipeline, component structure |
| [`how-to-execute.md`](how-to-execute.md) | Operator build guide -- prerequisites, phase-by-phase instructions, critical rules |
| [`agent-workflow.md`](agent-workflow.md) | Agent SOP -- the sequence every agent follows on every ticket |

---

## Execution Order

1. Read [`architecture.md`](architecture.md) to understand the system design
2. Follow [`how-to-execute.md`](how-to-execute.md) to set up and run the build
3. Execute phases in order: `phases/phase-0-scaffold.md` through `phases/phase-6-showcase.md`
4. After each phase, validate with the relevant checklist in `qa/`

Phases must run in strict order. Phase 4 (Motion) and Phase 5 (Components) can run in parallel after Phase 3 completes, but both must finish before Phase 6.

---

## Navigation

| Goal | Go to |
|------|-------|
| Understand the architecture | [`architecture.md`](architecture.md) |
| Start executing the build | [`how-to-execute.md`](how-to-execute.md) |
| Agent operating procedure | [`agent-workflow.md`](agent-workflow.md) |
| Find a component spec | [`specs/components/`](specs/components/) |
| Find a token spec | [`specs/tokens/`](specs/tokens/) |
| Find an emitter spec | [`specs/emitters/`](specs/emitters/) |
| Validate a completed phase | [`qa/`](qa/) |
| Visual reference (v0.6.5) | [`reference/design-reference.html`](reference/design-reference.html) |
| Key terms and definitions | [`glossary.md`](glossary.md) |
| Post-MVP planning | [`future/`](future/) |
