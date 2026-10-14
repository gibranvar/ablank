import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Compass } from 'lucide-react';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="relative font-sans min-h-screen flex flex-col justify-between overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Helmet>
        <title>{t('meta.notFound')}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Navegación oficial */}
      <Navigation />

      {/* Contenido Principal 404 */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-36 md:pt-48 pb-28 md:pb-36 relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* Aura / Resplandor de Fondo */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[650px] h-[340px] sm:h-[500px] md:h-[650px] rounded-full pointer-events-none opacity-25 -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(245,158,11,0.06) 35%, transparent 70%)',
            filter: 'blur(70px)'
          }}
        />

        {/* Pill de Diagnóstico / Estado de Red */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono tracking-widest uppercase text-white/70 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{t('notFound.badge')}</span>
        </div>

        {/* Tipografía Monumental 404 */}
        <div className="relative mb-4 select-none">
          <div className="text-8xl sm:text-9xl md:text-[180px] font-display font-extrabold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/15 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            404
          </div>
        </div>

        {/* Encabezado y Explicación */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white tracking-tight mb-4 max-w-xl">
          {t('notFound.title')}
        </h1>

        <p className="text-sm sm:text-base text-white/70 max-w-lg mb-10 leading-relaxed font-light">
          {t('notFound.subtitle')}
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <Button href="/" variant="primary" className="w-full sm:w-auto">
            {t('notFound.backHome')}
          </Button>
          <Button href="/contacto" variant="secondary" className="w-full sm:w-auto">
            {t('notFound.contact')}
          </Button>
        </div>

        {/* Atajos de Navegación Operativa (Linear Style) */}
        <div className="w-full max-w-md bg-[#0a0a0c]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2 mb-3 text-left">
            <Compass size={14} className="text-white/40" />
            <p className="text-xs font-mono uppercase tracking-wider text-white/40">
              {t('notFound.shortcutsTitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 text-left">
            <Link 
              to="/#simulador" 
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/10 text-xs text-white/70 hover:text-white transition-all group"
            >
              <span>{t('notFound.linkSimulator')}</span>
              <ArrowRight size={14} className="text-white/40 group-hover:text-white transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/#como-funciona" 
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/10 text-xs text-white/70 hover:text-white transition-all group"
            >
              <span>{t('notFound.linkDemo')}</span>
              <ArrowRight size={14} className="text-white/40 group-hover:text-white transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/contacto" 
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/10 text-xs text-white/70 hover:text-white transition-all group"
            >
              <span>{t('notFound.linkContact')}</span>
              <ArrowRight size={14} className="text-white/40 group-hover:text-white transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </main>

      {/* Footer oficial */}
      <Footer />
      <CookieBanner />
    </div>
  );
}
