import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CardDesign = {
  id: string;
  category: string;
  message: string;
  backgroundColor: string;
  textColor: string;
  withPrint: boolean;
  gifts: string[];
  isPaid: boolean;
  scheduledAt?: string; // ISO string
};

export type MomentPost = {
  id: string;
  createdAt: string;
  card: CardDesign;
  likes: number;
  isFavourite: boolean;
};

type AppState = {
  currentCard: CardDesign;
  setCurrentCard: (card: Partial<CardDesign>) => void;
  moments: MomentPost[];
  addMoment: (card: CardDesign) => void;
  toggleFavourite: (postId: string) => void;
  themeMode: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark') => void;
  // Auth
  user: { id: string; name: string; email?: string } | null;
  isBooting: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
};

const defaultCard: CardDesign = {
  id: 'draft',
  category: 'Cultural',
  message: 'Wishing you joy and blessings! 🎉',
  backgroundColor: '#FFF2CC',
  textColor: '#2E2E2E',
  withPrint: false,
  gifts: [],
  isPaid: false,
};

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCardState, setCurrentCardState] = useState<CardDesign>(defaultCard);
  const [moments, setMoments] = useState<MomentPost[]>([]);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<{ id: string; name: string; email?: string } | null>(null);
  const [isBooting, setIsBooting] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const setCurrentCard = (partial: Partial<CardDesign>) => {
    setCurrentCardState(prev => ({ ...prev, ...partial }));
  };

  const addMoment = (card: CardDesign) => {
    const post: MomentPost = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      card,
      likes: 0,
      isFavourite: false,
    };
    setMoments(prev => [post, ...prev]);
  };

  const toggleFavourite = (postId: string) => {
    setMoments(prev => prev.map(p => p.id === postId ? { ...p, isFavourite: !p.isFavourite } : p));
  };

  const value = useMemo<AppState>(() => ({
    currentCard: currentCardState,
    setCurrentCard,
    moments,
    addMoment,
    toggleFavourite,
    themeMode,
    setThemeMode,
    user,
    isBooting,
    signIn: async (email: string, _password: string) => {
      await new Promise<void>(resolve => setTimeout(resolve, 500));
      setUser({ id: 'u1', name: 'Digital Tuhfa User', email });
    },
    signUp: async (name: string, email: string, _password: string) => {
      await new Promise<void>(resolve => setTimeout(resolve, 700));
      setUser({ id: 'u1', name: name || 'New User', email });
    },
    signInWithGoogle: async () => {
      await new Promise<void>(resolve => setTimeout(resolve, 400));
      setUser({ id: 'u_google', name: 'Google User' });
    },
    signOut: () => setUser(null),
  }), [currentCardState, moments, themeMode, user, isBooting]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
