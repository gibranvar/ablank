'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Megaphone, ShoppingCart, Settings, Headphones, ClipboardList, BarChart3, ArrowRight, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface UseCase {
  id: string;
  icon: typeof Megaphone;
  label: string;
  title: string;
  description: string;
  workflow: { step: string; detail: string }[];
  metrics: { label: string; value: string }[];
}

const useCases: UseCase[] = [
  {
    id: 'marketing',
    icon: Megaphone,
    label: 'Marketing',
    title: 'Captura y nutre leads automáticamente',
    description: 'Desde el primer click hasta el CRM. Cada campaña, cada landing, cada contacto — sincronizado.',
    workflow: [
      { step: 'Campaña activa', detail: 'Google Ads + Meta Ads' },
      { step: 'Landing dinámica', detail: 'Optimizada por AI' },
      { step: 'Lead capturado', detail: 'Form → CRM automático' },
      { step: 'Nurture sequence', detail: 'Email + WhatsApp' },
      { step: 'Lead scored', detail: 'AI clasifica intención' },
    ],
    metrics: [
      { label: 'Costo por lead', value: '-42%' },
      { label: 'Leads/mes', value: '1,240' },
      { label: 'Calificación', value: 'Auto' },
    ],
  },
  {
    id: 'sales',
    icon: ShoppingCart,
    label: 'Sales',
    title: 'Convierte cada oportunidad en venta',
    description: 'Pipeline visible, seguimiento automático, cotizaciones instantáneas. El vendedor enfocado en cerrar.',
    workflow: [
      { step: 'Lead asignado', detail: 'Distribución automática' },
      { step: 'Cotización enviada', detail: 'Cotizador conectado' },
      { step: 'Seguimiento', detail: 'WhatsApp + email reminders' },
      { step: 'Propuesta aceptada', detail: 'Firma digital' },
      { step: 'Venta cerrada', detail: 'Sync con facturación' },
    ],
    metrics: [
      { label: 'Conversión', value: '32%' },
      { label: 'Ciclo venta', value: '-5 días' },
      { label: 'Ticket prom.', value: '$3.2k' },
    ],
  },
  {
    id: 'operations',
    icon: Settings,
    label: 'Operations',
    title: 'Automatiza procesos internos',
    description: 'Inventario, órdenes, proveedores, logística. Lo que hoy requiere supervisiones — funciona solo.',
    workflow: [
      { step: 'Orden recibida', detail: 'Ecommerce + API' },
      { step: 'Stock validado', detail: 'Sincronización automática' },
      { step: 'Proveedor notificado', detail: 'Reorder automático' },
      { step: 'Logística asignada', detail: 'Ruta optimizada por AI' },
      { step: 'Entrega confirmada', detail: 'WhatsApp al cliente' },
    ],
    metrics: [
      { label: 'Procesos auto', value: '87%' },
      { label: 'Errores', value: '-94%' },
      { label: 'Tiempo op.', value: '-60%' },
    ],
  },
  {
    id: 'service',
    icon: Headphones,
    label: 'Customer Service',
    title: 'Respuestas inmediatas, 24/7',
    description: 'AI responde consultas frecuentes. Escala a humano cuando hace falta. Todo queda registrado.',
    workflow: [
      { step: 'Consulta recibida', detail: 'WhatsApp + Web + Email' },
      { step: 'AI responde', detail: 'Contexto del CRM' },
      { step: 'Ticket creado', detail: 'Si requiere humano' },
      { step: 'Agente asignado', detail: 'Por especialidad' },
      { step: 'Resolución', detail: 'Feedback al sistema' },
    ],
    metrics: [
      { label: 'Respuesta', value: '<30s' },
      { label: 'Auto-resuelve', value: '78%' },
      { label: 'Satisfacción', value: '4.8/5' },
    ],
  },
  {
    id: 'admin',
    icon: ClipboardList,
    label: 'Administration',
    title: 'Control total del negocio',
    description: 'Facturación, reportes, cumplimiento, accesos. Una sola plataforma para todo el back-office.',
    workflow: [
      { step: 'Venta registrada', detail: 'Sync automático' },
      { step: 'Factura generada', detail: 'Cumplimiento fiscal' },
      { step: 'Reporte consolidado', detail: 'Dashboard en tiempo real' },
      { step: 'Auditoría', detail: 'Log de cada acción' },
      { step: 'Pagos reconciliados', detail: 'Bank API + Stripe' },
    ],
    metrics: [
      { label: 'Automatización', value: '92%' },
      { label: 'Error manual', value: '-98%' },
      { label: 'Reportes', value: 'Tiempo real' },
    ],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    label: 'Analytics',
    title: 'Decisiones con datos, no intuición',
    description: 'Cada área del negocio visible en dashboards. Métricas que se actualizan solas.',
    workflow: [
      { step: 'Datos consolidados', detail: 'Todas las fuentes' },
      { step: 'Procesamiento AI', detail: 'Patrones y tendencias' },
      { step: 'Dashboard unificado', detail: 'KPIs por área' },
      { step: 'Alertas inteligentes', detail: 'Anomalías detectadas' },
      { step: 'Reportes automáticos', detail: 'Periodicos a stakeholders' },
    ],
    metrics: [
      { label: 'Fuentes', value: '14+' },
      { label: 'Update', value: 'Real-time' },
      { label: 'Insights', value: 'Auto' },
    ],
  },
];

export function UseCaseSection() {
  const [activeId, setActiveId] = useState('marketing');
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-32 md:py-48 bg-[#020202] overflow-hidden">
      {/* Patrón de fondo tecnológico */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Encabezado */}
        <div className="uc-header text-center mb-12 lg:mb-16 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
            <Sparkles size={12} className="text-blue-400" />
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">Casos de Uso</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight text-balance">
            Un sistema central.<br/>
            <span className="text-white/30">Para cada área del negocio.</span>
          </h2>
        </div>

        {/* Menú de Pestañas (Pills) */}
        <div className="uc-tabs flex justify-start md:justify-center overflow-x-auto hide-scrollbar pb-4 mb-10 lg:mb-16 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-max mx-auto shadow-2xl">
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
                  ? 'opacity-100 translate-y-0 blur-none z-10 pointer-events-auto' 
                  : 'opacity-0 translate-y-12 blur-md z-0 pointer-events-none'
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
                     <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm shadow-lg hover:bg-white/10 transition-colors duration-300">
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-150" />
                    
                    <div className="flex items-center gap-2 mb-8 lg:mb-10 relative z-10">
                      <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                         <Sparkles size={12} className="text-blue-400" />
                         <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Workflow Engine</span>
                      </div>
                    </div>

                    <div className="relative z-10 space-y-6 lg:space-y-8">
                      {/* Línea vertical conectora adaptada (left-15px en mobile, left-19px en desktop) */}
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
                     <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3 sm:p-4 backdrop-blur-sm shadow-lg text-center flex flex-col items-center justify-center hover:bg-white/10 transition-colors duration-300">
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