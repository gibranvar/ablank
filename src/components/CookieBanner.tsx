'use client';

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        window.dispatchEvent(new CustomEvent('cookieBannerVisibility', { detail: true }));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    window.dispatchEvent(new CustomEvent('cookieBannerVisibility', { detail: false }));
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    window.dispatchEvent(new CustomEvent('cookieBannerVisibility', { detail: false }));
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes slide-up-pill {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-cookie-pill {
          animation: slide-up-pill 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      
      {/* 
        El contenedor abarca el ancho completo pero usa Flex para centrar la píldora.
        pointer-events-none asegura que no bloquee clics fuera del banner.
      */}
      <div className="fixed bottom-6 md:bottom-10 left-0 w-full z-[100] px-4 flex justify-center pointer-events-none">
        
        {/* pointer-events-auto reactiva los clics solo dentro de la píldora */}
        <div className="pointer-events-auto w-full md:w-auto animate-cookie-pill">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 p-2 md:pl-6 bg-[#06070a]/60 backdrop-blur-2xl border border-white/10 rounded-[24px] md:rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]">
            
            <div className="flex items-center gap-3 w-full md:w-auto px-4 md:px-0 pt-2 md:pt-0">
             
              <p className="text-white/70 text-[11px] sm:text-xs font-medium tracking-wide leading-relaxed pr-2">
  <span className="text-white font-bold">Usamos cookies.</span> Las utilizamos para optimizar tu experiencia, personalizar contenido y analizar nuestro tráfico. Al aceptar, confirmas nuestra política.
</p>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button 
                onClick={handleDecline}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-full bg-transparent text-white/50 text-xs font-semibold hover:bg-white/5 hover:text-white transition-colors"
              >
                Rechazar
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold hover:scale-105 active:scale-95 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Aceptar
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}