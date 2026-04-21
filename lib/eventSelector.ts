import { lifeBeats } from '@/data/beats';
import { BeatType, GameState, LifeBeat, LifeStage } from '@/types/game';
import { pickWeighted } from './utils';

const stageBeatPlan: Array<{ stage: LifeStage; upto: number }> = [
  { stage: 'birth', upto: 6 },
  { stage: 'childhood', upto: 22 },
  { stage: 'adolescence', upto: 38 },
  { stage: 'early_adulthood', upto: 58 },
  { stage: 'midlife', upto: 74 },
  { stage: 'late_life', upto: 90 }
];

const targetMix: Record<BeatType, number> = {
  choice: 25,
  forced: 25,
  chance: 20,
  flash: 15,
  consequence: 5
};

export const stageForBeatIndex = (beatIndex: number): LifeStage =>
  stageBeatPlan.find((entry) => beatIndex < entry.upto)?.stage ?? 'late_life';

const remainingInStage = (beatIndex: number): number => {
  const current = stageBeatPlan.find((entry) => beatIndex < entry.upto);
  if (!current) return 0;
  return current.upto - beatIndex;
};

const missingStageRequirements = (state: GameState): BeatType[] => {
  const progress = state.stageProgress[state.currentStage];
  const required: BeatType[] = [];
  if (!progress.choice) required.push('choice');
  if (!progress.chance) required.push('chance');
  if (!progress.consequence) required.push('consequence');
  if (!progress.hardship) required.push('forced');
  return required;
};

const chooseNeededBeatType = (state: GameState): BeatType => {
  const [last, secondLast] = state.recentBeatTypes;

  if (last === 'choice' && secondLast === 'choice') return 'forced';
  if (state.beatsSinceChance >= 4) return 'chance';
  if (state.beatsSinceForced >= 2) return 'forced';

  const missing = missingStageRequirements(state);
  if (remainingInStage(state.beatIndex) <= missing.length && missing.length > 0) {
    return missing[0];
  }

  const deficits = (Object.keys(targetMix) as BeatType[]).map((type) => ({
    type,
    deficit: targetMix[type] - state.beatTypeCounts[type]
  }));

  deficits.sort((a, b) => b.deficit - a.deficit);
  return deficits[0].type;
};

const dynamicWeight = (beat: LifeBeat, state: GameState): number => {
  let weight = beat.weight ?? 1;
  const tags = beat.tags ?? [];

  if (state.wealth < 35 && tags.includes('hardship')) weight += 1.4;
  if (state.support > 65 && tags.includes('recovery')) weight += 1.1;
  if (state.health < 40 && tags.includes('health')) weight += 1.7;
  if (state.stress > 68 && tags.includes('risk')) weight += 1.1;
  if (state.flags.includes('poor') && tags.includes('hardship')) weight += 1;
  if (state.flags.includes('purposeful') && tags.includes('meaning')) weight += 0.9;
  if (state.flags.includes('partnered') && tags.includes('loss')) weight += 1;

  if (tags.some((tag) => state.lastTags.includes(tag))) weight *= 0.55;

  return Math.max(0.1, weight);
};

const validForState = (beat: LifeBeat, state: GameState): boolean => {
  if (beat.stage !== state.currentStage) return false;
  if (beat.id === state.currentBeat?.id) return false;
  if (beat.minAge !== undefined && state.age < beat.minAge) return false;
  if (beat.maxAge !== undefined && state.age > beat.maxAge) return false;
  if (beat.requiresFlags && !beat.requiresFlags.every((flag) => state.flags.includes(flag))) return false;
  if (beat.excludesFlags && beat.excludesFlags.some((flag) => state.flags.includes(flag))) return false;
  if (state.history.slice(-5).some((entry) => entry.beatId === beat.id)) return false;
  return true;
};

export const selectNextBeat = (state: GameState): LifeBeat | undefined => {
  const neededType = chooseNeededBeatType(state);

  const primaryPool = lifeBeats
    .filter((beat) => beat.beatType === neededType)
    .filter((beat) => validForState(beat, state))
    .map((beat) => ({ ...beat, weight: dynamicWeight(beat, state) }));

  if (primaryPool.length) return pickWeighted(primaryPool);

  const fallbackPool = lifeBeats
    .filter((beat) => validForState(beat, state))
    .map((beat) => ({ ...beat, weight: dynamicWeight(beat, state) }));

  return pickWeighted(fallbackPool);
};
