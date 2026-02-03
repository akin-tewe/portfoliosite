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

Next.js 16 portfolio site using App Router, React 19, Tailwind CSS 4, and Framer Motion.

**Path Alias**: `@/*` maps to project root (e.g., `@/components/...`, `@/data/...`)

## Design Principles

### Visual Language
- **Brand color**: Blue (`bg-blue-500`, `bg-blue-600`) as primary accent
- **Dark theme**: Black backgrounds with white text at varying opacities (`text-white/80`, `text-white/60`, `text-white/40`)
- **Glass effects**: Semi-transparent backgrounds with `bg-white/10`, `backdrop-blur-sm`
- **Gradients**: Subtle gradients for emphasis (`bg-gradient-to-r`, `bg-gradient-to-br`)

### Typography
- `pixelify` (Pixelify Sans): Headings, buttons, UI labels - always uppercase for nav/labels
- `roboto`: Body text, descriptions - uses `font-light` weight
- Apply font classes directly: `${pixelify.className}`, `${roboto.className}`

### Responsive Approach
- Mobile-first with Tailwind breakpoints (`md:`, `lg:`)
- Layouts shift from stacked (`flex-col`) to side-by-side (`md:flex-row`)
- Viewport-relative sizing common (`px-[10vw]`, `w-[80vw]`)

## Component Architecture

### Page Structure
```
app/projects/[name]/page.tsx      → Server Component (metadata only)
app/projects/[name]/Component.tsx → Client Component ("use client", actual content)
```

### Client-Heavy Components
Most components use `"use client"` due to Framer Motion animations and interactivity. Keep Server Components minimal (metadata exports, simple wrappers).

### Animation Wrappers
Components define local animation wrappers rather than importing shared ones:
```tsx
function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  // ... motion.div with variants
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
- Longer files acceptable (project pages 200-500+ lines)

### Styling Approach
- All styles via Tailwind utility classes inline
- No CSS modules or separate stylesheets per component
- Global styles only in `app/globals.css`

### Data Flow
- Static project data in `data/ProjectThumbData.tsx`
- Components import data directly, no prop drilling for project info
- Chart data co-located with chart components (`components/Charts.tsx`)

## Animation Conventions

- `useInView` with `{ once: true }` for scroll-triggered animations
- `AnimatePresence` for exit animations (page transitions, carousel slides)
- Consistent easing: `ease: [0.25, 0.46, 0.45, 0.94]` for smooth curves
- Staggered animations via `staggerChildren` and `delayChildren` in variants
- Page transitions: `show(); setTimeout(hide, 800)` pattern on all navigation clicks
