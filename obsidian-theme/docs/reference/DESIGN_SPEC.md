# Obsidian Delightful Theme: Full Exhaustive Architecture Spec

## 1. Vision & Philosophy
The **Obsidian Delightful** theme is a hyper-comprehensive, neo-brutalist theme bringing the joyous, vibrant aesthetics of the Delightful Design System into the Obsidian ecosystem. This design system leaves absolutely no pixel untouched.

### Core Principles
- **Total Coverage**: Exhaustive coverage of all UI chrome, editor states, standard components, rare modalities (Command Palette, Settings), and top community plugins.
- **Neo-Brutalist Foundations**: Solid shadows (zero blur), 2px structural borders, playful border radii.
- **Color Brilliance**: Complete reliance on the OKLCH color space.
- **Tactile Animation**: Elements press down when clicked. Checkboxes snap. Command palettes drop in. 

## 2. Exhaustive UI Chrome Coverage
The theme takes over native Obsidian CSS variables and selectors for the entire application shell.

### A. Window & Workspace
- **Titlebar**: Seamless integration with macOS/Windows native traffic lights.
- **Workspace Ribbons & Sidebars**: 2px borders separating rigid layout columns.
- **Resizers (`.workspace-split`)**: Visual col-resize handles that light up on hover.
- **Tabs (`.workspace-tab-header`)**: Raised inactive tabs, deeply recessed active tabs with 4px active indicator lines.
- **Scrollbars (`::-webkit-scrollbar`)**: Pill-shaped solid thumb tracks with no blur.
- **Status Bar (`.status-bar`)**: Heavy, contrasting bottom bar with distinct typography.

### B. Modals & Overlays
- **Command Palette (`.prompt`)**: Thick shadows (`12px 12px 0 var(--border-strong)`), giant typography, floating in the center. Highlighted items snap with a bounce curve.
- **Settings Modal (`.modal`)**: Segmented sidebar, thick toggle switches (`.checkbox-container`), heavily styled dropdowns.
- **Hover Popovers / Tooltips**: Floating brutalist cards.

## 3. Exhaustive Content Rendering (Editor)
Every piece of markdown rendering is styled.

- **Typography**: Inter (UI), JetBrains Mono (Code/Math).
- **Code Blocks**: Floating cards with CSS/JS tags floating in the top right.
- **Callouts**: Using the 6 accent families (Pink, Danger, Gold, Cyan, Green, Purple).
- **Embeds (`.internal-embed`)**: Nested boxed content with thick left-accent borders to prevent visual confusion.
- **Blockquotes**: Stylized italic text with accent marks.
- **Footnotes & Citations**: Raised badge styling.
- **Mermaid/Math**: Specialized font stacks and contrasting wrapper cards.
- **Frontmatter/Properties**: Styled as pill tags (`border-radius: full`, heavy borders).
- **Task Lists**: Elastic SVG checkmarks.

## 4. Plugin Support Scope (Full Coverage)
The theme wraps the following community plugins into the Delightful visual language:
1. **Dataview**: Tables, lists, inline queries.
2. **Kanban**: Drag-and-drop boards using our card motion styles.
3. **Tasks**: Integrating the task checkmark animations.
4. **Calendar**: Brutalist grid, solid hover states.
5. **Excalidraw**: UI toolbars match the Delightful modal styles.
6. **Advanced Tables**: 2px borders on cells.
7. **Obsidian Git**: Status styling in the status bar and diff views.

## 5. Build & Architecture Guidelines
The final `theme.css` string will be built utilizing native CSS `@layer` rules for organization:
- `@layer tokens`
- `@layer workspace`
- `@layer editor`
- `@layer typography`
- `@layer components`
- `@layer plugins`
