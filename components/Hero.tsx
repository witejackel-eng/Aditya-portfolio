"use client";

import dynamic from "next/dynamic";
import ParticleNetwork from "./ParticleNetwork";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import StatCounter from "./StatCounter";
import { useCursor } from "./CursorContext";
import { profile, contact, caseStudies } from "@/lib/data";

const HeroScene = dynamic(() => import("./canvas/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const { setLabel } = useCursor();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-10 md:pt-32"
    >
      <div className="absolute inset-0">
        <ParticleNetwork />
      </div>

      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="relative z-10 max-w-[70%] px-6 md:max-w-[46%] md:px-10">
        <Reveal
          as="div"
          trigger="load"
          delay={0.1}
          className="font-sans text-xs uppercase tracking-mega text-muted"
        >
          {profile.title}
        </Reveal>
      </div>

      <div className="relative z-10 max-w-[78%] px-6 md:max-w-[52%] md:px-10">
        <h1 className="font-sans font-medium leading-[0.82] tracking-tightest text-foreground">
          <Reveal
            as="span"
            trigger="load"
            delay={0.2}
            duration={1.1}
            className="text-[clamp(4rem,13vw,11rem)]"
          >
            ADITYA
          </Reveal>
        </h1>
      </div>

      <div className="relative z-10 flex max-w-[70%] flex-col gap-6 px-6 md:max-w-[44%] md:px-10">
        <Reveal
          as="p"
          trigger="load"
          delay={0.5}
          duration={0.9}
          className="font-sans text-[clamp(1.05rem,2.1vw,1.4rem)] font-light leading-snug text-foreground/90"
        >
          {profile.impact}
        </Reveal>

        <Reveal
          as="div"
          trigger="load"
          delay={0.6}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-xs uppercase tracking-mega text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for projects
          </span>
          <span className="flex items-center gap-1 normal-case text-foreground">
            <StatCounter value={caseStudies.length} trigger="load" />
            <span className="text-muted">shipped case studies</span>
          </span>
          <span>{profile.stack}</span>
        </Reveal>

        <Reveal as="div" trigger="load" delay={0.7} className="flex items-center gap-6 pt-2">
          <MagneticButton
            strength={0.25}
            onHoverStart={() => setLabel("View")}
            onHoverEnd={() => setLabel(null)}
          >
            <a
              href="#work"
              className="font-sans text-sm font-medium uppercase tracking-mega text-foreground transition-opacity duration-300 hover:opacity-60"
            >
              View the work →
            </a>
          </MagneticButton>
          <MagneticButton
            strength={0.25}
            onHoverStart={() => setLabel("Say hi")}
            onHoverEnd={() => setLabel(null)}
          >
            <a
              href={`mailto:${contact.email}`}
              className="font-sans text-xs uppercase tracking-mega text-muted transition-opacity duration-300 hover:opacity-60"
            >
              Get in touch
            </a>
          </MagneticButton>
        </Reveal>
      </div>

      <div className="relative z-10 flex items-center justify-end px-6 md:px-10">
        <Reveal
          as="div"
          trigger="load"
          delay={0.85}
          className="font-sans text-xs uppercase tracking-mega text-muted"
        >
          Scroll to explore ↓
        </Reveal>
      </div>
    </section>
  );
}
