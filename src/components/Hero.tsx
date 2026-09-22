'use client';

import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ESCRITORIO
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline();

        tl.fromTo(['.hero-badge', '.hero-line', '.hero-sub', '.hero-ctas-wrapper'], 
          { opacity: 0, filter: 'blur(16px)', y: 30 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, stagger: 0.15, ease: 'power2.out' }
        )
        .fromTo(dashboardRef.current, 
          { opacity: 0, filter: 'blur(16px)', y: 40 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out', clearProps: 'transform,filter' }, 
          '-=1'
        );

        const statsTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.stats-container-wrapper',
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          defaults: { ease: 'power4.out' }
        });

        statsTl.fromTo('.stats-outer-border', 
          { opacity: 0, scaleX: 0.9, scaleY: 0.95 },
          { opacity: 1, scaleX: 1, scaleY: 1, duration: 1 }
        )
        .from('.hero-stat-value', {
          yPercent: 100, 
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
        }, '-=0.6')
        .from('.hero-stat-label', {
          y: 10,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
        }, '-=0.6');
      });

      // MÓVIL
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline();

        tl.fromTo(['.hero-badge', '.hero-line', '.hero-sub', '.hero-ctas-wrapper'], 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }
        )
        .fromTo(dashboardRef.current, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', clearProps: 'transform' }, 
          '-=0.8'
        );

        const statsTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.stats-container-wrapper',
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          defaults: { ease: 'power2.out' }
        });

        statsTl.fromTo('.stats-outer-border', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 }
        )
        .from('.hero-stat-value', {
          yPercent: 50, 
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
        }, '-=0.5')
        .from('.hero-stat-label', {
          y: 5,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
        }, '-=0.6');
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
      
      {/* =========================================================
          BACKGROUND (Video + Atmósfera)
          AQUÍ ESTÁ LA SOLUCIÓN: El maskImage hace que todo este
          bloque se desvanezca antes de tocar la sección de abajo.
          ========================================================= */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
        }}
      >
        <video 
          src="https://framerusercontent.com/assets/XyQKBChh8CZBaaXrJoxPbwvI.mp4" 
          loop 
          muted 
          playsInline 
          autoPlay 
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: 'url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png")',
            backgroundSize: '128px auto',
            backgroundRepeat: 'repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      <div className="hero-text-content relative z-10 w-full px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="hero-badge mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/80 md:bg-white/5 md:backdrop-blur-md">
          <span className="text-[10px] sm:text-xs font-medium text-white/80 uppercase tracking-[0.05em]">
            Plataforma de digitalización
          </span>
        </div>

        {/* Titular */}
        <div className="max-w-4xl">
          <h1 className="font-display font-semibold text-white text-balance tracking-[-0.03em]" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1.05 }}>
            <span className="hero-line block will-change-transform pb-2">Escala tu negocio,</span>
            <span className="hero-line block will-change-transform pb-2">no tu caos.</span>
          </h1>
        </div>

        {/* Subtexto */}
        <p className="hero-sub mt-6 max-w-2xl text-balance text-white/70 font-light" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', lineHeight: 1.6 }}>
          Tu equipo pierde horas todos los días en tareas mecánicas. Construimos la infraestructura tecnológica para que operes sin cuellos de botella: ecosistemas web, automatizaciones a medida y tu CRM conectado a WhatsApp.
        </p>

        {/* CTAs Centrados */}
        <div className="hero-ctas-wrapper mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <a 
            href="#casos" 
            className="hero-cta group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 overflow-hidden"
            style={{
              borderRadius: '16px',
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
            {/* Destello de luz que cruza (Shine) */}
            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
            
            <span className="relative z-10 flex items-center gap-2">
              Ver simulación
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          <a 
            href="https://wa.me/525576048470?text=Hola,%20vi%20su%20anuncio.%20Me%20interesa%20automatizar%20los%20procesos%20de%20mi%20empresa." 
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white transition-all duration-500 hover:scale-[1.02] active:scale-95 overflow-hidden bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.2] backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),_0_10px_20px_rgba(0,0,0,0.4)]"
            style={{ borderRadius: '16px' }}
          >
            {/* Reflejo de volumen (borde superior interno) */}
            <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            
            {/* Resplandor líquido que reacciona al hover */}
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Destello de luz que cruza de izquierda a derecha (Shine) */}
            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
            
            <span className="relative z-10 tracking-wide">Agendar diagnóstico</span>
          </a>
        </div>
      </div>

      {/* Dashboard Visual */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 md:mt-20 px-4 sm:px-6" style={{ perspective: '1200px' }}>
        <div 
          ref={dashboardRef} 
          className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.03)] bg-black/80 md:bg-black/40 md:backdrop-blur-xl"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
          }}
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
          
                    <img 
            src="https://res.cloudinary.com/p9tnym3u/image/upload/f_auto,q_auto/v1789087899/A_BLANK_1.png" 
            alt="Interfaz de la plataforma" 
            fetchpriority="high"
            className="w-full h-auto object-cover block"
          />
        </div>
      </div>

      {/* Barra de Estadísticas */}
      <div className="stats-container-wrapper relative z-10 w-full max-w-5xl mx-auto mt-16 md:mt-20 px-4 sm:px-6">
        <div className="absolute inset-x-12 -top-4 h-20 bg-blue-500/5 blur-[40px] md:blur-3xl rounded-full pointer-events-none" />

        <div className="stats-outer-border relative rounded-2xl md:rounded-3xl p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-[23px] overflow-hidden bg-[#06070a] md:bg-white/5 md:backdrop-blur-xl">
            {[
              { value: '14+', label: 'Sistemas integrados', sub: 'CRM, ERP y canales' },
              { value: '99.9%', label: 'Disponibilidad', sub: 'Operación ininterrumpida' },
              { value: '100%', label: 'Sincronización', sub: 'Datos en tiempo real' },
              { value: '01', label: 'Núcleo centralizado', sub: 'Control total de negocio' },
            ].map((stat, i) => (
              <div
                key={i}
                className="hero-stat-card group relative p-5 sm:p-8 text-center bg-black/50 flex flex-col justify-center items-center overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(1,117,255,0.08)_0%,transparent_70%)] pointer-events-none" />

                <div className="absolute top-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-blue-400/30 transition-colors duration-500" />

                <div className="overflow-hidden mb-1 w-full">
                  <div className="hero-stat-value font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-[-0.03em]">
                    {stat.value}
                  </div>
                </div>

                <div className="hero-stat-label w-full mt-1 md:mt-0">
                  <div className="text-[10px] sm:text-[11px] md:text-xs font-medium text-white/80 uppercase tracking-[0.08em] group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/40 tracking-wide mt-1 md:mt-1.5 font-light group-hover:text-white/60 transition-colors">
                    {stat.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}