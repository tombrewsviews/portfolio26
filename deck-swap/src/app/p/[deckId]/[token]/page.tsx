import { notFound } from 'next/navigation';
import { getDeck } from '@/lib/decks';
import { deriveToken } from '@/lib/hmac';
import { PresenterClient } from './presenter-client';

export default async function PresenterPage({
  params,
}: {
  params: Promise<{ deckId: string; token: string }>;
}) {
  const { deckId, token } = await params;
  if (!getDeck(deckId)) notFound();

  const expected = await deriveToken(deckId, process.env.PRESENTER_SECRET!);
  if (expected !== token) notFound();

  return <PresenterClient deckId={deckId} token={token} />;
}
