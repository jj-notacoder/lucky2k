'use client';

import { motion, useReducedMotion } from 'framer-motion';
import FlavorCard from './FlavorCard';
import { useIsMobileViewport } from '@/lib/useResponsivePerformance';

const IG = 'https://www.instagram.com/luckytwothousand/';

const FLAVORS = [
  { key: 'cinnamon', img: '/flavours/cinnamon.webp', title: 'Cinnamon Sugar', sub: '+ Vanilla Custard', tapes: ['tl', 'br'] },
  { key: 'chocolate', img: '/flavours/chocolate.webp', title: 'Chocolate Hazelnut', tapes: ['tr', 'bl'] },
  { key: 'orange', img: '/flavours/orange.webp', title: 'Orange Cardamom', tapes: ['tl', 'br'] },
  { key: 'strawberry', img: '/flavours/strawberry.webp', title: 'Strawberries & Cream', tapes: ['tr', 'bl'] },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

/* Dense scatter of background clovers (hardcoded → SSR-stable, no hydration drift). */
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
  const reduce = useReducedMotion();
  const isMobile = useIsMobileViewport();
  const visibleClovers = reduce ? [] : CLOVERS.slice(0, isMobile ? 8 : CLOVERS.length);

  return (
    <section id="flavors" className="relative z-20 w-full overflow-x-clip candy-stripes pb-24 md:pb-32">
      {/* CUSTOM IMAGE TRANSITION (Hero to Flavors) */}
      <div className="relative z-30 h-[116px] w-full overflow-hidden pointer-events-none md:h-[168px]">
        <div className="absolute inset-x-0 top-0 z-10 h-1 bg-[#EF2E31]" />
        <div className="absolute inset-x-0 top-2 z-10 h-1 bg-[#EF2E31]" />
        <img
          src="/donutfinal/top of flavours.webp"
          alt="Scalloped Transition"
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto -translate-y-[20%]"
        />
      </div>

      {/* dense, more-visible floating clovers */}
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
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center"
        >
          <p className="font-['Clarendon'] text-xl lg:text-2xl font-bold tracking-widest text-[#EF2E31]">
            DOUGHNUTS BUT ABU DHABI
          </p>
          <h2 className="neon-flavors ff-display mt-3 font-black italic tracking-wide text-[clamp(42px,8vw,88px)]">
            THE FLAVORS
          </h2>
          <div className="h-1.5 w-3/4 mx-auto bg-white rounded-full shadow-[0_0_10px_#EF2E31,0_0_20px_#EF2E31,0_0_30px_#EF2E31] mt-4"></div>
        </motion.div>

        {/* top row — 4 flavours (grid updated) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="mt-28 md:mt-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24 w-full max-w-7xl mx-auto z-10 transform-gpu"
        >
          {FLAVORS.map(({ key, ...f }) => (
            <FlavorCard key={key} {...f} />
          ))}
        </motion.div>

        {/* lucky row — wide, constant sparks (grid updated) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-4xl mx-auto mt-44 z-10">
            <FlavorCard
              wide
              img="/flavours/lucky.webp"
              title="Lucky Flavor"
              sub="Changes every week"
              highIntensitySparks
              tapes={['tl', 'tr', 'bl', 'br']}
            />
          </div>
        </motion.div>

        {/* CTA button (cursor arrow removed) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ willChange: 'transform, opacity' }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#game"
            className="inline-block rounded-full border-2 border-[#EF2E31] bg-white/70 px-8 py-3 ff-display font-bold italic text-[#EF2E31] shadow-[0_10px_30px_-8px_rgba(239,46,49,0.6)] transition-transform hover:-translate-y-1 text-[clamp(16px,2vw,22px)]"
          >
            Play for this week’s drop
          </a>
        </motion.div>
      </div>
    </section>
  );
}
