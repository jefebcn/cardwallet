// Profile tab — identity card, plan banner, settings groups, logout.
// Trimmed from crest-profile.jsx for the first milestone (logout is wired).
import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T, ff } from '../theme/tokens';
import { Avatar } from '../components/Avatar';
import { Icon } from '../components/Icon';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

function Row({ icon, label, onPress, danger }) {
  return (
    <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 14, paddingHorizontal: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: T.lineSoft }}>
      <View style={{ width: 34, height: 34, borderRadius: 11, backgroundColor: danger ? T.negBg : T.sage100, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={18} color={danger ? T.neg : T.forest} />
      </View>
      <Text style={{ flex: 1, fontFamily: ff(600), fontSize: 15, color: danger ? T.neg : T.strong }}>{label}</Text>
      {!danger && <Icon name="chevR" size={18} color={T.faint} />}
    </Pressable>
  );
}

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { userName, user, profile, signOut } = useAuth();
  const initials = (userName || 'M R').split(' ').map(s => s.charAt(0)).join('').slice(0, 2).toUpperCase();
  const plan = profile?.plan || 'Standard';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: T.cream }} contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 8 }}>
        <Text style={{ fontFamily: ff(800), fontSize: 28, letterSpacing: -0.8, color: T.strong }}>Profilo</Text>
      </View>

      {/* identity card */}
      <View style={{ marginHorizontal: 20, marginTop: 8, backgroundColor: '#fff', borderRadius: 18, borderWidth: 1, borderColor: T.lineSoft, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <Avatar label={initials} size={56} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontFamily: ff(700), fontSize: 17, color: T.strong }}>{userName}</Text>
          <Text numberOfLines={1} style={{ fontFamily: ff(400), fontSize: 13, color: T.muted, marginTop: 2 }}>{user?.email || '—'}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 }}>
            <Icon name="check" size={14} color={T.pos} sw={2.4} />
            <Text style={{ fontFamily: ff(600), fontSize: 12, color: T.pos }}>Verificato</Text>
          </View>
        </View>
      </View>

      {/* plan banner */}
      <LinearGradient colors={['#C7A877', '#A8854E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ marginHorizontal: 20, marginTop: 14, borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontFamily: ff('serifItalic'), fontStyle: 'italic', fontSize: 13, color: 'rgba(251,247,238,0.85)' }}>Il tuo piano</Text>
          <Text style={{ fontFamily: ff(700), fontSize: 20, color: '#FBF7EE', marginTop: 2 }}>{plan}</Text>
        </View>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.18)', paddingHorizontal: 14, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: ff(700), fontSize: 13.5, color: '#FBF7EE' }}>Cambia piano</Text>
        </View>
      </LinearGradient>

      {/* settings groups */}
      <Text style={groupLabel}>CONTO</Text>
      <View style={group}>
        <Row icon="user" label="Dati personali" />
        <Row icon="card" label="Conto e IBAN" />
        <Row icon="shield" label="Sicurezza" />
      </View>

      <Text style={groupLabel}>CREST</Text>
      <View style={group}>
        <Row icon="bell" label="Notifiche" />
        <Row icon="clock" label="Roadmap" />
        <Row icon="doc" label="Conformità & licenze" />
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
        <Button variant="danger" onPress={signOut}>Esci dal conto</Button>
      </View>

      <Text style={{ textAlign: 'center', fontFamily: ff(400), fontSize: 11.5, color: T.faint, marginTop: 18 }}>
        © 2026 Crest · San Marino (RSM){'\n'}Progetto in pre-lancio · non è una banca autorizzata.
      </Text>
    </ScrollView>
  );
}

const groupLabel = { fontFamily: ff(700), fontSize: 11.5, letterSpacing: 1, color: T.faint, marginTop: 22, marginBottom: 8, marginHorizontal: 20 };
const group = { marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: T.lineSoft, overflow: 'hidden' };
