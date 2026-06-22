// Button + IconBtn ported from crest-ui.jsx.
import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { T, ff, SHADOW } from '../theme/tokens';
import { Icon } from './Icon';

const SIZES = {
  lg: { height: 54, fontSize: 16.5, radius: 16, padH: 22, icon: 20 },
  md: { height: 46, fontSize: 15, radius: 13, padH: 18, icon: 18 },
  sm: { height: 38, fontSize: 14, radius: 11, padH: 14, icon: 18 },
};

const VARIANTS = {
  primary: { bg: T.forest, fg: '#F4F1E8', shadow: SHADOW.btnGreen },
  brass: { bg: T.brass, fg: '#FBF7EE', shadow: SHADOW.btnBrass },
  soft: { bg: T.sage100, fg: T.forest },
  outline: { bg: 'transparent', fg: T.forest, border: T.line },
  ghost: { bg: 'transparent', fg: T.forest },
  danger: { bg: T.negBg, fg: T.neg },
};

export function Button({
  children, onPress, variant = 'primary', size = 'lg',
  icon, full = true, disabled, loading, style,
}) {
  const s = SIZES[size];
  const v = VARIANTS[variant];
  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          height: s.height, borderRadius: s.radius, paddingHorizontal: s.padH,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9,
          backgroundColor: v.bg, opacity: disabled ? 0.45 : 1,
          width: full ? '100%' : undefined,
          borderWidth: v.border ? 1.5 : 0, borderColor: v.border,
          transform: [{ scale: pressed ? 0.975 : 1 }],
        },
        v.shadow,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.fg} size="small" />
      ) : (
        <>
          {icon && <Icon name={icon} size={s.icon} sw={2} color={v.fg} />}
          {typeof children === 'string'
            ? <Text style={{ fontFamily: ff(600), fontSize: s.fontSize, color: v.fg }}>{children}</Text>
            : children}
        </>
      )}
    </Pressable>
  );
}

export function IconBtn({
  name, onPress, color = T.forest, bg = T.sage100,
  size = 42, iconSize = 20, style,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: size, height: size, borderRadius: size / 2.6, backgroundColor: bg,
          alignItems: 'center', justifyContent: 'center',
          transform: [{ scale: pressed ? 0.92 : 1 }],
        },
        style,
      ]}
    >
      <Icon name={name} size={iconSize} sw={2} color={color} />
    </Pressable>
  );
}
