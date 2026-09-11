import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Positioning } from '@/components/Positioning';
import { Platform } from '@/components/Platform';
import { FeatureShowcase } from '@/components/FeatureShowcase';
import { UseCaseSection } from '@/components/UseCaseSection';
import { ProductShowcase } from '@/components/ProductShowcase';
import { AutomationSection } from '@/components/AutomationSection';
import { LostSalesSimulator } from '@/components/Simulator';
import { Solutions } from '@/components/Solutions';
import { Process } from '@/components/Process';
import { Security } from '@/components/Security';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

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
      </main>
      <Footer />
    </div>
  );
}

export default App;
