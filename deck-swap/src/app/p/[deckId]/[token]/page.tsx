import { notFound } from 'next/navigation';
import { deck as introTalk } from '@/decks/intro-talk/deck.config';
import { deriveToken } from '@/lib/hmac';
import { PresenterClient } from './presenter-client';

const DECKS = { 'intro-talk': introTalk } as const;

export default async function PresenterPage({
  params,
}: {
  params: Promise<{ deckId: string; token: string }>;
}) {
  const { deckId, token } = await params;
  const deck = DECKS[deckId as keyof typeof DECKS];
  if (!deck) notFound();

  const expected = await deriveToken(deckId, process.env.PRESENTER_SECRET!);
  if (expected !== token) notFound();

  return <PresenterClient deck={deck} token={token} />;
}
