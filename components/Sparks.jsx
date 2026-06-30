'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#FF69B4', '#ffffff', '#FF3333'];

/**
 * Sparks — particle burst.
 *  • default: one-shot burst on hover.
 *  • constant: infinite loop, sparks continuously popping off (Lucky card).
 */
export default function Sparks({ intense = false, constant = false }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const count = constant ? 20 : intense ? 18 : 7;

  // Stable random configs along the borders (Top, Right, Bottom, Left).
  const sparks = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const edge = Math.floor(Math.random() * 4); // 0 = top, 1 = right, 2 = bottom, 3 = left
        let startX = 0;
        let startY = 0;
        let animX = 0;
        let animY = 0;

        // How far they shoot out (in px) and spread perpendicular
        const dist = (constant || intense ? 20 : 10) + Math.random() * (constant || intense ? 30 : 15);
        const spread = (Math.random() * 20 - 10);

        switch (edge) {
          case 0: // Top
            startX = Math.random() * 100;
            startY = 0;
            animX = spread;
            animY = -dist;
            break;
          case 1: // Right
            startX = 100;
            startY = Math.random() * 100;
            animX = dist;
            animY = spread;
            break;
          case 2: // Bottom
            startX = Math.random() * 100;
            startY = 100;
            animX = spread;
            animY = dist;
            break;
          case 3: // Left
            startX = 0;
            startY = Math.random() * 100;
            animX = -dist;
            animY = spread;
            break;
        }

        return {
          startX,
          startY,
          animX,
          animY,
          size: (constant || intense ? 6 : 4) + Math.random() * (constant || intense ? 10 : 4),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          dur: 1.2 + Math.random() * 0.8,
          delay: Math.random() * (constant ? 1.5 : 0.15),
          repeatDelay: Math.random() * (constant ? 0.8 : 0),
        };
      }),
    [count, constant, intense]
  );

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {sparks.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 8px ${s.color}`,
            left: `${s.startX}%`,
            top: `${s.startY}%`,
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: constant ? 0 : 1,
            scale: constant ? 0 : 0.2
          }}
          animate={
            constant
              ? {
                  x: [0, s.animX],
                  y: [0, s.animY],
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0]
                }
              : {
                  x: s.animX,
                  y: s.animY,
                  opacity: 0,
                  scale: 1.2
                }
          }
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
