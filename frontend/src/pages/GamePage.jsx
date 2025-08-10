// GamePage.jsx
import React, { useEffect, useState } from "react";
import socket from "../socket";

const GamePage = ({ gameID, 
  // playerID 
}) => {
  const [numbersCalled, setNumbersCalled] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [messages, setMessages] = useState([]);

  // Join game on page load
  useEffect(() => {
    // socket.emit("join-game", { gameID, playerID });

    // Listen for game state (past numbers, winners)
    socket.on("game-state", (game) => {
      setNumbersCalled(game.calledNumbers || []);
    });

    // Listen for game start
    socket.on("game-started", (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    // Listen for new numbers
    socket.on("new-number", (number) => {
      setCurrentNumber(number);
      setNumbersCalled((prev) => [...prev, number]);
    });

    // Listen for ticket claims
    // socket.on("ticket-claimed", (data) => {
    //   setMessages((prev) => [...prev, `🎉 ${data.playerName} claimed ${data.type}`]);
    // });

    return () => {
      socket.off("game-state");
      socket.off("game-started");
      socket.off("new-number");
      socket.off("ticket-claimed");
    };
  }, [gameID, 
    // playerID
  ]);

  // Admin: Start game
  function startGame() {
    socket.emit("start-game", { gameID });
  }

  // Admin: Call a number manually (optional)
  function callNumber(num) {
    socket.emit("number-called", num);
  }

  // Player: Claim a ticket
  function claimTicket(type) {
    const ticketData = {
      gameID,
      playerID,
      type, // e.g., "First Line", "House Full"
    };
    socket.emit("claim-ticket", ticketData);
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Tambola Game</h2>

      <div className="my-2">
        <p>Current Number: {currentNumber || "Waiting..."}</p>
        <p>Numbers Called: {numbersCalled.join(", ")}</p>
      </div>

      {/* Example Admin Controls */}
      <button onClick={startGame} className="bg-green-500 text-white px-3 py-1 rounded">
        Start Game
      </button>
      <button onClick={() => callNumber(25)} className="bg-blue-500 text-white px-3 py-1 rounded ml-2">
        Call Number 25
      </button>

      {/* Example Player Controls */}
      <button onClick={() => claimTicket("First Line")} className="bg-purple-500 text-white px-3 py-1 rounded ml-2">
        Claim First Line
      </button>

      <div className="mt-4">
        <h3 className="font-bold">Game Updates</h3>
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default GamePage;