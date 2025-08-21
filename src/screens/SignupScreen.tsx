import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Card, SectionTitle } from '../components/ui';
import { useApp } from '../context/AppContext';
import { RouteName } from '../navigation/Navigator';

export const SignupScreen: React.FC<{ navigate: (name: RouteName) => void; goBack: () => void }> = ({ navigate, goBack }) => {
  const { login } = useApp();
  const [name, setName] = useState<string>('New User');

  return (
    <View style={styles.container}>
      <SectionTitle>Create Account</SectionTitle>
      <Card>
        <Text>Your Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
        <View style={{ flexDirection: 'row' }}>
          <Button label="Back" variant="ghost" onPress={goBack} />
          <View style={{ width: 12 }} />
          <Button label="Signup" onPress={() => { login(name); navigate('Home'); }} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 10, marginVertical: 8 },
});

