import { useState } from "react";
import "./Player.css";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  function onInputBlur() {
    setIsEditing((editing) => !editing);
  }

  let editedPlayerName = (
    <input
      type="text"
      disabled={true}
      value={playerName}
      className="player-name"
    />
  );

  if (isEditing) {
    editedPlayerName = (
      <input
        className="edit-name-input"
        type="text"
        required
        value={playerName}
        onBlur={onInputBlur}
        onChange={handleChange}
      />
    );
  }

  return (
    <div className="player">
      <span className={isActive ? "active player-symbol" : "player-symbol"}>
        {symbol}
      </span>
      <button className="edit-btn" onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit Name"}
      </button>
      {editedPlayerName}
    </div>
  );
}
