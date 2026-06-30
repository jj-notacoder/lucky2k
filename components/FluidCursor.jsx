'use client';

import { useEffect, useRef } from 'react';

/**
 * FluidCursor — smooth canvas "ribbon" that follows the pointer.
 * The native cursor is KEPT (this only draws a glowing red trail behind it).
 * A chain of points lerps toward the mouse each frame; the stroke is drawn as
 * one continuous, tapering, glowing curve and retracts to nothing when idle.
 */
const N = 20; // trail length (last ~20 points)
const BASE_WIDTH = 7;

export default function FluidCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // no trail on touch
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let active = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mouse = { x: -100, y: -100 };
    const pts = Array.from({ length: N }, () => ({ x: -100, y: -100 }));

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!active) {
        for (const p of pts) {
          p.x = mouse.x;
          p.y = mouse.y;
        }
        active = true;
      }
    };
    const onLeave = () => {
      mouse.x = -100;
      mouse.y = -100;
    };

    const loop = () => {
      // chain follow: head chases the mouse, each point chases the one ahead
      pts[0].x += (mouse.x - pts[0].x) * 0.45;
      pts[0].y += (mouse.y - pts[0].y) * 0.45;
      for (let i = 1; i < N; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.45;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.45;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#EF2E31';
      // NOTE: glow comes from a CSS drop-shadow on the <canvas> (cheap, GPU)
      // instead of per-stroke ctx.shadowBlur, which was starving the main thread.

      // one continuous tapering ribbon via quadratic midpoints
      for (let i = 1; i < N - 1; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        ctx.beginPath();
        ctx.lineWidth = Math.max(0.4, BASE_WIDTH * (1 - i / N));
        ctx.globalAlpha = Math.max(0, 1 - i / N);
        ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
        ctx.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ filter: 'drop-shadow(0 0 5px rgba(239,46,49,0.85))' }}
    />
  );
}
