'use client';

import React from 'react';
import ParticleField, { ParticleFieldProps } from '@/components/canvas/ParticleField';

const SPREAD: [number, number, number] = [16, 12, 8];

export default function ZariDustLayer() {
  const Particle = ParticleField as React.ComponentType<ParticleFieldProps>;
  return (
    <div className="pointer-events-none absolute inset-0">
      <Particle count={350} spread={SPREAD} color="#D4AF37" size={0.09} opacity={0.8} speed={1} />
    </div>
  );
}
