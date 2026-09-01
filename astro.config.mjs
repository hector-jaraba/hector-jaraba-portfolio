import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { FEATURES } from './src/config/features';

// https://astro.build/config
export default defineConfig({
  site: 'https://hectorjaraba.com',
  integrations: [
    mdx(),
  ],
  markdown: {
    processor: unified({
      syntaxHighlight: false,
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'one-dark-pro',
            keepBackground: false,
          },
        ],
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['anchor-link'],
            },
          },
        ],
      ],
    }),
  },
  output: 'static',
  // Conditionally enable i18n based on feature flag
  ...(FEATURES.I18N_ENABLED && {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'es'],
      routing: {
        prefixDefaultLocale: false,
      },
    },
  }),
  build: {
    inlineStylesheets: 'always',
    assets: '_astro',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: false,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Separate vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (id.includes('gsap')) return 'gsap';
              if (id.includes('lenis')) return 'lenis';
              return 'vendor';
            }
          },
        },
      },
    },
  },
  image: {
    domains: [],
    remotePatterns: [],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  compressHTML: true,
});
