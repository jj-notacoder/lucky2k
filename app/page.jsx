import Hero from '@/components/Hero';
import FlavorsSection from '@/components/FlavorsSection';
import AboutSection from '@/components/AboutSection';
import GameSection from '@/components/GameSection';

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <FlavorsSection />
        <AboutSection />
        <GameSection />
      </main>
    </>
  );
}
