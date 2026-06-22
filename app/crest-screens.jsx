// crest-screens.jsx — Home, Card, Transactions, Analysis, Profile, Roadmap, Compliance
// Depends on crest-ui.jsx globals.

/* ── Home ──────────────────────────────────────────────────── */
function Home({ go, balance, txs, openTx, userName = 'Mario Rossi' }) {
  const firstName = userName.split(' ')[0];
  const [hide, setHide] = React.useState(false);
  return (
    <div style={{ flex:1, overflowY:'auto', minHeight:0, background:T.cream }}>
      {/* forest header block */}
      <div style={{ background:`linear-gradient(168deg,${T.forest} 0%,${T.forest700} 100%)`, padding:'58px 20px 26px', color:'#F4F1E8',
        borderBottomLeftRadius:28, borderBottomRightRadius:28 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'center', gap:11 }}>
            <Avatar label={firstName.charAt(0)} bg="rgba(255,255,255,.14)" color="#EFEAD9" size={40} />
            <div>
              <div style={{ fontFamily:T.font, fontSize:12.5, color:'rgba(244,241,232,.62)' }}>Bentornato</div>
              <div style={{ fontFamily:T.font, fontWeight:700, fontSize:16 }}>{userName}</div>
            </div>
          </div>
          <IconBtn name="bell" onClick={() => go('profile')} bg="rgba(255,255,255,.12)" color="#EFEAD9" size={40} />
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontFamily:T.font, fontSize:13.5, color:'rgba(244,241,232,.62)' }}>Saldo disponibile</span>
          <button onClick={() => setHide(h => !h)} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(244,241,232,.62)', display:'flex', padding:2 }}>
            <Icon name="eye" size={16} />
          </button>
        </div>
        <div style={{ fontFamily:T.font, fontWeight:700, fontSize:42, letterSpacing:-1.5, marginTop:3, fontVariantNumeric:'tabular-nums' }}>
          {hide ? '€ ••••••' : money(balance)}
        </div>
        <div style={{ display:'flex', gap:9, marginTop:22 }}>
          {[['up','Invia','send-recipient'],['down','Ricevi','receive'],['scan','Risparmio','savings'],['arrowR','Cambia','exchange']].map(([ic,lb,dest]) => (
            <button key={lb} onClick={() => dest && go(dest)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:7,
              background:'none', border:'none', cursor:'pointer', color:'#EFEAD9', WebkitTapHighlightColor:'transparent' }}>
              <span style={{ width:50, height:50, borderRadius:16, background:'rgba(255,255,255,.13)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name={ic} size={22} sw={2.1} />
              </span>
              <span style={{ fontFamily:T.font, fontSize:12, fontWeight:600 }}>{lb}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding:'20px 20px 24px' }}>
        {/* card teaser */}
        <button onClick={() => go('card')} style={{ display:'flex', alignItems:'center', gap:14, width:'100%', background:'#fff', border:`1px solid ${T.lineSoft}`,
          borderRadius:18, padding:'14px', cursor:'pointer', marginBottom:20, WebkitTapHighlightColor:'transparent', textAlign:'left' }}>
          <div style={{ width:84, flexShrink:0 }}><CrestCard compact w="100%" /></div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:T.font, fontWeight:700, fontSize:15, color:T.strong }}>Carta virtuale</div>
            <div style={{ fontFamily:T.font, fontSize:12.5, color:T.muted, marginTop:2 }}>4920 ·· ·· 3017 · Attiva</div>
          </div>
          <Icon name="chevR" size={20} color={T.faint} />
        </button>

        {/* spending mini */}
        <button onClick={() => go('analysis')} style={{ width:'100%', background:'#fff', border:`1px solid ${T.lineSoft}`, borderRadius:18, padding:'16px 18px', cursor:'pointer', marginBottom:20, textAlign:'left', WebkitTapHighlightColor:'transparent' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <span style={{ fontFamily:T.font, fontWeight:700, fontSize:14.5, color:T.strong }}>Spese di giugno</span>
            <span style={{ fontFamily:T.font, fontWeight:700, fontSize:14.5, color:T.strong }}>€ 1.240</span>
          </div>
          <div style={{ display:'flex', height:9, borderRadius:6, overflow:'hidden', gap:2 }}>
            {BUDGET.map(b => <div key={b.cat} style={{ width:`${b.pct}%`, background:b.color }} />)}
          </div>
          <div style={{ display:'flex', gap:14, marginTop:11 }}>
            {BUDGET.map(b => (
              <span key={b.cat} style={{ display:'flex', alignItems:'center', gap:6, fontFamily:T.font, fontSize:12, color:T.muted }}>
                <span style={{ width:8, height:8, borderRadius:4, background:b.color }} />{b.cat}
              </span>
            ))}
          </div>
        </button>

        {/* recent tx */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
          <span style={{ fontFamily:T.font, fontWeight:700, fontSize:16, color:T.strong }}>Ultime operazioni</span>
          <button onClick={() => go('transactions')} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:T.font, fontWeight:600, fontSize:13.5, color:T.forest }}>Vedi tutte</button>
        </div>
        <div style={{ background:'#fff', borderRadius:18, padding:'2px 16px', border:`1px solid ${T.lineSoft}` }}>
          {txs.slice(0,4).map((t, i) => <TxRow key={t.id} tx={t} onClick={() => openTx(t)} last={i===3} />)}
        </div>
      </div>
    </div>
  );
}

/* ── Card ──────────────────────────────────────────────────── */
function CardScreen({ go, frozen, setFrozen }) {
  const [tab, setTab] = React.useState('virtual');
  const Toggle = ({ icon, label, desc, on, onTap, danger }) => (
    <div style={{ display:'flex', alignItems:'center', gap:13, padding:'14px 16px', background:'#fff', borderBottom:`1px solid ${T.lineSoft}` }}>
      <div style={{ width:40, height:40, borderRadius:12, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
        background: danger && on ? T.negBg : T.sage100, color: danger && on ? T.neg : T.forest }}>
        {icon === 'freeze' ? <FreezeGlyph size={20} color={danger && on ? T.neg : T.forest} /> : <Icon name={icon} size={20} />}
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:T.font, fontWeight:600, fontSize:15, color:T.strong }}>{label}</div>
        <div style={{ fontFamily:T.font, fontSize:12.5, color:T.muted, marginTop:1 }}>{desc}</div>
      </div>
      <button onClick={onTap} style={{ width:50, height:30, borderRadius:15, border:'none', cursor:'pointer', position:'relative',
        background: on ? (danger ? T.neg : T.forest) : T.line, transition:'background .2s', flexShrink:0 }}>
        <span style={{ position:'absolute', top:3, left: on ? 23 : 3, width:24, height:24, borderRadius:12, background:'#fff', transition:'left .2s', boxShadow:'0 1px 3px rgba(0,0,0,.2)' }} />
      </button>
    </div>
  );
  return (
    <div style={{ flex:1, overflowY:'auto', minHeight:0, background:T.cream }}>
      <div style={{ height:58 }} />
      <Header title="La tua carta" right={<IconBtn name="plus" onClick={() => {}} />} />
      <div style={{ display:'flex', gap:6, padding:'0 20px 16px' }}>
        {[['virtual','Virtuale'],['physical','Fisica']].map(([id,lb]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex:1, height:38, borderRadius:11, cursor:'pointer', border:'none',
            fontFamily:T.font, fontWeight:600, fontSize:14, background: tab===id ? T.forest : '#fff',
            color: tab===id ? '#F4F1E8' : T.muted, boxShadow: tab===id ? 'none' : `inset 0 0 0 1px ${T.line}` }}>{lb}</button>
        ))}
      </div>
      <div style={{ padding:'0 24px 18px' }}>
        <CrestCard frozen={frozen} variant={tab==='physical'?'metal':'forest'} />
      </div>
      {tab === 'physical' && (
        <div style={{ margin:'0 20px 16px', padding:'13px 16px', borderRadius:14, background:T.brassBg, display:'flex', alignItems:'center', gap:11 }}>
          <Icon name="clock" size={19} color={T.brass} />
          <span style={{ fontFamily:T.font, fontSize:13, color:T.text }}>Carta in metallo <b>Libertas</b> · in arrivo al lancio 2026</span>
        </div>
      )}
      <div style={{ padding:'0 20px 14px', display:'flex', gap:10 }}>
        {[['eye','Mostra dati'],['sliders','Limiti','card-limits'],['shield','Sicurezza']].map(([ic,lb,dest]) => (
          <button key={lb} onClick={() => dest && go(dest)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:7, padding:'14px 6px',
            background:'#fff', border:`1px solid ${T.lineSoft}`, borderRadius:16, cursor:'pointer', color:T.forest, WebkitTapHighlightColor:'transparent' }}>
            <Icon name={ic} size={21} />
            <span style={{ fontFamily:T.font, fontSize:11.5, fontWeight:600, color:T.text }}>{lb}</span>
          </button>
        ))}
      </div>
      <div style={{ margin:'0 20px 30px', borderRadius:16, overflow:'hidden', border:`1px solid ${T.lineSoft}` }}>
        <Toggle icon="freeze" label="Blocca carta" desc={frozen ? 'La carta è sospesa' : 'Sospendi i pagamenti'} on={frozen} onTap={() => setFrozen(f => !f)} danger />
        <Toggle icon="pin" label="Pagamenti online" desc="Acquisti su internet" on={!frozen} onTap={() => {}} />
        <div style={{ display:'flex', alignItems:'center', gap:13, padding:'14px 16px', background:'#fff' }}>
          <div style={{ width:40, height:40, borderRadius:12, background:T.sage100, color:T.forest, display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name="scan" size={20} /></div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:T.font, fontWeight:600, fontSize:15, color:T.strong }}>Prelievi ATM</div>
            <div style={{ fontFamily:T.font, fontSize:12.5, color:T.muted }}>€ 250 di 500 usati questo mese</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Card limits ───────────────────────────────────────────── */
function CardLimits({ go }) {
  const [vals, setVals] = React.useState({ daily:80, monthly:50, atm:50 });
  const rows = [
    { k:'daily', label:'Limite giornaliero', max:2000 },
    { k:'monthly', label:'Limite mensile', max:10000 },
    { k:'atm', label:'Prelievo ATM / giorno', max:1000 },
  ];
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Limiti di spesa" sub="Imposta i tuoi massimali" onBack={() => go('card')} />
      <div style={{ flex:1, overflowY:'auto', padding:'14px 20px 0', minHeight:0 }}>
        {rows.map(r => (
          <div key={r.k} style={{ background:'#fff', borderRadius:16, padding:'16px 18px', border:`1px solid ${T.lineSoft}`, marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14 }}>
              <span style={{ fontFamily:T.font, fontWeight:600, fontSize:15, color:T.strong }}>{r.label}</span>
              <span style={{ fontFamily:T.font, fontWeight:700, fontSize:17, color:T.forest, fontVariantNumeric:'tabular-nums' }}>€ {Math.round(vals[r.k]/100*r.max).toLocaleString('it-IT')}</span>
            </div>
            <input type="range" min="1" max="100" value={vals[r.k]} onChange={e => setVals(v => ({ ...v, [r.k]:+e.target.value }))}
              style={{ width:'100%', accentColor:T.forest, height:6 }} />
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontFamily:T.font, fontSize:11.5, color:T.faint }}>
              <span>€ 0</span><span>€ {r.max.toLocaleString('it-IT')}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:'14px 20px 32px' }}><Button onClick={() => go('card')}>Salva limiti</Button></div>
    </div>
  );
}

/* ── Transactions list ─────────────────────────────────────── */
function Transactions({ go, txs, openTx }) {
  const [filter, setFilter] = React.useState('all');
  const filters = [['all','Tutte'],['in','Entrate'],['out','Uscite']];
  const list = txs.filter(t => filter==='all' || (filter==='in' ? t.amount>0 : t.amount<0));
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Movimenti" sub="Conto Crest · 3017" onBack={() => go('home')} right={<IconBtn name="search" onClick={() => {}} />} />
      <div style={{ display:'flex', gap:8, padding:'0 20px 14px' }}>
        {filters.map(([id,lb]) => (
          <button key={id} onClick={() => setFilter(id)} style={{ padding:'8px 16px', borderRadius:20, cursor:'pointer', border:'none',
            fontFamily:T.font, fontWeight:600, fontSize:13.5, background: filter===id ? T.forest : '#fff',
            color: filter===id ? '#F4F1E8' : T.muted, boxShadow: filter===id ? 'none' : `inset 0 0 0 1px ${T.line}` }}>{lb}</button>
        ))}
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'0 20px 20px', minHeight:0 }}>
        <div style={{ background:'#fff', borderRadius:18, padding:'2px 16px', border:`1px solid ${T.lineSoft}` }}>
          {list.map((t, i) => <TxRow key={t.id} tx={t} onClick={() => openTx(t)} last={i===list.length-1} />)}
        </div>
      </div>
    </div>
  );
}

/* ── Transaction detail ────────────────────────────────────── */
function TxDetail({ go, tx }) {
  if (!tx) return null;
  const incoming = tx.amount > 0;
  const Row = ({ k, v }) => (
    <div style={{ display:'flex', justifyContent:'space-between', padding:'14px 0', borderBottom:`1px solid ${T.lineSoft}` }}>
      <span style={{ fontFamily:T.font, fontSize:14, color:T.muted }}>{k}</span>
      <span style={{ fontFamily:T.font, fontSize:14, fontWeight:600, color:T.strong }}>{v}</span>
    </div>
  );
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Dettaglio" onBack={() => go('transactions')} />
      <div style={{ flex:1, overflowY:'auto', padding:'8px 20px 0', minHeight:0 }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, padding:'14px 0 26px' }}>
          <Avatar label={tx.icon} bg={tx.bg || T.sage100} color={tx.fg || T.forest} size={66} />
          <div style={{ textAlign:'center' }}>
            <div style={{ fontFamily:T.font, fontWeight:700, fontSize:19, color:T.strong }}>{tx.name}</div>
            <div style={{ fontFamily:T.font, fontSize:13.5, color:T.muted, marginTop:2 }}>{tx.meta}</div>
          </div>
          <div style={{ fontFamily:T.font, fontWeight:700, fontSize:38, letterSpacing:-1.2, color: incoming ? T.pos : T.strong, fontVariantNumeric:'tabular-nums' }}>
            {money(tx.amount, incoming ? '+' : '-')}
          </div>
          <span style={{ padding:'5px 13px', borderRadius:16, background:T.posBg, color:T.pos, fontFamily:T.font, fontWeight:600, fontSize:12.5, display:'flex', alignItems:'center', gap:6 }}>
            <Icon name="check" size={14} sw={2.4} /> Completata
          </span>
        </div>
        <div style={{ background:'#fff', borderRadius:16, padding:'2px 16px', border:`1px solid ${T.lineSoft}` }}>
          <Row k="Categoria" v={tx.cat} />
          <Row k="Tipo" v={tx.note} />
          <Row k="Conto" v="Crest · 3017" />
          <Row k="Riferimento" v={`TX-2026-${tx.id.toUpperCase()}`} />
        </div>
        <div style={{ display:'flex', gap:10, marginTop:16 }}>
          <Button variant="soft" size="md" icon="share">Condividi</Button>
          <Button variant="outline" size="md" icon="flag">Segnala</Button>
        </div>
      </div>
      <div style={{ height:30 }} />
    </div>
  );
}

/* ── Analysis ──────────────────────────────────────────────── */
function Analysis({ go }) {
  const cats = [
    { cat:'Casa', amount:640, pct:52, color:T.forest, icon:'home' },
    { cat:'Spesa', amount:420, pct:34, color:T.brass, icon:'card' },
    { cat:'Trasporti', amount:180, pct:14, color:T.sage, icon:'pin' },
  ];
  const bars = [62, 48, 70, 55, 80, 44, 68];
  const days = ['L','M','M','G','V','S','D'];
  return (
    <div style={{ flex:1, overflowY:'auto', minHeight:0, background:T.cream }}>
      <div style={{ height:58 }} />
      <Header title="Analisi spese" sub="Giugno 2026" right={<IconBtn name="sliders" onClick={() => {}} />} />
      <div style={{ padding:'0 20px 26px' }}>
        <div style={{ background:`linear-gradient(165deg,${T.forest} 0%,${T.forest700} 100%)`, borderRadius:22, padding:'22px', color:'#F4F1E8', marginBottom:18 }}>
          <div style={{ fontFamily:T.font, fontSize:13, color:'rgba(244,241,232,.62)' }}>Totale speso</div>
          <div style={{ fontFamily:T.font, fontWeight:700, fontSize:38, letterSpacing:-1.2, marginTop:2, fontVariantNumeric:'tabular-nums' }}>€ 1.240,00</div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:6, fontFamily:T.font, fontSize:13, color:T.brassLt }}>
            <Icon name="down" size={15} color={T.brassLt} /> 12% in meno di maggio
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:8, height:78, marginTop:20 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:7 }}>
                <div style={{ width:'100%', maxWidth:22, height:`${h}%`, borderRadius:6, background: i===4 ? T.brassLt : 'rgba(244,241,232,.28)' }} />
                <span style={{ fontFamily:T.font, fontSize:10.5, color:'rgba(244,241,232,.5)' }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontFamily:T.font, fontWeight:700, fontSize:16, color:T.strong, margin:'4px 0 12px' }}>Per categoria</div>
        <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
          {cats.map(c => (
            <div key={c.cat} style={{ background:'#fff', borderRadius:16, padding:'14px 16px', border:`1px solid ${T.lineSoft}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:11 }}>
                <div style={{ width:38, height:38, borderRadius:11, background:`${c.color}1c`, color:c.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon name={c.icon} size={19} />
                </div>
                <span style={{ flex:1, fontFamily:T.font, fontWeight:600, fontSize:15, color:T.strong }}>{c.cat}</span>
                <span style={{ fontFamily:T.font, fontWeight:700, fontSize:15, color:T.strong, fontVariantNumeric:'tabular-nums' }}>€ {c.amount}</span>
              </div>
              <div style={{ height:8, borderRadius:5, background:T.sage50, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${c.pct}%`, background:c.color, borderRadius:5 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:18, background:T.sage50, borderRadius:16, padding:'15px 16px', display:'flex', gap:11, alignItems:'flex-start' }}>
          <Icon name="chart" size={19} color={T.forest} />
          <div style={{ fontFamily:T.font, fontSize:13, lineHeight:1.5, color:T.text }}>
            Con questo ritmo chiuderai giugno a circa <b>€ 1.480</b> — sotto il tuo budget di € 1.600.
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Home, CardScreen, CardLimits, Transactions, TxDetail, Analysis });
