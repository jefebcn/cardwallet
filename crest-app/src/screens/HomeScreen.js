// Home tab — ported from crest-screens.jsx `Home`. Reads live profile/txs.
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T, ff, money } from '../theme/tokens';
import { Icon } from '../components/Icon';
import { IconBtn } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { CrestCard } from '../components/CrestCard';
import { TxRow } from '../components/TxRow';
import { BUDGET, TX } from '../data/mock';
import { useAuth } from '../context/AuthContext';

const QUICK = [
  ['up', 'Invia', 'Send'],
  ['down', 'Ricevi', 'Receive'],
  ['scan', 'Risparmio', 'Savings'],
  ['arrowR', 'Cambia', 'Exchange'],
];

export function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { balance, txs, userName } = useAuth();
  const [hide, setHide] = useState(false);

  const firstName = (userName || 'Mario').split(' ')[0];
  // Use live transactions when present, otherwise demo data for a full preview.
  const list = txs && txs.length ? txs : TX;

  const go = (route) => navigation?.navigate?.(route);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: T.cream }} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
      {/* forest header block */}
      <LinearGradient
        colors={[T.forest, T.forest700]}
        start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }}
        style={{ paddingTop: insets.top + 14, paddingHorizontal: 20, paddingBottom: 26, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 11 }}>
            <Avatar label={firstName.charAt(0)} bg="rgba(255,255,255,.14)" color="#EFEAD9" size={40} />
            <View>
              <Text style={{ fontFamily: ff(400), fontSize: 12.5, color: 'rgba(244,241,232,.62)' }}>Bentornato</Text>
              <Text style={{ fontFamily: ff(700), fontSize: 16, color: '#F4F1E8' }}>{userName}</Text>
            </View>
          </View>
          <IconBtn name="bell" onPress={() => go('Notifications')} bg="rgba(255,255,255,.12)" color="#EFEAD9" size={40} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontFamily: ff(400), fontSize: 13.5, color: 'rgba(244,241,232,.62)' }}>Saldo disponibile</Text>
          <Pressable onPress={() => setHide(h => !h)} hitSlop={8}>
            <Icon name="eye" size={16} color="rgba(244,241,232,.62)" />
          </Pressable>
        </View>
        <Text style={{ fontFamily: ff(700), fontSize: 42, letterSpacing: -1.5, color: '#F4F1E8', marginTop: 3, fontVariant: ['tabular-nums'] }}>
          {hide ? '€ ••••••' : money(balance)}
        </Text>

        <View style={{ flexDirection: 'row', gap: 9, marginTop: 22 }}>
          {QUICK.map(([ic, lb, dest]) => (
            <Pressable key={lb} onPress={() => go(dest)} style={{ flex: 1, alignItems: 'center', gap: 7 }}>
              <View style={{ width: 50, height: 50, borderRadius: 16, backgroundColor: 'rgba(255,255,255,.13)', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={ic} size={22} sw={2.1} color="#EFEAD9" />
              </View>
              <Text style={{ fontFamily: ff(600), fontSize: 12, color: '#EFEAD9' }}>{lb}</Text>
            </Pressable>
          ))}
        </View>
      </LinearGradient>

      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        {/* card teaser */}
        <Pressable onPress={() => navigation.navigate('CardTab')} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: T.lineSoft, borderRadius: 18, padding: 14, marginBottom: 20 }}>
          <View style={{ width: 84 }}><CrestCard compact /></View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: ff(700), fontSize: 15, color: T.strong }}>Carta virtuale</Text>
            <Text style={{ fontFamily: ff(400), fontSize: 12.5, color: T.muted, marginTop: 2 }}>4920 ·· ·· 3017 · Attiva</Text>
          </View>
          <Icon name="chevR" size={20} color={T.faint} />
        </Pressable>

        {/* spending mini */}
        <Pressable onPress={() => navigation.navigate('AnalysisTab')} style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: T.lineSoft, borderRadius: 18, padding: 18, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontFamily: ff(700), fontSize: 14.5, color: T.strong }}>Spese di giugno</Text>
            <Text style={{ fontFamily: ff(700), fontSize: 14.5, color: T.strong }}>€ 1.240</Text>
          </View>
          <View style={{ flexDirection: 'row', height: 9, borderRadius: 6, overflow: 'hidden', gap: 2 }}>
            {BUDGET.map(b => <View key={b.cat} style={{ width: `${b.pct}%`, backgroundColor: b.color }} />)}
          </View>
          <View style={{ flexDirection: 'row', gap: 14, marginTop: 11 }}>
            {BUDGET.map(b => (
              <View key={b.cat} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: b.color }} />
                <Text style={{ fontFamily: ff(400), fontSize: 12, color: T.muted }}>{b.cat}</Text>
              </View>
            ))}
          </View>
        </Pressable>

        {/* recent tx */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <Text style={{ fontFamily: ff(700), fontSize: 16, color: T.strong }}>Ultime operazioni</Text>
          <Pressable onPress={() => navigation.navigate('Transactions')}>
            <Text style={{ fontFamily: ff(600), fontSize: 13.5, color: T.forest }}>Vedi tutte</Text>
          </Pressable>
        </View>
        <View style={{ backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 16, paddingVertical: 2, borderWidth: 1, borderColor: T.lineSoft }}>
          {list.slice(0, 4).map((t, i) => (
            <TxRow key={t.id} tx={t} onPress={() => navigation.navigate('TxDetail', { tx: t })} last={i === Math.min(list.length, 4) - 1} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
