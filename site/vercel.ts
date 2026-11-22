// Keep the deployed portal routes available when Vercel evaluates this file without project variables.
const defaultApiOrigin = "https://100-60-196-120.sslip.io";
const upstream = new URL(process.env.ONBOARDING_API_ORIGIN?.trim() || defaultApiOrigin);
if (upstream.protocol !== "https:" || upstream.href !== `${upstream.origin}/`) {
  throw new Error("ONBOARDING_API_ORIGIN must be the HTTPS origin of the FastAPI service.");
}

export const config = {
  trailingSlash: false,
  rewrites: [
    { source: "/client-setup", destination: `${upstream.origin}/client-setup` },
    { source: "/client-setup/:path*", destination: `${upstream.origin}/client-setup/:path*` },
    { source: "/onboarding", destination: "/index.html" },
    { source: "/onboarding-review", destination: "/index.html" },
  ],
};
