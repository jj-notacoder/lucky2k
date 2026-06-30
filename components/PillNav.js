'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCanHover } from '@/lib/useResponsivePerformance';
import './PillNav.css';

export default function PillNav({ items, baseColor = '#EF2E31', pillTextColor = '#EF2E31', hoveredPillTextColor = '#FFC5D0' }) {
  const canHover = useCanHover();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div 
      className="pill-nav transition-colors duration-300"
      onMouseLeave={() => canHover && setHoveredIndex(null)}
      aria-label="Primary"
    >
      <ul className="pill-list">
        {items.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <li key={item.href} className="relative">
              <a
                href={item.href}
                onMouseEnter={() => canHover && setHoveredIndex(idx)}
                className="pill relative px-5 py-2 text-sm md:text-base font-bold tracking-wider transition-colors duration-300 block"
                style={{
                  color: isHovered ? hoveredPillTextColor : pillTextColor,
                  zIndex: 10,
                }}
              >
                {/* Sliding Pill Background Bubble */}
                {canHover && isHovered && (
                  <motion.div
                    layoutId="sliding-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: baseColor,
                      zIndex: -1,
                      willChange: 'transform, opacity',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
