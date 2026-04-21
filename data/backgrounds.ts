import { Background } from '@/types/game';

export const backgrounds: Background[] = [
  {
    id: 'stable_home',
    name: 'Stable Home',
    description: 'You are born into a steady household with predictable support.',
    effects: { health: 64, wealth: 56, support: 72, stress: 34, meaning: 48 },
    luck: 52
  },
  {
    id: 'financial_strain',
    name: 'Financial Strain',
    description: 'Love is present, but money is always tight and uncertain.',
    effects: { health: 56, wealth: 28, support: 60, stress: 52, meaning: 44 },
    luck: 45
  },
  {
    id: 'privileged',
    name: 'Privileged Start',
    description: 'Resources and doors are open early, though pressure follows.',
    effects: { health: 66, wealth: 76, support: 58, stress: 42, meaning: 46 },
    luck: 62
  },
  {
    id: 'isolated',
    name: 'Isolated Beginning',
    description: 'Basic needs are met, but emotional connection is scarce.',
    effects: { health: 58, wealth: 44, support: 30, stress: 56, meaning: 32 },
    luck: 40
  },
  {
    id: 'fragile_health',
    name: 'Fragile Health',
    description: 'You begin life with a body that demands extra care.',
    effects: { health: 40, wealth: 50, support: 64, stress: 52, meaning: 40 },
    luck: 47
  },
  {
    id: 'community_rooted',
    name: 'Community Rooted',
    description: 'You grow up surrounded by people who show up for one another.',
    effects: { health: 60, wealth: 40, support: 78, stress: 38, meaning: 56 },
    luck: 50
  }
];
