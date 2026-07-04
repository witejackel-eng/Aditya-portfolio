"use client";

import Clock from "./Clock";
import MagneticButton from "./MagneticButton";
import { useCursor } from "./CursorContext";
import { nav } from "@/lib/data";

export default function Nav() {
  const { setLabel } = useCursor();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
      <MagneticButton
        strength={0.25}
        onHoverStart={() => setLabel("Top")}
        onHoverEnd={() => setLabel(null)}
      >
        <a
          href="#top"
          className="font-sans text-xs uppercase tracking-mega text-foreground"
        >
          Aditya
        </a>
      </MagneticButton>

      <nav className="hidden gap-8 font-sans text-xs uppercase tracking-mega text-foreground md:flex">
        {nav.map((item) => (
          <MagneticButton
            key={item.no}
            strength={0.3}
            onHoverStart={() => setLabel(item.label)}
            onHoverEnd={() => setLabel(null)}
          >
            <a
              href={item.href}
              className="group flex items-center gap-2 transition-opacity duration-300 hover:opacity-60"
            >
              <span className="text-muted">{item.no}</span>
              {item.label}
            </a>
          </MagneticButton>
        ))}
      </nav>

      <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-mega text-foreground">
        <span className="hidden text-muted sm:inline">Local Time</span>
        <Clock />
      </div>
    </header>
  );
}
