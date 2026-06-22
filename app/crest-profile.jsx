// crest-profile.jsx — Profile/settings, Roadmap, Compliance. Depends on crest-ui.jsx globals.

/* ── Profile / settings ────────────────────────────────────── */
function Profile({ go, restart, userName = 'Mario Rossi', userEmail = 'mario@email.sm' }) {
  const initials = userName.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  const Group = ({ rows }) => (
    <div style={{ background:'#fff', borderRadius:16, overflow:'hidden', border:`1px solid ${T.lineSoft}`, marginBottom:16 }}>
      {rows.map((r, i) => (
        <button key={r.label} onClick={r.onTap} style={{ display:'flex', alignItems:'center', gap:13, width:'100%', textAlign:'left',
          background:'none', border:'none', cursor:'pointer', padding:'14px 16px', borderBottom: i<rows.length-1 ? `1px solid ${T.lineSoft}` : 'none', WebkitTapHighlightColor:'transparent' }}>
          <div style={{ width:38, height:38, borderRadius:11, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
            background: r.tint || T.sage100, color: r.color || T.forest }}><Icon name={r.icon} size={19} /></div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:T.font, fontWeight:600, fontSize:15, color:T.strong }}>{r.label}</div>
            {r.desc && <div style={{ fontFamily:T.font, fontSize:12.5, color:T.muted, marginTop:1 }}>{r.desc}</div>}
          </div>
          {r.badge && <span style={{ padding:'3px 9px', borderRadius:9, background:T.brassBg, color:T.brass, fontFamily:T.font, fontWeight:700, fontSize:11 }}>{r.badge}</span>}
          <Icon name="chevR" size={19} color={T.faint} />
        </button>
      ))}
    </div>
  );
  return (
    <div style={{ flex:1, overflowY:'auto', minHeight:0, background:T.cream }}>
      <div style={{ height:58 }} />
      <Header title="Profilo" />
      <div style={{ padding:'0 20px 30px' }}>
        {/* identity card */}
        <div style={{ background:'#fff', borderRadius:18, padding:'20px', border:`1px solid ${T.lineSoft}`, display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
          <Avatar label={initials} size={56} />
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:T.font, fontWeight:700, fontSize:18, color:T.strong }}>{userName}</div>
            <div style={{ fontFamily:T.font, fontSize:13, color:T.muted, marginTop:2 }}>{userEmail}</div>
          </div>
          <span style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 10px', borderRadius:20, background:T.posBg, color:T.pos, fontFamily:T.font, fontWeight:700, fontSize:11.5 }}>
            <Icon name="check" size={13} sw={2.6} /> Verificato
          </span>
        </div>

        {/* plan banner */}
        <div onClick={() => go('plans')} style={{ background:`linear-gradient(135deg,${T.brass},${T.brassLt})`, borderRadius:18, padding:'18px 20px', marginBottom:20, color:'#FBF7EE', display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:T.serif, fontStyle:'italic', fontSize:14, opacity:.85 }}>Piano attuale</div>
            <div style={{ fontFamily:T.font, fontWeight:700, fontSize:20, letterSpacing:-0.3 }}>Crest Standard</div>
            <div style={{ fontFamily:T.font, fontSize:12.5, opacity:.85, marginTop:2 }}>Passa a Plus per la carta fisica</div>
          </div>
          <div style={{ padding:'9px 14px', borderRadius:12, background:'rgba(255,255,255,.22)', fontFamily:T.font, fontWeight:700, fontSize:13.5 }}>Scopri</div>
        </div>

        <Group rows={[
          { icon:'user', label:'Dati personali', desc:'Nome, contatti, residenza' },
          { icon:'card', label:'Conto e IBAN', desc:'SM76 ···· 3017' },
          { icon:'shield', label:'Sicurezza', desc:'PIN, Face ID, dispositivi' },
        ]} />
        <Group rows={[
          { icon:'flag', label:'Roadmap del prodotto', desc:'Cosa arriva e quando', onTap:() => go('roadmap'), badge:'2026' },
          { icon:'doc', label:'Conformità e licenze', desc:'San Marino · antiriciclaggio', onTap:() => go('compliance') },
          { icon:'bell', label:'Notifiche', desc:'Push, email, promemoria', onTap:() => go('notifications') },
        ]} />
        <Group rows={[
          { icon:'arrowR', label:'Ricomincia il flusso demo', desc:'Riparti dallo splash', onTap:restart, tint:T.brassBg, color:T.brass },
          { icon:'close', label:'Esci dal conto', desc:'Logout · torni alla schermata iniziale', onTap: async () => { await sbSignOut(); restart(); }, tint:T.negBg, color:T.neg },
        ]} />

        {/* compliance footer */}
        <ComplianceFooter />
      </div>
    </div>
  );
}

/* ── Roadmap ───────────────────────────────────────────────── */
function Roadmap({ go }) {
  const phases = [
    { q:'Q1 2026', title:'Lista d\'attesa & beta privata', status:'done', items:['App iOS in test chiuso','IBAN sammarinesi pilota','Carta virtuale'] },
    { q:'Q2 2026', title:'Lancio pubblico', status:'active', items:['Apertura conto in-app (KYC)','Trasferimenti istantanei Crest','Carta fisica Standard'] },
    { q:'Q3 2026', title:'Crescita', status:'next', items:['Carta metallo Libertas','Cambio valuta a tariffe reali','App Android'] },
    { q:'Q4 2026', title:'Ecosistema', status:'next', items:['Pagamenti tra commercianti locali','Risparmio e obiettivi','Apple Pay & Google Pay'] },
  ];
  const dot = { done:T.pos, active:T.brass, next:T.line };
  const badge = { done:['Completato',T.posBg,T.pos], active:['In corso',T.brassBg,T.brass], next:['In programma',T.sage50,T.muted] };
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Roadmap" sub="Il percorso di Crest verso il lancio" onBack={() => go('profile')} />
      <div style={{ flex:1, overflowY:'auto', padding:'10px 20px 30px', minHeight:0 }}>
        <div style={{ position:'relative', paddingLeft:26 }}>
          <div style={{ position:'absolute', left:7, top:8, bottom:30, width:2, background:T.line }} />
          {phases.map((p, i) => {
            const [bl, bbg, bfg] = badge[p.status];
            return (
              <div key={i} style={{ position:'relative', marginBottom:20 }}>
                <div style={{ position:'absolute', left:-26, top:4, width:16, height:16, borderRadius:8, background:dot[p.status],
                  border:`3px solid ${T.cream}`, boxShadow: p.status==='active' ? `0 0 0 4px ${T.brassBg}` : 'none' }} />
                <div style={{ background:'#fff', borderRadius:16, padding:'16px 18px', border:`1px solid ${p.status==='active'?T.brass+'55':T.lineSoft}` }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontFamily:T.font, fontWeight:700, fontSize:12.5, letterSpacing:0.5, color:T.brass }}>{p.q}</span>
                    <span style={{ padding:'3px 9px', borderRadius:9, background:bbg, color:bfg, fontFamily:T.font, fontWeight:700, fontSize:11 }}>{bl}</span>
                  </div>
                  <div style={{ fontFamily:T.font, fontWeight:700, fontSize:16.5, color:T.strong, letterSpacing:-0.3, marginBottom:10 }}>{p.title}</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                    {p.items.map(it => (
                      <div key={it} style={{ display:'flex', alignItems:'center', gap:9 }}>
                        <span style={{ width:18, height:18, borderRadius:9, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
                          background: p.status==='done' ? T.posBg : T.sage50, color: p.status==='done' ? T.pos : T.sage }}>
                          <Icon name={p.status==='done'?'check':'plus'} size={11} sw={2.6} />
                        </span>
                        <span style={{ fontFamily:T.font, fontSize:13.5, color:T.text }}>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding:'14px 16px', borderRadius:14, background:T.sage50, fontFamily:T.font, fontSize:12.5, lineHeight:1.5, color:T.muted, textAlign:'center' }}>
          Le date sono indicative e soggette alle autorizzazioni necessarie. Nessun servizio finanziario è ancora attivo.
        </div>
      </div>
    </div>
  );
}

/* ── Compliance ────────────────────────────────────────────── */
function Compliance({ go }) {
  const items = [
    { icon:'shield', title:'Pre-autorizzazione in corso', desc:'Crest opererà nel rispetto delle autorizzazioni richieste dalle autorità competenti della Repubblica di San Marino. Il servizio non è ancora attivo.' },
    { icon:'doc', title:'Antiriciclaggio (AML/KYC)', desc:'Procedure di adeguata verifica della clientela conformi agli standard AML in vigore. Identità verificata all\'apertura del conto.' },
    { icon:'card', title:'Tutela dei fondi', desc:'Al lancio i fondi della clientela saranno custoditi separatamente presso istituti partner, secondo le norme applicabili.' },
    { icon:'eye', title:'Protezione dei dati', desc:'Dati cifrati in transito e a riposo. Trattamento conforme alla Privacy Policy e alle normative vigenti.' },
  ];
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Conformità & licenze" sub="Trasparenza prima di tutto" onBack={() => go('profile')} />
      <div style={{ flex:1, overflowY:'auto', padding:'10px 20px 30px', minHeight:0 }}>
        <div style={{ background:`linear-gradient(165deg,${T.forest},${T.forest700})`, borderRadius:18, padding:'20px', color:'#F4F1E8', marginBottom:18 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            <Icon name="shield" size={24} color={T.brassLt} />
            <span style={{ fontFamily:T.serif, fontStyle:'italic', fontSize:16, color:T.brassLt }}>Repubblica di San Marino</span>
          </div>
          <div style={{ fontFamily:T.font, fontSize:14.5, lineHeight:1.55, color:'rgba(244,241,232,.82)' }}>
            Crest è un progetto fintech in fase di pre-lancio. Le informazioni qui rappresentano l'intenzione di prodotto e saranno attivate al momento del lancio, nel rispetto delle autorizzazioni necessarie.
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
          {items.map(it => (
            <div key={it.title} style={{ background:'#fff', borderRadius:16, padding:'16px 16px', border:`1px solid ${T.lineSoft}`, display:'flex', gap:13 }}>
              <div style={{ width:40, height:40, borderRadius:12, flexShrink:0, background:T.sage100, color:T.forest, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name={it.icon} size={20} />
              </div>
              <div>
                <div style={{ fontFamily:T.font, fontWeight:700, fontSize:15, color:T.strong, marginBottom:4 }}>{it.title}</div>
                <div style={{ fontFamily:T.font, fontSize:13, lineHeight:1.5, color:T.muted }}>{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <ComplianceFooter />
      </div>
    </div>
  );
}

/* ── Shared compliance footer ──────────────────────────────── */
function ComplianceFooter() {
  return (
    <div style={{ marginTop:24, paddingTop:22, borderTop:`1px solid ${T.line}`, textAlign:'center' }}>
      <div style={{ display:'flex', justifyContent:'center', marginBottom:12 }}><Wordmark size={18} /></div>
      <div style={{ fontFamily:T.serif, fontStyle:'italic', fontSize:14, color:T.brass, marginBottom:10 }}>Libertas</div>
      <p style={{ fontFamily:T.font, fontSize:11.5, lineHeight:1.6, color:T.faint, maxWidth:300, margin:'0 auto' }}>
        Crest è un progetto fintech con sede nella Repubblica di San Marino, in fase di pre-lancio.
        Piani, prezzi e funzionalità sono indicativi e saranno definiti e attivati al lancio del servizio,
        nel rispetto delle autorizzazioni necessarie. Nessun pagamento è richiesto ora. Questo è un prototipo dimostrativo.
      </p>
      <div style={{ display:'flex', justifyContent:'center', gap:18, marginTop:14 }}>
        {['Privacy','Termini','Cookie'].map(l => (
          <span key={l} style={{ fontFamily:T.font, fontSize:12, fontWeight:600, color:T.muted }}>{l}</span>
        ))}
      </div>
      <div style={{ fontFamily:T.font, fontSize:11, color:T.faint, marginTop:14 }}>© 2026 Crest · San Marino (RSM)</div>
    </div>
  );
}

Object.assign(window, { Profile, Roadmap, Compliance, ComplianceFooter });
