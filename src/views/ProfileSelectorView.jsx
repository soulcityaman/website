import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { MagicBento } from '../components/MagicBento';
import { ProfileCard } from '../components/ProfileCard';

export function ProfileSelectorView() {
  const { profiles, selectProfile } = useAppState();

  return (
    <section className="screen shell">
      <h2 className="screen-title">Choose your elite profile</h2>
      <MagicBento enableSpotlight enableTilt enableMagnetism className="profile-bento">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            name={profile.name}
            avatarUrl={profile.avatarUrl}
            innerGradient={profile.innerGradient}
            behindGlowColor={profile.behindGlowColor}
            onClick={() => selectProfile(profile.id)}
          />
        ))}
      </MagicBento>
    </section>
  );
}
