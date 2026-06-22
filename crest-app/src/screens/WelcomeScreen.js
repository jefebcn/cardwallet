// Welcome — dark forest gradient, tilted card preview, primary CTA.
import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T, ff } from '../theme/tokens';
import { Button } from '../components/Button';
import { CrestCard } from '../components/CrestCard';
import { Mark } from '../components/Mark';

export function WelcomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={['#1E3A2F', '#234638', '#13241D']}
      locations={[0, 0.55, 1]}
      start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }}
      style={{ flex: 1, paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 24, paddingTop: 8 }}>
        <Mark size={26} color="#EFEAD9" />
        <Text style={{ fontFamily: ff(700), fontSize: 20, color: '#EFEAD9', letterSpacing: -0.4 }}>Crest</Text>
      </View>

      {/* Tilted card preview */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 300, transform: [{ rotate: '-7deg' }] }}>
          <CrestCard />
        </View>
      </View>

      {/* Headline + CTA */}
      <View style={{ paddingHorizontal: 24 }}>
        <Text style={{ fontFamily: ff('serifItalic'), fontStyle: 'italic', fontSize: 14, letterSpacing: 0.5, color: T.brassLt }}>
          Repubblica di San Marino
        </Text>
        <Text style={{ fontFamily: ff(800), fontSize: 38, lineHeight: 42, letterSpacing: -1.2, color: '#F4F1E8', marginTop: 10 }}>
          Il tuo denaro,{'\n'}senza confini.
        </Text>
        <Text style={{ fontFamily: ff(400), fontSize: 15.5, lineHeight: 23, color: 'rgba(244,241,232,0.66)', marginTop: 14 }}>
          IBAN dedicato, carta e trasferimenti istantanei. Il conto moderno pensato per chi vive nella Repubblica.
        </Text>

        <View style={{ marginTop: 28, gap: 12 }}>
          <Button variant="brass" onPress={() => navigation.navigate('Register')}>Apri il conto</Button>
          <Button
            variant="ghost"
            onPress={() => navigation.navigate('Login')}
            style={{ height: 46 }}
          >
            <Text style={{ fontFamily: ff(600), fontSize: 15, color: 'rgba(244,241,232,0.82)' }}>
              Ho già un conto · <Text style={{ color: '#EFEAD9' }}>Accedi</Text>
            </Text>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
}
