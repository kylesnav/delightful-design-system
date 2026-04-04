# Delightful Design System — Philosophy

Design rationale and the "why" behind every decision. Read this to understand the intent, not just the implementation.

---

## Why Neo-Brutalism

Confident, tactile, anti-generic. The system uses solid shadows (printmaking heritage), bold 2px borders, and high-contrast type to create something that feels physical and intentional rather than another blurry-shadow SaaS template.

Neo-brutalism says: "This interface was designed on purpose." Every element has a visible edge. Every surface has a clear position in the stack. Nothing fades into ambiguity. The result is an aesthetic that feels crafted -- like a zine or a letterpress print -- instead of generated.

---

## Why OKLCH

OKLCH is a perceptually uniform color space. Equal lightness steps look equal to the human eye, which solves problems that hex/rgb/hsl cannot:

- **Consistent dark mode.** Shift L values and the palette stays balanced. In HSL, "50% lightness" means wildly different things across hues.
- **Predictable contrast.** Two colors at the same L value have the same perceived brightness, making WCAG math reliable.
- **Future-proof.** OKLCH is CSS Color Level 4. It is the direction the web platform is moving.
- **Gamut mapping.** The `clampChroma` function (via culori) keeps colors vivid without clipping on narrow-gamut displays. Colors degrade gracefully rather than breaking.

---

## Why Warm Neutrals at Hue 60-70

Warm cream backgrounds feel inviting and human. Pure white is clinical. Pure gray is cold. The hue-70 neutrals give every surface a subtle warmth that makes the bold accents feel at home.

This is not a cosmetic preference -- it is a readability decision. Warm paper tones reduce eye strain and create a softer contrast ratio with dark text than stark white does, while still maintaining WCAG AA compliance.

---

## Why Hue 65 for Dark Mode

Standard dark modes use gray or pure black, which feels dead and cave-like. Delightful's dark mode uses hue 65 (warm amber) tinted darkness that feels warm and intentional.

The amber undertone means dark surfaces still feel like "paper" rather than "void." Accent colors pop against it without the jarring contrast that pure black creates. It is dark mode that you want to stay in, not dark mode that you tolerate.

---

## Why These Specific Hue Angles

Every hue was chosen for character, not convenience:

| Family | Hue | Rationale |
|---|---|---|
| Pink | 350 | Hot fuchsia, not cold magenta. Shifted toward red for warmth and energy. |
| Red | 20 | Warm danger, not fire-truck. The orange lean makes it urgent without being aggressive. |
| Gold | 85 | True gold, not greenish-yellow. Sits in the warm amber zone, matching the neutral system. |
| Cyan | 210 | True blue, not teal. Clean and informational without drifting into green. |
| Green | 148 | Natural green, not neon. A foliage hue that feels organic rather than synthetic. |
| Purple | 300 | Balanced violet, not blue-purple. Sits equidistant from pink and blue for a true purple. |
| Neutral | 70 | Warm cream. Not gray (0), not yellow (90). The sweet spot for inviting surfaces. |

---

## Why Solid Shadows

Zero-blur shadows create a paper-craft, layered aesthetic. They reference printmaking and physical stacking.

Blurred shadows say "I am floating in space." Solid shadows say "I am stacked on top of you." The distinction matters: neo-brutalism is about presence and position, not depth-of-field illusion. Every shadow uses 2px offset increments plus ambient depth layers to create a consistent sense of physical stacking.

---

## Why 2px Borders

Visible, confident, grid-aligned:

- **1px borders** disappear on high-DPI screens and feel tentative.
- **3px+ borders** feel heavy and start competing with content.
- **2px** is the sweet spot for neo-brutalism: clearly intentional, cleanly rendered at all resolutions, and thick enough to be a design element rather than a separator.

---

## Why Spring Physics

Organic motion over mechanical. Cubic-bezier gives smooth curves, but springs give lifelike bounce -- the kind of motion real objects make when they settle into position.

The CSS `linear()` function enables true multi-oscillation springs without JavaScript. This means the motion system is pure CSS, works with reduced-motion preferences, and produces animations that feel responsive rather than choreographed.

---

## The "Nothing Skips a Tier" Principle

The token architecture is strict: **Primitives -> Semantic -> Component**.

- A component token like `--btn-primary-bg` references a semantic token like `--accent-primary`.
- A semantic token like `--accent-primary` references a primitive like `--primitive-pink-400`.
- A component **never** references a primitive directly.

This discipline makes dark mode automatic: override semantic tokens in `[data-theme="dark"]` and every component updates. It also means future themes (high contrast, seasonal, brand variants) work without touching any component CSS.

---

## What Delightful Avoids

| Avoided | Why |
|---|---|
| Gradients | Break the flat, printed aesthetic. Every surface is a solid fill. |
| Rainbow palettes | Seven intentional hue families are enough. More creates chaos. |
| Generic SaaS aesthetics | Blurred shadows, rounded-everything, Geist/Inter-thin. Delightful is opinionated. |
| Placeholder text ("Lorem ipsum") | Every example uses real content. Placeholders hide layout problems. |
| Blurred shadows | See "Why Solid Shadows" above. |
| Cold grays | Neutrals use hue 70, not hue 0. See "Why Warm Neutrals" above. |
| Arbitrary values | Every spacing, font-size, and color comes from a token. No magic numbers. |
| Hex, RGB, HSL | All colors are OKLCH. No exceptions. |
