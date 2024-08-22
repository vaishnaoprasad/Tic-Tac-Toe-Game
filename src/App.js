import { IonContent, IonHeader } from "@ionic/react";
import { useState } from "react";
import "./App.css";
import Board from "../src/components/board/Board";
import Player from "../src/components/player/Player";
import Log from "./components/log/Log";
import { WINNING_COMBINATIONS } from "./components/winning-cominations";
import GameOver from "./components/gameover/GameOver";

import { setupIonicReact } from "@ionic/react";

setupIonicReact();

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const comination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[comination[0].row][comination[0].col];
    const secondSquareSymbol = gameBoard[comination[1].row][comination[1].col];
    const thirdSquareSymbol = gameBoard[comination[2].row][comination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <IonContent>
      <IonHeader id="header">
        <img id="logo" src="tictactoe-logo.jpeg" alt="logo-not-found" />
        <label>
          <small>Let's Play !</small>
          <h1>TIC TAC TOE</h1>
        </label>
      </IonHeader>

      <div id="main">


      <div id="players" className="highlight-player">
        <Player
          initialName={PLAYERS.X}
          symbol="X"
          isActive={activePlayer === "X"}
          onChangeName={handlePlayerNameChange}
          />
        <Player
          initialName={PLAYERS.O}
          symbol="O"
          isActive={activePlayer === "O"}
          onChangeName={handlePlayerNameChange}
          />
      </div>
      <Board onSelectSquare={handleSelectSquare} board={gameBoard} />
      <Log turns={gameTurns} />
      {(winner || hasDraw) && (
        <GameOver winner={winner} onRestart={handleRematch} />
      )}
      </div>
    </IonContent>
  );
}

export default App;
