// Crest logomark — official "C + Monte Titano" mark (pre-tinted PNGs).
import React from 'react';
import { Image, View, Text } from 'react-native';
import { T, ff } from '../theme/tokens';

const MARK_AR = 0.84; // width / height of the trimmed logo
const FOREST = require('../../assets/crest-mark-forest.png');
const CREAM = require('../../assets/crest-mark-cream.png');

function lum(hex) {
  if (typeof hex !== 'string' || hex[0] !== '#' || hex.length < 7) return 0;
  return 0.299 * parseInt(hex.slice(1, 3), 16)
    + 0.587 * parseInt(hex.slice(3, 5), 16)
    + 0.114 * parseInt(hex.slice(5, 7), 16);
}

export function Mark({ size = 28, color = T.forest }) {
  const h = size;
  const w = Math.round(size * MARK_AR);
  const src = lum(color) > 150 ? CREAM : FOREST;
  return <Image source={src} style={{ width: w, height: h, resizeMode: 'contain' }} />;
}

export function Wordmark({ color = T.forest, size = 22 }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Mark size={size * 1.05} color={color} />
      <Text style={{ fontFamily: ff(700), fontSize: size, letterSpacing: -0.4, color, marginLeft: 8 }}>
        Crest
      </Text>
    </View>
  );
}
