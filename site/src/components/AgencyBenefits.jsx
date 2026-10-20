import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { benefits } from "../data/benefits";
import { ReplayIcon } from "./Icons";
import useEnquirySequence from "../hooks/useEnquirySequence";
import "../styles/AgencyBenefits.css";

function MessageBubble({ children, className = "" }) {
  return <div className={`benefit-message ${className}`}>{children}</div>;
}

function Connector() {
  return (
    <svg className="benefit-connector benefit-connector--straight" viewBox="0 0 20 35" aria-hidden="true">
      <path className="benefit-path benefit-path--straight" d="M10 0v29m-4-4 4 4 4-4" />
    </svg>
  );
}

function EnquiryVisual({ replayVersion }) {
  const visualRef = useRef(null);
  const messageRef = useRef(null);
  const dhaTermRef = useRef(null);
  const apartmentTermRef = useRef(null);
  const dhaChipRef = useRef(null);
  const apartmentChipRef = useRef(null);
  const budgetRef = useRef(null);
  const [connectors, setConnectors] = useState(null);
  useEnquirySequence(visualRef, Boolean(connectors), replayVersion);

  useLayoutEffect(() => {
    const elements = [visualRef, messageRef, dhaTermRef, apartmentTermRef, dhaChipRef, apartmentChipRef, budgetRef].map((ref) => ref.current);
    let frame;
    let active = true;
    const measure = () => {
      // Use the SVG coordinate space itself (the panel has a border).
      const visual = visualRef.current.querySelector("svg").getBoundingClientRect();
      const message = messageRef.current.getBoundingClientRect();
      const rect = (ref) => ref.current.getBoundingClientRect();
      const center = (box) => box.left + box.width / 2 - visual.left;
      const curve = (term, chip) => {
        const startX = center(rect(term));
        const endX = center(rect(chip));
        const startY = message.bottom - visual.top + 2;
        const endY = rect(chip).top - visual.top - 2;
        const bend = Math.max(12, (endY - startY) * .42);
        return `M ${startX} ${startY} C ${startX} ${startY + bend}, ${endX} ${endY - bend}, ${endX} ${endY}`;
      };
      const chipsBottom = Math.max(rect(dhaChipRef).bottom, rect(apartmentChipRef).bottom) - visual.top;
      const budgetTop = rect(budgetRef).top - visual.top;
      const next = {
        width: visual.width,
        height: visual.height,
        dha: curve(dhaTermRef, dhaChipRef),
        apartment: curve(apartmentTermRef, apartmentChipRef),
        budget: `M ${center(rect(budgetRef))} ${chipsBottom + 3} V ${budgetTop - 3}`,
      };
      if (active) setConnectors((current) => JSON.stringify(current) === JSON.stringify(next) ? current : next);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = window.ResizeObserver ? new ResizeObserver(schedule) : null;
    elements.forEach((element) => observer?.observe(element));
    window.addEventListener("resize", schedule);
    measure();
    document.fonts?.ready.then(() => { if (active) schedule(); });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="benefit-visual benefit-visual--enquiry" ref={visualRef}>
      <p className="benefit-ui-label">Buyer message</p>
      <div className="benefit-message benefit-motion benefit-motion--message" ref={messageRef}>
        <span className="benefit-term benefit-term--dha" ref={dhaTermRef}>DHA</span> mein <span className="benefit-term benefit-term--apartment" ref={apartmentTermRef}>apartment</span> chahiye
      </div>
      <svg className="benefit-connector benefit-connector--enquiry" viewBox={connectors ? `0 0 ${connectors.width} ${connectors.height}` : undefined} aria-hidden="true" focusable="false">
        {connectors && <>
          <path className="benefit-path benefit-path--dha" d={connectors.dha} />
          <path className="benefit-path benefit-path--apartment" d={connectors.apartment} />
          <path className="benefit-path benefit-path--budget" d={connectors.budget} />
          <path className="benefit-beam benefit-beam--dha" d={connectors.dha} pathLength="100" />
          <path className="benefit-beam benefit-beam--apartment" d={connectors.apartment} pathLength="100" />
        </>}
      </svg>
      <div className="benefit-chips">
        <div className="benefit-chips__known">
          <span className="benefit-chip benefit-motion benefit-motion--dha-chip" ref={dhaChipRef}>DHA</span>
          <span className="benefit-chip benefit-motion benefit-motion--apartment-chip" ref={apartmentChipRef}>Apartment</span>
        </div>
        <span className="benefit-chip benefit-chip--missing benefit-motion benefit-motion--budget" ref={budgetRef}>Budget needed</span>
      </div>
    </div>
  );
}

function BuyerBrief() {
  return (
    <div className="benefit-brief benefit-handoff-step benefit-handoff-step--shell">
      <h4 className="benefit-brief__title">Hina’s rental enquiry</h4>
      <dl>
        <div className="benefit-handoff-step benefit-handoff-step--area"><dt>Area</dt><dd>DHA Phase 6</dd></div>
        <div className="benefit-handoff-step benefit-handoff-step--property"><dt>Property</dt><dd>3-bedroom apartment</dd></div>
        <div className="benefit-handoff-step benefit-handoff-step--budget"><dt>Budget</dt><dd>Up to PKR 150,000/month</dd></div>
      </dl>
    </div>
  );
}

function HandoffVisual() {
  return (
    <div className="benefit-visual benefit-visual--handoff">
      <BuyerBrief />
      <div className="benefit-latest">
        <span className="benefit-ui-label benefit-handoff-step benefit-handoff-step--question-label">Latest question</span>
        <MessageBubble className="benefit-handoff-step benefit-handoff-step--question-bubble">Saturday ko dekh sakte hain?</MessageBubble>
      </div>
      <p className="benefit-status benefit-status--reply benefit-handoff-step benefit-handoff-step--reply"><span />Needs human reply</p>
    </div>
  );
}

function ListingDraft() {
  return (
    <div className="benefit-draft benefit-motion benefit-motion--draft">
      <p className="benefit-ui-label">Listing draft</p>
      <strong className="benefit-detail benefit-detail--area">Clifton</strong>
      <span className="benefit-detail benefit-detail--property">2-bedroom apartment</span>
      <span className="benefit-detail benefit-detail--rent">PKR 120,000/month</span>
      <p className="benefit-status benefit-status--draft benefit-motion benefit-motion--review"><span />Draft for agency review</p>
    </div>
  );
}

function ListingVisual() {
  return (
    <div className="benefit-visual benefit-visual--listings">
      <p className="benefit-ui-label">Staff update</p>
      <MessageBubble className="benefit-motion benefit-motion--staff-message">Clifton · 2-bed · PKR 120,000/month</MessageBubble>
      <Connector />
      <ListingDraft />
    </div>
  );
}

const visuals = { enquiries: EnquiryVisual, handoff: HandoffVisual, listings: ListingVisual };

function BenefitColumn({ benefit, replayVersion }) {
  const Visual = visuals[benefit.id];
  return (
    <article className={`benefit-column benefit-column--${benefit.id}`}>
      <div className="benefit-copy">
        <h3>{benefit.title}</h3>
        <p>{benefit.description}</p>
      </div>
      <Visual replayVersion={replayVersion} />
    </article>
  );
}

export default function AgencyBenefits() {
  const [enquiryReplay, setEnquiryReplay] = useState(0);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const brokerObserverRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) return;
    const columns = sectionRef.current.querySelectorAll(".benefit-column--listings");
    const broker = sectionRef.current.querySelector(".benefit-column--handoff");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-playing");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    observerRef.current = observer;
    columns.forEach((column) => observer.observe(column));
    const brokerObserver = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        broker.classList.add("is-playing");
        brokerObserver.unobserve(broker);
      }
    }, { threshold: 0.45 });
    brokerObserverRef.current = brokerObserver;
    brokerObserver.observe(broker);
    broker.classList.add("is-ready");
    return () => {
      observer.disconnect();
      brokerObserver.disconnect();
      observerRef.current = null;
      brokerObserverRef.current = null;
    };
  }, []);

  const replay = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnquiryReplay((version) => version + 1);
    observerRef.current?.disconnect();
    brokerObserverRef.current?.disconnect();
    const columns = sectionRef.current.querySelectorAll(".benefit-column:not(.benefit-column--enquiries)");
    columns.forEach((column) => column.classList.remove("is-playing"));
    // Recalculate once so every CSS sequence restarts, even on rapid clicks.
    void sectionRef.current.offsetWidth;
    columns.forEach((column) => column.classList.add("is-playing"));
  };

  return (
    <section className="agency-benefits" aria-labelledby="benefits-title" ref={sectionRef}>
      <div className="agency-benefits__inner">
        <header className="agency-benefits__intro">
          <h2 id="benefits-title">Less back-and-forth. More useful conversations.</h2>
          <p>Clearer enquiries. Better handoffs. Easier listing updates.</p>
        </header>
        <div className="agency-benefits__grid">
          {benefits.map((benefit) => <BenefitColumn benefit={benefit} key={benefit.id} replayVersion={enquiryReplay} />)}
        </div>
        <div className="agency-benefits__foot">
          <p className="agency-benefits__note">Illustrative examples</p>
          <button className="agency-benefits__replay" type="button" onClick={replay}><ReplayIcon />Replay examples</button>
        </div>
      </div>
    </section>
  );
}
