import { lifeEvents } from '@/data/events';
import { GameState, LifeEvent } from '@/types/game';
import { pickWeighted } from './utils';

const adjustWeight = (event: LifeEvent, state: GameState): number => {
  let weight = event.weight ?? 1;
  const tags = event.tags ?? [];

  if (state.wealth < 35 && tags.includes('hardship')) weight += 1.2;
  if (state.support > 65 && tags.includes('recovery')) weight += 1;
  if (state.health < 42 && tags.includes('health')) weight += 1.5;
  if (state.stress > 68 && tags.includes('stress')) weight += 1.3;
  if (state.meaning < 35 && tags.includes('meaning')) weight += 0.8;

  if (tags.some((tag) => state.lastTags.includes(tag))) weight *= 0.6;

  return Math.max(0.1, weight);
};

const withinAgeWindow = (event: LifeEvent, age: number): boolean => {
  if (event.minAge !== undefined && age < event.minAge) return false;
  if (event.maxAge !== undefined && age > event.maxAge) return false;
  return true;
};

export const selectNextEvent = (state: GameState): LifeEvent | undefined => {
  const pool = lifeEvents
    .filter((event) => event.stage === state.currentStage)
    .filter((event) => event.id !== state.currentEvent?.id)
    .filter((event) => withinAgeWindow(event, state.age))
    .map((event) => ({ ...event, weight: adjustWeight(event, state) }));

  return pickWeighted(pool);
};
