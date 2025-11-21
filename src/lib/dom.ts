/**
 * DOM Utilities
 * Helper functions for DOM manipulation and lifecycle management
 */

/**
 * Executes a callback when the DOM is ready and on every Astro page navigation.
 * Works with Astro's View Transitions.
 *
 * @param callback - Function to execute on initialization
 * @param options - Configuration options
 * @param options.runOnce - If true, only runs on initial page load (default: false)
 *
 * @example
 * // Run on every page load (including View Transitions)
 * onInit(() => {
 *   console.log('Page initialized');
 * });
 *
 * @example
 * // Run only once on initial load
 * onInit(() => {
 *   console.log('App initialized');
 * }, { runOnce: true });
 */
export function onInit(
  callback: () => void,
  options: { runOnce?: boolean } = {}
): void {
  const { runOnce = false } = options;

  // Execute immediately if DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }

  // Also run on Astro page navigation (unless runOnce is true)
  if (!runOnce) {
    document.addEventListener('astro:page-load', callback);
  }
}

/**
 * Executes a callback before Astro navigates away from the current page.
 * Useful for cleanup operations.
 *
 * @param callback - Function to execute before navigation
 *
 * @example
 * onBeforeNavigate(() => {
 *   // Clean up resources
 *   animation.kill();
 * });
 */
export function onBeforeNavigate(callback: () => void): void {
  document.addEventListener('astro:before-preparation', callback);
}

/**
 * Executes a callback after Astro navigation is complete.
 *
 * @param callback - Function to execute after navigation
 *
 * @example
 * onAfterNavigate(() => {
 *   console.log('Navigation complete');
 * });
 */
export function onAfterNavigate(callback: () => void): void {
  document.addEventListener('astro:after-swap', callback);
}

/**
 * Safely queries the DOM and executes a callback if element(s) exist.
 *
 * @param selector - CSS selector
 * @param callback - Function to execute with found element(s)
 * @param options - Configuration options
 * @param options.multiple - If true, queries all matching elements (default: false)
 *
 * @example
 * // Single element
 * safeQuery('#hero', (el) => {
 *   el.classList.add('active');
 * });
 *
 * @example
 * // Multiple elements
 * safeQuery('.card', (elements) => {
 *   elements.forEach(el => el.classList.add('visible'));
 * }, { multiple: true });
 */
export function safeQuery<T extends Element = Element>(
  selector: string,
  callback: (element: T) => void,
  options: { multiple?: false }
): void;
export function safeQuery<T extends Element = Element>(
  selector: string,
  callback: (elements: NodeListOf<T>) => void,
  options: { multiple: true }
): void;
export function safeQuery<T extends Element = Element>(
  selector: string,
  callback: ((element: T) => void) | ((elements: NodeListOf<T>) => void),
  options: { multiple?: boolean } = {}
): void {
  const { multiple = false } = options;

  if (multiple) {
    const elements = document.querySelectorAll<T>(selector);
    if (elements.length > 0) {
      (callback as (elements: NodeListOf<T>) => void)(elements);
    }
  } else {
    const element = document.querySelector<T>(selector);
    if (element) {
      (callback as (element: T) => void)(element);
    }
  }
}
