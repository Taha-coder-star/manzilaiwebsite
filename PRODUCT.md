# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: owners and managers of real-estate agencies in Pakistan, who decide whether their team adopts the tool. Individual brokers are a secondary audience (the nav already has separate agency and broker paths); neither has been confirmed as equal to the primary.

## Product Purpose

Manzil AI is a WhatsApp property assistant for real-estate agencies. This repository is its marketing website. The current page contains the navbar, hero, and a three-benefit section. The owner removed the Customer/Broker/Staff showcase on 2026-10-16. Success is an agency owner understanding the product and booking a demo.

## Positioning

Manzil AI answers property enquiries on WhatsApp in Roman Urdu, matches properties, and hands agents a structured lead summary.

## Operating Context

Customers already enquire over WhatsApp. Agents work leads from a dashboard of assigned and unassigned leads. The hero demo conversation is Roman Urdu; site headings and copy are English.

## Capabilities and Constraints

- Site is React 18 + Vite in `site/`; no backend; public config only (`VITE_DEMO_URL`).
- "Book a demo" has no destination yet; the owner will provide a booking link or number. Never invent one.
- Nav and footer-style links (`#plans`, `#about`, `#login`, etc.) are placeholders until those sections exist.
- The owner requested on 2026-10-16 that a single three-benefit section follow the hero. The former showcase source remains in the repository but is not mounted. No other sections or deployment are authorized.
- Demo data stays fictional and internally consistent; nothing is shown as a confirmed booking. One discreet "Illustrative demo · Sample data" label.
- Nav labels are placeholder copy awaiting owner confirmation. The hero eyebrow was removed by owner choice on 2026-10-20.

## Brand Commitments

- Name: Manzil AI. Real house-pin logo mark (SVG, viewBox 294x358) used with proportions intact, dark and light variants.
- Roman Urdu for the demo conversation, English for site copy.
- Follow Up Boss is a layout and interaction reference only; do not copy its text or assets.
- `Manzil AI website.html` is the owner's old design export: read-only reference.

## Evidence on Hand

- Real: the logo mark and Figtree font (`site/src/assets/`).
- Not available: customer names, statistics, testimonials, client logos, property photos (the listing image is an original illustration), pricing. Future work must not fabricate any of these.

## Product Principles

1. Show the product working (Roman Urdu chat to structured lead) before making claims.
2. Never invent proof: no stats, customers, testimonials or confirmed bookings.
3. Speak to agency owners first; keep information limited and readable.
4. Placeholder copy and links are flagged, not silently finalised.

## Accessibility & Inclusion

Respect `prefers-reduced-motion` (finished scene, no timers). Keyboard-operable navigation with Escape and outside-click handling. Roman Urdu demo text must stay legible.
