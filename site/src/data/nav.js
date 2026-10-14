// Navbar content. Only items with `children` render a dropdown.
export const navItems = [
  {
    id: "product",
    label: "Product",
    children: [
      { href: "#customers", title: "For customers", text: "Find properties by chat or voice note" },
      { href: "#staff", title: "For staff", text: "Add and update listings from WhatsApp" },
      { href: "#brokers", title: "For brokers", text: "Receive qualified leads with context" },
    ],
  },
  {
    id: "serve",
    label: "Who it's for",
    children: [
      { href: "#agencies", title: "Real-estate agencies", text: "One assistant on your own number" },
      { href: "#brokers", title: "Independent brokers", text: "Never miss an enquiry again" },
    ],
  },
  { id: "plans", label: "Plans", href: "#plans" },
  { id: "about", label: "About", href: "#about" },
];

export const loginLink = { label: "Log in", href: "#login" };
