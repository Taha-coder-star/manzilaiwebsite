// Navbar content. Only items with `children` render a dropdown.
// Every href must match an id on the page (benefit anchors live in data/benefits.js).
export const navItems = [
  {
    id: "product",
    label: "Product",
    children: [
      { href: "#customers", title: "For customers", text: "Turn buyer messages into clear requirements" },
      { href: "#staff", title: "For staff", text: "Send listing updates on WhatsApp for agency review" },
      { href: "#brokers", title: "For brokers", text: "See the buyer's brief before replying" },
    ],
  },
  {
    id: "serve",
    label: "Who it's for",
    children: [
      { href: "#benefits", title: "Real-estate agencies", text: "One assistant on your own number" },
      { href: "#brokers", title: "Independent brokers", text: "Get the buyer’s requirements before you reply." },
    ],
  },
  // Plans hidden until the owner provides pricing; restore with href #plans.
  // About hidden until the owner provides company copy.
];
