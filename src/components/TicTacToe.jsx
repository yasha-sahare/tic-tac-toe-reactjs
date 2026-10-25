import { useState } from "react";
import OnePlayerGame from "./OnePlayerGame";
import TwoPlayerGame from "./TwoPlayerGame";
import WelcomeScreen from "./WelcomeScreen";

export default function TicTacToe() {
  const [playerCount, setPlayerCount] = useState(null);
  const goBackToModeSelection = () => setPlayerCount(null);

  if (playerCount === 1) {
    return <OnePlayerGame onBack={goBackToModeSelection} />;
  }
  if (playerCount === 2) {
    return <TwoPlayerGame onBack={goBackToModeSelection} />;
  }

  return <WelcomeScreen onSelectPlayers={setPlayerCount} />;
}
