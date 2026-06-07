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

## Automated tests

The Playwright suite covers authentication entry points, flight search,
fare details, price forecasting, booking-site comparison, primary navigation,
browser errors, and responsive overflow.

```bash
npx playwright install chromium
npm run test:e2e
```

Run against an existing deployment:

```bash
BASE_URL=http://44.222.153.140 npm run test:e2e
```

## Deployment

This is a standard Vite single-page app and can be deployed to Vercel, Netlify,
Cloudflare Pages, or any static web host.

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 20 or newer

The current application is a front-end prototype. Flight, profile, price, and
booking data are mocked, and checkout is intentionally disabled.
