import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AtomNetworkCanvas from '../components/AtomNetworkCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', challenge: '' });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send to FormSubmit.co — free form backend, no server needed
    // Replace 'contact@ai4mat.ai' with your real email before going live
    try {
      await fetch('https://formsubmit.co/ajax/wangjiaao0720@utexas.edu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          challenge: form.challenge,
          _subject: `AI4Mat Assessment Request — ${form.company || 'New Lead'}`,
        }),
      });
    } catch {
      // Silently fail — still show success UI to user
    }

    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '14px 16px',
    color: '#fff',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.25s, background 0.25s',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'rgba(255,255,255,0.55)',
    display: 'block',
    marginBottom: '10px',
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-dark"
      style={{
        background: '#000000',
        color: '#ffffff',
        padding: '140px 40px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <AtomNetworkCanvas opacity={0.1} />
      </div>

      <div
        className="cta-content"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '600px',
          width: '100%',
          opacity: 0,
        }}
      >
        <h2
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(26px, 3vw, 40px)',
            fontWeight: 400,
            lineHeight: 1.15,
            textTransform: 'uppercase',
            color: '#fff',
            margin: '0 0 16px 0',
            letterSpacing: '0.02em',
            textWrap: 'balance',
            textAlign: 'center',
          }}
        >
          Book Your Free Assessment
        </h2>

        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '24px',
            color: 'rgba(255,255,255,0.5)',
            margin: '0 0 36px 0',
            textAlign: 'center',
          }}
        >
          4-hour technical evaluation at no cost.
          No result, no fee — ever.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.02)',
              padding: '36px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px',
              }}
              className="form-row"
            >
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
                />
              </div>
              <div>
                <label style={labelStyle}>Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Company</label>
              <input
                type="text"
                placeholder="Your organization"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Material System / Challenge</label>
              <textarea
                rows={3}
                placeholder="e.g., Li-ion battery SEI formation, catalyst deactivation at high temp..."
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => { e.target.style.borderColor = '#00d4ff'; e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#000',
                background: '#00d4ff',
                padding: '16px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                animation: 'glow-pulse 3s ease-in-out infinite',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#33ddff'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#00d4ff'; }}
            >
              Book Free Assessment
            </button>

            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                lineHeight: '18px',
                color: 'rgba(255,255,255,0.3)',
                margin: '16px 0 0 0',
                textAlign: 'center',
              }}
            >
              We typically respond within 24 hours. No spam, ever.
            </p>
          </form>
        ) : (
          <div
            style={{
              border: '1px solid rgba(0, 212, 255, 0.25)',
              background: 'rgba(0, 212, 255, 0.03)',
              padding: '48px 36px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '2px solid #00d4ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <span style={{ color: '#00d4ff', fontSize: '22px' }}>✓</span>
            </div>
            <h3
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '22px',
                fontWeight: 500,
                color: '#fff',
                margin: '0 0 12px 0',
              }}
            >
              Request Received
            </h3>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '22px',
                color: 'rgba(255,255,255,0.55)',
                margin: '0 0 28px 0',
              }}
            >
              Our team will review your challenge and reach out within 24 hours to schedule your free 4-hour assessment.
            </p>
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '24px',
              }}
            >
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: 'rgba(255,255,255,0.35)',
                  margin: '0 0 12px 0',
                }}
              >
                While you wait — explore how we have helped similar R&D teams:
              </p>
              <a
                href="#applications"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#applications')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#00d4ff',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(0,212,255,0.3)',
                  paddingBottom: '2px',
                  transition: 'border-color 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.borderBottomColor = '#00d4ff'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.borderBottomColor = 'rgba(0,212,255,0.3)'; }}
              >
                See Applications →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
