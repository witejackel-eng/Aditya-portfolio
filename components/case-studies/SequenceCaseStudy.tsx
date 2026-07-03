"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const metrics = [
  { value: "38%", label: "average reply-rate lift after CMS-driven personalization" },
  { value: "<2%", label: "bounce rate sustained across 40+ sending domains" },
  { value: "14 days", label: "automated IP warmup schedule per new domain" },
  { value: "0", label: "code deploys required to launch a new campaign page" },
];

const cmsPoints = [
  {
    title: "Block-based schema",
    body: "Headline, testimonial, proof-metric, and capture-form blocks are independently composable. Sales ops assembles a page from the block library; nothing renders that wasn't authored inside the constraint system.",
  },
  {
    title: "Signed preview URLs",
    body: "Draft content renders behind a signed, time-limited preview link before publish — reviewers see the real production layout, not a CMS admin approximation of it.",
  },
  {
    title: "Zero-deploy publishing",
    body: "Publishing writes to the CMS's content API; the site reads it at request time via ISR with a 60-second revalidation window. No campaign launch has touched a pull request in over a year.",
  },
];

function AbTestMock() {
  return (
    <div className="mt-6 flex h-40 items-end gap-6 border-b border-white/10 pb-0">
      <div className="flex flex-1 flex-col items-center gap-3">
        <span className="font-sans text-xs text-muted">24.1%</span>
        <div className="w-full rounded-t-sm bg-white/10" style={{ height: "58%" }} />
        <span className="font-sans text-[11px] uppercase tracking-mega text-muted">
          Variant A
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-3">
        <span className="font-sans text-xs text-foreground">31.6%</span>
        <div className="w-full rounded-t-sm bg-white/40" style={{ height: "76%" }} />
        <span className="font-sans text-[11px] uppercase tracking-mega text-foreground">
          Variant B
        </span>
      </div>
    </div>
  );
}

export default function SequenceCaseStudy() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="pt-28 md:pt-32">
      {/* Full-width dark hero with email capture */}
      <section className="flex min-h-[70svh] flex-col justify-center border-b border-white/10 px-6 py-20 md:px-10">
        <Reveal
          as="span"
          trigger="load"
          className="mb-6 block font-sans text-xs uppercase tracking-mega text-muted"
        >
          02 / B2B · Marketing Site
        </Reveal>
        <Reveal
          as="h1"
          trigger="load"
          delay={0.1}
          className="text-[clamp(3rem,11vw,8rem)] font-medium leading-[0.85] tracking-tightest text-foreground"
        >
          SEQUENCE
        </Reveal>
        <Reveal
          as="p"
          trigger="load"
          delay={0.25}
          className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-muted md:text-xl"
        >
          A B2B outreach and lifecycle email platform for sales teams running
          cold campaigns at the scale where deliverability, not creative,
          decides the outcome.
        </Reveal>

        <form
          onSubmit={handleSubmit}
          className="mt-12 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="Work email"
            className="w-full border-b border-white/20 bg-transparent py-3 font-sans text-sm text-foreground placeholder:text-muted focus:border-white/60 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            type="submit"
            className="shrink-0 rounded-sm bg-foreground px-6 py-3 font-sans text-xs uppercase tracking-mega text-background"
          >
            {submitted ? "Request Sent" : "Request Access"}
          </motion.button>
        </form>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-sans text-xs uppercase tracking-mega text-muted">
          <span>Role — Front-End Engineering & UI Architecture</span>
          <span>Stack — TypeScript, CMS, A/B Testing</span>
        </div>
      </section>

      {/* Bottom split: CMS architecture / A-B testing */}
      <section className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="px-6 py-16 md:px-10 md:py-24">
          <span className="mb-8 block font-sans text-xs uppercase tracking-mega text-muted">
            CMS Architecture
          </span>
          <div className="flex flex-col gap-10">
            {cmsPoints.map((point) => (
              <div key={point.title}>
                <Reveal
                  as="h3"
                  className="mb-2 text-lg font-medium tracking-tight text-foreground"
                >
                  {point.title}
                </Reveal>
                <Reveal
                  as="p"
                  className="font-sans text-sm leading-relaxed text-muted"
                >
                  {point.body}
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-16 md:px-10 md:py-24">
          <span className="mb-8 block font-sans text-xs uppercase tracking-mega text-muted">
            A/B Testing Analytics
          </span>
          <Reveal
            as="p"
            className="font-sans text-sm leading-relaxed text-muted"
          >
            Variant assignment happens at the edge, keyed off a deterministic
            hash of the visitor ID — the same visitor always sees the same
            variant, and the assignment is baked into the HTML before it
            reaches the client, so there's no flash of the control layout
            before a swap.
          </Reveal>
          <AbTestMock />
          <Reveal
            as="p"
            className="mt-6 font-sans text-sm leading-relaxed text-muted"
          >
            Results aren't promoted until a variant clears a minimum sample
            size and reaches 95% confidence — the dashboard shows the
            confidence interval, not just the leading number, specifically so
            a sales lead can't call a test early on a good week.
          </Reveal>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-y border-white/10 px-6 py-16 md:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <Reveal
                as="div"
                className="text-[clamp(1.8rem,4vw,3rem)] font-medium leading-none tracking-tightest text-foreground"
              >
                {m.value}
              </Reveal>
              <Reveal
                as="p"
                className="mt-3 font-sans text-xs leading-relaxed text-muted"
              >
                {m.label}
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Written narrative */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col gap-16">
          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              The Problem
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              Sales ops needed a new landing page variant every time a
              campaign's messaging shifted — which, for an outbound team
              running dozens of concurrent sequences, was constantly. Every
              change meant filing a ticket, waiting on a sprint, and shipping
              a page that had already gone stale by the time it reached
              production.
            </Reveal>
          </article>

          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              Deliverability Is An Engineering Problem
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              Reply rate is downstream of inbox placement, and inbox
              placement is downstream of infrastructure decisions most
              marketing sites never touch: SPF and DKIM alignment per sending
              domain, DMARC policy enforcement, and a 14-day automated
              warmup schedule that ramps new domains from a handful of
              sends a day to full volume without tripping spam-reputation
              thresholds. The dashboard surfaces bounce rate and complaint
              rate per domain in real time, because a domain that silently
              degrades is worse than one that fails loudly.
            </Reveal>
          </article>

          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              A/B Testing Without the Flicker
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              Most client-side A/B implementations render the control
              variant first and swap in the winner after a JavaScript bundle
              evaluates — which is exactly the flash-of-wrong-content and
              layout shift that tanks Core Web Vitals. Variant assignment
              here happens in edge middleware before the response streams,
              so the correct variant is in the initial HTML. The trade-off is
              a slightly more complex build pipeline; the payoff is a
              testing system that never costs the page a performance
              regression to run.
            </Reveal>
          </article>
        </div>
      </section>
    </main>
  );
}
