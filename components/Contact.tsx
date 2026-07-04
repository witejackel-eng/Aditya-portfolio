"use client";

import Reveal from "./Reveal";
import Clock from "./Clock";
import MagneticButton from "./MagneticButton";
import { useCursor } from "./CursorContext";
import { contact, siteMeta } from "@/lib/data";

export default function Contact() {
  const { setLabel } = useCursor();

  return (
    <section
      id="contact"
      className="relative z-10 flex min-h-[90svh] flex-col justify-between px-6 py-28 md:px-10 md:py-40"
    >
      <h2 className="sr-only">Contact</h2>
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <Reveal
          as="span"
          className="font-sans text-xs uppercase tracking-mega text-muted"
        >
          06 / Contact
        </Reveal>
        <Reveal
          as="span"
          className="font-sans text-xs uppercase tracking-mega text-muted"
        >
          Available for projects · <Clock />
        </Reveal>
      </div>

      <div className="py-16 md:py-24">
        <Reveal
          as="p"
          className="max-w-xl font-sans text-base leading-relaxed text-muted md:text-lg"
        >
          Have an interface that needs to feel faster? A product that needs a
          design system? Let&rsquo;s build it.
        </Reveal>
        <Reveal
          as="div"
          delay={0.1}
          className="mt-6 text-[clamp(2.6rem,10vw,7.5rem)] font-medium leading-[0.9] tracking-tightest text-foreground"
        >
          <MagneticButton
            strength={0.15}
            className="inline-block"
            onHoverStart={() => setLabel("Say hi")}
            onHoverEnd={() => setLabel(null)}
          >
            <a
              href={`mailto:${contact.email}`}
              aria-label={`Email Aditya at ${contact.email}`}
              className="inline-block transition-opacity duration-300 hover:opacity-60"
            >
              Let&rsquo;s work
              <br />
              together →
            </a>
          </MagneticButton>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
        <div>
          <Reveal
            as="div"
            className="mb-2 font-sans text-xs uppercase tracking-mega text-muted"
          >
            Email
          </Reveal>
          <Reveal as="div" className="font-sans text-sm text-foreground">
            <a
              href={`mailto:${contact.email}`}
              className="transition-opacity duration-300 hover:opacity-60"
            >
              {contact.email}
            </a>
          </Reveal>
        </div>
        <div>
          <Reveal
            as="div"
            className="mb-2 font-sans text-xs uppercase tracking-mega text-muted"
          >
            Phone
          </Reveal>
          <Reveal as="div" className="font-sans text-sm text-foreground">
            <a
              href={`tel:${contact.phone}`}
              className="transition-opacity duration-300 hover:opacity-60"
            >
              {contact.phoneDisplay}
            </a>
          </Reveal>
        </div>
        <div>
          <Reveal
            as="div"
            className="mb-2 font-sans text-xs uppercase tracking-mega text-muted"
          >
            GitHub
          </Reveal>
          <Reveal as="div" className="font-sans text-sm text-foreground">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aditya's GitHub profile (opens in a new tab)"
              className="transition-opacity duration-300 hover:opacity-60"
            >
              witejackel-eng
            </a>
          </Reveal>
        </div>
        <div>
          <Reveal
            as="div"
            className="mb-2 font-sans text-xs uppercase tracking-mega text-muted"
          >
            Location
          </Reveal>
          <Reveal as="div" className="font-sans text-sm text-foreground">
            {contact.location}
          </Reveal>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 font-sans text-xs uppercase tracking-mega text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} Aditya — Built with {siteMeta.builtWith}{" "}
          — v{siteMeta.version}
        </span>
        <a href="#top" className="transition-opacity hover:opacity-60">
          Back to top ↑
        </a>
      </div>
    </section>
  );
}
