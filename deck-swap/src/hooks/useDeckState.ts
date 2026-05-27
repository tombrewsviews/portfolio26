'use client';

import { useEffect, useState } from 'react';
import { INITIAL_DECK_STATE, type DeckState } from '@/lib/types';

export interface DeckStateConnection {
  state: DeckState;
  stale: boolean;
}

export function useDeckState(deckId: string): DeckStateConnection {
  const [state, setState] = useState<DeckState>(INITIAL_DECK_STATE);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    const es = new EventSource(`/api/state/${deckId}?stream=1`);
    let staleTimer: ReturnType<typeof setTimeout> | null = null;

    const armStaleTimer = () => {
      if (staleTimer) clearTimeout(staleTimer);
      staleTimer = setTimeout(() => setStale(true), 20_000);
    };

    es.onmessage = (e) => {
      try {
        const next = JSON.parse(e.data) as DeckState;
        setState(next);
        setStale(false);
        armStaleTimer();
      } catch {
        /* ignore malformed */
      }
    };
    es.onerror = () => setStale(true);
    armStaleTimer();

    return () => {
      es.close();
      if (staleTimer) clearTimeout(staleTimer);
    };
  }, [deckId]);

  return { state, stale };
}
