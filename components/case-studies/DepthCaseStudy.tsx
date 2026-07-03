"use client";

import Reveal from "@/components/Reveal";

const metrics = [
  { value: "60fps", label: "sustained at 40+ ticks/sec, per symbol" },
  { value: "12 → 1", label: "concurrent WebSocket streams multiplexed into one" },
  { value: "<16ms", label: "paint budget maintained under full tick load" },
  { value: "90/90/90", label: "drawdown model built into the risk panel" },
];

// Fixed, deterministic candle data — avoids Math.random() hydration
// mismatches while still reading as real, noisy market data.
const candles: [number, boolean][] = [
  [32, true], [48, true], [28, false], [55, true], [40, false],
  [62, true], [45, true], [30, false], [58, true], [70, true],
  [50, false], [65, true], [38, false], [72, true], [60, false],
  [80, true], [55, false], [68, true], [42, false], [75, true],
  [63, true], [35, false], [58, true], [48, false], [66, true],
  [78, true], [52, false], [61, true], [44, false], [70, true],
];

const orderBook: { price: string; size: string; side: "bid" | "ask" }[] = [
  { price: "68,412.5", size: "0.842", side: "ask" },
  { price: "68,411.0", size: "1.204", side: "ask" },
  { price: "68,409.5", size: "0.318", side: "ask" },
  { price: "68,408.0", size: "2.115", side: "ask" },
  { price: "68,406.5", size: "0.667", side: "ask" },
  { price: "68,405.0", size: "1.532", side: "bid" },
  { price: "68,403.5", size: "0.901", side: "bid" },
  { price: "68,402.0", size: "3.048", side: "bid" },
  { price: "68,400.5", size: "0.474", side: "bid" },
  { price: "68,399.0", size: "1.822", side: "bid" },
];

const positions = [
  { symbol: "BTC-PERP", side: "LONG", size: "1.4", pnl: "+2,140.55" },
  { symbol: "ETH-PERP", side: "SHORT", size: "8.2", pnl: "-412.10" },
];

function ChartMock() {
  return (
    <div className="flex h-56 items-end gap-[3px] md:h-72">
      {candles.map(([h, up], i) => (
        <div
          key={i}
          className={
            "flex-1 rounded-[1px] " +
            (up ? "bg-white/50" : "border border-white/30 bg-transparent")
          }
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export default function DepthCaseStudy() {
  return (
    <main className="pt-28 md:pt-32">
      <section className="px-6 pb-16 md:px-10 md:pb-24">
        <Reveal
          as="span"
          trigger="load"
          className="mb-6 block font-sans text-xs uppercase tracking-mega text-muted"
        >
          03 / SaaS · Product Design
        </Reveal>
        <Reveal
          as="h1"
          trigger="load"
          delay={0.1}
          className="text-[clamp(3rem,11vw,8rem)] font-medium leading-[0.85] tracking-tightest text-foreground"
        >
          DEPTH
        </Reveal>
        <Reveal
          as="p"
          trigger="load"
          delay={0.25}
          className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-muted md:text-xl"
        >
          A real-time institutional trading dashboard tracking liquidity
          pools, scalping metrics, and order-flow imbalance for
          high-frequency day traders.
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8 font-sans text-xs uppercase tracking-mega text-muted">
          <span>Role — Front-End Engineering & Data Visualization</span>
          <span>Stack — React, WebSockets, D3.js</span>
          <span>Focus — Render Performance, Risk UX</span>
        </div>
      </section>

      {/* Bento grid */}
      <section className="px-6 pb-24 md:px-10 md:pb-32">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6 md:col-span-2 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-mega text-muted">
                BTC-PERP · Liquidity Chart
              </span>
              <span className="font-mono text-sm text-foreground">
                68,406.50
              </span>
            </div>
            <ChartMock />
          </div>

          <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <span className="mb-4 block font-sans text-xs uppercase tracking-mega text-muted">
              Order Book
            </span>
            <div className="flex flex-col font-mono text-xs">
              {orderBook.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-white/5 py-1.5 last:border-none"
                >
                  <span
                    className={
                      row.side === "ask" ? "text-muted" : "text-foreground"
                    }
                  >
                    {row.price}
                  </span>
                  <span className="text-muted">{row.size}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <span className="mb-4 block font-sans text-xs uppercase tracking-mega text-muted">
                Risk Management
              </span>
              <div className="flex flex-col gap-3 font-sans text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Daily Loss Limit</span>
                  <span className="text-foreground">$1,840 / $5,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Max Drawdown (30d)</span>
                  <span className="text-foreground">-6.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Position Heat</span>
                  <span className="text-foreground">42%</span>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <span className="mb-4 block font-sans text-xs uppercase tracking-mega text-muted">
                Active Positions
              </span>
              <div className="flex flex-col gap-2 font-mono text-xs">
                {positions.map((p) => (
                  <div
                    key={p.symbol}
                    className="flex items-center justify-between"
                  >
                    <span className="text-foreground">{p.symbol}</span>
                    <span className="text-muted">{p.side}</span>
                    <span
                      className={
                        p.pnl.startsWith("+") ? "text-foreground" : "text-muted"
                      }
                    >
                      {p.pnl}
                    </span>
                  </div>
                ))}
              </div>
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
                className="text-[clamp(1.5rem,3.4vw,2.6rem)] font-medium leading-none tracking-tightest text-foreground"
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
              Desks running scalping strategies were losing edge to render
              lag, not signal lag. At 40+ ticks per second per symbol across
              12 concurrent instruments, the previous dashboard re-rendered
              the entire order book on every tick and started dropping
              frames the moment more than three symbols were open at once —
              exactly the condition under which a trader most needs the UI
              to keep up.
            </Reveal>
          </article>

          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              Multiplexed WebSockets, Not Twelve Connections
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              Every open symbol used to open its own socket. Now a single
              multiplexed connection carries all subscriptions, framed with
              MessagePack instead of JSON to cut payload size on the highest-
              frequency channels. When ticks arrive faster than the render
              budget can consume them, incoming updates for the same price
              level are coalesced into the latest value rather than queued —
              the UI shows the current state of the book, not a backlog of
              every intermediate one.
            </Reveal>
          </article>

          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              Canvas Over SVG for the Chart
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              An SVG candlestick chart adds a DOM node — sometimes several —
              per tick; at high tick rates that node count explodes and
              garbage collection starts stealing frame budget. The chart
              renders to a single canvas element instead, with D3 used
              purely for scale math (time and price domains to pixel
              ranges) and never for DOM manipulation. Draw cost per frame
              stays flat regardless of how much history is on screen.
            </Reveal>
          </article>

          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              Zero Layout Shift Under Load
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              Order-book rows are virtualized with a fixed row height, and
              every numeric column uses tabular figures so a price tick from
              4 to 5 digits doesn't reflow the column next to it. Skeleton
              states are pre-sized to their final dimensions before real
              data arrives, so the very first paint already reserves the
              layout the live feed will occupy.
            </Reveal>
          </article>

          <article>
            <Reveal
              as="h2"
              className="mb-4 text-2xl font-medium tracking-tight text-foreground"
            >
              Risk Discipline, Built Into the UI
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-base leading-relaxed text-muted"
            >
              The industry's own numbers are sobering: roughly 90% of day
              traders lose 90% of their capital within 90 days. The risk
              panel is designed around that curve deliberately — daily loss
              limit and drawdown render above unrealized P&L, not below it,
              and the position-heat indicator is visible at all times rather
              than tucked behind a settings toggle. The dashboard's job
              isn't just to show the trade; it's to make the account's risk
              of ruin impossible to ignore.
            </Reveal>
          </article>
        </div>
      </section>
    </main>
  );
}
