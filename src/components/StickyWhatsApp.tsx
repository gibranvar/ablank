'use client';

import { useState, useEffect } from 'react';

export function StickyWhatsApp() {
  const [isCookieVisible, setIsCookieVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleCookieVisibility = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIsCookieVisible(customEvent.detail);
    };

    window.addEventListener('cookieBannerVisibility', handleCookieVisibility);

    const timer = setTimeout(() => setIsVisible(true), 2000);

    return () => {
      window.removeEventListener('cookieBannerVisibility', handleCookieVisibility);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  const phoneNumber = "525576048470"; 
  const presetMessage = encodeURIComponent("Hola, me interesa agendar una llamada para escalar la infraestructura tecnológica de mi empresa.");
  const waLink = `https://wa.me/${phoneNumber}?text=${presetMessage}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`fixed right-4 md:right-6 lg:hidden z-50 flex items-center justify-center w-[54px] h-[54px] 
        group overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:scale-[1.02] active:scale-95 backdrop-blur-2xl
        ${isCookieVisible ? 'bottom-[110px]' : 'bottom-6 md:bottom-8'}`}
      style={{
        borderRadius: '14px',
        backgroundColor: 'rgba(10, 10, 10, 0.45)', /* Liquid Glass translúcido */
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: `
          0px 8px 30px rgba(0, 0, 0, 0.4), 
          inset -4px 3px 9px 0px rgba(1, 117, 255, 0.7), 
          inset 3px -2px 8px 0px rgba(255, 205, 125, 0.7)
        `
      }}
    >
      {/* Destello de luz que cruza (Shine) al igual que en el navbar */}
      <div 
        className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} 
      />
      
      {/* Icono de WhatsApp minimalista y premium en blanco para contrastar con el fondo oscuro y los reflejos de color */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="relative z-10 w-7 h-7 text-white transition-transform group-hover:scale-110 duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      >
        <path d="M12.031 21.492c-1.576 0-3.118-.415-4.475-1.19l-.32-.185-3.328.87.886-3.245-.205-.327a9.429 9.429 0 0 1-1.442-5.011c0-5.228 4.258-9.486 9.49-9.486 2.536 0 4.919.988 6.709 2.781a9.462 9.462 0 0 1 2.775 6.706c-.004 5.226-4.262 9.484-9.486 9.484h-.604zm-4.993-2.613c1.37.81 2.923 1.238 4.512 1.238h.6c4.464 0 8.1-3.636 8.104-8.1 0-2.167-.843-4.202-2.373-5.735a8.077 8.077 0 0 0-5.727-2.37c-4.466 0-8.104 3.637-8.104 8.1 0 1.543.435 3.033 1.259 4.35l.43.682-.525 1.921 1.97-.517.653.43a.478.478 0 0 0 .2.001zm8.384-5.328c-.244-.122-1.444-.712-1.667-.794-.223-.081-.384-.122-.547.123-.162.245-.629.794-.77.956-.143.163-.284.183-.529.06-.244-.122-1.03-.38-1.96-1.206-.723-.642-1.21-1.436-1.353-1.68-.143-.245-.015-.378.107-.5.109-.11.244-.286.366-.429.123-.143.163-.245.244-.408.082-.164.041-.307-.02-.43-.06-.122-.547-1.317-.75-1.805-.198-.475-.4-.411-.547-.418-.14-.007-.302-.008-.464-.008a.89.89 0 0 0-.645.306c-.223.245-.853.834-.853 2.035 0 1.201.874 2.361.996 2.525.123.164 1.72 2.625 4.167 3.681.583.253 1.037.404 1.393.517.585.186 1.118.16 1.538.097.468-.071 1.444-.59 1.646-1.161.203-.571.203-1.06.143-1.161-.06-.102-.222-.163-.466-.285z"/>
      </svg>
    </a>
  );
}
