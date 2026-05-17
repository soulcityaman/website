import React from 'react';
import { CircularText } from '../components/CircularText';

export function LoadingView() {
  return (
    <section className="screen shell loading">
      <CircularText text="I*LOVE*YOU*" spinDuration={7} />
      <p className="subtitle">Curating your cinematic universe...</p>
    </section>
  );
}
