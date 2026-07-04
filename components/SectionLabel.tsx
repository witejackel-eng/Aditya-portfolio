import Reveal from "./Reveal";

interface SectionLabelProps {
  heading: string;
  label: string;
}

export default function SectionLabel({ heading, label }: SectionLabelProps) {
  return (
    <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-6 md:mb-20">
      <Reveal
        as="h2"
        className="text-[clamp(2rem,6vw,3.5rem)] font-medium leading-none tracking-tightest"
      >
        {heading}
      </Reveal>
      <Reveal
        as="span"
        className="font-sans text-xs uppercase tracking-mega text-muted"
      >
        {label}
      </Reveal>
    </div>
  );
}
