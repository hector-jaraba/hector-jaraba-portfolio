/**
 * Redirects configuration
 *
 * Define your redirects here for easy management.
 * Supports 301 (permanent) and 302 (temporary) redirects.
 */

export interface Redirect {
  from: string;
  to: string;
  status: 301 | 302;
}

export const redirects: Redirect[] = [
  // Example redirects:
  // {
  //   from: '/old-blog',
  //   to: '/blog',
  //   status: 301, // Permanent redirect
  // },
  // {
  //   from: '/temp-page',
  //   to: '/new-page',
  //   status: 302, // Temporary redirect
  // },
];

/**
 * Find a redirect for the given path
 */
export function findRedirect(path: string): Redirect | undefined {
  return redirects.find((redirect) => redirect.from === path);
}
