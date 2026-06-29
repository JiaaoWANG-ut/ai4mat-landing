import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AtomNetworkCanvas from '../components/AtomNetworkCanvas';

export default function Hero() {
  const leftRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3);
      tl.fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5);
      tl.fromTo('.hero-lead', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.8);
      tl.fromTo('.hero-pricing', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.9);
      tl.fromTo('.hero-ctas', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.0);
      tl.fromTo('.hero-note', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.2);
      tl.fromTo('.hero-trust', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.6);
    }, leftRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!canvasWrapRef.current) return;
    gsap.fromTo(canvasWrapRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.2 });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Left editorial panel */}
      <div
        ref={leftRef}
        className="hero-left"
        style={{
          position: 'relative',
          background: '#000',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 40px',
          boxSizing: 'border-box',
          width: '40%',
          minWidth: '320px',
        }}
      >
        <div style={{ maxWidth: 'none', zIndex: 10 }}>
          {/* Eyebrow */}
          <p
            className="hero-eyebrow"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              fontWeight: 400,
              lineHeight: 1.6,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.42)',
              margin: '0 0 22px 0',
              opacity: 0,
            }}
          >
            Machine-Learning Force Fields for Materials R&D
          </p>

          {/* Title */}
          <h1
            className="hero-title"
            style={{
              fontFamily: "'Geist Pixel', monospace",
              fontSize: 'clamp(44px, 5.6vw, 82px)',
              fontWeight: 400,
              lineHeight: 0.96,
              color: '#fff',
              textTransform: 'uppercase',
              margin: 0,
              textWrap: 'balance',
              letterSpacing: '0.015em',
              opacity: 0,
            }}
          >
            Simulate Chemical
            <br />
            Reactions at Scale
          </h1>

          {/* Lead text */}
          <p
            className="hero-lead hero-text-mob"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.6)',
              margin: '28px 0 0 0',
              maxWidth: '44ch',
              opacity: 0,
            }}
          >
            We simulate how atoms move and react — revealing why your materials fail, so you can fix them.
          </p>

          {/* Pricing Banner */}
          <div
            className="hero-pricing"
            style={{
              marginTop: '28px',
              padding: '16px 20px',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderLeft: '3px solid #00d4ff',
              background: 'rgba(0, 212, 255, 0.04)',
              opacity: 0,
              maxWidth: 'fit-content',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: "'Geist Pixel', monospace",
                  fontSize: '32px',
                  fontWeight: 400,
                  color: '#00d4ff',
                  lineHeight: 1,
                }}
              >
                $0
              </span>
              <div
                style={{
                  width: '1px',
                  height: '32px',
                  background: 'rgba(0, 212, 255, 0.2)',
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#fff',
                    margin: '0 0 3px 0',
                    lineHeight: 1.3,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  4-Hour Technical Assessment
                </p>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.45)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ textDecoration: 'line-through', textDecorationColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.3)' }}>$3,500</span>
                  {' '}→ Free until Sep 2026
                </p>
              </div>
            </div>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                color: 'rgba(0,212,255,0.6)',
                margin: '10px 0 0 0',
                lineHeight: 1.4,
                letterSpacing: '0.02em',
              }}
            >
              No actionable insight? No fee. Ever.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="hero-ctas hero-ctas-mob"
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '32px',
              flexWrap: 'wrap',
              opacity: 0,
            }}
          >
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="hero-btn-primary"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '13px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#000',
                background: '#00d4ff',
                padding: '14px 32px',
                textDecoration: 'none',
                transition: 'background 0.2s',
                cursor: 'pointer',
                display: 'inline-block',
                animation: 'glow-pulse 3s ease-in-out infinite',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#33ddff'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#00d4ff'; }}
            >
              Book Free Assessment
            </a>
            <a
              href="#applications"
              onClick={(e) => { e.preventDefault(); scrollTo('#applications'); }}
              className="hero-btn-secondary"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '13px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'rgba(255,255,255,0.7)',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '14px 32px',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
                cursor: 'pointer',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                const el = e.target as HTMLElement;
                el.style.borderColor = '#00d4ff';
                el.style.color = '#00d4ff';
              }}
              onMouseLeave={(e) => {
                const el = e.target as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.25)';
                el.style.color = 'rgba(255,255,255,0.7)';
              }}
            >
              See Use Cases →
            </a>
          </div>

          {/* Supporting notes */}
          <div
            className="hero-notes-mob"
            style={{
              marginTop: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {[
              'Custom MLFF models trained from first-principles DFT data',
              'Reactive MD at near-DFT accuracy for realistic timescales',
              'Mechanism extraction guiding synthesis and design decisions',
            ].map((note) => (
              <p
                key={note}
                className="hero-note"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.38)',
                  margin: 0,
                  maxWidth: '38ch',
                  opacity: 0,
                  paddingLeft: '14px',
                  borderLeft: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* Trust line at bottom */}
        <p
          className="hero-trust hero-trust-mob"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.3)',
            margin: 0,
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            maxWidth: '50ch',
            opacity: 0,
          }}
        >
          For batteries, catalysts, semiconductors, high-temperature materials, and complex interfaces.
        </p>
      </div>

      {/* Right canvas panel */}
      <div
        ref={canvasWrapRef}
        className="hero-canvas-desktop"
        style={{
          position: 'relative',
          width: '60%',
          background: '#000',
          overflow: 'hidden',
          opacity: 0,
        }}
      >
        <AtomNetworkCanvas />
      </div>

      {/* Mobile canvas */}
      <div
        className="hero-canvas-mobile"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      >
        <AtomNetworkCanvas opacity={0.12} />
      </div>
    </section>
  );
}
