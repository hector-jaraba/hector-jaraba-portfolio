import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function getGsap() {
  return gsap;
}

export function getScrollTrigger() {
  return ScrollTrigger;
}

export function configureScrollTrigger(config: ScrollTrigger.ConfigVars) {
  ScrollTrigger.config(config);
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

export function createTimeline(config?: gsap.TimelineVars) {
  return gsap.timeline(config);
}

export function matchMedia() {
  return gsap.matchMedia();
}

export default gsap;
export { ScrollTrigger };
