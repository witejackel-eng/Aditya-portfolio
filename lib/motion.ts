import type { Variants } from "framer-motion";

export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

/** Cards: staggered children entrance — used by grids (Work, Capabilities). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_EDITORIAL },
  },
};

/** Projects: slide in from the edge — used by Work row-style layouts. */
export const slideInRow: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_EDITORIAL },
  },
};

/** Hero: scale — reserved for hero-scale entrances. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_EDITORIAL },
  },
};

/** Footer/contact: plain fade — the quietest register, reserved for closing sections. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};
