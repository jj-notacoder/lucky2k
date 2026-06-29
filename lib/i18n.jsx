'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/* Static, client-side strings — no external translation widgets. */
const STRINGS = {
  en: {
    about: 'ABOUT US',
    flavors: 'FLAVORS',
    location: 'LOCATION',
    subtitle: 'doughnuts from sunset',
    aboutTitle: 'About Us',
    aboutBody:
      'Lucky 2000 is a midnight doughnut drop — golden zalabiyeh fried fresh and filled with playful, high-quality flavours. Pull the lever, watch the reels land, hit the jackpot after dark.',
    flavorsTitle: 'Flavors',
    flavorsBody: 'A rotating reel of weekly drops. New flavours every weekend.',
    locationTitle: 'Location',
    locationBody: 'Fridays, Saturdays & Sundays · 7 PM onwards · Abu Dhabi.',
    toggle: 'ع',
  },
  ar: {
    about: 'من نحن',
    flavors: 'النكهات',
    location: 'الموقع',
    subtitle: 'دوناتس من غروب الشمس',
    aboutTitle: 'من نحن',
    aboutBody:
      'لاكي ٢٠٠٠ هو دروب دوناتس في منتصف الليل — زلابية ذهبية تُقلى طازجة وتُحشى بنكهات مرحة وفاخرة. اسحب الذراع، شاهد البكرات تستقر، واضرب الجاكبوت بعد المغيب.',
    flavorsTitle: 'النكهات',
    flavorsBody: 'بكرة متجددة من النكهات الأسبوعية. نكهات جديدة كل نهاية أسبوع.',
    locationTitle: 'الموقع',
    locationBody: 'الجمعة والسبت والأحد · من ٧ مساءً · أبوظبي.',
    toggle: 'EN',
  },
};

const LangContext = createContext({ lang: 'en', toggle: () => {}, t: (k) => k });

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');

  // Keep <html lang/dir> in sync — the single source of truth for RTL + fonts.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'ar' : 'en')), []);
  const t = useCallback((key) => STRINGS[lang][key] ?? key, [lang]);

  return <LangContext.Provider value={{ lang, toggle, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
