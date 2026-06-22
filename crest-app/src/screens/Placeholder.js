// Generic "in arrivo" screen for the routes not yet built in this milestone.
// Each will be replaced by its faithful port (Card, Analysis, Send flow, …).
import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T, ff } from '../theme/tokens';
import { Header } from '../components/Header';
import { Icon } from '../components/Icon';

export function makePlaceholder(title, sub) {
  return function PlaceholderScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    return (
      <View style={{ flex: 1, backgroundColor: T.cream }}>
        <View style={{ height: insets.top + 8 }} />
        {navigation?.canGoBack?.()
          ? <Header title={title} onBack={() => navigation.goBack()} />
          : <View style={{ paddingHorizontal: 20, paddingTop: insets.top + 8 }}>
              <Text style={{ fontFamily: ff(800), fontSize: 28, letterSpacing: -0.8, color: T.strong }}>{title}</Text>
            </View>}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, paddingHorizontal: 32 }}>
          <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: T.sage100, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="clock" size={30} color={T.forest} />
          </View>
          <Text style={{ fontFamily: ff(700), fontSize: 18, color: T.strong, textAlign: 'center' }}>In arrivo</Text>
          <Text style={{ fontFamily: ff(400), fontSize: 14.5, lineHeight: 21, color: T.muted, textAlign: 'center' }}>
            {sub || 'Questa schermata fa parte del prossimo step di sviluppo.'}
          </Text>
        </View>
      </View>
    );
  };
}
