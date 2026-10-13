import { insertLead } from '@/lib/supabase';
import { generateExecutiveBriefPdfFromElement } from '@/lib/pdfGenerator';
import { ExecutiveBriefTemplate } from '@/components/pdf/ExecutiveBriefTemplate';
import { getBriefEmailHtml } from '@/templates/emailTemplate';
'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileText, DollarSign, Clock, ArrowRight, AlertTriangle
} from 'lucide-react';
import { pushToDataLayer } from '../utils/analytics';
import { useTranslation } from 'react-i18next';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function SimulatorVentas({ id }: { id?: string }) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const [cotizaciones, setCotizaciones] = useState<number>(50);
  const [ticket, setTicket] = useState<number>(20000);
  const [dias, setDias] = useState<number>(3);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [puesto, setPuesto] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<{
    nombre?: string;
    email?: string;
    puesto?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const rootRef = useRef<HTMLElement>(null);

  // --- MOTOR DE CÁLCULO (FUGA DE CAPITAL) ---
  const fugaMensual = cotizaciones * ticket * (dias * 0.10);

  const isEn = i18n.language?.startsWith('en');
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat(isEn ? 'en-US' : 'es-MX', { 
      style: 'currency', 
      currency: isEn ? 'USD' : 'MXN', 
      maximumFractionDigits: 0 
    }).format(val);

  const handleOpenModal = () => {
    setFieldErrors({});
    pushToDataLayer('click_executive_brief', {
      location: 'simulator_ventas',
      cotizaciones,
      ticket,
      dias,
      fugaMensual
    });
    setShowModal(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { nombre?: string; email?: string; puesto?: string; general?: string } = {};

    // 1. Validación de Nombre
    if (!nombre.trim()) {
      newErrors.nombre = t('simulatorVentas.errName');
    }

    // 2. Validación de Correo
    const trimmedEmail = email.trim();
    const lowerEmail = trimmedEmail.toLowerCase();
    if (!trimmedEmail) {
      newErrors.email = t('simulatorVentas.errEmail');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = t('simulatorVentas.errEmailValid');
    } else if (
      lowerEmail.endsWith('@gmail.com') ||
      lowerEmail.endsWith('@hotmail.com') ||
      lowerEmail.endsWith('@yahoo.com') ||
      lowerEmail.endsWith('@outlook.com')
    ) {
      newErrors.email = t('simulatorVentas.errEmailB2B');
    }

    // 3. Validación de Puesto
    if (!puesto.trim()) {
      newErrors.puesto = t('simulatorVentas.errPuesto');
    }

    // Si hay errores de campos, no continuar y mostrarlos debajo de cada input
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    
    // Disparar Webhook hacia n8n (Background)
    const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.tudominio.com/webhook/lead-to-cash-brief';
    
    try {
      // 1. Guardar en Base de Datos
      await insertLead({
        nombre: nombre.trim(),
        email: lowerEmail,
        puesto: puesto.trim(),
        fuga_mensual: fugaMensual.toString(),
        ticket: ticket.toString(),
        cotizaciones: cotizaciones.toString(),
        dias: dias.toString(),
        status: 'CALCULADORA_BRIEF'
      });

      // 2. Generar PDF
      if (!pdfRef.current) throw new Error("PDF Template not mounted");
      const doc = await generateExecutiveBriefPdfFromElement(pdfRef.current);
      const pdfBase64 = doc.output('datauristring');
      
      // 3. Generar HTML del correo
      const htmlContent = getBriefEmailHtml(fugaMensual);

      // 4. Enviar correo vía Resend (Serverless)
      fetch('/api/send-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_email: lowerEmail,
          html_content: htmlContent,
          pdf_base64: pdfBase64
        })
      }).catch(err => console.error("Error enviando email vía Resend:", err));

      // Mostrar estado de éxito en lugar de redirección
      setIsSubmitted(true);
      setIsSubmitting(false);

    } catch (err) {
      console.error("[Lead Capture Error]:", err);
      setFieldErrors({
        general: t('simulatorVentas.errGeneral')
      });
      setIsSubmitting(false);
    }

    console.log(`[n8n Webhook] Disparado en background para ${email}`);
    
  };

  // --- ANIMACIONES GSAP ---
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
    <section id={id} ref={rootRef} className="relative w-full py-16 md:py-32 overflow-hidden font-sans">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <div className="sim-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/80 md:bg-white/5 mb-6 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] md:backdrop-blur-md">
            <span className="text-[10px] font-medium text-white/80 uppercase tracking-[0.08em]">{t('simulatorVentas.badge')}</span>
          </div>
          
          <h2>
            <span>{t('simulatorVentas.title1')}</span>
            <span>{t('simulatorVentas.title2')}</span>
          </h2>

          <p className="sim-sub mt-6 max-w-2xl text-balance text-base md:text-lg text-white/50 font-light mx-auto leading-relaxed">
            {t('simulatorVentas.subtitle')}
          </p>
        </div>

        {/* LAYOUT DIVIDIDO */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* ----- COLUMNA IZQUIERDA: FORMULARIO ----- */}
          <div className="sim-panel lg:col-span-7 space-y-6">
            <div className="bg-[#06070a] md:bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 relative overflow-hidden md:backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              <div className="hidden md:block absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 blur-[50px] md:blur-[100px] rounded-full pointer-events-none" style={{ transform: 'translateZ(0)' }} />
              
              <div className="space-y-10 relative z-10">
                
                {/* 1. Cotizaciones al mes */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <FileText size={16} className="text-white/50" />
                    {t('simulatorVentas.q1')}
                  </label>
                  <div className="flex flex-col gap-4">
                    <input 
                      type="range" 
                      min="10" 
                      max="500" 
                      value={cotizaciones} 
                      onChange={e => setCotizaciones(Number(e.target.value))} 
                      className="w-full accent-blue-500"
                    />
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <input 
                        type="number" 
                        min="10" 
                        max="500" 
                        value={cotizaciones} 
                        onChange={e => setCotizaciones(Number(e.target.value))} 
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white w-full focus:outline-none focus:border-white/40 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Ticket Promedio */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <DollarSign size={16} className="text-white/50" />
                    {t('simulatorVentas.q2')}
                  </label>
                  <div className="flex flex-col gap-4">
                    <input 
                      type="range" 
                      min="10000" 
                      max="500000" 
                      step="5000"
                      value={ticket} 
                      onChange={e => setTicket(Number(e.target.value))} 
                      className="w-full accent-blue-500"
                    />
                    <div className="flex items-center gap-2 max-w-[200px] relative">
                      <span className="absolute left-4 text-white/50">$</span>
                      <input 
                        type="number" 
                        min="10000" 
                        max="500000" 
                        value={ticket} 
                        onChange={e => setTicket(Number(e.target.value))} 
                        className="bg-black/50 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white w-full focus:outline-none focus:border-white/40 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Días de retraso */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-white/50" />
                    {t('simulatorVentas.q3')}
                  </label>
                  <div className="flex flex-col gap-4">
                    <input 
                      type="range" 
                      min="1" 
                      max="15" 
                      value={dias} 
                      onChange={e => setDias(Number(e.target.value))} 
                      className="w-full accent-blue-500"
                    />
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <input 
                        type="number" 
                        min="1" 
                        max="15" 
                        value={dias} 
                        onChange={e => setDias(Number(e.target.value))} 
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white w-full focus:outline-none focus:border-white/40 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                      />
                      <span className="text-white/50 text-sm">{t('simulatorVentas.dias')}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ----- COLUMNA DERECHA: DASHBOARD DE IMPACTO ----- */}
          <div className="lg:col-span-5 relative">
            <div className="sim-panel sticky top-8 bg-gradient-to-b from-[#0a0a0c] to-[#040405] border border-white/10 rounded-[32px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              
              <div className="hidden md:block absolute -top-32 -right-32 w-64 h-64 bg-red-500/10 blur-[45px] md:blur-[90px] rounded-full pointer-events-none" style={{ transform: 'translateZ(0)' }} />
              
              <h3 className="text-xl font-display font-medium text-white mb-8 relative z-10">{t('simulatorVentas.impact')}</h3>

              {/* Fuga de capital */}
              <div className="mb-8 relative z-10">
                <p className="text-[10px] text-white/50 uppercase tracking-[0.08em] font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-red-400"/> {t('simulatorVentas.resSubtitle')}
                </p>
                <div className="text-4xl lg:text-5xl font-display font-semibold text-red-400 tracking-tight drop-shadow-[0_0_15px_rgba(248,113,113,0.3)]">
                  {formatCurrency(fugaMensual)}
                </div>
                <p className="text-white/60 text-sm mt-4">
                  {t('simulatorVentas.resFormTitle')}
                </p>
                <p className="text-[14px] text-white/70 mt-6 leading-relaxed">
                  {t('simulatorVentas.desc1')}<span className="text-white font-medium">{formatCurrency(fugaMensual)}</span>{t('simulatorVentas.desc2')}<span className="text-white font-medium">{dias * 24}{t('simulatorVentas.desc3')}</span>.
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

              <button
                onClick={handleOpenModal}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 w-full"
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
                <span className="relative z-10">{t('simulatorVentas.cta')}</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Modal / Muro de Peaje */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-[32px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10">
            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-semibold text-white mb-3">{t('simulatorVentas.submittedTitle')}</h3>
                <p className="text-white/60 text-[15px] mb-8 leading-relaxed">
                  {t('simulatorVentas.submittedDesc')}
                </p>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="w-full bg-white/5 border border-white/10 text-white font-semibold py-3.5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  {t('simulatorVentas.submittedBtn')}
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-display font-semibold text-white mb-2">{t('simulatorVentas.modalTitle')}</h3>
                <p className="text-white/60 text-sm mb-6">{t('simulatorVentas.modalSub')}</p>
                
                <form onSubmit={handleModalSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">{t('simulatorVentas.labelName')}</label>
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                    if (fieldErrors.nombre) setFieldErrors(prev => ({ ...prev, nombre: undefined }));
                  }}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                    fieldErrors.nombre ? 'border-red-500/60 focus:border-red-400' : 'border-white/10 focus:border-white/40'
                  }`}
                  placeholder={t('simulatorVentas.phName')}
                />
                {fieldErrors.nombre && (
                  <p className="text-red-400 text-xs mt-1.5 pl-1">{fieldErrors.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">{t('simulatorVentas.labelEmail')}</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                    fieldErrors.email ? 'border-red-500/60 focus:border-red-400' : 'border-white/10 focus:border-white/40'
                  }`}
                  placeholder={t('simulatorVentas.phEmail')}
                />
                {fieldErrors.email && (
                  <p className="text-red-400 text-xs mt-1.5 pl-1">{fieldErrors.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">{t('simulatorVentas.labelPuesto')}</label>
                <input 
                  type="text" 
                  value={puesto}
                  onChange={(e) => {
                    setPuesto(e.target.value);
                    if (fieldErrors.puesto) setFieldErrors(prev => ({ ...prev, puesto: undefined }));
                  }}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                    fieldErrors.puesto ? 'border-red-500/60 focus:border-red-400' : 'border-white/10 focus:border-white/40'
                  }`}
                  placeholder={t('simulatorVentas.phPuesto')}
                />
                {fieldErrors.puesto && (
                  <p className="text-red-400 text-xs mt-1.5 pl-1">{fieldErrors.puesto}</p>
                )}
              </div>

              {fieldErrors.general && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3.5 py-2.5 rounded-xl text-center leading-relaxed">
                  {fieldErrors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-white text-black font-semibold py-3 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? t('simulatorVentas.btnSubmitting') : t('simulatorVentas.btnSubmit')}
              </button>
            </form>
            </>
            )}
          </div>
        </div>
      )}
      {/* Hidden PDF Template */}
      <div className="fixed top-0 -left-[9999px] -z-50 pointer-events-none">
        <ExecutiveBriefTemplate 
          ref={pdfRef} 
          data={{ nombre, fugaMensual, ticket, cotizaciones, dias, email, puesto }} 
        />
      </div>

    </section>
  );
}
