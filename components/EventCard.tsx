import { LifeEvent } from '@/types/game';

interface EventCardProps {
  event: LifeEvent;
  onContinue: () => void;
  onChoice: (choiceId: string) => void;
}

export const EventCard = ({ event, onContinue, onChoice }: EventCardProps) => {
  return (
    <section className="rounded-2xl border border-slate-600 bg-card/80 p-6 shadow-xl">
      <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">{event.type} event</p>
      <h2 className="mb-3 text-2xl font-semibold">{event.title ?? 'A Life Moment'}</h2>
      <p className="mb-6 leading-relaxed text-slate-100">{event.text}</p>
      {event.choices?.length ? (
        <div className="grid gap-3">
          {event.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onChoice(choice.id)}
              className="rounded-lg border border-slate-500 bg-slate-200/10 px-4 py-3 text-left transition hover:bg-slate-200/20"
            >
              {choice.label}
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={onContinue}
          className="rounded-lg border border-slate-500 bg-slate-200/10 px-5 py-3 transition hover:bg-slate-200/20"
        >
          Continue
        </button>
      )}
    </section>
  );
};
