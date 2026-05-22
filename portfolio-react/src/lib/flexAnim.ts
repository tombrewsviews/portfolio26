export const FLEX_MIN = 200;
export const FLEX_MAX = 1000;

// Shared scroll-choreography constants so motion is consistent site-wide.
export const REVEAL = {
  duration: 1.0,
  ease: 'expo.out',
  y: 40,
  stagger: 0.08,
} as const;

export function weightForProgress(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  return FLEX_MIN + (FLEX_MAX - FLEX_MIN) * p;
}
