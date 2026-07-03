export const profile = {
  name: "Aditya",
  title: "Front-End Developer & UI/UX Designer",
  tickerText:
    "Crafting high performance digital interfaces // Available for projects — ",
};

export const nav = [
  { no: "01", label: "Studio", href: "#studio" },
  { no: "02", label: "Services", href: "#services" },
  { no: "03", label: "Work", href: "#work" },
  { no: "04", label: "Contact", href: "#contact" },
];

export const studio = {
  label: "01 / Studio",
  statement:
    "I build interfaces the way engineers build systems — and refine them the way designers refine type. Every project starts from the same question: what does this interface need to do, and what is the fastest, clearest way to let it do that.",
  approach: [
    {
      no: "01",
      title: "Engineering-first",
      body: "Component architecture, state, and rendering strategy are decided before a single pixel is polished. Performance is a design constraint, not a post-launch fix.",
    },
    {
      no: "02",
      title: "Systemic design",
      body: "Typography, spacing, and motion are treated as a system with rules — not one-off decisions per screen. Consistency compounds; it's built in from the first component.",
    },
    {
      no: "03",
      title: "Motion with intent",
      body: "Animation is used to clarify hierarchy and state, never to decorate. If a transition doesn't help the user understand what changed, it doesn't ship.",
    },
  ],
};

export interface Service {
  no: string;
  title: string;
  body: string;
}

export const services: Service[] = [
  {
    no: "01",
    title: "Front-End Engineering",
    body: "Production-grade builds in React, Next.js and TypeScript — accessible, type-safe, and tuned for real-world performance budgets.",
  },
  {
    no: "02",
    title: "UI / UX Design",
    body: "Interface and interaction design from wireframe to high-fidelity system — grounded in usability, not just visual polish.",
  },
  {
    no: "03",
    title: "Motion & Interaction",
    body: "Physics-based micro-interactions and page choreography built with Framer Motion, GSAP, and WebGL — purposeful, never gratuitous.",
  },
  {
    no: "04",
    title: "Design Systems",
    body: "Component libraries and documentation that let a team ship fast without drifting from the source of truth.",
  },
];

export interface CaseStudy {
  no: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    no: "01",
    slug: "aperture",
    title: "Premium E-Commerce Experience",
    category: "Retail · Web App",
    description:
      "A flagship storefront rebuilt around sub-second interactions — instant filtering, optimistic cart state, and a checkout flow engineered to remove every unnecessary click.",
    stack: ["Next.js", "Stripe", "Framer Motion"],
  },
  {
    no: "02",
    slug: "sequence",
    title: "Corporate Lead-Generation Platform",
    category: "B2B · Marketing Site",
    description:
      "A high-conversion marketing platform with a modular content system, built for a sales team to launch campaign pages without touching code.",
    stack: ["TypeScript", "CMS", "A/B Testing"],
  },
  {
    no: "03",
    slug: "depth",
    title: "Data-Driven Web Application Dashboard",
    category: "SaaS · Product Design",
    description:
      "A real-time analytics dashboard handling dense, high-frequency data — designed for legibility under load and built to stay smooth past 100k data points.",
    stack: ["React", "WebSockets", "D3.js"],
  },
];

export const contact = {
  email: "hi.aditya.dev@gmail.com",
  phone: "+919310736542",
  phoneDisplay: "+91 93107 36542",
  github: "https://github.com/witejackel-eng",
};
