import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { festiveTheme } from '../../theme';
import { fontScale, moderateScale } from '../../utils/scale';
import { useApp } from '../../context/AppContext';

export const LoginScreen: React.FC<any> = ({ navigation }) => {
  const { signIn, signInWithGoogle } = useApp();
  const [email, setEmail] = useState('demo@tuhfa.app');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (loading) return;
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
    navigation.replace('Root');
  };

  const onGoogle = async () => {
    if (loading) return;
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
    navigation.replace('Root');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to create and share moments</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputWrap}>
          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="you@example.com" placeholderTextColor="#9E9E9E" />
        </View>
        <View style={{ height: 12 }} />
        <View style={styles.inputWrap}>
          <Text style={styles.label}>Password</Text>
          <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry placeholder="••••••••" placeholderTextColor="#9E9E9E" />
        </View>
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9} onPress={onLogin}>
          <Text style={styles.primaryText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleBtn} onPress={onGoogle}>
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.switchText}>New here? Create account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: festiveTheme.colors.background },
  header: { marginTop: 12, marginBottom: 8 },
  title: { fontSize: fontScale(28), fontWeight: '800', color: festiveTheme.colors.primary },
  subtitle: { color: festiveTheme.colors.textSecondary },
  card: { backgroundColor: festiveTheme.colors.surface, borderRadius: 24, padding: 16, marginTop: 16, ...festiveTheme.shadow.card },
  inputWrap: { },
  label: { color: festiveTheme.colors.textSecondary, marginBottom: 4 },
  input: { backgroundColor: '#F8F6F0', borderRadius: 14, paddingVertical: moderateScale(12), paddingHorizontal: 14, color: festiveTheme.colors.textPrimary },
  primaryBtn: { marginTop: 16, backgroundColor: festiveTheme.colors.primary, paddingVertical: moderateScale(12), borderRadius: 999, alignItems: 'center' },
  primaryText: { color: 'white', fontWeight: '700', fontSize: fontScale(16) },
  googleBtn: { marginTop: 12, backgroundColor: 'white', borderWidth: 1, borderColor: '#E0E0E0', paddingVertical: moderateScale(12), borderRadius: 999, alignItems: 'center' },
  googleText: { color: '#222', fontWeight: '600' },
  switchText: { textAlign: 'center', marginTop: 14, color: festiveTheme.colors.primary, fontWeight: '700' },
});

