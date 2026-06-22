// crest-notifications.jsx — Push notification permission + preferences. Depends on crest-ui.jsx globals.

function NotificationsScreen({ go }) {
  const [perm,   setPerm]   = React.useState(() => 'Notification' in window ? Notification.permission : 'unsupported');
  const [prefs,  setPrefs]  = React.useState({ movimenti:true, scadenze:true, offerte:false, sicurezza:true });
  const [tested, setTested] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const requestPerm = async () => {
    if (!('Notification' in window)) return;
    setLoading(true);
    try {
      const result = await Notification.requestPermission();
      setPerm(result);
    } catch(e) { console.warn(e); }
    setLoading(false);
  };

  const sendTest = () => {
    if (perm !== 'granted') return;
    new Notification('Crest', {
      body: '✅ Ricevuti +€ 1.900 · Stipendio luglio',
      icon: 'assets/icon-192.png',
      badge: 'assets/icon-192.png',
      tag: 'crest-test',
      vibrate: [200, 100, 200],
    });
    setTested(true);
  };

  const toggle = (k) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const permStatus = {
    granted:     { label:'Attive', color:T.pos, bg:T.posBg, icon:'check' },
    denied:      { label:'Bloccate', color:T.neg, bg:T.negBg, icon:'close' },
    default:     { label:'Non configurate', color:T.brass, bg:T.brassBg, icon:'bell' },
    unsupported: { label:'Non supportate', color:T.muted, bg:T.sage50, icon:'bell' },
  };
  const ps = permStatus[perm] || permStatus.default;

  const cats = [
    { k:'movimenti',  icon:'arrowR', label:'Movimenti',       desc:'Pagamenti, bonifici, addebiti' },
    { k:'scadenze',   icon:'clock',  label:'Scadenze',        desc:'Utenze, abbonamenti in scadenza' },
    { k:'sicurezza',  icon:'shield', label:'Sicurezza',       desc:'Accessi, modifiche al conto' },
    { k:'offerte',    icon:'flag',   label:'Offerte Crest',   desc:'Aggiornamenti sul prodotto' },
  ];

  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Notifiche" sub="Resta aggiornato in tempo reale" onBack={() => go('profile')} />
      <div style={{ flex:1, overflowY:'auto', padding:'10px 20px 30px', minHeight:0 }}>

        {/* Status banner */}
        <div style={{ background:ps.bg, borderRadius:16, padding:'16px 18px', marginBottom:20, display:'flex', alignItems:'center', gap:13,
          border:`1px solid ${ps.color}22` }}>
          <div style={{ width:42, height:42, borderRadius:13, flexShrink:0, background:ps.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name={ps.icon} size={22} color="#fff" sw={2.4} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:T.font, fontWeight:700, fontSize:15.5, color:T.strong }}>Notifiche {ps.label}</div>
            <div style={{ fontFamily:T.font, fontSize:12.5, color:T.muted, marginTop:2 }}>
              {perm === 'granted'     && 'Ricevi aggiornamenti in tempo reale'}
              {perm === 'denied'      && 'Riattiva dalle impostazioni del browser'}
              {perm === 'default'     && 'Tocca per abilitarle'}
              {perm === 'unsupported' && 'Il tuo browser non supporta le notifiche'}
            </div>
          </div>
          {perm === 'granted' && (
            <button onClick={sendTest} style={{ padding:'8px 12px', borderRadius:11, background:ps.color, color:'#fff', border:'none', cursor:'pointer', fontFamily:T.font, fontWeight:600, fontSize:12.5 }}>
              {tested ? 'Inviata!' : 'Test'}
            </button>
          )}
        </div>

        {/* Enable button */}
        {perm === 'default' && (
          <Button onClick={requestPerm} style={{ marginBottom:20 }}>
            {loading ? <><span className="crest-spin" style={{ width:18, height:18, border:'2px solid rgba(244,241,232,.3)', borderTopColor:'#F4F1E8', borderRadius:9 }} /> Attendere…</> : '🔔 Attiva notifiche Crest'}
          </Button>
        )}

        {/* Category toggles */}
        <div style={{ fontFamily:T.font, fontWeight:700, fontSize:15, color:T.strong, marginBottom:10 }}>Categorie</div>
        <div style={{ background:'#fff', borderRadius:16, overflow:'hidden', border:`1px solid ${T.lineSoft}`, marginBottom:18 }}>
          {cats.map((c, i) => (
            <div key={c.k} style={{ display:'flex', alignItems:'center', gap:13, padding:'14px 16px',
              borderBottom: i < cats.length-1 ? `1px solid ${T.lineSoft}` : 'none',
              opacity: perm !== 'granted' ? 0.5 : 1 }}>
              <div style={{ width:38, height:38, borderRadius:11, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
                background: prefs[c.k] ? T.forest : T.sage100, color: prefs[c.k] ? '#F4F1E8' : T.forest, transition:'all .2s' }}>
                <Icon name={c.icon} size={19} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:T.font, fontWeight:600, fontSize:15, color:T.strong }}>{c.label}</div>
                <div style={{ fontFamily:T.font, fontSize:12.5, color:T.muted, marginTop:1 }}>{c.desc}</div>
              </div>
              <button onClick={() => toggle(c.k)} disabled={perm !== 'granted'} style={{
                width:50, height:30, borderRadius:15, border:'none', cursor: perm==='granted' ? 'pointer' : 'default',
                background: prefs[c.k] && perm==='granted' ? T.forest : T.line, transition:'background .2s', position:'relative', flexShrink:0 }}>
                <span style={{ position:'absolute', top:3, left: prefs[c.k] ? 23 : 3, width:24, height:24, borderRadius:12,
                  background:'#fff', transition:'left .2s', boxShadow:'0 1px 3px rgba(0,0,0,.2)' }} />
              </button>
            </div>
          ))}
        </div>

        {/* Recent notifications mock */}
        <div style={{ fontFamily:T.font, fontWeight:700, fontSize:15, color:T.strong, marginBottom:10 }}>Recenti</div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {[
            { icon:'up', color:T.pos, bg:T.posBg, title:'+€ 1.900 ricevuti', sub:'Stipendio luglio · Oggi 09:14' },
            { icon:'down', color:T.neg, bg:T.negBg, title:'-€ 43,00 pagati', sub:'Coop Borgo Maggiore · Ieri' },
            { icon:'shield', color:T.forest, bg:T.sage100, title:'Nuovo accesso rilevato', sub:'Safari · iOS · San Marino · Ieri' },
          ].map((n, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'#fff', borderRadius:14, border:`1px solid ${T.lineSoft}` }}>
              <div style={{ width:38, height:38, borderRadius:12, flexShrink:0, background:n.bg, color:n.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name={n.icon} size={19} />
              </div>
              <div>
                <div style={{ fontFamily:T.font, fontWeight:600, fontSize:14.5, color:T.strong }}>{n.title}</div>
                <div style={{ fontFamily:T.font, fontSize:12.5, color:T.faint, marginTop:1 }}>{n.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { NotificationsScreen });
