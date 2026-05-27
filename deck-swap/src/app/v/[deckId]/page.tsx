import { notFound } from 'next/navigation';
import { deck as introTalk } from '@/decks/intro-talk/deck.config';
import { ViewerClient } from './viewer-client';

const DECKS = { 'intro-talk': introTalk } as const;

export default async function ViewerPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  const deck = DECKS[deckId as keyof typeof DECKS];
  if (!deck) notFound();
  return <ViewerClient deck={deck} />;
}
