// ios-frame.jsx — iPhone 15 Pro device shell
// window.IOSDevice exposes the component for the inline babel script

(function () {
  const { useEffect, useState } = React;

  function Clock() {
    const [t, setT] = useState('');
    useEffect(() => {
      const fmt = () => {
        const d = new Date();
        const h = d.getHours().toString().padStart(2, '0');
        const m = d.getMinutes().toString().padStart(2, '0');
        setT(h + ':' + m);
      };
      fmt();
      const id = setInterval(fmt, 15000);
      return () => clearInterval(id);
    }, []);
    return t;
  }

  function StatusBar({ dark }) {
    const fg = dark ? 'rgba(244,241,232,0.9)' : 'rgba(19,36,29,0.9)';
    return (
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 54,
        display: 'flex', alignItems: 'flex-end', paddingBottom: 6,
        paddingLeft: 24, paddingRight: 20, zIndex: 10, pointerEvents: 'none',
      }}>
        <span style={{ fontFamily: "'Schibsted Grotesk',system-ui,sans-serif", fontWeight: 600, fontSize: 15, color: fg, letterSpacing: -0.3, flex: 1 }}>
          <Clock />
        </span>
        <svg width="67" height="14" viewBox="0 0 67 14" fill="none">
          {/* signal bars */}
          <rect x="0" y="4" width="3" height="10" rx="1" fill={fg} />
          <rect x="5" y="2.5" width="3" height="11.5" rx="1" fill={fg} />
          <rect x="10" y="0.5" width="3" height="13.5" rx="1" fill={fg} />
          <rect x="15" y="0.5" width="3" height="13.5" rx="1" fill={fg} opacity="0.35" />
          {/* wifi */}
          <path d="M28 10.5 C28 10.5 30 8.5 33 8.5 C36 8.5 38 10.5 38 10.5" stroke={fg} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M25 7.5 C25 7.5 28.3 4.5 33 4.5 C37.7 4.5 41 7.5 41 7.5" stroke={fg} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
          <circle cx="33" cy="13" r="1.3" fill={fg} />
          {/* battery */}
          <rect x="48" y="1" width="17" height="12" rx="2.5" stroke={fg} strokeWidth="1.2" fill="none" opacity="0.35" />
          <rect x="49.6" y="2.6" width="13" height="8.8" rx="1.5" fill={fg} />
          <path d="M65.5 5.5 L65.5 8.5" stroke={fg} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>
    );
  }

  function IOSDevice({ dark, children }) {
    const frameW = 402;
    const frameH = 874;
    const r = 52; // corner radius

    return (
      <div className="crest-stage" style={{
        width: frameW, height: frameH, position: 'relative',
        borderRadius: r, overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(0,0,0,0.4)',
        background: '#0d1813',
      }}>
        {/* titanium side border */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: r, zIndex: 20, pointerEvents: 'none',
          boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.12), inset 0 0 0 3px rgba(0,0,0,0.35)',
        }} />

        {/* dynamic island */}
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, borderRadius: 20,
          background: '#0a0f0c', zIndex: 15, pointerEvents: 'none',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.07)',
        }} />

        {/* status bar */}
        <StatusBar dark={dark} />

        {/* screen content */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: r }}>
          {children}
        </div>

        {/* home indicator */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 3,
          background: dark ? 'rgba(244,241,232,0.35)' : 'rgba(19,36,29,0.25)',
          zIndex: 15, pointerEvents: 'none',
        }} />
      </div>
    );
  }

  window.IOSDevice = IOSDevice;
})();
