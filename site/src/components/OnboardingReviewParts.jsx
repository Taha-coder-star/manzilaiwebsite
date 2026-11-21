export const ROSTER_COLUMNS = [
  ["name", "Name"], ["phone", "WhatsApp number"], ["role", "Role"], ["coverage", "Branch or area"],
];

export const REVIEW_STATUS = {
  draft: "Draft",
  submitted: "With Manzil for review",
  changes_requested: "Changes requested",
  approved: "Review approved",
  live: "Live",
  paused: "Paused",
};

const EVENTS = {
  submitted: "Submitted for review",
  resubmitted: "Resubmitted for review",
  claimed: "Reviewer assigned",
  note: "Reviewer note",
  returned: "Changes requested",
  approved: "Review approved",
};

export function applies(field, answers) {
  const condition = field.when;
  if (!condition) return true;
  const value = answers[condition.field];
  return "is" in condition
    ? value === condition.is
    : Boolean(value?.trim()) && value.trim().toLowerCase() !== condition.is_not.toLowerCase();
}

function formatAnswer(value) {
  if (!Array.isArray(value)) return value;
  if (value.length && typeof value[0] === "object") {
    return value.map((person) => ROSTER_COLUMNS.map(([key]) => person[key]).join(" · ")).join("\n");
  }
  return value.join(", ");
}

export function AnswerList({ section, answers, email }) {
  return <dl>
    {section.fields.filter((field) => applies(field, answers)).map((field) => {
      const value = field.type === "verified_email" ? email : formatAnswer(answers[field.key]);
      if (!value && !field.required) return null;
      return <div key={field.key}><dt>{field.label}</dt><dd>{value || "Awaiting answer"}</dd></div>;
    })}
  </dl>;
}

export function ReviewHistory({ history, sections }) {
  if (!history.length) return null;
  return <details className="setup-review-history">
    <summary>Review history</summary>
    <ol>
      {history.map((event) => (
        <li key={event.source_revision}>
          <strong>{EVENTS[event.action]}{event.section && ` · ${sections.find((item) => item.id === event.section)?.title}`}</strong>
          <time dateTime={event.occurred_at}>{new Date(event.occurred_at).toLocaleString()}</time>
          {event.actor_email && <span>{event.actor_email}</span>}
          {event.note && <p>{event.note}</p>}
        </li>
      ))}
    </ol>
  </details>;
}
