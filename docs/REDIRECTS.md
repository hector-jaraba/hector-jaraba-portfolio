# Redirects Configuration

This project includes a simple and flexible redirect system for managing URL redirects.

## How to Add Redirects

Edit the `/src/config/redirects.ts` file to add your redirects:

```typescript
export const redirects: Redirect[] = [
  {
    from: '/old-url',
    to: '/new-url',
    status: 301, // Permanent redirect
  },
  {
    from: '/temporary',
    to: '/current',
    status: 302, // Temporary redirect
  },
];
```

## Redirect Types

### 301 - Permanent Redirect
Use `status: 301` when:
- The page has permanently moved to a new location
- You want search engines to update their index
- The old URL should no longer be used

Example:
```typescript
{
  from: '/old-blog',
  to: '/blog',
  status: 301,
}
```

### 302 - Temporary Redirect
Use `status: 302` when:
- The redirect is temporary
- The page might move back to the original URL
- You don't want search engines to update their index

Example:
```typescript
{
  from: '/maintenance',
  to: '/temp-page',
  status: 302,
}
```

## Common Use Cases

### Renaming a page
```typescript
{
  from: '/about-us',
  to: '/about',
  status: 301,
}
```

### Redirecting blog posts
```typescript
{
  from: '/blog/old-post-slug',
  to: '/blog/new-post-slug',
  status: 301,
}
```

### Maintenance mode
```typescript
{
  from: '/shop',
  to: '/maintenance',
  status: 302,
}
```

### External redirects
```typescript
{
  from: '/github',
  to: 'https://github.com/hector-jaraba',
  status: 302,
}
```

## How It Works

The redirect system uses Astro middleware (`/src/middleware.ts`) to intercept requests before they reach the page. If a matching redirect is found, it returns the appropriate HTTP status code and redirects to the target URL.

## 404 Page

If no redirect is found and the page doesn't exist, users will see the custom 404 page located at `/src/pages/404.astro`.

The 404 page includes:
- Animated error message
- "Go Home" and "Go Back" buttons
- Quick links to popular pages

## Testing Redirects

1. Add your redirect to `/src/config/redirects.ts`
2. Restart the dev server: `pnpm run dev`
3. Navigate to the "from" URL
4. You should be redirected to the "to" URL

## Notes

- Redirects are processed before any page rendering
- The middleware runs on every request
- Redirects work in both development and production
- Make sure the "from" path matches exactly (including trailing slashes)
