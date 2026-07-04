"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  trigger?: "load" | "scroll";
}

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  className = "",
  trigger = "scroll",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const scrolledIntoView = useInView(ref, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });
  const shouldAnimate = trigger === "load" || scrolledIntoView;

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 20, mass: 1 });

  useEffect(() => {
    if (shouldAnimate) motionValue.set(value);
  }, [shouldAnimate, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
