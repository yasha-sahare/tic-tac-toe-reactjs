export default function GameBoard({
  board,
  winningLine,
  latestMove,
  gameOver,
  onCellClick,
  disabled,
}) {
  return (
    <div className="mx-auto mt-5 grid w-fit grid-cols-3 gap-2">
      {board.map((cell, index) => {
        const isWinCell = winningLine?.includes(index);
        const isLatestMove = latestMove === index;

        return (
          <button
            key={index}
            aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}`}
            onClick={() => onCellClick(index)}
            disabled={Boolean(cell) || gameOver || disabled}
            className={`h-20 w-20 rounded-lg border-2 text-5xl font-bold transition duration-300 sm:h-24 sm:w-24 ${
              cell === "X" ? "text-blue-600" : "text-rose-500"
            } ${
              isWinCell
                ? "scale-105 animate-pulse border-green-500 bg-green-200"
                : gameOver
                ? "cursor-default border-slate-300 bg-slate-50 opacity-60"
                : disabled
                ? "cursor-wait border-slate-300 bg-slate-50 opacity-70"
                : isLatestMove
                ? "border-indigo-500 bg-indigo-100 shadow-md ring-2 ring-indigo-300"
                : "cursor-pointer border-slate-300 bg-slate-50 shadow-sm hover:border-indigo-400 hover:bg-indigo-50"
            }`}
          >
            {cell && <span className="animate-pop inline-block">{cell}</span>}
          </button>
        );
      })}
    </div>
  );
}
