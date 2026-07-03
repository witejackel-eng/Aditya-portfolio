"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

export default function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/10 py-5 md:py-6">
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <span
            key={i}
            className="px-4 font-sans text-lg uppercase tracking-tight text-foreground md:text-2xl"
          >
            {profile.tickerText.repeat(4)}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
