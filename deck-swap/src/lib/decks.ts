import { deck as introTalk } from '@/decks/intro-talk/deck.config';
import type { Deck } from '@/lib/types';

export const DECKS: Record<string, Deck> = {
  'intro-talk': introTalk,
};

export function getDeck(deckId: string): Deck | undefined {
  return DECKS[deckId];
}
