// Custom bottom tab bar matching crest-ui.jsx TabBar.
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T, ff } from '../theme/tokens';
import { Icon } from '../components/Icon';

const ICON_FOR = { HomeTab: 'home', CardTab: 'card', AnalysisTab: 'chart', ProfileTab: 'user' };
const LABEL_FOR = { HomeTab: 'Home', CardTab: 'Carta', AnalysisTab: 'Analisi', ProfileTab: 'Profilo' };

export function CrestTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'flex-start', paddingTop: 8,
      paddingBottom: Math.max(insets.bottom, 12),
      backgroundColor: 'rgba(251,250,244,0.96)',
      borderTopWidth: 1, borderTopColor: T.lineSoft,
    }}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <Pressable key={route.key} onPress={onPress} style={{ flex: 1, alignItems: 'center', gap: 3 }}>
            <Icon name={ICON_FOR[route.name]} size={24} sw={focused ? 2.2 : 1.9} color={focused ? T.forest : T.faint} />
            <Text style={{ fontFamily: ff(focused ? 700 : 500), fontSize: 10.5, letterSpacing: 0.1, color: focused ? T.forest : T.faint }}>
              {LABEL_FOR[route.name]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
