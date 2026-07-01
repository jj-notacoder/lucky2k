'use client';

import { motion } from 'framer-motion';
import ScallopTransition from './ScallopTransition';
import { useLanguage } from '@/lib/i18n';

const MAP_LINK = 'https://maps.app.goo.gl/xCtYcEf1xkFP7oCC7';

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
    <div className="flex items-start gap-3 sm:gap-5">
      <motion.div
        className="shrink-0"
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform, opacity' }}
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="font-['Clarendon'] text-xl md:text-2xl font-black tracking-wide text-[#EF2E31]">
          {title}
        </h3>
        <p className="mt-2 font-['Lora'] text-base sm:text-lg font-bold leading-relaxed text-[#EF2E31] md:text-xl">
          {children}
        </p>
      </div>
    </div>
  );
}

export default function LocationSection() {
  const { t } = useLanguage();

  return (
    <section id="location" className="relative z-20 w-full candy-stripes pt-24 md:pt-32">
      {/* CEILING-PINNED SCALLOP TRANSITION */}
      <ScallopTransition />

      <div className="relative overflow-x-clip px-5 pt-16 pb-24 md:px-8 md:pt-20 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {/* STANDARDIZED HEADER: LOCATION */}
          <div className="w-full flex flex-col items-center justify-center text-center relative z-20 mb-12">
            <h2 className="font-['Impact'] italic uppercase text-white text-6xl md:text-8xl drop-shadow-[0_0_15px_#EF2E31,0_0_30px_#EF2E31] tracking-wide">
              {t('location.heading')}
            </h2>

            {/* The Glowing Underline */}
            <div className="w-[70%] max-w-[400px] h-1 md:h-1.5 bg-white mx-auto my-4 shadow-[0_0_15px_rgba(239,46,49,0.8)]"></div>

            <p className="font-['Clarendon'] uppercase text-[#EF2E31] font-bold text-base md:text-xl tracking-[0.16em] md:tracking-[0.25em] leading-relaxed">
              {t('location.eyebrow')}
            </p>
          </div>

          <div className="mt-10 md:mt-12 grid grid-cols-1 items-center gap-10 md:gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-8 md:gap-10">
              <DetailBlock title={t('location.title')} icon={<MapPinIcon />}>
                {t('location.address')}
              </DetailBlock>

              <DetailBlock title={t('location.hoursTitle')} icon={<ClockIcon />}>
                {t('location.hours')}
              </DetailBlock>
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('location.mapAria')}
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border-4 border-[#EF2E31] bg-[#FFC5D0] shadow-[0_0_20px_rgba(239,46,49,0.4)] transition-transform duration-300 hover:-translate-y-1 touch-manipulation"
            >
              <img
                src="/donutfinal/map.jpg"
                alt={t('location.mapAlt')}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
