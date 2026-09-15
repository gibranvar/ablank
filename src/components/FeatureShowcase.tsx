'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe, Users, Zap, Bot, BarChart3, Link2, Target, MessageSquare, Database, ArrowRight } from 'lucide-react';
import { 
  SiZapier, SiNotion, SiFigma,
  SiMeta, SiGoogle, SiMailchimp, SiWhatsapp, SiShopify, SiDiscord, SiLinear 
} from 'react-icons/si';
import { FaSlack, FaStripe, FaSalesforce, FaGithub, FaHubspot } from 'react-icons/fa';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
const handleWhatsAppStartClick = () => {
    const msg = `Hola! Estoy listo para evolucionar mi negocio. Me interesa empezar a armar nuestro sistema central. ¿Cuáles son los siguientes pasos?`;

    window.open(`https://wa.me/5576048470?text=${encodeURIComponent(msg)}`, '_blank');
  };

const handleWhatsAppSalesClick = () => {
  const msg = `¡Hola! Estuve viendo sus soluciones en la página. Me gustaría contarles un poco sobre mi negocio para ver qué opciones tienen para ayudarnos a escalar."`;
  window.open(`https://wa.me/5576048470?text=${encodeURIComponent(msg)}`, '_blank');
}

export function FeatureShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      // ==========================================
      // ESCRITORIO (768px+): Animación Premium con Blur
      // ==========================================
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo('.fs-header', 
          { opacity: 0, filter: 'blur(16px)', y: 30 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2.5, ease: 'power2.out' }
        );

        tl.fromTo('.bento-card',
          { opacity: 0, filter: 'blur(16px)', y: 40 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2, stagger: 0.15, ease: 'power3.out' },
          '-=1.5'
        );
        
        tl.fromTo('.fs-cta',
          { opacity: 0, filter: 'blur(16px)', y: 30 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2, ease: 'power2.out' },
          '-=1'
        );
      });

      // ==========================================
      // MÓVILES (-768px): Animación Ultra-Ligera (60fps)
      // ==========================================
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo('.fs-header', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );

        tl.fromTo('.bento-card',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
          '-=0.8'
        );
        
        tl.fromTo('.fs-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=0.5'
        );
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  const features = [
    {
      id: 'website',
      colSpan: 'lg:col-span-8',
      title: 'Website & Digital Experience',
      description: 'Creamos experiencias digitales de alta conversión. Tu web no es un folleto — es la puerta de entrada al sistema.',
      visual: <WebsiteVisual />,
    },
    {
      id: 'crm',
      colSpan: 'lg:col-span-4',
      title: 'CRM & Leads',
      description: 'Captura y organiza cada oportunidad. Desde el primer contacto hasta el cierre, todo queda registrado.',
      visual: <CRMVisual />,
    },
    {
      id: 'ai',
      colSpan: 'lg:col-span-4',
      title: 'Inteligencia Artificial',
      description: 'Clasificación de leads, respuestas automáticas y análisis predictivo integrado en tus flujos.',
      visual: <AIVisual />,
    },
    {
      id: 'automation',
      colSpan: 'lg:col-span-8',
      title: 'Automation',
      description: 'Automatiza respuestas, seguimientos y asignaciones sin intervención humana.',
      visual: <AutomationVisual />,
    },
    {
      id: 'analytics',
      colSpan: 'lg:col-span-6',
      title: 'Analytics',
      description: 'Convierte la actividad del negocio en información útil. Dashboards reales, no reportes estáticos.',
      visual: <AnalyticsVisual />,
    },
    {
      id: 'integrations',
      colSpan: 'lg:col-span-6',
      title: 'Integrations',
      description: 'Conecta las herramientas que tu negocio ya usa. APIs, webhooks y sincronización bidireccional.',
      visual: <IntegrationsVisual />,
    },
  ];

  return (
    <section id="soluciones" ref={root} className="relative w-full py-16 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="fs-header text-center mb-20 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
           
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">Características Core</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight leading-tight text-balance">
            Cada pieza del sistema,<br/>
            <span className="text-white/30">como un producto.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`bento-card relative rounded-3xl overflow-hidden bg-[#06070a] border border-white/10 group ${feature.colSpan} min-h-[420px] shadow-2xl`}
            >
              <div className="absolute inset-0 z-0">
                {feature.visual}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/40 to-transparent pointer-events-none" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="p-6 rounded-2xl bg-black/80 md:bg-white/5 md:backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
                  <h4 className="text-xl font-display font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fs-cta relative w-full mt-24 rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0a0a0c] to-[#040405] border border-white/10 p-10 md:p-16 flex flex-col items-center text-center shadow-2xl">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png")', backgroundSize: '128px auto', backgroundRepeat: 'repeat' }} />
          
          <h3 className="relative z-10 text-3xl md:text-5xl font-display font-semibold text-white mb-4 tracking-tight">¿Listo para evolucionar?</h3>
          <p className="relative z-10 text-white/50 mb-10 max-w-lg">Hagamos esto realidad. Tu sistema central te está esperando.</p>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={handleWhatsAppStartClick}
              className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 text-white font-medium text-lg transition-transform hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
              style={{
                borderRadius: '16px',
                backgroundColor: '#020202',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0px 11px 11px -3px rgba(0,0,0,0.14), 0px 28px 28px -3.75px rgba(0,0,0,0.06), inset -4px 3px 9px 0px #0175ff, inset 3px -2px 8px 0px #ffcd7d, 0 0 40px rgba(1,117,255,0.3)'
              }}
            >
              <span className="relative z-10">Empezar ahora</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            <button onClick={handleWhatsAppSalesClick}  className="px-8 py-4 rounded-[16px] bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all w-full sm:w-auto">
              Hablar con ventas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function WebsiteVisual() {
  return (
    <>
    <style>{`
      @keyframes shimmer-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      .animate-shimmer-pulse { animation: shimmer-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    `}</style>
    <div className="absolute inset-0 flex items-start justify-center pt-8 opacity-100 transition-transform duration-700 group-hover:scale-105 pointer-events-none">
      <div className="w-[85%] h-56 rounded-xl border border-white/20 bg-[#0a0a0c] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col">
        <div className="h-7 w-full bg-white/5 border-b border-white/10 flex items-center px-3 gap-1.5">
           <div className="w-2 h-2 rounded-full bg-white/20" />
           <div className="w-2 h-2 rounded-full bg-white/20" />
           <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-blue-900/40 via-[#0a0a0c] to-[#0a0a0c] p-6 flex flex-col items-center justify-center text-center gap-4">
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/30 blur-[20px] md:blur-[40px] rounded-full" />
           
           <div className="w-3/4 h-5 bg-white/80 rounded shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-shimmer-pulse" />
           <div className="w-1/2 h-3 bg-white/40 rounded animate-shimmer-pulse" style={{ animationDelay: '200ms' }} />
           
           <div className="absolute bottom-3 left-0 w-full flex justify-center gap-2">
             <div className="w-16 h-10 rounded-lg bg-[#1a1a24] md:bg-white/5 border border-white/10 md:backdrop-blur-md animate-shimmer-pulse" style={{ animationDelay: '400ms' }} />
             <div className="w-16 h-10 rounded-lg bg-[#1a1a24] md:bg-white/5 border border-white/10 md:backdrop-blur-md animate-shimmer-pulse" style={{ animationDelay: '600ms' }} />
             <div className="w-16 h-10 rounded-lg bg-[#1a1a24] md:bg-white/5 border border-white/10 md:backdrop-blur-md animate-shimmer-pulse" style={{ animationDelay: '800ms' }} />
           </div>
        </div>
      </div>
    </div>
    </>
  );
}

function CRMVisual() {
  return (
    <>
    <style>{`
      @keyframes pipeline-fill {
        0%, 15% { width: 33%; }
        35%, 65% { width: 66%; }
        85%, 100% { width: 100%; box-shadow: 0 0 20px rgba(99,102,241,0.8); }
      }
      .animate-pipeline { animation: pipeline-fill 6s infinite ease-in-out; }
      
      @keyframes card-float {
        0%, 100% { transform: translateY(0) rotate(2deg); }
        50% { transform: translateY(-6px) rotate(3deg); }
      }
      .animate-float { animation: card-float 4s infinite ease-in-out; }
      
      @keyframes deal-won {
        0%, 80% { opacity: 0; transform: scale(0.8) translateY(10px); }
        85%, 95% { opacity: 1; transform: scale(1) translateY(0); }
        100% { opacity: 0; transform: scale(0.8) translateY(-10px); }
      }
      .animate-deal-won { animation: deal-won 6s infinite ease-out; }
    `}</style>
    <div className="absolute inset-0 flex items-start justify-center opacity-100 transition-transform duration-700 group-hover:scale-105 pointer-events-none pt-10">
       <div className="absolute w-48 h-48 rounded-full bg-indigo-500/15 blur-[25px] md:blur-[50px]" />
       
       <div className="absolute top-10 w-[75%] max-w-[220px] rounded-xl bg-white/5 border border-white/10 p-3 shadow-lg transform -rotate-3 scale-95 opacity-50">
          <div className="flex items-center gap-3 mb-3">
             <div className="w-6 h-6 rounded-full bg-white/20" />
             <div className="flex-1 h-2 bg-white/20 rounded" />
          </div>
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded-full bg-white/20" />
             <div className="flex-1 h-2 bg-white/20 rounded" />
          </div>
       </div>

       <div className="relative z-10 w-[85%] max-w-[250px] rounded-2xl bg-[#0a0a0c] border border-white/20 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] mt-8 animate-float">
          <div className="absolute -top-4 -right-2 px-3 py-1.5 rounded-lg bg-[#0f1b13] md:bg-green-500/20 border border-green-500/50 md:backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-deal-won z-20">
             <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
             <span className="text-[9px] font-bold text-green-400 tracking-wider">DEAL WON</span>
          </div>

          <div className="flex justify-between items-start mb-4">
             <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1.5px]">
                   <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center">
                      <Users size={14} className="text-white" />
                   </div>
                </div>
                <div>
                   <div className="w-16 h-2 bg-white/90 rounded-sm mb-1.5" />
                   <div className="w-10 h-1.5 bg-white/40 rounded-sm" />
                </div>
             </div>
             <div className="px-2 py-1 rounded bg-orange-500/20 border border-orange-500/30 text-[7px] text-orange-400 font-bold uppercase tracking-wider">
                Hot Lead
             </div>
          </div>
          
          <div className="w-full space-y-1.5">
             <div className="flex justify-between text-[7px] text-white/50 px-1 font-medium">
                <span>Captura</span>
                <span>Cotización</span>
                <span>Cierre</span>
             </div>
             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full animate-pipeline" />
             </div>
          </div>
       </div>
    </div>
    </>
  );
}

function AIVisual() {
  return (
    <>
    <style>{`
      @keyframes userMsg {
        0%, 5% { opacity: 0; transform: translateY(10px); }
        10%, 95% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
      }
      @keyframes typingBubble {
        0%, 15% { opacity: 0; transform: scale(0.9); }
        20%, 35% { opacity: 1; transform: scale(1); }
        40%, 100% { opacity: 0; transform: scale(0.9); }
      }
      @keyframes botMsg {
        0%, 35% { opacity: 0; transform: translateY(10px) scale(0.95); }
        40%, 95% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-10px); }
      }
      @keyframes dotBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      .animate-user-msg { animation: userMsg 9s infinite; }
      .animate-typing { animation: typingBubble 9s infinite; }
      .animate-bot-msg { animation: botMsg 9s infinite; opacity: 0; }
      .dot-1 { animation: dotBounce 1s infinite 0s; }
      .dot-2 { animation: dotBounce 1s infinite 0.2s; }
      .dot-3 { animation: dotBounce 1s infinite 0.4s; }
    `}</style>
    <div className="absolute top-0 left-0 right-0 bottom-[130px] flex items-center justify-center opacity-100 transition-transform duration-700 group-hover:scale-105 pointer-events-none">
      
      <div className="absolute w-64 h-64 rounded-full bg-blue-600/15 blur-[30px] md:blur-[60px]" />
      
      <div className="relative z-10 w-[90%] max-w-[300px] flex flex-col gap-3">
        <div className="self-end max-w-[85%] flex items-end gap-2 animate-user-msg">
           <div className="px-4 py-2.5 rounded-2xl rounded-br-sm bg-blue-600 border border-blue-500 shadow-[0_5px_15px_rgba(59,130,246,0.2)]">
             <p className="text-[10px] text-white font-medium leading-snug">¡Hola! ¿Tienen disponibilidad para una demo?</p>
           </div>
        </div>
        
        <div className="relative self-start max-w-[95%] w-full min-h-[90px]">
           <div className="absolute top-0 left-0 flex gap-2 animate-typing">
             <div className="w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shadow-lg border border-white/20 mt-1">
                <Bot size={10} className="text-white" />
             </div>
             <div className="px-4 py-2 rounded-2xl rounded-tl-sm bg-[#111116] border border-white/10 flex items-center gap-1 shadow-lg h-8 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 dot-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 dot-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 dot-3" />
             </div>
           </div>

           <div className="absolute top-0 left-0 flex gap-2 w-full animate-bot-msg opacity-0">
             <div className="w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)] border border-white/20 mt-1">
                <Bot size={10} className="text-white" />
             </div>
             <div className="flex-1 px-4 py-3 rounded-2xl rounded-tl-sm bg-[#111116] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <p className="text-[10px] text-white/80 leading-snug mb-2.5">
                   ¡Claro! Tengo 2 espacios libres este jueves. ¿Prefieres AM o PM?
                </p>
                <div className="flex gap-2">
                   <div className="px-2 py-1 rounded border border-blue-500/30 bg-blue-500/10 text-[8px] text-blue-300 font-medium">Jueves AM</div>
                   <div className="px-2 py-1 rounded border border-white/10 bg-white/5 text-[8px] text-white/50 font-medium">Jueves PM</div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
    </>
  );
}

function AutomationVisual() {
  return (
    <>
    <style>{`
      @keyframes flow-line-h { to { stroke-dashoffset: -20; } }
      .animate-flow-h { stroke-dasharray: 4 4; animation: flow-line-h 1s linear infinite; }
      
      @keyframes node-success {
        0%, 75% { box-shadow: 0 5px 15px rgba(0,0,0,0.5); border-color: rgba(255, 255, 255, 0.1); }
        85%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); border-color: rgba(34, 197, 94, 0.6); }
      }
      .animate-node-success { animation: node-success 2.5s infinite; }
    `}</style>
    <div className="absolute top-0 left-0 right-0 bottom-[130px] flex items-center justify-center opacity-100 transition-transform duration-700 group-hover:scale-105 pointer-events-none">
      
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
      
      <div className="relative w-full max-w-[600px] aspect-[600/240]">
        
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none" style={{ zIndex: 0, overflow: 'visible' }}>
           <path d="M 90 120 L 300 120" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="animate-flow-h" />
           <path d="M 300 120 C 390 120, 390 48, 510 48" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="animate-flow-h" />
           <path d="M 300 120 L 510 120" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="animate-flow-h" />
           <path d="M 300 120 C 390 120, 390 192, 510 192" fill="none" stroke="rgba(59,130,246,0.8)" strokeWidth="2" className="animate-flow-h" />
        </svg>

        <div className="absolute left-[15%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-10 w-20 sm:w-28 rounded-xl bg-[#0a0a0c] border border-white/10 p-1.5 sm:p-2 shadow-lg flex items-center gap-1.5 sm:gap-2">
           <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Globe size={10} className="text-purple-400" />
           </div>
           <div>
              <div className="text-[7px] sm:text-[9px] font-bold text-white tracking-wide">Web Lead</div>
           </div>
        </div>

        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-10 w-24 sm:w-32 rounded-xl bg-[#0a0a0c] border border-white/10 p-1.5 sm:p-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center gap-1.5 sm:gap-2">
           <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Bot size={10} className="text-blue-400" />
           </div>
           <div className="flex-1">
              <div className="text-[7px] sm:text-[9px] font-bold text-white tracking-wide">IA Router</div>
           </div>
        </div>

        <div className="absolute left-[85%] top-[20%] -translate-x-1/2 -translate-y-1/2 z-10 w-16 sm:w-24 h-6 sm:h-8 rounded-lg bg-[#0a0a0c] border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 shadow-lg">
           <Database size={8} className="text-white/50" />
           <span className="text-[5px] sm:text-[7px] text-white/50 font-medium uppercase tracking-wider">Crear Deal</span>
        </div>

        <div className="absolute left-[85%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-10 w-16 sm:w-24 h-6 sm:h-8 rounded-lg bg-[#0a0a0c] border border-white/10 flex items-center justify-center gap-1 sm:gap-1.5 shadow-lg">
           <Target size={8} className="text-white/50" />
           <span className="text-[5px] sm:text-[7px] text-white/50 font-medium uppercase tracking-wider">Email Drip</span>
        </div>

        <div className="absolute left-[85%] top-[80%] -translate-x-1/2 -translate-y-1/2 z-10 w-16 sm:w-24 h-6 sm:h-8 rounded-lg bg-[#0a1122] md:bg-blue-900/30 border border-blue-500/40 flex items-center justify-center gap-1 sm:gap-1.5 shadow-[0_0_20px_rgba(59,130,246,0.4)] md:backdrop-blur-md animate-node-success">
           <MessageSquare size={8} className="text-blue-400" />
           <span className="text-[5px] sm:text-[7px] text-blue-400 font-bold uppercase tracking-wider">Notificar</span>
        </div>

      </div>
    </div>
    </>
  );
}

function AnalyticsVisual() {
  const bars = [
    { h: 35, color: 'from-blue-600 to-blue-400/20', delay: '0ms' },
    { h: 60, color: 'from-indigo-600 to-indigo-400/20', delay: '200ms' },
    { h: 45, color: 'from-purple-600 to-purple-400/20', delay: '400ms' },
    { h: 85, color: 'from-pink-600 to-pink-400/20', delay: '600ms', active: true },
    { h: 55, color: 'from-purple-600 to-purple-400/20', delay: '800ms' },
    { h: 95, color: 'from-blue-600 to-blue-400/20', delay: '1000ms' },
  ];
  return (
    <>
    <style>{`
      @keyframes bar-pulse {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(0.7); }
      }
      .animate-bar {
        transform-origin: bottom;
        animation: bar-pulse 6s ease-in-out infinite;
      }
    `}</style>
    <div className="absolute inset-0 flex items-end justify-center gap-3 p-10 pt-16 opacity-100 transition-transform duration-700 group-hover:scale-105 pointer-events-none">
      
      <div className="absolute inset-0 flex flex-col justify-end gap-10 p-10 pointer-events-none opacity-20">
         <div className="w-full h-px bg-white/20" />
         <div className="w-full h-px bg-white/20" />
         <div className="w-full h-px bg-white/20" />
      </div>
      
      {bars.map((bar, i) => (
        <div 
          key={i} 
          className={`relative w-10 rounded-t-lg bg-gradient-to-t ${bar.color} ${bar.active ? 'shadow-[0_0_30px_rgba(236,72,153,0.5)] border-t-2 border-pink-400' : 'border-t border-white/20'} animate-bar`} 
          style={{ height: `${bar.h}%`, animationDelay: bar.delay }} 
        >
           {bar.active && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] font-bold py-1.5 px-3 rounded shadow-[0_5px_15px_rgba(255,255,255,0.2)]">
                 +85%
              </div>
           )}
        </div>
      ))}
    </div>
    </>
  );
}

function IntegrationsVisual() {
  // Mezclamos los de FontAwesome (Fa) con los de SimpleIcons (Si)
  const toolsTop = [FaSlack, FaStripe, FaHubspot, SiZapier, SiNotion, FaGithub, SiFigma];
  const toolsBottom = [SiMeta, SiGoogle, SiMailchimp, SiWhatsapp, SiShopify, FaSalesforce, SiDiscord, SiLinear];

  const loopTop = [...toolsTop, ...toolsTop];
  const loopBottom = [...toolsBottom, ...toolsBottom]; 

  return (
    <>
      <style>{`
        @keyframes marquee-left { 
          0% { transform: translate3d(0, 0, 0); } 
          100% { transform: translate3d(-50%, 0, 0); } 
        }
        @keyframes marquee-right { 
          0% { transform: translate3d(-50%, 0, 0); } 
          100% { transform: translate3d(0, 0, 0); } 
        }
        .animate-marquee-left { animation: marquee-left 25s linear infinite; will-change: transform; }
        .animate-marquee-right { animation: marquee-right 25s linear infinite; will-change: transform; }
      `}</style>
      
      <div className="absolute inset-x-0 top-0 bottom-[140px] flex flex-col justify-center gap-5 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        
        <div className="flex gap-4 animate-marquee-left w-[200%] pl-4">
          {loopTop.map((Icon, i) => (
            <div key={`top-${i}`} className="w-14 h-14 shrink-0 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform duration-700 group-hover:scale-110 text-white/70">
              <Icon size={24} />
            </div>
          ))}
        </div>
        
        <div className="flex gap-4 animate-marquee-right w-[200%] pl-4">
          {loopBottom.map((Icon, i) => (
            <div key={`bottom-${i}`} className="w-14 h-14 shrink-0 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform duration-700 group-hover:scale-110 text-white/70">
              <Icon size={24} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}