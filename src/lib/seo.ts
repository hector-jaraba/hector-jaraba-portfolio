export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

export function generateSEOMeta(props: SEOProps) {
  const {
    title,
    description,
    canonical = 'https://hectorjaraba.com',
    image = '/og-image.png',
    type = 'website',
    author = 'Héctor Jaraba',
    publishedTime,
    modifiedTime,
    tags = [],
  } = props;

  const fullTitle = title.includes('Héctor Jaraba')
    ? title
    : `${title} | Héctor Jaraba - Senior Frontend Engineer`;

  return {
    title: fullTitle,
    description,
    canonical,
    image: image.startsWith('http') ? image : `${canonical}${image}`,
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
      jobTitle: 'Senior Frontend Engineer',
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
