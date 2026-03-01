"use client";
import { useMemo } from "react";
import { roboto } from "@/app/ui/fonts";

// Glass constants (same as Landing.tsx)
const GLASS_MAP_SIZE = 256;
const GLASS_BEZEL_RATIO = 0.4;
const GLASS_N1 = 1.0;
const GLASS_N2 = 1.5;
const GLASS_SCALE = 60;
const GLASS_SURFACE = (t: number) => Math.pow(1 - Math.pow(1 - t, 4), 0.25);

// --- Circular generators (from Landing.tsx) ---

function generateDisplacementMap(): string {
  const size = GLASS_MAP_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;
  const center = size / 2;
  const radius = size / 2;
  const bezelWidth = radius * GLASS_BEZEL_RATIO;

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

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - center, dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const idx = (y * size + x) * 4;
      if (dist >= radius) {
        data[idx] = 128; data[idx+1] = 128; data[idx+2] = 128; data[idx+3] = 255;
        continue;
      }
      const t = Math.min((radius - dist) / bezelWidth, 1);
      const normalizedMag = maxMag === 0 ? 0 : displacements[Math.round(t * 127)] / maxMag;
      const angle = Math.atan2(dy, dx);
      data[idx]   = Math.round(Math.max(0, Math.min(255, 128 + Math.cos(angle) * normalizedMag * 127)));
      data[idx+1] = Math.round(Math.max(0, Math.min(255, 128 + Math.sin(angle) * normalizedMag * 127)));
      data[idx+2] = 128; data[idx+3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

function generateSpecularFillMap(): string {
  const size = GLASS_MAP_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;
  const center = size / 2;
  const radius = size / 2;
  const bezelWidth = radius * GLASS_BEZEL_RATIO;

  const light1 = { x: Math.cos(-120 * Math.PI / 180), y: Math.sin(-120 * Math.PI / 180) };
  const light2 = { x: Math.cos(60 * Math.PI / 180), y: Math.sin(60 * Math.PI / 180) };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - center, dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const idx = (y * size + x) * 4;
      if (dist >= radius) { data[idx] = 0; data[idx+1] = 0; data[idx+2] = 0; data[idx+3] = 0; continue; }

      const t = Math.min((radius - dist) / bezelWidth, 1);

      const fillAlpha = (0.18 + (1 - t) * 0.10) * 255;

      const edgeFactor = Math.pow(Math.max(0, 1 - t * 5), 3);
      const nx = dist > 0 ? dx / dist : 0;
      const ny = dist > 0 ? dy / dist : 0;
      const spec1 = Math.pow(Math.max(0, nx * light1.x + ny * light1.y), 6) * 1.0;
      const spec2 = Math.pow(Math.max(0, nx * light2.x + ny * light2.y), 6) * 0.3;
      const specAlpha = Math.min(255, (spec1 + spec2) * edgeFactor * 3.5 * 255);

      const totalAlpha = Math.min(255, specAlpha + fillAlpha);
      if (totalAlpha < 1) { data[idx] = 0; data[idx+1] = 0; data[idx+2] = 0; data[idx+3] = 0; continue; }

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

// --- Pill-shaped generators ---

function generatePillDisplacementMap(width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  const capRadius = height / 2;
  const bezelWidth = capRadius * GLASS_BEZEL_RATIO;

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

const PILL_WIDTH = 220;
const PILL_HEIGHT = 48;
const DOT_SIZE = 150;

export default function TestGlassPill() {
  const pillMaps = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return {
      dispUrl: generatePillDisplacementMap(PILL_WIDTH, PILL_HEIGHT),
      specUrl: generatePillSpecularFillMap(PILL_WIDTH, PILL_HEIGHT),
    };
  }, []);

  const dotMaps = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return {
      dispUrl: generateDisplacementMap(),
      specUrl: generateSpecularFillMap(),
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gap-12 p-12" style={{ background: '#111' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <h1 className={`${roboto.className} relative z-10 text-white text-3xl font-bold drop-shadow-lg`}>Glass Pill vs Glass Dot Comparison</h1>

      {/* SVG Filters */}
      {pillMaps && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }} colorInterpolationFilters="sRGB">
          <defs>
            <filter id="glass-pill-test" x="0%" y="0%" width="100%" height="100%">
              <feImage href={pillMaps.dispUrl} x="0" y="0" width={PILL_WIDTH} height={PILL_HEIGHT} result="disp_map" preserveAspectRatio="none" />
              <feDisplacementMap in="SourceGraphic" in2="disp_map" scale={GLASS_SCALE} xChannelSelector="R" yChannelSelector="G" result="refracted" />
              <feColorMatrix in="refracted" type="saturate" values="1.3" result="saturated" />
              <feImage href={pillMaps.specUrl} x="0" y="0" width={PILL_WIDTH} height={PILL_HEIGHT} result="specular" preserveAspectRatio="none" />
              <feBlend in="saturated" in2="specular" mode="screen" />
            </filter>
          </defs>
        </svg>
      )}
      {dotMaps && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }} colorInterpolationFilters="sRGB">
          <defs>
            <filter id="glass-dot-test" x="0%" y="0%" width="100%" height="100%">
              <feImage href={dotMaps.dispUrl} x="0" y="0" width={DOT_SIZE} height={DOT_SIZE} result="disp_map" preserveAspectRatio="none" />
              <feDisplacementMap in="SourceGraphic" in2="disp_map" scale={GLASS_SCALE} xChannelSelector="R" yChannelSelector="G" result="refracted" />
              <feColorMatrix in="refracted" type="saturate" values="1.3" result="saturated" />
              <feImage href={dotMaps.specUrl} x="0" y="0" width={DOT_SIZE} height={DOT_SIZE} result="specular" preserveAspectRatio="none" />
              <feBlend in="saturated" in2="specular" mode="screen" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Glass Dot for reference */}
      <div className="relative z-10">
        <p className={`${roboto.className} text-white/60 text-sm mb-3 text-center drop-shadow-lg`}>Glass Dot (reference)</p>
        <div style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '50%',
          backdropFilter: 'url(#glass-dot-test)',
          WebkitBackdropFilter: 'url(#glass-dot-test)',
        }} />
      </div>

      {/* Glass Pills */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <p className={`${roboto.className} text-white/60 text-sm mb-1 drop-shadow-lg`}>Glass Pills</p>
        {["THIS INTRO IS CRAZY", "LEGENDARY", "RAGE GOT THE BEST INTRO"].map((text, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{
              width: PILL_WIDTH,
              height: PILL_HEIGHT,
              borderRadius: PILL_HEIGHT / 2,
              backdropFilter: 'url(#glass-pill-test)',
              WebkitBackdropFilter: 'url(#glass-pill-test)',
            }}
          >
            <span className={`${roboto.className} text-white/90 text-sm font-semibold`}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
