# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: owners and managers of real-estate agencies in Pakistan, who decide whether their team adopts the tool. Individual brokers are a secondary audience (the nav has separate agency and broker entries); neither has been confirmed as equal to the primary.

## Product Purpose

Manzil AI is a WhatsApp property assistant for real-estate agencies. This repository is its marketing website. The current page contains the navbar, hero, a three-benefit section and a comparison table (added 2026-11-18). The owner removed the Customer/Broker/Staff showcase on 2026-10-16. Success is an agency owner understanding the product and booking a demo.

## Positioning

Manzil AI answers property enquiries on the agency's WhatsApp number in Roman Urdu, by text or voice note, at any hour. It understands Karachi area names and their spelling variants, matches buyers to the agency's own listings, sends listing photos in the chat, and hands the buyer to a broker with a structured summary. Staff send listing updates over WhatsApp and the agency reviews them as drafts.

## Operating Context

Customers already enquire over WhatsApp. Today the product runs entirely on WhatsApp: brokers and staff receive handoffs and send listing updates there. It has no web dashboard and no web login yet. The hero's lead dashboard is an illustration of the concept; copy must not present it as a screen customers can log in to. The hero demo conversation is Roman Urdu; site headings and copy are English.

## Capabilities and Constraints

- Site is React 18 + Vite in `site/`; no backend; public config only (`VITE_DEMO_URL`).
- "Book a demo" has no destination yet; the owner will provide a booking link or number. Never invent one.
- Every nav link must point at an id on the page (2026-11-18 pass). Product links go to the benefit cards (`#customers`, `#brokers`, `#staff`, ids from the `anchor` field in `site/src/data/benefits.js`); "Real-estate agencies" goes to `#benefits`. Plans, About and Log in are hidden until the owner supplies pricing, company copy, and a real login. Do not restore them as empty placeholders.
- Page sections authorised by the owner: the hero; one three-benefit section after it (2026-10-16); and a comparison table after the benefits (`#compare`, 2026-11-18). The former showcase source remains in the repository but is not mounted. No other sections or deployment are authorised.
- Comparison table (`site/src/data/comparison.js`, `Comparison.jsx`): columns are "Replying by hand", "Generic chatbots" and Manzil AI. Never name real competitors. A Manzil tick may only mark an owner-confirmed, shipped feature. Other-column values describe typical setups and keep the footnote "Based on typical setups. Chatbot features vary by provider." No setup-time, speed or price claims until the owner can back them.
- Open owner decisions: demo booking link (`VITE_DEMO_URL`), Plans content, About content, footer with privacy/contact (the product backend already serves a privacy page), whether to restore Log in once a dashboard exists.
- Demo data stays fictional and internally consistent; nothing is shown as a confirmed booking. One discreet "Illustrative demo · Sample data" label.
- Nav labels are placeholder copy awaiting owner confirmation. The hero eyebrow was removed by owner choice on 2026-10-20.

## Brand Commitments

- Name: Manzil AI. Real house-pin logo mark (SVG, viewBox 294x358) used with proportions intact, dark and light variants.
- Roman Urdu for the demo conversation, English for site copy.
- Follow Up Boss is a layout and interaction reference only; do not copy its text or assets.
- `Manzil AI website.html` is the owner's old design export: read-only reference.

## Evidence on Hand

- Real: the logo mark and Figtree font (`site/src/assets/`).
- Owner-confirmed capabilities (2026-11-18, for the comparison table): replies to enquiries after office hours, understands WhatsApp voice notes, knows Karachi area names and spelling variants, sends listing photos in the chat. Plus, per the positioning above: Roman Urdu, matching buyers to the agency's own listings, broker handoff with a summary, and staff listing updates turned into drafts for agency review.
- Not available: customer names, statistics, testimonials, client logos, property photos (the listing image is an original illustration), pricing. Future work must not fabricate any of these.

## Product Principles

1. Show the product working (Roman Urdu chat to structured lead) before making claims.
2. Never invent proof: no stats, customers, testimonials or confirmed bookings.
3. Speak to agency owners first; keep information limited and readable.
4. Placeholder copy and links are flagged, not silently finalised.

## Accessibility & Inclusion

Respect `prefers-reduced-motion` (finished scene, no timers). Keyboard-operable navigation with Escape and outside-click handling. Roman Urdu demo text must stay legible.
