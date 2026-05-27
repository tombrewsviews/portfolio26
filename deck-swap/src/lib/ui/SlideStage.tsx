'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Deck, VariantKey } from '@/lib/types';

interface Props {
  deck: Deck;
  slideIndex: number;
  variant: VariantKey;
}

export function SlideStage({ deck, slideIndex, variant }: Props) {
  const entry = deck.slides[slideIndex];
  if (!entry) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white">
        <p>No slide at index {slideIndex}.</p>
      </div>
    );
  }
  const chosen = entry.variants[variant] ?? entry.variants[deck.defaultVariant];
  if (!chosen) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white">
        <p>No variants defined for {entry.id}.</p>
      </div>
    );
  }
  const SlideComponent = chosen.default;
  const transition = chosen.meta.transition;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${entry.id}:${variant}`}
          initial={transition === 'cut' ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={transition === 'cut' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: transition === 'cut' ? 0 : 0.25 }}
          className="absolute inset-0"
        >
          <SlideComponent phase="active" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
