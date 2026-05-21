export const FLEX_MIN = 300;
export const FLEX_MAX = 900;

// Shared scroll-choreography constants so motion is consistent site-wide.
export const REVEAL = {
  duration: 0.9,
  ease: 'power3.out',
  y: 24,
  stagger: 0.08,
} as const;

export function weightForProgress(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  return FLEX_MIN + (FLEX_MAX - FLEX_MIN) * p;
}
