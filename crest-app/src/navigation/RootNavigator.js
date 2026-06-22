// Root navigation: switches between the auth stack and the main app based on
// the Supabase session held in AuthContext.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from '../context/AuthContext';
import { CrestTabBar } from './TabBar';

import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { makePlaceholder } from '../screens/Placeholder';

const CardScreen = makePlaceholder('Carta', 'Carta virtuale e fisica, freeze, limiti e sicurezza.');
const AnalysisScreen = makePlaceholder('Analisi', 'Analisi spese settimanali e per categoria.');
const SendScreen = makePlaceholder('Invia denaro', 'Destinatario, importo e conferma slide-to-send.');
const ReceiveScreen = makePlaceholder('Ricevi', 'QR, IBAN e BIC con copia rapida.');
const SavingsScreen = makePlaceholder('Risparmio', 'Obiettivi di risparmio con barre di avanzamento.');
const ExchangeScreen = makePlaceholder('Cambio valuta', 'Tassi live e conversione con commissione trasparente.');
const NotificationsScreen = makePlaceholder('Notifiche', 'Permessi push e preferenze per categoria.');
const TransactionsScreen = makePlaceholder('Movimenti', 'Tutte le operazioni con filtri.');
const TxDetailScreen = makePlaceholder('Dettaglio operazione', 'Categoria, tipo, riferimento e azioni.');

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function AuthFlow() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CrestTabBar {...props} />}
    >
      <Tabs.Screen name="HomeTab" component={HomeScreen} />
      <Tabs.Screen name="CardTab" component={CardScreen} />
      <Tabs.Screen name="AnalysisTab" component={AnalysisScreen} />
      <Tabs.Screen name="ProfileTab" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

function AppFlow() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
      <AppStack.Screen name="Tabs" component={MainTabs} />
      <AppStack.Screen name="Send" component={SendScreen} />
      <AppStack.Screen name="Receive" component={ReceiveScreen} />
      <AppStack.Screen name="Savings" component={SavingsScreen} />
      <AppStack.Screen name="Exchange" component={ExchangeScreen} />
      <AppStack.Screen name="Notifications" component={NotificationsScreen} />
      <AppStack.Screen name="Transactions" component={TransactionsScreen} />
      <AppStack.Screen name="TxDetail" component={TxDetailScreen} />
    </AppStack.Navigator>
  );
}

export function RootNavigator() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user
          ? <RootStack.Screen name="App" component={AppFlow} />
          : <RootStack.Screen name="Auth" component={AuthFlow} />}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
