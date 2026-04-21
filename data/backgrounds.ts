import { Background } from '@/types/game';

export const backgrounds: Background[] = [
  {
    id: 'stable_home',
    name: 'Stable Home',
    description: 'You begin with structure, routines, and people who show up.',
    effects: { health: 65, wealth: 58, support: 74, stress: 30, meaning: 50 },
    luck: 54,
    flags: ['loved', 'secure']
  },
  {
    id: 'financial_strain',
    name: 'Financial Strain',
    description: 'Care exists, but money fear is constant.',
    effects: { health: 56, wealth: 28, support: 58, stress: 52, meaning: 44 },
    luck: 46,
    flags: ['poor']
  },
  {
    id: 'privileged',
    name: 'Privileged Start',
    description: 'Resources are available, but pressure starts early.',
    effects: { health: 66, wealth: 78, support: 56, stress: 42, meaning: 46 },
    luck: 61,
    flags: ['secure']
  },
  {
    id: 'isolated',
    name: 'Isolated Beginning',
    description: 'Needs are met, but emotional connection is thin.',
    effects: { health: 58, wealth: 46, support: 28, stress: 58, meaning: 33 },
    luck: 41,
    flags: ['isolated', 'neglected']
  },
  {
    id: 'fragile_health',
    name: 'Fragile Health',
    description: 'You begin life medically vulnerable.',
    effects: { health: 41, wealth: 48, support: 66, stress: 51, meaning: 42 },
    luck: 47,
    flags: ['sickly']
  },
  {
    id: 'community_rooted',
    name: 'Community Rooted',
    description: 'People around you share burdens and celebrations.',
    effects: { health: 60, wealth: 42, support: 80, stress: 37, meaning: 58 },
    luck: 51,
    flags: ['loved', 'purposeful']
  }
];
