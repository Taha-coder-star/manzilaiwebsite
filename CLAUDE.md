# Manzil AI website: handoff for Claude Code

> **Latest 2026-10-20 (later) update:** After an Impeccable critique (snapshot in `.impeccable/critique/`), only benefits-section text sizes changed in `site/src/styles/AgencyBenefits.css`: UI labels, status badges and the "Illustrative examples" note are now 12px; brief field values, listing-draft details and the latest-question bubble are now `clamp(13px, 1vw, 14px)` (the bubble may wrap). Headless Chromium checked 11 widths (1440–320): minimum text 12px, no clipping, overflow or console errors. Booking stays "coming soon" by owner decision. Follow-up pass: each benefit's heading and line now come before its visual (`BenefitColumn` in `AgencyBenefits.jsx`); at >790px a CSS subgrid keeps the three visuals top-aligned when headings wrap; at 600–790px the copy sits left and the visual right. Verified at the same 11 widths. Hero fold pass: removed the eyebrow pill (owner approved; ping animation gone), tightened hero top padding/copy gap/demo margin, H1 max 66→58px, stage 690→640px, phone top 28→16px, phone screen 620→576px (≤480px: 610→596px), listing image 112→88px, lead summary top 180→104px. End-of-animation measurements: "Viewing requested" above the fold at 1920×1080, 1536×864, 1440×900, 1280×800 and 1024×768 (not 1366×768, 7px short, or 1280×720); the last chat reply fits at 1920×1080 and 1440×900 (7px spare) but not at shorter screens. No chat overflow at 14 widths, no console errors. Section-2 "eyebrow" mentions below are stale. No commit or deployment.

> **Latest 2026-10-20 update:** Only the first buyer-enquiry illustration changed: `useEnquirySequence.js` provides a 2.8-second, nine-step native Web Animations schedule with sequential term highlights, green travelling dots, chips on arrival, then dotted amber budget connection/status. First-panel visibility threshold is 45%; replay cancels previous effects; reduced motion/failure shows final HTML. Measured SVG endpoints follow resize/font layout. Existing container dimensions, headings, typography, section surfaces, broker/staff timing, hero and navbar were preserved. No dependency added. Build and production browser checks passed at 1440–280px, including order, alignment, wrapping, replay, fallbacks and zero clipping/errors. Development Strict Mode had no duplicate effects. REA CLI inspected the exact Animated Beam reference and local desktop/mobile; reference/desktop retained observations but reported cleanup timeout, mobile completed (`ev_2ba11b63ae76728258a4e5fc8496eb4fb6d54e3eb8c5677d333871f01cbd8db6`). See the latest `AGENTS.md` entry and `review-screenshots/beam-review.md` for precise evidence limitations. Review: `benefits-beam-{desktop,mobile}.png`, `benefits-beam-sequence.webm`. Stop for owner review; no commit or deployment.

> **Latest 2026-10-16 update:** The benefits section now has equal desktop illustration heights, aligned headings, internal message-to-result animation, sage agency-review status, and a replay control. Reduced motion shows completed content. See the latest entry in `AGENTS.md` for files, REA evidence, browser checks, and screenshots. Earlier notes below are historical.

> **Latest 2026-10-16 update:** One three-benefit section was added below the unchanged hero in `site/src/components/AgencyBenefits.jsx` and `site/src/styles/AgencyBenefits.css`, with headings in `site/src/data/benefits.js`. The former Customer/Broker/Staff showcase remains unmounted. See the top of `AGENTS.md` for current REA Linear observations, build, browser verification, screenshots, and limitations. Earlier navbar/hero-only statements below are historical.

> **Latest 2026-10-14 update:** The integrated Customer/Broker/Staff showcase is now a scroll-driven three-chapter story on sufficiently large desktop viewports and three stacked complete chapters on tablet, mobile, short viewports, or reduced motion. See `AGENTS.md` for REA reference-access limitations, implementation, build and browser evidence. The current root is a Git repository on `main`; older statements below saying it is not a repository are stale. No deployment or commit was made for this update.

> **Latest 2026-10-14 correction:** The owner wants roles inside the existing showcase below hero, not in a separate section. `site/src/App.jsx` now mounts only `ProductShowcase` after Hero. The showcase has interactive Customer, Broker and Staff views with distinct visuals for Buyer enquiries, Property matching, Voice notes, Listing updates and Agent handoff. The separate `RoleExplorer` files were removed. This note supersedes older scope statements below; see `AGENTS.md`, `PRODUCT.md`, and `site/README.md`. No backend or deployment was added.
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
