import { partners } from "../data/team";
import "../styles/Team.css";

export default function Partners() {
  return (
    <section className="partners" id="partners" aria-labelledby="partners-title">
      <div className="team__inner">
        <h2 id="partners-title">Our trusted partners</h2>
        <ul className="partners__grid">
          {partners.map((p, i) => (
            <li className="partners__logo" key={i}>
              {p.logo ? <img src={p.logo} alt={p.name} /> : <span>{p.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
