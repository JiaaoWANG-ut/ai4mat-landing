import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EyeOff, Clock, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROBLEMS = [
  {
    icon: EyeOff,
    title: 'Experiments miss transient atomic dynamics.',
    body: 'Bond breaking, ion migration, and reaction intermediates occur on femtosecond-to-nanosecond timescales — invisible to most experimental probes.',
  },
  {
    icon: Clock,
    title: 'DFT/AIMD is too expensive for realistic systems.',
    body: 'Direct ab initio molecular dynamics is limited to hundreds of atoms and picoseconds. Real materials problems require thousands of atoms and nanoseconds.',
  },
  {
    icon: BarChart3,
    title: 'Static AI prediction does not explain mechanisms.',
    body: 'Structure-property models screen candidates but cannot reveal reaction pathways, degradation routes, or interfacial chemistry.',
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.problem-heading',
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

      const cols = cardsRef.current!.children;
      gsap.fromTo(
        Array.from(cols),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="problem"
      className="section-light"
      style={{
        background: '#ffffff',
        color: '#000000',
        padding: '160px 40px',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <h3
          className="problem-heading section-label"
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
          The Problem
        </h3>

        <h2
          className="problem-heading section-h2"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.15,
            textTransform: 'uppercase',
            color: '#000',
            margin: '0 0 32px 0',
            maxWidth: '900px',
            letterSpacing: '0.02em',
          }}
        >
          Most Materials Failures Begin Below the Resolution of Experiments
        </h2>

        <p
          className="problem-heading"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: '25px',
            color: '#000',
            margin: '0 0 16px 0',
            maxWidth: '720px',
          }}
        >
          Materials performance is often controlled by atomic-scale events: bond breaking, ion migration,
          surface reconstruction, phase nucleation, interface degradation, and transient reaction intermediates.
          These processes are fast, rare, heterogeneous, and difficult to observe directly.
        </p>

        <p
          className="problem-heading"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: '25px',
            color: 'rgba(0,0,0,0.48)',
            margin: '0 0 64px 0',
            fontStyle: 'italic',
          }}
        >
          Experiments show what happened. AI4Mat helps reveal how it happened.
        </p>

        <div
          ref={cardsRef}
          className="cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            borderTop: '1px solid #000',
          }}
        >
          {PROBLEMS.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="card-item"
                style={{
                  padding: '40px 32px',
                }}
              >
                <Icon
                  size={32}
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
                    margin: '0 0 16px 0',
                  }}
                >
                  {problem.title}
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
                  {problem.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
