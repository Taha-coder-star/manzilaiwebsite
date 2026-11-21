import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AgencyBenefits from "./components/AgencyBenefits";
import DemoVideo from "./components/DemoVideo";
import Comparison from "./components/Comparison";
import Team from "./components/Team";
import Partners from "./components/Partners";
import HomepageClose, { SiteFooter } from "./components/HomepageClose";

export default function App() {
  // The page renders client-side, after the browser's own jump to a #fragment found nothing.
  useEffect(() => {
    const jump = () => location.hash && document.getElementById(location.hash.slice(1))?.scrollIntoView();
    (document.fonts?.ready ?? Promise.resolve()).then(jump);
  }, []);

  return (
    <>
      <a className="skip" href="#hero">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <AgencyBenefits />
        <DemoVideo />
        <Comparison />
        <Team />
        <Partners />
        <HomepageClose />
      </main>
      <SiteFooter />
    </>
  );
}
