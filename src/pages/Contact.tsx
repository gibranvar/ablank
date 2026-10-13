import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { MapPin, Mail, Globe, ArrowRight } from 'lucide-react';

export function Contact() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'enterprise' | 'portal'>('enterprise');
  return (
    <div className="relative font-sans" style={{ background: 'var(--bg-base)' }}>
      <Helmet>
        <title>{t('meta.contact')}</title>
        <meta name="description" content={t('meta.contactDesc')} />
      </Helmet>

      {/* Navbar Original */}
      <Navigation />

      {/* Layout Split Screen (Stealth Wealth + Liquid Glass) */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pb-24 md:pb-32 pt-40 md:pt-56 relative z-10 min-h-screen flex flex-col">
        
        {/* Header de la Página Centrado */}
        <div className="w-full text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto text-white/50 font-light">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Tarjetas Estilo Linear */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-16 md:mb-24">
          
          {/* Card: Sales */}
          <button 
            onClick={() => { setActiveTab('enterprise'); setShowModal(true); }}
            className="group flex flex-col text-left bg-[#0a0a0c] hover:bg-[#0f0f12] border border-white/5 hover:border-white/10 rounded-2xl p-8 md:p-10 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
            <h3 className="text-xl font-display font-semibold text-white mb-4 relative z-10">{t('contact.salesTitle')}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-12">
              {t('contact.salesDesc')}
            </p>
            <div className="mt-auto flex items-center text-sm font-medium text-white/40 group-hover:text-white transition-colors">
              {t('contact.salesCta')} <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Card: Support */}
          <button 
            onClick={() => { setActiveTab('portal'); setShowModal(true); }}
            className="group flex flex-col text-left bg-[#0a0a0c] hover:bg-[#0f0f12] border border-white/5 hover:border-white/10 rounded-2xl p-8 md:p-10 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
            <h3 className="text-xl font-display font-semibold text-white mb-4 relative z-10">{t('contact.supportTitle')}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-12">
              {t('contact.supportDesc')}
            </p>
            <div className="mt-auto flex items-center text-sm font-medium text-white/40 group-hover:text-white transition-colors">
              {t('contact.supportCta')} <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

        </div>

        {/* Separador y Corporate Info (Estilo Linear) */}
        <div className="w-full border-t border-white/5 pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-white/40">{t('contact.corpInfo')}</h3>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h4 className="text-sm font-medium text-white mb-4">{t('contact.hq')}</h4>
              <p className="text-white/60 text-sm leading-relaxed flex items-start gap-3">
                <MapPin size={16} className="text-white/40 mt-1 shrink-0" />
                <span>
                  Rubén Darío 40,<br />
                  Rincón del Bosque, Polanco V Secc.<br />
                  Ciudad de México, CDMX
                </span>
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white mb-4">{t('contact.direct')}</h4>
              <div className="space-y-4">
                <a href="mailto:hello@ablank.mx" className="text-white/60 hover:text-white text-sm leading-relaxed flex items-center gap-3 transition-colors">
                  <Mail size={16} className="text-white/40 shrink-0" />
                  hello@ablank.mx
                </a>
                <a href="mailto:support@ablank.mx" className="text-white/60 hover:text-white text-sm leading-relaxed flex items-center gap-3 transition-colors">
                  <Mail size={16} className="text-white/40 shrink-0" />
                  support@ablank.mx
                </a>
              </div>
            </div>
          </div>
          
        </div>

      </main>

      {/* Modal del Formulario */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowModal(false)} 
          />
          <div className="relative w-full max-w-xl bg-[#06070a] md:bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 md:backdrop-blur-xl animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <ContactForm initialTab={activeTab} hideTabs={true} />
          </div>
        </div>
      )}

      {/* Footer Original */}
      <Footer />

      {/* Efecto de fondo global (stealth) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#111_0%,transparent_50%)] opacity-30" />
      </div>
    </div>
  );
}
