# Tic Tac Toe

A responsive Tic Tac Toe game built with React. Choose to play against the
computer or play locally with another person.

<img width="959" height="536" alt="image" src="https://github.com/user-attachments/assets/447230ed-2f80-4476-bd94-da6a5572eece" />

## Tech stack

- JavaScript (ES modules)
- React 19
- Vite 8
- Tailwind CSS 4
- ESLint
- Vitest, jsdom, and React Testing Library

## Features

- Welcome screen with 1-player and 2-player mode selection.
- Single-player mode with a computer opponent using minimax.
- Local two-player mode with alternating X and O turns.
- Win, draw, and turn status indicators.
- Winning-line and most-recent-move highlights.
- Move history table, with the latest move shown first.
- Undo controls, with mode-specific behavior:
  - Two-player mode removes the latest move and gives that player another turn.
  - Computer mode removes the computer move and the preceding human move together.
- Scoreboard for X wins, O wins, and draws.
- Game reset, scoreboard reset, and a back button to change modes.
- Responsive layout for desktop and mobile screens.

## Run the frontend locally

### Requirements

- Node.js and npm

### Setup

From the project directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser (usually
`http://localhost:5173`).

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Run the backend locally

There is no backend in this project. Game state and scores are held in the
browser with React state, so there is no backend process or setup command.

## API endpoint summary

There is no HTTP API and the application does not make API requests.

Game rules are implemented by local JavaScript helpers in
`src/components/shared/gameLogic.js`:

- `getWinningLine(board)` returns the winning three-cell line, or `null`.
- `getBestComputerMove(board)` returns the computer's next board position.
- `recordGameResult(setScores, board)` updates the local scoreboard when a
  game ends.

## Tests and validation

The automated tests are in `src/test/game.test.jsx`; shared test setup is in
`src/test/setup.js`.

Run the automated game and component tests with:

```bash
npm test
```

Run the tests in watch mode while developing:

```bash
npm run test:watch
```

Lint and verify a production build with:

```bash
npm run lint
npm run build
```

The test suite covers valid and invalid moves, turn switching, row/column/diagonal
wins, draws, resets, undo behavior in both modes, scoreboard updates,
computer move selection, and moves after game completion. The production build
can also be opened with `npm run preview`.

## AI tools and prompt summary

An AI coding assistant in VS Code was used to help implement and refine the
game. Prompt topics included:

- Adding game modes, a welcome screen, move history, and undo behavior.
- Separating shared UI from the two game-mode components.
- Improving responsive layout, readability, and visual styling.
- Documenting the actual setup, behavior, and project limitations.

The test cases in `src/test/game.test.jsx` were generated with AI assistance.
They should be reviewed and verified against the intended game rules.

## Design decisions

- Each game mode owns its turn, board, move history, and score state.
- Shared presentation components live in `src/components/shared/` and receive
  game data and actions through props.
- The single-player computer uses minimax to choose a move.
- Scores are kept in React state and are not saved between page reloads or
  leaving a game mode.
- The frontend is self-contained; no server, database, or network API is
  required.

## Clarifications and assumptions

- “1 Player” means a human playing as X against the computer as O.
- “2 Players” means two people taking turns on the same device.
- Row and column positions in move history are numbered from 1 to 3.
- Returning to mode selection leaves the current game screen; game state is
  local to the selected mode.

## Known limitations

- Scores and move history are not persisted after leaving a game or refreshing
  the page.
- There is no backend, online multiplayer, user account, or API.
- The computer opponent is only available in 1-player mode.

## Future improvements

- Persist scores and preferences between visits.
- Add difficulty levels and a human-selectable starting player.
- Add online multiplayer and a backend API if remote play is desired.
- Improve accessibility with keyboard navigation and additional screen-reader
  announcements.
