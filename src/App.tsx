import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Positioning } from '@/components/Positioning';
import { Platform } from '@/components/Platform';
import { FeatureShowcase } from '@/components/FeatureShowcase';
import { UseCaseSection } from '@/components/UseCaseSection';
import { ProductShowcase } from '@/components/ProductShowcase';
import { LostSalesSimulator } from '@/components/Simulator';
import { Security } from '@/components/Security';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { StickyWhatsApp } from './components/StickyWhatsApp';

function App() {
  return (
    <div className="relative" style={{ background: 'var(--bg-base)' }}>
      <Navigation />
      <main>
        <Hero />
        <Positioning />
        <Platform />
        <FeatureShowcase />
        <UseCaseSection />
        <ProductShowcase />
        <LostSalesSimulator />
        <Security />
        <FAQ />
        <CookieBanner />
        <StickyWhatsApp />
      </main>
      <Footer />
    </div>
  );
}

export default App;
