'use client';

import { useState } from 'react';

/**
 * PillNav — centered pill navigation. Each link fills into a solid pill on
 * hover, swapping its text colour. Matches the API used by Hero.jsx:
 * items=[{label,href}], baseColor, pillTextColor, hoveredPillTextColor.
 */
export default function PillNav({
  items = [],
  baseColor = '#EF2E31',
  pillTextColor = '#EF2E31',
  hoveredPillTextColor = '#FFC5D0',
}) {
  const [active, setActive] = useState(-1);

  return (
    <nav
      className="flex items-center gap-1 rounded-full border-2 px-1.5 py-1 backdrop-blur-sm"
      style={{ borderColor: baseColor }}
      aria-label="Primary"
    >
      {items.map((item, i) => (
        <a
          key={item.href}
          href={item.href}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(-1)}
          className="flex min-h-11 items-center rounded-full px-3 py-1.5 text-sm md:text-base font-bold whitespace-nowrap transition-colors duration-200 touch-manipulation"
          style={{
            color: active === i ? hoveredPillTextColor : pillTextColor,
            backgroundColor: active === i ? baseColor : 'transparent',
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
