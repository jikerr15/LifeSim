interface StatBarProps {
  label: string;
  value: number;
}

export const StatBar = ({ label, value }: StatBarProps) => {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-wide text-slate-300">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 rounded bg-slate-700">
        <div className="h-2 rounded bg-indigo-300 transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};
