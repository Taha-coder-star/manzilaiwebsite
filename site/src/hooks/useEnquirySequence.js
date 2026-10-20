import { useLayoutEffect } from "react";

// A single schedule: each complete phrase/transfer finishes before the next starts.
const reveal = [{ opacity: 0 }, { opacity: 1 }];
const highlight = [
  { backgroundColor: "transparent" },
  { backgroundColor: "var(--sage-soft)", offset: .6 },
  { backgroundColor: "transparent" },
];
const travel = [
  { opacity: 1, strokeDashoffset: 0 },
  { opacity: 1, strokeDashoffset: -100 },
];
const steps = [
  { target: ".benefit-motion--message", duration: 320, frames: reveal },
  { target: ".benefit-term--dha", duration: 260, frames: highlight },
  { target: ".benefit-beam--dha", duration: 400, frames: travel, route: ".benefit-path--dha" },
  { target: ".benefit-motion--dha-chip", duration: 240, frames: reveal },
  { target: ".benefit-term--apartment", duration: 260, frames: highlight },
  { target: ".benefit-beam--apartment", duration: 400, frames: travel, route: ".benefit-path--apartment" },
  { target: ".benefit-motion--apartment-chip", duration: 240, frames: reveal },
  { target: ".benefit-path--budget", duration: 260, frames: reveal },
  { target: ".benefit-motion--budget", duration: 420, frames: [
    { opacity: 0, backgroundColor: "#fff4dd" },
    { opacity: 1, backgroundColor: "#f7e6bf", offset: .65 },
    { opacity: 1, backgroundColor: "#fff4dd" },
  ] },
];

export default function useEnquirySequence(visualRef, geometryReady, replayVersion) {
  useLayoutEffect(() => {
    const visual = visualRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animations = [];
    let observer;
    let disposed = false;
    const cancel = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
    };
    const finish = () => {
      cancel();
      visual.removeAttribute("data-enquiry-state");
    };
    const play = () => {
      if (disposed || motion.matches) return;
      observer?.disconnect();
      cancel();
      try {
        // All effects share this one clock, including the two decorative routes.
        const startTime = document.timeline.currentTime;
        let delay = 0;
        const animate = (selector, frames, options) => {
          const animation = visual.querySelector(selector).animate(frames, options);
          animations.push(animation);
          animation.startTime = startTime;
          return animation;
        };
        steps.forEach((step) => {
          if (step.route) {
            animate(step.route, reveal, { duration: 1, delay, fill: "forwards" });
          }
          animate(step.target, step.frames, {
            duration: step.duration,
            delay,
            // A beam exists only while travelling; all information stays visible.
            fill: step.route ? "none" : "forwards",
            easing: step.route ? "linear" : "ease-in-out",
          });
          delay += step.duration;
        });
        visual.dataset.enquiryState = "playing";
        const last = animations[animations.length - 1];
        last.finished.then(() => { if (!disposed) finish(); }).catch(() => {});
      } catch {
        // Unsupported/failed animation must never leave the text hidden.
        finish();
      }
    };
    const reduceMotion = () => {
      if (motion.matches) {
        observer?.disconnect();
        finish();
      }
    };
    try {
      if (geometryReady && !motion.matches && window.IntersectionObserver && Element.prototype.animate) {
        observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= .45)) play();
        }, { threshold: .45 });
        observer.observe(visual);
        visual.dataset.enquiryState = "ready";
        if (replayVersion > 0) play();
      }
      motion.addEventListener("change", reduceMotion);
    } catch {
      observer?.disconnect();
      finish();
    }
    return () => {
      disposed = true;
      observer?.disconnect();
      motion.removeEventListener("change", reduceMotion);
      finish();
    };
  }, [visualRef, geometryReady, replayVersion]);
}
