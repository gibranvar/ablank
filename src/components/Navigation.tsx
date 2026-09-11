'use client';

import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Plataforma', href: '#plataforma' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Simulador', href: '#simulador' },
  { label: 'FAQ', href: '#faq' },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          
          {/* Logo Tipográfico Puro */}
          <a
            href="#top"
            className="relative flex items-center justify-center px-5 py-2.5 rounded-full bg-white/[0.02] backdrop-blur-md border border-white/5 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <span className="font-display font-bold text-white tracking-[0.3em] text-[15px] uppercase pl-[0.3em]">
              Λ BLANK
            </span>
          </a>

          {/* MENÚ CENTRAL - Visible solo en pantallas lg (1024px+) */}
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
                  // text-sm (14px) y cápsulas un poco más altas (h-9) para que respire la fuente
                  className="group relative flex items-center justify-center h-9 px-5 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-4 h-px bg-white/90 scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300 origin-center" />
                </a>
              ))}
            </nav>
          </div>

          {/* CTA Superior - Visible solo en lg+ */}
          <a
            href="https://w.app/5vug7u" target="_blank" rel="noopener noreferrer"
            // También se ajustó a text-sm para mantener consistencia
            className="hidden lg:inline-flex group relative items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
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
            Construir mi sistema
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>

          {/* Trigger Menú Móvil - Visible hasta pantallas md (incluyendo tablets) */}
          <button
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full text-white bg-white/5 border border-white/10 backdrop-blur-md transition-active active:scale-95"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={20} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE/TABLET MENU (Overlay Pantalla Completa)
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

        <nav className="flex flex-col px-8 py-10">
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

          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-10 inline-flex items-center justify-center gap-2 px-8 py-4 w-full text-base font-semibold text-white transition-all active:scale-95"
            style={{
              borderRadius: '16px',
              backgroundColor: '#000',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `inset -4px 3px 9px 0px #0175ff, inset 3px -2px 8px 0px #ffcd7d`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${navLinks.length * 60 + 100}ms`,
            }}
          >
            Construir mi sistema
            <ArrowRight size={18} />
          </a>
        </nav>
      </div>
    </>
  );
}