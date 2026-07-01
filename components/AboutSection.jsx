'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AboutCard from './AboutCard';
import AboutVideo from './AboutVideo';
import ScallopTransition from './ScallopTransition';
import { useIsMobileViewport } from '@/lib/useResponsivePerformance';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.16 } } };

/* Twinkling star particles for atmosphere. */
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
    centerText: <span>Just doughnuts, <br /> a counter, and a little luck</span>,
    badge: null,
    textClass: '-translate-y-4 md:-translate-y-6',
  },
  {
    key: 'sunset',
    img: '/about/card2.webp',
    centerText: <span>Open from sunset, <br /> made for after-dark cravings</span>,
    badge: '/about/icon-time.webp',
    badgeAlt: 'Open after sunset, 7pm',
    badgeClass: '-bottom-6 -left-4 w-28 -rotate-6 md:w-32',
  },
  {
    key: 'mystery',
    img: '/about/card3.webp',
    centerText: <span>Weekly flavor <br /> announced on <br /> Instagram</span>,
    badge: '/about/icon-star.webp',
    badgeAlt: 'Weekly lucky flavor',
    badgeClass: 'top-1/2 -left-6 w-24 -translate-y-1/2 -rotate-12 md:w-28',
  },
  {
    key: 'mina',
    img: '/about/card4.webp',
    centerText: <span>Souq Al Mina, <br /> Mina Zayed, down <br /> by the sea</span>,
    badge: '/about/icon-location.webp',
    badgeAlt: 'See you in the Mina',
    badgeClass: '-bottom-6 -left-4 w-28 -rotate-6 md:w-32',
  },
];

export default function AboutSection() {
  const [clientDice, setClientDice] = useState([]);
  const reduce = useReducedMotion();
  const isMobile = useIsMobileViewport();

  useEffect(() => {
    // Generate 12 random dice positions client-side to prevent hydration mismatches
    if (reduce) {
      setClientDice([]);
      return;
    }

    const diceCount = isMobile ? 6 : 12;
    const diceArray = Array.from({ length: diceCount }).map((_, i) => ({
      top: (Math.random() * 80 + 10) + '%',
      left: (Math.random() * 90 + 5) + '%',
      size: Math.floor(Math.random() * 40) + 70, // 70px to 110px
      rotate: Math.floor(Math.random() * 30) - 15, // -15deg to 15deg
    }));
    setClientDice(diceArray);
  }, [isMobile, reduce]);

  return (
    <section id="about" className="relative z-20 w-full candy-stripes pt-24 md:pt-32">
      {/* CEILING-PINNED SCALLOP TRANSITION */}
      <ScallopTransition />

      <div className="relative overflow-x-clip bg-transparent pb-32 md:pb-40">
      {/* floating fuzzy dice */}
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
          className="pointer-events-none absolute z-0 select-none opacity-30 md:opacity-40"
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

      {/* twinkling sparkles */}
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
        {/* ===== center content: text (left) + video (right) ===== */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — text column */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="flex flex-col items-center text-center w-full"
          >
            <h2 className="neon-flavors ff-display mt-3 font-black italic uppercase leading-[0.9] text-[clamp(54px,9vw,108px)]">
              ABOUT US
            </h2>
            <div
              className="mt-4 h-1.5 w-2/3 rounded-full bg-white mx-auto"
              style={{ boxShadow: '0 0 10px #EF2E31, 0 0 20px #EF2E31, 0 0 30px #EF2E31' }}
            />
            <p className="mt-4 font-['Clarendon'] text-xl lg:text-2xl font-bold tracking-[0.22em] text-[#EF2E31] uppercase">
              NOT YOUR ORDINARY DOUGHNUTS
            </p>
            <p className="mt-8 max-w-xl font-['Lora'] font-bold text-xl md:text-2xl lg:text-3xl leading-relaxed text-[#5C0F10]">
              We&rsquo;re a small, no-fuss doughnut counter in Mina Zayed, a few steps from Marmellata. We open after
              sunset with a short menu of filled doughnuts — four regulars, and one lucky flavor that changes every week.
            </p>
            <p className="mt-6 font-['Clarendon'] text-lg lg:text-xl font-bold text-[#EF2E31]">
              Friday · Saturday · Sunday — sunset &rsquo;til sellout.
            </p>
          </motion.div>

          {/* RIGHT — illuminated video card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: 'transform, opacity' }}
          >
            <AboutVideo />
          </motion.div>
        </div>

        {/* ===== rounded 2x2 grid cards ===== */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="mt-32 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-40 md:grid-cols-2 md:gap-y-20"
        >
          {CARDS.map(({ key, ...c }) => (
            <AboutCard key={key} {...c} />
          ))}
        </motion.div>
      </div>
      </div>
    </section>
  );
}
