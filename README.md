# Héctor Jaraba - Portfolio Website

A modern, high-performance portfolio website built with Astro, featuring smooth animations, dark design, and excellent performance scores.

## Features

- **Fast & Performant**: Built with Astro for optimal performance (SSG, minimal JS)
- **Modern Animations**: GSAP timeline animations with `prefers-reduced-motion` support
- **Dark Theme**: Premium dark/obscure color palette with optional contrast mode
- **Fully Responsive**: Mobile-first design with breakpoints for all devices
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Accessible**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Progressive Enhancement**: Core content works without JavaScript
- **Type-Safe**: Built with TypeScript for reliability and maintainability
- **Blog System**: Full-featured blog with MDX, syntax highlighting, and rich media components (development only, behind feature flag)

## Tech Stack

- **Framework**: [Astro](https://astro.build) v5.14+
- **Content**: [MDX](https://mdxjs.com) for rich blog posts
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v3.4+
- **Animations**: [GSAP](https://greensock.com/gsap/) v3.12+
- **Syntax Highlighting**: [Shiki](https://shiki.matsu.io)
- **Language**: TypeScript v5.7+
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm 8+ (install with `npm install -g pnpm`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hector-jaraba/personal-site.git
cd personal-site
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

The site will be available at `http://localhost:4321`

### Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build for production (includes type checking)
- `pnpm run preview` - Preview production build locally
- `pnpm run astro` - Run Astro CLI commands

## Project Structure

```
/
├── public/               # Static assets (favicon, images, fonts)
│   ├── favicon.svg
│   ├── images/
│   └── fonts/
├── src/
│   ├── components/       # Reusable Astro components
│   │   ├── blog/         # Blog-specific components
│   │   │   ├── Callout.astro
│   │   │   ├── YouTubeEmbed.astro
│   │   │   ├── CodePen.astro
│   │   │   ├── AudioPlayer.astro
│   │   │   └── ImageComparison.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Navigation.astro
│   │   ├── SEOHead.astro
│   │   └── SmoothScroll.astro
│   ├── content/          # Content collections
│   │   ├── config.ts     # Collection schemas
│   │   ├── projects.json
│   │   └── blog/         # Blog posts (MDX)
│   │       ├── building-scalable-react-architectures.mdx
│   │       ├── optimizing-web-performance.mdx
│   │       └── typescript-advanced-patterns.mdx
│   ├── layouts/          # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── pages/            # File-based routing
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── blog.astro    # Blog listing
│   │   ├── contact.astro
│   │   ├── projects.astro
│   │   ├── blog/
│   │   │   └── [slug].astro  # Dynamic blog posts
│   │   └── projects/
│   │       └── [slug].astro
│   ├── styles/           # Global styles
│   │   └── global.css
│   └── utils/            # Utility functions
│       └── seo.ts
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Customization

### Editing Content

#### Blog Posts

**Note: Blog is currently behind a feature flag and only accessible in development mode.**

To access in development:

```bash
pnpm run dev
# Navigate to http://localhost:4321/blog
```

See [BLOG_FEATURE_FLAG.md](./BLOG_FEATURE_FLAG.md) for instructions on enabling in production.

Create new blog posts in `src/content/blog/` as `.mdx` files. See [BLOG_GUIDE.md](./BLOG_GUIDE.md) for comprehensive documentation.

Quick example:

```mdx
---
title: 'My Blog Post'
description: 'A short description'
publishDate: 2024-03-15
category: 'frontend'
tags: ['React', 'TypeScript']
---

Your content here with full Markdown and MDX support...
```

Features:

- Automatic table of contents
- Syntax highlighting for code blocks
- Rich media components (YouTube, CodePen, audio, etc.)
- Reading time calculation
- SEO optimization
- Category filtering

## Performance

This site is optimized for Lighthouse scores ≥90 in all categories:

- **Performance**: Code-splitting, lazy loading, minimal JS
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Best Practices**: HTTPS, secure headers, optimized images
- **SEO**: Meta tags, structured data, sitemap

### Performance Tips

- Images use modern formats (AVIF/WebP) with fallbacks
- Critical CSS inlined, non-critical deferred
- Animations respect `prefers-reduced-motion`
- Smooth scroll disabled on low-power devices
- Minimal JavaScript shipped to client

## Contact

- Email: hello@hector-jaraba.dev
- GitHub: [@hector-jaraba](https://github.com/hector-jaraba)
- LinkedIn: [hjaraba](https://linkedin.com/in/hjaraba)

---

Built with Astro, Tailwind CSS, GSAP, and Lenis.
