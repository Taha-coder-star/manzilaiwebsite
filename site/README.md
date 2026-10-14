# Manzil AI website

Navbar, hero, the first product showcase milestone (Buyer enquiries), and an interactive Customer/Broker/Staff role explorer for the Manzil AI marketing site.
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
    DashboardPreview.jsx   sidebar and lead list (supporting context)
    WhatsAppDemo.jsx       the WhatsApp-style phone
    LeadSummary.jsx        summary card that follows the conversation
    ProductShowcase.jsx     next-section layout and Buyer enquiries demonstration
    RoleExplorer.jsx        three-role selector and detail panel
    DemoLink.jsx, Icons.jsx
  hooks/
    useDemoSequence.js     conversation timeline (state + timer cleanup)
    useStageScroll.js      scroll-linked parallax
    usePrefersReducedMotion.js
  data/
    demo.js                sample leads, sidebar counts, summary fields, conversation script
    showcase.js            fictional buyer enquiry and five navigation labels
    roles.js               documented Customer/Broker/Staff role overview
    nav.js                 navigation items
  styles/                  global.css plus one stylesheet per component
  assets/                  logo marks, font, sample listing illustration
```

The showcase currently demonstrates Buyer enquiries only. The other four labels are disabled until their demonstrations are built and reviewed. Its sample conversation, extracted details and timing live in `src/data/showcase.js`; the sequence runs once when visible, holds the finished brief, and offers Replay. Reduced motion shows the completed brief immediately.

The role explorer below it switches between Customer, Broker and Staff. The Product dropdown's role links lead to the matching tab. These panels summarize documented actions; they do not define or enforce backend permissions. A complete permission matrix has not been supplied.

## Editing the demo

Change the conversation, leads, counts or summary fields in `src/data/demo.js`; no component changes are needed.
Each conversation step has a `holdMs` pause, and can reveal summary fields or switch the lead to "Viewing requested".
With `prefers-reduced-motion` enabled the finished scene is shown immediately.

