import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/[^_]*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Héctor Jaraba'),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum([
      'frontend',
      'architecture',
      'performance',
      'design-systems',
      'react',
      'typescript',
      'tutorial',
      'opinion',
    ]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: file('./src/content/projects.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    year: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    image: z.string(),
    link: z.string().optional(),
    github: z.string().optional(),
    tech: z.array(z.string()),
    highlights: z.array(z.string()),
  }),
});

export const collections = {
  blog,
  projects,
};
