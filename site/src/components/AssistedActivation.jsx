import { useEffect, useRef, useState } from "react";

const ACTIONS = {
  inventory_previewed: "Preview generated",
  inventory_approved: "Inventory set approved",
  agency_prepared: "Inactive agency prepared",
  inventory_imported: "Approved inventory imported",
  whatsapp_verified: "WhatsApp verification call recorded",
  customer_passed: "Customer check passed",
  broker_passed: "Broker check passed",
  went_live: "Agency marked live",
  paused: "Agency paused",
};

async function request(endpoint, options) {
  const response = await fetch(endpoint, { credentials: "same-origin", cache: "no-store", ...options });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data) {
    const error = new Error(typeof data?.detail === "string" ? data.detail : "Activation could not be loaded. Try again.");
    error.status = response.status;
    throw error;
  }
  return data;
}

function NoteAction({ action, button, label, confirm, busy, run }) {
  const [note, setNote] = useState("");
  const [checked, setChecked] = useState(false);
  return <form onSubmit={async (event) => {
    event.preventDefault();
    if (await run(action, { note, ...(confirm ? { signed_off: checked } : {}) })) setNote("");
  }}>
    <fieldset className="setup-fields" disabled={busy}>
      <div className="setup-question">
        <label htmlFor={`activation-${action}-note`}>{label}</label>
        <textarea id={`activation-${action}-note`} value={note} rows={3} maxLength={2000} required
          onChange={(event) => setNote(event.target.value)} />
      </div>
      {confirm && <label className="setup-activation-confirm">
        <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} required />
        {confirm}
      </label>}
      <button className="setup-primary" type="submit" disabled={!note.trim() || (confirm && !checked)}>{button}</button>
    </fieldset>
  </form>;
}

function InventoryPreview({ activation, endpoint, busy, run }) {
  const { preview, approval } = activation;
  const [chosen, setChosen] = useState(new Set(approval?.row_numbers ?? []));
  const [photos, setPhotos] = useState(new Set(approval?.photo_ids ?? []));
  const [note, setNote] = useState("");
  const locked = Boolean(activation.agency_id);
  const ok = preview.rows.filter((row) => !row.errors.length);
  const selectedPhotos = preview.photos.filter((photo) => chosen.has(photo.row) && photos.has(photo.id));
  const change = (set, value, checked) => set((previous) => {
    const next = new Set(previous);
    if (checked) next.add(value);
    else next.delete(value);
    return next;
  });

  return <form className="setup-activation-preview" onSubmit={async (event) => {
    event.preventDefault();
    if (await run("approve", { preview_id: preview.id, row_numbers: [...chosen],
      photo_ids: selectedPhotos.map((photo) => photo.id), note })) setNote("");
  }}>
    <fieldset className="setup-fields" disabled={locked || busy}>
      <h3>{preview.filename}</h3>
      <p>{ok.length} valid · {preview.rows.length - ok.length} need correction</p>
      {preview.sharing_restrictions && <p className="setup-return-note">{preview.sharing_restrictions}</p>}
      {!locked && ok.length > 0 && <button className="setup-link" type="button"
        onClick={() => setChosen(new Set(ok.map((row) => row.row)))}>Select all valid rows</button>}
      <div className="setup-preview-scroll" role="region" aria-label="Inventory preview" tabIndex="0">
        <table className="setup-preview-table">
          <thead><tr><th>Include</th><th>Row</th><th>Reference</th><th>Location</th><th>Type and purpose</th>
            <th>Price (PKR)</th><th>Size</th><th>Status or issue</th></tr></thead>
          <tbody>{preview.rows.map((row) => (
            <tr key={row.row}>
              <td><input type="checkbox" checked={chosen.has(row.row)} disabled={row.errors.length > 0}
                aria-label={`Include row ${row.row}`} onChange={(event) => change(setChosen, row.row, event.target.checked)} /></td>
              <td>{row.row}</td><th scope="row">{row.reference || "Missing"}</th><td>{row.location || "Unknown"}</td>
              <td>{row.property_type} · {row.purpose}</td><td>{row.price_pkr && BigInt(row.price_pkr).toLocaleString()}</td>
              <td>{row.area_value} {row.area_unit?.replaceAll("_", " ")}</td>
              <td>{row.errors.length ? row.errors.join(" ") : row.restricted
                ? `${row.status.replaceAll("_", " ")} · sharing restrictions` : row.status.replaceAll("_", " ")}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {preview.photos.length > 0 && <section className="setup-activation-photos">
        <h3>Property photos</h3>
        <ul className="setup-file-list">{preview.photos.map((photo) => (
          <li key={photo.id}><div>
            <a className="setup-link" href={`${endpoint}/files/${photo.id}`} target="_blank" rel="noopener">{photo.filename}</a>
            <span>{photo.property_reference}{photo.row && ` · row ${photo.row}`}</span>
            {photo.private_reason && <span>{photo.private_reason}</span>}
          </div>{!photo.private_reason && <label>
            <input type="checkbox" checked={chosen.has(photo.row) && photos.has(photo.id)} disabled={!chosen.has(photo.row)}
              onChange={(event) => change(setPhotos, photo.id, event.target.checked)} /> Share with customers
          </label>}</li>
        ))}</ul>
      </section>}
      {!locked && <>
        <p>{chosen.size} rows selected · {selectedPhotos.length} of {preview.max_photos} photos selected</p>
        <div className="setup-question">
          <label htmlFor="activation-approval-note">Inventory approval and sharing notes</label>
          <textarea id="activation-approval-note" value={note} onChange={(event) => setNote(event.target.value)}
            rows={3} maxLength={2000} required />
        </div>
        <button className="setup-primary" type="submit"
          disabled={!chosen.size || !note.trim() || selectedPhotos.length > preview.max_photos}>Approve selected set</button>
      </>}
    </fieldset>
  </form>;
}

function PrepareAgency({ busy, run }) {
  return <form onSubmit={(event) => {
    event.preventDefault();
    run("prepare", Object.fromEntries(new FormData(event.currentTarget)));
  }}>
    <fieldset className="setup-fields setup-activation-controls" disabled={busy}>
      <h3>Prepare the agency</h3>
      <p>Use a Manzil-controlled customer test number and the agency’s authorized launch broker.</p>
      {[
        ["phone_number_id", "Meta phone number ID", "numeric", 32],
        ["waba_id", "WhatsApp business account ID (optional)", "numeric", 32],
        ["customer_number", "Customer test WhatsApp number", "tel", 32],
        ["broker_name", "Launch broker name", "text", 200],
        ["broker_number", "Launch broker WhatsApp number", "tel", 32],
      ].map(([name, label, inputMode, length]) => <div className="setup-question" key={name}>
        <label htmlFor={`activation-${name}`}>{label}</label>
        <input id={`activation-${name}`} name={name} inputMode={inputMode} maxLength={length} required={name !== "waba_id"} />
      </div>)}
      <div className="setup-question">
        <label htmlFor="activation-marla-area">Area per marla</label>
        <select id="activation-marla-area" name="marla_sqft">
          <option value="225">225 sq ft</option><option value="272.25">272.25 sq ft</option>
        </select>
      </div>
      <button className="setup-primary" type="submit">Prepare inactive agency</button>
    </fieldset>
  </form>;
}

function WhatsAppChecks({ activation, busy, run }) {
  const expired = activation.test_expires_at && new Date(activation.test_expires_at).getTime() <= Date.now();
  return <section className="setup-activation-step">
    <h3>WhatsApp verification and checks</h3>
    <p>Imported {activation.approval.row_numbers.length} approved rows and {activation.approval.photo_ids.length} photos.</p>
    {activation.sender_source === "database"
      ? <p>Recording the call verifies this agency’s sender for the two test accounts.</p>
      : <>
        <p>Ask the Manzil operator to add this sender route to <code>WEBHOOK_SENDER_AGENCIES</code>.</p>
        <p><code>{activation.phone_number_id}={activation.agency_id}</code></p>
      </>}
    {!activation.verified_at || expired ? <>
      <p>Verify the registered number on the setup call. Enter any verification code directly in Meta.</p>
      {expired && <p>The test window has expired. Start a fresh call and repeat both checks.</p>}
      <NoteAction action="verify_call" label="Call result" button="Record call and open tests" busy={busy} run={run} />
    </> : <>
      <p>Test window closes {new Date(activation.test_expires_at).toLocaleString()}.</p>
      {!activation.customer_passed_at ? <>
        <p>From +{activation.customer_number}, ask about an approved property, check the reply and request a viewing.</p>
        <NoteAction action="customer" label="Customer check result" button="Pass customer check" busy={busy} run={run} />
      </> : !activation.broker_passed_at ? <>
        <p>At +{activation.broker_number}, check the broker brief and reply to accept the handoff.</p>
        <NoteAction action="broker" label="Broker check result" button="Pass broker check" busy={busy} run={run} />
      </> : <NoteAction action="launch" label="Agency approver, sign-off date, and launch decision" button="Mark agency live"
        confirm="The agency approved launch and Manzil authorizes go-live." busy={busy} run={run} />}
    </>}
  </section>;
}

export default function AssistedActivation({ endpoint, onReviewChanged }) {
  const [activation, setActivation] = useState(null);
  const [file, setFile] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [load, setLoad] = useState(0);
  const running = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    request(endpoint, { signal: controller.signal }).then((next) => {
      setActivation(next);
      setError(null);
    }).catch((issue) => { if (!controller.signal.aborted) setError(issue); });
    return () => controller.abort();
  }, [endpoint, load]);

  async function run(action, values = {}) {
    if (running.current) return false;
    running.current = true;
    setBusy(true);
    setError(null);
    try {
      const next = await request(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, action, expected_revision: activation.revision }),
      });
      if (next.returned) await onReviewChanged();
      else {
        setActivation(next);
        if (action === "launch" || action === "pause") await onReviewChanged();
      }
      return true;
    } catch (issue) {
      setError(issue);
      return false;
    } finally {
      running.current = false;
      setBusy(false);
    }
  }

  const fileId = file || activation?.inventory_files[0]?.id || "";
  return <section className="setup-activation" aria-labelledby="activation-title" aria-busy={busy}>
    <h2 id="activation-title">Assisted activation</h2>
    {error && <div className="setup-notice" role="alert">
      <p>{error.message}</p>
      {error.status === 401 ? <a className="setup-link" href="/client-setup/review/sign-in">Sign in again</a>
        : <button className="setup-link" type="button" onClick={() => setLoad((previous) => previous + 1)}>Reload activation</button>}
    </div>}
    {!activation && !error && <p role="status">Loading activation…</p>}
    {activation && <>
      {activation.paused_at ? <p role="status">Paused {new Date(activation.paused_at).toLocaleString()}.</p>
      : activation.live_at ? <section className="setup-activation-step">
        <p role="status">Live since {new Date(activation.live_at).toLocaleString()}.</p>
        <details className="setup-review-history">
          <summary>Pause this agency</summary>
          <NoteAction action="pause" label="Reason for pausing" button="Pause agency"
            confirm="Pause WhatsApp service for this agency." busy={busy} run={run} />
        </details>
      </section> : <>
        {!activation.agency_id && <section className="setup-activation-step">
          <h3>Inventory file</h3>
          {fileId ? <form onSubmit={(event) => { event.preventDefault(); run("preview", { file_id: fileId }); }}>
            <fieldset className="setup-fields" disabled={busy}>
              <div className="setup-question">
                <label htmlFor="activation-inventory-file">Submitted Excel or CSV file</label>
                <select id="activation-inventory-file" value={fileId} onChange={(event) => setFile(event.target.value)}>
                  {activation.inventory_files.map((item) => <option key={item.id} value={item.id}>{item.filename}</option>)}
                </select>
              </div>
              <button className="setup-secondary" type="submit">Preview inventory</button>{" "}
              <a className="setup-link" target="_blank" rel="noopener" href={`${endpoint}/files/${fileId}`}>Download file</a>
            </fieldset>
          </form> : <p>The submission has no verified inventory file.</p>}
          <details className="setup-review-history">
            <summary>Request corrected inventory</summary>
            <NoteAction action="return_inventory" label="What should the coordinator correct?" button="Return inventory section"
              busy={busy} run={run} />
          </details>
        </section>}
        {activation.preview && !activation.imported_at && <InventoryPreview key={activation.preview.id}
          activation={activation} busy={busy} endpoint={endpoint} run={run} />}
        {activation.approval && !activation.agency_id && <PrepareAgency busy={busy} run={run} />}
        {activation.agency_id && !activation.imported_at && <p>
          <button className="setup-primary" type="button" disabled={busy} onClick={() => run("import")}>Import approved inventory</button>
        </p>}
        {activation.imported_at && <WhatsAppChecks activation={activation} busy={busy} run={run} />}
      </>}
      {activation.history.length > 0 && <details className="setup-review-history">
        <summary>Activation history</summary>
        <ol>{activation.history.map((event) => <li key={event.occurred_at + event.action}>
          <strong>{ACTIONS[event.action]}</strong>
          <time dateTime={event.occurred_at}>{new Date(event.occurred_at).toLocaleString()}</time>
          <span>{event.reviewer_email}</span>
          {event.note && <p>{event.note}</p>}
        </li>)}</ol>
      </details>}
    </>}
  </section>;
}
