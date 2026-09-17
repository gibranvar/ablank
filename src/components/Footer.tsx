'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ArrowRight } from 'lucide-react';
import { pushToDataLayer } from '../utils/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ESCRITORIO
    mm.add("(min-width: 768px)", () => {
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
    });

    // MÓVIL
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' }
      });
      
      tl.fromTo('h2 > span', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }
      )
      .fromTo('.footer-sub',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo('.footer-cta',
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.2)' },
        '-=0.8'
      )
      .fromTo('.footer-giant-bg',
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.inOut' },
        '-=1'
      );
    });

    return () => mm.revert();
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative pt-16 md:pt-32 pb-8 overflow-hidden font-sans">
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mb-16 flex flex-col items-center">
        
        <h2>
          <span>Delega el caos operativo.</span>
          <span>Escala con inteligencia.</span>
        </h2>
        
        <p className="footer-sub text-[#9ba9c4] text-lg md:text-xl max-w-2xl mx-auto mb-10 text-balance">
          Construimos el ecosistema exacto que tu empresa necesita para captar clientes, procesar ventas y operar 24/7 sin depender de ti.
        </p>
        
        <a 
          href="https://w.app/5vug7u" 
          target="_blank"
          onClick={() => pushToDataLayer('click_whatsapp', { location: 'footer_cta' })}
          className="footer-cta group inline-flex items-center justify-center gap-2 px-6 py-3 md:px-10 md:py-4 rounded-[12px] md:rounded-[16px] bg-[#020202] border border-white/40 text-white font-medium text-sm md:text-lg transition-transform hover:scale-[1.02] active:scale-95 shadow-2xl"
          style={{
            boxShadow: '0px 11px 11px -3px rgba(0,0,0,0.14), 0px 28px 28px -3.75px rgba(0,0,0,0.06), inset -4px 3px 9px 0px #0175ff, inset 3px -2px 8px 0px #ffcd7d, 0 0 40px rgba(1,117,255,0.3)'
          }}
        >
          Iniciar mi diagnóstico
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <div className="footer-giant-bg relative w-full py-16 md:py-32 flex items-center justify-center overflow-hidden mb-16 md:mb-20 pointer-events-none">
        
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
          <span className="text-[28vw] md:text-[22vw] font-display font-bold text-white uppercase tracking-tighter leading-none select-none drop-shadow-none md:drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            A BLANK
          </span>
          <span className="text-[28vw] md:text-[22vw] font-display font-bold text-white/10 uppercase tracking-tighter leading-none select-none">
            A BLANK
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-20">
        
        <div className="flex flex-col">
          <h4 className="text-white font-medium mb-4 md:mb-6">Navegación</h4>
          <nav className="flex flex-col">
            <FooterLink href="#plataforma">Plataforma</FooterLink>
            <FooterLink href="#soluciones">Soluciones</FooterLink>
            <FooterLink href="#simulador">Simulador</FooterLink>
            <FooterLink href="#faq">FAQ</FooterLink>
          </nav>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white font-medium mb-4 md:mb-6">Contacto</h4>
          <nav className="flex flex-col">
            <FooterLink href="mailto:hello@ablank.com.mx">hello@ablank.mx</FooterLink>
            <FooterWALink href="tel:5576048470">55 7604 8470</FooterWALink>
          </nav>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white font-medium mb-4 md:mb-6">Headquarters</h4>
          <div className="text-[#9ba9c4] text-[15px] leading-relaxed py-2">
            Rubén Darío 43<br />
            Rincón del Bosque, Polanco V Secc.<br />
            Ciudad de México, CDMX
          </div>
        </div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="w-full h-px bg-[#7da4ff]/10 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[#9ba9c4] text-[14px] md:text-[15px]">
            © 2026 A BLΛNK. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[#9ba9c4] text-[14px] md:text-[15px]">Design & Developed in Mexico</span>
          </div>
        </div>
      </div>
      
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="group flex items-center justify-start md:justify-between py-2 transition-colors"
    >
      <span className="text-[#9ba9c4] text-[15px] group-hover:text-white transition-colors">
        {children}
      </span>
    </a>
  );
}
function FooterWALink({ children }: { href?: string; children: React.ReactNode }) {
  return (
    <a 
      href={"https://w.app/5vug7u"} 
      target="_blank" 
      onClick={() => pushToDataLayer('click_whatsapp', { location: 'footer_link' })}
      className="group flex items-center justify-start md:justify-between py-2 transition-colors"
    >
      <span className="text-[#9ba9c4] text-[15px] group-hover:text-white transition-colors">
        {children}
      </span>
    </a>
  );
}