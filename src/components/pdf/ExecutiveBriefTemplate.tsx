import React, { forwardRef } from 'react';

interface BriefData {
  nombre: string;
  fugaMensual: number;
  ticket: number;
  cotizaciones: number;
  dias: number;
  email: string;
  puesto: string;
}

interface Props {
  data: BriefData;
}

export function formatName(name: string): string {
  if (!name) return 'Ejecutivo Corporativo';
  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatRole(role: string): string {
  const trimmed = (role || '').trim();
  if (!trimmed) return 'Dirección Corporativa';
  // Si son 3 o menos letras (ej: ceo, cfo, coo, cto, vp)
  if (trimmed.length <= 3) {
    return trimmed.toUpperCase();
  }
  // Title case
  return trimmed
    .toLowerCase()
    .split(/\s+/)
    .map(word => {
      if (['ceo', 'cfo', 'cto', 'coo', 'cmo', 'cio', 'cpo', 'vp', 'ti', 'it', 'hr'].includes(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(val);

export const ExecutiveBriefTemplate = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const currentHours = data.dias * 24;
  const maxHoursBase = Math.max(currentHours * 1.2, 72);
  const barWidth = Math.min(Math.max((currentHours / maxHoursBase) * 100, 10), 100);

  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];

  return (
    <div 
      ref={ref} 
      className="bg-white text-zinc-900 relative flex flex-col justify-between box-border selection:bg-none"
      style={{ 
        width: '800px', 
        height: '1131px', 
        padding: '48px 52px',
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflow: 'hidden'
      }}
    >
      {/* TOP SECTION: Header & Content */}
      <div>
        {/* Header (Clean, Institutional, No tags) */}
        <div className="flex justify-between items-end border-b border-zinc-100 pb-5 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
              Λ BLΛNK
            </h1>
            <p className="text-xs font-semibold text-zinc-400 tracking-wider uppercase mt-1">
              Executive Briefing // Diagnóstico Operativo
            </p>
          </div>
          <div className="text-right text-xs">
            <p className="font-bold text-zinc-900 text-[13px]">
              <span className="text-zinc-500 font-normal">Para:</span> {formatName(data.nombre)}
            </p>
            <p className="font-semibold text-zinc-800 text-xs mt-0.5">
              <span className="text-zinc-500 font-normal">Rol:</span> {formatRole(data.puesto)}
            </p>
            <p className="text-zinc-500 mt-1 font-mono text-[11px]">
              {data.email.toLowerCase()}
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">
              {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* 1. Resumen Ejecutivo */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-zinc-900 tracking-tight uppercase mb-2">
            Resumen Ejecutivo
          </h2>
          <p className="text-[13px] text-zinc-600 leading-relaxed font-normal max-w-3xl">
            Con base en los parámetros operativos declarados, hemos realizado un diagnóstico preliminar de su ciclo de ventas B2B actual. Hemos identificado cuellos de botella críticos en su proceso de cotización que están generando una hemorragia sistemática de capital. La lentitud operativa está permitiendo que sus competidores cierren tratos con sus prospectos calificados.
          </p>
        </div>

        {/* 2. Parámetros Operativos & Benchmarking (Soft Cards, rounded-2xl, no harsh borders) */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Card: Volumen Operativo */}
          <div className="bg-[#F8FAFC] p-5 rounded-2xl border-none">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
                Volumen Operativo
              </span>
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Métricas Base
              </span>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-zinc-200/60 pb-2">
                <span className="text-zinc-500">Cotizaciones mensuales:</span>
                <span className="text-zinc-900 font-bold font-mono">{data.cotizaciones}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-200/60 pb-2">
                <span className="text-zinc-500">Ticket promedio:</span>
                <span className="text-zinc-900 font-bold font-mono">{formatCurrency(data.ticket)}</span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-zinc-500">Ciclo de respuesta:</span>
                <span className="text-[#DC2626] font-bold font-mono">{data.dias} días</span>
              </div>
            </div>
          </div>

          {/* Card: Benchmarking */}
          <div className="bg-[#F8FAFC] p-5 rounded-2xl border-none">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
                Benchmarking de Velocidad
              </span>
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Brecha de Tiempo
              </span>
            </div>

            <div className="space-y-4 pt-1 text-xs">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-zinc-500">Operación Actual:</span>
                  <span className="text-[#DC2626] font-bold font-mono">{currentHours} horas</span>
                </div>
                <div className="w-full h-2 bg-zinc-200/70 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#DC2626] rounded-full" 
                    style={{ width: `${barWidth}%` }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-zinc-500">Estándar A BLANK:</span>
                  <span className="text-zinc-900 font-bold font-mono">&lt; 45 segundos</span>
                </div>
                <div className="w-full h-2 bg-zinc-200/70 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-900 w-3 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Impacto Financiero & Gráfica (Soft Card, High Precision Red) */}
        <div className="bg-[#F8FAFC] p-6 rounded-2xl border-none mb-6">
          <div className="flex justify-between items-end border-b border-zinc-200/70 pb-4 mb-4">
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                Fuga Estimada de Capital
              </span>
              <div 
                className="text-4xl font-extrabold tracking-tight text-[#DC2626]"
                style={{ textRendering: 'geometricPrecision' }}
              >
                {formatCurrency(data.fugaMensual)} <span className="text-xl font-bold">MXN</span>
              </div>
              <p className="text-xs text-zinc-500 mt-1 font-medium">
                Pérdida mensual proyectada por enfriamiento y fuga de prospectos
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Costo Anual de Inacción
              </span>
              <span className="text-base font-extrabold text-zinc-900 tracking-tight font-mono">
                {formatCurrency(data.fugaMensual * 12)} MXN
              </span>
            </div>
          </div>

          {/* Gráfica con Oxígeno y Padding Inferior */}
          <div className="bg-white p-5 rounded-xl border border-zinc-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wide">
                Proyección de Hemorragia Acumulada (12 Meses)
              </span>
              <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider">
                Riesgo Progresivo
              </span>
            </div>

            {/* Canvas SVG con holgura para que la línea no toque el borde */}
            <div className="relative w-full h-[125px]">
              <svg 
                className="w-full h-full overflow-visible" 
                viewBox="0 0 1000 170" 
                preserveAspectRatio="none"
              >
                {/* Eje base horizontal sutil */}
                <line x1="0" y1="150" x2="1000" y2="150" stroke="#E2E8F0" strokeWidth="1" />

                {/* Línea roja pura de 2px respirando holgadamente */}
                <path 
                  d="M 15,142 C 280,138 600,85 985,15" 
                  fill="none" 
                  stroke="#DC2626" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />

                {/* Nodo de llegada en el mes 12 */}
                <circle cx="985" cy="15" r="4" fill="#DC2626" />
              </svg>

              {/* Eje X (Meses) con 20px de separación clara del gráfico */}
              <div className="flex justify-between pt-3 px-1 text-[10px] font-semibold text-zinc-400">
                {months.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Arquitectura de Infraestructura (4 Cajas Matemáticamente Idénticas) */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-zinc-900 tracking-tight uppercase mb-3">
            Arquitectura de Solución (Flujo Lead-to-Cash)
          </h2>

          {/* Pipeline con cajas simétricas: flex-1 y h-[72px] forzados */}
          <div className="flex items-center justify-between gap-2 w-full">
            {[
              { title: "Entrada de Lead", desc: "WhatsApp / Inbound", primary: false },
              { title: "Orquestación A BLANK", desc: "Motor Lógico", primary: true },
              { title: "Sync ERP / CRM", desc: "Inventario & Pricing", primary: false },
              { title: "Disparo PDF", desc: "Cierre < 45 seg", primary: false }
            ].map((node, idx) => (
              <React.Fragment key={idx}>
                <div 
                  className={`flex-1 h-[72px] rounded-xl flex flex-col justify-center items-center text-center px-2 transition-all ${
                    node.primary 
                      ? 'bg-zinc-900 text-white shadow-sm' 
                      : 'bg-[#F8FAFC] text-zinc-900'
                  }`}
                >
                  <p className={`text-xs font-bold tracking-tight ${node.primary ? 'text-white' : 'text-zinc-900'}`}>
                    {node.title}
                  </p>
                  <p className={`text-[10px] font-medium mt-0.5 ${node.primary ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {node.desc}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="text-zinc-300 font-bold text-xs select-none">
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Siguientes Pasos (Sin SLA) & Footer */}
      <div className="border-t border-zinc-100 pt-4">
        <h2 className="text-xs font-bold text-zinc-900 tracking-tight uppercase mb-2.5">
          Siguientes Pasos
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#F8FAFC] p-3 rounded-xl">
            <span className="text-xs font-bold text-zinc-900 block mb-0.5">01. Auditoría</span>
            <p className="text-[11px] text-zinc-500 leading-snug">Revisión de arquitectura y viabilidad técnica de APIs.</p>
          </div>
          <div className="bg-[#F8FAFC] p-3 rounded-xl">
            <span className="text-xs font-bold text-zinc-900 block mb-0.5">02. Blueprint</span>
            <p className="text-[11px] text-zinc-500 leading-snug">Diseño de flujo Lead-to-Cash y conectores de base de datos.</p>
          </div>
          <div className="bg-[#F8FAFC] p-3 rounded-xl">
            <span className="text-xs font-bold text-zinc-900 block mb-0.5">03. Despliegue</span>
            <p className="text-[11px] text-zinc-500 leading-snug">Despliegue operativo y estabilización de conectores.</p>
          </div>
        </div>

        {/* Footer Institucional */}
        <div className="flex justify-between items-center text-[9px] text-zinc-400 font-medium pt-2 border-t border-zinc-100">
          <span>© A BLANK INC. — Sistemas de Infraestructura Corporativa</span>
          <span>Confidencial // Diagnóstico Preliminar</span>
        </div>
      </div>
    </div>
  );
});

ExecutiveBriefTemplate.displayName = 'ExecutiveBriefTemplate';
