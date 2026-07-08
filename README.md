# Aditya — Personal Portfolio

Personal portfolio for a front-end developer featuring a Three.js WebGL hero, Framer Motion animations, and project case studies with long-form write-ups.

[![Live Site](https://img.shields.io/badge/live-adityaport.vercel.app-brightgreen?style=flat-square)](https://adityaport.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.7-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-0.169.0-black?style=flat-square&logo=three.js)](https://threejs.org)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-11.3.19-ff0080?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Lenis](https://img.shields.io/badge/Lenis-1.1.6-gray?style=flat-square)](https://github.com/darkroomengineering/lenis)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

## Tech Stack

| Package | Version |
| --- | --- |
| Next.js (App Router) | 14.2.35 |
| React | 18.3.1 |
| TypeScript | 5.5.3 |
| Tailwind CSS | 3.4.7 |
| Three.js | 0.169.0 |
| Framer Motion | 11.3.19 |
| Lenis | 1.1.6 |

Also uses `@react-three/fiber`, `@react-three/drei`, and `@react-three/postprocessing` for the WebGL layer.

## Architecture

- **App Router** — all routes under `app/` using Next.js 14 file-based routing with layouts and loading states.
- **GLSL shaders** — custom fragment shaders for the hero section (Julia-set fractal with postprocessing: bloom, noise, chromatic aberration).
- **Smooth scroll provider** — Lenis wraps the app; Framer Motion `useInView` hooks drive scroll-triggered reveals. `prefers-reduced-motion` is respected.
- **Motion variants system** — reusable animation variants defined in `lib/` and composed per component for consistent enter/exit behavior.

## Folder Structure

```
app/           # App Router pages, layouts, and API routes
components/    # UI components (hero, project cards, sections, cursor)
lib/           # Utilities, motion variants, type helpers, data
public/        # Static assets (images, fonts, favicon)
```

## Installation

```bash
git clone https://github.com/witejackel-eng/Aditya-portfolio.git
cd Aditya-portfolio
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` trigger automatic builds. Live at [adityaport.vercel.app](https://adityaport.vercel.app).

## Features

- 3D WebGL hero with Julia-set fractal and postprocessing effects
- Smooth scroll via Lenis with scroll-driven Framer Motion reveals
- Project case studies with dynamic routing and long-form content
- Particle network background
- Custom cursor
- Global error boundary
- SEO: sitemap, robots.txt, Open Graph metadata

## Known Limitations

- No CMS — all project content is hardcoded in `lib/data.ts`
- No database
- No authentication
- No blog CMS
- No internationalization (i18n)

## Future Improvements

- CMS integration (e.g. Sanity, Contentful) to manage project content
- Blog system with MDX or a headless CMS
- Dark mode toggle
- Project filtering by technology or category

## License

MIT — see [LICENSE](./LICENSE).