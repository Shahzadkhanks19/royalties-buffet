# Royalties Buffet — Production Deployment

Royalties Buffet is deployed as one Node.js service in production.

- Vite builds the React client into `dist/`.
- Express serves `dist/` and all `/api/*` endpoints from the same process.
- BrowserRouter routes such as `/menu`, `/reservation`, and `/admin` fall back to `dist/index.html` on direct refresh.
- Hashed files under `dist/assets/` receive long-lived immutable cache headers.
- API routes never use the SPA fallback.

## Runtime requirements

- Node.js 22.12.0 or newer
- MongoDB connection string
- HTTPS production domain
- A reverse proxy / platform proxy in front of Node for TLS (Nginx, Cloudflare, managed hosting proxy, etc.)

## Production environment

```env
NODE_ENV=production
PORT=5000
CLIENT_ORIGIN=https://your-domain.com
TRUST_PROXY=true

VITE_SITE_URL=https://your-domain.com

MONGODB_URI=mongodb+srv://...

ADMIN_EMAIL=admin@your-domain.com
ADMIN_PASSWORD=use-a-strong-initial-password
ADMIN_SESSION_SECRET=use-a-cryptographically-random-secret-at-least-48-characters-long

RESEND_API_KEY=re_...
ADMIN_FROM_EMAIL=Royalties Buffet <noreply@your-domain.com>
```

`ADMIN_EMAIL` and `ADMIN_PASSWORD` seed the first MongoDB admin account only. After the account exists, use the Forgot/Reset Password workflow to change its password.

For production email delivery, verify the sending domain with Resend and replace the testing `onboarding@resend.dev` address.

## Validate before deployment

```bash
npm ci
npm run check
```

`npm run check` runs the project static rules audit, ESLint with zero warnings allowed, SEO generation, and the Vite production build.

When `VITE_SITE_URL` is set, SEO generation creates production canonical/robots/sitemap output. When it is missing, the generator intentionally produces noindex-safe output.

## Start production

Build first:

```bash
npm run build
```

Then start the Express application:

```bash
npm start
```

The Node process serves both the website and API on `PORT`.

## Health check

```text
GET /api/health
```

The response reports the service environment, MongoDB connection state, and current timestamp. Configure the hosting platform or reverse proxy to use this endpoint for application health checks where supported.

## Reverse proxy

Forward the public HTTPS origin to the Node process on `127.0.0.1:5000` (or the configured `PORT`). Preserve the original host/protocol headers and enable WebSocket forwarding if future realtime features require it.

Do not expose the Node port publicly when a reverse proxy is available. Allow public traffic through ports 80/443 only and redirect HTTP to HTTPS.

Because `TRUST_PROXY=true` is required in production behind a proxy, Express can use the real client IP for rate limiting and HTTPS-aware security behavior.

## Deployment sequence for updates

```bash
git pull --rebase origin main
npm ci
npm run check
npm run build
# restart the production Node process through the selected process manager/platform
```

Do not commit `.env` or production secrets to GitHub.
