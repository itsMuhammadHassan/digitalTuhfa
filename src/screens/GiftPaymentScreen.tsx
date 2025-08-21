import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, SectionTitle } from '../components/ui';
import { RouteName } from '../navigation/Navigator';
import { useApp } from '../context/AppContext';

const gifts = ['Chocolate Box', 'Flowers', 'Coffee Voucher', 'Book Coupon'];
const methods = ['JazzCash', 'Easypaisa', 'Credit/Debit Card'];

export const GiftPaymentScreen: React.FC<{ navigate: (name: RouteName, params?: any) => void; goBack: () => void }> = ({ navigate, goBack }) => {
  const { currentCard, setCurrentCard } = useApp();
  const [selectedGifts, setSelectedGifts] = useState<string[]>(currentCard.gifts);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const toggleGift = (gift: string) => {
    setSelectedGifts(prev => prev.includes(gift) ? prev.filter(g => g !== gift) : [...prev, gift]);
  };

  return (
    <View style={styles.container}>
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
        <Button label="Back" variant="ghost" onPress={goBack} />
        <View style={{ width: 12 }} />
        <Button
          label="Confirm Payment"
          onPress={() => {
            setCurrentCard({ gifts: selectedGifts, isPaid: true });
            navigate('Share');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

