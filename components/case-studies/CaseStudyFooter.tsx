import Link from "next/link";
import { contact } from "@/lib/data";

export default function CaseStudyFooter({
  nextSlug,
  nextTitle,
}: {
  nextSlug: string;
  nextTitle: string;
}) {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-16 md:px-10 md:py-24">
      <div className="mb-16 flex flex-col gap-6 border-b border-white/10 pb-16 md:mb-20 md:flex-row md:items-end md:justify-between md:pb-20">
        <div>
          <span className="mb-4 block font-sans text-xs uppercase tracking-mega text-muted">
            Next Case Study
          </span>
          <Link
            href={`/work/${nextSlug}`}
            className="inline-block text-[clamp(2rem,6vw,4rem)] font-medium leading-none tracking-tightest text-foreground transition-opacity duration-300 hover:opacity-60"
          >
            {nextTitle} →
          </Link>
        </div>
        <a
          href={`mailto:${contact.email}`}
          className="font-sans text-xs uppercase tracking-mega text-muted transition-opacity duration-300 hover:opacity-60 md:text-right"
        >
          Have a similar problem to solve?
          <br />
          Let&rsquo;s talk →
        </a>
      </div>

      <div className="flex items-center justify-between font-sans text-xs uppercase tracking-mega text-muted">
        <span>© {new Date().getFullYear()} Aditya</span>
        <Link href="/#top" className="transition-opacity hover:opacity-60">
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
