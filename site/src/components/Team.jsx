import { team } from "../data/team";
import "../styles/Team.css";

export default function Team() {
  return (
    <section className="team" id="team" aria-labelledby="team-title">
      <div className="team__inner">
        <h2 id="team-title">Meet the team</h2>
        <ul className="team__grid">
          {team.map((m, i) => (
            <li className="team__card" key={i}>
              <div className="team__photo" aria-hidden="true">
                <svg viewBox="0 0 48 48"><circle cx="24" cy="18" r="9" /><path d="M7 44c2-10 9-15 17-15s15 5 17 15z" /></svg>
              </div>
              <h3>{m.name}</h3>
              <p className="team__role">{m.role}</p>
              <p className="team__bio">{m.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
