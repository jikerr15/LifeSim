export type LifeStage = 'birth' | 'childhood' | 'adolescence' | 'adulthood' | 'late_life';
export type EventType = 'choice' | 'forced' | 'chance';

export interface StatEffects {
  age?: number;
  health?: number;
  wealth?: number;
  support?: number;
  stress?: number;
  meaning?: number;
}

export interface EventChoice {
  id: string;
  label: string;
  effects?: StatEffects;
  deathChance?: number;
  causeOfDeath?: string;
  outcomeText?: string;
}

export interface LifeEvent {
  id: string;
  stage: LifeStage;
  type: EventType;
  title?: string;
  text: string;
  weight?: number;
  minAge?: number;
  maxAge?: number;
  tags?: string[];
  effects?: StatEffects;
  deathChance?: number;
  causeOfDeath?: string;
  choices?: EventChoice[];
  surviveText?: string;
  ageAdvance?: [number, number];
}

export interface Background {
  id: string;
  name: string;
  description: string;
  effects: Omit<GameStats, 'age' | 'luck'>;
  luck: number;
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
  eventId: string;
  stage: LifeStage;
  text: string;
  choiceLabel?: string;
  ageAfter: number;
  notable?: boolean;
}

export interface GameState extends GameStats {
  status: 'start' | 'playing' | 'summary';
  currentStage: LifeStage;
  currentEvent?: LifeEvent;
  causeOfDeath?: string;
  history: HistoryEntry[];
  hardshipCount: number;
  backgroundId?: string;
  backgroundName?: string;
  lastTags: string[];
}
