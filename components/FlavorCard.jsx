'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sparks from './Sparks';
import { useCanHover } from '@/lib/useResponsivePerformance';

const item = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function FlavorCard({
  img,
  title,
  sub,
  flavorKey,
  wide = false,
  highIntensitySparks = false,
  tapes = ['tl', 'br'],
}) {
  const canHover = useCanHover();
  const [hovered, setHovered] = useState(false);
  const [sparkKey, setSparkKey] = useState(0);

  const cardShadow = wide
    ? 'shadow-[0_0_80px_rgba(255,105,180,0.6),_0_20px_60px_rgba(239,46,49,0.8)]'
    : `shadow-[0_20px_50px_-12px_rgba(239,46,49,0.6)] ${canHover ? 'hover:shadow-[0_30px_60px_-12px_rgba(239,46,49,0.8)]' : ''} transition-shadow duration-500`;
  const [firstWord, ...restWords] = (title || '').split(' ');
  const restTitle = restWords.join(' ');

  return (
    <motion.div
      variants={item}
      className="flavor-card relative"
      onHoverStart={() => {
        if (!canHover) return;
        setHovered(true);
        setSparkKey((k) => k + 1);
      }}
      onHoverEnd={() => canHover && setHovered(false)}
      whileHover={canHover ? { y: -6, rotate: wide ? 0 : -1 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      style={{ willChange: 'transform, opacity' }}
    >
      {title && (
        <div className="mb-3 mobile-only-flex flex-col items-center rounded-xl border-2 border-[#EF2E31] bg-white/85 px-4 py-3 text-center shadow-[0_0_18px_rgba(239,46,49,0.28)] backdrop-blur-sm">
          <span className="font-['Impact'] text-[clamp(2rem,11vw,2.75rem)] leading-none text-[#EF2E31] tracking-wide">
            {title}
          </span>
          {sub && (
            <span className="mt-1 font-['Clarendon'] text-sm font-black uppercase tracking-[0.16em] text-[#EF2E31]">
              {sub}
            </span>
          )}
        </div>
      )}

      {wide ? (
        <div className="absolute -top-14 left-0 z-40 desktop-only-flex items-end gap-10 pointer-events-none">
          <span className="font-['Impact'] text-5xl xl:text-6xl text-[#EF2E31] tracking-wide">{title}</span>
          {sub && (
            <span className="font-['Clarendon'] text-sm xl:text-base font-bold text-[#EF2E31] mb-2 ml-4 tracking-[0.28em] uppercase">{sub}</span>
          )}
        </div>
      ) : flavorKey === 'cinnamon' ? (
        <>
          <div className="absolute bottom-full left-0 mb-1 md:mb-2 z-40 desktop-only-block pointer-events-none">
            <span className="font-['Impact'] text-4xl xl:text-5xl text-[#EF2E31] tracking-wide">{firstWord}</span>
          </div>
          <div className="absolute top-2 left-2 z-40 desktop-only-flex flex-col items-start leading-[0.88] pointer-events-none">
            <span className="font-['Impact'] text-3xl xl:text-4xl text-white drop-shadow-[0_4px_4px_rgba(239,46,49,0.85)] tracking-wide">{restTitle}</span>
            {sub && <span className="font-['Clarendon'] text-sm xl:text-base font-bold text-white drop-shadow-md mt-1">{sub}</span>}
          </div>
        </>
      ) : flavorKey === 'chocolate' ? (
        <>
          <div className="absolute bottom-2 left-2 z-40 desktop-only-block pointer-events-none">
            <span className="font-['Impact'] text-3xl xl:text-4xl text-white drop-shadow-[0_4px_4px_rgba(239,46,49,0.85)] tracking-wide">{firstWord}</span>
          </div>
          <div className="absolute top-full left-0 mt-1 md:mt-2 z-40 desktop-only-block pointer-events-none">
            <span className="font-['Impact'] text-4xl xl:text-5xl text-[#EF2E31] tracking-wide">{restTitle}</span>
          </div>
        </>
      ) : flavorKey === 'orange' ? (
        <>
          <div className="absolute bottom-full left-0 mb-1 md:mb-2 z-40 desktop-only-block pointer-events-none">
            <span className="font-['Impact'] text-4xl xl:text-5xl text-[#EF2E31] tracking-wide">{firstWord}</span>
          </div>
          <div className="absolute top-2 left-2 z-40 desktop-only-block pointer-events-none">
            <span className="font-['Impact'] text-3xl xl:text-4xl text-white drop-shadow-[0_4px_4px_rgba(239,46,49,0.85)] tracking-wide">{restTitle}</span>
          </div>
        </>
      ) : flavorKey === 'strawberry' ? (
        <>
          <div className="absolute bottom-2 left-2 z-40 desktop-only-block pointer-events-none">
            <span className="font-['Impact'] text-3xl xl:text-4xl text-white drop-shadow-[0_4px_4px_rgba(239,46,49,0.85)] tracking-wide">{firstWord}</span>
          </div>
          <div className="absolute top-full left-0 mt-1 md:mt-2 z-40 desktop-only-block pointer-events-none">
            <span className="font-['Impact'] text-4xl xl:text-5xl text-[#EF2E31] tracking-wide">{restTitle}</span>
          </div>
        </>
      ) : null}

      <div
        className={`glare relative z-10 rounded-[3px] border-2 border-[#EF2E31] bg-white ${cardShadow} ${
          wide ? 'aspect-[583/231]' : 'aspect-[169/217]'
        }`}
      >
        <img
          src={img}
          alt={title || 'Lucky flavour'}
          width={wide ? 583 : 169}
          height={wide ? 231 : 217}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          draggable="false"
        />
      </div>

      {wide && (
        <div className="pointer-events-none absolute inset-0 z-[15]">
          <Sparks constant intense />
        </div>
      )}

      {tapes.map((t) => (
        <div key={t} className={`tape tape--${t}`} />
      ))}

      {!wide && canHover && hovered && (
        <div className="absolute inset-0 z-30">
          <Sparks key={sparkKey} intense={highIntensitySparks} />
        </div>
      )}
    </motion.div>
  );
}
