import en from './locales/en.json';
import es from './locales/es.json';

export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const translations = {
  en,
  es,
};

export type Locale = keyof typeof languages;

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Locale;
  return defaultLang;
}

export function useTranslations(lang: Locale = defaultLang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLang) {
    return path;
  }
  return `/${locale}${path}`;
}

export function getAlternateLinks(currentPath: string) {
  const cleanPath = currentPath.replace(/^\/(en|es)/, '');
  return Object.keys(languages).map((lang) => ({
    lang,
    url: getLocalizedPath(cleanPath || '/', lang as Locale),
  }));
}
