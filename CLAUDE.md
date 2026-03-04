# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests (Vitest)
```

## Architecture Overview

Next.js 16 portfolio site using App Router, React 19, Tailwind CSS 4, Framer Motion, and TypeScript.

**Path Alias**: `@/*` maps to project root (e.g., `@/components/...`, `@/data/...`)

### Site Structure
```
app/Landing.tsx                   → Landing page (hero + projects grid, ~980 lines)
app/layout.tsx                    → Root layout (renders NavBar + Footer globally)
app/globals.css                   → Global styles and CSS variables
app/ui/fonts.ts                   → Font imports (Pixelify Sans, Roboto, Instrument Serif)
app/projects/sifty/               → Project page (application)
app/projects/instadesign/         → Project page (concept)
app/projects/3dresearch/          → Project page (research)
app/projects/truereligion/        → Project page (commission)
app/projects/albumcover/          → Project page (commission)
app/projects/yourrage/            → Project page (commission)
app/aboutme/AboutMe.tsx           → About page
app/contactme/ContactMe.tsx       → Contact page
app/not-found.tsx                 → 404 page
components/NavFoot.tsx            → Nav bar + Footer (rendered by layout.tsx)
components/SplashVideo.tsx        → Transparent video component (TransparentVideo + MainVideo)
components/MagneticButton.tsx     → Magnetic hover button (AboutButton)
components/LoadingOverlay.tsx     → Boot overlay (initial page load animation)
components/PageTransition.tsx    → Entrance crossfade on route changes
components/MaslowHierarchy.tsx    → Maslow pyramid visualization (used on 3D Research card)
components/ProjectMetrics.tsx     → Project page metrics display
components/Charts.tsx             → Chart components for project pages
components/DragScroll.tsx         → Drag-to-scroll utility
components/ProjectSummary.tsx     → Project page summary component
components/Projects.tsx           → Legacy carousel (unused on landing, may be used elsewhere)
components/ExtraProjects.tsx      → Legacy mini projects section (unused on landing)
data/ProjectThumbData.tsx         → Static project data (titles, descriptions, links, thumbnails)
.archive/                         → Archived project pages (bluboyspin, sprite)
```

### Key Dependencies
- `shadergradient` + `three` + `@react-three/fiber` + `@react-three/drei` — 3D shader gradient backgrounds on project cards
- `framer-motion` — All animations
- `lucide-react` + `react-icons` — Icon libraries

### Transparent Videos

The pixel art character appears throughout the site as transparent videos. These use dual-source rendering for cross-browser support:
- H.265 `.mp4` (codecs=hvc1) → Safari (alpha channel support)
- VP9 `.webm` → Chrome / Firefox
- H.264 `.mp4` fallback → Chrome / Firefox for videos without a WebM version

Rendered via `<TransparentVideo>` (inline videos like spinners) and `<MainVideo>` (hero splash) from `components/SplashVideo.tsx`. `MainVideo` uses IntersectionObserver to auto-pause when out of viewport and only renders on desktop.

`LazyVideo` is defined inline in `Landing.tsx` for project card thumbnails. It delays playback by 1.5s so the hero splash gets the video decoder first, and pauses when out of view via `useInView`.

Hero character video is absolutely positioned (`left-[47%] -translate-x-1/2`, `translate-y-[25%]`) and independent of page flow. It straddles section boundaries (bottom of hero into top of projects). Content must be designed around it — never move the video to fix a layout issue.

## Design Principles

### Color Palette — Landing Page

The landing page uses a neutral white/grey palette. Blue is NOT used on the landing page.

| Element | Value |
|---|---|
| Body background | `#ebebeb` (CSS var `--background`) |
| Hero section | `bg-gray-200` (`#e5e7eb`) |
| Loading overlay | `bg-gray-200` |
| Primary text | `text-gray-800`, `text-gray-900` |
| Secondary text | `text-black/35` to `text-black/50` |
| About Me button | `bg-gray-900` |
| Nav pill (desktop) | `bg-black/80` with `backdrop-blur-lg`, `border-white/15` |
| Footer | transparent (inherits page background) |

### Color Palette — Project Pages, About, Contact

Blue and green accents are used on deeper pages only:

| Element | Value |
|---|---|
| Primary accent | `blue-500` / `#2B7FFF` |
| Secondary accent | `green-400`, `green-500` (project labels) |
| About page section | `bg-black` |

### Typography
- `pixelify` (Pixelify Sans): Headings, buttons, nav, UI labels — always uppercase for nav/labels
- `roboto` (Roboto): Body text, descriptions — uses `font-light` weight
- `instrumentSerif` (Instrument Serif): Decorative display text (Maslow hierarchy labels on 3D Research card)
- Apply font classes directly: `${pixelify.className}`, `${roboto.className}`, `${instrumentSerif.className}`
- Primary text: `text-gray-800` / `text-gray-900` (never pure `#000000`)
- Secondary/credits text: `text-black/35` to `text-black/50`, uppercase, wide tracking

### Responsive Approach
- Mobile-first with Tailwind breakpoints (`md:`, `lg:`, `2xl:`)
- Layouts shift from stacked (`flex-col`) to side-by-side (`md:flex-row`)
- Hero character video: desktop only (`hidden md:block`), mobile has its own layout
- Nav: hamburger menu on mobile, floating pill on desktop
- Bio paragraph: desktop only, visible at `2xl:` breakpoint, positioned relative to splash video container

## Current Landing Page Structure (top to bottom)

**Hero Section** — `bg-gray-200`
- Two-column flex row centered with clamp-based padding
- Left column: scramble text animation ("UX ENGINEER" / "PRODUCT DESIGNER"), thin divider, credits line. Fixed width `md:w-[22rem]` to prevent jitter.
- Right column: About Me magnetic button
- Character video: absolutely positioned, straddles bottom of hero into projects section, `z-50`
- Bio paragraph: absolutely positioned inside splash video container at `2xl:` breakpoint
- Mobile: "akin tewe" name block (8xl), scroll chevron, columns stack vertically

**Projects Section** — `id="projects"`, inherits body `#ebebeb`
- Negative margin overlap: `-mt-12 md:-mt-20` pulls grid up beneath hero character
- `<ProjectsGrid />`: 2-column grid (`md:grid-cols-2`) with all 6 projects
- Cards: `rounded-2xl`, `aspect-[9/5]`, hover lifts with colored shadow
- Card content: video thumbnails (`LazyVideo`), slideshows, shader gradients, or static images
- Special card overlays: `ResearchCardOverlay` (glass dots + Maslow labels), `ChatPillsOverlay` (animated chat bubbles)
- Glass displacement effects: mathematically derived (Snell's law, specular fills) defined inline in Landing.tsx

**Footer** — transparent background (rendered by `layout.tsx`)

**Nav** — floating pill on desktop (`bg-black/80`), hamburger on mobile (rendered by `layout.tsx`)

## Component Architecture

### Page Structure
```
app/projects/[name]/page.tsx      → Server Component (metadata only)
app/projects/[name]/Component.tsx → Client Component ("use client", actual content)
```

### Client-Heavy Components
Most components use `"use client"` due to Framer Motion animations and interactivity. Keep Server Components minimal (metadata exports, simple wrappers).

### Landing.tsx Inline Components
Landing.tsx is large (~980 lines) and defines several components inline:
- `LazyVideo` — Lazy-loading video with IntersectionObserver play/pause
- `ScrambleText` — Character-by-character text reveal animation
- `AnimatedSection` — Scroll-triggered fade-in wrapper
- `ResearchCardOverlay` — Glass distortion dots + rotating Maslow hierarchy
- `ChatPillsOverlay` — Animated floating chat bubbles with glass effects
- `ProjectsGrid` — The main 2-column project card grid
- `generateDisplacementMap()` / `generateSpecularFillMap()` / `generatePillDisplacementMap()` — Canvas-based glass effect generators using refraction math

### State Management
- Local state with `useState` for component-specific UI (menus, hover effects, slideshows)
- No external state libraries

## Code Structure Patterns

### Inline Complexity
Components tend to be self-contained with:
- Local type definitions at top of file
- Animation variants defined as objects before the component
- Helper/wrapper components defined in same file
- Longer files acceptable (Landing.tsx ~980 lines, project pages 200–500+ lines)

### Styling Approach
- All styles via Tailwind utility classes inline
- No CSS modules or separate stylesheets per component
- Global styles only in `app/globals.css`
- Responsive padding uses `clamp()` in arbitrary values: `md:px-[clamp(4rem,10vw,11rem)]`

### Data Flow
- Static project data in `data/ProjectThumbData.tsx`
- Components import data directly, no prop drilling for project info
- Chart data co-located with chart components (`components/Charts.tsx`)
- Project data fields: `id`, `title`, `tag`, `body`, `color` (fallback bg), `shadow`, `tags`, `image`, `video`, `videoMobile`, `slideshow`, `link`, `gradient`, `pixelated`

## Animation Conventions

- `useInView` with `{ once: true }` for scroll-triggered animations (fire once, never re-animate)
- `AnimatePresence` for exit animations (page transitions)
- Consistent easing: `ease: [0.25, 0.46, 0.45, 0.94]` for smooth deceleration
- Staggered card animations via `delay={i * 0.1}` on grid items
- Page transitions: entrance-only crossfade via `PageTransition.tsx` (opacity 0→1, y 8→0)
- Entrance animations: `opacity: 0 → 1` with `y: 20 → 0`, duration 0.35–0.6s
- Hover/interaction transitions: 150–200ms, no delay
- Hero scramble text: custom character randomization, delays at 500ms and 800ms
- Magnetic spring: `{ stiffness: 200, damping: 15, mass: 0.5 }`, 15% cursor strength, max 10px offset
- `prefers-reduced-motion` respected in `globals.css` (all animations collapse)

## Git Workflow

### Branches
```
main              → Production (current working branch)
design-system     → Design system docs + assets (DESIGN_SYSTEM.md, SKILL.md)
old-branch        → Stale
```

### Conventions
- All work happens on `main` currently
- One branch per concern when branching
- Branch names: `area-change` (e.g., `hero-shrink`, `projects-grid`)
- Commit messages: `branch-name: description` (e.g., `main: fix Sifty thumbnail video`)

## Known Issues

1. **Spinner videos have blue baked in**: siftyspinner, igspinner, 3dspinner, truspinner still contain bright blue backgrounds in the video files themselves. This is a manual re-render task (Shutter Encoder, H.265 with alpha) — not fixable via CSS.
2. **Performance**: Multiple autoplay looping videos + ShaderGradient (three.js) are memory-heavy. `LazyVideo` and `MainVideo` mitigate with IntersectionObserver pause/play.

## Scope Rules

**Only change what is explicitly asked for.** If asked to change the hero, do NOT also change the projects section. If asked to fix a button, do NOT also adjust animation timing. Multiple branches have been deleted because of scope creep. This is the #1 source of friction on this project.

If you notice something else that could be improved, mention it — do not implement it.
