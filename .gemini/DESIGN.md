# Design System: Swiss International Style (Modern Interpretation)
 
This document is the authoritative visual design spec for the E-Commerce Product Multi-Filter
Sidebar project. It supplements `requirements.md` (functional/logic spec). Every visual decision
an AI agent makes when implementing the UI should be traceable back to a rule in this file rather
than improvised.
 
---
 
## 1. Design Philosophy
 
**Style:** A modern interpretation of Swiss International Style — strict grid systems, mathematical
spacing, rational typography, and asymmetric-but-ordered layout.
 
**Era / Origin:** 1950s Swiss design (Basel/Zurich school) reinterpreted through a 2020s digital
product lens.
 
**Keywords:** Grid system · Helvetica · Modular · Asymmetric · International Style · Rational
 
**Governing principle:** Every visual decision must be justifiable by the grid or the modular
scale. Nothing is placed "because it looks nice" — spacing, sizing, and alignment all derive from
the same mathematical system defined below. Objectivity and clarity over decoration.
 
**Best suited for:** Corporate sites, architecture, editorial, SaaS, museums, professional
services — categories this marketplace UI falls into (a rational, high-density inventory browser).
 
**Explicitly avoid:** Playful, rounded, bouncy, or skeuomorphic treatment. No drop shadows used
decoratively, no gradients, no illustrative/mascot elements, no "gamified" interactions
(confetti, badges, playful microcopy). This is not a children's, gaming, or entertainment
aesthetic — do not soften it in that direction even for UX-friendliness.
 
---
 
## 2. Grid System
 
- **12-column responsive grid**, full-bleed container, with a consistent gutter.
- Layout for this project maps onto the grid as:
  - **Sidebar (filters):** fixed at **3 of 12 columns** on desktop (≥1024px), sticky positioned.
  - **Product grid (main content):** remaining **9 of 12 columns**.
  - On tablet (768–1023px): sidebar collapses to **4 of 12** or becomes a toggleable drawer;
    product grid uses the remaining columns in a 2-column card layout.
  - On mobile (<768px): grid collapses to a single column; sidebar becomes an off-canvas drawer
    or accordion triggered by a "Filters" button, itself styled as a component from this system
    (see §5).
- **Gutter / gap:** `1rem` (16px) between columns, consistent at all breakpoints unless the
  spacing scale (§4) dictates a breakpoint-specific override.
- Product cards within the 9-column main area should themselves subdivide the grid rationally —
  e.g., 3 or 4 cards per row on desktop, each spanning an even division of the 9 columns — never
  an arbitrary card width that breaks column alignment.
- **Asymmetry is intentional, not accidental:** the 3/9 sidebar-to-grid split is the primary
  asymmetric relationship in the layout and should be preserved rather than centered or balanced
  50/50.
```css
.layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}
.sidebar { grid-column: span 3; position: sticky; top: 0; }
.product-grid { grid-column: span 9; }
```
 
---
 
## 3. Typography
 
- **Typeface:** Helvetica (or Helvetica Neue) as the ideal; **Inter** as the practical/system
  substitute for web (metrically compatible, free, well-hinted). Use `Inter, "Helvetica Neue",
  Helvetica, Arial, sans-serif` as the font stack.
- **Modular scale:** Perfect fourth ratio, **1.333**. Base size `1rem` (16px). Generate the full
  type scale by repeatedly multiplying/dividing by 1.333 — do not pick arbitrary sizes outside
  this scale.
| Token | Ratio step | Size (px, approx) | Usage |
|---|---|---|---|
| `text-xs` | base ÷ 1.333² | 9px | micro-labels, legal |
| `text-sm` | base ÷ 1.333 | 12px | secondary metadata (e.g., category tag) |
| `text-base` | base | 16px | body text, card descriptions |
| `text-md` | base × 1.333 | 21px | product name / card title |
| `text-lg` | base × 1.333² | 28px | section headers (e.g., "Filters") |
| `text-xl` | base × 1.333³ | 38px | page title |
| `text-2xl` | base × 1.333⁴ | 50px | hero / large display numbers (e.g., price emphasis) |
 
- **Weight:** Use only 2–3 weights maximum (e.g., Regular 400, Medium 500, Bold 700). No
  light/thin weights for body text (fails Swiss rational-legibility principle at small sizes).
- **Case:** Category labels and section headers may use uppercase with slightly increased
  letter-spacing (e.g., `0.05em`) as a classic Swiss typographic device — reserve this for
  labels/eyebrows only, never for body copy or product names (legibility first).
- **Line height:** Tight but readable — `1.2` for headings, `1.5` for body text.
- **Alignment:** Left-aligned, ragged-right. Avoid centered text and avoid justified text (both
  break the rational/grid-aligned reading flow of Swiss design).
```css
:root {
  --font-family-base: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --scale-ratio: 1.333;
  --text-base: 1rem;
  --text-sm: calc(var(--text-base) / var(--scale-ratio));
  --text-md: calc(var(--text-base) * var(--scale-ratio));
  --text-lg: calc(var(--text-md) * var(--scale-ratio));
  --text-xl: calc(var(--text-lg) * var(--scale-ratio));
}
```
 
---
 
## 4. Spacing Scale
 
Spacing must also follow a mathematical progression, not ad hoc pixel values — this is what
"mathematical spacing scale" means in the theme brief. Base unit: `8px`.
 
| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | icon-to-label gap, tight inline spacing |
| `space-2` | 8px | base unit, checkbox-to-label |
| `space-3` | 16px | card internal padding, grid gutter |
| `space-4` | 24px | spacing between filter groups |
| `space-5` | 32px | section padding (sidebar top padding) |
| `space-6` | 48px | major section breaks |
| `space-7` | 64px | page-level top/bottom padding |
 
Rule of thumb: every margin/padding value in the implementation must be one of these tokens.
Flag any hardcoded pixel value not on this scale as a design-system violation.
 
---
 
## 5. Color Palette
 
Strict, minimal, high-contrast — classic Swiss restraint plus one signal accent color.
 
| Color | Hex | Role |
|---|---|---|
| Black | `#000000` | Primary text, borders, primary buttons, active states |
| White | `#FFFFFF` | Primary background, text-on-black |
| Light Grey | `#F5F5F5` | Secondary background (card backgrounds, sidebar background, hover states) |
| Red | `#FF0000` | Single accent — sparingly, for critical actions/state only |
 
**Usage rules:**
- Background is white; card/sidebar surfaces use `#F5F5F5` to create subtle separation without
  shadows or borders where possible.
- Black is the primary interactive/text color — buttons, checked states, active filter chips,
  selected radio button.
- Red (`#FF0000`) is reserved for exactly these uses, and nothing else, to preserve its signal
  value:
  - The "No items match your criteria" empty-state accent (e.g., icon or button)
  - "Reset filters" button (a corrective/destructive-adjacent action)
  - Active/selected star rating fill (optional — black is also acceptable; pick one and be
    consistent)
  - Sale/discount price badges, if introduced later
- Do **not** introduce additional colors (no blues, greens, pastels) without updating this file.
  No gradients. No color-based category-coding of products (a Swiss/rational grid does not rely
  on color-as-metadata — use typography/layout instead).
- Borders, where used, are `1px solid #000000` or `#F5F5F5` — no soft grey `#CCCCCC`-style
  borders; keep the palette closed to the four colors above.
```css
:root {
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-grey-light: #F5F5F5;
  --color-accent-red: #FF0000;
}
```
 
---
 
## 6. Components (60+ accessible components, systematic principles)
 
All components in this project should be built from the same underlying primitives (spacing
tokens, type scale, 4-color palette, grid) so they compose predictably. Below is the component
inventory relevant to this project; extend this list following the same principles if more
components are needed.
 
### 6.1 Sidebar / Filter Panel
- Background `#F5F5F5`, full-height sticky, `space-5` (32px) internal padding.
- Section headers (`Category`, `Price`, `Rating`) use `text-lg`, uppercase, bold, `space-4`
  margin-bottom, separated by a `1px solid #000000` rule — a literal Swiss-style dividing line
  between grid sections.
### 6.2 Checkbox (Category Checklist)
- Square, not rounded (rounded corners contradict the rational/grid-aligned aesthetic) —
  `border-radius: 0` or at most `2px`.
- Unchecked: `1px solid #000000` border, white fill.
- Checked: black fill, white checkmark.
- Label: `text-base`, `space-2` gap from box.
- Focus state: `2px solid #FF0000` outline (accessible, high-contrast, on-brand accent usage).
### 6.3 Range Slider (Price)
- Track: `2px` flat black line (not a rounded pill) on `#F5F5F5` sidebar background — reinforces
  the "grid line" motif.
- Handles: black squares or circles, `16px`, with a visible focus ring in red on
  keyboard-focus.
- Min/max value labels: `text-sm`, positioned left/right of the track, updating live.
- Must be keyboard operable (arrow keys adjust bounds) — see §7.
### 6.4 Radio Buttons (Star Rating)
- Circular (radios conventionally remain circular even in a squared-off grid system — this is
  an acceptable, expected deviation for recognizability).
- Selected: black fill with white center dot.
- Each option labeled with rating value and star glyphs, `text-base`.
- Include a visible "Any" / clear option per requirements.md §5.3.
### 6.5 Product Card
- Background `#FFFFFF` on `#F5F5F5` grid background (or inverse — pick one and apply
  consistently), `1px solid #000000` border, no shadow, no rounded corners (`border-radius: 0`).
- Internal padding `space-3` (16px).
- Image: fixed aspect ratio (e.g., 1:1 or 4:5), object-fit cover, no rounded corners.
- Product name: `text-md`, bold, `space-2` margin-top from image.
- Price: `text-md`, positioned distinctly (e.g., right-aligned within its row) — treat price as
  data, aligned like a table column across all cards for scan-ability, a very Swiss-grid touch.
- Star rating: `text-sm`, black or red fill for filled stars, outline for empty.
- Card hover state: subtle — invert border to `2px` or shift background to pure white/grey; no
  scale/shadow "lift" effects (avoid decorative motion that isn't systemic).
### 6.6 Sort Dropdown
- Square-cornered select control, `1px solid #000000` border, positioned top-right of the
  product grid area per requirements.md §5.6.
- Options list styled with the same flat, bordered, no-shadow treatment as other components.
- Current selection shown in `text-base`, bold.
### 6.7 Empty State
- Centered within the 9-column product grid area (acceptable centered exception — an empty
  state is a singular, isolated message, not a grid of content).
- Message in `text-lg`, black.
- "Reset filters" button: black background, white text (or white background, red border/text —
  pick one and standardize), square corners, `space-3` vertical padding / `space-4` horizontal
  padding.
### 6.8 General Component Rules
- **No border-radius** above `2px` anywhere in the system (the one deliberate exception is
  radio buttons, which are inherently circular).
- **No box-shadow** used for elevation/decoration. If separation is needed, use a `1px` black
  border or a background-color shift (`#FFFFFF` vs `#F5F5F5`) instead — this is the core Swiss
  substitution for "elevation."
- **No transitions/animations** beyond fast, functional ones (e.g., `150ms ease` on hover/focus
  color changes). No bounce, no ease-elastic, no decorative motion.
- All 60+ components in a full system (buttons, inputs, tooltips, modals, pagination, badges,
  tabs, etc.) should be derived from this same set of tokens (§3 type scale, §4 spacing scale,
  §5 four-color palette, `border-radius: 0–2px`, no shadows) so that any new component an agent
  builds later is visually consistent by construction rather than by manual matching.
---
 
## 7. Accessibility (UI/UX Best Practices)
 
Swiss rationalism and accessibility are naturally aligned (high contrast, clear hierarchy,
functional focus) — implement fully, not as an afterthought:
 
- **Contrast:** Black-on-white and black-on-`#F5F5F5` comfortably exceed WCAG AA. Red
  (`#FF0000`) on white passes AA for large text/UI components but should not be used for small
  body text — reserve red for buttons, icons, and accents per §5, not paragraph copy.
- **Focus states:** Every interactive element (checkbox, slider handle, radio, dropdown, button,
  card if clickable) must have a visible, non-color-only focus indicator — use a `2px solid`
  outline in red or black, never `outline: none` without a replacement.
- **Keyboard operability:** Checkboxes, radios, dropdown, and slider must all be fully operable
  via keyboard (Tab, Space/Enter, Arrow keys for the slider). This is required, not optional,
  given the instant-filtering interaction model in requirements.md.
- **Semantic HTML / ARIA:** Use native `<input type="checkbox">`, `<input type="radio">`,
  `<select>` (or a fully ARIA-compliant custom listbox) rather than purely visual divs. The
  price slider, if custom-built, needs `role="slider"`, `aria-valuemin`, `aria-valuemax`,
  `aria-valuenow` kept in sync with state.
- **Live region for results:** Announce filtered result count changes (e.g., "24 products
  found") via an `aria-live="polite"` region so screen reader users get instant feedback
  matching the sighted "instant state feedback" requirement.
- **Empty state:** The "Reset filters" button must be keyboard-focusable and be the logical next
  focus target when the empty state appears.
- **Alt text:** Every product image requires descriptive `alt` text (product name at minimum).
- **Touch targets:** On mobile/tablet, interactive controls (checkboxes, radio buttons, slider
  handles) must have a minimum effective touch target of 44×44px even if the visual element is
  smaller — pad via invisible hit-area, not by inflating the visible square/circle itself (keeps
  the tight Swiss visual scale intact while remaining usable).
---
 
## 8. Quick-Reference CSS Tokens
 
```css
:root {
  /* Color */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-grey-light: #F5F5F5;
  --color-accent-red: #FF0000;
 
  /* Typography */
  --font-family-base: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --scale-ratio: 1.333;
  --text-base: 1rem;
  --text-sm: calc(var(--text-base) / var(--scale-ratio));
  --text-xs: calc(var(--text-sm) / var(--scale-ratio));
  --text-md: calc(var(--text-base) * var(--scale-ratio));
  --text-lg: calc(var(--text-md) * var(--scale-ratio));
  --text-xl: calc(var(--text-lg) * var(--scale-ratio));
  --text-2xl: calc(var(--text-xl) * var(--scale-ratio));
 
  /* Spacing (8px base) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 1rem;     /* 16px */
  --space-4: 1.5rem;   /* 24px */
  --space-5: 2rem;     /* 32px */
  --space-6: 3rem;     /* 48px */
  --space-7: 4rem;     /* 64px */
 
  /* Grid */
  --grid-columns: 12;
  --grid-gap: 1rem;
 
  /* Shape */
  --radius-none: 0;
  --radius-input: 2px;
}
 
.layout {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gap);
}
```
 
---
 
## 9. Summary Checklist for Implementation
 
Before marking any component "done," verify:
 
- [ ] Sizing/spacing values all trace to a token in §3/§4/§8 (no arbitrary pixels)
- [ ] Only the 4 palette colors used (§5), red reserved for its designated roles only
- [ ] No border-radius beyond 2px (except radio buttons), no box-shadow, no decorative motion
- [ ] Left-aligned, ragged-right text; uppercase reserved for labels/eyebrows only
- [ ] Component sits correctly within the 12-column grid (3-col sidebar / 9-col grid on desktop)
- [ ] Keyboard-operable with visible focus states; ARIA/live-region requirements met (§7)