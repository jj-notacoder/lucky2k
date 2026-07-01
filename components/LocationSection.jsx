'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScallopTransition from './ScallopTransition';

const MAP_SRC =
  'https://www.google.com/maps?q=22%20Al%20Mutqin%20St%2C%20Zayed%20Port%2C%20Abu%20Dhabi&output=embed';

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0 text-[#EF2E31]" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.5a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0 text-[#EF2E31]" fill="none" aria-hidden="true">
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.5V12l3.2 2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DetailBlock({ icon, title, children }) {
  return (
    <div className="flex items-start gap-5">
      <motion.div
        className="shrink-0"
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform, opacity' }}
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="font-['Clarendon'] text-2xl font-black tracking-wide text-[#EF2E31]">
          {title}
        </h3>
        <p className="mt-2 font-['Lora'] text-lg font-bold leading-relaxed text-[#EF2E31] md:text-xl">
          {children}
        </p>
      </div>
    </div>
  );
}

export default function LocationSection() {
  const [luckyAddress] = useState('22 Al Mutqin St, Zayed Port, Abu Dhabi');
  const [luckyHours] = useState('Friday - Sunday, 7pm - 10pm');

  return (
    <section id="location" className="relative z-20 w-full bg-[#FFC5D0] pt-24 md:pt-32">
      {/* CEILING-PINNED SCALLOP TRANSITION */}
      <ScallopTransition />

      <div className="relative overflow-x-clip bg-[#FFC5D0] px-5 pt-16 pb-24 md:px-8 md:pt-20 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {/* STANDARDIZED HEADER: LOCATION */}
          <div className="w-full flex flex-col items-center justify-center text-center relative z-20 mb-12">
            <h2 className="font-['Impact'] italic uppercase text-white text-6xl md:text-8xl drop-shadow-[0_0_15px_#EF2E31,0_0_30px_#EF2E31] tracking-wide">
              LOCATION
            </h2>

            {/* The Glowing Underline */}
            <div className="w-[70%] max-w-[400px] h-1 md:h-1.5 bg-white mx-auto my-4 shadow-[0_0_15px_rgba(239,46,49,0.8)]"></div>

            <p className="font-['Clarendon'] uppercase text-[#EF2E31] font-bold text-lg md:text-xl tracking-[0.2em] md:tracking-[0.25em]">
              WHERE TO FIND US.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-10">
              <DetailBlock title="LOCATION" icon={<MapPinIcon />}>
                {luckyAddress}
              </DetailBlock>

              <DetailBlock title="HOURS" icon={<ClockIcon />}>
                {luckyHours}
              </DetailBlock>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-4 border-[#EF2E31] bg-[#FFC5D0] shadow-[0_0_20px_rgba(239,46,49,0.4)]">
              <iframe
                title="Lucky 2000 location map"
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale mix-blend-multiply opacity-80"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
