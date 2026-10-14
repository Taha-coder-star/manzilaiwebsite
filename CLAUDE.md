# Manzil AI website: handoff for Claude Code

> **2026-10-14 update:** The owner authorized one section below the hero: an Attio-inspired product showcase. The first milestone is implemented in `site/src/components/ProductShowcase.jsx` with `site/src/styles/ProductShowcase.css`, `site/src/data/showcase.js`, and `site/src/hooks/useShowcaseSequence.js`. Only Buyer enquiries works; Property matching, Voice notes, Listing updates, and Agent handoff are disabled labels. `PRODUCT.md`, `AGENTS.md`, and `site/README.md` carry the current scope and verification. The older hero-only wording below is historical context; follow the updated files for current scope. No commit or deployment occurred.
>
> **Later 2026-10-14 update:** The owner also authorized an interactive Customer/Broker/Staff role explorer below the showcase. It lives in `site/src/components/RoleExplorer.jsx`, `site/src/styles/RoleExplorer.css`, and `site/src/data/roles.js`; the existing Product nav links now select the matching view. Only documented role capabilities are summarized; the repository has no exhaustive permission matrix. Build and four-width browser checks passed. See `AGENTS.md` for current details. No commit or deployment occurred.

> **This is a saved handoff, not live synchronization.** It records what was true at the end of the last session
> (2026-10-14). Before acting, inspect the real files, run `git status` if a repo exists, and **update this file
> whenever the work changes**. If anything here disagrees with the repository, the repository wins.

## 1. Project and scope

- **Manzil AI** is a WhatsApp property assistant for real-estate agencies in Pakistan. This repository is its **marketing website**.
- **Current scope: navbar and hero only**, including the dashboard illustration, the WhatsApp phone demo and the lead-summary card.
- **Do not add other sections** (features, pricing, footer, etc.) until the owner has reviewed this scope and asked for them.
- The project root `E:\manzil-aiwebsite\` is **not a git repository** (verified: `git rev-parse` fails). Nothing has been committed or deployed.
- `Manzil AI website.html` (root) is the owner's **old bundled design export**. Treat it as read-only reference. Do not edit or deploy it.
- `review-screenshots/` holds screenshots from the **pre-React static build** (identical design); they are not current evidence of the React build.

## 2. Technology and commands

- **Framework:** React 18.3 + Vite 6.4.4 (`@vitejs/plugin-react` 4.7). **Migration from static HTML to React + Vite is complete** (verified build + browser run).
- **Package manager:** npm 11.8.0 (lockfile `site/package-lock.json`). **The app lives in `site/`, not the repo root.** Run all npm commands there.
- **Node:** executable used successfully is `E:\react\node.exe`, **v25.5.0** (on PATH). Vite 6 needs Node 18, 20 or 22+. REA reportedly needs Node 22.19+ (reported in an earlier session, not re-verified).
- On PowerShell use `npm.cmd` if `npm.ps1` is blocked by execution policy.

```powershell
cd E:\manzil-aiwebsite\site
npm install
npm run dev          # http://localhost:5173
npm run build        # -> site/dist
npm run preview      # http://localhost:4173 (serves dist; build first)
```

- `vite.config.js` sets `base: "./"` so built asset URLs are relative and `dist/` works from any static host or sub-path.
- `npm audit`: 0 vulnerabilities at last check (Vite 5 had 2 dev-server advisories, fixed by moving to Vite 6.4.4).
- Public config only: `VITE_DEMO_URL` (see `site/.env.example`). It is bundled into the client, so **never put secrets in `VITE_*` variables.** There is no backend.

## 3. Design direction

- **Primary reference:** https://www.followupboss.com/ for **layout and interaction quality** (sticky nav, centred hero, big product visual with floating cards, pill CTAs, scroll-linked motion). Use it as inspiration only, **with original Manzil AI branding and copy**. Do not copy its text, imagery or assets.
- **Palette:** forest green `#0F3D2E` as the main brand colour, pale mint backgrounds (`#E6F3EA`), warm-white surfaces (`#FBFAF5`), restrained sage accents. No rainbow gradients, no red or blue accents.
- **Logo:** use the real Manzil AI mark (house-pin SVG) with its proportions intact (viewBox 294x358; shown ~22x27). Dark variant on light, light variant on forest. Never redraw or stretch it.
- **Type and tone:** Figtree (bundled woff2). Clear hierarchy, limited information, readable sizes, purposeful animation. **English** headings and copy; the **demo conversation is Roman Urdu**.
- The owner's old designs (mint `#A0E8AF` / brick `#BC4749` palette, "For agencies"/"For brokers" boards) are **secondary branding references, not the target layout**.

## 4. Current implementation (verified)

Entry: `site/index.html` -> `site/src/main.jsx` -> `App.jsx` (skip link, `Navbar`, `Hero`).

| Piece | File(s) |
| --- | --- |
| Navbar (sticky, hover/click dropdowns, mobile menu, Escape/outside-click, body scroll lock) | `site/src/components/Navbar.jsx`, `styles/Navbar.css`, `data/nav.js` |
| Hero copy, CTAs, composes the illustration, "See how it works" scroll + replay, Replay button, "Illustrative demo · Sample data" label | `components/Hero.jsx`, `styles/Hero.css` |
| Dashboard (top bar, sidebar counts, 4 sample leads) | `components/DashboardPreview.jsx`, `styles/DashboardPreview.css` |
| WhatsApp phone (header, doodle background, bubbles with times and ticks, property card, message bar) | `components/WhatsAppDemo.jsx`, `styles/WhatsAppDemo.css` |
| Lead summary card | `components/LeadSummary.jsx`, `styles/LeadSummary.css` |
| "Book a demo" button | `components/DemoLink.jsx`, `config.js` |
| Icons (inline SVG) | `components/Icons.jsx` |
| Sample data (leads, counts, summary fields, conversation script, timing) | `site/src/data/demo.js` |
| Global styles, tokens, font-face, buttons | `styles/global.css` |
| Hooks | `hooks/useDemoSequence.js`, `useStageScroll.js`, `usePrefersReducedMotion.js` |

**Animation sequence** (`conversation` in `data/demo.js`, driven by `useDemoSequence`):
customer Roman Urdu enquiry -> typing -> agency reply with property card -> customer "Saturday ko dekh sakte hain?" -> typing -> agency "Saturday ko kis waqt aana pasand karenge?".
- State is **one number, `applied`** (steps completed). Messages, typing bubble, revealed summary fields, active lead row and "Viewing requested" are all **derived** from it with `useMemo`. Timers live in a ref and are cleared on replay, unmount and reduced-motion change.
- First step at 550 ms, then each step's `holdMs`; finishes about 5 s in and **stays on the finished scene (no loop)**. Replay button and "See how it works" restart it.
- Summary fields appear only after the matching chat info; status goes "Matching properties" -> **"Viewing requested"** at the Saturday message. Nothing is shown as a confirmed booking.
- **Reduced motion:** finished scene immediately, no timers, Replay hidden.
- `useStageScroll` sets the `--p` CSS variable and shape parallax via refs in `requestAnimationFrame` (no React re-renders on scroll).

**Layout notes:** the stage uses CSS vars `--sb` (sidebar width) and `--off`. At >=1260 px the sidebar shows and the phone sits 48 px right of centre; below that the sidebar hides and the phone centres. At <=900 px the dashboard is hidden and the phone stacks above the summary.

**Assets** (`site/src/assets/`): `manzil-mark-dark.svg`, `manzil-mark-light.svg` (the real logo, copied from the owner's old design bundle), `figtree-latin.woff2` (from the same bundle), and `listing-sample.svg`. **The property image is an original illustration I created, not a photo**, because the project contains no property photo. Favicon: `site/public/favicon.svg`.

## 5. Pending work and known issues

Completed this session: static build -> navbar/hero refinements -> WhatsApp-style phone -> completed dashboard/summary -> React + Vite conversion.

**Not done / open:**
- **"Book a demo" has no destination.** `VITE_DEMO_URL` is unset, so the buttons are inert (no navigation). The old design's equivalent was also blank. Ask the owner; never invent a number or URL.
- **Nav and footer-style links are placeholders:** `#plans`, `#about`, `#login`, `#customers`, `#staff`, `#brokers`, `#agencies` have no targets because those sections do not exist yet.
- **Property image is an illustration**; replace with a real photo only if the owner provides one (change `image` in the listing object in `data/demo.js`).
- **Owner has not yet reviewed the React-converted site**; visual sign-off is outstanding.
- Hero eyebrow ("Built for real-estate agencies in Pakistan") and nav item labels are my placeholder copy; confirm with the owner.
- The right/lower area of the dashboard behind the summary card is a plain surface; revisit if the review calls it empty. Not confirmed as a problem.
- No automated tests, accessibility audit, Lighthouse run, or cross-browser check has been done (only Playwright Chromium).
- Nothing deployed, by instruction.

## 6. Verification actually performed

- **Production build:** `npm run build` succeeded on Vite 6.4.4 (about 1.3 s; JS 164 kB / 52 kB gzip, CSS 20 kB, one woff2). Built `index.html` references `./assets/...` relative paths.
- **Browser verification** (Playwright Chromium against `vite preview` on 4173; the CSS is the same as in the earlier static build):
  - **React build:** 1440x900 (full animation start/mid/end, dropdown hover/keyboard/Escape, See-how scroll + replay, Replay button, reduced motion), 1366x768 (first viewport: CTAs and demo top visible), 390x844 (mobile menu open/close/Escape/link-close, stacked phone + summary, true mid-animation at ~2.3 s and finished state).
  - **Static build only (before the React conversion):** 1180x800 and 1024x768 (sidebar-less layout, no overlaps or clipping).
  - Result: no console errors, no failed requests, no horizontal overflow, chat never overflows its container, font and images load.
- A successful build is **not** the same as visual sign-off; screenshots were inspected by me, not yet by the owner.
- **Do not assume a preview server is running.** Start a fresh one:

```powershell
cd E:\manzil-aiwebsite\site
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort   # or: npm run dev
```
  Port 4173 is used by preview; if it is taken, stop the old process first.

## 7. Working rules

- **Inspect current files first** (and `git status` if a repo is ever created). **Preserve unrelated and uncommitted work.** Keep edits inside the requested scope.
- Demo data stays **fictional and internally consistent** (sidebar counts: 4/2/1, assigned 3 + unassigned 1 = the 4 sample leads). Keep **one discreet "Illustrative demo · Sample data" label**.
- **Never invent** customer statistics, testimonials, logos of real clients, or confirmed bookings.
- **No real messaging, calls, microphone access, backend credentials or deployment** unless the owner asks. The phone's header icons and message bar are visual only.
- Support `prefers-reduced-motion`; **clean up every timer, listener and effect**. Prefer React state over manual DOM work (the only direct style writes are the scroll variables in `useStageScroll`).
- Keep components reusable and styles per component; do not collapse into one giant file.
- Do not copy Follow Up Boss text or assets. Do not modify `Manzil AI website.html`.

## 8. Tools and next session

- **REA** (`mcp__rea__*`) was verified connected in an earlier session and its tools were present this session. **Re-check availability every session.** Its web tools need a Chrome started with a remote-debugging port; none was running, so Playwright did the browser work.
- **Playwright** (`mcp__plugin_playwright_playwright__*`) worked this session; **check it before browser review.** Its screenshots can only be written inside the project folder; delete the generated `.playwright-mcp/` folder afterwards.
- **Impeccable is planned but NOT installed** (searched `~/.claude`, nothing found). Do not claim it is installed without checking.
- **Next task after Impeccable is installed:** run a **navbar/hero critique and audit based on the rendered page** (build + fresh preview, desktop and mobile, start/mid/end of the animation). **Report the five highest-impact issues to the owner before making further design edits.** Then wait for direction.
