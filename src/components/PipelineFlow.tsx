import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { label: 'DFT Data', color: '#00d4ff' },
  { label: 'ML Force Field', color: '#06b6d4' },
  { label: 'Reactive MD', color: '#4f46e5' },
  { label: 'Atomic Mechanism', color: '#7c3aed' },
  { label: 'Materials Design', color: '#a855f7' },
];

export default function PipelineFlow() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current!.querySelectorAll('.pipeline-step');
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        marginTop: '48px',
      }}
    >
      {STEPS.map((step, index) => (
        <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {index > 0 && (
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '14px',
                color: 'rgba(0,0,0,0.25)',
                marginRight: '4px',
              }}
            >
              →
            </span>
          )}
          <div
            className="pipeline-step"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: 0,
            }}
          >
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: step.color,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#000',
                whiteSpace: 'nowrap',
              }}
            >
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
