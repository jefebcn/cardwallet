// crest-supabase.jsx — Supabase client + auth/DB helpers for Crest
// Depends on window.supabase (UMD loaded before this script)

const SUPA_URL = 'https://pfgjsgnafgcbjrpoivgz.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZ2pzZ25hZmdjYmpycG9pdmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDA4OTQsImV4cCI6MjA5NzY3Njg5NH0.q-4SqgrGo7LW0j9sPUzH_QTsgVNHRBxfUGvqJVGsp30';

const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY, {
  auth: { persistSession: true, storageKey: 'crest:session', autoRefreshToken: true },
});

/* ── Auth ─────────────────────────────────────────────────── */
async function sbSignUp(email, password, fullName) {
  const { data, error } = await sb.auth.signUp({
    email, password,
    options: { data: { full_name: fullName } },
  });
  if (error) throw error;
  return data;
}

async function sbSignIn(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function sbSignOut() {
  const { error } = await sb.auth.signOut();
  if (error) console.warn('[Crest] signOut:', error.message);
}

async function sbGetSession() {
  const { data: { session } } = await sb.auth.getSession();
  return session;
}

/* ── Profile ──────────────────────────────────────────────── */
async function sbGetProfile(userId) {
  const { data, error } = await sb
    .from('profiles').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
}

async function sbUpdateProfile(userId, updates) {
  const { error } = await sb.from('profiles').update(updates).eq('id', userId);
  if (error) throw error;
}

/* ── Transactions ─────────────────────────────────────────── */
async function sbGetTransactions(userId) {
  const { data, error } = await sb
    .from('transactions').select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(30);
  if (error) throw error;
  return (data || []).map(normalizeTx);
}

async function sbCreateTransaction(userId, tx, newBalance) {
  const { error: e1 } = await sb.from('transactions').insert({
    user_id: userId, name: tx.name, amount: tx.amount,
    meta: tx.meta, icon: tx.icon, cat: tx.cat, note: tx.note,
  });
  if (e1) throw e1;
  const { error: e2 } = await sb
    .from('profiles').update({ balance: newBalance }).eq('id', userId);
  if (e2) throw e2;
}

/* ── Goals ────────────────────────────────────────────────── */
async function sbGetGoals(userId) {
  const { data, error } = await sb
    .from('goals').select('*').eq('user_id', userId).order('created_at');
  if (error) throw error;
  return data || [];
}

/* ── Normalize DB row → TxRow format ─────────────────────── */
function normalizeTx(t) {
  const inc = t.amount > 0;
  const dt = new Date(t.created_at);
  const today = new Date();
  const isToday = dt.toDateString() === today.toDateString();
  const meta = t.meta || (isToday ? 'Oggi · ' : dt.toLocaleDateString('it-IT') + ' · ') +
    dt.toLocaleTimeString('it-IT', { hour:'2-digit', minute:'2-digit' });
  return {
    id: t.id, name: t.name, amount: t.amount,
    meta, icon: t.icon || (t.name?.charAt(0) || 'T'),
    cat: t.cat || 'Altro', note: t.note || '',
    bg: inc ? T.posBg : T.sage100,
    fg: inc ? T.pos : T.forest,
  };
}

/* ── Seed default transactions for new user ───────────────── */
async function sbSeedNewUser(userId) {
  const seed = [
    { user_id:userId, name:'Benvenuto su Crest', amount:0.01, icon:'C', cat:'Sistema', note:'Conto aperto', meta:'Adesso' },
  ];
  await sb.from('transactions').insert(seed).then(({ error }) => {
    if (error) console.warn('[Crest] seed:', error.message);
  });
}

Object.assign(window, {
  sb, sbSignUp, sbSignIn, sbSignOut, sbGetSession,
  sbGetProfile, sbUpdateProfile,
  sbGetTransactions, sbCreateTransaction,
  sbGetGoals, sbSeedNewUser, normalizeTx,
});
