import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

const isOnboarding = /^\/onboarding\/?$/.test(window.location.pathname);
const Onboarding = lazy(() => import("./components/Onboarding"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isOnboarding ? (
      <Suspense fallback={<main aria-busy="true">Loading client setup…</main>}>
        <Onboarding />
      </Suspense>
    ) : <App />}
  </StrictMode>
);
