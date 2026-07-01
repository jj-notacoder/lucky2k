'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { useIsMobileViewport } from '@/lib/useResponsivePerformance';
import { useLanguage } from '@/lib/i18n';
import PillNav from './PillNav';

const IG = 'https://www.instagram.com/luckytwothousand/';

function useDarkSectionDetection() {
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsOverDarkSection(entry.isIntersecting);
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

export default function GlobalChrome() {
  const { isArabic, toggleLanguage, t } = useLanguage();
  const isOverDarkSection = useDarkSectionDetection();
  const isMobile = useIsMobileViewport();
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { label: t('nav.flavors'), href: '#flavors' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.location'), href: '#location' },
  ];

  const navControlClasses = isOverDarkSection
    ? 'border-white text-white hover:bg-white hover:text-[#EF2E31]'
    : 'border-[#EF2E31] text-[#EF2E31] hover:bg-[#EF2E31] hover:text-white';
  const navIconClasses = isOverDarkSection
    ? 'text-white hover:text-[#EF2E31]'
    : 'text-[#EF2E31] hover:text-white';
  const navIconColor = isInstagramHovered
    ? isOverDarkSection ? '#EF2E31' : '#FFFFFF'
    : isOverDarkSection ? '#FFFFFF' : '#EF2E31';

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsPastHero(latest > window.innerHeight * 0.8);
    setIsNavVisible(isMobile || latest <= 50);
  });

  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
    if (isMobile) setIsNavVisible(true);
  }, [isMobile]);

  return (
    <>
      {/* INDEPENDENT SCROLL PROGRESS BAR */}
      <motion.div
        className={`fixed top-0 left-0 w-full z-[9999] h-1 origin-left transition-colors duration-300 ${isOverDarkSection ? 'bg-white' : 'bg-[#EF2E31]'}`}
        style={{
          scaleX,
          backgroundColor: isOverDarkSection ? '#FFFFFF' : '#EF2E31',
          willChange: 'transform, background-color',
        }}
      />

      {/* INVISIBLE HOVER TRIGGER */}
      <div
        className="fixed top-0 left-0 w-full h-4 z-[9999] pointer-events-auto"
        onMouseEnter={() => setIsNavVisible(true)}
      />

      {/* THE SMART NAVBAR */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: (isMobile || isNavVisible) ? 0 : '-100%', opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
        onMouseLeave={() => {
          if (!isMobile && scrollY.get() > 50) setIsNavVisible(false);
        }}
        className={`fixed top-0 left-0 w-full h-14 md:h-16 z-[9998] pointer-events-auto grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center px-3 md:px-10 backdrop-blur-md transition-colors duration-300 ${isOverDarkSection ? 'bg-black/20' : 'bg-[#FFC5D0]/90'}`}
        style={{
          backgroundColor: isOverDarkSection ? 'rgba(0,0,0,0.2)' : 'rgba(255,197,208,0.9)',
          willChange: 'transform, opacity',
        }}
      >
        <div className="relative z-30 flex justify-start items-center">
          <motion.img
            src="/donutfinal/logo.webp"
            alt={t('nav.logoAlt')}
            width={561}
            height={445}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isPastHero ? 1 : 0 }}
            style={{ willChange: 'opacity' }}
            className={`relative z-30 h-10 w-auto object-contain cursor-pointer ${isPastHero ? 'pointer-events-auto' : 'pointer-events-none'}`}
          />
        </div>

        <div className="relative z-30 desktop-only-flex justify-center items-center w-full transition-all duration-300 font-['Clarendon']">
          <PillNav
            items={navItems}
            baseColor={isOverDarkSection ? '#FFFFFF' : '#EF2E31'}
            pillTextColor={isOverDarkSection ? '#FFFFFF' : '#EF2E31'}
            hoveredPillTextColor={isOverDarkSection ? '#EF2E31' : '#FFFFFF'}
          />
        </div>

        <div className="relative z-30 flex justify-end items-center gap-2 md:gap-4">
          <button
            onClick={toggleLanguage}
            aria-label={isArabic ? t('nav.switchToEnglish') : t('nav.switchToArabic')}
            className={`relative z-30 min-h-11 min-w-11 border-2 px-3 md:px-4 py-1 rounded-full text-sm font-bold transition-colors duration-300 touch-manipulation ${navControlClasses}`}
          >
            {isArabic ? 'EN' : '\u0639'}
          </button>

          <a
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('nav.instagramAria')}
            className={`relative z-30 flex min-h-11 min-w-11 items-center justify-center rounded-full transition-colors duration-300 touch-manipulation ${navIconClasses}`}
            style={{ color: navIconColor }}
            onMouseEnter={() => setIsInstagramHovered(true)}
            onMouseLeave={() => setIsInstagramHovered(false)}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className={`relative z-30 mobile-only-flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors duration-300 touch-manipulation ${navControlClasses}`}
          >
            <span className="sr-only">{isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span className="block h-0.5 w-full rounded-full bg-current" />
              <span className="block h-0.5 w-full rounded-full bg-current" />
              <span className="block h-0.5 w-full rounded-full bg-current" />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`fixed left-3 right-3 top-16 z-[9997] md:hidden rounded-2xl border-2 p-2 shadow-[0_16px_40px_rgba(92,15,16,0.22)] backdrop-blur-md ${isOverDarkSection ? 'border-white bg-black/70' : 'border-[#EF2E31] bg-[#FFC5D0]/95'}`}
          >
            <nav aria-label={t('nav.mobilePrimary')} className="flex flex-col gap-1 font-['Clarendon'] max-md:font-['Clarendon']">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex min-h-12 items-center justify-center rounded-xl px-4 text-base font-black uppercase tracking-[0.16em] transition-colors duration-200 touch-manipulation ${isOverDarkSection ? 'text-white active:bg-white/15' : 'text-[#EF2E31] active:bg-white/60'}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
