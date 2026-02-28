import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Tracks cumulative scroll activity time in seconds.
 * Only counts time while the user is actively scrolling.
 */
export function useScrollTimer() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const lastScrollTime = useRef<number | null>(null);
  const accumulatedTime = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    if (isScrolling.current && lastScrollTime.current !== null) {
      const now = performance.now();
      const delta = now - lastScrollTime.current;
      lastScrollTime.current = now;
      accumulatedTime.current += delta;
      setElapsedSeconds(Math.floor(accumulatedTime.current / 1000));
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling.current) {
        isScrolling.current = true;
        lastScrollTime.current = performance.now();
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
        lastScrollTime.current = null;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [tick]);

  const reset = useCallback(() => {
    accumulatedTime.current = 0;
    setElapsedSeconds(0);
    isScrolling.current = false;
    lastScrollTime.current = null;
  }, []);

  return { elapsedSeconds, reset };
}
