import { ReactNode, useId } from 'react';
import { SareeColorway } from '@/data/collections/colorways';

export function TextilePattern({ colorway, className = '' }: { colorway: SareeColorway; className?: string }) {
  const uniqueId = useId().replace(/:/g, '');
  const [base, second, third, gold] = colorway.palette;
  const patternId = `textile-${uniqueId}-${colorway.id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  let motif: ReactNode;
  switch (colorway.motif) {
    case 'dots':
      motif = <><circle cx="8" cy="8" r="2" fill={gold} /><circle cx="24" cy="24" r="2" fill={third} /><circle cx="24" cy="8" r="1" fill={second} /></>;
      break;
    case 'checks':
      motif = <><path d="M0 0h16v16H0zM16 16h16v16H16z" fill={second} opacity=".8" /><path d="M16 0h16v16H16zM0 16h16v16H0z" fill={third} opacity=".72" /><path d="M16 0v32M0 16h32" stroke={gold} strokeWidth="1" opacity=".9" /></>;
      break;
    case 'waves':
      motif = <><path d="M-8 9c8-8 16 8 24 0s16 8 24 0M-8 24c8-8 16 8 24 0s16 8 24 0" fill="none" stroke={gold} strokeWidth="2" /><path d="M-8 16c8-8 16 8 24 0s16 8 24 0" fill="none" stroke={second} strokeWidth="1.5" /></>;
      break;
    case 'floral':
      motif = <><circle cx="16" cy="16" r="3" fill={gold} /><ellipse cx="16" cy="10" rx="2.5" ry="5" fill={second} /><ellipse cx="16" cy="22" rx="2.5" ry="5" fill={third} /><ellipse cx="10" cy="16" rx="5" ry="2.5" fill={second} /><ellipse cx="22" cy="16" rx="5" ry="2.5" fill={third} /></>;
      break;
    case 'chevron':
      motif = <><path d="M-8 8 0 0l8 8 8-8 8 8 8-8 8 8M-8 24l8-8 8 8 8-8 8 8 8-8 8 8" fill="none" stroke={gold} strokeWidth="2" /><path d="M0 8 8 16l8-8 8 8 8-8" fill="none" stroke={second} strokeWidth="1.5" /></>;
      break;
    default:
      motif = <><path d="M16 3 29 16 16 29 3 16z" fill="none" stroke={gold} strokeWidth="1.5" /><path d="M16 9 23 16 16 23 9 16z" fill={third} opacity=".8" /><circle cx="16" cy="16" r="2" fill={second} /></>;
  }

  return (
    <svg className={className} viewBox="0 0 100 140" role="img" aria-label={`${colorway.name} textile pattern concept`}>
      <defs><pattern id={patternId} width="32" height="32" patternUnits="userSpaceOnUse"><rect width="32" height="32" fill={base} />{motif}</pattern></defs>
      <rect width="100" height="140" fill={`url(#${patternId})`} />
      <path d="M0 0h100v8H0zM0 132h100v8H0z" fill={gold} opacity=".95" />
      <path d="M4 12v116M96 12v116" stroke={second} strokeWidth="2" opacity=".8" />
      <path d="M8 16v108M92 16v108" stroke={third} strokeWidth="1" opacity=".9" />
    </svg>
  );
}
