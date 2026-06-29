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
      {/* flavor name — dynamic top-left/bottom-left broken-grid overlays */}
      {wide ? (
        <div className="absolute -top-14 left-0 z-40 flex items-end gap-10 pointer-events-none">
          <span className="font-['Impact'] text-5xl xl:text-6xl text-[#EF2E31] tracking-wide">LUCKY FLAVOR</span>
          <span className="font-['Clarendon'] text-sm xl:text-base font-bold text-[#EF2E31] mb-2 ml-4 tracking-[0.28em]">CHANGES EVERY WEEK</span>
        </div>
      ) : title && title.toLowerCase().includes('cinnamon') ? (
        <>
          {/* red words ABOVE the card with a small gap */}
          <div className="pointer-events-none absolute bottom-full mb-4 left-3 z-40 flex flex-col items-start leading-[0.82]">
            <span className="font-['Impact'] text-4xl xl:text-5xl text-[#EF2E31] tracking-wide">CINNAMON</span>
            <span className="font-['Impact'] text-4xl xl:text-5xl text-[#EF2E31] tracking-wide">SUGAR</span>
          </div>
          {/* white words INSIDE the card top with a gap from the border */}
          <div className="pointer-events-none absolute top-4 left-3 z-40 flex flex-col items-start leading-[0.88]">
            <span className="font-['Impact'] text-3xl xl:text-4xl text-white drop-shadow-[0_4px_4px_rgba(239,46,49,0.85)] tracking-wide">+VANILLA</span>
            <span className="font-['Impact'] text-3xl xl:text-4xl text-white drop-shadow-[0_4px_4px_rgba(239,46,49,0.85)] tracking-wide">CUSTARD</span>
          </div>
        </>
      ) : title && title.toLowerCase().includes('chocolate') ? (
        <>
          {/* white word INSIDE the card, lower area */}
          <span className="pointer-events-none absolute bottom-3 left-3 z-40 font-['Impact'] text-3xl xl:text-4xl text-white drop-shadow-[0_4px_4px_rgba(239,46,49,0.85)] tracking-wide">CHOCOLATE</span>
          {/* red word floats BELOW the card border with a gap */}
          <span className="pointer-events-none absolute left-3 top-full mt-4 z-40 font-['Impact'] text-4xl xl:text-5xl text-[#EF2E31] tracking-wide">HAZELNUT</span>
        </>
      ) : title && title.toLowerCase().includes('orange') ? (
        <>
          {/* red word ABOVE the card with a small gap */}
          <span className="pointer-events-none absolute bottom-full mb-4 left-3 z-40 font-['Impact'] text-4xl xl:text-5xl text-[#EF2E31] tracking-wide">ORANGE</span>
          {/* white word INSIDE the card top with a gap from the border */}
          <span className="pointer-events-none absolute top-4 left-3 z-40 font-['Impact'] text-3xl xl:text-4xl text-white drop-shadow-[0_4px_4px_rgba(239,46,49,0.85)] tracking-wide">CARDAMOM</span>
        </>
      ) : title && title.toLowerCase().includes('strawberr') ? (
        <>
          {/* white word sits INSIDE the card, lower area */}
          <span className="pointer-events-none absolute bottom-3 left-3 z-40 font-['Impact'] text-3xl xl:text-4xl text-white drop-shadow-[0_4px_4px_rgba(239,46,49,0.85)] tracking-wide">STRAWBERRIES</span>
          {/* red word floats BELOW the card border with a gap */}
          <span className="pointer-events-none absolute left-3 top-full mt-4 z-40 font-['Impact'] text-4xl xl:text-5xl text-[#EF2E31] tracking-wide">&amp; CREAM</span>
        </>
      ) : null}

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
