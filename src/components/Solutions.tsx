'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, Zap, Bot, Code, ArrowUpRight, Link2, TrendingUp, MessageSquare, Database, DollarSign, Target 
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const solutions = [
  {
    id: 'dx',
    icon: Globe,
    name: 'Desarrollo Web',
    tagline: 'Modernos y rápidos',
    description: 'Creamos sitios web modernos, rápidos y orientados a convertir visitas en clientes. La puerta de entrada a tu negocio.',
    features: ['Alta conversión', 'Diseño a medida', 'Rendimiento', 'SEO técnico'],
  },
  {
    id: 'auto',
    icon: Zap,
    name: 'Automatización',
    tagline: 'Operación más eficiente',
    description: 'Eliminamos tareas repetitivas y conectamos herramientas para que tu operación trabaje de forma automática, eficiente y sin fricción.',
    features: ['Workflows visuales', 'Triggers inteligentes', 'Tareas en 2do plano', 'Reducción de errores'],
  },
  {
    id: 'custom',
    icon: Code,
    name: 'Sistemas a Medida',
    tagline: 'Software real, sin atajos',
    description: 'Desarrollamos herramientas internas y soluciones personalizadas adaptadas a cómo funciona tu negocio. Y no, aquí no usamos vibecoding.',
    features: ['0% Vibecoding', 'Arquitectura sólida', 'Herramientas internas', 'Escalabilidad'],
  },
  {
    id: 'integrations',
    icon: Link2,
    name: 'Integraciones',
    tagline: 'La información fluye sola',
    description: 'Conectamos CRM, WhatsApp, formularios, bases de datos y pagos para que tu información viaje automáticamente entre plataformas.',
    features: ['APIs', 'Webhooks', 'Conexión CRM', 'Pasarelas de Pago'],
  },
  {
    id: 'ai',
    icon: Bot,
    name: 'Inteligencia Artificial',
    tagline: 'Aceleración de procesos',
    description: 'Integramos IA en procesos de atención, ventas, soporte y operación para reducir trabajo manual y responder al instante.',
    features: ['Agentes IA 24/7', 'Clasificación', 'Lenguaje Natural', 'Predicciones'],
  },
  {
    id: 'bi',
    icon: TrendingUp,
    name: 'Optimización (CRO)',
    tagline: 'Mejoramos experiencias',
    description: 'Mejoramos experiencias, flujos y puntos de contacto para aumentar la eficiencia y convertir mejor el tráfico y los prospectos.',
    features: ['CRO', 'A/B Testing', 'Análisis de flujos', 'Métricas de negocio'],
  },
];

export function Solutions() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLElement>(null);

  // Animaciones de entrada
  useGSAP(() => {
    gsap.fromTo('.sol-line', 
      { yPercent: 120 },
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.sol-headline', start: 'top 85%' },
      }
    );

    gsap.fromTo('.sol-item', 
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.sol-list', start: 'top 85%' },
      }
    );
  }, { scope: rootRef });

  // Animación de detalle
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo('.sol-detail-content', 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    )
    .fromTo('.sol-feature-tag', 
      { opacity: 0, x: -10 }, 
      { opacity: 1, x: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out' }, 
      '-=0.1'
    );
  }, { dependencies: [active], scope: rootRef });

  const activeSolution = solutions[active];

  return (
    <section ref={rootRef} id="soluciones" className="relative w-full py-32 bg-[#020202] overflow-hidden font-sans border-t border-white/5">
      
      {/* Background Orbs (Tonos intensos para refractar en el cristal) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* ================= HEADER ================= */}
        <div className="sol-headline text-center mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
            <Target size={12} className="text-white" />
            <span className="text-[10px] font-semibold text-white/80 uppercase tracking-widest">Servicios Core</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight leading-tight text-balance">
            <span className="block overflow-hidden pb-1">
              <span className="sol-line block text-white">El ecosistema que</span>
            </span>
            <span className="block overflow-hidden">
              <span className="sol-line block bg-gradient-to-r from-[#0175ff] to-[#ffcd7d] bg-clip-text text-transparent pb-2">
                tu negocio necesita.
              </span>
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* ----- COLUMNA IZQUIERDA: LISTA DE SOLUCIONES ----- */}
          <div className="sol-list lg:col-span-5 space-y-2">
            {solutions.map((sol, i) => {
              const Icon = sol.icon;
              const isActive = i === active;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActive(i)}
                  className={`sol-item w-full text-left p-4 rounded-2xl border transition-colors duration-300 flex items-center gap-4 group ${
                    isActive 
                      ? 'bg-white/10 backdrop-blur-2xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
                      : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  {/* Ícono de Lista */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    isActive 
                      ? 'bg-white/15 border border-white/30 text-white shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)]' 
                      : 'bg-black/50 border border-white/10 text-white/40 group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white/80'
                  }`}>
                    <Icon size={20} />
                  </div>
                  
                  {/* Textos Mejorados (Alto contraste) */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-base font-semibold transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                    }`}>
                      {sol.name}
                    </div>
                    <div className={`text-xs mt-0.5 transition-colors duration-300 ${
                      isActive ? 'text-white/80 font-medium' : 'text-white/40 group-hover:text-white/60'
                    }`}>
                      {sol.tagline}
                    </div>
                  </div>
                  
                  {/* Flecha */}
                  <ArrowUpRight
                    size={18}
                    className={`transition-all duration-300 ${
                      isActive 
                        ? 'text-white translate-x-1 -translate-y-1 opacity-100' 
                        : 'text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-white/50'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* ----- COLUMNA DERECHA: DASHBOARD DE DETALLE (DARK GLASS) ----- */}
          <div className="lg:col-span-7 relative">
            <div className="sol-detail sticky top-24 bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[32px] p-8 md:p-10 overflow-hidden min-h-[420px]">
              
              {/* Brillo especular superior del cristal */}
              <div className="absolute inset-0 rounded-[32px] border-t border-white/20 pointer-events-none" />

              <div className="sol-detail-content relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)] border border-white/20">
                    <activeSolution.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-white">{activeSolution.name}</div>
                    <div className="text-sm text-white/60 mt-1">{activeSolution.tagline}</div>
                  </div>
                </div>

                <p className="text-white/80 mb-8 text-sm md:text-base leading-relaxed">
                  {activeSolution.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {activeSolution.features.map((f) => (
                    <span
                      key={f}
                      className="sol-feature-tag px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 border border-white/10 shadow-sm text-white/90 backdrop-blur-md"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Visual mockup (Cristal incrustado) */}
                <div className="rounded-xl p-6 relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                  <SolutionMockup solution={activeSolution} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// COMPONENTES VISUALES (MOCKUPS) - DARK GLASS THEME
// -------------------------------------------------------------
function SolutionMockup({ solution }: { solution: typeof solutions[0] }) {
  if (solution.id === 'dx') {
    return (
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="h-20 rounded-lg mb-2 flex items-center justify-center bg-white/10 border border-white/15 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
            <Globe size={24} className="text-white" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3].map(i => <div key={i} className="h-8 rounded bg-white/5 border border-white/5" />)}
          </div>
        </div>
      </div>
    );
  }

  if (solution.id === 'auto') {
    return (
      <div className="space-y-2">
        {['Trigger: Lead Nuevo', 'Condición: ¿Califica?', 'Acción: Notificar CRM', 'WhatsApp Auto'].map((label, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            <div className="flex-1 h-8 rounded-lg flex items-center px-3 text-xs text-white/80 bg-white/5 border border-white/10 backdrop-blur-sm">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  if (solution.id === 'custom') {
    return (
      <div className="space-y-2">
        {['API Endpoint', 'Database Schema', 'Auth Layer', 'Business Logic'].map((label, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
            <Code size={14} className="text-white/80" />
            <span className="text-xs text-white/70">{label}</span>
            <div className="ml-auto w-12 h-1.5 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    );
  }

  if (solution.id === 'integrations') {
    return (
      <div className="flex items-center justify-between px-2 py-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative z-10 bg-white/10 border border-white/20 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] backdrop-blur-md">
          <MessageSquare size={18} className="text-white" />
        </div>
        <div className="flex-1 h-px border-t-2 border-dashed border-white/20 mx-2" />
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative z-10 bg-white/10 border border-white/20 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] backdrop-blur-md">
          <Database size={18} className="text-white" />
        </div>
        <div className="flex-1 h-px border-t-2 border-dashed border-white/20 mx-2" />
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative z-10 bg-white/10 border border-white/20 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] backdrop-blur-md">
          <DollarSign size={18} className="text-white" />
        </div>
      </div>
    );
  }

  if (solution.id === 'ai') {
    return (
      <div className="space-y-3">
        <div className="ml-auto max-w-[80%] p-3 rounded-xl text-xs bg-white/15 text-white border border-white/20 backdrop-blur-md shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
          ¿Tienen este producto para mañana?
        </div>
        <div className="max-w-[80%] p-3 rounded-xl text-xs bg-white/5 text-white/80 border border-white/10 backdrop-blur-sm">
          Sí, tenemos 12 unidades. Te genero la cotización al instante.
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/40 mt-2">
          <div className="flex gap-1">
            {[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" style={{animationDelay: `${i*0.2}s`}} />)}
          </div>
          Agente IA procesando...
        </div>
      </div>
    );
  }

  if (solution.id === 'bi') {
    return (
      <div>
        <div className="flex items-end gap-1.5 h-20 mb-4">
          {[30, 50, 40, 70, 55, 85, 65].map((h, i) => (
            <div key={i} className={`flex-1 rounded-t ${i === 5 ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-white/10'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{l:'Conversión',v:'+28%'},{l:'Leads',v:'1,247'},{l:'CPA',v:'-$14'}].map(s => (
            <div key={s.l} className="p-2 rounded-lg text-center bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-sm font-bold text-white">{s.v}</div>
              <div className="text-[9px] text-white/40 uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}