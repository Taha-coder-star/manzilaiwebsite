# Manzil AI website — Codex handoff

> Saved on 2026-10-14, not live synchronization. Inspect the real files and run `git status` when a Git repo exists; update this handoff after material work. The files win if they disagree with this note.

## Purpose and scope

Manzil AI is a WhatsApp property assistant for real-estate agencies in Pakistan. This is its marketing website. The approved scope is the existing navbar and hero, the first product showcase milestone (Buyer enquiries demonstration), and an interactive Customer/Broker/Staff role explorer. The other four showcase demonstrations await owner review. `PRODUCT.md` has longer product context; `site/README.md` has run and file details. No root `README.md` or `DESIGN.md` exists.

`E:\manzil-aiwebsite` is not a Git repository (`git rev-parse` fails). Nothing has been committed or deployed. Preserve unrelated work. The root `Manzil AI website.html` is the owner's old bundled design export: read-only reference, never edit or deploy it. `review-screenshots/` shows the earlier static build, not proof of the current React build.

## Stack and run commands

The migration to **React 18.3 + Vite 6.4.4** is complete. The npm 11.8.0 app and lockfile are in `site/`. Current PATH uses Node `E:\react\node.exe` v25.5.0 for the site; use `npm.cmd` in PowerShell if the execution policy blocks `npm.ps1`.

```powershell
cd E:\manzil-aiwebsite\site
npm.cmd install
npm.cmd run dev       # localhost:5173
npm.cmd run build     # site/dist
npm.cmd run preview   # localhost:4173; build first
```

`vite.config.js` uses `base: "./"` for relative built assets. `dist/` is a static deployable build, but **do not deploy without an owner request**. There is no backend. `VITE_DEMO_URL` is public client configuration (`site/.env.example`); never put secrets in `VITE_*`.

## Source map

- Entry: `site/index.html` → `src/main.jsx` → `src/App.jsx` (skip link, Navbar, Hero).
- Navbar: `src/components/Navbar.jsx`, `src/styles/Navbar.css`, `src/data/nav.js`. Sticky header, hover/click dropdowns, mobile menu, Escape/outside-click and scroll lock.
- Hero: `src/components/Hero.jsx`, `src/styles/Hero.css`. Copy and CTAs compose `DashboardPreview`, `WhatsAppDemo`, `LeadSummary` and `DemoLink`; each has its own stylesheet. SVG icons are in `Icons.jsx`.
- Fictional leads, counts, listing, summary and Roman Urdu conversation: `src/data/demo.js`. `src/hooks/useDemoSequence.js` derives the whole roughly five-second sequence from one `applied` step count, clears timers, and holds the final scene. `useStageScroll.js` applies scroll CSS variables; `usePrefersReducedMotion.js` selects the finished static state.
- Assets: `src/assets/manzil-mark-{dark,light}.svg` (real house-pin logo, viewBox 294×358), `figtree-latin.woff2` and original `listing-sample.svg` illustration; `public/favicon.svg`.

## Design and content rules

Use [Follow Up Boss](https://www.followupboss.com/) for layout and interaction inspiration only. Keep original Manzil AI text and assets. Forest `#0F3D2E`, pale mint `#E6F3EA`, warm white `#FBFAF5`, restrained sage, Figtree, and the real logo with intact proportions. English site copy; Roman Urdu demo conversation. No rainbow, red or blue accents. The old bundled design is secondary brand context.

Keep fictional sample data consistent (inbox 4, listings 2, follow-ups 1; assigned 3 + unassigned 1 = four leads) and the single “Illustrative demo · Sample data” label. The viewing is **requested**, never confirmed. Do not invent customer statistics, testimonials, client logos, bookings or a property photo. No real messaging, calls, microphone, credentials or backend. Support reduced motion, clean up timers/listeners, and keep components and styles modular.

## Verified on 2026-10-14

- `npm.cmd run build` succeeded on Vite 6.4.4 (JS 163.93 kB, CSS 19.54 kB, font 20.16 kB). The first sandboxed attempt failed on Windows `EPERM` realpath access; the same build passed with filesystem access.
- Playwright inspected the production preview at 1440×900 and 390×844. The desktop hero, mobile hero/menu, animated mid/final states, and reduced-motion final state rendered. Console errors: 0; asset requests succeeded; no horizontal overflow. The normal sequence reached the listing and then “Viewing requested”; reduced motion hid Replay. These checks are not owner visual sign-off or a full accessibility/cross-browser audit.
- `E:\tools\node24\node.exe` v24.21.0 and `E:\tools\rea\node_modules\rea-agents\scripts\rea.mjs` v6.4.0 were verified. REA setup used `--client codex` only, adding `[mcp_servers.rea]` with those absolute paths to `C:\Users\tahaj\.codex\config.toml` and installing `C:\Users\tahaj\.agents\skills\reverse-engineer-anything`. Backup: `C:\Users\tahaj\.codex\config.toml.rea.backup`. `rea doctor --client codex --skill` is healthy; `rea mcp doctor` started the server, listed all 170 expected tools and completed a test call. The current Codex session still does not expose `mcp__rea__*`; restart Codex for live tool discovery. Missing Ghidra/IDA does not affect this registration and neither was installed. Claude and other MCP entries were preserved.
- Impeccable was **already installed** user-wide at `C:\Users\tahaj\.agents\skills\impeccable` and visible to Codex. Its `context` command succeeded; the project hook exists in `.codex/hooks.json`. No duplicate install or project-context rewrite was done. Invoke `$impeccable critique hero` for a design review or `$impeccable audit hero` for technical checks. The current skill's formal critique workflow requests permission for two sub-agents; the five issues below come from this onboarding review, not a formal Impeccable critique.
- Playwright is available in this Codex session. Start a fresh preview server for the next browser review; do not assume one persists. Current preview and temporary captures were for this onboarding check only.

## Showcase milestone added on 2026-10-14

The owner explicitly authorized the next section and its first review milestone: full Attio-inspired layout, with **Buyer enquiries** as the only implemented demonstration. `site/src/App.jsx` now mounts `ProductShowcase` below the unchanged hero. Files added: `site/src/components/ProductShowcase.jsx`, `site/src/styles/ProductShowcase.css`, `site/src/data/showcase.js`, and `site/src/hooks/useShowcaseSequence.js`. `PRODUCT.md` and `site/README.md` reflect the new scope. The other four feature labels are disabled and marked Soon. No other sections or deployment were added.

REA used `list_browser_targets` (the initial CDP endpoint was unavailable), `capture_browser_scenario` (owned Chrome launch at `https://attio.com/` and local preview, desktop/tablet/mobile, link clicks and scrolling), and `export_evidence_bundle`. Evidence IDs include `ev_a279c9da7a67d08495660b286e4ed682b508ae8549b8d9e8267f3d896ec92e98` for initial Attio DOM/accessibility, `ev_37017597ec47a7373212c77503b29e4986f85dc081192889996758a9b30c82c2` for five feature clicks, and `ev_5b3c140b42b826f924fdf051a93abce02bd21dde975958bf9caa529084a62164` for tablet/scroll. REA observed a 24-column bounded container, a 6/18 desktop menu/content split, a sticky vertical menu under the header, per-feature articles with explanation above a large demo, link clicks scrolling to articles, active menu following the visible article, and a horizontal sticky menu at 820px and 390px. The DOM declares 200–320ms color transitions. Exact computed font metrics, demo animation durations, and the sticky endpoint were not measured; private implementation remains unknown. For this one-demo milestone the Manzil menu is static, with four disabled labels. The Manzil sequence reveals messages and brief fields once, holds the final scene, has Replay, and shows its final state for reduced motion.

`npm.cmd run build` passed after the documented sandbox `EPERM` retry. REA captured the local production preview at 1440, 820 and 390px, plus reduced motion; no page errors. The isolated browser check `review-screenshots/verify-showcase.mjs` passed at 1440, 820, 390 and 320px: no horizontal overflow, stable demo height, correct mid/final requirements, four disabled tabs, keyboard focus, Figtree loaded and no page errors; reduced motion showed 4/4 immediately and hid Replay. Evidence bundles and screenshots are in `review-screenshots/`; `showcase-checks.json` records the browser checks. The visual review's two fixes (mobile note spacing and current scope documentation) were applied and its verdict pass reported both resolved.

Remaining: owner visual review of Buyer enquiries, then implement Property matching, Voice notes, Listing updates and Agent handoff as separate demonstrations. Do not present them as functional before implementation. The old hero issues below remain open.

Role explorer added on 2026-10-14 after an explicit owner request. `site/src/App.jsx` mounts `RoleExplorer` below the showcase; content is in `site/src/data/roles.js`, UI in `site/src/components/RoleExplorer.jsx`, styles in `site/src/styles/RoleExplorer.css`. It has three working role tabs, keyboard arrow/Home/End navigation, one detail panel, and deep links `#customers`, `#brokers`, `#staff`, which now resolve the existing Product nav links. Role copy uses only documented capabilities: customer chat/voice enquiries and property suggestions, broker lead dashboard/context/takeover, and staff listing addition/updates by WhatsApp. No actual permission matrix exists in the repository; the explorer is a marketing overview, not an access-control implementation. The owner chose documented capabilities rather than supplying a full matrix. Do not add broader permission claims until documented.

`npm.cmd run build` passed after this addition (JS 174.40 kB, CSS 29.92 kB). `review-screenshots/verify-roles.mjs` checked 1440, 820, 390 and 320px: all three clicks changed heading/actions, keyboard ArrowRight selected Broker, direct `#staff` selected Staff, no horizontal overflow or page errors. Current desktop/mobile captures are in `review-screenshots/roles-entry-{1440,390}.png`; the selector and details were visually inspected. No commit or deployment.

Typography refinement after owner feedback on 2026-10-14: `site/src/styles/ProductShowcase.css` now uses the hero's Figtree display weight and tracking for the section heading, keeps its size below the hero h1, brings supporting copy onto the hero lede scale, and aligns feature/brief headings and uppercase field labels with the dashboard/lead-summary hierarchy. `npm.cmd run build` passed. REA recaptured desktop and 390px mobile (evidence `ev_2c3e8607d863928fc7fc36568b391ff87755e30b670df8e27272ca26bbf045d5`, `ev_fe879274d0c68c7f95db77b34c566df8f0809eef33e22dbbad41e19dd057409c`) with no page errors. The browser checks passed again at 1440, 820, 390 and 320px, including no overflow and stable demo behavior. The earlier Impeccable critique snapshot predates this typography refinement; its remaining layout and mobile-story findings are still open.

## Open issues and next task

1. `Book a demo` is inert until the owner supplies `VITE_DEMO_URL`; never invent a URL or number.
2. Nav links `#plans`, `#about`, `#login`, and `#agencies` still have no targets. The Product dropdown's `#customers`, `#brokers`, and `#staff` links now target the role explorer.
3. The animated chat has `aria-live="off"`, while unrevealed summary text exists in the DOM; audit what screen-reader users perceive and make the narrative available coherently.
4. At 390×844, the phone begins around y=484 and the lead summary around y=1128, so the conversation and its result are never visible together in the first viewport. Review whether the mobile story needs a tighter composition.
5. The hero eyebrow/nav labels are provisional copy, and the property visual is an original illustration because no photo was provided. Owner confirmation and React-build visual sign-off are pending.

Next: obtain owner review of the Buyer enquiries showcase, then implement the remaining four demonstrations in later milestones. The five older navbar/hero issues remain for separate direction. Nothing has been committed, pushed or deployed.
