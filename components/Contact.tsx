import Reveal from "./Reveal";
import Clock from "./Clock";
import { contact } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 flex min-h-[90svh] flex-col justify-between px-6 py-28 md:px-10 md:py-40"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <Reveal
          as="span"
          className="font-sans text-xs uppercase tracking-mega text-muted"
        >
          04 / Contact
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
          as="div"
          className="text-[clamp(2.6rem,10vw,7.5rem)] font-medium leading-[0.9] tracking-tightest text-foreground"
        >
          <a
            href={`mailto:${contact.email}`}
            className="inline-block transition-opacity duration-300 hover:opacity-60"
          >
            Let&rsquo;s work
            <br />
            together →
          </a>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
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
              className="transition-opacity duration-300 hover:opacity-60"
            >
              witejackel-eng
            </a>
          </Reveal>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between font-sans text-xs uppercase tracking-mega text-muted">
        <span>© {new Date().getFullYear()} Aditya</span>
        <a href="#top" className="transition-opacity hover:opacity-60">
          Back to top ↑
        </a>
      </div>
    </section>
  );
}
