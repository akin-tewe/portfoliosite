"use client";
import React from "react";
import { pixelify, roboto, instrumentSerif } from "@/app/ui/fonts";

import projectsdata from "@/data/ProjectThumbData";
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLoader } from "@/components/LoaderContext";
import { MainVideo } from "@/components/SplashVideo";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo, memo, useSyncExternalStore } from "react";
import { useCursor } from "@/components/CursorContext";
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';


const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function LazyVideo({ src, srcFallback, playbackRate, className }: {
  src: string;
  srcFallback?: string;
  playbackRate?: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, { margin: "200px" });
  const [ready, setReady] = useState(false);

  // Delay start so hero splash gets the decoder first
  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (ready && isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [ready, isInView]);

  useEffect(() => {
    if (ref.current && playbackRate) {
      ref.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
    >
      {/* HEVC alpha for Safari */}
      {src.endsWith('.mp4') ? (
        <source src={src} type="video/mp4;codecs=hvc1" />
      ) : srcFallback?.endsWith('.mp4') ? (
        <source src={srcFallback} type="video/mp4;codecs=hvc1" />
      ) : null}
      {src.endsWith('.webm') ? (
        <source src={src} type="video/webm" />
      ) : srcFallback?.endsWith('.webm') ? (
        <source src={srcFallback} type="video/webm" />
      ) : null}
      {/* H.264 fallback for Chrome (can't play HEVC) */}
      {src.endsWith('.mp4') && (
        <source src={src} type="video/mp4" />
      )}
      {srcFallback?.endsWith('.mp4') && (
        <source src={srcFallback} type="video/mp4" />
      )}
    </video>
  );
}

// Animated section wrapper
function AnimatedSection({ children, className = "", delay = 0, margin = "-80px" }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  margin?: `${number}px` | `${number}px ${number}px ${number}px ${number}px`;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(text.replace(/[^ ]/g, '#'));
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeout = setTimeout(() => {
      let iteration = 0;
      intervalId = setInterval(() => {
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        iteration += 1/3;
        if (iteration >= text.length) {
          clearInterval(intervalId!);
          intervalId = null;
        }
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay]);

  return <span>{display}</span>;
}

const maslowLevels = [
  { dots: 5, label: "physiological", colors: { color1: "#38bdf8", color2: "#0ea5e9", color3: "#0284c7" } },
  { dots: 4, label: "safety", colors: { color1: "#38bdf8", color2: "#0ea5e9", color3: "#0284c7" } },
  { dots: 3, label: "belonging", colors: { color1: "#38bdf8", color2: "#0ea5e9", color3: "#0284c7" } },
  { dots: 2, label: "esteem", colors: { color1: "#38bdf8", color2: "#0ea5e9", color3: "#0284c7" } },
  { dots: 1, label: "self-actualization", colors: { color1: "#38bdf8", color2: "#0ea5e9", color3: "#0284c7" } },
];

// --- Liquid Glass: see /docs/liquid-glass-reference.md for full details ---
const GLASS_MAP_SIZE = 256;
const GLASS_DOT_SIZE = 75;
const GLASS_BEZEL_RATIO = 0.4;
const GLASS_N1 = 1.0;
const GLASS_N2 = 1.5;
const GLASS_SCALE = 35; // px of max displacement shift
const GLASS_SURFACE = (t: number) => Math.pow(1 - Math.pow(1 - t, 4), 0.25);
const GLASS_PILL_WIDTH = 300;
const GLASS_PILL_HEIGHT = 50;
const GLASS_PILL_SCALE = 60;

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

  // Dual light sources
  const light1 = { x: Math.cos(-120 * Math.PI / 180), y: Math.sin(-120 * Math.PI / 180) }; // upper-left
  const light2 = { x: Math.cos(60 * Math.PI / 180), y: Math.sin(60 * Math.PI / 180) };     // lower-right

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - center, dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const idx = (y * size + x) * 4;
      if (dist >= radius) { data[idx] = 0; data[idx+1] = 0; data[idx+2] = 0; data[idx+3] = 0; continue; }

      const t = Math.min((radius - dist) / bezelWidth, 1);

      // Glass fill: 18% milky + 10% extra near edges
      const fillAlpha = (0.18 + (1 - t) * 0.10) * 255;

      // Rim specular: outer 20% of bezel, cubic falloff
      const edgeFactor = Math.pow(Math.max(0, 1 - t * 5), 3);
      const nx = dist > 0 ? dx / dist : 0;
      const ny = dist > 0 ? dy / dist : 0;
      const spec1 = Math.pow(Math.max(0, nx * light1.x + ny * light1.y), 6) * 1.0;
      const spec2 = Math.pow(Math.max(0, nx * light2.x + ny * light2.y), 6) * 0.3;
      const specAlpha = Math.min(255, (spec1 + spec2) * edgeFactor * 3.5 * 255);

      const totalAlpha = Math.min(255, specAlpha + fillAlpha);
      if (totalAlpha < 1) { data[idx] = 0; data[idx+1] = 0; data[idx+2] = 0; data[idx+3] = 0; continue; }

      const sw = specAlpha / totalAlpha;
      data[idx]   = Math.round(245 * sw + 240 * (1 - sw)); // neutral rim + fill (no color tint)
      data[idx+1] = Math.round(245 * sw + 240 * (1 - sw));
      data[idx+2] = Math.round(245 * sw + 240 * (1 - sw));
      data[idx+3] = Math.round(totalAlpha);
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

function generatePillDisplacementMap(width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  // Stadium shape: the radius of the end caps = half the height
  const capRadius = height / 2;
  // The flat segment runs from capRadius to (width - capRadius)
  const bezelWidth = capRadius * GLASS_BEZEL_RATIO;

  // Pre-compute displacement lookup (same physics as circular version)
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

      // Nearest point on the stadium centerline (y = capRadius, x clamped to flat segment)
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

function GlassDot() {
  return (
    <div style={{
      width: GLASS_DOT_SIZE,
      height: GLASS_DOT_SIZE,
      borderRadius: '50%',
      backdropFilter: 'url(#glass-circle)',
      WebkitBackdropFilter: 'url(#glass-circle)',
    }} />
  );
}

const RESEARCH_GRADIENT_CONFIG = {
  control: "props",
  animate: "on",
  brightness: 3.8,
  cAzimuthAngle: 180,
  cDistance: 4.5,
  cPolarAngle: 90,
  cameraZoom: 1,
  color1: "#f4eef7",
  color2: "#ffffff",
  color3: "#f5eef0",
  envPreset: "lobby",
  fov: 80,
  grain: "off",
  lightType: "3d",
  pixelDensity: 1,
  positionX: -0.5,
  positionY: 0.1,
  positionZ: 0,
  range: "disabled",
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 235,
  shader: "defaults",
  type: "waterPlane",
  uAmplitude: 0,
  uDensity: 1.1,
  uFrequency: 5.5,
  uSpeed: 0.08,
  uStrength: 2.4,
  uTime: 0.2,
  wireframe: false,
};


// Fixed positions for each dot count — 6 slots, null = inactive (scales to 0)
// Coordinates are offsets from center of the container
const DOT_LAYOUTS: Record<number, Array<{ x: number; y: number } | null>> = {
  5: [
    { x: -42, y: -85 },  { x: 42, y: -85 },
    { x: 0, y: 0 },      null,
    { x: -42, y: 85 },   { x: 42, y: 85 },
  ],
  4: [
    { x: -42, y: -42 },  { x: 42, y: -42 },
    { x: -42, y: 42 },   { x: 42, y: 42 },
    null,                 null,
  ],
  3: [
    { x: 42, y: -70 },   null,
    { x: 0, y: 0 },      null,
    { x: -42, y: 70 },   null,
  ],
  2: [
    { x: 0, y: -42 },    null,
    { x: 0, y: 42 },     null,
    null,                 null,
  ],
  1: [
    { x: 0, y: 0 },      null,
    null,                 null,
    null,                 null,
  ],
};

function DotField({ count }: { count: number }) {
  const layout = DOT_LAYOUTS[count] || DOT_LAYOUTS[1];
  return (
    <div className="relative" style={{ width: GLASS_DOT_SIZE * 2 + 16, height: GLASS_DOT_SIZE * 3 + 32 }}>
      {layout.map((pos, i) => (
        <motion.div
          key={i}
          animate={{
            x: pos ? pos.x : 0,
            y: pos ? pos.y : 0,
            scale: pos ? 1 : 0,
          }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -(GLASS_DOT_SIZE / 2),
            marginTop: -(GLASS_DOT_SIZE / 2),
          }}
        >
          <GlassDot />
        </motion.div>
      ))}
    </div>
  );
}


const ResearchCardOverlay = memo(function ResearchCardOverlay() {
  const [index, setIndex] = useState(0);
  const isClient = useIsClient();

  const filterMaps = useMemo(() => {
    if (!isClient) return null;
    return {
      dispUrl: generateDisplacementMap(),
      specUrl: generateSpecularFillMap(),
    };
  }, [isClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % maslowLevels.length);
    }, 3300);
    return () => clearInterval(interval);
  }, []);

  const level = maslowLevels[index];

  return (
    <>
      {/* Soft pastel gradient — bottom layer */}
      <div className="absolute inset-0 overflow-hidden">
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          pixelDensity={1}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ShaderGradient {...RESEARCH_GRADIENT_CONFIG as any} {...level.colors} />
        </ShaderGradientCanvas>
      </div>

      {/* Maslow level text — behind glass dots */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={level.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`${instrumentSerif.className} text-4xl md:text-5xl text-white/60 tracking-normal text-center lowercase`}
          >
            {level.label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Glass dots overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* SVG filter */}
        {filterMaps && (
          <svg style={{ position: 'absolute', width: 0, height: 0 }} colorInterpolationFilters="sRGB">
            <defs>
              <filter id="glass-circle" x="0%" y="0%" width="100%" height="100%">
                <feImage
                  href={filterMaps.dispUrl}
                  x="0" y="0"
                  width={GLASS_DOT_SIZE} height={GLASS_DOT_SIZE}
                  result="disp_map"
                  preserveAspectRatio="none"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="disp_map"
                  scale={GLASS_SCALE}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="refracted"
                />
                <feColorMatrix in="refracted" type="saturate" values="1.3" result="saturated" />
                <feImage
                  href={filterMaps.specUrl}
                  x="0" y="0"
                  width={GLASS_DOT_SIZE} height={GLASS_DOT_SIZE}
                  result="specular"
                  preserveAspectRatio="none"
                />
                <feBlend in="saturated" in2="specular" mode="screen" />
              </filter>
            </defs>
          </svg>
        )}

        <DotField count={level.dots} />
      </div>
    </>
  );
});


const CHAT_PILLS = [
  "THIS INTRO IS CRAZY",
  "LEGENDARY",
  "the mechanical legs 🦿",
  "PLAY IT BACK",
  "W W W W W",
  "who made this??",
  "RAGE GOT THE BEST INTRO",
  "the animation is insane",
  "YOOOOO",
  "brooo the 3D",
  "chat we are so back",
  "NEW INTRO HYPE",
  "whoever animated this W",
  "the chase scene tho",
  "actual movie quality",
];

const ChatPillsOverlay = memo(function ChatPillsOverlay() {
  const isClient = useIsClient();

  const pillMaps = useMemo(() => {
    if (!isClient) return null;
    return {
      dispUrl: generatePillDisplacementMap(GLASS_PILL_WIDTH, GLASS_PILL_HEIGHT),
      specUrl: generatePillSpecularFillMap(GLASS_PILL_WIDTH, GLASS_PILL_HEIGHT),
    };
  }, [isClient]);

  if (!isClient || !pillMaps) return null;

  return (
    <>
      <style>{`
        @keyframes floatUpPill {
          0% {
            bottom: -50px;
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          70% {
            opacity: 0.85;
          }
          100% {
            bottom: calc(100% + 50px);
            opacity: 0;
          }
        }
      `}</style>

      {/* Dark vignette overlay */}
      <div
        className="absolute inset-0 z-[12] pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 120px 50px rgba(0, 0, 0, 0.7)',
        }}
      />

      {/* Glass pills — right half */}
      <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
        {/* SVG filter for glass pills */}
        {pillMaps && (
          <svg style={{ position: 'absolute', width: 0, height: 0 }} colorInterpolationFilters="sRGB">
            <defs>
              <filter id="glass-pill-yr" x="0%" y="0%" width="100%" height="100%">
                <feImage
                  href={pillMaps.dispUrl}
                  x="0" y="0"
                  width={GLASS_PILL_WIDTH} height={GLASS_PILL_HEIGHT}
                  result="disp_map"
                  preserveAspectRatio="none"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="disp_map"
                  scale={GLASS_PILL_SCALE}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="refracted"
                />
                <feColorMatrix in="refracted" type="saturate" values="1.3" result="saturated" />
                <feImage
                  href={pillMaps.specUrl}
                  x="0" y="0"
                  width={GLASS_PILL_WIDTH} height={GLASS_PILL_HEIGHT}
                  result="specular"
                  preserveAspectRatio="none"
                />
                <feBlend in="saturated" in2="specular" mode="screen" />
              </filter>
            </defs>
          </svg>
        )}

        {/* Animated floating pills — right half */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] [--pill-scale:0.4] md:[--pill-scale:0.45] lg:[--pill-scale:0.55]">
          {CHAT_PILLS.slice(0, 6).map((text, i) => (
            <div
              key={i}
              className="flex items-center justify-center absolute"
              style={{
                height: GLASS_PILL_HEIGHT,
                borderRadius: GLASS_PILL_HEIGHT / 2,
                paddingLeft: 24,
                paddingRight: 24,
                backgroundColor: 'rgba(100, 65, 165, 0.25)',
                backdropFilter: 'url(#glass-pill-yr)',
                WebkitBackdropFilter: 'url(#glass-pill-yr)',
                right: `${8 + (i % 4) * 12}%`,
                animation: `floatUpPill ${12 + (i % 3) * 2}s linear infinite`,
                animationDelay: `${i * 2.5}s`,
                animationFillMode: 'backwards',
                transform: 'scale(var(--pill-scale, 1))',
              }}
            >
              <span className={`${roboto.className} text-white/90 text-xs md:text-sm lg:text-base font-semibold whitespace-nowrap`}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

function ProjectCard({ project, i, slideshowIndex, isSecondary }: {
  project: typeof projectsdata[number];
  i: number;
  slideshowIndex: number;
  isSecondary?: boolean;
}) {
  const { show, hide } = useLoader();
  const { setCursor, resetCursor } = useCursor();

  return (
    <AnimatedSection key={project.id} delay={i * 0.05} margin={isSecondary ? "0px 0px 0px 0px" : "-80px"}>
      <Link
          href={project.link}
          onClick={() => { resetCursor(); show(); setTimeout(hide, 800); }}
          className="group relative block"
          data-cursor="project"
          onMouseEnter={() => setCursor("project", { title: project.title, body: project.body, tags: project.tags })}
          onMouseLeave={() => resetCursor()}
        >
          <div
            className={`relative ${project.gradient ? '' : project.color} rounded-2xl overflow-hidden transition-all duration-300 ease-out
                        group-hover:-translate-y-2 ${isSecondary ? 'aspect-card-secondary' : ''}`}
            style={{ boxShadow: 'none', ...(!isSecondary ? { aspectRatio: '9/5' } : {}) }}
            onMouseEnter={(e) => {
              let shadow = project.shadow;
              if (project.id === 5 && project.slideshow) {
                shadow = slideshowIndex % project.slideshow.length === 0
                  ? 'rgba(220, 50, 50, 0.45)'
                  : 'rgba(167, 139, 250, 0.4)';
              }
              e.currentTarget.style.boxShadow = `0 20px 50px -12px ${shadow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {project.gradient && (
              <div className="absolute inset-0 overflow-hidden">
                <ShaderGradientCanvas
                  style={{
                    position: 'absolute',
                    top: project.pixelated ? '-10%' : '0',
                    left: project.pixelated ? '-10%' : '0',
                    width: project.pixelated ? '120%' : '100%',
                    height: project.pixelated ? '120%' : '100%',
                    pointerEvents: 'none',
                    ...(project.pixelated
                      ? { imageRendering: 'pixelated' as const, transform: 'scale(5)', transformOrigin: 'center' }
                      : {}),
                  }}
                  pixelDensity={project.pixelated ? 0.25 : 1}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <ShaderGradient {...project.gradient as any} />
                </ShaderGradientCanvas>
              </div>
            )}

            {project.id === 2 && <ResearchCardOverlay />}

            {project.id === 6 && (
              <div
                className="absolute inset-0 z-[12] pointer-events-none"
                style={{ boxShadow: 'inset 0 0 120px 50px rgba(0, 0, 0, 0.7)' }}
              />
            )}


            {project.image && (
              project.id === 7 ? (
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="absolute bottom-[-12%] right-0 translate-x-[15%] translate-y-[25%] object-contain z-10 pointer-events-none w-[86%] opacity-90"
                  animate={{ y: ["25%", "22%", "25%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ) : project.id === 6 ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 m-auto object-contain z-10 pointer-events-none max-w-[60%] max-h-[60%]"
                />
              )
            )}

            {project.thumbnailImages && (
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center gap-8 px-[10%] py-[8%]">
                {project.thumbnailImages.map((src: string, i: number) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className={`${i === 0 ? 'h-full' : 'h-[80%]'} w-auto object-contain`}
                  />
                ))}
              </div>
            )}

            {project.video && (
              <LazyVideo
                src={project.video}
                srcFallback={project.videoMobile}
                playbackRate={project.id === 1 ? 0.85 : undefined}
                className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
              />
            )}

            {project.slideshow && (
              <div className="absolute inset-0 z-10 overflow-hidden">
                {project.id === 3 ? (
                  <>
                    {/* Film grain overlay */}
                    <div
                      className="absolute inset-0 z-20 pointer-events-none opacity-[0.07] mix-blend-overlay"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '128px 128px',
                      }}
                    />
                    {/* Crossfade images — small centered tile */}
                    {project.slideshow.map((src: string, imgIndex: number) => (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        key={src}
                        src={src}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 m-auto max-w-[45%] max-h-[70%] object-contain transition-opacity duration-1000 ease-in-out z-10 drop-shadow-[0_8px_30px_rgba(10,22,50,0.6)]"
                        style={{
                          opacity: (slideshowIndex % project.slideshow.length) === imgIndex ? 1 : 0,
                        }}
                      />
                    ))}
                  </>
                ) : (
                  /* Original vertical slide behavior for other slideshow cards */
                  <>
                    <div
                      className="flex flex-col w-full transition-transform duration-1000 ease-in-out"
                      style={{
                        height: `${project.slideshow.length * 100}%`,
                        transform: `translateY(-${(slideshowIndex % project.slideshow.length) * (100 / project.slideshow.length)}%)`,
                      }}
                    >
                      {project.slideshow.map((src: string) => (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          key={src}
                          src={src}
                          alt=""
                          className="w-full flex-shrink-0 object-cover"
                          style={{ height: `${100 / project.slideshow.length}%` }}
                        />
                      ))}
                    </div>
                    {/* Dark vignette overlay */}
                    <div
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 100px 30px rgba(0, 0, 0, 0.45)',
                      }}
                    />
                  </>
                )}
              </div>
            )}

            <div className="absolute bottom-4 left-4 z-20 flex items-center bg-black/80 backdrop-blur-lg rounded-full shadow-sm px-4 py-2 gap-3 whitespace-nowrap">
              <span className={`${pixelify.className} text-white text-sm tracking-wider uppercase`}>
                {project.title}
              </span>
              <div className="w-px h-4 bg-white/20 hidden lg:block" />
              <span className={`${pixelify.className} text-white/50 text-xs tracking-wider uppercase hidden lg:inline`}>
                {project.tag}
              </span>
            </div>
          </div>
          {/* Mobile caption — hidden on desktop where hover modal handles this */}
          <div className="md:hidden mt-3 px-1">
            <p className={`${roboto.className} text-black/50 text-sm font-light`}>
              {project.body}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className={`${pixelify.className} text-[10px] uppercase tracking-wider text-black/40 bg-black/[0.04] rounded-full px-2.5 py-1`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
    </AnimatedSection>
  );
}

function ProjectsGrid() {
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideshowIndex(prev => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const primary = projectsdata.filter(p => p.tier === "primary");
  const secondary = projectsdata.filter(p => p.tier === "secondary");

  return (
    <>
      {/* Primary projects — 2 column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {primary.map((project, i) => (
          <ProjectCard key={project.id} project={project} i={i} slideshowIndex={slideshowIndex} />
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-6 my-12 md:my-16">
        <div className="flex-1 h-px bg-black/10" />
        <span className={`${pixelify.className} text-black/25 text-xs tracking-[0.2em] uppercase`}>
          Other Work
        </span>
        <div className="flex-1 h-px bg-black/10" />
      </div>

      {/* Secondary projects — 4 column */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-10">
        {secondary.map((project, i) => (
          <ProjectCard key={project.id} project={project} i={i} slideshowIndex={slideshowIndex} isSecondary />

        ))}
      </div>
    </>
  );
}

export default function Landing() {
  const pathname = usePathname();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="overflow-x-clip">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-fit md:min-h-[280px] md:h-[26vh] bg-[#fafafa] overflow-visible pt-20 md:pt-24 pb-8 md:pb-12"
      >
        {/* Two-column content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-[clamp(4rem,10vw,16rem)] px-6 md:pl-0 md:-ml-[1.5vw] md:pr-[clamp(1rem,3vw,2.5rem)] pt-12 md:pt-0 md:h-full relative z-10"
        >
          {/* LEFT: scramble text + credits */}
          <div className="text-left md:w-[22rem] md:flex-shrink-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 2 }}
              className={`${roboto.className} text-black/35 text-[11px] md:text-sm uppercase tracking-[0.15em] mt-8 max-w-[280px] hidden md:block`}
            >
              <span className="text-black/35">Worked with </span><span className="text-black/80">True Religion, Higround</span><span className="text-black/35"> + more</span>
            </motion.p>
          </div>

        </motion.div>

        {/* Hero Name + Worked with - Mobile */}
        <div className="md:hidden px-6 mt-auto pt-4">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`${pixelify.className} relative text-8xl text-gray-900 text-left pb-2 leading-none block`}
          >
            akin<br />tewe
          </motion.span>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 2 }}
            className={`${roboto.className} text-black/35 text-[11px] uppercase tracking-[0.15em] mt-4 text-left`}
          >
            <span className="text-black/35">Worked with </span><span className="text-black/80">True Religion, Higround</span><span className="text-black/35"> + more</span>
          </motion.p>
        </div>

        {/* Splash Video - Desktop */}
        <div key={pathname} className="absolute hidden md:block bottom-0 left-[47%] -translate-x-1/2 w-full max-w-[1600px] aspect-[1600/560] translate-y-[25%] z-50 pointer-events-none overflow-visible">
          <MainVideo webmSrc="/lowerblacksplashW.webm" mp4Src="/lowerblacksplashM.mp4" />

          {/* Bio text — positioned relative to splash video container */}
          <p className={`${roboto.className} absolute hidden 2xl:block bottom-[25%] right-[14%] text-black/50 text-base font-light leading-relaxed max-w-lg`}>
            Product Designer who treats screens like physical<br />objects; with depth, weight, and motion. I chase the<br />moments where using something feels like discovering it.
          </p>
        </div>

      </section>

      {/* Projects Section */}
      <section id="projects" className="relative px-6 md:px-[clamp(4rem,10vw,11rem)] pt-20 md:pt-28 -mt-12 md:-mt-20 pb-6 md:pb-[clamp(2rem,4vw,4rem)]">
        {/* Main Projects — 2 column grid */}
        <ProjectsGrid />
      </section>
    </div>
  );
}
