'use client';

import { EventCard } from '@/components/EventCard';
import { StatBar } from '@/components/StatBar';
import { SummaryCard } from '@/components/SummaryCard';
import { createInitialGameState, resolveEvent } from '@/lib/gameEngine';
import { calculateLifeScore } from '@/lib/scoring';
import { generateSummary } from '@/lib/summaryGenerator';
import { useEffect, useMemo, useState } from 'react';

const BEST_SCORE_KEY = 'life-sim-best-score';

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

  const onContinue = () => setGameState((prev) => resolveEvent(prev));
  const onChoice = (choiceId: string) => setGameState((prev) => resolveEvent(prev, choiceId));
  const onReplay = () => setGameState(createInitialGameState());

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-8 md:px-6">
      <header className="rounded-2xl border border-slate-600 bg-card/80 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold">Life in Progress</h1>
          <div className="text-sm text-slate-300">
            Age <span className="font-semibold text-ink">{gameState.age}</span> · Stage{' '}
            <span className="font-semibold text-ink">{gameState.currentStage.replace('_', ' ')}</span>
          </div>
        </div>
        <p className="mb-3 text-sm text-slate-300">Background: {gameState.backgroundName}</p>
        <div className="grid gap-3 md:grid-cols-5">
          <StatBar label="Health" value={gameState.health} />
          <StatBar label="Wealth" value={gameState.wealth} />
          <StatBar label="Support" value={gameState.support} />
          <StatBar label="Stress" value={gameState.stress} />
          <StatBar label="Meaning" value={gameState.meaning} />
        </div>
      </header>

      {gameState.status === 'summary' || !gameState.currentEvent ? (
        <SummaryCard
          summary={summary}
          score={score}
          causeOfDeath={gameState.causeOfDeath ?? 'old age'}
          onReplay={onReplay}
          bestScore={bestScore}
        />
      ) : (
        <EventCard event={gameState.currentEvent} onContinue={onContinue} onChoice={onChoice} />
      )}
    </main>
  );
}
