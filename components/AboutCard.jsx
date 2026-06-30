'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Sparks from './Sparks';

const item = {
  hidden: { opacity: 0, y: 52 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } },
};

/**
 * AboutCard — premium rounded scene card.
 *  • Center-overlay Clarendon text.
 *  • Red border-2 and outer red glow.
 *  • 3D pointer tilt, hover sparks, and floating stickers.
 */
export default function AboutCard({
  img,
  centerText,
  badge,
  badgeAlt = '',
  badgeClass = '',
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      variants={item}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="about-card group relative [transform-style:preserve-3d]"
    >
      {/* card container */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#EF2E31] shadow-[0_0_20px_rgba(239,46,49,0.5)] transition-shadow duration-500 group-hover:shadow-[0_0_35px_rgba(239,46,49,0.85)] bg-white z-10 aspect-[16/10] h-full w-full">
        {/* card image */}
        <img
          src={img}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          draggable="false"
        />

        {/* centered black text overlay */}
        {centerText && (
          <div className="absolute inset-0 flex items-center justify-center text-center p-6 text-black font-['Clarendon'] font-black text-xl md:text-2xl lg:text-3xl leading-snug drop-shadow-md z-20 pointer-events-none">
            {centerText}
          </div>
        )}
      </div>

      {/* badge stamp (placed outside card boundary with z-30 so it floats on top of the border) */}
      {badge && (
        <img
          src={badge}
          alt={badgeAlt}
          className={`pointer-events-none absolute select-none z-30 ${badgeClass}`}
          draggable="false"
        />
      )}

      {/* hover sparks (neon pink / red) */}
      {hovered && (
        <div className="pointer-events-none absolute inset-0 z-40">
          <Sparks intense />
        </div>
      )}
    </motion.div>
  );
}
