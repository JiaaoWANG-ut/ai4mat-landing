import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: 'Tell us your challenge',
    body: 'Share your material system and the problem you are facing — a failure mode, an unexplained result, or a design decision.',
  },
  {
    title: 'We assess feasibility',
    body: 'Free 4-hour technical evaluation to determine if atomistic simulation can deliver actionable insight for your specific system.',
  },
  {
    title: 'Get actionable insights',
    body: 'Mechanism, design rules, trajectory visualization, and prioritized experimental recommendations — ready for your R&D team.',
  },
];

export default function Workflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wf-heading',
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
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      );

      const stepEls = sectionRef.current!.querySelectorAll('.wf-step');
      stepEls.forEach((step) => {
        const circle = step.querySelector('.wf-circle');
        const text = step.querySelector('.wf-text');

        gsap.fromTo(
          circle,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: step,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          text,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="section-dark"
      style={{
        background: '#000000',
        color: '#ffffff',
        padding: '120px 40px',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <h3
          className="wf-heading section-label"
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
          How It Works
        </h3>

        <h2
          className="wf-heading section-h2"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.15,
            textTransform: 'uppercase',
            color: '#fff',
            margin: '0 0 80px 0',
            letterSpacing: '0.02em',
            textWrap: 'balance',
            maxWidth: '700px',
          }}
        >
          From Your Problem to Actionable Insight
        </h2>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'rgba(255,255,255,0.15)',
              transformOrigin: 'top',
            }}
          >
            <div
              ref={lineRef}
              style={{
                width: '100%',
                height: '100%',
                background: '#00d4ff',
                transformOrigin: 'top',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="wf-step"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '32px',
                marginBottom: index < STEPS.length - 1 ? '64px' : 0,
                position: 'relative',
              }}
            >
              <div
                className="wf-circle"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  background: '#000',
                  zIndex: 2,
                  transform: 'scale(0)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#fff',
                  }}
                >
                  {index + 1}
                </span>
              </div>

              <div
                className="wf-text"
                style={{
                  paddingTop: '6px',
                  opacity: 0,
                }}
              >
                <h4
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '25px',
                    color: '#fff',
                    margin: '0 0 10px 0',
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '21px',
                    color: 'rgba(255,255,255,0.5)',
                    margin: 0,
                    maxWidth: '520px',
                  }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
