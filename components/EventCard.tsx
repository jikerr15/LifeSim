'use client';

import { LifeEvent } from '@/types/game';
import { useState } from 'react';

interface EventCardProps {
  event: LifeEvent;
  onContinue: () => void;
  onChoice: (choiceId: string) => void;
}

const toPercent = (value?: number) => `${Math.round((value ?? 0) * 100)}%`;

export const EventCard = ({ event, onContinue, onChoice }: EventCardProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const spinThen = (action: () => void) => {
    setIsSpinning(true);
    window.setTimeout(() => {
      action();
      setIsSpinning(false);
    }, 1100);
  };

  return (
    <section className="rounded-2xl border border-slate-600 bg-card/80 p-6 shadow-xl">
      <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">{event.type} event</p>
      <h2 className="mb-3 text-2xl font-semibold">{event.title ?? 'A Life Moment'}</h2>
      <p className="mb-4 leading-relaxed text-slate-100">{event.text}</p>

      {(event.type === 'chance' || event.deathChance) && (
        <div className="mb-6 rounded-lg border border-amber-300/40 bg-amber-100/10 p-3 text-sm text-amber-100">
          <p>Fate wheel activated. Direct event death risk: {toPercent(event.deathChance)}.</p>
          <div className="mt-2 flex items-center gap-3">
            <div className={`h-8 w-8 rounded-full border-4 border-amber-300 border-t-transparent ${isSpinning ? 'animate-spin' : ''}`} />
            <span className="text-xs text-amber-200">{isSpinning ? 'Spinning...' : 'Waiting to spin'}</span>
          </div>
        </div>
      )}

      {event.choices?.length ? (
        <div className="grid gap-3">
          {event.choices.map((choice) => (
            <button
              key={choice.id}
              disabled={isSpinning}
              onClick={() => spinThen(() => onChoice(choice.id))}
              className="rounded-lg border border-slate-500 bg-slate-200/10 px-4 py-3 text-left transition hover:bg-slate-200/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <p>{choice.label}</p>
              {choice.deathChance ? (
                <p className="mt-1 text-xs text-amber-200">Death risk on this choice: {toPercent(choice.deathChance)}</p>
              ) : null}
            </button>
          ))}
        </div>
      ) : (
        <button
          disabled={isSpinning}
          onClick={() => spinThen(onContinue)}
          className="rounded-lg border border-slate-500 bg-slate-200/10 px-5 py-3 transition hover:bg-slate-200/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {event.type === 'chance' ? 'Spin Fate' : 'Continue'}
        </button>
      )}
    </section>
  );
};
