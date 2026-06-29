import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: 'What material systems can you handle?',
    a: 'We work with batteries, catalysts, oxides, ceramics, semiconductors, coatings, and high-entropy alloys. If your system involves atoms moving and reacting, we can likely build a simulation for it.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A free assessment takes 4 hours. Full projects range from 4 to 12 weeks depending on system complexity, data availability, and the depth of simulation required.',
  },
  {
    q: 'Do we need to provide experimental data?',
    a: 'Experimental data helps validate our models but is not required to start. We begin with first-principles quantum data and refine against any experimental benchmarks you can share.',
  },
  {
    q: 'Who owns the IP from simulation results?',
    a: 'All simulation data, models, and reports are your property. We may request permission to anonymize and cite results for academic or marketing purposes, but this is entirely optional.',
  },
  {
    q: 'What if the assessment shows simulation is not suitable?',
    a: 'Then the assessment is completely free. We will tell you honestly if your problem is better solved by experiment or other methods — no simulation commitment required.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-heading',
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
        '.faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 70%',
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
      id="faq"
      className="section-light"
      style={{
        background: '#ffffff',
        color: '#000000',
        borderTop: '1px solid #000',
        padding: '120px 40px',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <h3
          className="faq-heading section-label"
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
          Common Questions
        </h3>

        <h2
          className="faq-heading section-h2"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.15,
            textTransform: 'uppercase',
            color: '#000',
            margin: '0 0 48px 0',
            letterSpacing: '0.02em',
            textWrap: 'balance',
            maxWidth: '700px',
          }}
        >
          What R&D Teams Typically Ask
        </h2>

        <div
          className="faq-list"
          style={{
            maxWidth: '800px',
          }}
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="faq-item"
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.12)',
                  opacity: 0,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '15px',
                      fontWeight: 500,
                      color: '#000',
                      lineHeight: '22px',
                      paddingRight: '24px',
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '18px',
                      fontWeight: 400,
                      color: isOpen ? '#00d4ff' : 'rgba(0,0,0,0.35)',
                      transition: 'color 0.2s, transform 0.2s',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '13px',
                      fontWeight: 400,
                      lineHeight: '22px',
                      color: 'rgba(0,0,0,0.7)',
                      margin: '0 0 24px 0',
                      paddingRight: '40px',
                    }}
                  >
                    {faq.a}
                  </p>
                  {index === FAQS.length - 1 && (
                    <div style={{ marginBottom: '24px' }}>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '12px',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: '#000',
                          background: '#00d4ff',
                          padding: '10px 24px',
                          textDecoration: 'none',
                          display: 'inline-block',
                          cursor: 'pointer',
                        }}
                      >
                        Book Free Assessment
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }} />
        </div>
      </div>
    </section>
  );
}
