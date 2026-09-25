'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  CheckCheck, FileText, User, Sparkles, Zap, DollarSign, 
  Receipt, Calendar, Utensils, LifeBuoy, Briefcase, Building, 
  ShieldCheck, Activity, Play
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const colorMap: Record<string, { bg: string; border: string; shadow: string; text: string }> = {
  blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.2)]', text: 'text-blue-400' },
  purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', shadow: 'shadow-[0_0_10px_rgba(168,85,247,0.2)]', text: 'text-purple-400' },
  orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/30', shadow: 'shadow-[0_0_10px_rgba(249,115,22,0.2)]', text: 'text-orange-400' },
  green: { bg: 'bg-green-500/20', border: 'border-green-500/30', shadow: 'shadow-[0_0_10px_rgba(34,197,94,0.2)]', text: 'text-green-400' },
};

// Icons map for the dynamic scenarios
const scenarioIcons = [Briefcase, Receipt, Calendar, Utensils, LifeBuoy];
const logIcons = [
  [User, Sparkles, FileText, DollarSign],
  [Receipt, Sparkles, FileText, CheckCheck],
  [User, Sparkles, Calendar, CheckCheck],
  [Utensils, Sparkles, Building, CheckCheck],
  [ShieldCheck, Sparkles, Activity, CheckCheck],
];
const logColors = [
  ['blue', 'purple', 'orange', 'green'],
  ['blue', 'purple', 'orange', 'green'],
  ['blue', 'purple', 'orange', 'green'],
  ['blue', 'purple', 'orange', 'green'],
  ['blue', 'purple', 'orange', 'green'],
];

export function ProductShowcase() {
  const { t } = useTranslation();
  const [activeScenario, setActiveScenario] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const containerRef = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Retrieve raw array from translations
  // Using type assertion since we know the structure of the JSON
  const rawScenarios = t('product.scenarios', { returnObjects: true }) as any[];

  // Re-map it to include the icons
  const scenarios = rawScenarios.map((s, index) => ({
    ...s,
    icon: scenarioIcons[index],
    logs: s.logs.map((log: any, logIndex: number) => ({
      ...log,
      icon: logIcons[index][logIndex],
      color: logColors[index][logIndex],
    })),
  }));
  
  const data = scenarios[activeScenario];

  const handleScenarioChange = (index: number) => {
    if (activeScenario === index) return;
    
    if (tlRef.current) {
      tlRef.current.pause();
      tlRef.current.progress(0);
      tlRef.current.kill();
    }
    
    setIsPlaying(false);
    setActiveScenario(index);
  };

  // --- 1. ANIMACIÓN DE ENTRADA (ScrollTrigger Optimizado) ---
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ESCRITORIO
    mm.add("(min-width: 768px)", () => {
      const introTl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
      });
      
      introTl.fromTo(['.ps-badge', 'h2 > span', '.ps-sub'], 
        { opacity: 0, filter: 'blur(16px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, stagger: 0.15, ease: 'power2.out' }
      )
      .fromTo('.ps-scenario-selector',
        { opacity: 0, filter: 'blur(8px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, ease: 'power2.out' },
        '-=1'
      )
      .fromTo('.ps-master-container',
        { opacity: 0, filter: 'blur(16px)', y: 40 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out' },
        '-=0.8'
      );
    });

    // MÓVILES (Sin Blur)
    mm.add("(max-width: 767px)", () => {
      const introTl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
      });
      
      introTl.fromTo(['.ps-badge', 'h2 > span', '.ps-sub'], 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }
      )
      .fromTo('.ps-scenario-selector',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo('.ps-master-container',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      );
    });

    return () => mm.revert();
  }, { scope: containerRef }); 

  // --- 2. ANIMACIÓN INTERNA DEL SIMULADOR ---
  // No requiere matchMedia porque solo usa transformaciones básicas ultra-rápidas
  useGSAP(() => {
    const tl = gsap.timeline({ 
      paused: true, 
      repeat: -1, 
      repeatDelay: 5,
    });
    
    tlRef.current = tl;

    tl.set('.ps-msg', { opacity: 0, y: 15, scale: 0.95 }, 0)
      .set('.ps-typing', { opacity: 0 }, 0)
      .set('.ps-crm-event', { opacity: 0, x: -20 }, 0)
      .set('.ps-crm-revenue-new', { opacity: 0, y: 15 }, 0)
      .set('.ps-crm-revenue-old', { opacity: 1, y: 0 }, 0)
      .set('.ps-crm-users-new', { opacity: 0, y: 10 }, 0)
      .set('.ps-crm-users-old', { opacity: 1, y: 0 }, 0)
      .set('.ps-crm-status-text', { textContent: data.statusOld, color: '#60a5fa' }, 0)
      .set('.ps-crm-status-box', { backgroundColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.2)' }, 0)
      .set('.ps-progress-bar', { width: '0%' }, 0);

    tl.to('.ps-msg-1', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, 0.5)
      .to('.ps-crm-event-1', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '+=0.2');

    tl.to('.ps-typing', { opacity: 1, duration: 0.2 }, '+=0.3')
      .to('.ps-typing', { opacity: 0, duration: 0.2 }, '+=1.2')
      .to('.ps-msg-2', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' });

    tl.to('.ps-msg-3', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '+=1.5')
      .to('.ps-crm-event-2', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '+=0.2')
      .to('.ps-crm-users-old', { opacity: 0, y: -10, duration: 0.3 }, '<')
      .to('.ps-crm-users-new', { opacity: 1, y: 0, duration: 0.3 }, '<'); 

    tl.to('.ps-crm-event-3', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '+=0.6')
      .to('.ps-typing', { opacity: 1, duration: 0.2 }, '+=0.2')
      .to('.ps-typing', { opacity: 0, duration: 0.2 }, '+=1.5')
      .to('.ps-msg-4', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' });

    tl.to('.ps-msg-5', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '+=2')
      .to('.ps-crm-event-4', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '+=0.3')
      .to('.ps-crm-revenue-old', { opacity: 0, y: -15, duration: 0.4 }, '<')
      .to('.ps-crm-revenue-new', { opacity: 1, y: 0, duration: 0.4 }, '<')
      .to('.ps-crm-status-box', { backgroundColor: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.3)', duration: 0.4 }, '<')
      .to('.ps-crm-status-text', { textContent: data.statusNew, color: '#4ade80', duration: 0.4 }, '<');

    tl.to('.ps-typing', { opacity: 1, duration: 0.2 }, '+=0.4')
      .to('.ps-typing', { opacity: 0, duration: 0.2 }, '+=1')
      .to('.ps-msg-6', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' });

    const fullDuration = tl.duration();
    tl.to('.ps-progress-bar', { width: '100%', duration: fullDuration, ease: 'none' }, 0);

  }, { scope: containerRef, dependencies: [activeScenario] });

  useEffect(() => {
    if (tlRef.current) {
      if (isPlaying) {
        tlRef.current.play();
      } else {
        tlRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <section id='casos' ref={containerRef} className="relative py-16 md:py-48 overflow-hidden">
      {/* Fondo técnico sutil */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Encabezado */}
        <div className="text-center mb-10 md:mb-12 relative z-10 flex flex-col items-center">
          <div className="ps-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 md:backdrop-blur-md mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
           
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">{t('product.badge')}</span>
          </div>
          
          <h2>
            <span>{t('product.title1')}</span>
            <span>{t('product.title2')}</span>
          </h2>
          
          <p className="ps-sub mt-6 text-lg text-white/60 max-w-xl mx-auto text-balance">
            {t('product.subtitle')}
          </p>
        </div>

        {/* Selector de Escenarios */}
        <div className="ps-scenario-selector flex justify-start md:justify-center overflow-x-auto hide-scrollbar pb-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 relative z-20">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#1c1c24] md:bg-white/5 border border-white/10 md:backdrop-blur-md w-max mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {scenarios.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleScenarioChange(i)}
                  className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap active:scale-95 ${
                    activeScenario === i 
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-100' 
                      : 'text-white/60 hover:text-white hover:bg-white/10 scale-95 hover:scale-100'
                  }`}
                >
                  <Icon size={16} className={activeScenario === i ? 'text-black' : 'text-white/60'} />
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ======================= LIQUID GLASS MASTER ======================= */}
        <div className="ps-master-container relative max-w-5xl mx-auto">
          
          {/* Orbes de luz traseras para refractar el cristal (Blur reducido a la mitad en móvil) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/15 rounded-full blur-[60px] md:blur-[120px] pointer-events-none transition-colors duration-1000" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[50px] md:blur-[100px] pointer-events-none transition-colors duration-1000" />

          {/* CONTENEDOR PRINCIPAL: En móvil quitamos backdrop-blur y oscurecemos el fondo sólido */}
          <div className="relative bg-[#06070a]/90 md:bg-[#06070a]/40 md:backdrop-blur-2xl border border-white/10 rounded-[32px] p-3 md:p-5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_40px_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-4 md:gap-5 overflow-hidden">
            
            {/* OVERLAY DE CARGA / PLAY */}
            <div className={`absolute inset-0 z-50 rounded-[32px] bg-[#06070a]/95 md:bg-[#06070a]/85 md:backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ease-out border border-white/5 ${isPlaying ? 'opacity-0 pointer-events-none scale-[1.05]' : 'opacity-100 pointer-events-auto scale-100'}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 rounded-[32px] pointer-events-none" />
              
              <button 
                onClick={() => setIsPlaying(true)}
                className="group relative w-20 md:w-24 h-20 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 md:mb-8 cursor-pointer hover:bg-white/10 transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.5)] active:scale-95"
              >
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl group-hover:bg-blue-500/40 transition-all duration-500" />
                <Play className="text-white ml-2 relative z-10 group-hover:scale-110 transition-transform duration-300" size={32} fill="currentColor" />
              </button>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3 md:mb-4">
                 <data.icon size={12} className="text-blue-400" />
                 <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">{t('product.useCaseLabel')}</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-2 text-center px-4">{data.label}</h3>
              <p className="text-white/40 text-sm">{t('product.clickToStart')}</p>
            </div>

            {/* Progress Bar Top */}
            <div className="absolute top-0 left-0 h-[2px] bg-blue-500/60 ps-progress-bar rounded-t-[32px] shadow-[0_0_10px_rgba(59,130,246,0.8)] z-40" style={{ width: '0%' }} />

            {/* PANEL IZQUIERDO: WhatsApp Chat UI */}
            <div className="w-full md:w-[45%] bg-[#0a0a0c] md:bg-white/[0.03] md:backdrop-blur-xl rounded-[24px] border border-white/10 overflow-hidden flex flex-col relative min-h-[580px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              {/* Header Chat */}
              <div className="h-16 border-b border-white/10 flex items-center px-5 lg:px-6 gap-4 bg-[#161821] md:bg-white/5 md:backdrop-blur-xl relative z-20 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 p-[1px] shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <div className="w-full h-full bg-[#0a0a0c] rounded-full flex items-center justify-center">
                    <Sparkles size={16} className="text-blue-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{t('product.chatAIHeader')}</h4>
                  <p className="text-blue-400 text-[10px] font-medium tracking-wide">{t('product.chatOnline')}</p>
                </div>
              </div>
              
              {/* Body Chat */}
              <div className="flex-1 relative flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('https://framerusercontent.com/images/XXSw2JqvtikgOcaexTTozzVsO54.webp?width=756&height=1274')" }}>
                {/* Overlay opaco en móvil, translúcido en desktop */}
                <div className="absolute inset-0 bg-[#0a0a0c]/85 md:bg-[#0a0a0c]/50 md:backdrop-blur-[2px] z-0" />
                
                <div className="relative z-10 p-4 lg:p-5 flex flex-col gap-3 md:gap-4 flex-1">
                  {data.chat.map((msg: any, i: number) => {
                    const isAi = i % 2 !== 0; // AI alternates every other message
                    if (!isAi) {
                      return (
                        <div key={i} className={`ps-msg ps-msg-${i + 1} opacity-0 self-end bg-blue-600 text-white p-3.5 rounded-2xl rounded-tr-sm max-w-[90%] text-sm border border-blue-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_10px_20px_rgba(37,99,235,0.2)]`}>
                          {msg.text}
                          <div className="text-[9px] text-blue-200 mt-1 text-right flex justify-end items-center gap-1">{msg.time} <CheckCheck size={10} /></div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={i} className={`ps-msg ps-msg-${i + 1} opacity-0 self-start bg-[#1c1e29] md:bg-white/10 md:backdrop-blur-md text-white p-3.5 rounded-2xl rounded-tl-sm max-w-[90%] text-sm border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.2)] ${msg.pdf ? 'flex flex-col gap-3' : ''}`}>
                          {msg.text}
                          {msg.pdf && (
                            <div className="flex items-center gap-3 bg-black/60 md:bg-black/40 p-2.5 rounded-xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center shrink-0">
                                <FileText size={18} className="text-red-400"/>
                              </div>
                              <div>
                                <p className="text-[11px] lg:text-xs font-bold text-white/90">{msg.pdf}</p>
                                <p className="text-[10px] text-white/50">{msg.pdfSize} · {t('product.generatedAI')}</p>
                              </div>
                            </div>
                          )}
                          <div className="text-[9px] text-white/40 flex justify-start items-center gap-1">{msg.time}</div>
                        </div>
                      );
                    }
                  })}
                  
                  {/* Typing Indicator */}
                  <div className="ps-typing opacity-0 absolute bottom-6 left-5 bg-[#1c1e29] md:bg-white/10 md:backdrop-blur-xl p-3 rounded-2xl rounded-tl-sm border border-white/10 flex gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.2)]">
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"/>
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}/>
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}/>
                  </div>
                </div>
              </div>

              {/* Fake Input Chat Bottom */}
              <div className="h-[60px] border-t border-white/10 bg-black/90 md:bg-black/50 md:backdrop-blur-xl flex items-center px-4 gap-3 relative z-20">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                  <Sparkles size={14} className="text-white/40" />
                </div>
                <div className="flex-1 h-10 rounded-full bg-white/5 border border-white/5 flex items-center px-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
                  <span className="text-[10px] text-white/30">{t('product.typeMsg')}</span>
                </div>
              </div>
            </div>

            {/* PANEL DERECHO: CRM & Automation System */}
            <div className="w-full md:w-[55%] flex flex-col gap-4 relative z-10">
              
              {/* KPI Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#12141c] md:bg-white/[0.03] md:backdrop-blur-xl rounded-[24px] p-5 border border-white/10 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.2)]">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">{data.kpiTitle}</p>
                  <div className="relative mt-2 h-8">
                    <div className="ps-crm-revenue-old absolute inset-0 text-3xl font-display font-bold bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">{data.kpi?.old}</div>
                    <div className="ps-crm-revenue-new opacity-0 absolute inset-0 text-3xl font-display font-bold bg-gradient-to-br from-green-400 to-green-600 bg-clip-text text-transparent">{data.kpi?.new}</div>
                  </div>
                </div>
                <div className="bg-[#12141c] md:bg-white/[0.03] md:backdrop-blur-xl rounded-[24px] p-5 border border-white/10 flex flex-col justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.2)]">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-2">{t('product.automations')}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-50 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <span className="text-sm font-medium text-white">{t('product.activeListening')}</span>
                  </div>
                </div>
              </div>
              
              {/* Perfil del Lead en Vivo */}
              <div className="bg-[#12141c] md:bg-white/[0.03] md:backdrop-blur-xl rounded-[24px] p-5 lg:p-6 border border-white/10 flex-1 relative flex flex-col shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.2)]">
                
                {/* Cabecera del Contacto */}
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/10">
                   <div>
                     <h3 className="text-xl font-bold text-white mb-1">{data.contactName}</h3>
                     <p className="text-sm text-white/40">{data.contact?.phone}</p>
                   </div>
                   <div className="ps-crm-status-box px-3 py-1.5 rounded-full border transition-colors duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                     <span className="ps-crm-status-text text-[10px] font-bold uppercase tracking-wider">{data.statusOld}</span>
                   </div>
                </div>
                
                {/* Datos Estructurados Dinámicos */}
                <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                  <div className="bg-black/60 md:bg-black/40 md:backdrop-blur-md rounded-xl p-4 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] text-white/40 uppercase font-bold">{data.extractedLabel}</span>
                    <div className="relative h-5 mt-1 overflow-hidden">
                       <span className="ps-crm-users-old absolute inset-0 text-sm font-medium text-white/40">{data.extractedOld}</span>
                       <span className="ps-crm-users-new opacity-0 absolute inset-0 text-sm font-bold bg-gradient-to-br from-purple-400 to-indigo-400 bg-clip-text text-transparent">{data.extractedNew}</span>
                    </div>
                  </div>
                  <div className="bg-black/60 md:bg-black/40 md:backdrop-blur-md rounded-xl p-4 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                    <span className="text-[10px] text-white/40 uppercase font-bold">{t('product.originLabel')}</span>
                    <span className="block text-sm font-medium text-white mt-1 truncate">{data.origin}</span>
                  </div>
                </div>
                
                {/* Consola de Actividad en Vivo (Logs Dinámicos) */}
                <div className="flex-1 relative">
                   <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                     <Zap size={10} className="text-blue-400"/> {t('product.systemLog')}
                   </h4>
                   
                   <div className="space-y-4">
                     {data.logs.map((log: any, i: number) => {
                       const color = colorMap[log.color];
                       const LogIcon = log.icon;
                       return (
                         <div key={i} className={`ps-crm-event ps-crm-event-${i + 1} opacity-0 flex gap-3 items-start`}>
                           <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${color.bg} ${color.border} ${color.shadow}`}>
                             <LogIcon size={12} className={color.text} />
                           </div>
                           <div>
                             <p className={`text-sm font-bold ${i === 3 ? 'text-green-400' : 'text-white'}`}>{log.title}</p>
                             <p className={`text-[10px] mt-0.5 ${i === 3 ? 'text-green-400/60' : (i === 1 ? 'text-purple-400/80' : 'text-white/50')}`}>{log.desc}</p>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}