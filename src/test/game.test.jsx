import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import OnePlayerGame from "../components/OnePlayerGame";
import TwoPlayerGame from "../components/TwoPlayerGame";
import { getBestComputerMove } from "../components/shared/gameLogic";

function getCell(row, column) {
  return screen.getByRole("button", {
    name: `Row ${row}, column ${column}`,
  });
}

function getMoveCount() {
  const table = screen.queryByRole("table");
  return table ? table.querySelectorAll("tbody tr").length : 0;
}

function getScore(label) {
  const scoreLabel = screen.getByText(label);
  return scoreLabel.nextElementSibling.textContent;
}

describe("two-player game", () => {
  it("accepts a valid move and switches turns", async () => {
    const user = userEvent.setup();
    render(<TwoPlayerGame />);

    await user.click(getCell(1, 1));

    expect(getCell(1, 1)).toHaveTextContent("X");
    expect(screen.getByText(/Player O turn/)).toBeInTheDocument();
    expect(getMoveCount()).toBe(1);
  });

  it("ignores a move on an occupied cell", async () => {
    const user = userEvent.setup();
    render(<TwoPlayerGame />);

    await user.click(getCell(1, 1));
    await user.click(getCell(1, 1));

    expect(getCell(1, 1)).toHaveTextContent("X");
    expect(screen.getByText(/Player O turn/)).toBeInTheDocument();
    expect(getMoveCount()).toBe(1);
  });

  it("detects a row win", async () => {
    const user = userEvent.setup();
    render(<TwoPlayerGame />);

    for (const [row, column] of [
      [1, 1], [2, 1], [1, 2], [2, 2], [1, 3],
    ]) {
      await user.click(getCell(row, column));
    }

    expect(screen.getByText("Player X is the winner!")).toBeInTheDocument();
  });

  it("detects a column win", async () => {
    const user = userEvent.setup();
    render(<TwoPlayerGame />);

    for (const [row, column] of [
      [1, 1], [1, 2], [2, 1], [2, 2], [3, 1],
    ]) {
      await user.click(getCell(row, column));
    }

    expect(screen.getByText("Player X is the winner!")).toBeInTheDocument();
  });

  it("detects a diagonal win", async () => {
    const user = userEvent.setup();
    render(<TwoPlayerGame />);

    for (const [row, column] of [
      [1, 1], [1, 2], [2, 2], [1, 3], [3, 3],
    ]) {
      await user.click(getCell(row, column));
    }

    expect(screen.getByText("Player X is the winner!")).toBeInTheDocument();
  });

  it("detects a draw and updates the draw score", async () => {
    const user = userEvent.setup();
    render(<TwoPlayerGame />);

    for (const [row, column] of [
      [1, 1], [1, 2], [1, 3], [2, 2], [2, 1],
      [2, 3], [3, 2], [3, 1], [3, 3],
    ]) {
      await user.click(getCell(row, column));
    }

    expect(screen.getByText("Draw!")).toBeInTheDocument();
    expect(getScore("Draws")).toBe("1");
  });

  it("resets the board and turn without clearing the scoreboard", async () => {
    const user = userEvent.setup();
    render(<TwoPlayerGame />);

    await user.click(getCell(1, 1));
    await user.click(getCell(2, 1));
    await user.click(getCell(1, 2));
    await user.click(getCell(2, 2));
    await user.click(getCell(1, 3));
    expect(getScore("Player X")).toBe("1");

    await user.click(screen.getByRole("button", { name: "Play Again" }));

    expect(screen.getByText(/Player X turn/)).toBeInTheDocument();
    expect(screen.getByText("No moves yet.")).toBeInTheDocument();
    expect(getScore("Player X")).toBe("1");
    expect(getCell(1, 1)).toBeEnabled();
  });

  it("undoes only the latest move and gives that player another turn", async () => {
    const user = userEvent.setup();
    render(<TwoPlayerGame />);

    await user.click(getCell(1, 1));
    await user.click(getCell(2, 2));
    await user.click(screen.getByRole("button", { name: "Undo Last Move" }));

    expect(getCell(1, 1)).toHaveTextContent("X");
    expect(getCell(2, 2)).toBeEmptyDOMElement();
    expect(screen.getByText(/Player O turn/)).toBeInTheDocument();
    expect(getMoveCount()).toBe(1);
    expect(screen.getByRole("button", { name: "Undo Last Move" })).toBeDisabled();
  });

  it("blocks moves after the game is complete", async () => {
    const user = userEvent.setup();
    render(<TwoPlayerGame />);

    for (const [row, column] of [
      [1, 1], [2, 1], [1, 2], [2, 2], [1, 3],
    ]) {
      await user.click(getCell(row, column));
    }

    expect(getCell(3, 3)).toBeDisabled();
    expect(getMoveCount()).toBe(5);
  });
});

describe("computer game", () => {
  it("selects a winning move when one is available", () => {
    const board = ["O", "O", null, "X", "X", null, null, null, null];

    expect(getBestComputerMove(board)).toBe(2);
  });

  it("makes a computer move after the human move", async () => {
    const user = userEvent.setup();
    render(<OnePlayerGame />);

    await user.click(getCell(1, 1));

    expect(screen.getByText("Computer is thinking...")).toBeInTheDocument();
    await waitFor(() => expect(getMoveCount()).toBe(2));
    expect(screen.getByText("Your turn (X)")).toBeInTheDocument();
  });

  it("undoes the computer move and the preceding human move together", async () => {
    const user = userEvent.setup();
    render(<OnePlayerGame />);

    await user.click(getCell(1, 1));
    await waitFor(() => expect(getMoveCount()).toBe(2));
    await user.click(screen.getByRole("button", { name: "Undo Last Move" }));

    expect(getCell(1, 1)).toBeEmptyDOMElement();
    expect(getMoveCount()).toBe(0);
    expect(screen.getByText("No moves yet.")).toBeInTheDocument();
    expect(screen.getByText("Your turn (X)")).toBeInTheDocument();
  });

  it("does not allow moves while the computer is responding", async () => {
    const user = userEvent.setup();
    render(<OnePlayerGame />);

    await user.click(getCell(1, 1));
    expect(getCell(1, 2)).toBeDisabled();
    expect(getMoveCount()).toBe(1);
  });
});
