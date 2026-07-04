"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { capabilities } from "@/lib/data";

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative z-10 px-6 py-28 md:px-10 md:py-40">
      <SectionLabel heading="Capabilities" label="03 / Where the Depth Is" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        variants={staggerContainer}
        className="flex flex-col gap-8 md:gap-10"
      >
        {capabilities.map((capability) => (
          <motion.div key={capability.label} variants={staggerItem}>
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="text-[clamp(1rem,2vw,1.3rem)] font-medium tracking-tight text-foreground">
                {capability.label}
              </h3>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-foreground to-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: capability.level / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Reveal
        as="p"
        className="mt-16 max-w-lg font-sans text-sm leading-relaxed text-muted"
      >
        A self-assessed view of where the depth is, not a scorecard — the case
        studies below are the actual evidence.
      </Reveal>
    </section>
  );
}
