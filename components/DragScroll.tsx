import React, { useRef } from "react";

type DragScrollProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DragScroll({ children, className = "" }: DragScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useRef({ down: false, startX: 0, startLeft: 0, pointerId: -1 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    state.current.down = true;
    state.current.startX = e.clientX;
    state.current.startLeft = el.scrollLeft;
    state.current.pointerId = e.pointerId;

    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !state.current.down) return;

    const dx = e.clientX - state.current.startX;
    el.scrollLeft = state.current.startLeft - dx;
  };

  const end = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    state.current.down = false;

    if (state.current.pointerId !== -1) {
      el.releasePointerCapture(state.current.pointerId);
      state.current.pointerId = -1;
    }
  };

  return (
    <div
      ref={ref}
      className={`cursor-grab active:cursor-grabbing overflow-x-auto overflow-y-hidden scrollbar-hide ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
    >
      {children}
    </div>
  );
}