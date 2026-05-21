import { describe, it, expect } from 'vitest';
import { weightForProgress, FLEX_MIN, FLEX_MAX } from './flexAnim';

describe('weightForProgress', () => {
  it('returns FLEX_MIN at progress 0', () => {
    expect(weightForProgress(0)).toBe(FLEX_MIN);
  });

  it('returns FLEX_MAX at progress 1', () => {
    expect(weightForProgress(1)).toBe(FLEX_MAX);
  });

  it('returns the midpoint weight at progress 0.5', () => {
    expect(weightForProgress(0.5)).toBe((FLEX_MIN + FLEX_MAX) / 2);
  });

  it('clamps progress below 0 to FLEX_MIN', () => {
    expect(weightForProgress(-1)).toBe(FLEX_MIN);
  });

  it('clamps progress above 1 to FLEX_MAX', () => {
    expect(weightForProgress(5)).toBe(FLEX_MAX);
  });
});
