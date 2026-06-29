import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GENERIC = [
  'Static structure-property models',
  'Limited mechanistic insight',
  'Disconnected from reaction dynamics',
  'Useful for screening, not failure analysis',
];

const AI4MAT = [
  'Reactive atomistic simulation',
  'Custom MLFF from first-principles data',
  'Captures motion, reactions, diffusion, degradation',
  'Converts mechanisms into R&D decisions',
];

export default function Differentiation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.diff-heading',
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

      gsap.fromTo(
        '.diff-generic',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.diff-columns',
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.diff-ai4mat',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.diff-columns',
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.diff-key',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.diff-columns',
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
      id="differentiation"
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
          className="diff-heading section-label"
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
          Differentiation
        </h3>

        <h2
          className="diff-heading section-h2"
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
          Mechanism-First AI for Materials Chemistry
        </h2>

        <div
          className="diff-columns diff-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
          }}
        >
          {/* Generic column */}
          <div className="diff-generic" style={{ opacity: 0 }}>
            <h4
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '25px',
                color: 'rgba(0,0,0,0.5)',
                margin: '0 0 24px 0',
              }}
            >
              Generic AI Materials Prediction
            </h4>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(0,0,0,0.15)',
                marginBottom: '24px',
              }}
            />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {GENERIC.map((item) => (
                <li
                  key={item}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '28px',
                    color: 'rgba(0,0,0,0.5)',
                    marginBottom: '12px',
                  }}
                >
                  <span style={{ color: 'rgba(200,50,50,0.6)', marginRight: '10px' }}>×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* AI4Mat column */}
          <div className="diff-ai4mat" style={{ opacity: 0 }}>
            <h4
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '25px',
                color: '#000',
                margin: '0 0 24px 0',
              }}
            >
              AI4Mat
            </h4>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(0,0,0,0.4)',
                marginBottom: '24px',
              }}
            />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {AI4MAT.map((item) => (
                <li
                  key={item}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '28px',
                    color: '#000',
                    marginBottom: '12px',
                  }}
                >
                  <span style={{ color: '#00d4ff', marginRight: '10px' }}>●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key sentence */}
        <p
          className="diff-key"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '28px',
            color: '#000',
            textAlign: 'center',
            margin: '64px 0 0 0',
            opacity: 0,
          }}
        >
          AI4Mat is built for materials problems where the mechanism matters.
        </p>
      </div>
    </section>
  );
}
