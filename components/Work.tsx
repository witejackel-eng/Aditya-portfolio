"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionLabel from "./SectionLabel";
import MagneticButton from "./MagneticButton";
import { useCursor } from "./CursorContext";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { projectLinks, projectGithubLinks } from "@/lib/projectLinks";

function LayoutMock({ variant }: { variant: number }) {
  return (
    <div className="relative flex h-full w-full flex-col gap-2 p-4">
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

function WorkCard({ project, variant }: { project: CaseStudy; variant: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { setLabel } = useCursor();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 24, mass: 0.6 };
  const springX = useSpring(px, spring);
  const springY = useSpring(py, spring);

  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);
  const imageX = useTransform(springX, [0, 1], [-6, 6]);
  const imageY = useTransform(springY, [0, 1], [-4, 4]);
  const spotlight = useTransform([springX, springY], (latest) => {
    const [x, y] = latest as number[];
    return `radial-gradient(480px circle at ${x * 100}% ${y * 100}%, rgba(110,123,255,0.16), transparent 60%)`;
  });
  const sheen = useTransform([springX, springY], (latest) => {
    const [x, y] = latest as number[];
    return `radial-gradient(260px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.10), transparent 70%)`;
  });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
    setHovered(false);
    setLabel(null);
  }

  const demoUrl = projectLinks[project.slug];
  const githubUrl = projectGithubLinks[project.slug];

  return (
    <motion.div variants={staggerItem} className="group">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 1000 }}
        whileHover={{ y: -8, scale: 1.012 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.02] shadow-card transition-shadow duration-500 hover:shadow-glow"
      >
        {!reduced && (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: spotlight }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-70"
              style={{ background: sheen }}
            />
          </>
        )}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-md opacity-0 ring-1 ring-inset ring-accent/50 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Preview image */}
        <div className="relative h-56 overflow-hidden border-b border-white/10 md:h-64">
          <motion.div
            className="absolute inset-0"
            style={{ x: reduced ? 0 : imageX, y: reduced ? 0 : imageY }}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <LayoutMock variant={variant} />
          </motion.div>

          <div className="absolute inset-0 bg-background/15 transition-opacity duration-500 group-hover:opacity-0" />

          <div className="absolute left-4 top-4 z-10 flex gap-2">
            <span className="rounded-full border border-white/15 bg-background/70 px-3 py-1 font-sans text-[10px] uppercase tracking-mega text-foreground backdrop-blur-sm">
              {project.status}
            </span>
            {project.featured && (
              <span className="rounded-full bg-foreground px-3 py-1 font-sans text-[10px] uppercase tracking-mega text-background">
                Featured
              </span>
            )}
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap gap-x-6 gap-y-2 bg-gradient-to-t from-background via-background/70 to-transparent px-5 pb-4 pt-10"
            animate={{
              opacity: hovered ? 1 : 0.88,
              backdropFilter: hovered ? "blur(6px)" : "blur(0px)",
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-sans text-sm font-medium text-foreground">{stat.value}</div>
                <div className="font-sans text-[10px] uppercase tracking-wide text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          <span className="font-sans text-xs uppercase tracking-mega text-muted">
            {project.no} — {project.category}
          </span>
          <motion.h3
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 text-[clamp(1.3rem,2.6vw,1.8rem)] font-medium leading-tight tracking-tight text-foreground"
          >
            {project.title}
          </motion.h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech, i) => (
              <motion.span
                key={tech}
                animate={{ opacity: hovered ? 1 : 0.75, y: hovered ? 0 : 4 }}
                transition={{ delay: hovered ? i * 0.05 : 0, duration: 0.3 }}
                className="rounded-full border border-white/10 px-3 py-1 font-sans text-[11px] uppercase tracking-wide text-muted"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-6">
            <MagneticButton
              strength={0.2}
              onHoverStart={() => setLabel(demoUrl ? "Open" : "Soon")}
              onHoverEnd={() => setLabel(null)}
            >
              {demoUrl ? (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-mega text-foreground transition-opacity duration-300 hover:opacity-60"
                >
                  View Project →
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-2 font-sans text-sm font-medium uppercase tracking-mega text-muted/50"
                >
                  View Project →
                </span>
              )}
            </MagneticButton>

            {githubUrl && (
              <MagneticButton
                strength={0.2}
                onHoverStart={() => setLabel("Code")}
                onHoverEnd={() => setLabel(null)}
              >
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs uppercase tracking-mega text-muted transition-opacity duration-300 hover:opacity-60"
                >
                  GitHub
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative z-10 px-6 py-28 md:px-10 md:py-40">
      <SectionLabel heading="Work" label="05 / Selected Case Studies" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
      >
        {caseStudies.map((project, i) => (
          <WorkCard key={project.no} project={project} variant={i} />
        ))}
      </motion.div>
    </section>
  );
}
