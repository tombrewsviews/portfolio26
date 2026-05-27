import type { ComponentType } from 'react';

export type VariantKey = 'claude' | 'design' | 'stitch' | 'hermes';

export const VARIANT_LABELS: Record<VariantKey, string> = {
  claude: 'Claude Code + Skills',
  design: 'Claude Design',
  stitch: 'Google Stitch',
  hermes: 'Hermès',
};

export type TransitionKind = 'fade' | 'cut' | 'custom';

export interface SlideProps {
  phase: 'entering' | 'active' | 'leaving';
}

export interface SlideMeta {
  id: string;
  variant: VariantKey;
  transition: TransitionKind;
}

export interface SlideModule {
  default: ComponentType<SlideProps>;
  meta: SlideMeta;
}

export interface SlideEntry {
  id: string;
  variants: Partial<Record<VariantKey, SlideModule>>;
}

export interface Deck {
  id: string;
  title: string;
  defaultVariant: VariantKey;
  slides: SlideEntry[];
}

export interface DeckState {
  currentSlide: number;
  maxReached: number;
  updatedAt: number;
  version: number;
}

export const INITIAL_DECK_STATE: DeckState = {
  currentSlide: 0,
  maxReached: 0,
  updatedAt: 0,
  version: 0,
};
