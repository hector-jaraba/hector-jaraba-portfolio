import { getGsap, ScrollTrigger } from '@/lib/gsap';

const gsap = getGsap();

if (typeof window !== 'undefined') {
  (window as any).ScrollTrigger = ScrollTrigger;
}

export function initWorkExperienceAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    const jobCards = document.querySelectorAll('.job-card-wrapper');
    jobCards.forEach((card) => {
      gsap.set(card, { opacity: 1, scale: 1 });
    });
    return;
  }

  const horizontalSection = document.querySelector('.horizontal-scroll-wrapper') as HTMLElement;
  const horizontalContent = document.querySelector('.horizontal-scroll-content') as HTMLElement;
  const jobCards = Array.from(document.querySelectorAll('.job-card-wrapper')) as HTMLElement[];
  const arrow = document.querySelector('#timeline-arrow') as SVGElement;
  const arrowRotationWrapper = document.querySelector('#arrow-rotation-wrapper') as HTMLElement;

  if (
    !horizontalSection ||
    !horizontalContent ||
    !jobCards.length ||
    !arrow ||
    !arrowRotationWrapper
  ) {
    console.error('Work experience elements not found', {
      horizontalSection: !!horizontalSection,
      horizontalContent: !!horizontalContent,
      jobCards: jobCards.length,
      arrow: !!arrow,
      arrowRotationWrapper: !!arrowRotationWrapper,
    });
    return;
  }

  const calculateDimensions = () => {
    const cardWidth = jobCards[0].offsetWidth;
    let cardSpacing = cardWidth;
    if (jobCards.length > 1) {
      const firstCardRect = jobCards[0].getBoundingClientRect();
      const secondCardRect = jobCards[1].getBoundingClientRect();
      const firstCardCenter = firstCardRect.left + firstCardRect.width / 2;
      const secondCardCenter = secondCardRect.left + secondCardRect.width / 2;
      cardSpacing = Math.abs(secondCardCenter - firstCardCenter);
    }

    const viewportCenter = window.innerWidth / 2;
    const initialPaddingLeft = Math.max(0, viewportCenter - cardWidth / 2);
    const totalWidth = initialPaddingLeft + (jobCards.length - 1) * cardSpacing + cardWidth;

    return {
      cardWidth,
      cardSpacing,
      viewportCenter,
      initialPaddingLeft,
      totalWidth,
    };
  };

  let dimensions = calculateDimensions();

  gsap.set(horizontalContent, {
    width: dimensions.totalWidth,
    paddingLeft: dimensions.initialPaddingLeft,
  });

  horizontalSection.setAttribute('data-scroll-width', dimensions.totalWidth.toString());

  const arrowPaths = Array.from(arrow.querySelectorAll('path[stroke]')) as SVGGeometryElement[];
  const arrowCircles = Array.from(arrow.querySelectorAll('circle[stroke]')) as SVGGeometryElement[];
  const arrowElements = [...arrowPaths, ...arrowCircles];

  arrowElements.forEach((el) => {
    const length = el.getTotalLength();
    gsap.set(el, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0,
    });
  });

  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: horizontalSection,
      start: 'top top',
      end: () => {
        const dims = calculateDimensions();
        return `+=${dims.totalWidth}`;
      },
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  mainTimeline.to(horizontalContent, {
    x: () => {
      const dims = calculateDimensions();
      return -(dims.totalWidth - dims.cardWidth);
    },
    ease: 'none',
  });

  jobCards.forEach((card) => {
    gsap.set(card, { opacity: 0.3, scale: 0.9 });
  });

  jobCards.forEach((card, index) => {
    const updateCard = (scrollProgress: number) => {
      const dims = calculateDimensions();
      const currentX = scrollProgress * (dims.totalWidth - dims.cardWidth);
      const cardLeftPosition = dims.initialPaddingLeft + index * dims.cardSpacing;
      const cardCenterInContent = cardLeftPosition + dims.cardWidth / 2;
      const cardCenterInViewport = cardCenterInContent - currentX;
      const distanceFromCenter = Math.abs(cardCenterInViewport - dims.viewportCenter);

      const fadeRange = dims.cardWidth * 0.7;
      let opacity = 1 - distanceFromCenter / fadeRange;
      opacity = Math.max(0.3, Math.min(1, opacity));

      let scale = 0.9 + 0.1 * opacity;

      gsap.set(card, { opacity, scale });

      if (distanceFromCenter < dims.cardWidth * 0.1) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    };

    updateCard(0);

    ScrollTrigger.create({
      trigger: horizontalSection,
      start: 'top top',
      end: () => {
        const dims = calculateDimensions();
        return `+=${dims.totalWidth}`;
      },
      scrub: 0.5,
      onUpdate: (self) => updateCard(self.progress),
      onEnter: () => updateCard(0),
    });
  });

  arrowElements.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      ease: 'linear',
      scrollTrigger: {
        trigger: horizontalSection,
        start: 'top top',
        end: () => {
          const dims = calculateDimensions();
          return `+=${dims.totalWidth}`;
        },
        scrub: 1,
      },
    });
  });

  arrowElements.forEach((el) => {
    gsap.to(el, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSection,
        start: 'top top',
        end: () => {
          const dims = calculateDimensions();
          return `+=${dims.totalWidth}`;
        },
        scrub: 1,
      },
    });
  });

  const filledElements = arrow.querySelectorAll(
    'path[fill]:not([stroke]), circle[fill]:not([stroke])'
  );
  if (filledElements.length > 0) {
    gsap.fromTo(
      filledElements,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection,
          start: 'top top',
          end: () => {
            const dims = calculateDimensions();
            return `+=${dims.totalWidth * 1.3}`;
          },
          scrub: 1,
        },
      }
    );
  }

  const contactSection = document.querySelector('#contact') as HTMLElement;

  if (contactSection) {
    const arrowWrapper = document.querySelector('.arrow-wrapper-fixed') as HTMLElement;

    if (arrowWrapper) {
      const descentTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: contactSection,
          start: 'top bottom', // Start when contact section enters viewport
          end: 'center center',
          scrub: 1,
        },
      });

      descentTimeline.to(arrowWrapper, {
        bottom: 'auto',
        top: '60%',
        right: 'auto',
        left: 'auto',
        duration: 0.2,
        ease: 'power2.out',
      });

      descentTimeline.to(
        arrowRotationWrapper,
        {
          rotation: 0,
          right: '-30%',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        0.1
      );

      descentTimeline.to(
        arrowWrapper,
        {
          top: window.innerWidth <= 768 ? '65vh' : '50vh',
          duration: 0.5,
          ease: 'none',
        },
        0.3
      );

      const arrowClone = arrow.cloneNode(true) as SVGElement;
      arrowClone.id = 'timeline-arrow-dark';
      arrowClone.classList.add('arrow-dark');

      arrowClone.style.position = 'absolute';
      arrowClone.style.top = '50%';
      arrowClone.style.left = '50%';
      arrowClone.style.transform = 'translate(-50%, -50%)';
      arrowClone.style.zIndex = '5';
      arrowClone.style.pointerEvents = 'none';
      arrowClone.style.clipPath = 'inset(0 0 100% 0)';

      const clonedElements = arrowClone.querySelectorAll('path, circle');
      clonedElements.forEach((el) => {
        if (el.getAttribute('fill') && el.getAttribute('fill') !== 'none') {
          el.setAttribute('fill', '#403c50');
        }
        if (el.getAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
          el.setAttribute('stroke', '#403c50');
        }

        const element = el as SVGGeometryElement;
        if (element.style) {
          element.style.strokeDasharray = 'none';
          element.style.strokeDashoffset = '0';
          element.style.opacity = '1';
        }
      });

      if (arrowRotationWrapper) {
        arrowRotationWrapper.style.position = 'relative';
      }

      arrow.parentElement?.insertBefore(arrowClone, arrow);

      ScrollTrigger.create({
        trigger: contactSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: () => {
          const arrowRect = arrow.getBoundingClientRect();
          const contactRect = contactSection.getBoundingClientRect();

          const arrowTop = arrowRect.top;
          const arrowBottom = arrowRect.bottom;
          const arrowHeight = arrowRect.height;
          const contactTop = contactRect.top;

          let enteredPercentage = 0;

          if (contactTop < arrowBottom) {
            if (arrowTop < contactTop) {
              const enteredFromBottom = arrowBottom - contactTop;
              enteredPercentage = Math.max(0, Math.min(1, enteredFromBottom / arrowHeight));
            } else {
              enteredPercentage = 1;
            }
          } else {
            enteredPercentage = 0;
          }

          const whiteBottomInset = enteredPercentage * 100;
          const tealBottomInset = (1 - enteredPercentage) * 100;

          if (enteredPercentage === 0) {
            arrow.style.clipPath = 'none';
            arrowClone.style.clipPath = 'inset(0 0 100% 0)';
          } else {
            arrow.style.clipPath = `inset(0 0 ${whiteBottomInset}% 0)`;
            arrowClone.style.clipPath = `inset(${tealBottomInset}% 0 0 0)`;
          }
        },
      });
    }
  }

  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      dimensions = calculateDimensions();

      gsap.set(horizontalContent, {
        width: dimensions.totalWidth,
        paddingLeft: dimensions.initialPaddingLeft,
      });

      horizontalSection.setAttribute('data-scroll-width', dimensions.totalWidth.toString());

      ScrollTrigger.refresh();
    }, 250);
  });
}
