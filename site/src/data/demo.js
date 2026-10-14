// All sample content for the hero illustration. Every name, number and listing here
// is fictional demo data; nothing is sent anywhere.
import listingImage from "../assets/listing-sample.svg";

export const agencyName = "Manzil Demo Realty";

/* ---------- Dashboard ---------- */

// Counts are fictional. Assigned (3) + unassigned (1) matches the four sample leads below.
export const sidebar = {
  inbox: [
    { id: "enquiries", label: "Customer enquiries", count: 4, active: true },
    { id: "listings", label: "New listings", count: 2 },
    { id: "followups", label: "Follow-ups", count: 1 },
  ],
  team: [
    { id: "assigned", label: "Assigned leads", count: 3 },
    { id: "unassigned", label: "Unassigned", count: 1 },
  ],
};

export const statusLabels = {
  new: "New enquiry",
  follow: "Follow-up",
  assigned: "Assigned",
  viewing: "Viewing requested",
};

export const leads = [
  { id: "ahmed", initials: "AK", name: "Ahmed Khan", requirement: "DHA Phase 6 · 2-bed apartment", status: "new" },
  { id: "sara", initials: "SA", name: "Sara Ali", requirement: "Clifton · Apartment for rent", status: "follow" },
  { id: "bilal", initials: "BH", name: "Bilal Hassan", requirement: "Gulshan · House for sale", status: "assigned" },
  { id: "ayesha", initials: "AN", name: "Ayesha Noor", requirement: "Bahria Town · Plot enquiry", status: "new" },
];

// The lead whose conversation is playing in the phone.
export const activeLeadId = "ahmed";

/* ---------- Lead summary ---------- */

export const summaryFields = [
  { key: "name", label: "Name", value: "Ahmed Khan" },
  { key: "need", label: "Looking for", value: "2-bed apartment" },
  { key: "area", label: "Area", value: "DHA Phase 6" },
  { key: "budget", label: "Budget", value: "Up to PKR 3 crore" },
  { key: "status", label: "Status" }, // value comes from summaryStatus, driven by the conversation
];

export const summaryStatus = {
  matching: "Matching properties",
  viewing: "Viewing requested", // the customer asked about Saturday; nothing is confirmed
};

export const summaryInitials = "AK";

/* ---------- WhatsApp conversation ---------- */

// Steps are applied in order. `holdMs` is the pause after a step before the next one.
//   type    "in" (customer) | "bot" (agency) | "typing" (agency typing indicator)
//   reveal  summary field keys that become visible once this step has happened
//   activate / viewing  flip the matching lead row and the summary status
export const conversation = [
  {
    id: "m1",
    type: "in",
    time: "10:42",
    text: "Assalam o Alaikum! DHA Phase 6 mein 2-bed apartment chahiye, budget 3 crore tak.",
    reveal: ["name", "need", "area", "budget"],
    activate: true,
    holdMs: 800,
  },
  { id: "t1", type: "typing", reveal: ["status"], holdMs: 850 },
  {
    id: "m2",
    type: "bot",
    time: "10:42",
    text: "Walaikum assalam! Aap ke budget mein yeh option hai.",
    listing: {
      image: listingImage,
      price: "PKR 2.85 crore",
      title: "2-bed apartment",
      area: "DHA Phase 6",
    },
    holdMs: 1100,
  },
  {
    id: "m3",
    type: "in",
    time: "10:43",
    text: "Saturday ko dekh sakte hain?",
    viewing: true,
    holdMs: 800,
  },
  { id: "t2", type: "typing", holdMs: 800 },
  {
    id: "m4",
    type: "bot",
    time: "10:43",
    text: "Saturday ko kis waqt aana pasand karenge?",
    holdMs: 0,
  },
];

// Delay before the first step: on page load vs. after pressing Replay.
export const startDelayMs = 550;
export const replayDelayMs = 250;
