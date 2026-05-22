import type { Project } from '../types';
import { projects } from './projects';

export function getProject(slug: string): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
}

/** Next project in roadmap order, wrapping back to the first after the last. */
export function getNextProject(slug: string): Project | undefined {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return projects[(i + 1) % projects.length];
}
