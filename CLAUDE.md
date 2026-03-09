# CLAUDE.md — Delightful Design System

Delightful Design System: a design-token-driven CSS component library with optional JS motion.

## Branch Rule

`delightful-refactor` is the active working branch. **Never merge to `main`** — it holds the stable v0.6.5 release.

## Current Status

**Documentation-only.** No source code exists on this branch yet. ~140 markdown spec files define the system to be built. Specs are designed to be fed as prompts to Claude Code agents.

## Directory Structure

| Path | Contents |
|------|----------|
| `Documentation/` | Root of all specs and guides |
| `Documentation/specs/` | Token, component, emitter, motion, foundation specifications |
| `Documentation/phases/` | Phase execution prompts (feed to Claude Code) |
| `Documentation/qa/` | Acceptance and validation checklists |
| `Documentation/reference/` | v0.6.5 HTML demos (read-only visual reference) |
| `Documentation/future/launch/` | Phase 7 (React wrappers, npm publishing) |
| `Documentation/future/roadmap/` | Post-v1.0 advanced components |

## Start Here

- **Execution guide:** [`Documentation/how-to-execute.md`](Documentation/how-to-execute.md)
- **Agent SOP:** [`Documentation/agent-workflow.md`](Documentation/agent-workflow.md)

## Key Conventions

- **OKLCH color space only** — no hex in CSS tokens
- **3-tier token system:** primitive → semantic → component (components never reference primitives)
- **`@layer` order:** reset, primitives, semantic, component, utilities
- **2px borders** — never 1px
- **Zero-blur box-shadows** — used as borders (`4px 4px 0`, not `4px 4px 4px`)
- **Lift/press motion pattern** — hover: `translateY(-2px)`, active: `translate(2px, 2px)`
- **Shadow color:** `var(--border-default)`

## Deep Reference

[`Documentation/architecture.md`](Documentation/architecture.md)
