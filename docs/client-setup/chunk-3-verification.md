# Chunk 3 guided questionnaire

The [field map](field-map.md) supplies 43 questions across the five steps. FastAPI serves their definitions and validates the answers. The portal uses the accepted invitation for the read-only coordinator email. Inventory and photo questions capture preparation status. The final review shows the saved answers and links back to each section.

## Release order

1. Release the backend after migrations through `022_onboarding_questionnaire.sql`. Keep `ONBOARDING_QUESTIONNAIRE_ENABLED=false` while the API is released. The backend guide `docs/CLIENT_SETUP.md` in `manzil-ai` covers verified SES senders and Cognito.
2. Deploy the website with `site` as the Vercel root and keep the approved `VITE_DEMO_URL` in the preview environment. The static `site/vercel.json` rewrites `/onboarding` to the React entry and forwards `/client-setup` to the deployed AWS FastAPI origin. If the AWS origin changes, update both destinations in `site/vercel.json` and redeploy. An unsigned request to `/client-setup/api/questionnaire` should return FastAPI's JSON `401` response. [Vercel rewrites](https://vercel.com/docs/routing/rewrites)
3. Set FastAPI `ONBOARDING_ORIGIN` and Cognito `PortalOrigin` to the stable Vercel staging origin used in the browser. Register `/client-setup/callback` on that origin. Activate `ONBOARDING_QUESTIONNAIRE_ENABLED=true` when that frontend is available.
4. Use an invited staging coordinator to open a shared `/onboarding` link, sign in, save on desktop, resume on a phone, and finish through review. Check a failed save and retry, refreshing direct portal links, and the homepage WhatsApp CTA. Verify that sign-in and save preserve the browser session through the Vercel proxy.

For local development and production preview, set server-only `ONBOARDING_API_ORIGIN` to the local FastAPI origin and start Vite. Use the Vite origin for `ONBOARDING_ORIGIN` on the backend so same-origin writes pass. The proxy is configured for both `vite dev` and `vite preview`.

## Results

- Vite production build passed. Chrome exercised desktop at 1440 px and mobile at 390 px, with a 320 px overflow check. It opened the direct portal link, accepted an invitation with simulated Cognito, saved with the real FastAPI and Postgres stack, resumed on a phone, and completed the review.
- A forced `503` preserved entered answers and showed a retry action. Retrying saved the section and confirmed success. A stale revision preserved the edited values while loading the latest server revision. Field errors cleared as the coordinator corrected the answers.
- The homepage WhatsApp demo CTA opened the configured URL in both desktop and mobile Chrome. The test intercepted the outbound request.
- The Vercel route configuration passed local checks. Live Cognito and SES delivery, the deployed Vercel deep link and proxy, and the two GitHub PRs are pending.

## Recovery

- A failed save keeps the entered answers in the open tab. **Retry save** sends the same section again. The portal confirms a save after the API returns success.
- If another device saves first, **Load latest revision** refreshes the server version and preserves the answers in the editor. Check those answers before saving that section again.
- If a deployment breaks sign-in or routing, set `ONBOARDING_QUESTIONNAIRE_ENABLED=false` to restore the legacy sign-in destination, then restore the known-good website build. Migration 022 preserves the saved drafts.
