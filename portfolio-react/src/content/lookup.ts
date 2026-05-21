import type { Project } from '../types';
import { projects } from './projects';

export function getProject(slug: string): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.slug === slug);
}
