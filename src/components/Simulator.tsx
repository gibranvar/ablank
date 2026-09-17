'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageSquare, TrendingUp, AlertTriangle, ArrowRight, 
  Clock, DollarSign, Zap
} from 'lucide-react';
import { pushToDataLayer } from '../utils/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function LostSalesSimulator() {
  const [people, setPeople] = useState<number>(2);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(15);
  const [hourlyCost, setHourlyCost] = useState<number>(150);
  const [automationRate, setAutomationRate] = useState<number>(50);

  const rootRef = useRef<HTMLElement>(null);

  // --- MOTOR DE COSTO DE PROCESOS MANUALES ---
  const getCalculations = () => {
    const safePeople = Math.max(0, Number(people) || 0);
    const safeHoursPerWeek = Math.max(0, Number(hoursPerWeek) || 0);
    const safeHourlyCost = Math.max(0, Number(hourlyCost) || 0);
    const safeAutomationRate = Math.min(100, Math.max(0, Number(automationRate) || 0));

    const weeksPerMonth = 52 / 12;
    const monthlyHours = safePeople * safeHoursPerWeek * weeksPerMonth;
    const monthlyCost = monthlyHours * safeHourlyCost;
    const recoverableHours = monthlyHours * (safeAutomationRate / 100);
    const recoverableMonthlyCost = monthlyCost * (safeAutomationRate / 100);
    const annualCost = monthlyCost * 12;
    const annualRecoverableCost = recoverableMonthlyCost * 12;

    return {
      people: safePeople,
      monthlyHours,
      monthlyCost,
      recoverableHours,
      recoverableMonthlyCost,
      annualCost,
      annualRecoverableCost,
      automationRate: safeAutomationRate,
    };
  };

  const calc = getCalculations();

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(val);

  const handleWhatsAppClick = () => {
    pushToDataLayer('click_whatsapp', {
      location: 'simulator',
      sim_people: people,
      sim_hours: hoursPerWeek,
      sim_cost: hourlyCost,
      sim_automation_rate: automationRate,
      sim_monthly_cost: calc.monthlyCost,
      sim_recoverable: calc.recoverableMonthlyCost
    });
    
    const msg = `Hola, completé el análisis de costo de procesos manuales.


*Mi Operación Actual:*
- Personas involucradas: ${people}
- Horas por semana: ${hoursPerWeek}
- Costo por hora: $${hourlyCost}
- Potencial de automatización estimado: ${automationRate}%

*Mi Diagnóstico:*
Costo mensual de trabajo manual: ${formatCurrency(calc.monthlyCost)}
Horas manuales al mes: ${calc.monthlyHours.toFixed(1)}
Ahorro potencial mensual: ${formatCurrency(calc.recoverableMonthlyCost)}
Ahorro potencial anual: ${formatCurrency(calc.annualRecoverableCost)}

Quiero identificar qué procesos conviene automatizar y cuánto ahorro podría obtener.`;

    window.open(`https://wa.me/5576048470?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // --- ANIMACIONES GSAP (Estándar unificado de desenfoque) ---
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ESCRITORIO
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' }
      });
      
      tl.fromTo(['.sim-badge', 'h2 > span', '.sim-sub'], 
        { opacity: 0, filter: 'blur(16px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, stagger: 0.15, ease: 'power2.out' }
      )
      .fromTo('.sim-panel',
        { opacity: 0, filter: 'blur(16px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, stagger: 0.2, ease: 'power2.out' },
        '-=1'
      );
    });

    // MÓVIL
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%' }
      });
      
      tl.fromTo(['.sim-badge', 'h2 > span', '.sim-sub'], 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }
      )
      .fromTo('.sim-panel',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out' },
        '-=0.8'
      );
    });

    return () => mm.revert();
  }, { scope: rootRef });

  return (
    <section id="simulador" ref={rootRef} className="relative w-full py-16 md:py-32 overflow-hidden font-sans">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <div className="sim-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/80 md:bg-white/5 mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] md:backdrop-blur-md">
            
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">Calculadora de Automatización</span>
          </div>
          
          {/* Título usando el nuevo CSS Global */}
          <h2>
            <span>¿Cuánto te cuestan</span>
            <span>tus procesos manuales?</span>
          </h2>

          <p className="sim-sub text-lg text-white/50 max-w-xl mx-auto text-balance font-light">
            Calcula cuánto tiempo y dinero estás destinando cada mes a tareas que podrían automatizarse.
          </p>
        </div>

        {/* ================= LAYOUT DIVIDIDO ================= */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* ----- COLUMNA IZQUIERDA: FORMULARIO ----- */}
          <div className="sim-panel lg:col-span-7 space-y-6">
            <div className="bg-[#06070a] md:bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 relative overflow-hidden md:backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 blur-[50px] md:blur-[100px] rounded-full pointer-events-none" />
              
              <div className="space-y-10 relative z-10">
                
                {/* 1. Personas */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <MessageSquare size={16} className="text-white/50" />
                    ¿Cuántas personas participan en estos procesos?
                  </label>
                  <p className="text-xs text-white/40 mb-4">Incluye a todas las personas que intervienen aunque solo sea parte de su jornada.</p>
                  <div className="flex items-center gap-2 max-w-[200px]">
                    <input type="number" min="1" value={people || ''} onChange={e => setPeople(Number(e.target.value))} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white w-full focus:outline-none focus:border-white/40 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"/>
                  </div>
                </div>

                {/* 2. Horas */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-white/50" />
                    ¿Cuántas horas por semana consumen en total?
                  </label>
                  <p className="text-xs text-white/40 mb-4">Suma las horas que todas las personas dedican a estos procesos durante una semana.</p>
                  <div className="flex items-center gap-2 max-w-[200px]">
                    <input type="number" min="0" value={hoursPerWeek || ''} onChange={e => setHoursPerWeek(Number(e.target.value))} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white w-full focus:outline-none focus:border-white/40 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"/>
                    <span className="text-white/50 text-sm">h/sem</span>
                  </div>
                </div>

                {/* 3. Costo por hora */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <DollarSign size={16} className="text-white/50" />
                    ¿Cuál es el costo aproximado por hora?
                  </label>
                  <p className="text-xs text-white/40 mb-4">Usa salario, prestaciones y costo operativo aproximado; no necesitas tener una cifra exacta.</p>
                  <div className="flex items-center gap-2 max-w-[200px] relative">
                    <span className="absolute left-4 text-white/50">$</span>
                    <input type="number" min="0" value={hourlyCost || ''} onChange={e => setHourlyCost(Number(e.target.value))} className="bg-black/50 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white w-full focus:outline-none focus:border-white/40 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"/>
                  </div>
                </div>

                {/* 4. Potencial de automatización */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <Zap size={16} className="text-white/50" />
                    ¿Qué parte de este trabajo crees que podría automatizarse?
                  </label>
                  <p className="text-xs text-white/40 mb-4">Para una estimación prudente, empieza con 50%. Después podremos validar qué parte es realmente automatizable.</p>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[25, 50, 75, 90].map(v => (
                      <button key={v} onClick={() => setAutomationRate(v)} className={`py-2.5 rounded-xl border text-sm transition-all ${automationRate === v ? 'bg-white text-black border-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-black/30 border-white/10 text-white/60 hover:bg-white/10'}`}>
                        {v}%
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 max-w-[200px]">
                    <input type="number" min="0" max="100" value={automationRate || ''} onChange={e => setAutomationRate(Number(e.target.value))} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white w-full focus:outline-none focus:border-white/40 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"/>
                    <span className="text-white/50 text-sm">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ----- COLUMNA DERECHA: DASHBOARD DE IMPACTO ----- */}
          <div className="lg:col-span-5 relative">
            <div className="sim-panel sticky top-8 bg-gradient-to-b from-[#0a0a0c] to-[#040405] border border-white/10 rounded-[32px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/10 blur-[45px] md:blur-[90px] rounded-full pointer-events-none" />
              
              <h3 className="text-xl font-display font-medium text-white mb-8 relative z-10">El costo real de hacerlo manualmente</h3>

              {/* Costo mensual */}
              <div className="mb-8 relative z-10">
                <p className="text-[12px] text-white/50 uppercase tracking-[0.1em] font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-red-400"/> Costo mensual del trabajo manual
                </p>
                <div className="text-5xl lg:text-6xl font-display font-semibold text-red-400 tracking-tight drop-shadow-[0_0_15px_rgba(248,113,113,0.3)]">
                  {formatCurrency(calc.monthlyCost)}
                </div>
                <p className="text-[13px] text-white/50 mt-4 leading-relaxed max-w-sm">
                  Es el valor mensual del tiempo que hoy inviertes en estos procesos. No incluye el costo de errores, retrabajo ni oportunidades perdidas.
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

              {/* Potencial recuperable */}
              <div className="mb-10 relative z-10">
                <p className="text-[12px] text-white/50 uppercase tracking-[0.1em] font-semibold mb-3 flex items-center gap-2">
                  <Zap size={14} className="text-blue-400"/> Valor mensual potencialmente recuperable
                </p>
                <div className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                  {formatCurrency(calc.recoverableMonthlyCost)}
                </div>
                <p className="text-[13px] text-white/50 mt-3 leading-relaxed max-w-sm">
                  No es una promesa de ahorro: es una referencia del valor que podrías liberar si automatizas aproximadamente el {calc.automationRate}% de estas tareas.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06070a] md:bg-blue-500/10 border border-blue-500/20 md:backdrop-blur-md">
                  <TrendingUp size={14} className="text-blue-400" />
                  <span className="text-xs font-medium text-blue-300">
                    {calc.recoverableHours.toFixed(1)} horas / mes · {formatCurrency(calc.annualRecoverableCost)} / año
                  </span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 w-full md:w-auto"
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
                <span className="relative z-10">Quiero automatizar estos procesos</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                />
              </button>

              <div className="mt-5 flex justify-between text-[11px] text-white/40 font-medium px-1 relative z-10">
                <span>{calc.people} personas · {calc.monthlyHours.toFixed(1)} h/mes</span>
                <span>{formatCurrency(calc.annualCost)} / año actual</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}