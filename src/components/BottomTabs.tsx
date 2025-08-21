import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { festiveTheme } from '../theme';
import { RouteName } from '../navigation/Navigator';
import { fontScale, moderateScale } from '../utils/scale';

type Tab = {
  key: RouteName;
  label: string;
};

const TABS: Tab[] = [
  { key: 'Home', label: 'Home' },
  { key: 'Customize', label: 'Create' },
  { key: 'Moments', label: 'Moments' },
  { key: 'Profile', label: 'Profile' },
];

export const BottomTabs: React.FC<{ current: RouteName; onNavigate: (name: RouteName) => void }> = ({ current, onNavigate }) => {
  return (
    <View style={styles.wrapper}>
      {TABS.map(tab => {
        const isActive = current === tab.key;
        return (
          <TouchableOpacity key={tab.key} style={[styles.tab, isActive && styles.active]} onPress={() => onNavigate(tab.key)}>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: moderateScale(10),
    justifyContent: 'space-between',
    ...festiveTheme.shadow.card,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: moderateScale(6),
    borderRadius: 14,
  },
  active: {
    backgroundColor: '#FFF1ED',
  },
  label: {
    fontSize: fontScale(12),
    color: '#7A7A7A',
    fontWeight: '600',
  },
  activeLabel: {
    color: festiveTheme.colors.primary,
  },
});

