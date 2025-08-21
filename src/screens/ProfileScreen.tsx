import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, SectionTitle } from '../components/ui';
import { useApp } from '../context/AppContext';
import { RouteName } from '../navigation/Navigator';
import { BottomTabs } from '../components/BottomTabs';
import { useRequireAuth } from '../hooks/useRequireAuth';

export const ProfileScreen: React.FC<{ navigate: (name: RouteName, params?: any) => void; goBack: () => void }> = ({ navigate, goBack }) => {
  const { moments } = useApp();
  useRequireAuth(navigate);
  const favourites = useMemo(() => moments.filter(m => m.isFavourite), [moments]);

  return (
    <SafeAreaView style={styles.container}>
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
      <BottomTabs current={'Profile'} onNavigate={(n) => navigate(n)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

