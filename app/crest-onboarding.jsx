// crest-onboarding.jsx — splash, welcome, KYC flow, processing, success
// Depends on crest-ui.jsx globals. Exports screen components to window.

/* ── Splash / optimised loading ────────────────────────────── */
function SplashScreen({ go }) {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    let r = 0;
    const id = setInterval(() => {
      r += Math.random() * 16 + 7;
      if (r >= 100) { r = 100; clearInterval(id); setTimeout(() => go('welcome'), 420); }
      setPct(Math.min(100, Math.round(r)));
    }, 180);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ height:874, background:`linear-gradient(160deg,${T.forest700} 0%,${T.forest} 55%,${T.ink} 100%)`,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 40px', color:'#F4F1E8' }}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:22 }}>
        <div className="crest-mark-pulse" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Mark size={68} color="#EFEAD9" />
        </div>
        <div style={{ fontFamily:T.font, fontWeight:700, fontSize:34, letterSpacing:-0.8 }}>Crest</div>
        <div style={{ fontFamily:T.serif, fontStyle:'italic', fontSize:16, color:'rgba(244,241,232,.6)', marginTop:-10 }}>Libertas</div>
      </div>
      <div style={{ width:'100%', paddingBottom:80 }}>
        <div style={{ height:4, borderRadius:4, background:'rgba(255,255,255,.14)', overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${pct}%`, background:T.brassLt, borderRadius:4, transition:'width .18s ease-out' }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, fontFamily:T.font, fontSize:12, color:'rgba(244,241,232,.55)' }}>
          <span>Connessione sicura</span>
          <span style={{ fontVariantNumeric:'tabular-nums' }}>{pct}%</span>
        </div>
      </div>
    </div>
  );
}

/* ── Welcome ───────────────────────────────────────────────── */
function WelcomeScreen({ go }) {
  return (
    <div style={{ height:874, background:`linear-gradient(168deg,${T.forest} 0%,${T.forest700} 50%,${T.ink} 100%)`,
      display:'flex', flexDirection:'column', padding:'0 28px', color:'#F4F1E8' }}>
      <div style={{ height:64 }} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:30 }}>
        <div style={{ transform:'rotate(-7deg)', alignSelf:'center', width:'82%', marginBottom:8 }}>
          <CrestCard holder="M. Rossi" last4="3017" variant="metal" />
        </div>
        <div>
          <div style={{ fontFamily:T.serif, fontStyle:'italic', fontSize:18, color:T.brassLt, marginBottom:8 }}>Repubblica di San Marino</div>
          <h1 style={{ fontFamily:T.font, fontWeight:700, fontSize:38, lineHeight:1.05, letterSpacing:-1.2, margin:0 }}>
            Il tuo denaro,<br/>senza confini.
          </h1>
          <p style={{ fontFamily:T.font, fontSize:16, lineHeight:1.5, color:'rgba(244,241,232,.7)', marginTop:14, maxWidth:300 }}>
            IBAN, carta e trasferimenti istantanei. Costruito per chi vive la Repubblica.
          </p>
        </div>
      </div>
      <div style={{ paddingBottom:46, display:'flex', flexDirection:'column', gap:11 }}>
        <Button variant="brass" onClick={() => go('kyc-form')}>Apri il conto</Button>
        <button onClick={() => go('login')} style={{ height:50, background:'none', border:'none', cursor:'pointer',
          fontFamily:T.font, fontSize:15, fontWeight:600, color:'rgba(244,241,232,.72)' }}>
          Ho già un conto · Accedi
        </button>
      </div>
    </div>
  );
}

/* ── KYC step shell ────────────────────────────────────────── */
function StepDots({ n, of }) {
  return (
    <div style={{ display:'flex', gap:6 }}>
      {Array.from({ length:of }).map((_, i) => (
        <div key={i} style={{ height:4, borderRadius:4, flex: i === n ? 2.4 : 1,
          background: i <= n ? T.forest : T.line, transition:'all .3s' }} />
      ))}
    </div>
  );
}

function CInput({ label, placeholder, value, onChange, type = 'text', prefix, hint, autoFocus }) {
  const [f, setF] = React.useState(false);
  return (
    <div style={{ marginBottom:16 }}>
      {label && <div style={{ fontFamily:T.font, fontSize:12, fontWeight:700, letterSpacing:0.6, color:T.muted, marginBottom:7 }}>{label}</div>}
      <div style={{ display:'flex', alignItems:'center', gap:9, height:54, borderRadius:14, padding:'0 15px',
        background: f ? '#fff' : T.card2, border:`1.5px solid ${f ? T.forest : T.line}`,
        boxShadow: f ? `0 0 0 4px ${T.sage100}` : 'none', transition:'all .15s' }}>
        {prefix && <span style={{ fontFamily:T.font, fontWeight:600, fontSize:15.5, color:T.muted, whiteSpace:'nowrap', flexShrink:0 }}>{prefix}</span>}
        <input value={value} onChange={e => onChange(e.target.value)} type={type} placeholder={placeholder}
          autoFocus={autoFocus} onFocus={() => setF(true)} onBlur={() => setF(false)}
          style={{ flex:1, border:'none', outline:'none', background:'none', fontFamily:T.font, fontSize:16, color:T.strong, minWidth:0 }} />
      </div>
      {hint && <div style={{ fontFamily:T.font, fontSize:12, color:T.faint, marginTop:6 }}>{hint}</div>}
    </div>
  );
}

/* ── KYC 1 · details ───────────────────────────────────────── */
function KycForm({ go, data, setData }) {
  const ok = data.name.trim().length > 1 && /@/.test(data.email) && (data.password || '').length >= 8;
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Apri il conto" sub="Passo 1 di 3 · I tuoi dati" onBack={() => go('welcome')} />
      <div style={{ padding:'0 20px 8px' }}><StepDots n={0} of={3} /></div>
      <div style={{ flex:1, overflowY:'auto', padding:'22px 20px 0', minHeight:0 }}>
        <CInput label="NOME E COGNOME" placeholder="Mario Rossi" value={data.name} onChange={v => setData({ ...data, name:v })} autoFocus />
        <CInput label="EMAIL" placeholder="mario@email.sm" type="email" value={data.email} onChange={v => setData({ ...data, email:v })} />
        <CInput label="PASSWORD" placeholder="Min. 8 caratteri" type="password" value={data.password || ''} onChange={v => setData({ ...data, password:v })} hint="Almeno 8 caratteri — usala per accedere in futuro" />
        <CInput label="TELEFONO" placeholder="66 12 34 56" prefix="🇸🇲 +378" value={data.phone} onChange={v => setData({ ...data, phone:v })} />
        <div style={{ marginTop:8 }}>
          <div style={{ fontFamily:T.font, fontSize:12, fontWeight:700, letterSpacing:0.6, color:T.muted, marginBottom:7 }}>CASTELLO DI RESIDENZA</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {['Città','Borgo Maggiore','Serravalle','Domagnano','Fiorentino','Acquaviva','Faetano','Montegiardino','Chiesanuova'].map(c => {
              const on = data.castle === c;
              return (
                <button key={c} onClick={() => setData({ ...data, castle:c })} style={{
                  padding:'9px 13px', borderRadius:11, cursor:'pointer', fontFamily:T.font, fontSize:13.5, fontWeight:600,
                  border:`1.5px solid ${on ? T.forest : T.line}`, background: on ? T.forest : 'transparent',
                  color: on ? '#F4F1E8' : T.text, transition:'all .15s', WebkitTapHighlightColor:'transparent' }}>{c}</button>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ padding:'14px 20px 32px', background:T.cream, borderTop:`1px solid ${T.lineSoft}` }}>
        <Button onClick={() => go('kyc-verify')} disabled={!ok} icon="arrowR">Continua</Button>
      </div>
    </div>
  );
}

/* ── KYC 2 · identity ──────────────────────────────────────── */
function KycVerify({ go }) {
  const [docDone, setDocDone] = React.useState(false);
  const [selfieDone, setSelfieDone] = React.useState(false);
  const Step = ({ icon, title, desc, done, onTap }) => (
    <button onClick={onTap} style={{ display:'flex', alignItems:'center', gap:14, width:'100%', textAlign:'left',
      background: done ? T.posBg : '#fff', border:`1.5px solid ${done ? T.pos+'44' : T.line}`, borderRadius:16,
      padding:'16px 16px', cursor:'pointer', WebkitTapHighlightColor:'transparent', transition:'all .2s' }}>
      <div style={{ width:46, height:46, borderRadius:13, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
        background: done ? T.pos : T.sage100, color: done ? '#fff' : T.forest }}>
        <Icon name={done ? 'check' : icon} size={22} sw={2.2} />
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:T.font, fontWeight:700, fontSize:15.5, color:T.strong }}>{title}</div>
        <div style={{ fontFamily:T.font, fontSize:13, color: done ? T.pos : T.muted, marginTop:2 }}>{done ? 'Completato' : desc}</div>
      </div>
      {!done && <Icon name="chevR" size={20} color={T.faint} />}
    </button>
  );
  const both = docDone && selfieDone;
  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Verifica identità" sub="Passo 2 di 3 · KYC" onBack={() => go('kyc-form')} />
      <div style={{ padding:'0 20px 8px' }}><StepDots n={1} of={3} /></div>
      <div style={{ flex:1, overflowY:'auto', padding:'22px 20px 0', minHeight:0 }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:11, padding:'14px 15px', borderRadius:14,
          background:T.sage50, border:`1px solid ${T.sage100}`, marginBottom:20 }}>
          <Icon name="shield" size={20} color={T.forest} />
          <div style={{ fontFamily:T.font, fontSize:13, lineHeight:1.5, color:T.text }}>
            La verifica è richiesta dalla normativa antiriciclaggio. I dati sono cifrati e usati solo per l'apertura del conto.
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
          <Step icon="doc" title="Documento d'identità" desc="Carta d'identità o passaporto" done={docDone} onTap={() => setDocDone(true)} />
          <Step icon="user" title="Selfie di verifica" desc="Un breve riconoscimento del volto" done={selfieDone} onTap={() => setSelfieDone(true)} />
        </div>
      </div>
      <div style={{ padding:'14px 20px 32px', background:T.cream, borderTop:`1px solid ${T.lineSoft}` }}>
        <Button onClick={() => go('kyc-loading')} disabled={!both} icon="arrowR">
          {both ? 'Invia e verifica' : 'Completa i passaggi'}
        </Button>
      </div>
    </div>
  );
}

/* ── KYC 3 · processing (optimised loading) ────────────────── */
function KycLoading({ go, kyc, onSignupDone }) {
  const steps = ['Documento ricevuto', 'Verifica antiriciclaggio', 'Generazione IBAN sammarinese', 'Emissione carta virtuale'];
  const [step, setStep] = React.useState(0);
  const [authErr, setAuthErr] = React.useState('');
  React.useEffect(() => {
    let cancelled = false;
    const id = setInterval(async () => {
      setStep(s => {
        const next = s + 1;
        if (next >= steps.length) {
          clearInterval(id);
          // Real signup on last step
          (async () => {
            try {
              const { user } = await sbSignUp(kyc.email, kyc.password, kyc.name);
              await sbSeedNewUser(user.id);
              const profile = await sbGetProfile(user.id);
              if (!cancelled) { onSignupDone && onSignupDone(user, profile); setTimeout(() => go('kyc-success'), 700); }
            } catch (e) {
              if (!cancelled) { setAuthErr(e.message || 'Errore di registrazione'); setTimeout(() => go('kyc-form'), 2200); }
            }
          })();
        }
        return Math.min(next, steps.length - 1);
      });
    }, 900);
    return () => { cancelled = true; clearInterval(id); };
  }, []);
  return (
    <div style={{ height:874, background:`linear-gradient(165deg,${T.forest} 0%,${T.forest700} 60%,${T.ink} 100%)`,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 36px', color:'#F4F1E8' }}>
      <div style={{ width:84, height:84, marginBottom:34, position:'relative' }}>
        <svg width="84" height="84" viewBox="0 0 84 84" style={{ position:'absolute', inset:0 }}>
          <circle cx="42" cy="42" r="38" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="4" />
          <circle cx="42" cy="42" r="38" fill="none" stroke={T.brassLt} strokeWidth="4" strokeLinecap="round"
            strokeDasharray="239" strokedashoffset={239 - 239 * ((step + 1) / steps.length)}
            style={{ transition:'stroke-dashoffset .8s ease', transform:'rotate(-90deg)', transformOrigin:'center' }} />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Mark size={34} color="#EFEAD9" />
        </div>
      </div>
      <div style={{ fontFamily:T.font, fontWeight:700, fontSize:21, marginBottom:28, textAlign:'center' }}>
        {authErr ? '⚠️ Errore di registrazione' : 'Stiamo aprendo il tuo conto'}
      </div>
      {authErr && <div style={{ fontFamily:T.font, fontSize:14, color:T.brassLt, textAlign:'center', marginBottom:16, lineHeight:1.5 }}>{authErr}<br/>Torno al form…</div>}
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:13 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, opacity: i <= step ? 1 : 0.38, transition:'opacity .4s' }}>
            <div style={{ width:26, height:26, borderRadius:13, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
              background: i < step ? T.brassLt : i === step ? 'rgba(255,255,255,.16)' : 'rgba(255,255,255,.08)' }}>
              {i < step ? <Icon name="check" size={15} color={T.ink} sw={2.6} />
                : i === step ? <span className="crest-spin" style={{ width:13, height:13, borderRadius:7, border:'2px solid rgba(255,255,255,.35)', borderTopColor:'#fff' }} />
                : <span style={{ width:5, height:5, borderRadius:3, background:'rgba(255,255,255,.4)' }} />}
            </div>
            <span style={{ fontFamily:T.font, fontSize:15, fontWeight: i === step ? 700 : 500 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── KYC done ──────────────────────────────────────────────── */
function KycSuccess({ go, data }) {
  return (
    <div style={{ height:874, background:`linear-gradient(168deg,${T.forest} 0%,${T.forest700} 55%,${T.ink} 100%)`,
      display:'flex', flexDirection:'column', alignItems:'center', padding:'0 28px', color:'#F4F1E8', textAlign:'center' }}>
      <div style={{ height:72 }} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:22 }}>
        <div className="crest-pop" style={{ width:96, height:96, borderRadius:48, background:T.brass,
          display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 16px 40px ${T.brass}66` }}>
          <Icon name="check" size={48} color="#FBF7EE" sw={2.6} />
        </div>
        <div>
          <h1 style={{ fontFamily:T.font, fontWeight:700, fontSize:30, letterSpacing:-0.8, margin:0 }}>
            Conto aperto{data.name ? `,\n${data.name.split(' ')[0]}!` : '!'}
          </h1>
          <p style={{ fontFamily:T.font, fontSize:15.5, color:'rgba(244,241,232,.7)', marginTop:12, lineHeight:1.5 }}>
            Il tuo IBAN e la carta virtuale sono pronti.<br/>I primi 30 minuti di noleggio… ehm, le prime operazioni sono senza commissioni.
          </p>
        </div>
        <div style={{ width:'100%', borderRadius:16, padding:'16px 18px', background:'rgba(255,255,255,.08)',
          border:'1px solid rgba(255,255,255,.16)', display:'flex', alignItems:'center', gap:13, textAlign:'left' }}>
          <div style={{ width:42, height:42, borderRadius:12, background:'rgba(255,255,255,.12)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Icon name="card" size={22} color="#EFEAD9" />
          </div>
          <div>
            <div style={{ fontFamily:T.font, fontSize:11.5, fontWeight:700, letterSpacing:1, color:'rgba(244,241,232,.55)' }}>IBAN DEDICATO</div>
            <div style={{ fontFamily:T.font, fontSize:15, fontWeight:600, marginTop:2, letterSpacing:0.5 }}>SM76 ···· ···· 3017</div>
          </div>
        </div>
      </div>
      <div style={{ paddingBottom:46, width:'100%' }}>
        <Button variant="brass" onClick={() => go('home')} icon="arrowR">Entra in Crest</Button>
      </div>
    </div>
  );
}

Object.assign(window, { SplashScreen, WelcomeScreen, KycForm, KycVerify, KycLoading, KycSuccess });
