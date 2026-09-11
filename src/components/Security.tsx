'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Server, Lock, ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Lista ultracorta y directa
const trustItems = [
  { icon: Server, title: 'Infraestructura 99.9% Uptime' },
  { icon: Lock, title: 'Encriptación Militar AES-256' },
  { icon: Shield, title: 'Monitoreo y Prevención 24/7' },
];

export function Security() {
  const rootRef = useRef<HTMLElement>(null);

  // --- ANIMACIONES GSAP (Estética FeatureShowcase / Simulator) ---
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: rootRef.current, start: 'top 75%' }
    });
    
    tl.fromTo('.sec-header', 
      { opacity: 0, filter: 'blur(16px)', y: 30 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out' }
    )
    .fromTo('.sec-panel',
      { opacity: 0, filter: 'blur(16px)', y: 30 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, stagger: 0.2, ease: 'power2.out' },
      '-=1'
    );
  }, { scope: rootRef });

  return (
    <section ref={rootRef} className="relative w-full py-32 bg-[#020202] overflow-hidden font-sans border-t border-white/5">
      
      {/* Background Orbs (Estética Simulator) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-[100%] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* ================= HEADER CENTRADO (Igual al Simulator) ================= */}
        <div className="sec-header text-center mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]">
            <ShieldCheck size={12} className="text-blue-400" />
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">Seguridad Grado Empresarial</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight leading-tight text-balance">
            <span className="block text-white">Tu negocio, en</span>
            <span className="block bg-gradient-to-r from-[#0175ff] to-[#ffcd7d] bg-clip-text text-transparent pb-2">
              infraestructura blindada.
            </span>
          </h2>
          
          <p className="text-lg text-white/50 max-w-xl mx-auto text-balance">
            Protegemos tu operación con seguridad multicapa. Desde la encriptación de datos hasta el monitoreo continuo, no dejamos cabos sueltos.
          </p>
        </div>

        {/* ================= LAYOUT DIVIDIDO ================= */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* ----- COLUMNA IZQUIERDA: PANEL DE CRISTAL ----- */}
          <div className="sec-panel lg:col-span-7 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-10 relative overflow-hidden backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              {/* Inner Orb */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                {trustItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-center gap-5 py-6 border-b border-white/10 last:border-0">
                      <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                        <Icon size={24} className="text-blue-400" />
                      </div>
                      {/* Texto blanco grande, imposible no verlo */}
                      <h3 className="text-white font-medium text-xl">{item.title}</h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ----- COLUMNA DERECHA: DASHBOARD MOCKUP ----- */}
          <div className="lg:col-span-5 relative">
            <div className="sec-panel sticky top-8 bg-gradient-to-b from-[#0a0a0c] to-[#040405] border border-white/10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              
              {/* Inner Orb Azul (Para matar la vibra de IA, usamos colores de interfaz) */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />
              
              {/* Header estilo Ventana de macOS */}
              <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] relative z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Contenido del Dashboard */}
              <div className="p-8 relative z-10">
                
                <div className="mb-10">
                  <div className="text-[12px] font-medium text-white/50 uppercase tracking-widest mb-2">Network Status</div>
                  <div className="text-4xl font-display font-light text-white tracking-tight flex items-center gap-4">
                    Protected
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                    </div>
                  </div>
                </div>

                {/* Gráfico Abstracto de Tráfico (Usa los tonos azules de la web) */}
                <div className="h-24 w-full flex items-end gap-1.5 mb-10 opacity-70">
                  {[40, 70, 45, 90, 65, 30, 85, 100, 50, 75, 60, 80, 40].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-blue-500/30 to-blue-500/0 rounded-t-md relative" 
                      style={{ height: `${h}%` }}
                    >
                      <div className="absolute top-0 w-full h-[2px] bg-blue-400/60" />
                    </div>
                  ))}
                </div>

                {/* Etiquetas de Módulos (Cero IA, puro Dashboard Corporativo) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]">
                    <div className="text-[10px] font-mono text-blue-400 uppercase mb-1.5">Active</div>
                    <div className="text-sm font-medium text-white">AES-256 Auth</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]">
                    <div className="text-[10px] font-mono text-blue-400 uppercase mb-1.5">Secured</div>
                    <div className="text-sm font-medium text-white">API Gateway</div>
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