import React from 'react';
import { SplashCursor } from './components/SplashCursor';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { DashboardView } from './views/DashboardView';
import { LoadingView } from './views/LoadingView';
import { LoginView } from './views/LoginView';
import { ProfileSelectorView } from './views/ProfileSelectorView';
import './styles/theme.css';

function AppScene() {
  const { phase, isLoading } = useAppState();

  return (
    <div className="app-root">
      <SplashCursor
        COLOR="var(--cursor-color)"
        BACK_COLOR="var(--cursor-back)"
      />

      {!isLoading && phase === 'authenticated' && <LoginView />}
      {isLoading && <LoadingView />}
      {!isLoading && phase === 'selecting' && <ProfileSelectorView />}
      {!isLoading && phase === 'dashboard' && <DashboardView />}
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppScene />
    </AppStateProvider>
  );
}
