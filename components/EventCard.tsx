'use client';

import { LifeBeat } from '@/types/game';
import { useState } from 'react';

interface EventCardProps {
  beat: LifeBeat;
  onContinue: () => void;
  onChoice: (choiceId: string) => void;
}

const toPercent = (value?: number) => `${Math.round((value ?? 0) * 100)}%`;

const labelForType = (type: LifeBeat['beatType']) => {
  if (type === 'choice') return 'You Choose';
  if (type === 'forced') return 'Life Happens';
  if (type === 'chance') return 'Chance';
  if (type === 'consequence') return 'Consequence';
  return 'Passing Time';
};

export const EventCard = ({ beat, onContinue, onChoice }: EventCardProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const spinThen = (action: () => void) => {
    const shouldSpin = beat.beatType === 'chance' || !!beat.deathChance;
    if (!shouldSpin) {
      action();
      return;
    }

    setIsSpinning(true);
    window.setTimeout(() => {
      action();
      setIsSpinning(false);
    }, 900);
  };

  return (
    <section className="rounded-2xl border border-slate-600 bg-card/80 p-6 shadow-xl">
      <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">{beat.label ?? labelForType(beat.beatType)}</p>
      <p className="mb-4 text-xl font-medium text-slate-100">{beat.text}</p>

      {beat.beatType === 'chance' ? (
        <div className="mb-5 rounded-lg border border-amber-300/40 bg-amber-100/10 p-3 text-sm text-amber-100">
          <p>Visible fate check. Death risk now: {toPercent(beat.deathChance)}.</p>
          <div className="mt-2 flex items-center gap-3">
            <div className={`h-8 w-8 rounded-full border-4 border-amber-300 border-t-transparent ${isSpinning ? 'animate-spin' : ''}`} />
            <span className="text-xs">{isSpinning ? 'Fate spinning...' : 'Tap to reveal'}</span>
          </div>
        </div>
      ) : null}

      {beat.choices?.length ? (
        <div className="grid gap-3">
          {beat.choices.map((choice) => (
            <button
              key={choice.id}
              disabled={isSpinning}
              onClick={() => spinThen(() => onChoice(choice.id))}
              className="rounded-lg border border-slate-500 bg-slate-200/10 px-4 py-3 text-left transition hover:bg-slate-200/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <p>{choice.label}</p>
              {choice.deathChance ? <p className="mt-1 text-xs text-amber-200">Risk: {toPercent(choice.deathChance)}</p> : null}
            </button>
          ))}
        </div>
      ) : (
        <button
          disabled={isSpinning}
          onClick={() => spinThen(onContinue)}
          className="rounded-lg border border-slate-500 bg-slate-200/10 px-5 py-3 transition hover:bg-slate-200/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {beat.beatType === 'chance' ? 'Reveal Fate' : 'Continue'}
        </button>
      )}
    </section>
  );
};
