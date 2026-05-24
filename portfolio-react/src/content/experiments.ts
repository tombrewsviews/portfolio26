import type { Experiment } from '../types';

export const experiments: Experiment[] = [
  {
    title: 'Stackpack Debug',
    description: 'A closed-loop debugging toolkit for AI agents: investigate, instrument, capture, verify, remember.',
    links: [{ label: 'GitHub', href: 'https://github.com/tombrewsviews/debug-toolkit' }],
  },
  {
    title: 'Claude Skills',
    description: 'A set of over 10 custom Claude Code skills extending agent capability across design and engineering.',
    links: [{ label: 'Source', href: 'https://github.com/tombrewsviews/skill-simulate-to-verify' }],
  },
  {
    title: 'BYOA + Kinetic Type',
    description: 'Bring-your-own-agent experiments paired with kinetic typography explorations.',
    links: [{ label: 'GitHub', href: 'https://github.com/tombrewsviews/BYOA' }],
  },
];
