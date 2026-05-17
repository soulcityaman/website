import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * @typedef {'sapphire'|'rosegold'} ThemeKey
 * @typedef {'authenticated'|'selecting'|'dashboard'} AppPhase
 */

const profileMap = {
  boy: {
    id: 'boy',
    name: 'Boy',
    theme: /** @type {ThemeKey} */ ('sapphire'),
    avatarUrl: '/assets/boy-avatar.jpg',
    innerGradient: 'linear-gradient(145deg, rgba(29,78,216,0.55), rgba(67,56,202,0.2))',
    behindGlowColor: 'rgba(96,165,250,0.45)',
  },
  girl: {
    id: 'girl',
    name: 'Girl',
    theme: /** @type {ThemeKey} */ ('rosegold'),
    avatarUrl: '/assets/girl-avatar.jpg',
    innerGradient: 'linear-gradient(145deg, rgba(190,24,93,0.5), rgba(146,64,14,0.2))',
    behindGlowColor: 'rgba(251,113,133,0.45)',
  },
};

const themeVars = {
  sapphire: {
    '--bg-0': '#0a0a0a',
    '--bg-1': '#111827',
    '--bg-2': '#1e1b4b',
    '--accent-primary': '#3b82f6',
    '--accent-secondary': '#6366f1',
    '--accent-metal': '#e5e7eb',
    '--text-primary': '#f9fafb',
    '--text-muted': '#9ca3af',
    '--cursor-color': '#60a5fa',
    '--cursor-back': '#1e3a8a',
  },
  rosegold: {
    '--bg-0': '#0a0a0a',
    '--bg-1': '#1a0f14',
    '--bg-2': '#3b0f1b',
    '--accent-primary': '#fb7185',
    '--accent-secondary': '#f9a8d4',
    '--accent-metal': '#f7e7ce',
    '--text-primary': '#fff7ed',
    '--text-muted': '#d6b8a8',
    '--cursor-color': '#fda4af',
    '--cursor-back': '#7f1d1d',
  },
};

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(null);

  const activeProfile = activeProfileId ? profileMap[activeProfileId] : null;
  const activeTheme = activeProfile?.theme ?? 'sapphire';

  useEffect(() => {
    const vars = themeVars[activeTheme];
    Object.entries(vars).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
  }, [activeTheme]);

  const login = (payload) => {
    if (!payload?.email || !payload?.password) return;

    setIsAuthenticated(true);
    setIsLoading(true);

    window.setTimeout(() => {
      setIsLoading(false);
    }, 2200);
  };

  const selectProfile = (profileId) => {
    setActiveProfileId(profileId);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsLoading(false);
    setActiveProfileId(null);
  };

  /** @type {AppPhase} */
  const phase = !isAuthenticated ? 'authenticated' : !activeProfile ? 'selecting' : 'dashboard';

  const value = useMemo(
    () => ({
      phase,
      isLoading,
      activeTheme,
      activeProfile,
      profiles: Object.values(profileMap),
      login,
      selectProfile,
      logout,
    }),
    [phase, isLoading, activeTheme, activeProfile],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider.');
  }
  return context;
};
