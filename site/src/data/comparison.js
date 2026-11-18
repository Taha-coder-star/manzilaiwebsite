// Comparison table content. The owner confirmed every Manzil row as a shipped feature on 2026-11-18;
// keep it that way. The other columns describe typical setups, not named competitors.
// Values: true = yes, false = no, or a short string.

export const comparisonColumns = [
  { id: "manual", label: "Replying by hand", short: "By hand" },
  { id: "chatbot", label: "Generic chatbots", short: "Chatbots" },
];

export const comparisonRows = [
  { feature: "Replies outside office hours", manual: false, chatbot: true, manzil: true },
  { feature: "Understands Roman Urdu", manual: true, chatbot: "Partial", manzil: true },
  { feature: "Understands voice notes", manual: true, chatbot: false, manzil: true },
  { feature: "Knows Karachi area names and spellings", manual: true, chatbot: false, manzil: true },
  { feature: "Matches buyers to your own listings", manual: "Manual", chatbot: "Setup required", manzil: true },
  { feature: "Sends listing photos in the chat", manual: "Manual", chatbot: "Setup required", manzil: true },
  { feature: "Hands the buyer to a broker with a summary", manual: false, chatbot: "Partial", manzil: true },
  { feature: "Drafts listings from staff updates", manual: false, chatbot: false, manzil: true },
];
