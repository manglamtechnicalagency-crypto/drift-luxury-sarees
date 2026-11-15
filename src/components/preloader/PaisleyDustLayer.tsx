'use client';

import React from 'react';
import ParticleField, { ParticleFieldProps } from '@/components/canvas/ParticleField';

const SPREAD: [number, number, number] = [8, 8, 4];

export default function PaisleyDustLayer() {
  const Particle = ParticleField as React.ComponentType<ParticleFieldProps>;
  return (
    <div className="pointer-events-none absolute inset-0 opacity-60">
      <Particle count={280} spread={SPREAD} color="#E6B83A" size={0.12} opacity={0.85} speed={2.5} />
    </div>
  );
}
