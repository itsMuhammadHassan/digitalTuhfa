/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { Navigator } from './src/navigation/Navigator';
import { HomeScreen } from './src/screens/HomeScreen';
import { CustomizeScreen } from './src/screens/CustomizeScreen';
import { GiftPaymentScreen } from './src/screens/GiftPaymentScreen';
import { ShareScreen } from './src/screens/ShareScreen';
import { MomentsScreen } from './src/screens/MomentsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ScheduleScreen } from './src/screens/ScheduleScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignupScreen } from './src/screens/SignupScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppProvider>
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const { user } = useApp();

  return (
    <View style={styles.container}>
      <Navigator
        initialRoute="Splash"
        isAuthenticated={!!user}
        screens={{
          Splash: SplashScreen as any,
          Login: LoginScreen as any,
          Signup: SignupScreen as any,
          Home: HomeScreen as any,
          Customize: CustomizeScreen as any,
          GiftPayment: GiftPaymentScreen as any,
          Share: ShareScreen as any,
          Moments: MomentsScreen as any,
          Profile: ProfileScreen as any,
          Schedule: ScheduleScreen as any,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
