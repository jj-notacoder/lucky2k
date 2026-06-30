'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useMotionValueEvent, useTransform } from 'framer-motion';
import PillNav from './PillNav';

const IG = 'https://www.instagram.com/luckytwothousand/';

export function useDarkSectionDetection() {
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsOverDarkSection(true);
          } else {
            setIsOverDarkSection(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    const darkSection = document.getElementById('twilight-footer');
    if (darkSection) observer.observe(darkSection);

    return () => {
      if (darkSection) observer.unobserve(darkSection);
    };
  }, []);

  return isOverDarkSection;
}

export default function Hero() {
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const isOverDarkSection = useDarkSectionDetection();

  // Scroll Progress Hooks
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  // Drops the sun 300px down by the time the user scrolls 600px
  const sunScrollY = useTransform(scrollY, [0, 600], [0, 300]);

  // State Management
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);
  const navControlClasses = isOverDarkSection
    ? 'border-white text-white hover:bg-white hover:text-[#EF2E31]'
    : 'border-[#EF2E31] text-[#EF2E31] hover:bg-[#EF2E31] hover:text-white';
  const navIconClasses = isOverDarkSection
    ? 'text-white hover:text-[#EF2E31]'
    : 'text-[#EF2E31] hover:text-white';
  const navIconColor = isInstagramHovered
    ? isOverDarkSection ? '#EF2E31' : '#FFFFFF'
    : isOverDarkSection ? '#FFFFFF' : '#EF2E31';

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic]);

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



  return (
    <section id="hero" ref={heroRef} className="relative z-10 w-full h-screen overflow-hidden bg-[#FFC5D0]">
      
      {/* INDEPENDENT SCROLL PROGRESS BAR */}
      <motion.div 
        className={`fixed top-0 left-0 h-1 w-full origin-left z-[10000] transition-colors duration-300 ${isOverDarkSection ? 'bg-white' : 'bg-[#EF2E31]'}`}
        style={{
          scaleX,
          backgroundColor: isOverDarkSection ? '#FFFFFF' : '#EF2E31',
        }}
      />

      {/* INVISIBLE HOVER TRIGGER */}
      <div 
        className="fixed top-0 left-0 right-0 h-16 z-[9998]"
        onMouseEnter={() => setIsNavVisible(true)}
      />

      {/* THE SMART NAVBAR (CSS GRID REFACTOR) */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isNavVisible ? 0 : "-100%", opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        onMouseLeave={() => { if (scrollY.get() > 50) setIsNavVisible(false); }}
        className={`fixed top-0 left-0 w-full h-14 md:h-16 z-[9999] grid grid-cols-3 items-center px-6 md:px-10 backdrop-blur-md transition-colors duration-300 ${isOverDarkSection ? 'bg-black/20' : 'bg-[#FFC5D0]/90'}`}
        style={{
          backgroundColor: isOverDarkSection ? 'rgba(0,0,0,0.2)' : 'rgba(255,197,208,0.9)',
        }}
      >
        
        {/* LEFT COLUMN: Contextual Logo */}
        <div className="flex justify-start items-center z-20">
          <motion.img
            src="/donutfinal/logo.png"
            alt="Lucky 2000"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isPastHero ? 1 : 0 }}
            className={`h-10 w-auto object-contain cursor-pointer ${isPastHero ? 'pointer-events-auto' : 'pointer-events-none'}`}
          />
        </div>
        
        {/* CENTER COLUMN: The PillNav (Locked to True Center) */}
        {/* Grid guarantees this column spans the exact middle 33.33% of the screen */}
        <div className="flex justify-center items-center z-10 w-full transition-all duration-300 font-['Clarendon']">
          <PillNav 
            items={isArabic ? [
              { label: 'النكهات', href: '#flavors' },
              { label: 'من نحن', href: '#about' },
              { label: 'الموقع', href: '#location' }
            ] : [
              { label: 'Flavors', href: '#flavors' },
              { label: 'About', href: '#about' },
              { label: 'Location', href: '#location' }
            ]}
            baseColor={isOverDarkSection ? '#FFFFFF' : '#EF2E31'}
            pillTextColor={isOverDarkSection ? '#FFFFFF' : '#EF2E31'}
            hoveredPillTextColor={isOverDarkSection ? '#EF2E31' : '#FFFFFF'}
          />
        </div>
        
        {/* RIGHT COLUMN: Controls */}
        <div className="flex justify-end items-center gap-4 z-20">
          <button 
            onClick={() => setIsArabic(!isArabic)}
            className={`border-2 px-4 py-1 rounded-full text-sm font-bold transition-colors duration-300 ${navControlClasses}`}
          >
            {isArabic ? "EN" : "ع"}
          </button>
          
          {/* Instagram SVG Icon */}
          <a
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`transition-colors duration-300 ${navIconClasses}`}
            style={{ color: navIconColor }}
            onMouseEnter={() => setIsInstagramHovered(true)}
            onMouseLeave={() => setIsInstagramHovered(false)}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>

      </motion.nav>

      {/* Z-20: FOREGROUND TEXT & LOGO (Viewport-based upper alignment) */}
      <div className="absolute top-[10vh] md:top-[12vh] left-0 right-0 flex flex-col items-center justify-start z-20 w-full pointer-events-none">
         
         {/* Main Logo */}
         <motion.img 
           src="/donutfinal/logo.png" 
           alt="Lucky 2000 Logo" 
           className="w-[240px] md:w-[320px] lg:w-[380px] object-contain pointer-events-auto transition-transform duration-300" 
           initial={{ scale: 0.8, opacity: 0, y: 40 }}
           animate={{ scale: 1, opacity: 1, y: 0 }}
           transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.2 }}
         />
          
         {/* Animated Subtitle (Dynamic EN/AR) */}
         <motion.img 
           src={isArabic ? "/donutfinal/donutsfrom sunset - arabic.png" : "/donutfinal/donutsfrom_sunset.png"} 
           alt="Doughnuts from sunset" 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
           className={`object-contain pointer-events-auto transition-all duration-300 ${
             isArabic 
               ? "h-[48px] md:h-[64px] lg:h-[72px] mt-2 md:mt-4" 
               : "h-[36px] md:h-[48px] lg:h-[56px] mt-6 md:mt-8"
           }`} 
         />
      </div>

      {/* Z-10: THE SETTING SUN */}
      {/* 1. Static Wrapper: Handles absolute centering AND the static Y-offset */}
      <div className="absolute bottom-0 inset-x-0 w-full flex justify-center translate-y-[20%] md:translate-y-[30%] z-10 pointer-events-none">
        
        {/* 2. Animated Container: ONLY handles the scroll physics (no Tailwind transforms) */}
        <motion.div 
          style={{ y: sunScrollY }} 
          className="w-[1200px] max-w-[100vw] h-[22vh] md:h-[28vh] flex justify-center"
        >
          <motion.img 
            src="/donutfinal/sun.png" 
            alt="Setting Sun" 
            className="w-full h-full object-cover object-top"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
          />
        </motion.div>
        
      </div>

    </section>
  );
}
