import { describe, it, expect } from 'vitest';
import { projects } from './projects';

describe('projects content', () => {
  it('has exactly 6 projects in newest-to-oldest order', () => {
    expect(projects.map((p) => p.slug)).toEqual([
      'adlook', 'tessl', 'koyeb', 'qodo', 'neon', 'bnp-paribas',
    ]);
  });

  it('every project has all required non-empty fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.projectNumber).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.subtitle).toBeTruthy();
      expect(p.year).toBeTruthy();
      expect(p.disciplines.length).toBeGreaterThan(0);
      expect(p.about).toBeTruthy();
      expect(p.metrics.length).toBeGreaterThan(0);
      expect(p.role).toBeTruthy();
      expect(p.challenges.length).toBeGreaterThan(0);
      expect(p.overview.categories.length).toBeGreaterThan(0);
    }
  });

  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
