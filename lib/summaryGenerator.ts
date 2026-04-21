import { HistoryEntry, GameState } from '@/types/game';

export interface LifeSummary {
  headline: string;
  paragraph: string;
  highlights: string[];
}

const describeArc = (state: GameState): string => {
  if (state.flags.includes('purposeful') && state.support > 60) {
    return 'You were repeatedly held by people and purpose, even when life turned hard.';
  }
  if (state.flags.includes('burned_out') && state.health < 45) {
    return 'You endured by force for years, and your body eventually carried the bill.';
  }
  if (state.flags.includes('poor') && state.meaning >= 55) {
    return 'Scarcity followed you, but you still carved meaning out of unstable years.';
  }
  if (state.flags.includes('isolated')) {
    return 'You survived many chapters mostly alone, and that shaped every decision.';
  }
  return 'Your life moved quickly through chance, pressure, and choices that accumulated into a shape.';
};

const toHighlight = (entry: HistoryEntry): string => {
  const action = entry.choiceLabel ? ` → ${entry.choiceLabel}` : '';
  return `Age ${entry.ageAfter}: ${entry.text}${action}`;
};

export const generateSummary = (state: GameState): LifeSummary => {
  const notable = state.history.filter((entry) => entry.notable).slice(-4);

  return {
    headline: `You lived to ${state.age}`,
    paragraph: `${describeArc(state)} Cause of death: ${state.causeOfDeath ?? 'natural decline'}.`,
    highlights: (notable.length ? notable : state.history.slice(-4)).map(toHighlight)
  };
};
