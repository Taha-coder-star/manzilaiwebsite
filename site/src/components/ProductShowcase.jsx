import { useEffect, useRef } from "react";
import { buyerEnquiry, matchedProperties, showcaseRoles, staffUpdate, voiceExample } from "../data/showcase";
import useShowcaseScroll from "../hooks/useShowcaseScroll";
import mark from "../assets/manzil-mark-light.svg";
import "../styles/ProductShowcase.css";

const reveal = (progress, start, end, pinned) => pinned ? Math.max(0, Math.min(1, (progress - start) / (end - start))) : 1;
const motion = opacity => ({ opacity, transform: `translateY(${(1 - opacity) * 8}px)` });
const emphasis = (progress, start, end, pinned) => pinned && progress >= start && progress < end;

function RoleNavigation({ active, onSelect }) {
  const refs = useRef([]);
  const onKeyDown = (event, index) => {
    const next = { ArrowRight: (index + 1) % 3, ArrowDown: (index + 1) % 3,
      ArrowLeft: (index + 2) % 3, ArrowUp: (index + 2) % 3, Home: 0, End: 2 }[event.key];
    if (next !== undefined) { event.preventDefault(); onSelect(next); refs.current[next]?.focus(); }
  };
  return <nav className="showcase__navigation" aria-label="Showcase chapters">
    <p className="showcase__nav-title">Explore by role</p>
    <div className="showcase__tabs">{showcaseRoles.map((role, index) => <a key={role.id} ref={element => { refs.current[index] = element; }} href={`#${role.id}`}
      aria-current={active === index ? "step" : undefined} onClick={event => { event.preventDefault(); onSelect(index); }} onKeyDown={event => onKeyDown(event, index)}>
      <span className="showcase__tab-number">0{index + 1}</span><span><strong>{role.label}</strong><small>{role.context}</small></span>
    </a>)}</div>
    <div className="showcase__capability-index"><span>In this showcase</span><p>Buyer enquiries · Property matching · Voice notes · Listing updates · Agent handoff</p></div>
  </nav>;
}

function ChapterHeading({ role }) {
  return <header className="showcase__explanation"><div><p className="showcase__role-label">{role.label} view</p><h3>{role.heading}</h3><p>{role.description}</p></div><ul className="showcase__features" aria-label="Capabilities shown">{role.features.map(feature => <li key={feature}>{feature}</li>)}</ul></header>;
}

function ChatHeader({ staff = false }) {
  return <div className="showcase-chat__header"><span className="showcase-chat__mark"><img src={mark} alt="" /></span><div><strong>Manzil AI</strong><span>{staff ? "Agency listing assistant" : "Property assistant"} · WhatsApp</span></div></div>;
}

function BuyerBrief({ progress, pinned }) {
  const fields = buyerEnquiry.requirements.map((item, index) => ({ ...item, at: [0.095, 0.16, 0.16, 0.345][index] }));
  const count = fields.filter(item => reveal(progress, item.at, item.at + 0.018, pinned) === 1).length;
  return <div className="showcase-brief"><div className="showcase-brief__heading"><span className="showcase__small">Buyer brief</span><span className="showcase-brief__count">{count} / 4</span></div>
    <h4>A clear starting point.</h4><dl>{fields.map(item => { const opacity = reveal(progress, item.at, item.at + 0.018, pinned); return <div key={item.label}>
      <dt>{item.label}</dt><dd><span style={motion(opacity)}>{item.value}</span><span className="showcase-brief__waiting" style={{ opacity: 1 - opacity }}>Awaiting detail</span></dd>
    </div>; })}</dl><p className="showcase-brief__status" data-complete={count === 4}>{count === 4 ? "Requirements captured" : "Building the buyer brief"}</p></div>;
}

function CustomerChapter({ progress, pinned, active, sectionRef }) {
  return <section className="showcase__chapter showcase__chapter--customer" id="customers" data-chapter="0" data-active={active} ref={sectionRef}
    aria-hidden={pinned && !active ? "true" : undefined} inert={pinned && !active ? "" : undefined}>
    <ChapterHeading role={showcaseRoles[0]} />
    <div className="showcase__demonstration"><div className="showcase__demo-toolbar"><span>Customer conversation · Example</span><span className="showcase__demo-state">Enquiry to buyer brief</span></div>
      <div className="showcase__scene"><div className="showcase-chat"><ChatHeader /><ol>
        <li className="showcase-message showcase-message--buyer" style={motion(reveal(progress, 0.015, 0.04, pinned))}><span className="showcase-message__sender">Hina</span><p lang="ur-Latn"><span data-emphasis={emphasis(progress, 0.07, 0.12, pinned)}>DHA Phase 6</span> mein <span data-emphasis={emphasis(progress, 0.135, 0.18, pinned)}>3-bedroom apartment</span> chahiye, <span data-emphasis={emphasis(progress, 0.135, 0.18, pinned)}>rent</span> ke liye.</p></li>
        <li className="showcase-message showcase-message--manzil" style={motion(reveal(progress, 0.205, 0.23, pinned))}><span className="showcase-message__sender">Manzil AI</span><p lang="ur-Latn">{buyerEnquiry.messages[1].text}</p></li>
        <li className="showcase-message showcase-message--buyer" style={motion(reveal(progress, 0.275, 0.3, pinned))}><span className="showcase-message__sender">Hina</span><p lang="ur-Latn"><span data-emphasis={emphasis(progress, 0.325, 0.365, pinned)}>{buyerEnquiry.messages[2].text}</span></p></li>
      </ol><div className="showcase-chat__footer">Hina’s rental enquiry</div></div><BuyerBrief progress={progress} pinned={pinned} /></div>
      <div className="showcase__customer-more" style={motion(reveal(progress, 0.385, 0.41, pinned))}><div className="showcase-voice"><span className="showcase__eyebrow">Voice notes · Alternative input</span><p>Sample transcript: <span lang="ur-Latn">“{voiceExample.transcript}”</span></p></div><div className="showcase-matches"><span className="showcase__eyebrow">Property matching</span><p>{matchedProperties.map(property => `${property.id}: ${property.name}, ${property.detail}, ${property.rent}`).join(" · ")}</p></div></div>
    </div>
  </section>;
}

function BrokerChapter({ pinned, active, sectionRef }) {
  return <section className="showcase__chapter showcase__chapter--broker" id="brokers" data-chapter="1" data-active={active} ref={sectionRef}
    aria-hidden={pinned && !active ? "true" : undefined} inert={pinned && !active ? "" : undefined}>
    <ChapterHeading role={showcaseRoles[1]} />
    <div className="showcase__demonstration"><div className="showcase__demo-toolbar"><span>Lead dashboard · Example handoff</span><span className="showcase__demo-state">Ready for agent review</span></div>
      <div className="showcase-handoff"><div className="showcase-handoff__top"><div><span className="showcase__eyebrow">Latest buyer question</span><h4 lang="ur-Latn">“{buyerEnquiry.messages.at(-1).text}”</h4><p>Viewing requested — not booked.</p></div><span className="showcase-handoff__badge">Needs human reply</span></div>
        <div className="showcase-handoff__grid"><div className="showcase-handoff__main"><span className="showcase__eyebrow">Hina’s buyer requirements</span><dl>{buyerEnquiry.requirements.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></div>
          <div className="showcase-handoff__side"><span className="showcase__eyebrow">Illustrative matched options</span><div className="showcase-handoff__options">{matchedProperties.map(property => <article key={property.id}><span>Option {property.id}</span><strong>{property.name}</strong><p>{property.detail}</p><b>{property.rent}</b></article>)}</div></div></div>
        <div className="showcase-handoff__bottom"><span className="showcase-handoff__dot" />Context ready for the broker to take over</div>
      </div>
    </div>
  </section>;
}

function StaffChapter({ pinned, active, sectionRef }) {
  return <section className="showcase__chapter showcase__chapter--staff" id="staff" data-chapter="2" data-active={active} ref={sectionRef}
    aria-hidden={pinned && !active ? "true" : undefined} inert={pinned && !active ? "" : undefined}>
    <ChapterHeading role={showcaseRoles[2]} />
    <div className="showcase__demonstration"><div className="showcase__demo-toolbar"><span>Listing update · Example</span><span className="showcase__demo-state">Draft for agency review</span></div>
      <div className="showcase__scene showcase__scene--staff"><div className="showcase-chat showcase-chat--staff"><ChatHeader staff /><div className="showcase-chat__staff-body"><span className="showcase__eyebrow">Message from {staffUpdate.sender}</span><p lang="ur-Latn">{staffUpdate.message}</p><span className="showcase-chat__staff-note">Listing information received</span></div></div>
        <div className="showcase-brief showcase-brief--staff"><span className="showcase__eyebrow">Structured listing draft</span><h4>Ready to check.</h4><dl>{staffUpdate.fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="showcase-brief__status">Draft for agency review · No listing published</p></div></div>
    </div>
  </section>;
}

export default function ProductShowcase() {
  const { trackRef, stageRef, sectionRefs, pinned, progress, active, scrollToChapter } = useShowcaseScroll();
  useEffect(() => {
    let frame = 0;
    const onHash = () => {
      const index = showcaseRoles.findIndex(role => `#${role.id}` === window.location.hash);
      if (index >= 0) frame = window.requestAnimationFrame(() => scrollToChapter(index, "auto"));
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("hashchange", onHash); };
  }, []);
  const select = index => { window.history.replaceState(null, "", `#${showcaseRoles[index].id}`); scrollToChapter(index); };
  return <section className="showcase" id="manzil-in-action" aria-labelledby="showcase-title"><div className="showcase__container"><header className="showcase__intro"><p className="showcase__label">Manzil in action</p><h2 id="showcase-title">Your agency’s conversations,<br className="showcase__desktop-break" /> moving forward.</h2><p className="showcase__support">Understand buyer requirements. Share relevant properties. Give your agents the context to take over.</p></header>
    <div className="showcase__track" ref={trackRef}><div className="showcase__stage" ref={stageRef}><div className="showcase__layout"><RoleNavigation active={active} onSelect={select} /><div className="showcase__chapters"><CustomerChapter progress={progress} pinned={pinned} active={active === 0} sectionRef={element => { sectionRefs.current[0] = element; }} /><BrokerChapter pinned={pinned} active={active === 1} sectionRef={element => { sectionRefs.current[1] = element; }} /><StaffChapter pinned={pinned} active={active === 2} sectionRef={element => { sectionRefs.current[2] = element; }} /></div></div></div></div>
  </div></section>;
}
