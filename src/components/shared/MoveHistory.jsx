export default function MoveHistory({ moves }) {
  return (
    <section aria-labelledby="move-history-heading">
      <h2
        id="move-history-heading"
        className="text-lg font-semibold text-slate-800"
      >
        Move History
      </h2>
      <div className="mt-2 h-40 overflow-y-auto rounded-lg border border-slate-300">
        {moves.length === 0 ? (
          <p className="flex h-full items-center justify-center text-sm text-slate-500">
            No moves yet.
          </p>
        ) : (
          <table className="w-full border-collapse text-left text-sm text-slate-600">
            <thead className="bg-slate-100 text-xs uppercase text-slate-700">
              <tr>
                <th scope="col" className="border-b border-r border-slate-300 px-3 py-2 font-semibold">
                  Move
                </th>
                <th scope="col" className="border-b border-r border-slate-300 px-3 py-2 font-semibold">
                  Player
                </th>
                <th scope="col" className="border-b border-slate-300 px-3 py-2 font-semibold">
                  Position
                </th>
              </tr>
            </thead>
            <tbody>
              {[...moves].reverse().map((move, index) => {
                const isLatestMove = index === 0;

                return (
                  <tr
                    key={`${move.square}-${moves.length - index - 1}`}
                    className={`border-b border-slate-200 last:border-b-0 ${
                      isLatestMove ? "bg-indigo-50 font-medium" : ""
                    }`}
                  >
                  <td className="border-r border-slate-200 px-3 py-2">{moves.length - index}</td>
                  <td className="border-r border-slate-200 px-3 py-2 font-semibold">{move.player}</td>
                  <td className="px-3 py-2">
                    Row {Math.floor(move.square / 3) + 1}, Column{" "}
                    {(move.square % 3) + 1}
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
