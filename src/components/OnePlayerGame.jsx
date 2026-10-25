import { useEffect, useState } from "react";
import GameScreen from "./shared/GameScreen";
import {
  getBestComputerMove,
  getWinningLine,
  recordGameResult,
} from "./shared/gameLogic";

const EMPTY_BOARD = () => Array(9).fill(null);
const EMPTY_SCORES = () => ({ X: 0, O: 0, draw: 0 });

export default function OnePlayerGame({ onBack }) {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [scores, setScores] = useState(EMPTY_SCORES);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [moveHistory, setMoveHistory] = useState([]);
  const [undoUsed, setUndoUsed] = useState(false);

  const winningLine = getWinningLine(board);
  const winner = winningLine ? board[winningLine[0]] : null;
  const isDraw = !winner && board.every((cell) => cell !== null);
  const gameOver = Boolean(winner || isDraw);
  let status = "Your turn (X)";

  if (winner === "X") {
    status = "You win!";
  } else if (winner === "O") {
    status = "Computer wins!";
  } else if (isDraw) {
    status = "Draw!";
  } else if (!isPlayerTurn) {
    status = "Computer is thinking...";
  }

  function playMove(square) {
    if (board[square] || gameOver || !isPlayerTurn) return;

    const next = [...board];
    next[square] = "X";
    setBoard(next);
    setMoveHistory((history) => [...history, { player: "X", square }]);
    setIsPlayerTurn(false);
    setUndoUsed(false);
    recordGameResult(setScores, next);
  }

  useEffect(() => {
    if (isPlayerTurn || gameOver) return undefined;

    const square = getBestComputerMove(board);
    if (square < 0) return undefined;

    const timeoutId = setTimeout(() => {
      const next = [...board];
      next[square] = "O";
      setBoard(next);
      setMoveHistory((history) => [...history, { player: "O", square }]);
      setIsPlayerTurn(true);
      recordGameResult(setScores, next);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [board, gameOver, isPlayerTurn]);

  function resetGame() {
    setBoard(EMPTY_BOARD());
    setIsPlayerTurn(true);
    setMoveHistory([]);
    setUndoUsed(false);
  }

  function undoMove() {
    if (gameOver || !isPlayerTurn || moveHistory.length === 0 || undoUsed) {
      return;
    }

    const lastMove = moveHistory[moveHistory.length - 1];
    const movesToUndo = lastMove.player === "O" ? 2 : 1;
    const removedMoves = moveHistory.slice(-movesToUndo);
    const next = [...board];
    for (const move of removedMoves) next[move.square] = null;

    setBoard(next);
    setMoveHistory(moveHistory.slice(0, -movesToUndo));
    setIsPlayerTurn(true);
    setUndoUsed(true);
  }

  function resetScores() {
    setScores(EMPTY_SCORES());
  }

  return (
    <GameScreen
      modeLabel="1 Player · vs Computer"
      onBack={onBack}
      status={status}
      currentPlayer={isPlayerTurn ? "X" : "O"}
      board={board}
      winningLine={winningLine}
      gameOver={gameOver}
      moves={moveHistory}
      scores={scores}
      onCellClick={playMove}
      onUndo={undoMove}
      undoDisabled={
        gameOver || !isPlayerTurn || moveHistory.length === 0 || undoUsed
      }
      onReset={resetGame}
      onResetScores={resetScores}
      boardDisabled={!isPlayerTurn}
    />
  );
}
