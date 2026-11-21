import DemoLink from "./DemoLink";
import { DEMO_URL, PRIVACY_URL } from "../config";
import mark from "../assets/manzil-mark-dark.svg";
import "../styles/HomepageClose.css";

const questions = [
  {
    title: "Can we use our agency’s WhatsApp number?",
    answer: "Manzil AI is designed to answer enquiries on your agency’s WhatsApp. In the demo, we’ll go through your current number and what setup would involve.",
  },
  {
    title: "How do our properties get into Manzil AI?",
    answer: "Manzil AI matches buyers to your agency’s listings. In the demo, we’ll discuss how to bring in your existing listings. Your staff can send listing updates over WhatsApp, which Manzil AI turns into drafts for agency review.",
  },
  {
    title: "When does my broker take over?",
    answer: "When a buyer needs a broker, for example to arrange a viewing, Manzil AI passes along the buyer’s requirements and latest question so the broker can pick up the conversation on WhatsApp.",
  },
  {
    title: "How do we get started, and what does it cost?",
    answer: "Request a demo on WhatsApp. We’ll walk through a buyer enquiry and broker handoff, then discuss setup and pricing for your agency.",
  },
];

export default function HomepageClose() {
  return (
    <div className="homepage-close">
      <section className="launch-faq" id="faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Getting started with Manzil AI</h2>
        <div className="launch-faq__items">
          {questions.map(({ title, answer }) => (
            <details key={title}>
              <summary>{title}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="launch-demo" aria-labelledby="launch-demo-title">
        <h2 id="launch-demo-title">See how Manzil AI would handle an enquiry for your agency</h2>
        <DemoLink />
      </section>
    </div>
  );
}

export function SiteFooter() {
  const contactUrl = DEMO_URL.split(/[?#]/, 1)[0];

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="brand" href="#hero">
          <img src={mark} alt="" width="22" height="27" />
          <span>Manzil AI</span>
        </a>
        <div className="site-footer__links">
          {contactUrl && <a href={contactUrl}>Contact on WhatsApp</a>}
          {PRIVACY_URL && <a href={PRIVACY_URL}>Privacy policy</a>}
        </div>
      </div>
    </footer>
  );
}
