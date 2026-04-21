import { HistoryEntry, GameState } from '@/types/game';

export interface LifeSummary {
  headline: string;
  paragraph: string;
  highlights: string[];
}

const describeArc = (state: GameState): string => {
  if (state.meaning > 65 && state.support > 60) {
    return 'You built a connected life where relationships and purpose reinforced each other.';
  }
  if (state.wealth > 70 && state.meaning < 45) {
    return 'You secured material stability, but emotional fulfillment often stayed at arm’s length.';
  }
  if (state.health < 40 && state.stress > 65) {
    return 'Long pressure and limited recovery wore down your body over time.';
  }
  if (state.hardshipCount >= 5 && state.meaning >= 50) {
    return 'Your life was repeatedly tested, but you kept rebuilding with resilience.';
  }
  return 'Your life moved through luck, setbacks, and choices that slowly shaped who you became.';
};

const toHighlight = (entry: HistoryEntry): string => {
  const choice = entry.choiceLabel ? ` — You chose: ${entry.choiceLabel}.` : '';
  return `Age ${entry.ageAfter}: ${entry.text}${choice}`;
};

export const generateSummary = (state: GameState): LifeSummary => {
  const notable = state.history.filter((entry) => entry.notable).slice(-4);

  return {
    headline: `You lived to ${state.age}`,
    paragraph: `${describeArc(state)} Your final chapter ended due to ${state.causeOfDeath ?? 'natural causes'}.`,
    highlights: notable.length ? notable.map(toHighlight) : state.history.slice(-3).map(toHighlight)
  };
};
