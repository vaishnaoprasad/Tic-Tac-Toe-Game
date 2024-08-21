import './GameOver.css';

export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} has won</p>}
      {!winner && <p>It's a Draw !</p>}
      <button onClick={onRestart}> Play Again ?</button>
    </div>
  );
}
