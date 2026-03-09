# Future Work — Delightful Design System

Planning specifications for work that follows the MVP build. Nothing here is actionable until the MVP (Phases 0-6) is complete.

---

## Launch (Phase 7)

React wrappers, npm packaging, and platform distribution.

| Directory | Contents |
|-----------|----------|
| [`launch/architecture.md`](launch/architecture.md) | Launch architecture and open questions |
| [`launch/prompts/`](launch/prompts/) | Phase 7 execution prompts (packages, React, distribution) |
| [`launch/specs/`](launch/specs/) | Package specs, versioning, build/publish pipeline, Claude plugin |
| [`launch/qa/`](launch/qa/) | Package validation and React API review checklists |

**Prerequisites:** All MVP phases (0-6) complete and passing. Open questions in `launch/architecture.md` must be resolved before execution -- these are decisions that depend on what you learn during the MVP build (bundler choice, React version support, etc.).

---

## Roadmap (Post-v1.0)

Advanced components and the Animation JS system. These are deferred briefs, not executable prompts.

| Directory | Contents |
|-----------|----------|
| [`roadmap/architecture.md`](roadmap/architecture.md) | Roadmap rationale and dependency graph |
| [`roadmap/prompts/`](roadmap/prompts/) | Planning prompts for Batch H and animation system |
| [`roadmap/specs/`](roadmap/specs/) | Briefs: blur-grid, tilt-card, spotlight, magnetic-button, animation system |
| [`roadmap/qa/`](roadmap/qa/) | Design review guide and readiness criteria |

**Prerequisites:** MVP complete and Launch (Phase 7) complete. Batch H components require JavaScript infrastructure that should not be built before the CSS foundation is proven stable.
