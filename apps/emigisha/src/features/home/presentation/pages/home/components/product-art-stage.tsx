'use client';

import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';

/** Hovering again within this window does not restart the drawing */
const REPLAY_COOLDOWN_MS = 2500;

/**
 * Holds a product drawing and plays its animation once, when the tile scrolls into view. Hovering the tile with a
 * mouse plays it again. Without JavaScript, or with reduced motion, the drawing stays in its finished state.
 *
 * The motion state lives in `data-motion` on the stage (`armed` holds every animation at its first frame, `play`
 * runs them); the keyframes are in globals.css under "Product drawings".
 */
export function ProductArtStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const lastPlayRef = useRef(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    stage.dataset.motion = 'armed';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stage.dataset.motion = 'play';
          lastPlayRef.current = Date.now();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(stage);

    const tile = stage.parentElement;
    const replay = (event: PointerEvent) => {
      const now = Date.now();

      if (event.pointerType !== 'mouse' || stage.dataset.motion !== 'play' || now - lastPlayRef.current < REPLAY_COOLDOWN_MS) {
        return;
      }

      lastPlayRef.current = now;
      setRun((count) => count + 1);
    };
    tile?.addEventListener('pointerenter', replay);

    return () => {
      observer.disconnect();
      tile?.removeEventListener('pointerenter', replay);
    };
  }, []);

  return (
    <div ref={stageRef} aria-hidden className="mt-auto flex items-end justify-center pt-6">
      <Fragment key={run}>{children}</Fragment>
    </div>
  );
}
