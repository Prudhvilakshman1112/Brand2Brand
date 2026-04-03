# Separate Admin Into Independent Project

## Problem

The admin panel currently lives **inside** the main Brand2Brand storefront as nested routes under `src/app/admin/`. This means:
- Customers could technically navigate to `/admin` URLs
- The admin inherits storefront chrome (Header, Footer, VizagIntro, etc.)
- Admin and storefront code is tightly coupled

## Solution: Two Completely Independent Next.js Apps

Create a brand-new folder `d:\Brand2Brand-Admin` as a standalone Next.js app that runs on **port 3001**, while the main storefront stays at **port 3000**.

> [!IMPORTANT]
> **Admin → Storefront:** The admin sidebar will have a "View Storefront" button that opens `http://localhost:3000` in a new tab so the admin can preview changes immediately.
>
> **Storefront → Admin:** Zero access. All `/admin` routes will be removed from the main site. Customers see nothing.

## New Project Structure

```
d:\Brand2Brand\          ← Main storefront (port 3000) — NO admin code
d:\Brand2Brand-Admin\    ← Standalone admin panel (port 3001) — NO storefront code
```

### Brand2Brand-Admin folder layout:
```
Brand2Brand-Admin/
├── .env.local                   ← Same Supabase keys + STOREFRONT_URL
├── package.json                 ← Minimal deps: next, react, supabase
├── next.config.mjs
├── jsconfig.json
├── src/
│   ├── proxy.js                 ← Middleware: protects all routes, redirects to /login
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.js        ← Browser Supabase client (copied)
│   │       └── server.js        ← Server Supabase client (copied)
│   └── app/
│       ├── layout.js            ← Admin root layout (html/body, admin.css, Inter font)
│       ├── admin.css            ← Full admin stylesheet (copied)
│       ├── page.js              ← Dashboard (was /admin → now just /)
│       ├── AdminLayoutClient.js ← Sidebar + topbar chrome
│       ├── login/
│       │   ├── layout.js        ← Login bypass layout
│       │   └── page.js          ← Login page
│       ├── categories/
│       │   └── page.js          ← Category management
│       └── products/
│           ├── page.js          ← Product listing
│           ├── new/
│           │   └── page.js      ← Add product form
│           └── [id]/
│               └── edit/
│                   └── page.js  ← Edit product form
```

---

## Proposed Changes

### Phase 1 — Create the Admin project

#### [NEW] `d:\Brand2Brand-Admin\package.json`
- `name: "brand2brand-admin"`
- `scripts.dev: "next dev --port 3001"`
- Dependencies: `next`, `react`, `react-dom`, `@supabase/ssr`, `@supabase/supabase-js`

#### [NEW] `d:\Brand2Brand-Admin\.env.local`
- Same Supabase keys as the main app
- Add `NEXT_PUBLIC_STOREFRONT_URL=http://localhost:3000`

#### [NEW] `d:\Brand2Brand-Admin\next.config.mjs`
- Minimal config with `allowedDevOrigins`

#### [NEW] `d:\Brand2Brand-Admin\jsconfig.json`
- Path alias: `@/* → src/*`

#### [NEW] Admin Supabase lib files
- Copy `src/lib/supabase/client.js` and `server.js` unchanged

#### [NEW] Admin middleware (`src/proxy.js`)
- Routes: protect everything except `/login`
- Redirect unauthenticated users to `/login`
- Redirect authenticated users away from `/login` to `/`

#### [NEW] Admin root layout (`src/app/layout.js`)
- `<html>` + `<body>` with Inter font
- Import `admin.css`
- **No storefront components at all**

#### [NEW] Admin layout chrome (`src/app/AdminLayoutClient.js`)
- Sidebar with Dashboard, Categories, Products nav links
- **"View Storefront" button** that opens the main site in a new tab
- Logout button
- All nav paths updated: `/admin/products` → `/products`, etc.

#### [COPY + ADAPT] All admin pages
- `page.js` (Dashboard) — paths updated from `/admin` to `/`
- `login/page.js` — paths updated
- `categories/page.js` — unchanged (no path references)
- `products/page.js` — link paths updated (`/admin/products/new` → `/products/new`)
- `products/new/page.js` — redirect path updated
- `products/[id]/edit/page.js` — redirect path updated

#### [COPY] `admin.css`
- Exact copy, no changes needed

---

### Phase 2 — Clean the Main Storefront

#### [DELETE] `d:\Brand2Brand\src\app\admin\` (entire folder)
- Remove all admin routes, CSS, and components from the storefront

#### [MODIFY] `d:\Brand2Brand\src\proxy.js` (middleware)
- Remove all `/admin` route protection logic
- Keep only the session refresh logic for future use

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| Separate folder, not monorepo | Simpler for a small project. Each app is fully independent. |
| Port 3001 for admin | Both can run simultaneously during development |
| Same Supabase keys | Both apps talk to the same database/storage |
| "View Storefront" link in admin | Admin can preview changes instantly after adding products |
| No admin access from storefront | `/admin` routes completely removed from the main app |

## Open Questions

> [!IMPORTANT]
> The admin app will run on `http://localhost:3001` during development. When deployed to production, you'll need to set up a separate domain or subdomain (e.g., `admin.brand2brand.com`). Is this acceptable?

## Verification Plan

### Automated Tests
1. `npm run dev` in `Brand2Brand` (port 3000) — storefront works, no `/admin` route exists
2. `npm run dev` in `Brand2Brand-Admin` (port 3001) — admin works independently
3. Verify admin's "View Storefront" link opens port 3000
4. Verify navigating to `localhost:3000/admin` shows 404
5. Verify admin login/dashboard/products/categories all work on port 3001
