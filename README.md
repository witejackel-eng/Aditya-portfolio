# Aditya — Personal Portfolio

An editorial-style personal portfolio for a front-end developer & UI/UX designer. Built as a product, not a template — Three.js for the hero, Framer Motion for choreography, and a typography system tuned for long-form reading.

[![Live Site](https://img.shields.io/badge/live-adityaport.vercel.app-brightgreen?style=flat-square)](https://adityaport.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=flat-square&logo=three.js)](https://threejs.org)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-ff0080?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

## Highlights

- **Three.js hero** — a custom WebGL scene with postprocessing (bloom, noise, chromatic aberration) running on `@react-three/fiber`
- **Editorial typography** — a considered type scale with display serif + sans pairings, optical sizing, and kerning tuned per breakpoint
- **Scroll choreography** — Lenis smooth scroll driving Framer Motion reveals, with `prefers-reduced-motion` respected throughout
- **Project case studies** — long-form write-ups with images, tech breakdowns, and lessons learned (not just link cards)
- **Performance budget** — image optimization, font subsetting, route-level code splitting, Lighthouse-friendly

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router), React, TypeScript |
| 3D | Three.js, `@react-three/fiber`, `@react-three/drei`, `postprocessing` |
| Motion | Framer Motion, Lenis smooth scroll |
| Styling | Tailwind CSS, custom typography tokens |
| Deployment | Vercel |

## Run locally

```bash
git clone https://github.com/witejackel-eng/Aditya-portfolio.git
cd Aditya-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/           # Next.js App Router pages and layouts
components/    # UI components — hero, project cards, sections
lib/           # Utilities — motion variants, type helpers
public/        # Static assets
```

## License

MIT — see [LICENSE](./LICENSE).
