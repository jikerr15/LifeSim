import { backgrounds } from '@/data/backgrounds';
import { EventChoice, FateRoll, GameState, LifeEvent, LifeStage, StatEffects } from '@/types/game';
import { selectNextEvent } from './eventSelector';
import { clamp, randomInt } from './utils';

const stageByAge = (age: number): LifeStage => {
  if (age <= 0) return 'birth';
  if (age <= 12) return 'childhood';
  if (age <= 18) return 'adolescence';
  if (age <= 55) return 'adulthood';
  return 'late_life';
};

const phaseByAge = (age: number): string => {
  if (age <= 0) return 'Before Birth / Birth';
  if (age <= 2) return 'Infancy';
  if (age <= 6) return 'Early Childhood';
  if (age <= 12) return 'Late Childhood';
  if (age <= 15) return 'Early Adolescence';
  if (age <= 18) return 'Late Adolescence';
  if (age <= 30) return 'Young Adulthood';
  if (age <= 45) return 'Mid Adulthood';
  if (age <= 55) return 'Late Adulthood';
  if (age <= 70) return 'Early Late-Life';
  return 'Advanced Age';
};

const applyEffects = (state: GameState, effects?: StatEffects): GameState => {
  if (!effects) return state;
  return {
    ...state,
    age: Math.max(0, state.age + (effects.age ?? 0)),
    health: clamp(state.health + (effects.health ?? 0)),
    wealth: clamp(state.wealth + (effects.wealth ?? 0)),
    support: clamp(state.support + (effects.support ?? 0)),
    stress: clamp(state.stress + (effects.stress ?? 0)),
    meaning: clamp(state.meaning + (effects.meaning ?? 0))
  };
};

const rollFate = (baseChance: number, luck: number, label: string): FateRoll => {
  const adjustedChance = clamp(baseChance - (luck - 50) / 1300, 0, 1);
  const roll = Math.random();
  return {
    label,
    roll,
    threshold: adjustedChance,
    survived: roll >= adjustedChance
  };
};

const baselineDeathChance = (state: GameState): { chance: number; cause: string; label: string } => {
  let chance = 0.0015;
  let cause = 'sudden medical decline';
  let label = 'Everyday mortality risk';

  if (state.health < 35) {
    chance += 0.02;
    cause = 'long-term health decline';
    label = 'Health complications';
  }
  if (state.stress > 70) {
    chance += 0.016;
    cause = 'stress-related deterioration';
    label = 'Stress overload';
  }
  if (state.age > 56) {
    chance += (state.age - 56) * 0.003;
    cause = state.age > 75 ? 'old age' : 'age-related decline';
    label = 'Age-related decline';
  }

  return { chance, cause, label };
};

const isNotable = (event: LifeEvent, effects?: StatEffects): boolean => {
  if (event.deathChance && event.deathChance > 0) return true;
  if (!effects) return false;
  const impact = Object.values(effects).reduce((sum, value) => sum + Math.abs(value ?? 0), 0);
  return impact >= 14 || (event.tags?.includes('loss') ?? false) || (event.tags?.includes('turning_point') ?? false);
};

const markSummary = (state: GameState, causeOfDeath: string): GameState => ({
  ...state,
  status: 'summary',
  causeOfDeath,
  currentEvent: undefined
});

export const createInitialGameState = (): GameState => {
  const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  const state: GameState = {
    status: 'playing',
    age: 0,
    ...background.effects,
    luck: background.luck,
    currentStage: 'birth',
    lifePhase: phaseByAge(0),
    currentEvent: undefined,
    causeOfDeath: undefined,
    history: [],
    hardshipCount: 0,
    backgroundId: background.id,
    backgroundName: background.name,
    lastTags: [],
    lastRoll: undefined
  };

  return { ...state, currentEvent: selectNextEvent(state) };
};

const finalizeEvent = (state: GameState, event: LifeEvent, effects?: StatEffects, choice?: EventChoice): GameState => {
  const afterEffects = applyEffects(state, effects);
  const [minAge, maxAge] = event.ageAdvance ?? [1, 2];
  const nextAge = afterEffects.age + randomInt(minAge, maxAge);

  return {
    ...afterEffects,
    age: nextAge,
    currentStage: stageByAge(nextAge),
    lifePhase: phaseByAge(nextAge),
    history: [
      ...afterEffects.history,
      {
        eventId: event.id,
        stage: event.stage,
        text: event.text,
        choiceLabel: choice?.label,
        ageAfter: nextAge,
        notable: isNotable(event, effects)
      }
    ],
    hardshipCount:
      afterEffects.hardshipCount + ((event.tags?.includes('hardship') ?? false) || (event.tags?.includes('loss') ?? false) ? 1 : 0),
    lastTags: event.tags?.slice(0, 3) ?? []
  };
};

export const resolveEvent = (state: GameState, choiceId?: string): GameState => {
  const event = state.currentEvent;
  if (!event) return state;

  const selectedChoice = event.choices?.find((choice) => choice.id === choiceId);
  const effectSource = selectedChoice?.effects ?? event.effects;
  const progressedState = finalizeEvent(state, event, effectSource, selectedChoice);

  const eventDeathChance = selectedChoice?.deathChance ?? event.deathChance;
  const eventCause = selectedChoice?.causeOfDeath ?? event.causeOfDeath;

  if (eventDeathChance && eventDeathChance > 0) {
    const fateRoll = rollFate(eventDeathChance, progressedState.luck, event.title ?? 'Event risk');
    const withRoll = { ...progressedState, lastRoll: fateRoll };
    if (!fateRoll.survived) {
      return markSummary(withRoll, eventCause ?? 'sudden death');
    }

    const nextEvent = selectNextEvent(withRoll);
    if (!nextEvent) return markSummary(withRoll, 'old age');
    return { ...withRoll, currentEvent: nextEvent };
  }

  const baselineRisk = baselineDeathChance(progressedState);
  const baselineRoll = rollFate(baselineRisk.chance, progressedState.luck, baselineRisk.label);
  const withBaselineRoll = { ...progressedState, lastRoll: baselineRoll };

  if (!baselineRoll.survived) {
    return markSummary(withBaselineRoll, baselineRisk.cause);
  }

  const nextEvent = selectNextEvent(withBaselineRoll);
  if (!nextEvent) {
    return markSummary(withBaselineRoll, 'old age');
  }

  return { ...withBaselineRoll, currentEvent: nextEvent };
};
