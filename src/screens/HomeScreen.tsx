import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { festiveTheme } from '../theme';
import { Button, Card, SectionTitle } from '../components/ui';
import { RouteName } from '../navigation/Navigator';
import { useApp } from '../context/AppContext';
import { useRequireAuth } from '../hooks/useRequireAuth';

const categories = [
  { key: 'Cultural', color: '#F1C40F' },
  { key: 'Memes', color: '#2ECC71' },
  { key: 'Birthdays', color: '#E67E22' },
  { key: 'Eid', color: '#1ABC9C' },
  { key: 'Well Wishes', color: '#9B59B6' },
];

export const HomeScreen: React.FC<any> = ({ navigation }) => {
  const { setCurrentCard } = useApp();
  useRequireAuth((name) => navigation.navigate(name as any));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Digital Tuhfa</Text>
      <Text style={styles.subtitle}>Send warm, festive digital greeting cards</Text>
      <SectionTitle>Categories</SectionTitle>
      <FlatList
        data={categories}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Card style={[styles.categoryCard, { backgroundColor: item.color + '22' }]}> 
            <Text style={styles.categoryText}>{item.key}</Text>
            <Button
              label="Create"
              onPress={() => {
                setCurrentCard({ category: item.key });
                navigation.navigate('Customize');
              }}
            />
          </Card>
        )}
      />

      <SectionTitle>Quick Actions</SectionTitle>
      <View style={styles.row}>
        <Button label="Moments" variant="secondary" onPress={() => navigation.navigate('Moments')} />
        <View style={{ width: 12 }} />
        <Button label="Profile" variant="ghost" onPress={() => navigation.navigate('Profile')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: '800', color: festiveTheme.colors.primary },
  subtitle: { color: festiveTheme.colors.textSecondary, marginBottom: 12 },
  categoryCard: { flex: 1, margin: 6 },
  categoryText: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: festiveTheme.colors.textPrimary },
  row: { flexDirection: 'row', marginTop: 8 },
});

