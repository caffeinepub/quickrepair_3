import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to target over duration ms using requestAnimationFrame.
 * Only starts when `trigger` is true.
 */
export function useCountUp(target: number, duration: number = 1500, trigger: boolean = true): number {
  const [current, setCurrent] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!trigger || hasStarted.current) return;
    hasStarted.current = true;

    const animate = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, target, duration]);

  return current;
}
