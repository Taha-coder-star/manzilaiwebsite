import { useRef } from "react";
import useDemoSequence from "../hooks/useDemoSequence";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import useStageScroll from "../hooks/useStageScroll";
import DemoLink from "./DemoLink";
import DashboardPreview from "./DashboardPreview";
import WhatsAppDemo from "./WhatsAppDemo";
import LeadSummary from "./LeadSummary";
import { Arrow, ReplayIcon } from "./Icons";
import "../styles/Hero.css";

const delay = (ms) => ({ "--d": `${ms}ms` });

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const demo = useDemoSequence(reducedMotion);

  const stageRef = useRef(null);
  const shapesRef = useRef(null);

  useStageScroll(stageRef, shapesRef, reducedMotion);

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__shapes" ref={shapesRef} aria-hidden="true">
        <i className="shape shape--ring" />
        <i className="shape shape--tri" />
      </div>

      <div className="hero__copy">
        <h1 id="hero-title" className="reveal" style={delay(70)}>
          Your agency’s property assistant, on&nbsp;WhatsApp.
        </h1>
        <p className="lede reveal" style={delay(140)}>
          Buyers can send a Roman Urdu message or voice note to your agency’s WhatsApp. Manzil AI finds relevant properties from your listings and sends your broker the buyer’s requirements.
        </p>
        <div className="cta-row reveal" style={delay(210)}>
          <DemoLink />
          <a className="btn btn--ghost" href="#demo-video">
            Watch the demo (2:30) <Arrow />
          </a>
        </div>
      </div>

      <div className="demo reveal" style={delay(320)} id="how" tabIndex={-1}>
        <div className="stage" ref={stageRef}>
          <DashboardPreview leadActive={demo.leadActive} viewing={demo.viewing} />
          <WhatsAppDemo messages={demo.messages} typing={demo.typing} />
          <LeadSummary revealed={demo.revealed} viewing={demo.viewing} reducedMotion={reducedMotion} />
        </div>
        <div className="demo__foot">
          <p className="demo__note">Illustrative demo · Sample data</p>
          <button className="replay" type="button" aria-label="Replay the demo" onClick={demo.replay}>
            <ReplayIcon />Replay
          </button>
        </div>
      </div>
    </section>
  );
}
