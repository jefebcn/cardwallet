// Apri il conto — single-step signup (Supabase Auth).
// NOTE: the full 3-step KYC flow (documento + selfie + processing) from the
// handoff is the next milestone; this is the functional account-creation core.
import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T, ff } from '../theme/tokens';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { sbSignUp, sbGetProfile, sbGetTransactions } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const CASTLES = [
  'Città di San Marino', 'Borgo Maggiore', 'Serravalle', 'Domagnano',
  'Fiorentino', 'Acquaviva', 'Faetano', 'Montegiardino', 'Chiesanuova',
];

const inputBox = {
  height: 54, borderRadius: 14, backgroundColor: '#fff',
  borderWidth: 1.5, borderColor: T.line,
  flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 10,
};
const inputText = { flex: 1, fontFamily: ff(400), fontSize: 16, color: T.strong };
const fieldLabel = { fontFamily: ff(700), fontSize: 12, letterSpacing: 0.6, color: T.muted, marginBottom: 7 };

export function RegisterScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { setSession } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [castle, setCastle] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = name.trim().length >= 2 && email.includes('@') && pass.length >= 8;

  const submit = async () => {
    if (!canSubmit || loading) return;
    setLoading(true); setErr('');
    try {
      const { user } = await sbSignUp(email.trim(), pass, name.trim());
      // If email confirmation is required, there may be no active session yet.
      if (user) {
        const [profile, txs] = await Promise.all([
          sbGetProfile(user.id).catch(() => null),
          sbGetTransactions(user.id).catch(() => []),
        ]);
        setSession(user, profile, txs);
      }
    } catch (e) {
      const msg = e.message || '';
      if (msg.toLowerCase().includes('already registered') || msg.includes('User already'))
        setErr('Questa email è già registrata. Prova ad accedere.');
      else if (msg.includes('Password'))
        setErr('La password deve avere almeno 8 caratteri.');
      else setErr(msg || 'Errore durante la creazione del conto. Riprova.');
    } finally { setLoading(false); }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: T.cream }}
    >
      <View style={{ height: insets.top + 8 }} />
      <Header title="Apri il conto" sub="Passo 1 · I tuoi dati" onBack={() => navigation.goBack()} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 }} keyboardShouldPersistTaps="handled">
        <View style={{ marginBottom: 14 }}>
          <Text style={fieldLabel}>NOME E COGNOME</Text>
          <View style={inputBox}>
            <TextInput value={name} onChangeText={setName} placeholder="Mario Rossi" placeholderTextColor={T.faint} autoCapitalize="words" style={inputText} />
          </View>
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={fieldLabel}>EMAIL</Text>
          <View style={inputBox}>
            <TextInput value={email} onChangeText={setEmail} placeholder="mario@email.sm" placeholderTextColor={T.faint} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} style={inputText} />
          </View>
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={fieldLabel}>PASSWORD</Text>
          <View style={inputBox}>
            <TextInput value={pass} onChangeText={setPass} placeholder="Almeno 8 caratteri" placeholderTextColor={T.faint} secureTextEntry={!showPass} autoCapitalize="none" style={inputText} />
            <Pressable onPress={() => setShowPass(v => !v)} hitSlop={8}>
              <Icon name="eye" size={19} color={T.faint} />
            </Pressable>
          </View>
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={fieldLabel}>TELEFONO</Text>
          <View style={inputBox}>
            <Text style={{ fontFamily: ff(600), fontSize: 16, color: T.muted }}>+378</Text>
            <TextInput value={phone} onChangeText={setPhone} placeholder="66 12 34 56" placeholderTextColor={T.faint} keyboardType="phone-pad" style={inputText} />
          </View>
        </View>

        <View style={{ marginBottom: 6 }}>
          <Text style={fieldLabel}>CASTELLO DI RESIDENZA</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {CASTLES.map(c => {
              const on = castle === c;
              return (
                <Pressable key={c} onPress={() => setCastle(on ? '' : c)} style={{
                  paddingHorizontal: 14, height: 38, borderRadius: 11, justifyContent: 'center',
                  backgroundColor: on ? T.forest : '#fff',
                  borderWidth: 1.5, borderColor: on ? T.forest : T.line,
                }}>
                  <Text style={{ fontFamily: ff(600), fontSize: 13.5, color: on ? '#F4F1E8' : T.text }}>{c}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {err ? (
          <View style={{ flexDirection: 'row', gap: 9, alignItems: 'flex-start', padding: 12, borderRadius: 13, backgroundColor: T.negBg, marginTop: 16 }}>
            <Icon name="close" size={17} color={T.neg} sw={2.2} />
            <Text style={{ flex: 1, fontFamily: ff(500), fontSize: 13.5, color: T.neg }}>{err}</Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: insets.bottom + 16, borderTopWidth: 1, borderTopColor: T.lineSoft }}>
        <Button onPress={submit} disabled={!canSubmit} loading={loading}>
          {loading ? 'Creazione conto…' : 'Continua'}
        </Button>
        <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 12, height: 46, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: ff(600), fontSize: 15, color: T.muted }}>
            Hai già un conto? <Text style={{ color: T.forest }}>Accedi</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
