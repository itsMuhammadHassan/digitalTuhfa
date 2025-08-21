import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, Card, SectionTitle } from '../components/ui';
import { useApp } from '../context/AppContext';
import { RouteName } from '../navigation/Navigator';

export const ProfileScreen: React.FC<{ navigate: (name: RouteName, params?: any) => void; goBack: () => void }> = ({ navigate, goBack }) => {
  const { moments } = useApp();
  const favourites = useMemo(() => moments.filter(m => m.isFavourite), [moments]);

  return (
    <View style={styles.container}>
      <SectionTitle>Profile</SectionTitle>
      <Card>
        <Text style={{ fontWeight: '700' }}>Your Wall</Text>
        <FlatList
          data={moments}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 6 }}>
              <Text style={{ fontWeight: '600' }}>{item.card.category}</Text>
              <Text numberOfLines={2}>{item.card.message}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Nothing yet. Post to Moments to see your wall.</Text>}
        />
      </Card>

      <Card>
        <Text style={{ fontWeight: '700' }}>Favourites</Text>
        <FlatList
          data={favourites}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 6 }}>
              <Text style={{ fontWeight: '600' }}>{item.card.category}</Text>
              <Text numberOfLines={2}>{item.card.message}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No favourites yet.</Text>}
        />
      </Card>

      <View style={{ flexDirection: 'row' }}>
        <Button label="Back" variant="ghost" onPress={goBack} />
        <View style={{ width: 12 }} />
        <Button label="Home" onPress={() => navigate('Home')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

