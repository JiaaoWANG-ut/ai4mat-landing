export default function Footer() {
  return (
    <footer
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '32px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '12px',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'rgba(255,255,255,0.4)',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      <span>© 2025 AI4Mat.ai — Machine-Learning Force Fields for Materials R&D</span>
      <span>Built by atomistic simulation experts</span>
    </footer>
  );
}
