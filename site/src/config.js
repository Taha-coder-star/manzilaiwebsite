// Public, non-secret build-time settings. Anything prefixed VITE_ is bundled into
// the client, so never put credentials or private keys here.
//
// VITE_DEMO_URL: where "Book a demo" should go (a scheduling page, a wa.me link, ...).
// It is not configured yet, so the demo buttons show "Booking opens soon" until it is set.
// Set it in a `.env` file (see .env.example) or in your host's build environment.
export const DEMO_URL = (import.meta.env.VITE_DEMO_URL || "").trim();
