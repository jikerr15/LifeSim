import { backgrounds } from '@/data/backgrounds';
import { EventChoice, GameState, LifeEvent, LifeStage, StatEffects } from '@/types/game';
import { selectNextEvent } from './eventSelector';
import { clamp, randomInt } from './utils';

const stageByAge = (age: number): LifeStage => {
  if (age <= 0) return 'birth';
  if (age <= 12) return 'childhood';
  if (age <= 18) return 'adolescence';
  if (age <= 55) return 'adulthood';
  return 'late_life';
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

const rollDeath = (chance: number, luck: number): boolean => {
  const adjusted = Math.max(0, chance - (luck - 50) / 1000);
  return Math.random() < adjusted;
};

const baselineDeathChance = (state: GameState): { chance: number; cause: string } => {
  let chance = 0.001;
  let cause = 'sudden medical decline';

  if (state.health < 30) {
    chance += 0.03;
    cause = 'chronic health decline';
  }
  if (state.stress > 75) {
    chance += 0.02;
    cause = 'stress-related illness';
  }
  if (state.age > 55) {
    chance += (state.age - 55) * 0.003;
    cause = 'age-related decline';
  }

  return { chance, cause };
};

const isNotable = (event: LifeEvent, effects?: StatEffects): boolean => {
  if (event.deathChance && event.deathChance > 0) return true;
  if (!effects) return false;
  const impact = Object.values(effects).reduce((sum, value) => sum + Math.abs(value ?? 0), 0);
  return impact >= 14 || (event.tags?.includes('loss') ?? false);
};

export const createInitialGameState = (): GameState => {
  const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  const state: GameState = {
    status: 'playing',
    age: 0,
    ...background.effects,
    luck: background.luck,
    currentStage: 'birth',
    currentEvent: undefined,
    causeOfDeath: undefined,
    history: [],
    hardshipCount: 0,
    backgroundId: background.id,
    backgroundName: background.name,
    lastTags: []
  };

  return { ...state, currentEvent: selectNextEvent(state) };
};

const finalizeEvent = (state: GameState, event: LifeEvent, effects?: StatEffects, choice?: EventChoice): GameState => {
  const aged = applyEffects(state, effects);
  const [minAge, maxAge] = event.ageAdvance ?? [1, 2];
  const nextAge = aged.age + randomInt(minAge, maxAge);

  const updated: GameState = {
    ...aged,
    age: nextAge,
    currentStage: stageByAge(nextAge),
    history: [
      ...aged.history,
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
      aged.hardshipCount + ((event.tags?.includes('hardship') ?? false) || (event.tags?.includes('loss') ?? false) ? 1 : 0),
    lastTags: event.tags?.slice(0, 2) ?? []
  };

  return updated;
};

export const resolveEvent = (state: GameState, choiceId?: string): GameState => {
  const event = state.currentEvent;
  if (!event) return state;

  const selectedChoice = event.choices?.find((choice) => choice.id === choiceId);
  const effectSource = selectedChoice?.effects ?? event.effects;
  const nextState = finalizeEvent(state, event, effectSource, selectedChoice);

  const eventDeathChance = selectedChoice?.deathChance ?? event.deathChance;
  const eventCause = selectedChoice?.causeOfDeath ?? event.causeOfDeath;
  if (eventDeathChance && rollDeath(eventDeathChance, nextState.luck)) {
    return {
      ...nextState,
      status: 'summary',
      causeOfDeath: eventCause ?? 'sudden death',
      currentEvent: undefined
    };
  }

  const baselineRisk = baselineDeathChance(nextState);
  if (rollDeath(baselineRisk.chance, nextState.luck)) {
    return {
      ...nextState,
      status: 'summary',
      causeOfDeath: baselineRisk.cause,
      currentEvent: undefined
    };
  }

  const nextEvent = selectNextEvent(nextState);
  if (!nextEvent) {
    return {
      ...nextState,
      status: 'summary',
      causeOfDeath: 'old age',
      currentEvent: undefined
    };
  }

  return { ...nextState, currentEvent: nextEvent };
};
