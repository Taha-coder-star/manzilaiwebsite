import { useEffect, useRef, useState } from "react";
import { roles } from "../data/roles";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import { Arrow } from "./Icons";
import "../styles/RoleExplorer.css";

function RoleIcon({ id }) {
  const drawing = {
    customers: <><circle cx="10" cy="9" r="3" /><path d="M4.5 19c0-3 2.2-5 5.5-5s5.5 2 5.5 5M17 8h4v8l-3 2v-2h-1" /></>,
    brokers: <><rect x="4" y="4" width="16" height="17" rx="2" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
    staff: <><path d="M3 20h18M5 20V7l7-4 7 4v13M9 10h2v2H9zM14 10h2v2h-2zM10 20v-5h4v5" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawing[id]}</svg>;
}

const roleIndexFromHash = () => Math.max(0, roles.findIndex(role => `#${role.id}` === window.location.hash));

export default function RoleExplorer() {
  const [selected, setSelected] = useState(roleIndexFromHash);
  const tabRefs = useRef([]);
  const panelRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const active = roles[selected];

  useEffect(() => {
    const onHashChange = () => {
      const match = roles.findIndex(role => `#${role.id}` === window.location.hash);
      if (match !== -1) setSelected(match);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const select = (index, moveFocus = false) => {
    setSelected(index);
    window.history.replaceState(null, "", `#${roles[index].id}`);
    if (moveFocus) tabRefs.current[index]?.focus();
    if (window.innerWidth <= 600 && !moveFocus) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" }));
    }
  };

  const onTabKeyDown = (event, index) => {
    const keys = { ArrowRight: (index + 1) % roles.length, ArrowDown: (index + 1) % roles.length,
      ArrowLeft: (index + roles.length - 1) % roles.length, ArrowUp: (index + roles.length - 1) % roles.length,
      Home: 0, End: roles.length - 1 };
    if (Object.hasOwn(keys, event.key)) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  return (
    <section className="roles" id="roles" aria-labelledby="roles-title">
      <div className="roles__container">
        <header className="roles__intro">
          <h2 id="roles-title">One agency. Three ways to move forward.</h2>
          <p>Choose a role to see how they take part in the property conversation.</p>
        </header>

        <div className="roles__tabs" role="tablist" aria-label="Explore Manzil by role">
          {roles.map((role, index) => (
            <button key={role.id} ref={el => { tabRefs.current[index] = el; }}
              type="button" role="tab" id={role.id} aria-selected={selected === index}
              aria-controls="role-detail" tabIndex={selected === index ? 0 : -1}
              onClick={() => select(index)} onKeyDown={event => onTabKeyDown(event, index)}>
              <RoleIcon id={role.id} />
              <span className="roles__tab-copy"><strong>{role.label}</strong><small>{role.channel}</small></span>
              <Arrow />
            </button>
          ))}
        </div>

        <div className="roles__detail" id="role-detail" role="tabpanel" aria-labelledby={active.id} tabIndex={0} ref={panelRef}>
          <div className="roles__detail-copy">
            <p className="roles__role-name">{active.label} view</p>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <div className="roles__outcome"><span>What moves forward</span><strong>{active.outcome}</strong></div>
          </div>
          <div className="roles__actions">
            <h4>What {active.label === "Staff" ? "staff" : `${active.label.toLowerCase()}s`} can do</h4>
            <ul>{active.actions.map(action => <li key={action}>{action}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
