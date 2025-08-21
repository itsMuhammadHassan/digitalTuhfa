import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, SectionTitle } from '../components/ui';
import { useApp } from '../context/AppContext';
import { useRequireAuth } from '../hooks/useRequireAuth';

export const ShareScreen: React.FC<any> = ({ navigation }) => {
  const { currentCard, addMoment } = useApp();
  useRequireAuth((name) => navigation.navigate(name as any));

  const share = (channel: string) => {
    // Dummy action: In real app, integrate share APIs
    console.log('Shared via', channel, currentCard);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionTitle>Share</SectionTitle>
      <Card>
        <Text>Choose where to share your card</Text>
        <View style={styles.row}>
          <Button label="WhatsApp" onPress={() => share('WhatsApp')} />
          <Button label="Slack" variant="secondary" onPress={() => share('Slack')} />
          <Button label="Copy Link" variant="ghost" onPress={() => share('Copy')} />
        </View>
      </Card>

      <Card>
        <Text>Or share to Moments feed</Text>
        <Button label="Post to Moments" onPress={() => { addMoment(currentCard); navigation.navigate('Moments'); }} />
      </Card>

      <View style={styles.row}>
        <Button label="Back" variant="ghost" onPress={() => navigation.goBack()} />
        <Button label="Schedule Send" onPress={() => navigation.navigate('Schedule')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: { flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' },
});

