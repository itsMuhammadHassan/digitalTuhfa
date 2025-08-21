import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { festiveTheme } from '../../theme';
import { fontScale, moderateScale } from '../../utils/scale';
import { useApp } from '../../context/AppContext';
import { RouteName } from '../../navigation/Navigator';

export const SignupScreen: React.FC<{ navigate: (name: RouteName) => void; goBack?: () => void }> = ({ navigate }) => {
  const { signUp, signInWithGoogle } = useApp();
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('demo@tuhfa.app');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    if (loading) return;
    setLoading(true);
    await signUp(name, email, password);
    setLoading(false);
    navigate('Home');
  };

  const onGoogle = async () => {
    if (loading) return;
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
    navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join Digital Tuhfa</Text>

      <View style={styles.card}>
        <View style={styles.inputWrap}>
          <Text style={styles.label}>Full name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="John Doe" placeholderTextColor="#9E9E9E" />
        </View>
        <View style={{ height: 12 }} />
        <View style={styles.inputWrap}>
          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="you@example.com" placeholderTextColor="#9E9E9E" />
        </View>
        <View style={{ height: 12 }} />
        <View style={styles.inputWrap}>
          <Text style={styles.label}>Password</Text>
          <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry placeholder="••••••••" placeholderTextColor="#9E9E9E" />
        </View>
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9} onPress={onSignup}>
          <Text style={styles.primaryText}>{loading ? 'Creating...' : 'Sign Up'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleBtn} onPress={onGoogle}>
          <Text style={styles.googleText}>Sign up with Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigate('Login')}>
        <Text style={styles.switchText}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: festiveTheme.colors.background },
  title: { fontSize: fontScale(28), fontWeight: '800', color: festiveTheme.colors.primary, marginTop: 12 },
  subtitle: { color: festiveTheme.colors.textSecondary, marginBottom: 6 },
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

