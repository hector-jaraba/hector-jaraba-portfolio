import { getGsap } from '@/lib/gsap';

export function initTitleRevealAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const titles = document.querySelectorAll('.section-title');

  if (!titles.length) return;

  titles.forEach((title) => {
    if (title.classList.contains('title-animated')) return;
    title.classList.add('title-animated');
    const gsap = getGsap();

    if (prefersReducedMotion) {
      gsap.set(title, { opacity: 0 });
      ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(title, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        },
      });
      return;
    }

    gsap.set(title, {
      opacity: 0,
      filter: 'blur(10px)',
      y: 20,
    });

    ScrollTrigger.create({
      trigger: title,
      start: 'top bottom-=100',
      once: true,
      onEnter: () => {
        gsap.to(title, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });

    const cleanup = () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === title) {
          trigger.kill();
        }
      });
    };

    document.addEventListener('astro:before-preparation', cleanup, { once: true });
  });
}

function init() {
  initTitleRevealAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

document.addEventListener('astro:page-load', init);
