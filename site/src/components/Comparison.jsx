import { comparisonColumns, comparisonRows } from "../data/comparison";
import mark from "../assets/manzil-mark-light.svg";
import "../styles/Comparison.css";

const Check = () => (
  <svg className="cmp__icon" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const No = () => (
  <svg className="cmp__icon cmp__icon--no" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4.5 8h7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);

function Cell({ value }) {
  if (value === true) return <><Check /><span className="sr-only">Yes</span></>;
  if (value === false) return <><No /><span className="sr-only">No</span></>;
  return <span className="cmp__text">{value}</span>;
}

export default function Comparison() {
  return (
    <section className="cmp" id="compare" aria-labelledby="compare-title">
      <div className="cmp__inner">
        <h2 id="compare-title">How Manzil AI compares</h2>
        <div className="cmp__card">
          <table className="cmp__table">
            <caption className="sr-only">Manzil AI compared with replying by hand and generic chatbots</caption>
            <thead>
              <tr>
                <td />
                {comparisonColumns.map((c) => (
                  <th scope="col" key={c.id}>
                    <span className="cmp__long">{c.label}</span>
                    <span className="cmp__short">{c.short}</span>
                  </th>
                ))}
                <th scope="col" className="cmp__us">
                  <span className="cmp__brand"><img src={mark} alt="" width="15" height="18" />Manzil AI</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  {comparisonColumns.map((c) => <td key={c.id}><Cell value={row[c.id]} /></td>)}
                  <td className="cmp__us"><Cell value={row.manzil} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cmp__note">Based on typical setups. Chatbot features vary by provider.</p>
      </div>
    </section>
  );
}
