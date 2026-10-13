import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { HeroVentas } from '@/components/HeroVentas';
import { PainAgitation } from '@/components/PainAgitation';
import { HowItWorks } from '@/components/HowItWorks';
import { SimulatorVentas } from '@/components/SimulatorVentas';
import { Security } from '@/components/Security';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export function LandingVentas() {
  const { t } = useTranslation();
  return (
    <div className="relative" style={{ background: 'var(--bg-base)' }}>
      <Helmet>
        <title>{t('meta.landing')}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navigation />
      
      <main>
        <HeroVentas />
        <PainAgitation />
        <HowItWorks />
        <SimulatorVentas id="simulador" />
        <Security />
        <FAQ />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
