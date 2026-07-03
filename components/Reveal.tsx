"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: "load" | "scroll";
  once?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const orchestratorVariants: Variants = {
  hidden: {},
  visible: {},
};

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  duration = 0.9,
  trigger = "scroll",
  once = true,
}: RevealProps) {
  const maskVariants: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration, delay, ease: EASE },
    },
  };

  // The whileInView observer must sit on an element that never moves —
  // observing the transformed (masked) element makes it self-clip out of
  // view while hidden, so the IntersectionObserver never reports a hit.
  const viewportProps =
    trigger === "scroll"
      ? {
          whileInView: "visible",
          viewport: { once, margin: "-10% 0px -10% 0px" },
        }
      : { animate: "visible" };

  return (
    <Tag className={`block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block w-full"
        initial="hidden"
        variants={orchestratorVariants}
        {...viewportProps}
      >
        <motion.span className="inline-block w-full" variants={maskVariants}>
          {children}
        </motion.span>
      </motion.span>
    </Tag>
  );
}
