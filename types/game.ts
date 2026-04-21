export type LifeStage = 'birth' | 'childhood' | 'adolescence' | 'early_adulthood' | 'midlife' | 'late_life';
export type BeatType = 'flash' | 'forced' | 'chance' | 'choice' | 'consequence';

export interface StatEffects {
  age?: number;
  health?: number;
  wealth?: number;
  support?: number;
  stress?: number;
  meaning?: number;
}

export interface BeatChoice {
  id: string;
  label: string;
  effects: StatEffects;
  addFlags?: string[];
  removeFlags?: string[];
  deathChance?: number;
  causeOfDeath?: string;
}

export interface LifeBeat {
  id: string;
  stage: LifeStage;
  beatType: BeatType;
  text: string;
  label?: string;
  tags?: string[];
  weight?: number;
  minAge?: number;
  maxAge?: number;
  ageAdvance?: [number, number];
  effects?: StatEffects;
  deathChance?: number;
  causeOfDeath?: string;
  damageEffects?: StatEffects;
  softLossEffects?: StatEffects;
  addFlags?: string[];
  removeFlags?: string[];
  choices?: BeatChoice[];
  requiresFlags?: string[];
  excludesFlags?: string[];
}

export interface Background {
  id: string;
  name: string;
  description: string;
  effects: Omit<GameStats, 'age' | 'luck'>;
  luck: number;
  flags?: string[];
}

export interface GameStats {
  age: number;
  health: number;
  wealth: number;
  support: number;
  stress: number;
  meaning: number;
  luck: number;
}

export interface HistoryEntry {
  beatId: string;
  stage: LifeStage;
  beatType: BeatType;
  text: string;
  choiceLabel?: string;
  ageAfter: number;
  notable?: boolean;
}

export interface FateRoll {
  label: string;
  roll: number;
  threshold: number;
  survived: boolean;
}

export interface StageThreadProgress {
  hardship: boolean;
  choice: boolean;
  chance: boolean;
  consequence: boolean;
}

export interface GameState extends GameStats {
  status: 'start' | 'playing' | 'summary';
  age: number;
  beatIndex: number;
  maxBeats: number;
  currentStage: LifeStage;
  currentBeat?: LifeBeat;
  causeOfDeath?: string;
  history: HistoryEntry[];
  hardshipCount: number;
  backgroundId?: string;
  backgroundName?: string;
  lastTags: string[];
  flags: string[];
  lifePhase: string;
  lastRoll?: FateRoll;
  beatsSinceChance: number;
  beatsSinceForced: number;
  recentBeatTypes: BeatType[];
  stageProgress: Record<LifeStage, StageThreadProgress>;
  beatTypeCounts: Record<BeatType, number>;
}
