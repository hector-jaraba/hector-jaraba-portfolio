export const useDevices = () => {
  const isDesktop = window.innerWidth >= 1024;
  const isPowerful = navigator.hardwareConcurrency >= 4;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isAbleToRunEffects = isDesktop && isPowerful && !prefersReducedMotion;
  return {
    isDesktop,
    isPowerful,
    prefersReducedMotion,
    isAbleToRunEffects,
  };
};
