'use client';

import { EventCard } from '@/components/EventCard';
import { StatBar } from '@/components/StatBar';
import { SummaryCard } from '@/components/SummaryCard';
import { createInitialGameState, resolveBeat } from '@/lib/gameEngine';
import { calculateLifeScore } from '@/lib/scoring';
import { generateSummary } from '@/lib/summaryGenerator';
import { useEffect, useMemo, useState } from 'react';

const BEST_SCORE_KEY = 'life-sim-best-score';

const toPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

export default function GamePage() {
  const [gameState, setGameState] = useState(createInitialGameState);
  const [bestScore, setBestScore] = useState<number | undefined>(undefined);

  useEffect(() => {
    const raw = localStorage.getItem(BEST_SCORE_KEY);
    if (raw) setBestScore(Number(raw));
  }, []);

  const score = useMemo(() => calculateLifeScore(gameState), [gameState]);
  const summary = useMemo(() => generateSummary(gameState), [gameState]);

  useEffect(() => {
    if (gameState.status !== 'summary') return;
    if (bestScore === undefined || score > bestScore) {
      localStorage.setItem(BEST_SCORE_KEY, String(score));
      setBestScore(score);
    }
  }, [gameState.status, score, bestScore]);

  const onContinue = () => setGameState((prev) => resolveBeat(prev));
  const onChoice = (choiceId: string) => setGameState((prev) => resolveBeat(prev, choiceId));
  const onReplay = () => setGameState(createInitialGameState());

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-8 md:px-6">
      <header className="rounded-2xl border border-slate-600 bg-card/80 p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold">Life in Motion</h1>
          <div className="text-sm text-slate-300">
            Age <span className="font-semibold text-ink">{gameState.age}</span> · Beat{' '}
            <span className="font-semibold text-ink">{gameState.beatIndex}/{gameState.maxBeats}</span>
          </div>
        </div>
        <p className="text-sm text-slate-300">Stage: {gameState.currentStage.replace('_', ' ')} · {gameState.lifePhase}</p>
        <p className="mb-3 text-sm text-slate-300">Background: {gameState.backgroundName}</p>
        <div className="grid gap-3 md:grid-cols-5">
          <StatBar label="Health" value={gameState.health} />
          <StatBar label="Wealth" value={gameState.wealth} />
          <StatBar label="Support" value={gameState.support} />
          <StatBar label="Stress" value={gameState.stress} />
          <StatBar label="Meaning" value={gameState.meaning} />
        </div>
      </header>

      {gameState.lastRoll ? (
        <section className="rounded-xl border border-slate-700 bg-slate-900/40 p-4 text-sm text-slate-200">
          <p className="font-medium text-slate-100">Fate check: {gameState.lastRoll.label}</p>
          <p className="mt-1">
            Roll {toPercent(gameState.lastRoll.roll)} vs death threshold {toPercent(gameState.lastRoll.threshold)} →{' '}
            <span className={gameState.lastRoll.survived ? 'text-emerald-300' : 'text-red-300'}>
              {gameState.lastRoll.survived ? 'survived' : 'died'}
            </span>
          </p>
        </section>
      ) : null}

      {gameState.status === 'summary' || !gameState.currentBeat ? (
        <SummaryCard
          summary={summary}
          score={score}
          causeOfDeath={gameState.causeOfDeath ?? 'old age'}
          onReplay={onReplay}
          bestScore={bestScore}
        />
      ) : (
        <EventCard beat={gameState.currentBeat} onContinue={onContinue} onChoice={onChoice} />
      )}
    </main>
  );
}
