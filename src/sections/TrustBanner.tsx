import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Battery, FlaskConical, Thermometer, Cpu, Microscope, Atom } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const INDUSTRIES = [
  { icon: Battery, label: 'Batteries' },
  { icon: FlaskConical, label: 'Catalysts' },
  { icon: Thermometer, label: 'High-Temp Materials' },
  { icon: Cpu, label: 'Semiconductors' },
  { icon: Microscope, label: 'Oxides & Ceramics' },
  { icon: Atom, label: 'Complex Interfaces' },
];

const METHODS = [
  'Trained on DFT-level quantum data',
  'Validated against ab initio benchmarks',
  'Near-DFT accuracy where tested',
];

export default function TrustBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.trust-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
      className="section-dark"
      style={{
        background: '#000000',
        color: '#ffffff',
        padding: '80px 40px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Industries */}
        <p
          className="trust-item"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.4)',
            margin: '0 0 24px 0',
            textAlign: 'center',
          }}
        >
          Serving R&D teams across materials domains
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.label}
                className="trust-item"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  opacity: 0,
                }}
              >
                <Icon size={22} strokeWidth={1.2} color="rgba(255,255,255,0.4)" />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'center',
                  }}
                >
                  {ind.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Methodology backing */}
        <div
          className="trust-item"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '24px',
            opacity: 0,
          }}
        >
          {METHODS.map((m) => (
            <span
              key={m}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                color: 'rgba(0,212,255,0.55)',
                letterSpacing: '0.02em',
              }}
            >
              <span style={{ color: '#00d4ff', marginRight: '6px' }}>●</span>
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
