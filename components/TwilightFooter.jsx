'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function TwilightFooter() {
  const sectionRef = useRef(null);
  
  // Parallax Physics: Tracks the section as it enters the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });
  
  // Moon starts hidden below its own bounds, then rests at its native CSS anchor.
  const moonY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <div className="relative w-full">
      {/* 1. Thick White Divider */}
      <div className="w-full h-3 md:h-4 bg-white relative z-50 shadow-sm" />

      <section 
        id="twilight-footer" 
        ref={sectionRef} 
        className="relative w-full h-[100vh] overflow-hidden bg-[#FFC5D0] flex flex-col justify-between"
      >
        {/* 2. The Twilight Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90 pointer-events-none z-10" />

        {/* 3. The Starry Night (White Flecks) */}
        {/* Render 40 static stars with pulsing animations */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full pointer-events-none z-20"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.3, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
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
              src="/donutfinal/neonlogo-footer.png"
              alt="Lucky 2000 Neon Logo"
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(239,46,49,0.8)]"
            />
          </div>
        </div>

        {/* 2. BOTTOM ZONE: The Parallax Moon */}
        <div className="relative z-30 w-full flex justify-center items-end mt-auto">
          <motion.img
            src="/donutfinal/moon.png"
            alt="Rising Moon"
            style={{ y: moonY }}
            className="w-[85%] md:w-[50%] max-w-2xl max-h-[35vh] object-contain object-bottom origin-bottom pointer-events-none"
          />
        </div>
      </section>
    </div>
  );
}

export default TwilightFooter;
