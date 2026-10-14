import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { conversation, startDelayMs, replayDelayMs } from "../data/demo";

const FIELD_STAGGER_MS = 160; // fields revealed by the same step fade in one after another

/**
 * Drives the WhatsApp demo. The only state is `applied`, the number of conversation
 * steps that have happened so far; everything the UI shows (messages, typing bubble,
 * summary fields, active lead, viewing status) is derived from it.
 *
 * - Timers live in a ref and are cleared on replay, on unmount and when reduced
 *   motion changes.
 * - With reduced motion the finished scene is shown immediately, with no timers.
 * - The scene does not loop: it stays on the finished state until `replay()`.
 */
export default function useDemoSequence(reducedMotion) {
  const [applied, setApplied] = useState(() => (reducedMotion ? conversation.length : 0));
  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const run = useCallback(
    (firstDelay) => {
      clearTimers();
      setApplied(0);
      let at = firstDelay;
      conversation.forEach((step, i) => {
        timers.current.push(setTimeout(() => setApplied(i + 1), at));
        at += step.holdMs;
      });
    },
    [clearTimers]
  );

  useEffect(() => {
    if (reducedMotion) {
      clearTimers();
      setApplied(conversation.length);
    } else {
      run(startDelayMs);
    }
    return clearTimers;
  }, [reducedMotion, run, clearTimers]);

  const replay = useCallback(() => {
    if (!reducedMotion) run(replayDelayMs);
  }, [reducedMotion, run]);

  const view = useMemo(() => {
    const done = conversation.slice(0, applied);
    const last = done[done.length - 1];
    const revealed = {}; // field key -> transition delay (ms)
    done.forEach((step) => {
      (step.reveal || []).forEach((key, n) => {
        revealed[key] = reducedMotion ? 0 : n * FIELD_STAGGER_MS;
      });
    });
    return {
      messages: done.filter((s) => s.type !== "typing"),
      typing: last?.type === "typing",
      revealed,
      leadActive: done.some((s) => s.activate),
      viewing: done.some((s) => s.viewing),
    };
  }, [applied, reducedMotion]);

  return { ...view, replay };
}
