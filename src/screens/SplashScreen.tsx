import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { RouteName } from '../navigation/Navigator';
import { festiveTheme } from '../theme';

export const SplashScreen: React.FC<{ navigate: (name: RouteName) => void }> = ({ navigate }) => {
  const { user } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) navigate('Home');
      else navigate('Login');
    }, 800);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Tuhfa</Text>
      <ActivityIndicator color={festiveTheme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: festiveTheme.colors.primary, marginBottom: 12 },
});

