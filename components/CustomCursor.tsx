"use client";
import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useCursor } from "./CursorContext";
import { pixelify, roboto } from "@/app/ui/fonts";

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
const PAD = 16;

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export default function CustomCursor() {
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const { cursorType, cursorData, resetCursor } = useCursor();
  const pathname = usePathname();

  const [displayData, setDisplayData] = useState<Record<string, unknown> | null>(null);
  const posRef = useRef({ x: -9999, y: -9999 });
  const modalRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const isProject = cursorType === "project";

  // Reset cursor on route change
  useEffect(() => {
    resetCursor();
  }, [pathname, resetCursor]);

  // Track mouse position and update modal via rAF (no re-renders)
  useEffect(() => {
    if (!hasFinePointer) return;
    const onPointerMove = (e: PointerEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = 0;
          const modal = modalRef.current;
          if (!modal) return;
          const { x, y } = posRef.current;
          const modalHeight = modal.offsetHeight;

          // Top-right of cursor, clamped to viewport
          let left = x + PAD;
          let top = y - modalHeight - PAD;

          // Flip left if overflows right
          if (left + MODAL_WIDTH > window.innerWidth) {
            left = x - MODAL_WIDTH - PAD;
          }
          // Flip below if overflows top
          if (top < 0) {
            top = y + PAD;
          }
          // Clamp edges
          left = Math.max(4, Math.min(left, window.innerWidth - MODAL_WIDTH - 4));
          top = Math.max(4, Math.min(top, window.innerHeight - modalHeight - 4));

          modal.style.transform = `translate(${left}px, ${top}px)`;
        });
      }
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hasFinePointer]);

  // Persist last project data so modal content doesn't vanish during exit animation
  if (isProject && cursorData && cursorData !== displayData) {
    setDisplayData(cursorData);
  }

  if (!hasFinePointer) return null;

  const tags = (displayData?.tags as string[]) || [];

  return (
    <div
      ref={modalRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: MODAL_WIDTH,
        zIndex: 999,
        pointerEvents: "none",
        willChange: "transform",
        transform: "translate(-9999px, -9999px)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          borderRadius: 16,
          overflow: "hidden",
          transform: isProject ? "scale(1)" : "scale(0)",
          opacity: isProject ? 1 : 0,
          transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.2s ease",
          transformOrigin: "top left",
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
    </div>
  );
}
