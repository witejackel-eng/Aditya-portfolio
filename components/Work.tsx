"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { caseStudies } from "@/lib/data";

function LayoutMock({ variant }: { variant: number }) {
  return (
    <div className="relative flex h-56 w-full flex-col gap-2 overflow-hidden rounded-sm border border-white/10 bg-white/[0.02] p-4 md:h-64">
      <div className="flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      </div>

      {variant === 0 && (
        <div className="mt-2 grid flex-1 grid-cols-3 gap-2">
          <div className="col-span-1 rounded-sm bg-white/[0.06]" />
          <div className="col-span-2 flex flex-col gap-2">
            <div className="h-2/3 rounded-sm bg-white/[0.08]" />
            <div className="flex-1 rounded-sm bg-white/[0.04]" />
          </div>
        </div>
      )}

      {variant === 1 && (
        <div className="mt-2 flex flex-1 flex-col gap-2">
          <div className="h-1/3 rounded-sm bg-white/[0.08]" />
          <div className="grid flex-1 grid-cols-2 gap-2">
            <div className="rounded-sm bg-white/[0.05]" />
            <div className="rounded-sm bg-white/[0.05]" />
          </div>
        </div>
      )}

      {variant === 2 && (
        <div className="mt-2 grid flex-1 grid-cols-4 grid-rows-3 gap-2">
          <div className="col-span-4 rounded-sm bg-white/[0.08]" />
          <div className="col-span-2 row-span-2 rounded-sm bg-white/[0.05]" />
          <div className="col-span-2 rounded-sm bg-white/[0.04]" />
          <div className="col-span-2 rounded-sm bg-white/[0.06]" />
        </div>
      )}
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative z-10 px-6 py-28 md:px-10 md:py-40">
      <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-6 md:mb-20">
        <Reveal
          as="h2"
          className="text-[clamp(2rem,6vw,3.5rem)] font-medium leading-none tracking-tightest"
        >
          Work
        </Reveal>
        <Reveal
          as="span"
          className="font-sans text-xs uppercase tracking-mega text-muted"
        >
          03 / Selected Case Studies
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {caseStudies.map((project, i) => (
          <Link key={project.no} href={`/work/${project.slug}`} className="block">
            <motion.div
              whileHover={{ y: -10, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group cursor-pointer"
            >
              <motion.div
                whileHover={{ boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)" }}
              >
                <LayoutMock variant={i} />
              </motion.div>

              <div className="mt-6 flex items-baseline justify-between">
                <Reveal
                  as="span"
                  className="font-sans text-xs uppercase tracking-mega text-muted"
                >
                  {project.no} — {project.category}
                </Reveal>
              </div>
              <Reveal
                as="h3"
                className="mt-2 text-[clamp(1.3rem,2.6vw,1.8rem)] font-medium leading-tight tracking-tight text-foreground"
              >
                {project.title}
              </Reveal>
              <Reveal
                as="p"
                className="mt-3 font-sans text-sm leading-relaxed text-muted"
              >
                {project.description}
              </Reveal>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 font-sans text-[11px] uppercase tracking-wide text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
