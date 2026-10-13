import { Link } from 'react-router-dom';
'use client';
import { Button } from '@/components/ui/Button';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe } from 'lucide-react';
import { pushToDataLayer } from '../utils/analytics';
import { useTranslation } from 'react-i18next';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Footer() {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    pushToDataLayer('language_changed', { language: newLang });
  };

  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ESCRITORIO
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: footerRef.current, start: 'top 80%' }
      });
      
      tl.fromTo('h2 > span', 
        { opacity: 0, filter: 'blur(16px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, stagger: 0.15, ease: 'power2.out' }
      )
      .fromTo('.footer-sub',
        { opacity: 0, filter: 'blur(16px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, ease: 'power2.out' },
        '-=1'
      )
      .fromTo('.footer-cta',
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.5)' },
        '-=0.8'
      )
      .fromTo('.footer-giant-bg',
        { opacity: 0, filter: 'blur(40px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power2.inOut' },
        '-=1.5'
      );
    });

    // MÓVIL
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' }
      });
      
      tl.fromTo('h2 > span', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }
      )
      .fromTo('.footer-sub',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo('.footer-cta',
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.2)' },
        '-=0.8'
      )
      .fromTo('.footer-giant-bg',
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.inOut' },
        '-=1'
      );
    });

    return () => mm.revert();
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative pt-16 md:pt-32 pb-8 overflow-hidden font-sans">
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mb-16 flex flex-col items-center">
        
        <h2>
          <span className="block">{t('footer.title1')}</span>
          <span className="block">{t('footer.title2')}</span>
        </h2>
        
        <p className="footer-sub text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 text-balance">
          {t('footer.subtitle')}
        </p>
        
        <Button href="/contacto" className="footer-cta px-6 py-3 md:px-10 md:py-4 text-sm md:text-lg">
          {t('footer.cta')}
        </Button>
      </div>

      <div className="footer-giant-bg relative w-full py-16 md:py-32 flex items-center justify-center overflow-hidden mb-16 md:mb-20 pointer-events-none">
        
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img 
            src="https://framerusercontent.com/images/3ez5Goty6KdEzujpWDVyu8Um6Ns.webp" 
            alt="Abstract background"
            className="w-full h-full object-cover"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)'
            }}
          />
        </div>
        
        <div className="relative z-20 flex items-center justify-center w-full min-w-max gap-8 md:gap-16">
          <span className="text-[28vw] md:text-[22vw] font-display font-bold text-white/10 uppercase tracking-tighter leading-none select-none">
            A BLANK
          </span>
          <span className="text-[28vw] md:text-[22vw] font-display font-bold text-white uppercase tracking-tighter leading-none select-none drop-shadow-none md:drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            A BLANK
          </span>
          <span className="text-[28vw] md:text-[22vw] font-display font-bold text-white/10 uppercase tracking-tighter leading-none select-none">
            A BLANK
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 md:gap-16 mb-16 md:mb-20">
        
        <div className="flex flex-col col-span-1">
          <h4 className="text-white font-medium mb-4 md:mb-6">{t('footer.navTitle')}</h4>
          <nav className="flex flex-col">
            <FooterLink href="/#fuga">{t('footer.nav1')}</FooterLink>
            <FooterLink href="/#como-funciona">{t('footer.nav2')}</FooterLink>
            <FooterLink href="/#simulador">{t('footer.nav3')}</FooterLink>
            <FooterLink href="/#faq">{t('footer.nav4')}</FooterLink>
          </nav>
        </div>

        <div className="flex flex-col col-span-1">
          <h4 className="text-white font-medium mb-4 md:mb-6">{t('footer.connectTitle')}</h4>
          <nav className="flex flex-col">
            <FooterLink href="/contacto">{t('footer.navContact')}</FooterLink>
            <FooterLink href="mailto:hello@ablank.mx">hello@ablank.mx</FooterLink>
            <FooterLink href="mailto:support@ablank.mx">support@ablank.mx</FooterLink>
          </nav>
        </div>

        <div className="flex flex-col col-span-2 md:col-span-1">
          <h4 className="text-white font-medium mb-4 md:mb-6">{t('footer.hqTitle')}</h4>
          <div className="text-white/50 text-[15px] leading-relaxed py-2">
            {t('footer.address1')}<br />
            {t('footer.address2')}<br />
            {t('footer.address3')}
          </div>
        </div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="w-full h-px bg-[#7da4ff]/10 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white/50 text-[14px] md:text-[15px]">
            {t('footer.rights')}
          </p>
          <button 
            onClick={toggleLanguage}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-white/50 hover:text-white transition-colors"
          >
            <Globe size={16} />
            <span className="text-sm font-medium">{i18n.language.startsWith('es') ? 'English' : 'Español'}</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-[14px] md:text-[15px]">{t('footer.design')}</span>
          </div>
        </div>
      </div>
      
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
    return (
      <a href={href} className="group flex items-center justify-start md:justify-between py-2 transition-colors">
        <span className="text-white/50 text-[15px] group-hover:text-white transition-colors">
          {children}
        </span>
      </a>
    );
  }
  return (
    <Link to={href} className="group flex items-center justify-start md:justify-between py-2 transition-colors">
      <span className="text-white/50 text-[15px] group-hover:text-white transition-colors">
        {children}
      </span>
    </Link>
  );
}

