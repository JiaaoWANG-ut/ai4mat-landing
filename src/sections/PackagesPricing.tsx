import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: 'Mechanism Discovery',
    body: 'For teams blocked by a specific failure mechanism or unexplained experimental result.',
    deliverables: [
      'Atomic mechanism report',
      'Trajectory visualization',
      'Reaction pathway analysis',
      'Experimental recommendations',
    ],
  },
  {
    title: 'Custom MLFF Model',
    body: 'For companies that repeatedly study a specific chemical system and need a reusable simulation engine.',
    deliverables: [
      'Trained ML force field',
      'Validation report',
      'Simulation workflow setup',
      'Model documentation',
    ],
  },
  {
    title: 'Simulation-Guided Design',
    body: 'For teams optimizing materials composition, interfaces, dopants, additives, or processing conditions.',
    deliverables: [
      'Candidate ranking',
      'Mechanism interpretation',
      'Prioritized experiments',
      'Design rules report',
    ],
  },
];

export default function PackagesPricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pp-heading',
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
        '.pp-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.pp-pricing-grid',
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
      id="packages"
      className="section-dark"
      style={{
        background: '#000000',
        color: '#ffffff',
        padding: '120px 40px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* === PRICING HERO === */}
        <h3
          className="pp-heading section-label"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '17.5px',
            fontWeight: 400,
            lineHeight: '20px',
            textTransform: 'uppercase',
            color: '#fff',
            margin: '0 0 40px 0',
          }}
        >
          Start With a Free Assessment
        </h3>

        <h2
          className="pp-heading section-h2"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.15,
            textTransform: 'uppercase',
            color: '#fff',
            margin: '0 0 16px 0',
            letterSpacing: '0.02em',
            textWrap: 'balance',
          }}
        >
          Free 4-Hour Technical Evaluation
        </h2>

        <p
          className="pp-heading"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: '25px',
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 56px 0',
            maxWidth: '640px',
          }}
        >
          No commitment. If we conclude simulation cannot help your problem, no fee — ever.
        </p>

        {/* Pricing cards */}
        <div
          className="pp-pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            marginBottom: '80px',
          }}
        >
          {/* Industry anchor */}
          <div
            className="pp-card"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '40px 32px',
              opacity: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              Industry Standard
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '28px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.25)',
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(255,255,255,0.15)',
                }}
              >
                $3,500+
              </span>
            </div>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '18px',
                color: 'rgba(255,255,255,0.35)',
                margin: 0,
              }}
            >
              Typical cost for initial feasibility consulting in computational materials science
            </p>
          </div>

          {/* $0 offer */}
          <div
            className="pp-card"
            style={{
              background: 'rgba(0, 212, 255, 0.04)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              padding: '40px 32px',
              opacity: 0,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '0',
                right: '20px',
                background: '#00d4ff',
                color: '#000',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '6px 14px',
              }}
            >
              Limited — Ends Sep 2026
            </div>

            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                color: 'rgba(0,212,255,0.7)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '20px',
                marginTop: '12px',
              }}
            >
              AI4Mat
            </span>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span
                style={{
                  fontFamily: "'Geist Pixel', monospace",
                  fontSize: '48px',
                  fontWeight: 400,
                  color: '#00d4ff',
                }}
              >
                $0
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                }}
              >
                / 4-hour assessment
              </span>
            </div>

            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '18px',
                color: 'rgba(255,255,255,0.5)',
                margin: 0,
              }}
            >
              Full technical depth. Free for eligible R&D teams through September 2026.
            </p>
          </div>

          {/* Guarantee */}
          <div
            className="pp-card"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '40px 32px',
              opacity: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              Risk-Free
            </span>

            <h4
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: '26px',
                color: '#fff',
                margin: '0 0 12px 0',
              }}
            >
              No result, no fee — ever.
            </h4>

            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '18px',
                color: 'rgba(255,255,255,0.45)',
                margin: 0,
              }}
            >
              If simulation cannot deliver meaningful insight for your system, the assessment is free regardless of timing.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className="pp-heading"
          style={{
            textAlign: 'center',
            marginBottom: '80px',
            opacity: 0,
          }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '13px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#000',
              background: '#00d4ff',
              padding: '14px 36px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 0.2s',
              cursor: 'pointer',
              animation: 'glow-pulse 3s ease-in-out infinite',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#33ddff'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#00d4ff'; }}
          >
            Book Free Assessment
          </a>
        </div>

        {/* === SERVICE PACKAGES === */}
        <p
          className="pp-heading"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.35)',
            margin: '0 0 24px 0',
            textAlign: 'center',
          }}
        >
          After the free assessment, proceed with the service that fits your needs
        </p>

        <h3
          className="pp-heading"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(22px, 2.5vw, 32px)',
            fontWeight: 400,
            lineHeight: 1.2,
            textTransform: 'uppercase',
            color: '#fff',
            margin: '0 0 48px 0',
            letterSpacing: '0.02em',
            textWrap: 'balance',
            textAlign: 'center',
          }}
        >
          How We Work With R&D Teams
        </h3>

        <div
          className="pp-services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
          }}
        >
          {SERVICES.map((pkg) => (
            <div
              key={pkg.title}
              className="pp-card"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '40px 32px',
                transition: 'border-color 0.4s',
                cursor: 'default',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <h4
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '26px',
                  color: '#fff',
                  margin: '0 0 12px 0',
                }}
              >
                {pkg.title}
              </h4>

              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: 'rgba(255,255,255,0.5)',
                  margin: '0 0 20px 0',
                }}
              >
                {pkg.body}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {pkg.deliverables.map((d) => (
                  <li
                    key={d}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '11px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      color: 'rgba(255,255,255,0.4)',
                      marginBottom: '6px',
                    }}
                  >
                    <span style={{ color: '#00d4ff', marginRight: '8px' }}>·</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
