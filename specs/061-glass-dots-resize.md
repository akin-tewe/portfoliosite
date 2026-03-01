# Task 061 — Enlarge Glass Dots & Remove Text Labels

## Goal
Make the Maslow hierarchy liquid glass dots bigger and remove all text labels, so the 3D Research card overlay is just centered glass circles cycling through Maslow patterns on top of the shader gradient.

## Files to Edit

### `app/Landing.tsx`

#### 1. Increase dot size and scale constants
Find these constants near the top of the glass section (around line ~72):
```ts
const GLASS_DOT_SIZE = 60;
```
```ts
const GLASS_SCALE = 15;
```

Change to:
```ts
const GLASS_DOT_SIZE = 80;
```
```ts
const GLASS_SCALE = 20;
```

The SVG filter's `<feImage>` elements already reference `GLASS_DOT_SIZE` for their `width` and `height` attributes, and `GLASS_SCALE` is used as the `<feDisplacementMap>` `scale` attribute, so both will propagate automatically.

#### 2. Increase gap between dots in DotPattern
In the `DotPattern` component, the outer wrapper and each row use `gap-3.5`. Change ALL instances of `gap-3.5` to `gap-4`:

The outer `<div>`:
```jsx
// FROM:
<div className="flex flex-col items-center justify-center gap-3.5">
// TO:
<div className="flex flex-col items-center justify-center gap-4">
```

Every row `<div>` inside the count blocks:
```jsx
// FROM (appears ~6 times):
<div className="flex gap-3.5">
// TO:
<div className="flex gap-4">
```

There are exactly 7 instances of `gap-3.5` in the DotPattern component — 1 on the outer wrapper and 6 on inner row divs. Change all 7.

#### 3. Remove text label from MaslowCycle render
Inside the `MaslowCycle` component's JSX return, find the `<AnimatePresence>` → `<motion.div>` block. It currently contains:

```jsx
<DotPattern count={level.dots} />
{level.label && (
  <span className={`${pixelify.className} text-black/40 text-sm tracking-[0.15em] uppercase`}>
    {level.label}
  </span>
)}
```

**Delete** the entire `{level.label && ( ... )}` block. Keep only:
```jsx
<DotPattern count={level.dots} />
```

#### 4. Fix motion container className
The `<motion.div>` wrapper currently has `className="flex items-center gap-5"` — the `gap-5` was spacing between the dot pattern and the text label.

Change from:
```jsx
className="flex items-center gap-5"
```
To:
```jsx
className="flex items-center justify-center"
```

## DO NOT Change
- The displacement map generation functions (`generateDisplacementMap`, `generateSpecularFillMap`)
- The SVG filter pipeline structure
- The cycling/animation logic (setInterval timing, AnimatePresence, direction state)
- The `maslowLevels` array (labels can stay in the data even though they're not rendered — no harm)
- Any other components or files

## Verification
- `npm run build` passes with zero errors
- 3D Research card shows glass dots centered on the pixelated shader gradient with no text
- Dots are visually larger (80×80px vs previous 60×60px)
- Dot patterns cycle correctly: 6→5→4→3→2→1→2→3→4→5→6→...
- SVG displacement refraction effect still renders in Chrome (backdrop-filter: url(#glass-circle))
- Specular rim highlights still visible on glass surface edges
