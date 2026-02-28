"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type CursorType = "default" | "text" | "project" | "button";

interface CursorContextType {
  cursorType: CursorType;
  cursorData: Record<string, unknown> | null;
  setCursor: (type: CursorType, data?: Record<string, unknown>) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: "default",
  cursorData: null,
  setCursor: () => {},
  resetCursor: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [cursorData, setCursorData] = useState<Record<string, unknown> | null>(null);

  const setCursor = useCallback((type: CursorType, data?: Record<string, unknown>) => {
    setCursorType(type);
    setCursorData(data ?? null);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorType("default");
    setCursorData(null);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorType, cursorData, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
