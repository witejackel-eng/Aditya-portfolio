"use client";

import dynamic from "next/dynamic";
import ParticleNetwork from "./ParticleNetwork";
import Reveal from "./Reveal";
import { profile } from "@/lib/data";

const HeroScene = dynamic(() => import("./canvas/HeroScene"), {
  ssr: false,
});

export default function Hero() {
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

      <div className="relative z-10 flex items-center justify-end px-6 md:px-10">
        <Reveal
          as="div"
          trigger="load"
          delay={0.5}
          className="font-sans text-xs uppercase tracking-mega text-muted"
        >
          Scroll to explore ↓
        </Reveal>
      </div>
    </section>
  );
}
