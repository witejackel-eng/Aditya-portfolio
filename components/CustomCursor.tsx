"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useCursor } from "./CursorContext";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const { label } = useCursor();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Two lag profiles: a tight, crisp spring for the ring (the precise
  // pointer read), and a looser, heavier spring for the glow behind it —
  // that separation is what reads as "organic" rather than one rigid dot.
  const ringX = useSpring(x, { stiffness: 500, damping: 38, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 500, damping: 38, mass: 0.4 });
  const glowX = useSpring(x, { stiffness: 120, damping: 22, mass: 1 });
  const glowY = useSpring(y, { stiffness: 120, damping: 22, mass: 1 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [x, y]);

  if (!enabled) return null;

  const expanded = label !== null;

  return (
    <div aria-hidden="true">
      {/* Soft trailing glow — a radial-gradient div, not a blur filter, so
          it stays cheap to composite every frame alongside the R3F canvas. */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: glowX,
          y: glowY,
          background:
            "radial-gradient(closest-side, rgba(245,245,245,0.16), transparent 72%)",
        }}
        animate={{ opacity: visible && !expanded ? 1 : 0 }}
        transition={{ opacity: { duration: 0.35, ease: "easeOut" } }}
      />
      {/* Crisp ring — inverts over light typography and 3D scene via
          mix-blend-mode so it stays legible against any background. On
          hover over an interactive zone it grows into a solid, readable
          label instead — blend-difference text isn't reliably legible,
          so that trick is deliberately dropped for the expanded state. */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, mixBlendMode: expanded ? "normal" : "difference" }}
        animate={{
          opacity: visible ? 1 : 0,
          width: expanded ? 88 : 24,
          height: expanded ? 88 : 24,
          backgroundColor: expanded ? "rgba(245,245,245,1)" : "rgba(0,0,0,0)",
          borderColor: expanded ? "rgba(245,245,245,0)" : "rgba(255,255,255,1)",
        }}
        transition={{
          opacity: { duration: 0.35, ease: "easeOut" },
          default: { type: "spring", stiffness: 300, damping: 26 },
        }}
      >
        <span
          className="font-sans text-[11px] font-medium uppercase tracking-wide text-background"
          style={{ opacity: expanded ? 1 : 0 }}
        >
          {label ?? ""}
        </span>
      </motion.div>
    </div>
  );
}
