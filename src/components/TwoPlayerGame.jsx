import { useState } from "react";
import GameScreen from "./shared/GameScreen";
import { getWinningLine, recordGameResult } from "./shared/gameLogic";

const EMPTY_BOARD = () => Array(9).fill(null);
const EMPTY_SCORES = () => ({ X: 0, O: 0, draw: 0 });

export default function TwoPlayerGame({ onBack }) {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [scores, setScores] = useState(EMPTY_SCORES);
  const [xTurn, setXTurn] = useState(true);
  const [moves, setMoves] = useState([]);
  const [undoUsed, setUndoUsed] = useState(false);

  const winningLine = getWinningLine(board);
  const winner = winningLine ? board[winningLine[0]] : null;
  const isDraw = !winner && board.every((cell) => cell !== null);
  const gameOver = Boolean(winner || isDraw);
  const player = xTurn ? "X" : "O";
  const status = winner
    ? `Player ${winner} is the winner!`
    : isDraw
    ? "Draw!"
    : `Player ${player} turn`;

  const playMove = (square) => {
    if (board[square] || gameOver) return;

    const next = [...board];
    next[square] = player;
    setBoard(next);
    setMoves((history) => [...history, { player, square }]);
    setXTurn(!xTurn);
    setUndoUsed(false);
    recordGameResult(setScores, next);
  };

  const resetGame = () => {
    setBoard(EMPTY_BOARD());
    setXTurn(true);
    setMoves([]);
    setUndoUsed(false);
  };

  const undoMove = () => {
    if (gameOver || moves.length === 0 || undoUsed) return;

    const lastMove = moves[moves.length - 1];
    const next = [...board];
    next[lastMove.square] = null;
    setBoard(next);
    setMoves((history) => history.slice(0, -1));
    setXTurn(lastMove.player === "X");
    setUndoUsed(true);
  };

  const resetScores = () => setScores(EMPTY_SCORES());

  return (
    <GameScreen
      modeLabel="2 Players"
      onBack={onBack}
      status={status}
      currentPlayer={player}
      board={board}
      winningLine={winningLine}
      gameOver={gameOver}
      moves={moves}
      scores={scores}
      onCellClick={playMove}
      onUndo={undoMove}
      undoDisabled={gameOver || moves.length === 0 || undoUsed}
      onReset={resetGame}
      onResetScores={resetScores}
    />
  );
}