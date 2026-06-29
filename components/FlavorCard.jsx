'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sparks from './Sparks';

const item = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * FlavorCard — taped card with two-tone name, ambient under-glow, and sparks.
 * Standard cards spark on hover; the Lucky card sparks constantly + glows hard.
 */
export default function FlavorCard({
  img,
  title,
  sub,
  wide = false,
  highIntensitySparks = false,
  tapes = ['tl', 'br'],
}) {
  const [hovered, setHovered] = useState(false);
  const [sparkKey, setSparkKey] = useState(0);

  const [w1, ...rest] = (title || '').split(' ');
  const w2 = rest.join(' ');

  // Ambient diffused glow (no more flat hard shadow). Lucky = radioactive.
  const cardShadow = wide
    ? 'shadow-[0_0_80px_rgba(255,105,180,0.6),_0_20px_60px_rgba(239,46,49,0.8)]'
    : 'shadow-[0_20px_50px_-12px_rgba(239,46,49,0.6)] hover:shadow-[0_30px_60px_-12px_rgba(239,46,49,0.8)] transition-shadow duration-500';

  return (
    <motion.div
      variants={item}
      className="flavor-card relative"
      onHoverStart={() => { setHovered(true); setSparkKey((k) => k + 1); }}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, rotate: wide ? 0 : -1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      {/* flavor name — two-tone (solid red + white-with-red-stroke), top-left */}
      {title && (
        <div className={`pointer-events-none absolute z-20 -rotate-2 leading-[0.82] ${wide ? '-top-7 left-3' : '-top-5 left-1'}`}>
          <span className="ff-display block font-black uppercase text-[#EF2E31] text-3xl lg:text-4xl [text-shadow:1px_1px_0_rgba(255,255,255,0.5)]">
            {w1}
          </span>
          {w2 && (
            <span className="ff-display block font-black uppercase text-white text-3xl lg:text-4xl [-webkit-text-stroke:2px_#EF2E31]">
              {w2}
            </span>
          )}
          {sub && (
            <span className="ff-display mt-0.5 block font-bold uppercase text-[#EF2E31] text-xs lg:text-sm">
              {sub}
            </span>
          )}
        </div>
      )}

      {/* the card */}
      <div
        className={`glare relative z-10 rounded-[3px] border-2 border-[#EF2E31] bg-white ${cardShadow} ${
          wide ? 'aspect-[583/231]' : 'aspect-[169/217]'
        }`}
      >
        <img src={img} alt={title || 'Lucky flavour'} className="h-full w-full object-cover" draggable="false" />
      </div>

      {/* Lucky card: constant sparks popping off the card (above the image) */}
      {wide && (
        <div className="pointer-events-none absolute inset-0 z-[15]">
          <Sparks constant intense />
        </div>
      )}

      {/* translucent tape accents */}
      {tapes.map((t) => (
        <div key={t} className={`tape tape--${t}`} />
      ))}

      {/* standard cards: spark burst on hover (above the card) */}
      {!wide && hovered && (
        <div className="absolute inset-0 z-30">
          <Sparks key={sparkKey} intense={highIntensitySparks} />
        </div>
      )}
    </motion.div>
  );
}
