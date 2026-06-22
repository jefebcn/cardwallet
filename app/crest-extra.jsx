// crest-extra.jsx — Piano upgrade + Risparmio/obiettivi. Depends on crest-ui.jsx globals.

/* ── Piano / Upgrade ───────────────────────────────────────── */
function Plans({ go }) {
  const [sel, setSel] = React.useState('plus');
  const plans = [
    {
      id:'standard', name:'Standard', price:'Gratis', sub:'per sempre',
      color:T.sage, features:['IBAN sammarinese dedicato','Carta virtuale Crest','Trasferimenti tra utenti','App in italiano'],
    },
    {
      id:'plus', name:'Plus', price:'€ 3,99', sub:'/mese', highlight:true,
      color:T.forest, features:['Tutto di Standard','Carta fisica inclusa','Limiti più alti','Cambio valuta a tariffe migliori'],
    },
    {
      id:'premium', name:'Premium', price:'€ 8,99', sub:'/mese',
      color:T.brass, features:['Tutto di Plus','Assicurazione acquisti e viaggio','Supporto prioritario','Carta in metallo Libertas'],
    },
  ];
  const active = plans.find(p => p.id === sel);
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Scegli il tuo piano" sub="Prossimamente al lancio" onBack={() => go('profile')} />
      <div style={{ flex:1, overflowY:'auto', padding:'8px 20px 0', minHeight:0 }}>

        {/* plan cards row */}
        <div style={{ display:'flex', gap:10, marginBottom:22 }}>
          {plans.map(p => (
            <button key={p.id} onClick={() => setSel(p.id)} style={{
              flex:1, borderRadius:18, padding:'16px 10px', cursor:'pointer', border:'none', textAlign:'center',
              background: sel===p.id ? p.color : '#fff',
              boxShadow: sel===p.id ? `0 8px 22px ${p.color}44` : `inset 0 0 0 1.5px ${T.line}`,
              transition:'all .2s', WebkitTapHighlightColor:'transparent',
            }}>
              {p.highlight && sel!==p.id && (
                <div style={{ fontFamily:T.font, fontSize:9.5, fontWeight:700, letterSpacing:.8, color:T.brass, marginBottom:5 }}>POPOLARE</div>
              )}
              <div style={{ fontFamily:T.font, fontWeight:800, fontSize:17, color: sel===p.id ? '#F4F1E8' : T.strong, letterSpacing:-.3 }}>{p.name}</div>
              <div style={{ fontFamily:T.font, fontWeight:700, fontSize:15, color: sel===p.id ? 'rgba(244,241,232,.85)' : T.forest, marginTop:4 }}>{p.price}</div>
              <div style={{ fontFamily:T.font, fontSize:11, color: sel===p.id ? 'rgba(244,241,232,.6)' : T.faint }}>{p.sub}</div>
            </button>
          ))}
        </div>

        {/* feature list */}
        <div style={{ background:'#fff', borderRadius:18, padding:'6px 16px', border:`1px solid ${T.lineSoft}`, marginBottom:18 }}>
          {active.features.map((f, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:11, padding:'13px 0',
              borderBottom: i < active.features.length-1 ? `1px solid ${T.lineSoft}` : 'none' }}>
              <div style={{ width:26, height:26, borderRadius:8, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
                background: sel==='premium' ? T.brassBg : T.posBg, color: sel==='premium' ? T.brass : T.pos }}>
                <Icon name="check" size={15} sw={2.5} />
              </div>
              <span style={{ fontFamily:T.font, fontSize:14.5, color:T.strong }}>{f}</span>
            </div>
          ))}
        </div>

        {/* pre-launch note */}
        <div style={{ padding:'13px 15px', borderRadius:14, background:T.sage50, border:`1px solid ${T.sage100}`, marginBottom:20,
          display:'flex', gap:10 }}>
          <Icon name="clock" size={18} color={T.forest} />
          <span style={{ fontFamily:T.font, fontSize:12.5, lineHeight:1.5, color:T.text }}>
            Piani e prezzi sono indicativi e saranno attivati al lancio nel rispetto delle autorizzazioni necessarie. Nessun pagamento è richiesto ora.
          </span>
        </div>
      </div>

      <div style={{ padding:'12px 20px 36px', borderTop:`1px solid ${T.lineSoft}` }}>
        <Button
          variant={sel==='premium' ? 'brass' : 'primary'}
          onClick={() => go('profile')}
          icon="check">
          {sel==='standard' ? 'Resto con Standard' : `Unisciti alla lista · ${active.name}`}
        </Button>
      </div>
    </div>
  );
}

/* ── Risparmio / Obiettivi ─────────────────────────────────── */
function Savings({ go }) {
  const goals = [
    { id:'g1', name:'Vacanza estate', target:1200, saved:480, icon:'✈', color:T.forest },
    { id:'g2', name:'Fondo emergenza', target:3000, saved:2100, icon:'🛡', color:T.brass },
    { id:'g3', name:'Auto nuova', target:8000, saved:650, icon:'🚗', color:T.sage },
  ];
  const [active, setActive] = React.useState(null);
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Risparmio" sub="I tuoi obiettivi" onBack={() => go('home')}
        right={<IconBtn name="plus" onClick={() => {}} />} />
      <div style={{ flex:1, overflowY:'auto', padding:'8px 20px 24px', minHeight:0 }}>

        {/* total saved */}
        <div style={{ background:`linear-gradient(155deg,${T.forest} 0%,${T.forest700} 100%)`, borderRadius:22, padding:'22px', color:'#F4F1E8', marginBottom:20 }}>
          <div style={{ fontFamily:T.font, fontSize:13, color:'rgba(244,241,232,.62)' }}>Totale risparmiato</div>
          <div style={{ fontFamily:T.font, fontWeight:700, fontSize:36, letterSpacing:-1.2, marginTop:2, fontVariantNumeric:'tabular-nums' }}>€ 3.230,00</div>
          <div style={{ height:8, borderRadius:5, background:'rgba(255,255,255,.15)', overflow:'hidden', marginTop:16 }}>
            <div style={{ height:'100%', width:'40%', background:T.brassLt, borderRadius:5 }} />
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:7, fontFamily:T.font, fontSize:12, color:'rgba(244,241,232,.55)' }}>
            <span>€ 3.230 risparmiati</span><span>obiettivo: € 8.000</span>
          </div>
        </div>

        {/* goal cards */}
        <div style={{ fontFamily:T.font, fontWeight:700, fontSize:16, color:T.strong, marginBottom:12 }}>I tuoi obiettivi</div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {goals.map(g => {
            const pct = Math.round(g.saved / g.target * 100);
            return (
              <button key={g.id} onClick={() => setActive(active===g.id ? null : g.id)} style={{
                background:'#fff', borderRadius:18, padding:'16px 18px', border:`1px solid ${active===g.id ? g.color+'44' : T.lineSoft}`,
                cursor:'pointer', textAlign:'left', width:'100%', WebkitTapHighlightColor:'transparent', transition:'border .15s' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                  <div style={{ width:44, height:44, borderRadius:14, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
                    background:`${g.color}18`, fontSize:20 }}>{g.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:T.font, fontWeight:700, fontSize:15.5, color:T.strong }}>{g.name}</div>
                    <div style={{ fontFamily:T.font, fontSize:12.5, color:T.muted, marginTop:1 }}>
                      {money(g.saved)} di {money(g.target)}
                    </div>
                  </div>
                  <div style={{ fontFamily:T.font, fontWeight:800, fontSize:17, color:g.color }}>{pct}%</div>
                </div>
                <div style={{ height:8, borderRadius:5, background:T.sage50, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:g.color, borderRadius:5, transition:'width .5s' }} />
                </div>
                {active === g.id && (
                  <div style={{ marginTop:14, display:'flex', gap:9 }}>
                    <Button size="sm" full={false} style={{ flex:1 }} onClick={e => e.stopPropagation()}>Aggiungi fondi</Button>
                    <Button size="sm" variant="outline" full={false} style={{ flex:1 }} onClick={e => e.stopPropagation()}>Modifica</Button>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* new goal CTA */}
        <button onClick={() => {}} style={{ display:'flex', alignItems:'center', gap:13, width:'100%', marginTop:14,
          background:'none', border:`1.5px dashed ${T.line}`, borderRadius:18, padding:'16px', cursor:'pointer', WebkitTapHighlightColor:'transparent' }}>
          <div style={{ width:44, height:44, borderRadius:14, background:T.sage100, color:T.forest, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Icon name="plus" size={22} sw={2.2} />
          </div>
          <span style={{ fontFamily:T.font, fontWeight:600, fontSize:15, color:T.text }}>Crea un nuovo obiettivo</span>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Plans, Savings });
