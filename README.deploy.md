# LeBonResto Marketing — Deployment Guide

This document covers the full deployment path for the `lebonresto-marketing` Next.js 14 site to Vercel, targeting the production domain **business.lebonresto.ma**.

---

## 1. Prerequisites

Before deploying, make sure you have:

- **Vercel account** with access to the LeBonResto team/organization on Vercel.
  - Ability to create/link a new project.
  - Owner or Developer role (needed to configure env vars, domains, and secrets).
- **Vercel CLI** installed locally (optional but recommended for `npm run deploy:*`):
  ```bash
  npm i -g vercel
  vercel login
  ```
- **DNS access to `lebonresto.ma`** (registrar dashboard or DNS provider) to add the CNAME for the subdomain `business.lebonresto.ma`.
- **GitHub repository** connected to the Vercel project so that `git push` to the production branch triggers auto-deploys.
- Node.js 20+ locally to match Vercel's runtime.

---

## 2. Environment variables

Set these in **Vercel dashboard → Project → Settings → Environment Variables** for each environment (`Production`, `Preview`, `Development`).

| Variable | Scope | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Optional | Reserved for future use — canonical URL is currently hardcoded to `https://lebonresto.ma` in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`. | `https://business.lebonresto.ma` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Reserved for future use — WhatsApp Business number is currently hardcoded to `212644440525` in `wa.me/*` links across the site. | `212644440525` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Plausible domain identifier for `Analytics.tsx`. Leave empty to skip loading Plausible entirely — no cookie, no request. Add later if/when you sign up. | `business.lebonresto.ma` |
| `NEXT_PUBLIC_CLARITY_ID` | Optional (Production) | Microsoft Clarity project ID for session replay + heatmaps. Leave empty in Preview to avoid recording localhost/preview sessions. | `xh2ryb8blh` |
| `LEADS_WEBHOOK_URL` | Production, Preview | Slack / Zapier / n8n webhook that receives new lead submissions. **Secret.** | `https://hooks.slack.com/services/…` |
| `LEADS_EMAIL_TO` | Production, Preview | Recipient for internal lead notifications. Defaults to `anass.essadikine2@gmail.com` if unset. | `anass.essadikine2@gmail.com` |
| `BREVO_API_KEY` | Production, Preview | Brevo (Sendinblue) v3 API key. Same tenant as `lebonresto-backend`. **Secret.** | `xkeysib-…` |
| `BREVO_FROM` | Production, Preview | Sender identity in `Name <email>` format. Same var name as `lebonresto-backend`. | `LeBonResto <le.bon.restau@gmail.com>` |
| `BREVO_REPLY_TO` | Production, Preview | Default Reply-To address when a route doesn't override it. Same var name as `lebonresto-backend`. | `le.bon.restau@gmail.com` |
| `NEXT_TELEMETRY_DISABLED` | All | Disable Next.js telemetry on Vercel builds. | `1` |

> **Note.** Per-IP rate limiting on `/api/leads/*` is not yet wired. Add `@upstash/ratelimit` (or an in-memory bucket keyed by `x-forwarded-for`) inside each route handler if abuse becomes a concern — Brevo API calls fire on every valid POST.

Guidelines:

- Never commit `.env*` files to git.
- Use `Encrypted` (default) for anything that is not a `NEXT_PUBLIC_*` value.
- After changing an env var, redeploy the affected environment (Vercel does not hot-reload existing deployments).

---

## 3. Deployment steps

### Option A — Git-driven (recommended)

1. Push to `main` (or the branch configured as **Production Branch** in Vercel).
   ```bash
   git push origin main
   ```
2. Vercel detects the push and starts a production build using `installCommand` and `buildCommand` from `vercel.json`.
3. Watch the build logs in the Vercel dashboard. On success, the deployment is promoted to the production domain.

Every PR / non-production branch push automatically produces a **Preview Deployment** with its own URL.

### Option B — Manual CLI deploy

From `lebonresto-marketing/`:

```bash
# One-off preview build tied to your Vercel user
npm run deploy:preview

# Promote to production (requires project link + prod permissions)
npm run deploy:prod
```

The first run prompts you to link the local folder to the Vercel project (`vercel link`). Subsequent runs reuse `.vercel/project.json`.

### Build config recap (from `vercel.json`)

- Framework: `nextjs`
- Install: `npm ci`
- Build: `npm run build`
- Region: `cdg1` (Paris — closest EU region to Morocco)
- Security headers applied globally (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
- Long-lived immutable cache for `/assets/*`
- `no-store` for `/api/leads/*` so lead submissions are never cached

---

## 4. Custom domain — `business.lebonresto.ma`

1. In **Vercel dashboard → Project → Settings → Domains**, click **Add**.
2. Enter `business.lebonresto.ma` and confirm.
3. Vercel shows the required DNS record. Add it at the DNS provider for `lebonresto.ma`:

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | CNAME | `business` | `cname.vercel-dns.com` | 300 |

   If your DNS provider does not allow CNAME on subdomains, use the `A` record Vercel proposes as an alternative (`76.76.21.21` at the time of writing — always trust Vercel's UI over this doc).

4. Wait for DNS propagation (usually a few minutes, up to 24 h). Vercel provisions the TLS certificate automatically via Let's Encrypt once the record resolves.
5. Set `business.lebonresto.ma` as the **Primary Domain** so all other aliases redirect to it.
6. (Optional) Add `www.business.lebonresto.ma` as a redirect alias if needed.

---

## 5. Post-deploy checklist

Run these after every production deployment to make sure the site is healthy.

- [ ] **Slack webhook test** — submit the lead form on `/contact` (or the CTA on the home page) and confirm a message lands in the target Slack channel.
- [ ] **Analytics test** — open the site in a private window, navigate a few pages, then verify the visit appears in the analytics dashboard (Plausible/Umami/GA4).
- [ ] **Form submit test** — submit each lead form (contact, restaurant onboarding) with valid data and confirm the success state; then attempt an invalid submit and confirm the error/zod validation state.
- [ ] **Favicon check** — hard-refresh `https://business.lebonresto.ma` and confirm the LeBonResto favicon appears in the browser tab (Chrome, Safari, Firefox, mobile Safari).
- [ ] **Sitemap** — `https://business.lebonresto.ma/sitemap.xml` returns 200 with all public pages.
- [ ] **Robots** — `https://business.lebonresto.ma/robots.txt` returns 200 and references the sitemap URL.
- [ ] **Security headers** — `curl -sI https://business.lebonresto.ma/ | grep -Ei "x-frame|x-content|referrer|permissions"` returns the four expected headers.
- [ ] **Cache headers on assets** — `curl -sI https://business.lebonresto.ma/assets/<any-file> | grep -i cache-control` returns `public, max-age=31536000, immutable`.
- [ ] **API cache headers** — `curl -sI https://business.lebonresto.ma/api/leads/health` (or an equivalent GET) returns `Cache-Control: no-store, max-age=0`.
- [ ] **Lighthouse pass** — run a Lighthouse audit (mobile + desktop) on the home page; verify Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- [ ] **WhatsApp CTA** — click the sticky WhatsApp button and confirm it opens a chat with `+212 6 44 44 05 25` (i.e. E.164 `212644440525`).
- [ ] **OG preview** — paste the URL into Slack / WhatsApp / X and confirm the OG title, description, and image render correctly.

---

## 6. Rollback

If a production deployment breaks:

1. Go to **Vercel dashboard → Deployments**.
2. Find the last known-good deployment.
3. Click the `…` menu → **Promote to Production**.

This is instant and does not require a rebuild.

---

## 7. Contacts

- Product / Founder: le.bon.restau@gmail.com
- Ops / Deploys: le.bon.restau@gmail.com (assign an on-call once the team is constituted).
