# Chunk 1 verification

Reviewed November 20, 2026. Homepage source baseline `e96738f` from `launch/demo-video`. Backend capability reference `5f220e0`.

## Questionnaire and portal layout

| Check | Result |
| --- | --- |
| Every existing question has a portal destination | **Pass.** All 43 linked response headers match the Drive Form generator and the field map, in the same order. Section counts are 12, 8, 7, 7, and 9. The map has 43 distinct destinations, 39 required and 4 optional answers in the generator, applicability for every question, and existing support notes. |
| Pilot guide has a destination | **Pass.** The map covers the coordinator, private file intake and templates, the verification call, permissions, scope review, and launch checks. |
| Hosted Form settings | **Pending.** Drive confirms the Form exists. The linked response sheet verifies question titles and order. The Drive connector could not retrieve item settings from the Form. Compare the editor’s required flags, choices, and page navigation against the generator before sign-off. |
| Start, resume, and help are visible in both layouts | **Pass for design review.** The desktop and mobile wireframes show invitation entry, returning client entry, help, progress, and the active step. Manzil’s layout agreement is pending. |

[Questionnaire field map](field-map.md) · [Desktop and mobile layout](portal-layout.md)

## Homepage baseline

The homepage shows the marketing navigation, hero, interactive sample, benefits, product video, comparison, FAQ, demo request and footer. On desktop, **Request a demo on WhatsApp** appears in the navigation, hero and closing section. On mobile it appears in the menu, hero and closing section. With `VITE_DEMO_URL` set, each opens the same `wa.me` link in a new tab with the demo request prefilled. If the variable is absent, the CTA shows “Demo requests open soon.” The footer uses the WhatsApp destination without the prefilled message. The hero’s **Watch the demo (2:30)** jumps to `#demo-video`, where **Play demo** loads the video. The homepage has no client sign-in entry at this baseline.

| Check | Result |
| --- | --- |
| Vite production build | **Pass.** Node 24.22.1 and Vite 6.4.4. Used `vite build --configLoader runner` with the installed runtime and the existing local build configuration. The package defines build and preview scripts. No app source changes were needed. |
| Local production layout and demo request | **Pass.** Chrome at 1440, 390 and 320 px. All visible demo request CTAs had the same configured WhatsApp URL and prefill. The mobile menu exposed the same link. Clicking the hero CTA opened a new tab and issued the expected URL, which the test intercepted. No horizontal overflow or JavaScript page errors. |
| Product video | **Pass locally.** **Watch the demo** reached the player. Play started the landscape video at 1440 px and the portrait video at 390 and 320 px. The initial player had no video source, and byte-range requests returned `206` with `video/mp4`. |
| Staging build and live WhatsApp chat | **Pending.** Vercel reported the existing preview ready on homepage PR #2. The preview and direct WhatsApp destination could not be opened from this session. The browser interception verifies the homepage’s outbound navigation only. |

## Recovery and handoff

- If a Form setting has changed, update the affected field-map row and recheck the linked header. Keep the first client’s existing Google Form and Drive workflow available during the pilot.
- If the homepage demo link fails on staging, check the preview’s `VITE_DEMO_URL` and rebuild. Open the demo CTA from the desktop navigation and mobile menu, verify the intended WhatsApp account and prefilled message, and close the chat. Check the video entry and both cuts on the same preview. Restore the previous known-good deployment if a release regresses the homepage.
- The proposed PR contains the field map, portal layouts and this verification record. It can be reverted as one documentation change. There are no application, data or deployment changes to recover.

Chunk 1 remains open for the hosted Form settings check, staging and live demo verification, and Manzil’s layout approval. Open one website PR for these artifacts once repository access is available. Review the recorded results before starting Chunk 2.
