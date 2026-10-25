import GameActions from "./GameActions";
import GameBoard from "./GameBoard";
import Leaderboard from "./Leaderboard";
import MoveHistory from "./MoveHistory";

export default function GameScreen({
  modeLabel,
  onBack,
  status,
  currentPlayer,
  board,
  winningLine,
  gameOver,
  moves,
  scores,
  onCellClick,
  onUndo,
  undoDisabled,
  onReset,
  onResetScores,
  boardDisabled = false,
}) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 sm:p-6 lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl"
      />
      <main className="relative mx-auto w-full max-w-6xl">
        <header className="relative flex min-h-16 items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-sm sm:px-4">
          <div className="z-10 flex min-w-0 items-center">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to player selection"
              className="shrink-0 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/15"
            >
              <span aria-hidden="true">←</span>
              <span className="ml-2 hidden sm:inline">Change mode</span>
            </button>
          </div>
          <h1 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-xl font-bold tracking-tight text-white sm:text-3xl">
            Tic Tac Toe
          </h1>
          <span className="z-10 max-w-[38%] truncate rounded-full border border-white/10 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-slate-200 sm:px-3 sm:text-xs">
            {modeLabel}
          </span>
        </header>
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-stretch lg:gap-6">
          <section className="order-1 rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl shadow-indigo-900/5 backdrop-blur-sm sm:p-6 lg:order-1">
            <p
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-center text-lg font-semibold ${
                gameOver ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
              }`}
            >
              {!gameOver && (
                <span
                  className={`rounded-md px-2 py-0.5 text-sm font-bold text-white ${
                    currentPlayer === "X" ? "bg-blue-600" : "bg-rose-500"
                  }`}
                >
                  {currentPlayer}
                </span>
              )}
              {status}
            </p>
            <GameBoard
              board={board}
              winningLine={winningLine}
              latestMove={moves.length ? moves[moves.length - 1].square : null}
              gameOver={gameOver}
              disabled={boardDisabled}
              onCellClick={onCellClick}
            />
            <GameActions
              onUndo={onUndo}
              undoDisabled={undoDisabled}
              onReset={onReset}
              resetLabel={gameOver ? "Play Again" : "Reset Game"}
            />
          </section>
          <div className="order-2 flex flex-col gap-4 lg:order-2 lg:h-full lg:gap-6">
            <aside className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl shadow-indigo-900/5 backdrop-blur-sm sm:p-6 lg:flex-1">
              <MoveHistory moves={moves} />
            </aside>
            <aside className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl shadow-indigo-900/5 backdrop-blur-sm sm:p-6">
              <Leaderboard scores={scores} onReset={onResetScores} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
