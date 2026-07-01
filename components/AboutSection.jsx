'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AboutCard from './AboutCard';
import AboutVideo from './AboutVideo';
import ScallopTransition from './ScallopTransition';
import { useIsMobileViewport } from '@/lib/useResponsivePerformance';
import { useLanguage } from '@/lib/i18n';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.16 } } };

const SPARKLES = [
  { top: '10%', left: '12%', s: 16, d: 2.6 }, { top: '16%', left: '60%', s: 12, d: 3.2 },
  { top: '24%', left: '88%', s: 20, d: 2.2 }, { top: '38%', left: '30%', s: 14, d: 3.6 },
  { top: '46%', left: '70%', s: 18, d: 2.8 }, { top: '58%', left: '14%', s: 12, d: 3.0 },
  { top: '62%', left: '50%', s: 16, d: 2.4 }, { top: '72%', left: '84%', s: 14, d: 3.4 },
  { top: '82%', left: '22%', s: 18, d: 2.6 }, { top: '88%', left: '66%', s: 12, d: 3.1 },
  { top: '30%', left: '6%', s: 14, d: 2.9 }, { top: '52%', left: '94%', s: 16, d: 2.5 },
];

function Sparkle({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path
        d="M12 0c.6 5.4 2.6 7.4 8 8-5.4.6-7.4 2.6-8 8-.6-5.4-2.6-7.4-8-8 5.4-.6 7.4-2.6 8-8z"
        fill="#EF2E31"
      />
    </svg>
  );
}

const CARDS = [
  {
    key: 'counter',
    img: '/about/card1.webp',
    badge: null,
    textClass: 'md:-translate-y-6',
  },
  {
    key: 'sunset',
    img: '/about/card2.webp',
    badge: '/about/icon-time.webp',
    badgeClass: '-bottom-5 -left-3 w-24 -rotate-6 md:-bottom-6 md:-left-4 md:w-32',
  },
  {
    key: 'mystery',
    img: '/about/card3.webp',
    badge: '/about/icon-star.webp',
    badgeClass: 'top-1/2 -left-4 w-20 -translate-y-1/2 -rotate-12 md:-left-6 md:w-28',
  },
  {
    key: 'mina',
    img: '/about/card4.webp',
    badge: '/about/icon-location.webp',
    badgeClass: '-bottom-5 -left-3 w-24 -rotate-6 md:-bottom-6 md:-left-4 md:w-32',
  },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const [clientDice, setClientDice] = useState([]);
  const reduce = useReducedMotion();
  const isMobile = useIsMobileViewport();

  useEffect(() => {
    if (reduce) {
      setClientDice([]);
      return;
    }

    const diceCount = isMobile ? 6 : 12;
    const diceArray = Array.from({ length: diceCount }).map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 90 + 5}%`,
      size: Math.floor(Math.random() * 40) + 70,
      rotate: Math.floor(Math.random() * 30) - 15,
    }));
    setClientDice(diceArray);
  }, [isMobile, reduce]);

  return (
    <section id="about" className="relative z-20 w-full candy-stripes pt-24 md:pt-32">
      <ScallopTransition />

      <div className="relative overflow-x-clip bg-transparent pb-24 md:pb-40">
        {clientDice.map((d, i) => (
          <motion.img
            key={i}
            src="/about/fuzzy-die.webp"
            alt=""
            aria-hidden="true"
            width={577}
            height={433}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute z-0 select-none opacity-25 md:opacity-40"
            style={{
              top: d.top,
              left: d.left,
              width: d.size,
              rotate: `${d.rotate}deg`,
              willChange: 'transform',
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i % 7) * 0.4,
            }}
          />
        ))}

        {SPARKLES.map((sp, i) => (
          <motion.div
            key={`s${i}`}
            className="pointer-events-none absolute z-0"
            style={{ top: sp.top, left: sp.left }}
            animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.6, 1, 0.6], rotate: [0, 90, 0] }}
            transition={{ duration: sp.d, repeat: Infinity, ease: 'easeInOut', delay: (i % 6) * 0.5 }}
          >
            <Sparkle size={sp.s} />
          </motion.div>
        ))}

        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="w-full flex flex-col items-center justify-center text-center relative z-20 mb-12 md:mb-16"
          >
            <h2 className="font-['Impact'] italic uppercase text-white text-6xl md:text-8xl drop-shadow-[0_0_15px_#EF2E31,0_0_30px_#EF2E31] tracking-wide leading-none">
              {t('about.heading')}
            </h2>
            <div className="w-[80%] max-w-[500px] h-1 md:h-1.5 bg-white mx-auto my-4 shadow-[0_0_15px_rgba(239,46,49,0.8)]" />
            <p className="font-['Clarendon'] uppercase text-[#EF2E31] font-bold text-base md:text-xl tracking-[0.16em] md:tracking-[0.25em] leading-relaxed">
              {t('about.eyebrow')}
            </p>
          </motion.div>

          <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="flex w-full flex-col items-center text-center lg:items-start lg:text-left"
            >
              <p className="max-w-xl font-['Lora'] text-base font-bold leading-[1.65] text-[#5C0F10] sm:text-lg md:text-xl lg:text-2xl">
                {t('about.body')}
              </p>
              <p className="mt-5 font-['Clarendon'] text-base font-bold text-[#EF2E31] md:mt-6 md:text-lg lg:text-xl">
                {t('about.hours')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="w-full"
            >
              <AboutVideo />
            </motion.div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-32 md:grid-cols-2 md:gap-y-20 lg:mt-40"
          >
            {CARDS.map(({ key, ...c }) => (
              <AboutCard
                key={key}
                {...c}
                badgeAlt={t(`about.badgeAlts.${key}`)}
                centerText={<span>{t(`about.cards.${key}`)}</span>}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
