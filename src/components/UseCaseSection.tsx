'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Megaphone, ShoppingCart, Settings, Headphones, ClipboardList, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function UseCaseSection() {
  const [activeId, setActiveId] = useState('marketing');
  const root = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const useCases = [
    {
      id: 'marketing',
      icon: Megaphone,
      label: t('useCases.marketing.label'),
      title: t('useCases.marketing.title'),
      description: t('useCases.marketing.desc'),
      workflow: [
        { step: t('useCases.marketing.workflow.0.step'), detail: t('useCases.marketing.workflow.0.detail') },
        { step: t('useCases.marketing.workflow.1.step'), detail: t('useCases.marketing.workflow.1.detail') },
        { step: t('useCases.marketing.workflow.2.step'), detail: t('useCases.marketing.workflow.2.detail') },
        { step: t('useCases.marketing.workflow.3.step'), detail: t('useCases.marketing.workflow.3.detail') },
        { step: t('useCases.marketing.workflow.4.step'), detail: t('useCases.marketing.workflow.4.detail') },
      ],
      metrics: [
        { label: t('useCases.marketing.metrics.0.label'), value: t('useCases.marketing.metrics.0.value') },
        { label: t('useCases.marketing.metrics.1.label'), value: t('useCases.marketing.metrics.1.value') },
        { label: t('useCases.marketing.metrics.2.label'), value: t('useCases.marketing.metrics.2.value') },
      ],
    },
    {
      id: 'sales',
      icon: ShoppingCart,
      label: t('useCases.sales.label'),
      title: t('useCases.sales.title'),
      description: t('useCases.sales.desc'),
      workflow: [
        { step: t('useCases.sales.workflow.0.step'), detail: t('useCases.sales.workflow.0.detail') },
        { step: t('useCases.sales.workflow.1.step'), detail: t('useCases.sales.workflow.1.detail') },
        { step: t('useCases.sales.workflow.2.step'), detail: t('useCases.sales.workflow.2.detail') },
        { step: t('useCases.sales.workflow.3.step'), detail: t('useCases.sales.workflow.3.detail') },
        { step: t('useCases.sales.workflow.4.step'), detail: t('useCases.sales.workflow.4.detail') },
      ],
      metrics: [
        { label: t('useCases.sales.metrics.0.label'), value: t('useCases.sales.metrics.0.value') },
        { label: t('useCases.sales.metrics.1.label'), value: t('useCases.sales.metrics.1.value') },
        { label: t('useCases.sales.metrics.2.label'), value: t('useCases.sales.metrics.2.value') },
      ],
    },
    {
      id: 'operations',
      icon: Settings,
      label: t('useCases.operations.label'),
      title: t('useCases.operations.title'),
      description: t('useCases.operations.desc'),
      workflow: [
        { step: t('useCases.operations.workflow.0.step'), detail: t('useCases.operations.workflow.0.detail') },
        { step: t('useCases.operations.workflow.1.step'), detail: t('useCases.operations.workflow.1.detail') },
        { step: t('useCases.operations.workflow.2.step'), detail: t('useCases.operations.workflow.2.detail') },
        { step: t('useCases.operations.workflow.3.step'), detail: t('useCases.operations.workflow.3.detail') },
        { step: t('useCases.operations.workflow.4.step'), detail: t('useCases.operations.workflow.4.detail') },
      ],
      metrics: [
        { label: t('useCases.operations.metrics.0.label'), value: t('useCases.operations.metrics.0.value') },
        { label: t('useCases.operations.metrics.1.label'), value: t('useCases.operations.metrics.1.value') },
        { label: t('useCases.operations.metrics.2.label'), value: t('useCases.operations.metrics.2.value') },
      ],
    },
    {
      id: 'service',
      icon: Headphones,
      label: t('useCases.service.label'),
      title: t('useCases.service.title'),
      description: t('useCases.service.desc'),
      workflow: [
        { step: t('useCases.service.workflow.0.step'), detail: t('useCases.service.workflow.0.detail') },
        { step: t('useCases.service.workflow.1.step'), detail: t('useCases.service.workflow.1.detail') },
        { step: t('useCases.service.workflow.2.step'), detail: t('useCases.service.workflow.2.detail') },
        { step: t('useCases.service.workflow.3.step'), detail: t('useCases.service.workflow.3.detail') },
        { step: t('useCases.service.workflow.4.step'), detail: t('useCases.service.workflow.4.detail') },
      ],
      metrics: [
        { label: t('useCases.service.metrics.0.label'), value: t('useCases.service.metrics.0.value') },
        { label: t('useCases.service.metrics.1.label'), value: t('useCases.service.metrics.1.value') },
        { label: t('useCases.service.metrics.2.label'), value: t('useCases.service.metrics.2.value') },
      ],
    },
    {
      id: 'admin',
      icon: ClipboardList,
      label: t('useCases.admin.label'),
      title: t('useCases.admin.title'),
      description: t('useCases.admin.desc'),
      workflow: [
        { step: t('useCases.admin.workflow.0.step'), detail: t('useCases.admin.workflow.0.detail') },
        { step: t('useCases.admin.workflow.1.step'), detail: t('useCases.admin.workflow.1.detail') },
        { step: t('useCases.admin.workflow.2.step'), detail: t('useCases.admin.workflow.2.detail') },
        { step: t('useCases.admin.workflow.3.step'), detail: t('useCases.admin.workflow.3.detail') },
        { step: t('useCases.admin.workflow.4.step'), detail: t('useCases.admin.workflow.4.detail') },
      ],
      metrics: [
        { label: t('useCases.admin.metrics.0.label'), value: t('useCases.admin.metrics.0.value') },
        { label: t('useCases.admin.metrics.1.label'), value: t('useCases.admin.metrics.1.value') },
        { label: t('useCases.admin.metrics.2.label'), value: t('useCases.admin.metrics.2.value') },
      ],
    },
    {
      id: 'analytics',
      icon: BarChart3,
      label: t('useCases.analytics.label'),
      title: t('useCases.analytics.title'),
      description: t('useCases.analytics.desc'),
      workflow: [
        { step: t('useCases.analytics.workflow.0.step'), detail: t('useCases.analytics.workflow.0.detail') },
        { step: t('useCases.analytics.workflow.1.step'), detail: t('useCases.analytics.workflow.1.detail') },
        { step: t('useCases.analytics.workflow.2.step'), detail: t('useCases.analytics.workflow.2.detail') },
        { step: t('useCases.analytics.workflow.3.step'), detail: t('useCases.analytics.workflow.3.detail') },
        { step: t('useCases.analytics.workflow.4.step'), detail: t('useCases.analytics.workflow.4.detail') },
      ],
      metrics: [
        { label: t('useCases.analytics.metrics.0.label'), value: t('useCases.analytics.metrics.0.value') },
        { label: t('useCases.analytics.metrics.1.label'), value: t('useCases.analytics.metrics.1.value') },
        { label: t('useCases.analytics.metrics.2.label'), value: t('useCases.analytics.metrics.2.value') },
      ],
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ESCRITORIO
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo('.uc-header',
          { opacity: 0, filter: 'blur(16px)', y: 30 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2, ease: 'power2.out' }
        )
        .fromTo('.uc-tabs',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
          '-=1.5'
        )
        .fromTo('.uc-content-area',
          { opacity: 0, filter: 'blur(16px)', y: 40 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2, ease: 'power3.out' },
          '-=1.2'
        );
      });

      // MÓVIL (Animación ligera)
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo('.uc-header',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        )
        .fromTo('.uc-tabs',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo('.uc-content-area',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        );
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-16 md:py-32 overflow-hidden">
      {/* Patrón de fondo tecnológico */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Encabezado */}
        <div className="uc-header text-center mb-12 lg:mb-16 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
           
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">{t('useCases.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight text-balance">
            {t('useCases.title1')}<br/>
            <span className="text-white/30">{t('useCases.title2')}</span>
          </h2>
        </div>

              {/* Menú de Pestañas (Pills) */}
        <div className="uc-tabs flex justify-start lg:justify-center overflow-x-auto hide-scrollbar pb-4 mb-10 lg:mb-16 -mx-4 px-4 lg:mx-0 lg:px-0">
          {/* Quitamos el mx-auto en móviles/tablets para evitar el corte y añadimos padding fantasma al final (after) para que no se pegue al borde derecho al terminar el scroll */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/80 md:bg-white/5 border border-white/10 md:backdrop-blur-md w-max lg:mx-auto shadow-2xl after:content-[''] after:w-2 lg:after:hidden">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              const isActive = uc.id === activeId;
              return (
                <button
                  key={uc.id}
                  onClick={() => setActiveId(uc.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-medium transition-all duration-500 whitespace-nowrap ${
                    isActive 
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-100' 
                      : 'text-white/60 hover:text-white hover:bg-white/10 scale-95 hover:scale-100'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-black' : 'text-white/60'} />
                  {uc.label}
                </button>
              );
            })}
          </div>
        </div>
        {/* Área de Contenido con Crossfade CSS Grid */}
        <div className="uc-content-area grid" style={{ gridTemplateColumns: '1fr' }}>
          {useCases.map((uc) => (
            <div 
              key={uc.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center transition-all duration-700 ease-out ${
                uc.id === activeId 
                  ? 'opacity-100 translate-y-0 md:blur-none z-10 pointer-events-auto' 
                  : 'opacity-0 translate-y-12 md:blur-md z-0 pointer-events-none'
              }`}
              style={{ gridArea: '1 / 1' }}
            >
              
              {/* Lado Izquierdo: Textos (Y Métricas en Desktop) */}
              <div className="lg:col-span-6 flex flex-col">
                 <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4 lg:mb-6 text-balance leading-tight">
                   {uc.title}
                 </h3>
                 <p className="text-base lg:text-lg text-white/60 leading-relaxed mb-6 lg:mb-12 max-w-lg">
                   {uc.description}
                 </p>

                 {/* Grid de Métricas (VISIBLE SÓLO EN DESKTOP) */}
                 <div className="hidden lg:grid grid-cols-3 gap-4">
                   {uc.metrics.map((m, i) => (
                     <div key={i} className="rounded-2xl bg-[#06070a] md:bg-white/5 border border-white/10 p-6 md:backdrop-blur-sm shadow-lg hover:bg-white/10 transition-colors duration-300">
                       <div className="text-3xl font-bold bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent mb-2">
                         {m.value}
                       </div>
                       <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                         {m.label}
                       </div>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Lado Derecho: Workflow Visual (Y Métricas en Mobile) */}
              <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-0">
                 
                 {/* Tarjeta del Workflow */}
                 <div className="relative w-full rounded-[24px] lg:rounded-[32px] bg-[#06070a] border border-white/10 p-6 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[40px] md:blur-[80px] rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-150" />
                    
                    <div className="flex items-center gap-2 mb-8 lg:mb-10 relative z-10">
                      <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                         <Sparkles size={12} className="text-blue-400" />
                         <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{t('useCases.workflowEngine')}</span>
                      </div>
                    </div>

                    <div className="relative z-10 space-y-6 lg:space-y-8">
                      {/* Línea vertical conectora adaptada */}
                      <div className="absolute left-[15px] lg:left-[19px] top-6 bottom-6 w-px bg-white/10 overflow-hidden">
                        <div className="w-full h-24 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-0 animate-data-travel" />
                      </div>

                      {/* Pasos del flujo */}
                      {uc.workflow.map((step, i) => (
                        <div key={i} className="flex gap-4 lg:gap-6 relative group/step cursor-default">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 shrink-0 rounded-full bg-[#0a0a0c] border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover/step:scale-110 group-hover/step:border-blue-500/50 group-hover/step:shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-gradient-to-br from-[#0a0a0c] to-[#111116]">
                            <span className="text-[10px] lg:text-xs font-bold text-white/70 group-hover/step:text-blue-400 transition-colors">{i + 1}</span>
                          </div>
                          <div className="pt-1 lg:pt-1.5 flex-1">
                            <h4 className="text-xs lg:text-sm font-semibold text-white mb-0.5 lg:mb-1 transition-colors group-hover/step:text-blue-400">{step.step}</h4>
                            <p className="text-[10px] lg:text-xs text-white/50 leading-relaxed">{step.detail}</p>
                          </div>
                          <div className="pt-2 opacity-0 -translate-x-4 transition-all duration-300 group-hover/step:opacity-100 group-hover/step:translate-x-0 hidden sm:block">
                            <ArrowRight size={14} className="text-blue-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>

                 {/* Grid de Métricas (VISIBLE SÓLO EN MOBILE, DEBAJO DEL WORKFLOW) */}
                 <div className="grid lg:hidden grid-cols-3 gap-2 sm:gap-4">
                   {uc.metrics.map((m, i) => (
                     <div key={i} className="rounded-xl bg-black/40 border border-white/10 p-3 sm:p-4 shadow-lg text-center flex flex-col items-center justify-center transition-colors duration-300">
                       <div className="text-lg sm:text-2xl font-bold bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent mb-1">
                         {m.value}
                       </div>
                       <div className="text-[8px] sm:text-[9px] font-bold text-white/40 uppercase tracking-widest leading-tight">
                         {m.label}
                       </div>
                     </div>
                   ))}
                 </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes data-travel {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(500%); opacity: 0; }
        }
        .animate-data-travel {
          animation: data-travel 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}