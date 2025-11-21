import { defineMiddleware } from 'astro:middleware';
import { findRedirect } from './config/redirects';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Check for redirects
  const redirect = findRedirect(pathname);
  if (redirect) {
    return context.redirect(redirect.to, redirect.status);
  }

  // Continue to the next middleware or route
  return next();
});
