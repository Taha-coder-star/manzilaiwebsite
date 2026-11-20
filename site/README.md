# Manzil AI website

The Manzil AI marketing homepage includes the interactive hero, agency benefits, a product video, a comparison table, an FAQ, and WhatsApp demo requests.
Built with **React 18 + Vite 6**. The interactive hero uses fictional sample data.

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
| `VITE_DEMO_URL` | Public WhatsApp link for the "Request a demo on WhatsApp" buttons. |
| `VITE_SITE_URL` | Public HTTPS homepage URL for the canonical link and Open Graph metadata. Include the site subpath if applicable. |
| `VITE_PRIVACY_URL` | Approved public privacy policy URL for the footer. |

Set `VITE_DEMO_URL` in the preview and production build environments. Use the approved public
number with its country code and digits only in the `wa.me` path. Set the URL-encoded `text`
parameter to “Hi, I’d like to see a Manzil AI demo for my real-estate agency.” Rebuild the
site after changing the link.

Set all three public URLs before release. For a local preview, leave the homepage and privacy
URLs blank to omit the sharing tags and privacy link. After deploying, share the homepage on
WhatsApp and check the title, description, and branded image.

## Product video

The original 2:30 landscape and portrait MP4s and their WebP posters live in `public/demo/`.
The player selects portrait at widths up to 640px when the visitor presses Play. It keeps the
selected cut if the viewport changes during playback. The browser fetches the MP4 only after
Play. Check that the release host serves the files as `video/mp4` and returns `206 Partial Content`
for byte-range requests so visitors can seek.

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
    DemoVideo.jsx          responsive poster and native video controls
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

The benefits illustrations reveal their message-to-result steps once on scroll and have a
`Replay examples` control. Reduced motion shows each complete example immediately. The former
Customer/Broker/Staff showcase remains in the source tree.

## Editing the demo

Change the conversation, leads, counts or summary fields in `src/data/demo.js`; no component changes are needed.
Each conversation step has a `holdMs` pause, and can reveal summary fields or switch the lead to "Viewing requested".
With `prefers-reduced-motion` enabled the finished scene is shown immediately.

