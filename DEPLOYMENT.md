# Royalties Buffet — Vercel Deployment

Royalties Buffet is configured as a full-stack Vercel project.

- Vite builds the React client into `dist/`.
- Vercel serves the static frontend directly from `dist/`.
- Express is exposed through Vercel Node.js serverless functions under `api/`.
- `/api/*` remains on the same Vercel origin as the website, so HttpOnly admin cookies continue to work without cross-domain auth.
- BrowserRouter routes such as `/menu`, `/reservation`, `/admin`, and `/admin/reservations` fall back to `dist/index.html` when refreshed directly.
- MongoDB connections are reused while a serverless instance remains warm.

## Required external services

- MongoDB Atlas
- Resend for production email delivery
- Vercel for frontend + serverless API hosting

## Vercel project setup

1. Push the latest `main` branch to GitHub.
2. In Vercel, choose **Add New Project** and import `Shahzadkhanks19/royalties-buffet`.
3. Vercel should detect Vite. The repository `vercel.json` already defines the production build and SPA routing.
4. Keep the project root as the repository root.
5. Add the production environment variables listed below.
6. Deploy.

You do not need a second backend deployment and you do not need to run `npm start` on Vercel. Vercel invokes the files in `api/` as serverless functions automatically.

## Production environment variables

Add these in **Vercel → Project Settings → Environment Variables** for Production. Add them to Preview too if you want preview deployments to have a working database/admin/API.

```env
CLIENT_ORIGIN=https://your-production-domain.com
VITE_SITE_URL=https://your-production-domain.com

MONGODB_URI=mongodb+srv://...

ADMIN_EMAIL=admin@your-domain.com
ADMIN_PASSWORD=use-a-strong-initial-password
ADMIN_SESSION_SECRET=use-a-cryptographically-random-secret-at-least-48-characters-long

RESEND_API_KEY=re_...
ADMIN_FROM_EMAIL=Royalties Buffet <noreply@your-domain.com>
```

Vercel supplies `NODE_ENV=production` and its own runtime variables. `TRUST_PROXY` does not need to be set on Vercel because the application detects the Vercel runtime and enables Express proxy trust automatically.

`ADMIN_EMAIL` and `ADMIN_PASSWORD` seed the first MongoDB admin account only. Once the account exists, change the password through the Forgot/Reset Password workflow rather than editing `ADMIN_PASSWORD`.

For Resend production delivery, verify the sending domain and use an address on that verified domain. `onboarding@resend.dev` is only suitable for testing.

## Production domain and SEO

Set both values to the final public HTTPS origin:

```env
CLIENT_ORIGIN=https://www.example.com
VITE_SITE_URL=https://www.example.com
```

`CLIENT_ORIGIN` is used by backend origin/CORS checks and password reset links. `VITE_SITE_URL` is used at build time to generate canonical URLs, `robots.txt`, and `sitemap.xml`.

If `VITE_SITE_URL` is missing, the build intentionally generates noindex-safe SEO files. That is useful for local/preview environments but should not be left unset for the production domain.

When using a Vercel preview deployment, its URL differs from the production domain. If Preview needs fully functional mutation requests, set Preview-scoped `CLIENT_ORIGIN` appropriately or use the production/custom domain for final end-to-end testing.

## MongoDB Atlas

Use a dedicated Atlas database/user for Royalties Buffet. The Vercel functions connect through `MONGODB_URI` and reuse the Mongoose connection within warm serverless instances.

Atlas network access must allow requests from the Vercel runtime. For a simple initial deployment, Atlas deployments commonly allow `0.0.0.0/0` and rely on strong database credentials/TLS; for stricter networking, use the networking options supported by your Atlas/Vercel plans.

Never commit the MongoDB connection string to GitHub.

## Validate before deployment

Run locally before pushing:

```bash
npm ci
npm run check
```

`npm run check` runs the static project audit, ESLint with zero warnings, SEO generation, and the Vite production build.

## Serverless API structure

The Vercel entrypoints are:

```text
api/index.js
api/[...path].js
```

Both delegate to the shared Express handler in `server/vercelHandler.js`. The normal local development server still uses `server/index.js`, so this continues to work locally:

```bash
npm run dev
```

## SPA routing

`vercel.json` first lets Vercel resolve real files/functions. Any remaining browser route falls back to `/index.html`. Therefore URLs such as these can be opened or refreshed directly:

```text
/about
/menu
/reservation
/admin/login
/admin/reservations
```

API routes are resolved as serverless functions before the SPA fallback.

## Health check

After deployment, open:

```text
https://your-domain.com/api/health
```

A healthy response should report:

- `ok: true`
- `database: connected`
- `runtime: vercel`

If the database says `disconnected` or the function returns an initialization error, check the Vercel Function Logs and the `MONGODB_URI` environment variable.

## Deployment updates

Once GitHub is connected to Vercel, normal updates are:

```bash
git push origin main
```

Vercel automatically builds and deploys the new commit. Run `npm run check` locally before pushing production changes.

## Local production mode

`npm start` is retained for non-Vercel/self-hosted use. Vercel does not use that command for request handling.

Do not commit `.env` or any production secrets to GitHub.
