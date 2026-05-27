import type { Deck } from '@/lib/types';
import { slides } from './_generated';

export const deck: Deck = {
  id: 'intro-talk',
  title: 'Intro Talk',
  defaultVariant: 'claude',
  slides,
};
