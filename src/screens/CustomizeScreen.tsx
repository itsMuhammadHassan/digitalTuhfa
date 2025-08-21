import React, { useMemo } from 'react';
import { StyleSheet, Text, TextInput, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { Button, Card, SectionTitle } from '../components/ui';
import { festiveTheme } from '../theme';
import { RouteName } from '../navigation/Navigator';
import { BottomTabs } from '../components/BottomTabs';
import { useRequireAuth } from '../hooks/useRequireAuth';

const suggestedMessagesByCategory: Record<string, string[]> = {
  Cultural: [
    'May your days be filled with joy and heritage.',
    'Celebrating traditions and togetherness! 🎊',
  ],
  Memes: [
    'Sending virtual cake because real cake is loading... 🍰',
    'This card is 100% gluten-free and meme-approved.',
  ],
  Birthdays: [
    'Happiest Birthday! 🎂 Wishing you smiles all year.',
    'Another trip around the sun—shine on! ☀️',
  ],
  Eid: [
    'Eid Mubarak! May your home be filled with blessings.',
    'Warm wishes of joy and peace this Eid.',
  ],
  'Well Wishes': [
    'Thinking of you—wishing you strength and comfort.',
    'May better days find you soon 🌟',
  ],
};

export const CustomizeScreen: React.FC<{ navigate: (name: RouteName, params?: any) => void; goBack: () => void }> = ({ navigate, goBack }) => {
  const { currentCard, setCurrentCard } = useApp();
  useRequireAuth(navigate);
  const suggestions = useMemo(() => suggestedMessagesByCategory[currentCard.category] ?? [], [currentCard.category]);

  return (
    <SafeAreaView style={styles.container}>
      <SectionTitle>Customize</SectionTitle>
      <Card>
        <View style={[styles.preview, { backgroundColor: currentCard.backgroundColor }]}> 
          <Text style={[styles.previewText, { color: currentCard.textColor }]}>{currentCard.message}</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.label}>Message</Text>
        <TextInput
          value={currentCard.message}
          placeholder="Type your heartfelt message"
          onChangeText={(t) => setCurrentCard({ message: t })}
          style={styles.input}
          multiline
        />
        <View style={styles.row}>
          {suggestions.map(s => (
            <Button key={s} variant="ghost" label="AI Suggest" onPress={() => setCurrentCard({ message: s })} />
          ))}
        </View>

        <Text style={styles.label}>Colors</Text>
        <View style={styles.row}>
          {['#FFF2CC', '#FFEBE6', '#E6FFF2', '#E6F0FF', '#F9E6FF'].map(color => (
            <View key={color} style={[styles.swatch, { backgroundColor: color }]}> 
              <Button label=" " variant="ghost" onPress={() => setCurrentCard({ backgroundColor: color })} />
            </View>
          ))}
        </View>
        <View style={styles.row}>
          {['#2E2E2E', '#C63D2F', '#1F6FEB'].map(color => (
            <View key={color} style={[styles.swatch, { backgroundColor: color }]}> 
              <Button label=" " variant="ghost" onPress={() => setCurrentCard({ textColor: color })} />
            </View>
          ))}
        </View>

        <View style={[styles.row, { alignItems: 'center', marginTop: 8 }]}> 
          <Text style={{ flex: 1 }}>Request physical print</Text>
          <Switch value={currentCard.withPrint} onValueChange={(v) => setCurrentCard({ withPrint: v })} />
        </View>
      </Card>

      <View style={styles.row}>
        <Button label="Back" variant="ghost" onPress={goBack} />
        <View style={{ width: 12 }} />
        <Button label="Attach Gifts" variant="secondary" onPress={() => navigate('GiftPayment')} />
        <View style={{ width: 12 }} />
        <Button label="Share" onPress={() => navigate('Share')} />
      </View>
      <BottomTabs current={'Customize'} onNavigate={(n) => navigate(n)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  preview: { height: 160, borderRadius: festiveTheme.radius.lg, alignItems: 'center', justifyContent: 'center' },
  previewText: { fontSize: 18, fontWeight: '700', textAlign: 'center', paddingHorizontal: 12 },
  label: { fontWeight: '700', marginBottom: 6, color: festiveTheme.colors.textPrimary },
  input: { borderWidth: 1, borderColor: festiveTheme.colors.muted, borderRadius: 12, padding: 10, minHeight: 60, textAlignVertical: 'top' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  swatch: { borderRadius: 12, padding: 2 },
});

