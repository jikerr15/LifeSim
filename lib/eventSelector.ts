import { lifeEvents } from '@/data/events';
import { GameState, LifeEvent } from '@/types/game';
import { pickWeighted } from './utils';

const adjustWeight = (event: LifeEvent, state: GameState): number => {
  let weight = event.weight ?? 1;
  const tags = event.tags ?? [];

  if (state.wealth < 35 && tags.includes('hardship')) weight += 1.2;
  if (state.support > 65 && tags.includes('recovery')) weight += 1;
  if (state.health < 40 && tags.includes('health')) weight += 1.4;
  if (state.stress > 65 && tags.includes('stress')) weight += 1.2;
  if (tags.some((tag) => state.lastTags.includes(tag))) weight *= 0.7;

  return Math.max(0.1, weight);
};

export const selectNextEvent = (state: GameState): LifeEvent | undefined => {
  const pool = lifeEvents
    .filter((event) => event.stage === state.currentStage)
    .filter((event) => event.id !== state.currentEvent?.id)
    .filter((event) => event.minAge === undefined || state.age >= event.minAge)
    .filter((event) => event.maxAge === undefined || state.age <= event.maxAge)
    .map((event) => ({ ...event, weight: adjustWeight(event, state) }));

  return pickWeighted(pool);
};
