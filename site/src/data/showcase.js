export const showcaseFeatures = [
  { id: "buyer-enquiries", label: "Buyer enquiries", available: true },
  { id: "property-matching", label: "Property matching", available: false },
  { id: "voice-notes", label: "Voice notes", available: false },
  { id: "listing-updates", label: "Listing updates", available: false },
  { id: "agent-handoff", label: "Agent handoff", available: false },
];

export const buyerEnquiry = {
  heading: "Start with what the buyer needs.",
  description: "Manzil asks for missing details and organizes the requirements.",
  buyer: "Ayesha",
  messages: [
    { id: "request", sender: "buyer", text: "DHA Phase 6 mein 3-bedroom apartment chahiye, rent ke liye.", at: 450 },
    { id: "question", sender: "manzil", text: "Aapka monthly budget kitna hai?", at: 2000 },
    { id: "budget", sender: "buyer", text: "1.5 lakh tak.", at: 3400 },
  ],
  requirements: [
    { label: "Area", value: "DHA Phase 6", at: 1200 },
    { label: "Property", value: "3-bedroom apartment", at: 1200 },
    { label: "Purpose", value: "Rent", at: 1200 },
    { label: "Budget", value: "Up to PKR 150,000/month", at: 4100 },
  ],
  duration: 4600,
};
