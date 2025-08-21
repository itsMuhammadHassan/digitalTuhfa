import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { festiveTheme } from '../theme';
import { fontScale, moderateScale } from '../utils/scale';

type ButtonProps = {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const Button: React.FC<ButtonProps> = ({ label, onPress, variant = 'primary', style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.button, styles[variant], style]}> 
      <Text style={[styles.buttonText, variant === 'ghost' ? styles.textPrimary : null, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export const Card: React.FC<{ style?: StyleProp<ViewStyle>; children: React.ReactNode }> = ({ style, children }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Text style={styles.sectionTitle}>{children}</Text>;
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: festiveTheme.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  primary: {
    backgroundColor: festiveTheme.colors.primary,
  },
  secondary: {
    backgroundColor: festiveTheme.colors.accent,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: festiveTheme.colors.primary,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: fontScale(14),
  },
  textPrimary: {
    color: festiveTheme.colors.primary,
  },
  card: {
    backgroundColor: festiveTheme.colors.surface,
    borderRadius: festiveTheme.radius.lg,
    padding: 16,
    marginVertical: 8,
    ...festiveTheme.shadow.card,
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontWeight: '700',
    color: festiveTheme.colors.textPrimary,
    marginVertical: 8,
  },
});

