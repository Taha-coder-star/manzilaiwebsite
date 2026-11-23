// Placeholder content: the owner will send real names, roles, photos and partner logos.
// Never fill these with invented people or real company names.
import team1 from "../assets/team-1.jpg";
import team2 from "../assets/team-2.jpg";

export const team = [
  { name: "Taha Ahmed", role: "Co-founder & CTO", bio: "Technical lead, building the product that makes Manzil AI what it is.", photo: team1 },
  { name: "Furqan Halari", role: "Founder & CEO", bio: "Leads the company, shaping the vision that makes Manzil AI what it is.", photo: team2 },
  { name: "Team member name", role: "Role / title", bio: "One line about what this person does at Manzil AI." },
];

// Swap `name` for the partner's name and add `logo` (an imported image) when available.
export const partners = Array.from({ length: 6 }, () => ({ name: "Partner logo" }));
