import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/hooks/useGsap';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from('.cta-line', {
        yPercent: 120,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
      })
      .from('.cta-sub', {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from('.cta-btn', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.4')
      .from('.cta-orb', {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
      }, '-=1.2')
      .from('.cta-orb-ring', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      }, '-=1');

      // Continuous orb rotation
      gsap.to('.cta-orb', {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });

      // Background gradient shift
      gsap.fromTo('.cta-bg-gradient',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="contacto" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Background atmosphere */}
      <div className="cta-bg-gradient absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, var(--accent-glow) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 grid-pattern opacity-15" />

      {/* Central orb visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <div className="cta-orb relative w-64 h-64 md:w-96 md:h-96">
          <div className="absolute inset-0 rounded-full border border-accent/20" />
          <div className="cta-orb-ring absolute inset-[-30px] rounded-full border border-accent/10" />
          <div className="cta-orb-ring absolute inset-[-60px] rounded-full border border-accent/5" />
          <div className="cta-orb-ring absolute inset-[-90px] rounded-full border border-accent/5" />
          <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }} />
          {/* Orbiting nodes */}
          {[0, 120, 240].map((angle, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-accent"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translateY(-${128}px)`,
                transformOrigin: '0 0',
                boxShadow: '0 0 12px var(--accent)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="flex justify-center mb-8">
          <Logo size={32} />
        </div>

        <h2 className="font-display font-bold text-balance" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          <span className="block overflow-hidden"><span className="cta-line block">Tu negocio puede</span></span>
          <span className="block overflow-hidden"><span className="cta-line block">funcionar como</span></span>
          <span className="block overflow-hidden"><span className="cta-line block gradient-text">un sistema.</span></span>
        </h2>

        <p className="cta-sub mt-8 text-fg-secondary text-balance max-w-xl mx-auto" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.6 }}>
          Digitalizamos, automatizamos y conectamos. Todo en una plataforma.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contacto" className="cta-btn btn-primary text-base px-8 py-4">
            Construir mi sistema
            <ArrowRight size={16} />
          </a>
          <a href="#simulador" className="cta-btn btn-secondary text-base px-8 py-4">
            Probar el simulador
          </a>
        </div>

        <p className="cta-btn mt-8 text-xs text-fg-muted">
          Conversación inicial sin costo · Propuesta en 48 horas
        </p>
      </div>
    </section>
  );
}
