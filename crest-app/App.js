import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenExpo from 'expo-splash-screen';
import {
  useFonts,
  SchibstedGrotesk_400Regular,
  SchibstedGrotesk_500Medium,
  SchibstedGrotesk_600SemiBold,
  SchibstedGrotesk_700Bold,
  SchibstedGrotesk_800ExtraBold,
} from '@expo-google-fonts/schibsted-grotesk';
import { Newsreader_400Regular_Italic } from '@expo-google-fonts/newsreader';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { SplashScreen } from './src/screens/SplashScreen';

SplashScreenExpo.preventAutoHideAsync().catch(() => {});

function Gate() {
  const { booting } = useAuth();
  if (booting) return <SplashScreen />;
  return <RootNavigator />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    SchibstedGrotesk_400Regular,
    SchibstedGrotesk_500Medium,
    SchibstedGrotesk_600SemiBold,
    SchibstedGrotesk_700Bold,
    SchibstedGrotesk_800ExtraBold,
    Newsreader_400Regular_Italic,
  });

  const onLayout = useCallback(async () => {
    if (fontsLoaded) await SplashScreenExpo.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return <SplashScreen />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayout}>
      <SafeAreaProvider>
        <AuthProvider>
          <StatusBar style="dark" />
          <Gate />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
