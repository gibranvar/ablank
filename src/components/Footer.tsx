'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Logo } from './Logo'; 
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: footerRef.current, start: 'top 80%' }
    });
    
    tl.fromTo('h2 > span', 
      { opacity: 0, filter: 'blur(16px)', y: 30 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, stagger: 0.15, ease: 'power2.out' }
    )
    .fromTo('.footer-sub',
      { opacity: 0, filter: 'blur(16px)', y: 20 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, ease: 'power2.out' },
      '-=1'
    )
    .fromTo('.footer-cta',
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.5)' },
      '-=0.8'
    )
    .fromTo('.footer-giant-bg',
      { opacity: 0, filter: 'blur(40px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power2.inOut' },
      '-=1.5'
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative bg-[#020202] pt-32 pb-8 overflow-hidden font-sans border-t border-white/5">
      
      {/* 1. TOP CTA SECTION */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mb-16 flex flex-col items-center">
        
        <h2>
          <span>Delega el caos operativo.</span>
          <span>Escala con inteligencia.</span>
        </h2>
        
        <p className="footer-sub text-[#9ba9c4] text-lg md:text-xl max-w-2xl mx-auto mb-10 text-balance">
          Construimos el ecosistema exacto que tu empresa necesita para captar clientes, procesar ventas y operar 24/7 sin depender de ti.
        </p>
        
        {/* BOTÓN CTA CORREGIDO PARA MÓVILES */}
        <a 
          href="https://w.app/5vug7u" 
          className="footer-cta group inline-flex items-center justify-center gap-2 px-6 py-3 md:px-10 md:py-4 rounded-[12px] md:rounded-[16px] bg-[#020202] border border-white/40 text-white font-medium text-sm md:text-lg transition-transform hover:scale-[1.02] active:scale-95 shadow-2xl"
          style={{
            boxShadow: '0px 11px 11px -3px rgba(0,0,0,0.14), 0px 28px 28px -3.75px rgba(0,0,0,0.06), inset -4px 3px 9px 0px #0175ff, inset 3px -2px 8px 0px #ffcd7d, 0 0 40px rgba(1,117,255,0.3)'
          }}
        >
          Iniciar mi diagnóstico
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* 2. GIANT TEXT & ABSTRACT BACKGROUND IMAGE */}
      <div className="footer-giant-bg relative w-full py-32 flex items-center justify-center overflow-hidden mb-20 pointer-events-none">
        
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img 
            src="https://framerusercontent.com/images/3ez5Goty6KdEzujpWDVyu8Um6Ns.webp" 
            alt="Abstract background"
            className="w-full h-full object-cover"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)'
            }}
          />
        </div>
        
        <div className="relative z-20 flex items-center justify-center w-full min-w-max gap-8 md:gap-16">
          <span className="text-[28vw] md:text-[22vw] font-display font-bold text-white/10 uppercase tracking-tighter leading-none select-none">
            A BLANK
          </span>
          <span className="text-[28vw] md:text-[22vw] font-display font-bold text-white uppercase tracking-tighter leading-none select-none drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            A BLANK
          </span>
          <span className="text-[28vw] md:text-[22vw] font-display font-bold text-white/10 uppercase tracking-tighter leading-none select-none">
            A BLANK
          </span>
        </div>
      </div>

      {/* 3. LINKS SECTION */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        
        <div className="flex flex-col">
          <h4 className="text-white font-medium mb-6">Navegación</h4>
          <nav className="flex flex-col">
            <FooterLink href="#plataforma">Plataforma</FooterLink>
            <FooterLink href="#soluciones">Soluciones</FooterLink>
            <FooterLink href="#simulador">Simulador</FooterLink>
            <FooterLink href="#proceso">Proceso</FooterLink>
          </nav>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white font-medium mb-6">Contacto</h4>
          <nav className="flex flex-col">
            <FooterLink href="mailto:hello@ablank.com.mx">hello@ablank.com.mx</FooterLink>
            <FooterLink href="tel:5576048470">+52 7604 8470</FooterLink>
          </nav>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white font-medium mb-6">Ubicación</h4>
          <div className="text-[#9ba9c4] text-[15px] leading-relaxed py-2">
            Rubén Darío 43<br />
            Rincón del Bosque, Polanco V Secc<br />
            Miguel Hidalgo, 11580<br />
            Ciudad de México, CDMX
          </div>
        </div>

      </div>

      {/* 4. BOTTOM LINE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="w-full h-px bg-[#7da4ff]/10 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9ba9c4] text-[15px]">
            Todos los derechos reservados para @A BLANK
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0175ff] shadow-[0_0_10px_#0175ff] animate-pulse" />
            <span className="text-[#9ba9c4] text-[15px]">Sistemas activos en línea</span>
          </div>
        </div>
      </div>
      
    </footer>
  );
}

// Componente auxiliar interno para links
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="group flex items-center justify-between py-2 transition-colors"
    >
      <span className="text-[#9ba9c4] text-[15px] group-hover:text-white transition-colors">
        {children}
      </span>
    </a>
  );
}