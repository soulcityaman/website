import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { SplitText } from '../components/SplitText';

const mockRows = [
  'Tonight\'s Prestige Picks',
  'Award-Winning Originals',
  'Cinematic Noir Collection',
];

export function DashboardView() {
  const { activeProfile, logout } = useAppState();

  return (
    <section className="screen dashboard">
      <header className="dashboard-header">
        <SplitText text={`Welcome, ${activeProfile?.name ?? 'Guest'}`} splitType="chars" ease="power3.out" />
        <button className="ghost" onClick={logout}>
          Switch Account
        </button>
      </header>

      <div className="content-grid">
        {mockRows.map((row) => (
          <article key={row} className="content-card">
            <h3>{row}</h3>
            <p>Tailored for your luxury taste with immersive 4K showcases.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
