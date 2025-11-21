# Blog System Guide

This guide explains how to create and manage blog posts on your portfolio website.

## Quick Start

### Creating a New Blog Post

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter with required metadata
3. Write your content using Markdown/MDX
4. Build and deploy

Example filename: `my-awesome-post.mdx`

The URL will automatically be: `https://yoursite.com/blog/my-awesome-post`

## Frontmatter Configuration

Every blog post requires frontmatter metadata at the top of the file:

```mdx
---
title: 'Your Blog Post Title'
description: 'A compelling description for SEO and previews'
publishDate: 2024-03-15
category: 'frontend'
tags: ['React', 'TypeScript', 'Performance']
featured: true
image:
  src: '/images/blog/my-post.jpg'
  alt: 'Description of the image'
---

Your content goes here...
```

### Required Fields

- **title**: The main title of your post
- **description**: Brief summary (used for SEO and post cards)
- **publishDate**: Publication date (YYYY-MM-DD format)
- **category**: Must be one of:
  - `frontend`
  - `architecture`
  - `performance`
  - `design-systems`
  - `react`
  - `typescript`
  - `tutorial`
  - `opinion`

### Optional Fields

- **tags**: Array of tags for categorization
- **featured**: Set to `true` to highlight this post
- **draft**: Set to `true` to hide from production
- **updatedDate**: Date when post was last updated
- **author**: Author name (defaults to "Héctor Jaraba")
- **image**: Featured image object with `src` and `alt`

## Writing Content

### Basic Markdown

Use standard Markdown syntax:

```markdown
## Headings

Use ## for main headings (H2)
Use ### for subheadings (H3)

**Bold text** and *italic text*

- Bullet points
- Like this

1. Numbered lists
2. Like this

[Link text](https://example.com)
```

### Code Blocks

Syntax highlighting is automatic. Specify the language:

\`\`\`typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
\`\`\`

\`\`\`javascript
const result = greet('World');
console.log(result);
\`\`\`

\`\`\`css
.my-class {
  color: var(--primary);
  padding: 1rem;
}
\`\`\`

### Inline Code

Use backticks for `inline code` like variable names or short snippets.

## Rich Media Components

### Callouts

Import and use callout components for important information:

```mdx
import Callout from '../../components/blog/Callout.astro';

<Callout type="info" title="Important Note">
  This is an informational callout.
</Callout>

<Callout type="warning" title="Warning">
  This is a warning callout.
</Callout>

<Callout type="success" title="Pro Tip">
  This is a success callout.
</Callout>

<Callout type="error" title="Error">
  This is an error callout.
</Callout>
```

### YouTube Videos

Embed YouTube videos:

```mdx
import YouTubeEmbed from '../../components/blog/YouTubeEmbed.astro';

<YouTubeEmbed id="dQw4w9WgXcQ" title="Video Title" />
```

The `id` is the video ID from the YouTube URL (after `v=`).

### Audio Player

Add audio files:

```mdx
import AudioPlayer from '../../components/blog/AudioPlayer.astro';

<AudioPlayer
  src="/audio/podcast-episode.mp3"
  title="Podcast Episode 1"
/>
```

### CodePen Embeds

Embed CodePen demos:

```mdx
import CodePen from '../../components/blog/CodePen.astro';

<CodePen
  id="abcdef"
  title="My Demo"
  height={500}
  defaultTab="result"
/>
```

### Image Comparisons

Create before/after image comparisons:

```mdx
import ImageComparison from '../../components/blog/ImageComparison.astro';

<ImageComparison
  before="/images/before.jpg"
  after="/images/after.jpg"
  alt="Performance optimization results"
/>
```

## Images

### Adding Images

1. Place images in `public/images/blog/`
2. Reference them in your post:

```markdown
![Alt text](/images/blog/my-image.jpg)
```

### Image Best Practices

- Use descriptive filenames: `react-component-structure.jpg`
- Optimize images before uploading (use WebP or AVIF)
- Always include alt text for accessibility
- Keep file sizes under 500KB
- Use 1200x630px for featured images (good for social sharing)

## Table of Contents

The table of contents is automatically generated from H2 and H3 headings. To ensure good TOC:

- Use ## for main sections
- Use ### for subsections
- Keep heading text concise
- Use descriptive heading names

## SEO Optimization

### URL Structure

URLs are automatically generated from filenames:

- `building-scalable-apps.mdx` → `/blog/building-scalable-apps`
- Use lowercase with hyphens
- Keep URLs short and descriptive
- Avoid special characters

### Meta Description

Write compelling descriptions (150-160 characters):

```yaml
description: 'Learn how to build scalable React applications with advanced patterns, performance optimization, and best practices.'
```

### Tags

Use relevant tags for better discoverability:

```yaml
tags: ['React', 'Performance', 'Best Practices', 'TypeScript']
```

## Categories

Choose the most appropriate category:

- **frontend**: General frontend development topics
- **architecture**: Software architecture and design patterns
- **performance**: Performance optimization and Web Vitals
- **design-systems**: Design system development
- **react**: React-specific content
- **typescript**: TypeScript-specific content
- **tutorial**: Step-by-step tutorials
- **opinion**: Opinion pieces and thought leadership

## Publishing Workflow

### 1. Draft Mode

While writing, set `draft: true` in frontmatter:

```yaml
---
title: 'Work in Progress'
draft: true
# ... other fields
---
```

### 2. Preview Locally

```bash
pnpm run dev
```

Visit `http://localhost:4321/blog/your-post-slug`

### 3. Publish

When ready to publish:
1. Set `draft: false` (or remove the draft field)
2. Verify all metadata is correct
3. Check images are optimized
4. Review content for typos
5. Build and deploy

```bash
pnpm run build
pnpm run preview  # Test production build
```

## Advanced Features

### Custom Components

You can create custom MDX components in `src/components/blog/`:

```astro
---
// src/components/blog/MyComponent.astro
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="my-component">
  <h3>{title}</h3>
  <slot />
</div>
```

Use in your post:

```mdx
import MyComponent from '../../components/blog/MyComponent.astro';

<MyComponent title="Custom Section">
  Content goes here
</MyComponent>
```

### Code Block Features

The syntax highlighter supports:

- Line highlighting (coming soon)
- Line numbers (coming soon)
- Copy button (coming soon)
- Multiple themes

## Common Issues

### Post Not Showing

1. Check `draft: false` in frontmatter
2. Verify filename is `.mdx` not `.md`
3. Ensure frontmatter is valid YAML
4. Check category is one of the allowed values
5. Rebuild the site

### Images Not Loading

1. Images must be in `public/` directory
2. Use absolute paths starting with `/`
3. Check file extension matches actual file
4. Clear cache and rebuild

### Syntax Highlighting Not Working

1. Specify language after opening backticks
2. Check language is supported by Shiki
3. Verify no extra spaces after language name

## Content Guidelines

### Writing Style

- Use clear, concise language
- Break content into scannable sections
- Include practical examples
- Add code snippets for technical content
- Use callouts to highlight important information

### Length

- Aim for 1000-2000 words for standard posts
- Tutorials can be longer (2000-4000 words)
- Quick tips can be shorter (500-1000 words)

### Code Examples

- Keep code examples focused and minimal
- Add comments to explain complex logic
- Use TypeScript for type safety examples
- Test all code before publishing

## Maintenance

### Updating Posts

To update a post:

1. Edit the `.mdx` file
2. Update `updatedDate` in frontmatter
3. Add note about what changed (optional)
4. Rebuild and deploy

### Archiving Old Posts

To archive (but not delete):

```yaml
draft: true
# or move to src/content/blog/archive/
```

## Performance Tips

1. Optimize images before uploading
2. Use lazy loading for media
3. Keep code blocks concise
4. Limit external embeds
5. Use modern image formats (WebP, AVIF)

## Need Help?

- Check existing blog posts for examples
- Review component source in `src/components/blog/`
- Refer to [Astro documentation](https://docs.astro.build)
- Refer to [MDX documentation](https://mdxjs.com)

## Examples

See these example posts for reference:

- `src/content/blog/building-scalable-react-architectures.mdx`
- `src/content/blog/optimizing-web-performance.mdx`
- `src/content/blog/typescript-advanced-patterns.mdx`

Each demonstrates different features and content types.
