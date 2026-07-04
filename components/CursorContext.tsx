"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CursorContextValue {
  label: string | null;
  setLabel: (label: string | null) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [label, setLabel] = useState<string | null>(null);
  return (
    <CursorContext.Provider value={{ label, setLabel }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return ctx;
}
