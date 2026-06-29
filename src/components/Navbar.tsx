import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Technology', href: '#problem' },
  { label: 'Applications', href: '#applications' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 40px',
          fontFamily: "'IBM Plex Mono', monospace",
          boxSizing: 'border-box',
          transition: 'background 0.3s',
          background: isScrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        }}
      >
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            fontSize: '18px',
            fontWeight: 400,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          AI4Mat
        </a>

        {/* Desktop links */}
        <div
          className="nav-desktop"
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {NAV_LINKS.map((item, index) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <a
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#fff',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 0.2s',
                  paddingBottom: '2px',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderBottomColor = '#fff';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderBottomColor = 'transparent';
                }}
              >
                {item.label}
              </a>
              {index < NAV_LINKS.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>·</span>
              )}
            </div>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: '#000',
              background: '#00d4ff',
              textTransform: 'uppercase',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              padding: '8px 18px',
              transition: 'background 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = '#33ddff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = '#00d4ff';
            }}
          >
            Book Assessment
          </a>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
          aria-label="Toggle menu"
        >
          <span style={{ width: '18px', height: '1px', background: '#fff', display: 'block', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
          <span style={{ width: '18px', height: '1px', background: '#fff', display: 'block', transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: '18px', height: '1px', background: '#fff', display: 'block', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.96)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
              style={{
                fontSize: '18px',
                color: '#fff',
                textTransform: 'uppercase',
                textDecoration: 'none',
                letterSpacing: '0.1em',
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
            style={{
              fontSize: '14px',
              color: '#000',
              background: '#00d4ff',
              textTransform: 'uppercase',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              padding: '12px 32px',
              marginTop: '16px',
            }}
          >
            Book Assessment
          </a>
        </div>
      )}
    </>
  );
}
