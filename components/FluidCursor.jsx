'use client';

import React, { useEffect, useRef } from 'react';

/**
 * FluidCursor — Awwwards-level DOM-based chase ribbon cursor.
 *  • N=18 div nodes trailing the pointer using 0.42 lerp math.
 *  • Scale decay: 18px down to 3px (18 - 15 * t).
 *  • 60fps requestAnimationFrame loop running directly on DOM refs (no React state updates).
 */
export default function FluidCursor() {
  const cursorRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ptsRef = useRef([]);
  const dotsRef = useRef([]);
  const rafIdRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // skip reduced motion

    const container = cursorRef.current;
    if (!container) return;

    const N = 18;
    ptsRef.current = Array.from({ length: N }).map(() => ({ x: -100, y: -100 }));
    dotsRef.current = [];

    // Initialize DOM nodes directly for maximum performance
    for (let i = 0; i < N; i++) {
      const d = document.createElement('div');
      d.className = 'awk-grain';
      d.style.background = 'radial-gradient(closest-side, rgba(239, 46, 49, 0.35), transparent 72%)';
      container.appendChild(d);
      dotsRef.current.push(d);
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -100;
      mouseRef.current.y = -100;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const loop = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const pts = ptsRef.current;
      const dots = dotsRef.current;

      if (pts.length > 0) {
        // Lead point chases mouse
        pts[0].x += (mx - pts[0].x) * 0.42;
        pts[0].y += (my - pts[0].y) * 0.42;

        // Remaining points chase the point in front of them
        for (let i = 1; i < N; i++) {
          pts[i].x += (pts[i - 1].x - pts[i].x) * 0.42;
          pts[i].y += (pts[i - 1].y - pts[i].y) * 0.42;
        }

        // Apply scale decay, translate positions and set opacities
        for (let i = 0; i < N; i++) {
          const dot = dots[i];
          const pt = pts[i];
          if (!dot || !pt) continue;

          const t = i / (N - 1);
          const size = 18 - 15 * t; // scale decay from 18px down to 3px

          dot.style.width = `${size}px`;
          dot.style.height = `${size}px`;
          dot.style.transform = `translate3d(${pt.x - size / 2}px, ${pt.y - size / 2}px, 0)`;

          // Set dataset target and opacity
          const tgtOpacity = (0.3 * (1 - t) + 0.05).toFixed(3);
          dot.dataset.tgt = tgtOpacity;
          dot.style.opacity = tgtOpacity;
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
