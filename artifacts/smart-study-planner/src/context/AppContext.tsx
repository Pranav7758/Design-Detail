import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
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
  name: string;
  email: string;
  isSetupComplete: boolean;
};

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  config: UserConfig | null;
  setConfig: (config: UserConfig) => void;
  login: (name: string, email: string) => void;
  logout: () => void;
  completeSetup: (newConfig: UserConfig) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [config, setConfigState] = useState<UserConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('study_user');
      const storedConfig = localStorage.getItem('study_config');
      
      if (storedUser) setUserState(JSON.parse(storedUser));
      if (storedConfig) setConfigState(JSON.parse(storedConfig));
    } catch (e) {
      console.error("Failed to parse local storage data", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('study_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('study_user');
    }
  };

  const setConfig = (newConfig: UserConfig) => {
    setConfigState(newConfig);
    localStorage.setItem('study_config', JSON.stringify(newConfig));
  };

  const login = (name: string, email: string) => {
    // Determine if setup was previously completed by checking if config exists
    const hasConfig = !!localStorage.getItem('study_config');
    setUser({ name, email, isSetupComplete: hasConfig });
  };

  const logout = () => {
    setUser(null);
    setConfigState(null);
    localStorage.removeItem('study_user');
    localStorage.removeItem('study_config');
  };

  const completeSetup = (newConfig: UserConfig) => {
    setConfig(newConfig);
    if (user) {
      setUser({ ...user, isSetupComplete: true });
    }
  };

  return (
    <AppContext.Provider value={{ user, setUser, config, setConfig, login, logout, completeSetup, isLoading }}>
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
