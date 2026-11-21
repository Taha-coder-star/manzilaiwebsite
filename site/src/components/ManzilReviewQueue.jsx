import { useEffect, useRef, useState } from "react";
import mark from "../assets/manzil-mark-dark.svg";
import AssistedActivation from "./AssistedActivation";
import { AnswerList, REVIEW_STATUS, ReviewHistory } from "./OnboardingReviewParts";
import "../styles/Onboarding.css";

const ACCESS = "/client-setup/review";
const QUEUE = "/client-setup/api/review/queue";

async function request(path, options) {
  const response = await fetch(path, { credentials: "same-origin", cache: "no-store", ...options });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data) {
    const error = new Error(data?.detail || "The review queue could not be loaded. Try again.");
    error.status = response.status;
    throw error;
  }
  return data;
}

function QueueItems({ items, onOpen, busy }) {
  if (!items.length) return <p className="setup-description">No agencies have submitted their setup yet.</p>;
  return <ul className="setup-queue-list">
    {items.map((item) => (
      <li className="setup-queue-item" key={item.id}>
        <dl>
          <div><dt>Agency</dt><dd><button className="setup-link" type="button" disabled={busy}
            onClick={() => onOpen(item.id)}>{item.agency_name}</button></dd></div>
          <div><dt>Owner</dt><dd>{item.owner}</dd></div>
          <div><dt>Status</dt><dd>{REVIEW_STATUS[item.status]}</dd></div>
          <div><dt>Reviewer</dt><dd>{item.reviewer || "Unassigned"}</dd></div>
          <div><dt>Next action</dt><dd>{item.next_action}</dd></div>
        </dl>
      </li>
    ))}
  </ul>;
}

function DecisionForm({ detail, reviewer, busy, onDecide }) {
  const [action, setAction] = useState("note");
  const [note, setNote] = useState("");
  const [section, setSection] = useState("");
  const state = detail.review;
  const needsNote = action !== "approve";
  const submitted = state.status === "submitted";
  const active = submitted || state.status === "changes_requested";
  const own = state.reviewer === reviewer;
  const canDecide = own || !state.reviewer;
  if (!active) return null;

  return <section className="setup-submission" aria-labelledby="setup-review-decision">
    <h2 id="setup-review-decision">Review decision</h2>
    {!own && <button className="setup-secondary" disabled={busy} type="button"
      onClick={() => onDecide({ action: "claim" })}>Assign to me</button>}
    {canDecide && <form onSubmit={async (event) => {
      event.preventDefault();
      if (await onDecide({ action, note: note.trim() || null, section: action === "return" ? Number(section) : null })) {
        setAction("note");
        setNote("");
        setSection("");
      }
    }}>
      <fieldset className="setup-fields" disabled={busy}>
        <div className="setup-question">
          <label htmlFor="setup-action">Action</label>
          <select value={action} id="setup-action" onChange={(event) => setAction(event.target.value)}>
            <option value="note">Add a note</option>
            {submitted && <option value="return">Return a section</option>}
            {submitted && <option value="approve">Approve review</option>}
          </select>
        </div>
        {action === "return" && <div className="setup-question">
          <label htmlFor="setup-return-section">Section to reopen</label>
          <select id="setup-return-section" required value={section} onChange={(event) => setSection(event.target.value)}>
            <option value="">Choose one section</option>
            {detail.sections.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select>
        </div>}
        <div className="setup-question">
          <label htmlFor="setup-decision-note">Note for the coordinator{!needsNote && " (optional)"}</label>
          <textarea id="setup-decision-note" value={note} rows={3} maxLength={2000} required={needsNote}
                    onChange={(event) => setNote(event.target.value)} />
        </div>
        <button className="setup-primary" type="submit" disabled={needsNote && !note.trim()}>
          {{ note: "Save note", return: "Return section", approve: "Approve review" }[action]}
        </button>
      </fieldset>
    </form>}
  </section>;
}

function SubmissionDetail({ detail, reviewer, busy, onDecide, onRefresh }) {
  const review = detail.review;
  return <>
    <h1>{detail.agency_name}</h1>
    <p className="setup-description">Coordinator {detail.owner}</p>
    <p><strong>{REVIEW_STATUS[review.status]}</strong> · {review.next_action}</p>
    <p>Reviewer {review.reviewer || "Unassigned"}</p>
    <p>Latest submission <time dateTime={detail.submitted_at}>{new Date(detail.submitted_at).toLocaleString()}</time></p>
    {review.reopened_section && <p>Returned section {detail.sections.find((item) => item.id === review.reopened_section)?.title}</p>}
    <DecisionForm key={`${detail.id}-${review.status}`} detail={detail} reviewer={reviewer} busy={busy} onDecide={onDecide} />
    {detail.activation_available && <AssistedActivation key={detail.id}
      endpoint={`${QUEUE}/${detail.id}/activation`} onReviewChanged={() => onRefresh(detail.id)} />}
    <ReviewHistory history={review.history} sections={detail.sections} />
    <section className="setup-review-section">
      <h2>Submitted files</h2>
      {detail.files.length ? <ul className="setup-file-list">
        {detail.files.map((file) => <li key={file.id}><div>{detail.activation_available
          ? <a className="setup-link" target="_blank" rel="noopener"
              href={`${QUEUE}/${detail.id}/activation/files/${file.id}`}>{file.filename}</a>
          : <strong>{file.filename}</strong>}
          {file.property_reference && <span>Property {file.property_reference}</span>}</div></li>)}
      </ul> : <p>No verified files were included.</p>}
    </section>
    {detail.sections.map((section) => (
      <details className="setup-review-section setup-submitted-answers" key={section.id}>
        <summary>{section.title}</summary>
        <AnswerList section={section} answers={detail.questionnaire[section.id] ?? {}} email={detail.owner} />
      </details>
    ))}
  </>;
}

export default function ManzilReviewQueue() {
  const [queue, setQueue] = useState(null);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loadCount, setLoadCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const inFlight = useRef(false);

  useEffect(() => {
    document.title = "Manzil review queue | Manzil AI";
    const controller = new AbortController();
    request(QUEUE, { signal: controller.signal }).then(setQueue).catch((failure) => {
      if (!controller.signal.aborted) setError(failure);
    });
    return () => controller.abort();
  }, [loadCount]);

  async function run(path, apply, options) {
    if (inFlight.current) return false;
    inFlight.current = true;
    setBusy(true);
    setError(null);
    setMessage("");
    try {
      apply(await request(path, options));
      return true;
    } catch (failure) {
      setError(failure);
      return false;
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  function open(id) {
    return run(`${QUEUE}/${id}`, setDetail);
  }

  function decide(decision) {
    return run(`${QUEUE}/${detail.id}`, (latest) => {
      setDetail(latest);
      setMessage("Review saved.");
    }, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...decision, expected_revision: detail.revision }),
    });
  }

  function closeDetail() {
    setDetail(null);
    setMessage("");
    run(QUEUE, setQueue);
  }

  const needsSignIn = error?.status === 401;
  return <div className="setup-page">
    <header className="setup-header">
      <a className="setup-brand" href="/" aria-label="Manzil AI home">
        <img src={mark} alt="" width="22" height="27" /> Manzil AI
      </a>
      {queue && !needsSignIn && <form method="post" action={`${ACCESS}/sign-out`}>
        <button className="setup-link" type="submit">Sign out</button>
      </form>}
    </header>
    <main className="setup-card setup-content setup-queue" aria-busy={busy}>
      {detail && !needsSignIn
        ? <button className="setup-link setup-queue-back" disabled={busy} type="button" onClick={closeDetail}>Back to queue</button>
        : <h1>Manzil review queue</h1>}
      {!queue && !error && <p role="status">Opening the review queue…</p>}
      {needsSignIn && <p><a className="setup-primary" href={`${ACCESS}/sign-in`}>Manzil team sign in</a></p>}
      {error && !needsSignIn && <p role="alert" className="setup-notice">{error.message}
        {error.status !== 404 && <button className="setup-link" type="button" onClick={() => {
          if (detail) open(detail.id);
          else if (queue) run(QUEUE, setQueue);
          else { setError(null); setLoadCount((count) => count + 1); }
        }}>{detail ? "Reload submission" : "Reload queue"}</button>}
      </p>}
      <p className="setup-save-status" role="status">{message}</p>
      {queue && !needsSignIn && (detail
        ? <SubmissionDetail detail={detail} reviewer={queue.reviewer} onDecide={decide} busy={busy} onRefresh={open} />
        : <QueueItems items={queue.items} onOpen={open} busy={busy} />)}
    </main>
  </div>;
}
