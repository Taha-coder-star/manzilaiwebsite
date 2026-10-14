import { useEffect, useRef, useState } from "react";
import { buyerEnquiry } from "../data/showcase";

const times = [...new Set([
  ...buyerEnquiry.messages.map(item => item.at),
  ...buyerEnquiry.requirements.map(item => item.at),
  buyerEnquiry.duration,
])].sort((a, b) => a - b);

export default function useShowcaseSequence(reducedMotion) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (reducedMotion || started) return;
    if (!("IntersectionObserver" in window)) { setStarted(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.25 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion, started]);

  useEffect(() => {
    if (reducedMotion || !started) return;
    const timers = times.map(time => setTimeout(() => setElapsed(time), time));
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion, started, run]);

  return {
    ref,
    elapsed: reducedMotion ? buyerEnquiry.duration : elapsed,
    replay() { setElapsed(0); setStarted(true); setRun(value => value + 1); },
  };
}
