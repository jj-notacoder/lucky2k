'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

const boxContainer = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const boxItem = {
  hidden: { opacity: 0, y: 48, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

export default function GameSection() {
  const [selectedBox, setSelectedBox] = useState(null);

  const isLucky = selectedBox === 5;
  const data = selectedBox ? REVEAL[selectedBox] : null;

  /* Escape closes the modal; the card itself links out to Instagram. */
  useEffect(() => {
    if (!selectedBox) return undefined;
    const onKey = (e) => e.key === 'Escape' && setSelectedBox(null);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedBox]);

  return (
    <section id="game" className="relative w-full overflow-hidden candy-stripes pb-12 md:pb-16">
      {/* CUSTOM IMAGE TRANSITION (About to Get Lucky) */}
      <div className="relative z-30 h-[116px] w-full overflow-hidden pointer-events-none md:h-[168px]">
        <div className="absolute inset-x-0 top-0 z-10 h-1 bg-[#EF2E31]" />
        <div className="absolute inset-x-0 top-2 z-10 h-1 bg-[#EF2E31]" />
        <img
          src="/donutfinal/top of flavours.png"
          alt="Scalloped Transition"
          className="block w-full h-auto -translate-y-[20%]"
        />
      </div>

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

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-12 md:pt-16">
        {/* STANDARDIZED HEADER: GET LUCKY */}
        <div className="w-full flex flex-col items-center justify-center text-center relative z-20 mb-8 md:mb-12">
          <h2 className="font-['Impact'] italic uppercase text-white text-6xl md:text-8xl drop-shadow-[0_0_15px_#EF2E31,0_0_30px_#EF2E31] tracking-wide">
            GET LUCKY
          </h2>

          {/* The Glowing Underline */}
          <div className="w-[80%] max-w-[500px] h-1 md:h-1.5 bg-white mx-auto my-4 shadow-[0_0_15px_rgba(239,46,49,0.8)]"></div>

          <p className="font-['Clarendon'] uppercase text-[#EF2E31] font-bold text-lg md:text-xl tracking-[0.2em] md:tracking-[0.25em]">
            TAKE A CHANCE ON OUR WEEKLY MYSTERY DROP
          </p>
        </div>

        {/* game board */}
        <div className="relative mt-6 md:mt-8">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[120%] w-[115%] -translate-x-1/2 -translate-y-1/2 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.75), rgba(255,180,200,0.35) 55%, transparent 75%)' }}
          />

          <div className="my-4 md:my-6 flex justify-center z-20 relative">
            <motion.img
              src="/donutfinal/gameqmark.png"
              alt="Mystery"
              className="w-20 md:w-24 select-none drop-shadow-[0_8px_24px_rgba(239,46,49,0.5)]"
              draggable="false"
              animate={{ scale: [1, 1.05, 1], y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* 5 boxes */}
          <motion.div
            variants={boxContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
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
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-8 md:mt-10 max-w-xl rounded-2xl border-2 border-[#EF2E31] bg-white/80 px-8 py-5 text-center shadow-[0_0_20px_rgba(239,46,49,0.5)] backdrop-blur-sm"
        >
          <p className="font-['Clarendon'] text-xl font-black uppercase tracking-wide text-[#EF2E31] md:text-2xl">
            4 Regulars. 1 Mystery Drop.
          </p>
        </motion.div>
      </div>

      {/* ---- cinematic modal (clickable card, responsive content stack) ---- */}
      <AnimatePresence>
        {selectedBox && data && (
          <motion.div
            key="game-modal"
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedBox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <motion.a
              href={IG}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open ${data.name} on Instagram`}
              className="relative w-full max-w-2xl bg-[#FFC5D0] rounded-3xl shadow-[0_0_40px_rgba(239,46,49,0.5)] border-4 border-[#EF2E31] p-6 md:p-8 flex flex-col items-center justify-center gap-4 md:gap-6 overflow-hidden cursor-pointer group"
              initial={{ scale: 1.1, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{ background: 'radial-gradient(circle at 50% 42%, rgba(255,255,255,0.6), transparent 70%)' }}
              />

              <motion.img
                src={data.img}
                alt="Flavor"
                className="relative z-10 w-full h-auto max-h-[40vh] md:max-h-[50vh] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                draggable="false"
              />

              <h2 className="relative z-10 font-['Clarendon'] text-3xl md:text-5xl text-center text-white drop-shadow-[0_0_15px_#EF2E31,0_0_30px_#EF2E31] font-bold leading-tight mt-2">
                {data.name}
              </h2>

              <div className="relative z-10 text-center">
                <p className="font-['Lora'] text-lg md:text-xl text-[#EF2E31] font-bold">
                  {isLucky
                    ? "You got lucky! Check this week's flavor on Instagram."
                    : 'No luck yet. The weekly drop is hiding on Instagram.'}
                </p>
                <p className="font-['Lora'] text-base md:text-lg text-[#EF2E31] underline mt-1">
                  Tap to view on @luckytwothousand
                </p>
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
