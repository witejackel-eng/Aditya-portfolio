# Architecture — Aditya Portfolio

## Overview

A personal portfolio website with 3D WebGL hero animations, smooth scroll (Lenis), and Framer Motion transitions. Showcases services, capabilities, process steps, and case studies.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14.2 (App Router) |
| UI | React 18, Tailwind CSS, Framer Motion |
| 3D | React Three Fiber, Three.js, Post Processing |
| Smooth Scroll | Lenis |
| Styling | Tailwind CSS (PostCSS plugin) |

## Directory Structure

```
app/
├── layout.tsx              # Root layout with JSON-LD structured data
├── page.tsx                # Homepage (portfolio sections)
└── opengraph-image/        # Dynamic OG image generation
components/
├── Hero.tsx                # Hero section with lazy-loaded 3D canvas
├── Scene.tsx               # Three.js scene setup
└── ...                     # Section components
lib/
├── data.ts                 # Portfolio content data (services, case studies, process steps)
└── projectLinks.ts         # Project URL mappings
```

## Data Flow

1. **Portfolio content** is defined in `lib/data.ts` as typed TypeScript arrays
2. **3D hero scene** is lazy-loaded via `next/dynamic` with `ssr: false`
3. **Structured data** (JSON-LD) is generated in the root layout for SEO

## Key Design Decisions

- **Static content model** — All portfolio data is TypeScript, no CMS needed for a personal portfolio
- **3D as progressive enhancement** — The Three.js hero scene is lazy-loaded and non-blocking; the page is fully functional without it
- **Lenis smooth scrolling** — Provides native-feeling momentum scrolling for a polished portfolio experience