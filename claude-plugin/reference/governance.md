# Delightful Design System — Token Governance

How to safely extend the token system, add new colors, and manage versions.

---

## Adding a New Primitive Color

1. Choose an OKLCH hue angle that doesn't conflict with existing families (70, 350, 20, 85, 210, 148, 300)
2. Create 5 stops (100-500) following the existing lightness/chroma pattern:
   - 100: L ~0.93, C ~0.04-0.06 (very light tint)
   - 200: L ~0.85, C ~0.08-0.14 (light)
   - 300: L ~0.72, C ~0.12-0.22 (medium)
   - 400: L ~0.64, C ~0.17-0.27 (strong — typically the base accent)
   - 500: L ~0.56, C ~0.16-0.28 (deep)
3. Add to the `@layer primitives` block in `delightful-design-system.html`
4. Run `npm run sync` to propagate to CSS tokens
5. Manually update: Tailwind preset, Figma tokens, reference docs

## Adding a New Semantic Token

1. Define both light and dark values in `delightful-design-system.html`
2. Light mode goes in `:root` / `[data-theme="light"]` block
3. Dark mode goes in `[data-theme="dark"]` block
4. Reference only primitives via `var(--primitive-*)` or other semantic tokens — never hardcode oklch values
5. Run `npm run sync`

## Adding a New Component Token

1. Add to the `@layer component :root` block in `delightful-design-system.html`
2. Use `var()` references to semantic tokens where possible (e.g., `--btn-new-bg: var(--accent-cyan)`)
3. Run `npm run sync`

## The Propagation Chain

**Source of truth:** `delightful-design-system.html`

**Automated** (`npm run sync`):
- `claude-plugin/themes/css/delightful-tokens.css`
- `obsidian-theme/theme.css`
- `delightful-motion.html`, `delightful-animation.html`, `delightful-color.html`

**Manual** (update yourself when tokens change):
- `claude-plugin/themes/tailwind/delightful-preset.js`
- `claude-plugin/themes/figma/tokens.json`
- `claude-plugin/reference/tokens.md`
- `vscode-theme/themes/*.json` — regenerate via `cd vscode-theme/scripts && node generate-themes.mjs`
- Agent and skill markdown files (if rules changed)

## Version Bumping

Run `npm run bump <version>` (e.g., `npm run bump 0.8.0`). This updates:
- `package.json`
- `vscode-theme/package.json`
- `claude-plugin/plugin.json`
- `claude-plugin/marketplace.json`
- `obsidian-theme/manifest.json`
- Skill frontmatter (build-with-delightful, refactor-with-delightful)

It also creates a git tag (`v0.8.0`). Commit changes and push with `--tags`.

## Known Limitations

**Figma component tokens are pinned to light mode.** The DTCG token format has no "current mode" reference — `component.button.primary-bg` wires to `{semantic.light.accent.primary}`, not a mode-agnostic path. Figma consumers must override component tokens per-mode or build their own from the semantic layer. This is a format limitation, not a bug.

## What NOT to Do

- Add hex, rgb, or hsl colors anywhere — always oklch
- Skip tiers — components must reference semantic tokens, not primitives directly
- Use blurred shadows — the hard offset layer always has zero blur
- Hardcode spacing or font-size values — use `var(--space-*)` and `var(--step-*)`/`var(--ui-text-*)`
- Add animations without `prefers-reduced-motion` guards
- Resolve `var()` references to literal values in exports — preserve the semantic chain

## Sync Verification

When publishing, diff these paths to verify distribution repos match:
- `claude-plugin/` <-> `../delightful-claude-plugin/`
- `obsidian-theme/` <-> `../obsidian-delightful/`
- `ghostty/` <-> `../delightful-ghostty/`
- `iterm2/` <-> `../delightful-iterm2/`
- `shell/` <-> `../delightful-shell/`
- `starship/` <-> `../delightful-starship/`
- `vscode-theme/` <-> `../delightful-vscode/` (excluding marketplace-specific files)

Copy from this repo to distribution. Commit both.
