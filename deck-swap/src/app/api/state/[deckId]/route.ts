import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/hmac';
import { readState, writeAndPublish } from '@/lib/redis';
import { INITIAL_DECK_STATE, type DeckState } from '@/lib/types';

export const runtime = 'edge';

const SECRET = process.env.PRESENTER_SECRET;

function sseHeaders(): HeadersInit {
  return {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  };
}

function encode(event: DeckState): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ deckId: string }> }
): Promise<Response> {
  const { deckId } = await params;
  const url = new URL(req.url);
  if (url.searchParams.get('stream') !== '1') {
    const state = (await readState(deckId)) ?? INITIAL_DECK_STATE;
    return NextResponse.json(state);
  }

  const encoder = new TextEncoder();
  let lastVersion = -1;
  let cancelled = false;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (state: DeckState) => {
        controller.enqueue(encode(state));
        lastVersion = state.version;
      };

      const initial = (await readState(deckId)) ?? INITIAL_DECK_STATE;
      send(initial);

      // Heartbeat every 15s so intermediaries don't close the connection.
      const heartbeat = setInterval(() => {
        if (cancelled) return;
        controller.enqueue(encoder.encode(': keepalive\n\n'));
      }, 15_000);

      // Poll Redis for state changes.
      while (!cancelled) {
        await new Promise((r) => setTimeout(r, 250));
        if (cancelled) break;
        const state = (await readState(deckId)) ?? INITIAL_DECK_STATE;
        if (state.version !== lastVersion) send(state);
      }

      clearInterval(heartbeat);
    },
    cancel() {
      cancelled = true;
    },
  });

  return new Response(stream, { headers: sseHeaders() });
}

interface WriteBody {
  token: string;
  currentSlide: number;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ deckId: string }> }
): Promise<Response> {
  const { deckId } = await params;
  const body = (await req.json()) as Partial<WriteBody>;
  if (!body.token || typeof body.currentSlide !== 'number') {
    return new Response('bad request', { status: 400 });
  }

  if (!SECRET) return new Response('server misconfigured', { status: 500 });
  const ok = await verifyToken(deckId, body.token, SECRET);
  if (!ok) return new Response('unauthorized', { status: 401 });

  const prev = (await readState(deckId)) ?? INITIAL_DECK_STATE;
  const next: DeckState = {
    currentSlide: body.currentSlide,
    maxReached: Math.max(prev.maxReached, body.currentSlide),
    updatedAt: Date.now(),
    version: prev.version + 1,
  };
  await writeAndPublish(deckId, next);
  return new Response(null, { status: 204 });
}
