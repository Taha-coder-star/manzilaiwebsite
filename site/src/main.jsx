import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

const isOnboarding = /^\/onboarding\/?$/.test(window.location.pathname);
const isReviewQueue = /^\/onboarding-review\/?$/.test(window.location.pathname);
const Onboarding = lazy(() => import("./components/Onboarding"));
const ManzilReviewQueue = lazy(() => import("./components/ManzilReviewQueue"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isOnboarding || isReviewQueue ? (
      <Suspense fallback={<main aria-busy="true">Loading client setup…</main>}>
        {isReviewQueue ? <ManzilReviewQueue /> : <Onboarding />}
      </Suspense>
    ) : <App />}
  </StrictMode>
);
