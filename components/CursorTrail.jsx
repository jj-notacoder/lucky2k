'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CursorTrail — fluid dark-pink trailing cursor.
 * A chain of circles springs toward the pointer with progressively softer
 * springs (more lag) and shrinking size/opacity, creating a comet-like trail.
 * The native cursor is hidden globally while this is mounted.
 */
const DOTS = [
  { size: 18, opacity: 0.95, stiffness: 700, damping: 30 },
  { size: 15, opacity: 0.7, stiffness: 350, damping: 28 },
  { size: 12, opacity: 0.55, stiffness: 250, damping: 26 },
  { size: 10, opacity: 0.42, stiffness: 180, damping: 24 },
  { size: 8, opacity: 0.32, stiffness: 130, damping: 22 },
  { size: 6, opacity: 0.22, stiffness: 90, damping: 20 },
];

function TrailDot({ x, y, cfg }) {
  const sx = useSpring(x, { stiffness: cfg.stiffness, damping: cfg.damping, mass: 0.5 });
  const sy = useSpring(y, { stiffness: cfg.stiffness, damping: cfg.damping, mass: 0.5 });
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ x: sx, y: sy }}>
      <div
        style={{
          width: cfg.size,
          height: cfg.size,
          marginLeft: -cfg.size / 2,
          marginTop: -cfg.size / 2,
          background: '#FF1493',
          opacity: cfg.opacity,
          borderRadius: '9999px',
          boxShadow: '0 0 8px rgba(255,20,147,0.8)',
        }}
      />
    </motion.div>
  );
}

export default function CursorTrail() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices

    setEnabled(true);
    document.documentElement.classList.add('hide-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });

    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.classList.remove('hide-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {DOTS.map((cfg, i) => (
        <TrailDot key={i} x={x} y={y} cfg={cfg} />
      ))}
    </>
  );
}
