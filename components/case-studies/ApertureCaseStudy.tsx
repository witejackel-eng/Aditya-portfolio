"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const specs = [
  { label: "Sensor", value: "102MP Medium-Format CMOS, 43.8 × 32.9mm" },
  { label: "Native ISO", value: "64 – 25,600" },
  { label: "Mount", value: "Native GFX-compatible + 3 adapter profiles" },
  { label: "Card Slots", value: "Dual CFexpress Type B" },
  { label: "Dynamic Range", value: "15 stops at base ISO" },
  { label: "Body Finish", value: "Titanium / Graphite" },
];

const metrics = [
  { value: "94", label: "SKU combinations resolved from a single route" },
  { value: "<80ms", label: "perceived cart mutation, fully optimistic" },
  { value: "<1.2s", label: "LCP despite 40MB+ uncompressed hero imagery" },
  { value: "0", label: "layout shift during variant switching" },
];

function CameraArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full max-w-md"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <rect x="60" y="90" width="280" height="160" rx="8" opacity="0.5" />
      <rect x="60" y="60" width="120" height="34" rx="4" opacity="0.3" />
      <circle cx="200" cy="170" r="75" opacity="0.6" />
      <circle cx="200" cy="170" r="55" opacity="0.35" />
      <circle cx="200" cy="170" r="30" opacity="0.7" />
      <circle cx="310" cy="115" r="8" opacity="0.4" />
      <line x1="60" y1="90" x2="60" y2="250" opacity="0.2" />
      <line x1="340" y1="90" x2="340" y2="250" opacity="0.2" />
    </svg>
  );
}

export default function ApertureCaseStudy() {
  return (
    <main className="pt-28 md:pt-32">
      <section className="px-6 pb-16 md:px-10 md:pb-24">
        <Reveal
          as="span"
          trigger="load"
          className="mb-6 block font-sans text-xs uppercase tracking-mega text-muted"
        >
          01 / Retail · E-Commerce
        </Reveal>
        <Reveal
          as="h1"
          trigger="load"
          delay={0.1}
          className="text-[clamp(3rem,11vw,8rem)] font-medium leading-[0.85] tracking-tightest text-foreground"
        >
          APERTURE
        </Reveal>
        <Reveal
          as="p"
          trigger="load"
          delay={0.25}
          className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-muted md:text-xl"
        >
          A flagship storefront for a medium-format mirrorless systems
          manufacturer — where a single body ships in 94 configurable
          variants, and every unnecessary click costs a sale.
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8 font-sans text-xs uppercase tracking-mega text-muted">
          <span>Role — Front-End Engineering & UI Architecture</span>
          <span>Stack — Next.js, Stripe, Framer Motion</span>
          <span>Focus — Performance, Variant Logic, Optimistic UI</span>
        </div>
      </section>

      {/* Core 2-column product layout */}
      <section className="px-6 pb-24 md:px-10 md:pb-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex h-[420px] items-center justify-center rounded-sm border border-white/10 bg-white/[0.02] text-foreground/70 md:h-full md:min-h-[600px]">
            <CameraArt />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex-1 rounded-sm border border-white/10 bg-white/[0.02] p-8">
              <span className="mb-6 block font-sans text-xs uppercase tracking-mega text-muted">
                Technical Specification
              </span>
              <dl className="flex flex-col divide-y divide-white/10">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="font-sans text-sm text-muted">
                      {spec.label}
                    </dt>
                    <dd className="text-right font-sans text-sm text-foreground">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/[0.02] p-8">
              <div className="mb-6 flex items-baseline justify-between">
                <span className="font-sans text-xs uppercase tracking-mega text-muted">
                  Body Only
                </span>
                <span className="text-2xl font-medium text-foreground">
                  $7,995.00
                </span>
              </div>

              <div className="mb-6 flex flex-col gap-4">
                <div>
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-mega text-muted">
                    Sensor Format
                  </span>
                  <div className="flex gap-2">
                    <span className="rounded-full border border-white/40 px-4 py-1.5 font-sans text-xs text-foreground">
                      33 × 44mm
                    </span>
                    <span className="rounded-full border border-white/10 px-4 py-1.5 font-sans text-xs text-muted">
                      Adapter-Compatible
                    </span>
                  </div>
                </div>
                <div>
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-mega text-muted">
                    Mount
                  </span>
                  <div className="flex gap-2">
                    <span className="rounded-full border border-white/40 px-4 py-1.5 font-sans text-xs text-foreground">
                      Native
                    </span>
                    <span className="rounded-full border border-white/10 px-4 py-1.5 font-sans text-xs text-muted">
                      L-Mount
                    </span>
                    <span className="rounded-full border border-white/10 px-4 py-1.5 font-sans text-xs text-muted">
                      Adapter Kit
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full rounded-sm bg-foreground py-4 font-sans text-xs uppercase tracking-mega text-background"
              >
                Add to Cart
              </motion.button>
              <p className="mt-4 font-sans text-xs text-muted">
                Cart state updates instantly — server reconciliation happens
                in the background.
              </p>
            </div>
          </div>
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
              The previous storefront treated every body–lens–accessory
              combination as a distinct product page. With 94 valid SKU
              combinations across three sensor formats and six mount
              profiles, the catalog had drifted into over 1,200 near-duplicate
              listings — each one a separate cache entry, a separate crawl
              target, and a separate source of pricing drift whenever a
              distributor updated a cost sheet.
            </Reveal>
          </article>

          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              A Variant Matrix, Not Duplicate Pages
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              Every product is now a single route backed by a variant matrix:
              sensor format, mount type, and card-slot configuration are
              resolved client-side against a precomputed compatibility graph,
              so incompatible combinations — a native GFX mount paired with a
              third-party L-mount adapter, for instance — are disabled before
              the user can select them, not caught by a validation error at
              checkout. Price deltas per variant are prefetched with the
              initial product payload, so switching a variant never triggers
              a network round-trip.
            </Reveal>
          </article>

          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              Optimistic Cart, Rollback-Safe
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              Add-to-cart mutates local cart state immediately — quantity,
              subtotal, and the cart-drawer badge update in the same frame as
              the click, via a reducer that treats the server as the source
              of truth but never blocks on it. The mutation is sent in
              parallel; if Stripe's inventory hold fails (a concurrent
              purchase of the last unit, a mid-checkout price change), the
              reducer replays the server's authoritative state and surfaces a
              toast. That failure path is rare enough in practice that
              optimizing for the 99% case was the right trade.
            </Reveal>
          </article>

          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              Payments & Inventory Reconciliation
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              Checkout runs on Stripe PaymentIntents rather than Checkout
              Sessions, keeping the entire flow — shipping, tax via Stripe
              Tax, and payment confirmation — on-domain instead of
              redirecting to a hosted page. Inventory decrements happen on a
              webhook listener (<code className="text-foreground">payment_intent.succeeded</code>),
              not at add-to-cart time, so a cart sitting idle for twenty
              minutes doesn't lock stock away from someone ready to buy.
              Made-to-order lenses with a six-to-eight week lead time carry a
              separate backorder fulfillment type that skips the inventory
              check entirely and triggers a different confirmation email.
            </Reveal>
          </article>

          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              Performance Budget
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              Hero product imagery runs 40–60MB uncompressed per body/lens
              combination straight from the studio. Next/Image handles
              responsive srcset generation and blur-up placeholders sized
              from the exact source aspect ratio, so there's zero layout
              shift while a multi-megabyte image streams in over a 4G
              connection. Time-to-Interactive stays under 900ms and Largest
              Contentful Paint under 1.2s despite the image weight, because
              nothing above the fold ever waits on anything outside the
              first paint.
            </Reveal>
          </article>
        </div>
      </section>
    </main>
  );
}
