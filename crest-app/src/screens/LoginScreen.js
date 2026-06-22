// Login screen for existing users — ported from crest-auth.jsx.
import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T, ff } from '../theme/tokens';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Mark } from '../components/Mark';
import { sbSignIn, sbGetProfile, sbGetTransactions } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

function Field({ label, children }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontFamily: ff(700), fontSize: 12, letterSpacing: 0.6, color: T.muted, marginBottom: 7 }}>{label}</Text>
      {children}
    </View>
  );
}

const inputBox = {
  height: 54, borderRadius: 14, backgroundColor: '#fff',
  borderWidth: 1.5, borderColor: T.line,
  flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15,
};
const inputText = { flex: 1, fontFamily: ff(400), fontSize: 16, color: T.strong };

export function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { setSession } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const canSubmit = email.includes('@') && pass.length >= 6;

  const login = async () => {
    if (!canSubmit || loading) return;
    setLoading(true); setErr('');
    try {
      const { user } = await sbSignIn(email.trim(), pass);
      const [profile, txs] = await Promise.all([
        sbGetProfile(user.id).catch(() => null),
        sbGetTransactions(user.id).catch(() => []),
      ]);
      setSession(user, profile, txs);
      // Navigation to Home is automatic: RootNavigator switches on `user`.
    } catch (e) {
      const msg = e.message || '';
      if (msg.includes('Invalid login')) setErr('Email o password non corretti.');
      else if (msg.includes('Email not confirmed')) setErr('Conferma la tua email prima di accedere.');
      else setErr(msg || 'Errore di accesso. Riprova.');
    } finally { setLoading(false); }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: T.cream }}
    >
      <View style={{ height: insets.top + 8 }} />
      <Header title="Accedi" sub="Bentornato su Crest" onBack={() => navigation.goBack()} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16 }} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          <View style={{ width: 72, height: 72, borderRadius: 22, backgroundColor: T.forest, alignItems: 'center', justifyContent: 'center' }}>
            <Mark size={46} color="#EFEAD9" />
          </View>
        </View>

        <Field label="EMAIL">
          <View style={inputBox}>
            <TextInput
              value={email} onChangeText={setEmail}
              placeholder="mario@email.sm" placeholderTextColor={T.faint}
              keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
              style={inputText}
            />
          </View>
        </Field>

        <View style={{ marginBottom: 6 }}>
          <Text style={{ fontFamily: ff(700), fontSize: 12, letterSpacing: 0.6, color: T.muted, marginBottom: 7 }}>PASSWORD</Text>
          <View style={[inputBox, { gap: 10 }]}>
            <TextInput
              value={pass} onChangeText={setPass}
              placeholder="La tua password" placeholderTextColor={T.faint}
              secureTextEntry={!showPass} autoCapitalize="none"
              onSubmitEditing={login} returnKeyType="go"
              style={inputText}
            />
            <Pressable onPress={() => setShowPass(v => !v)} hitSlop={8}>
              <Icon name="eye" size={19} color={T.faint} />
            </Pressable>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end', marginBottom: 24 }}>
          <Text style={{ fontFamily: ff(600), fontSize: 13, color: T.forest }}>Password dimenticata?</Text>
        </View>

        {err ? (
          <View style={{ flexDirection: 'row', gap: 9, alignItems: 'flex-start', padding: 12, borderRadius: 13, backgroundColor: T.negBg, borderWidth: 1, borderColor: 'rgba(178,85,72,0.13)', marginBottom: 14 }}>
            <Icon name="close" size={17} color={T.neg} sw={2.2} />
            <Text style={{ flex: 1, fontFamily: ff(500), fontSize: 13.5, color: T.neg }}>{err}</Text>
          </View>
        ) : null}

        {/* divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4, marginBottom: 18 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: T.line }} />
          <Text style={{ fontFamily: ff(400), fontSize: 12.5, color: T.faint }}>oppure</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: T.line }} />
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={socialBtn}>
            <Svg width={17} height={17} viewBox="0 0 18 18">
              <Path d="M17.64 9.2a10.34 10.34 0 00-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4" />
              <Path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 009 18z" fill="#34A853" />
              <Path d="M3.96 10.71A5.41 5.41 0 013.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 000 9c0 1.45.35 2.82.96 4.04l3-2.33z" fill="#FBBC05" />
              <Path d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58A9 9 0 00.96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z" fill="#EA4335" />
            </Svg>
            <Text style={socialTxt}>Google</Text>
          </View>
          <View style={socialBtn}>
            <Svg width={14} height={17} viewBox="0 0 14 17" fill="none">
              <Path d="M7 0C5.5 0 4.3 1.3 4.3 2.9s1.2 2.9 2.7 2.9 2.7-1.3 2.7-2.9S8.5 0 7 0zM2.5 7C1.1 7 0 8.1 0 9.6V15c0 1 .9 1.9 2 1.9h10c1.1 0 2-.9 2-1.9V9.6C14 8.1 12.9 7 11.5 7H2.5z" fill="#111" />
            </Svg>
            <Text style={socialTxt}>Apple</Text>
          </View>
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: insets.bottom + 16, borderTopWidth: 1, borderTopColor: T.lineSoft }}>
        <Button onPress={login} disabled={!canSubmit} loading={loading}>
          {loading ? 'Accesso in corso…' : 'Accedi al tuo conto'}
        </Button>
        <Pressable onPress={() => navigation.navigate('Register')} style={{ marginTop: 12, height: 46, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: ff(600), fontSize: 15, color: T.muted }}>
            Non hai un conto? <Text style={{ color: T.forest }}>Aprilo ora</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const socialBtn = {
  flex: 1, height: 48, borderRadius: 13, borderWidth: 1.5, borderColor: T.line,
  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
};
const socialTxt = { fontFamily: ff(700), fontSize: 14, color: T.strong };
