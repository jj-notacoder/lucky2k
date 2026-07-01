'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Sparks from './Sparks';
import { useCanHover } from '@/lib/useResponsivePerformance';

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
  textClass = '',
}) {
  const canHover = useCanHover();
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    if (!canHover) return;
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
  const badgeDimensions = badge?.includes('icon-time')
    ? { width: 207, height: 166 }
    : badge?.includes('icon-star')
      ? { width: 421, height: 388 }
      : { width: 339, height: 253 };

  return (
    <motion.div
      ref={ref}
      variants={item}
      onMouseMove={onMove}
      onMouseEnter={() => canHover && setHovered(true)}
      onMouseLeave={onLeave}
      style={
        canHover
          ? { rotateX, rotateY, transformPerspective: 1000, willChange: 'transform, opacity' }
          : { willChange: 'transform, opacity' }
      }
      className={`about-card relative [transform-style:preserve-3d] transform-gpu ${canHover ? 'group' : ''}`}
    >
      {/* card container */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border-2 border-[#EF2E31] shadow-[0_0_20px_rgba(239,46,49,0.5)] transition-shadow duration-500 group-hover:shadow-[0_0_35px_rgba(239,46,49,0.85)] bg-white z-10 aspect-[16/10] h-full w-full">
        {/* card image */}
        <img
          src={img}
          alt=""
          aria-hidden="true"
          width={438}
          height={284}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          draggable="false"
        />

        {/* centered black text overlay */}
        {centerText && (
          <div className={`absolute inset-0 flex items-center justify-center text-center px-5 sm:px-8 md:px-14 py-4 text-black font-['Clarendon'] font-black text-base sm:text-lg md:text-xl lg:text-2xl leading-snug drop-shadow-md z-20 pointer-events-none ${textClass}`}>
            {centerText}
          </div>
        )}
      </div>

      {/* badge stamp (placed outside card boundary with z-30 so it floats on top of the border) */}
      {badge && (
        <img
          src={badge}
          alt={badgeAlt}
          width={badgeDimensions.width}
          height={badgeDimensions.height}
          loading="lazy"
          decoding="async"
          className={`pointer-events-none absolute select-none z-30 ${badgeClass}`}
          draggable="false"
        />
      )}

      {/* hover sparks (neon pink / red) */}
      {canHover && hovered && (
        <div className="pointer-events-none absolute inset-0 z-40">
          <Sparks intense />
        </div>
      )}
    </motion.div>
  );
}
