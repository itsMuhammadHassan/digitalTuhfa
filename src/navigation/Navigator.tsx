import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { festiveTheme } from '../theme';
import { HomeScreen } from '../screens/HomeScreen';
import { CustomizeScreen } from '../screens/CustomizeScreen';
import { MomentsScreen } from '../screens/MomentsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { GiftPaymentScreen } from '../screens/GiftPaymentScreen';
import { ShareScreen } from '../screens/ShareScreen';
import { SplashScreen } from '../screens/auth/SplashScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';

export type RouteName =
  | 'Splash'
  | 'Login'
  | 'Signup'
  | 'Home'
  | 'Customize'
  | 'GiftPayment'
  | 'Share'
  | 'Moments'
  | 'Profile'
  | 'Schedule';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: festiveTheme.colors.background,
    card: festiveTheme.colors.surface,
    primary: festiveTheme.colors.primary,
    text: festiveTheme.colors.textPrimary,
    border: festiveTheme.colors.muted,
  },
};

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: 64,
        backgroundColor: '#FFFFFF',
        elevation: 8,
      },
      tabBarActiveTintColor: festiveTheme.colors.primary,
      tabBarInactiveTintColor: '#7A7A7A',
      tabBarLabelStyle: { fontWeight: '600' },
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen as any} />
    <Tab.Screen name="Customize" component={CustomizeScreen as any} options={{ title: 'Create' }} />
    <Tab.Screen name="Moments" component={MomentsScreen as any} />
    <Tab.Screen name="Profile" component={ProfileScreen as any} />
  </Tab.Navigator>
);

export const Navigator = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen as any} />
        <Stack.Screen name="Login" component={LoginScreen as any} />
        <Stack.Screen name="Signup" component={SignupScreen as any} />
        <Stack.Screen name="Root" component={Tabs} />
        <Stack.Screen name="GiftPayment" component={GiftPaymentScreen as any} />
        <Stack.Screen name="Share" component={ShareScreen as any} />
        <Stack.Screen name="Schedule" component={ScheduleScreen as any} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};