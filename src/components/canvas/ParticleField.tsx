'use client';

export interface ParticleFieldProps {
  count?: number;
  spread?: [number, number, number];
  color?: string;
  size?: number;
  opacity?: number;
  speed?: number;
}

// Digital square point particles disabled per realism directive
export default function ParticleField(_props: ParticleFieldProps) {
  return null;
}
