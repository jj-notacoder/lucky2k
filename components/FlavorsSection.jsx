'use client';

import { motion, useReducedMotion } from 'framer-motion';
import FlavorCard from './FlavorCard';
import ScallopTransition from './ScallopTransition';
import { useIsMobileViewport } from '@/lib/useResponsivePerformance';
import { useLanguage } from '@/lib/i18n';

const FLAVORS = [
  { key: 'cinnamon', img: '/flavours/cinnamon.webp', tapes: ['tl', 'br'] },
  { key: 'chocolate', img: '/flavours/chocolate.webp', tapes: ['tr', 'bl'] },
  { key: 'orange', img: '/flavours/orange.webp', tapes: ['tl', 'br'] },
  { key: 'strawberry', img: '/flavours/strawberry.webp', tapes: ['tr', 'bl'] },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const CLOVERS = [
  { top: '6%', left: '3%', s: 90 }, { top: '9%', left: '34%', s: 64 },
  { top: '5%', left: '68%', s: 78 }, { top: '12%', right: '4%', s: 110 },
  { top: '26%', left: '14%', s: 70 }, { top: '30%', left: '52%', s: 58 },
  { top: '24%', right: '12%', s: 84 }, { top: '44%', left: '4%', s: 96 },
  { top: '40%', left: '40%', s: 60 }, { top: '46%', right: '6%', s: 72 },
  { top: '58%', left: '22%', s: 66 }, { top: '60%', left: '74%', s: 80 },
  { top: '70%', left: '8%', s: 74 }, { top: '72%', left: '48%', s: 58 },
  { top: '68%', right: '14%', s: 90 }, { bottom: '6%', left: '30%', s: 70 },
  { bottom: '4%', left: '60%', s: 64 }, { bottom: '10%', right: '5%', s: 86 },
];

export default function FlavorsSection() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const isMobile = useIsMobileViewport();
  const visibleClovers = reduce ? [] : CLOVERS.slice(0, isMobile ? 8 : CLOVERS.length);

  return (
    <section id="flavors" className="relative z-20 w-full candy-stripes pt-24 md:pt-32">
      <ScallopTransition />

      <div className="relative overflow-x-clip bg-transparent pb-24 md:pb-32">
        {visibleClovers.map((c, i) => (
          <motion.img
            key={i}
            src="/clover.webp"
            alt=""
            aria-hidden="true"
            width={557}
            height={448}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute z-0 select-none opacity-[0.32]"
            style={{ top: c.top, bottom: c.bottom, left: c.left, right: c.right, width: c.s, willChange: 'transform' }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.4 }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-16 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="w-full flex flex-col items-center justify-center text-center relative z-20 mb-8 md:mb-12"
          >
            <h2 className="font-['Impact'] italic uppercase text-white text-[clamp(3rem,14vw,3.75rem)] md:text-8xl drop-shadow-[0_0_15px_#EF2E31,0_0_30px_#EF2E31] tracking-wide leading-none max-md:font-['Impact']">
              {t('flavors.heading')}
            </h2>
            <div className="w-[80%] max-w-[500px] h-1 md:h-1.5 bg-white mx-auto my-4 shadow-[0_0_15px_rgba(239,46,49,0.8)]" />
            <p className="font-['Clarendon'] uppercase text-[#EF2E31] font-bold text-base md:text-xl tracking-[0.16em] md:tracking-[0.25em] leading-relaxed max-md:font-['Clarendon']">
              {t('flavors.eyebrow')}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="mt-14 md:mt-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-24 w-full max-w-7xl mx-auto z-10 transform-gpu"
          >
            {FLAVORS.map(({ key, ...f }) => (
              <FlavorCard
                key={key}
                {...f}
                flavorKey={key}
                title={t(`flavors.items.${key}.title`)}
                sub={t(`flavors.items.${key}.sub`)}
              />
            ))}
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-4xl mx-auto mt-20 md:mt-44 z-10">
              <FlavorCard
                wide
                img="/flavours/lucky.webp"
                title={t('flavors.luckyTitle')}
                sub={t('flavors.luckySub')}
                highIntensitySparks
                tapes={['tl', 'tr', 'bl', 'br']}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ willChange: 'transform, opacity' }}
            className="mt-14 md:mt-16 flex justify-center"
          >
            <a
              href="#game"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#EF2E31] bg-white/80 px-6 py-3 text-center ff-display font-bold italic text-[#EF2E31] shadow-[0_10px_30px_-8px_rgba(239,46,49,0.6)] transition-transform hover:-translate-y-1 text-[clamp(1rem,4.6vw,1.375rem)] touch-manipulation max-md:font-['Clarendon']"
            >
              {t('flavors.cta')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
