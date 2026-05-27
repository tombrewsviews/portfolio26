'use client';

import { useCallback, useEffect, useState } from 'react';
import { SlideStage } from '@/lib/ui/SlideStage';
import { PresenterHUD } from '@/lib/ui/PresenterHUD';
import { useKeyboard } from '@/hooks/useKeyboard';
import { getDeck } from '@/lib/decks';

interface Props {
  deckId: string;
  token: string;
}

export function PresenterClient({ deckId, token }: Props) {
  const deck = getDeck(deckId);
  const [current, setCurrent] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [connection, setConnection] = useState<'ok' | 'pending' | 'error'>('ok');

  const slidesLength = deck?.slides.length ?? 0;

  const push = useCallback(
    async (next: number) => {
      if (!deck) return;
      const clamped = Math.max(0, Math.min(slidesLength - 1, next));
      setCurrent(clamped);
      setConnection('pending');
      try {
        const res = await fetch(`/api/state/${deck.id}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ token, currentSlide: clamped }),
        });
        setConnection(res.ok ? 'ok' : 'error');
      } catch {
        setConnection('error');
      }
    },
    [deck, slidesLength, token]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void push(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeyboard((e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      void push(current + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      void push(current - 1);
    } else if (e.key === 'h') {
      setHidden((v) => !v);
    } else if (e.key === 'p') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }
  });

  if (!deck) return null;

  return (
    <main className="relative h-full w-full">
      <SlideStage deck={deck} slideIndex={current} variant={deck.defaultVariant} />
      <PresenterHUD
        deck={deck}
        current={current}
        connection={connection}
        onPrev={() => push(current - 1)}
        onNext={() => push(current + 1)}
        hidden={hidden}
      />
    </main>
  );
}
