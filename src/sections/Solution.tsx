import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PipelineFlow from '../components/PipelineFlow';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    num: '01',
    title: 'Custom MLFF Model Construction',
    body: 'We generate quantum reference datasets and train system-specific machine-learning force fields for complex chemical environments — batteries, catalysts, oxides, semiconductors.',
  },
  {
    num: '02',
    title: 'Reactive Atomistic Simulation',
    body: 'We simulate bond rearrangement, diffusion, phase evolution, interface reactions, degradation, and high-temperature dynamics at scales unreachable by DFT.',
  },
  {
    num: '03',
    title: 'Mechanism-to-Design Translation',
    body: 'We convert atomic trajectories into design rules for materials synthesis, processing, and performance optimization — connecting simulation to experiment.',
  },
];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left column
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Right column cards
      const cards = rightRef.current!.querySelectorAll('.capability-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightRef.current,
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
      id="solution"
      style={{
        background: '#ffffff',
        color: '#000000',
        borderTop: '1px solid #000',
        padding: '160px 40px',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 46%) minmax(300px, 1fr)',
          gap: '64px',
          alignItems: 'start',
        }}
        className="solution-grid"
      >
        {/* Left column */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <h3
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
            The Solution
          </h3>

          <h2
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.15,
              textTransform: 'uppercase',
              color: '#000',
              margin: '0 0 32px 0',
              letterSpacing: '0.02em',
              textWrap: 'balance',
            }}
          >
            A Computational Microscope for Chemical Reactions
          </h2>

          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: '25px',
              color: '#000',
              margin: '0 0 32px 0',
            }}
          >
            AI4Mat transforms first-principles quantum data into production-grade machine-learning force
            fields. These models enable long-time, large-scale atomistic simulations with near-DFT
            accuracy, allowing R&D teams to study realistic chemical dynamics directly on computers.
          </p>

          {/* Highlight block */}
          <div
            style={{
              border: '1px solid #000',
              padding: '24px 28px',
              marginTop: '8px',
            }}
          >
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '15px',
                fontWeight: 500,
                lineHeight: '25px',
                color: '#000',
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              We do not only predict static properties. We simulate how atoms move, react, reorganize,
              and fail.
            </p>
          </div>

          <PipelineFlow />
        </div>

        {/* Right column — capability cards */}
        <div ref={rightRef}>
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.num}
              className="capability-card"
              style={{
                borderTop: '1px solid #000',
                padding: '40px 32px',
                opacity: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 400,
                  color: 'rgba(0,0,0,0.4)',
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                {cap.num}
              </span>
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
                {cap.title}
              </h4>
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: '21px',
                  color: 'rgba(0,0,0,0.7)',
                  margin: 0,
                }}
              >
                {cap.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
