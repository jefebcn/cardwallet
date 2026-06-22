// crest-send.jsx — send & receive money flows. Depends on crest-ui.jsx globals.

/* ── Send 1 · recipient ────────────────────────────────────── */
function SendRecipient({ go, setFlow }) {
  const [q, setQ] = React.useState('');
  const list = RECIPIENTS.filter(r => r.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Invia denaro" sub="A chi vuoi inviare?" onBack={() => go('home')} />
      <div style={{ padding:'4px 20px 16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:9, height:48, borderRadius:13, padding:'0 14px', background:'#fff', border:`1.5px solid ${T.line}` }}>
          <Icon name="search" size={19} color={T.faint} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Nome, @username o IBAN"
            style={{ flex:1, border:'none', outline:'none', background:'none', fontFamily:T.font, fontSize:15.5, color:T.strong }} />
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'0 20px', minHeight:0 }}>
        <div style={{ fontFamily:T.font, fontSize:12, fontWeight:700, letterSpacing:0.8, color:T.muted, margin:'4px 0 6px' }}>RECENTI</div>
        <div style={{ background:'#fff', borderRadius:16, padding:'4px 16px', border:`1px solid ${T.lineSoft}` }}>
          {list.map((r, i) => (
            <button key={r.id} onClick={() => { setFlow(f => ({ ...f, to:r })); go('send-amount'); }} style={{
              display:'flex', alignItems:'center', gap:13, width:'100%', background:'none', border:'none', cursor:'pointer',
              padding:'12px 0', textAlign:'left', borderBottom: i === list.length-1 ? 'none' : `1px solid ${T.lineSoft}`, WebkitTapHighlightColor:'transparent' }}>
              <Avatar label={r.icon} bg={r.bg} color={r.fg} size={44} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:T.font, fontWeight:600, fontSize:15.5, color:T.strong }}>{r.name}</div>
                <div style={{ fontFamily:T.font, fontSize:12.5, color:T.faint, marginTop:1 }}>{r.meta}</div>
              </div>
              <Icon name="chevR" size={20} color={T.faint} />
            </button>
          ))}
          {list.length === 0 && <div style={{ padding:'24px 0', textAlign:'center', fontFamily:T.font, fontSize:14, color:T.faint }}>Nessun contatto trovato</div>}
        </div>
        <button onClick={() => { setFlow(f => ({ ...f, to:{ id:'new', name:'Nuovo IBAN', meta:'Inserisci coordinate', icon:'+', bg:T.brassBg, fg:T.brass } })); go('send-amount'); }}
          style={{ display:'flex', alignItems:'center', gap:13, width:'100%', marginTop:14, background:'none', border:`1.5px dashed ${T.line}`, borderRadius:16, padding:'14px 16px', cursor:'pointer', WebkitTapHighlightColor:'transparent' }}>
          <div style={{ width:44, height:44, borderRadius:13, background:T.sage100, display:'flex', alignItems:'center', justifyContent:'center', color:T.forest }}>
            <Icon name="plus" size={22} sw={2.2} />
          </div>
          <span style={{ fontFamily:T.font, fontWeight:600, fontSize:15, color:T.text }}>Invia a un nuovo IBAN</span>
        </button>
      </div>
    </div>
  );
}

/* ── Send 2 · amount keypad ────────────────────────────────── */
function SendAmount({ go, flow, setFlow, balance }) {
  const [amt, setAmt] = React.useState('');
  const press = (k) => {
    setAmt(cur => {
      if (k === 'del') return cur.slice(0, -1);
      if (k === ',') return cur.includes(',') ? cur : (cur || '0') + ',';
      if (cur.includes(',') && cur.split(',')[1].length >= 2) return cur;
      if (cur === '0' && k !== ',') return k;
      return cur + k;
    });
  };
  const num = parseFloat((amt || '0').replace(',', '.')) || 0;
  const ok = num > 0 && num <= balance;
  const keys = ['1','2','3','4','5','6','7','8','9',',','0','del'];
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header onBack={() => go('send-recipient')} title={flow.to?.name} sub={flow.to?.meta} right={<Avatar label={flow.to?.icon} bg={flow.to?.bg} color={flow.to?.fg} size={40} />} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:0 }}>
        <div style={{ fontFamily:T.font, fontSize:13, fontWeight:600, color:T.muted, marginBottom:8 }}>Importo da inviare</div>
        <div style={{ fontFamily:T.font, fontWeight:700, fontSize:56, letterSpacing:-2, color: num ? T.strong : T.faint, fontVariantNumeric:'tabular-nums' }}>
          € {amt || '0'}
        </div>
        <div style={{ marginTop:12, padding:'6px 14px', borderRadius:20, background: ok || !num ? T.sage50 : T.negBg,
          fontFamily:T.font, fontSize:13, fontWeight:600, color: ok || !num ? T.muted : T.neg }}>
          {num > balance ? 'Saldo insufficiente' : `Disponibile · ${money(balance)}`}
        </div>
        <div style={{ display:'flex', gap:9, marginTop:18 }}>
          {[20,50,100].map(v => (
            <button key={v} onClick={() => setAmt(String(v))} style={{ padding:'8px 16px', borderRadius:12, border:`1.5px solid ${T.line}`,
              background:'#fff', fontFamily:T.font, fontWeight:600, fontSize:14, color:T.forest, cursor:'pointer' }}>€{v}</button>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 14px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:4 }}>
          {keys.map(k => (
            <button key={k} onClick={() => press(k)} style={{ height:58, background:'none', border:'none', cursor:'pointer',
              fontFamily:T.font, fontWeight:600, fontSize:24, color:T.strong, display:'flex', alignItems:'center', justifyContent:'center',
              borderRadius:14, WebkitTapHighlightColor:'transparent' }}
              onPointerDown={e => e.currentTarget.style.background = T.sage100}
              onPointerUp={e => e.currentTarget.style.background = 'none'}
              onPointerLeave={e => e.currentTarget.style.background = 'none'}>
              {k === 'del' ? <Icon name="chevL" size={22} sw={2.2} /> : k}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:'8px 20px 32px' }}>
        <Button onClick={() => { setFlow(f => ({ ...f, amount:num })); go('send-review'); }} disabled={!ok}>Continua</Button>
      </div>
    </div>
  );
}

/* ── Send 3 · review ───────────────────────────────────────── */
function SendReview({ go, flow, confirmSend }) {
  const fee = 0;
  const Row = ({ k, v, strong }) => (
    <div style={{ display:'flex', justifyContent:'space-between', padding:'13px 0', borderBottom:`1px solid ${T.lineSoft}` }}>
      <span style={{ fontFamily:T.font, fontSize:14.5, color:T.muted }}>{k}</span>
      <span style={{ fontFamily:T.font, fontSize:14.5, fontWeight: strong ? 700 : 600, color:T.strong, fontVariantNumeric:'tabular-nums' }}>{v}</span>
    </div>
  );
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Conferma" sub="Controlla prima di inviare" onBack={() => go('send-amount')} />
      <div style={{ flex:1, overflowY:'auto', padding:'12px 20px 0', minHeight:0 }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10, padding:'18px 0 24px' }}>
          <Avatar label={flow.to?.icon} bg={flow.to?.bg} color={flow.to?.fg} size={62} />
          <div style={{ textAlign:'center' }}>
            <div style={{ fontFamily:T.font, fontSize:13, color:T.muted }}>Stai inviando a</div>
            <div style={{ fontFamily:T.font, fontWeight:700, fontSize:18, color:T.strong, marginTop:2 }}>{flow.to?.name}</div>
          </div>
          <div style={{ fontFamily:T.font, fontWeight:700, fontSize:42, letterSpacing:-1.5, color:T.forest, fontVariantNumeric:'tabular-nums' }}>
            {money(flow.amount)}
          </div>
        </div>
        <div style={{ background:'#fff', borderRadius:16, padding:'4px 16px', border:`1px solid ${T.lineSoft}` }}>
          <Row k="Da" v="Conto Crest · 3017" />
          <Row k="Destinatario" v={flow.to?.meta} />
          <Row k="Commissione" v="Gratis" />
          <Row k="Arrivo" v="Istantaneo" />
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:9, marginTop:14, padding:'12px 14px', borderRadius:13, background:T.sage50 }}>
          <Icon name="shield" size={18} color={T.forest} />
          <span style={{ fontFamily:T.font, fontSize:12.5, color:T.text }}>Trasferimento protetto. Riceverai conferma in tempo reale.</span>
        </div>
      </div>
      <div style={{ padding:'14px 20px 32px', borderTop:`1px solid ${T.lineSoft}` }}>
        <SlideToSend onDone={() => { confirmSend(flow); go('send-loading'); }} />
      </div>
    </div>
  );
}

// slide-to-confirm control
function SlideToSend({ onDone }) {
  const trackRef = React.useRef(null);
  const [x, setX] = React.useState(0);
  const [drag, setDrag] = React.useState(false);
  const KNOB = 52;
  const start = () => setDrag(true);
  const move = (clientX) => {
    if (!drag || !trackRef.current) return;
    const r = trackRef.current.getBoundingClientRect();
    const max = r.width - KNOB - 8;
    setX(Math.max(0, Math.min(max, clientX - r.left - KNOB/2)));
  };
  const end = () => {
    if (!trackRef.current) return;
    const r = trackRef.current.getBoundingClientRect();
    const max = r.width - KNOB - 8;
    if (x > max * 0.82) { setX(max); onDone(); } else setX(0);
    setDrag(false);
  };
  return (
    <div ref={trackRef} onPointerMove={e => move(e.clientX)} onPointerUp={end} onPointerLeave={end}
      style={{ position:'relative', height:60, borderRadius:18, background:T.forest, overflow:'hidden', userSelect:'none', touchAction:'none' }}>
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:T.font, fontWeight:600, fontSize:15.5, color:'rgba(244,241,232,.7)', opacity: 1 - x/120 }}>
        Scorri per inviare →
      </div>
      <div onPointerDown={start} style={{ position:'absolute', top:4, left:4, width:KNOB, height:KNOB, borderRadius:14,
        background:T.brass, display:'flex', alignItems:'center', justifyContent:'center', cursor:'grab',
        transform:`translateX(${x}px)`, transition: drag ? 'none' : 'transform .25s', touchAction:'none' }}>
        <Icon name="send" size={22} color="#FBF7EE" />
      </div>
    </div>
  );
}

/* ── Send 4 · processing ───────────────────────────────────── */
function SendLoading({ go }) {
  React.useEffect(() => { const id = setTimeout(() => go('send-success'), 1500); return () => clearTimeout(id); }, []);
  return (
    <div style={{ height:874, background:`linear-gradient(165deg,${T.forest} 0%,${T.forest700} 60%,${T.ink} 100%)`,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:22, color:'#F4F1E8' }}>
      <span className="crest-spin" style={{ width:46, height:46, borderRadius:23, border:'3px solid rgba(255,255,255,.2)', borderTopColor:T.brassLt }} />
      <div style={{ fontFamily:T.font, fontWeight:600, fontSize:17 }}>Invio in corso…</div>
    </div>
  );
}

/* ── Send 5 · success ──────────────────────────────────────── */
function SendSuccess({ go, flow }) {
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'0 28px' }}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20 }}>
        <div className="crest-pop" style={{ width:92, height:92, borderRadius:46, background:T.pos,
          display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 14px 36px ${T.pos}55` }}>
          <Icon name="check" size={46} color="#fff" sw={2.6} />
        </div>
        <div>
          <h1 style={{ fontFamily:T.font, fontWeight:700, fontSize:26, color:T.strong, margin:0, letterSpacing:-0.5 }}>Inviati {money(flow.amount)}</h1>
          <p style={{ fontFamily:T.font, fontSize:15, color:T.muted, marginTop:8 }}>a {flow.to?.name} · istantaneo</p>
        </div>
        <div style={{ width:'100%', background:'#fff', borderRadius:16, padding:'14px 18px', border:`1px solid ${T.lineSoft}`, display:'flex', alignItems:'center', gap:12, textAlign:'left' }}>
          <Avatar label={flow.to?.icon} bg={flow.to?.bg} color={flow.to?.fg} size={42} />
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:T.font, fontWeight:600, fontSize:14.5, color:T.strong }}>{flow.to?.name}</div>
            <div style={{ fontFamily:T.font, fontSize:12.5, color:T.faint }}>Oggi · adesso · Gratis</div>
          </div>
          <div style={{ fontFamily:T.font, fontWeight:700, fontSize:15, color:T.strong }}>{money(flow.amount, '-')}</div>
        </div>
      </div>
      <div style={{ paddingBottom:46, width:'100%', display:'flex', flexDirection:'column', gap:10 }}>
        <Button onClick={() => go('home')}>Torna alla home</Button>
        <Button variant="ghost" onClick={() => go('send-recipient')}>Invia ancora</Button>
      </div>
    </div>
  );
}

/* ── Receive ───────────────────────────────────────────────── */
function Receive({ go }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Ricevi denaro" sub="Condividi le tue coordinate" onBack={() => go('home')} />
      <div style={{ flex:1, overflowY:'auto', padding:'12px 20px 0', minHeight:0 }}>
        <div style={{ background:'#fff', borderRadius:20, padding:'26px 22px', border:`1px solid ${T.lineSoft}`, display:'flex', flexDirection:'column', alignItems:'center', gap:18 }}>
          {/* QR placeholder */}
          <div style={{ width:168, height:168, borderRadius:18, background:T.forest, padding:14, display:'grid', gridTemplateColumns:'repeat(9,1fr)', gridTemplateRows:'repeat(9,1fr)', gap:3 }}>
            {Array.from({ length:81 }).map((_, i) => {
              const corner = (r,c) => (r<3&&c<3)||(r<3&&c>5)||(r>5&&c<3);
              const r = Math.floor(i/9), c = i%9;
              const on = corner(r,c) ? !((r===1&&c>=0&&c<=2)||(c===1&&r>=0&&r<=2)) : Math.random() > 0.5;
              return <div key={i} style={{ background: on ? '#EFEAD9' : 'transparent', borderRadius:2 }} />;
            })}
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontFamily:T.font, fontWeight:700, fontSize:17, color:T.strong }}>Mario Rossi</div>
            <div style={{ fontFamily:T.font, fontSize:13.5, color:T.muted, marginTop:2 }}>@mariorossi · Crest</div>
          </div>
        </div>
        <div style={{ marginTop:16, background:'#fff', borderRadius:16, border:`1px solid ${T.lineSoft}`, overflow:'hidden' }}>
          {[['IBAN','SM76 K085 4009 8120 0003 0017'],['Intestatario','Mario Rossi'],['BIC/SWIFT','CRSTSMSMXXX']].map(([k,v], i) => (
            <div key={k} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderBottom: i<2 ? `1px solid ${T.lineSoft}` : 'none' }}>
              <div>
                <div style={{ fontFamily:T.font, fontSize:11.5, fontWeight:700, letterSpacing:0.6, color:T.faint }}>{k.toUpperCase()}</div>
                <div style={{ fontFamily:T.font, fontSize:14.5, fontWeight:600, color:T.strong, marginTop:2 }}>{v}</div>
              </div>
              {i === 0 && <IconBtn name={copied ? 'check' : 'copy'} onClick={copy} size={38} iconSize={18} bg={copied ? T.posBg : T.sage100} color={copied ? T.pos : T.forest} />}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'14px 20px 32px' }}>
        <Button icon="share" onClick={copy}>{copied ? 'Copiato negli appunti' : 'Condividi coordinate'}</Button>
      </div>
    </div>
  );
}

Object.assign(window, { SendRecipient, SendAmount, SendReview, SendLoading, SendSuccess, Receive });
