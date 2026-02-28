# Design System — Akin Tewe Portfolio

Last updated: February 2026
Framework: Next.js 15 + Tailwind CSS v4 + Framer Motion

---

## Philosophy

Minimalism meets childhood wonder. The site uses a pixel art character theme with transparent video overlays, vibrant colors, and playful interactions — grounded by clean typography and generous whitespace. The aesthetic is intentionally warm, personal, and non-corporate.

---

## Color

### Background & Surface

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#ebebeb` | Page background, hero, loader |
| `--foreground` | `#111111` | Primary text |
| `--accent` | `#2B7FFF` | Focus rings, selection highlight |
| `bg-gray-200` | `#e5e7eb` | Hero section background |
| `bg-gray-900` | `#111827` | Hover modals, dark surfaces |

### Text Opacity Scale

Text color is controlled through opacity rather than distinct grey values. This keeps the palette unified.

| Class | Usage |
|-------|-------|
| `text-gray-800` | Hero headings (scramble text) |
| `text-gray-900` | Mobile name ("akin tewe") |
| `text-black/80` | Credits — emphasized names (Sprite, True Religion) |
| `text-black/50` | Bio paragraph |
| `text-black/35` | Credits — labels ("Worked with", "+ more") |
| `text-black/25` | Footer text |
| `text-black/15` | Divider lines (`bg-black/15`) |
| `text-white` | Nav active label, pill titles, modal headings |
| `text-white/80` | Mobile menu items |
| `text-white/60` | Modal body text |
| `text-white/50` | Nav links (resting), pill tags, modal tag fallback |
| `text-white/40` | Mobile menu close button |
| `text-white/20` | Pill divider lines |
| `text-white/15` | Nav divider, nav border |
| `text-white/10` | Nav border, modal tag fallback bg |
### Interactive States

| State | Treatment |
|-------|-----------|
| Hover (nav links) | `text-white/50` → `text-white` via `transition-colors duration-200` |
| Hover (cards) | `group-hover:-translate-y-2` + colored shadow appears |
| Hover (modal) | `opacity: 0` → `opacity: 1` via `transition-opacity duration-150` |
| Hover (mobile menu) | `hover:text-white hover:bg-white/10` |
| Focus visible | `outline: 2px solid rgba(43, 127, 255, 0.5)` with `outline-offset: 2px` |
| Selection | `background: rgba(43, 127, 255, 0.4)`, `color: white` |

### Modal Tag Colors

Tags inside hover modals are color-coded. Each tag maps to a specific tinted background and text color on a dark (`bg-gray-900`) surface:

```
"UI/UX Design":      bg-sky-500/20     text-sky-300
"Built with Claude":  bg-orange-500/20  text-orange-300
"Production Ready":   bg-emerald-500/20 text-emerald-300
"Front End":          bg-violet-500/20  text-violet-300
"UX Research":        bg-rose-500/20    text-rose-300
"Interviews":         bg-amber-500/20   text-amber-300
"Commission":         bg-yellow-500/20  text-yellow-300
"3D Animation":       bg-cyan-500/20    text-cyan-300
"Branding":           bg-pink-500/20    text-pink-300
"Graphic Design":     bg-purple-500/20  text-purple-300
"Product Launch":     bg-lime-500/20    text-lime-300
```

Fallback for unknown tags: `text-white/50 bg-white/10`

---

## Typography

### Font Stack

| Font | Weight(s) | Role |
|------|-----------|------|
| **Pixelify Sans** | 400, 500, 600 | Headings, labels, navigation, pills, tags — all display text |
| **Roboto** | 300, 400 (normal + italic) | Body text, descriptions, bio, credits |
| Arial, Helvetica, sans-serif | — | System fallback (`body` default) |
### Pixelify Sans Usage

Applied via `${pixelify.className}`. Always `uppercase` for nav, pills, tags, and headings. Lowercase for footer.

| Context | Size | Weight | Additional |
|---------|------|--------|------------|
| Hero titles (desktop) | `text-5xl` | 400 | `uppercase whitespace-nowrap` |
| Hero titles (mobile) | `text-2xl` | 400 | `uppercase whitespace-nowrap` |
| Mobile name | `text-8xl` | 400 | `leading-none` |
| Nav — name | `text-sm` | 400 | `tracking-wider` |
| Nav — links | `text-xs` | 400 | `tracking-wider uppercase` |
| Card pill — title | `text-sm` (main), `text-xs` (mini) | 400 | `tracking-wider uppercase` |
| Card pill — tag | `text-xs` (main), `text-[10px]` (mini) | 400 | `tracking-wider uppercase` |
| Modal — title | `text-xl` (main), `text-lg` (mini) | 400 | `uppercase tracking-wide` |
| Modal — tag pills | `text-sm` | 400 | `uppercase tracking-wider` |
| Mobile menu items | `text-xl` | 400 | `uppercase` |
| Mobile menu indices | `text-sm` | 400 | — |
| Footer | `text-xs` | 400 | `tracking-wider` (lowercase, no uppercase) |

### Roboto Usage

Applied via `${roboto.className}`.

| Context | Size | Weight | Additional |
|---------|------|--------|------------|
| Credits label | `text-[11px]` mobile, `text-sm` desktop | 400 | `uppercase tracking-[0.15em]` |
| Bio paragraph | `text-base` | 300 (`font-light`) | `leading-relaxed` |
| Modal — body (main) | `text-base` | 300 (`font-light`) | `leading-relaxed` |
| Modal — body (mini) | `text-sm` | 300 (`font-light`) | `leading-relaxed` |

### Key Typography Rules

- Pixelify Sans is the identity font. It appears on every interactive or labeling element.
- Roboto is only for running text that needs readability at smaller sizes.
- Never mix: a single element uses one font, never both.
- `uppercase` is standard for Pixelify in UI contexts. Footer is the exception (lowercase).
- `tracking-wider` or `tracking-wide` is standard on all Pixelify usage.
- No font-size jumps between breakpoints unless structurally necessary (hero titles: `text-2xl` → `text-5xl` at `md`). Avoid adding responsive text size changes elsewhere.
---

## Spacing

### Responsive Padding Strategy

The site uses CSS `clamp()` inside Tailwind arbitrary values for smooth scaling between breakpoints, eliminating jumps.

| Element | Mobile | Desktop |
|---------|--------|---------|
| Hero container left | `px-6` | `md:pl-[clamp(2rem,6vw,8rem)]` |
| Hero container right | `px-6` | `md:pr-[clamp(1rem,3vw,2.5rem)]` |
| Hero column gap | `gap-8` | `md:gap-[clamp(4rem,10vw,16rem)]` |
| Projects section | `px-6` | `md:px-[clamp(4rem,10vw,11rem)]` |
| Footer | `px-6` | `md:px-[clamp(4rem,10vw,11rem)]` |

Pattern: `clamp(minimum, preferred-vw, maximum)`. The preferred value uses `vw` units so it scales linearly with viewport width. No intermediate breakpoint overrides needed.

### Section Spacing

| Section | Top | Bottom |
|---------|-----|--------|
| Hero | `pt-12` mobile, `md:pt-0` desktop | Height-based: `md:h-[32vh]` with `md:min-h-[350px]` floor |
| Projects | `pt-20 md:pt-28` | `pb-6 md:pb-[clamp(2rem,4vw,4rem)]` |
| Projects overlap | `-mt-12 md:-mt-20` (pulls cards up under hero) |
| Footer | `py-6 md:py-[clamp(2rem,4vw,4rem)]` |

### Grid Gaps

| Grid | Horizontal | Vertical | Between grids |
|------|-----------|----------|---------------|
| Main projects (2-col) | `gap-x-8` (32px) | `gap-y-12` (48px) | — |
| Mini projects (3-col) | `gap-x-8` (32px) | `gap-y-12` (48px) | `mt-12` from main grid |
---

## Layout

### Page Structure

```
<body>
  <LoaderProvider>
    <NavBar />          ← fixed, floating, z-[60]
    <main>
      <Landing>
        <section>       ← Hero: relative, overflow-visible
        <section>       ← Projects: relative, negative top margin
      </Landing>
    </main>
    <Footer />          ← inline, transparent background
  </LoaderProvider>
</body>
```

### Hero Section

- Height: `min-h-fit` mobile, `md:min-h-[350px] md:h-[32vh]` desktop
- Background: `bg-gray-200`
- Overflow: `overflow-visible` (character extends below)
- Two-column flex layout on desktop (`md:flex-row`), single column mobile
- Left column: fixed width `md:w-[22rem] md:flex-shrink-0` to prevent jitter during scramble animation
- Splash video: absolutely positioned, `left-[47%] -translate-x-1/2`, extends below hero via `translate-y-[25%]`, `z-50`
- Bio paragraph: absolutely positioned inside splash video container (shares coordinate system), `hidden 2xl:block`

### Projects Section

- Negative margin overlap: `-mt-12 md:-mt-20` pulls cards up beneath hero character
- Two grids: 2-column main (`md:grid-cols-2`), 3-column mini (`md:grid-cols-3`)
- All cards single-column on mobile (`grid-cols-1`)

### Z-Index Stack

| Layer | z-index | Element |
|-------|---------|---------|
| Loader | `z-[500]` | Page transition overlay |
| Mobile menu button | `z-[100]` | Hamburger button |
| Mobile menu overlay | `z-[90]` | Backdrop |
| Nav bar | `z-[60]` | Desktop floating pill |
| Hover modals | `z-50` | Cursor-following card modals |
| Splash video | `z-50` | Character + "akin tewe" |
| Hero content | `z-10` | Scramble text, credits |
---

## Components

### Navigation Bar — Desktop

Floating centered pill with glassmorphism effect.

```
Position:   fixed top-6, centered (left-1/2 -translate-x-1/2)
Background: bg-black/80 backdrop-blur-lg
Shape:      rounded-full
Border:     border border-white/15
Shadow:     shadow-lg shadow-black/20
Padding:    px-8 py-3.5
```

Internal layout: flex row with "AKIN TEWE" name, vertical divider (`w-px h-4 bg-white/15`), then nav links.

### Navigation Bar — Mobile

Hamburger button (fixed top-right) opens a card overlay.

```
Button:     bg-black/80 backdrop-blur-sm, rounded-full, p-3.5
Card:       bg-[#1a1a1a]/95, rounded-2xl, border border-white/10
            w-[70vw] max-w-[260px]
Position:   fixed top-24 right-4
```

Menu items have numbered indices (`01`, `02`, etc.) on the right side.

### Card — Main Project

```
Shape:      rounded-2xl
Aspect:     aspect-[9/5]
Hover:      group-hover:-translate-y-2 + colored box-shadow
Shadow:     0 20px 50px -12px {project.shadow} (on hover only)
Transition: transition-all duration-300 ease-out
Overflow:   overflow-hidden
```

### Card — Mini Project

Same as main except:
```
Aspect:     aspect-[16/9]
```

### Pill Label (on cards)

Dark pill floating at bottom-left of card. Contains project title and optionally a tag separated by a vertical divider.

```
Position:   absolute bottom-4 left-4 (main), bottom-3 left-3 (mini)
Background: bg-black/80 backdrop-blur-lg
Shape:      rounded-full
Padding:    px-4 py-2 gap-3 (main), px-3 py-1.5 gap-2 (mini)
Behavior:   whitespace-nowrap
```

Tag portion (| APPLICATION, | CONCEPT, etc.) is hidden below `lg` (1024px): `hidden lg:block` / `hidden lg:inline`.

### Hover Modal

Cursor-following dark card that appears on project card hover. Positioned via JavaScript with viewport edge clamping (see `lib/calcModalPosition.ts`).

```
Background: bg-gray-900
Shape:      rounded-2xl
Shadow:     shadow-xl
Padding:    p-6 (main), p-5 (mini)
Max width:  max-w-[280px] (main), max-w-[220px] (mini)
Position:   fixed, z-50, pointer-events-none
Show/hide:  opacity transition (duration-150)
```

Contents: title (Pixelify, white), description (Roboto, white/60), tag pills (color-coded).

The modal ref measures its own dimensions so positioning is pixel-accurate regardless of content size.

### Tag Pill (in modals)

```
Shape:      rounded-full
Padding:    px-3 py-1.5
Font:       Pixelify Sans, text-sm, uppercase, tracking-wider
Color:      Per-tag from TAG_COLORS map, fallback text-white/50 bg-white/10
```

### Footer

Minimal transparent footer with two text elements.

```
Background: transparent (inherits page background)
Layout:     flex justify-between items-end
Padding:    px-6 md:px-[clamp(4rem,10vw,11rem)] py-6 md:py-[clamp(2rem,4vw,4rem)]
Text:       Pixelify Sans, text-xs, text-black/25, tracking-wider
Left:       © {year} akin tewe
Right:      designed & developed by akin tewe
Case:       All lowercase (no uppercase class)
```

### Page Loader

Full-screen overlay shown during route transitions.

```
Background: bg-gray-200 (matches page)
Position:   fixed inset-0, z-[500]
Content:    Pixel art character video (aboutme.mp4), 300x300 mobile / 400x400 desktop
Animation:  Scale 0.9→1 on enter, scale 1.1 + opacity 0 on exit
Duration:   0.3s transitions
```

### Boot Overlay

Same as loader but shown on initial page load with a progress bar.

```
Progress bar: w-32 h-1 bg-black/10, fill bg-gray-900
              Animates 0% → 100% over 0.8s
Timing:       Fade out after 800ms, remove after 1200ms
```
---

## Animation

### Library: Framer Motion

All animations use Framer Motion. No CSS keyframe animations.

### Standard Patterns

**Fade in up (sections, cards):**
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
```

The ease curve `[0.25, 0.46, 0.45, 0.94]` is used consistently for content reveals.

**Staggered children:**
Cards use `delay={i * 0.1}` where `i` is the array index.

**Hero scramble text:**
Custom effect that replaces characters with random glyphs, resolving left-to-right. Delays: "UX ENGINEER" at 500ms, "PRODUCT DESIGNER" at 800ms.

**Credits fade:**
`delay: 2` — appears after scramble text finishes.

**Mobile name slide up:**
```tsx
initial={{ opacity: 0, y: 50 }}
transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
```

**Magnetic spring (buttons):**
```tsx
{ stiffness: 200, damping: 15, mass: 0.5 }
```
Follows cursor with 15% strength, max 10px offset.
### Scroll Triggers

`useInView` with `{ once: true }` — all animations fire once and don't replay.
Hero uses `margin: "0px"`, sections use default.

---

## Responsive Breakpoints

| Breakpoint | Width | Key changes |
|------------|-------|-------------|
| Default | 0px | Single column, mobile nav, `text-8xl` name |
| `md` | 768px | Two-column grid, desktop nav, hero flex-row, `text-5xl` titles |
| `lg` | 1024px | Pill tags become visible |
| `2xl` | 1536px | Bio paragraph appears |

### Scaling Strategy

- Use `clamp()` for padding/gaps that need to scale smoothly
- Use breakpoints (`md`, `lg`, `2xl`) only for layout changes (column count, show/hide)
- Don't use breakpoints for incremental text size changes — pick a size and commit
- `md:min-h-[350px]` acts as a floor for short viewports (Nest Hub etc.) without affecting normal desktops

---

## Borders & Dividers

| Element | Treatment |
|---------|-----------|
| Hero title divider | `w-12 h-px bg-black/15` |
| Nav vertical divider | `w-px h-4 bg-white/15` |
| Card pill divider | `w-px h-4 bg-white/20` (main), `w-px h-3 bg-white/20` (mini) |
| Nav border | `border border-white/15` |
| Mobile menu border | `border border-white/10` |
| Mobile menu internal divider | `mx-5 my-2 h-px bg-white/10` |

Pattern: always 1px, always opacity-based color matching the surface (white/nn on dark, black/nn on light).
---

## Shadows

| Element | Shadow |
|---------|--------|
| Nav bar | `shadow-lg shadow-black/20` |
| Card hover | `0 20px 50px -12px {project.shadow}` — per-card colored shadow |
| Hover modal | `shadow-xl` (Tailwind default) |
| Mobile menu button | `shadow-lg` |
| Mobile menu card | `shadow-xl` |
| Pill labels | `shadow-sm` |

Card shadows use the project's accent color at 40% opacity for a colored glow effect.

---

## Radius

| Element | Radius |
|---------|--------|
| Nav bar | `rounded-full` |
| Cards | `rounded-2xl` |
| Pill labels | `rounded-full` |
| Tag pills | `rounded-full` |
| Hover modals | `rounded-2xl` |
| Mobile menu card | `rounded-2xl` |
| Mobile hamburger button | `rounded-full` |
| Scrollbar thumb | `4px` |

Pattern: either `rounded-full` (pills, buttons) or `rounded-2xl` (cards, panels). Nothing in between.
---

## Scrollbar

Desktop only (`@media min-width: 768px`):

```css
width: 8px
track: rgba(0, 0, 0, 0.03)
thumb: rgba(0, 0, 0, 0.15), hover rgba(0, 0, 0, 0.25)
radius: 4px
```

`.scrollbar-hide` utility class available for elements that should hide scrollbars.

---

## Accessibility

- `prefers-reduced-motion`: All animations forced to 0.01ms
- Focus visible: Blue outline (`rgba(43, 127, 255, 0.5)`) with 2px offset
- Touch: `-webkit-tap-highlight-color: transparent` on mobile
- `touch-action: manipulation` on buttons and links
- Semantic HTML: `<section>`, `<nav>`, `<footer>`, `<main>`
- `aria-label` on mobile menu buttons ("Open menu", "Close menu")

---

## Glassmorphism Pattern

Used on nav and pills. The standard recipe:

```
bg-black/80 backdrop-blur-lg
```

With optional border for extra definition:
```
border border-white/15
```

Always on dark surfaces. Never glassmorphism on light backgrounds.
---

## Data Structures

### Project (main)

```ts
{
  id: number,
  title: string,          // Display name
  tag: string,            // Category: "Application" | "Concept" | "Research" | "Commission"
  body: string,           // Short description for hover modal
  color: string,          // Tailwind bg class (placeholder, will be replaced by images)
  shadow: string,         // rgba() for hover shadow
  tags: string[],         // Attribute tags for modal pills
  image: string | null,   // Thumbnail path (currently null)
  link: string,           // Route path
}
```

### Project (mini)

```ts
{
  id: string,
  title: string,
  tag: string,
  desc: string,           // Short description for hover modal
  color: string,
  shadow: string,
  tags: string[],
  link: string,
}
```

---

## File Structure

```
app/
  Landing.tsx             — Home page (hero + projects grid)
  layout.tsx              — Root layout (nav + main + footer)
  globals.css             — CSS variables, utilities, scrollbar, a11y
  ui/fonts.ts             — Font definitions (Pixelify Sans, Roboto)
  projects/               — Individual project pages
components/
  NavFoot.tsx             — NavBar + Footer exports
  LoaderContext.tsx        — Loading state provider
  LoadingOverlay.tsx      — PageLoader + BootOverlay
  SplashVideo.tsx         — TransparentVideo + MainVideo
  MagneticButton.tsx      — MagnetButton + MagneticWrapper + AboutButton
data/
  ProjectThumbData.tsx    — Project card data (main + mini)
lib/
  calcModalPosition.ts    — Cursor modal positioning with edge clamping
public/
  blacksplashW.webm       — Desktop splash video (WebM)
  blacksplashM.mp4        — Desktop splash video (HEVC fallback)
  aboutme.mp4             — Loader character animation
  projects/               — Per-project assets (images, videos)
```