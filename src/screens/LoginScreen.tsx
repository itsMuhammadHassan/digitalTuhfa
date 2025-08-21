import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Card, SectionTitle } from '../components/ui';
import { useApp } from '../context/AppContext';
import { RouteName } from '../navigation/Navigator';

export const LoginScreen: React.FC<{ navigate: (name: RouteName) => void; goBack: () => void }> = ({ navigate }) => {
  const { login } = useApp();
  const [name, setName] = useState<string>('Guest User');

  return (
    <View style={styles.container}>
      <SectionTitle>Welcome Back</SectionTitle>
      <Card>
        <Text>Your Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
        <Button label="Login" onPress={() => { login(name); navigate('Home'); }} />
        <Button label="Go to Signup" variant="ghost" onPress={() => navigate('Signup')} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 10, marginVertical: 8 },
});

