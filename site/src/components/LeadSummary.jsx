import { useEffect, useRef, useState } from "react";
import { summaryFields, summaryStatus, summaryInitials } from "../data/demo";
import "../styles/LeadSummary.css";

const CATCH_UP_STAGGER_MS = 160;
const STATUS_SWAP_MS = 600; // pause on "Matching properties" before the viewing request lands

/**
 * Lead summary card. Each field fades in only after the matching information has
 * appeared in the conversation (`revealed` maps field key -> transition delay).
 * "Viewing requested" is shown when the customer asks about Saturday; nothing here
 * claims a booking is confirmed.
 *
 * In the stacked mobile layout the card starts below the fold, so it stays empty until
 * it is mostly visible, then plays in whatever the chat has already covered.
 */
export default function LeadSummary({ revealed, viewing, reducedMotion }) {
  const ref = useRef(null);
  const live = useRef({ revealed, viewing });
  live.current = { revealed, viewing };
  const [seen, setSeen] = useState(reducedMotion);
  const [catchUp, setCatchUp] = useState(null); // field key -> delay, when the card was seen late
  const [holdStatus, setHoldStatus] = useState(false);

  useEffect(() => {
    if (reducedMotion) return setSeen(true);
    if (seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const keys = summaryFields.map((f) => f.key).filter((k) => k in live.current.revealed);
        if (keys.length) {
          setCatchUp(Object.fromEntries(keys.map((k, n) => [k, n * CATCH_UP_STAGGER_MS])));
          if (live.current.viewing) setHoldStatus(true);
        }
        setSeen(true);
      },
      { threshold: 0.6 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [reducedMotion, seen]);

  useEffect(() => {
    if (!holdStatus) return;
    const t = setTimeout(() => setHoldStatus(false), Object.keys(catchUp).length * CATCH_UP_STAGGER_MS + STATUS_SWAP_MS);
    return () => clearTimeout(t);
  }, [holdStatus, catchUp]);

  // a replay empties the summary; from then on fields follow the chat's own timing
  const replayed = catchUp && Object.keys(revealed).length === 0;
  useEffect(() => {
    if (replayed) setCatchUp(null);
  }, [replayed]);

  const showViewing = viewing && !holdStatus;

  return (
    <div className="summary" ref={ref}>
      <p className="summary__title">
        <span className="summary__av">{summaryInitials}</span>
        Lead summary
      </p>
      <ul className="summary__list">
        {summaryFields.map((field) => {
          const visible = seen && field.key in revealed;
          const delay = catchUp?.[field.key] ?? revealed[field.key];
          return (
            <li
              key={field.key}
              className={visible ? "is-in" : undefined}
              style={visible ? { transitionDelay: `${delay}ms` } : undefined}
            >
              <small>{field.label}</small>
              <b>
                {field.key === "status" ? (
                  // keyed on the status so the pill re-animates when it changes
                  <span
                    key={showViewing ? "viewing" : "matching"}
                    className={`pill${showViewing ? " is-viewing is-swap" : ""}`}
                  >
                    {showViewing ? summaryStatus.viewing : summaryStatus.matching}
                  </span>
                ) : (
                  field.value
                )}
              </b>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
