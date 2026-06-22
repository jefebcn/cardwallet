// crest-exchange.jsx — Currency exchange screen. Depends on crest-ui.jsx globals.

const CURRENCIES = [
  { code:'USD', name:'Dollaro USA',    flag:'🇺🇸', fallback:1.087 },
  { code:'GBP', name:'Sterlina UK',   flag:'🇬🇧', fallback:0.853 },
  { code:'CHF', name:'Franco Svizzero',flag:'🇨🇭', fallback:0.962 },
  { code:'JPY', name:'Yen Giapponese', flag:'🇯🇵', fallback:162.4 },
  { code:'PLN', name:'Zloty Polacco',  flag:'🇵🇱', fallback:4.31  },
  { code:'SEK', name:'Corona Svedese', flag:'🇸🇪', fallback:11.22 },
];

function ExchangeScreen({ go, balance }) {
  const [rates, setRates]   = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [sel, setSel]       = React.useState('USD');
  const [amt, setAmt]       = React.useState('');
  const [done, setDone]     = React.useState(false);

  React.useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/EUR')
      .then(r => r.json())
      .then(d => { if (d.result === 'success') setRates(d.rates); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cur   = CURRENCIES.find(c => c.code === sel);
  const rate  = rates ? (rates[sel] || cur.fallback) : cur.fallback;
  const num   = parseFloat(amt.replace(',','.')) || 0;
  const fee   = +(num * 0.015).toFixed(2);  // 1.5% Standard, 0.5% Plus
  const recv  = +((num - fee) * rate).toFixed(2);
  const ok    = num > 0 && num + fee <= balance;

  if (done) return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'0 28px' }}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20 }}>
        <div className="crest-pop" style={{ width:88, height:88, borderRadius:44, background:T.pos, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 14px 36px ${T.pos}55` }}>
          <Icon name="check" size={44} color="#fff" sw={2.6} />
        </div>
        <div>
          <h1 style={{ fontFamily:T.font, fontWeight:700, fontSize:26, color:T.strong, margin:0, letterSpacing:-0.5 }}>Cambio completato</h1>
          <p style={{ fontFamily:T.font, fontSize:15, color:T.muted, marginTop:8 }}>
            Hai ricevuto <b style={{ color:T.forest }}>{cur.flag} {recv.toLocaleString('it-IT',{minimumFractionDigits:2})} {sel}</b>
          </p>
        </div>
      </div>
      <div style={{ paddingBottom:46, width:'100%' }}>
        <Button onClick={() => go('home')}>Torna alla home</Button>
      </div>
    </div>
  );

  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Cambio valuta" sub={loading ? 'Carico tassi live…' : `Tassi aggiornati · EUR base`} onBack={() => go('home')} />

      <div style={{ flex:1, overflowY:'auto', padding:'8px 20px 0', minHeight:0 }}>
        {/* Rate strip */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4, marginBottom:20, scrollbarWidth:'none' }}>
          {CURRENCIES.map(c => {
            const r = rates ? (rates[c.code] || c.fallback) : c.fallback;
            return (
              <button key={c.code} onClick={() => setSel(c.code)} style={{
                flexShrink:0, padding:'9px 14px', borderRadius:14, cursor:'pointer',
                background: sel===c.code ? T.forest : '#fff', border:`1.5px solid ${sel===c.code ? T.forest : T.line}`,
                transition:'all .15s', WebkitTapHighlightColor:'transparent' }}>
                <div style={{ fontFamily:T.font, fontSize:16 }}>{c.flag}</div>
                <div style={{ fontFamily:T.font, fontWeight:700, fontSize:13, color: sel===c.code ? '#F4F1E8' : T.strong, marginTop:3 }}>{c.code}</div>
                <div style={{ fontFamily:T.font, fontSize:11, color: sel===c.code ? 'rgba(244,241,232,.7)' : T.faint, fontVariantNumeric:'tabular-nums' }}>{r.toFixed(3)}</div>
              </button>
            );
          })}
        </div>

        {/* Amount input */}
        <div style={{ background:'#fff', borderRadius:20, padding:'20px', border:`1px solid ${T.lineSoft}`, marginBottom:16 }}>
          <div style={{ fontFamily:T.font, fontSize:12.5, fontWeight:700, letterSpacing:.6, color:T.muted, marginBottom:10 }}>HAI (EUR)</div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontFamily:T.font, fontSize:32, fontWeight:700, color:T.faint }}>€</span>
            <input value={amt} onChange={e => setAmt(e.target.value.replace(/[^0-9,]/g,''))}
              placeholder="0,00" type="text" inputMode="decimal"
              style={{ flex:1, border:'none', outline:'none', background:'none', fontFamily:T.font, fontWeight:700, fontSize:36, color:T.strong, minWidth:0, fontVariantNumeric:'tabular-nums' }} />
          </div>
          <div style={{ fontFamily:T.font, fontSize:12.5, color:T.faint, marginTop:6 }}>
            Disponibile: {money(balance)}
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:16 }}>
          <div style={{ width:38, height:38, borderRadius:12, background:T.forest, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name="down" size={20} color="#F4F1E8" sw={2.2} />
          </div>
        </div>

        {/* Result */}
        <div style={{ background:'#fff', borderRadius:20, padding:'20px', border:`1px solid ${T.lineSoft}`, marginBottom:16 }}>
          <div style={{ fontFamily:T.font, fontSize:12.5, fontWeight:700, letterSpacing:.6, color:T.muted, marginBottom:10 }}>RICEVI ({sel})</div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontFamily:T.font, fontSize:32, fontWeight:700, color:T.faint }}>{cur.flag}</span>
            <span style={{ fontFamily:T.font, fontWeight:700, fontSize:36, color: num ? T.forest : T.faint, fontVariantNumeric:'tabular-nums' }}>
              {recv > 0 ? recv.toLocaleString('it-IT', { minimumFractionDigits:2 }) : '0,00'}
            </span>
          </div>
        </div>

        {/* Fee breakdown */}
        {num > 0 && (
          <div style={{ background:T.sage50, borderRadius:14, padding:'14px 16px', marginBottom:14 }}>
            {[
              ['Importo','€ '+num.toFixed(2)],
              ['Commissione (1.5%)','€ '+fee.toFixed(2)],
              ['Tasso di cambio',`1 EUR = ${rate.toFixed(4)} ${sel}`],
            ].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', fontFamily:T.font, fontSize:13.5 }}>
                <span style={{ color:T.muted }}>{k}</span>
                <span style={{ fontWeight:600, color:T.strong }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', borderRadius:12, background:T.brassBg, marginBottom:4 }}>
          <Icon name="clock" size={16} color={T.brass} />
          <span style={{ fontFamily:T.font, fontSize:12, color:T.text }}>
            Commissione 0.5% con piano Plus o Premium
          </span>
        </div>
      </div>

      <div style={{ padding:'14px 20px 36px', borderTop:`1px solid ${T.lineSoft}` }}>
        <Button onClick={() => { if (ok) setDone(true); }} disabled={!ok}>
          {!num ? 'Inserisci un importo' : !ok ? 'Saldo insufficiente' : `Cambia ${money(num)} → ${cur.flag} ${sel}`}
        </Button>
      </div>
    </div>
  );
}

Object.assign(window, { ExchangeScreen });
