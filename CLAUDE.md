# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture Overview

Next.js portfolio site using App Router, React 19, Tailwind CSS 4, Framer Motion, and TypeScript.

**Path Alias**: `@/*` maps to project root (e.g., `@/components/...`, `@/data/...`)

### Site Structure
```
app/Landing.tsx                   → Landing page (hero, projects, mini projects)
app/layout.tsx                    → Root layout (renders NavBar + Footer globally)
app/globals.css                   → Global styles and CSS variables
app/ui/fonts.ts                   → Font imports (Pixelify Sans + Roboto)
app/projects/sifty/               → Main project page
app/projects/instadesign/         → Main project page
app/projects/3dresearch/          → Main project page
app/projects/truereligion/        → Main project page
app/projects/albumcover/          → Mini project page
app/projects/yourrage/            → Mini project page
app/projects/bluboyspin/          → Mini project page
app/aboutme/AboutMe.tsx           → About page
app/contactme/ContactMe.tsx       → Contact page
components/NavFoot.tsx            → Nav bar + Footer (rendered by layout.tsx)
components/Projects.tsx           → Projects carousel
components/ExtraProjects.tsx      → Mini projects section (3 rows with hover effects)
components/SplashVideo.tsx        → Transparent video component (TransparentVideo + MainVideo)
components/MagneticButton.tsx     → Magnetic hover button (AboutButton)
components/LoadingOverlay.tsx     → Page transition overlay
components/LoaderContext.tsx       → Global loading state context
components/Charts.tsx             → Chart components for project pages
components/DragScroll.tsx         → Drag-to-scroll utility
components/ProjectSummary.tsx     → Project page summary component
data/ProjectThumbData.tsx         → Static project data (titles, descriptions, links, spinner videos)
```

### Transparent Videos

The pixel art character appears throughout the site as transparent videos. These use dual-source rendering for cross-browser support:
- H.265 `.mp4` → Safari
- VP9 `.webm` → Chrome / Firefox

Rendered via `<TransparentVideo>` (inline videos like spinners) and `<MainVideo>` (hero splash) from `components/SplashVideo.tsx`.

Hero character video is absolutely positioned (`left-1/2 -translate-x-1/2`, `translate-y-[N%]`) and independent of page flow. It straddles section boundaries (bottom of hero into top of projects). Content must be designed around it — never move the video to fix a layout issue.

## Design Principles

### Color Palette — Landing Page

The landing page uses a neutral white/grey palette. Blue is NOT used on the landing page.

| Element | Value |
|---|---|
| Body background | `#ebebeb` (CSS var `--background`) |
| Hero section | `bg-gray-200` (`#e5e7eb`) |
| Carousel pill | `bg-gray-200` |
| Loading overlay | `bg-gray-200` |
| Primary text | `text-gray-800`, `text-gray-900` |
| Secondary text | `text-black/35` to `text-black/50` |
| About Me button | `bg-gray-900` |
| Nav pill (desktop) | `bg-black/80` with `backdrop-blur-lg`, `border-white/15` |
| Footer | `bg-black` |

### Color Palette — Project Pages, About, Contact

Blue and green accents are used on deeper pages only:

| Element | Value |
|---|---|
| Primary accent | `blue-500` / `#2B7FFF` |
| Secondary accent | `green-400`, `green-500` (project labels) |
| Extra projects hover | `text-blue-500` |
| About page section | `bg-black` |

### Typography
- `pixelify` (Pixelify Sans): Headings, buttons, nav, UI labels — always uppercase for nav/labels
- `roboto` (Roboto): Body text, descriptions — uses `font-light` weight
- Apply font classes directly: `${pixelify.className}`, `${roboto.className}`
- Primary text: `text-gray-800` / `text-gray-900` (never pure `#000000`)
- Secondary/credits text: `text-black/35` to `text-black/50`, uppercase, wide tracking

### Responsive Approach
- Mobile-first with Tailwind breakpoints (`md:`, `lg:`)
- Layouts shift from stacked (`flex-col`) to side-by-side (`md:flex-row`)
- Hero character video: desktop only (`hidden md:block`), mobile has its own layout
- Nav: hamburger menu on mobile, floating pill on desktop
- Projects carousel: swipe/drag on mobile, arrow buttons on desktop

## Current Landing Page Structure (top to bottom)

**Hero Section** — `bg-gray-200`
- Two-column flex row (`max-w-5xl` centered)
- Left column: scramble text animation ("UX ENGINEER" / "PRODUCT DESIGNER"), thin divider, credits line
- Right column: bio paragraph + About Me magnetic button (side by side, flex-row)
- Character video: absolutely positioned, straddles bottom of hero into projects section, `z-50`
- Mobile: "akin tewe" name block, scroll chevron, columns stack vertically

**Projects Section** — `id="projects"`, inherits body `#ebebeb`
- `<Projects />` carousel: pill-shaped card (`bg-gray-200 rounded-full`), one project at a time
- Arrow buttons (desktop) / pagination dots + swipe (mobile)
- Project name bar on desktop
- Walking animation video (`walkingprojects.mp4`)
- Mini projects label
- `<ExtraProjects />`: 3 rows (album cover, yourrage, bluboy) with hover effects

**Footer** — `bg-black` (rendered by `layout.tsx`)

**Nav** — floating pill on desktop (`bg-black/80`), hamburger on mobile (rendered by `layout.tsx`)

## Component Architecture

### Page Structure
```
app/projects/[name]/page.tsx      → Server Component (metadata only)
app/projects/[name]/Component.tsx → Client Component ("use client", actual content)
```

### Client-Heavy Components
Most components use `"use client"` due to Framer Motion animations and interactivity. Keep Server Components minimal (metadata exports, simple wrappers).

### Animation Wrappers
Components define local `AnimatedSection` wrappers rather than importing shared ones:
```tsx
function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // ... motion.div with opacity/y animation
}
```

### State Management
- `LoaderContext`: Global page transition state via React Context
- Local state with `useState` for component-specific UI (menus, carousels, hover effects)
- No external state libraries

## Code Structure Patterns

### Inline Complexity
Components tend to be self-contained with:
- Local type definitions at top of file
- Animation variants defined as objects before the component
- Helper/wrapper components defined in same file
- Longer files acceptable (project pages 200–500+ lines)

### Styling Approach
- All styles via Tailwind utility classes inline
- No CSS modules or separate stylesheets per component
- Global styles only in `app/globals.css`

### Data Flow
- Static project data in `data/ProjectThumbData.tsx`
- Components import data directly, no prop drilling for project info
- Chart data co-located with chart components (`components/Charts.tsx`)

## Animation Conventions

- `useInView` with `{ once: true }` for scroll-triggered animations (fire once, never re-animate)
- `AnimatePresence` for exit animations (page transitions, carousel slides)
- Consistent easing: `ease: [0.25, 0.46, 0.45, 0.94]` for smooth deceleration
- Staggered animations via `staggerChildren` and `delayChildren` in variants
- Page transitions: `show(); setTimeout(hide, 800)` pattern on all navigation clicks
- Entrance animations: `opacity: 0 → 1` with `y: 40 → 0`, duration 0.5–0.8s
- Hover/interaction transitions: 150–200ms, no delay
- `prefers-reduced-motion` respected in `globals.css` (all animations collapse)

## Git Workflow

### Branches
```
main              → Production baseline (original blue theme everywhere)
color-white       → Landing page converted to white/grey/neutral palette
layout-cards      → Hero merged with about section into two-column band (CURRENT)
perf-optimize     → Lazy video loading via IntersectionObserver (stale, needs rebase onto color-white)
```

### Lineage
```
main → color-white → layout-cards (current working branch)
```

### Conventions
- Always branch off the current working branch
- One branch per concern
- Branch names: `area-change` (e.g., `hero-shrink`, `projects-grid`)
- Commit messages: `branch-name: description` (e.g., `hero-shrink: compact height and column spacing`)

## Known Issues

1. **Spinner videos have blue baked in**: siftyspinner, igspinner, 3dspinner, truspinner, and walkingprojects.mp4 still contain bright blue backgrounds in the video files themselves. This is a manual re-render task (Shutter Encoder, H.265 with alpha) — not fixable via CSS.
3. **Performance**: ~800MB RAM from multiple autoplay looping videos. The `perf-optimize` branch has an IntersectionObserver fix in `SplashVideo.tsx` but needs rebasing.

## Scope Rules

**Only change what is explicitly asked for.** If asked to change the hero, do NOT also change the projects section. If asked to fix a button, do NOT also adjust animation timing. Multiple branches have been deleted because of scope creep. This is the #1 source of friction on this project.

If you notice something else that could be improved, mention it — do not implement it.
