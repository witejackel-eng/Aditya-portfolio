"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Shared depth layer for non-hero sections: faint grid, noise, and two slow
 * mesh-gradient glows. Absolutely positioned with a negative z-index so it
 * always paints behind static in-flow section content without needing
 * explicit z-index on every child.
 */
export default function BackgroundFX() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,245,245,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,245,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
        <filter id="bg-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-noise)" />
      </svg>

      <motion.div
        className="absolute -left-1/4 top-0 h-[36rem] w-[36rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(110,123,255,0.12), transparent)",
        }}
        animate={reduced ? undefined : { x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[32rem] w-[32rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,160,120,0.08), transparent)",
        }}
        animate={reduced ? undefined : { x: [0, -50, 20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
