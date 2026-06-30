'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const IG = 'https://instagram.com/luckytwothousand';

/* Box → revealed flavor + image (5 = the lucky winner). */
const REVEAL = {
  1: { name: 'Cinnamon Sugar + Vanilla Custard', img: '/donutfinal/game-box1.png' },
  2: { name: 'Chocolate Hazelnut', img: '/donutfinal/game-box2.png' },
  3: { name: 'Orange Cardamom', img: '/donutfinal/game-box3.png' },
  4: { name: 'Strawberries & Cream', img: '/donutfinal/game-box4.png' },
  5: { name: 'Lucky Flavor!', img: '/donutfinal/game-box5.png' },
};

/* Slot-machine scatter — hardcoded → SSR-stable (no hydration drift). */
const SLOTS = [
  { top: '9%', left: '4%', s: 140, r: -8, d: 0 },
  { top: '16%', left: '83%', s: 170, r: 7, d: 0.6 },
  { top: '46%', left: '2%', s: 120, r: 5, d: 1.2 },
  { top: '54%', left: '87%', s: 150, r: -6, d: 0.3 },
  { top: '74%', left: '10%', s: 150, r: 8, d: 0.9 },
  { top: '80%', left: '78%', s: 125, r: -5, d: 1.5 },
];

/* Floating sparks scattered around the modal donut. */
const MODAL_SPARKS = [
  { top: '12%', left: '26%', s: 20, d: 0 },
  { top: '8%', left: '64%', s: 15, d: 0.4 },
  { top: '30%', left: '16%', s: 17, d: 0.8 },
  { top: '24%', left: '80%', s: 22, d: 0.3 },
  { top: '46%', left: '72%', s: 13, d: 0.6 },
  { top: '42%', left: '24%', s: 16, d: 1.0 },
];

function Sparkle({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path
        d="M12 0c.6 5.4 2.6 7.4 8 8-5.4.6-7.4 2.6-8 8-.6-5.4-2.6-7.4-8-8 5.4-.6 7.4-2.6 8-8z"
        fill="#EF2E31"
      />
    </svg>
  );
}

const boxContainer = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const boxItem = {
  hidden: { opacity: 0, y: 48, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

export default function GameSection() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [phase, setPhase] = useState(0); // 1 close-up · 2 title · 3 pan-out+float · 4 message

  const isLucky = selectedBox === 5;
  const data = selectedBox ? REVEAL[selectedBox] : null;

  /* cinematic phase timeline + Escape + scroll lock */
  useEffect(() => {
    if (!selectedBox) {
      setPhase(0);
      return;
    }
    setPhase(1);
    const timers = [
      setTimeout(() => setPhase(2), 1000), // title reveal
      setTimeout(() => setPhase(3), 2500), // pan-out + float
      setTimeout(() => setPhase(4), 3000), // message reveal
    ];
    const onKey = (e) => e.key === 'Escape' && setSelectedBox(null);
    window.addEventListener('keydown', onKey);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedBox]);

  return (
    <section id="game" className="relative w-full min-h-screen overflow-hidden candy-stripes py-24 md:py-28">
      <div className="scallop-top" />

      {/* background slot machines (z-0) */}
      {SLOTS.map((m, i) => (
        <motion.img
          key={i}
          src="/donutfinal/slotmachine.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute z-0 select-none opacity-25"
          style={{ top: m.top, left: m.left, width: m.s, rotate: `${m.r}deg` }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: m.d }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="neon-flavors font-['Clarendon'] font-black uppercase tracking-wide text-[clamp(48px,9vw,104px)] leading-[0.9]">
            Get Lucky
          </h2>
          <p className="mt-4 font-['Lora'] text-lg font-bold text-[#EF2E31] md:text-2xl">
            Take a chance on our weekly mystery drop.
          </p>
        </motion.div>

        {/* game board */}
        <div className="relative mt-14 md:mt-20">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[120%] w-[115%] -translate-x-1/2 -translate-y-1/2 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.75), rgba(255,180,200,0.35) 55%, transparent 75%)' }}
          />

          <motion.img
            src="/donutfinal/gameqmark.png"
            alt="Mystery"
            className="relative z-20 mx-auto mb-8 w-24 select-none drop-shadow-[0_8px_24px_rgba(239,46,49,0.5)] md:w-32"
            draggable="false"
            animate={{ scale: [1, 1.05, 1], y: [0, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* 5 boxes */}
          <motion.div
            variants={boxContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="relative z-20 mx-auto grid max-w-5xl grid-cols-5 gap-2 sm:gap-4"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <motion.button
                key={n}
                type="button"
                variants={boxItem}
                onClick={() => setSelectedBox(n)}
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                aria-label={`Open mystery box ${n}`}
                className="group relative outline-none"
              >
                <img
                  src="/donutfinal/gamebox.png"
                  alt=""
                  aria-hidden="true"
                  className="w-full select-none drop-shadow-[0_10px_18px_rgba(92,15,16,0.25)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_28px_rgba(255,105,180,0.95)]"
                  draggable="false"
                />
                {/* red selection tint on hover */}
                <div className="pointer-events-none absolute inset-0 z-10 rounded-lg bg-[#EF2E31]/40 opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100" />
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* summary card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-16 max-w-xl rounded-2xl border-2 border-[#EF2E31] bg-white/80 px-8 py-5 text-center shadow-[0_0_20px_rgba(239,46,49,0.5)] backdrop-blur-sm md:mt-20"
        >
          <p className="font-['Clarendon'] text-xl font-black uppercase tracking-wide text-[#EF2E31] md:text-2xl">
            4 Regulars. 1 Mystery Drop.
          </p>
        </motion.div>

        {/* back to top */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="rounded-full border-2 border-[#EF2E31] bg-white/70 px-8 py-3 font-['Clarendon'] text-base font-bold text-[#EF2E31] shadow-[0_10px_30px_-8px_rgba(239,46,49,0.6)] transition-transform hover:-translate-y-1 md:text-lg"
          >
            Back to Top ↑
          </button>
        </div>
      </div>

      {/* ---- cinematic modal (conditional render → instant, reliable unmount) ---- */}
      {selectedBox && data && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedBox(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex aspect-[16/9] w-full max-w-3xl flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#FFC5D0] p-6 shadow-2xl md:p-8"
            >
              {/* soft inner glow */}
              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{ background: 'radial-gradient(circle at 50% 42%, rgba(255,255,255,0.6), transparent 70%)' }}
              />

              {/* floating sparks (appear with the pan-out) */}
              {phase >= 3 &&
                MODAL_SPARKS.map((sp, i) => (
                  <div
                    key={i}
                    className="game-spark-pulse pointer-events-none absolute z-20"
                    style={{ top: sp.top, left: sp.left, animationDelay: `${sp.d}s` }}
                  >
                    <Sparkle size={sp.s} />
                  </div>
                ))}

              {/* donut — close-up → pan-out (Framer one-shot) → gentle float (CSS) */}
              <div className={`relative z-10 ${phase >= 3 ? 'game-float' : ''}`}>
                <motion.img
                  key={selectedBox}
                  src={data.img}
                  alt={data.name}
                  className="w-52 select-none md:w-64"
                  draggable="false"
                  initial={{ scale: 2, y: 0, opacity: 0 }}
                  animate={phase >= 3 ? { scale: 1, y: -40, opacity: 1 } : { scale: 2, y: 0, opacity: 1 }}
                  transition={{ duration: phase >= 3 ? 0.9 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* title (Clarendon, neon) */}
              <motion.h3
                className="relative z-30 mt-3 px-4 text-center font-['Clarendon'] font-bold leading-tight text-white drop-shadow-[0_0_20px_#EF2E31,0_0_40px_#EF2E31] text-2xl md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 12 }}
                animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {data.name}
              </motion.h3>

              {/* message + IG CTA (Lora) */}
              <motion.div
                className="relative z-30 mt-3 flex flex-col items-center px-4"
                initial={{ opacity: 0, y: 12 }}
                animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <p className="text-center font-['Lora'] text-base font-bold text-[#EF2E31] md:text-2xl">
                  {isLucky ? (
                    <>
                      You got lucky! <br /> Check this week&rsquo;s flavor on Instagram.
                    </>
                  ) : (
                    <>
                      No luck yet :( <br /> The weekly drop is hiding on Instagram.
                    </>
                  )}
                </p>
                <a
                  href={IG}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-40 mt-2 font-['Lora'] text-lg text-[#EF2E31] underline transition-colors hover:text-white md:text-xl"
                >
                  @luckytwothousand
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
      )}
    </section>
  );
}
