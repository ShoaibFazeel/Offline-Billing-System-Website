# Offline Billing System — Standalone Showcase Website

Standalone portfolio showcase for the **Offline Billing System** desktop application (`Electron + React 18 + SQLite`), designed to be deployed on a subdomain such as `offlineBillingSystem.shoaibfazeelbutt.com`.

## What Is Included

- **Project Overview & Hero**: Problem-solution narrative, architecture highlights, and direct links to the GitHub repository and main portfolio (`https://shoaibfazeelbutt.com`).
- **Interactive HTML App Page Views**: Clickable desktop window simulation faithfully reproducing the actual application screens:
  - **Dashboard**: Company header card, KPI cards, live editable Low Stock Alert threshold, and recent invoices.
  - **New Bill**: Interactive invoice composer with client-specific pricing recall, dual discounts (`%` + extra `%`), free bonus items, and live PKR totals.
  - **Bulk Bills**: Shared dispatch route queue with atomic SQLite transaction simulation.
  - **Inventory & Clients**: Searchable catalog (Infinite vs Tracked stock) and client directory (Tax Filer & NTN status).
  - **Reports Studio**: Interactive switcher for Daily Sale, Item, Item Company, and Company Item reports.
  - **Invoice & PDF Preview**: Faithful 15cm × 21cm invoice layout with `%` vs PKR discount toggle and warranty notice.
- **Capabilities & Technical Architecture**: Detailed breakdown of the Electron IPC bridge, SQLite WAL database, `pdf-lib` generator, keyboard-first shortcuts, and GitHub Releases auto-updater.
- **Contact Us Redirect**: Direct CTAs in the header, hero, and footer redirecting visitors to `https://shoaibfazeelbutt.com/#contact`.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

This generates a static `dist/` folder ready for any static host or CDN.

## Subdomain Deployment (`offlineBillingSystem.shoaibfazeelbutt.com`)

1. **Vercel / Netlify / Cloudflare Pages**:
   - Import this folder (`Offline-Billing-System-Website`) as a new project.
   - Build command: `npm run build` | Output directory: `dist`. (`vercel.json` and `netlify.toml` are already included.)
   - Add custom domain `offlinebillingsystem.shoaibfazeelbutt.com` in your hosting dashboard.
2. **DNS Record**:
   - In your domain DNS manager for `shoaibfazeelbutt.com`, create a `CNAME` record:
     - **Name / Host**: `offlineBillingSystem` (or lowercase `offlinebillingsystem` — DNS hostnames are case-insensitive)
     - **Target / Value**: The target host provided by Vercel, Netlify, or Cloudflare Pages.
