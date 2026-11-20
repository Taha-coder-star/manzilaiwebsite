const api = process.env.ONBOARDING_API_ORIGIN?.trim();
const upstream = api ? new URL(api) : undefined;
if (upstream && (upstream.protocol !== "https:" || upstream.href !== `${upstream.origin}/`)) {
  throw new Error("ONBOARDING_API_ORIGIN must be the HTTPS origin of the FastAPI service.");
}

export const config = {
  trailingSlash: false,
  rewrites: [
    ...(upstream ? [
      { source: "/client-setup", destination: `${upstream.origin}/client-setup` },
      { source: "/client-setup/:path*", destination: `${upstream.origin}/client-setup/:path*` },
    ] : []),
    { source: "/onboarding", destination: "/index.html" },
    { source: "/onboarding-review", destination: "/index.html" },
  ],
};
