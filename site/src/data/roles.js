// Marketing overview of role capabilities documented in PRODUCT.md, nav.js,
// and the existing hero demo. This is not an access-control specification.
export const roles = [
  {
    id: "customers",
    label: "Customer",
    channel: "WhatsApp conversation",
    title: "Find a property by talking it through.",
    description: "A buyer can describe their requirements in Roman Urdu and continue the conversation as they explore a relevant listing.",
    actions: [
      "Start a property enquiry by chat or voice note.",
      "Share an area, budget, purpose and property details.",
      "Explore a relevant property shared in the conversation.",
      "Ask a follow-up question or request a viewing time.",
    ],
    outcome: "The buyer’s requirements are captured for the agency.",
  },
  {
    id: "brokers",
    label: "Broker",
    channel: "Lead dashboard",
    title: "Take over with the conversation in hand.",
    description: "A broker can pick up an enquiry with the buyer’s requirements and recent conversation already organized.",
    actions: [
      "Review assigned and unassigned leads in the dashboard.",
      "See the buyer’s structured requirements and conversation context.",
      "Step into the conversation when a human response is needed.",
    ],
    outcome: "The broker starts with context instead of asking the buyer to repeat it.",
  },
  {
    id: "staff",
    label: "Staff",
    channel: "WhatsApp listing updates",
    title: "Keep the agency’s listings current.",
    description: "Staff can supply property information from WhatsApp, so the agency’s listing details can be added or updated.",
    actions: [
      "Send new property details through WhatsApp.",
      "Provide updates to an existing listing.",
    ],
    outcome: "Current property details are available for the agency’s matching flow.",
  },
];
