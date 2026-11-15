'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function CollectionsEdgeHydrator() {
  const fetchEdgeCollections = useStore((state) => state.fetchEdgeCollections);

  useEffect(() => {
    fetchEdgeCollections();
  }, [fetchEdgeCollections]);

  return null;
}
