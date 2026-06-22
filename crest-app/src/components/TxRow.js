import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { T, ff, money } from '../theme/tokens';
import { Avatar } from './Avatar';

export function TxRow({ tx, onPress, last }) {
  const incoming = tx.amount > 0;
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row', alignItems: 'center', gap: 13, width: '100%',
        paddingVertical: 12,
        borderBottomWidth: last ? 0 : 1, borderBottomColor: T.lineSoft,
      }}
    >
      <Avatar label={tx.icon} bg={tx.bg || T.sage100} color={tx.fg || T.forest} size={42} />
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ fontFamily: ff(600), fontSize: 15, color: T.strong }}>{tx.name}</Text>
        <Text style={{ fontFamily: ff(400), fontSize: 12.5, color: T.faint, marginTop: 1 }}>{tx.meta}</Text>
      </View>
      <Text style={{ fontFamily: ff(700), fontSize: 15, color: incoming ? T.pos : T.strong, fontVariant: ['tabular-nums'] }}>
        {money(tx.amount, incoming ? '+' : '-')}
      </Text>
    </Pressable>
  );
}
