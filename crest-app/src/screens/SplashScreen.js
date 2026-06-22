// Boot screen shown while fonts load / session is restored.
import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { T, ff } from '../theme/tokens';
import { Mark } from '../components/Mark';

export function SplashScreen() {
  return (
    <LinearGradient
      colors={['#1E3A2F', '#234638', '#13241D']}
      locations={[0, 0.5, 1]}
      start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}
    >
      <View style={{ width: 96, height: 96, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' }}>
        <Mark size={58} color="#EFEAD9" />
      </View>
      <Text style={{ fontFamily: ff(700), fontSize: 26, letterSpacing: -0.6, color: '#EFEAD9' }}>Crest</Text>
      <Text style={{ fontFamily: ff('serifItalic'), fontStyle: 'italic', fontSize: 14, color: 'rgba(239,234,217,0.6)' }}>
        Repubblica di San Marino
      </Text>
    </LinearGradient>
  );
}
