import { useEffect, useRef, useState } from "react";
import { DEMO_URL } from "../config";
import { Arrow } from "./Icons";
import "../styles/DemoLink.css";

const NOTICE_MS = 3200;

// "Book a demo" action. Goes to VITE_DEMO_URL when one is configured; until then it is a
// button that briefly shows "Booking opens soon" instead of silently doing nothing.
export default function DemoLink({ className = "", children = "Book a demo" }) {
  const [notice, setNotice] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const classes = `btn btn--dark ${className}`.trim();
  if (DEMO_URL) {
    return (
      <a className={classes} href={DEMO_URL} target="_blank" rel="noopener">
        {children} <Arrow />
      </a>
    );
  }

  const hide = () => { clearTimeout(timer.current); setNotice(false); };
  const show = () => {
    clearTimeout(timer.current);
    setNotice(true);
    timer.current = setTimeout(() => setNotice(false), NOTICE_MS);
  };

  return (
    <span className="demo-cta">
      <button type="button" className={classes} onClick={show} onKeyDown={(e) => e.key === "Escape" && hide()}>
        {children} <Arrow />
      </button>
      {/* Live region stays mounted so screen readers announce the text when it appears. */}
      <span className={`demo-cta__notice${notice ? " is-shown" : ""}`} role="status">
        {notice ? "Booking opens soon" : ""}
      </span>
    </span>
  );
}
