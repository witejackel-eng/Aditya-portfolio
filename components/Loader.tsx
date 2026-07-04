"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const STAGES = [
  "Initializing Portfolio…",
  "Loading Projects…",
  "Compiling Experience…",
  "Preparing Showcase…",
  "Ready.",
];

const STAGE_DURATION = 260;

export default function Loader() {
  const [visible, setVisible] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  // Caches the show/skip decision across React Strict Mode's dev-only
  // double-invoke of this effect, so the surviving invocation still knows
  // whether to run — timers are (re)scheduled on every invocation instead,
  // since the first invocation's timers get cancelled by its own cleanup.
  const decisionRef = useRef<boolean | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (decisionRef.current === null) {
      if (sessionStorage.getItem("loader-shown")) {
        decisionRef.current = false;
      } else {
        sessionStorage.setItem("loader-shown", "1");
        decisionRef.current = !window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
      }
    }

    if (!decisionRef.current) return;

    setVisible(true);
    const timers = STAGES.map((_, i) =>
      setTimeout(() => setStageIndex(i), i * STAGE_DURATION)
    );
    timers.push(
      setTimeout(() => setVisible(false), STAGES.length * STAGE_DURATION + 150)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={stageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="font-sans text-xs uppercase tracking-mega text-muted"
            >
              {STAGES[stageIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
