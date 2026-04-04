---
name: present-with-delightful
description: This skill should be used when the user wants to build a self-contained HTML presentation styled with the Delightful design system. Common triggers include "build a presentation", "make slides", "create a deck", "presentation about", "slide deck", or any request to generate an interactive presentation with neo-brutalist styling, theme toggle, and animated components.
allowed-tools: "Bash WebFetch"
metadata:
  author: Delightful Design System
  version: 0.7.0
  tags: [design-system, css, neo-brutalist, oklch, presentation, slides]
---

# Present with Delightful

Generate self-contained HTML presentations using the Delightful presentation engine.

## Instructions

### Step 1 — Read the Template

Read `delightful-showcase.html` from the repository. Search for it in the parent directories above the plugin root, or use `Glob` to find it: `**/delightful-showcase.html`.

If the showcase file is not available (e.g., the plugin was installed standalone from the marketplace), generate a self-contained presentation using the token system from `${CLAUDE_PLUGIN_ROOT}/themes/css/delightful-tokens.css` and the component patterns from `${CLAUDE_PLUGIN_ROOT}/reference/components.md`. Build the HTML chrome (sidebar, nav, theme toggle) and slide engine from the structural description below.

This file is a large, self-contained presentation engine. Treat it as a **three-zone template**:

| Zone | What | Action |
|------|------|--------|
| `<style>` — CSS (semantic + component + presentation layers) | Tokens, component styles, slide system, responsive, reduced motion | **Copy verbatim** into output |
| `<body>` — HTML chrome (sidebar, deck, search, shortcuts, particles) | Navigation UI, theme toggle, search overlay, keyboard shortcuts panel | **Copy verbatim**, update `<title>`, sidebar brand/subtitle, slide counter total |
| `<script>` — JS engine + data | Navigation, rendering, search, keyboard, touch, particles, counters | **Copy engine verbatim**. Replace data arrays with generated content |

### Step 2 — Read the References

Read these files from the plugin directory:
- `${CLAUDE_PLUGIN_ROOT}/reference/tokens.md` — All token values (colors, spacing, typography, motion)
- `${CLAUDE_PLUGIN_ROOT}/reference/components.md` — Component patterns with full CSS and HTML
- `${CLAUDE_PLUGIN_ROOT}/reference/interactions.md` — POUNCE/SINK press patterns, animation keyframes
- `${CLAUDE_PLUGIN_ROOT}/reference/philosophy.md` — Design principles for content tone

### Step 3 — Plan the Presentation Structure

Based on the user's topic, plan the structure and **present it for approval before generating**:

1. **Presentation title and subtitle**
2. **Section groups** — 3–8 major thematic groups, each assigned an accent color
3. **Sections** — 2–5 sections per group
4. **Slides** — 1 slide per section by default; some sections may warrant 2–3
5. **Section intro slides** — One per group (auto-generated via `sectionIntro()`)
6. **Title slide** (first) and **closing slide** (last)

**Target slide counts:**
- Short presentation: 3–5 groups, 15–20 slides
- Medium presentation: 5–7 groups, 20–30 slides
- Long presentation: 7–8 groups, 30–40 slides

**Accent color assignment:**

| Color | Use for |
|-------|---------|
| `gold` | Introductory/welcome content |
| `primary` (pink) | Core/main content |
| `danger` (red) | Problems, challenges, warnings |
| `green` | Solutions, benefits, success |
| `cyan` | Technical/data-focused content |
| `purple` | Creative, vision, future content |

### Step 4 — Map Content to Components

Choose the right visual component for each slide's content:

| Content Type | Component | CSS Class |
|---|---|---|
| Core concepts (2–3 items with detail) | Flip cards | `flip-grid` |
| Key metrics / numbers | Counter grid | `counter-grid` |
| Pros/cons, before/after | Comparison | `comparison` |
| Hierarchical items with detail | Expand cards | `expand-stack` |
| Important callouts | Callout box | `callout` |
| Quotes, testimonials | Quote card | `quote-card` |
| Proportional data | Data bars | `data-bar` |
| Structured data | Matrix table | `matrix` |
| Process flow, pipeline | Silo boxes | `silo-row` |
| Status indicators | Badges | `badge` |
| Two-column layouts | Grid | `grid-2` / `grid-2-1` |
| Three-column layouts | Grid | `grid-3` |

### Step 5 — Generate the HTML File

Build a single self-contained `.html` file with this structure:

#### Zone 1: CSS (copy verbatim)

Copy the entire `<style>` block from the showcase template. This includes:
- `@layer` order declaration
- Semantic tokens (light + dark themes)
- Component tokens (typography, spacing, radius, motion)
- `[data-accent]` color aliases for all 6 accents
- Presentation layer (slide system, sidebar, nav dots, all component CSS)
- Responsive breakpoints and reduced-motion guards

#### Zone 2: HTML Chrome (copy verbatim, update text)

Copy the `<body>` HTML structure. Update these values:
- `<title>` — set to presentation title
- Sidebar brand `<h1>` — set to presentation name
- `.sidebar-subtitle` — set to presentation subtitle
- `#slideCounter` — set total to match actual slide count (e.g., `1 / 25`)

#### Zone 3: Script (copy engine, replace data)

The `<script>` block is an IIFE. Replace only the data sections; copy the engine verbatim.

**Data to replace:**

1. **`SECTION_GROUPS` array** — One entry per group:
   ```javascript
   {id:'0',title:'Introduction',color:'gold'},
   {id:'I',title:'Core Concepts',color:'primary'},
   // ...
   ```
   Use `'0'` for the welcome group, Roman numerals `'I'` through `'XII'` for content groups.

2. **`SECTIONS` array** — One entry per section:
   ```javascript
   {id:'00',title:'Design Philosophy',groupId:'0',color:'gold'},
   {id:'01',title:'Architecture',groupId:'0',color:'gold'},
   // ...
   ```
   Use zero-padded IDs (`'00'`, `'01'`, ... `'29'`). Each section's `groupId` and `color` must match its parent group.

3. **Helper functions** — Copy `introDots()`, `sectionIntro()`, `defaultRender()`, `makeSlide()` verbatim from the template.

4. **`S` array** — Contains the title slide:
   ```javascript
   const S=[
   makeSlide({id:'title',sectionId:null,sectionIndex:0,sectionSlideCount:1,
     groupId:null,accentColor:'gold',title:'Presentation Title',
     slideTitle:'Subtitle',searchText:'keywords for search',headline:'',sub:'',
     render(c){c.innerHTML=`<div class="title-hero">
       <div class="title-decoration"></div>
       <div class="title-decoration"></div>
       <div class="title-decoration"></div>
       <div class="title-name">Title</div>
       <div class="title-tagline">Subtitle</div>
       <div class="title-mono">Key Detail Line</div>
       <div class="title-date">Stats or Date Line</div>
       <div class="title-hint">\u2192 or <kbd>j</kbd> to begin \u2022 <kbd>n</kbd> table of contents \u2022 <kbd>?</kbd> shortcuts</div>
     </div>`;},
     animate(el){el.querySelectorAll('.title-name,.title-tagline,.title-mono,.title-date,.title-hint').forEach((e,i)=>{e.style.opacity='0';e.style.transform='translateY(30px)';setTimeout(()=>{e.style.transition='opacity 0.6s var(--ease-spring-gentle), transform 0.6s var(--ease-spring-gentle)';e.style.opacity='1';e.style.transform='none';},300+i*180);});}})
   ];
   ```

5. **`R` array** — Section intros + content slides in shorthand format:
   ```javascript
   const R=[
   // Section intro
   {id:'intro-I',sectionId:null,si:0,sc:1,g:'I',a:'primary',t:'Core Concepts',st:'Chapter',
    s:'search keywords',h:'',sub:'',
    render(c){c.innerHTML=sectionIntro('I','Core Concepts','3 sections \u2022 Topic A, Topic B, Topic C');}},
   // Content slide
   {id:'s00-0',sectionId:'00',si:0,sc:1,g:'0',a:'gold',t:'Slide Title',st:'Slide Subtitle',
    s:'search keywords for this slide',
    h:'Headline with <span class="accent">emphasis</span>',
    sub:'Subtitle expanding on the headline.'},
   // Closing slide
   {id:'closing',sectionId:null,si:0,sc:1,g:null,a:'primary',t:'Closing',st:'Thank You',
    s:'closing summary',h:'',sub:''},
   ];
   ```

   **Shorthand key reference:**
   - `si` = sectionIndex (slide position within its section, usually 0)
   - `sc` = sectionSlideCount (total slides in this section, usually 1)
   - `g` = groupId
   - `a` = accentColor
   - `t` = title (for sidebar nav)
   - `st` = slideTitle (for search results)
   - `s` = searchText (space-separated keywords)
   - `h` = headline (HTML allowed, use `<span class="accent">` for emphasis)
   - `sub` = subtitle text

6. **`INTERACTIVE_RENDERS` object** — Custom render/animate functions for slides that need visual components:
   ```javascript
   const INTERACTIVE_RENDERS={
   's00-0':{
     render(c,r,gl){
       c.innerHTML=`${gl?`<div class="slide-section-badge">${gl}</div>`:''}
         ${r.h?`<h2 class="slide-headline">${r.h}</h2>`:''}
         <p class="slide-subtitle">${r.sub||''}</p>
         <div class="slide-body" id="sb-s00-0"></div>`;
       const b=c.querySelector('#sb-s00-0');
       // Populate b.innerHTML with component HTML
     },
     animate(el){
       // Stagger entrance animations
     }
   },
   };
   ```

7. **Engine code** — Copy everything from `R.forEach(r=>{...})` through `buildNav();buildDots();spawnParticles();origNav(state.ci);` verbatim. This includes: slide processing loop, state management, nav/render/evict functions, updateChrome, buildNav, toggleTheme, search, keyboard handlers, touch support, particle system, counter animation, sparkles, nav hints, and initialization.

**Slide density rules:**
- One main idea per slide
- Headline = the takeaway, not a section label
- Use `<span class="accent">` for emphasis in headlines
- Subtitle expands in 1–2 sentences
- Footnote for source attribution or context
- Populate `searchText` with relevant keywords for the search overlay

### Step 6 — Verify

Launch the `delightful-auditor` agent to check the generated file:
- Zero hardcoded colors outside token definitions
- All spacing uses tokens
- Dark mode works (semantic tokens used correctly)
- `prefers-reduced-motion` is respected (handled by the copied CSS)

### Step 7 — Visual Check

If browser tools are available, open the file and verify:
- Title slide renders correctly
- Navigation works (arrows, sidebar, dots, search)
- Theme toggle switches light/dark
- Slide components render and animate
- Responsive layout adapts at smaller viewports

## Component Patterns

Reference these patterns from the showcase when building `INTERACTIVE_RENDERS`:

### Flip Cards
```javascript
b.innerHTML='<div class="flip-grid grid-3"></div><div class="flip-hint mt-4">Click cards to flip</div>';
[{i:'icon',t:'Title',cap:'Caption',det:'Detail',dp:'Data point'}].forEach(p=>{
  const d=document.createElement('div');d.className='flip-card';
  d.innerHTML=`<div class="flip-inner"><div class="flip-front"><div class="flip-icon">${p.i}</div><h3>${p.t}</h3><p class="caption">${p.cap}</p></div><div class="flip-back"><p>${p.det}</p><div class="data-point">${p.dp}</div></div></div>`;
  d.onclick=()=>d.classList.toggle('flipped');container.appendChild(d);});
```

### Counter Grid
```javascript
b.innerHTML='<div class="counter-grid cols-3"></div>';
[{t:204,s:'',l:'Total Tokens'},{t:7,s:'',l:'Platforms'}].forEach(x=>{
  const d=document.createElement('div');d.className='counter-item';
  d.innerHTML=`<div class="counter-value" data-target="${x.t}" data-suffix="${x.s}" data-duration="2000">0</div><div class="counter-label">${x.l}</div>`;
  container.appendChild(d);});
// animate: animC(el);
```

### Comparison
```html
<div class="comparison">
  <div class="comp-col"><div class="comp-header negative">Problems</div>
    <div class="comp-body"><div class="comp-item">Item</div></div></div>
  <div class="comp-col"><div class="comp-header positive">Solutions</div>
    <div class="comp-body"><div class="comp-item">Item</div></div></div>
</div>
```

### Data Bars
```html
<div class="data-bar" style="--value:85%;--i:0"><span>Label</span><span>85%</span></div>
<div class="data-bar" style="--value:60%;--i:1"><span>Label</span><span>60%</span></div>
```

### Silo Boxes (Pipeline)
```html
<div class="silo-row">
  <div class="silo-box"><h4>Stage 1</h4><div class="text-muted">Description</div></div>
  <div class="silo-gap">&rarr;</div>
  <div class="silo-box"><h4>Stage 2</h4><div class="text-muted">Description</div></div>
</div>
```

### Callout
```html
<div class="callout"><div class="callout-label">Key Insight</div>
  <div class="callout-text">Important information here.</div></div>
```

### Expand Cards
```javascript
b.innerHTML='<div class="expand-stack"></div>';
[{badge:'Tier 1',title:'Title',body:'Detail content'}].forEach((x,i)=>{
  const d=document.createElement('div');d.className='expand-card';
  d.innerHTML=`<div class="expand-header" onclick="this.parentElement.classList.toggle('open')"><span class="badge tier1">${x.badge}</span><span class="expand-title">${x.title}</span><span class="expand-chevron">&#9660;</span></div><div class="expand-body">${x.body}</div>`;
  container.appendChild(d);});
```

### Matrix Table
```html
<table class="matrix"><thead><tr><th>Column</th><th>Column</th></tr></thead>
<tbody><tr><td>Data</td><td>Data</td></tr></tbody></table>
```

## Examples

### Example 1: Product Launch
User says "Build a presentation about our Q1 product launch"
Plan:
- 6 groups: Welcome (gold), Market Context (cyan), Product Vision (primary), Key Features (green), Go-to-Market (purple), Next Steps (gold)
- ~25 slides with counter grids for metrics, comparison for competitive landscape, flip cards for features
Result: Complete deck with sidebar nav, search, theme toggle, animated counters

### Example 2: Technical Architecture
User says "Make slides explaining microservices architecture"
Plan:
- 5 groups: Welcome (gold), Monolith Problems (danger), Microservices Patterns (primary), Implementation (cyan), Operations (green)
- ~20 slides with silo boxes for service flow, matrix tables for pattern comparison, data bars for performance
Result: Technical deck with pipeline visualizations and structured data

### Example 3: Design System Talk
User says "Create a deck for my design system talk"
Plan:
- 8 groups covering tokens, components, motion, accessibility, adoption
- ~35 slides with flip cards for principles, counter grids for adoption metrics, expand cards for component tiers
Result: Comprehensive deck matching the showcase's own structure

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Slides not rendering | `SECTION_GROUPS`/`SECTIONS` IDs don't match slide `groupId`/`sectionId` | Verify every slide's `g` matches a group `id`, and every `sectionId` matches a section `id` |
| Nav dots missing | `buildDots()` call absent from init | Ensure the engine init line includes `buildDots()` |
| Search not finding slides | `searchText` (`s`) field empty | Populate `s` with space-separated keywords for each slide |
| Dark mode broken | Hardcoded OKLCH values instead of `var(--*)` tokens | Use only CSS custom properties in component HTML; the copied CSS handles theming |
| Counter animation not firing | Missing `data-target` attribute | Add `data-target="N"` on `.counter-value` elements; call `animC(el)` in animate |
| Sidebar nav not grouped | Group IDs don't match between `SECTION_GROUPS` and slides | Use consistent IDs: `'0'` for welcome, `'I'`–`'XII'` for content groups |
| Section intros not rendering | Missing `render` function on intro slides | Intro slides need explicit `render(c){c.innerHTML=sectionIntro(...);}` |
