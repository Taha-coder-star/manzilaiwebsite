import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AgencyBenefits from "./components/AgencyBenefits";

export default function App() {
  return (
    <>
      <a className="skip" href="#hero">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <AgencyBenefits />
      </main>
    </>
  );
}
