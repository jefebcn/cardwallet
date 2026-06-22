// Global auth/session state: restores Supabase session on launch, exposes
// the current user, profile and transactions to the whole app.
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  sb, sbGetSession, sbGetProfile, sbGetTransactions, sbSignOut,
} from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [booting, setBooting] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [txs, setTxs] = useState([]);

  const loadUserData = useCallback(async (u) => {
    if (!u) { setProfile(null); setTxs([]); return; }
    try {
      const [p, t] = await Promise.all([
        sbGetProfile(u.id).catch(() => null),
        sbGetTransactions(u.id).catch(() => []),
      ]);
      setProfile(p);
      setTxs(t);
    } catch (e) {
      console.warn('[Crest] loadUserData:', e.message);
    }
  }, []);

  // Restore session at launch + subscribe to auth changes.
  useEffect(() => {
    let mounted = true;
    (async () => {
      const session = await sbGetSession();
      if (!mounted) return;
      const u = session?.user || null;
      setUser(u);
      await loadUserData(u);
      setBooting(false);
    })();

    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      const u = session?.user || null;
      setUser(u);
      loadUserData(u);
    });
    return () => { mounted = false; sub?.subscription?.unsubscribe?.(); };
  }, [loadUserData]);

  const setSession = useCallback((u, p, t) => {
    setUser(u);
    if (p !== undefined) setProfile(p);
    if (t !== undefined) setTxs(t);
  }, []);

  const refresh = useCallback(() => loadUserData(user), [loadUserData, user]);

  const signOut = useCallback(async () => {
    await sbSignOut();
    setUser(null); setProfile(null); setTxs([]);
  }, []);

  const balance = profile?.balance ?? 0;
  const userName = profile?.full_name || user?.user_metadata?.full_name || 'Mario Rossi';

  const value = {
    booting, user, profile, txs, balance, userName,
    setSession, setProfile, setTxs, refresh, signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
