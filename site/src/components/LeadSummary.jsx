import { summaryFields, summaryStatus, summaryInitials } from "../data/demo";
import "../styles/LeadSummary.css";

/**
 * Lead summary card. Each field fades in only after the matching information has
 * appeared in the conversation (`revealed` maps field key -> transition delay).
 * "Viewing requested" is shown when the customer asks about Saturday; nothing here
 * claims a booking is confirmed.
 */
export default function LeadSummary({ revealed, viewing }) {
  return (
    <div className="summary">
      <p className="summary__title">
        <span className="summary__av">{summaryInitials}</span>
        Lead summary
      </p>
      <ul className="summary__list">
        {summaryFields.map((field) => {
          const visible = field.key in revealed;
          return (
            <li
              key={field.key}
              className={visible ? "is-in" : undefined}
              style={visible ? { transitionDelay: `${revealed[field.key]}ms` } : undefined}
            >
              <small>{field.label}</small>
              <b>
                {field.key === "status" ? (
                  // keyed on the status so the pill re-animates when it changes
                  <span
                    key={viewing ? "viewing" : "matching"}
                    className={`pill${viewing ? " is-viewing is-swap" : ""}`}
                  >
                    {viewing ? summaryStatus.viewing : summaryStatus.matching}
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
