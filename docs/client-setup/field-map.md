# Client setup questionnaire field map

The Siddiq Estate pilot questionnaire has **43 questions in five sections**. The question titles and order match the linked response sheet’s header. Required flags and input types come from the Drive copy of the Google Form generator. Its creation manifest records 43 questions. The final pilot guide supplies the file preparation and assisted setup requirements. The hosted Form editor still needs a check for any changes to required flags, choices, or branching made after creation.

Each table is a source section and a proposed portal step. `R` means the source question is required and `O` means optional. “When it applies” describes proposed portal behavior. If a required source question uses `N/A` for a conditional field, the portal can show the condition and store an explicit inapplicable value. Save drafts with missing answers. At review, validate required applicable answers and show unresolved setup items separately. Use the generator’s choices as the starting point, with the changes called out below.

**Support today** is a code and pilot guide assessment. **Supported** means the existing system has the relevant runtime capability. **Partial** means the system supports some of the request or has an operator path. **Manual** means Manzil handles the information in the assisted workflow. **Gap** means the requested behavior needs implementation. Support for a capability does not authorize changes to active configuration. Store all answers in the onboarding draft and apply only the reviewed scope at activation.

## 1. Business details and contact person → Agency details

| Form question | Required | Portal destination | When it applies | Support today |
| --- | --- | --- | --- | --- |
| Agency/business name | R | `agency.name` | Always | Supported. The active agency has a name and slug. |
| Preferred business name shown to customers | R | `agency.display_name` | Always | Partial. The active agency has one name. A separate customer-facing name needs support. |
| Office address | R | `agency.office_address` | Always | Manual. Record for setup and confirm office details with the coordinator. |
| Google Maps link | O | `agency.maps_url` | If the agency has a map link | Manual. Office map links are setup information. |
| Business hours and working days | R | `agency.business_hours` | Always | Manual. Record the schedule for review. Agency-specific hours do not drive assistant behavior today. |
| Website and social media links | O | `agency.web_links` | If the agency has links to share | Manual. Branding files belong in step 4. |
| Main contact person's name | R | `coordinator.name` | Always | Manual. The guide nominates one coordinator. |
| Main contact person's phone number | R | `coordinator.phone` | Always. Include country code. | Manual. Use as the setup contact, separate from staff routing. |
| Main contact person's email | R | `coordinator.email` | Always. Use the invited, verified email in the portal. | Manual. The guide nominates a Google account for Drive. Portal identity and verification are new. |
| Who can approve setup decisions, listing access and the final launch? | R | `agency.approver` | Always. Record name, role and contact. | Manual. The agency approver confirms access and scope. Manzil records sign-off and owns the go-live decision. |
| How many offices or branches do you operate? | R | `agency.office_count` | Always | Manual. Record one office or multiple branches for scope review. |
| Which branch or branches should be included initially? | R | `agency.initial_branches` | Always. Name the one office, selected branches, or all branches. | Manual. Review branch inclusion before approval. The runtime does not expose a branch-level rollout setting. |

## 2. WhatsApp number and account → WhatsApp setup

| Form question | Required | Portal destination | When it applies | Support today |
| --- | --- | --- | --- | --- |
| Which phone number should customers message? | R | `whatsapp.requested_number` | Always. Capture an international number or an explicit request for a new number. | Partial. A connected Meta phone-number ID can route after operator provisioning and sender verification. A draft phone number is just a request. |
| What is this number currently using? | R | `whatsapp.current_connection` | Always. Include new/unregistered and unknown states. | Manual. Manzil checks the current setup during the verification call. |
| Must staff continue using the WhatsApp Business app on this number? | R | `whatsapp.keep_business_app` | Always, including a request to use the app after setup. | Manual. Coexistence needs case-by-case confirmation. The current integration provides no portal coexistence flow. |
| Is this number used only for business or also for personal conversations? | R | `whatsapp.current_use` | Always. Include new/unused. | Manual. Resolve mixed use during the call before changing the number. |
| Who controls the SIM/number and can receive a verification SMS or call? | R | `whatsapp.verification_contact` | Always. If a new number is needed, identify who will handle verification once assigned. | Manual. The client enters any code during the call. The portal collects contact details only. |
| Do you have a Meta/Facebook Business Portfolio? | R | `whatsapp.has_meta_portfolio` | Always | Manual. Manzil confirms the portfolio during assisted setup. |
| Who has administrator access to the Meta/Facebook Business Portfolio? | R | `whatsapp.meta_admin_contact` | For an existing portfolio. If unknown, record an item for the setup call. If absent, store inapplicable. | Manual. Record a contact and arrange attendance if applicable. |
| If the existing number cannot be connected suitably, would you accept a new dedicated number? | R | `whatsapp.accepts_dedicated_number` | If proposing an existing number. A new-number request already establishes this preference. | Manual. Manzil and the agency agree on the fallback during setup. |

## 3. Staff and broker accounts → Staff and brokers

| Form question | Required | Portal destination | When it applies | Support today |
| --- | --- | --- | --- | --- |
| Staff roster submission | R | `team.roster_method` | Always. Record roster provided or due before setup. Preserve the inline and CSV paths. | Partial. Operators can configure agency-scoped staff and brokers. Roster intake and provisioning are assisted. |
| Staff and broker roster, if not uploaded | O | `team.roster_entries` | When providing the roster inline. Each entry carries name, international number, role, and branch or area. | Partial. WhatsApp number, name and role are supported, with broker area coverage. The agency’s source branch labels need manual review. |
| Who adds and updates property listings? | R | `team.listing_editors` | Always. Identify people from the roster or record a contact for follow-up. | Supported. Active admins and agents can create or update listing drafts through WhatsApp. |
| Who receives customer enquiries and visit requests? | R | `team.enquiry_recipients` | Always | Supported. Handoffs route to eligible brokers or an admin fallback. |
| Who is the main broker, and who is the backup? | R | `team.primary_and_backup_broker` | Always. An explicit “no backup” is a valid answer. | Partial. The runtime selects eligible staff by listing, area, load, and role. A named primary/backup pair is an operator decision and has no dedicated runtime setting. |
| Should enquiries go to one broker or different brokers by area/property? | R | `team.routing_preference` | Always. Include “Discuss during setup”. | Supported within existing routing. Manzil reviews eligible broker coverage and listing assignments before applying them. |
| Routing details and contact if a broker is unavailable | R | `team.fallback_and_allocation` | Record a fallback for every agency and allocation details for area- or property-based routing. | Partial. The runtime has an eligible broker/admin fallback and supports listing and area assignments. Free-text allocation and fallback rules need review. |

## 4. Property inventory and photos → Inventory and files

| Form question | Required | Portal destination | When it applies | Support today |
| --- | --- | --- | --- | --- |
| Property inventory submission | R | `inventory.submission_status` | Always. Record existing file, template, due before setup, or no inventory ready. An uploaded status requires a verified file once uploads ship. | Partial. Active inventory and listing drafts exist. Pilot intake uses Drive and an assisted inventory preparation step. |
| Property photo submission | R | `inventory.photo_status` | Always. Record provided, pending, or none. Each supplied photo needs a property reference. | Partial. Listing media has separate storage for private originals and customer card images. The pilot groups photos by property reference in Drive. Portal upload and matching are new. |
| Any information or photos that must not be shared with customers? | R | `inventory.sharing_restrictions` | Always. Record exact property references and restrictions or “None”. | Partial. The customer listing view exposes approved fields. Manzil reviews restrictions and excludes private images from customer-ready assets. Free text needs human review. |
| Do you have permission to use the supplied listings and photos? | R | `inventory.material_permission` | Always. Record confirmed, partial, or unconfirmed. Approve material only after permission is confirmed for that material. | Manual. The pilot guide requires a permission check during review. |
| Who will keep prices and availability current? | R | `inventory.maintenance_owner` | Always. Record name, role and contact. | Partial. Staff can update listing drafts and inventory has freshness fields. The named responsibility is agreed during setup. |
| Do you sell builder projects? | R | `inventory.sells_builder_projects` | Always | Partial. The catalog supports project metadata and linked properties. Review scope for any builder-specific workflow. |
| Builder project requirements, if applicable | O | `inventory.builder_requirements` | When builder projects are in scope. Attach relevant brochures separately. | Gap for custom installment, unit-selection, or booking workflows. Collect requirements for review. |

## 5. Customer experience and business rules → Customer rules

| Form question | Required | Portal destination | When it applies | Support today |
| --- | --- | --- | --- | --- |
| Preferred customer language | R | `customer.language_preferences` | Always. Select one or more of English, Roman Urdu, and Urdu. | Partial. English and Roman Urdu reply paths exist. Urdu-script input selects Roman Urdu replies. Agency-specific defaults need support. |
| Main areas and property types you serve | R | `customer.service_coverage` | Always | Partial. Catalog location and property-type filters exist. A draft description does not configure service boundaries. |
| Preferred introduction/greeting for the assistant | R | `customer.greeting` | Always. Enter wording or ask Manzil to propose it. | Partial. Built-in greeting templates exist. Custom greeting configuration needs support. |
| Should customers be told the assistant uses AI? | R | `customer.ai_disclosure_wording` | Always. Record agreement with clear wording or a request to discuss wording. | Partial. Handoff has an AI disclosure. Review agency wording and placement. |
| When should an enquiry be passed to a human broker? | R | `customer.handoff_triggers` | Always. Collect the intended triggers, including visit or human requests. | Partial. The runtime supports broker handoff and visit requests. Compare preferences with supported triggers in review. |
| Who confirms availability, prices, negotiations and visit timings? | R | `customer.human_confirmation_owners` | Always. Name the people who confirm these items. | Partial. The runtime hands off and can record a visit request. The assigned people confirm terms and appointments. |
| What should happen outside office hours? | R | `customer.after_hours_policy` | Always. Record desired reply and follow-up. | Partial. Replies can run after hours. Agency-specific schedules, messages and follow-up rules need support. |
| Topics, claims or information the assistant must avoid | R | `customer.restrictions` | Always. Record explicit restrictions or “None”. | Partial. Existing prompts and customer-safe listing fields constrain replies. Agency-specific free-text restrictions need scope review. |
| Should the initial launch handle all incoming enquiries or a limited pilot group? | R | `customer.launch_audience` | Always. Include “Discuss during setup”. | Manual. Manzil confirms the pilot audience and verification plan. The current sender map and agency activation check do not provide a portal-managed audience switch. |

## Pilot guide destinations

| Guide item | Portal destination and handling | Support today |
| --- | --- | --- |
| One coordinator, invitation and setup help | Entry screen shows **Start setup**, **Client sign in**, and **Get help**. After sign-in, use the same invited account to reopen the same draft. The help panel points to the Manzil setup contact named in the invite. | Manual. The coordinator and contact already exist in the guide. |
| Staff-roster CSV | Step 3 includes the supplied template and a structured inline roster. Attach a CSV privately in step 4 when the file flow ships. Either roster path can provide the staff details. | Manual Drive handoff today. |
| Excel or CSV inventory and template | Step 4 offers the inventory template and file list. Preview rows before approval. Keep the source reference, branch, area/phase/block/location, property type, sale/rent purpose, price/rent period, size/unit, applicable rooms/features, status, assigned broker, availability-confirmed date and sharing restrictions. Review mappings for branch labels, status, references, and other fields that differ from the active inventory model. | Partial. The inventory schema covers core fields and listing statuses. Pilot preparation and reconciliation are assisted. |
| Property photos grouped by reference | Step 4 assigns each file one source property reference. Show unmatched references before approval. Preserve restrictions through activation and keep restricted images private. | Partial. The pilot groups images manually. Existing listing media is separate from portal staging. |
| Logo, branding, and builder brochures | Step 4 offers optional branding and project brochure attachments. The reviewer checks how they may be used. | Manual. These are optional Drive materials today. |
| Setup call and technical ownership | After submission, show the verification call in setup status. Prepare the business phone/SIM and, if applicable, the Meta administrator. Manzil handles hosting and AWS. Keep passwords, verification codes, API keys, and identity documents out of answers and attachments. | Manual assisted call and provisioning. |
| Scope, permission and launch checks | Review shows agreed branches and features, sharing restrictions, material permission, customer visibility, and each open item. After configuration, record the customer and broker checks, agency sign-off, and Manzil’s launch decision. | Manual pilot process. The queue, recorded approval and go-live action are future chunks. |

Backend references at `5f220e0` are `migrations/001_schema_v1.sql`, `app/provision_agency.py`, `app/routing.py`, `app/orchestrator.py`, `app/handoff.py`, `app/turn_engine.py`, `app/render.py`, `docs/INVENTORY_SCHEMA.md`, and `docs/MEDIA.md` in `manzil-ai`.
