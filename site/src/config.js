// Public, non-secret build-time settings. Anything prefixed VITE_ is bundled into
// the client, so never put credentials or private keys here.
// See .env.example for the public build settings.
export const DEMO_URL = (import.meta.env.VITE_DEMO_URL || "").trim();
export const PRIVACY_URL = (import.meta.env.VITE_PRIVACY_URL || "").trim();
