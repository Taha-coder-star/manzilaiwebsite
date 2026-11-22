import { useEffect, useRef, useState } from "react";
import mark from "../assets/manzil-mark-dark.svg";
import OnboardingFiles from "./OnboardingFiles";
import { AnswerList, applies, REVIEW_STATUS, ReviewHistory, ROSTER_COLUMNS } from "./OnboardingReviewParts";
import "../styles/Onboarding.css";

const SETUP = "/client-setup";
const DRAFT = `${SETUP}/api/questionnaire`;
const SIGN_IN = `${SETUP}/sign-in`;
const REVIEW = "review";
const EMPTY_PERSON = { name: "", phone: "", role: "", coverage: "" };

function canEdit(draft, section) {
  return !draft.review || draft.review.status === "draft" || draft.review.reopened_section === section;
}

function sectionAnswers(draft, step) {
  const saved = draft.questionnaire[step];
  return saved ?? (step === 1 ? { "agency.name": draft.agency_name } : {});
}

async function request(url, options) {
  const response = await fetch(url, { credentials: "same-origin", cache: "no-store", ...options });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.sections) {
    const error = new Error(typeof data?.detail === "string" ? data.detail : "The setup service is unavailable.");
    error.status = response.status;
    error.fields = data?.detail?.fields;
    throw error;
  }
  return data;
}

function Header({ signedIn }) {
  return (
    <header className="setup-header">
      <a className="setup-brand" href="/" aria-label="Manzil AI home">
        <img src={mark} alt="" width="22" height="27" /> Manzil AI
      </a>
      <div className="setup-header-actions">
        <details className="setup-help">
          <summary>Get help</summary>
          <p>Reply to your Manzil invitation email for help with your setup.</p>
        </details>
        {signedIn && (
          <form method="post" action={`${SETUP}/sign-out`}>
            <button className="setup-link" type="submit">Sign out</button>
          </form>
        )}
      </div>
    </header>
  );
}

function Checklist({ draft, current, onChoose, busy }) {
  return (
    <nav aria-label="Setup checklist">
      <ol className="setup-checklist">
        {draft.sections.map((section) => {
          const complete = draft.completed_steps.includes(section.id);
          return (
            <li key={section.id}>
              <button type="button" aria-current={current === section.id ? "step" : undefined}
                      disabled={busy} onClick={() => onChoose(section.id)}>
                <span className="setup-step-number" aria-hidden="true">{complete ? "✓" : section.id}</span>
                <span>{section.title}<small>{current === section.id ? "Current section" : complete ? "Complete" : "To do"}</small></span>
              </button>
            </li>
          );
        })}
      </ol>
      <button className="setup-link setup-review-link" type="button" disabled={busy}
              aria-current={current === REVIEW ? "step" : undefined} onClick={() => onChoose(REVIEW)}>
        Review answers
      </button>
    </nav>
  );
}

function Roster({ id, value = [], onChange }) {
  return (
    <div className="setup-roster">
      {value.map((person, index) => (
        <fieldset key={index} className="setup-person">
          <legend>Person {index + 1}</legend>
          <div className="setup-person-grid">
            {ROSTER_COLUMNS.map(([key, label]) => {
              const inputId = `${id}-${index}-${key}`;
              const update = (event) => onChange(value.map((earlier, row) => row === index
                ? { ...earlier, [key]: event.target.value } : earlier));
              return (
                <label key={key} htmlFor={inputId}>
                  {label}
                  {key === "role" ? (
                    <select id={inputId} value={person[key]} onChange={update}>
                      <option value="">Choose a role</option><option>Staff</option><option>Broker</option>
                    </select>
                  ) : <input id={inputId} value={person[key]} maxLength={250}
                             type={key === "phone" ? "tel" : "text"} onChange={update} />}
                </label>
              );
            })}
          </div>
          <button className="setup-link" type="button" onClick={() => onChange(value.filter((_, row) => row !== index))}>
            Remove person {index + 1}
          </button>
        </fieldset>
      ))}
      <button className="setup-secondary" type="button" disabled={value.length >= 50}
              onClick={() => onChange([...value, EMPTY_PERSON])}>Add person</button>
    </div>
  );
}

function Question({ field, value, email, error, onChange }) {
  const { key, label, type, help, options, required } = field;
  const id = `setup-${key.replaceAll(".", "-")}`;
  const description = [help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const caption = <>{label}{!required && <span className="setup-optional">Optional</span>}</>;
  const helpText = help && <p className="setup-hint" id={`${id}-help`}>{help}</p>;
  const errorText = error && <p className="setup-field-error" id={`${id}-error`}>{error}</p>;
  if (type === "checkboxes" || type === "roster") {
    return (
      <fieldset className="setup-question setup-group" aria-describedby={description}>
        <legend>{caption}</legend>
        {helpText}
        {type === "roster" ? <Roster id={id} value={value} onChange={onChange} /> : (
          <div className="setup-options">
            {options.map((option) => {
              const selected = value ?? [];
              return (
                <label key={option}>
                  <input type="checkbox" checked={selected.includes(option)} onChange={(event) => onChange(
                    event.target.checked ? [...selected, option] : selected.filter((item) => item !== option),
                  )} /> {option}
                </label>
              );
            })}
          </div>
        )}
        {errorText}
      </fieldset>
    );
  }

  const input = { id, value: value ?? "", "aria-describedby": description,
    "aria-invalid": Boolean(error), required, onChange: (event) => onChange(event.target.value) };
  return (
    <div className="setup-question">
      <label htmlFor={id}>{caption}</label>
      {helpText}
      {type === "textarea" && <textarea {...input} rows="3" maxLength={3000} />}
      {type === "select" && (
        <select {...input}><option value="">Choose an option</option>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      )}
      {type === "verified_email" && <input id={id} type="email" readOnly value={email} aria-describedby={description} />}
      {["text", "phone", "whatsapp_number"].includes(type) && (
        <input {...input} type={type === "phone" ? "tel" : "text"} maxLength={250} />
      )}
      {errorText}
    </div>
  );
}

function Review({ draft, edits, onChoose }) {
  const complete = draft.completed_steps.length === draft.sections.length;
  return (
    <>
      <p className="setup-description">{complete ? "All five sections are complete. Check your saved answers below."
        : "Complete the remaining sections to finish your questionnaire."}</p>
      {draft.sections.map((section) => {
        const answers = sectionAnswers(draft, section.id);
        const saved = draft.completed_steps.includes(section.id);
        return (
          <section className="setup-review-section" key={section.id} aria-labelledby={`review-${section.id}`}>
            <header>
              <div><h2 id={`review-${section.id}`}>{section.title}</h2>
                <p>{edits[section.id] ? "Unsaved edits" : saved ? "Complete" : "Needs answers"}</p></div>
              {canEdit(draft, section.id) && <button className="setup-secondary" type="button" onClick={() => onChoose(section.id)}
                      aria-label={`Edit ${section.title}`}>Edit</button>}
            </header>
            <AnswerList section={section} answers={answers} email={draft.verified_email} />
          </section>
        );
      })}
    </>
  );
}

function Submission({ draft, busy, dirty, uploading, error, onSubmit, onRefresh, onChoose }) {
  const review = draft.review;
  const returned = draft.sections.find((section) => section.id === review.reopened_section);
  const returnNote = review.history.find((event) => event.action === "returned");
  const complete = draft.completed_steps.length === draft.sections.length;
  const canSubmit = review.enabled && ["draft", "changes_requested"].includes(review.status);
  return <section className="setup-submission" aria-labelledby="setup-review-status">
    <h2 id="setup-review-status">{REVIEW_STATUS[review.status]}</h2>
    <p>{review.next_action}</p>
    {returned && <div className="setup-return-note">
      <strong>{returned.title}</strong>
      <p>{returnNote?.note}</p>
      <button className="setup-link" type="button" onClick={() => onChoose(returned.id)}>Open returned section</button>
    </div>}
    {canSubmit && <>
      <p className="setup-hint">{uploading ? "Wait for the upload to finish." : dirty ? "Save your edits before submitting."
        : complete ? "Verified files are included with your answers." : "Complete all five sections to submit."}</p>
      <button className="setup-primary" type="button" disabled={busy || dirty || uploading || !complete} onClick={onSubmit}>
        {review.status === "changes_requested" ? "Resubmit for review" : "Submit for review"}
      </button>
    </>}
    {error && <p className="setup-field-error" role="alert">{error.status === 401
      ? <>Sign in again, then return here. <a className="setup-link" href={SIGN_IN} target="_blank" rel="noopener">Sign in in a new tab</a></>
      : error.message}</p>}
    {review.status !== "draft" || error?.status === 409
      ? <button className="setup-link setup-refresh" type="button" disabled={busy} onClick={onRefresh}>Refresh status</button>
      : null}
    <ReviewHistory history={review.history} sections={draft.sections} />
  </section>;
}

export default function Onboarding() {
  const [draft, setDraft] = useState(null);
  const [loadState, setLoadState] = useState("loading");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [active, setActive] = useState(1);
  const [edits, setEdits] = useState({});
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const heading = useRef(null);
  const errorNotice = useRef(null);
  const mobileSteps = useRef(null);
  const saving = useRef(false);
  const dirty = Object.keys(edits).length > 0;

  useEffect(() => {
    document.title = "Client setup | Manzil AI";
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    request(DRAFT, { signal: controller.signal }).then((data) => {
      setDraft(data);
      setActive(data.review?.reopened_section ??
        (data.completed_steps.length === data.sections.length ? REVIEW : data.current_step));
      setLoadState("ready");
    }).catch((error) => {
      if (!controller.signal.aborted) setLoadState(error.status === 401 ? "signin" : "error");
    });
    return () => controller.abort();
  }, [loadAttempt]);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    if (loadState === "ready") {
      window.scrollTo({ top: 0, behavior: "instant" });
      heading.current?.focus({ preventScroll: true });
    }
  }, [active, loadState]);

  const failureStatus = failure?.status;
  const reloadFailed = failure?.reloadFailed;
  const hasFailure = Boolean(failure);
  useEffect(() => {
    if (hasFailure) errorNotice.current?.focus();
  }, [hasFailure, failureStatus, reloadFailed]);

  function choose(step) {
    if (saving.current) return;
    setActive(step);
    setSuccess("");
    setFailure(null);
    if (mobileSteps.current) mobileSteps.current.open = false;
  }

  function changeAnswer(key, value) {
    setEdits((previous) => ({ ...previous,
      [active]: { ...(previous[active] ?? sectionAnswers(draft, active)), [key]: value },
    }));
    setFailure((previous) => {
      if (!previous?.fields?.[key]) return previous;
      const fields = { ...previous.fields };
      delete fields[key];
      return Object.keys(fields).length ? { ...previous, fields } : null;
    });
  }

  async function save(advance) {
    if (saving.current || !canEdit(draft, active)) return;
    const step = active;
    const answers = edits[step] ?? sectionAnswers(draft, step);
    saving.current = true;
    setBusy(true);
    setSuccess("");
    setFailure(null);
    try {
      const saved = await request(`${SETUP}/api/drafts/${draft.id}/questionnaire/${step}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, advance, expected_revision: draft.revision }),
      });
      setDraft(saved);
      setEdits((previous) => {
        const remaining = { ...previous };
        delete remaining[step];
        return remaining;
      });
      setSuccess(`${draft.sections[step - 1].title} saved.`);
      if (advance) setActive(saved.review?.reopened_section || step === draft.sections.length ? REVIEW : step + 1);
    } catch (error) {
      setFailure({ status: error.status, fields: error.fields, advance });
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }

  async function reloadDraft() {
    if (saving.current) return;
    saving.current = true;
    setBusy(true);
    try {
      const latest = await request(DRAFT);
      setDraft(latest);
      setFailure(null);
      if (canEdit(latest, active)) {
        setSuccess("Latest revision loaded. Check your answers before saving again.");
      } else {
        setEdits((previous) => Object.fromEntries(Object.entries(previous)
          .filter(([step]) => canEdit(latest, Number(step)))));
        setActive(latest.review?.reopened_section ?? REVIEW);
        setSuccess("The latest review status is ready.");
      }
    } catch (error) {
      setFailure((previous) => ({ ...previous, status: error.status === 401 ? 401 : 409, reloadFailed: true }));
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }

  async function submit() {
    if (saving.current || dirty || uploading) return;
    saving.current = true;
    setBusy(true);
    setSubmitError(null);
    setSuccess("");
    try {
      const updated = await request(`${SETUP}/api/drafts/${draft.id}/submit`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expected_revision: draft.revision }),
      });
      setDraft(updated);
      setSuccess("Submission received.");
    } catch (error) {
      setSubmitError(error);
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }

  async function refreshStatus() {
    if (saving.current) return;
    saving.current = true;
    setBusy(true);
    setSubmitError(null);
    setSuccess("");
    try {
      const latest = await request(DRAFT);
      setDraft(latest);
      setEdits((previous) => Object.fromEntries(Object.entries(previous)
        .filter(([step]) => canEdit(latest, Number(step)))));
      setSuccess("Status refreshed.");
    } catch (error) {
      setSubmitError(error);
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }

  if (loadState !== "ready") {
    return (
      <div className="setup-page"><Header />
        <main className="setup-card setup-entry" aria-busy={loadState === "loading"}>
          <h1>Client setup</h1>
          {loadState === "loading" && <p role="status">Opening your draft…</p>}
          {loadState === "signin" && <>
            <p>Use the email address on your Manzil invitation to resume your setup.</p>
            <a className="setup-primary" href={SIGN_IN}>Client sign in</a>
            <p>First visit? Open the link in your invitation email to start.</p>
          </>}
          {loadState === "error" && <>
            <p role="alert">Your draft could not be opened. Try again in a moment.</p>
            <button className="setup-primary" type="button" onClick={() => {
              setLoadState("loading"); setLoadAttempt((previous) => previous + 1);
            }}>Try again</button>
          </>}
        </main>
      </div>
    );
  }

  const section = draft.sections.find((item) => item.id === active);
  const values = section ? edits[active] ?? sectionAnswers(draft, active) : {};
  const progress = `${draft.completed_steps.length} of ${draft.sections.length} complete`;
  const showRetry = failure && ![401, 409, 422].includes(failure.status);
  return (
    <div className="setup-page">
      <a className="skip" href="#setup-main">Skip to questions</a>
      <Header signedIn />
      <div className="setup-layout">
        <aside className="setup-sidebar setup-card">
          <h2>Client setup</h2>
          <p className="setup-agency">{draft.agency_name}</p>
          <p className="setup-progress" aria-live="polite">{progress}</p>
          <progress max={draft.sections.length} value={draft.completed_steps.length} aria-label={progress} />
          <Checklist draft={draft} current={active} onChoose={choose} busy={busy} />
        </aside>
        <details className="setup-mobile-steps setup-card" ref={mobileSteps}>
          <summary>
            <span><strong>{section ? `Step ${active} of ${draft.sections.length}` : "Review"}</strong>
              <small aria-live="polite">{progress}</small></span>
            <span>View all steps</span>
          </summary>
          <Checklist draft={draft} current={active} onChoose={choose} busy={busy} />
        </details>
        <main className="setup-card setup-content" id="setup-main">
          <h1 ref={heading} tabIndex={-1}>{section?.title ?? "Review your setup"}</h1>
          <p className="setup-save-status" role="status">{success}</p>
          {failure && <div className="setup-notice" role="alert" ref={errorNotice} tabIndex={-1}>
            {failure.status === 409 ? <>
              <p>{failure.reloadFailed ? "The latest draft could not be loaded. Your answers are still here."
                : "This draft changed on another device. Load the latest revision before saving again."}</p>
              <button className="setup-secondary" type="button" disabled={busy} onClick={reloadDraft}>Load latest revision</button>
            </> : failure.status === 401 ? <>
              <p>Your session expired. Sign in again, then return to this tab to save your answers.</p>
              <a className="setup-link" href={SIGN_IN} target="_blank" rel="noopener">Sign in in a new tab</a>
            </> : <p>{failure.status === 422
              ? failure.fields?._section ?? "Check the marked answers. Your entries are still here."
              : "Your answers are still here. Try saving again."}</p>}
            {showRetry && <button className="setup-secondary" type="button" disabled={busy}
                                  onClick={() => save(failure.advance)}>Retry save</button>}
          </div>}
          {active === REVIEW && draft.review && <Submission draft={draft} busy={busy} dirty={dirty} uploading={uploading} error={submitError}
            onSubmit={submit} onRefresh={refreshStatus} onChoose={choose} />}
          {section && draft.review?.reopened_section === active && <p className="setup-return-note">
            {draft.review.history.find((event) => event.action === "returned")?.note}
          </p>}
          <OnboardingFiles draftId={draft.id} visible={active === 4 || active === REVIEW}
                           editable={active === 4 && canEdit(draft, 4)} onBusy={setUploading} />
          {section ? <>
            <p className="setup-description">{section.description}</p>
            {active === 2 && <p className="setup-hint">Enter verification codes yourself during your setup call.</p>}
            {canEdit(draft, active) ? <form noValidate onSubmit={(event) => { event.preventDefault(); save(true); }}>
              <fieldset className="setup-fields" disabled={busy}>
                {section.fields.filter((field) => applies(field, values)).map((field) => (
                  <Question key={field.key} field={field} value={values[field.key]} email={draft.verified_email}
                            error={failure?.fields?.[field.key]}
                            onChange={(value) => changeAnswer(field.key, value)} />
                ))}
                <div className="setup-actions">
                  {active > 1 && <button className="setup-link setup-back" type="button" onClick={() => choose(active - 1)}>Back</button>}
                  <button className="setup-secondary" type="button" onClick={() => save(false)}>Save draft</button>
                  <button className="setup-primary" type="submit">{busy ? "Saving…"
                    : draft.review?.reopened_section ? "Save and review" : "Save and continue"}</button>
                </div>
              </fieldset>
            </form> : <section className="setup-review-section">
              <p className="setup-hint">This section is locked for review.</p>
              <AnswerList section={section} answers={values} email={draft.verified_email} />
              <button className="setup-link" type="button" onClick={() => choose(REVIEW)}>View review status</button>
            </section>}
          </> : <Review draft={draft} edits={edits} onChoose={choose} />}
        </main>
      </div>
    </div>
  );
}
