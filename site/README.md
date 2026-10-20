# Manzil AI website

Navbar, hero, and a three-benefit section for the Manzil AI marketing site. The former Customer/Broker/Staff showcase is not rendered.
Built with **React 18 + Vite 6**. Everything shown in the illustration is fictional sample data.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install        # once
npm run dev        # dev server with hot reload, http://localhost:5173
```

## Production build

```bash
npm run build      # outputs the static site to dist/
npm run preview    # serves dist/ locally to check the build, http://localhost:4173
```

`dist/` is plain static files and can be hosted anywhere (Netlify, Vercel, S3/CloudFront, GitHub Pages, ...).
Asset URLs are relative (`base: "./"` in `vite.config.js`), so it also works from a sub-path.

## Configuration

Copy `.env.example` to `.env` to change public settings. Variables prefixed `VITE_` are bundled into the
client, so **never put secrets or credentials in them**. There is no backend and no credentials in this project.

| Variable        | Purpose                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------- |
| `VITE_DEMO_URL` | Destination of the "Book a demo" buttons. Not set yet, so the buttons do nothing until it is. |

## Project layout

```
index.html                 Vite entry
public/favicon.svg         favicon (copied as-is)
src/
  main.jsx, App.jsx        mounting and page shell
  config.js                public build-time settings (VITE_DEMO_URL)
  components/
    Navbar.jsx             sticky nav, dropdowns, mobile menu
    Hero.jsx               hero copy + CTAs, composes the illustration
    AgencyBenefits.jsx     three agency outcomes with illustrative UI examples
    DashboardPreview.jsx   sidebar and lead list (supporting context)
    WhatsAppDemo.jsx       the WhatsApp-style phone
    LeadSummary.jsx        summary card that follows the conversation
    ProductShowcase.jsx     retained, unmounted showcase source
    DemoLink.jsx, Icons.jsx
  hooks/
    useDemoSequence.js     conversation timeline (state + timer cleanup)
    useStageScroll.js      scroll-linked parallax
    useShowcaseScroll.js    retained, unused showcase hook
    usePrefersReducedMotion.js
  data/
    demo.js                sample leads, sidebar counts, summary fields, conversation script
    benefits.js            benefit headings and descriptions
    showcase.js            retained showcase sample data
    nav.js                 navigation items
  styles/                  global.css plus one stylesheet per component
  assets/                  logo marks, font, sample listing illustration
```

The page mounts `Navbar`, `Hero`, and `AgencyBenefits` in `src/App.jsx`. The benefits illustrations reveal their message-to-result steps once on scroll and have a `Replay examples` control; reduced motion shows each complete example immediately. Showcase components, styles, data, and hooks are retained as unused source so the existing work is preserved. Navbar anchors for sections that are no longer rendered are placeholders.

## Editing the demo

Change the conversation, leads, counts or summary fields in `src/data/demo.js`; no component changes are needed.
Each conversation step has a `holdMs` pause, and can reveal summary fields or switch the lead to "Viewing requested".
With `prefers-reduced-motion` enabled the finished scene is shown immediately.

