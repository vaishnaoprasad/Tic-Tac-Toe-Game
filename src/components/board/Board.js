import "./Board.css";
export default function Board({ onSelectSquare, board }) {
  return (
    <div id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  className={
                    playerSymbol !== null ? "board-btn disabled" : "board-btn"
                  }
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </div>
  );
}
