import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { Button, Card, SectionTitle } from '../components/ui';
import { RouteName } from '../navigation/Navigator';
import { BottomTabs } from '../components/BottomTabs';
import { useRequireAuth } from '../hooks/useRequireAuth';

export const MomentsScreen: React.FC<{ navigate: (name: RouteName, params?: any) => void; goBack: () => void }> = ({ navigate, goBack }) => {
  const { moments, toggleFavourite } = useApp();
  useRequireAuth(navigate);

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
              <Button label="Share" variant="secondary" onPress={() => navigate('Share', { from: 'Moments' })} />
            </View>
          </Card>
        )}
        ListEmptyComponent={<Text>No posts yet. Share to Moments from the Share screen.</Text>}
      />
      <View style={{ flexDirection: 'row' }}>
        <Button label="Back" variant="ghost" onPress={goBack} />
        <View style={{ width: 12 }} />
        <Button label="Create New" onPress={() => navigate('Customize')} />
      </View>
      <BottomTabs current={'Moments'} onNavigate={(n) => navigate(n)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});