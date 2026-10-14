---
target: new section below hero
total_score: 22
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 1
target_identity: "file:E:\\manzil-aiwebsite\\site\\src\\components\\ProductShowcase.jsx"
target_fingerprint: "sha256:20a5f8d1be8003cc5d78fd00667ebd85413871e61c7a9142168ea2cdab6ea793"
target_path: "E:\\manzil-aiwebsite\\site\\src\\components\\ProductShowcase.jsx"
timestamp: 2026-10-14T18-01-49Z
slug: site-src-components-productshowcase-jsx
---
# Product showcase critique — Buyer enquiries milestone

Method: dual-agent (A: /root/critique_design · B: /root/critique_detector). Target: `site/src/components/ProductShowcase.jsx` with its live section at `http://127.0.0.1:4176/#manzil-in-action`.

## Design health

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of status | 3 | Brief counter and completion state are clear. |
| 2 | Match with real world | 4 | Roman Urdu, DHA and PKR make the example credible. |
| 3 | Control and freedom | 3 | Replay works; reduced motion is static. |
| 4 | Consistency | 3 | Brand fit is good, though only one tab is enabled. |
| 5 | Error prevention | 3 | Future tabs are clearly disabled. |
| 6 | Recognition | 3 | Chat and brief separate on mobile. |
| 7 | Flexibility | n/a | A marketing demonstration has no repeated task flow. |
| 8 | Aesthetic restraint | 3 | Fine dividers and typography work; disabled menu is prominent. |
| 9 | Error recovery | n/a | There is no error-producing user workflow. |
| 10 | Help | n/a | This is a self-explanatory marketing demonstration. |
| **Total** | | **22/28** | |

## Design specificity

The local story is authored for Manzil: Roman Urdu dialogue, DHA Phase 6, the PKR rental budget, and the WhatsApp-to-brief transition make the product legible. The overall split layout is familiar, but uses Manzil's palette and Figtree. Impeccable's CLI detector found zero findings (`[]`) in ProductShowcase.jsx. Its browser injection was unavailable because the browser evaluation surface was read-only; screenshots, DOM metrics and accessibility inspection supplied fallback evidence. No overlay was shown.

## What works

- The example gives an agency owner a concrete requirement-gathering story without invented proof.
- At desktop size the conversation and extracted brief sit together, making the 0/4 to 4/4 progression easy to follow.
- The section uses the existing forest, mint and warm-white system; Replay and reduced motion are handled.

## Priority issues

1. **P1 — Direct section link clips the introduction.** At a 1440px desktop direct hash entry, the sticky header covers the label and top of the heading. Add a section scroll margin tied to header height. Suggested command: `$impeccable layout`.
2. **P2 — The disabled feature menu takes too much attention.** Four of five labels say Soon, so the menu promises more interaction than this milestone offers. Subordinate pending labels until their demonstrations are ready. Suggested command: `$impeccable distill`.
3. **P2 — The mobile result sits below the entire chat.** The brief begins about 430px after the chat begins; a visitor must scroll to connect the conversation with its output. Compact or preview the brief during the conversation while keeping text readable. Suggested command: `$impeccable adapt`.
4. **P3 — Supporting copy promises unshown steps.** Property sharing and agent takeover are described above a Buyer enquiries-only demonstration. Treat that sentence as the forthcoming journey or narrow it for this milestone. Suggested command: `$impeccable clarify`.
5. **P3 — The closing payoff is general.** The line below the scene repeats what the visual shows. Name the agent's practical next step using documented product truth. Suggested command: `$impeccable clarify`.

## Persona checks

- A first-time agency owner sees five choices, but four are unavailable and may read the section as unfinished.
- A skeptical evaluator sees property sharing and handoff in the intro but cannot inspect those steps yet.
- A mobile visitor has to scroll beyond the chat to see the structured outcome.

## Minor notes and question

Replay is small but clearly labeled. The browser showed no horizontal overflow at 390px, four disabled tabs, and a completed 4/4 brief. Should this milestone foreground one finished story and treat the other four steps as a quieter preview until their demonstrations are ready?
