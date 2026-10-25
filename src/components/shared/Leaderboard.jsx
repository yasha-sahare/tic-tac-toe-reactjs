export default function Leaderboard({ scores, onReset }) {
  const items = [
    { label: "Player X", sub: "Wins", value: scores.X, color: "text-blue-600" },
    { label: "Draws", sub: "Ties", value: scores.draw, color: "text-slate-600" },
    { label: "Player O", sub: "Wins", value: scores.O, color: "text-rose-500" },
  ];

  return (
    <div>
      <h2 className="mb-3 text-xl font-bold text-slate-800">Leaderboard</h2>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg bg-slate-50 py-3 text-center"
          >
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-slate-400">{item.sub}</p>
          </div>
        ))}
      </div>
      <button
        onClick={onReset}
        className="mt-4 w-full cursor-pointer rounded-lg border-2 border-slate-300 px-3 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
      >
        Reset Leaderboard
      </button>
    </div>
  );
}
