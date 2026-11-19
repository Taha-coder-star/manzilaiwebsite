import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function shareMetadata(siteUrl) {
  const canonical = new URL(siteUrl);
  if (canonical.protocol !== "https:" || canonical.search || canonical.hash) {
    throw new Error("VITE_SITE_URL must be the public HTTPS homepage URL without a query or fragment.");
  }

  const assetBase = canonical.href.endsWith("/") ? canonical.href : canonical.href + "/";
  const tags = {
    "og:type": "website",
    "og:title": "Manzil AI — Your agency’s property assistant on WhatsApp",
    "og:description": "Answer property enquiries in Roman Urdu, match buyers to your listings, and hand the conversation to your broker.",
    "og:url": canonical.href,
    "og:image": new URL("manzil-ai-share.png", assetBase).href,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": "Manzil AI. Your agency’s property assistant, on WhatsApp.",
  };

  return {
    name: "manzil-share-metadata",
    transformIndexHtml() {
      return [
        { tag: "link", attrs: { rel: "canonical", href: canonical.href } },
        ...Object.entries(tags).map(([property, content]) => ({ tag: "meta", attrs: { property, content } })),
      ];
    },
  };
}

// base "./" emits relative asset URLs, so the built `dist/` works from any
// sub-path or static host (Netlify, Vercel, S3, GitHub Pages, ...).
export default defineConfig(({ mode }) => {
  const siteUrl = loadEnv(mode, process.cwd(), "VITE_").VITE_SITE_URL?.trim();
  return {
    base: "./",
    plugins: [react(), siteUrl && shareMetadata(siteUrl)],
  };
});
