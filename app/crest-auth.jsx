// crest-auth.jsx — Login screen for existing users. Depends on crest-ui.jsx + crest-supabase.jsx

function LoginScreen({ go, onLogin }) {
  const [email, setEmail]   = React.useState('');
  const [pass,  setPass]    = React.useState('');
  const [err,   setErr]     = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);

  const canSubmit = email.includes('@') && pass.length >= 6;

  const login = async () => {
    if (!canSubmit || loading) return;
    setLoading(true); setErr('');
    try {
      const { user } = await sbSignIn(email, pass);
      const [profile, txs] = await Promise.all([
        sbGetProfile(user.id),
        sbGetTransactions(user.id),
      ]);
      onLogin(user, profile, txs);
      go('home');
    } catch (e) {
      const msg = e.message || '';
      if (msg.includes('Invalid login')) setErr('Email o password non corretti.');
      else if (msg.includes('Email not confirmed')) setErr('Conferma la tua email prima di accedere.');
      else setErr(msg || 'Errore di accesso. Riprova.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ height:874, background:T.cream, display:'flex', flexDirection:'column' }}>
      <div style={{ height:58 }} />
      <Header title="Accedi" sub="Bentornato su Crest" onBack={() => go('welcome')} />

      <div style={{ flex:1, overflowY:'auto', padding:'16px 20px 0', minHeight:0 }}>
        {/* Logo */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:28 }}>
          <div style={{ width:72, height:72, borderRadius:22, background:T.forest, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Mark size={46} color="#EFEAD9" />
          </div>
        </div>

        {/* Fields */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontFamily:T.font, fontSize:12, fontWeight:700, letterSpacing:0.6, color:T.muted, marginBottom:7 }}>EMAIL</div>
          <div style={{ height:54, borderRadius:14, background:'#fff', border:`1.5px solid ${T.line}`, display:'flex', alignItems:'center', padding:'0 15px' }}>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email"
              placeholder="mario@email.sm" autoFocus
              style={{ flex:1, border:'none', outline:'none', background:'none', fontFamily:T.font, fontSize:16, color:T.strong }} />
          </div>
        </div>

        <div style={{ marginBottom:6 }}>
          <div style={{ fontFamily:T.font, fontSize:12, fontWeight:700, letterSpacing:0.6, color:T.muted, marginBottom:7 }}>PASSWORD</div>
          <div style={{ height:54, borderRadius:14, background:'#fff', border:`1.5px solid ${T.line}`, display:'flex', alignItems:'center', padding:'0 15px', gap:10 }}>
            <input value={pass} onChange={e => setPass(e.target.value)}
              type={showPass ? 'text' : 'password'} placeholder="La tua password"
              onKeyDown={e => e.key === 'Enter' && login()}
              style={{ flex:1, border:'none', outline:'none', background:'none', fontFamily:T.font, fontSize:16, color:T.strong }} />
            <button onClick={() => setShowPass(v => !v)} style={{ background:'none', border:'none', cursor:'pointer', color:T.faint, display:'flex', padding:4 }}>
              <Icon name="eye" size={19} />
            </button>
          </div>
        </div>

        <div style={{ textAlign:'right', marginBottom:24 }}>
          <span style={{ fontFamily:T.font, fontSize:13, fontWeight:600, color:T.forest }}>Password dimenticata?</span>
        </div>

        {err && (
          <div style={{ padding:'12px 14px', borderRadius:13, background:T.negBg, border:`1px solid ${T.neg}22`,
            fontFamily:T.font, fontSize:13.5, color:T.neg, marginBottom:14, display:'flex', gap:9, alignItems:'flex-start' }}>
            <Icon name="close" size={17} color={T.neg} sw={2.2} />
            {err}
          </div>
        )}

        {/* Social hint */}
        <div style={{ display:'flex', alignItems:'center', gap:12, margin:'4px 0 18px' }}>
          <div style={{ flex:1, height:1, background:T.line }} />
          <span style={{ fontFamily:T.font, fontSize:12.5, color:T.faint }}>oppure</span>
          <div style={{ flex:1, height:1, background:T.line }} />
        </div>

        <div style={{ display:'flex', gap:10 }}>
          <div style={{ flex:1, height:48, borderRadius:13, border:`1.5px solid ${T.line}`, display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:T.font, fontWeight:700, fontSize:14, color:T.strong }}>
            <svg width="17" height="17" viewBox="0 0 18 18"><path d="M17.64 9.2a10.34 10.34 0 00-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"/><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 009 18z" fill="#34A853"/><path d="M3.96 10.71A5.41 5.41 0 013.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 000 9c0 1.45.35 2.82.96 4.04l3-2.33z" fill="#FBBC05"/><path d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58A9 9 0 00.96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/></svg>
            Google
          </div>
          <div style={{ flex:1, height:48, borderRadius:13, border:`1.5px solid ${T.line}`, display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:T.font, fontWeight:700, fontSize:14, color:T.strong }}>
            <svg width="14" height="17" viewBox="0 0 14 17" fill="none"><path d="M7 0C5.5 0 4.3 1.3 4.3 2.9s1.2 2.9 2.7 2.9 2.7-1.3 2.7-2.9S8.5 0 7 0zM2.5 7C1.1 7 0 8.1 0 9.6V15c0 1 .9 1.9 2 1.9h10c1.1 0 2-.9 2-1.9V9.6C14 8.1 12.9 7 11.5 7H2.5z" fill="#111"/></svg>
            Apple
          </div>
        </div>
      </div>

      <div style={{ padding:'14px 20px 36px', borderTop:`1px solid ${T.lineSoft}` }}>
        <Button onClick={login} disabled={!canSubmit || loading}>
          {loading
            ? <><span className="crest-spin" style={{ width:18, height:18, border:'2px solid rgba(244,241,232,.3)', borderTopColor:'#F4F1E8', borderRadius:9 }} /> Accesso in corso…</>
            : 'Accedi al tuo conto'}
        </Button>
        <button onClick={() => go('kyc-form')} style={{ width:'100%', marginTop:12, height:46, background:'none', border:'none', cursor:'pointer',
          fontFamily:T.font, fontSize:15, fontWeight:600, color:T.muted }}>
          Non hai un conto? <span style={{ color:T.forest }}>Aprilo ora</span>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen });
