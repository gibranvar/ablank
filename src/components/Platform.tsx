'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe, Users, MessageSquare, Zap, Cpu, BarChart3, Target, Database, Code } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Platform() {
  const root = useRef<HTMLElement>(null);

  const modules = [
    { icon: Globe, label: 'Website', desc: 'Front-end' },
    { icon: Target, label: 'Ads', desc: 'Captación' },
    { icon: Users, label: 'CRM', desc: 'Gestión' },
    
    { icon: Database, label: 'Data', desc: 'Almacén' },
    { icon: Cpu, label: 'A Blank', desc: 'Núcleo Central', isCore: true }, 
    { icon: BarChart3, label: 'Analytics', desc: 'Métricas' },
    
    { icon: MessageSquare, label: 'WhatsApp', desc: 'Chat' },
    { icon: Zap, label: 'Auto', desc: 'Triggers' },
    { icon: Code, label: 'Software', desc: 'API' },
  ];

  const connectionPaths = [
    'M 75 75 C 75 162.5, 250 162.5, 250 250',       
    'M 250 75 C 250 162.5, 250.1 162.5, 250.1 250', 
    'M 425 75 C 425 162.5, 250 162.5, 250 250',     
    
    'M 75 250 C 162.5 250, 162.5 250.1, 250 250.1', 
    'M 425 250 C 337.5 250, 337.5 250.1, 250 250.1',
    
    'M 75 425 C 75 337.5, 250 337.5, 250 250',      
    'M 250 425 C 250 337.5, 250.1 337.5, 250.1 250',
    'M 425 425 C 425 337.5, 250 337.5, 250 250',    
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ==========================================
      // ESTADO INICIAL COMPARTIDO
      // ==========================================
      gsap.set('.core-beam', { height: 0, opacity: 0 });
      gsap.set('.vein-track', { opacity: 0 });
      gsap.set('.data-pulse', { opacity: 0 });

      // ==========================================
      // ESCRITORIO (768px+): Animación 3D Premium
      // ==========================================
      mm.add("(min-width: 768px)", () => {
        gsap.set('.matrix-node', { z: 250, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 55%', 
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo('.pf-headline',
          { opacity: 0, filter: 'blur(16px)', y: 30 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2.5, ease: 'power2.out' }
        );

        tl.to('.matrix-node', {
          z: 0,
          opacity: 1,
          duration: 3.5,
          ease: 'power3.inOut',
          stagger: { amount: 1.5, from: 'center' } 
        }, '-=1.5'); 

        tl.to('.vein-track', { opacity: 1, duration: 2, ease: 'power2.inOut' }, '-=1.5');
        tl.to('.data-pulse', { opacity: 1, duration: 1 }, '-=1');
        tl.to('.core-beam', { height: '200px', opacity: 1, duration: 2.5, ease: 'power2.out' }, '-=1');

        gsap.to('.data-pulse', {
          strokeDashoffset: -150, 
          ease: 'none',
          duration: 1, 
          repeat: -1
        });
      });

      // ==========================================
      // MÓVIL (-768px): Animación Ultra-Ligera (60fps)
      // ==========================================
      mm.add("(max-width: 767px)", () => {
        // En móvil no caen desde el eje Z, solo un ligero offset en Y para no saturar la matriz
        gsap.set('.matrix-node', { y: 30, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 65%', 
            toggleActions: 'play none none none',
          },
        });

        // Sin blur, solo opacidad y deslizamiento
        tl.fromTo('.pf-headline',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );

        // Fade-in secuencial fluido sin cálculos 3D pesados
        tl.to('.matrix-node', {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          stagger: { amount: 1, from: 'center' } 
        }, '-=0.5'); 

        tl.to('.vein-track', { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, '-=0.8');
        tl.to('.data-pulse', { opacity: 1, duration: 1 }, '-=0.5');
        tl.to('.core-beam', { height: '200px', opacity: 1, duration: 1.5, ease: 'power2.out' }, '-=0.5');

        // El bucle infinito es un poco más lento (duration 2) para darle respiro al GPU
        gsap.to('.data-pulse', {
          strokeDashoffset: -150, 
          ease: 'none',
          duration: 2, 
          repeat: -1
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    // Se ajustó a py-16 para móviles y py-32 para escritorio (menos espacios vacíos en celular)
    <section ref={root} id="plataforma" className="relative w-full py-16 md:py-32 overflow-hidden flex flex-col items-center justify-center perspective-[2000px]">
      
      {/* =========================================
          TITULAR (Efecto Apple optimizado)
          ========================================= */}
      <div className="pf-headline relative w-full flex flex-col items-center justify-center z-30 pointer-events-none mt-10 mb-16 md:mb-24 px-4 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] md:backdrop-blur-md">
          
          <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">Interconexión en Tiempo Real</span>
        </div>
        
        <h2 className="font-display font-semibold text-white text-balance tracking-[-0.03em]" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
          <span className="block pb-1">Toda tu operación.</span>
          <span className="block bg-gradient-to-r from-[#0175ff] to-[#ffcd7d] bg-clip-text text-transparent pb-2">
            Centralizada en un solo ecosistema.
          </span>
        </h2>
        
      </div>

      {/* =========================================
          LA MATRIZ ISOMÉTRICA
          ========================================= */}
      <div className="relative flex-1 w-full max-w-[800px] flex items-center justify-center z-20 scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100">
        
        <div 
          className="relative w-[500px] h-[500px]"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(55deg) rotateZ(-45deg)' }}
        >
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500" style={{ transform: 'translateZ(-15px)' }}>
            <defs>
              <filter id="neon-glow" filterUnits="userSpaceOnUse" x="-100" y="-100" width="700" height="700">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {connectionPaths.map((pathD, i) => (
              <g key={i}>
                <path 
                  d={pathD} 
                  className="vein-track"
                  fill="transparent" 
                  stroke="rgba(125, 164, 255, 0.16)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                />
                <path 
                  d={pathD} 
                  className="data-pulse"
                  fill="transparent" 
                  stroke="rgb(1, 117, 255)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  strokeDasharray="30 120" 
                  filter="url(#neon-glow)"
                />
              </g>
            ))}
          </svg>

          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-6 z-10" style={{ transformStyle: 'preserve-3d' }}>
            
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <div 
                  key={i} 
                  className="matrix-node relative w-full h-full rounded-2xl flex flex-col items-center justify-center p-4 transition-transform duration-500 hover:scale-[1.02] cursor-default"
                  style={{ 
                    background: mod.isCore 
                      ? 'linear-gradient(145deg, rgba(30,58,138,0.5) 0%, rgba(15,23,42,0.9) 100%)' 
                      : 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 40%, rgba(0,0,0,0.85) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderTop: '1px solid rgba(255,255,255,0.3)', 
                    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 20px 40px rgba(0,0,0,0.7)',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity'
                  }}
                >
                  <div className="absolute bottom-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  {mod.isCore && (
                    <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-blue-500/30 to-transparent blur-md pointer-events-none" />
                  )}

                  {mod.isCore && (
                    <div 
                      className="core-beam absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5px] bg-blue-300 shadow-[0_0_20px_4px_rgba(96,165,250,0.9)] z-50 origin-bottom"
                      style={{ transform: 'rotateX(-90deg) rotateY(45deg)' }}
                    />
                  )}

                  <div 
                    className="relative flex flex-col items-center gap-3 z-10 text-center"
                    style={{ transform: 'translateZ(15px)' }} 
                  >
                    {/* Quitamos el backdrop-blur en celulares y solo lo activamos en md: */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center md:backdrop-blur-md border ${mod.isCore ? 'bg-[#1a2235] md:bg-blue-500/10 border-blue-400/40 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/10 md:bg-white/5 border-white/10'}`}>
                      <Icon size={20} className={mod.isCore ? "text-blue-300 drop-shadow-[0_0_8px_rgba(96,165,250,1)]" : "text-white/60"} />
                    </div>
                    <div>
                      <h4 className={`font-display font-medium text-[13px] tracking-wide ${mod.isCore ? 'text-white' : 'text-white/90'}`}>{mod.label}</h4>
                      <p className="text-blue-400/70 text-[9px] tracking-widest uppercase mt-0.5">{mod.desc}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}