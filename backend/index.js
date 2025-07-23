const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

let players = {};

io.on("connection", (socket) => {
  console.log("New player:", socket.id);
  players[socket.id] = {
    id: socket.id,
    x: Math.random() * 600,
    y: Math.random() * 400,
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  };
  io.emit("players", players);

  socket.on("move", (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;
      io.emit("players", players);
    }
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("players", players);
  });
});

server.listen(5000, () => console.log(`Server is Connected to ${port}`));
