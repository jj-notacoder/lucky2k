'use client';

import { motion } from 'framer-motion';
import FlavorCard from './FlavorCard';

const IG = 'https://www.instagram.com/luckytwothousand/';

const FLAVORS = [
  { key: 'cinnamon', img: '/flavours/cinnamon.jpg', title: 'Cinnamon Sugar', sub: '+ Vanilla Custard', tapes: ['tl', 'br'] },
  { key: 'chocolate', img: '/flavours/chocolate.jpg', title: 'Chocolate Hazelnut', tapes: ['tr', 'bl'] },
  { key: 'orange', img: '/flavours/orange.jpg', title: 'Orange Cardamom', tapes: ['tl', 'br'] },
  { key: 'strawberry', img: '/flavours/strawberry.jpg', title: 'Strawberries & Cream', tapes: ['tr', 'bl'] },
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
  return (
    <section id="flavors" className="relative w-full overflow-hidden candy-stripes py-24 md:py-32">
      <div className="scallop-top" />

      {/* dense, more-visible floating clovers */}
      {CLOVERS.map((c, i) => (
        <motion.img
          key={i}
          src="/clover.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute z-0 select-none opacity-[0.32]"
          style={{ top: c.top, bottom: c.bottom, left: c.left, right: c.right, width: c.s }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.4 }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          viewport={{ once: true, amount: 0.2 }}
          className="mt-28 md:mt-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24 w-full max-w-7xl mx-auto z-10"
        >
          {FLAVORS.map((f) => (
            <FlavorCard key={f.key} {...f} />
          ))}
        </motion.div>

        {/* lucky row — wide, constant sparks (grid updated) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-4xl mx-auto mt-44 z-10">
            <FlavorCard
              wide
              img="/flavours/lucky.jpg"
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
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 flex justify-center"
        >
          <a
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border-2 border-[#EF2E31] bg-white/70 px-8 py-3 ff-display font-bold italic text-[#EF2E31] shadow-[0_10px_30px_-8px_rgba(239,46,49,0.6)] transition-transform hover:-translate-y-1 text-[clamp(16px,2vw,22px)]"
          >
            Play for this week’s drop
          </a>
        </motion.div>
      </div>
    </section>
  );
}
