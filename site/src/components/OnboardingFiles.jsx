import { useEffect, useRef, useState } from "react";

const CATEGORIES = {
  inventory: { label: "Property inventory", accept: ".xlsx,.csv", hint: "Excel (.xlsx) or CSV, up to 10 MB." },
  photo: { label: "Property photo", accept: ".jpg,.jpeg,.png,.webp", hint: "JPG, PNG, or WebP, up to 10 MB." },
  branding: { label: "Logo or branding", accept: ".jpg,.jpeg,.png,.webp", hint: "JPG, PNG, or WebP, up to 5 MB." },
  brochure: { label: "Project brochure", accept: ".pdf", hint: "PDF, up to 15 MB." },
};
const STATUSES = { pending: "Awaiting verification", staged: "Staged for review", rejected: "Needs replacement" };

async function api(url, options) {
  const response = await fetch(url, { credentials: "same-origin", cache: "no-store", ...options });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) {
    const error = new Error(typeof result?.detail === "string" ? result.detail : "Uploads are temporarily unavailable. Try again.");
    error.status = response.status;
    throw error;
  }
  return result;
}

async function fileDigest(file) {
  const digest = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export default function OnboardingFiles({ draftId, visible, editable, onBusy }) {
  const endpoint = `/client-setup/api/drafts/${draftId}/uploads`;
  const [snapshot, setSnapshot] = useState(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [loadError, setLoadError] = useState("");
  const [kind, setKind] = useState("inventory");
  const [reference, setReference] = useState("");
  const [selection, setSelection] = useState(null);
  const [stage, setStage] = useState("");
  const [notice, setNotice] = useState("");
  const [failure, setFailure] = useState(null);
  const fileInput = useRef(null);
  const running = useRef(false);

  useEffect(() => {
    if (!visible || running.current) return undefined;
    const controller = new AbortController();
    api(endpoint, { signal: controller.signal }).then((data) => {
      if (!running.current) setSnapshot(data);
      setLoadError("");
    }).catch((error) => {
      if (!controller.signal.aborted) setLoadError(error.message);
    });
    return () => controller.abort();
  }, [endpoint, loadAttempt, visible]);

  function updateFile(file) {
    setSnapshot((previous) => {
      if (!previous) return previous;
      const matching = previous.files.some((item) => item.id === file.id);
      const files = matching ? previous.files.map((item) => item.id === file.id ? file : item)
        : [file, ...previous.files];
      return { ...previous, files };
    });
  }

  async function run(operation) {
    if (running.current) return;
    running.current = true;
    onBusy(true);
    setFailure(null);
    setNotice("");
    let retry = operation;
    try {
      let item = operation.item;
      if (operation.type === "upload") {
        const { file, id, category, propertyReference } = operation;
        const format = CATEGORIES[category];
        if (!format.accept.split(",").some((extension) => file.name.toLowerCase().endsWith(extension))) {
          retry = null;
          throw new Error(`Choose a supported file. ${format.hint}`);
        }
        const limit = category === "branding" ? 5 : category === "brochure" ? 15 : 10;
        if (!file.size || file.size > limit * 1024 * 1024) {
          retry = null;
          throw new Error(file.size ? `Choose a file up to ${limit} MB.` : "This file is empty. Choose a file with content.");
        }

        setStage("Preparing upload…");
        const grant = await api(`${endpoint}/${id}/grant`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind: category, filename: file.name, size_bytes: file.size,
            sha256: await fileDigest(file), property_reference: propertyReference }),
        });
        item = grant.file;
        updateFile(item);
        if (grant.upload) {
          setStage("Uploading…");
          const form = new FormData();
          for (const [key, value] of Object.entries(grant.upload.fields)) form.append(key, value);
          form.append("file", file, file.name);
          let response;
          try {
            response = await fetch(grant.upload.url, { method: "POST", credentials: "omit", body: form });
          } catch {
            throw new Error("The file did not reach storage. Retry the upload.");
          }
          if (!response.ok) throw new Error("Storage did not accept the file. Retry the upload.");
        }
      }

      if (item.status !== "staged") {
        retry = { type: "verify", item };
        setStage("Verifying file…");
        item = await api(`${endpoint}/${item.id}/attempts/${item.attempt_id}/complete`, { method: "POST" });
      }
      updateFile(item);
      setNotice(`${item.filename} is staged for review.`);
      setSelection((previous) => previous?.id === item.id ? null : previous);
      if (fileInput.current && selection?.id === item.id) fileInput.current.value = "";
    } catch (error) {
      if (error.status === 422 || error.status === 409) {
        const latest = await api(endpoint).catch(() => null);
        if (latest) setSnapshot(latest);
        if (error.status === 422) retry = null;
        if (error.status === 409 && retry?.type === "verify" && latest) {
          const current = latest.files.find((item) => item.id === retry.item.id);
          retry = current?.status === "pending" ? { type: "verify", item: current } : null;
        }
      }
      setFailure({ message: error.message, status: error.status, retry });
    } finally {
      setStage("");
      running.current = false;
      onBusy(false);
    }
  }

  return (
    <section className="setup-uploads" hidden={!visible} aria-labelledby="setup-upload-title">
      <h2 id="setup-upload-title">Files for review</h2>
      {editable && snapshot?.available && (
        <form onSubmit={(event) => {
          event.preventDefault();
          if (selection) run({ ...selection, type: "upload", category: kind,
            propertyReference: kind === "photo" ? reference.trim() : null });
        }}>
          <fieldset className="setup-upload-fields" disabled={Boolean(stage)}>
            <label>File type
              <select value={kind} onChange={(event) => {
                setKind(event.target.value);
                setSelection(null);
                setFailure(null);
                if (fileInput.current) fileInput.current.value = "";
              }}>
                {Object.entries(CATEGORIES).map(([value, { label }]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            {kind === "photo" && <label>Property reference
              <input value={reference} maxLength={80} required onChange={(event) => setReference(event.target.value)}
                     placeholder="For example, P-102" aria-describedby="setup-property-reference-hint" />
              <span id="setup-property-reference-hint" className="setup-hint">Use the reference from your inventory file.</span>
            </label>}
            <label>Choose file
              <input type="file" accept={CATEGORIES[kind].accept} ref={fileInput} required onChange={(event) => {
                const file = event.target.files[0];
                setSelection(file ? { file, id: crypto.randomUUID() } : null);
                setFailure(null);
              }} />
            </label>
            <p className="setup-hint">{CATEGORIES[kind].hint}</p>
            <button className="setup-secondary" type="submit" disabled={!selection}>Upload file</button>
          </fieldset>
        </form>
      )}
      {loadError && <p role="alert" className="setup-field-error">{loadError} <button className="setup-link" type="button"
        onClick={() => setLoadAttempt((previous) => previous + 1)}>Reload files</button></p>}
      {!snapshot && !loadError && <p>Loading files…</p>}
      {editable && snapshot?.available === false && <p>Private uploads are temporarily unavailable.</p>}
      <p className="setup-save-status" role="status">{stage || notice}</p>
      {editable && failure && <div className="setup-notice" role="alert">
        <p>{failure.status === 401 ? "Sign in again, then return to this tab to retry." : failure.message}</p>
        {failure.status === 401 && <a className="setup-link" href="/client-setup/sign-in" target="_blank" rel="noopener">Sign in in a new tab</a>}
        {failure.retry && <button className="setup-secondary" type="button" disabled={Boolean(stage)}
                                 onClick={() => run(failure.retry)}>Retry {failure.retry.type === "verify" ? "verification" : "upload"}</button>}
      </div>}
      {snapshot?.files.length > 0 && <ul className="setup-file-list">
        {snapshot.files.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.filename}</strong>
              <span>{CATEGORIES[item.kind].label}{item.property_reference && ` · ${item.property_reference}`}</span>
              <span className={item.status === "staged" ? "setup-file-staged" : undefined}>{STATUSES[item.status]}</span>
              {item.validation_error && <p className="setup-field-error">{item.validation_error}</p>}
            </div>
            {editable && snapshot.available && item.status === "pending" && <div className="setup-file-actions">
              <button className="setup-link" type="button" disabled={Boolean(stage)}
                      onClick={() => run({ type: "verify", item })}>Check upload</button>
              <label className="setup-file-retry">Reselect file
                <input type="file" accept={CATEGORIES[item.kind].accept} disabled={Boolean(stage)}
                       aria-label={`Reselect ${item.filename} to retry`} onChange={(event) => {
                         const file = event.target.files[0];
                         event.target.value = "";
                         if (file) run({ type: "upload", id: item.id, file, category: item.kind,
                           propertyReference: item.property_reference });
                       }} />
              </label>
            </div>}
          </li>
        ))}
      </ul>}
      {snapshot?.available && snapshot.files.length === 0 && <p className="setup-hint">Files you add will appear here.</p>}
    </section>
  );
}
