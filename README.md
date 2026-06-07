# Farewise Mobile Prototype

Responsive React prototype for a flight deal discovery and fare comparison app.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run check
```

The deployable static output is generated in `dist/`.

## Deployment

This is a standard Vite single-page app and can be deployed to Vercel, Netlify,
Cloudflare Pages, or any static web host.

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 20 or newer

The current application is a front-end prototype. Flight, profile, price, and
booking data are mocked, and checkout is intentionally disabled.
