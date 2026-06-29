'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillNav from './PillNav';

gsap.registerPlugin(ScrollTrigger);

const IG = 'https://www.instagram.com/luckytwothousand/';

export default function Hero() {
  const heroRef = useRef(null);
  const sunRef = useRef(null);
  const reduce = useReducedMotion();

  // Scroll Progress Hooks
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // State Management
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isPastHero, setIsPastHero] = useState(false);

  // Scroll Listener via MotionValue Event
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > window.innerHeight * 0.8) {
      setIsPastHero(true);
    } else {
      setIsPastHero(false);
    }

    if (latest > 50) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP ScrollTrigger (yPercent: 100, scrub: true) on the Setting Sun wrapper.
      if (sunRef.current) {
        gsap.set(sunRef.current, { xPercent: -50, x: 0 });
        gsap.to(sunRef.current, {
          yPercent: 100,
          xPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative w-full h-screen overflow-hidden bg-[#FFC5D0]">
      
      {/* INDEPENDENT SCROLL PROGRESS BAR - Z-[60] */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#EF2E31] origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* INVISIBLE HOVER TRIGGER */}
      <div 
        className="fixed top-0 left-0 right-0 h-16 z-50"
        onMouseEnter={() => setIsNavVisible(true)}
      />

      {/* THE SMART NAVBAR (CSS GRID REFACTOR) */}
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: isNavVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseLeave={() => { if (scrollY.get() > 50) setIsNavVisible(false); }}
        className="fixed top-0 w-full h-20 z-[55] grid grid-cols-3 items-center px-6 md:px-10 bg-[#FFC5D0]/90 backdrop-blur-md"
      >
        
        {/* LEFT COLUMN: Contextual Logo */}
        <div className="flex justify-start items-center z-20">
          <motion.img 
            src="/donutfinal/logo.png" 
            alt="Lucky 2000"
            initial={{ opacity: 0 }}
            animate={{ opacity: isPastHero ? 1 : 0 }}
            className="h-10 w-auto object-contain pointer-events-none" 
          />
        </div>
        
        {/* CENTER COLUMN: The PillNav (Locked to True Center) */}
        {/* Grid guarantees this column spans the exact middle 33.33% of the screen */}
        <div className="flex justify-center items-center z-10 w-full">
          <PillNav 
            items={[
              { label: 'Flavors', href: '#flavors' },
              { label: 'About', href: '#about' },
              { label: 'Location', href: '#location' }
            ]}
            baseColor="#EF2E31"
            pillTextColor="#EF2E31"
            hoveredPillTextColor="#FFC5D0"
          />
        </div>
        
        {/* RIGHT COLUMN: Controls */}
        <div className="flex justify-end items-center gap-4 z-20">
          <button className="border-2 border-[#EF2E31] text-[#EF2E31] px-4 py-1 rounded-full text-sm font-bold hover:bg-[#EF2E31] hover:text-[#FFC5D0] transition-colors">
            EN / ع
          </button>
          
          {/* Instagram SVG Icon */}
          <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#EF2E31]" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>

      </motion.nav>

      {/* Z-20: FOREGROUND TEXT & LOGO (Viewport-based upper alignment) */}
      <div className="absolute top-[12vh] md:top-[15vh] left-0 right-0 flex flex-col items-center justify-start z-20 w-full pointer-events-none">
         
         {/* Main Logo */}
         {/* Reattached the Framer Motion breathing effect and spring entrance */}
         <motion.div
           initial={{ scale: 0.8 }}
           animate={{ 
             scale: 1,
             y: reduce ? 0 : [0, -12, 0]
           }}
           transition={{
             scale: { type: 'spring', stiffness: 120, damping: 14, delay: 0.05 },
             y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
           }}
           className="will-change-transform pointer-events-auto"
         >
           <img 
             src="/donutfinal/logo.png" 
             alt="Lucky 2000 Logo" 
             className="w-[180px] md:w-[240px] lg:w-[280px] object-contain" 
           />
         </motion.div>
         
         {/* Subtitle */}
         <img 
           src="/donutfinal/donutsfrom_sunset.png" 
           alt="Doughnuts from sunset" 
           className="h-[32px] md:h-[40px] lg:h-[48px] mt-4 object-contain pointer-events-auto" 
         />
      </div>

      {/* Z-10: THE SETTING SUN (PERFECTLY CENTERED) */}
      <div 
        ref={sunRef} 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] max-w-[100vw] h-[25vh] md:h-[30vh] z-10 pointer-events-none"
      >
         <img 
           src="/donutfinal/sun.png" 
           alt="Setting Sun" 
           className="w-full h-full object-cover object-top" 
         />
      </div>

    </section>
  );
}
