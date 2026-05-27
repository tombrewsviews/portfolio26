import { Redis } from '@upstash/redis';
import type { DeckState } from './types';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const stateKey = (deckId: string) => `deck:${deckId}`;
export const eventsChannel = (deckId: string) => `deck:${deckId}:events`;

export async function readState(deckId: string): Promise<DeckState | null> {
  const raw = await redis.get<DeckState>(stateKey(deckId));
  return raw ?? null;
}

export async function writeAndPublish(deckId: string, next: DeckState): Promise<void> {
  await redis.set(stateKey(deckId), next);
  await redis.publish(eventsChannel(deckId), JSON.stringify(next));
}
