// crest-ui.jsx — design tokens, icons, shared components, mock data for Crest
// Exports to window. Forest-green refined fintech system.

const T = {
  ink:'#13241D', forest:'#1E3A2F', forest600:'#2C5544', forest700:'#234638',
  sage:'#6E9684', sage300:'#A6C2B4', sage100:'#DCE8E0', sage50:'#EEF3EF',
  cream:'#F4F1E8', paper:'#FFFFFF', card2:'#FBFAF4', line:'#E7E2D6', lineSoft:'#EFEBE0',
  brass:'#A8854E', brassLt:'#C7A877', brassBg:'#F0E7D6',
  pos:'#2E7D5B', neg:'#B25548', posBg:'#E6F0EA', negBg:'#F6E7E3',
  strong:'#15261E', text:'#33433B', muted:'#6E7C74', faint:'#9BA89F',
  font:"'Schibsted Grotesk', -apple-system, system-ui, sans-serif",
  serif:"'Newsreader', Georgia, serif",
};

/* ── Icons ─────────────────────────────────────────────────── */
const ICONS = {
  home:'M3.2 11 12 3.5l8.8 7.5M5.4 9.3V20H10v-5.4h4V20h4.6V9.3',
  card:'M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5zM3 10h18M7 14.5h3',
  chart:'M5 20V11M12 20V5M19 20v-6M3.5 20h17',
  user:'M12 12.2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6ZM4.8 20a7.2 7.2 0 0 1 14.4 0',
  up:'M12 19.5V5M6 11l6-6 6 6',
  down:'M12 5v14.5M18 13.5l-6 6-6-6',
  plus:'M12 5.5v13M5.5 12h13',
  chevR:'M9.5 6l6 6-6 6',
  chevL:'M14.5 6l-6 6 6 6',
  close:'M6.5 6.5l11 11M17.5 6.5l-11 11',
  check:'M5 12.5l4.5 4.5L19 7',
  bell:'M6.5 9.5a5.5 5.5 0 0 1 11 0c0 4.5 1.8 5.5 1.8 5.5H4.7s1.8-1 1.8-5.5ZM10 20a2 2 0 0 0 4 0',
  search:'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4',
  shield:'M12 3.2l7 2.8v5.2c0 4.8-3 7.6-7 9.6-4-2-7-4.8-7-9.6V6z',
  doc:'M7 3.5h6.5L18 8v12.5H7zM13.5 3.5V8H18',
  eye:'M2.5 12s3.6-6.5 9.5-6.5S21.5 12 21.5 12s-3.6 6.5-9.5 6.5S2.5 12 2.5 12Z',
  send:'M21 3.5L10.5 14M21 3.5l-6.5 17.5-3.9-7.6-7.6-3.9z',
  clock:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3 1.8',
  pin:'M12 21s6.5-5.2 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.8 6.5 11 6.5 11ZM12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z',
  sliders:'M5 8h7M16 8h3M5 16h3M12 16h7M12 6.2v3.6M8 14.2v3.6',
  gear:'M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM19.4 12c0-.5 0-1-.1-1.4l1.7-1.3-1.7-3-2 .8a6.6 6.6 0 0 0-2.4-1.4L14.5 3.5h-3.4l-.4 2.2a6.6 6.6 0 0 0-2.4 1.4l-2-.8-1.7 3L6.3 10.6c-.1.5-.1.9-.1 1.4s0 .9.1 1.4l-1.7 1.3 1.7 3 2-.8a6.6 6.6 0 0 0 2.4 1.4l.4 2.2h3.4l.4-2.2a6.6 6.6 0 0 0 2.4-1.4l2 .8 1.7-3-1.7-1.3c.1-.5.1-.9.1-1.4Z',
  scan:'M4 8.5V6a2 2 0 0 1 2-2h2.5M15.5 4H18a2 2 0 0 1 2 2v2.5M20 15.5V18a2 2 0 0 1-2 2h-2.5M8.5 20H6a2 2 0 0 1-2-2v-2.5M7 12h10',
  arrowR:'M5 12h14M13 6l6 6-6 6',
  copy:'M9 9.5A1.5 1.5 0 0 1 10.5 8h7A1.5 1.5 0 0 1 19 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 9 18.5zM5 15.5A1.5 1.5 0 0 1 5 14V5.5A1.5 1.5 0 0 1 6.5 4H15',
  share:'M16 6l-4-3-4 3M12 3v12M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12',
  flag:'M6 21V4M6 4.5h11l-2 3.5 2 3.5H6',
};

function Icon({ name, size = 22, sw = 1.9, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display:'block', flexShrink:0 }}>
      <path d={ICONS[name]} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// snowflake / freeze glyph
function FreezeGlyph({ size = 20, color = '#fff', sw = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display:'block' }}>
      <g stroke={color} strokeWidth={sw} strokeLinecap="round">
        <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/>
        <path d="M12 6.2l2.2-2M12 6.2l-2.2-2M12 17.8l2.2 2M12 17.8l-2.2 2"/>
        <path d="M6.5 8.8l-3 .2M6.5 15.2l-3-.2M17.5 8.8l3 .2M17.5 15.2l3-.2"/>
      </g>
    </svg>
  );
}

// Crest logomark — official "C + Monte Titano" mark (pre-tinted PNGs)
const MARK_AR = 0.84; // width / height of the trimmed logo
function lum(hex) {
  if (typeof hex !== 'string' || hex[0] !== '#' || hex.length < 7) return 0;
  return 0.299*parseInt(hex.slice(1,3),16) + 0.587*parseInt(hex.slice(3,5),16) + 0.114*parseInt(hex.slice(5,7),16);
}
function Mark({ size = 28, color = T.forest }) {
  const h = size, w = Math.round(size * MARK_AR);
  const src = lum(color) > 150
    ? (window.CREST_MARK_CREAM  || 'assets/crest-mark-cream.png')
    : (window.CREST_MARK_FOREST || 'assets/crest-mark-forest.png');
  return <img src={src} alt="Crest" width={w} height={h} style={{ display:'inline-block', width:w, height:h, objectFit:'contain', flexShrink:0 }} />;
}

function Wordmark({ color = T.forest, size = 22 }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
      <Mark size={size * 1.05} color={color} />
      <span style={{ fontFamily:T.font, fontWeight:700, fontSize:size, letterSpacing:-0.4, color }}>Crest</span>
    </span>
  );
}

/* ── Buttons ───────────────────────────────────────────────── */
function Button({ children, onClick, variant = 'primary', size = 'lg', icon, full = true, disabled, style = {} }) {
  const base = {
    display:'flex', alignItems:'center', justifyContent:'center', gap:9,
    fontFamily:T.font, fontWeight:600, cursor: disabled ? 'default' : 'pointer',
    border:'none', borderRadius:16, transition:'transform .12s, filter .15s, background .15s',
    width: full ? '100%' : 'auto', userSelect:'none', WebkitTapHighlightColor:'transparent',
    opacity: disabled ? 0.45 : 1,
  };
  const sizes = {
    lg:{ height:54, fontSize:16.5, padding:'0 22px' },
    md:{ height:46, fontSize:15, padding:'0 18px', borderRadius:13 },
    sm:{ height:38, fontSize:14, padding:'0 14px', borderRadius:11 },
  };
  const variants = {
    primary:{ background:T.forest, color:'#F4F1E8', boxShadow:'0 8px 22px rgba(30,58,47,.26)' },
    brass:{ background:T.brass, color:'#FBF7EE', boxShadow:'0 8px 22px rgba(168,133,78,.28)' },
    soft:{ background:T.sage100, color:T.forest },
    outline:{ background:'transparent', color:T.forest, boxShadow:`inset 0 0 0 1.5px ${T.line}` },
    ghost:{ background:'transparent', color:T.forest },
    danger:{ background:T.negBg, color:T.neg },
  };
  return (
    <button disabled={disabled} onClick={onClick}
      onPointerDown={e => { if (!disabled) e.currentTarget.style.transform = 'scale(.975)'; }}
      onPointerUp={e => e.currentTarget.style.transform = ''}
      onPointerLeave={e => e.currentTarget.style.transform = ''}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 18} sw={2} />}
      {children}
    </button>
  );
}

function IconBtn({ name, onClick, color = T.forest, bg = T.sage100, size = 42, iconSize = 20, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width:size, height:size, borderRadius:size/2.6, background:bg, color, border:'none',
      display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
      flexShrink:0, WebkitTapHighlightColor:'transparent', transition:'transform .12s',
      ...style,
    }}
      onPointerDown={e => e.currentTarget.style.transform = 'scale(.92)'}
      onPointerUp={e => e.currentTarget.style.transform = ''}
      onPointerLeave={e => e.currentTarget.style.transform = ''}>
      <Icon name={name} size={iconSize} sw={2} />
    </button>
  );
}

/* ── Header ────────────────────────────────────────────────── */
function Header({ title, onBack, right, sub, dark }) {
  const fg = dark ? '#F4F1E8' : T.strong;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'4px 20px 14px', minHeight:48 }}>
      {onBack && (
        <button onClick={onBack} style={{
          width:40, height:40, marginLeft:-8, borderRadius:13, border:'none', cursor:'pointer',
          background: dark ? 'rgba(255,255,255,.12)' : T.sage100, color:fg,
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
        }}>
          <Icon name="chevL" size={20} sw={2.2} />
        </button>
      )}
      <div style={{ flex:1, minWidth:0 }}>
        {title && <div style={{ fontFamily:T.font, fontWeight:700, fontSize:19, letterSpacing:-0.3, color:fg }}>{title}</div>}
        {sub && <div style={{ fontFamily:T.font, fontSize:13, color: dark ? 'rgba(244,241,232,.6)' : T.muted, marginTop:1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

/* ── Tab bar ───────────────────────────────────────────────── */
function TabBar({ active, onTab }) {
  const tabs = [
    { id:'home', icon:'home', label:'Home' },
    { id:'card', icon:'card', label:'Carta' },
    { id:'analysis', icon:'chart', label:'Analisi' },
    { id:'profile', icon:'user', label:'Profilo' },
  ];
  return (
    <div style={{
      flexShrink:0, height:64, paddingBottom:18, background:'rgba(251,250,244,.86)',
      backdropFilter:'blur(18px) saturate(160%)', WebkitBackdropFilter:'blur(18px) saturate(160%)',
      borderTop:`1px solid ${T.lineSoft}`, display:'flex', alignItems:'flex-start', paddingTop:8,
    }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)} style={{
            flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3,
            background:'none', border:'none', cursor:'pointer', color: on ? T.forest : T.faint,
            WebkitTapHighlightColor:'transparent', transition:'color .15s',
          }}>
            <Icon name={t.icon} size={24} sw={on ? 2.2 : 1.9} />
            <span style={{ fontFamily:T.font, fontSize:10.5, fontWeight: on ? 700 : 500, letterSpacing:0.1 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Payment card visual ───────────────────────────────────── */
function CrestCard({ frozen, holder = 'M. Rossi', last4 = '3017', variant = 'forest', w = '100%', compact }) {
  const isMetal = variant === 'metal';
  const bg = isMetal
    ? 'linear-gradient(135deg,#1B3327 0%,#2C5544 48%,#15261E 100%)'
    : 'linear-gradient(150deg,#234638 0%,#1E3A2F 55%,#152A21 100%)';
  return (
    <div style={{
      position:'relative', width:w, aspectRatio:'1.586', borderRadius:20, overflow:'hidden',
      background:bg, boxShadow:'0 18px 40px rgba(21,38,30,.32)', color:'#EFEAD9',
      fontFamily:T.font, transition:'filter .4s',
      filter: frozen ? 'saturate(.55) brightness(1.04)' : 'none',
    }}>
      {/* brass guilloché sheen */}
      <div style={{ position:'absolute', inset:0, background:
        'radial-gradient(120% 80% at 85% 8%, rgba(199,168,119,.30), transparent 55%), radial-gradient(90% 70% at 8% 95%, rgba(110,150,132,.22), transparent 55%)' }} />
      <div style={{ position:'absolute', inset:0, padding: compact ? '16px 18px' : '22px 24px', display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:7 }}>
            <Mark size={compact ? 19 : 24} color="#EFEAD9" />
            <span style={{ fontWeight:700, fontSize: compact ? 15 : 18, letterSpacing:-0.3 }}>Crest</span>
          </span>
          {/* contactless */}
          <svg width={compact?18:22} height={compact?18:22} viewBox="0 0 24 24" fill="none" style={{ opacity:.8 }}>
            <path d="M8 7a7 7 0 0 1 0 10M12 5a10 10 0 0 1 0 14M15.5 9a4 4 0 0 1 0 6" stroke="#EFEAD9" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ flex:1 }} />
        {!compact && (
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            {/* chip */}
            <div style={{ width:38, height:28, borderRadius:6, background:'linear-gradient(135deg,#D9C18C,#A8854E)', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,transparent 45%,rgba(0,0,0,.18) 46%,transparent 47%), linear-gradient(90deg,transparent 30%,rgba(0,0,0,.15) 31%,transparent 32%,transparent 68%,rgba(0,0,0,.15) 69%,transparent 70%)' }} />
            </div>
            <span style={{ fontFamily:T.serif, fontStyle:'italic', fontSize:16, color:'rgba(239,234,217,.8)' }}>Libertas</span>
          </div>
        )}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontFamily:T.font, fontSize: compact ? 13 : 15.5, letterSpacing:2, fontVariantNumeric:'tabular-nums' }}>
              4920 ·· ·· {last4}
            </div>
            <div style={{ fontSize: compact ? 10 : 11.5, letterSpacing:1.4, textTransform:'uppercase', color:'rgba(239,234,217,.66)', marginTop:5 }}>{holder}</div>
          </div>
          {!compact && <span style={{ fontFamily:T.serif, fontSize:13, color:'rgba(239,234,217,.55)' }}>MMXXVI</span>}
        </div>
      </div>
      {frozen && (
        <div style={{ position:'absolute', inset:0, background:'rgba(220,232,224,.34)', backdropFilter:'blur(2px)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8 }}>
          <div style={{ width:48, height:48, borderRadius:24, background:'rgba(21,38,30,.55)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <FreezeGlyph size={26} />
          </div>
          <span style={{ fontWeight:700, fontSize:13, color:'#15261E', letterSpacing:0.3 }}>CARTA BLOCCATA</span>
        </div>
      )}
    </div>
  );
}

/* ── Misc bits ─────────────────────────────────────────────── */
function Avatar({ label, color = T.forest, bg = T.sage100, size = 44 }) {
  return (
    <div style={{ width:size, height:size, borderRadius:size/2.7, background:bg, color,
      display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
      fontFamily:T.font, fontWeight:700, fontSize:size*0.4 }}>{label}</div>
  );
}

function Eyebrow({ children, color = T.brass }) {
  return <div style={{ fontFamily:T.font, fontSize:11.5, fontWeight:700, letterSpacing:1.6,
    textTransform:'uppercase', color }}>{children}</div>;
}

function money(n, sign) {
  const s = Math.abs(n).toLocaleString('it-IT', { minimumFractionDigits:2, maximumFractionDigits:2 });
  const pre = sign === '+' ? '+' : sign === '-' ? '−' : '';
  return `${pre}€ ${s}`;
}

function TxRow({ tx, onClick, last }) {
  const incoming = tx.amount > 0;
  return (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:13, width:'100%', background:'none', border:'none',
      padding:'12px 0', cursor:'pointer', textAlign:'left',
      borderBottom: last ? 'none' : `1px solid ${T.lineSoft}`, WebkitTapHighlightColor:'transparent',
    }}>
      <Avatar label={tx.icon} bg={tx.bg || T.sage100} color={tx.fg || T.forest} size={42} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:T.font, fontWeight:600, fontSize:15, color:T.strong, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{tx.name}</div>
        <div style={{ fontFamily:T.font, fontSize:12.5, color:T.faint, marginTop:1 }}>{tx.meta}</div>
      </div>
      <div style={{ fontFamily:T.font, fontWeight:700, fontSize:15, fontVariantNumeric:'tabular-nums',
        color: incoming ? T.pos : T.strong }}>
        {money(tx.amount, incoming ? '+' : '-')}
      </div>
    </button>
  );
}

/* ── Mock data ─────────────────────────────────────────────── */
const TX = [
  { id:'t1', name:'Stipendio luglio', meta:'Oggi · 09:14', amount:1900, icon:'S', bg:T.posBg, fg:T.pos, cat:'Entrate', note:'Bonifico in entrata' },
  { id:'t2', name:'Coop Borgo Maggiore', meta:'Ieri · 18:35', amount:-43, icon:'C', cat:'Spesa', note:'Pagamento carta' },
  { id:'t3', name:'Marco R.', meta:'Ieri · 15:02', amount:-80, icon:'M', bg:T.brassBg, fg:T.brass, cat:'Trasferimenti', note:'Trasferimento istantaneo' },
  { id:'t4', name:'Trenitalia', meta:'2 lug · 08:10', amount:-22.5, icon:'T', cat:'Trasporti', note:'Pagamento carta' },
  { id:'t5', name:'Affitto luglio', meta:'1 lug · 09:00', amount:-650, icon:'A', cat:'Casa', note:'Pagamento programmato' },
  { id:'t6', name:'Spotify', meta:'30 giu · 12:00', amount:-10.99, icon:'S', cat:'Abbonamenti', note:'Addebito ricorrente' },
];

const RECIPIENTS = [
  { id:'r1', name:'Giulia Bianchi', meta:'Crest · @giulia', icon:'G', bg:T.sage100, fg:T.forest },
  { id:'r2', name:'Marco Rossi', meta:'Crest · @marcor', icon:'M', bg:T.brassBg, fg:T.brass },
  { id:'r3', name:'Affitto · Locatore', meta:'SM76 ···· 8841', icon:'A', bg:T.sage100, fg:T.forest },
  { id:'r4', name:'Luca Verdi', meta:'IT60 ···· 2210', icon:'L', bg:T.sage100, fg:T.forest },
];

const BUDGET = [
  { cat:'Spesa', amount:420, pct:34, color:T.forest },
  { cat:'Trasporti', amount:180, pct:14, color:T.brass },
  { cat:'Casa', amount:640, pct:52, color:T.sage },
];

Object.assign(window, {
  T, Icon, FreezeGlyph, Mark, Wordmark, Button, IconBtn, Header, TabBar,
  CrestCard, Avatar, Eyebrow, money, TxRow, TX, RECIPIENTS, BUDGET,
});
