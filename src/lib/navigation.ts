export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#home', label: 'home' },
  { href: '#about', label: 'about' },
  { href: '#work', label: 'work' },
];

const HERO_TIMELINE = {
  HOME_END: 0.15,
  ABOUT_START: 0.15,
  ABOUT_END: 0.44,
};

let heroBoundariesCache: {
  heroHeight: number;
  homeStart: number;
  homeEnd: number;
  aboutStart: number;
  aboutEnd: number;
  workStart: number;
} | null = null;
let lastWindowWidth = 0;
let lastWindowHeight = 0;

export function updateClock(): string {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
}

function calculateWorkEnd(): number {
  const contactSection = document.getElementById('contact');
  const workExperienceSection = document.getElementById('work-experience');

  let workEnd = contactSection?.offsetTop || document.documentElement.scrollHeight;

  if (workExperienceSection) {
    const horizontalWrapper = workExperienceSection.querySelector('.horizontal-scroll-wrapper');
    // @ts-ignore - ScrollTrigger is added globally by GSAP
    if (horizontalWrapper && typeof window.ScrollTrigger !== 'undefined') {
      // @ts-ignore
      const triggers = window.ScrollTrigger.getAll();
      const workTrigger = triggers.find((t: any) => t.trigger === horizontalWrapper);
      if (workTrigger?.end) {
        workEnd = workTrigger.end;
      }
    }
  }

  return workEnd;
}

function calculateHeroBoundaries() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return null;

  const heroHeight = heroSection.offsetHeight;

  return {
    heroHeight,
    homeStart: 0,
    homeEnd: heroHeight * HERO_TIMELINE.HOME_END,
    aboutStart: heroHeight * HERO_TIMELINE.ABOUT_START,
    aboutEnd: heroHeight * HERO_TIMELINE.ABOUT_END,
    workStart: heroHeight,
  };
}

function getSectionBoundaries() {
  if (lastWindowWidth !== window.innerWidth || lastWindowHeight !== window.innerHeight) {
    heroBoundariesCache = null;
    lastWindowWidth = window.innerWidth;
    lastWindowHeight = window.innerHeight;
  }

  if (!heroBoundariesCache) {
    heroBoundariesCache = calculateHeroBoundaries();
  }

  if (!heroBoundariesCache) return null;

  return {
    ...heroBoundariesCache,
    workEnd: calculateWorkEnd(),
  };
}

export function invalidateNavigationCache() {
  heroBoundariesCache = null;
}

export function getCurrentSectionIndex(
  navLinks: NodeListOf<Element>,
  scrollTop: number,
  windowHeight: number,
  documentHeight: number,
  cachedBoundaries?: ReturnType<typeof getSectionBoundaries>
): number {
  const boundaries = cachedBoundaries || getSectionBoundaries();
  if (!boundaries) return scrollTop === 0 ? 0 : -1;

  let currentIndex = -1;

  navLinks.forEach((link, index) => {
    const sectionId = link.getAttribute('data-section');
    const isLastSection = index === navLinks.length - 1;
    let inSection = false;

    switch (sectionId) {
      case 'home':
        inSection = scrollTop >= boundaries.homeStart && scrollTop < boundaries.homeEnd;
        break;

      case 'about':
        inSection = scrollTop >= boundaries.aboutStart && scrollTop < boundaries.aboutEnd;
        break;

      case 'work':
        inSection = scrollTop >= boundaries.workStart && scrollTop < boundaries.workEnd;
        break;

      case 'contact': {
        const section = document.getElementById('contact');
        if (section) {
          const sectionBottom = section.offsetTop + section.offsetHeight;
          const atBottom = isLastSection && scrollTop + windowHeight >= documentHeight - 10;
          inSection = scrollTop >= boundaries.workEnd && (scrollTop < sectionBottom || atBottom);
        }
        break;
      }

      default: {
        const section = document.getElementById(sectionId || '');
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;
          inSection = scrollTop >= sectionTop && scrollTop < sectionBottom;
        }
      }
    }

    if (inSection) {
      currentIndex = index;
    }
  });

  if (currentIndex === -1 && scrollTop === 0) {
    currentIndex = 0;
  }

  return currentIndex;
}

function calculateSectionProgress(
  sectionId: string | null,
  scrollTop: number,
  boundaries: ReturnType<typeof getSectionBoundaries>,
  windowHeight: number,
  documentHeight: number,
  isLastSection: boolean
): number {
  if (!boundaries) return 0;

  switch (sectionId) {
    case 'home': {
      const range = boundaries.homeEnd - boundaries.homeStart;
      const progress = (scrollTop - boundaries.homeStart) / range;
      return Math.min(Math.max(progress, 0), 1);
    }

    case 'about': {
      const range = boundaries.aboutEnd - boundaries.aboutStart;
      const progress = (scrollTop - boundaries.aboutStart) / range;
      return Math.min(Math.max(progress, 0), 1);
    }

    case 'work': {
      const range = boundaries.workEnd - boundaries.workStart;
      const progress = (scrollTop - boundaries.workStart) / range;
      return Math.min(Math.max(progress, 0), 1);
    }

    case 'contact': {
      const section = document.getElementById('contact');
      if (section) {
        const atBottom = isLastSection && scrollTop + windowHeight >= documentHeight - 10;
        if (atBottom) return 1;

        const contactStart = boundaries.workEnd;
        const contactEnd = section.offsetTop + section.offsetHeight;
        const range = contactEnd - contactStart;
        const progress = (scrollTop - contactStart) / range;
        return Math.min(Math.max(progress, 0), 1);
      }
      return 0;
    }

    default: {
      const section = document.getElementById(sectionId || '');
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const progress = (scrollTop - sectionTop) / sectionHeight;
        return Math.min(Math.max(progress, 0), 1);
      }
      return 0;
    }
  }
}

function hasScrolledPast(
  sectionId: string | null,
  scrollTop: number,
  boundaries: ReturnType<typeof getSectionBoundaries>
): boolean {
  if (!boundaries) return false;

  switch (sectionId) {
    case 'home':
      return scrollTop >= boundaries.homeEnd;
    case 'about':
      return scrollTop >= boundaries.aboutEnd;
    case 'work':
      return scrollTop >= boundaries.workEnd;
    default:
      return false;
  }
}

export function updateNavProgress(
  navLinks: NodeListOf<Element>,
  currentIndex: number,
  scrollTop: number,
  windowHeight: number,
  documentHeight: number,
  cachedBoundaries?: ReturnType<typeof getSectionBoundaries>
): void {
  const boundaries = cachedBoundaries || getSectionBoundaries();
  if (!boundaries) return;

  navLinks.forEach((link, index) => {
    const element = link as HTMLElement;
    const sectionId = link.getAttribute('data-section');
    const isLastSection = index === navLinks.length - 1;

    if (
      index < currentIndex ||
      (index !== currentIndex && hasScrolledPast(sectionId, scrollTop, boundaries))
    ) {
      element.classList.remove('active');
      element.style.setProperty('--fill-width', '100%');
    } else if (index === currentIndex) {
      const progress = calculateSectionProgress(
        sectionId,
        scrollTop,
        boundaries,
        windowHeight,
        documentHeight,
        isLastSection
      );
      element.classList.add('active');
      element.style.setProperty('--fill-width', `${progress * 100}%`);
    } else {
      element.classList.remove('active');
      element.style.setProperty('--fill-width', '0%');
    }
  });
}
