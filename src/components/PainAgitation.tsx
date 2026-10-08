'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileSpreadsheet, ServerCrash, FileWarning, AlertTriangle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function PainAgitation() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
      });
      
      tl.fromTo('.pain-header > *', 
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: 'power2.out' }
      )
      .fromTo('.bento-item',
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.2)' },
        '-=0.5'
      )
      .fromTo('.bento-bar-red', { width: '0%' }, { width: '12%', duration: 1.5, ease: 'power3.out' }, '-=0.5')
      .fromTo('.bento-bar-blue', { width: '0%' }, { width: '70%', duration: 1.5, ease: 'power3.out' }, '<')
      .fromTo('.bento-error-badge', { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(3)' }, '-=1');
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' }
      });
      
      tl.fromTo('.pain-header > *', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      )
      .fromTo('.bento-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.bento-bar-red', { width: '0%' }, { width: '12%', duration: 1.5, ease: 'power3.out' }, '-=0.5')
      .fromTo('.bento-bar-blue', { width: '0%' }, { width: '70%', duration: 1.5, ease: 'power3.out' }, '<')
      .fromTo('.bento-error-badge', { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(3)' }, '-=0.8');
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="fuga" ref={containerRef} className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-[#020202]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(127,29,29,0.15),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="pain-header text-center will-change-[transform,opacity] mb-16 md:mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 mb-6">
            <span className="text-xs font-medium text-red-400 uppercase tracking-widest">Fuga de Capital</span>
          </div>
          <h2>
            <span>Por qué tu pipeline pierde</span>
            <span>conversiones</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto text-balance">
            La fricción operativa es el asesino silencioso de tus cierres. Si tu proceso de cotización depende de hojas de cálculo, PDFs manuales y días de espera, literalmente estás financiando a tu competencia.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">
          
          {/* Bento 1: El Impacto (Grande) */}
          <div className="bento-item will-change-[transform,opacity] md:col-span-2 lg:col-span-2 bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl">
             <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent_70%)] pointer-events-none -translate-y-1/4 translate-x-1/4" />
             <div className="flex-1 space-y-4 relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-2">
                 <AlertTriangle size={14} className="text-red-400" />
                 <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Deal Lost</span>
               </div>
               <h3 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight text-balance">
                 Para cuando envías el PDF, el cliente ya firmó con tu competidor.
               </h3>
               <p className="text-white/50 text-sm md:text-base max-w-md">
                 Los procesos manuales fragmentan la información y asesinan el momentum de ventas.
               </p>
             </div>
             
             {/* Micro-UI: Tasa de Cierre */}
             <div className="w-full md:w-64 bg-black/50 border border-white/10 rounded-2xl p-5 relative z-10 flex flex-col gap-4">
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">Tu Tasa de Cierre</p>
                  <p className="text-4xl font-display font-bold text-red-400">12%</p>
                  <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <div className="bento-bar-red h-full bg-red-500 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">Competencia Automatizada</p>
                  <p className="text-2xl font-display font-bold text-white/90">70%</p>
                  <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <div className="bento-bar-blue h-full bg-blue-500 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
             </div>
          </div>

          {/* Bento 2: Excel Hell */}
          <div className="bento-item will-change-[transform,opacity] bg-[#0a0a0c] border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col group">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20 group-hover:scale-110 transition-transform">
              <FileSpreadsheet size={20} className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Excel Hell</h3>
            <p className="text-sm text-white/50 flex-1">
              Captura manual de datos. Hojas desactualizadas. Un error de dedo y el margen de ganancia desaparece.
            </p>
            {/* Visual representation: Advanced Micro-UI */}
            <div className="mt-6 -mx-2 h-36 bg-[#0d1117]/80 border border-white/10 rounded-xl p-3 relative overflow-hidden flex flex-col font-mono text-[9px] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] opacity-90 group-hover:opacity-100 transition-opacity">
              
              {/* Fake Excel Toolbar */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                <div className="w-12 h-3 bg-white/5 text-white/40 rounded-sm flex items-center px-1">fx</div>
                <div className="flex-1 h-3 bg-white/10 text-white/50 rounded-sm flex items-center px-1">=SUM(C2:C4)*#REF!</div>
              </div>
              
              {/* Fake Excel Grid */}
              <div className="flex flex-col gap-[1px] bg-white/5 flex-1 p-[1px] rounded border border-white/5">
                <div className="flex gap-[1px] h-5">
                  <div className="w-6 bg-black/40 flex items-center justify-center text-white/30">1</div>
                  <div className="flex-1 bg-black/20 flex items-center px-2 text-white/60">Cotiz_FINAL_v4.xlsx</div>
                  <div className="w-12 bg-black/20 flex items-center justify-end px-1 text-white/60"></div>
                </div>
                <div className="flex gap-[1px] h-5">
                  <div className="w-6 bg-black/40 flex items-center justify-center text-white/30">2</div>
                  <div className="flex-1 bg-black/20 flex items-center px-2 text-white/60">Válvulas 2"</div>
                  <div className="w-12 bg-black/20 flex items-center justify-end px-1 text-white/60">$4,500</div>
                </div>
                <div className="flex gap-[1px] h-5 relative z-10">
                  <div className="w-6 bg-red-900/40 border-r border-red-500/50 flex items-center justify-center text-red-400 font-bold">3</div>
                  <div className="flex-1 bg-red-500/10 border-y border-l border-red-500/50 flex items-center px-2 text-red-400 font-bold relative">
                    MARGEN_NETO
                    {/* Error Tooltip */}
                    <div className="absolute -top-7 left-2 bg-red-500 text-white text-[8px] px-2 py-1 rounded shadow-lg whitespace-nowrap animate-pulse flex items-center gap-1 z-20">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      #DIV/0!
                    </div>
                  </div>
                  <div className="w-12 bg-red-500/20 border-y border-r border-red-500/50 flex items-center justify-end px-1 text-red-400 font-bold">#REF!</div>
                </div>
                <div className="flex gap-[1px] h-5">
                  <div className="w-6 bg-black/40 flex items-center justify-center text-white/30">4</div>
                  <div className="flex-1 bg-black/20 flex items-center px-2 text-white/60">Envío MTY</div>
                  <div className="w-12 bg-black/20 flex items-center justify-end px-1 text-white/60">$1,200</div>
                </div>
              </div>
              
              {/* Fade out bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Bento 3: Sistemas Legacy */}
          <div className="bento-item will-change-[transform,opacity] bg-[#0a0a0c] border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <ServerCrash size={20} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sistemas Legacy</h3>
            <p className="text-sm text-white/50 flex-1">
              ERPs lentos y desconectados. Consultas cruzadas interminables para saber si hay inventario disponible.
            </p>
            {/* Visual representation: Terminal Micro-UI */}
            <div className="mt-6 -mx-2 h-36 bg-[#0a0a0a] border border-white/10 rounded-xl p-3 relative overflow-hidden font-mono text-[9px] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] opacity-90 group-hover:opacity-100 transition-opacity flex flex-col">
              {/* Terminal Header */}
              <div className="flex items-center gap-1.5 mb-2 border-b border-white/10 pb-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                <span className="ml-2 text-white/30 text-[8px]">legacy_erp_sync.sh</span>
              </div>
              {/* Terminal Body */}
              <div className="flex flex-col gap-1 text-white/50">
                <div><span className="text-purple-400">&gt;</span> ping inventory.db.local</div>
                <div className="text-red-400/80">Request timeout for icmp_seq 0</div>
                <div className="text-yellow-400/80">Retrying connection (Attempt 1/5)...</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-3 h-3 border-2 border-white/20 border-t-purple-400 rounded-full animate-spin" />
                  <span className="text-white/30">Querying stock_status... 45s</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Bento 4: PDF Manual */}
          <div className="bento-item will-change-[transform,opacity] md:col-span-2 lg:col-span-2 bg-[#0a0a0c] border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20">
                <FileWarning size={20} className="text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Formato y Diseño Manual</h3>
              <p className="text-white/50 text-sm max-w-sm">
                Tu equipo pasa más tiempo copiando y pegando logos en Word que cerrando ventas. El PDF final sale con errores de formato.
              </p>
            </div>
            
            {/* Visual representation */}
            <div className="w-full md:w-64 h-32 bg-white rounded-lg p-4 relative shadow-2xl origin-bottom-right rotate-3 md:-mr-4 border border-white/10 opacity-90">
               <div className="w-8 h-8 bg-blue-100 rounded mb-2" />
               <div className="w-3/4 h-2 bg-gray-200 rounded mb-4" />
               <div className="space-y-1.5">
                 <div className="w-full h-1.5 bg-gray-100 rounded" />
                 <div className="w-5/6 h-1.5 bg-red-100 rounded border border-red-200" />
                 <div className="w-full h-1.5 bg-gray-100 rounded" />
               </div>
               <div className="bento-error-badge absolute top-8 right-4 px-2 py-1 bg-red-500 text-white text-[8px] font-bold rounded shadow-lg -rotate-12 animate-pulse" style={{ opacity: 0 }}>
                 ERROR DE PRECIO
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
