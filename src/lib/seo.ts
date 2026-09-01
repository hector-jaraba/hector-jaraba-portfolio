export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

const SITE_URL = 'https://hectorjaraba.com';
const DEFAULT_SOCIAL_IMAGE = '/social-preview.png';

export function generateSEOMeta(props: SEOProps) {
  const {
    title,
    description,
    canonical = SITE_URL,
    image = DEFAULT_SOCIAL_IMAGE,
    imageAlt = 'Héctor Jaraba, Staff Frontend Engineer',
    type = 'website',
    author = 'Héctor Jaraba',
    publishedTime,
    modifiedTime,
    tags = [],
  } = props;

  const fullTitle = title.includes('Héctor Jaraba')
    ? title
    : `${title} | Héctor Jaraba - Staff Frontend Engineer`;

  const canonicalUrl = new URL(canonical, SITE_URL).toString();
  const imageUrl = new URL(image, SITE_URL).toString();

  return {
    title: fullTitle,
    description,
    canonical: canonicalUrl,
    image: imageUrl,
    imageAlt,
    type,
    author,
    publishedTime,
    modifiedTime,
    tags,
  };
}

export function generateStructuredData(type: 'person' | 'portfolio' | 'article', data: any) {
  const baseUrl = 'https://hectorjaraba.com';

  if (type === 'person') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Héctor Jaraba',
      jobTitle: 'Staff Engineer',
      url: baseUrl,
      sameAs: [data.github || '', data.linkedin || ''].filter(Boolean),
      knowsAbout: [
        'React',
        'TypeScript',
        'Next.js',
        'Frontend Architecture',
        'Web Performance',
        'UI/UX Design',
      ],
    };
  }

  if (type === 'portfolio') {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: data.title,
      description: data.description,
      author: {
        '@type': 'Person',
        name: 'Héctor Jaraba',
      },
      image: data.image,
      url: `${baseUrl}/projects/${data.slug}`,
      keywords: data.tags?.join(', '),
    };
  }

  if (type === 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      author: {
        '@type': 'Person',
        name: 'Héctor Jaraba',
      },
      datePublished: data.publishedTime,
      dateModified: data.modifiedTime || data.publishedTime,
      image: data.image,
    };
  }

  return {};
}
