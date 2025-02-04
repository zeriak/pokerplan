import React, { useState } from 'react';

function PlayerNameInput({ onAddPlayer }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddPlayer = () => {
    if (inputValue.trim()) {
      onAddPlayer(inputValue.trim());
      setInputValue(''); // Clear the input field after adding the player
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="playerInput" className="mr-2">Enter player name:</label>
      <input
        type="text"
        id="playerInput"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Player Name"
        className="border p-2 mr-2"
      />
      <button onClick={handleAddPlayer} className="p-2 bg-blue-500 text-white">
        Add Player
      </button>
    </div>
  );
}

export default PlayerNameInput;
