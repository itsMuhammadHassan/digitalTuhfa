import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { festiveTheme } from '../theme';

export type RouteName =
  | 'Splash'
  | 'Login'
  | 'Signup'
  | 'Home'
  | 'Customize'
  | 'GiftPayment'
  | 'Share'
  | 'Moments'
  | 'Profile'
  | 'Schedule';

export type Route = { name: RouteName; params?: Record<string, unknown> };

type ScreenComponent = React.ComponentType<{ navigate: (name: RouteName, params?: Record<string, unknown>) => void; goBack: () => void; route: Route }>;
type NavigatorProps = {
  initialRoute: RouteName;
  screens: Record<RouteName, ScreenComponent>;
  isAuthenticated?: boolean;
};

export const Navigator: React.FC<NavigatorProps> = ({ initialRoute, screens, isAuthenticated }) => {
  const [stack, setStack] = useState<Route[]>([{ name: initialRoute }]);

  const navigate = (name: RouteName, params?: Record<string, unknown>) => {
    // Gatekeeping: if not authenticated, only allow auth routes
    const isAuthRoute = name === 'Login' || name === 'Signup' || name === 'Splash';
    if (!isAuthenticated && !isAuthRoute) {
      setStack(prev => [...prev, { name: 'Login' }]);
      return;
    }
    setStack(prev => [...prev, { name, params }]);
  };

  const goBack = () => {
    setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  const Current = useMemo(() => screens[stack[stack.length - 1].name], [stack, screens]);
  const route = stack[stack.length - 1];

  return (
    <View style={styles.container}>
      <Current navigate={navigate} goBack={goBack} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: festiveTheme.colors.background,
  },
});
