import { buyerEnquiry, showcaseFeatures } from "../data/showcase";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import useShowcaseSequence from "../hooks/useShowcaseSequence";
import { ReplayIcon } from "./Icons";
import mark from "../assets/manzil-mark-light.svg";
import "../styles/ProductShowcase.css";

function FeatureNavigation() {
  return (
    <div className="showcase__navigation">
      <div role="tablist" aria-label="Manzil demonstrations" className="showcase__tabs">
        {showcaseFeatures.map(feature => (
          <button key={feature.id} type="button" role="tab"
            id={`tab-${feature.id}`} aria-selected={feature.available}
            aria-controls={feature.available ? "panel-buyer-enquiries" : undefined}
            disabled={!feature.available} tabIndex={feature.available ? 0 : -1}
            onKeyDown={event => {
              // Only one tab is enabled in this review milestone.
              if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
                event.preventDefault(); event.currentTarget.focus();
              }
            }}>
            <span>{feature.label}</span>
            {!feature.available && <span className="showcase__pending">Soon</span>}
          </button>
        ))}
      </div>
      <p className="showcase__nav-note">Preview: Buyer enquiries.<br /> More demonstrations to follow.</p>
    </div>
  );
}

function ChatMessage({ message, visible }) {
  return (
    <li className={`showcase-message showcase-message--${message.sender}`} data-visible={visible}>
      <span className="showcase-message__sender">{message.sender === "buyer" ? buyerEnquiry.buyer : "Manzil AI"}</span>
      <p lang="ur-Latn">{message.text}</p>
    </li>
  );
}

function RequirementSummary({ elapsed }) {
  const complete = elapsed >= buyerEnquiry.duration;
  return (
    <div className="showcase-brief">
      <div className="showcase-brief__heading"><span className="showcase__small">The buyer brief</span><span className="showcase-brief__count">{buyerEnquiry.requirements.filter(item => elapsed >= item.at).length} / 4</span></div>
      <h4>A clear starting point.</h4>
      <dl>{buyerEnquiry.requirements.map(item => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd><span data-visible={elapsed >= item.at}>{item.value}</span><span className="showcase-brief__waiting" hidden={elapsed >= item.at}>Awaiting detail</span></dd>
        </div>
      ))}</dl>
      <p className="showcase-brief__status" data-complete={complete}>{complete ? "Requirements captured" : "Building the buyer brief"}</p>
    </div>
  );
}

export default function ProductShowcase() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, elapsed, replay } = useShowcaseSequence(reducedMotion);
  return (
    <section className="showcase" id="manzil-in-action" aria-labelledby="showcase-title">
      <div className="showcase__container">
        <header className="showcase__intro">
          <p className="showcase__label">Manzil in action</p>
          <h2 id="showcase-title">Your agency’s conversations,<br className="showcase__desktop-break" /> moving forward.</h2>
          <p className="showcase__support">Understand buyer requirements. Share relevant properties. Give your agents the context to take over.</p>
        </header>
        <div className="showcase__layout">
          <FeatureNavigation />
          <div className="showcase__panel" role="tabpanel" id="panel-buyer-enquiries" aria-labelledby="tab-buyer-enquiries" tabIndex={0}>
            <div className="showcase__explanation"><h3>{buyerEnquiry.heading}</h3><p>{buyerEnquiry.description}</p></div>
            <div className="showcase__demonstration" ref={ref}>
              <div className="showcase__demo-toolbar"><span>Example conversation & buyer brief</span>{!reducedMotion && <button type="button" onClick={replay} aria-label="Replay buyer enquiry demonstration"><ReplayIcon />Replay</button>}</div>
              <div className="showcase__scene" aria-hidden="true">
                <div className="showcase-chat">
                  <div className="showcase-chat__header"><span className="showcase-chat__mark"><img src={mark} alt="" /></span><div><strong>Manzil AI</strong><span>Property assistant · WhatsApp</span></div></div>
                  <ol>{buyerEnquiry.messages.map(message => <ChatMessage key={message.id} message={message} visible={elapsed >= message.at} />)}</ol>
                  <div className="showcase-chat__footer">Ayesha’s rental enquiry</div>
                </div>
                <RequirementSummary elapsed={elapsed} />
              </div>
              <div className="showcase__accessible">
                <h4>Example conversation and completed buyer brief</h4>
                <ol>{buyerEnquiry.messages.map(message => <li key={message.id}>{message.sender === "buyer" ? buyerEnquiry.buyer : "Manzil AI"}: <span lang="ur-Latn">{message.text}</span></li>)}</ol>
                <dl>{buyerEnquiry.requirements.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
              </div>
              <p className="showcase__result">From a few messages to the details your team needs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
