'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Drops the sun 300px down by the time the user scrolls 600px.
  const sunScrollY = useTransform(scrollY, [0, 600], reduce ? [0, 0] : [0, 300]);

  return (
    <section id="hero" ref={heroRef} className="relative z-10 w-full h-[100dvh] overflow-hidden bg-[#FFC5D0]">
      {/* Z-20: FOREGROUND TEXT & LOGO (Viewport-based upper alignment) */}
      <div className="absolute top-[10vh] md:top-[12vh] left-0 right-0 flex flex-col items-center justify-start z-20 w-full pointer-events-none">
        {/* Main Logo */}
        <motion.img
          src="/donutfinal/logo.webp"
          alt={t('hero.logoAlt')}
          width={561}
          height={445}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-[240px] md:w-[320px] lg:w-[380px] object-contain pointer-events-auto transition-transform duration-300"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.8, delay: 0.2 }}
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Animated Subtitle (Dynamic EN/AR) */}
        <motion.img
          src={t('hero.subtitleImage')}
          alt={t('hero.subtitleAlt')}
          width={t('hero.subtitleWidth')}
          height={t('hero.subtitleHeight')}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          style={{ willChange: 'transform, opacity' }}
          className={`object-contain pointer-events-auto transition-all duration-300 ${t('hero.subtitleClass')}`}
        />
      </div>

      {/* Z-10: THE SETTING SUN */}
      {/* 1. Static Wrapper: Handles absolute centering AND the static Y-offset */}
      <div className="absolute bottom-0 inset-x-0 w-full flex justify-center translate-y-[20%] md:translate-y-[30%] z-10 pointer-events-none">
        {/* 2. Animated Container: ONLY handles the scroll physics (no Tailwind transforms) */}
        <motion.div
          style={{ y: sunScrollY, willChange: 'transform' }}
          className="w-[1200px] max-w-[100vw] h-[22vh] md:h-[28vh] flex justify-center transform-gpu"
        >
          <motion.img
            src="/donutfinal/sun.webp"
            alt={t('hero.sunAlt')}
            width={2384}
            height={947}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-top"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.3 }}
            style={{ willChange: 'transform, opacity' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
