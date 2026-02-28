"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursor } from "./CursorContext";
import { pixelify, roboto } from "@/app/ui/fonts";

const BALL_SIZE = 12;
const SPRING_CONFIG = { stiffness: 800, damping: 35, mass: 0.1 };

const TAG_COLORS: Record<string, string> = {
  "UI/UX Design": "bg-sky-500/20 text-sky-300",
  "Built with Claude": "bg-orange-500/20 text-orange-300",
  "Production Ready": "bg-emerald-500/20 text-emerald-300",
  "Front End": "bg-violet-500/20 text-violet-300",
  "UX Research": "bg-rose-500/20 text-rose-300",
  "Interviews": "bg-amber-500/20 text-amber-300",
  "Commission": "bg-yellow-500/20 text-yellow-300",
  "3D Animation": "bg-cyan-500/20 text-cyan-300",
  "Branding": "bg-pink-500/20 text-pink-300",
  "Graphic Design": "bg-purple-500/20 text-purple-300",
  "Product Launch": "bg-lime-500/20 text-lime-300",
};

const MODAL_WIDTH = 280;

export default function CustomCursor() {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hasMovedOnce, setHasMovedOnce] = useState(false);
  const { cursorType, cursorData, setCursor, resetCursor } = useCursor();

  const tabVisibleRef = useRef(true);
  const lastProjectDataRef = useRef<Record<string, unknown> | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, SPRING_CONFIG);
  const springY = useSpring(cursorY, SPRING_CONFIG);

  const isProject = cursorType === "project";
  const isText = cursorType === "text";
  const isButton = cursorType === "button";

  // Check for fine pointer (desktop)
  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setHasFinePointer(mql.matches);
    const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Reduced motion preference — hide custom cursor entirely
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Pause when tab hidden
  useEffect(() => {
    const onVisibilityChange = () => { tabVisibleRef.current = !document.hidden; };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // Track mouse position
  useEffect(() => {
    if (!hasFinePointer) return;
    let rafId: number;
    const onPointerMove = (e: PointerEvent) => {
      if (!hasMovedOnce) setHasMovedOnce(true);
      if (!tabVisibleRef.current) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [hasFinePointer, hasMovedOnce, cursorX, cursorY]);

  // Hide on viewport leave
  useEffect(() => {
    if (!hasFinePointer) return;
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [hasFinePointer]);

  // Auto-detect text/button via event delegation
  useEffect(() => {
    if (!hasFinePointer) return;
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest("a, button, [role=button]");
      if (interactive) {
        if (interactive.closest("[data-cursor=project]")) return;
        if (cursorType === "project") return;
        setCursor("button");
        return;
      }

      const textEl = target.closest("h1, h2, h3, h4, h5, h6, p, span, li");
      if (textEl) {
        if (textEl.closest("a, button, [role=button], [data-cursor=project]")) return;
        if (cursorType === "project") return;
        const fontSize = parseFloat(window.getComputedStyle(textEl).fontSize);
        setCursor("text", { fontSize });
        return;
      }

      if (cursorType === "text" || cursorType === "button") {
        resetCursor();
      }
    };
    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, [hasFinePointer, cursorType, setCursor, resetCursor]);

  if (!hasFinePointer || prefersReducedMotion) return null;

  if (isProject && cursorData) {
    lastProjectDataRef.current = cursorData;
  }
  const displayData = lastProjectDataRef.current;
  const tags = (displayData?.tags as string[]) || [];
  const showCursor = visible && hasMovedOnce;

  // Dot layer dimensions (ball / beam / ring)
  const textFontSize = (cursorData?.fontSize as number) || 16;
  const beamHeight = Math.min(60, Math.max(20, Math.round(textFontSize * 1.4)));
  const beamWidth = textFontSize > 32 ? 4 : textFontSize > 20 ? 3 : 2;

  const dotWidth = isText ? beamWidth : isButton ? 40 : BALL_SIZE;
  const dotHeight = isText ? beamHeight : isButton ? 40 : BALL_SIZE;
  const dotRadius = isText ? 2 : 9999;
  const dotBg: React.CSSProperties = isButton
    ? { backgroundColor: "rgba(0, 0, 0, 0.15)", border: "1.5px solid rgba(0, 0, 0, 0.4)" }
    : isText
      ? { backgroundColor: "rgba(34, 197, 94, 0.85)" }
      : { backgroundColor: "rgba(0, 0, 0, 0.7)" };

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        zIndex: 999,
        pointerEvents: "none",
      }}
    >
      {/* Small cursor: ball / beam / ring — transitions width/height (tiny, no jank) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: dotWidth,
          height: dotHeight,
          borderRadius: dotRadius,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s cubic-bezier(0.25,0.46,0.45,0.94), height 0.2s cubic-bezier(0.25,0.46,0.45,0.94), border-radius 0.2s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.15s ease, background-color 0.15s ease",
          opacity: showCursor && !isProject ? 1 : 0,
          ...dotBg,
        }}
      />

      {/* Project modal: always full size, GPU-composited scale + opacity only */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: MODAL_WIDTH,
          backgroundColor: "#111827",
          borderRadius: 16,
          overflow: "hidden",
          transform: isProject
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0)",
          opacity: showCursor && isProject ? 1 : 0,
          transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.2s ease",
          transformOrigin: "center center",
        }}
      >
        {displayData && (
          <div className="p-5">
            {(displayData.title as string) && (
              <h4 className={`${pixelify.className} text-white text-lg uppercase tracking-wide`}>
                {displayData.title as string}
              </h4>
            )}
            <p className={`${roboto.className} text-white/60 text-sm font-light leading-relaxed ${(displayData.title as string) ? "mt-2" : "text-center"}`}>
              {displayData.body as string}
            </p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((tag: string) => (
                  <span key={tag} className={`${pixelify.className} text-xs uppercase tracking-wider ${TAG_COLORS[tag] || "text-white/50 bg-white/10"} rounded-full px-2.5 py-1`}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
