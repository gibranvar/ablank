'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Plus } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const faqsCol1 = [
  {
    q: '¿Qué hace exactamente su empresa?',
    a: 'Diseñamos y desarrollamos soluciones digitales para empresas: desde sitios web y sistemas a medida hasta automatizaciones, integraciones e inteligencia artificial.'
  },
  {
    q: '¿Solo hacen páginas web?',
    a: 'No. Una web es solo una parte de lo que hacemos. También automatizamos procesos, conectamos herramientas y desarrollamos sistemas que ayudan a las empresas a operar mejor.'
  },
  {
    q: '¿Qué tipo de procesos pueden automatizar?',
    a: 'Prácticamente cualquier proceso repetitivo o que dependa demasiado de trabajo manual: seguimiento de prospectos, captura de información, notificaciones, generación de documentos, atención, sincronización de datos e integraciones entre plataformas.'
  },
  {
    q: '¿Pueden desarrollar algo que no aparece en sus servicios?',
    a: 'Sí. Trabajamos a partir del problema y no de una solución prefabricada. Si tu empresa necesita una herramienta, integración o flujo específico, podemos diseñarlo y desarrollarlo a medida.'
  }
];

const faqsCol2 = [
  {
    q: '¿Trabajan con las herramientas que ya utiliza mi empresa?',
    a: 'Sí. Podemos integrar sistemas y plataformas existentes para evitar cambiar toda tu operación. La idea es hacer que las herramientas que ya utilizas trabajen juntas.'
  },
  {
    q: '¿Cómo es el proceso para empezar un proyecto?',
    a: 'Primero entendemos tu negocio, identificamos qué se puede mejorar y definimos la solución adecuada. Después diseñamos, desarrollamos e implementamos, buscando que todo quede integrado y listo para operar.'
  },
  {
    q: '¿Trabajan con empresas de cualquier tamaño?',
    a: 'Sí. Podemos crear desde una presencia digital desde cero hasta sistemas y automatizaciones más complejas para operaciones que ya están creciendo.'
  },
  {
    q: '¿Por qué elegirlos a ustedes?',
    a: 'Porque no nos limitamos a entregar una web o una automatización aislada. Buscamos entender cómo funciona tu negocio y construir soluciones que realmente mejoren la forma en que vende, opera y crece.'
  }
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-card border rounded-[20px] md:rounded-[24px] relative overflow-hidden md:backdrop-blur-xl transition-all duration-500 ${isOpen ? 'bg-[#06070a] md:bg-black border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'bg-[#0a0a0c] md:bg-white/5 border-white/10 shadow-[0_5px_20px_rgba(0,0,0,0.3)] hover:bg-white/[0.07]'}`}>
      
      <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full pointer-events-none transition-all duration-500 blur-[50px] md:blur-[100px] ${isOpen ? 'bg-[#0175ff]/20 opacity-100' : 'bg-[#0175ff]/10 opacity-0'}`} />
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left px-5 md:px-8 flex justify-between items-center gap-4 md:gap-6 group relative z-10 min-h-[76px] md:min-h-[104px]"
      >
        <span className="font-medium text-[15px] md:text-[18px] text-white leading-snug">
          {q}
        </span>
        
        <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 border ${isOpen ? 'bg-white text-black border-white rotate-45 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-black/50 border-white/10 text-white/80 group-hover:bg-white/10'}`}>
          <Plus size={16} className="transition-transform duration-300 md:w-[18px] md:h-[18px]" />
        </div>
      </button>

      <div 
        className={`relative z-10 transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="px-5 pb-5 md:px-8 md:pb-6 text-white/70 text-[14px] md:text-[16px] leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // ESCRITORIO
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' }
      });
      
      tl.fromTo('.faq-header', 
        { opacity: 0, filter: 'blur(16px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out' }
      )
      .fromTo('.faq-card',
        { opacity: 0, filter: 'blur(16px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, stagger: 0.1, ease: 'power2.out' },
        '-=1'
      );
    });

    // MÓVIL
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%' }
      });
      
      tl.fromTo('.faq-header', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo('.faq-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' },
        '-=0.8'
      );
    });

    return () => mm.revert();
  }, { scope: rootRef });

  return (
    <section id="faq" ref={rootRef} className="relative w-full py-16 md:py-32 overflow-hidden font-sans ">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[60px] md:blur-[120px] rounded-[100%] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="faq-header text-center mb-16 md:mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/80 md:bg-white/5 mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] md:backdrop-blur-md">
            
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">Preguntas Frecuentes</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight leading-tight text-balance">
            <span className="block text-white">¿Tienes dudas sobre</span>
            <span className="block bg-gradient-to-r from-[#0175ff] to-[#ffcd7d] bg-clip-text text-transparent pb-2">
              cómo trabajamos?
            </span>
          </h2>
          
          <p className="text-[16px] md:text-[18px] text-white/50 max-w-xl mx-auto text-balance">
            Respuestas a las preguntas más comunes sobre nuestros servicios, procesos e integraciones empresariales.
          </p>
        </div>

        <div className="w-[90%] md:w-full mx-auto grid lg:grid-cols-2 gap-3 md:gap-6 items-start">
          
          <div className="space-y-3 md:space-y-5">
            {faqsCol1.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="space-y-3 md:space-y-5">
            {faqsCol2.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}