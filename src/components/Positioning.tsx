'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe, Users, MessageSquare, Bot } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Positioning() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ESTADO INICIAL COMPARTIDO
      gsap.set('.core-beam', { height: 0, opacity: 0 });

      // ==========================================
      // ESCRITORIO (768px o más): Animación Completa
      // ==========================================
      mm.add("(min-width: 768px)", () => {
        gsap.set('.layer-3', { x: -180, y: -200, z: 350, rotationZ: -25, opacity: 0.6 });
        gsap.set('.layer-2', { x: 220, y: -120, z: 280, rotationZ: 35, opacity: 0.6 });
        gsap.set('.layer-1', { x: -160, y: 200, z: 180, rotationZ: -30, opacity: 0.6 });
        gsap.set('.layer-0', { x: 180, y: 150, z: 80, rotationZ: 25, opacity: 0.6 });
        gsap.set('.aurora-blue', { opacity: 0, scale: 0.5 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 55%', 
            toggleActions: 'play none none none',
          },
        });

        tl.to({}, { duration: 1.5 });

        tl.to('.text-problem', { opacity: 0, filter: 'blur(16px)', y: -30, duration: 2.5, ease: 'power2.inOut' })
          .fromTo('.text-solution', 
            { opacity: 0, filter: 'blur(16px)', y: 30 }, 
            { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2.5, ease: 'power2.inOut' }, 
            '-=1.5' 
          );

        tl.to('.aurora-red, .aurora-orange', { opacity: 0, scale: 0.8, duration: 4, ease: 'power2.inOut' }, '<')
          .to('.aurora-blue', { opacity: 1, scale: 1.2, duration: 5, ease: 'power2.out' }, '<');

        tl.to('.layer-3', { x: 0, y: 0, z: 120, rotationZ: 0, opacity: 1, duration: 4, ease: 'power3.inOut' }, '<0.2')
          .to('.layer-2', { x: 0, y: 0, z: 80, rotationZ: 0, opacity: 1, duration: 4, ease: 'power3.inOut' }, '<0.2')
          .to('.layer-1', { x: 0, y: 0, z: 40, rotationZ: 0, opacity: 1, duration: 4, ease: 'power3.inOut' }, '<0.2')
          .to('.layer-0', { x: 0, y: 0, z: 0, rotationZ: 0, opacity: 1, duration: 4, ease: 'power3.inOut' }, '<0.2');

        tl.to('.core-beam', { height: '300px', opacity: 1, duration: 3, ease: 'power2.inOut' }, '-=2');
      });

      // ==========================================
      // MÓVIL (Menos de 768px): Animación Ultra-Ligera a 60fps
      // ==========================================
      mm.add("(max-width: 767px)", () => {
        gsap.set('.layer-3', { y: -80, opacity: 0 });
        gsap.set('.layer-2', { y: -40, opacity: 0 });
        gsap.set('.layer-1', { y: 40, opacity: 0 });
        gsap.set('.layer-0', { y: 80, opacity: 0 });
        gsap.set('.aurora-blue', { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%', 
            toggleActions: 'play none none none',
          },
        });

        tl.to({}, { duration: 0.5 });

        tl.to('.text-problem', { opacity: 0, y: -20, duration: 1, ease: 'power2.inOut' })
          .fromTo('.text-solution', 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut' }, 
            '-=0.8' 
          );

        tl.to('.aurora-red, .aurora-orange', { opacity: 0, duration: 2 }, '<')
          .to('.aurora-blue', { opacity: 0.8, duration: 2 }, '<');

        tl.to('.layer-3', { y: 0, z: 120, opacity: 1, duration: 1.5, ease: 'power2.out' }, '<0.2')
          .to('.layer-2', { y: 0, z: 80, opacity: 1, duration: 1.5, ease: 'power2.out' }, '<0.2')
          .to('.layer-1', { y: 0, z: 40, opacity: 1, duration: 1.5, ease: 'power2.out' }, '<0.2')
          .to('.layer-0', { y: 0, z: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }, '<0.2');

        tl.to('.core-beam', { height: '300px', opacity: 1, duration: 1.5, ease: 'power2.inOut' }, '-=1');
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const stackLayers = [
    { icon: Bot, label: 'IA Central', desc: 'Procesamiento Core' },
    { icon: MessageSquare, label: 'WhatsApp', desc: 'Mensajería Unificada' },
    { icon: Users, label: 'CRM Leads', desc: 'Gestión Inteligente' },
    { icon: Globe, label: 'Web & Shop', desc: 'Escaparate Digital' },
  ];

  return (
    <section ref={containerRef} className="relative w-full py-16 md:py-48 overflow-hidden flex flex-col items-center justify-center perspective-[2000px]">
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="aurora-red absolute top-[20%] left-[30%] w-[350px] h-[350px] bg-red-600/20 blur-[40px] md:blur-[80px] rounded-full" />
        <div className="aurora-orange absolute bottom-[20%] right-[30%] w-[400px] h-[400px] bg-orange-500/15 blur-[40px] md:blur-[80px] rounded-full" />
        <div className="aurora-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0175ff]/20 blur-[60px] md:blur-[150px] rounded-full opacity-0" />
      </div>

      {/* AQUÍ ESTÁ LA MAGIA: Máscara de gradiente para suavizar la textura de ruido arriba y abajo */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none z-0"
        style={{
          backgroundImage: 'url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png")',
          backgroundSize: '128px auto',
          backgroundRepeat: 'repeat',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      />

      <div className="relative w-full h-[140px] flex items-center justify-center z-30 pointer-events-none mt-10 mb-24 md:mb-32">
        
        <div className="text-problem absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] md:backdrop-blur-md">
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">Infraestructura Rota</span>
          </div>
          <h2 className="font-display font-semibold text-white text-balance tracking-[-0.03em]" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1 }}>
            <span className="block pb-1">Chats saturados y</span>
            <span className="block text-white/40 font-light">operación manual en Excel.</span>
          </h2>
        </div>

        <div className="text-solution absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] md:backdrop-blur-md">
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">Arquitectura Sólida</span>
          </div>
          <h2 className="font-display font-semibold text-white text-balance tracking-[-0.03em]" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1 }}>
            <span className="block pb-1">Un Sistema Central</span>
            <span className="block bg-gradient-to-r from-[#0175ff] to-[#ffcd7d] bg-clip-text text-transparent pb-2">construido a tu medida.</span>
          </h2>
        </div>
      </div>

      <div className="relative flex-1 w-full max-w-[500px] flex items-center justify-center z-20 scale-75 md:scale-100 mt-10 md:mt-16">
        <div 
          className="relative w-[340px] h-[340px]"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(55deg) rotateZ(-45deg)' }}
        >
          <div 
            className="core-beam absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] bg-[#0175ff] shadow-[0_0_20px_4px_rgba(1,117,255,0.8)] z-50 origin-bottom"
            style={{ transform: 'rotateX(-90deg) rotateY(45deg)' }}
          />

          {stackLayers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <div 
                key={i} 
                className={`layer-${i} absolute inset-0 rounded-3xl border border-white/10 flex flex-col items-start justify-end p-6 shadow-2xl overflow-hidden`}
                style={{ 
                  background: i === 0 
                    ? 'linear-gradient(135deg, rgba(1,117,255,0.2) 0%, rgba(2,6,23,0.8) 100%)' 
                    : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.8) 100%)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity'
                }}
              >
                <div 
                  className="relative flex items-center gap-4 z-10"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 md:bg-white/5 border border-white/10 flex items-center justify-center md:backdrop-blur-sm">
                    <Icon size={20} className={i === 0 ? "text-[#0175ff]" : "text-white/80"} />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-medium text-lg tracking-wide">{layer.label}</h4>
                    <p className="text-white/40 text-xs tracking-wider uppercase">{layer.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}