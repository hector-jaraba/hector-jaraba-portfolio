# Héctor Jaraba — Portfolio

Source code for [hectorjaraba.com](https://hectorjaraba.com), the personal portfolio of Héctor Jaraba, Staff Frontend Engineer.

The production site is a statically generated, single-page portfolio with scroll-driven storytelling, responsive navigation, an interactive WebGL hero, engineering experience, technical expertise, and contact information. A full MDX blog system is included but is currently disabled in production.

## Highlights

- Static output with Astro and inlined production CSS
- Responsive, scroll-driven homepage with GSAP animations
- Progressive WebGL hero with an optimized image fallback
- Mobile navigation with focus management, keyboard support, and scroll locking
- Reduced-motion and lower-capability device fallbacks
- SEO metadata, Open Graph, Twitter cards, canonical URLs, and Person JSON-LD
- MDX blog with drafts, scheduled posts, categories, reading time, syntax highlighting, and rich embeds
- English and Spanish translation catalogs, with locale routing currently disabled
- Custom 404 page and downloadable CV

## Technology

| Area                 | Implementation                                                    |
| -------------------- | ----------------------------------------------------------------- |
| Framework            | Astro 7                                                           |
| Styling              | Tailwind CSS 4 through `@tailwindcss/vite`, plus scoped Astro CSS |
| Language             | TypeScript 6 with Astro's strict configuration                    |
| Motion               | GSAP 3 and ScrollTrigger                                          |
| Visual effects       | Custom WebGL shaders with progressive image fallback              |
| Content              | Astro Content Collections and MDX 8                               |
| Code rendering       | Shiki through `rehype-pretty-code`                                |
| Images               | Astro Assets and Sharp                                            |
| Internationalization | Local translation catalogs with optional Astro locale routing     |
| Package manager      | pnpm 10                                                           |

## Requirements

- Node.js `22.12.0` or newer
- pnpm 10

The repository includes `pnpm-lock.yaml`; use pnpm to keep dependency resolution reproducible.

## Local development

```bash
git clone https://github.com/hector-jaraba/hector-jaraba-portfolio.git
cd hector-jaraba-portfolio
pnpm install
pnpm dev
```

The development server runs at [http://localhost:4321](http://localhost:4321).

## Commands

| Command                   | Purpose                                           |
| ------------------------- | ------------------------------------------------- |
| `pnpm dev`                | Start the Astro development server                |
| `pnpm start`              | Alias for the development server                  |
| `pnpm build`              | Run `astro check` and create the production build |
| `pnpm preview`            | Serve the generated production build locally      |
| `pnpm astro -- <command>` | Run an Astro CLI command                          |

## Feature flags

Feature flags live in [`src/config/features.ts`](./src/config/features.ts).

| Flag           | Default | Current behavior                                                                                                              |
| -------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `BLOG_ENABLED` | `false` | The blog is available automatically in development. Production redirects `/blog` to `/` and does not generate article routes. |
| `I18N_ENABLED` | `false` | English remains the production route. Spanish translations exist, but Astro locale routing is not generated.                  |

These are compile-time TypeScript constants. The current implementation does **not** read environment variables for feature flags.

To publish the blog, set `BLOG_ENABLED` to `true` and rebuild. Setting `I18N_ENABLED` to `true` includes Astro's i18n configuration in the build; localized page routing should be completed and verified before publishing it.

## Content

### Portfolio content

- Homepage copy and translated labels: `src/i18n/locales/`
- Work experience data: `src/content/data/jobs.ts`
- Project collection data: `src/content/projects.json`
- CV download: `public/cv-hector.pdf`
- Images imported through Astro Assets: `src/assets/images/`

The projects collection is defined and validated, but there are currently no public project routes.

### Blog posts

Blog posts live in `src/content/blog/` as Markdown or MDX files. The schema is defined in [`src/content.config.ts`](./src/content.config.ts).

```mdx
---
title: 'My article'
description: 'A short summary used in article listings and SEO metadata.'
publishDate: 2026-09-02
category: 'frontend'
tags: ['Astro', 'TypeScript']
featured: false
draft: true
---

Article content goes here.
```

Supported categories are:

- `frontend`
- `architecture`
- `performance`
- `design-systems`
- `react`
- `typescript`
- `tutorial`
- `opinion`

Development shows drafts and scheduled posts. Production only includes non-draft posts whose `publishDate` has passed.

Available MDX components include callouts, YouTube and CodePen embeds, an audio player, charts, Mermaid diagrams, and image comparisons. See the [Blog System Guide](./docs/BLOG_GUIDE.md) for authoring details.

## Project structure

```text
.
├── public/
│   ├── fonts/                  # Self-hosted Inter font files
│   ├── patterns/               # Static visual assets
│   ├── cv-hector.pdf
│   ├── favicon.svg
│   └── social-preview.png
├── src/
│   ├── assets/images/          # Images processed by Astro Assets
│   ├── components/
│   │   ├── blog/               # MDX and blog UI components
│   │   ├── effects/            # WebGL, fireflies, circles, and backgrounds
│   │   ├── layout/             # Navigation, SEO, loading screen, and footers
│   │   ├── modals/             # About modal
│   │   ├── sections/           # Homepage sections
│   │   └── ui/                 # Shared UI components
│   ├── config/                 # Feature flags and redirect definitions
│   ├── content/
│   │   ├── blog/               # MDX articles
│   │   ├── data/               # Structured portfolio data
│   │   └── projects.json
│   ├── i18n/                   # Translation catalogs and helpers
│   ├── layouts/                # Base and blog post layouts
│   ├── lib/                    # Animation, SEO, device, and WebGL utilities
│   ├── pages/                  # Homepage, blog, article, and 404 routes
│   ├── styles/                 # Global tokens, base styles, and fonts
│   ├── content.config.ts       # Content Collection schemas
│   └── middleware.ts           # Configurable redirect middleware
├── docs/                       # Blog and redirect documentation
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Production build

```bash
pnpm build
pnpm preview
```

Astro writes the static site to `dist/`. The build performs type and Astro diagnostics before generating routes and optimized images.

Production CSS is inlined into each page. Vite is configured to separate vendor code and dedicated GSAP or Lenis chunks when those dependencies are imported. The WebGL enhancement is loaded after user intent and only runs on capable desktop devices; the hero image remains visible when WebGL, motion, or hardware requirements are not met.

## Accessibility and motion

The interface includes semantic controls, visible focus styles, keyboard-operable navigation and modal behavior, responsive layouts, and `prefers-reduced-motion` fallbacks. Interactive effects are progressive enhancements: core content and navigation remain available when expensive effects are disabled.

## Contact

- Email: [hi@hectorjaraba.com](mailto:hi@hectorjaraba.com)
- LinkedIn: [linkedin.com/in/hjaraba](https://www.linkedin.com/in/hjaraba)

---

Built with Astro, Tailwind CSS, TypeScript, GSAP, and custom WebGL shaders.
