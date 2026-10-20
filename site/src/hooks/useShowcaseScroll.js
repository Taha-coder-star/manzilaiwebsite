import { useEffect, useRef, useState } from "react";

// One scroll coordinate owns both the selected role and the visible desktop
// chapter. Each read point is a finished, stationary state for role links.
export const CHAPTERS = Object.freeze({
  customer: { start: 0, read: 0.43, end: 0.5 },
  broker: { start: 0.5, read: 0.69, end: 0.75 },
  staff: { start: 0.75, read: 0.94, end: 1 },
});

const PIN_QUERY = "(min-width: 1201px) and (min-height: 900px) and (prefers-reduced-motion: no-preference)";
const clamp = value => Math.max(0, Math.min(1, value));
const chapterAt = progress => progress < CHAPTERS.broker.start ? 0 : progress < CHAPTERS.staff.start ? 1 : 2;

export default function useShowcaseScroll() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const sectionRefs = useRef([]);
  const [state, setState] = useState(() => ({
    pinned: window.matchMedia(PIN_QUERY).matches,
    progress: 0,
    active: 0,
  }));

  useEffect(() => {
    const media = window.matchMedia(PIN_QUERY);
    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      let progress = 0;
      let active = 0;
      if (media.matches) {
        const offset = parseFloat(getComputedStyle(stage).top) || 0;
        const start = track.getBoundingClientRect().top + window.scrollY - offset;
        const distance = Math.max(1, track.offsetHeight - stage.offsetHeight);
        progress = clamp((window.scrollY - start) / distance);
        active = chapterAt(progress);
      } else {
        const activationLine = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 68)
          + Math.min(190, window.innerHeight * 0.23);
        sectionRefs.current.forEach((section, index) => {
          if (section && section.getBoundingClientRect().top <= activationLine) active = index;
        });
      }
      setState(previous => previous.pinned === media.matches && previous.active === active
        && Math.abs(previous.progress - progress) < 0.0005
        ? previous : { pinned: media.matches, progress, active });
    };
    const request = () => { if (!disposed && !frame) frame = window.requestAnimationFrame(measure); };
    const observer = new ResizeObserver(request);
    observer.observe(trackRef.current);
    observer.observe(stageRef.current);
    sectionRefs.current.forEach(section => { if (section) observer.observe(section); });
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    media.addEventListener("change", request);
    document.fonts?.ready.then(request);
    const images = [...(stageRef.current?.querySelectorAll("img") || [])];
    images.forEach(image => image.addEventListener("load", request));
    request();
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      media.removeEventListener("change", request);
      images.forEach(image => image.removeEventListener("load", request));
    };
  }, []);

  const scrollToChapter = (index, behavior = "smooth") => {
    if (window.matchMedia(PIN_QUERY).matches) {
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      const offset = parseFloat(getComputedStyle(stage).top) || 0;
      const start = track.getBoundingClientRect().top + window.scrollY - offset;
      const distance = Math.max(1, track.offsetHeight - stage.offsetHeight);
      const point = [CHAPTERS.customer.read, CHAPTERS.broker.read, CHAPTERS.staff.read][index];
      window.scrollTo({ top: start + point * distance, behavior });
    } else {
      sectionRefs.current[index]?.scrollIntoView({ behavior, block: "start" });
    }
  };

  return { trackRef, stageRef, sectionRefs, ...state, scrollToChapter };
}
