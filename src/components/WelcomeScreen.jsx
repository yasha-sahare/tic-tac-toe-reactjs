export default function WelcomeScreen({ onSelectPlayers }) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl"
      />
      <section className="relative w-full max-w-md rounded-2xl border border-white/70 bg-white/90 p-8 text-center shadow-2xl shadow-indigo-900/10 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-slate-800">Welcome to Tic Tac Toe</h1>
        <p className="mt-3 text-slate-600">How many players?</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => onSelectPlayers(1)}
            className="rounded-lg bg-slate-800 px-4 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            1 Player
            <span className="mt-1 block text-sm font-normal text-slate-300">
              Play vs Computer
            </span>
          </button>
          <button
            onClick={() => onSelectPlayers(2)}
            className="rounded-lg border-2 border-slate-300 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            2 Players
            <span className="mt-1 block text-sm font-normal text-slate-500">
              Play together
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
