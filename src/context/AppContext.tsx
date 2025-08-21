import React, { createContext, useContext, useMemo, useState } from 'react';

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
  user: { name: string } | null;
  login: (name: string) => void;
  logout: () => void;
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
  const [user, setUser] = useState<{ name: string } | null>(null);

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

  const login = (name: string) => setUser({ name });
  const logout = () => setUser(null);

  const value = useMemo<AppState>(() => ({
    currentCard: currentCardState,
    setCurrentCard,
    moments,
    addMoment,
    toggleFavourite,
    themeMode,
    setThemeMode,
    user,
    login,
    logout,
  }), [currentCardState, moments, themeMode]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
