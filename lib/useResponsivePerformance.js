'use client';

import { useEffect, useState } from 'react';

export function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(query.matches);

    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  return canHover;
}

export function useIsMobileViewport(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, [breakpoint]);

  return isMobile;
}
