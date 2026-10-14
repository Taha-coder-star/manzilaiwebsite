import { useEffect } from "react";

/**
 * Scroll-linked motion for the hero illustration.
 * Writes a 0..1 `--p` CSS variable on the stage (used by CSS for the gentle
 * scale/parallax of the dashboard, phone and summary) and nudges the decorative
 * shapes. It updates styles directly through refs inside requestAnimationFrame
 * instead of React state, so scrolling never triggers re-renders.
 */
export default function useStageScroll(stageRef, shapesRef, disabled) {
  useEffect(() => {
    const stage = stageRef.current;
    const shapes = shapesRef.current ? Array.from(shapesRef.current.children) : [];
    if (!stage || disabled) return undefined;

    let ticking = false;
    const update = () => {
      ticking = false;
      const top = stage.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const p = (vh * 0.98 - top) / (vh * 0.6); // 0 as the stage enters, 1 once it has risen
      stage.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
      shapes.forEach((el, i) => {
        el.style.transform = `translateY(${(window.scrollY * (0.05 + i * 0.03)).toFixed(1)}px)`;
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      stage.style.removeProperty("--p");
      shapes.forEach((el) => { el.style.transform = ""; });
    };
  }, [stageRef, shapesRef, disabled]);
}
