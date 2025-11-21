# Blog Feature Flag

The blog system is currently behind a feature flag and only accessible in **development mode**.

## Current Status

- **Development**: Blog is fully accessible at `/blog`
- **Production**: Blog pages redirect to home page

## Accessing Blog in Development

```bash
pnpm run dev
```

Then navigate to: `http://localhost:4321/blog`

## Enabling Blog in Production

To enable the blog in production, remove the feature flag checks:

### 1. Remove from blog listing page

Edit `src/pages/blog.astro` and remove lines 7-10:

```diff
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import { formatDate, getReadingTime } from '../utils/blog';
import { generateSEOMeta } from '../utils/seo';

- // Feature flag: Blog only available in development
- if (import.meta.env.PROD) {
-   return Astro.redirect('/');
- }

const allPosts = await getCollection('blog', ({ data }) => {
  return !data.draft;
});
```

### 2. Remove from blog post pages

Edit `src/pages/blog/[slug].astro` and remove lines 6-9:

```diff
export async function getStaticPaths() {
-   // Feature flag: Blog only available in development
-   if (import.meta.env.PROD) {
-     return [];
-   }

  const posts = await getCollection('blog', ({ data }) => {
    return !data.draft;
  });
```

### 3. Add blog to navigation

Edit `src/utils/navigation.ts` and add the blog link:

```diff
export const navLinks: NavLink[] = [
  { href: '#hero', label: 'home' },
  { href: '#about', label: 'about' },
  { href: '#expertise', label: 'work' },
+  { href: '/blog', label: 'blog' },
  { href: '#contact', label: 'contact' },
];
```

### 4. Rebuild

```bash
pnpm run build
```

The blog will now be accessible in production at `/blog`.

## Why Feature Flag?

The blog system is complete and production-ready but kept behind a feature flag to allow you to:

1. Test and preview in development
2. Create and prepare blog content
3. Enable when ready to launch publicly
4. Control timing of blog launch independently from other features

## Development Workflow

1. **Create posts** in `src/content/blog/*.mdx`
2. **Preview locally** with `pnpm run dev`
3. **Test thoroughly** before production release
4. **Enable in production** when ready (follow steps above)
5. **Deploy** to your hosting platform

## Feature Completeness

Even with the feature flag enabled, all blog functionality is complete:

- ✅ MDX content support
- ✅ Syntax highlighting
- ✅ Rich media components
- ✅ Table of contents
- ✅ Category filtering
- ✅ SEO optimization
- ✅ Reading time calculation
- ✅ Responsive design
- ✅ Animations
- ✅ Example posts

## Notes

- Blog posts are **not** built in production builds (saves build time)
- All blog assets and components are still included in the bundle
- Minimal impact on production bundle size
- No broken links since blog is not linked from navigation
- Direct URL access to `/blog` redirects to home page in production
