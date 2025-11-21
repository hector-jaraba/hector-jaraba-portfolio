import readingTime from 'reading-time';

export function getReadingTime(content: string): string {
  const stats = readingTime(content);
  return stats.text;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function extractHeadings(content: string) {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const headings: { depth: number; text: string; slug: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[0].indexOf(' ');
    const text = match[1];
    const slug = slugify(text);
    headings.push({ depth, text, slug });
  }

  return headings;
}
