import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import BackgroundFX from "./BackgroundFX";
import { studio } from "@/lib/data";

export default function Studio() {
  return (
    <section id="studio" className="relative z-10 px-6 py-28 md:px-10 md:py-40">
      <BackgroundFX />
      <SectionLabel heading="Studio" label={studio.label} />

      <Reveal
        as="p"
        className="mb-16 max-w-3xl font-sans text-[clamp(1.4rem,3vw,2.4rem)] font-light leading-[1.25] tracking-tight text-foreground md:mb-24"
      >
        {studio.statement}
      </Reveal>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {studio.approach.map((item) => (
          <div key={item.no} className="border-t border-white/10 pt-6">
            <Reveal
              as="span"
              className="mb-4 block font-sans text-xs uppercase tracking-mega text-muted"
            >
              {item.no}
            </Reveal>
            <Reveal
              as="h3"
              className="mb-3 text-[clamp(1.3rem,2.4vw,1.7rem)] font-medium leading-tight tracking-tight text-foreground"
            >
              {item.title}
            </Reveal>
            <Reveal
              as="p"
              className="font-sans text-sm leading-relaxed text-muted"
            >
              {item.body}
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
