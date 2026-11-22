# Five-step client setup layout

Proposed for Manzil review. The portal follows the five questionnaire sections in order. The coordinator signs in before reaching the steps, reviews the full draft after step 5, and returns to a status page after submission. The steps and review screen use the same [field map](field-map.md).

| Step | On-screen title | What the coordinator sees |
| --- | --- | --- |
| 1 | Agency details | Agency and branch details, coordinator contact, and agency approver |
| 2 | WhatsApp setup | Requested number, current account setup, and verification contacts |
| 3 | Staff and brokers | Roster, listing editors, enquiry recipients, and fallback routing |
| 4 | Inventory and files | Inventory and photos, sharing permissions, file status, and optional materials |
| 5 | Customer rules | Language, greeting, handoff, hours, restrictions, and pilot audience |

## Desktop

The invitation opens the start screen. Returning clients use **Client sign in**. At the pilot launch, that entry also appears in the homepage navigation alongside the WhatsApp demo CTA.

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Manzil AI                                                  Get help  │
│                                                                      │
│              Set up your agency                                      │
│              This invitation links you to your agency’s setup.       │
│              [ Start setup ]                                         │
│              Already started?  Client sign in                        │
└──────────────────────────────────────────────────────────────────────┘
```

The returning coordinator sees the latest saved step and a single resume action. A returned section takes priority and surfaces the reviewer’s note.

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Manzil AI     Pearl Realty                                 Get help  │
│                                                                      │
│              Your agency setup                                       │
│              2 of 5 complete                                         │
│              Next step · Staff and brokers                           │
│              [ Resume setup ]                                        │
└──────────────────────────────────────────────────────────────────────┘
```

In the questionnaire, the checklist is at the left. The current step and its save controls are on the right. Use text to identify completed, current, pending, and returned sections.

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Manzil AI     Pearl Realty                                 Get help  │
├────────────────────────────┬─────────────────────────────────────────┤
│ Setup checklist            │ Staff and brokers                       │
│ Agency details   Complete  │                                         │
│ WhatsApp setup   Complete  │ Staff roster submission                 │
│ Staff and brokers Current  │ [ Choose how to provide the roster  ▾ ] │
│ Inventory and files        │                                         │
│ Customer rules             │ Other fields for this step              │
│                            │                                         │
│                            │ [ Back ]   [ Save and continue ]        │
│                            │ Draft saved at 10:42                    │
└────────────────────────────┴─────────────────────────────────────────┘
```

## Mobile

The invite and resume screens put the primary action near the top. **Get help** stays in the header, including on the start, resume, edit, review and status screens. During editing, compact text shows the current step and number complete. **View all steps** expands the same checklist used on desktop.

```text
┌───────────────────────────────┐
│ Manzil AI           Get help  │
│                               │
│ Set up your agency            │
│ Use your agency invitation.   │
│ [         Start setup       ] │
│ Already started?              │
│ Client sign in                │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Manzil AI           Get help  │
│                               │
│ Your agency setup             │
│ Pearl Realty                  │
│ 2 of 5 complete               │
│ Next · Staff and brokers      │
│ [         Resume setup      ] │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Manzil AI           Get help  │
│ Step 3 of 5                   │
│ 2 complete · View all steps   │
│                               │
│ Staff and brokers             │
│ Staff roster submission       │
│ [ Choose roster method    ▾ ] │
│                               │
│ Other fields for this step    │
│                               │
│ Draft saved at 10:42          │
│ [     Save and continue     ] │
│ Back                          │
└───────────────────────────────┘
```

## Save, review and setup status

- A first visit starts at **Agency details**. A returning visit resumes at the latest saved active step or the first incomplete step. A reviewer-returned section takes priority. A stale or expired invitation gives the coordinator a way to reach the setup contact for a new invite. Keep the invitation and help available independently of the homepage until the pilot.
- Show “Draft saved” after the server confirms a save. A failed save keeps the entered values on screen and shows **Retry save** next to the message. Update the checklist and move forward after success. The mobile layout keeps the same save actions and messages in the document flow.
- After step 5, **Review your setup** displays all five sections as summaries with edit links and the attachment state. Show what needs attention next to the relevant section. **Submit for review** submits the saved draft. The review page sits outside the five-step counter.
- After submission, **Setup status** shows the most recent decision, the next action, and the Manzil contact. If a reviewer reopens a section, both parties see the same status and section-specific note. The coordinator opens the returned section and resubmits after saving.
- The status screen shows the WhatsApp verification call, launch checks, and sign-off when those steps apply. The Manzil reviewer marks the agency live after the prerequisites pass.
