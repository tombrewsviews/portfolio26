import { describe, it, expect } from 'vitest';
import { projects } from './projects';

describe('projects content', () => {
  it('has exactly 6 projects in newest-to-oldest order', () => {
    expect(projects.map((p) => p.slug)).toEqual([
      'adtech', 'tessl', 'koyeb', 'qodo', 'neon', 'bnp-paribas',
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

  it('every shot uses a known layout, has a ratio, and pairs carry two frames', () => {
    const layouts = new Set([
      'bleed', 'full', 'wide-left', 'wide-right', 'narrow-left', 'narrow-right', 'pair',
    ]);
    for (const p of projects) {
      expect(p.shots?.length, `${p.slug} should have interleaved shots`).toBeGreaterThan(0);
      for (const s of p.shots ?? []) {
        expect(layouts.has(s.layout), `${p.slug}: bad layout ${s.layout}`).toBe(true);
        expect(s.ratio, `${p.slug}: shot missing ratio`).toMatch(/^\d+ \/ \d+$/);
        if (s.layout === 'pair') {
          expect(s.src, `${p.slug}: pair missing first frame`).toBeTruthy();
          expect(s.srcB, `${p.slug}: pair missing second frame`).toBeTruthy();
        }
      }
    }
  });
});
