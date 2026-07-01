'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const translations = {
  en: {
    nav: {
      flavors: 'Flavors',
      about: 'About',
      location: 'Location',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      switchToArabic: 'Switch to Arabic',
      switchToEnglish: 'Switch to English',
      mobilePrimary: 'Mobile primary navigation',
      logoAlt: 'Lucky 2000 home',
      instagramAria: 'Instagram',
    },
    hero: {
      logoAlt: 'Lucky 2000 Logo',
      subtitleAlt: 'Doughnuts from sunset',
      subtitleImage: '/donutfinal/donutsfrom_sunset.webp',
      subtitleWidth: 624,
      subtitleHeight: 97,
      subtitleClass: 'h-[36px] md:h-[48px] lg:h-[56px] mt-6 md:mt-8',
      sunAlt: 'Setting Sun',
    },
    flavors: {
      heading: 'THE FLAVORS',
      eyebrow: 'DOUGHNUTS BUT ABU DHABI',
      cta: "Play for this week's drop",
      luckyTitle: 'Lucky Flavor',
      luckySub: 'Changes every week',
      items: {
        cinnamon: { title: 'Cinnamon Sugar', sub: '+ Vanilla Custard' },
        chocolate: { title: 'Chocolate Hazelnut' },
        orange: { title: 'Orange Cardamom' },
        strawberry: { title: 'Strawberries & Cream' },
      },
    },
    about: {
      heading: 'ABOUT US',
      eyebrow: 'NOT YOUR ORDINARY DOUGHNUTS',
      body:
        "We're a small, no-fuss doughnut counter in Mina Zayed, a few steps from Marmellata. We open after sunset with a short menu of filled doughnuts - four regulars, and one lucky flavor that changes every week.",
      hours: "Friday - Sunday, sunset 'til sellout.",
      badgeAlts: {
        sunset: 'Open after sunset, 7pm',
        mystery: 'Weekly lucky flavor',
        mina: 'See you in the Mina',
      },
      cards: {
        counter: <>Just doughnuts, <br /> a counter, and a little luck</>,
        sunset: <>Open from sunset, <br /> made for after-dark cravings</>,
        mystery: <>Weekly flavor <br /> announced on <br /> Instagram</>,
        mina: <>Souq Al Mina, <br /> Mina Zayed, down <br /> by the sea</>,
      },
    },
    game: {
      heading: 'GET LUCKY',
      eyebrow: 'TAKE A CHANCE ON OUR WEEKLY MYSTERY DROP',
      summary: '4 Regulars. 1 Mystery Drop.',
      mysteryAlt: 'Mystery',
      openBox: 'Open mystery box',
      reveal: {
        1: 'Cinnamon Sugar + Vanilla Custard',
        2: 'Chocolate Hazelnut',
        3: 'Orange Cardamom',
        4: 'Strawberries & Cream',
        5: 'Lucky Flavor!',
      },
      won: "You got lucky! Check this week's flavor on Instagram.",
      tryAgain: 'No luck yet. The weekly drop is hiding on Instagram.',
      tapInstagram: 'Tap to view on @luckytwothousand',
      flavorAlt: 'Flavor',
      openOnInstagram: 'Open {flavor} on Instagram',
    },
    location: {
      heading: 'LOCATION',
      eyebrow: 'WHERE TO FIND US.',
      title: 'LOCATION',
      hoursTitle: 'HOURS',
      address: '22 Al Mutqin St, Zayed Port, Abu Dhabi',
      hours: 'Friday - Sunday, 7pm - 10pm',
      mapAlt: 'Lucky 2000 location map',
      mapAria: 'Open Lucky 2000 location in Google Maps',
    },
    footer: {
      cta: 'SEE YOU IN THE MINA!',
      instagram: '@luckytwothousand',
    },
    transition: {
      sectionAlt: 'Section transition',
    },
    twilight: {
      neonLogoAlt: 'Lucky 2000 Neon Logo',
      moonAlt: 'Rising Moon',
    },
  },
  ar: {
    nav: {
      flavors: 'النكهات',
      about: 'من نحن',
      location: 'الموقع',
      openMenu: 'افتح قائمة التنقل',
      closeMenu: 'أغلق قائمة التنقل',
      switchToArabic: 'التبديل إلى العربية',
      switchToEnglish: 'التبديل إلى الإنجليزية',
      mobilePrimary: 'التنقل الرئيسي للموبايل',
      logoAlt: 'العودة إلى أعلى الصفحة',
      instagramAria: 'إنستغرام',
    },
    hero: {
      logoAlt: 'شعار لاكي 2000',
      subtitleAlt: 'دونات من غروب الشمس',
      subtitleImage: '/donutfinal/donutsfrom sunset - arabic.webp',
      subtitleWidth: 1536,
      subtitleHeight: 1024,
      subtitleClass: 'h-[48px] md:h-[64px] lg:h-[72px] mt-2 md:mt-4',
      sunAlt: 'شمس الغروب',
    },
    flavors: {
      heading: 'النكهات',
      eyebrow: 'دونات بطابع أبوظبي',
      cta: 'العب لنكهة هذا الأسبوع',
      luckyTitle: 'نكهة الحظ',
      luckySub: 'تتغير كل أسبوع',
      items: {
        cinnamon: { title: 'سكر وقرفة', sub: '+ كاسترد فانيلا' },
        chocolate: { title: 'شوكولاتة وبندق' },
        orange: { title: 'برتقال وهيل' },
        strawberry: { title: 'فراولة وكريمة' },
      },
    },
    about: {
      heading: 'من نحن',
      eyebrow: 'مو مجرد دونات عادية',
      body:
        'نحن كاونتر دونات صغير وبسيط في ميناء زايد، على بعد خطوات من مارميلاتا. نفتح بعد الغروب بقائمة قصيرة من الدونات المحشية: أربع نكهات ثابتة ونكهة حظ تتغير كل أسبوع.',
      hours: 'الجمعة - الأحد، من الغروب حتى نفاد الكمية.',
      badgeAlts: {
        sunset: 'نفتح بعد الغروب، 7 مساءً',
        mystery: 'نكهة حظ أسبوعية',
        mina: 'نشوفكم في الميناء',
      },
      cards: {
        counter: <>دونات بسيطة، <br /> كاونتر، وقليل من الحظ</>,
        sunset: <>نفتح من الغروب، <br /> لرغبات آخر الليل</>,
        mystery: <>نكهة أسبوعية <br /> نعلنها على <br /> إنستغرام</>,
        mina: <>سوق الميناء، <br /> ميناء زايد، <br /> قريب من البحر</>,
      },
    },
    game: {
      heading: 'جرب حظك',
      eyebrow: 'خذ فرصتك مع نكهة الأسبوع الغامضة',
      summary: '4 نكهات ثابتة. نكهة غامضة واحدة.',
      mysteryAlt: 'غامض',
      openBox: 'افتح صندوق الحظ',
      reveal: {
        1: 'سكر وقرفة + كاسترد فانيلا',
        2: 'شوكولاتة وبندق',
        3: 'برتقال وهيل',
        4: 'فراولة وكريمة',
        5: 'نكهة الحظ!',
      },
      won: 'طلعت محظوظ! شوف نكهة هذا الأسبوع على إنستغرام.',
      tryAgain: 'مو هذه المرة. نكهة الأسبوع موجودة على إنستغرام.',
      tapInstagram: 'اضغط للعرض على @luckytwothousand',
      flavorAlt: 'النكهة',
      openOnInstagram: 'افتح {flavor} على إنستغرام',
    },
    location: {
      heading: 'الموقع',
      eyebrow: 'وين تلقانا.',
      title: 'الموقع',
      hoursTitle: 'الأوقات',
      address: '22 شارع المتقن، ميناء زايد، أبوظبي',
      hours: 'الجمعة - الأحد، 7 مساءً - 10 مساءً',
      mapAlt: 'خريطة موقع لاكي 2000',
      mapAria: 'افتح موقع لاكي 2000 في خرائط Google',
    },
    footer: {
      cta: 'نشوفكم في الميناء!',
      instagram: '@luckytwothousand',
    },
    transition: {
      sectionAlt: 'فاصل القسم',
    },
    twilight: {
      neonLogoAlt: 'شعار لاكي 2000 النيون',
      moonAlt: 'القمر الصاعد',
    },
  },
};

const LanguageContext = createContext(null);

function getPathValue(source, path) {
  return path.split('.').reduce((value, part) => value?.[part], source);
}

export function LangProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const stored = window.localStorage.getItem('lucky2000-language');
    if (stored === 'ar' || stored === 'en') setLanguage(stored);
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
    window.localStorage.setItem('lucky2000-language', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === 'en' ? 'ar' : 'en'));
  }, []);

  const t = useCallback(
    (key) => getPathValue(translations[language], key) ?? getPathValue(translations.en, key) ?? key,
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      lang: language,
      isArabic: language === 'ar',
      direction: language === 'ar' ? 'rtl' : 'ltr',
      toggleLanguage,
      toggle: toggleLanguage,
      t,
    }),
    [language, t, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LangProvider');
  return context;
}

export const useLang = useLanguage;
