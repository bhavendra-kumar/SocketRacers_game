import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // connect to backend

const Game = () => {
  const [players, setPlayers] = useState({});
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const keys = useRef({});

  useEffect(() => {
    socket.on("players", setPlayers);

    const handleKeyDown = (e) => keys.current[e.key.toLowerCase()] = true;
    const handleKeyUp = (e) => keys.current[e.key.toLowerCase()] = false;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const interval = setInterval(() => {
      let { x, y } = position;
      if (keys.current["w"]) y -= 5;
      if (keys.current["s"]) y += 5;
      if (keys.current["a"]) x -= 5;
      if (keys.current["d"]) x += 5;

      setPosition({ x, y });
      socket.emit("move", { x, y });
    }, 50);

    return () => {
      socket.off("players");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval);
    };
  }, [position]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#222", position: "relative" }}>
      {Object.values(players).map(player => (
        <div key={player.id}
          style={{
            position: "absolute",
            left: player.x,
            top: player.y,
            width: 40,
            height: 40,
            backgroundColor: player.color,
            border: "2px solid white",
            borderRadius: "8px"
          }}
        />
      ))}
    </div>
  );
};

export default Game;
