"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

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

  return (
    <>
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
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.35, ease: "easeOut" } }}
      />
      {/* Crisp ring — inverts over light typography and wireframe via
          mix-blend-mode so it stays legible against any background. */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.35, ease: "easeOut" } }}
      />
    </>
  );
}
