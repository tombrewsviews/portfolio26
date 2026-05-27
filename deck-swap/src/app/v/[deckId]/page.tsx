import { notFound } from 'next/navigation';
import { getDeck } from '@/lib/decks';
import { ViewerClient } from './viewer-client';

export default async function ViewerPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;
  if (!getDeck(deckId)) notFound();
  return <ViewerClient deckId={deckId} />;
}
