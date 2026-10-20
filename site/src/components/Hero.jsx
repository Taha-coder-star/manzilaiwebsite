import { useEffect, useRef } from "react";
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

  const demoRef = useRef(null);
  const stageRef = useRef(null);
  const shapesRef = useRef(null);
  const replayTimer = useRef(null);

  useStageScroll(stageRef, shapesRef, reducedMotion);
  useEffect(() => () => clearTimeout(replayTimer.current), []);

  // "See how it works": bring the demonstration into view, then replay it from the start
  const showDemo = (e) => {
    e.preventDefault();
    const el = demoRef.current;
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    el.focus({ preventScroll: true });
    clearTimeout(replayTimer.current);
    replayTimer.current = setTimeout(demo.replay, 500);
  };

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
          Answer property enquiries, share relevant listings, and connect interested buyers with your team.
        </p>
        <div className="cta-row reveal" style={delay(210)}>
          <DemoLink />
          <a className="btn btn--ghost" href="#how" onClick={showDemo}>
            See how it works <Arrow />
          </a>
        </div>
      </div>

      <div className="demo reveal" style={delay(320)} id="how" tabIndex={-1} ref={demoRef}>
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
