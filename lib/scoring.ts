import { GameState } from '@/types/game';

export const calculateLifeScore = (state: GameState): number => {
  const base =
    state.age * 0.8 +
    state.meaning * 1.2 +
    state.support +
    state.wealth * 0.5 +
    state.hardshipCount * 3 -
    state.stress * 0.7;

  return Math.max(0, Math.min(500, Math.round(base)));
};
