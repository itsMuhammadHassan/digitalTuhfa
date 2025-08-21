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

type NavigatorProps = {
  initialRoute: RouteName;
  screens: Record<RouteName, React.ComponentType<{ navigate: (name: RouteName, params?: Record<string, unknown>) => void; goBack: () => void; route: Route }>>;
};

export const Navigator: React.FC<NavigatorProps> = ({ initialRoute, screens }) => {
  const [stack, setStack] = useState<Route[]>([{ name: initialRoute }]);

  const navigate = (name: RouteName, params?: Record<string, unknown>) => {
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