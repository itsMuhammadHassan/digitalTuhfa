import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, SectionTitle } from '../components/ui';
import { useApp } from '../context/AppContext';
import { RouteName } from '../navigation/Navigator';

export const ShareScreen: React.FC<{ navigate: (name: RouteName, params?: any) => void; goBack: () => void }> = ({ navigate, goBack }) => {
  const { currentCard, addMoment } = useApp();

  const share = (channel: string) => {
    // Dummy action: In real app, integrate share APIs
    console.log('Shared via', channel, currentCard);
  };

  return (
    <View style={styles.container}>
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
        <Button label="Post to Moments" onPress={() => { addMoment(currentCard); navigate('Moments'); }} />
      </Card>

      <View style={styles.row}>
        <Button label="Back" variant="ghost" onPress={goBack} />
        <Button label="Schedule Send" onPress={() => navigate('Schedule')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: { flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' },
});

