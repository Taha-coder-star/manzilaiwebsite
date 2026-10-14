import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductShowcase from "./components/ProductShowcase";
import RoleExplorer from "./components/RoleExplorer";

export default function App() {
  return (
    <>
      <a className="skip" href="#hero">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <RoleExplorer />
      </main>
    </>
  );
}
