'use client';

import { useEffect, useRef, useState } from 'react';
import { SlideStage } from '@/lib/ui/SlideStage';
import { ViewerOverlay } from '@/lib/ui/ViewerOverlay';
import { useDeckState } from '@/hooks/useDeckState';
import { useKeyboard } from '@/hooks/useKeyboard';
import type { Deck, VariantKey } from '@/lib/types';

const VARIANT_STORAGE_KEY = 'deckSwap.variant';

interface Props {
  deck: Deck;
}

export function ViewerClient({ deck }: Props) {
  const { state } = useDeckState(deck.id);
  const [viewerSlide, setViewerSlide] = useState(0);
  const [variant, setVariant] = useState<VariantKey>(deck.defaultVariant);
  const prevLiveRef = useRef(0);

  useEffect(() => {
    const stored = window.localStorage.getItem(VARIANT_STORAGE_KEY) as VariantKey | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setVariant(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(VARIANT_STORAGE_KEY, variant);
  }, [variant]);

  // Follow presenter when viewer was on the live slide; otherwise stay.
  useEffect(() => {
    const prevLive = prevLiveRef.current;
    if (viewerSlide === prevLive) setViewerSlide(state.currentSlide);
    prevLiveRef.current = state.currentSlide;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentSlide]);

  // Clamp if maxReached shrinks (shouldn't happen, but cheap safety).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (viewerSlide > state.maxReached) setViewerSlide(state.maxReached);
  }, [state.maxReached, viewerSlide]);

  useKeyboard((e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setViewerSlide((v) => Math.max(0, v - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setViewerSlide((v) => Math.min(state.maxReached, v + 1));
    } else if (e.key === 'l') {
      setViewerSlide(state.currentSlide);
    }
  });

  return (
    <main className="relative h-full w-full">
      <SlideStage deck={deck} slideIndex={viewerSlide} variant={variant} />
      <ViewerOverlay
        deck={deck}
        slideIndex={viewerSlide}
        currentLive={state.currentSlide}
        maxReached={state.maxReached}
        variant={variant}
        onVariantChange={setVariant}
        onJumpToLive={() => setViewerSlide(state.currentSlide)}
      />
    </main>
  );
}
