import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Card, SectionTitle } from '../components/ui';
import { useApp } from '../context/AppContext';
import { RouteName } from '../navigation/Navigator';

export const ScheduleScreen: React.FC<{ navigate: (name: RouteName, params?: any) => void; goBack: () => void }> = ({ navigate, goBack }) => {
  const { currentCard, setCurrentCard } = useApp();
  const [dateTime, setDateTime] = useState<string>(currentCard.scheduledAt ?? '');

  return (
    <View style={styles.container}>
      <SectionTitle>Schedule Send</SectionTitle>
      <Card>
        <Text>Enter date and time (ISO or any note for dummy UI)</Text>
        <TextInput
          placeholder="2025-01-01T10:00:00"
          value={dateTime}
          onChangeText={setDateTime}
          style={styles.input}
        />
        <View style={{ flexDirection: 'row' }}>
          <Button label="Back" variant="ghost" onPress={goBack} />
          <View style={{ width: 12 }} />
          <Button label="Save" onPress={() => { setCurrentCard({ scheduledAt: dateTime }); navigate('Share'); }} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, padding: 10, marginTop: 8 },
});

