import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Battery, FlaskConical, Thermometer, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const APPLICATIONS = [
  {
    icon: Battery,
    title: 'Battery Interface Chemistry',
    body: 'Simulate the atomic processes that control battery performance and degradation.',
    bullets: [
      'SEI/CEI formation and evolution',
      'Li/Na ion transport pathways',
      'Electrolyte decomposition mechanisms',
      'Cathode surface reconstruction',
    ],
  },
  {
    icon: FlaskConical,
    title: 'Catalyst Dynamics and Deactivation',
    body: 'Reveal how catalyst structures evolve under reaction conditions.',
    bullets: [
      'Active-site evolution and reconstruction',
      'Reaction pathway identification',
      'Adsorbate diffusion and poisoning',
      'Sintering and deactivation kinetics',
    ],
  },
  {
    icon: Thermometer,
    title: 'High-Temperature Synthesis and Failure',
    body: 'Understand atomic dynamics in extreme thermal environments.',
    bullets: [
      'Sintering and liquid-phase diffusion',
      'Oxidation and phase separation',
      'Coarsening and grain boundary motion',
      'Coating degradation mechanisms',
    ],
  },
  {
    icon: Cpu,
    title: 'Semiconductor Process Chemistry',
    body: 'Model atomistic reactions in fabrication and processing.',
    bullets: [
      'Etching and deposition chemistry',
      'ALD/CVD precursor reactions',
      'Plasma-induced surface damage',
      'Buried interface evolution',
    ],
  },
];

export default function Applications() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.app-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = gridRef.current!.children;
      gsap.fromTo(
        Array.from(cards),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="applications"
      className="section-light"
      style={{
        background: '#ffffff',
        color: '#000000',
        borderTop: '1px solid #000',
        padding: '160px 40px',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <h3
          className="app-heading section-label"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '17.5px',
            fontWeight: 400,
            lineHeight: '20px',
            textTransform: 'uppercase',
            color: '#000',
            margin: '0 0 40px 0',
          }}
        >
          Applications
        </h3>

        <h2
          className="app-heading section-h2"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.15,
            textTransform: 'uppercase',
            color: '#000',
            margin: '0 0 64px 0',
            letterSpacing: '0.02em',
            textWrap: 'balance',
          }}
        >
          Applications Where Atomic Dynamics Matter
        </h2>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="apps-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            borderTop: '1px solid #000',
          }}
        >
          {APPLICATIONS.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.title}
                className="app-card"
                style={{
                  padding: '40px 24px',
                }}
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  color="#000"
                  style={{ marginBottom: '24px' }}
                />
                <h4
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '25px',
                    color: '#000',
                    margin: '0 0 12px 0',
                  }}
                >
                  {app.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '21px',
                    color: 'rgba(0,0,0,0.7)',
                    margin: '0 0 20px 0',
                  }}
                >
                  {app.body}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {app.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        color: 'rgba(0,0,0,0.5)',
                        marginBottom: '8px',
                      }}
                    >
                      <span style={{ color: 'rgba(0,0,0,0.3)', marginRight: '8px' }}>·</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
