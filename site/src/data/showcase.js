export const showcaseRoles = [
  { id: "customers", label: "Customer", context: "WhatsApp enquiry", features: ["Buyer enquiries", "Property matching", "Voice notes"], heading: "Find the right home through a conversation.", description: "A buyer shares what they need by message or voice note. Manzil organizes the brief and surfaces relevant options." },
  { id: "brokers", label: "Broker", context: "Lead dashboard", features: ["Agent handoff"], heading: "Take over with the full picture.", description: "The broker can review the buyer’s requirements, matched options and latest question before stepping into the conversation." },
  { id: "staff", label: "Staff", context: "Listing updates", features: ["Listing updates"], heading: "Turn a WhatsApp update into listing details.", description: "Staff can send property information in a message. The agency gets a structured draft to review before using it." },
];

export const matchedProperties = [
  { id: "A", name: "Apartment · DHA Phase 6", detail: "3 bedrooms · 1,850 sq ft", rent: "PKR 145,000 / month" },
  { id: "B", name: "Apartment · DHA Phase 6", detail: "3 bedrooms · 1,720 sq ft", rent: "PKR 150,000 / month" },
];

export const voiceExample = {
  transcript: "DHA Phase 6 mein 3-bedroom apartment chahiye. Budget 1.5 lakh tak hai.",
  detail: "Area, property type and budget added to the buyer brief",
};

export const staffUpdate = {
  sender: "Sana · Agency staff",
  message: "Clifton wala 2-bed apartment rent pe available hai. 1,20,000 monthly, 1,450 sq ft.",
  fields: [
    ["Area", "Clifton"],
    ["Property", "2-bedroom apartment"],
    ["Purpose", "Rent"],
    ["Monthly rent", "PKR 120,000/month"],
    ["Size", "1,450 sq ft"],
  ],
};

export const buyerEnquiry = {
  heading: "Start with what the buyer needs.",
  description: "Manzil asks for missing details and organizes the requirements.",
  buyer: "Hina",
  messages: [
    { id: "request", sender: "buyer", text: "DHA Phase 6 mein 3-bedroom apartment chahiye, rent ke liye.", at: 450 },
    { id: "question", sender: "manzil", text: "Aapka monthly budget kitna hai?", at: 2000 },
    { id: "budget", sender: "buyer", text: "1.5 lakh tak.", at: 3400 },
    { id: "viewing", sender: "buyer", text: "Kya Saturday ko viewing arrange ho sakti hai?", at: 5050 },
  ],
  requirements: [
    { label: "Area", value: "DHA Phase 6", at: 1200 },
    { label: "Property", value: "3-bedroom apartment", at: 1200 },
    { label: "Purpose", value: "Rent", at: 1200 },
    { label: "Budget", value: "Up to PKR 150,000/month", at: 4100 },
  ],
  duration: 5600,
};
