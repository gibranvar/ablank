'use client';

import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { pushToDataLayer } from '../utils/analytics';
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { label: t('nav.platform'), href: '#plataforma' },
    { label: t('nav.solutions'), href: '#soluciones' },
    { label: t('nav.simulator'), href: '#simulador' },
    { label: t('nav.faq'), href: '#faq' },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* =====================================================
          DESKTOP NAV (Oculto en Tablet/Mobile, visible en lg+)
          ===================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 py-5 pointer-events-none">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between pointer-events-auto">
          
          <a
            href="#top"
            className="relative flex items-center justify-center px-5 py-2.5 rounded-full bg-white/[0.02] backdrop-blur-md border border-white/5 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span className="font-display font-bold text-white tracking-[0.3em] text-[15px] uppercase pl-[0.3em]">
              Λ BLΛNK
            </span>
          </a>

          <div className="hidden lg:flex relative items-center p-1.5 rounded-full bg-white/[0.02] backdrop-blur-md shadow-[inset_-3px_-2px_8px_rgba(255,255,255,0.07)]">
            <div 
              className="absolute inset-0 rounded-full border border-white/20 opacity-75 pointer-events-none"
              style={{
                WebkitMaskImage: 'linear-gradient(160deg, black 0%, transparent 39%, transparent 69%, black 100%)',
                maskImage: 'linear-gradient(160deg, black 0%, transparent 39%, transparent 69%, black 100%)'
              }}
            />
            
            <nav className="relative z-10 flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative flex items-center justify-center h-9 px-5 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-4 h-px bg-white/90 scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300 origin-center" />
                </a>
              ))}
            </nav>
          </div>
          
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-10 h-10 rounded-full text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all"
              aria-label="Change language"
            >
              <Globe size={18} />
              <span className="ml-1 text-xs font-semibold">{i18n.language.startsWith('es') ? 'EN' : 'ES'}</span>
            </button>

            <a
              href="https://wa.me/525576048470?text=Hola,%20vengo%20de%20su%20sitio%20web.%20Me%20gustaría%20hablar%20sobre%20mi%20proyecto." target="_blank" rel="noopener noreferrer"
              onClick={() => pushToDataLayer('click_whatsapp', { location: 'navbar_desktop' })}

              className="inline-flex group relative items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 overflow-hidden"
              style={{
                borderRadius: '14px',
                backgroundColor: '#000',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0px 0.8px 0.8px -0.75px rgba(0, 0, 0, 0.18), 
                  0px 2.2px 2.2px -1.5px rgba(0, 0, 0, 0.18), 
                  0px 5px 5px -2.25px rgba(0, 0, 0, 0.17), 
                  0px 11px 11px -3px rgba(0, 0, 0, 0.14), 
                  0px 28px 28px -3.75px rgba(0, 0, 0, 0.06), 
                  inset -4px 3px 9px 0px #0175ff, 
                  inset 3px -2px 8px 0px #ffcd7d
                `
              }}
            >
              <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
              
              <span className="relative z-10 flex items-center gap-2">
                {t('nav.talkToExpert')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button
              className="flex items-center justify-center w-11 h-11 rounded-full text-white bg-white/5 border border-white/10 backdrop-blur-md transition-active active:scale-95 pointer-events-auto"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE/TABLET MENU
          ===================================================== */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col bg-[#050505] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <a href="#top" onClick={() => setMenuOpen(false)}>
             <span className="font-display font-bold text-white tracking-[0.3em] text-[18px] uppercase pl-[0.3em]">
              Λ BLANK
            </span>
          </a>
          <button
            className="flex items-center justify-center w-11 h-11 text-white bg-transparent border border-white/10 rounded-full transition-transform active:scale-95"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-5 text-white font-display font-semibold border-b border-white/10 no-underline transition-all duration-500 hover:text-blue-400"
              style={{
                fontSize: 'clamp(1.8rem, 8vw, 2.5rem)',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${index * 60 + 50}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div 
          className="px-8 pb-10 pt-4"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${navLinks.length * 60 + 100}ms`,
            transition: 'all 0.5s ease'
          }}
        >
          <a
            href="https://wa.me/525576048470?text=Hola,%20vengo%20de%20su%20sitio%20web.%20Me%20gustaría%20hablar%20sobre%20mi%20proyecto."
            target="_blank" rel="noopener noreferrer"
            onClick={() => {
              setMenuOpen(false);
              pushToDataLayer('click_whatsapp', { location: 'navbar_mobile' });
            }}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 w-full text-sm font-semibold text-white transition-all active:scale-95 overflow-hidden mb-6"
            style={{
              borderRadius: '14px',
              backgroundColor: '#000',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `inset -4px 3px 9px 0px #0175ff, inset 3px -2px 8px 0px #ffcd7d`,
            }}
          >
            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
            
            <span className="relative z-10 flex items-center gap-2">
              {t('nav.talkToExpert')}
              <ArrowRight size={16} />
            </span>
          </a>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => {
                toggleLanguage();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white/70 hover:text-white bg-white/5 border border-white/10 transition-colors"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">{i18n.language.startsWith('es') ? 'Switch to English' : 'Cambiar a Español'}</span>
            </button>
            <a href="mailto:hello@ablank.mx" className="text-[11px] text-white/40 font-medium tracking-wide uppercase hover:text-white transition-colors">
              hello@ablank.mx
            </a>
          </div>
        </div>
      </div>
    </>
  );
}