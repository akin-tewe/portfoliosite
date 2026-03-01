# Liquid Glass Effect — Implementation Reference

Based on [kube.io's Liquid Glass article](https://kube.io/blog/liquid-glass-css-svg/). Validated in Chrome and Vivaldi.

## Working Test File

`/public/glass-test.html` — standalone HTML file, open at `localhost:3000/glass-test.html`

---

## Architecture

The effect uses **two canvas-generated images** combined in an **SVG filter pipeline**, applied via `backdrop-filter: url(#filterId)` (Chromium-only).

### Pipeline

```
SourceGraphic (backdrop behind element)
  → feImage (displacement map)
  → feDisplacementMap (warps backdrop pixels)
  → feColorMatrix saturate=1.3 (boost colors through glass)
  → feImage (specular + fill map)
  → feBlend mode="screen" (overlay highlight on refracted result)
  → final output
```

### SVG Filter Structure

```html
<svg width="0" height="0" style="position:absolute;" colorInterpolationFilters="sRGB">
  <defs>
    <filter id="glass-circle">
      <feImage id="fi-disp" x="0" y="0" width="150" height="150"
               result="disp_map" preserveAspectRatio="none" />
      <feDisplacementMap in="SourceGraphic" in2="disp_map"
                        xChannelSelector="R" yChannelSelector="G"
                        scale="35" result="refracted" />
      <feColorMatrix in="refracted" type="saturate" values="1.3" result="saturated" />
      <feImage id="fi-spec" x="0" y="0" width="150" height="150"
               result="specular" preserveAspectRatio="none" />
      <feBlend in="saturated" in2="specular" mode="screen" />
    </filter>
  </defs>
</svg>
```

### CSS Application

```css
.glass-dot {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  backdrop-filter: url(#glass-circle);
  -webkit-backdrop-filter: url(#glass-circle);
}
```

---

## Critical Implementation Details

These are the bugs that broke earlier attempts:

| Issue | Wrong | Right |
|---|---|---|
| `feImage` dimensions | `width="100%" height="100%"` | `width="60" height="60"` (match element px) |
| `colorInterpolationFilters` | On `<filter>` or missing | On `<svg>` element |
| `scale` value | Arbitrary math on maxDisplacement | Direct pixel value (e.g. `15`) |
| `backdrop-filter` | `url(#id) blur(2px)` chained | `url(#id)` alone |
| Specular | CSS radial-gradient pseudo-element | Canvas-generated image in SVG filter |

---

## Validated Parameters

### Displacement Map

| Parameter | Value | Notes |
|---|---|---|
| Map resolution | 256×256 | Canvas size for generation. feImage width/height must match rendered element size (e.g. 150×150 for dots). |
| Surface function | Convex squircle | `(1-(1-x)^4)^(1/4)` — Apple's preferred |
| Bezel ratio | 0.4 | 40% of radius is curved bezel |
| n1 (air) | 1.0 | |
| n2 (glass) | 1.5 | |
| Glass thickness | 1.0 | Multiplier on surface height |
| Filter scale | 35 | Pixels of max displacement shift |

### Encoding

- R channel = X displacement, G channel = Y displacement
- 128 = neutral (no shift), 0 = -1, 255 = +1
- `scale` attribute multiplies normalized values back to real pixels
- Outside circle: all channels = 128 (neutral)

### Pre-calculation

127 samples along one radius (matches 8-bit channel resolution). For each:
1. Get surface height at distance from edge
2. Numerical derivative → angle of incidence
3. Snell's law → refracted angle
4. Displacement = height × tan(refracted angle)
5. Normalize all by max magnitude

Direction is always radial from center (for circles).

### Specular + Fill Map

| Parameter | Value | Notes |
|---|---|---|
| Primary light | -120° | Upper-left |
| Secondary light | 60° | Lower-right |
| Primary intensity | 1.0 | |
| Secondary intensity | 0.3 | Dimmer opposite rim |
| Specular power | 6 | Lower = wider arc spread along rim |
| Specular brightness | 3.5 | Overall multiplier |
| Edge radial falloff | `(max(0, 1 - t*5))^3` | Outer ~20% of bezel, cubic |
| Fill opacity | 18% | Milky glass overlay |
| Fill edge boost | 10% | Extra near bezel |
| Fill color | rgb(240, 240, 240) | Neutral gray, no color tint |
| Rim color | rgb(245, 245, 245) | Neutral gray, no color tint |

### Specular Logic

For each pixel in the circle:
1. **Edge factor**: cubic falloff restricting highlight to outer 20% of bezel (radially thin)
2. **Normal direction**: radial outward from center (`atan2(dy, dx)`)
3. **Dot product** with each light direction → `max(0, dot)^power` × intensity
4. **Combine** both lights × edge factor × brightness
5. **Blend** with fill: specular pixels use rim tint color, fill pixels use blue-white

---

## Browser Compatibility

- **Chrome / Vivaldi / Edge**: Full effect via `backdrop-filter: url(#svgFilter)`
- **Safari / Firefox**: `backdrop-filter: url()` with SVG filters not supported. Fallback to `backdrop-filter: blur(4px)` + CSS border/shadow

---

## Integration Notes

For React/Next.js:
- Generate both canvas maps in `useEffect` (client-side only, needs `document`)
- Store data URLs in state
- SVG filter lives once in the component, dots reference it by ID
- `feImage` `width`/`height` must match rendered dot size in pixels
- If dot size changes, regenerate maps AND update `feImage` dimensions

### Constants (as implemented in Landing.tsx — Circular Dots)

```typescript
const GLASS_MAP_SIZE = 256;      // canvas resolution for map generation
const GLASS_DOT_SIZE = 150;      // rendered dot size & feImage dimensions
const GLASS_BEZEL_RATIO = 0.4;   // 40% of radius is curved bezel
const GLASS_N1 = 1.0;            // air refractive index
const GLASS_N2 = 1.5;            // glass refractive index
const GLASS_SCALE = 35;          // feDisplacementMap scale (pixels of shift)
const GLASS_SURFACE = (t: number) => Math.pow(1 - Math.pow(1 - t, 4), 0.25);
```

---

## Glass Pills — Stadium Shape Variant

Added for the YourRage card. Same physics as the circular glass dots but shaped as a pill (stadium / rounded rectangle with semicircular end caps).

### Key Difference: Distance Calculation

The circular version measures distance from each pixel to the **center** of the circle. The pill version measures distance from each pixel to the **nearest point on the stadium centerline**.

```
Circle:  dist = sqrt((x - center)² + (y - center)²)

Pill:    cx = clamp(x, capRadius, width - capRadius)  // nearest point on flat centerline
         cy = capRadius                                 // vertical center
         dist = sqrt((x - cx)² + (y - cy)²)
```

The centerline runs horizontally through the middle. In the flat section (between the two end caps), `cx` equals `x`, so `dx=0` and only vertical distance matters — this gives uniform glass fill across the middle. At the rounded ends, the math converges to circular, producing identical bezel/rim to the dots.

### Validated Parameters

| Parameter | Value | Notes |
|---|---|---|
| Map resolution | `width × height` of pill | e.g. 300×50. NOT a fixed square. |
| Cap radius | `height / 2` | End caps are semicircles |
| Bezel width | `capRadius × GLASS_BEZEL_RATIO` (0.4) | Same ratio as dots |
| Surface function | Same | `(1-(1-x)^4)^(1/4)` |
| n1, n2 | 1.0, 1.5 | Same Snell's law |
| Filter scale | **60** | Higher than dots (35) — pills need more displacement to look right at their size |
| Saturate | 1.3 | Same as dots |
| Specular model | Identical | Same lights, same power, same fill |

### Generator Functions

#### `generatePillDisplacementMap(width: number, height: number): string`

Returns a data URL of the displacement map canvas.

```typescript
function generatePillDisplacementMap(width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  const capRadius = height / 2;
  const bezelWidth = capRadius * GLASS_BEZEL_RATIO;

  // Pre-compute displacement lookup (same physics as circular)
  const displacements: number[] = [];
  for (let i = 0; i <= 127; i++) {
    const t = i / 127;
    const h = GLASS_SURFACE(t);
    const delta = 0.001;
    const h1 = GLASS_SURFACE(Math.max(0, t - delta));
    const h2 = GLASS_SURFACE(Math.min(1, t + delta));
    const derivative = (h2 - h1) / (2 * delta);
    const incidentAngle = Math.atan(Math.abs(derivative));
    const sinRefracted = (GLASS_N1 / GLASS_N2) * Math.sin(incidentAngle);
    if (Math.abs(sinRefracted) >= 1) { displacements.push(0); continue; }
    const refractedAngle = Math.asin(sinRefracted);
    displacements.push(h * Math.tan(refractedAngle) * (derivative >= 0 ? -1 : 1));
  }
  const maxMag = Math.max(...displacements.map(Math.abs));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Stadium distance: nearest point on centerline
      const cx = Math.max(capRadius, Math.min(width - capRadius, x));
      const cy = capRadius;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist >= capRadius) {
        data[idx] = 128; data[idx+1] = 128; data[idx+2] = 128; data[idx+3] = 255;
        continue;
      }

      const t = Math.min((capRadius - dist) / bezelWidth, 1);
      const normalizedMag = maxMag === 0 ? 0 : displacements[Math.round(t * 127)] / maxMag;
      const angle = Math.atan2(dy, dx);
      data[idx]   = Math.round(Math.max(0, Math.min(255, 128 + Math.cos(angle) * normalizedMag * 127)));
      data[idx+1] = Math.round(Math.max(0, Math.min(255, 128 + Math.sin(angle) * normalizedMag * 127)));
      data[idx+2] = 128;
      data[idx+3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}
```

#### `generatePillSpecularFillMap(width: number, height: number): string`

```typescript
function generatePillSpecularFillMap(width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  const capRadius = height / 2;
  const bezelWidth = capRadius * GLASS_BEZEL_RATIO;

  const light1 = { x: Math.cos(-120 * Math.PI / 180), y: Math.sin(-120 * Math.PI / 180) };
  const light2 = { x: Math.cos(60 * Math.PI / 180), y: Math.sin(60 * Math.PI / 180) };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      const cx = Math.max(capRadius, Math.min(width - capRadius, x));
      const cy = capRadius;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist >= capRadius) {
        data[idx] = 0; data[idx+1] = 0; data[idx+2] = 0; data[idx+3] = 0;
        continue;
      }

      const t = Math.min((capRadius - dist) / bezelWidth, 1);
      const fillAlpha = (0.18 + (1 - t) * 0.10) * 255;

      const edgeFactor = Math.pow(Math.max(0, 1 - t * 5), 3);
      const nx = dist > 0 ? dx / dist : 0;
      const ny = dist > 0 ? dy / dist : 0;
      const spec1 = Math.pow(Math.max(0, nx * light1.x + ny * light1.y), 6) * 1.0;
      const spec2 = Math.pow(Math.max(0, nx * light2.x + ny * light2.y), 6) * 0.3;
      const specAlpha = Math.min(255, (spec1 + spec2) * edgeFactor * 3.5 * 255);

      const totalAlpha = Math.min(255, specAlpha + fillAlpha);
      if (totalAlpha < 1) {
        data[idx] = 0; data[idx+1] = 0; data[idx+2] = 0; data[idx+3] = 0;
        continue;
      }

      const sw = specAlpha / totalAlpha;
      data[idx]   = Math.round(245 * sw + 240 * (1 - sw));
      data[idx+1] = Math.round(245 * sw + 240 * (1 - sw));
      data[idx+2] = Math.round(245 * sw + 240 * (1 - sw));
      data[idx+3] = Math.round(totalAlpha);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}
```

### SVG Filter Structure (Pill)

```html
<svg style="position:absolute; width:0; height:0" colorInterpolationFilters="sRGB">
  <defs>
    <filter id="glass-pill-yr" x="0%" y="0%" width="100%" height="100%">
      <feImage href="{pillDispUrl}" x="0" y="0"
              width="{PILL_WIDTH}" height="{PILL_HEIGHT}"
              result="disp_map" preserveAspectRatio="none" />
      <feDisplacementMap in="SourceGraphic" in2="disp_map"
                        scale="60" xChannelSelector="R" yChannelSelector="G"
                        result="refracted" />
      <feColorMatrix in="refracted" type="saturate" values="1.3" result="saturated" />
      <feImage href="{pillSpecUrl}" x="0" y="0"
              width="{PILL_WIDTH}" height="{PILL_HEIGHT}"
              result="specular" preserveAspectRatio="none" />
      <feBlend in="saturated" in2="specular" mode="screen" />
    </filter>
  </defs>
</svg>
```

**Critical**: `feImage` width/height must be absolute pixel values matching the map generation dimensions. Percentages (`100%`) break the displacement entirely — SVG filters don't resolve percentage units on `feImage` the same way CSS does.

`preserveAspectRatio="none"` on both feImages allows the map to stretch to pills of varying content widths without regenerating. The flat middle section is uniform so stretching is visually imperceptible.

### CSS Application (Pill)

```css
.glass-pill {
  height: 50px;
  padding: 0 24px;
  border-radius: 25px;           /* height / 2 = perfect stadium */
  backdrop-filter: url(#glass-pill-yr);
  -webkit-backdrop-filter: url(#glass-pill-yr);
  background-color: rgba(0, 0, 0, 0.18);  /* subtle tint for text legibility */
}
```

No `blur()`, no `border`. The displacement filter provides all the glass material. The background tint is a legibility aid only.

### Constants (as implemented in Landing.tsx)

```typescript
const GLASS_PILL_WIDTH = 300;   // canvas map resolution width
const GLASS_PILL_HEIGHT = 50;   // canvas map resolution height & rendered pill height
const GLASS_PILL_SCALE = 60;    // feDisplacementMap scale (higher than dots' 35)
```

### Test Page

`/app/test-glass-pill/page.tsx` — side-by-side comparison of glass dot and glass pill on a colorful background. Use this to validate material parity when tuning parameters.

### Pitfalls Learned

| Issue | What Happened | Fix |
|---|---|---|
| feImage percentage dimensions | `width="100%" height="100%"` destroyed all displacement | Use absolute pixel values always |
| Low filter scale | Pills looked flat/invisible at scale=12 or 35 | Pills need scale=60 for visible refraction |
| CSS blur + SVG filter | Adding `blur(8px)` to backdrop-filter alongside SVG url | Don't chain — SVG filter alone |
| Circular maps on rectangular elements | Displacement/specular only covered center circle of pill | Generate stadium-shaped maps with pill generators |
| Fixed-width pills | All pills same size regardless of text → dead space | Use padding + auto width, let preserveAspectRatio stretch the map |
