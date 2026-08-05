import { describe, it, expect } from 'vitest';
import { getProject } from './lookup';

describe('getProject', () => {
  it('returns the project for a known slug', () => {
    const p = getProject('adtech');
    expect(p?.title).toBe('AdTech');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getProject('does-not-exist')).toBeUndefined();
  });

  it('returns undefined for an empty slug', () => {
    expect(getProject('')).toBeUndefined();
  });
});
