import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" emits relative asset URLs, so the built `dist/` works from any
// sub-path or static host (Netlify, Vercel, S3, GitHub Pages, ...).
export default defineConfig({
  base: "./",
  plugins: [react()],
});
