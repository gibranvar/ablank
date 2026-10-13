'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileText, Sparkles, Play, Briefcase, DollarSign, Activity, Zap, ShieldCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function HowItWorks() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ESCRITORIO
    mm.add("(min-width: 768px)", () => {
      const introTl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
      });
      
      introTl.fromTo(['.hiw-badge', 'h2 > span', '.hiw-sub'], 
        { opacity: 0, filter: 'blur(16px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, stagger: 0.15, ease: 'power2.out' }
      )
      .fromTo('.hiw-master-container',
        { opacity: 0, filter: 'blur(16px)', y: 40 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out' },
        '-=1'
      );
    });

    // MÓVILES (Sin Blur)
    mm.add("(max-width: 767px)", () => {
      const introTl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
      });
      
      introTl.fromTo(['.hiw-badge', 'h2 > span', '.hiw-sub'], 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }
      )
      .fromTo('.hiw-master-container',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      );
    });

    return () => mm.revert();
  }, { scope: containerRef }); 

  // ANIMACIÓN INTERNA DEL SIMULADOR
  useGSAP(() => {
    const tl = gsap.timeline({ 
      paused: true, 
      repeat: -1, 
      repeatDelay: 5,
    });
    
    tlRef.current = tl;

    tl.set('.hiw-msg', { opacity: 0, y: 15, scale: 0.95 }, 0)
      .set('.hiw-typing', { opacity: 0 }, 0)
      .set('.hiw-crm-event', { opacity: 0, x: -20 }, 0)
      .set('.hiw-crm-revenue-new', { opacity: 0, y: 15 }, 0)
      .set('.hiw-crm-revenue-old', { opacity: 1, y: 0 }, 0)
      .set('.hiw-crm-status-text', { textContent: t('howItWorks.statusNewLead'), color: '#60a5fa' }, 0)
      .set('.hiw-crm-status-box', { backgroundColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.2)' }, 0)
      .set('.hiw-progress-bar', { width: '0%' }, 0);

    // Mensaje 1: Lead
    tl.to('.hiw-msg-1', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, 0.5)
      .to('.hiw-crm-event-1', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '+=0.2');

    // Bot escribiendo y Mensaje 2: Bot texto
    tl.to('.hiw-typing', { opacity: 1, duration: 0.2 }, '+=0.3')
      .to('.hiw-typing', { opacity: 0, duration: 0.2 }, '+=1.0')
      .to('.hiw-msg-2', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' })
      .to('.hiw-crm-event-2', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '+=0.2');

    // Bot escribiendo y Mensaje 3: Bot
    tl.to('.hiw-typing', { opacity: 1, duration: 0.2 }, '+=0.5')
      .to('.hiw-typing', { opacity: 0, duration: 0.2 }, '+=1.5')
      .to('.hiw-msg-3', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' });

    // Cliente contesta (Mensaje 4)
    tl.to('.hiw-msg-4', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '+=1.5');

    // Bot escribiendo y Mensaje 5: Bot
    tl.to('.hiw-typing', { opacity: 1, duration: 0.2 }, '+=0.5')
      .to('.hiw-typing', { opacity: 0, duration: 0.2 }, '+=1.0')
      .to('.hiw-msg-5', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' })
      .to('.hiw-crm-event-3', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '+=0.2');

    // Bot escribiendo y Mensaje 6 (PDF)
    tl.to('.hiw-typing', { opacity: 1, duration: 0.2 }, '+=0.5')
      .to('.hiw-typing', { opacity: 0, duration: 0.2 }, '+=1.5')
      .to('.hiw-msg-6', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' })
      .to('.hiw-crm-event-4', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '+=0.2');

    // Cliente final (Mensaje 7)
    tl.to('.hiw-msg-7', { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '+=1.5')
      .to('.hiw-crm-revenue-old', { opacity: 0, y: -15, duration: 0.4 }, '<')
      .to('.hiw-crm-revenue-new', { opacity: 1, y: 0, duration: 0.4 }, '<')
      .to('.hiw-crm-status-box', { backgroundColor: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.3)', duration: 0.4 }, '<')
      .to('.hiw-crm-status-text', { textContent: t('howItWorks.statusQuoted'), color: '#4ade80', duration: 0.4 }, '<');

    const fullDuration = tl.duration();
    tl.to('.hiw-progress-bar', { width: '100%', duration: fullDuration, ease: 'none' }, 0);

  }, { scope: containerRef });

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
    <section id='como-funciona' ref={containerRef} className="relative py-16 md:py-32 overflow-hidden">
      {/* Fondo técnico sutil */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Encabezado */}
        <div className="text-center mb-10 md:mb-16 relative z-10 flex flex-col items-center">
          <div className="hiw-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 md:backdrop-blur-md mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">{t('howItWorks.badge')}</span>
          </div>
          
          <h2>
            <span>{t('howItWorks.title1')}</span>
            <span>{t('howItWorks.title2')}</span>
          </h2>
          
          <p className="hiw-sub mt-6 max-w-2xl text-balance text-base md:text-lg text-white/50 font-light mx-auto leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* LIQUID GLASS MASTER */}
        <div className="hiw-master-container relative max-w-5xl mx-auto">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none transition-colors duration-1000" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_60%)] pointer-events-none transition-colors duration-1000 translate-x-1/4 -translate-y-1/4" />

          {/* CONTENEDOR PRINCIPAL */}
          <div className="relative bg-[#06070a]/90 md:bg-[#06070a]/40 md:backdrop-blur-2xl border border-white/10 rounded-[32px] p-3 md:p-5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_40px_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-4 md:gap-5 overflow-hidden">
            
            {/* OVERLAY DE CARGA / PLAY */}
            <div className={`absolute inset-0 z-50 rounded-[32px] bg-[#06070a]/95 md:bg-[#06070a]/85 md:backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ease-out border border-white/5 ${isPlaying ? 'opacity-0 pointer-events-none scale-[1.05]' : 'opacity-100 pointer-events-auto scale-100'}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 rounded-[32px] pointer-events-none" />
              
              <button 
                onClick={() => setIsPlaying(true)}
                aria-label="Reproducir simulación"
                className="group relative w-20 md:w-24 h-20 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 md:mb-8 cursor-pointer hover:bg-white/10 transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.5)] active:scale-95"
              >
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl group-hover:bg-blue-500/40 transition-all duration-500" />
                <Play className="text-white ml-2 relative z-10 group-hover:scale-110 transition-transform duration-300" size={32} fill="currentColor" />
              </button>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3 md:mb-4">
                 <Zap size={12} className="text-blue-400" />
                 <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">{t('howItWorks.caseBadge')}</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-2 text-center px-4">{t('howItWorks.caseTitle')} </h3>
              <p className="text-white/40 text-sm">{t('howItWorks.caseSub')}</p>
            </div>

            {/* Progress Bar Top */}
            <div className="absolute top-0 left-0 h-[2px] bg-blue-500/60 hiw-progress-bar rounded-t-[32px] shadow-[0_0_10px_rgba(59,130,246,0.8)] z-40" style={{ width: '0%' }} />

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
                  <h4 className="text-white font-medium text-sm">{t('howItWorks.chatName')}</h4>
                  <p className="text-blue-400 text-[10px] font-medium tracking-wide">{t('howItWorks.chatStatus')}</p>
                </div>
              </div>
              
              {/* Body Chat */}
              <div className="flex-1 relative flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('https://framerusercontent.com/images/XXSw2JqvtikgOcaexTTozzVsO54.webp?width=756&height=1274')" }}>
                <div className="absolute inset-0 bg-[#0a0a0c]/85 md:bg-[#0a0a0c]/50 md:backdrop-blur-[2px] z-0" />
                
                <div className="relative z-10 p-2 lg:p-3 flex flex-col gap-1.5 md:gap-2.5 flex-1">
                  
                  {/* Msj 1 - Lead */}
                  <div className="hiw-msg will-change-[transform,opacity] hiw-msg-1 opacity-0 self-end bg-blue-600 text-white px-2.5 py-1.5 text-[11.5px] leading-snug rounded-2xl rounded-tr-sm max-w-[90%] border border-blue-400/50 shadow-lg">{t('howItWorks.chat1')}<div className="text-[9px] text-blue-200 mt-1 text-right flex justify-end items-center gap-1">09:41</div>
                  </div>

                  {/* Msj 2 - Bot */}
                  <div className="hiw-msg will-change-[transform,opacity] hiw-msg-2 opacity-0 self-start bg-[#1c1e29] md:bg-white/10 md:backdrop-blur-md text-white px-2.5 py-1.5 text-[11.5px] leading-snug rounded-2xl rounded-tl-sm max-w-[90%] border border-white/10">{t('howItWorks.chat2')}<div className="text-[9px] text-white/40 flex justify-start items-center gap-1 mt-1">09:41</div>
                  </div>

                  {/* Msj 3 - Bot */}
                  <div className="hiw-msg will-change-[transform,opacity] hiw-msg-3 opacity-0 self-start bg-[#1c1e29] md:bg-white/10 md:backdrop-blur-md text-white px-2.5 py-1.5 text-[11.5px] leading-snug rounded-2xl rounded-tl-sm max-w-[90%] border border-white/10">{t('howItWorks.chat3')}<div className="text-[9px] text-white/40 flex justify-start items-center gap-1 mt-1">09:42</div>
                  </div>

                  {/* Msj 4 - Lead */}
                  <div className="hiw-msg will-change-[transform,opacity] hiw-msg-4 opacity-0 self-end bg-blue-600 text-white px-2.5 py-1.5 text-[11.5px] leading-snug rounded-2xl rounded-tr-sm max-w-[90%] border border-blue-400/50 shadow-lg">
                    {t('howItWorks.chat4')}
                    <div className="text-[9px] text-blue-200 mt-1 text-right flex justify-end items-center gap-1">09:43</div>
                  </div>

                  {/* Msj 5 - Bot */}
                  <div className="hiw-msg will-change-[transform,opacity] hiw-msg-5 opacity-0 self-start bg-[#1c1e29] md:bg-white/10 md:backdrop-blur-md text-white px-2.5 py-1.5 text-[11.5px] leading-snug rounded-2xl rounded-tl-sm max-w-[90%] border border-white/10">
                    {t('howItWorks.chat5')}
                    <div className="text-[9px] text-white/40 flex justify-start items-center gap-1 mt-1">09:43</div>
                  </div>

                  {/* Msj 6 - Bot PDF */}
                  <div className="hiw-msg will-change-[transform,opacity] hiw-msg-6 opacity-0 self-start bg-[#1c1e29] md:bg-white/10 md:backdrop-blur-md text-white px-2.5 py-1.5 text-[11.5px] leading-snug rounded-2xl rounded-tl-sm max-w-[90%] border border-white/10 flex flex-col gap-2">
                    {t('howItWorks.chat6')}
                    <div className="flex items-center gap-3 bg-black/60 md:bg-black/40 p-2 rounded-xl border border-white/5 my-1">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-red-400"/>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white/90">{t('howItWorks.chat6PdfName')}</p>
                        <p className="text-[9px] text-white/50">{t('howItWorks.chat6PdfSize')}</p>
                      </div>
                    </div>{t('howItWorks.chat6Text2')}<div className="text-[9px] text-white/40 flex justify-start items-center gap-1 mt-1">09:44</div>
                  </div>

                  {/* Msj 7 - Lead */}
                  <div className="hiw-msg will-change-[transform,opacity] hiw-msg-7 opacity-0 self-end bg-blue-600 text-white px-2.5 py-1.5 text-[11.5px] leading-snug rounded-2xl rounded-tr-sm max-w-[90%] border border-blue-400/50 shadow-lg">
                    {t('howItWorks.chat7')}
                    <div className="text-[9px] text-blue-200 mt-1 text-right flex justify-end items-center gap-1">09:45</div>
                  </div>
                  
                  {/* Typing Indicator */}
                  <div className="hiw-typing opacity-0 will-change-[transform,opacity] absolute bottom-6 left-5 bg-[#1c1e29] md:bg-white/10 md:backdrop-blur-xl p-3 rounded-2xl rounded-tl-sm border border-white/10 flex gap-1.5 shadow-lg">
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"/>
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}/>
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}/>
                  </div>
                </div>
              </div>

              {/* Fake Input */}
              <div className="h-[60px] border-t border-white/10 bg-black/90 md:bg-black/50 md:backdrop-blur-xl flex items-center px-4 gap-3 relative z-20">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                  <Sparkles size={14} className="text-white/40" />
                </div>
                <div className="flex-1 h-10 rounded-full bg-white/5 border border-white/5 flex items-center px-4">
                  <span className="text-[10px] text-white/30">{t('howItWorks.chat5')}</span>
                </div>
              </div>
            </div>

            {/* PANEL DERECHO: CRM & Automation System */}
            <div className="w-full md:w-[55%] flex flex-col gap-4 relative z-10">
              
              {/* KPI Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#12141c] md:bg-white/[0.03] md:backdrop-blur-xl rounded-[24px] p-5 border border-white/10 relative overflow-hidden">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">{t('howItWorks.val1')}</p>
                  <div className="relative mt-2 h-8">
                    <div className="hiw-crm-revenue-old absolute will-change-[transform,opacity] inset-0 text-3xl font-display font-bold bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">$0</div>
                    <div className="hiw-crm-revenue-new opacity-0 absolute will-change-[transform,opacity] inset-0 text-3xl font-display font-bold bg-gradient-to-br from-green-400 to-green-600 bg-clip-text text-transparent">$12,500</div>
                  </div>
                </div>
                <div className="bg-[#12141c] md:bg-white/[0.03] md:backdrop-blur-xl rounded-[24px] p-5 border border-white/10 flex flex-col justify-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-2">{t('howItWorks.val2')}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <span className="text-sm font-medium text-white">{t('howItWorks.val3')}</span>
                  </div>
                </div>
              </div>
              
              {/* Perfil del Lead */}
              <div className="bg-[#12141c] md:bg-white/[0.03] md:backdrop-blur-xl rounded-[24px] p-5 lg:p-6 border border-white/10 flex-1 relative flex flex-col">
                
                {/* Cabecera del Contacto */}
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/10">
                   <div>
                     <h3 className="text-xl font-bold text-white mb-1">{t('howItWorks.companyName')}</h3>
                     <p className="text-sm text-white/40">{t("howItWorks.phone")}</p>
                   </div>
                   <div className="hiw-crm-status-box px-3 py-1.5 rounded-full border transition-colors duration-500">
                     <span className="hiw-crm-status-text text-[10px] font-bold uppercase tracking-wider">{t('howItWorks.val4')}</span>
                   </div>
                </div>
                
                {/* Consola de Actividad */}
                <div className="flex-1 relative">
                   <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                     <Activity size={10} className="text-blue-400"/> {t('howItWorks.sysLog')}
                   </h4>
                   
                   <div className="space-y-4">
                     {/* Evento 1 */}
                     <div className="hiw-crm-event will-change-[transform,opacity] hiw-crm-event-1 opacity-0 flex gap-3 items-start">
                       <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border bg-blue-500/20 border-blue-500/30">
                         <Briefcase size={12} className="text-blue-400" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-white">{t('howItWorks.ev1Title')}</p>
                         <p className="text-[10px] mt-0.5 text-white/50">{t('howItWorks.ev1Desc')}</p>
                       </div>
                     </div>
                     {/* Evento 2 */}
                     <div className="hiw-crm-event will-change-[transform,opacity] hiw-crm-event-2 opacity-0 flex gap-3 items-start">
                       <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border bg-purple-500/20 border-purple-500/30">
                         <Zap size={12} className="text-purple-400" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-white">{t('howItWorks.ev2Title')}</p>
                         <p className="text-[10px] mt-0.5 text-white/50">[GET] /api/erp/inventory/valvulas -&gt; Status: 200 OK</p>
                       </div>
                     </div>
                     {/* Evento 3 */}
                     <div className="hiw-crm-event will-change-[transform,opacity] hiw-crm-event-3 opacity-0 flex gap-3 items-start">
                       <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border bg-orange-500/20 border-orange-500/30">
                         <FileText size={12} className="text-orange-400" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-white">{t('howItWorks.ev3Title')}</p>
                         <p className="text-[10px] mt-0.5 text-white/50">{t('howItWorks.ev3Desc')}</p>
                       </div>
                     </div>
                     {/* Evento 4 */}
                     <div className="hiw-crm-event will-change-[transform,opacity] hiw-crm-event-4 opacity-0 flex gap-3 items-start">
                       <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border bg-green-500/20 border-green-500/30">
                         <ShieldCheck size={12} className="text-green-400" />
                       </div>
                       <div>
                         <p className="text-sm font-bold text-green-400">{t('howItWorks.ev4Title')}</p>
                         <p className="text-[10px] mt-0.5 text-green-400/60">{t('howItWorks.ev4Desc')}</p>
                       </div>
                     </div>
                   </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
