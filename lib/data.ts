/**
 * Canonical production URL. Falls back to the default Vercel URL this repo
 * would get if deployed unmodified — set NEXT_PUBLIC_SITE_URL once a real
 * custom domain is attached.
 */
export const siteUrl =
  globalThis.process?.env.NEXT_PUBLIC_SITE_URL ??
  "https://aditya-portfolio.vercel.app";

export const profile = {
  name: "Aditya",
  title: "Front-End Developer & UI/UX Designer",
  impact:
    "I build interfaces that make ambitious products feel inevitable — engineered for performance, designed for clarity.",
  stack: "Next.js / React / TypeScript / Three.js / Framer Motion",
  tickerText:
    "Crafting high performance digital interfaces // Available for projects — ",
};

export const nav = [
  { no: "01", label: "Studio", href: "#studio" },
  { no: "02", label: "Services", href: "#services" },
  { no: "03", label: "Capabilities", href: "#capabilities" },
  { no: "04", label: "Process", href: "#process" },
  { no: "05", label: "Work", href: "#work" },
  { no: "06", label: "Contact", href: "#contact" },
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

export interface Capability {
  label: string;
  level: number;
}

export const capabilities: Capability[] = [
  { label: "Front-End Engineering", level: 95 },
  { label: "Motion & Interaction (3D / WebGL)", level: 90 },
  { label: "Performance Engineering", level: 88 },
  { label: "UI / UX Design", level: 85 },
  { label: "Design Systems", level: 80 },
];

export interface ProcessStep {
  no: string;
  title: string;
  body: string;
}

export const process: ProcessStep[] = [
  {
    no: "01",
    title: "Discovery",
    body: "Understand the product, the users, and the constraints before any design or code — what does this interface actually need to do?",
  },
  {
    no: "02",
    title: "Planning",
    body: "Map the component architecture, data flow, and rendering strategy up front, so performance and structure are decided by design, not discovered in review.",
  },
  {
    no: "03",
    title: "Design",
    body: "Wireframe to high-fidelity system, grounded in the same typography, spacing, and motion rules that will ship — no disposable mockups.",
  },
  {
    no: "04",
    title: "Development",
    body: "Type-safe, component-driven builds in React and Next.js, built against real data and real constraints from day one.",
  },
  {
    no: "05",
    title: "Testing",
    body: "Cross-browser and cross-device checks against real-world conditions — not just the happy path on a fast connection.",
  },
  {
    no: "06",
    title: "Deployment",
    body: "Staged rollouts with monitoring in place — shipping is a step in the process, not the end of it.",
  },
  {
    no: "07",
    title: "Support",
    body: "Iteration doesn't stop at launch — fixes, refinements, and feature work as the product and its users evolve.",
  },
];

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  no: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  status: string;
  featured?: boolean;
  stats: CaseStudyStat[];
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
    status: "Case Study",
    stats: [
      { value: "94", label: "SKU combos, one route" },
      { value: "<80ms", label: "Optimistic cart mutation" },
      { value: "<1.2s", label: "LCP despite heavy imagery" },
    ],
  },
  {
    no: "02",
    slug: "sequence",
    title: "Corporate Lead-Generation Platform",
    category: "B2B · Marketing Site",
    description:
      "A high-conversion marketing platform with a modular content system, built for a sales team to launch campaign pages without touching code.",
    stack: ["TypeScript", "CMS", "A/B Testing"],
    status: "Case Study",
    stats: [
      { value: "38%", label: "Reply-rate lift" },
      { value: "<2%", label: "Bounce rate, 40+ domains" },
      { value: "0", label: "Deploys to launch a page" },
    ],
  },
  {
    no: "03",
    slug: "depth",
    title: "Data-Driven Web Application Dashboard",
    category: "SaaS · Product Design",
    description:
      "A real-time analytics dashboard handling dense, high-frequency data — designed for legibility under load and built to stay smooth past 100k data points.",
    stack: ["React", "WebSockets", "D3.js"],
    status: "Case Study",
    stats: [
      { value: "60fps", label: "At 40+ ticks/sec" },
      { value: "12 → 1", label: "WebSocket streams" },
      { value: "<16ms", label: "Paint budget under load" },
    ],
  },
];

export const contact = {
  email: "hi.aditya.dev@gmail.com",
  phone: "+919310736542",
  phoneDisplay: "+91 93107 36542",
  github: "https://github.com/witejackel-eng",
  location: "Based in India · Available remote",
};

export const siteMeta = {
  version: "1.0.0",
  builtWith: "Next.js & Framer Motion",
};
