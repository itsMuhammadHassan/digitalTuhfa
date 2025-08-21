import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { Button, Card, SectionTitle } from '../components/ui';
import { useRequireAuth } from '../hooks/useRequireAuth';

export const MomentsScreen: React.FC<any> = ({ navigation }) => {
  const { moments, toggleFavourite } = useApp();
  useRequireAuth((name) => navigation.navigate(name as any));

  return (
    <SafeAreaView style={styles.container}>
      <SectionTitle>Moments</SectionTitle>
      <FlatList
        data={moments}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontWeight: '700' }}>{item.card.category}</Text>
            <Text style={{ marginTop: 6 }}>{item.card.message}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <Button label={item.isFavourite ? 'Unfavourite' : 'Favourite'} variant="ghost" onPress={() => toggleFavourite(item.id)} />
              <Button label="Share" variant="secondary" onPress={() => navigation.navigate('Share', { from: 'Moments' })} />
            </View>
          </Card>
        )}
        ListEmptyComponent={<Text>No posts yet. Share to Moments from the Share screen.</Text>}
      />
      <View style={{ flexDirection: 'row' }}>
        <Button label="Back" variant="ghost" onPress={() => navigation.goBack()} />
        <View style={{ width: 12 }} />
        <Button label="Create New" onPress={() => navigation.navigate('Customize')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});