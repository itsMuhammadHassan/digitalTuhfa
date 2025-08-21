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
import { AppProvider } from './src/context/AppContext';
import { Navigator } from './src/navigation/Navigator';
import { HomeScreen } from './src/screens/HomeScreen';
import { CustomizeScreen } from './src/screens/CustomizeScreen';
import { GiftPaymentScreen } from './src/screens/GiftPaymentScreen';
import { ShareScreen } from './src/screens/ShareScreen';
import { MomentsScreen } from './src/screens/MomentsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ScheduleScreen } from './src/screens/ScheduleScreen';

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

  return (
    <View style={styles.container}>
      <Navigator
        initialRoute="Home"
        screens={{
          Home: HomeScreen,
          Customize: CustomizeScreen,
          GiftPayment: GiftPaymentScreen,
          Share: ShareScreen,
          Moments: MomentsScreen,
          Profile: ProfileScreen,
          Schedule: ScheduleScreen,
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
