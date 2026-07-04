"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./SectionLabel";
import BackgroundFX from "./BackgroundFX";
import Reveal from "./Reveal";
import { processSteps } from "@/lib/data";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative z-10 px-6 py-28 md:px-10 md:py-40">
      <BackgroundFX />
      <SectionLabel heading="How I Work" label="04 / Process" />

      <div ref={ref} className="relative">
        <div className="absolute bottom-2 left-[13px] top-2 w-px bg-white/10 md:left-[17px]">
          <motion.div
            style={{ scaleY }}
            className="h-full w-full origin-top bg-gradient-to-b from-accent to-foreground/30"
          />
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {processSteps.map((step) => (
            <Reveal key={step.no} as="div" className="relative pl-10 md:pl-14">
              <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-background font-sans text-[10px] uppercase tracking-wide text-muted md:h-9 md:w-9">
                {step.no}
              </span>
              <h3 className="text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium leading-tight tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
