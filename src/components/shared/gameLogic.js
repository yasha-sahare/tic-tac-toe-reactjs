const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getWinningLine(board) {
  for (const line of WIN_LINES) {
    const [first, second, third] = line;
    const mark = board[first];

    if (mark && mark === board[second] && mark === board[third]) {
      return line;
    }
  }

  return null;
}

export function getBestComputerMove(board) {
  function getBoardScore(currentBoard, computerTurn) {
    const winningLine = getWinningLine(currentBoard);

    if (winningLine) {
      return currentBoard[winningLine[0]] === "O" ? 10 : -10;
    }

    if (currentBoard.every((cell) => cell !== null)) {
      return 0;
    }

    const possibleScores = [];

    for (let square = 0; square < currentBoard.length; square += 1) {
      if (currentBoard[square] !== null) continue;

      const nextBoard = [...currentBoard];
      nextBoard[square] = computerTurn ? "O" : "X";
      possibleScores.push(getBoardScore(nextBoard, !computerTurn));
    }

    return computerTurn
      ? Math.max(...possibleScores)
      : Math.min(...possibleScores);
  }

  let bestSquare = -1;
  let highestScore = -Infinity;

  for (let square = 0; square < board.length; square += 1) {
    if (board[square] !== null) continue;

    const nextBoard = [...board];
    nextBoard[square] = "O";
    const score = getBoardScore(nextBoard, false);

    if (score > highestScore) {
      highestScore = score;
      bestSquare = square;
    }
  }

  return bestSquare;
}

export function recordGameResult(setScores, board) {
  const winningLine = getWinningLine(board);
  const winner = winningLine ? board[winningLine[0]] : null;

  if (winner) {
    setScores((scores) => ({
      ...scores,
      [winner]: scores[winner] + 1,
    }));
    return;
  }

  const isDraw = board.every((cell) => cell !== null);
  if (!isDraw) return;

  setScores((currentScores) => {
    return { ...currentScores, draw: currentScores.draw + 1 };
  });
}
