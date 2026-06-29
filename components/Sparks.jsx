'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#FF69B4', '#ffffff', '#FF3333'];

/**
 * Sparks — particle burst.
 *  • default: one-shot burst on hover.
 *  • constant: infinite loop, sparks continuously popping off (Lucky card).
 */
export default function Sparks({ intense = false, constant = false }) {
  const count = constant ? 20 : intense ? 18 : 7;

  // Stable random configs so positions don't jump on re-render.
  const sparks = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.7;
        const dist = (constant || intense ? 150 : 80) * (0.5 + Math.random());
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          size: (constant || intense ? 7 : 5) + Math.random() * (constant || intense ? 11 : 5),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          dur: 1.2 + Math.random() * 0.8,
          delay: Math.random() * 1.5,
          repeatDelay: Math.random(),
        };
      }),
    [count, constant, intense]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
      {sparks.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ width: s.size, height: s.size, background: s.color, boxShadow: `0 0 8px ${s.color}` }}
          initial={{ x: 0, y: 0, opacity: constant ? 0 : 1, scale: constant ? 0 : 0 }}
          animate={{ x: [0, s.x], y: [0, s.y], opacity: [1, 0], scale: [1, 0] }}
          transition={
            constant
              ? { duration: s.dur, repeat: Infinity, repeatDelay: s.repeatDelay, ease: 'easeOut', delay: s.delay }
              : {
                  duration: intense ? 0.95 : 0.65,
                  ease: 'easeOut',
                  ...(intense ? { type: 'spring', stiffness: 260, damping: 12 } : {}),
                }
          }
        />
      ))}
    </div>
  );
}
