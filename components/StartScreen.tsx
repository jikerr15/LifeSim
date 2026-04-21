import Link from 'next/link';

export const StartScreen = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl">Life Simulation</h1>
      <p className="mb-10 text-lg text-slate-300">You are given a life. See what becomes of it.</p>
      <Link
        href="/game"
        className="rounded-xl border border-slate-500 bg-slate-100/10 px-8 py-3 text-lg font-medium transition hover:bg-slate-100/20"
      >
        Start
      </Link>
    </main>
  );
};
