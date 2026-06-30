'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/lib/i18n';
import { useCanHover } from '@/lib/useResponsivePerformance';

gsap.registerPlugin(ScrollTrigger);

const IG = 'https://www.instagram.com/luckytwothousand/';

export default function Nav() {
  const { t, lang, toggle } = useLang();
  const canHover = useCanHover();
  const logoRef = useRef(null);

  /* Delayed sticky logo: hidden in the hero, slides in when About hits the top. */
  useEffect(() => {
    const el = logoRef.current;
    const about = document.getElementById('about');
    if (!el || !about) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { x: -20, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: about,
        start: 'top top',
        onEnter: () => gsap.to(el, { x: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' }),
        onLeaveBack: () => gsap.to(el, { x: -20, autoAlpha: 0, duration: 0.4, ease: 'power3.in' }),
      });
    });
    return () => ctx.revert();
  }, []);

  // RTL/LTR swap changes layout heights → recompute trigger positions and
  // re-assert the sticky-logo state for the current scroll position.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [lang]);

  const links = [
    ['#about', t('about')],
    ['#flavors', t('flavors')],
    ['#location', t('location')],
  ];

  return (
    <header className="nav">
      {/* LEFT — delayed sticky logo */}
      <a href="#top" className="nav-logo" ref={logoRef} aria-label="Lucky 2000 home">
        <img src="/logo.webp" alt="" width={561} height={445} loading="eager" decoding="async" />
        <span className="nav-logo__word">Lucky&nbsp;2000</span>
      </a>

      {/* CENTER — primary links with a Framer hover lift */}
      <nav className="nav-center" aria-label="Primary">
        {links.map(([href, label]) => (
          <motion.a
            key={href}
            href={href}
            className="nav-link"
            whileHover={canHover ? { y: -3, scale: 1.06 } : undefined}
            whileTap={{ y: -1, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
            style={{ willChange: 'transform' }}
          >
            {label}
          </motion.a>
        ))}
      </nav>

      {/* RIGHT — language toggle + Instagram */}
      <div className="nav-right">
        <button
          type="button"
          className="lang-toggle"
          onClick={toggle}
          aria-label={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
        >
          <span className={lang === 'en' ? 'on' : 'off'}>EN</span>
          <span className="sep">/</span>
          <span className={lang === 'ar' ? 'on' : 'off'}>ع</span>
        </button>

        <a className="ig-link" href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.3" cy="6.7" r="1.25" fill="currentColor" />
          </svg>
        </a>
      </div>
    </header>
  );
}
