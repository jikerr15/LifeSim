import { LifeSummary } from '@/lib/summaryGenerator';

interface SummaryCardProps {
  summary: LifeSummary;
  score: number;
  causeOfDeath: string;
  onReplay: () => void;
  bestScore?: number;
}

export const SummaryCard = ({ summary, score, causeOfDeath, onReplay, bestScore }: SummaryCardProps) => {
  return (
    <section className="rounded-2xl border border-slate-600 bg-card/80 p-6 shadow-xl">
      <h2 className="mb-2 text-3xl font-semibold">{summary.headline}</h2>
      <p className="mb-4 text-slate-300">{summary.paragraph}</p>
      <div className="mb-4 rounded-xl bg-slate-900/50 p-4">
        <p className="text-sm text-slate-400">Cause of death</p>
        <p className="text-lg">{causeOfDeath}</p>
        <p className="mt-3 text-sm text-slate-400">Life score</p>
        <p className="text-2xl font-semibold">{score}</p>
        {bestScore !== undefined && <p className="mt-1 text-sm text-slate-400">Best score: {bestScore}</p>}
      </div>
      <ul className="mb-6 list-disc space-y-2 pl-5 text-slate-200">
        {summary.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <button
        onClick={onReplay}
        className="rounded-lg border border-slate-500 bg-slate-200/10 px-5 py-3 transition hover:bg-slate-200/20"
      >
        Live Another Life
      </button>
    </section>
  );
};
