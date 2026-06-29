'use client';

import { useLang } from '@/lib/i18n';

const IG = 'https://www.instagram.com/luckytwothousand/';

export default function Sections() {
  const { t } = useLang();
  return (
    <>
      {/* About — also the scroll target that reveals the sticky nav logo
          and completes the "setting sun" transition. */}
      <section id="about" className="section section--cream">
        <div className="section__inner">
          <h2 className="section__title">{t('aboutTitle')}</h2>
          <p className="section__body">{t('aboutBody')}</p>
        </div>
      </section>

      <section id="flavors" className="section">
        <div className="section__inner">
          <h2 className="section__title">{t('flavorsTitle')}</h2>
          <p className="section__body">{t('flavorsBody')}</p>
        </div>
      </section>

      <section id="location" className="section section--cream">
        <div className="section__inner">
          <h2 className="section__title">{t('locationTitle')}</h2>
          <p className="section__body">{t('locationBody')}</p>
        </div>
      </section>

      <footer className="footer">
        <span className="footer__brand">LUCKY&nbsp;2000</span>
        <a href={IG} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <span>© 2026 Lucky 2000</span>
      </footer>
    </>
  );
}
