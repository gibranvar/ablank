import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, AlertTriangle, Loader2 } from 'lucide-react';

export function ContactForm({
  initialTab = 'corporativo', hideTabs = false }: { initialTab?: 'corporativo' | 'portal' | 'enterprise' | 'clientes', hideTabs?: boolean }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'corporativo' | 'clientes'>(initialTab === 'portal' || initialTab === 'clientes' ? 'clientes' : 'corporativo');
  
  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    puesto: '',
    correo: '',
    mensaje: '',
    supportType: t('contactForm.opt1')
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación Custom (noValidate)
    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.mensaje.trim()) {
      setError(t('contactForm.errEmpty'));
      return;
    }

    if (activeTab === 'corporativo' && !formData.puesto.trim()) {
      setError(t('contactForm.errPuesto'));
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      setError(t('contactForm.errEmail'));
      return;
    }

    // Filtro B2B (Hard Block) solo para Soluciones Corporativas
    if (activeTab === 'corporativo') {
      const lowerCorreo = formData.correo.toLowerCase();
      if (
        lowerCorreo.endsWith('@gmail.com') ||
        lowerCorreo.endsWith('@hotmail.com') ||
        lowerCorreo.endsWith('@yahoo.com') ||
        lowerCorreo.endsWith('@outlook.com')
      ) {
        setError(t('contactForm.errB2B'));
        return;
      }
    }

    setError('');
    setIsSubmitting(true);

    try {
      // 1. Enviar correo a hello@ablank.mx vía endpoint serverless
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          correo: formData.correo.trim(),
          puesto: formData.puesto.trim(),
          mensaje: formData.mensaje.trim(),
          supportType: formData.supportType,
          tipo: activeTab
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Error al enviar');
      }

      setIsSubmitted(true);
      setIsSubmitting(false);

    } catch (err: any) {
      console.error('[Contact Submit Error]:', err);
      setError(t('contactForm.errSend'));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      {!hideTabs && (
      <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
        <button 
          type="button"
          onClick={() => { setActiveTab('corporativo'); setError(''); setIsSubmitted(false); }}
          className={`text-sm font-medium transition-colors ${activeTab === 'corporativo' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
        >{t('contactForm.tabSales')}</button>
        <button 
          type="button"
          onClick={() => { setActiveTab('clientes'); setError(''); setIsSubmitted(false); }}
          className={`text-sm font-medium transition-colors ${activeTab === 'clientes' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
        >{t('contactForm.tabSupport')}</button>
      </div>
      )}

      {isSubmitted ? (
        <div className="py-6 text-center flex flex-col items-center justify-center space-y-2 animate-in fade-in duration-300">
          <h3 className="text-base md:text-lg font-medium text-white tracking-tight">
            {activeTab === 'corporativo' ? t('contactForm.successTitleCorp') : t('contactForm.successTitleSupport')}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed font-light max-w-md mx-auto">
            {activeTab === 'corporativo' ? t('contactForm.successDescCorp') : t('contactForm.successDescSupport')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5 flex flex-col">
          
          {/* Nombre (Ambos) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60">{t('contact.name')}</label>
            <input name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              type="text" 
              placeholder={t('contactForm.phName')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder-white/20"
            />
          </div>

          {/* Campos Específicos Enterprise */}
          {activeTab === 'corporativo' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60">{t('contact.email')}</label>
                  <input name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    type="email" 
                    placeholder={t('contactForm.phCorpEmail')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder-white/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60">{t('contactForm.labelPuesto')}</label>
                  <input name="puesto"
                    value={formData.puesto}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder={t('contactForm.phRole')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder-white/20"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/60">{t('contactForm.labelReq')}</label>
                <textarea name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={t('contactForm.phReq')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors resize-none placeholder-white/20"
                ></textarea>
              </div>
            </>
          )}

          {/* Campos Específicos Portal */}
          {activeTab === 'clientes' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-white/60">{t('contactForm.labelEmail')}</label>
                  <input name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    type="email" 
                    placeholder={t('contactForm.phEmail')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder-white/20"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-white/60">{t('contactForm.labelHelp')}</label>
                  <div className="relative">
                    <select
                      name="supportType"
                      value={formData.supportType}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                    >
                      <option value={t('contactForm.opt1')} className="bg-[#0a0a0c] text-white">{t('contactForm.opt1')}</option>
                      <option value={t('contactForm.opt2')} className="bg-[#0a0a0c] text-white">{t('contactForm.opt2')}</option>
                      <option value={t('contactForm.opt3')} className="bg-[#0a0a0c] text-white">{t('contactForm.opt3')}</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/40">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/60">{t('contactForm.labelDetails')}</label>
                <textarea name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={t('contactForm.phDetails')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors resize-none placeholder-white/20"
                ></textarea>
              </div>
            </>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm mt-2 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <div className="pt-4 mt-auto">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-95 w-full sm:w-auto overflow-hidden bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin text-white" />
                  <span className="relative z-10">{t('contactForm.submitting')}</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">{activeTab === 'corporativo' ? t('contactForm.btnCorp') : t('contactForm.btnPortal')}</span>
                  <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
