// Payment card visual ported from crest-ui.jsx -> RN (LinearGradient + SVG).
import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { T, ff, SHADOW } from '../theme/tokens';
import { Mark } from './Mark';
import { Contactless, FreezeGlyph } from './Icon';

export function CrestCard({
  frozen, holder = 'M. Rossi', last4 = '3017',
  variant = 'forest', compact, style,
}) {
  const isMetal = variant === 'metal';
  const colors = isMetal
    ? ['#1B3327', '#2C5544', '#15261E']
    : ['#234638', '#1E3A2F', '#152A21'];
  const locations = isMetal ? [0, 0.48, 1] : [0, 0.55, 1];

  return (
    <View style={[{
      aspectRatio: 1.586, borderRadius: 20, overflow: 'hidden',
    }, SHADOW.cardFloat, style]}>
      <LinearGradient
        colors={colors}
        locations={locations}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={{ flex: 1 }}
      >
        {/* brass guilloché sheen — two soft radial highlights approximated */}
        <View pointerEvents="none" style={{ position: 'absolute', top: -30, right: -20, width: 180, height: 140, borderRadius: 90, backgroundColor: 'rgba(199,168,119,0.20)' }} />
        <View pointerEvents="none" style={{ position: 'absolute', bottom: -30, left: -20, width: 150, height: 120, borderRadius: 80, backgroundColor: 'rgba(110,150,132,0.16)' }} />

        <View style={{
          flex: 1,
          paddingHorizontal: compact ? 18 : 24,
          paddingVertical: compact ? 16 : 22,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
              <Mark size={compact ? 19 : 24} color="#EFEAD9" />
              <Text style={{ fontFamily: ff(700), fontSize: compact ? 15 : 18, letterSpacing: -0.3, color: '#EFEAD9' }}>Crest</Text>
            </View>
            <Contactless size={compact ? 18 : 22} />
          </View>

          <View style={{ flex: 1 }} />

          {!compact && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <LinearGradient
                colors={['#D9C18C', '#A8854E']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={{ width: 38, height: 28, borderRadius: 6 }}
              />
              <Text style={{ fontFamily: ff('serifItalic'), fontStyle: 'italic', fontSize: 16, color: 'rgba(239,234,217,0.8)' }}>Libertas</Text>
            </View>
          )}

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontFamily: ff(400), fontSize: compact ? 13 : 15.5, letterSpacing: 2, color: '#EFEAD9', fontVariant: ['tabular-nums'] }}>
                4920 ·· ·· {last4}
              </Text>
              <Text style={{ fontSize: compact ? 10 : 11.5, letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(239,234,217,0.66)', marginTop: 5, fontFamily: ff(500) }}>{holder}</Text>
            </View>
            {!compact && <Text style={{ fontFamily: ff('serifItalic'), fontStyle: 'italic', fontSize: 13, color: 'rgba(239,234,217,0.55)' }}>MMXXVI</Text>}
          </View>
        </View>

        {frozen && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(220,232,224,0.40)', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(21,38,30,0.55)', alignItems: 'center', justifyContent: 'center' }}>
              <FreezeGlyph size={26} />
            </View>
            <Text style={{ fontFamily: ff(700), fontSize: 13, color: '#15261E', letterSpacing: 0.3 }}>CARTA BLOCCATA</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}
