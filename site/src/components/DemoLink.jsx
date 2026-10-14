import { DEMO_URL } from "../config";
import { Arrow } from "./Icons";

// "Book a demo" action. Goes to VITE_DEMO_URL when one is configured; otherwise it is an
// inert placeholder (no destination has been decided yet) and does not navigate.
export default function DemoLink({ className = "", children = "Book a demo" }) {
  const external = Boolean(DEMO_URL);
  return (
    <a
      className={`btn btn--dark ${className}`.trim()}
      href={external ? DEMO_URL : "#demo"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      onClick={external ? undefined : (e) => e.preventDefault()}
    >
      {children} <Arrow />
    </a>
  );
}
