import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/hooks/useGsap';
import { Search, PenTool, Hammer, Plug, Gauge } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Understand',
    desc: 'Inmersión total en tu negocio. Mapeamos procesos, identificamos cuellos de botella y definimos qué se puede sistematizar.',
    items: ['Diagnóstico operativo', 'Mapeo de procesos', 'Identificación de fricciones'],
  },
  {
    num: '02',
    icon: PenTool,
    title: 'Architect',
    desc: 'Diseñamos la arquitectura del sistema. Qué módulos se conectan, cómo fluyen los datos, qué se automatiza y qué requiere humano.',
    items: ['Arquitectura del sistema', 'Data flow design', 'Stack tecnológico'],
  },
  {
    num: '03',
    icon: Hammer,
    title: 'Build',
    desc: 'Construimos cada componente del sistema. Website, CRM, automation, AI, integraciones — todo funcionando individualmente.',
    items: ['Desarrollo modular', 'Iteraciones rápidas', 'Testing continuo'],
  },
  {
    num: '04',
    icon: Plug,
    title: 'Connect',
    desc: 'Conectamos todos los módulos. Los datos empiezan a fluir entre sistemas, las automatizaciones se activan, el sistema cobra vida.',
    items: ['Integración de módulos', 'Sync bidireccional', 'Activación de workflows'],
  },
  {
    num: '05',
    icon: Gauge,
    title: 'Optimize',
    desc: 'Monitoreamos, medimos y mejoramos. El sistema evoluciona con el negocio — nuevas integraciones, nuevas automatizaciones.',
    items: ['Monitoreo 24/7', 'Optimización continua', 'Escalado incremental'],
  },
];

export function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pr-line', {
        yPercent: 120,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.pr-headline', start: 'top 80%' },
      });

      // Animate each step
      gsap.utils.toArray<HTMLElement>('.pr-step').forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          },
        });

        // Progress line
        if (i < steps.length - 1) {
          const line = step.querySelector('.pr-progress-line');
          if (line) {
            gsap.fromTo(line,
              { scaleY: 0, transformOrigin: 'top' },
              {
                scaleY: 1,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: step,
                  start: 'top 70%',
                  end: 'bottom 40%',
                  scrub: 0.5,
                },
              }
            );
          }
        }

        // Number counter
        gsap.from(step.querySelectorAll('.pr-num'), {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: step, start: 'top 75%' },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="proceso" className="relative py-32 md:py-48" style={{ background: 'var(--bg-base)' }}>
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="relative z-10 section-padding max-w-5xl mx-auto">
        {/* Headline */}
        <div className="pr-headline mb-24 text-center">
          <span className="text-xs font-medium text-accent tracking-widest uppercase">Proceso</span>
          <h2 className="font-display font-bold mt-6 text-balance" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            <span className="block overflow-hidden"><span className="pr-line block">Del diagnóstico</span></span>
            <span className="block overflow-hidden"><span className="pr-line block text-fg-muted">al sistema funcionando.</span></span>
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="pr-step relative pl-20 md:pl-32 pb-20 last:pb-0">
                {/* Number + line */}
                <div className="absolute left-0 top-0 flex flex-col items-center" style={{ width: '64px' }}>
                  <div className="pr-num w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-lg" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--accent)30', color: 'var(--accent)' }}>
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="pr-progress-line w-px mt-2" style={{ height: '100%', background: 'linear-gradient(180deg, var(--accent)30, transparent)', transformOrigin: 'top' }} />
                  )}
                </div>

                {/* Content */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)15', border: '1px solid var(--accent)30' }}>
                    <Icon size={16} className="text-accent" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-fg-primary pt-1">{step.title}</h3>
                </div>

                <p className="text-fg-secondary mb-6 max-w-xl" style={{ lineHeight: 1.6 }}>{step.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {step.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--fg-secondary)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
