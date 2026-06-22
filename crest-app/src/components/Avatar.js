import React from 'react';
import { View, Text } from 'react-native';
import { T, ff } from '../theme/tokens';

export function Avatar({ label, color = T.forest, bg = T.sage100, size = 44 }) {
  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2.7, backgroundColor: bg,
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ fontFamily: ff(700), fontSize: size * 0.4, color }}>{label}</Text>
    </View>
  );
}

export function Eyebrow({ children, color = T.brass }) {
  return (
    <Text style={{
      fontFamily: ff(700), fontSize: 11.5, letterSpacing: 1.6,
      textTransform: 'uppercase', color,
    }}>{children}</Text>
  );
}
