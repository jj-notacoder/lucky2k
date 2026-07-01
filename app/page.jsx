import Hero from '@/components/Hero';
import FlavorsSection from '@/components/FlavorsSection';
import AboutSection from '@/components/AboutSection';
import GameSection from '@/components/GameSection';
import TwilightFooter from '@/components/TwilightFooter';
import LocationSection from '@/components/LocationSection';
import SiteFooter from '@/components/SiteFooter';

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <FlavorsSection />
        <AboutSection />
        <GameSection />
        <LocationSection />
        <TwilightFooter />
      </main>
      <SiteFooter />
    </>
  );
}
