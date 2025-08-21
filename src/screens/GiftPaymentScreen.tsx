import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, SectionTitle } from '../components/ui';
import { useApp } from '../context/AppContext';
import { useRequireAuth } from '../hooks/useRequireAuth';

const gifts = ['Chocolate Box', 'Flowers', 'Coffee Voucher', 'Book Coupon'];
const methods = ['JazzCash', 'Easypaisa', 'Credit/Debit Card'];

export const GiftPaymentScreen: React.FC<any> = ({ navigation }) => {
  const { currentCard, setCurrentCard } = useApp();
  useRequireAuth((name) => navigation.navigate(name as any));
  const [selectedGifts, setSelectedGifts] = useState<string[]>(currentCard.gifts);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const toggleGift = (gift: string) => {
    setSelectedGifts(prev => prev.includes(gift) ? prev.filter(g => g !== gift) : [...prev, gift]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionTitle>Attach Gifts</SectionTitle>
      <Card>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {gifts.map(g => (
            <Button key={g} variant={selectedGifts.includes(g) ? 'primary' : 'ghost'} label={g} onPress={() => toggleGift(g)} />
          ))}
        </View>
      </Card>

      <SectionTitle>Payment Method</SectionTitle>
      <Card>
        {methods.map(m => (
          <Button key={m} variant={selectedMethod === m ? 'secondary' : 'ghost'} label={m} onPress={() => setSelectedMethod(m)} />
        ))}
      </Card>

      <View style={{ flexDirection: 'row' }}>
        <Button label="Back" variant="ghost" onPress={() => navigation.goBack()} />
        <View style={{ width: 12 }} />
        <Button
          label="Confirm Payment"
          onPress={() => {
            setCurrentCard({ gifts: selectedGifts, isPaid: true });
            navigation.navigate('Share');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

