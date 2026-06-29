import { useEffect, useState } from 'react';

export default function StickyBottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const contact = document.getElementById('contact');
      const contactTop = contact ? contact.getBoundingClientRect().top : Infinity;
      setVisible(heroBottom < 0 && contactTop > window.innerHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(0, 212, 255, 0.15)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s ease',
      }}
    >
      <span
        style={{
          fontFamily: "'Geist Pixel', monospace",
          fontSize: '20px',
          color: '#00d4ff',
          lineHeight: 1,
        }}
      >
        $0
      </span>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '12px',
          fontWeight: 500,
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        4-Hour Assessment
      </span>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
        }}
      >
        · Limited time
      </span>
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#000',
          background: '#00d4ff',
          padding: '10px 22px',
          textDecoration: 'none',
          transition: 'background 0.2s',
          cursor: 'pointer',
          marginLeft: '8px',
        }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#33ddff'; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#00d4ff'; }}
      >
        Book Now →
      </a>
    </div>
  );
}
