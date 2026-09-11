import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/hooks/useGsap';
import { UserPlus, Search, Users, MessageSquare, CheckCircle2, UserCheck, Calendar, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AutomationSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.au-line', {
        yPercent: 120,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.au-headline', start: 'top 80%' },
      });

      // Sticky automation workflow
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.au-sticky',
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        },
      });

      // Reset all nodes
      gsap.set('.au-node', { opacity: 0.25, scale: 0.95 });
      gsap.set('.au-node-glow', { opacity: 0 });
      gsap.set('.au-connector', { strokeDashoffset: 100 });
      gsap.set('.au-particle', { opacity: 0 });
      gsap.set('.au-node-card', { opacity: 0, y: 10 });

      const nodes = gsap.utils.toArray<HTMLElement>('.au-node');
      const connectors = gsap.utils.toArray<HTMLElement>('.au-connector');
      const particles = gsap.utils.toArray<SVGCircleElement>('.au-particle');
      const cards = gsap.utils.toArray<HTMLElement>('.au-node-card');

      nodes.forEach((node, i) => {
        tl.to(node, { opacity: 1, scale: 1, duration: 0.08, ease: 'power2.out' })
          .to(cards[i], { opacity: 1, y: 0, duration: 0.1 }, '-=0.04')
          .to(node.querySelectorAll('.au-node-glow'), { opacity: 1, duration: 0.1 }, '-=0.06');

        if (i < connectors.length) {
          const fromX = Number(node.getAttribute('data-x') || 0);
          const fromY = Number(node.getAttribute('data-y') || 0);
          const toX = Number(nodes[i + 1]?.getAttribute('data-x') || 0);
          const toY = Number(nodes[i + 1]?.getAttribute('data-y') || 0);

          tl.to(connectors[i], { strokeDashoffset: 0, duration: 0.1, ease: 'power2.out' }, '-=0.02')
            .to(particles[i], { opacity: 1, duration: 0.05 }, '-=0.02')
            .fromTo(particles[i],
              { attr: { cx: fromX, cy: fromY } },
              {
                attr: { cx: toX, cy: toY },
                duration: 0.15,
                ease: 'power2.inOut',
              }, '-=0.02'
            )
            .to(particles[i], { opacity: 0, duration: 0.03 });
        }
      });

      // Final pulse
      tl.to('.au-final-glow', { opacity: 1, scale: 1.2, duration: 0.2, ease: 'power2.out', transformOrigin: 'center' });
    }, root);
    return () => ctx.revert();
  }, []);

  const steps = [
    { icon: UserPlus, label: 'NEW LEAD', detail: 'Fuente: Website / Ads', x: 50, y: 120 },
    { icon: Search, label: 'IDENTIFIED', detail: 'AI scoring: 87/100', x: 200, y: 120 },
    { icon: Users, label: 'CRM CREATED', detail: 'Contacto + pipeline', x: 350, y: 120 },
    { icon: MessageSquare, label: 'WHATSAPP', detail: 'Mensaje auto enviado', x: 500, y: 120 },
    { icon: CheckCircle2, label: 'QUALIFIED', detail: 'Intención confirmada', x: 650, y: 120 },
    { icon: UserCheck, label: 'ASSIGNED', detail: 'Vendedor: Carlos M.', x: 800, y: 120 },
    { icon: Calendar, label: 'FOLLOW-UP', detail: 'Recordatorios +24h', x: 950, y: 120 },
    { icon: TrendingUp, label: 'SALE', detail: '$12,000 cerrado', x: 1100, y: 120 },
  ];

  return (
    <section ref={root} className="relative" style={{ background: 'var(--bg-surface)' }}>
      {/* Headline */}
      <div className="section-padding py-32 md:py-40 max-w-6xl mx-auto">
        <div className="au-headline text-center">
          <span className="text-xs font-medium text-accent tracking-widest uppercase">Automation</span>
          <h2 className="font-display font-bold mt-6 text-balance" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            <span className="block overflow-hidden"><span className="au-line block">El lead recorre</span></span>
            <span className="block overflow-hidden"><span className="au-line block text-fg-muted">todo el sistema.</span></span>
          </h2>
          <p className="mt-6 text-fg-secondary max-w-xl mx-auto text-balance">
            Sin intervención humana. Cada nodo se activa, pasa la información al siguiente y el sistema avanza.
          </p>
        </div>
      </div>

      {/* Sticky workflow */}
      <div className="au-sticky relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="au-final-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)', opacity: 0, scale: 0.8 }} />

        <div className="relative w-full overflow-x-auto no-scrollbar">
          <div className="relative mx-auto" style={{ width: '1200px', height: '300px', maxWidth: '95vw' }}>
            {/* SVG connectors */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid meet">
              {steps.slice(0, -1).map((step, i) => {
                const next = steps[i + 1];
                return (
                  <g key={i}>
                    <line
                      className="au-connector"
                      x1={step.x} y1={step.y - 60}
                      x2={next.x} y2={next.y - 60}
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeOpacity="0.3"
                      strokeDasharray="6 4"
                    />
                    <circle
                      className="au-particle"
                      r="4"
                      fill="var(--accent)"
                      style={{ filter: 'drop-shadow(0 0 6px var(--accent))' }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {steps.map((step, i) => {
              const Icon = step.icon;
              const left = `${(step.x / 1200) * 100}%`;
              return (
                <div
                  key={i}
                  className="au-node absolute flex flex-col items-center gap-2"
                  style={{ left, top: '40px', transform: 'translateX(-50%)' }}
                  data-x={step.x}
                  data-y={step.y - 60}
                >
                  <div className="relative">
                    <div className="au-node-glow absolute inset-0 rounded-2xl" style={{ background: 'var(--accent-glow-strong)', filter: 'blur(12px)', opacity: 0 }} />
                    <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center glass" style={{ borderColor: 'var(--accent)30' }}>
                      <Icon size={20} className="text-accent" />
                    </div>
                  </div>
                  <div className="au-node-card text-center" style={{ opacity: 0 }}>
                    <div className="text-[10px] font-bold tracking-wider text-fg-primary whitespace-nowrap">{step.label}</div>
                    <div className="text-[9px] text-fg-muted whitespace-nowrap mt-0.5">{step.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span className="text-xs text-fg-muted tracking-widest uppercase">Scroll para activar</span>
          <ArrowRightLong />
        </div>
      </div>
    </section>
  );
}

function ArrowRightLong() {
  return (
    <svg width="40" height="6" viewBox="0 0 40 6" fill="none">
      <line x1="0" y1="3" x2="36" y2="3" stroke="var(--fg-muted)" strokeWidth="1" />
      <path d="M36 3 L32 1 M36 3 L32 5" stroke="var(--fg-muted)" strokeWidth="1" />
    </svg>
  );
}
