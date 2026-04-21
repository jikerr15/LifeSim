import { HistoryEntry, GameState } from '@/types/game';

export interface LifeSummary {
  headline: string;
  paragraph: string;
  highlights: string[];
}

const describeArc = (state: GameState): string => {
  if (state.meaning > 65 && state.support > 60) {
    return 'You built a connected life, and relationships gave your years emotional depth.';
  }
  if (state.wealth > 70 && state.meaning < 45) {
    return 'Material security was present, but purpose often felt just out of reach.';
  }
  if (state.health < 40 && state.stress > 65) {
    return 'Pressure followed you for years, and your body carried much of the cost.';
  }
  if (state.hardshipCount >= 5 && state.meaning >= 50) {
    return 'Life was uneven and sometimes harsh, yet you remained resilient in meaningful ways.';
  }
  return 'Your life moved between luck and loss, shaped by both your choices and circumstances.';
};

const toHighlight = (entry: HistoryEntry): string => {
  const choice = entry.choiceLabel ? ` — you chose: ${entry.choiceLabel}` : '';
  return `Age ${entry.ageAfter}: ${entry.text}${choice}`;
};

export const generateSummary = (state: GameState): LifeSummary => {
  const notable = state.history.filter((entry) => entry.notable).slice(-4);

  return {
    headline: `You lived to ${state.age}`,
    paragraph: `${describeArc(state)} You died from ${state.causeOfDeath ?? 'natural causes'}.`,
    highlights: notable.length ? notable.map(toHighlight) : state.history.slice(-3).map(toHighlight)
  };
};
