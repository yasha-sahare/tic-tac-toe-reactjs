export default function GameActions({
  onUndo,
  undoDisabled,
  onReset,
  resetLabel = "Reset Game",
}) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <button
        onClick={onUndo}
        disabled={undoDisabled}
        className="rounded-lg border-2 border-slate-300 px-3 py-2 font-medium text-slate-700 transition enabled:cursor-pointer enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Undo Last Move
      </button>
      <button
        onClick={onReset}
        className="cursor-pointer rounded-lg bg-slate-800 px-3 py-2 font-medium text-white transition hover:bg-slate-700"
      >
        {resetLabel}
      </button>
    </div>
  );
}
