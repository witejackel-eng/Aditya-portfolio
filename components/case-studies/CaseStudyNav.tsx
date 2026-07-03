import Link from "next/link";
import Clock from "@/components/Clock";

export default function CaseStudyNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
      <Link
        href="/#work"
        className="group flex items-center gap-2 font-sans text-xs uppercase tracking-mega text-foreground transition-opacity duration-300 hover:opacity-60"
      >
        <span aria-hidden>←</span> Work
      </Link>

      <Link
        href="/"
        className="font-sans text-xs uppercase tracking-mega text-foreground transition-opacity duration-300 hover:opacity-60"
      >
        Aditya
      </Link>

      <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-mega text-foreground">
        <span className="hidden text-muted sm:inline">Local Time</span>
        <Clock />
      </div>
    </header>
  );
}
