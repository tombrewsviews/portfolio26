'use client';

import type { Deck } from '@/lib/types';

interface Props {
  deck: Deck;
  current: number;
  connection: 'ok' | 'pending' | 'error';
  onPrev: () => void;
  onNext: () => void;
  hidden: boolean;
}

export function PresenterHUD({ deck, current, connection, onPrev, onNext, hidden }: Props) {
  if (hidden) return null;
  const next = deck.slides[current + 1];
  const dotColor =
    connection === 'ok' ? 'bg-green-500' : connection === 'pending' ? 'bg-yellow-400' : 'bg-red-500';

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-6">
      <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-white/10 bg-black/60 px-5 py-2 text-sm text-white backdrop-blur">
        <button onClick={onPrev} className="opacity-70 hover:opacity-100" aria-label="previous slide">
          ◀
        </button>
        <span className="font-mono tabular-nums">
          {String(current + 1).padStart(2, '0')} / {String(deck.slides.length).padStart(2, '0')}
        </span>
        <button onClick={onNext} className="opacity-70 hover:opacity-100" aria-label="next slide">
          ▶
        </button>
        <span className="text-white/30">|</span>
        <span className={`inline-block h-2 w-2 rounded-full ${dotColor}`} aria-label={connection} />
        <span className="text-white/60">{connection === 'ok' ? 'live' : connection}</span>
        {next && <span className="text-white/40">· next: {next.id}</span>}
      </div>
    </div>
  );
}
