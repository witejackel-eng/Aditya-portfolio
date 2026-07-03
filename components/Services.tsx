import Reveal from "./Reveal";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="relative z-10 px-6 py-28 md:px-10 md:py-40">
      <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-6 md:mb-20">
        <Reveal
          as="h2"
          className="text-[clamp(2rem,6vw,3.5rem)] font-medium leading-none tracking-tightest"
        >
          Services
        </Reveal>
        <Reveal
          as="span"
          className="font-sans text-xs uppercase tracking-mega text-muted"
        >
          02 / What I Do
        </Reveal>
      </div>

      <div>
        {services.map((service) => (
          <div
            key={service.no}
            className="group grid grid-cols-1 gap-4 border-b border-white/10 py-10 transition-colors duration-500 md:grid-cols-12 md:items-baseline md:gap-6 md:py-14"
          >
            <Reveal
              as="span"
              className="font-sans text-sm text-muted md:col-span-1"
            >
              {service.no}
            </Reveal>
            <Reveal
              as="h3"
              className="text-[clamp(1.8rem,5vw,3.2rem)] font-medium leading-none tracking-tightest text-foreground transition-transform duration-500 group-hover:translate-x-2 md:col-span-4"
            >
              {service.title}
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-sm leading-relaxed text-muted md:col-span-6 md:col-start-7"
            >
              {service.body}
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
