import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { T, ff } from '../theme/tokens';
import { Icon } from './Icon';

export function Header({ title, onBack, right, sub, dark }) {
  const fg = dark ? '#F4F1E8' : T.strong;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingTop: 4, paddingBottom: 14, minHeight: 48 }}>
      {onBack && (
        <Pressable
          onPress={onBack}
          style={{
            width: 40, height: 40, marginLeft: -8, borderRadius: 13,
            backgroundColor: dark ? 'rgba(255,255,255,.12)' : T.sage100,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon name="chevL" size={20} sw={2.2} color={fg} />
        </Pressable>
      )}
      <View style={{ flex: 1, minWidth: 0 }}>
        {title ? (
          <Text style={{ fontFamily: ff(700), fontSize: 19, letterSpacing: -0.3, color: fg }}>{title}</Text>
        ) : null}
        {sub ? (
          <Text style={{ fontFamily: ff(400), fontSize: 13, color: dark ? 'rgba(244,241,232,.6)' : T.muted, marginTop: 1 }}>{sub}</Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}
