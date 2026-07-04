# HELICORP — Website Redesign

## Changelog — this revision

A large batch of fixes/features on top of the initial build:

- **Color theme → black & white.** Every token in `globals.css` kept its name/lightness role but was desaturated to grayscale (see the updated token table below). Error/alert states now rely on icon + weight instead of a red hue.
- **3D model rebuilt** from the provided `3D_Model.zip` reference (a Bolt.new project) — replaced the hand-built "H" monogram with the provided extruded "HELICORP" wordmark (`HeliCorpText.jsx`), full studio lighting rig, contact shadows, and OrbitControls (`HeroCanvas.jsx`). The font (`helvetiker_bold`) is now self-hosted in `public/fonts/` instead of fetched from the CDN the reference used — see [The 3D hero](#the-3d-hero).
- **Fixed a real, systemic spacing bug**: an earlier version of `globals.css` disabled Tailwind's dynamic spacing scale to enforce "no arbitrary spacing," which had the side effect of silently zeroing out *any* numeric utility outside keys 1–10 — not just padding, but `w-`, `h-`, `gap-`, etc. This is what caused the "text sticking to the container frame" bug on the Supplier CTA (`py-14` was resolving to nothing). Re-enabled the dynamic scale; named keys 1–10 still guarantee exact token fidelity, everything else now degrades to Tailwind's normal default instead of to zero.
- **Navbar**: switched from `sticky` to `fixed` (more robust against Lenis interference), fixed item spacing/wrapping, and fixed a real active-state bug — the "Ecommerce" link was using prefix matching (`startsWith`) against routes that overlap with the Contact group's own routes (e.g. `/for-agents/contact` starts with `/for-agents`), so it could light up alongside Contact at the same time. Switched to exact-match.
- **Footer**: added social icons (Facebook/YouTube/TikTok/Zalo, ported tilt effect from `contact_icon.html`) and an oversized "HELICORP" wordmark (~1/3 of the footer's width, a deliberate one-off exception to the type scale).
- **Four more ported effects**: `button.html` → all buttons (blob-glow hover), `ButtonLanguage.html` → language toggle (bezel look, EN/VI always visible), `stack_card.html` → Core Values on the About page, `brand.html` → partner/brand showcase cards, `contact_apply.html` → contact page info sidebars.
- **Image placeholders** added throughout (per-section on Home/About/Culture, per-year on History, and a page-wide background placeholder via `PageBackground.jsx` on every route) — all placed next to their content, not grouped in a gallery.
- Vietnam map on the For Agents page is now an image placeholder instead of the custom SVG (simpler, and you'll drop in the real map graphic).

---

A full rebuild of [helicorp.vn](https://helicorp.vn/) for Healthy Living Corporation: React + Vite, Tailwind v4 mapped to the extracted design tokens, GSAP + Motion for animation, React Three Fiber for the 3D hero, Lenis for smooth scroll, and EN/VI i18n. Content is grounded in the real HELICORP site (services, industries, partners, timeline, values) — see [Content notes](#content-notes) for exactly what's real vs. placeholder.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run lint      # oxlint
```

Node 20+ recommended (built and tested on Node 22 / npm 10).

## Framework choice: Vite, not Next.js

The brief allowed either. Next.js was the named "recommended" option (SEO, built-in page transitions), but everything here is client-heavy — a full-viewport WebGL scene, GSAP ScrollTrigger, Lenis — and none of that needs SSR. Next's App Router would mean `"use client"` boundaries and `dynamic(() => import(...), { ssr:false })` around the Canvas for no real benefit, plus more hydration footguns for content this animated.

Trade-off: this is a pure SPA, so route content isn't in the initial server-rendered HTML. `react-helmet-async` sets a real `<title>`/`<meta description>` per route (see `src/components/ui/SEO.jsx`) so at least that's correct client-side, but it won't appear in view-source or in a crawler that doesn't execute JS. If organic SEO becomes a priority, the cleanest path is adding a prerendering/SSG step (or migrating to Next/Remix) — the page components themselves wouldn't need to change much, since none of them depend on browser-only APIs at render time except the Canvas, which is already isolated and lazy-loaded.

## The 3D hero

`src/components/three/HeliMonogram.jsx` — a 3D "H" built from three rounded primitives (not extruded text, so there's no font/glyph asset to load). Two motion sources are layered on top of each other:

- **Scroll** (`useHeroScrollProgress`) drives the main story: as you scroll through the pinned hero, the monogram pitches forward and lifts — a nod to HELICORP's own "steady and adaptable, like a helicopter, always climbing toward new heights" strategy language (from `helicorp.vn/about-helicorp`).
- **Pointer position** adds a smaller look-at-cursor tilt on top of that.

The hero section is `220vh` tall with the canvas `sticky`-pinned inside it, so the motion plays out over an extended scroll range instead of being over within one viewport height. GSAP drives both the one-time assembly animation on mount and the scroll scrub; Motion (`motion/react`) handles page transitions and UI micro-interactions — that split is deliberate, not redundant.

No other route gets a WebGL canvas — non-Home pages use `PageHeader`, a CSS gradient-blob background instead. Running a second GPU context per route for a background you see for a second while scrolling past isn't worth the cost.

Reduced motion: `usePrefersReducedMotion` disables the idle bob, pointer tilt, and scroll-scrub rotation; the monogram still assembles once, then holds a static angle. Lenis smoothing is also disabled (`lerp: 1`) in that case.

**I could not visually test the 3D scene, layouts, or animations in a real browser** — this sandbox has no display and the headless-browser binary download is blocked by its network allowlist. Everything here is verified to *build and lint cleanly* (see [Verification](#what-was-actually-verified)), but please actually run `npm run dev` and look at it before treating any visual/animation detail as final.

## Design tokens — what got resolved and why

`DESIGN.md`/`SKILL.md` were auto-extracted from the live site's computed styles, not hand-authored, so a few things needed a judgment call before going into `src/styles/globals.css` (`@theme` block). Full reasoning is in that file as comments; short version:

| Issue in the source | Resolution |
|---|---|
| `--primary-l-2/-3/-4` labelled "Text Primary" but are grays, not tints of the blue `--primary` | Treated as a separate neutral/ink ramp |
| Two different hexes both named `--secondary` (`#FA6161`, `#FF8523`) | `#FF8523` is the base of the 7-step orange ramp (fits the d-1/l-1 progression numerically); `#FA6161` kept standalone as `--color-coral`, used sparingly (badges/errors), not blended into the ramp |
| Two hexes both named `--secondary-2` | Treated as a 2-step ramp: `--color-gold` (base) + `--color-cream` (tint) |
| `--text-inactive` (#AAAAAA) is ~2.3:1 contrast on white | Restricted to disabled states only, never body text — this is the one token in the set that fails the system doc's own AA requirement if used for running text |
| Spacing scale isn't actually a 4px multiple (5, 22, 25, 53px alongside 20, 30, 50) | Tailwind's dynamic spacing multiplier is disabled (`--spacing: initial`) and replaced with exactly the 10 extracted values. Side effect: `p-11`, `gap-96`, etc. simply don't exist in this project — "no arbitrary spacing" is enforced by the tooling, not just a lint rule. |
| `radius-sm: 0px 0px 8px` (a 3-value CSS shorthand → only the bottom-right corner is rounded) | Kept exactly as `0 0 8px 0`, named `rounded-token-sm` (not Tailwind's own `rounded-sm`) so it can't be reached for by accident alongside Tailwind's default scale |
| Typeface stack includes `Times New Roman` | Kept in the CSS token literally, flagged in a comment as a likely scrape artifact (a serif fallback for a geometric sans is an unusual choice) — worth confirming with whoever owns the brand before shipping |
| No hover-state color was provided for the primary blue button | Uses `color-mix(in oklab, var(--color-primary), black 12%)` — a computed darken of an approved token, rather than introducing a new hex not in the palette |
| Elevation: **none detected** in the source | No box-shadows anywhere in this codebase, on purpose. `Card` separates content with a border + background tint instead. |

## Fixes to the current site's known issues

- **Language switch reloads the page / touches the URL** — `LanguageToggle` only calls `i18n.changeLanguage()`. No route change, no reload, scroll position and component state are untouched. Preference is cached to `localStorage`, not the URL.
- **Clunky navbar / sections combined poorly** — `Navbar` groups routes the same way the real site's IA already does (Introduction / Ecommerce / Contact), but as click-to-toggle disclosures (`NavDropdown`) rather than hover-only — hover-only menus are exactly the kind of thing that breaks for keyboard and touch users.
- **"For Partners" and "For Agents" linking to the same page** — `Brands.jsx` ends in two CTA cards with distinct copy and distinct destinations (`/for-agents` vs `/for-suppliers`), and both FR06/FR07 are fully separate pages with their own content.
- **Illogical timeline/progress placement** — the live history page's year tabs don't line up with their content (e.g. the "2021" tab sits in front of an event explicitly dated June 2022). `src/i18n/locales/en.json` → `history.milestones` re-aligns each event to the year it actually happened.

## Content notes

Real, taken from `helicorp.vn` (paraphrased into original copy, not copied verbatim): services, industries, strengths/stats, partner and in-house brand names, the development timeline, core values/vision/mission/strategy, culture pillars, supplier stats, HQ address, phone numbers, and the one live job posting on the recruitment page.

**Not real / needs your input before launch:**
- All photos, the partner logo artwork, and the 3D asset are neutral placeholders (`PlaceholderMedia`) — per the brief, on purpose.
- The Vietnam map (`VietnamDistributionMap.jsx`) is a hand-drawn, deliberately low-poly silhouette for a "nationwide network" visual — it is **not** survey-accurate. Swap in a real GeoJSON-derived path if geographic precision ever matters.
- The contact email (`contact@helicorp.vn` in `src/utils/constants.js`) is a guess — the real one is behind Cloudflare email-protection on the source site and couldn't be read. Replace it.
- `src/data/news.js` has 4 sample entries. They're built from real milestones (not invented headlines) but are standing in for an actual news feed/CMS.
- `src/data/jobs.js` has exactly one entry — the one real, currently-open role. Rather than pad the grid with invented postings, the Careers page pairs it with a standing "send your CV" card.
- **Vietnamese copy is AI-translated.** Structurally complete (see verification below) but not reviewed by a native/professional translator — get that review before this is customer-facing.

## Architecture

```
src/
  animations/     GSAP + Lenis setup, scroll-reveal hooks, hero scroll-progress
  components/
    three/        HeroCanvas, HeliMonogram (the 3D H), CanvasBoundary (WebGL fallback)
    layout/       Navbar, Footer, NavDropdown, MobileMenu, LanguageToggle, Logo
    ui/           Button, Card, SectionHeading, PageHeader, PlaceholderMedia, SEO...
    forms/        ContactForm (shared by FR10/FR11)
    history/      Timeline (FR03)
    map/          VietnamDistributionMap (FR06)
    career/news/  JobCard, NewsCard
  data/           jobs.js, news.js — swap for src/services/api.js calls once there's a backend
  i18n/           i18next config + en.json / vi.json (197 keys each, verified 1:1)
  layouts/        RootLayout (Lenis provider + Navbar/Footer shell)
  pages/          One file per FR (Home.jsx = FR01 ... ContactSupplier.jsx = FR11)
  router/         AnimatedRoutes (lazy-loaded + Motion page transitions), ScrollToTop
  services/       api.js — documented mock skeleton, see below
  styles/         globals.css (@theme tokens), tokens.js (JS mirror for Three.js/GSAP)
  utils/          constants.js (routes + real company info), cn.js, reduced-motion hook
```

Every route is `React.lazy()`-loaded (`src/router/AnimatedRoutes.jsx`), so three.js / `@react-three/fiber` / `@react-three/drei` only ever end up in Home's own chunk — the other 10 pages don't pay for the 3D library weight. Current production build:

| Chunk | Gzipped |
|---|---|
| Shared vendor (React, router, i18next, Motion, GSAP) | ~198 KB |
| Home (includes three.js + R3F + drei) | ~237 KB |
| Every other page | 0.5 – 2 KB each |

## Backend

There is no backend. `src/services/api.js` has fully documented, typed-in-JSDoc stub functions (`submitAgentContact`, `submitSupplierContact`, `fetchJobs`, `fetchNews`) that resolve mock data after a short delay, so loading/success/error UI states all work end-to-end today. Each has a `TODO(backend)` comment showing the one-line swap to a real endpoint. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` once one exists.

## What was actually verified

No browser was available in the environment this was built in, so verification stopped at:

- ✅ `npm run build` succeeds with zero errors
- ✅ `npm run dev` boots and serves the correct HTML
- ✅ `oxlint` (the project's configured linter) — 0 warnings, 0 errors across all 54 source files
- ✅ Every key referenced via `t(...)` anywhere in the codebase (168 unique calls) resolves in both locale files
- ✅ `en.json` and `vi.json` have exactly matching key structures (197 leaf keys each, zero gaps either direction)
- ✅ Third-party APIs (Lenis's React adapter, drei's `RoundedBox` props, the Lenis↔GSAP ScrollTrigger sync recipe) checked against the actually-installed package source/docs, not assumed from memory

Not verified: visual layout, animation feel/timing, responsive behavior at real breakpoints, or console errors at runtime. Please run it locally before assuming any of that is right.

## Next steps

1. `npm install && npm run dev` and actually look at it.
2. Swap `PlaceholderMedia` blocks for real photography, and drop real logo files in for the partner strip in `Home.jsx` / `Brands.jsx`.
3. Get the Vietnamese copy reviewed by a native speaker.
4. Confirm the real contact inbox address in `src/utils/constants.js`.
5. Wire `src/services/api.js` to a real backend when one exists.
6. Decide on the SEO/SSR trade-off above before launch if organic search matters.
