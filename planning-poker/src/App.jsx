import { useState } from "react";
import "./App.css";
import userStories from "./userStories"; // Import user stories

class PlayerNode {
  constructor(name) {
    this.name = name;
    this.currentVote = 0;
  }
}

export function App() {
  const [players, setPlayers] = useState([]); // Player array
  const [playerName, setPlayerName] = useState(""); // Input state
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null); // Selected player index
  const [selectedUserStoryIndex, setSelectedUserStoryIndex] = useState(0); // Selected user story index

  // Store estimations
  const [storyEstimations, setStoryEstimations] = useState(
    userStories.map((story) => ({ ...story })) // Copy stories into state
  );

  // Add a new player
  const handleAddPlayer = () => {
    if (playerName.trim() === "") return; // Prevent empty names
    const newPlayer = new PlayerNode(playerName);
    setPlayers([...players, newPlayer]); // Update the array
    setPlayerName(""); // Clear input field
  };

  // Function to select a player
  const selectPlayer = (index) => {
    setSelectedPlayerIndex(index);
  };

  // Function to update vote for selected player
  const playerVote = (num) => {
    if (selectedPlayerIndex === null) {
      console.log("No player selected.");
      return;
    }

    // Updates selected player's vote
    const updatedPlayers = players.map((player, index) =>
      index === selectedPlayerIndex ? { ...player, currentVote: num } : player
    );

    setPlayers(updatedPlayers);
    console.log(`Player ${players[selectedPlayerIndex].name} voted: ${num}`);
  };

  

  // Check if all players have voted
  const allPlayersVoted = players.every((player) => player.currentVote !== 0);

  // Check if all votes match
  const matchVotes = () => {
    if (players.length === 0) return false; // If no players, return false
    const firstVote = players[0].currentVote; // Get the first player's vote
    return players.every(
      (player) => player.currentVote !== 0 && player.currentVote === firstVote
    );
  };

  // Reset all player votes to 0
  const resetPlayerVotes = () => {
    const resetPlayers = players.map((player) => ({
      ...player,
      currentVote: 0,
    }));
    setPlayers(resetPlayers);
  };

  // Move to next user story if votes match
  const nextUserStory = () => {
    if (matchVotes()) {
      // Update story estimation properly in state
      const updatedStories = [...storyEstimations];
      updatedStories[selectedUserStoryIndex].estimation = players[0].currentVote;

      setStoryEstimations(updatedStories);
      resetPlayerVotes();

      // Move to next user story (if available)
      if (selectedUserStoryIndex < userStories.length - 1) {
        setSelectedUserStoryIndex(selectedUserStoryIndex + 1);
      } else {
        alert("All user stories have been estimated! View completed User Stories at the bottom of the page");
      }
    }
  };

  return (
    <>
      <h1>Planning Poker</h1>

      {/* Display Current User Story */}
      <div className="card mt-4">
        <h2>Current Story:</h2>
        <p>{storyEstimations[selectedUserStoryIndex].task}</p>
        <p className="text-gray-600">
        </p>
      </div>

      {/* Player Name Input and Add Player Button */}
      <div className="card">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="border p-2"
        />
        <button
          onClick={handleAddPlayer}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Player
        </button>
      </div>



      {/* Fibonacci Buttons */}
      <div className="fibonacci-buttons">
        <h2>Fibonacci Numbers</h2>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233].map((num) => (
            <button
              key={num}
              className="p-2 border rounded bg-gray-200"
              onClick={() => playerVote(num)}
            >
              {num} 
            </button>
          ))}
        </div>
      </div>

      {/* Match Votes Result */}
      <div className="card mt-4">
        {matchVotes() ? (
          <p className="Matching Votes message">✅ All players have voted the same!</p>
        ) : (
          <p className="Votes do not match message">❌ Votes do not match yet.</p>
        )}
      </div>
            {/* Next User Story Button */}
            {matchVotes() && (
        <button onClick={nextUserStory} className="p-2 mt-4 bg-red-500 text-white rounded">
          Next User Story
        </button>
      )}

      {/* Reset Votes Button */}
      {allPlayersVoted && (
        <button onClick={resetPlayerVotes} className="p-2 mt-4 bg-red-500 text-white rounded">
          Reset Votes
        </button>
      )}
      {/* Display List of Players */}
      <div className="players-list">
        <h2>Players:</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => selectPlayer(index)}
                className={`ml-4 p-2 rounded ${
                  selectedPlayerIndex === index ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                {selectedPlayerIndex === index ? `Selected: ${player.name}` : `Select: ${player.name}`}
              </button>
              {/* Show Votes Next to Player Buttons */}
              <span className="ml-4 p-2 border rounded bg-gray-100">
                has voted {allPlayersVoted ? player.currentVote : "?"}
              </span>
            </li>
          ))}
        </ul>
      </div>


      {/* Display Completed User Stories with Estimations */}
      <div className="card mt-4">
        <h2>Completed User Stories:</h2>
        <ul>
          {storyEstimations
            .filter((story) => story.estimation > 0)
            .map((story, index) => (
              <li key={index}>
                {story.task} - <strong>Estimation: {story.estimation}</strong>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
