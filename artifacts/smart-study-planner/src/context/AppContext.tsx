import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { api } from '@/lib/api';
import type { Session } from '@supabase/supabase-js';

export type Subject = {
  code: string;
  name: string;
  hours: number;
  difficulty: string;
  description: string;
  selected?: boolean;
};

export type UserConfig = {
  course: string;
  branch: string;
  year: string;
  semester: string;
  subjects: Subject[];
  studySettings: {
    startTime: string;
    endTime: string;
    targetHours: number;
    includeWeekends: boolean;
    targetDate: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  isSetupComplete: boolean;
};

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  config: UserConfig | null;
  setConfig: (config: UserConfig) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  completeSetup: (newConfig: UserConfig) => Promise<void>;
  isLoading: boolean;
  authError: string | null;
  setAuthError: (err: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [config, setConfigState] = useState<UserConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const loadUserData = async (session: Session) => {
    const supabaseUser = session.user;
    const userId = supabaseUser.id;

    try {
      const profile = await api.getProfile(userId).catch(() => null);
      const cfg = await api.getConfig(userId).catch(() => null);

      const userName = profile?.name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'Student';
      const isSetupComplete = !!cfg;

      setUserState({
        id: userId,
        name: userName,
        email: supabaseUser.email || '',
        isSetupComplete,
      });

      if (cfg) {
        setConfigState({
          course: cfg.courseType,
          branch: cfg.branch,
          year: cfg.year,
          semester: cfg.semester,
          subjects: cfg.subjects || [],
          studySettings: cfg.studySettings || { startTime: '18:00', endTime: '22:00', targetHours: 3, includeWeekends: false, targetDate: '' },
        });
      }
    } catch (e) {
      console.error('Error loading user data', e);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        loadUserData(session).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        loadUserData(session);
      } else {
        setUserState(null);
        setConfigState(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const setUser = (newUser: User | null) => setUserState(newUser);

  const setConfig = (newConfig: UserConfig) => setConfigState(newConfig);

  const login = async (email: string, password: string) => {
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  };

  const signup = async (email: string, password: string, name: string) => {
    setAuthError(null);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(error.message);

    if (data.user) {
      await api.upsertProfile({
        userId: data.user.id,
        supabaseId: data.user.id,
        name,
        email,
      }).catch(() => {});
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserState(null);
    setConfigState(null);
  };

  const completeSetup = async (newConfig: UserConfig) => {
    if (!user) return;
    try {
      await api.upsertConfig({
        userId: user.id,
        courseType: newConfig.course,
        branch: newConfig.branch,
        year: newConfig.year,
        semester: newConfig.semester,
        subjects: newConfig.subjects,
        studySettings: newConfig.studySettings,
      });
      setConfigState(newConfig);
      setUserState({ ...user, isSetupComplete: true });
    } catch (e) {
      console.error('Failed to save config', e);
      setConfigState(newConfig);
      setUserState({ ...user, isSetupComplete: true });
    }
  };

  return (
    <AppContext.Provider value={{ user, setUser, config, setConfig, login, signup, logout, completeSetup, isLoading, authError, setAuthError }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
