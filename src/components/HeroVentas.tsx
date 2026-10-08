'use client';

import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Inbox, Users, FileText, MessageSquare, Database, Check, Menu, User, MoreHorizontal, Download, LayoutDashboard } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function HeroVentas() {
  const root = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Intentar forzar la reproducción para detectar si el celular la bloquea (Ahorro de batería)
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay bloqueado (posible Ahorro de Batería activado). Mostrando foto de respaldo.", error);
          setVideoFailed(true);
        });
      }
    }
  }, []);

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


      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-24 md:pt-32 pb-8 md:pb-12">
      
      {/* BACKGROUND */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none bg-[#050505]"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
        }}
      >
        <div className="absolute inset-0">
          <img 
            src="/mobile-bg-fallback.png"
            alt="Fondo móvil"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/30 to-[#050505]" />
        </div>

        {!videoFailed && (
          <video 
            ref={videoRef}
            src="https://framerusercontent.com/assets/XyQKBChh8CZBaaXrJoxPbwvI.mp4" 
            loop 
            muted 
            playsInline 
            autoPlay 
            className="w-full h-full object-cover relative z-10"
          />
        )}
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
            RevOps & Automatización B2B
          </span>
        </div>

        {/* H1 Oculto para SEO / Accesibilidad (Sniper B2B) */}
        <h1 className="sr-only">Automatización de Cotizaciones B2B y Ecosistemas Lead-to-Cash</h1>

        {/* Titular Visual (Ahora H2 por semántica) */}
        <div className="max-w-4xl">
          <h2 className="font-display font-semibold text-white text-balance tracking-[-0.03em]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', lineHeight: 1.05 }}>
            <span className="hero-line block will-change-transform pb-2">Cotiza en segundos.</span>
            <span className="hero-line block will-change-transform pb-2 text-white/90">Cierra antes que todos.</span>
          </h2>
        </div>

        {/* Subtexto (Ahora H2 para cargar las keywords) */}
        <h2 className="hero-sub mt-6 max-w-2xl text-balance text-white/70 font-light" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.6 }}>
          El 70% de las ventas corporativas se ganan por velocidad. Automatizamos tu pipeline Lead-to-Cash: desde el request en WhatsApp hasta el PDF formal, conectado directo a tu CRM y ERP.
        </h2>

        {/* CTAs Centrados */}
        <div className="hero-ctas-wrapper mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          
          {/* CTA Primario */}
          <a 
            href="#como-funciona" 
            className="hero-cta group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 overflow-hidden"
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
            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
            <span className="relative z-10 flex items-center gap-2">
              Ver simulación en vivo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          {/* CTA Secundario */}
          <a 
            href="#simulador" 
            className="hero-cta group relative inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 text-sm font-semibold text-white transition-all duration-500 hover:scale-[1.02] active:scale-95 overflow-hidden bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.2] backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),_0_10px_20px_rgba(0,0,0,0.4)]"
            style={{ borderRadius: '16px' }}
          >
            {/* Reflejo de volumen (borde superior interno) */}
            <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            {/* Resplandor líquido que reacciona al hover */}
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            {/* Destello de luz que cruza de izquierda a derecha (Shine) */}
            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
            <span className="relative z-10 tracking-wide">Auditar mi proceso</span>
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
          
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes slideInUp {
              0% { opacity: 0; transform: translateY(15px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes flowDown {
              0% { top: 10px; opacity: 0; }
              20% { opacity: 1; }
              80% { top: 90%; opacity: 0; }
              100% { top: 90%; opacity: 0; }
            }
            
            .animate-step-1 { animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.5s; opacity: 0; will-change: transform, opacity; }
            .animate-step-2 { animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 1.8s; opacity: 0; will-change: transform, opacity; }
            .animate-step-3 { animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 3.0s; opacity: 0; will-change: transform, opacity; }
            .animate-step-4 { animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 3.8s; opacity: 0; will-change: transform, opacity; }
            .animate-flow-down { animation: flowDown 3s infinite linear; will-change: transform, opacity; }
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}} />

          {/* Responsive Dashboard Wrapper: Margins on Mobile, Full-width/Fixed on Tablet+ */}
          <div className="w-full md:overflow-y-hidden rounded-none md:rounded-xl shadow-2xl hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="bg-[#121212] flex flex-col md:flex-row relative overflow-hidden text-left w-full h-[650px] md:h-[500px]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
             
             {/* --- MOBILE TOP APP BAR --- */}
             <div className="md:hidden flex items-center justify-between px-4 py-4 bg-[#0a0a0a] border-b border-white/5 z-20">
               <div className="text-white font-medium tracking-wide text-lg flex items-center gap-2">
                Λ BLΛNK
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
                 <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                   <User size={14} className="text-white/70" />
                 </div>
               </div>
             </div>

             {/* --- DESKTOP SIDEBAR --- */}
             <div className="hidden md:flex w-[160px] lg:w-[220px] border-r border-white/5 bg-[#0e0e0e] flex-col p-3 lg:p-4 shrink-0 z-10">
                <div className="flex items-center gap-2 mb-8 text-white px-1">
                  <span className="text-[11px] lg:text-[13px] font-medium tracking-tight">Λ BLΛNK</span>
                </div>
                
                <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">Workspace</div>
                <div className="flex flex-col gap-0.5 mb-6">
                  <div className="flex items-center gap-2 text-[11px] lg:text-[13px] text-white/60 hover:text-white px-2 py-1.5 rounded hover:bg-white/5 cursor-default transition-colors">
                    <Inbox size={14} className="opacity-70" /> Inbox
                  </div>
                  <div className="flex items-center justify-between text-[11px] lg:text-[13px] text-white/90 bg-white/[0.06] px-2 py-1.5 rounded cursor-default border border-white/5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="opacity-70" /> Active Deals
                    </div>
                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/70">12</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] lg:text-[13px] text-white/60 hover:text-white px-2 py-1.5 rounded hover:bg-white/5 cursor-default transition-colors">
                    <FileText size={14} className="opacity-70" /> Quotes
                  </div>
                </div>
             </div>

             {/* --- MAIN CONTENT AREA --- */}
             <div className="flex-1 bg-[#0a0a0a] md:bg-[#161616] flex flex-col overflow-y-auto relative z-0 hide-scrollbar pb-24 md:pb-0">
                {/* Header (Desktop + Mobile inline) */}
                <div className="md:h-12 border-b border-white/5 flex flex-col md:flex-row md:items-center px-4 py-2.5 md:py-0 md:px-6 shrink-0 justify-between bg-[#0e0e0e] md:bg-[#161616]/80 backdrop-blur-sm z-10">
                  <div className="flex items-start md:items-center gap-3 text-[13px] md:text-[11px] lg:text-[13px] max-[340px]:text-[11px] text-white/50">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 font-mono text-[10px] border border-yellow-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                      DEAL- 992
                    </div>
                    <div className="hidden md:block w-px h-4 bg-white/10"></div>
                    <span className="text-white/80 font-medium tracking-tight max-[340px]:text-[11px]">
                      Industrias Corporativas - Póliza de Servicio Anual
                    </span>
                  </div>
                  <div className="hidden md:flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="flex-1 px-3 pt-2 pb-6 md:pl-6 md:pr-[250px] lg:pl-8 lg:pr-[300px] md:py-6 overflow-y-auto pointer-events-none relative">
                   
                   <div className="max-w-2xl mx-auto space-y-6 md:space-y-6 relative">
                     {/* Continuous Connection Line */}
                     <div className="absolute left-[18px] md:left-[16px] top-4 -bottom-16 w-px bg-gradient-to-b from-white/[0.015] via-white/[0.005] to-transparent -z-10">
                       <div className="absolute left-[-1.5px] w-1 h-8 bg-[#5e6ad2]/60 rounded-full blur-[2px] animate-flow-down" />
                     </div>

                     {/* Step 1: Lead */}
                     <div className="flex gap-4 md:gap-3 lg:gap-4 animate-step-1">
                       <div className="mt-1.5 shrink-0 py-1 px-1 z-10">
                         <div className="w-7 h-7 md:w-6 md:h-6 rounded-full md:rounded bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/30 md:border-[#25D366]/20 backdrop-blur-md">
                           <MessageSquare size={13} className="text-[#25D366]" />
                         </div>
                       </div>
                       <div className="pt-1.5 md:pt-2 w-full">
                         <div className="text-[13px] md:text-[11px] lg:text-[13px] max-[340px]:text-[11px] text-white/90 font-medium mb-2 flex flex-col lg:flex-row items-start lg:items-center gap-0.5 lg:gap-2">
                           <span>[A BLANK] creó el deal vía WhatsApp</span>
                           <span className="text-white/30 font-normal text-[11px]"><span className="hidden lg:inline">· </span>hace 2 min</span>
                         </div>
                         <div className="text-[13px] md:text-[11px] lg:text-[13px] max-[340px]:text-[11px] text-white/60 bg-[#121212] md:bg-[#1e1e1e] border border-white/5 md:border-white/5 rounded-xl p-3 md:p-3 shadow-sm inline-block w-full md:w-auto">
                           <span className="text-white/40">Lead:</span>{" "}
                           "Solicitamos propuesta técnica y cotización para la póliza de mantenimiento preventivo anual en nuestras 3 plantas de Nuevo León."
                         </div>
                       </div>
                     </div>

                     {/* Step 2: System Processing */}
                     <div className="flex gap-4 md:gap-3 lg:gap-4 animate-step-2">
                       <div className="mt-1.5 shrink-0 py-1 px-1 z-10">
                         <div className="w-7 h-7 md:w-6 md:h-6 rounded-lg md:rounded-full bg-[#5e6ad2]/10 flex items-center justify-center border border-[#5e6ad2]/30 md:border-[#5e6ad2]/20 backdrop-blur-md">
                           <span className="text-[#5e6ad2] text-[11px] md:text-[10px] font-bold">Λ</span>
                         </div>
                       </div>
                       <div className="pt-1.5 md:pt-2">
                         <div className="text-[13px] md:text-[11px] lg:text-[13px] max-[340px]:text-[11px] text-white/90 font-medium mb-1.5 flex flex-col lg:flex-row items-start lg:items-center gap-0.5 lg:gap-2">
                           <span>Automation Engine</span>
                           <span className="text-white/30 font-normal text-[11px]"><span className="hidden lg:inline">· </span>0.4s después</span>
                         </div>
                         <div className="text-[13px] md:text-[11px] lg:text-[13px] max-[340px]:text-[11px] text-white/70 leading-relaxed max-w-sm">
                           Validando disponibilidad de ingenieros en el ERP y tabulador de viáticos 2026. 
                           <div className="mt-2 text-green-400 font-mono bg-green-500/10 px-2 py-1 rounded-md inline-block border border-green-500/10 text-[11px]">
                             Status: 200 OK (Capacidad operativa confirmada).
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Step 3: PDF Sent */}
                     <div className="flex gap-4 md:gap-3 lg:gap-4 animate-step-3 relative">
                       <div className="mt-1.5 shrink-0 py-1 px-1 z-10">
                         <div className="w-7 h-7 md:w-6 md:h-6 rounded-lg md:rounded bg-purple-500/10 flex items-center justify-center border border-purple-500/30 md:border-purple-500/20 backdrop-blur-md">
                           <FileText size={13} className="text-purple-400" />
                         </div>
                       </div>
                       <div className="w-full pt-1.5 md:pt-2">
                         <div className="text-[13px] md:text-[11px] lg:text-[13px] max-[340px]:text-[11px] text-white/90 font-medium mb-2.5 flex flex-col lg:flex-row items-start lg:items-center gap-0.5 lg:gap-2">
                           <span>[A BLANK] System</span>
                           <span className="text-white/30 font-normal text-[11px]"><span className="hidden lg:inline">· </span>0.8s después</span>
                         </div>
                         
                         {/* PDF Card */}
                         <div className="bg-[#121212] md:bg-[#1e1e1e] border border-white/5 rounded-xl p-3 md:p-4 flex flex-row items-center justify-between gap-4 shadow-sm hover:border-white/10 transition-colors w-full">
                            <div className="flex items-center gap-3 w-full">
                              <div className="w-10 h-10 md:w-8 md:h-8 rounded md:rounded bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
                                <span className="text-[10px] md:text-[9px] font-bold text-red-400">PDF</span>
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <div className="text-[12px] md:text-[11px] lg:text-[13px] max-[340px]:text-[11px] text-white/90 font-medium tracking-tight truncate w-[150px] md:w-auto">
                                  Propuesta_Poliza_Anual_Plantas.pdf
                                </div>
                                <div className="text-[11px] text-white/40 mt-0.5">
                                  2.4 MB · Generado por AI
                                </div>
                              </div>
                            </div>
                            <div className="md:hidden shrink-0 text-white/40">
                              <Download size={16} />
                            </div>
                            <div className="hidden md:block px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] font-mono whitespace-nowrap shadow-[inset_0_0_8px_rgba(34,197,94,0.1)]">
                              Deal Won: $850,000 MXN
                            </div>
                         </div>
                       </div>
                     </div>

                   </div>

                   {/* Overlay Gradient for bottom fade */}
                   <div className="absolute bottom-0 left-0 right-0 h-32 md:h-16 bg-gradient-to-t from-[#0a0a0a] md:from-[#161616] to-transparent pointer-events-none z-20" />
                </div>
             </div>
             
             {/* --- MOBILE COPILOT DRAWER (BOTTOM) --- */}
             <div className="md:hidden absolute bottom-[72px] left-2 right-2 bg-[#121212] border border-white/10 rounded-2xl p-4 shadow-2xl z-30 animate-step-4 flex flex-col pointer-events-auto">
                <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-3"></div>
                <div className="flex items-center gap-2 text-[11px] text-[#5e6ad2] font-semibold tracking-wide mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2] shadow-[0_0_6px_rgba(94,106,210,0.6)]"></span>
                  [A BLANK] Copilot v2
                </div>
                <h3 className="text-white font-medium text-[15px] max-[340px]:text-[13px] mb-1">Automatización Completada</h3>
                <p className="text-white/50 text-[12px] leading-relaxed mb-4">Generó el PDF y actualizó el estado sin bloquear el hilo principal.</p>
                
                <div className="space-y-2">
                  <div className="bg-[#1a1a1a] rounded-lg p-3 flex items-start gap-3 border border-white/5">
                    <Check size={14} className="text-[#5e6ad2] shrink-0 mt-0.5" />
                    <span className="text-white/70 text-[13px] leading-snug max-[340px]:text-[11px]">Validado con reglas de negocio</span>
                  </div>
                  
                </div>
             </div>

             {/* --- DESKTOP COPILOT PANEL (ABSOLUTE RIGHT) --- */}
             <div className="hidden md:flex absolute right-4 lg:right-6 top-16 w-[220px] lg:w-[260px] bg-[#1a1a1a] border border-white/10 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex-col overflow-hidden animate-step-4 z-20">
                <div className="h-9 bg-white/5 border-b border-white/5 flex items-center px-3 justify-between shrink-0">
                  <div className="text-[11px] font-medium text-white/70 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2] shadow-[0_0_6px_rgba(94,106,210,0.6)]"></span>
                    [A BLANK] Copilot v2
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                </div>
                <div className="p-3.5 text-[12px] text-white/70 space-y-2.5 bg-black/20 flex-1">
                  <p className="text-white/90 font-medium text-[11px] lg:text-[13px]">Automatización Completada</p>
                  <p className="text-[11px] text-white/40 leading-relaxed mb-2">Generó el PDF y actualizó el estado sin bloquear el hilo principal.</p>
                  <div className="flex items-start gap-2 text-white/60 bg-[#1e1e1e] p-2 rounded border border-white/5 leading-snug">
                    <Check size={12} className="text-[#5e6ad2] shrink-0 mt-[3px]" />
                    <span>Validado con reglas de negocio</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/60 bg-[#1e1e1e] p-2 rounded border border-white/5 leading-snug">
                    <Check size={12} className="text-[#5e6ad2] shrink-0 mt-[3px]" />
                    <span>Márgenes de rentabilidad validados. Contrato generado con cláusulas de SLA.</span>
                  </div>
                </div>
             </div>

             {/* --- MOBILE BOTTOM NAV --- */}
             <div className="md:hidden absolute bottom-0 left-0 right-0 h-[60px] bg-[#0a0a0a] border-t border-white/5 flex items-center justify-around px-2 z-40">
               <div className="flex flex-col items-center gap-1 text-white/40 relative h-full justify-center">
                 <Inbox size={20} />
                 <span className="text-[10px]">Inbox</span>
               </div>
               <div className="flex flex-col items-center gap-1 text-green-400 relative h-full justify-center">
                 <LayoutDashboard size={20} />
                 <span className="text-[10px]">Active Deals</span>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-green-500 rounded-t-full"></div>
               </div>
               <div className="flex flex-col items-center gap-1 text-white/40 relative h-full justify-center">
                 <FileText size={20} />
                 <span className="text-[10px]">Quotes</span>
               </div>
               <div className="flex flex-col items-center gap-1 text-white/40 relative h-full justify-center">
                 <MoreHorizontal size={20} />
                 <span className="text-[10px]">More</span>
               </div>
             </div>
             
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
