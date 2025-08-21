import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { RouteName } from '../../navigation/Navigator';
import { festiveTheme } from '../../theme';
import { fontScale, moderateScale } from '../../utils/scale';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SplashScreen: React.FC<{ navigate: (name: RouteName) => void }> = ({ navigate }) => {
  const { isBooting, user } = useApp();

  useEffect(() => {
    if (!isBooting) {
      if (user) navigate('Home');
      else navigate('Login');
    }
  }, [isBooting, user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrap}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>DT</Text>
        </View>
        <Text style={styles.appTitle}>Digital Tuhfa</Text>
        <Text style={styles.tagline}>Create magical moments</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: festiveTheme.colors.background },
  logoWrap: { alignItems: 'center' },
  logoCircle: { width: moderateScale(96), height: moderateScale(96), borderRadius: 999, backgroundColor: festiveTheme.colors.primary, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: 'white', fontWeight: '800', fontSize: fontScale(32) },
  appTitle: { marginTop: 12, fontSize: fontScale(24), fontWeight: '800', color: festiveTheme.colors.primary },
  tagline: { color: festiveTheme.colors.textSecondary, marginTop: 6 },
});

