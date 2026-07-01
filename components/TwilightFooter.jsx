'use client';

import { useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useIsMobileViewport } from '@/lib/useResponsivePerformance';

function seededValue(index, salt) {
  return Math.abs(Math.sin(index * 9301 + salt * 49297) * 233280) % 1;
}

export function TwilightFooter() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobileViewport();
  const particleCount = reduce ? 0 : isMobile ? 15 : 40;
  
  // Parallax Physics: Tracks the section as it enters the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });
  
  // Moon starts one viewport below, then rests at its native CSS anchor.
  const moonY = useTransform(scrollYProgress, [0, 1], reduce ? ["0px", "0px"] : ["100vh", "0px"]);
  const stars = useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => ({
        width: seededValue(i, 1) * 2 + 1,
        height: seededValue(i, 2) * 2 + 1,
        top: seededValue(i, 3) * 100,
        left: seededValue(i, 4) * 100,
        duration: seededValue(i, 5) * 3 + 2,
        delay: seededValue(i, 6) * 3,
      })),
    [particleCount]
  );

  return (
    <>
      {/* 1. Thick White Divider */}
      <div className="w-full h-3 md:h-4 bg-white relative z-50 shadow-sm" />

      <section 
        id="twilight-footer" 
        ref={sectionRef} 
        className="relative w-full h-[100dvh] overflow-hidden bg-[#FFC5D0] flex flex-col justify-between"
      >
        {/* 2. The Twilight Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90 pointer-events-none z-10" />

        {/* 3. The Starry Night (White Flecks) */}
        {stars.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full pointer-events-none z-20"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              willChange: 'transform, opacity',
            }}
            animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.3, 1] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}

        {/* 1. UPPER ZONE: The Neon Logo */}
        <div className="relative z-40 flex-1 flex flex-col items-center justify-center w-full px-4 pt-12 md:pt-20">
          <div className="relative flex items-center justify-center w-full max-w-lg md:max-w-3xl">
            {/* Ambient Red Glow */}
            <div className="absolute inset-0 bg-[#EF2E31]/40 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
            {/* The Logo */}
            <img
              src="/donutfinal/neonlogo-footer.webp"
              alt="Lucky 2000 Neon Logo"
              width={358}
              height={253}
              loading="lazy"
              decoding="async"
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(239,46,49,0.8)]"
            />
          </div>
        </div>

        {/* THE PARALLAX MOON (Adjusted for strict ceiling/non-overlap) */}
        <div className="absolute -bottom-12 md:-bottom-72 left-1/2 z-30 mb-16 md:mb-24 -translate-x-1/2 flex w-full justify-center pointer-events-none">
          <motion.img
            src="/donutfinal/moon.png"
            alt="Rising Moon"
            width={1419}
            height={464}
            loading="lazy"
            decoding="async"
            style={{ y: moonY, willChange: 'transform' }}
            className="w-[85vw] md:w-auto h-auto max-h-[35vh] md:max-h-[40vh] object-contain origin-bottom pointer-events-none transform-gpu"
          />
        </div>
      </section>
    </>
  );
}

export default TwilightFooter;
