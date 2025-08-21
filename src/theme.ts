export const festiveTheme = {
  colors: {
    background: '#FFF8E6',
    surface: '#FFFFFF',
    primary: '#C63D2F',
    primaryDark: '#8E1F14',
    accent: '#F4A261',
    success: '#2FA36B',
    warning: '#E9C46A',
    textPrimary: '#2E2E2E',
    textSecondary: '#5C5C5C',
    muted: '#EDE0D4',
    cardGold: '#E0B04E',
  },
  spacing: (multiplier: number = 1) => 8 * multiplier,
  radius: {
    sm: 8,
    md: 14,
    lg: 22,
    pill: 999,
  },
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
  },
};

export type Theme = typeof festiveTheme;
