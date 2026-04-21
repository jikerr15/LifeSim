import { backgrounds } from '@/data/backgrounds';
import { BeatChoice, BeatType, GameState, LifeBeat, LifeStage, StageThreadProgress, StatEffects } from '@/types/game';
import { selectNextBeat, stageForBeatIndex } from './eventSelector';
import { clamp, randomInt } from './utils';

const phaseByAge = (age: number): string => {
  if (age <= 0) return 'Before Birth / Birth';
  if (age <= 12) return 'Childhood';
  if (age <= 18) return 'Adolescence';
  if (age <= 35) return 'Early Adulthood';
  if (age <= 55) return 'Midlife';
  return 'Late Life';
};

const emptyStageProgress = (): Record<LifeStage, StageThreadProgress> => ({
  birth: { hardship: false, choice: false, chance: false, consequence: false },
  childhood: { hardship: false, choice: false, chance: false, consequence: false },
  adolescence: { hardship: false, choice: false, chance: false, consequence: false },
  early_adulthood: { hardship: false, choice: false, chance: false, consequence: false },
  midlife: { hardship: false, choice: false, chance: false, consequence: false },
  late_life: { hardship: false, choice: false, chance: false, consequence: false }
});

const emptyBeatTypeCounts = (): Record<BeatType, number> => ({
  choice: 0,
  forced: 0,
  chance: 0,
  flash: 0,
  consequence: 0
});

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

const setFlags = (state: GameState, addFlags: string[] = [], removeFlags: string[] = []): GameState => {
  const next = new Set(state.flags);
  addFlags.forEach((flag) => next.add(flag));
  removeFlags.forEach((flag) => next.delete(flag));

  if (state.stress > 75) next.add('burned_out');
  if (state.health < 35) next.add('sickly');
  if (state.support < 30) next.add('isolated');
  if (state.meaning > 70) next.add('purposeful');

  return { ...state, flags: [...next] };
};

const markStageThread = (state: GameState, beat: LifeBeat): GameState => {
  const current = state.stageProgress[beat.stage];
  const updated: StageThreadProgress = {
    hardship: current.hardship || (beat.tags?.includes('hardship') ?? false),
    choice: current.choice || beat.beatType === 'choice',
    chance: current.chance || beat.beatType === 'chance',
    consequence: current.consequence || beat.beatType === 'consequence'
  };

  return {
    ...state,
    stageProgress: {
      ...state.stageProgress,
      [beat.stage]: updated
    }
  };
};

const rollFate = (chance: number, luck: number, label: string) => {
  const adjusted = clamp(chance - (luck - 50) / 1300, 0, 0.96);
  const roll = Math.random();

  return {
    label,
    roll,
    threshold: adjusted,
    survived: roll >= adjusted
  };
};

const baselineMortalityChance = (state: GameState): { chance: number; cause: string } => {
  let chance = 0.002;
  let cause = 'sudden decline';

  if (state.age > 55) {
    chance += (state.age - 55) * 0.0035;
    cause = state.age > 75 ? 'old age' : 'age-related decline';
  }
  if (state.health < 35) {
    chance += 0.02;
    cause = 'long-term health decline';
  }
  if (state.stress > 75) {
    chance += 0.015;
    cause = 'stress-related deterioration';
  }
  if (state.support < 25) {
    chance += 0.01;
  }

  return { chance: Math.min(chance, 0.9), cause };
};

const advanceBeat = (state: GameState, beat: LifeBeat, choice?: BeatChoice): GameState => {
  const [minAge, maxAge] = beat.ageAdvance ?? [0, 1];
  const ageStep = randomInt(minAge, maxAge);

  const withCounts: GameState = {
    ...state,
    beatIndex: state.beatIndex + 1,
    beatTypeCounts: {
      ...state.beatTypeCounts,
      [beat.beatType]: state.beatTypeCounts[beat.beatType] + 1
    },
    beatsSinceChance: beat.beatType === 'chance' ? 0 : state.beatsSinceChance + 1,
    beatsSinceForced: beat.beatType === 'forced' ? 0 : state.beatsSinceForced + 1,
    recentBeatTypes: [beat.beatType, ...state.recentBeatTypes].slice(0, 2),
    age: state.age + ageStep
  };

  const effectSource = choice?.effects ?? beat.effects;
  const withEffects = applyEffects(withCounts, effectSource);
  const withFlags = setFlags(withEffects, [...(beat.addFlags ?? []), ...(choice?.addFlags ?? [])], [...(beat.removeFlags ?? []), ...(choice?.removeFlags ?? [])]);
  const withStageThreads = markStageThread(withFlags, beat);

  const nextStage = stageForBeatIndex(withStageThreads.beatIndex);

  return {
    ...withStageThreads,
    currentStage: nextStage,
    lifePhase: phaseByAge(withStageThreads.age),
    history: [
      ...withStageThreads.history,
      {
        beatId: beat.id,
        stage: beat.stage,
        beatType: beat.beatType,
        text: beat.text,
        choiceLabel: choice?.label,
        ageAfter: withStageThreads.age,
        notable: !!beat.deathChance || beat.beatType === 'consequence' || (beat.tags?.includes('hardship') ?? false)
      }
    ],
    hardshipCount: withStageThreads.hardshipCount + ((beat.tags?.includes('hardship') ?? false) ? 1 : 0),
    lastTags: beat.tags?.slice(0, 3) ?? []
  };
};

const resolveChanceOutcome = (state: GameState, beat: LifeBeat): GameState => {
  const fate = rollFate(beat.deathChance ?? 0, state.luck, beat.label ?? 'Chance');
  let next: GameState = { ...state, lastRoll: fate };

  if (!fate.survived) {
    return {
      ...next,
      status: 'summary',
      causeOfDeath: beat.causeOfDeath ?? 'sudden death',
      currentBeat: undefined
    };
  }

  const severityRoll = Math.random();
  if (severityRoll < 0.35 && beat.damageEffects) {
    next = setFlags(applyEffects(next, beat.damageEffects), ['sickly'], []);
  } else if (severityRoll < 0.75 && beat.softLossEffects) {
    next = applyEffects(next, beat.softLossEffects);
  }

  return next;
};

const finalizeOrContinue = (state: GameState): GameState => {
  if (state.beatIndex >= state.maxBeats) {
    return {
      ...state,
      status: 'summary',
      causeOfDeath: state.causeOfDeath ?? 'old age',
      currentBeat: undefined
    };
  }

  const baseline = baselineMortalityChance(state);
  const baselineRoll = rollFate(baseline.chance, state.luck, 'Background mortality');
  const withRoll = { ...state, lastRoll: baselineRoll };

  if (!baselineRoll.survived) {
    return {
      ...withRoll,
      status: 'summary',
      causeOfDeath: baseline.cause,
      currentBeat: undefined
    };
  }

  const nextBeat = selectNextBeat(withRoll);
  if (!nextBeat) {
    return {
      ...withRoll,
      status: 'summary',
      causeOfDeath: 'old age',
      currentBeat: undefined
    };
  }

  return {
    ...withRoll,
    currentBeat: nextBeat
  };
};

export const createInitialGameState = (): GameState => {
  const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  const initial: GameState = {
    status: 'playing',
    age: 0,
    beatIndex: 0,
    maxBeats: 90,
    ...background.effects,
    luck: background.luck,
    currentStage: 'birth',
    currentBeat: undefined,
    causeOfDeath: undefined,
    history: [],
    hardshipCount: 0,
    backgroundId: background.id,
    backgroundName: background.name,
    lastTags: [],
    flags: [...(background.flags ?? [])],
    lifePhase: 'Before Birth / Birth',
    lastRoll: undefined,
    beatsSinceChance: 0,
    beatsSinceForced: 0,
    recentBeatTypes: [],
    stageProgress: emptyStageProgress(),
    beatTypeCounts: emptyBeatTypeCounts()
  };

  return { ...initial, currentBeat: selectNextBeat(initial) };
};

export const resolveBeat = (state: GameState, choiceId?: string): GameState => {
  const beat = state.currentBeat;
  if (!beat) return state;

  const choice = beat.choices?.find((entry) => entry.id === choiceId);

  let next = advanceBeat(state, beat, choice);

  const directDeathChance = choice?.deathChance ?? beat.deathChance;
  if (directDeathChance && directDeathChance > 0) {
    const lethalBeat = { ...beat, deathChance: directDeathChance, causeOfDeath: choice?.causeOfDeath ?? beat.causeOfDeath };
    next = resolveChanceOutcome(next, lethalBeat);
    if (next.status === 'summary') return next;
  }

  return finalizeOrContinue(next);
};
